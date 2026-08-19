import { useEffect, useRef, useState } from 'react'
import { toIAST, toDevanagari } from '../../services/sanskrit'
import { speakWithFallback } from '../../services/speech'
import { useLanguage } from '../../context/LanguageContext'
import { syncToolHistoryFromDb, saveToolHistoryToDb, type ToolHistoryEntry } from '../../services/userDb'

const SAMPLES = ['रामायणम्', 'भगवद्गीता', 'सत्यमेव जयते', 'नमस्ते', 'vidyā dadāti vinayam', 'saṃskṛtaṃ devabhāṣā']

export default function TransliteratePage() {
  const { t } = useLanguage()
  const [dev, setDev] = useState('रामायणम्')
  const [iast, setIast] = useState(toIAST('रामायणम्'))
  const [history, setHistory] = useState<ToolHistoryEntry[]>([])
  const saveTimer = useRef<number | null>(null)

  const scheduleSave = (input: string, output: string) => {
    if (saveTimer.current) window.clearTimeout(saveTimer.current)
    saveTimer.current = window.setTimeout(() => {
      saveToolHistoryToDb('transliterate', input, output)
    }, 800)
  }

  useEffect(() => {
    return () => {
      if (saveTimer.current) window.clearTimeout(saveTimer.current)
    }
  }, [])

  useEffect(() => {
    let live = true
    syncToolHistoryFromDb().then((rows) => {
      if (live && rows) setHistory(rows.filter((h) => h.tool === 'transliterate').slice(0, 10))
    })
    return () => {
      live = false
    }
  }, [])

  const fromDev = (v: string) => {
    setDev(v)
    const out = toIAST(v)
    setIast(out)
    if (v.trim()) scheduleSave(v, out)
  }
  const fromIast = (v: string) => {
    setIast(v)
    const out = toDevanagari(v)
    setDev(out)
    if (v.trim()) scheduleSave(v, out)
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>🔤 {t('Transliteration Tool')}</h1>
        <p>{t('Type Devanagari or IAST and watch it convert live, in both directions.')}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12 }}>
        <div className="card" style={{ padding: 20 }}>
          <label style={{ fontWeight: 600 }}>देवनागरी · Devanagari</label>
          <textarea
            rows={4}
            value={dev}
            onChange={(e) => fromDev(e.target.value)}
            style={{ width: '100%', marginTop: 8, fontSize: 20, lineHeight: 1.8 }}
            placeholder="रामायणम्"
          />
        </div>
        <div className="card" style={{ padding: 20 }}>
          <label style={{ fontWeight: 600 }}>IAST · Roman</label>
          <textarea
            rows={4}
            value={iast}
            onChange={(e) => fromIast(e.target.value)}
            style={{ width: '100%', marginTop: 8, fontSize: 18, lineHeight: 1.8 }}
            placeholder="rāmāyaṇam"
          />
        </div>
      </div>

      <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
        <span style={{ color: '#888' }}>{t('Try:')}</span>
        {SAMPLES.map((s) => (
          <button key={s} className="btn btn-sm btn-outline" onClick={() => (toIAST(s) === s ? fromIast(s) : fromDev(s))}>{s}</button>
        ))}
        <button className="btn btn-sm btn-primary" onClick={() => speakWithFallback(dev)}>🔊 {t('Speak')}</button>
        <button className="btn btn-sm btn-outline" onClick={() => { setDev(''); setIast('') }}>✕ {t('Clear')}</button>
      </div>

      <div className="card" style={{ padding: 20, marginTop: 16, maxWidth: 640 }}>
        <h3 style={{ marginTop: 0 }}>{t('How to type IAST')}</h3>
        <table style={{ width: '100%', fontSize: 14 }}>
          <tbody>
            {[['ā', 'आ'], ['ī', 'ई'], ['ū', 'ऊ'], ['ṛ', 'ऋ'], ['ś', 'श'], ['ṣ', 'ष'], ['ṃ', 'ं'], ['ḥ', 'ः'], ['ṭ', 'ट'], ['ḍ', 'ड'], ['ṇ', 'ण'], ['ñ', 'ञ']].map(([r, d]) => (
              <tr key={r}><td style={{ padding: '2px 8px', color: '#999' }}>{r}</td><td>{d}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      {history.length > 0 && (
        <div className="card" style={{ padding: 20, marginTop: 16, maxWidth: 640 }}>
          <h3 style={{ marginTop: 0, marginBottom: 12 }}>🕘 {t('Recent conversions')}</h3>
          <div className="text-list">
            {history.map((h) => (
              <div key={h.id} className="text-item">
                <div>
                  <div className="text-title" style={{ fontSize: 15 }}>{h.input}</div>
                  <div className="text-meta">→ {h.output} · {new Date(h.createdAt).toLocaleDateString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
