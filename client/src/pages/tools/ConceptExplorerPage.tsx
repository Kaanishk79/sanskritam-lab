import { useMemo, useState } from 'react'
import { toIAST } from '../../services/sanskrit'
import { speakWithFallback } from '../../services/speech'
import { useLanguage } from '../../context/LanguageContext'

interface Concept {
  id: string
  sa: string
  en: string
  cat: 'Grammar' | 'Philosophy' | 'Values' | 'Texts'
  def: string
  detail: string
  example: string
  exampleEn: string
  related: string[]
  emoji: string
}

const CONCEPTS: Concept[] = [
  {
    id: 'sandhi', sa: 'सन्धि', en: 'Sandhi', cat: 'Grammar', emoji: '🔗',
    def: 'The joining of sounds when words meet.',
    detail: 'When two sounds come together in speech, they change to flow smoothly: इ + अ → य (yaṇ), अ + आ → आ (dīrgha), अ + इ → ए (guṇa). Pāṇini gave 3000+ rules for these joins — try the Sandhi Tool to see them live.',
    example: 'इदम् + अस्ति = इदमस्ति', exampleEn: 'this + is = this is',
    related: ['vyakarana', 'prakriya'],
  },
  {
    id: 'samasa', sa: 'समास', en: 'Compound', cat: 'Grammar', emoji: '🧱',
    def: 'Two or more words packed into one.',
    detail: 'Like building blocks, Sanskrit stacks words: राजन् + पुरुष = राजपुरुष (king’s man). There are main types: Tatpuruṣa, Dvandva, Bahuvrīhi, Karmadhāraya, Avyayībhāva. English does this too — “rainfall”, “snowman”.',
    example: 'गजानन = गज + आनन', exampleEn: 'elephant-faced (Ganesha)',
    related: ['vyakarana', 'sandhi'],
  },
  {
    id: 'kAraka', sa: 'कारक', en: 'Kāraka (case roles)', cat: 'Grammar', emoji: '🎭',
    def: 'The role a word plays in an action.',
    detail: 'Kārakas answer “who does what to whom”: kartā (agent, nominative), karma (object, accusative), karaṇa (instrument), sampradāna (recipient), apādāna (source), adhikaraṇa (location). These 6 roles drive the 8 noun cases.',
    example: 'रामः (कर्ता) फलम् (कर्म) खादति', exampleEn: 'Rama (agent) eats a fruit (object)',
    related: ['vibhakti', 'vyakarana'],
  },
  {
    id: 'vibhakti', sa: 'विभक्ति', en: 'Declension', cat: 'Grammar', emoji: '🧩',
    def: 'The endings a noun takes for its role.',
    detail: 'Sanskrit nouns change endings: रामः, रामम्, रामेण, रामाय… Eight cases × three numbers = a rich grid. This is why word order is free — the ending tells you the grammar, not the position.',
    example: 'रामः / रामम् / रामेण / रामाय', exampleEn: 'Rama / to Rama / by Rama / for Rama',
    related: ['kAraka', 'vyakarana'],
  },
  {
    id: 'vyakarana', sa: 'व्याकरण', en: 'Grammar', cat: 'Grammar', emoji: '📐',
    def: 'The science of speech — “separation back into parts”.',
    detail: 'From Pāṇini’s Aṣṭādhyāyī (c. 500 BCE), the most precise grammar ever written — its rules are so algorithmic they inspired modern computer language design. Sanskrit grammar is called śabda-śāstra, the science of words.',
    example: 'अष्टाध्यायी — 8 chapters, ~4000 sūtras', exampleEn: 'Pāṇini’s grammar',
    related: ['sandhi', 'samasa', 'dhatu'],
  },
  {
    id: 'dhatu', sa: 'धातु', en: 'Verbal root', cat: 'Grammar', emoji: '🌱',
    def: 'The seed of every verb — the smallest meaningful unit.',
    detail: 'Every Sanskrit verb grows from a root: भू (be), कृ (do), गम् (go). About 2000 roots, grouped in 10 classes (gaṇas), generate the entire verb system. The Dhātu Explorer lists them.',
    example: '√भू → भवति, भविष्यति, अभवत्', exampleEn: 'be → is, will be, was',
    related: ['vyakarana', 'prakriya'],
  },
  {
    id: 'prakriya', sa: 'प्रक्रिया', en: 'Word formation process', cat: 'Grammar', emoji: '⚙️',
    def: 'The step-by-step making of a word.',
    detail: 'Root + suffix + endings, with sound changes along the way: √धा + ल्युट् → धान? No — √धा + क्त → हित. The derivation (prakriyā) shows every intermediate step — like showing your work in math.',
    example: '√गम् + तुम् = गन्तुम्', exampleEn: 'to go (infinitive)',
    related: ['dhatu', 'vyakarana'],
  },
  {
    id: 'brahman', sa: 'ब्रह्मन्', en: 'Ultimate reality', cat: 'Philosophy', emoji: '🌌',
    def: 'The one reality behind everything — infinite, unchanging, blissful.',
    detail: 'The Upaniṣads ask: what is real when everything changes? Their answer: Brahman — the ground of all being, and (in Advaita) identical with the innermost self, Ātman. “Tat tvam asi — That thou art.”',
    example: 'सत्यं ज्ञानम् अनन्तम् ब्रह्म', exampleEn: 'Brahman is truth, knowledge, infinity',
    related: ['atman', 'maya'],
  },
  {
    id: 'atman', sa: 'आत्मन्', en: 'The self', cat: 'Philosophy', emoji: '🪞',
    def: 'The innermost self — pure awareness, not the body or mind.',
    detail: 'We say “my body”, “my mind” — who owns them? The Ātman. Yoga and Vedānta teach knowing the self directly through meditation (dhyāna).',
    example: 'आत्मानं विद्धि', exampleEn: 'Know thyself',
    related: ['brahman', 'dhyana', 'maya'],
  },
  {
    id: 'maya', sa: 'माया', en: 'Cosmic illusion', cat: 'Philosophy', emoji: '🎭',
    def: 'The power that makes the one appear as many.',
    detail: 'Māyā is not “the world is fake” — it is that we mistake the changing for the real. Like mistaking a rope for a snake in dim light: the snake is māyā, the rope is Brahman.',
    example: 'रज्जुसर्पन्यायः', exampleEn: 'the rope-snake analogy',
    related: ['brahman', 'atman'],
  },
  {
    id: 'karma-s', sa: 'कर्मन्', en: 'Action & its result', cat: 'Philosophy', emoji: '🔄',
    def: 'Every action leaves a trace that shapes the future.',
    detail: 'Karma is not “fate” — it is causality of action: the seed you plant grows. The Gītā’s great teaching: act without attachment to results (niṣkāma karma).',
    example: 'कर्मण्येवाधिकारस्ते', exampleEn: 'Your right is to action alone',
    related: ['dharma', 'moksha'],
  },
  {
    id: 'moksha', sa: 'मोक्ष', en: 'Liberation', cat: 'Philosophy', emoji: '🕊️',
    def: 'Freedom from the cycle of birth, death and rebirth.',
    detail: 'The highest goal of classical Indian thought: liberation from saṃsāra by realising the self’s identity with Brahman. Paths: knowledge (jñāna), action (karma), devotion (bhakti), yoga.',
    example: 'मोक्षो हि नान्यत्', exampleEn: 'Liberation is nothing else',
    related: ['brahman', 'atman', 'karma-s'],
  },
  {
    id: 'dhyana', sa: 'ध्यान', en: 'Meditation', cat: 'Philosophy', emoji: '🪷',
    def: 'Unbroken focus of the mind on one object.',
    detail: 'The 7th limb of Patañjali’s yoga. When attention flows without interruption, it becomes samādhi — the state where the seer, seeing, and seen merge.',
    example: 'ध्यानेन सर्वम् साध्यम्', exampleEn: 'Everything is achievable by meditation',
    related: ['yoga', 'atman'],
  },
  {
    id: 'yoga', sa: 'योग', en: 'Union', cat: 'Philosophy', emoji: '🧘',
    def: 'Union of the mind with its deepest stillness.',
    detail: 'From √युज् (to yoke). Patañjali: “yogaś citta-vṛtti-nirodhaḥ” — the stilling of the mind’s fluctuations. The Yoga Sūtras are 196 crisp aphorisms — the world’s best meditation manual.',
    example: 'योगः चित्तवृत्तिनिरोधः', exampleEn: 'Yoga is the stilling of the mind',
    related: ['dhyana', 'atman'],
  },
  {
    id: 'dharma', sa: 'धर्म', en: 'Duty, law of being', cat: 'Values', emoji: '🧭',
    def: 'What holds things together — your role’s natural duty.',
    detail: 'From √धृ (to hold). A fire’s dharma is to burn, a doctor’s to heal, a friend’s to listen. Dharma is context-sensitive: what is right for a soldier in war differs from a monk’s duty.',
    example: 'धर्मो रक्षति रक्षितः', exampleEn: 'Dharma protects the protected',
    related: ['karma-s', 'satya'],
  },
  {
    id: 'satya', sa: 'सत्य', en: 'Truth', cat: 'Values', emoji: '⚖️',
    def: 'Truthfulness in thought, word and deed.',
    detail: 'The first of the five yamas (restraints) of yoga. Truth is not just not-lying — it is alignment: what you think, say and do match. India’s national motto: Satyameva Jayate.',
    example: 'सत्यमेव जयते', exampleEn: 'Truth alone triumphs',
    related: ['dharma', 'ahimsa'],
  },
  {
    id: 'ahimsa', sa: 'अहिंसा', en: 'Non-violence', cat: 'Values', emoji: '🕊️',
    def: 'Not harming any being in thought, word or deed.',
    detail: 'The first yama, raised to a global force by Gandhi (who called it satyāgraha, “truth-force”). Mahābhārata: “ahimsā paramo dharmaḥ — non-violence is the highest dharma.”',
    example: 'अहिंसा परमो धर्मः', exampleEn: 'Non-violence is the highest duty',
    related: ['satya', 'daya'],
  },
  {
    id: 'daya', sa: 'दया', en: 'Compassion', cat: 'Values', emoji: '💗',
    def: 'Feeling another’s joy and pain as your own.',
    detail: 'Compassion is the root of service (sevā). Buddhism made it the first of the four brahma-vihāras; Sanskrit ethics call it the mother of all virtues.',
    example: 'दया सर्वगुणेषु श्रेष्ठा', exampleEn: 'Compassion is the best of all virtues',
    related: ['ahimsa', 'dana'],
  },
  {
    id: 'dana', sa: 'दान', en: 'Giving', cat: 'Values', emoji: '🎁',
    def: 'Giving without expecting return.',
    detail: 'Dāna is the first of the three acts that sustain society (dāna, dāya, bhakti). The Gītā says the best giving is done without pride and without strings.',
    example: 'दानं यज्ञः तपः', exampleEn: 'Giving, sacrifice, austerity',
    related: ['daya', 'karma-s'],
  },
  {
    id: 'seva', sa: 'सेवा', en: 'Selfless service', cat: 'Values', emoji: '🙏',
    def: 'Work done as worship — serving others without ego.',
    detail: 'Modern movements like Swachh Bharat and volunteering echo sevā: doing work not for pay or praise, but because it needs doing. Gandhi: “The best way to find yourself is to lose yourself in the service of others.”',
    example: 'सेवा परमो धर्मः', exampleEn: 'Service is the highest duty',
    related: ['dana', 'daya'],
  },
  {
    id: 'gita', sa: 'श्रीमद्भगवद्गीता', en: 'Bhagavad Gītā', cat: 'Texts', emoji: '📜',
    def: 'The Song of God — 700 verses of the Mahābhārata.',
    detail: 'On the battlefield, Arjuna despairs; Kṛṣṇa teaches him karma, dharma, yoga and bhakti. The Gītā is the most translated Indian text, read by Gandhi, Einstein, Oppenheimer and millions.',
    example: 'गीता शास्त्रम् अमृतम्', exampleEn: 'The Gītā is the nectar of scriptures',
    related: ['karma-s', 'dharma', 'moksha'],
  },
  {
    id: 'ramayana', sa: 'रामायणम्', en: 'Rāmāyaṇa', cat: 'Texts', emoji: '🏹',
    def: 'The story of Rāma — the ideal life in 24,000 verses.',
    detail: 'By Vālmīki, the first poet (ādikavi). Exile, love, war and duty: Rāma shows dharma under pressure — a king who loses everything and keeps his word. The dāsya-bhakti tradition cherishes Hanumān.',
    example: 'रामो विग्रहवान् धर्मः', exampleEn: 'Rāma is dharma embodied',
    related: ['dharma', 'satya'],
  },
  {
    id: 'upanishad', sa: 'उपनिषद्', en: 'Upaniṣads', cat: 'Texts', emoji: '🕉️',
    def: '“Sitting near” — the secret teachings of the Vedas.',
    detail: '108 known texts; the great ones (Īśa, Kena, Kaṭha, Chāndogya…) ask the deepest questions: What is real? Who am I? What happens at death? They are called Vedānta — the end of the Veda.',
    example: 'तत्त्वमसि', exampleEn: 'That thou art',
    related: ['brahman', 'atman', 'moksha'],
  },
]

