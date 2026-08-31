import { useEffect, useState } from 'react'
import { BookOpen } from 'lucide-react'
import { newsArticles, type NewsArticle } from '../../data/jeopardySite'
import { loadNewsArticles } from '../../services/contentDb'
import { useLanguage } from '../../context/LanguageContext'
import JeopardyHeader from '../../components/jeopardy/JeopardyHeader'
import '../tools/jeopardy.css'

const tags = ['All', 'News & Events', 'Behind the Scenes', 'Contestants']

export default function JeopardyNewsPage() {
  const { t, lang } = useLanguage()
  const [articles, setArticles] = useState<NewsArticle[] | null>(null)
  const [tag, setTag] = useState('All')

  useEffect(() => {
    let live = true
    loadNewsArticles().then((rows) => {
      if (live) setArticles(rows)
    })
    return () => {
      live = false
    }
  }, [])

  const newsItems = articles ?? newsArticles
  const filtered = tag === 'All' ? newsItems : newsItems.filter((a) => a.tag === tag)

  return (
    <div className="page-container">
      <JeopardyHeader />
      <div className="page-header">
        <h2>{t('Read')}</h2>
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
            <span className="j-news-icon" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <BookOpen size={20} color="var(--vt-orange)" />
            </span>
            <span className="j-news-tag">{t(a.tag)}</span>
            <h4>{lang === 'hi' ? a.titleHi ?? a.title : a.title}</h4>
            <p>{lang === 'hi' ? a.excerptHi ?? a.excerpt : a.excerpt}</p>
            <span className="j-news-date">{a.date}</span>
          </article>
        ))}
      </div>
    </div>
  )
}
