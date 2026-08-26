import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'

const DURATION = 12000

export default function Curtain({ onDone }: { onDone: () => void }) {
  const { t } = useLanguage()
  const [phase, setPhase] = useState<'waiting' | 'opening' | 'done'>('waiting')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (phase !== 'opening') return
    const start = performance.now()
    let raf: number
    const tick = (now: number) => {
      const elapsed = now - start
      const p = Math.min(elapsed / DURATION, 1)
      setProgress(p)
      if (p < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setPhase('done')
        onDone()
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [phase, onDone])

  const handleClick = () => {
    if (phase === 'waiting') setPhase('opening')
  }

  const split = progress * 55
  const contentOpacity = Math.max(0, 1 - progress * 2.5)
  const contentScale = 1 + progress * 0.3
  const glowIntensity = Math.min(progress * 3, 1)

  if (phase === 'done') return null

  return (
    <div style={styles.container} onClick={handleClick}>
      <div style={{
        ...styles.leftCurtain,
        transform: `translateX(-${split}%)`,
        transition: phase === 'opening' ? 'none' : undefined,
      }}>
        <div style={styles.curtainTexture} />
        <div style={{ ...styles.folds, background: 'linear-gradient(90deg, rgba(0,0,0,0.25) 0%, transparent 15%, rgba(0,0,0,0.1) 30%, transparent 50%, rgba(0,0,0,0.15) 70%, transparent 85%, rgba(0,0,0,0.2) 100%)' }} />
      </div>

      <div style={{
        ...styles.rightCurtain,
        transform: `translateX(${split}%)`,
        transition: phase === 'opening' ? 'none' : undefined,
      }}>
        <div style={styles.curtainTexture} />
        <div style={{ ...styles.folds, background: 'linear-gradient(270deg, rgba(0,0,0,0.25) 0%, transparent 15%, rgba(0,0,0,0.1) 30%, transparent 50%, rgba(0,0,0,0.15) 70%, transparent 85%, rgba(0,0,0,0.2) 100%)' }} />
      </div>

      <div style={{
        ...styles.glow,
        opacity: glowIntensity,
        transform: `scale(${1 + glowIntensity * 2})`,
      }} />

      <div style={{
        ...styles.content,
        opacity: contentOpacity,
        transform: `scale(${contentScale})`,
      }}>
        <div style={styles.om}>ॐ</div>
        <h1 style={styles.title}>SanskritLab</h1>
        <p style={styles.subtitle}>{t('संस्कृतलैब — भारतीय ज्ञान परंपरा')}</p>

        {phase === 'waiting' && (
          <button
            style={styles.button}
            onClick={(e) => { e.stopPropagation(); handleClick() }}
          >
            <span style={styles.buttonText}>{t('प्रवेश करें')}</span>
            <span style={styles.buttonSub}>Enter SanskritLab</span>
          </button>
        )}

        {phase === 'opening' && (
          <div style={styles.timer}>
            <svg width="60" height="60" viewBox="0 0 60 60">
              <circle cx="30" cy="30" r="26" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
              <circle
                cx="30" cy="30" r="26" fill="none" stroke="rgba(255,106,0,0.9)" strokeWidth="3"
                strokeDasharray={163.36}
                strokeDashoffset={163.36 * (1 - progress)}
                strokeLinecap="round"
                transform="rotate(-90 30 30)"
              />
            </svg>
            <span style={styles.timerText}>{Math.ceil((1 - progress) * 12)}s</span>
          </div>
        )}
      </div>

      <div style={{
        ...styles.leftDrape,
        transform: `translateX(-${split * 1.2}%)`,
      }} />
      <div style={{
        ...styles.rightDrape,
        transform: `translateX(${split * 1.2}%)`,
      }} />
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    position: 'fixed', inset: 0, zIndex: 9999,
    cursor: 'pointer', overflow: 'hidden',
    background: '#0a0a0a',
  },
  leftCurtain: {
    position: 'absolute', top: 0, left: 0, width: '52%', height: '100%',
    background: 'linear-gradient(135deg, #1a0505 0%, #3d0c0c 25%, #5a1010 50%, #3d0c0c 75%, #1a0505 100%)',
    zIndex: 2,
  },
  rightCurtain: {
    position: 'absolute', top: 0, right: 0, width: '52%', height: '100%',
    background: 'linear-gradient(225deg, #1a0505 0%, #3d0c0c 25%, #5a1010 50%, #3d0c0c 75%, #1a0505 100%)',
    zIndex: 2,
  },
  curtainTexture: {
    position: 'absolute', inset: 0,
    background: 'repeating-linear-gradient(90deg, transparent 0px, rgba(255,255,255,0.02) 2px, transparent 4px)',
    opacity: 0.5,
  },
  folds: { position: 'absolute', inset: 0, opacity: 0.8 },
  leftDrape: {
    position: 'absolute', top: 0, left: 0, width: '52%', height: '100%',
    background: 'linear-gradient(135deg, rgba(90,16,16,0.6) 0%, transparent 40%, rgba(90,16,16,0.3) 60%, transparent 100%)',
    zIndex: 3,
  },
  rightDrape: {
    position: 'absolute', top: 0, right: 0, width: '52%', height: '100%',
    background: 'linear-gradient(225deg, rgba(90,16,16,0.6) 0%, transparent 40%, rgba(90,16,16,0.3) 60%, transparent 100%)',
    zIndex: 3,
  },
  glow: {
    position: 'absolute', top: '50%', left: '50%',
    width: '120px', height: '120px', marginLeft: '-60px', marginTop: '-60px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(255,106,0,0.4) 0%, rgba(255,106,0,0.1) 50%, transparent 70%)',
    filter: 'blur(20px)',
    zIndex: 4,
  },
  content: {
    position: 'absolute', inset: 0, zIndex: 5,
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    color: '#fff', textAlign: 'center',
  },
  om: {
    fontSize: '72px', fontWeight: 400,
    color: 'rgba(255,106,0,0.9)',
    marginBottom: '12px',
    textShadow: '0 0 40px rgba(255,106,0,0.5), 0 0 80px rgba(255,106,0,0.2)',
    fontFamily: 'serif',
  },
  title: {
    fontSize: '42px', fontWeight: 700, letterSpacing: '3px',
    background: 'linear-gradient(135deg, #fff 0%, #ff6a00 50%, #fff 100%)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '16px', color: 'rgba(255,255,255,0.7)', marginBottom: '48px',
    letterSpacing: '1px',
  },
  button: {
    padding: '18px 48px',
    background: 'linear-gradient(135deg, #ff6a00 0%, #e06000 100%)',
    border: 'none', borderRadius: '50px',
    cursor: 'pointer',
    boxShadow: '0 4px 30px rgba(255,106,0,0.4), 0 0 60px rgba(255,106,0,0.15)',
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  buttonText: {
    fontSize: '20px', fontWeight: 700, color: '#fff',
    letterSpacing: '1px',
  },
  buttonSub: {
    fontSize: '12px', color: 'rgba(255,255,255,0.7)',
    letterSpacing: '2px', textTransform: 'uppercase',
  },
  timer: {
    position: 'relative', width: '60px', height: '60px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  timerText: {
    position: 'absolute', fontSize: '16px', fontWeight: 700, color: '#ff6a00',
  },
}
