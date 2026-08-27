import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as pdfjsLib from 'pdfjs-dist'
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import { useLanguage } from '../context/LanguageContext'

interface PageData {
  label: string
  texture: THREE.CanvasTexture
  aspect: number
}

type Layout = 'stack' | 'grid' | 'circle' | 'spiral'

interface Settings {
  layout: Layout
  spacing: number
  radius: number
  pageScale: number
  thickness: number
  bg: string
  tint: string
  wireframe: boolean
  showLabels: boolean
  autoRotate: boolean
  speed: number
  showGrid: boolean
}

const DEFAULT_SETTINGS: Settings = {
  layout: 'spiral',
  spacing: 0.7,
  radius: 4,
  pageScale: 1,
  thickness: 2,
  bg: '#0b0f19',
  tint: '#94a3b8',
  wireframe: false,
  showLabels: true,
  autoRotate: true,
  speed: 0.06,
  showGrid: true,
}

const MAX_PAGES = 120
const BG_SWATCHES = ['#0b0f19', '#eef2f7', '#1e1b4b', '#2e1065', '#052e16', '#3f0d12']
const TINT_SWATCHES = ['#94a3b8', '#fbbf24', '#34d399', '#f472b6', '#ffffff', '#60a5fa']

const LAYOUTS: { key: Layout; label: string }[] = [
  { key: 'stack', label: 'Stack' },
  { key: 'grid', label: 'Grid' },
  { key: 'circle', label: 'Circle' },
  { key: 'spiral', label: 'Spiral' },
]

// ---------------------------------------------------------------- text pages

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(/\s+/)
  const lines: string[] = []
  let line = ''
  for (const w of words) {
    const test = line ? line + ' ' + w : w
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line)
      line = w
    } else line = test
  }
  if (line) lines.push(line)
  return lines
}

function renderTextPage(canvas: HTMLCanvasElement, text: string, label: string) {
  const ctx = canvas.getContext('2d')!
  const w = canvas.width
  const h = canvas.height
  ctx.fillStyle = '#faf6ec'
  ctx.fillRect(0, 0, w, h)
  ctx.fillStyle = '#3f3a2e'
  ctx.font = "26px Georgia, 'Noto Serif', serif"
  const margin = 52
  const lines = wrapText(ctx, text, w - margin * 2)
  const maxLines = Math.floor((h - margin * 2 - 60) / 38)
  let y = margin + 30
  for (let i = 0; i < Math.min(lines.length, maxLines); i++) {
    ctx.fillText(lines[i], margin, y)
    y += 38
  }
  if (lines.length > maxLines) ctx.fillText('…', margin, y)
  ctx.fillStyle = '#b8a26a'
  ctx.font = '20px Georgia, serif'
  ctx.textAlign = 'center'
  ctx.fillText(`— ${label} —`, w / 2, h - 30)
  ctx.textAlign = 'left'
}

function makeTextPages(text: string): PageData[] {
  const chunks = text
    .split(/\n{2,}/)
    .map((c) => c.trim())
    .filter(Boolean)
  const pages = chunks.length > 1 ? chunks : [text.trim()]
  const out: PageData[] = []
  for (let i = 0; i < pages.length && i < MAX_PAGES; i++) {
    const canvas = document.createElement('canvas')
    canvas.width = 720
    canvas.height = 1000
    renderTextPage(canvas, pages[i], String(i + 1))
    out.push({ label: String(i + 1), texture: new THREE.CanvasTexture(canvas), aspect: 720 / 1000 })
  }
  return out
}

async function makePdfPages(data: ArrayBuffer): Promise<PageData[]> {
  const doc = await pdfjsLib.getDocument({ data }).promise
  const count = Math.min(doc.numPages, MAX_PAGES)
  const out: PageData[] = []
  try {
    for (let i = 1; i <= count; i++) {
      const page = await doc.getPage(i)
      const viewport = page.getViewport({ scale: 1.5 })
      const canvas = document.createElement('canvas')
      canvas.width = viewport.width
      canvas.height = viewport.height
      const ctx = canvas.getContext('2d')!
      await page.render({ canvasContext: ctx, viewport }).promise
      out.push({
        label: String(i),
        texture: new THREE.CanvasTexture(canvas),
        aspect: viewport.width / viewport.height,
      })
      try {
        page.cleanup()
      } catch {
        /* noop */
      }
    }
  } finally {
    await doc.destroy()
  }
  return out
}

