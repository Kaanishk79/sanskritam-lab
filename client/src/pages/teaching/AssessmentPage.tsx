import { useEffect, useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { supabase } from '../../services/supabase'
import { getAuthState } from '../../services/auth'

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
  const [answers, setAnswers] = useState<{ selected: number; correct: boolean }[]>([])
  const [attempts, setAttempts] = useState<{ id: string; lesson_id: string; score: number; max_score: number; created_at: string }[]>([])
  const { t } = useLanguage()

  const q = sampleQuestions[currentQ]

  const handleAnswer = (idx: number) => {
    if (selected !== null) return
    setSelected(idx)
    setAnswers((prev) => [...prev, { selected: idx, correct: idx === q.correctIdx }])
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

  useEffect(() => {
    const user = getAuthState().user
    if (!user) return
    let live = true
    supabase
      .from('assessment_attempts')
      .select('id, lesson_id, score, max_score, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10)
      .then(({ data, error }) => {
        if (live && !error && data && data.length > 0) setAttempts(data)
      }, () => undefined)
    return () => {
      live = false
    }
  }, [])

  useEffect(() => {
    if (!finished) return
    const user = getAuthState().user
    if (!user) return
    supabase
      .from('assessment_attempts')
      .insert({ user_id: user.id, lesson_id: 'sample-grammar-quiz', score, max_score: sampleQuestions.length, answers, time_spent_sec: 0 })
      .then(() => {
        const u = getAuthState().user
        if (!u) return
        return supabase
          .from('assessment_attempts')
          .select('id, lesson_id, score, max_score, created_at')
          .eq('user_id', u.id)
          .order('created_at', { ascending: false })
          .limit(10)
          .then(({ data, error }) => {
            if (!error && data && data.length > 0) setAttempts(data)
          }, () => undefined)
      }, () => undefined)
  }, [finished, score, answers])

  const pastAttempts = attempts.length > 0 && (
    <div className="card" style={{ marginTop: 16 }}>
      <h3 style={{ marginTop: 0, marginBottom: 12 }}>🕘 {t('Past attempts')}</h3>
      <div className="text-list">
        {attempts.map((a) => (
          <div key={a.id} className="text-item">
            <div>
              <div className="text-title">{a.lesson_id}</div>
              <div className="text-meta">
                {a.score}/{a.max_score} · {new Date(a.created_at).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  if (finished) {
    return (
      <div>
        <div className="page-header">
          <h2>📝 {t('Assessment Engine')}</h2>
          <p>{t('Auto-generated drills for declensions, sandhi exercises, and timed practice quizzes')}</p>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
          <h3 style={{ fontSize: 24, marginBottom: 8 }}>{t('Assessment Complete!')}</h3>
          <div style={{ fontSize: 48, fontWeight: 700, color: 'var(--sanskrit-gold)', margin: '16px 0' }}>
            {score}/{sampleQuestions.length}
          </div>
          <p style={{ color: '#888' }}>
            {score === sampleQuestions.length ? t('Perfect score! Excellent Sanskrit knowledge!') : t('Review the explanations and try again.')}
          </p>
          <button
            className="btn btn-primary"
            style={{ marginTop: 20 }}
            onClick={() => { setCurrentQ(0); setSelected(null); setScore(0); setFinished(false); setAnswers([]) }}
          >
            {t('Retry')}
          </button>
        </div>
        {pastAttempts}
      </div>
    )
  }

  return (
    <div>
      <div className="page-header">
        <h2>📝 {t('Assessment Engine')}</h2>
        <p>{t('Auto-generated drills for declensions, sandhi exercises, and timed practice quizzes')}</p>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
          <span style={{ color: '#888', fontSize: 13 }}>
            {t('Question')} {currentQ + 1} {t('of')} {sampleQuestions.length}
          </span>
          <span className="badge" style={{ background: 'var(--sanskrit-card)', color: 'var(--sanskrit-gold)' }}>
            {t('Score:')} {score}
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
              {selected === q.correctIdx ? '✓ ' + t('Correct!') : '✗ ' + t('Incorrect')}
            </div>
            <div style={{ color: '#aaa', fontSize: 14 }}>{q.explanation}</div>
          </div>
        )}

        {selected !== null && (
          <button className="btn btn-primary" onClick={next}>
            {currentQ < sampleQuestions.length - 1 ? t('Next Question →') : t('See Results')}
          </button>
        )}
      </div>
      {pastAttempts}
    </div>
  )
}