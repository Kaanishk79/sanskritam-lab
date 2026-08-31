import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Shield, Zap, Crown, Globe, Smartphone,
  School, Play, BookOpen, Share2
} from 'lucide-react'
import { jeopardyCategories, doubleJeopardyCategories } from '../../data/jeopardy'
import { newsArticles, type NewsArticle } from '../../data/jeopardySite'
import { loadJeopardyBoard, loadNewsArticles, type JeopardyBoardData } from '../../services/contentDb'
import { useLanguage } from '../../context/LanguageContext'
import JeopardyHeader from '../../components/jeopardy/JeopardyHeader'

const socials = [
  { label: 'Facebook' },
  { label: 'X / Twitter' },
  { label: 'Instagram' },
  { label: 'YouTube' },
  { label: 'TikTok' },
  { label: 'Substack' },
  { label: 'Threads' },
  { label: 'Bluesky' },
]

export default function JeopardyHomePage() {
  const { t, lang } = useLanguage()
  const navigate = useNavigate()
  const [board, setBoard] = useState<JeopardyBoardData | null>(null)
  const [articles, setArticles] = useState<NewsArticle[] | null>(null)

  useEffect(() => {
    let live = true
    loadJeopardyBoard().then((b) => {
      if (live) setBoard(b)
    })
    loadNewsArticles().then((rows) => {
      if (live) setArticles(rows)
    })
    return () => {
      live = false
    }
  }, [])

  const categories = board?.categories ?? jeopardyCategories
  const doubleCategories = board?.doubleCategories ?? doubleJeopardyCategories
  const newsItems = articles ?? newsArticles

  return (
    <div className="page-container">
      <JeopardyHeader />
      <div className="page-header">
        <h2>{t('Sanskrit Jeopardy — Quiz Show')}</h2>
        <p>{t('Play the classic 6×5 game board — reveal an answer, respond with the question, and score points')}</p>
      </div>

      <section className="j-hero">
        <div className="j-hero-inner">
          <h1 className="j-hero-title">
            <span>{t('Welcome to')}</span>
            <span className="j-hero-j">SANSKRIT<br />JEOPARDY!</span>
          </h1>
          <p className="j-hero-sub">
            {t('The classic quiz show format, reborn for the language of the gods — six categories, thirty clues, two rounds, and one final wager.')}
          </p>
          <div className="j-hero-cta">
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/tools/jeopardy/play')} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <Play size={18} fill="currentColor" />
              <span>{t('Play Now — It\'s Free')}</span>
            </button>
            <button className="btn btn-secondary btn-lg" onClick={() => navigate('/tools/jeopardy/test')}>
              {t('Take the Anytime Test')}
            </button>
          </div>
        </div>
      </section>

      <section className="j-section">
        <h3 className="j-section-title">{t('Play the Game')}</h3>
        <div className="j-feature-cards">
          <div className="j-feature-card">
            <span className="j-feature-icon" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <Shield size={28} color="var(--vt-orange)" />
            </span>
            <h4>{t('Jeopardy! Round')}</h4>
            <p>{t('6 categories, 5 clues each — values from 200 to 1000')}</p>
            <div className="j-mini-cats">
              {categories.map((c) => (
                <span key={c.id}>{lang === 'hi' ? c.nameHi ?? c.nameSanskrit : c.name}</span>
              ))}
            </div>
          </div>
          <div className="j-feature-card">
            <span className="j-feature-icon" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={28} color="#ffd54f" />
            </span>
            <h4>{t('Double Jeopardy! Round')}</h4>
            <p>{t('New board, doubled values — from 400 to 2000')}</p>
            <div className="j-mini-cats">
              {doubleCategories.map((c) => (
                <span key={c.id}>{lang === 'hi' ? c.nameHi ?? c.nameSanskrit : c.name}</span>
              ))}
            </div>
          </div>
          <div className="j-feature-card">
            <span className="j-feature-icon" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <Crown size={28} color="#f1c40f" />
            </span>
            <h4>{t('Final Jeopardy!')}</h4>
            <p>{t('Wager your score on one last great saying — the mahāvākyas of the Vedas')}</p>
          </div>
        </div>
      </section>

      <section className="j-section">
        <h3 className="j-section-title">{t('Stream On')}</h3>
        <p className="j-section-sub">{t('Keep learning anywhere — your Sanskrit game travels with you')}</p>
        <div className="j-stream-cards">
          <div className="j-stream-card">
            <span className="j-stream-icon" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <Globe size={26} color="var(--vt-orange)" />
            </span>
            <h4>{t('On the Web')}</h4>
            <p>{t('Full game board, Anytime Test, and Prep Center in your browser')}</p>
            <Link to="/tools/jeopardy/play" className="j-stream-link">{t('Play online →')}</Link>
          </div>
          <div className="j-stream-card">
            <span className="j-stream-icon" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <Smartphone size={26} color="var(--vt-orange)" />
            </span>
            <h4>{t('On Mobile')}</h4>
            <p>{t('Responsive board with tap-to-reveal — works on any phone')}</p>
            <Link to="/tools/jeopardy/play" className="j-stream-link">{t('Try on phone →')}</Link>
          </div>
          <div className="j-stream-card">
            <span className="j-stream-icon" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <School size={26} color="var(--vt-orange)" />
            </span>
            <h4>{t('In the Classroom')}</h4>
            <p>{t('Teachers run Jeopardy tournaments between sections with the built-in scoreboard')}</p>
            <Link to="/tools/jeopardy/play" className="j-stream-link">{t('Teacher mode →')}</Link>
          </div>
        </div>
      </section>

      <section className="j-section">
        <h3 className="j-section-title">{t('Be on the Show')}</h3>
        <p className="j-section-sub">{t('Think you know your Sanskrit? Prove it on the Anytime Test')}</p>
        <div className="j-beon">
          <button className="btn btn-primary btn-lg" onClick={() => navigate('/tools/jeopardy/test')}>
            {t('Take the Anytime Test — 30 questions, 10 minutes')}
          </button>
          <button className="btn btn-secondary btn-lg" onClick={() => navigate('/tools/jeopardy/prep')}>
            {t('Visit the Prep Center')}
          </button>
        </div>
      </section>

      <section className="j-section">
        <div className="j-section-head">
          <h3 className="j-section-title">{t('Read')}</h3>
          <Link to="/tools/jeopardy/news" className="j-stream-link">{t('All news →')}</Link>
        </div>
        <div className="j-news-grid">
          {newsItems.slice(0, 3).map((a) => (
            <div className="j-news-card" key={a.id}>
              <span className="j-news-icon" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <BookOpen size={20} color="var(--vt-orange)" />
              </span>
              <span className="j-news-tag">{t(a.tag)}</span>
              <h4>{lang === 'hi' ? a.titleHi ?? a.title : a.title}</h4>
              <p>{lang === 'hi' ? a.excerptHi ?? a.excerpt : a.excerpt}</p>
              <span className="j-news-date">{a.date}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="j-section j-social-section">
        <h3 className="j-section-title">{t('Follow Sanskrit Jeopardy')}</h3>
        <div className="j-socials">
          {socials.map((s) => (
            <span className="j-social" key={s.label}>
              <Share2 size={13} style={{ marginRight: 6 }} />
              {s.label}
            </span>
          ))}
        </div>
        <p className="j-social-note">{t('Find your station — join the community and sign up for updates')}</p>
      </section>
    </div>
  )
}
