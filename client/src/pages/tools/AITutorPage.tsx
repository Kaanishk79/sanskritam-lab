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

export default function AITutorPage() {
  const { t } = useLanguage()

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
    for (const [key, response] of Object.entries(mockResponses)) {
      if (lower.includes(key)) return t(response)
    }
    return t(`That's a great question about Sanskrit! Let me explain.

In the Sanskrit tradition, this topic is approached systematically. The key principles to understand are:

1. First, understand the foundational concepts and terminology.
2. Then, study the rules and their applications with examples.
3. Finally, practice by reading actual texts that use these concepts.

I'd recommend checking the relevant lesson in our curriculum for a more detailed treatment. You can also ask me to elaborate on any specific aspect.

Would you like me to break this down further?`)
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
