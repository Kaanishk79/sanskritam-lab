import { useState } from 'react'
import { newsArticles } from '../../data/jeopardySite'
import { useLanguage } from '../../context/LanguageContext'
import JeopardyHeader from '../../components/jeopardy/JeopardyHeader'
import '../tools/jeopardy.css'

const tags = ['All', 'News & Events', 'Behind the Scenes', 'Contestants']

export default function JeopardyNewsPage() {
  const { t } = useLanguage()
  const [tag, setTag] = useState('All')

  const filtered = tag === 'All' ? newsArticles : newsArticles.filter((a) => a.tag === tag)

  return (
    <div>
      <JeopardyHeader />
      <div className="page-header">
        <h2>{t('📰 Read')}</h2>
        <p>{t('News & Events, Behind the Scenes, and Contestant stories from the SanskritLab community')}</p>
      </div>

      <div className="j-news-tabs">
        {tags.map((tg) => (
          <button
            key={tg}
            className={`btn btn-sm ${tag === tg ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setTag(tg)}
          >
            {t(tg)}
          </button>
        ))}
      </div>

      <div className="j-news-grid">
        {filtered.map((a) => (
          <article className="j-news-card" key={a.id}>
            <span className="j-news-icon">{a.icon}</span>
            <span className="j-news-tag">{t(a.tag)}</span>
            <h4>{a.title}</h4>
            <p>{a.excerpt}</p>
            <span className="j-news-date">{a.date}</span>
          </article>
        ))}
      </div>
    </div>
  )
}
