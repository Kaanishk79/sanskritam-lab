import { useNavigate } from 'react-router-dom'
import { tracks } from '../../data/tracks'
import { useLanguage } from '../../context/LanguageContext'
import { useRole } from '../../context/RoleContext'

const features = [
  { icon: '🔍', title: 'Sanskrit Search', desc: 'Search words, lessons, texts and topics in Sanskrit or English with live suggestions.', link: '/search' },
  { icon: '✨', title: 'Explore Mode', desc: 'Click any word — राम — and see meaning, grammar, pronunciation, related words and text references.', link: '/explore' },
  { icon: '📖', title: 'Sanskrit Dictionary', desc: 'Word meaning, Devanagari, transliteration, English meanings, examples and related words.', link: '/dictionary' },
  { icon: '🌅', title: 'Daily Sanskrit', desc: 'Word, phrase and verse of the day plus a 5-minute challenge — every day.', link: '/daily' },
  { icon: '📜', title: 'Manuscript Digitization', desc: 'Convert scanned Devanāgarī & Grantha manuscripts into searchable Unicode with OCR.', link: '/research/ocr' },
  { icon: '🏛️', title: 'Smart Corpus & Search', desc: 'Explore texts by time period with semantic search and dictionary integration.', link: '/research/corpus' },
  { icon: '🏛️', title: 'Layered Annotation', desc: 'Add grammar breakdowns, commentaries, and translations to any text.', link: '/research/annotate' },
  { icon: '🪔', title: 'Shloka Explorer', desc: 'Classical verses with translation alongside — click any word to see its meaning.', link: '/tools/shloka' },
  { icon: '🔤', title: 'Transliteration Tool', desc: 'Live Devanagari ⇄ IAST conversion in both directions.', link: '/tools/transliterate' },
  { icon: '🔊', title: 'Sandhi Tool', desc: 'Join words and see the exact sandhi rule — Guṇa, Vṛddhi, Yaṇ, Visarga — explained.', link: '/tools/sandhi' },
  { icon: '🌱', title: 'Dhātu Explorer', desc: 'Browse verbal roots: gaṇa, meaning and present-tense forms.', link: '/tools/dhatu' },
  { icon: '🎨', title: '3D Manuscript Viewer', desc: 'Interactive 3D palm-leaf models with digitized text overlays.', link: '/visualization/3d' },
  { icon: '🌳', title: 'Grammar & Mind Maps', desc: 'Pāṇini\'s rules as branching diagrams. Philosophy networks visualized.', link: '/visualization/grammar' },
  { icon: '📈', title: 'Evolutionary Timeline', desc: '3000 years of Sanskrit evolution on an interactive timeline.', link: '/visualization/timeline' },
  { icon: '🎓', title: 'Teacher Dashboard', desc: 'Lesson plans, exercises, manuscript annotations for your class.', link: '/teaching/dashboard' },
  { icon: '🧑‍🎓', title: 'Student Workspace', desc: 'Guided learning with interactive texts and collaboration tools.', link: '/teaching/workspace' },
  { icon: '📝', title: 'Assessment Engine', desc: 'Auto-generated drills for declensions, sandhi, and grammar.', link: '/teaching/assessment' },
  { icon: '🎙️', title: 'AI Viva Simulator', desc: 'Oral exams with audio evaluation and real-time pronunciation feedback.', link: '/viva/simulator' },
  { icon: '📊', title: 'Analytics Engine', desc: 'Track performance, find weak areas, get customized study paths.', link: '/viva/analytics' },
  { icon: '🧒', title: 'Fun Learning Mode', desc: 'Kid-friendly flashcards, picture-word games, and colorful activities.', link: '/learning/child' },
  { icon: '🤖', title: 'AI Sanskrit Tutor', desc: 'Chat with an AI tutor about Sanskrit grammar, texts, and philosophy.', link: '/tools/tutor' },
  { icon: '📇', title: 'SRS Flashcards', desc: 'Anki-style spaced repetition for vocabulary, grammar, and more.', link: '/tools/flashcards' },
  { icon: '🔐', title: 'Account & Auth', desc: 'Sign up or sign in to track your progress across devices.', link: '/auth' },
]

