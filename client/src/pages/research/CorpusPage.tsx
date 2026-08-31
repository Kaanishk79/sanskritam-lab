import { useEffect, useRef, useState } from 'react'
import { BookOpen, Search } from 'lucide-react'
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
    <div className="page-container">
      <div className="page-header">
        <h2>{t('Corpus & Search')}</h2>
        <p>{t('Searchable library of Sanskrit texts from the database, sorted alphabetically')}</p>
        <div style={{ marginTop: 10 }}>
          <button className="btn btn-primary" onClick={() => setViewerOpen(true)}>
            {t('3D PDF Viewer')}
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
        <button className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <Search size={14} />
          <span>{loading ? t('Loading…') : t('Search')}</span>
        </button>
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
                <p style={{ color: 'var(--vt-muted)', fontSize: 13, marginBottom: 16 }}>
                  {selected.author && `${selected.author} · `}
                  {selected.period ?? ''} {selected.language ? ` (${selected.language})` : ''}
                </p>
                <div
                  ref={contentRef}
                  style={{
                    fontSize: 28,
                    lineHeight: 1.8,
                    fontFamily: "'Noto Sans Devanagari', serif",
                    color: 'var(--vt-text)',
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
              <div className="empty-state" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
                <span className="empty-icon" style={{ display: 'inline-flex', marginBottom: 12 }}>
                  <BookOpen size={48} color="var(--vt-orange)" />
                </span>
                <p style={{ color: 'var(--vt-muted)' }}>{t('Select a text to view its content')}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}