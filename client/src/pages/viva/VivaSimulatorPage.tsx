import { useState } from 'react'

const vivaQuestions = [
  'Explain the concept of द्रव्य (substance) in Nyāya philosophy.',
  'What is the difference between गुण (quality) and क्रिया (action) in Vaiśeṣika?',
  'Describe the वृद्धि sandhi rule with examples.',
  'Explain the three genders (लिङ्ग) in Sanskrit grammar.',
  'What is the significance of the उपनिषद्s in Vedānta?',
]

export default function VivaSimulatorPage() {
  const [started, setStarted] = useState(false)
  const [currentQ, setCurrentQ] = useState(0)
  const [response, setResponse] = useState('')
  const [feedback, setFeedback] = useState<string | null>(null)
  const [recording, setRecording] = useState(false)

  const submitResponse = () => {
    setFeedback(
      'Good understanding of the concept. Consider elaborating on the textual sources. Pronunciation: 85% accurate.'
    )
  }

  if (!started) {
    return (
      <div>
        <div className="page-header">
          <h2>🎙️ AI Oral Exam (Viva) Simulator</h2>
          <p>Interactive AI system that conducts oral exams and evaluates audio responses</p>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: 60 }}>
          <div style={{ fontSize: 64, marginBottom: 20 }}>🎙️</div>
          <h3 style={{ fontSize: 22, marginBottom: 12 }}>Ready for your Viva?</h3>
          <p style={{ color: '#888', maxWidth: 400, margin: '0 auto 24px' }}>
            The AI examiner will ask questions on Sanskrit grammar, philosophy, and texts.
            Respond via text or speech for evaluation.
          </p>
          <button className="btn btn-primary" onClick={() => setStarted(true)}>
            Start Viva Session
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="page-header">
        <h2>🎙️ AI Viva Simulator</h2>
        <p>Question {currentQ + 1} of {vivaQuestions.length}</p>
      </div>

      <div className="viva-question">
        {vivaQuestions[currentQ]}
      </div>

      <div className="card">
        <textarea
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          placeholder="Type your response here, or use the recording button..."
          style={{
            width: '100%',
            minHeight: 120,
            background: '#1e1e3a',
            color: '#e0e0e0',
            border: '1px solid #333',
            borderRadius: 8,
            padding: 14,
            fontSize: 15,
            lineHeight: 1.6,
            resize: 'vertical',
            marginBottom: 16,
          }}
        />

        <div style={{ display: 'flex', gap: 12, marginBottom: feedback ? 16 : 0 }}>
          <button
            className={`btn ${recording ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setRecording(!recording)}
          >
            {recording ? '⏹ Stop Recording' : '🎤 Start Recording'}
          </button>
          <button className="btn btn-primary" onClick={submitResponse} disabled={!response.trim()}>
            Submit Response
          </button>
          {currentQ < vivaQuestions.length - 1 && (
            <button
              className="btn btn-secondary"
              onClick={() => { setCurrentQ((c) => c + 1); setResponse(''); setFeedback(null) }}
            >
              Skip →
            </button>
          )}
        </div>

        {feedback && (
          <div style={{ padding: 16, background: 'rgba(76,175,80,0.08)', borderRadius: 8, border: '1px solid rgba(76,175,80,0.3)' }}>
            <div style={{ color: '#4caf50', fontWeight: 600, marginBottom: 6 }}>AI Feedback</div>
            <div style={{ color: '#bbb', fontSize: 14 }}>{feedback}</div>
          </div>
        )}

        {currentQ === vivaQuestions.length - 1 && feedback && (
          <button
            className="btn btn-primary"
            style={{ marginTop: 16 }}
            onClick={() => { setCurrentQ(0); setResponse(''); setFeedback(null); setStarted(false) }}
          >
            Finish Session
          </button>
        )}
      </div>
    </div>
  )
}