export default function ConceptExplorerPage() {
  const { t } = useLanguage()
  const [cat, setCat] = useState<'all' | Concept['cat']>('all')
  const [selId, setSelId] = useState(CONCEPTS[0].id)
  const [speaking, setSpeaking] = useState(false)

  const sel = CONCEPTS.find((c) => c.id === selId)!
  const list = useMemo(
    () => (cat === 'all' ? CONCEPTS : CONCEPTS.filter((c) => c.cat === cat)),
    [cat],
  )

  const speak = (text: string) => speakWithFallback(text, (s) => setSpeaking(s))

  const go = (id: string) => setSelId(id)

  return (
    <div>
      <div className="page-header">
        <h2>{t('🔎 Concept Explorer')}</h2>
        <p>{t('Grammar, philosophy, values and texts — big Sanskrit ideas explained in plain English.')}</p>
      </div>

      <div className="card" style={{ maxWidth: 820, margin: '0 auto', padding: 24 }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
          {(['all', 'Grammar', 'Philosophy', 'Values', 'Texts'] as const).map((c) => (
            <button key={c} className={`btn btn-sm ${cat === c ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setCat(c)}>
              {c === 'all' ? t('All') : t(c)}
            </button>
          ))}
        </div>

        <div className="card" style={{ padding: 20, marginBottom: 16, border: '2px solid rgba(255,152,0,0.4)', background: 'rgba(255,152,0,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
            <h3 style={{ margin: 0, fontSize: 26 }}>
              {sel.emoji} {sel.sa} <span style={{ color: 'var(--vt-muted)', fontSize: 15, fontWeight: 400 }}>{sel.en} · {toIAST(sel.sa)}</span>
            </h3>
            <button className="btn btn-sm btn-secondary" onClick={() => speak(sel.sa + '. ' + sel.example)} disabled={speaking}>🔊 {t('Hear')}</button>
          </div>
          <p style={{ margin: '8px 0 0', fontSize: 15, fontWeight: 600, color: 'var(--vt-orange)' }}>{sel.def}</p>
          <p style={{ margin: '10px 0 0' }}>{sel.detail}</p>
          <div className="card" style={{ marginTop: 12, padding: '10px 14px', background: 'var(--vt-white)' }}>
            <p style={{ margin: 0, fontSize: 18 }}>{sel.example}</p>
            <p style={{ margin: '4px 0 0', color: 'var(--vt-muted)' }}>{sel.exampleEn}</p>
          </div>
          {sel.related.length > 0 && (
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 12 }}>
              <span style={{ fontSize: 13, color: 'var(--vt-muted)', alignSelf: 'center' }}>{t('Related')}:</span>
              {sel.related.map((r) => {
                const rc = CONCEPTS.find((c) => c.id === r)
                return rc ? (
                  <button key={r} className="btn btn-sm btn-secondary" onClick={() => go(r)}>
                    {rc.emoji} {rc.sa}
                  </button>
                ) : null
              })}
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(190px,1fr))', gap: 10 }}>
          {list.map((c) => (
            <button
              key={c.id}
              className="card"
              style={{ margin: 0, textAlign: 'left', cursor: 'pointer', border: sel.id === c.id ? '2px solid var(--vt-orange)' : '1px solid var(--vt-border)', padding: '12px 14px' }}
              onClick={() => go(c.id)}
            >
              <strong>{c.emoji} {c.sa}</strong>
              <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--vt-muted)' }}>{c.en} — {c.def}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}