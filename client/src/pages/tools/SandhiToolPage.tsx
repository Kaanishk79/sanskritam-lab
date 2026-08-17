import { useState } from 'react'
import { tryJoinSandhi, SANDHI_RULES, type SandhiResult } from '../../services/sanskrit'
import { useLanguage } from '../../context/LanguageContext'

const PRACTICE: [string, string, string][] = [
  ['देव', 'इन्द्र', 'देवेन्द्र'],
  ['सदा', 'एव', 'सदैव'],
  ['राम', 'अग्र', 'रामाग्र'],
  ['इति', 'आदि', 'इत्यादि'],
  ['नर', 'इव', 'नरेव'],
  ['हित', 'उपदेश', 'हितोपदेश'],
  ['सत्यम्', 'एव', 'सत्यमेव'],
  ['पृथक्', 'च', 'पृथक्च'],
  ['तत्', 'च', 'तच्च'],
  ['विद्यालय', 'अधीश', 'विद्यालयाधीश'],
]

export default function SandhiToolPage() {
  const { t } = useLanguage()
  const [a, setA] = useState('देव')
  const [b, setB] = useState('इन्द्र')
  const [res, setRes] = useState<SandhiResult | null>(null)

  const join = () => setRes(tryJoinSandhi(a, b))

  return (
    <div className="page">
      <div className="page-header">
        <h1>🔊 {t('Sandhi Tool')}</h1>
        <p>{t('Join two Sanskrit words and see which sandhi rule applies — with the exact rule explained.')}</p>
      </div>

      <div className="card" style={{ padding: 24, maxWidth: 640 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <input value={a} onChange={(e) => setA(e.target.value)} style={{ flex: 1, minWidth: 140, fontSize: 18 }} />
          <span style={{ fontSize: 22, color: '#888' }}>+</span>
          <input value={b} onChange={(e) => setB(e.target.value)} style={{ flex: 1, minWidth: 140, fontSize: 18 }} />
          <button className="btn btn-primary" onClick={join}>＝ {t('Join')}</button>
        </div>

        {res && (
          <div className={res.ok ? 'sandhi-ok' : ''} style={{ marginTop: 16, padding: 14, background: res.ok ? 'rgba(76,175,80,.1)' : 'rgba(255,100,100,.08)', borderRadius: 8 }}>
            <div style={{ fontSize: 26 }}>{res.result}</div>
            <div style={{ color: res.ok ? '#4caf50' : '#e55', marginTop: 4, fontSize: 14 }}>{res.explanation}</div>
          </div>
        )}
      </div>

      <div className="card" style={{ padding: 20, marginTop: 16, maxWidth: 640 }}>
        <h3 style={{ marginTop: 0 }}>📚 {t('The rules')}</h3>
        {SANDHI_RULES.map((r) => (
          <div key={r.name} style={{ marginBottom: 12 }}>
            <strong>{r.devName} · {r.name}</strong>
            <div style={{ color: '#bbb', fontSize: 14 }}>{r.rule}</div>
            <div style={{ color: '#888', fontSize: 13 }}>{r.example}</div>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: 20, marginTop: 16, maxWidth: 640 }}>
        <h3 style={{ marginTop: 0 }}>🧪 {t('Practice')}</h3>
        {PRACTICE.map(([x, y, expected]) => (
          <div key={x + y} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8, flexWrap: 'wrap' }}>
            <code style={{ background: 'rgba(255,255,255,.06)', padding: '4px 8px', borderRadius: 4 }}>{x} + {y}</code>
            <button className="btn btn-sm btn-outline" onClick={() => { setA(x); setB(y); setRes(tryJoinSandhi(x, y)) }}>=?</button>
            <span style={{ color: '#666', fontSize: 13 }}>{expected}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
