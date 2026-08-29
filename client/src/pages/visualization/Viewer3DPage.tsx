import { useState, useRef, useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { useLanguage } from '../../context/LanguageContext'
import { MANUSCRIPTS, type Manuscript } from '../../data/viewer'
import { loadManuscripts } from '../../services/contentDb'

function Manuscript3DScene({ manuscript, isDark }: { manuscript: Manuscript; isDark: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<{ scene: THREE.Scene; camera: THREE.PerspectiveCamera; renderer: THREE.WebGLRenderer; controls: OrbitControls; leaf: THREE.Mesh; frame: number } | null>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const container = containerRef.current
    const w = container.clientWidth
    const h = container.clientHeight

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(isDark ? 0x1a1a2e : 0xf5f0e8)

    const camera = new THREE.PerspectiveCamera(35, w / h, 0.1, 100)
    camera.position.set(0, 1.5, 5)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    container.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.08
    controls.autoRotate = true
    controls.autoRotateSpeed = 1.5
    controls.minDistance = 2.5
    controls.maxDistance = 10

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2)
    dirLight.position.set(3, 5, 4)
    dirLight.castShadow = true
    scene.add(dirLight)

    const backLight = new THREE.DirectionalLight(0xffd700, 0.4)
    backLight.position.set(-2, 1, -3)
    scene.add(backLight)

    const leafGroup = new THREE.Group()

    const leafGeo = new THREE.BoxGeometry(2.8, 0.08, 0.35)
    const leafMat = new THREE.MeshStandardMaterial({
      color: manuscript.color,
      roughness: 0.7,
      metalness: 0.05,
      flatShading: false,
    })
    const leaf = new THREE.Mesh(leafGeo, leafMat)
    leaf.castShadow = true
    leafGroup.add(leaf)

    const edgeGeo = new THREE.BoxGeometry(2.82, 0.01, 0.37)
    const edgeMat = new THREE.MeshStandardMaterial({ color: 0x3a2a1a, roughness: 0.9 })
    const edge = new THREE.Mesh(edgeGeo, edgeMat)
    edge.position.y = -0.05
    leafGroup.add(edge)

    const lineMat = new THREE.MeshStandardMaterial({ color: 0x5a4a3a, transparent: true, opacity: 0.3 })
    for (let i = -3; i <= 3; i++) {
      const line = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.01, 0.02), lineMat)
      line.position.set(0, 0.06, i * 0.04)
      leafGroup.add(line)
    }

    leafGroup.rotation.x = -0.1
    leafGroup.rotation.y = 0.3
    leafGroup.position.y = 0.5
    scene.add(leafGroup)

    const textCanvas = document.createElement('canvas')
    textCanvas.width = 1024
    textCanvas.height = 128
    const ctx = textCanvas.getContext('2d')!
    ctx.fillStyle = isDark ? '#1a1a2e' : '#f5f0e8'
    ctx.fillRect(0, 0, 1024, 128)
    ctx.fillStyle = manuscript.color
    ctx.font = 'bold 32px "Noto Sans Devanagari", serif'
    ctx.textAlign = 'center'
    const displayText = manuscript.transcription.length > 50
      ? manuscript.transcription.slice(0, 50) + '...'
      : manuscript.transcription
    ctx.fillText(displayText, 512, 72)

    const textTexture = new THREE.CanvasTexture(textCanvas)
    textTexture.needsUpdate = true
    const textMat = new THREE.SpriteMaterial({ map: textTexture, transparent: true, opacity: 0.9 })
    const textSprite = new THREE.Sprite(textMat)
    textSprite.scale.set(2.6, 0.32, 1)
    textSprite.position.set(0, 0.12, 0)
    leafGroup.add(textSprite)

    const frameId = requestAnimationFrame(function animate() {
      controls.update()
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    })

    const handleResize = () => {
      const nw = container.clientWidth
      const nh = container.clientHeight
      camera.aspect = nw / nh
      camera.updateProjectionMatrix()
      renderer.setSize(nw, nh)
    }
    window.addEventListener('resize', handleResize)

    sceneRef.current = { scene, camera, renderer, controls, leaf, frame: frameId }

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', handleResize)
      container.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [manuscript, isDark])

  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.scene.background = new THREE.Color(isDark ? 0x1a1a2e : 0xf5f0e8)
    }
  }, [isDark])

  return (
    <div
      ref={containerRef}
      className="viewer-3d-canvas"
      style={{ width: '100%', height: 480, borderRadius: 12, overflow: 'hidden', cursor: 'grab' }}
    />
  )
}

export default function Viewer3DPage() {
  const [manuscripts, setManuscripts] = useState<Manuscript[]>(MANUSCRIPTS)
  const [activeMs, setActiveMs] = useState<Manuscript>(MANUSCRIPTS[0])
  const [isDark, setIsDark] = useState(false)
  const { t, lang } = useLanguage()
  const hi = lang === 'hi'

  useEffect(() => {
    let live = true
    loadManuscripts().then((rows) => {
      if (live) {
        setManuscripts(rows)
        setActiveMs((m) => rows.find((r) => r.id === m.id) ?? rows[0])
      }
    })
    return () => {
      live = false
    }
  }, [])

  useEffect(() => {
    const check = () => {
      setIsDark(document.body.classList.contains('dark') || document.documentElement.classList.contains('dark'))
    }
    check()
    const obs = new MutationObserver(check)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  return (
    <div>
      <div className="page-header">
        <h2>🎨 {t('3D Manuscript Viewer')}</h2>
        <p>{t('Interactive Three.js 3D models of palm-leaf manuscripts with digitized text overlays')}</p>
      </div>

      <div className="grid-2" style={{ alignItems: 'start' }}>
        <div>
          <Manuscript3DScene manuscript={activeMs} isDark={isDark} />
          <div className="viewer-controls-hint">
            <span>🖱 {t('Drag to rotate · Scroll to zoom · Auto-rotating')}</span>
          </div>
        </div>

        <div>
          <h3 style={{ marginBottom: 16, color: 'var(--text)' }}>{t('Available Manuscripts')}</h3>
          <div className="ms-list">
            {manuscripts.map((ms) => (
              <div
                key={ms.id}
                className={`text-item ${activeMs.id === ms.id ? 'active' : ''}`}
                onClick={() => setActiveMs(ms)}
              >
                <div>
                  <div className="text-title">{hi ? ms.nameHi ?? ms.name : ms.name}</div>
                  <div className="text-meta">{hi ? ms.scriptHi ?? ms.script : ms.script} · {hi ? ms.periodHi ?? ms.period : ms.period}</div>
                </div>
                {activeMs.id === ms.id && <span className="ms-active-badge">{t('Viewing')}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
