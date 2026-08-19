import { useEffect, useState } from 'react'
import { createWorker } from 'tesseract.js'
import { useLanguage } from '../../context/LanguageContext'
import { syncOcrFromDb, saveOcrToDb, type OcrResult } from '../../services/userDb'

const MAX_DIMENSION = 2400

function preprocessImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Could not read image file'))
    reader.onload = () => {
      const img = new Image()
      img.onerror = () => reject(new Error('Could not load image'))
      img.onload = () => {
        let w = img.width
        let h = img.height
        const scale = Math.min(1, MAX_DIMENSION / Math.max(w, h))
        w = Math.round(w * scale)
        h = Math.round(h * scale)
        const canvas = document.createElement('canvas')
        canvas.width = w
        canvas.height = h
        const ctx = canvas.getContext('2d', { willReadFrequently: true })
        if (!ctx) {
          resolve(canvas.toDataURL('image/png'))
          return
        }
        ctx.drawImage(img, 0, 0, w, h)
        const imageData = ctx.getImageData(0, 0, w, h)
        const d = imageData.data
        const hist = new Uint32Array(256)
        for (let i = 0; i < d.length; i += 4) {
          const gray = Math.round(0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2])
          d[i] = gray
          d[i + 1] = gray
          d[i + 2] = gray
          hist[gray]++
        }
        let total = w * h
        let sum = 0
        for (let i = 0; i < 256; i++) sum += i * hist[i]
        let sumB = 0
        let wB = 0
        let maxVar = 0
        let threshold = 127
        for (let i = 0; i < 256; i++) {
          wB += hist[i]
          if (wB === 0) continue
          const wF = total - wB
          if (wF === 0) break
          sumB += i * hist[i]
          const mB = sumB / wB
          const mF = (sum - sumB) / wF
          const variance = wB * wF * (mB - mF) * (mB - mF)
          if (variance > maxVar) {
            maxVar = variance
            threshold = i
          }
        }
        for (let i = 0; i < d.length; i += 4) {
          const v = d[i] > threshold ? 255 : 0
          d[i] = v
          d[i + 1] = v
          d[i + 2] = v
          d[i + 3] = 255
        }
        ctx.putImageData(imageData, 0, 0)
        resolve(canvas.toDataURL('image/png'))
      }
      img.src = reader.result as string
    }
    reader.readAsDataURL(file)
  })
}

export default function OCRPage() {
  const { t } = useLanguage()
  const [file, setFile] = useState<File | null>(null)
  const [script, setScript] = useState('Devanagari')
  const [result, setResult] = useState('')
  const [status, setStatus] = useState<string>('')
  const [busy, setBusy] = useState(false)
  const [recent, setRecent] = useState<OcrResult[]>([])

  useEffect(() => {
    let live = true
    syncOcrFromDb().then((rows) => {
      if (live && rows) setRecent(rows)
    })
    return () => {
      live = false
    }
  }, [])

  const handleUpload = async () => {
    if (!file) return
    setBusy(true)
    setResult('')
    setStatus(t('Loading OCR engine…'))
    const lang = 'hin'
    let worker: Awaited<ReturnType<typeof createWorker>> | null = null
    try {
      worker = await createWorker(lang, 1, {
        logger: (m: { status: string; progress?: number }) => {
          if (typeof m.progress === 'number') {
            setStatus(t('Recognizing…') + ' ' + Math.round(m.progress * 100) + '%')
          }
        },
      })
      setStatus(t('Preprocessing image…'))
      const processedUrl = await preprocessImage(file)
      const { data } = await worker.recognize(processedUrl)
      const text = data.text?.trim() || ''
      setResult(text)
      setStatus(text ? t('Done') + ' ✅' : t('No text detected — try a clearer image.'))
      if (text) saveOcrToDb(file.name, script, text)
    } catch (err) {
      setStatus(t('OCR failed:') + ' ' + (err instanceof Error ? err.message : String(err)))
    } finally {
      await worker?.terminate().catch(() => undefined)
      setBusy(false)
    }
  }

  return (
    <div>
      <div className="page-header">
        <h2>📄 {t('Manuscript OCR')}</h2>
        <p>{t('Convert scanned Devanagari and Grantha manuscripts into searchable Unicode text')}</p>
      </div>

      <div className="card" style={{ maxWidth: 600 }}>
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 8, color: '#aaa', fontSize: 13 }}>
            {t('Upload Manuscript Image')}
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
            <option value="Devanagari">{t('Devanagari')}</option>
            <option value="Grantha">{t('Grantha')}</option>
          </select>
          <div style={{ fontSize: 12, color: '#888', marginBottom: 12 }}>
            {script === 'Grantha'
              ? t('Note: Grantha has no dedicated model — the Devanagari engine is used as a best-effort fallback.')
              : t('Tip: use clear, high-contrast scans for best results.')}
          </div>
          <button className="btn btn-primary" onClick={handleUpload} disabled={!file || busy}>
            {busy ? t('Recognizing…') : t('Recognize Text')}
          </button>
        </div>

        {status && (
          <div style={{ fontSize: 13, color: '#aaa', marginBottom: 12 }}>{status}</div>
        )}

        {result && (
          <div>
            <label style={{ display: 'block', marginBottom: 8, color: '#aaa', fontSize: 13 }}>
              {t('Recognized Text')}
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

      {recent.length > 0 && (
        <div className="card" style={{ marginTop: 16, maxWidth: 600 }}>
          <h3 style={{ marginTop: 0, marginBottom: 12 }}>🕘 {t('Recent transcriptions')}</h3>
          <div className="text-list">
            {recent.map((r) => (
              <div key={r.id} className="text-item" style={{ cursor: 'pointer' }} onClick={() => setResult(r.text)}>
                <div>
                  <div className="text-title">{r.filename}</div>
                  <div className="text-meta">
                    {r.script} · {new Date(r.createdAt).toLocaleDateString()}
                  </div>
                  <div style={{ color: '#aaa', fontSize: 13, marginTop: 4 }}>
                    {r.text.length > 160 ? r.text.slice(0, 160) + '…' : r.text}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}