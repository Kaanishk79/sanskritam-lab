import { useState } from 'react'

const layers = ['Grammar', 'Translation', 'Commentary'] as const

export default function AnnotationPage() {
  const [activeLayer, setActiveLayer] = useState<string>('Grammar')
  const [notes, setNotes] = useState<Record<string, string>>({
    Grammar: 'अग्नि (agni) = noun, masculine, nominative singular\nमीळे (īḍe) = verb, 1st person singular, present tense',
    Translation: 'I praise Agni, the household priest, the divine minister of sacrifice, the invoker, the best bestower of jewels.',
    Commentary: 'Ṛgveda 1.1 is attributed to Madhuccandas. Agni is the first god invoked as the mediator between gods and humans.',
  })

  return (
    <div>
      <div className="page-header">
        <h2>🏛️ Annotation Tool</h2>
        <p>Add multi-level notes to texts — from grammar breakdowns to classical commentaries</p>
      </div>

      <div className="card" style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 28, lineHeight: 1.8, fontFamily: "'Noto Sans Devanagari', serif", color: '#f0f0f0', marginBottom: 16 }}>
          अग्निमीळे पुरोहितं यज्ञस्य देवं रत्वीजम् । होतारं रत्नधातमम् ॥
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
        {layers.map((layer) => (
          <button
            key={layer}
            className={`btn ${activeLayer === layer ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveLayer(layer)}
          >
            {layer}
          </button>
        ))}
      </div>

      <div className={`annotation-layer ${activeLayer.toLowerCase()}`}>
        <div style={{ fontSize: 12, color: '#888', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
          {activeLayer} Layer
        </div>
        <textarea
          value={notes[activeLayer] ?? ''}
          onChange={(e) => setNotes({ ...notes, [activeLayer]: e.target.value })}
          style={{
            width: '100%',
            minHeight: 150,
            background: 'rgba(0,0,0,0.2)',
            border: 'none',
            color: '#e0e0e0',
            padding: 12,
            borderRadius: 6,
            fontSize: 14,
            lineHeight: 1.6,
            resize: 'vertical',
          }}
        />
      </div>
    </div>
  )
}