import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { useState, useMemo, useRef, useEffect } from 'react'
import { lessons, lessonHi } from '../../data/lessons'
import { useProgress } from '../../hooks/useProgress'
import { useKeyboard } from '../../context/KeyboardContext'
import { useLanguage } from '../../context/LanguageContext'

function QuizInput({ onReady }: { onReady: (ref: React.RefObject<HTMLInputElement | null>) => void }) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { t } = useLanguage()
  useEffect(() => {
    onReady(inputRef as React.RefObject<HTMLInputElement | null>)
  }, [])
  return (
    <input
      ref={inputRef}
      placeholder={t('Type your answer in देवनागरी...')}
      style={{
        marginTop: 8, width: '100%', padding: '10px 12px',
        background: '#1e1e3a', color: '#e0e0e0',
        border: '1px solid #444', borderRadius: 6,
        fontFamily: "'Noto Sans Devanagari', sans-serif", fontSize: 16,
      }}
    />
  )
}

export default function LessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>()
  const navigate = useNavigate()
  const { completeLesson } = useProgress()
  const { openKeyboard } = useKeyboard()
  const { t, lang } = useLanguage()
  const [searchParams] = useSearchParams()

  const lesson = lessons.find((l) => l.id === lessonId)

  const [sectionIdx, setSectionIdx] = useState(0)
  const [quizActive, setQuizActive] = useState(searchParams.has('quiz'))
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({})
  const [quizDone, setQuizDone] = useState(false)

  const quizScore = useMemo(() => {
    if (!quizDone || !lesson) return 0
    const correct = lesson.quiz.filter((q) => quizAnswers[q.id] === q.correctIndex).length
    return lesson.quiz.length > 0 ? correct / lesson.quiz.length : 0
  }, [quizDone, quizAnswers, lesson])

  if (!lesson) {
    return (
      <div className="empty-state">
        <span className="empty-icon">📖</span>
        <p>{t('Lesson not found')}</p>
        <button className="btn btn-secondary" onClick={() => navigate('/learning/tree')}>{t('Back to Learning Path')}</button>
      </div>
    )
  }

  const section = lesson.content.sections[sectionIdx]
  const isLastSection = sectionIdx === lesson.content.sections.length - 1

  const handleAnswer = (qId: string, idx: number) => {
    setQuizAnswers((prev) => ({ ...prev, [qId]: idx }))
  }

  const submitQuiz = () => {
    setQuizDone(true)
    completeLesson(lesson.id, quizScore, lesson.quiz[0]?.difficulty ?? 1)
  }

  const progressPct = quizDone
    ? 100
    : Math.round(((sectionIdx + 1) / lesson.content.sections.length) * 60)

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <button className="btn btn-secondary" onClick={() => navigate('/learning/tree')}>← {t('Back')}</button>
          <span style={{ fontSize: 13, color: '#888' }}>{lang === 'hi' && lessonHi[lesson.id]?.durationHi ? lessonHi[lesson.id].durationHi : lesson.duration} · {t('Level')} {lesson.level}</span>
        </div>
        <h2 style={{ fontSize: 24, color: '#f0f0f0', marginBottom: 4 }}>{lesson.title}</h2>
        <p style={{ color: '#888', fontSize: 14 }}>{lang === 'hi' && lessonHi[lesson.id]?.subtitleHi ? lessonHi[lesson.id].subtitleHi : lesson.subtitle}</p>
        <div style={{ width: '100%', height: 4, background: '#1e1e3a', borderRadius: 2, marginTop: 8 }}>
          <div style={{ width: `${progressPct}%`, height: '100%', background: 'var(--sanskrit-gold)', borderRadius: 2, transition: 'width 0.3s' }} />
        </div>
      </div>

      {!quizActive ? (
        <div>
          {sectionIdx === 0 && (
            <div className="card" style={{ marginBottom: 20, background: 'linear-gradient(135deg, #16213e, #1a1a3e)' }}>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: '#d0d0d0' }}>{lesson.content.introduction}</p>
            </div>
          )}

          <div className="card" style={{ marginBottom: 20 }}>
            <h3 style={{ marginBottom: 12, fontSize: 18 }}>{section.heading}</h3>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: '#bbb', whiteSpace: 'pre-line' }}>{section.body}</p>
            {section.devanagari && (
              <div style={{
                marginTop: 16, padding: 20,
                background: 'rgba(0,0,0,0.2)', borderRadius: 8,
                fontFamily: "'Noto Sans Devanagari', serif",
                fontSize: 28, lineHeight: 1.8,
                textAlign: 'center',
                color: '#f0f0f0',
              }}>
                {section.devanagari}
              </div>
            )}
            {section.transliteration && (
              <div style={{ marginTop: 8, fontSize: 14, color: '#888', textAlign: 'center' }}>
                {section.transliteration}
              </div>
            )}
            {section.examples && (
              <div style={{ marginTop: 16 }}>
                <div style={{ fontSize: 13, color: '#888', marginBottom: 8 }}>{t('Examples:')}</div>
                {section.examples.map((ex, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #1e1e3a', fontSize: 14 }}>
                    <span style={{ fontFamily: "'Noto Sans Devanagari', serif" }}>{ex.text}</span>
                    <span style={{ color: '#888' }}>{ex.meaning}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'space-between' }}>
            <div>
              {sectionIdx > 0 && (
                <button className="btn btn-secondary" onClick={() => setSectionIdx((s) => s - 1)}>
                  ← {t('Previous')}
                </button>
              )}
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              {isLastSection ? (
                <button className="btn btn-primary" onClick={() => setQuizActive(true)}>
                  {t('Take Quiz')} →
                </button>
              ) : (
                <button className="btn btn-primary" onClick={() => setSectionIdx((s) => s + 1)}>
                  {t('Next Section')} →
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="card">
          <h3 style={{ marginBottom: 16 }}>
            {quizDone ? t('Quiz Results') : t('Quiz — ') + lesson.quiz.length + t(' questions')}
          </h3>

          {lesson.quiz.map((q, qi) => {
            const answer = quizAnswers[q.id]
            return (
              <div key={q.id} style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 15, marginBottom: 10, color: '#e0e0e0' }}>
                  {qi + 1}. {q.prompt}
                </div>
                {q.options.map((opt, oi) => {
                  let bg = '#1e1e3a'
                  if (quizDone) {
                    if (oi === q.correctIndex) bg = 'rgba(76,175,80,0.15)'
                    else if (oi === answer && oi !== q.correctIndex) bg = 'rgba(244,67,54,0.15)'
                  } else if (answer === oi) {
                    bg = 'rgba(201,168,76,0.15)'
                  }
                  return (
                    <button
                      key={oi}
                      className="assessment-option"
                      style={{ background: bg }}
                      onClick={() => !quizDone && handleAnswer(q.id, oi)}
                      disabled={quizDone}
                    >
                      {opt}
                      {quizDone && oi === q.correctIndex && ' ✓'}
                      {quizDone && oi === answer && oi !== q.correctIndex && ' ✗'}
                    </button>
                  )
                })}
                {!quizDone && searchParams.has('quiz') && (
                  <QuizInput onReady={(ref) => { if (qi === 0) openKeyboard(ref) }} />
                )}
                {quizDone && (
                  <div style={{ fontSize: 13, color: '#888', marginTop: 6, padding: '8px 12px', background: 'rgba(0,0,0,0.2)', borderRadius: 6 }}>
                    {q.explanation}
                  </div>
                )}
              </div>
            )
          })}

          {!quizDone && (
            <button className="btn btn-primary" onClick={submitQuiz}>
              {t('Submit Answers')}
            </button>
          )}

          {quizDone && (
            <div style={{ marginTop: 20, padding: 20, background: 'rgba(0,0,0,0.2)', borderRadius: 8, textAlign: 'center' }}>
              <div style={{ fontSize: 14, color: '#888', marginBottom: 4 }}>{t('Score')}</div>
              <div style={{ fontSize: 36, fontWeight: 700, color: 'var(--sanskrit-gold)' }}>
                {Math.round(quizScore * 100)}%
              </div>
              <div style={{ fontSize: 13, color: '#888', marginTop: 8 }}>
                +{Math.round(quizScore * 10 * (1 + (lesson.quiz[0]?.difficulty ?? 1) * 0.5))}{t(' XP earned')}
              </div>
              <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => navigate('/learning/tree')}>
                {t('Back to Learning Path')}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}