import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { searchAll, type SearchResult } from '../../services/sanskrit'
import { useLanguage } from '../../context/LanguageContext'

const KIND_ICON: Record<SearchResult['kind'], string> = {
  dictionary: '📖',
  lesson: '📘',
  text: '📜',
  corpus: '🗂️',
}

const KIND_LABEL: Record<SearchResult['kind'], string> = {
  dictionary: 'Dictionary',
  lesson: 'Lesson',
  text: 'Text',
  corpus: 'Corpus',
}

export default function SearchPage() {
  const { t, lang } = useLanguage()
  const hi = lang === 'hi'
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const timer = useRef<number>(0)

  useEffect(() => {
    const query = q.trim()
    if (!query) { setResults([]); return }
    setLoading(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(async () => {
      try {
        setResults(await searchAll(query))
      } finally {
        setLoading(false)
      }
    }, 250)
    return () => window.clearTimeout(timer.current)
  }, [q])

  const open = (r: SearchResult) => {
    if (r.kind === 'dictionary') navigate(`/explore/${encodeURIComponent(r.title)}`)
    else if (r.kind === 'lesson') navigate(`/learning/lesson/${r.id}`)
    else navigate('/research/corpus')
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>🔍 {t('Sanskrit Search')}</h1>
        <p>{t('Search words, lessons, texts and topics in Sanskrit or English. Suggestions appear while you type.')}</p>
      </div>

      <div className="form-group" style={{ maxWidth: 640 }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t('Type: राम, vidyā, गीता, grammar…')}
          style={{ fontSize: 17, padding: '12px 14px' }}
          autoFocus
        />
      </div>

      {q.trim() && (
        <div style={{ maxWidth: 640 }}>
          <p style={{ color: '#888', fontSize: 13, margin: '4px 0 12px' }}>
            {loading ? '⏳…' : `${results.length} ${t('results for')} “${q.trim()}”`}
          </p>
          {results.map((r, i) => (
            <div key={r.kind + '-' + r.id + '-' + i} className="card search-hit" style={{ padding: '12px 16px', marginBottom: 8, cursor: 'pointer' }} onClick={() => open(r)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 22 }}>{KIND_ICON[r.kind]}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>{r.title}{r.extra ? <span style={{ color: '#888', fontWeight: 400 }}> · {r.extra}</span> : null}</div>
                  <div style={{ color: '#999', fontSize: 13 }}>{hi ? r.subHi ?? r.sub : r.sub}</div>
                </div>
                <span className="chip">{t(KIND_LABEL[r.kind])}</span>
              </div>
            </div>
          ))}
          {!loading && results.length === 0 && (
            <p style={{ color: '#888' }}>{t('No matches — try a shorter word or an English keyword.')}</p>
          )}
        </div>
      )}

      {!q.trim() && (
        <div className="card" style={{ padding: 24, maxWidth: 640, marginTop: 12 }}>
          <h3 style={{ marginTop: 0 }}>{t('Search tips')}</h3>
          <ul style={{ color: '#bbb' }}>
            <li>{t('Devanagari words: राम, विद्या, गीता')}</li>
            <li>{t('IAST words: rāma, vidyā, gītā')}</li>
            <li>{t('English concepts: grammar, sandhi, yoga')}</li>
            <li>{t('Dictionary hits open the Explore panel with meaning, grammar and text references.')}</li>
          </ul>
        </div>
      )}
    </div>
  )
}
