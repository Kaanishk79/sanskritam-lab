import { useEffect, useState, type CSSProperties } from 'react'
import { WORD_PAIRS, DEV_NUMBERS, toDevanagariNumber, SANDHI_PAIRS, type WordPair, type DevNumber, type SandhiPair } from '../../data/games'
import { loadWordPairs, loadDevNumbers, loadSandhiPairs } from '../../services/contentDb'
import { tryJoinSandhi } from '../../services/sanskrit'
import { speakWithFallback } from '../../services/speech'
import { useLanguage } from '../../context/LanguageContext'

const ROUND_SIZE = 6
const NUM_Q = 10
const SANDHI_Q = 8

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

function startWordRound(pairs: WordPair[]): WordPair[] {
  return shuffle(pairs).slice(0, ROUND_SIZE)
}

interface NumQ {
  n: number
  promptIsWord: boolean
  options: number[]
}

function startNumberQuiz(numbers: DevNumber[]): NumQ[] {
  const pool = shuffle(numbers)
  return pool.slice(0, NUM_Q).map((dn, i) => {
    const others = shuffle(numbers.filter((x) => x.n !== dn.n)).slice(0, 3).map((x) => x.n)
    return { n: dn.n, promptIsWord: i % 2 === 0, options: shuffle([dn.n, ...others]) }
  })
}

interface SandhiQ {
  a: string
  b: string
  correct: string
  options: string[]
}

function startSandhiQuiz(pairs: SandhiPair[]): SandhiQ[] {
  const pool = shuffle(pairs).slice(0, SANDHI_Q)
  const allResults = pairs.map((p) => {
    const r = tryJoinSandhi(p.a, p.b)
    return r.ok ? r.result : `${p.a} ${p.b}`
  })
  return pool.map((p) => {
    const r = tryJoinSandhi(p.a, p.b)
    const correct = r.ok ? r.result : `${p.a} ${p.b}`
    const others = shuffle(allResults.filter((x) => x !== correct)).slice(0, 3)
    return { a: p.a, b: p.b, correct, options: shuffle([correct, ...others]) }
  })
}

