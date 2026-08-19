import { useEffect, useState } from 'react'
import { DHATUS, type Dhatu } from '../../data/dhatus'
import { loadDhatus } from '../../services/contentDb'
import { speakWithFallback } from '../../services/speech'
import { useLanguage } from '../../context/LanguageContext'

const GANAS = ['All', 'भ्वादि', 'अदादि', 'जुहोत्यादि', 'दिवादि', 'स्वादि', 'तनादि', 'क्रयादि']

export default function DhatuPage() {
  const { t } = useLanguage()
  const [dhatus, setDhatus] = useState<Dhatu[]>(DHATUS)
  const [q, setQ] = useState('')
  const [gana, setGana] = useState('All')

  useEffect(() => {
    let live = true
    loadDhatus().then((rows) => {
      if (live) setDhatus(rows)
    })
    return () => {
      live = false
    }
  }, [])

  const rows = dhatus.filter((d) => {
    const matchQ = !q.trim() || d.root.includes(q.trim()) || d.iast.includes(q.trim().toLowerCase()) || d.meaning.toLowerCase().includes(q.trim().toLowerCase())
    const matchG = gana === 'All' || d.gana === gana
    return matchQ && matchG
  })

  return (
    <div className="page">
      <div className="page-header">
        <h1>🌱 {t('Dhātu / Verb Explorer')}</h1>
        <p>{t('Browse common verbal roots: their gaṇa (class), meaning, and present-tense form.')}</p>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginBottom: 16, maxWidth: 640 }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t('Search: भू, gam, to go, speak…')}
          style={{ flex: 1, minWidth: 200, fontSize: 16 }}
        />
        <select value={gana} onChange={(e) => setGana(e.target.value)} style={{ padding: '8px 10px' }}>
          {GANAS.map((g) => <option key={g} value={g}>{g}</option>)}
        </select>
        <span style={{ color: '#888', fontSize: 13 }}>{rows.length} {t('roots')}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 10 }}>
        {rows.map((d) => (
          <div key={d.root} className="card" style={{ padding: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ fontSize: 22 }}>{d.root}</strong>
              <button className="btn btn-sm btn-outline" onClick={() => speakWithFallback(d.present)}>🔊 {d.present}</button>
            </div>
            <div style={{ color: '#999', fontSize: 13 }}>{d.iast} · {t('gaṇa')} {d.ganaNum} ({d.gana})</div>
            <div style={{ color: '#ccc', marginTop: 4 }}>{d.meaning}</div>
            <div style={{ color: '#888', fontSize: 13, marginTop: 4 }}>अद्यतन: {d.present}</div>
          </div>
        ))}
      </div>
      {rows.length === 0 && <p style={{ color: '#888' }}>{t('No roots match.')}</p>}
    </div>
  )
}
