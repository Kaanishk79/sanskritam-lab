import { useEffect, useMemo, useState } from 'react'
import { anytimeTestQuestions, TEST_PASS_THRESHOLD, TEST_TIME_SECONDS } from '../../data/jeopardyTest'
import { syncTestBestFromDb, persistTestBestToDb } from '../../services/userDb'
import { useLanguage } from '../../context/LanguageContext'
import JeopardyHeader from '../../components/jeopardy/JeopardyHeader'
import '../tools/jeopardy.css'

type TestPhase = 'intro' | 'quiz' | 'done'

export default function JeopardyTestPage() {
  const { t } = useLanguage()
  const [phase, setPhase] = useState<TestPhase>('intro')
  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [timeLeft, setTimeLeft] = useState(TEST_TIME_SECONDS)
  const [best, setBest] = useState<number>(() => {
    try { return Number(localStorage.getItem('sanskrit-jeopardy-test-best') ?? 0) } catch { return 0 }
  })

  const startTest = () => {
    setPhase('quiz')
    setIdx(0)
    setAnswers({})
    setTimeLeft(TEST_TIME_SECONDS)
  }

  useEffect(() => {
    syncTestBestFromDb().then((b) => {
      if (b === null) return
      setBest((cur) => {
        if (b > cur) {
          try { localStorage.setItem('sanskrit-jeopardy-test-best', String(b)) } catch { /* ignore */ }
          return b
        }
        return cur
      })
    })
  }, [])

  useEffect(() => {
    if (phase !== 'quiz') return
    if (timeLeft <= 0) {
      setPhase('done')
      return
    }
    const id = setInterval(() => setTimeLeft((s) => s - 1), 1000)
    return () => clearInterval(id)
  }, [phase, timeLeft])

  const question = anytimeTestQuestions[idx]
  const answeredCount = Object.keys(answers).length

  const choose = (opt: number) => {
    setAnswers((a) => ({ ...a, [question.id]: opt }))
  }

  const next = () => {
    if (idx + 1 >= anytimeTestQuestions.length) {
      setPhase('done')
    } else {
      setIdx(idx + 1)
    }
  }

  const prev = () => setIdx(Math.max(0, idx - 1))

  const results = useMemo(() => {
    let correct = 0
    const byCategory: Record<string, { c: number; t: number }> = {}
    for (const q of anytimeTestQuestions) {
      byCategory[q.category] = byCategory[q.category] ?? { c: 0, t: 0 }
      byCategory[q.category].t += 1
      if (answers[q.id] === q.correct) {
        correct += 1
        byCategory[q.category].c += 1
      }
    }
    return { correct, byCategory }
  }, [answers])

  useEffect(() => {
    if (phase === 'done' && results.correct > best) {
      setBest(results.correct)
      try { localStorage.setItem('sanskrit-jeopardy-test-best', String(results.correct)) } catch { /* ignore */ }
      persistTestBestToDb(results.correct)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  const mm = Math.floor(timeLeft / 60)
  const ss = String(timeLeft % 60).padStart(2, '0')
  const minutesTotal = TEST_TIME_SECONDS / 60
  const passed = results.correct >= TEST_PASS_THRESHOLD
  const answered = Math.max(1, answeredCount)
  const progress = Math.round((answered / anytimeTestQuestions.length) * 100)

  return (
    <div>
      <JeopardyHeader />
      <div className="page-header">
        <h2>{t('⏱️ Anytime Test')}</h2>
        <p>{t('The official-style qualifying test — 30 questions, {0} minutes, pass at {1}+').replace('{0}', String(minutesTotal)).replace('{1}', String(TEST_PASS_THRESHOLD))}</p>
      </div>

      {phase === 'intro' && (
        <div className="j-intro-card">
          <h3>{t('Welcome to the Anytime Test')}</h3>
          <ul>
            <li>{t('30 multiple-choice questions')}</li>
            <li>{t('10-minute time limit')}</li>
            <li>{t('Pass mark: 21 of 30 (70%)')}</li>
            <li>{t('Coverage: alphabet, grammar, sandhi, texts, philosophy, culture')}</li>
          </ul>
          <p className="j-best">{t('Your best score')}: <strong>{best}</strong> / 30</p>
          <button className="btn btn-primary btn-lg" onClick={startTest}>{t('Start the Test')}</button>
        </div>
      )}

      {phase === 'quiz' && (
        <div>
          <div className="j-test-progress">
            <span className="j-stat j-score">{t('Question {0} of {1}').replace('{0}', String(idx + 1)).replace('{1}', String(anytimeTestQuestions.length))}</span>
            <span className={`j-stat ${timeLeft <= 60 ? 'j-timer-danger' : ''}`}>{t('Time Left')}: {mm}:{ss}</span>
            <div className="j-progress-bar"><div className="j-progress-fill" style={{ width: `${progress}%` }} /></div>
          </div>
          <div className="j-test-card">
            <span className="j-test-cat">{question.category}</span>
            <h3>{question.prompt}</h3>
            <div className="j-test-options">
              {question.options.map((opt, i) => {
                const chosen = answers[question.id] === i
                return (
                  <button
                    key={i}
                    className={`j-test-opt${chosen ? ' chosen' : ''}`}
                    onClick={() => choose(i)}
                  >
                    <span className="j-opt-letter">{['क', 'ख', 'ग', 'घ'][i]}</span>
                    {opt}
                  </button>
                )
              })}
            </div>
            <div className="j-test-nav">
              <button className="btn btn-sm btn-secondary" onClick={prev} disabled={idx === 0}>{t('← Prev')}</button>
              {answeredCount === anytimeTestQuestions.length && idx === anytimeTestQuestions.length - 1 ? (
                <button className="btn btn-primary" onClick={next}>{t('Finish')}</button>
              ) : (
                <button className="btn btn-primary" onClick={next} disabled={!(question.id in answers)}>{t('Next →')}</button>
              )}
            </div>
            <p className="j-test-counter">{t('Answered')}: {answeredCount} / {anytimeTestQuestions.length}</p>
          </div>
        </div>
      )}

      {phase === 'done' && (
        <div className="j-result-card">
          <h3>{passed ? t('🎉 You passed the Anytime Test!') : t('Not yet — review and try again!')}</h3>
          <div className={`j-result-score ${passed ? 'pass' : 'fail'}`}>
            {results.correct} / {anytimeTestQuestions.length}
          </div>
          <p>{t('Pass mark: {0}').replace('{0}', String(TEST_PASS_THRESHOLD))}</p>
          <div className="j-result-cats">
            {Object.entries(results.byCategory).map(([cat, v]) => (
              <div className="j-result-cat" key={cat}>
                <span>{cat}</span>
                <span className="j-result-frac">{v.c}/{v.t}</span>
              </div>
            ))}
          </div>
          <p className="j-best">{t('Your best score')}: <strong>{best}</strong> / 30</p>
          <div className="j-test-nav">
            <button className="btn btn-primary" onClick={startTest}>{t('Retake Test')}</button>
          </div>
        </div>
      )}
    </div>
  )
}