// ---------------------------------------------------------------- layout

function computeLayout(
  count: number,
  layout: Layout,
  spacing: number,
  radius: number
): { pos: [number, number, number]; rot: [number, number, number] }[] {
  const items: { pos: [number, number, number]; rot: [number, number, number] }[] = []
  const n = Math.max(count, 1)
  if (layout === 'stack') {
    for (let i = 0; i < n; i++)
      items.push({ pos: [0, (i - (n - 1) / 2) * spacing, 0], rot: [0, i % 2 === 0 ? 0.05 : -0.05, 0] })
  } else if (layout === 'grid') {
    const cols = Math.max(2, Math.ceil(Math.sqrt(n)))
    const rows = Math.ceil(n / cols)
    for (let i = 0; i < n; i++) {
      const cx = i % cols
      const cy = Math.floor(i / cols)
      items.push({
        pos: [(cx - (cols - 1) / 2) * spacing * 1.7, (rows / 2 - cy - 0.5) * spacing * 1.2, 0],
        rot: [0, 0, 0],
      })
    }
  } else if (layout === 'circle') {
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2
      items.push({ pos: [Math.sin(a) * radius, 0, -Math.cos(a) * radius], rot: [0, Math.PI - a, 0] })
    }
  } else {
    const turns = 3
    for (let i = 0; i < n; i++) {
      const t = i / Math.max(n - 1, 1)
      const a = t * Math.PI * 2 * turns
      const rad = radius * (0.2 + 0.8 * t)
      items.push({
        pos: [Math.sin(a) * rad, (i - (n - 1) / 2) * spacing * 0.55, Math.cos(a) * rad],
        rot: [0, -a, 0],
      })
    }
  }
  return items
}

// ---------------------------------------------------------------- label sprite

function makeLabelSprite(label: string): THREE.Sprite {
  const canvas = document.createElement('canvas')
  canvas.width = 160
  canvas.height = 64
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = 'rgba(0,0,0,0.72)'
  const r = 16
  ctx.beginPath()
  ctx.roundRect(4, 4, 152, 56, r)
  ctx.fill()
  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 34px sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(label, 80, 33)
  const tex = new THREE.CanvasTexture(canvas)
  const mat = new THREE.SpriteMaterial({ map: tex, depthTest: false, transparent: true })
  const sprite = new THREE.Sprite(mat)
  sprite.scale.set(0.34, 0.14, 1)
  return sprite
}

// ---------------------------------------------------------------- 3D scene

interface SceneRef {
  renderer: THREE.WebGLRenderer
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  controls: OrbitControls
  root: THREE.Group
  pageRoot: THREE.Group
  grid: THREE.GridHelper | null
  raf: number
}

function buildScene(container: HTMLDivElement, settings: Settings): SceneRef {
  const w = container.clientWidth || 800
  const h = container.clientHeight || 600
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(w, h)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8))
  container.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(settings.bg)
  const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100)
  camera.position.set(0, 1.2, 9)
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.08

  const root = new THREE.Group()
  root.rotation.set(0.12, 0, 0)
  scene.add(root)
  const pageRoot = new THREE.Group()
  root.add(pageRoot)
  scene.add(new THREE.AmbientLight(0xffffff, 1.2))

  const grid = new THREE.GridHelper(40, 40, 0x4b5563, 0x374151)
  grid.position.y = -3.2
  scene.add(grid)

  const ref: SceneRef = {
    renderer,
    scene,
    camera,
    controls,
    root,
    pageRoot,
    grid,
    raf: 0,
  }

  const animate = () => {
    ref.raf = requestAnimationFrame(animate)
    ref.controls.update()
    ref.renderer.render(ref.scene, ref.camera)
  }
  animate()

  const onResize = () => {
    const nw = container.clientWidth || 800
    const nh = container.clientHeight || 600
    ref.camera.aspect = nw / nh
    ref.camera.updateProjectionMatrix()
    ref.renderer.setSize(nw, nh)
  }
  window.addEventListener('resize', onResize)
  ;(ref as SceneRef & { dispose: () => void }).dispose = () => {
    window.removeEventListener('resize', onResize)
    cancelAnimationFrame(ref.raf)
    ref.controls.dispose()
    ref.renderer.dispose()
    if (ref.renderer.domElement.parentElement === container) container.removeChild(ref.renderer.domElement)
  }
  return ref
}

