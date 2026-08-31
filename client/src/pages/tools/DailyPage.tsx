import { useState, useEffect } from 'react'
import {
  BookOpen, MessageSquareQuote, Flame, Zap, Volume2,
  Trophy, RotateCcw
} from 'lucide-react'
import { wordOfDay, phraseOfDay, verseOfDay, DAILY_CHALLENGE_QUESTIONS, type ChallengeQuestion } from '../../services/sanskrit'
import { speakWithFallback } from '../../services/speech'
import { useLanguage } from '../../context/LanguageContext'
import { supabase } from '../../services/supabase'
import { useRole } from '../../context/RoleContext'

export default function DailyPage() {
  const { t, lang } = useLanguage()
  const { user } = useRole()
  const [wod, setWod] = useState<{ word: string; meanings: string[]; meaningsHi: string[]; iast: string } | null>(null)
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
    <div className="page-container">
      <div className="page-header">
        <h2>{t('Daily Sanskrit')}</h2>
        <p>{t('A word, a phrase, a verse — and a 5-minute challenge. Every day.')}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
            <BookOpen size={18} color="var(--vt-orange)" /> <span>{t('Word of the Day')}</span>
          </h3>
          {wod ? (
            <>
              <div style={{ fontSize: 32, fontWeight: 700 }}>{wod.word}</div>
              <div style={{ color: '#999', margin: '4px 0' }}>{wod.iast}</div>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {(wod.meaningsHi.length && lang === 'hi' ? wod.meaningsHi : wod.meanings).map((m, i) => <li key={i}>{m}</li>)}
              </ul>
              <button className="btn btn-sm btn-outline" style={{ marginTop: 12, display: 'inline-flex', alignItems: 'center', gap: 6 }} onClick={() => speakWithFallback(wod.word)}>
                <Volume2 size={14} /> <span>{t('Hear it')}</span>
              </button>
            </>
          ) : <p style={{ color: '#888' }}>{t('Loading…')}</p>}
        </div>

        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
            <MessageSquareQuote size={18} color="var(--vt-gold)" /> <span>{t('Phrase of the Day')}</span>
          </h3>
          <div style={{ fontSize: 22, fontWeight: 600 }}>{phrase.dev}</div>
          <div style={{ color: '#999', margin: '4px 0' }}>{phrase.iast}</div>
          <div style={{ color: '#ccc' }}>{lang === 'hi' ? phrase.meaningHi || phrase.meaning : phrase.meaning}</div>
          <button className="btn btn-sm btn-outline" style={{ marginTop: 12, display: 'inline-flex', alignItems: 'center', gap: 6 }} onClick={() => speakWithFallback(phrase.dev)}>
            <Volume2 size={14} /> <span>{t('Hear it')}</span>
          </button>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Flame size={18} color="#e74c3c" /> <span>{t('Verse of the Day')}</span>
          </h3>
          <div style={{ fontSize: 18, lineHeight: 1.7 }}>{verse.dev}</div>
          <div style={{ color: '#999', margin: '4px 0', fontSize: 13 }}>{verse.iast}</div>
          <div style={{ color: '#ccc', fontSize: 14 }}>{lang === 'hi' ? verse.translationHi || verse.translation : verse.translation}</div>
          <div style={{ color: '#888', fontSize: 12, marginTop: 6 }}>{lang === 'hi' ? verse.sourceHi || verse.source : verse.source}</div>
          <button className="btn btn-sm btn-outline" style={{ marginTop: 12, display: 'inline-flex', alignItems: 'center', gap: 6 }} onClick={() => speakWithFallback(verse.dev)}>
            <Volume2 size={14} /> <span>{t('Hear it')}</span>
          </button>
        </div>
      </div>

      <div className="card" style={{ padding: 24, marginTop: 20, maxWidth: 640 }}>
        <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Zap size={18} color="#f1c40f" /> <span>{t('5-Minute Daily Challenge')}</span>
        </h3>
        {questions.length === 0 ? (
          <p style={{ color: '#888' }}>{t('Loading…')}</p>
        ) : done ? (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div style={{ display: 'inline-flex', justifyContent: 'center', marginBottom: 12 }}>
              <Trophy size={48} color={score >= 4 ? '#f1c40f' : score >= 3 ? '#2ecc71' : 'var(--vt-orange)'} />
            </div>
            <h3>{t('You scored')} {score}/{questions.length}</h3>
            <p style={{ color: '#888' }}>{score >= 4 ? t('Outstanding! Come back tomorrow for the next challenge.') : score >= 3 ? t("Good job — one more try and it's perfect.") : t('Practice makes perfect. Try again!')}</p>
            <button className="btn btn-primary" onClick={() => { setDone(false); setIdx(0); setScore(0); setAnswered(null); const qs = [...DAILY_CHALLENGE_QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 5); setQuestions(qs) }}>
              <RotateCcw size={15} /> <span>{t('Play again')}</span>
            </button>
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
              <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 13, color: '#888' }}>{questions[idx].explanation}</span>
                <button className="btn btn-primary btn-sm" onClick={next}>
                  {idx + 1 < questions.length ? <span>{t('Next')}</span> : <span>{t('See Results')}</span>}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
