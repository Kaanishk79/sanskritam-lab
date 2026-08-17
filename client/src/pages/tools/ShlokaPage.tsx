import { useState, useEffect } from 'react'
import { readingPassages } from '../../data/languageLab'
import { VERSES_OF_DAY } from '../../services/sanskrit'
import ExplorePanel from '../../components/ExplorePanel'
import { speakWithFallback } from '../../services/speech'
import { useLanguage } from '../../context/LanguageContext'

export default function ShlokaPage() {
  const { t } = useLanguage()
  const [openPassage, setOpenPassage] = useState<string | null>(null)
  const [exploreWord, setExploreWord] = useState<string | null>(null)

  useEffect(() => {
    const handler = (e: Event) => setExploreWord((e as CustomEvent<string>).detail)
    window.addEventListener('sanskritlab:explore', handler)
    return () => window.removeEventListener('sanskritlab:explore', handler)
  }, [])

  const clickWord = (w: string) => setExploreWord(w)

  return (
    <div className="page">
      <div className="page-header">
        <h1>🪔 {t('Shloka / Verse Explorer')}</h1>
        <p>{t('Classical verses with translation alongside — click any word to see its meaning.')}</p>
      </div>

      <h3>📜 {t('Classical passages')}</h3>
      {readingPassages.map((p) => (
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
              <div style={{ color: '#ccc', marginTop: 6 }}>{p.translation}</div>
              <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {p.words.slice(0, 10).map((w) => (
                  <span key={w.word} className="chip">{w.word} <span style={{ color: '#999' }}>= {w.meaning}</span></span>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}

      <h3>🪔 {t('Daily verses')}</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10 }}>
        {VERSES_OF_DAY.map((v, i) => (
          <div key={i} className="card" style={{ padding: 16 }}>
            <div style={{ fontSize: 18, lineHeight: 1.8 }}>
              {v.dev.split(' ').map((w, j) => (
                <span key={j}>
                  <button className="explore-word" onClick={() => clickWord(w)}>{w}</button>{' '}
                </span>
              ))}
            </div>
            <div style={{ color: '#999', fontSize: 12, fontStyle: 'italic', marginTop: 4 }}>{v.iast}</div>
            <div style={{ color: '#ccc', fontSize: 13, marginTop: 4 }}>{v.translation}</div>
            <div style={{ color: '#666', fontSize: 11, marginTop: 2 }}>{v.source}</div>
          </div>
        ))}
      </div>

      {exploreWord && <ExplorePanel word={exploreWord} onClose={() => setExploreWord(null)} />}
    </div>
  )
}
