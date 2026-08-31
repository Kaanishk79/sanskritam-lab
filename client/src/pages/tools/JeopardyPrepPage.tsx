import { useEffect, useState } from 'react'
import { BookOpen, ChevronUp, ChevronDown, ArrowRight } from 'lucide-react'
import { prepTopics } from '../../data/jeopardySite'
import { loadPrepTopics } from '../../services/contentDb'
import { useLanguage } from '../../context/LanguageContext'
import JeopardyHeader from '../../components/jeopardy/JeopardyHeader'
import '../tools/jeopardy.css'

export default function JeopardyPrepPage() {
  const { t, lang } = useLanguage()
  const [topics, setTopics] = useState(prepTopics)
  const [open, setOpen] = useState<string | null>(prepTopics[0].id)

  useEffect(() => {
    let live = true
    loadPrepTopics().then((rows) => {
      if (live) setTopics(rows)
    })
    return () => {
      live = false
    }
  }, [])

  return (
    <div className="page-container">
      <JeopardyHeader />
      <div className="page-header">
        <h2>{t('Prep Center')}</h2>
        <p>{t('Study guides, cheat sheets, and drills to get you on the board — straight from the clue categories')}</p>
      </div>

      <div className="j-prep-grid">
        {topics.map((topic) => {
          const isOpen = open === topic.id
          return (
            <div className={`j-prep-card${isOpen ? ' open' : ''}`} key={topic.id}>
              <button className="j-prep-head" onClick={() => setOpen(isOpen ? null : topic.id)}>
                <span className="j-prep-icon" style={{ display: 'inline-flex', alignItems: 'center' }}>
                  <BookOpen size={16} color="var(--vt-orange)" />
                </span>
                <span className="j-prep-title">
                  <strong>{lang === 'hi' ? topic.titleHi ?? topic.title : topic.title}</strong>
                  <small>{lang === 'hi' ? topic.titleSanskrit : topic.title}</small>
                </span>
                <span className="j-prep-chevron" style={{ display: 'inline-flex', alignItems: 'center' }}>
                  {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </span>
              </button>
              {isOpen && (
                <div className="j-prep-body">
                  <p className="j-prep-summary">{lang === 'hi' ? topic.summaryHi ?? topic.summary : topic.summary}</p>
                  <ul className="j-prep-points">
                    {(lang === 'hi' ? topic.pointsHi ?? topic.points : topic.points).map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="j-prep-footer">
        <p>{t('Think you\'re ready? Take the Anytime Test — 30 questions, 10 minutes.')}</p>
        <a className="btn btn-primary" href="/tools/jeopardy/test" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <span>{t('Take the Anytime Test')}</span>
          <ArrowRight size={14} />
        </a>
      </div>
    </div>
  )
}
