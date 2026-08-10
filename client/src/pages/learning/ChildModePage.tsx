import { useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'

const letters = [
  { dev: 'अ', trans: 'a', sound: 'u' as const },
  { dev: 'आ', trans: 'ā', sound: 'a' as const },
  { dev: 'इ', trans: 'i', sound: 'i' as const },
  { dev: 'ई', trans: 'ī', sound: 'ee' as const },
  { dev: 'उ', trans: 'u', sound: 'u' as const },
  { dev: 'ऊ', trans: 'ū', sound: 'oo' as const },
  { dev: 'ए', trans: 'e', sound: 'a' as const },
  { dev: 'ओ', trans: 'o', sound: 'o' as const },
  { dev: 'क', trans: 'ka', sound: 'u' as const },
  { dev: 'ख', trans: 'kha', sound: 'u' as const },
  { dev: 'ग', trans: 'ga', sound: 'u' as const },
  { dev: 'घ', trans: 'gha', sound: 'u' as const },
  { dev: 'ङ', trans: 'ṅa', sound: 'u' as const },
  { dev: 'च', trans: 'ca', sound: 'u' as const },
  { dev: 'ज', trans: 'ja', sound: 'u' as const },
  { dev: 'त', trans: 'ta', sound: 'u' as const },
  { dev: 'द', trans: 'da', sound: 'u' as const },
  { dev: 'न', trans: 'na', sound: 'u' as const },
  { dev: 'प', trans: 'pa', sound: 'u' as const },
  { dev: 'ब', trans: 'ba', sound: 'u' as const },
  { dev: 'म', trans: 'ma', sound: 'u' as const },
  { dev: 'य', trans: 'ya', sound: 'u' as const },
  { dev: 'र', trans: 'ra', sound: 'u' as const },
  { dev: 'ल', trans: 'la', sound: 'u' as const },
  { dev: 'व', trans: 'va', sound: 'u' as const },
  { dev: 'स', trans: 'sa', sound: 'u' as const },
  { dev: 'ह', trans: 'ha', sound: 'u' as const },
]

const pictureWords = [
  { word: 'अग्नि', meaning: 'fire', emoji: '🔥' },
  { word: 'जल', meaning: 'water', emoji: '💧' },
  { word: 'सूर्य', meaning: 'sun', emoji: '☀️' },
  { word: 'चन्द्र', meaning: 'moon', emoji: '🌙' },
  { word: 'पुष्प', meaning: 'flower', emoji: '🌸' },
  { word: 'गज', meaning: 'elephant', emoji: '🐘' },
  { word: 'अश्व', meaning: 'horse', emoji: '🐴' },
  { word: 'मत्स्य', meaning: 'fish', emoji: '🐟' },
]

export default function ChildModePage() {
  const { t } = useLanguage()
  const [tab, setTab] = useState<'letters' | 'words' | 'color'>('letters')
  const [currentLetter, setCurrentLetter] = useState(0)
  const [currentPic, setCurrentPic] = useState(0)
  const [matched, setMatched] = useState<number[]>([])
  const [guess, setGuess] = useState('')

  const cl = letters[currentLetter]
  const cp = pictureWords[currentPic]

  const checkColorGuess = () => {
    const correct = pictureWords.findIndex((pw, i) => i === currentPic && guess.trim() === pw.word)
    if (correct >= 0 && !matched.includes(correct)) {
      setMatched([...matched, correct])
      setGuess('')
      if (currentPic < pictureWords.length - 1) setCurrentPic((p) => p + 1)
    }
  }

  return (
    <div>
      <div className="page-header">
        <h2>🧒 {t('Fun Learning — Play Mode')}</h2>
        <p>{t('Learn Sanskrit through pictures, colors, and play. Perfect for young learners!')}</p>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
        <button className={`btn ${tab === 'letters' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setTab('letters')}>
          🔤 {t('Alphabet Cards')}
        </button>
        <button className={`btn ${tab === 'words' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setTab('words')}>
          🖼️ {t('Picture Words')}
        </button>
      </div>

      {tab === 'letters' && (
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: 96,
            fontFamily: "'Noto Sans Devanagari', serif",
            color: '#f0f0f0',
            lineHeight: 1.2,
            padding: 40,
            background: 'linear-gradient(135deg, #1a1a3e, #2a1a3e)',
            borderRadius: 16,
            marginBottom: 20,
            border: '2px solid var(--sanskrit-gold)',
          }}>
            {cl.dev}
          </div>
          <div style={{ fontSize: 18, marginBottom: 4 }}>
            {t('Say: ')}<strong>{cl.trans}</strong>
          </div>
          <div style={{ fontSize: 14, color: '#888', marginBottom: 20 }}>
            {t('Like the ')}<strong>{cl.sound}</strong>{t(' in ')}"{cl.sound === 'u' ? 'u' + 'p' : cl.sound === 'a' ? 'f' + 'a' + 'ther' : cl.sound === 'i' ? 's' + 'i' + 't' : cl.sound === 'ee' ? 's' + 'ee' : cl.sound === 'oo' ? 'm' + 'oo' + 'n' : cl.sound === 'o' ? 'g' + 'o' : 'u' + 'p'}"
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-secondary" onClick={() => setCurrentLetter((p) => (p - 1 + letters.length) % letters.length)}>
              ← {t('Previous')}
            </button>
            <button className="btn btn-primary" onClick={() => setCurrentLetter((p) => (p + 1) % letters.length)}>
              {t('Next')} →
            </button>
          </div>
          <div style={{ marginTop: 16, fontSize: 12, color: '#555', display: 'flex', justifyContent: 'center', gap: 4, flexWrap: 'wrap' }}>
            {letters.map((_, i) => (
              <span key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: i === currentLetter ? 'var(--sanskrit-gold)' : '#333', display: 'inline-block' }} />
            ))}
          </div>
        </div>
      )}

      {tab === 'words' && (
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: 80,
            lineHeight: 1.2,
            padding: 30,
            background: 'linear-gradient(135deg, #1a2a1e, #2a1a1e)',
            borderRadius: 16,
            marginBottom: 16,
            border: '2px solid var(--sanskrit-gold)',
          }}>
            {cp.emoji}
          </div>
          <div style={{ fontSize: 14, color: '#888', marginBottom: 4 }}>{t('What is this in Sanskrit?')}</div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 12 }}>
            <input
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder={t('Type the Sanskrit word...')}
              style={{ maxWidth: 280 }}
              onKeyDown={(e) => e.key === 'Enter' && checkColorGuess()}
            />
            <button className="btn btn-primary" onClick={checkColorGuess}>{t('Check')}</button>
          </div>
          <div style={{ fontSize: 18, fontFamily: "'Noto Sans Devanagari', serif", color: 'var(--sanskrit-gold)' }}>
            {cp.word} — {cp.meaning}
          </div>
          <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center', gap: 6, flexWrap: 'wrap' }}>
            {pictureWords.map((pw, i) => (
              <span key={i} style={{
                fontSize: 28, padding: 8, borderRadius: 8,
                background: matched.includes(i) ? 'rgba(76,175,80,0.2)' : 'rgba(255,255,255,0.03)',
                border: matched.includes(i) ? '2px solid #4caf50' : '2px solid transparent',
              }}>
                {pw.emoji}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}