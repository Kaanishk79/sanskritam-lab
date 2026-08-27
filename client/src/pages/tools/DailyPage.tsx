import { useState, useEffect } from 'react'
import { wordOfDay, phraseOfDay, verseOfDay, DAILY_CHALLENGE_QUESTIONS, type ChallengeQuestion } from '../../services/sanskrit'
import { speakWithFallback } from '../../services/speech'
import { useLanguage } from '../../context/LanguageContext'
import { supabase } from '../../services/supabase'
import { useRole } from '../../context/RoleContext'

export default function DailyPage() {
  const { t, lang } = useLanguage()
  const { user } = useRole()
  const [wod, setWod] = useState<{ word: string; meanings: string[]; iast: string } | null>(null)
  const phrase = phraseOfDay()
  const verse = verseOfDay()
  const [questions, setQuestions] = useState<ChallengeQuestion[]>([])
  const [idx, setIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState<number | null>(null)
  const [done, setDone] = useState(false)

  useEffect(() => {
    wordOfDay().then(setWod)
    const qs = [...DAILY_CHALLENGE_QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 5)
    setQuestions(qs)
  }, [])

  const answer = (i: number) => {
    if (answered !== null) return
    setAnswered(i)
    if (i === questions[idx].correct) {
      const ns = score + 1
      setScore(ns)
      if (user?.id) {
        supabase
          .from('user_scores')
          .select('total_points')
          .eq('user_id', user.id)
          .single()
          .then(({ data }) => {
            const cur = (data as any)?.total_points ?? 0
            supabase.from('user_scores').upsert({ user_id: user.id, total_points: cur + 10 })
          })
      }
    }
  }

  const next = () => {
    if (idx + 1 >= questions.length) { setDone(true); return }
    setIdx(idx + 1)
    setAnswered(null)
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>🌅 {t('Daily Sanskrit')}</h1>
        <p>{t('A word, a phrase, a verse — and a 5-minute challenge. Every day.')}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ marginTop: 0 }}>📖 {t('Word of the Day')}</h3>
          {wod ? (
            <>
              <div style={{ fontSize: 34 }}>{wod.word}</div>
              <div style={{ color: '#999', margin: '4px 0' }}>{wod.iast}</div>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {wod.meanings.map((m, i) => <li key={i}>{m}</li>)}
              </ul>
              <button className="btn btn-sm btn-outline" style={{ marginTop: 10 }} onClick={() => speakWithFallback(wod.word)}>🔊 {t('Hear it')}</button>
            </>
          ) : <p style={{ color: '#888' }}>⏳…</p>}
        </div>

        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ marginTop: 0 }}>💬 {t('Phrase of the Day')}</h3>
          <div style={{ fontSize: 24 }}>{phrase.dev}</div>
          <div style={{ color: '#999', margin: '4px 0' }}>{phrase.iast}</div>
          <div style={{ color: '#ccc' }}>{phrase.meaning}</div>
          <button className="btn btn-sm btn-outline" style={{ marginTop: 10 }} onClick={() => speakWithFallback(phrase.dev)}>🔊 {t('Hear it')}</button>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ marginTop: 0 }}>🪔 {t('Verse of the Day')}</h3>
          <div style={{ fontSize: 20, lineHeight: 1.8 }}>{verse.dev}</div>
          <div style={{ color: '#999', margin: '4px 0', fontSize: 13 }}>{verse.iast}</div>
          <div style={{ color: '#ccc', fontSize: 14 }}>{verse.translation}</div>
          <div style={{ color: '#888', fontSize: 12, marginTop: 6 }}>{verse.source}</div>
          <button className="btn btn-sm btn-outline" style={{ marginTop: 10 }} onClick={() => speakWithFallback(verse.dev)}>🔊 {t('Hear it')}</button>
        </div>
      </div>

      <div className="card" style={{ padding: 24, marginTop: 16, maxWidth: 640 }}>
        <h3 style={{ marginTop: 0 }}>⚡ {t('5-Minute Daily Challenge')}</h3>
        {questions.length === 0 ? (
          <p style={{ color: '#888' }}>⏳…</p>
        ) : done ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 44 }}>{score >= 4 ? '🏆' : score >= 3 ? '🎉' : '💪'}</div>
            <h3>{t('You scored')} {score}/{questions.length}</h3>
            <p style={{ color: '#888' }}>{score >= 4 ? t('Outstanding! Come back tomorrow for the next challenge.') : score >= 3 ? t("Good job — one more try and it's perfect.") : t('Practice makes perfect. Try again!')}</p>
            <button className="btn btn-primary" onClick={() => { setDone(false); setIdx(0); setScore(0); setAnswered(null); const qs = [...DAILY_CHALLENGE_QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 5); setQuestions(qs) }}>{t('Play again')}</button>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#888', fontSize: 13, marginBottom: 8 }}>
              <span>{t('Question')} {idx + 1}/{questions.length}</span>
              <span>{t('Score')}: {score}</span>
            </div>
            <div className="progress-track"><div className="progress-fill" style={{ width: `${((idx + (answered !== null ? 1 : 0)) / questions.length) * 100}%` }} /></div>
            <p style={{ fontSize: 17, fontWeight: 600 }}>{lang === 'hi' ? questions[idx].promptHi : questions[idx].prompt}</p>
            {(lang === 'hi' ? questions[idx].optionsHi : questions[idx].options).map((opt, i) => {
              let cls = 'btn btn-outline challenge-opt'
              if (answered !== null) {
                if (i === questions[idx].correct) cls += ' opt-correct'
                else if (i === answered) cls += ' opt-wrong'
                else cls += ' opt-dim'
              }
              return (
                <button key={i} className={cls} style={{ display: 'block', width: '100%', marginBottom: 8, textAlign: 'left' }} onClick={() => answer(i)}>
                  {opt}
                </button>
              )
            })}
            {answered !== null && (
              <div style={{ marginTop: 12 }}>
                <p style={{ color: '#aaa', fontSize: 13 }}>💡 {lang === 'hi' ? questions[idx].explanationHi : questions[idx].explanation}</p>
                <button className="btn btn-primary" onClick={next}>{idx + 1 >= questions.length ? t('See results') : t('Next question')}</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
