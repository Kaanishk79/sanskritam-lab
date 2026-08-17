import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ExplorePanel from '../../components/ExplorePanel'
import { useLanguage } from '../../context/LanguageContext'

const SAMPLE_VERSE = 'सत्यमेव जयते नानृतम्'

const SAMPLE_WORDS = ['राम', 'सीता', 'कृष्ण', 'विद्या', 'गुरु', 'अग्नि', 'इन्द्र', 'माता', 'पिता']

export default function ExplorePage() {
  const { t } = useLanguage()
  const { word: routeWord } = useParams()
  const navigate = useNavigate()
  const [word, setWord] = useState(routeWord ? decodeURIComponent(routeWord) : '')
  const [input, setInput] = useState('')

  useEffect(() => {
    const handler = (e: Event) => {
      const w = (e as CustomEvent<string>).detail
      setWord(w)
      navigate(`/explore/${encodeURIComponent(w)}`, { replace: true })
    }
    window.addEventListener('sanskritlab:explore', handler)
    return () => window.removeEventListener('sanskritlab:explore', handler)
  }, [navigate])

  useEffect(() => {
    if (routeWord) setWord(decodeURIComponent(routeWord))
  }, [routeWord])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      setWord(input.trim())
      navigate(`/explore/${encodeURIComponent(input.trim())}`, { replace: true })
    }
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>🔍 {t('Explore Mode')}</h1>
        <p>{t('Click any Sanskrit word to see its meaning, grammar, pronunciation, related words and where it appears in texts.')}</p>
      </div>

      <form onSubmit={submit} className="form-group" style={{ display: 'flex', gap: 8, maxWidth: 560 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="राम / rāma / a word from a text…"
          style={{ flex: 1 }}
        />
        <button type="submit" className="btn btn-primary">{t('Explore')}</button>
      </form>

      <div style={{ margin: '16px 0', display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
        <span style={{ color: '#888' }}>{t('Try:')}</span>
        {SAMPLE_WORDS.map((w) => (
          <button key={w} className="btn btn-sm btn-outline" onClick={() => { setWord(w); setInput(''); navigate(`/explore/${encodeURIComponent(w)}`, { replace: true }) }}>
            {w}
          </button>
        ))}
      </div>

      {!word && (
        <div className="card" style={{ padding: 24, maxWidth: 560 }}>
          <h3 style={{ marginTop: 0 }}>{t('Try the clickable verse')}</h3>
          <p style={{ fontSize: 22, margin: '12px 0', lineHeight: 2 }}>
            {SAMPLE_VERSE.split(' ').map((w, i) => (
              <span key={i}>
                <button
                  className="explore-word"
                  onClick={() => { setWord(w); navigate(`/explore/${encodeURIComponent(w)}`, { replace: true }) }}
                  title={t('Click to explore')}
                >{w}</button>{' '}
              </span>
            ))}
          </p>
          <p style={{ color: '#888', fontSize: 13 }}>
            {t('Every underlined word in this app can be clicked to open its full Explore panel.')}
          </p>
        </div>
      )}

      {word && <ExplorePanel word={word} onClose={() => navigate('/explore', { replace: true })} />}
    </div>
  )
}
