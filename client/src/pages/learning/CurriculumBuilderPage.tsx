import { useState } from 'react'
import { lessons } from '../../data/lessons'

export default function CurriculumBuilderPage() {
  const [selectedLevel, setSelectedLevel] = useState<number>(0)
  const [customTitle, setCustomTitle] = useState('')
  const [customContent, setCustomContent] = useState('')

  const filtered = lessons.filter((l) => l.level === selectedLevel)

  const handleExport = () => {
    const data = JSON.stringify({ title: customTitle, content: customContent, level: selectedLevel }, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `lesson-${selectedLevel}-${customTitle || 'custom'}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <div className="page-header">
        <h2>👨‍🏫 Curriculum Builder</h2>
        <p>Design custom lessons, browse existing content by level, and export your own curriculum.</p>
      </div>

      <div className="grid-2" style={{ alignItems: 'start' }}>
        <div className="card">
          <h3 style={{ marginBottom: 16 }}>Browse by Level</h3>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
            {[0, 1, 2, 3, 4, 5, 6].map((lvl) => (
              <button
                key={lvl}
                className={`btn ${selectedLevel === lvl ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setSelectedLevel(lvl)}
              >
                Level {lvl}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {filtered.map((l) => (
              <div key={l.id} className="text-item">
                <div>
                  <div className="text-title">{l.title}</div>
                  <div className="text-meta">{l.track} · {l.duration} · {l.quiz.length} questions</div>
                </div>
                <span style={{ fontSize: 12, color: '#888' }}>{l.content.sections.length} sections</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: 16 }}>Create Custom Lesson</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input
              placeholder="Lesson title..."
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
            />
            <select value={selectedLevel} onChange={(e) => setSelectedLevel(Number(e.target.value))}>
              {[0, 1, 2, 3, 4, 5, 6].map((lvl) => (
                <option key={lvl} value={lvl}>Level {lvl}</option>
              ))}
            </select>
            <textarea
              placeholder="Lesson content (supports Devanāgarī, markdown)..."
              value={customContent}
              onChange={(e) => setCustomContent(e.target.value)}
              style={{
                minHeight: 200,
                resize: 'vertical',
                background: '#1e1e3a',
                color: '#e0e0e0',
                border: '1px solid #333',
                borderRadius: 6,
                padding: 12,
                fontFamily: "'Noto Sans Devanagari', sans-serif",
              }}
            />
            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn btn-primary" onClick={handleExport}>Export Lesson</button>
              <button className="btn btn-secondary">Preview</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}