export default function GamesPage() {
  const { t, lang } = useLanguage()
  const [game, setGame] = useState<'match' | 'numbers' | 'sandhi'>('match')
  const [wordPairs, setWordPairs] = useState<WordPair[]>(WORD_PAIRS)
  const [devNumbers, setDevNumbers] = useState<DevNumber[]>(DEV_NUMBERS)
  const [sandhiPairs, setSandhiPairs] = useState<SandhiPair[]>(SANDHI_PAIRS)

  useEffect(() => {
    loadWordPairs().then((wp) => {
      setWordPairs(wp)
      setPairs(startWordRound(wp))
    })
    loadDevNumbers().then((dn) => {
      setDevNumbers(dn)
      setQuiz(startNumberQuiz(dn))
    })
    loadSandhiPairs().then((sp) => {
      setSandhiPairs(sp)
      setSq(startSandhiQuiz(sp))
    })
  }, [])

  const [pairs, setPairs] = useState<WordPair[]>(() => startWordRound(WORD_PAIRS))
  const [picked, setPicked] = useState<string | null>(null)
  const [matched, setMatched] = useState<Set<string>>(new Set())
  const [errors, setErrors] = useState(0)

  const [quiz, setQuiz] = useState<NumQ[]>(() => startNumberQuiz(DEV_NUMBERS))
  const [qi, setQi] = useState(0)
  const [pickedNum, setPickedNum] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const [sq, setSq] = useState<SandhiQ[]>(() => startSandhiQuiz(SANDHI_PAIRS))
  const [si, setSi] = useState(0)
  const [pickedS, setPickedS] = useState<string | null>(null)
  const [sScore, setSScore] = useState(0)
  const [sDone, setSDone] = useState(false)

  const matchRoundDone = matched.size === pairs.length
  const q = quiz[qi]
  const sqq = sq[si]

  const speak = (text: string) => speakWithFallback(text)

  const resetAll = () => {
    setPairs(startWordRound(wordPairs))
    setPicked(null)
    setMatched(new Set())
    setErrors(0)
    setQuiz(startNumberQuiz(devNumbers))
    setQi(0)
    setPickedNum(null)
    setScore(0)
    setDone(false)
    setSq(startSandhiQuiz(sandhiPairs))
    setSi(0)
    setPickedS(null)
    setSScore(0)
    setSDone(false)
  }

  const tapMatch = (key: string) => {
    if (matchRoundDone) return
    if (matched.has(key)) return
    if (!picked) {
      setPicked(key)
      return
    }
    if (picked === key) {
      setPicked(null)
      return
    }
    const pairA = pairs.find((p) => p.sa === picked)
    const pairB = pairs.find((p) => (lang === 'hi' ? p.hi : p.en) === key)
    const pairC = pairs.find((p) => p.sa === key)
    const pairD = pairs.find((p) => (lang === 'hi' ? p.hi : p.en) === picked)
    const isMatch =
      (pairA && (lang === 'hi' ? pairA.hi : pairA.en) === key) ||
      (pairB && pairB.sa === picked) ||
      (pairC && (lang === 'hi' ? pairC.hi : pairC.en) === picked) ||
      (pairD && pairD.sa === key)
    if (isMatch) {
      setMatched((m) => new Set([...m, picked, key]))
      speak(key)
    } else {
      setErrors((e) => e + 1)
    }
    setPicked(null)
  }

  const tapNumber = (opt: number) => {
    if (pickedNum !== null) return
    setPickedNum(opt)
    if (opt === q.n) setScore((s) => s + 1)
    setTimeout(() => {
      if (qi + 1 >= quiz.length) {
        setDone(true)
      } else {
        setQi(qi + 1)
        setPickedNum(null)
      }
    }, 900)
  }

  const tapSandhi = (opt: string) => {
    if (pickedS !== null) return
    setPickedS(opt)
    if (opt === sqq.correct) setSScore((s) => s + 1)
    setTimeout(() => {
      if (si + 1 >= sq.length) {
        setSDone(true)
      } else {
        setSi(si + 1)
        setPickedS(null)
      }
    }, 1000)
  }

  const cardStyle = (key: string): CSSProperties => {
    const isPicked = picked === key
    const isMatched = matched.has(key)
    return {
      margin: 0,
      padding: '14px 8px',
      textAlign: 'center',
      cursor: matchRoundDone ? 'default' : 'pointer',
      border: isMatched ? '2px solid #2e7d32' : isPicked ? '2px solid #ffd54f' : '2px solid transparent',
      background: isMatched ? 'rgba(46,125,50,0.10)' : isPicked ? 'rgba(255,213,79,0.12)' : 'var(--vt-card)',
      opacity: isMatched ? 0.55 : 1,
      fontSize: 15,
    } as CSSProperties
  }

  return (
    <div>
      <div className="page-header">
        <h2>{t('🎮 Learn Through Games')}</h2>
        <p>{t('Three quick games — match words, master numbers, chase sandhi.')}</p>
      </div>

      <div className="card" style={{ maxWidth: 860, margin: '0 auto', padding: 24 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 18, alignItems: 'center', flexWrap: 'wrap' }}>
          <button className={`btn btn-sm ${game === 'match' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setGame('match')}>{t('🔗 Word Match')}</button>
          <button className={`btn btn-sm ${game === 'numbers' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setGame('numbers')}>{t('🔢 Number Blitz')}</button>
          <button className={`btn btn-sm ${game === 'sandhi' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setGame('sandhi')}>{t('🔊 Sandhi Chase')}</button>
          <span style={{ flex: 1 }} />
          <button className="btn btn-sm btn-secondary" onClick={resetAll}>{t('Restart')}</button>
        </div>

        {game === 'match' && (
          <div>
            <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
              <span className="badge">{t('Matched')}: {matched.size}/{pairs.length * 2}</span>
              <span className="badge">{t('Mistakes')}: {errors}</span>
            </div>
            {matchRoundDone ? (
              <div style={{ textAlign: 'center', padding: 30 }}>
                <p style={{ fontSize: 26, margin: '0 0 8px' }}>{t('🎉 Round complete!')}</p>
                <p>{errors === 0 ? t('Perfect — zero mistakes!') : t('Finished with') + ' ' + errors + ' ' + t('mistakes.')}</p>
                <button className="btn btn-primary" onClick={() => setPairs(startWordRound(wordPairs))}>{t('Next round')}</button>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 10 }}>
                {shuffle([...pairs.map((p) => p.sa), ...pairs.map((p) => (lang === 'hi' ? (p.hi ?? p.en) : p.en))]).map((key) => (
                  <button key={key} className="card" style={cardStyle(key)} onClick={() => tapMatch(key)} disabled={matched.has(key)}>
                    {key}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {game === 'numbers' && (
          <div>
            {!done && q && (
              <div style={{ textAlign: 'center' }}>
                <p style={{ margin: '0 0 6px', fontSize: 13, opacity: 0.7 }}>{t('Question')} {qi + 1} / {quiz.length} · {t('Score')} {score}</p>
                <p style={{ fontSize: 56, margin: '10px 0 4px', color: 'var(--vt-accent)' }}>
                  {q.promptIsWord ? devNumbers.find((dn) => dn.n === q.n)?.word : toDevanagariNumber(q.n)}
                </p>
                <p style={{ fontSize: 14, opacity: 0.6, marginBottom: 18 }}>
                  {q.promptIsWord ? t('What number is this?') : t('Pick the Sanskrit word')}
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 10, maxWidth: 560, margin: '0 auto' }}>
                  {q.options.map((opt) => {
                    const isPick = pickedNum === opt
                    const isCorrect = opt === q.n
                    let style: CSSProperties = { margin: 0 }
                    if (pickedNum !== null) {
                      if (isCorrect) style = { ...style, border: '2px solid #2e7d32', background: 'rgba(46,125,50,0.08)' }
                      else if (isPick) style = { ...style, border: '2px solid #c62828', background: 'rgba(198,40,40,0.08)' }
                      else style = { ...style, opacity: 0.5 }
                    }
                    return (
                      <button key={opt} className="card" style={style} onClick={() => tapNumber(opt)} disabled={pickedNum !== null}>
                        {q.promptIsWord ? <strong style={{ fontSize: 30 }}>{toDevanagariNumber(opt)}</strong> : <strong>{devNumbers.find((dn) => dn.n === opt)?.word}</strong>}
                        <span style={{ display: 'block', fontSize: 12, opacity: 0.6 }}>{devNumbers.find((dn) => dn.n === opt)?.iast}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
            {done && (
              <div style={{ textAlign: 'center', padding: 30 }}>
                <p style={{ fontSize: 26, margin: '0 0 8px' }}>{t('🎯 Quiz done!')}</p>
                <p>{score} / {quiz.length}</p>
                <button className="btn btn-primary" onClick={() => { setQuiz(startNumberQuiz(devNumbers)); setQi(0); setPickedNum(null); setScore(0); setDone(false) }}>{t('Play again')}</button>
              </div>
            )}
          </div>
        )}

        {game === 'sandhi' && (
          <div>
            {!sDone && sqq && (
              <div>
                <p style={{ textAlign: 'center', margin: '0 0 6px', fontSize: 13, opacity: 0.7 }}>{t('Question')} {si + 1} / {sq.length} · {t('Score')} {sScore}</p>
                <div className="card" style={{ padding: 20, marginBottom: 14, textAlign: 'center', background: 'linear-gradient(135deg,#16213e,#1a1a3e)', color: '#fff' }}>
                  <p style={{ margin: 0, fontSize: 24 }}>
                    {sqq.a} + {sqq.b} <span style={{ opacity: 0.6 }}>= ?</span>
                  </p>
                </div>
                <p style={{ fontWeight: 600, margin: '0 0 10px' }}>{t('Choose the joined form')}</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 10 }}>
                  {sqq.options.map((opt) => {
                    const isPick = pickedS === opt
                    const isCorrect = opt === sqq.correct
                    let style: CSSProperties = { margin: 0 }
                    if (pickedS !== null) {
                      if (isCorrect) style = { ...style, border: '2px solid #2e7d32', background: 'rgba(46,125,50,0.08)' }
                      else if (isPick) style = { ...style, border: '2px solid #c62828', background: 'rgba(198,40,40,0.08)' }
                      else style = { ...style, opacity: 0.5 }
                    }
                    return (
                      <button key={opt} className="card" style={style} onClick={() => tapSandhi(opt)} disabled={pickedS !== null}>
                        <strong>{opt}</strong>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
            {sDone && (
              <div style={{ textAlign: 'center', padding: 30 }}>
                <p style={{ fontSize: 26, margin: '0 0 8px' }}>{t('🔊 Chase complete!')}</p>
                <p>{sScore} / {sq.length}</p>
                <button className="btn btn-primary" onClick={() => { setSq(startSandhiQuiz(sandhiPairs)); setSi(0); setPickedS(null); setSScore(0); setSDone(false) }}>{t('Play again')}</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}