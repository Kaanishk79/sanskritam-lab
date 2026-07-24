import { useState } from 'react'

const rules = [
  { id: '1.1.1', rule: 'वृद्धिरादैच्', meaning: 'vṛddhi is denoted by ā, ai, au', category: 'vṛddhi' },
  { id: '1.1.2', rule: 'अदेङ् गुणः', meaning: 'guṇa is denoted by a, e, o', category: 'guṇa' },
  { id: '6.1.77', rule: 'इको यणचि', meaning: 'ik vowels become yaṇ before a vowel', category: 'sandhi' },
]

const philosophies = [
  { name: 'Nyāya', focus: 'Logic & Epistemology', texts: 'Nyāya Sūtra', color: '#e74c3c' },
  { name: 'Vedānta', focus: 'Non-duality', texts: 'Brahma Sūtra, Upaniṣads', color: '#2ecc71' },
  { name: 'Mīmāṃsā', focus: 'Ritual Exegesis', texts: 'Pūrva Mīmāṃsā Sūtra', color: '#f39c12' },
  { name: 'Sāṃkhya', focus: 'Enumeration', texts: 'Sāṃkhya Kārikā', color: '#9b59b6' },
  { name: 'Yoga', focus: 'Union & Practice', texts: 'Yoga Sūtra', color: '#1abc9c' },
]

export default function GrammarMapsPage() {
  const [activeTab, setActiveTab] = useState<'grammar' | 'philosophy'>('grammar')

  return (
    <div>
      <div className="page-header">
        <h2>🌳 Grammar & Philosophy Maps</h2>
        <p>3D branching diagrams of Pāṇini's grammar and visual network maps of Indian philosophy</p>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        <button
          className={`btn ${activeTab === 'grammar' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('grammar')}
        >
          Pāṇini Grammar Rules
        </button>
        <button
          className={`btn ${activeTab === 'philosophy' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('philosophy')}
        >
          Philosophy Networks
        </button>
      </div>

      {activeTab === 'grammar' ? (
        <div>
          <div
            style={{
              padding: 24,
              background: '#0d1b2a',
              borderRadius: 12,
              border: '1px solid #1e3a5f',
              marginBottom: 20,
              textAlign: 'center',
              minHeight: 200,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ fontSize: 14, color: '#5a7a9a', marginBottom: 12 }}>3D GRAMMAR GRAPH</div>
            <div style={{ position: 'relative', width: '100%', maxWidth: 500, height: 250 }}>
              {rules.map((r, i) => {
                const angle = (i / rules.length) * 2 * Math.PI - Math.PI / 2
                const x = 250 + 150 * Math.cos(angle)
                const y = 125 + 100 * Math.sin(angle)
                return (
                  <div
                    key={r.id}
                    style={{
                      position: 'absolute',
                      left: x, top: y,
                      transform: 'translate(-50%, -50%)',
                      background: '#1a3a5a',
                      border: '1px solid #2a5a8a',
                      borderRadius: 8,
                      padding: '8px 16px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{ fontSize: 11, color: '#5a8aaa' }}>{r.id}</div>
                    <div style={{ fontSize: 20, fontFamily: "'Noto Sans Devanagari', serif" }}>{r.rule}</div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="text-list">
            {rules.map((r) => (
              <div key={r.id} className="text-item">
                <div>
                  <div className="text-title">{r.rule} — {r.meaning}</div>
                  <div className="text-meta">Aṣṭādhyāyī {r.id} · {r.category}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid-3">
          {philosophies.map((p) => (
            <div
              key={p.name}
              className="module-card"
              style={{ borderTop: `3px solid ${p.color}` }}
            >
              <h3>{p.name}</h3>
              <p style={{ marginTop: 8 }}><strong>Focus:</strong> {p.focus}</p>
              <p style={{ marginTop: 4 }}><strong>Texts:</strong> {p.texts}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}