const events = [
  { year: '1500-1200 BCE', title: 'Ṛgveda Composition', description: 'Earliest extant Sanskrit texts, hymns to deities', category: 'text' as const },
  { year: '~1000 BCE', title: 'Brāhmaṇas & Āraṇyakas', description: 'Ritual manuals and forest treatises', category: 'text' as const },
  { year: '~700 BCE', title: 'Early Upaniṣads', description: 'Philosophical speculations on Brahman and Ātman', category: 'philosophy' as const },
  { year: '~500 BCE', title: 'Pāṇini — Aṣṭādhyāyī', description: 'Systematization of Sanskrit grammar into 8 chapters', category: 'grammar' as const },
  { year: '~300 BCE', title: 'Nyāya & Vaiśeṣika Sūtras', description: 'Foundational texts of logic and atomism', category: 'philosophy' as const },
  { year: '~200 BCE', title: 'Yoga Sūtra & Bhagavad Gītā', description: 'Classical yoga system and the Gītā synthesis', category: 'philosophy' as const },
  { year: '~4th CE', title: 'Kālidāsa — Abhijñānaśākuntalam', description: 'Classical Sanskrit drama at its zenith', category: 'text' as const },
  { year: '~7th CE', title: 'Bhartṛhari — Vākyapadīya', description: 'Philosophy of language and sentence meaning', category: 'grammar' as const },
]

export default function TimelinePage() {
  return (
    <div>
      <div className="page-header">
        <h2>📈 Evolutionary Timeline</h2>
        <p>Interactive timeline showing how Sanskrit language and philosophy evolved over centuries</p>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        {(['all', 'text', 'grammar', 'philosophy'] as const).map((cat) => (
          <button key={cat} className="btn btn-secondary">
            {cat === 'all' ? 'All Events' : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="timeline">
        {events.map((e, i) => (
          <div key={i} className="timeline-item">
            <div
              className="badge"
              style={{
                background: e.category === 'text' ? '#2d5016' : e.category === 'grammar' ? '#7d3c00' : '#4a148c',
                color: e.category === 'text' ? '#a8e6a3' : e.category === 'grammar' ? '#ffcc80' : '#ce93d8',
                marginBottom: 8,
                display: 'inline-block',
              }}
            >
              {e.year}
            </div>
            <h3 style={{ color: '#f0f0f0', fontSize: 16, marginBottom: 4 }}>{e.title}</h3>
            <p style={{ color: '#777', fontSize: 14 }}>{e.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}