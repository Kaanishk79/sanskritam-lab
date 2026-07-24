import { useState } from 'react'

const sampleTexts = [
  { id: 'rv-1-1', title: 'Ṛgveda 1.1', author: 'Traditional', period: '1500-1200 BCE', language: 'Vedic Sanskrit', badge: 'vedic', content: 'अग्निमीळे पुरोहितं यज्ञस्य देवं रत्वीजम् । होतारं रत्नधातमम् ॥' },
  { id: 'panini-1-1', title: 'Aṣṭādhyāyī 1.1', author: 'Pāṇini', period: '~500 BCE', language: 'Classical Sanskrit', badge: 'classical', content: 'वृद्धिरादैच् । अदेङ् गुणः ।' },
  { id: 'gita-2-47', title: 'Bhagavad Gītā 2.47', author: 'Vyāsa', period: '~200 BCE', language: 'Classical Sanskrit', badge: 'philosophy', content: 'मा फलेषु कदाचन । मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥' },
]

export default function CorpusPage() {
  const [query, setQuery] = useState('')
  const [selectedText, setSelectedText] = useState<string | null>(null)

  const filtered = sampleTexts.filter(
    (t) => t.title.includes(query) || t.content.includes(query)
  )

  return (
    <div>
      <div className="page-header">
        <h2>📚 Corpus & Search</h2>
        <p>Searchable library of Sanskrit texts sorted by time period with semantic search</p>
      </div>

      <div className="search-bar">
        <input
          placeholder="Search texts, verses, or keywords..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-primary">Search</button>
      </div>

      <div className="grid-2" style={{ alignItems: 'start' }}>
        <div className="text-list">
          {filtered.map((text) => (
            <div
              key={text.id}
              className="text-item"
              onClick={() => setSelectedText(text.id)}
              style={selectedText === text.id ? { borderColor: 'var(--sanskrit-gold)' } : undefined}
            >
              <div>
                <div className="text-title">{text.title}</div>
                <div className="text-meta">{text.author} · {text.period}</div>
              </div>
              <span className={`badge badge-${text.badge}`}>{text.language}</span>
            </div>
          ))}
        </div>

        <div className="card">
          {selectedText ? (
            <>
              <h3 style={{ marginBottom: 8 }}>
                {sampleTexts.find((t) => t.id === selectedText)?.title}
              </h3>
              <p style={{ color: '#888', fontSize: 13, marginBottom: 16 }}>
                {sampleTexts.find((t) => t.id === selectedText)?.author} ·{' '}
                {sampleTexts.find((t) => t.id === selectedText)?.period}
              </p>
              <div
                style={{
                  fontSize: 28,
                  lineHeight: 1.8,
                  fontFamily: "'Noto Sans Devanagari', serif",
                  color: '#f0f0f0',
                  padding: 20,
                  background: 'rgba(0,0,0,0.2)',
                  borderRadius: 8,
                }}
              >
                {sampleTexts.find((t) => t.id === selectedText)?.content}
              </div>
            </>
          ) : (
            <div className="empty-state">
              <span className="empty-icon">📖</span>
              <p>Select a text to view its content</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}