import { useState, useEffect, useRef, useCallback } from 'react'
import { startListening, stopListening, isSpeechSupported, onSpeechResult, speakWithFallback } from '../../services/speech'
import { useKeyboard } from '../../context/KeyboardContext'
import { useLanguage } from '../../context/LanguageContext'

const vivaQuestions = [
  { id: 'v1', question: 'Explain the concept of द्रव्य (substance) in Nyāya philosophy.', keyPoints: ['substratum of qualities', '9 dravyas', 'eternal'], difficulty: 4 },
  { id: 'v2', question: 'What is the difference between गुण (quality) and क्रिया (action) in Vaiśeṣika?', keyPoints: ['guṇa = quality residing in substance', 'kriyā = action/motion', 'both inhere in dravya'], difficulty: 4 },
  { id: 'v3', question: 'Describe the वृद्धि sandhi rule with examples.', keyPoints: ['a/ā + e = ai', 'a/ā + o = au', 'example: sadā + eva = sadaiva'], difficulty: 3 },
  { id: 'v4', question: 'Explain the three genders (लिङ्ग) in Sanskrit grammar.', keyPoints: ['pulliṅga = masculine', 'strīliṅga = feminine', 'napuṃsakaliṅga = neuter', 'gender is grammatical not natural'], difficulty: 2 },
  { id: 'v5', question: 'What is the significance of the उपनिषद्s in Vedānta?', keyPoints: ['end of Vedas', 'ātman = brahman', 'tattvamasi', '12 principal upaniṣads'], difficulty: 4 },
  { id: 'v6', question: 'Define योगः according to Patañjali.', keyPoints: ['yogaś citta-vṛtti-nirodhaḥ', 'cessation of mental fluctuations', '8 limbs'], difficulty: 3 },
  { id: 'v7', question: 'What are the 5 types of compounds in Sanskrit? Give examples.', keyPoints: ['tatpuruṣa', 'karmadhāraya', 'dvandva', 'bahuvrīhi', 'avyayībhāva'], difficulty: 3 },
  { id: 'v8', question: 'Explain the Nyāya 5-membered syllogism.', keyPoints: ['pratijñā', 'hetu', 'udāharaṇa', 'upanaya', 'nigamana'], difficulty: 4 },
  { id: 'v9', question: 'What is निष्कामकर्म in the Bhagavad Gītā?', keyPoints: ['action without desire for fruits', 'Gītā 2.47', 'mā phaleṣu kadācana'], difficulty: 3 },
  { id: 'v10', question: 'Describe the 8 limbs of Patañjali\'s Yoga.', keyPoints: ['yama', 'niyama', 'āsana', 'prāṇāyāma', 'pratyāhāra', 'dhāraṇā', 'dhyāna', 'samādhi'], difficulty: 3 },
]

interface EvaluationResult {
  score: number
  feedback: string
  pronunciationScore: number
  matchedPoints: string[]
  missedPoints: string[]
}

function evaluateResponse(transcript: string, question: typeof vivaQuestions[0], t: (key: string) => string): EvaluationResult {
  const lower = transcript.toLowerCase()
  const matched = question.keyPoints.filter((kp) => lower.includes(kp.toLowerCase()))
  const missed = question.keyPoints.filter((kp) => !lower.includes(kp.toLowerCase()))
  const score = Math.round((matched.length / question.keyPoints.length) * 100)
  const pronunciationScore = Math.min(100, 60 + Math.round(transcript.length / question.question.length * 40))

  let feedback = ''
  if (score >= 80) feedback = t('Excellent! Comprehensive understanding demonstrated.')
  else if (score >= 60) feedback = t('Good response. Consider covering more key points.')
  else if (score >= 40) feedback = t('Adequate, but needs more depth.')
  else feedback = t('Review the topic and try again.')

  if (matched.length > 0) feedback += t(' Covered: ') + matched.join(', ') + '.'
  if (missed.length > 0) feedback += t(' Consider discussing: ') + missed.join(', ') + '.'

  return { score, feedback, pronunciationScore, matchedPoints: matched, missedPoints: missed }
}