const testimonials = [
  { text: 'This platform transformed how I teach Sanskrit. The annotation tools and 3D manuscripts bring ancient texts to life for my students.', author: 'Dr. Ananya Sharma', role: 'Professor, University of Delhi', initial: 'A' },
  { text: 'The adaptive learning path from alphabet to critical editions is incredible. I went from zero to reading Kālidāsa in 6 months.', author: 'Rajesh Patel', role: 'PhD Candidate, Oxford', initial: 'R' },
  { text: 'My 8-year-old loves the fun mode! The picture-word matching makes learning Sanskrit feel like play.', author: 'Priya Krishnan', role: 'Parent & Homeschool Teacher', initial: 'P' },
  { text: 'The AI viva simulator helped me prepare for my oral exams with accurate pronunciation feedback.', author: 'Sneha Reddy', role: 'MA Sanskrit Student', initial: 'S' },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const { guest } = useRole()

  return (
    <>
      {/* HERO */}
      {guest && (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, flexWrap: 'wrap',
          padding: '10px 16px', margin: '12px 0', borderRadius: 10,
          background: 'rgba(255,140,0,0.1)', border: '1px solid rgba(255,140,0,0.35)',
        }}>
          <span style={{ fontSize: 13, color: '#fff' }}>🆓 {t('You are in Guest mode — progress is kept on this device only.')}</span>
          <button className="btn btn-sm btn-primary" onClick={() => navigate('/auth')}>{t('Create Free Account')}</button>
          <button className="btn btn-sm btn-outline" onClick={() => navigate('/auth/login')}>{t('Sign In')}</button>
        </div>
      )}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-tag">🌟 {t("India's Most Advanced Sanskrit Platform")}</div>
            <h1>
              {t('Bridge ')}<span className="highlight">{t('Ancient Wisdom')}</span><br />{t('with Modern Technology')}
            </h1>
            <p>
              {t('From playful alphabet games for children to PhD-level critical edition tools — \n              SanskritLab brings 3000 years of language, literature, and philosophy to your fingertips.')}
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => navigate('/learning/tree')}>
                {t('Start Learning Free →')}
              </button>
              <button className="btn btn-outline" onClick={() => navigate('/research/corpus')}>
                {t('Explore Corpus')}
              </button>
            </div>
          </div>
          <div className="hero-right">
            <div className="hero-card">
              <div className="price">{t('100% Free')}</div>
              <div className="price-label">{t('Lifetime access · No hidden fees')}</div>
              <ul>
                <li>{t('12+ curated lessons')}</li>
                <li>{t('5 learning tracks (Child → PhD)')}</li>
                <li>{t('AI viva simulator')}</li>
                <li>{t('Research & annotation tools')}</li>
                <li>{t('3D manuscript viewer')}</li>
                <li>{t('Open source')}</li>
              </ul>
              <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => navigate('/learning/tree')}>
                {t('Get Started Free')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <div className="stats-bar">
        <div className="stat-item">
          <div className="stat-value">3,000+</div>
          <div className="stat-label">{t('Years of Texts')}</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">12</div>
          <div className="stat-label">{t('Curated Lessons')}</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">5</div>
          <div className="stat-label">{t('Learning Tracks')}</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">2.1k+</div>
          <div className="stat-label">{t('Lines of Code')}</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">100%</div>
          <div className="stat-label">{t('Free & Open')}</div>
        </div>
      </div>

      {/* NCERT CTA BANNER */}
      <section className="section" style={{ paddingTop: 8 }}>
        <div
          className="ncert-hero-banner"
          onClick={() => navigate('/research/ncert')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            padding: '24px 32px',
            borderRadius: 12,
            background: 'linear-gradient(135deg, #2ecc71, #2980b9)',
            color: '#fff',
            cursor: 'pointer',
            marginBottom: 8,
          }}
        >
          <span style={{ fontSize: 48 }}>📘</span>
          <div style={{ flex: 1 }}>
            <h3 style={{ margin: 0, fontSize: 22, color: '#fff' }}>{t('NCERT Sanskrit Curriculum')}</h3>
            <p style={{ margin: '4px 0 0', opacity: 0.9, fontSize: 14 }}>
              {t('Class 6–12 textbooks (Deepakam, Shemushi, Bhaswati & Shashwati) — all NCERT content in one place')}
            </p>
          </div>
          <span style={{ fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap' }}>{t('Browse Library →')}</span>
        </div>
      </section>

      {/* LEARNING TRACKS */}
      <section className="section">
        <div className="section-header">
          <h2>{t('Choose Your Learning Path')}</h2>
          <p>{t('From young beginners to doctoral researchers — a track for every stage')}</p>
        </div>
        <div className="track-row">
          {tracks.map((track) => (
            <div key={track.id} className="track-card" onClick={() => navigate('/learning/tree')}>
              <span className="track-icon">{track.icon}</span>
              <h3>{t(track.label)}</h3>
              <div className="track-desc">{t(track.description)}</div>
              <div className="track-age">{t(track.classRange)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-header">
          <h2>{t('Everything You Need')}</h2>
          <p>{t('Research tools, visualization, teaching, assessment — all in one platform')}</p>
        </div>
        <div className="card-grid">
          {features.map((f) => (
            <div key={f.title} className="vt-card" onClick={() => navigate(f.link)}>
              <div className="card-icon">{f.icon}</div>
              <h3>{t(f.title)}</h3>
              <p>{t(f.desc)}</p>
              <span className="card-link">{t('Explore →')}</span>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-header">
          <h2>{t('What Our Users Say')}</h2>
          <p>{t('Loved by students, teachers, and researchers worldwide')}</p>
        </div>
        <div className="testimonial-row">
          {testimonials.map((tm) => (
            <div key={tm.author} className="testimonial-card">
              <div className="stars">★★★★★</div>
              <div className="quote">"{t(tm.text)}"</div>
              <div className="author">
                <div className="avatar">{tm.initial}</div>
                <div>
                  <div className="name">{tm.author}</div>
                  <div className="role">{t(tm.role)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="cta-bar">
        <h2>{t('Ready to Begin Your Journey?')}</h2>
        <p>{t('Join thousands of learners exploring Sanskrit through cutting-edge technology. Free forever.')}</p>
        <button className="btn" onClick={() => navigate('/learning/tree')}>
          {t('Start Learning Now 🚀')}
        </button>
      </div>
    </>
  )
}