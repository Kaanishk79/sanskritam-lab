import { useEffect, useMemo, useState } from 'react'
import { SENTENCES, type Sentence } from '../../data/sentenceBuilder'
import { toDevanagari } from '../../services/sanskrit'
import { useLanguage } from '../../context/LanguageContext'

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const LEVELS: { id: Sentence['level']; label: string }[] = [
  { id: 'easy', label: '🟢 Easy' },
  { id: 'medium', label: '🟡 Medium' },
  { id: 'hard', label: '🔴 Hard' },
]

export default function SentenceBuilderPage() {
  const { t } = useLanguage()
  const [level, setLevel] = useState<Sentence['level'] | 'all'>('all')
  const [idx, setIdx] = useState(0)
  const [picked, setPicked] = useState<string[]>([])
  const [checking, setChecking] = useState(false)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const [iastMode, setIastMode] = useState(false)
  const [deck, setDeck] = useState<string[]>([])

  const pool = useMemo(
    () => SENTENCES.filter((s) => level === 'all' || s.level === level),
    [level],
  )
  const sentence = pool[idx % pool.length]
  const target = sentence.words.map((w) => w.sa).join(' ')

  useEffect(() => {
    setDeck(shuffle(sentence.words.map((w) => w.sa)))
    setPicked([])
    setChecking(false)
    setDone(false)
  }, [sentence.id])

  const next = (move: number) => {
    setIdx((idx + move + pool.length) % pool.length)
  }

  const tap = (w: string) => {
    if (done || checking) return
    const remaining = deck.filter((d) => picked.filter((p) => p === d).length < deck.filter((dd) => dd === d).length)
    if (!remaining.includes(w)) return
    setPicked((p) => [...p, w])
  }

  const remove = (i: number) => {
    setPicked((p) => p.filter((_, j) => j !== i))
  }

  const check = () => {
    setChecking(true)
    const ok = picked.join(' ') === target
    if (ok) setScore((s) => s + 1)
    setDone(true)
  }

  const resetAll = () => {
    setScore(0)
    setIdx(0)
    setLevel('all')
    setDeck(shuffle(SENTENCES[0].words.map((w) => w.sa)))
    setPicked([])
    setChecking(false)
    setDone(false)
  }

  return (
    <div>
      <div className="page-header">
        <h2>{t('🧩 Sentence Builder')}</h2>
        <p>{t('Tap the word cards in the right order to build the Sanskrit sentence. Learn word order through play.')}</p>
      </div>

      <div className="card" style={{ maxWidth: 760, margin: '0 auto', padding: 24 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16, alignItems: 'center' }}>
          <button className={`btn btn-sm ${level === 'all' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => { setLevel('all'); resetAll() }}>{t('All')}</button>
          {LEVELS.map((l) => (
            <button key={l.id} className={`btn btn-sm ${level === l.id ? 'btn-primary' : 'btn-secondary'}`} onClick={() => { setLevel(l.id); resetAll() }}>
              {l.label}
            </button>
          ))}
          <span style={{ flex: 1 }} />
          <button className="btn btn-sm btn-secondary" onClick={() => setIastMode((m) => !m)}>
            {iastMode ? 'देवनागरी' : 'IAST'}
          </button>
          <span className="badge" style={{ background: 'rgba(255,152,0,0.15)', color: 'var(--vt-orange)' }}>{t('Score')}: {score}/{pool.length}</span>
        </div>

        {done && (
          <div className={`card ${checking && picked.join(' ') === target ? '' : ''}`} style={{ padding: 16, marginBottom: 16, border: picked.join(' ') === target ? '2px solid #2e7d32' : '2px solid #c62828' }}>
            <p style={{ margin: 0, fontWeight: 600 }}>
              {picked.join(' ') === target ? t('✓ Correct! The sentence was:') : t('✗ Not quite — the sentence is:')}
            </p>
            <p style={{ fontSize: 22, margin: '8px 0 0' }}>{sentence.sa}</p>
            <p style={{ margin: 0, color: 'var(--vt-muted)' }}>{iastMode ? sentence.iast : toDevanagari(sentence.iast)} — {t(sentence.en)}</p>
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <button className="btn btn-sm btn-primary" onClick={() => next(1)}>{t('Next →')}</button>
              <button className="btn btn-sm btn-secondary" onClick={() => { setPicked([]); setDone(false); setChecking(false) }}>{t('Try Again')}</button>
            </div>
          </div>
        )}

        <div className="card" style={{ padding: 20, textAlign: 'center', background: 'linear-gradient(135deg,#16213e,#1a1a3e)', color: '#fff' }}>
          <p style={{ margin: 0, fontSize: 13, opacity: 0.8 }}>{t('Build this sentence')} — {t(sentence.en)}</p>
          <p style={{ margin: '8px 0 0', fontSize: 15, opacity: 0.75 }}>{iastMode ? sentence.iast : sentence.sa.split(' ').map(() => '⬜').join(' ')}</p>
        </div>

        <div style={{ minHeight: 56, border: '2px dashed var(--vt-border)', borderRadius: 10, padding: 10, marginTop: 14, display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          {picked.length === 0 && <span style={{ color: 'var(--vt-muted)' }}>{t('Your sentence appears here…')}</span>}
          {picked.map((w, i) => (
            <button key={w + i} className="btn btn-sm btn-primary" onClick={() => remove(i)} title={t('Tap to remove')}>
              {w} ✕
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
          {deck
            .filter((w) => picked.filter((p) => p === w).length < deck.filter((d) => d === w).length)
            .map((word, i) => (
              <button key={word + '-' + i} className="btn btn-secondary" onClick={() => tap(word)} style={{ fontSize: 18, padding: '10px 16px' }}>
                {word}
              </button>
            ))}
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 18, alignItems: 'center' }}>
          <button className="btn btn-primary" onClick={check} disabled={picked.length !== sentence.words.length || done}>{t('Check Sentence')}</button>
          <button className="btn btn-sm btn-secondary" onClick={() => next(1)}>{t('Skip →')}</button>
          <button className="btn btn-sm btn-secondary" onClick={resetAll}>{t('Restart')}</button>
          <span style={{ flex: 1 }} />
          <span className="badge">{t('Word order matters — verbs come last in Sanskrit!')}</span>
        </div>

        <div style={{ marginTop: 20 }}>
          <h4>{t('📖 Word bank for this sentence')}</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: 8 }}>
            {sentence.words.map((w) => (
              <div key={w.sa} className="card" style={{ padding: '8px 12px', margin: 0 }}>
                <strong>{w.sa}</strong>
                <div style={{ fontSize: 13, color: 'var(--vt-muted)' }}>{w.en}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}