export default function VivaSimulatorPage() {
  const [started, setStarted] = useState(false)
  const [currentQ, setCurrentQ] = useState(0)
  const [textResponse, setTextResponse] = useState('')
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null)
  const [isListening, setIsListening] = useState(false)
  const [interimText, setInterimText] = useState('')
  const [speechSupported] = useState(isSpeechSupported)
  const [history, setHistory] = useState<{ q: string; score: number }[]>([])
  const textRef = useRef<HTMLTextAreaElement>(null)
  const { toggleKeyboard } = useKeyboard()
  const { t } = useLanguage()

  useEffect(() => {
    const unsub = onSpeechResult((result) => {
      setTextResponse((prev) => prev + result.transcript + ' ')
      if (textRef.current) {
        textRef.current.value = textRef.current.value + result.transcript + ' '
      }
    })
    return unsub
  }, [])

  const toggleRecording = useCallback(() => {
    if (isListening) {
      stopListening()
      setIsListening(false)
      setInterimText('')
    } else if (speechSupported) {
      startListening()
      setIsListening(true)
    }
  }, [isListening, speechSupported])

  const submitResponse = useCallback(() => {
    const content = textResponse
    if (!content.trim()) return
    const result = evaluateResponse(content, vivaQuestions[currentQ], t)
    setEvaluation(result)
    setHistory((prev) => [...prev, { q: vivaQuestions[currentQ].question, score: result.score }])
  }, [textResponse, currentQ])

  const nextQuestion = useCallback(() => {
    if (currentQ < vivaQuestions.length - 1) {
      setCurrentQ((c) => c + 1)
      setTextResponse('')
      setEvaluation(null)
      if (textRef.current) textRef.current.value = ''
    }
  }, [currentQ])

  const speakQuestion = useCallback(() => {
    speakWithFallback(vivaQuestions[currentQ].question)
  }, [currentQ])

  const totalScore = history.length > 0 ? Math.round(history.reduce((s, h) => s + h.score, 0) / history.length) : 0

  if (!started) {
    return (
      <div>
        <div className="page-header">
          <h2>🎙️ {t('AI Oral Exam (Viva) Simulator')}</h2>
          <p>{t('Real speech recognition + AI evaluation for Sanskrit oral exams')}</p>
        </div>
        <div className="card viva-start-card">
          <div className="viva-start-icon">🎙️</div>
          <h3>{t('Ready for your Viva?')}</h3>
          <p>{t('The AI examiner will ask questions on Sanskrit grammar, philosophy, and texts. Respond via text or speech.')}</p>
          <div className="viva-start-features">
            <span>🎤 {t('Speech recognition')}</span>
            <span>📝 {t('Auto-evaluation')}</span>
            <span>📊 {t('Scoring & history')}</span>
            <span>🔊 {t('Text-to-speech questions')}</span>
          </div>
          <button className="btn btn-primary" onClick={() => setStarted(true)}>{t('Start Viva Session')}</button>
        </div>
        <div className="viva-lab-promo">
          <span>🗣️ {t('Want guided skill practice first?')}</span>
          <a className="btn btn-secondary btn-sm" href="/viva/lab">{t('Open Language Lab')}</a>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="page-header">
        <h2>🎙️ {t('Viva Simulator')}</h2>
        <div className="viva-progress">
          <span>{t('Question')} {currentQ + 1} {t('of')} {vivaQuestions.length}</span>
          <div className="viva-progress-bar">
            <div style={{ width: `${((currentQ + 1) / vivaQuestions.length) * 100}%` }} />
          </div>
        </div>
      </div>

      {history.length > 0 && (
        <div className="viva-score-bar">
          {t('Average Score:')} <strong>{totalScore}%</strong> · {t('Questions answered:')} {history.length}
        </div>
      )}

      <div className="viva-question-card">
        <div className="viva-question">{vivaQuestions[currentQ].question}</div>
        <div className="viva-difficulty">{t('Difficulty:')} {'★'.repeat(vivaQuestions[currentQ].difficulty)}</div>
        <button className="btn btn-sm btn-outline" onClick={speakQuestion}>🔊 {t('Hear Question')}</button>
      </div>

      <div className="card">
        <div className="viva-input-area">
          <textarea
            ref={textRef}
            defaultValue={textResponse}
            onChange={(e) => setTextResponse(e.target.value)}
            placeholder={t('Type your response here, or use speech recognition...')}
            className="viva-textarea"
          />
          {interimText && <div className="viva-interim">{interimText}</div>}
        </div>

        <div className="viva-actions">
          <button
            className="btn btn-secondary"
            onClick={() => toggleKeyboard(textRef as any)}
            title={t('Devanagari Keyboard')}
          >
            ⌨️ देव
          </button>
          {speechSupported && (
            <button
              className={`btn ${isListening ? 'btn-danger' : 'btn-secondary'}`}
              onClick={toggleRecording}
            >
              {isListening ? '⏹ ' + t('Stop Recording') : '🎤 ' + t('Start Speaking')}
            </button>
          )}
          {!speechSupported && (
            <div className="viva-unavail">{t('Speech recognition unavailable in this browser. Use Chrome.')}</div>
          )}
          <button className="btn btn-primary" onClick={submitResponse} disabled={!textResponse.trim()}>
            {t('Submit Response')}
          </button>
          {currentQ < vivaQuestions.length - 1 && (
            <button className="btn btn-secondary" onClick={nextQuestion}>{t('Skip →')}</button>
          )}
        </div>

        {evaluation && (
          <div className={`viva-evaluation ${evaluation.score >= 60 ? 'good' : 'needs-work'}`}>
            <div className="viva-eval-header">
              <span>{t('Score:')} <strong>{evaluation.score}%</strong></span>
              {speechSupported && <span>{t('Pronunciation:')} <strong>{evaluation.pronunciationScore}%</strong></span>}
            </div>
            <div className="viva-eval-score-bar">
              <div className="viva-eval-fill" style={{ width: `${evaluation.score}%` }} />
            </div>
            <p>{evaluation.feedback}</p>
            {evaluation.missedPoints.length > 0 && (
              <details>
                <summary>{t('View key points to cover')}</summary>
                <ul>{evaluation.missedPoints.map((p) => <li key={p}>{p}</li>)}</ul>
              </details>
            )}
          </div>
        )}

        {currentQ === vivaQuestions.length - 1 && evaluation && (
          <div className="viva-session-end">
            <h3>{t('Session Complete!')}</h3>
            <p>{t('Final average:')} {totalScore}% {t('across')} {history.length} {t('questions')}</p>
            <button className="btn btn-primary" onClick={() => {
              setCurrentQ(0); setTextResponse(''); setEvaluation(null)
              setStarted(false); setHistory([]); if (textRef.current) textRef.current.value = ''
            }}>
              {t('Finish Session')}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
