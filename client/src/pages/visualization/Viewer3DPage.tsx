import { useState } from 'react'

const manuscripts = [
  { id: 1, name: 'Palm-leaf MS 1 — Devanāgarī', script: 'Devanagari', period: '12th CE', transcription: 'अग्निमीळे पुरोहितं यज्ञस्य देवं रत्वीजम्' },
  { id: 2, name: 'Palm-leaf MS 2 — Grantha', script: 'Grantha', period: '14th CE', transcription: 'वृद्धिरादैच् । अदेङ् गुणः ।' },
]

export default function Viewer3DPage() {
  const [activeMs, setActiveMs] = useState(manuscripts[0])

  return (
    <div>
      <div className="page-header">
        <h2>🎨 3D Manuscript Viewer</h2>
        <p>Interactive 3D models of real palm-leaf manuscripts with digitized text overlays</p>
      </div>

      <div className="grid-2" style={{ alignItems: 'start' }}>
        <div>
          <div
            style={{
              aspectRatio: '3/4',
              background: 'linear-gradient(135deg, #2a1a0a 0%, #3a2a1a 50%, #2a1a0a 100%)',
              borderRadius: 12,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #4a3a2a',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 4px)',
              }}
            />
            <div style={{ textAlign: 'center', zIndex: 1 }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🌴</div>
              <div style={{ fontSize: 22, fontFamily: "'Noto Sans Devanagari', serif", color: '#c9a84c', lineHeight: 1.6, maxWidth: '80%' }}>
                {activeMs.transcription}
              </div>
              <div style={{ marginTop: 16, fontSize: 12, color: '#887a6a' }}>
                Drag to rotate · Scroll to zoom
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 style={{ marginBottom: 16, color: '#f0f0f0' }}>Available Manuscripts</h3>
          {manuscripts.map((ms) => (
            <div
              key={ms.id}
              className="text-item"
              onClick={() => setActiveMs(ms)}
              style={activeMs.id === ms.id ? { borderColor: 'var(--sanskrit-gold)' } : undefined}
            >
              <div>
                <div className="text-title">{ms.name}</div>
                <div className="text-meta">{ms.script} · {ms.period}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}