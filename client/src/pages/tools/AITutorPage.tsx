import { useState, useRef, useEffect } from 'react'
import { useKeyboard } from '../../context/KeyboardContext'
import { useLanguage } from '../../context/LanguageContext'
import { api } from '../../services/api'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

const quickPrompts = [
  'What is the difference between गुण and वृद्धि sandhi?',
  'Explain the 8 cases with examples',
  'What are the 16 padārthas of Nyāya?',
  'Tell me about Kālidāsa\'s works',
  'What does तत्त्वमसि mean?',
  'Explain the 5 types of compounds',
]

const mockResponses: Record<string, string> = {
  'guna': 'Guṇa sandhi occurs when अ/आ combines with इ/ई → ए, अ/आ + उ/ऊ → ओ, and अ/आ + ऋ → अर्.\n\nExample: देव + इन्द्रः = देवेन्द्रः (deva + indraḥ → devendraḥ).\n\nVṛddhi sandhi is the stronger grade: अ/आ + ए → ऐ, and अ/आ + ओ → औ.\n\nExample: सदा + एव = सदैव (sadā + eva → sadaiva).\n\nThe key difference is in the resulting vowel grade — Guṇa produces ए/ओ/अर् while Vṛddhi produces ऐ/औ.',
  'cases': 'Sanskrit has 8 cases (विभक्तयः) across 3 numbers (singular, dual, plural):\n\n1. प्रथमा (Nominative) — subject: रामः (Rāma)\n2. द्वितीया (Accusative) — object: रामम् (Rāma)\n3. तृतीया (Instrumental) — by/with: रामेण (by Rāma)\n4. चतुर्थी (Dative) — to/for: रामाय (to Rāma)\n5. पञ्चमी (Ablative) — from: रामात् (from Rāma)\n6. षष्ठी (Genitive) — of: रामस्य (of Rāma)\n7. सप्तमी (Locative) — in/on: रामे (in Rāma)\n8. सम्बोधन (Vocative) — O!: हे राम (O Rāma!)',
  'nyaya': 'The 16 padārthas (categories) of Nyāya philosophy per Nyāya Sūtra 1.1.1:\n\n1. प्रमाण (Pramāṇa) — means of knowledge\n2. प्रमेय (Prameya) — objects of knowledge\n3. संशय (Saṃśaya) — doubt\n4. प्रयोजन (Prayojana) — purpose\n5. दृष्टान्त (Dṛṣṭānta) — example\n6. सिद्धान्त (Siddhānta) — established doctrine\n7. अवयव (Avayava) — members of inference\n8. तर्क (Tarka) — hypothetical reasoning\n9. निर्णय (Nirṇaya) — certainty\n10. वाद (Vāda) — discussion\n11. जल्प (Jalpa) — wrangling\n12. वितण्डा (Vitaṇḍā) — cavil\n13. हेत्वाभास (Hetvābhāsa) — fallacies\n14. छल (Chala) — quibble\n15. जाति (Jāti) — rejoinder\n16. निग्रहस्थान (Nigrahasthāna) — point of defeat',
  'kalidasa': 'Kālidāsa wrote 7 major works (c. 4th-5th CE):\n\n**3 Plays (नाटकानि):**\n1. अभिज्ञानशाकुन्तलम् — The Recognition of Śakuntalā\n2. विक्रमोर्वशीयम् — Urvaśī Won by Valour\n3. मालविकाग्निमित्रम् — Mālavikā and Agnimitra\n\n**2 Epic Poems (महाकाव्ये):**\n1. रघुवंशम् — The Dynasty of Raghu\n2. कुमारसम्भवम् — The Birth of Kumāra\n\n**2 Lyric Poems (खण्डकाव्ये):**\n1. मेघदूतम् — The Cloud Messenger\n2. ऋतुसंहारः — The Gathering of Seasons\n\nHis style is characterized by प्रसाद (elegant simplicity) and माधुर्य (sweetness).',
  'tattvamasi': 'तत्त्वमसि (Tattvamasi) = "That thou art"\n\nThis is the great saying (महावाक्य) from the Chāndogya Upaniṣad 6.8, where Uddālaka Āruṇi teaches his son Śvetaketu.\n\n**Breakdown:**\n- तत् (tat) = That (Brahman, ultimate reality)\n- त्वम् (tvam) = Thou (you, the individual self)\n- असि (asi) = art (are)\n\nIt teaches the identity of the individual self (Ātman) with ultimate reality (Brahman) — the core of Advaita Vedānta.',
  'compounds': 'The 5 types of compounds (समासाः):\n\n1. **तत्पुरुष (Tatpuruṣa)** — Determinative: first modifies second\n   राजपुरुषः = राजन् + पुरुषः (king\'s man)\n\n2. **कर्मधारय (Karmadhāraya)** — Descriptive: adjective + noun\n   महाराजः = महान् + राजा (great king)\n\n3. **द्वन्द्व (Dvandva)** — Copulative: coordinate pair\n   रामकृष्णौ = Rāma and Kṛṣṇa\n\n4. **बहुव्रीहि (Bahuvrīhi)** — Exocentric: refers to external entity\n   चक्रपाणिः = one with discus in hand = Viṣṇu\n\n5. **अव्ययीभाव (Avyayībhāva)** — Adverbial: indeclinable first member\n   यथाशक्ति = according to ability',
}

