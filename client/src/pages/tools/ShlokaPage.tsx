import { useState, useEffect } from 'react'
import { readingPassages, type ReadingPassage } from '../../data/languageLab'
import { SHLOKAS, type Shloka } from '../../data/shlokas'
import { loadShlokaPassages, loadShlokas } from '../../services/contentDb'
import ExplorePanel from '../../components/ExplorePanel'
import { speakWithFallback } from '../../services/speech'
import { useLanguage } from '../../context/LanguageContext'

export default function ShlokaPage() {
  const { t, lang } = useLanguage()
  const hi = lang === 'hi'
  const [passages, setPassages] = useState<ReadingPassage[]>(readingPassages)
  const [verses, setVerses] = useState<Shloka[]>(SHLOKAS)
  const [openPassage, setOpenPassage] = useState<string | null>(null)
  const [exploreWord, setExploreWord] = useState<string | null>(null)

  useEffect(() => {
    let live = true
    loadShlokaPassages().then((rows) => {
      if (live) setPassages(rows)
    })
    loadShlokas().then((rows) => {
      if (live) setVerses(rows)
    })
    return () => {
      live = false
    }
  }, [])

  useEffect(() => {
    const handler = (e: Event) => setExploreWord((e as CustomEvent<string>).detail)
    window.addEventListener('sanskritlab:explore', handler)
    return () => window.removeEventListener('sanskritlab:explore', handler)
  }, [])

  const clickWord = (w: string) => setExploreWord(w)

  const dayVerse = verses[Math.floor(Date.now() / 86400000) % verses.length]

  return (
    <div className="page">
      <div className="page-header">
        <h1>🪔 {t('Shloka / Verse Explorer')}</h1>
        <p>{t('Classical verses with translation alongside — click any word to see its meaning.')}</p>
      </div>

      <h3>📜 {t('Classical passages')}</h3>
      {passages.map((p) => (
        <div key={p.id} className="card" style={{ padding: 20, marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
            <strong>{p.titleSanskrit} <span style={{ color: '#888', fontWeight: 400 }}>· {p.title}</span></strong>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-sm btn-outline" onClick={() => speakWithFallback(p.text)}>🔊</button>
              <button className="btn btn-sm btn-outline" onClick={() => setOpenPassage(openPassage === p.id ? null : p.id)}>
                {openPassage === p.id ? t('Hide translation') : t('Show translation')}
              </button>
            </div>
          </div>
          <p style={{ fontSize: 20, lineHeight: 2, margin: '10px 0', cursor: 'pointer' }}>
            {p.text.split(' ').map((w, i) => (
              <span key={i}>
                <button className="explore-word" onClick={() => clickWord(w)}>{w}</button>{' '}
              </span>
            ))}
          </p>
          {openPassage === p.id && (
            <div style={{ borderTop: '1px solid rgba(255,255,255,.08)', paddingTop: 12 }}>
              <div style={{ color: '#999', fontStyle: 'italic' }}>{p.transliteration}</div>
              <div style={{ color: '#ccc', marginTop: 6 }}>{hi ? p.translationHi ?? p.translation : p.translation}</div>
              <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {p.words.slice(0, 10).map((w) => (
                  <span key={w.word} className="chip">{w.word} <span style={{ color: '#999' }}>= {hi ? w.meaningHi ?? w.meaning : w.meaning}</span></span>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}

      <h3>🪔 {t('Verse of the day')}</h3>
      <div className="card" style={{ padding: 16, maxWidth: 640, border: '2px solid rgba(255,152,0,0.4)', background: 'rgba(255,152,0,0.06)' }}>
        <div style={{ fontSize: 18, lineHeight: 1.8 }}>
          {dayVerse.dev.split(' ').map((w, j) => (
            <span key={j}>
              <button className="explore-word" onClick={() => clickWord(w)}>{w}</button>{' '}
            </span>
          ))}
        </div>
        <div style={{ color: '#999', fontSize: 12, fontStyle: 'italic', marginTop: 4 }}>{dayVerse.iast}</div>
        <div style={{ color: '#ccc', fontSize: 13, marginTop: 4 }}>{lang === 'hi' && dayVerse.translationHi ? dayVerse.translationHi : dayVerse.translation}</div>
        <div style={{ color: '#666', fontSize: 11, marginTop: 2 }}>{dayVerse.source}</div>
        <button className="btn btn-sm btn-outline" style={{ marginTop: 10 }} onClick={() => speakWithFallback(dayVerse.dev)}>🔊 {t('Hear it')}</button>
      </div>

      {exploreWord && <ExplorePanel word={exploreWord} onClose={() => setExploreWord(null)} />}
    </div>
  )
}