function rebuildPages(ref: SceneRef, pages: PageData[], settings: Settings, selected: number | null, onSelect: (i: number) => void) {
  ref.pageRoot.clear()
  ref.root.rotation.set(0.12, 0, 0)
  if (ref.grid) ref.grid.visible = settings.showGrid
  const layout = computeLayout(pages.length, settings.layout, settings.spacing, settings.radius)
  pages.forEach((p, i) => {
    const w = 1.5 * settings.pageScale * p.aspect
    const h = 1.5 * settings.pageScale
    const group = new THREE.Group()
    group.position.set(...layout[i].pos)
    group.rotation.set(...layout[i].rot)

    const selectedFlag = selected === i
    const dimmed = selected !== null && selected !== i

    const geo = new THREE.PlaneGeometry(w, h)
    const mat = settings.wireframe
      ? new THREE.MeshBasicMaterial({ color: settings.tint, wireframe: true, transparent: dimmed, opacity: dimmed ? 0.3 : 1 })
      : new THREE.MeshBasicMaterial({ map: p.texture, transparent: dimmed, opacity: dimmed ? 0.35 : 1, toneMapped: false })
    const mesh = new THREE.Mesh(geo, mat)
    mesh.scale.setScalar(selectedFlag ? 1.18 : 1)
    mesh.userData.index = i
    mesh.userData.deselect = selectedFlag
    mesh.userData.onSelect = onSelect
    group.add(mesh)

    if (!settings.wireframe && settings.thickness > 0) {
      const spine = new THREE.Mesh(
        new THREE.BoxGeometry(w, h, 0.03 * settings.thickness),
        new THREE.MeshBasicMaterial({ color: settings.tint })
      )
      spine.position.z = -0.015 * settings.thickness
      group.add(spine)
    }

    if (settings.showLabels) {
      const sprite = makeLabelSprite(p.label)
      sprite.position.y = h / 2 + 0.16
      sprite.position.z = 0.02
      group.add(sprite)
    }

    ref.pageRoot.add(group)
  })
}

// ---------------------------------------------------------------- UI pieces

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  zIndex: 9999,
  background: 'rgba(6,8,16,0.96)',
  display: 'flex',
  flexDirection: 'column',
  fontFamily: "'Noto Sans Devanagari', sans-serif",
}

const barStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '10px 16px',
  borderBottom: '1px solid rgba(255,255,255,0.12)',
  color: '#e5e7eb',
}

const btnStyle = (primary = false): React.CSSProperties => ({
  background: primary ? '#c9a84c' : 'rgba(255,255,255,0.1)',
  color: primary ? '#141414' : '#e5e7eb',
  border: 'none',
  borderRadius: 8,
  padding: '7px 14px',
  fontSize: 13,
  fontWeight: 600,
  cursor: 'pointer',
})

const inputStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.07)',
  border: '1px solid rgba(255,255,255,0.2)',
  color: '#fff',
  borderRadius: 8,
  padding: '9px 12px',
  fontSize: 13,
  outline: 'none',
  width: '100%',
}

function Slider({ label, value, min, max, step = 0.1, onChange }: { label: string; value: number; min: number; max: number; step?: number; onChange: (v: number) => void }) {
  const { t } = useLanguage()
  return (
    <label style={{ display: 'block', marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#9ca3af', marginBottom: 3 }}>
        <span>{t(label)}</span>
        <span>{value.toFixed(step < 1 ? 1 : 0)}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(parseFloat(e.target.value))} style={{ width: '100%', accentColor: '#c9a84c' }} />
    </label>
  )
}

function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  const { t } = useLanguage()
  return (
    <button
      onClick={() => onChange(!value)}
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: value ? 'rgba(201,168,76,0.16)' : 'rgba(255,255,255,0.06)',
        border: `1px solid ${value ? 'rgba(201,168,76,0.5)' : 'rgba(255,255,255,0.14)'}`,
        color: value ? '#e8c86a' : '#c3c7cf',
        borderRadius: 8,
        padding: '7px 10px',
        fontSize: 12,
        cursor: 'pointer',
        marginBottom: 8,
      }}
    >
      <span>{t(label)}</span>
      <span style={{ width: 12, height: 12, borderRadius: 999, background: value ? '#c9a84c' : '#4b5563' }} />
    </button>
  )
}