const mockResponsesHi: Record<string, string> = {
  'guna': 'गुण संधि तब होती है जब अ/आ का इ/ई के साथ → ए, अ/आ + उ/ऊ → ओ, और अ/आ + ऋ → अर्।\n\nउदाहरण: देव + इन्द्रः = देवेन्द्रः।\n\nवृद्धि संधि अधिक बलवान स्वर देती है: अ/आ + ए → ऐ, और अ/आ + ओ → औ।\n\nउदाहरण: सदा + एव = सदैव।\n\nमुख्य अंतर स्वर-गुण में है — गुण से ए/ओ/अर् बनते हैं जबकि वृद्धि से ऐ/औ।',
  'cases': 'संस्कृत में 3 वचनों (एकवचन, द्विवचन, बहुवचन) के साथ 8 विभक्तियाँ हैं:\n\n1. प्रथमा (कर्ता) — रामः\n2. द्वितीया (कर्म) — रामम्\n3. तृतीया (करण) — रामेण\n4. चतुर्थी (सम्प्रदान) — रामाय\n5. पञ्चमी (अपादान) — रामात्\n6. षष्ठी (सम्बन्ध) — रामस्य\n7. सप्तमी (अधिकरण) — रामे\n8. सम्बोधन (हे!) — हे राम',
  'nyaya': 'न्याय सूत्र 1.1.1 के अनुसार न्याय दर्शन के 16 पदार्थ:\n\n1. प्रमाण — ज्ञान के साधन\n2. प्रमेय — ज्ञान के विषय\n3. संशय — संदेह\n4. प्रयोजन — उद्देश्य\n5. दृष्टान्त — उदाहरण\n6. सिद्धान्त — स्थापित मत\n7. अवयव — अनुमान के अंग\n8. तर्क — काल्पनिक तर्क\n9. निर्णय — निश्चय\n10. वाद — चर्चा\n11. जल्प — जोरदार वाद\n12. वितण्डा — छलपूर्ण वाद\n13. हेत्वाभास — कुतर्क\n14. छल — शब्दों का हेरफेर\n15. जाति — प्रत्युत्तर\n16. निग्रहस्थान — पराजय का स्थान',
  'kalidasa': 'कालिदास ने (लगभग 4-5 शताब्दी ई.) 7 प्रमुख रचनाएँ लिखीं:\n\n**3 नाटक:**\n1. अभिज्ञानशाकुन्तलम्\n2. विक्रमोर्वशीयम्\n3. मालविकाग्निमित्रम्\n\n**2 महाकाव्य:**\n1. रघुवंशम्\n2. कुमारसम्भवम्\n\n**2 खण्डकाव्य:**\n1. मेघदूतम्\n2. ऋतुसंहारः\n\nउनकी शैली प्रसाद (सरल सुन्दरता) और माधुर्य से परिचित है।',
  'tattvamasi': 'तत्त्वमसि का अर्थ है "वह तू है"।\n\nयह छान्दोग्य उपनिषद् 6.8 का महावाक्य है, जहाँ उद्दालक आरुणि अपने पुत्र श्वेतकेतु को सिखाते हैं।\n\n**विभाजन:**\n- तत् = वह (ब्रह्म, परम सत्य)\n- त्वम् = तू (आत्मा)\n- असि = है\n\nयह आत्मा और ब्रह्म की एकता सिखाता है — अद्वैत वेदांत का मूल।',
  'compounds': '5 प्रकार के समास:\n\n1. **तत्पुरुष** — पहला पद दूसरे को विशेष करता है\n   राजपुरुषः = राजन् + पुरुषः\n\n2. **कर्मधारय** — विशेषण + विशेष्य\n   महाराजः = महान् + राजा\n\n3. **द्वन्द्व** — समान अधिकार वाले पदों का समास\n   रामकृष्णौ = राम और कृष्ण\n\n4. **बहुव्रीहि** — अन्य पदार्थ प्रधान\n   चक्रपाणिः = हाथ में चक्र धारण करने वाला = विष्णु\n\n5. **अव्ययीभाव** — पहला पद अव्यय\n   यथाशक्ति = शक्ति के अनुसार',
}

