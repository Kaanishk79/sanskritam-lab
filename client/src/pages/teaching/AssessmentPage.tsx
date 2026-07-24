import { useState } from 'react'

interface Question {
  prompt: string
  options: string[]
  correctIdx: number
  explanation: string
}

const sampleQuestions: Question[] = [
  {
    prompt: 'What is the correct form of राम (Rama) in instrumental singular?',
    options: ['रामेण', 'रामाय', 'रामात्', 'रामस्य'],
    correctIdx: 0,
    explanation: 'Instrumental singular of राम is रामेण (rāmeṇa).',
  },
  {
    prompt: 'Which sandhi rule applies to अग्नि + इव?',
    options: ['गुणः (i + i → e)', 'वृद्धिः (a + ā → ā)', 'यण् (i + a → ya)', 'अयादि (e + a → ay)'],
    correctIdx: 0,
    explanation: 'इ + इ → ए by गुण sandhi: अग्नि + इव → अग्निरिव.',
  },
  {
    prompt: 'What is the dative singular of फल (phala, neuter)?',
    options: ['फलाय', 'फलेन', 'फलात्', 'फलस्य'],
    correctIdx: 0,
    explanation: 'Dative singular of neuter फल is फलाय (phalāya).',
  },
]

export default function AssessmentPage() {
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const q = sampleQuestions[currentQ]

  const handleAnswer = (idx: number) => {
    if (selected !== null) return
    setSelected(idx)
    if (idx === q.correctIdx) setScore((s) => s + 1)
  }

  const next = () => {
    if (currentQ < sampleQuestions.length - 1) {
      setCurrentQ((c) => c + 1)
      setSelected(null)
    } else {
      setFinished(true)
    }
  }

  if (finished) {
    return (
      <div>
        <div className="page-header">
          <h2>📝 Assessment Engine</h2>
          <p>Auto-generated drills for declensions, sandhi exercises, and timed practice quizzes</p>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
          <h3 style={{ fontSize: 24, marginBottom: 8 }}>Assessment Complete!</h3>
          <div style={{ fontSize: 48, fontWeight: 700, color: 'var(--sanskrit-gold)', margin: '16px 0' }}>
            {score}/{sampleQuestions.length}
          </div>
          <p style={{ color: '#888' }}>
            {score === sampleQuestions.length ? 'Perfect score! Excellent Sanskrit knowledge!' : 'Review the explanations and try again.'}
          </p>
          <button
            className="btn btn-primary"
            style={{ marginTop: 20 }}
            onClick={() => { setCurrentQ(0); setSelected(null); setScore(0); setFinished(false) }}
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="page-header">
        <h2>📝 Assessment Engine</h2>
        <p>Auto-generated drills for declensions, sandhi exercises, and timed practice quizzes</p>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
          <span style={{ color: '#888', fontSize: 13 }}>
            Question {currentQ + 1} of {sampleQuestions.length}
          </span>
          <span className="badge" style={{ background: 'var(--sanskrit-card)', color: 'var(--sanskrit-gold)' }}>
            Score: {score}
          </span>
        </div>

        <h3 style={{ fontSize: 18, marginBottom: 20, lineHeight: 1.5 }}>{q.prompt}</h3>

        <div style={{ marginBottom: 20 }}>
          {q.options.map((opt, idx) => (
            <button
              key={idx}
              className={`assessment-option${
                selected !== null && idx === q.correctIdx ? ' correct' : ''
              }${selected === idx && idx !== q.correctIdx ? ' wrong' : ''}`}
              onClick={() => handleAnswer(idx)}
              disabled={selected !== null}
            >
              {opt}
            </button>
          ))}
        </div>

        {selected !== null && (
          <div style={{ padding: 16, background: 'rgba(0,0,0,0.2)', borderRadius: 8, marginBottom: 20 }}>
            <div style={{ color: selected === q.correctIdx ? '#4caf50' : '#f44336', fontWeight: 600, marginBottom: 8 }}>
              {selected === q.correctIdx ? '✓ Correct!' : '✗ Incorrect'}
            </div>
            <div style={{ color: '#aaa', fontSize: 14 }}>{q.explanation}</div>
          </div>
        )}

        {selected !== null && (
          <button className="btn btn-primary" onClick={next}>
            {currentQ < sampleQuestions.length - 1 ? 'Next Question →' : 'See Results'}
          </button>
        )}
      </div>
    </div>
  )
}