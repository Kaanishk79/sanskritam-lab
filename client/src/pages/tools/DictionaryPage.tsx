import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../services/supabase'
import { toIAST, toDevanagari } from '../../services/sanskrit'
import { speakWithFallback } from '../../services/speech'
import { useLanguage } from '../../context/LanguageContext'

interface DictEntry {
  id: string
  word: string
  root: string | null
  pos: string | null
  meanings: string[] | null
  derivations: string[] | null
}

const POS_ICON: Record<string, string> = {
  noun: '🏷️', verb: '⚡', adjective: '🎨', adverb: '➡️', pronoun: '👤', particle: '🔗', indeclinable: '🔗',
}

export default function DictionaryPage() {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const [entries, setEntries] = useState<DictEntry[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const load = async (query: string) => {
    setLoading(true)
    setError('')
    try {
      const sel = 'id, word, root, pos, meanings, derivations'
      const trimmed = query.trim()
      if (!trimmed) {
        const { data } = await supabase.from('dictionary').select(sel).order('word').limit(60)
        setEntries((data as DictEntry[]) || [])
      } else {
        const { data, error: err } = await supabase
          .from('dictionary')
          .select(sel)
          .or(`word.ilike.%${trimmed}%, meanings.cs.{${trimmed}}`)
          .limit(40)
        if (err) throw new Error(err.message)
        setEntries((data as DictEntry[]) || [])
      }
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const timer = window.setTimeout(() => load(q), 300)
    return () => window.clearTimeout(timer)
  }, [q])

  return (
    <div className="page">
      <div className="page-header">
        <h1>📖 {t('Sanskrit Dictionary')}</h1>
        <p>{t('Word meaning, Devanagari, transliteration, English meaning, examples and related words.')}</p>
      </div>

      <div className="form-group" style={{ maxWidth: 560 }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t('Search: राम, rāma, love, गुरु…')}
          style={{ fontSize: 17, padding: '12px 14px' }}
        />
      </div>
      {error && <p style={{ color: '#e55' }}>{error}</p>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
        {entries.map((e) => (
          <div key={e.id} className="card" style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ fontSize: 22 }}>{e.word}</strong>
              <div style={{ display: 'flex', gap: 6 }}>
                <button className="btn btn-sm btn-outline" onClick={() => speakWithFallback(e.word)}>🔊</button>
                <button className="btn btn-sm btn-primary" onClick={() => navigate(`/explore/${encodeURIComponent(e.word)}`)}>{t('Explore')}</button>
              </div>
            </div>
            <div style={{ color: '#999', fontSize: 13 }}>{toIAST(e.word)} {e.pos ? `· ${POS_ICON[e.pos] || ''} ${e.pos}` : ''}</div>
            <ul style={{ margin: 0, paddingLeft: 18, color: '#ccc' }}>
              {(e.meanings || []).map((m, i) => <li key={i}>{m}</li>)}
              {(e.meanings || []).length === 0 && <li style={{ color: '#888' }}>—</li>}
            </ul>
            {e.root && (
              <div style={{ fontSize: 13, color: '#aaa' }}>
                🌱 {t('Root')}: {toDevanagari(e.root) || e.root} ({toIAST(e.root)})
              </div>
            )}
            {e.derivations && e.derivations.length > 0 && (
              <div style={{ fontSize: 13, color: '#aaa' }}>
                🔗 {t('Related')}: {e.derivations.join(', ')}
              </div>
            )}
          </div>
        ))}
      </div>

      {!loading && entries.length === 0 && (
        <p style={{ color: '#888', marginTop: 16 }}>{t('No entries found.')}</p>
      )}
    </div>
  )
}
