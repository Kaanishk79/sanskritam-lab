import { useEffect, useMemo, useState } from 'react'
import { CONCEPTS, type Concept } from '../../data/realWorld'
import { loadRealWorldConcepts } from '../../services/contentDb'
import { toIAST } from '../../services/sanskrit'
import { speakWithFallback } from '../../services/speech'
import { useLanguage } from '../../context/LanguageContext'

export default function RealWorldPage() {
  const { t, lang } = useLanguage()
  const hi = lang === 'hi'
  const [concepts, setConcepts] = useState<Concept[]>(CONCEPTS)
  const [q, setQ] = useState('')
  const [sel, setSel] = useState<Concept>(CONCEPTS[Math.floor(Math.random() * CONCEPTS.length)])
  const [speaking, setSpeaking] = useState(false)

  useEffect(() => {
    loadRealWorldConcepts().then((cs) => {
      setConcepts(cs)
      setSel((s) => cs.find((c) => c.word === s.word) ?? cs[Math.floor(Math.random() * cs.length)])
    })
  }, [])

  const filtered = useMemo(
    () => concepts.filter((c) => (c.word + c.meaning + c.today + (c.meaningHi ?? '') + (c.todayHi ?? '')).toLowerCase().includes(q.toLowerCase())),
    [concepts, q],
  )

  const random = () => setSel(concepts[Math.floor(Math.random() * concepts.length)])

  const speak = (text: string) => speakWithFallback(text, (s) => setSpeaking(s))

  return (
    <div>
      <div className="page-header">
        <h2>{t('🌍 Sanskrit → Real World')}</h2>
        <p>{t('Ancient Sanskrit ideas are alive in your daily life — discover the word behind the things you already do.')}</p>
      </div>

      <div className="card" style={{ maxWidth: 760, margin: '0 auto', padding: 24 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16, alignItems: 'center' }}>
          <input
            className="lab-input"
            style={{ flex: 1, minWidth: 200, padding: '8px 12px', borderRadius: 8, border: '1px solid var(--vt-border)' }}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t('Search a concept — karma, yoga, zero…')}
          />
          <button className="btn btn-sm btn-secondary" onClick={random}>🎲 {t('Daily Connection')}</button>
        </div>

        <div className="card" style={{ padding: 20, marginBottom: 18, border: '2px solid rgba(255,152,0,0.4)', background: 'rgba(255,152,0,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
            <h3 style={{ margin: 0, fontSize: 26 }}>{sel.emoji} {sel.word} <span style={{ color: 'var(--vt-muted)', fontSize: 16, fontWeight: 400 }}>{sel.iast}</span></h3>
            <button className="btn btn-sm btn-secondary" onClick={() => speak(sel.word + '. ' + sel.example)} disabled={speaking}>
              🔊 {t('Hear it')}
            </button>
          </div>
          <p style={{ margin: '6px 0', fontSize: 15, fontWeight: 600, color: 'var(--vt-orange)' }}>{hi ? sel.meaningHi ?? sel.meaning : sel.meaning}</p>
          <p style={{ margin: 0 }}>{t('Today:')} {hi ? sel.todayHi ?? sel.today : sel.today}</p>
          <div className="card" style={{ marginTop: 12, padding: '10px 14px', background: 'var(--vt-white)' }}>
            <p style={{ margin: 0, fontSize: 18 }}>{sel.example}</p>
            <p style={{ margin: '4px 0 0', color: 'var(--vt-muted)' }}>{hi ? sel.exampleHi ?? sel.exampleEn : sel.exampleEn}</p>
            <p style={{ margin: '2px 0 0', color: 'var(--vt-muted)', fontSize: 13, fontStyle: 'italic' }}>{toIAST(sel.example)}</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 10 }}>
          {filtered.map((c) => (
            <button
              key={c.word}
              className="card"
              style={{ margin: 0, textAlign: 'left', cursor: 'pointer', border: sel.word === c.word ? '2px solid var(--vt-orange)' : '1px solid var(--vt-border)', padding: '12px 14px' }}
              onClick={() => setSel(c)}
            >
              <strong>{c.emoji} {c.word} <span style={{ fontWeight: 400, color: 'var(--vt-muted)' }}>{c.iast}</span></strong>
              <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--vt-muted)' }}>{hi ? c.meaningHi ?? c.meaning : c.meaning}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}