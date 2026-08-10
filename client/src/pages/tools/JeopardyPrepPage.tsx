import { useState } from 'react'
import { prepTopics } from '../../data/jeopardySite'
import { useLanguage } from '../../context/LanguageContext'
import JeopardyHeader from '../../components/jeopardy/JeopardyHeader'
import '../tools/jeopardy.css'

export default function JeopardyPrepPage() {
  const { t, lang } = useLanguage()
  const [open, setOpen] = useState<string | null>(prepTopics[0].id)

  return (
    <div>
      <JeopardyHeader />
      <div className="page-header">
        <h2>{t('📚 Prep Center')}</h2>
        <p>{t('Study guides, cheat sheets, and drills to get you on the board — straight from the clue categories')}</p>
      </div>

      <div className="j-prep-grid">
        {prepTopics.map((topic) => {
          const isOpen = open === topic.id
          return (
            <div className={`j-prep-card${isOpen ? ' open' : ''}`} key={topic.id}>
              <button className="j-prep-head" onClick={() => setOpen(isOpen ? null : topic.id)}>
                <span className="j-prep-icon">{topic.icon}</span>
                <span className="j-prep-title">
                  <strong>{topic.title}</strong>
                  <small>{lang === 'hi' ? topic.titleSanskrit : topic.title}</small>
                </span>
                <span className="j-prep-chevron">{isOpen ? '▲' : '▼'}</span>
              </button>
              {isOpen && (
                <div className="j-prep-body">
                  <p className="j-prep-summary">{topic.summary}</p>
                  <ul className="j-prep-points">
                    {topic.points.map((pt, i) => (
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
        <a className="btn btn-primary" href="/tools/jeopardy/test">{t('Take the Anytime Test →')}</a>
      </div>
    </div>
  )
}