// ---------------------------------------------------------------- component

export default function Pdf3DViewer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useLanguage()
  const [phase, setPhase] = useState<'input' | 'loading' | 'ready'>('input')
  const [pages, setPages] = useState<PageData[]>([])
  const [sourceName, setSourceName] = useState('')
  const [url, setUrl] = useState('')
  const [pasteText, setPasteText] = useState('')
  const [error, setError] = useState('')
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS)
  const [selected, setSelected] = useState<number | null>(null)
  const [panelOpen, setPanelOpen] = useState(true)

  const containerRef = useRef<HTMLDivElement | null>(null)
  const fileRef = useRef<HTMLInputElement | null>(null)
  const sceneRef = useRef<SceneRef | null>(null)
  const settingsRef = useRef(settings)
  const selectedRef = useRef<number | null>(null)
  const pagesRef = useRef(pages)
  settingsRef.current = settings
  selectedRef.current = selected
  pagesRef.current = pages

  useEffect(() => {
    pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl
  }, [])

  // scene lifecycle
  useEffect(() => {
    if (phase !== 'ready' || !containerRef.current || sceneRef.current) return
    const ref = buildScene(containerRef.current, settings)
    sceneRef.current = ref
    rebuildPages(ref, pagesRef.current, settings, selectedRef.current, (i) => {
      setSelected((cur) => (cur === i ? null : i))
    })
    // autorotate loop
    const spin = () => {
      if (settingsRef.current.autoRotate) ref.root.rotation.y += settingsRef.current.speed * 0.016
    }
    const timer = window.setInterval(spin, 16)
    ;(ref as SceneRef & { stopSpin: () => void }).stopSpin = () => window.clearInterval(timer)
    return () => {
      window.clearInterval(timer)
      const r = sceneRef.current as (SceneRef & { dispose: () => void; stopSpin: () => void }) | null
      if (r) {
        r.stopSpin()
        r.dispose()
      }
      sceneRef.current = null
      if (containerRef.current) containerRef.current.innerHTML = ''
    }
  }, [phase]) // eslint-disable-line react-hooks/exhaustive-deps

  // rebuild geometry when settings / pages / selection change
  useEffect(() => {
    if (!sceneRef.current || phase !== 'ready') return
    rebuildPages(sceneRef.current, pages, settings, selected, () => {})
    sceneRef.current.scene.background = new THREE.Color(settings.bg)
  }, [phase, pages, settings, selected])

  const set = (patch: Partial<Settings>) => setSettings((s) => ({ ...s, ...patch }))

  const loadText = () => {
    if (!pasteText.trim()) return
    setError('')
    setPhase('loading')
    setSelected(null)
    setTimeout(() => {
      try {
        const ps = makeTextPages(pasteText)
        if (!ps.length) throw new Error(t('No text to render'))
        setPages(ps)
        setSourceName(`text · ${ps.length} pages`)
        setPhase('ready')
      } catch (e) {
        setError(e instanceof Error ? e.message : t('Failed to render text'))
        setPhase('input')
      }
    }, 30)
  }

  const loadPdfBuffer = async (buf: ArrayBuffer, name: string) => {
    setError('')
    setPhase('loading')
    setSelected(null)
    try {
      const ps = await makePdfPages(buf)
      if (!ps.length) throw new Error(t('PDF has no pages'))
      setPages(ps)
      setSourceName(`${name} · ${ps.length} pages`)
      setPhase('ready')
    } catch (e) {
      setError(e instanceof Error ? e.message : t('Failed to parse PDF'))
      setPhase('input')
    }
  }

  const onFile = async (file: File | undefined | null) => {
    if (!file) return
    if (!file.type.includes('pdf') && !file.name.toLowerCase().endsWith('.pdf')) {
      setError(t('Please choose a PDF file'))
      return
    }
    const buf = await file.arrayBuffer()
    await loadPdfBuffer(buf, file.name)
  }

  const loadUrl = async () => {
    const u = url.trim()
    if (!u) return
    setError('')
    setPhase('loading')
    setSelected(null)
    try {
      const res = await fetch(u)
      if (!res.ok) throw new Error(t('HTTP {status} while fetching PDF').replace('{status}', String(res.status)))
      const buf = await res.arrayBuffer()
      await loadPdfBuffer(buf, u.split('/').pop() || u)
    } catch (e) {
      setError(e instanceof Error ? e.message : t('Failed to fetch PDF'))
      setPhase('input')
    }
  }

  const close = () => {
    pagesRef.current.forEach((p) => p.texture.dispose())
    setPages([])
    setPhase('input')
    setSelected(null)
    setError('')
    setUrl('')
    setPasteText('')
    setSourceName('')
    setSettings(DEFAULT_SETTINGS)
    onClose()
  }

  if (!open) return null

  return (
    <div style={overlayStyle}>
      <div style={barStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 }}>
          <span style={{ fontSize: 18 }}>🧊</span>
          <strong>{t('3D PDF Viewer')}</strong>
          {sourceName && (
            <span style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 999, padding: '2px 10px', fontSize: 12 }}>{sourceName}</span>
          )}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {phase === 'ready' && (
            <>
              <button style={btnStyle(panelOpen)} onClick={() => setPanelOpen((v) => !v)}>
                {t('⚙️ Customize')}
              </button>
              <button style={btnStyle(false)} onClick={() => setSettings(DEFAULT_SETTINGS)}>
                {t('↺ Reset')}
              </button>
            </>
          )}
          <button style={{ ...btnStyle(false), padding: '7px 10px' }} onClick={close} aria-label={t('Close')}>
            ✕
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <div style={{ position: 'relative', flex: 1 }} ref={containerRef}>
          {phase === 'input' && (
            <div
              style={{
                maxWidth: 640,
                margin: '0 auto',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 14,
                padding: '0 24px',
                width: '100%',
                boxSizing: 'border-box',
              }}
            >
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault()
                  onFile(e.dataTransfer.files?.[0])
                }}
                onClick={() => fileRef.current?.click()}
                style={{
                  border: '2px dashed rgba(255,255,255,0.3)',
                  borderRadius: 16,
                  padding: '34px 20px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  color: '#e5e7eb',
                }}
              >
                <div style={{ fontSize: 34, marginBottom: 8 }}>📄</div>
                <div style={{ fontWeight: 600 }}>{t('Drop a PDF here or click to browse')}</div>
                <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>{t('The whole document is rendered as 3D pages')}</div>
                <input ref={fileRef} type="file" accept="application/pdf,.pdf" style={{ display: 'none' }} onChange={(e) => onFile(e.target.files?.[0])} />
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <input style={inputStyle} value={url} onChange={(e) => setUrl(e.target.value)} placeholder={t('…or paste a PDF URL (https://…)')} />
                <button style={btnStyle(false)} onClick={loadUrl}>
                  {t('Load URL')}
                </button>
              </div>

              <div style={{ border: '1px solid rgba(255,255,255,0.16)', borderRadius: 14, padding: 14 }}>
                <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 6 }}>{t('…or paste document text — it becomes 3D pages too')}</div>
                <textarea
                  style={{ ...inputStyle, resize: 'none', minHeight: 84 }}
                  value={pasteText}
                  onChange={(e) => setPasteText(e.target.value)}
                  placeholder={t('Paste any article / lesson / book text here…\n\nParagraphs separated by blank lines become separate 3D pages.')}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
                  <button style={btnStyle(true)} disabled={!pasteText.trim()} onClick={loadText}>
                    {t('Render as 3D')}
                  </button>
                </div>
              </div>

              {error && <div style={{ textAlign: 'center', color: '#f87171', fontSize: 13 }}>{error}</div>}
            </div>
          )}

          {phase === 'loading' && (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, color: '#c3c7cf' }}>
              <div style={{ width: 30, height: 30, borderRadius: 999, border: '3px solid #c9a84c', borderTopColor: 'transparent', animation: 'spin 0.9s linear infinite' }} />
              <div style={{ fontSize: 13 }}>{t('Rendering document pages into 3D…')}</div>
            </div>
          )}
        </div>

        {phase === 'ready' && panelOpen && (
          <div style={{ width: 270, borderLeft: '1px solid rgba(255,255,255,0.1)', background: '#101522', padding: 16, overflowY: 'auto' }}>
            <div style={{ fontWeight: 700, marginBottom: 12, color: '#fff' }}>{t('⚙️ Customize')}</div>
            {selected !== null && (
              <div style={{ background: 'rgba(201,168,76,0.16)', borderRadius: 8, padding: '7px 10px', fontSize: 12, color: '#e8c86a', marginBottom: 10 }}>
                {t('Page {n} of {m} selected — click it again to deselect.').replace('{n}', String(selected + 1)).replace('{m}', String(pages.length))}
              </div>
            )}

            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, color: '#6b7280', fontWeight: 700, margin: '12px 0 8px' }}>{t('Layout')}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
              {LAYOUTS.map((l) => (
                <button
                  key={l.key}
                  onClick={() => set({ layout: l.key })}
                  style={{
                    ...btnStyle(false),
                    background: settings.layout === l.key ? 'rgba(201,168,76,0.2)' : 'rgba(255,255,255,0.06)',
                    border: `1px solid ${settings.layout === l.key ? 'rgba(201,168,76,0.6)' : 'rgba(255,255,255,0.14)'}`,
                    color: settings.layout === l.key ? '#e8c86a' : '#c3c7cf',
                    fontSize: 12,
                  }}
                >
                  {t(l.label)}
                </button>
              ))}
            </div>

            <div style={{ marginTop: 14 }}>
              <Slider label="Spacing" value={settings.spacing} min={0.2} max={2.5} onChange={(v) => set({ spacing: v })} />
              <Slider label="Radius / Spread" value={settings.radius} min={1.5} max={9} onChange={(v) => set({ radius: v })} />
              <Slider label="Page size" value={settings.pageScale} min={0.4} max={1.8} onChange={(v) => set({ pageScale: v })} />
              <Slider label="Thickness" value={settings.thickness} min={0} max={6} step={1} onChange={(v) => set({ thickness: v })} />
            </div>

            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, color: '#6b7280', fontWeight: 700, margin: '14px 0 8px' }}>{t('Style')}</div>
            <Toggle label="Wireframe mode" value={settings.wireframe} onChange={(v) => set({ wireframe: v })} />
            <Toggle label="Page number labels" value={settings.showLabels} onChange={(v) => set({ showLabels: v })} />
            <Toggle label="Auto-rotate scene" value={settings.autoRotate} onChange={(v) => set({ autoRotate: v })} />
            <Toggle label="Show floor grid" value={settings.showGrid} onChange={(v) => set({ showGrid: v })} />
            {settings.autoRotate && <Slider label="Rotation speed" value={settings.speed} min={0.01} max={0.5} step={0.01} onChange={(v) => set({ speed: v })} />}

            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, color: '#6b7280', fontWeight: 700, margin: '14px 0 8px' }}>{t('Colors')}</div>
            <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4 }}>{t('Background')}</div>
            <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
              {BG_SWATCHES.map((c) => (
                <button
                  key={c}
                  onClick={() => set({ bg: c })}
                  style={{ width: 22, height: 22, borderRadius: 999, background: c, border: settings.bg === c ? '2px solid #c9a84c' : '2px solid rgba(255,255,255,0.2)', cursor: 'pointer' }}
                  aria-label={`color ${c}`}
                />
              ))}
            </div>
            <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4 }}>{t('Spine / wireframe accent')}</div>
            <div style={{ display: 'flex', gap: 6 }}>
              {TINT_SWATCHES.map((c) => (
                <button
                  key={c}
                  onClick={() => set({ tint: c })}
                  style={{ width: 22, height: 22, borderRadius: 999, background: c, border: settings.tint === c ? '2px solid #c9a84c' : '2px solid rgba(255,255,255,0.2)', cursor: 'pointer' }}
                  aria-label={`color ${c}`}
                />
              ))}
            </div>

            <button style={{ ...btnStyle(false), width: '100%', marginTop: 18 }} onClick={() => fileRef.current?.click()}>
              {t('Load another PDF')}
            </button>
          </div>
        )}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}
