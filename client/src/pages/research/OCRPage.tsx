import { useState } from 'react'

export default function OCRPage() {
  const [file, setFile] = useState<File | null>(null)
  const [script, setScript] = useState('Devanagari')
  const [result, setResult] = useState('')

  const handleUpload = () => {
    setResult(
      'अग्निमीळे पुरोहितं यज्ञस्य देवं रत्वीजम् । होतारं रत्नधातमम् ॥'
    )
  }

  return (
    <div>
      <div className="page-header">
        <h2>📄 Manuscript OCR</h2>
        <p>Convert scanned Devanagari and Grantha manuscripts into searchable Unicode text</p>
      </div>

      <div className="card" style={{ maxWidth: 600 }}>
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 8, color: '#aaa', fontSize: 13 }}>
            Upload Manuscript Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            style={{ width: '100%', marginBottom: 12 }}
          />
          <select
            value={script}
            onChange={(e) => setScript(e.target.value)}
            style={{ width: '100%', marginBottom: 12 }}
          >
            <option value="Devanagari">Devanagari</option>
            <option value="Grantha">Grantha</option>
          </select>
          <button className="btn btn-primary" onClick={handleUpload} disabled={!file}>
            Recognize Text
          </button>
        </div>

        {result && (
          <div>
            <label style={{ display: 'block', marginBottom: 8, color: '#aaa', fontSize: 13 }}>
              Recognized Text
            </label>
            <div
              style={{
                fontSize: 24,
                lineHeight: 1.8,
                fontFamily: "'Noto Sans Devanagari', serif",
                padding: 20,
                background: 'rgba(0,0,0,0.2)',
                borderRadius: 8,
                color: '#f0f0f0',
              }}
            >
              {result}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}