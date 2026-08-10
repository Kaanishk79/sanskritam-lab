import { useState, useEffect } from 'react'
import { books, chapters, grammarBooks, ncertChapterPdfUrl } from '../../data/books'
import { fetchNCERTBooks, fetchChapters, fetchNCERTGrammarBooks } from '../../services/data'
import type { Book, Chapter, GrammarBook } from '../../types/curriculum'
import ChapterResourcePanel from '../../components/ChapterResourcePanel'
import { useLanguage } from '../../context/LanguageContext'

type Tab = 'textbooks' | 'grammar'

interface NCERTClassGroup {
  classLabel: string
  classNum: number
  books: Book[]
}

const classColors: Record<number, string> = {
  6: '#2ecc71', 7: '#27ae60', 8: '#1abc9c',
  9: '#2980b9', 10: '#3498db', 11: '#8e44ad', 12: '#9b59b6',
}

export default function NCERTResearchPage() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState<Tab>('textbooks')
  const [expandedBook, setExpandedBook] = useState<string | null>(null)
  const [expandedGrammar, setExpandedGrammar] = useState<string | null>(null)
  const [resourceChapter, setResourceChapter] = useState<{ book: Book; chapter: Chapter } | null>(null)
  const [remoteBooks, setRemoteBooks] = useState<Book[] | null>(null)
  const [remoteChapters, setRemoteChapters] = useState<Record<string, Chapter[]> | null>(null)
  const [remoteGrammar, setRemoteGrammar] = useState<GrammarBook[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      const [ncertBooks, ncertGrammar] = await Promise.all([
        fetchNCERTBooks(),
        fetchNCERTGrammarBooks(),
      ])
      if (ncertBooks && ncertBooks.length > 0) {
        const bookIds = ncertBooks.map((b: Book) => b.id)
        const chs = await fetchChapters(bookIds)
        setRemoteBooks(ncertBooks as Book[])
        setRemoteGrammar(ncertGrammar as GrammarBook[] ?? [])
        if (chs) {
          const grouped: Record<string, Chapter[]> = {}
          for (const ch of chs as any[]) {
            const bid = ch.book_id ?? ch.bookId
            if (!bid) continue
            if (!grouped[bid]) grouped[bid] = []
            grouped[bid].push(ch)
          }
          setRemoteChapters(grouped)
        }
      }
      setLoading(false)
    }
    load()
  }, [])

  const isConnected = remoteBooks !== null
  const ncertBooks = (isConnected ? remoteBooks : books.filter(b => b.category === 'textbook' && b.id.startsWith('ncert-'))) ?? []
  const ncertChapters = isConnected ? (remoteChapters ?? {}) : chapters
  const ncertGrammar = (isConnected ? (remoteGrammar ?? []) : grammarBooks.filter(g => g.id.startsWith('ncert-'))) ?? []

  const ncertClasses: NCERTClassGroup[] = [6, 7, 8, 9, 10, 11, 12].map(num => ({
    classLabel: `${t('Class')} ${num}`,
    classNum: num,
    books: ncertBooks.filter(b => (b as any).gov_class_min <= num && (b as any).gov_class_max >= num),
  }))

  const toggleBook = (bookId: string) => {
    setExpandedBook(expandedBook === bookId ? null : bookId)
    setExpandedGrammar(null)
    setResourceChapter(null)
  }

  const toggleGrammar = (bookId: string) => {
    setExpandedGrammar(expandedGrammar === bookId ? null : bookId)
    setExpandedBook(null)
    setResourceChapter(null)
  }

  const openChapterResources = (book: Book, ch: Chapter) => {
    setResourceChapter((prev) =>
      prev && prev.chapter.id === ch.id ? null : { book, chapter: ch }
    )
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>📘 {t('NCERT Curriculum Library')}</h2>
        <p className="page-subtitle">
          {t('NCERT Sanskrit textbooks (Class 6–12) and Shashwati grammar books for CBSE curriculum')}
          {isConnected && <span style={{ marginLeft: 8, fontSize: 11, opacity: 0.5 }}>· {t('live from Supabase')}</span>}
          {!isConnected && !loading && <span style={{ marginLeft: 8, fontSize: 11, opacity: 0.5, color: '#e67e22' }}>· {t('offline mode')}</span>}
        </p>
      </div>

      <div style={{ marginBottom: 8, fontSize: 12, opacity: 0.5, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <span>{t('Connected:')} {isConnected ? '✅' : '❌'}</span>
        <span>{t('Chapters loaded:')} {Object.keys(ncertChapters).length} {t('books')}</span>
        {expandedBook && <span>{t('Expanded:')} {expandedBook} · {t('chapters:')} {(ncertChapters[expandedBook]?.length ?? 0)}</span>}
      </div>
      <div className="tab-bar" style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        <button
          className={`btn ${activeTab === 'textbooks' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveTab('textbooks')}
        >
          📚 {t('NCERT Textbooks')}
        </button>
        <button
          className={`btn ${activeTab === 'grammar' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveTab('grammar')}
        >
          📖 {t('NCERT Grammar (Shashwati)')}
        </button>
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: 40, opacity: 0.6 }}>
          {t('Loading NCERT curriculum from database...')}
        </div>
      )}

      {!loading && activeTab === 'textbooks' && (
        <div className="ncert-class-grid">
          {ncertClasses.map((group) => (
            group.books.length > 0 && (
              <div key={group.classNum} className="ncert-class-section" style={{ marginBottom: 32 }}>
                <div
                  className="ncert-class-header"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '12px 16px', borderRadius: 8,
                    background: classColors[group.classNum] + '18',
                    borderLeft: `4px solid ${classColors[group.classNum]}`,
                    marginBottom: 12,
                  }}
                >
                  <span style={{ fontSize: 24 }}>{group.classLabel}</span>
                  <span style={{ fontSize: 14, opacity: 0.7 }}>{group.books.length} {t(group.books.length !== 1 ? 'books' : 'book')}</span>
                </div>

                <div className="ncert-book-list" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {group.books.map((book) => (
                    <div key={book.id}>
                      <div
                        className="ncert-book-card"
                        onClick={() => toggleBook(book.id)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 12,
                          padding: '10px 16px', borderRadius: 8, cursor: 'pointer',
                          background: expandedBook === book.id ? 'var(--bg-secondary)' : 'var(--bg-primary)',
                          border: '1px solid var(--border-color)',
                          transition: 'all 0.2s',
                        }}
                      >
                        <span style={{ fontSize: 28 }}>{(book as any).cover_icon ?? book.coverIcon}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 600 }}>{book.title}</div>
                          <div style={{ fontSize: 12, opacity: 0.6 }}>{(book as any).title_sanskrit ?? book.titleSanskrit}</div>
                        </div>
                        <span style={{ fontSize: 12, opacity: 0.5 }}>{(book as any).total_chapters ?? book.totalChapters ?? '?'} {t('chapters')}</span>
                        <span style={{ fontSize: 16 }}>{expandedBook === book.id ? '▲' : '▼'}</span>
                      </div>

                      {expandedBook === book.id && (
                        <div className="ncert-chapter-list" style={{ marginLeft: 52, marginTop: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
                          {(ncertChapters[book.id] || []).length === 0 && (
                            <div style={{ padding: '8px 12px', fontSize: 12, opacity: 0.4, fontStyle: 'italic' }}>
                              {t('No chapters found for')} {book.id} — {t('likely need to load from Supabase first')}
                            </div>
                          )}
                          {(ncertChapters[book.id] || []).map((ch) => (
                            <div key={ch.id}>
                              <div
                                className="chapter-card-mini"
                                onClick={() => openChapterResources(book, ch)}
                                style={{
                                  padding: '8px 12px', borderRadius: 6,
                                  border: '1px solid var(--border-color)',
                                  background: resourceChapter?.chapter.id === ch.id ? 'var(--bg-secondary)' : 'var(--bg-tertiary)',
                                  cursor: 'pointer',
                                  transition: 'background 0.2s',
                                }}
                              >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <div>
                                    <span style={{ fontWeight: 500 }}>{(ch as any).chapter_number ?? ch.chapterNumber}. {ch.title}</span>
                                    {(ch as any).title_sanskrit && (
                                      <span style={{ fontSize: 12, marginLeft: 8, opacity: 0.6 }}>{(ch as any).title_sanskrit}</span>
                                    )}
                                  </div>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                    {(ch as any).verse_count > 0 && (
                                      <span style={{ fontSize: 11, opacity: 0.5 }}>{(ch as any).verse_count} {t('verses')}</span>
                                    )}
                                    <span title={t('Open resources')} style={{ fontSize: 12 }}>📚</span>
                                  </div>
                                </div>
                              </div>
                              {resourceChapter?.chapter.id === ch.id && (
                                <ChapterResourcePanel
                                  book={book}
                                  chapter={ch}
                                  pdfUrl={ncertChapterPdfUrl(book.id, (ch as any).chapter_number ?? ch.chapterNumber)}
                                  onClose={() => setResourceChapter(null)}
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          ))}
          {ncertClasses.every(g => g.books.length === 0) && (
            <p style={{ opacity: 0.6 }}>{t('No NCERT textbooks found.')}</p>
          )}
        </div>
      )}

      {!loading && activeTab === 'grammar' && (
        <div className="ncert-grammar-section">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {ncertGrammar.length === 0 && (
              <p style={{ opacity: 0.6 }}>{t('No NCERT grammar books found.')}</p>
            )}
            {ncertGrammar.map((gb) => (
              <div key={gb.id}>
                <div
                  className="grammar-book-card"
                  onClick={() => toggleGrammar(gb.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '12px 16px', borderRadius: 8, cursor: 'pointer',
                    border: '1px solid var(--border-color)',
                    background: expandedGrammar === gb.id ? 'var(--bg-secondary)' : 'var(--bg-primary)',
                  }}
                >
                  <span style={{ fontSize: 28 }}>📖</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600 }}>{gb.title}</div>
                    <div style={{ fontSize: 12, opacity: 0.6 }}>{(gb as any).title_sanskrit ?? ''}</div>
                    <div style={{ fontSize: 12, marginTop: 4, opacity: 0.7 }}>{(gb as any).description ?? ''}</div>
                  </div>
                  <div style={{ fontSize: 12, textAlign: 'right', opacity: 0.5 }}>
                    <div>{(gb as any).rules_count ?? 0} {t('rules')}</div>
                    <div>{(gb.chapters ?? []).length} {t('chapters')}</div>
                  </div>
                  <span>{expandedGrammar === gb.id ? '▲' : '▼'}</span>
                </div>

                {expandedGrammar === gb.id && (
                  <div style={{ marginLeft: 52, marginTop: 8 }}>
                    {(gb.chapters ?? []).map((ch: { chapter: number; title: string; sections: string[] }) => (
                      <div
                        key={ch.chapter}
                        style={{
                          padding: '8px 12px', marginBottom: 4, borderRadius: 6,
                          border: '1px solid var(--border-color)',
                          background: 'var(--bg-tertiary)',
                        }}
                      >
                        <div style={{ fontWeight: 500 }}>{ch.chapter}. {ch.title}</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 4 }}>
                          {(ch.sections ?? []).map((s, i) => (
                            <span
                              key={i}
                              style={{
                                fontSize: 11, padding: '2px 8px', borderRadius: 4,
                                background: 'var(--accent)', color: '#fff',
                              }}
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
