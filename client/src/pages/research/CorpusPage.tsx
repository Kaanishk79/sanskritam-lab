import { useEffect, useRef, useState } from 'react'
import { supabase } from '../../services/supabase'
import { useLanguage } from '../../context/LanguageContext'
import Pdf3DViewer from '../../components/Pdf3DViewer'

interface CorpusText {
  id: string
  title: string
  title_hi?: string | null
  author?: string
  period?: string
  language?: string
  content?: string
  book_id?: string | null
  chapter_number?: number | null
  verse_number?: number | null
}

export default function CorpusPage() {
  const { t, lang } = useLanguage()
  const [texts, setTexts] = useState<CorpusText[]>([])
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [viewerOpen, setViewerOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const activeItemRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!selectedId) return
    contentRef.current?.scrollTo({ top: 0 })
    activeItemRef.current?.scrollIntoView({ block: 'nearest' })
  }, [selectedId])

  const displayTitle = (text: CorpusText): string =>
    lang === 'hi' && text.title_hi ? text.title_hi : text.title

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const { data, error } = await supabase
          .from('texts')
          .select('id,title,title_hi,author,period,language,content,book_id,chapter_number,verse_number')
          .order('id')
        if (cancelled) return
        if (error) throw error
        setTexts(data ?? [])
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e))
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const search = texts.filter(
    (text) =>
      !query ||
      text.title?.toLowerCase().includes(query.toLowerCase()) ||
      text.title_hi?.toLowerCase().includes(query.toLowerCase()) ||
      text.content?.toLowerCase().includes(query.toLowerCase())
  )

  const selected = texts.find((t) => t.id === selectedId) ?? null

  return (
    <div>
      <div className="page-header">
        <h2>📚 {t('Corpus & Search')}</h2>
        <p>{t('Searchable library of Sanskrit texts from the database, sorted alphabetically')}</p>
        <div style={{ marginTop: 10 }}>
          <button className="btn btn-primary" onClick={() => setViewerOpen(true)}>
            🧊 {t('3D PDF Viewer')}
          </button>
        </div>
      </div>

      <Pdf3DViewer open={viewerOpen} onClose={() => setViewerOpen(false)} />

      <div className="search-bar">
        <input
          placeholder={t('Search texts, verses, or keywords...')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-primary">{loading ? t('Loading…') : t('Search')}</button>
      </div>

      {loading && <p style={{ opacity: 0.6 }}>{t('Loading corpus from database...')}</p>}
      {error && <p style={{ color: '#e67e22' }}>{t('Failed to load:')} {error}</p>}

      {!loading && !error && (
        <div className="grid-2" style={{ alignItems: 'start' }}>
          <div className="text-list">
            {search.map((text) => (
              <div
                key={text.id}
                ref={selectedId === text.id ? activeItemRef : undefined}
                className="text-item"
                onClick={() => setSelectedId(text.id)}
                style={selectedId === text.id ? { borderColor: 'var(--sanskrit-gold)' } : undefined}
              >
                <div>
                  <div className="text-title">{displayTitle(text)}</div>
                  <div className="text-meta">
                    {text.author ? `${text.author} · ` : ''}
                    {text.period ?? ''}
                    {text.chapter_number ? ` · ch.${text.chapter_number}` : ''}
                  </div>
                </div>
                {text.language && <span className="badge badge-classical">{text.language}</span>}
              </div>
            ))}
            {search.length === 0 && (
              <p style={{ opacity: 0.6 }}>{t('No texts match')} “{query}”.</p>
            )}
          </div>

          <div className="card">
            {selected ? (
              <>
                <h3 style={{ marginBottom: 8 }}>{selected ? displayTitle(selected) : ''}</h3>
                <p style={{ color: '#888', fontSize: 13, marginBottom: 16 }}>
                  {selected.author && `${selected.author} · `}
                  {selected.period ?? ''} {selected.language ? ` (${selected.language})` : ''}
                </p>
                <div
                  ref={contentRef}
                  style={{
                    fontSize: 28,
                    lineHeight: 1.8,
                    fontFamily: "'Noto Sans Devanagari', serif",
                    color: '#f0f0f0',
                    padding: 20,
                    background: 'rgba(0,0,0,0.2)',
                    borderRadius: 8,
                    whiteSpace: 'pre-wrap',
                    maxHeight: 420,
                    overflowY: 'auto',
                  }}
                >
                  {selected.content}
                </div>
              </>
            ) : (
              <div className="empty-state">
                <span className="empty-icon">📖</span>
                <p>{t('Select a text to view its content')}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}