export default function AITutorPage() {
  const { t, lang } = useLanguage()

  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: t('नमस्ते! I am your Sanskrit tutor. Ask me anything about Sanskrit language, grammar, philosophy, or texts.'), timestamp: Date.now() },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [aiMode, setAiMode] = useState<'ai' | 'local' | 'checking'>('checking')

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { toggleKeyboard } = useKeyboard()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const getMockResponse = (input: string): string => {
    const lower = input.toLowerCase()
    const map = lang === 'hi' ? mockResponsesHi : mockResponses
    for (const key of Object.keys(map)) {
      if (lower.includes(key)) return map[key]
    }
    return lang === 'hi'
      ? 'संस्कृत के बारे में यह बहुत अच्छा प्रश्न है! मैं समझाता हूँ।\n\nसंस्कृत परंपरा में इस विषय को व्यवस्थित रूप से समझा जाता है। मुख्य सिद्धांत:\n\n1. पहले मूल अवधारणाएँ और शब्दावली समझें।\n2. फिर नियम और उदाहरणों के साथ उनके प्रयोग का अध्ययन करें।\n3. अंत में उन अवधारणाओं का प्रयोग करने वाले वास्तविक ग्रंथों को पढ़ें।\n\nअधिक विस्तृत जानकारी हेतु हमारे पाठ्यक्रम का संबंधित पाठ देखें। किसी विशेष पहलू पर गहराई से बताने के लिए भी पूछ सकते हैं।\n\nक्या आप चाहेंगे कि मैं इसे और विस्तार से समझाऊँ?'
      : `That's a great question about Sanskrit! Let me explain.

In the Sanskrit tradition, this topic is approached systematically. The key principles to understand are:

1. First, understand the foundational concepts and terminology.
2. Then, study the rules and their applications with examples.
3. Finally, practice by reading actual texts that use these concepts.

I'd recommend checking the relevant lesson in our curriculum for a more detailed treatment. You can also ask me to elaborate on any specific aspect.

Would you like me to break this down further?`
  }

  const sendMessage = async (content: string) => {
    if (!content.trim() || isTyping) return

    const userMsg: Message = { role: 'user', content, timestamp: Date.now() }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    let reply = ''
    try {
      const history = messages
        .slice(-8)
        .map((m) => ({ role: m.role, content: m.content }))
      const live = await api.tutor.chat([...history, { role: 'user', content }])
      reply = live.reply || getMockResponse(content)
      setAiMode('ai')
    } catch (err) {
      console.warn('AI service unavailable, using local tutor:', err)
      reply = getMockResponse(content)
      setAiMode('local')
    }

    const assistantMsg: Message = { role: 'assistant', content: reply, timestamp: Date.now() }
    setMessages((prev) => [...prev, assistantMsg])
    setIsTyping(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <div>
      <div className="page-header">
        <h2>{t('🤖 AI Sanskrit Tutor')}</h2>
        <p>{t('Ask anything about Sanskrit — grammar, texts, philosophy, or culture')}</p>
        {aiMode !== 'checking' && (
          <span
            style={{
              display: 'inline-block',
              marginTop: 6,
              fontSize: 12,
              padding: '3px 10px',
              borderRadius: 12,
              color: '#fff',
              background: aiMode === 'ai' ? '#2e7d32' : '#e67e22',
            }}
          >
            {aiMode === 'ai' ? t('● AI connected') : t('● Local tutor (AI offline)')}
          </span>
        )}
      </div>

      <div className="tutor-layout">
        <div className="tutor-chat">
          <div className="tutor-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`tutor-msg ${msg.role}`}>
                <div className="tutor-msg-avatar">{msg.role === 'assistant' ? '🤖' : '👤'}</div>
                <div className="tutor-msg-bubble">
                  <div className="tutor-msg-content">{msg.content}</div>
                  <div className="tutor-msg-time">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="tutor-msg assistant">
                <div className="tutor-msg-avatar">🤖</div>
                <div className="tutor-msg-bubble typing">
                  <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="tutor-input" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('Ask about Sanskrit...')}
              disabled={isTyping}
            />
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => toggleKeyboard(inputRef as any)}
              title={t('Devanagari Keyboard')}
            >
              ⌨️
            </button>
            <button type="submit" className="btn btn-primary" disabled={!input.trim() || isTyping}>
              {t('Send')}
            </button>
          </form>
        </div>

        <div className="tutor-sidebar">
          <div className="card">
            <h4>{t('Quick Questions')}</h4>
            <div className="tutor-quick-list">
              {quickPrompts.map((prompt, i) => (
                <button
                  key={i}
                  className="tutor-quick-btn"
                  onClick={() => sendMessage(prompt)}
                  disabled={isTyping}
                >
                  {t(prompt)}
                </button>
              ))}
            </div>
          </div>

          <div className="card" style={{ marginTop: 16 }}>
            <h4>{t('💡 Tips')}</h4>
            <ul className="tutor-tips">
              <li>{t('Ask about grammar rules with examples')}</li>
              <li>{t('Request word-by-word breakdowns of verses')}</li>
              <li>{t('Compare different philosophical schools')}</li>
              <li>{t('Ask for declension tables')}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
