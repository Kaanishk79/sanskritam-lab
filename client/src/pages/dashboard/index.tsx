import { useNavigate } from 'react-router-dom'
import { tracks } from '../../data/tracks'

const features = [
  { icon: '📜', title: 'Manuscript Digitization', desc: 'Convert scanned Devanāgarī and Grantha manuscripts into searchable Unicode text with OCR.', link: '/research/ocr', color: '#f59e0b' },
  { icon: '🔍', title: 'Smart Corpus & Search', desc: 'Explore a vast library of texts sorted by time period with semantic search and dictionary integration.', link: '/research/corpus', color: '#10b981' },
  { icon: '🏛️', title: 'Layered Annotation', desc: 'Add multi-level notes to texts — grammar breakdowns, classical commentaries, and translations.', link: '/research/annotate', color: '#8b5cf6' },
  { icon: '🎨', title: '3D Manuscript Viewer', desc: 'Interactive 3D models of palm-leaf manuscripts with digitized text overlays.', link: '/visualization/3d', color: '#ec4899' },
  { icon: '🌳', title: 'Grammar & Mind Maps', desc: '3D branching diagrams of Pāṇini\'s rules and network maps connecting philosophy schools.', link: '/visualization/grammar', color: '#14b8a6' },
  { icon: '📈', title: 'Evolutionary Timeline', desc: 'Interactive timelines showing how Sanskrit language evolved over three millennia.', link: '/visualization/timeline', color: '#f97316' },
  { icon: '🎓', title: 'Teacher Dashboard', desc: 'Create custom lesson plans, design exercises, and annotate manuscripts for your classes.', link: '/teaching/dashboard', color: '#3b82f6' },
  { icon: '🧑‍🎓', title: 'Student Workspace', desc: 'Guided learning with interactive texts, visualization tools, and real-time collaboration.', link: '/teaching/workspace', color: '#06b6d4' },
  { icon: '📝', title: 'Assessment Engine', desc: 'Auto-generated drills for declensions, sandhi exercises, and timed practice quizzes.', link: '/teaching/assessment', color: '#84cc16' },
  { icon: '🎙️', title: 'AI Viva Simulator', desc: 'Interactive AI oral exams with audio response evaluation and real-time pronunciation feedback.', link: '/viva/simulator', color: '#a855f7' },
  { icon: '📊', title: 'Analytics Engine', desc: 'Track performance, highlight weak areas in grammar or reading, and get customized study paths.', link: '/viva/analytics', color: '#e11d48' },
  { icon: '🧒', title: 'Fun Learning Mode', desc: 'Kid-friendly alphabet flashcards, picture-word matching games, and colorful activities.', link: '/learning/child', color: '#f59e0b' },
]

const testimonials = [
  { text: 'This platform transformed how I teach Sanskrit. The annotation tools and 3D manuscripts bring ancient texts to life for my students.', author: 'Dr. Ananya Sharma', role: 'Professor of Sanskrit, University of Delhi', initial: 'A' },
  { text: 'The adaptive learning path from alphabet to critical editions is incredible. I went from zero to reading Kālidāsa in 6 months.', author: 'Rajesh Patel', role: 'PhD Candidate, Oxford University', initial: 'R' },
  { text: 'My 8-year-old loves the fun mode! The picture-word matching and alphabet cards make learning Sanskrit feel like play.', author: 'Priya Krishnan', role: 'Parent & Homeschool Teacher', initial: 'P' },
  { text: 'The AI viva simulator helped me prepare for my oral exams. The feedback on pronunciation was remarkably accurate.', author: 'Sneha Reddy', role: 'MA Sanskrit Student', initial: 'S' },
]

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <div>
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">🌟 India's Most Advanced Sanskrit Learning Platform</div>
          <h1 className="hero-title">
            Bridge <span className="highlight">Ancient Wisdom</span><br />with Modern Technology
          </h1>
          <p className="hero-subtitle">
            From playful alphabet games for children to PhD-level critical edition tools — 
            SanskritLab brings 3000 years of language, literature, and philosophy to your fingertips.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => navigate('/learning/tree')}>
              Start Learning Free →
            </button>
            <button className="btn btn-outline" onClick={() => navigate('/research/corpus')}>
              Explore Corpus
            </button>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-value">3,000+</div>
              <div className="hero-stat-label">Years of Texts</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">12</div>
              <div className="hero-stat-label">Curated Lessons</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">5</div>
              <div className="hero-stat-label">Learning Tracks</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">100%</div>
              <div className="hero-stat-label">Free & Open Source</div>
            </div>
          </div>
        </div>
      </section>

      {/* LEARNING TRACKS */}
      <section style={{ marginBottom: 48 }}>
        <h2 className="section-title">Choose Your Learning Path</h2>
        <p className="section-subtitle">From young beginners to doctoral researchers — a track for every stage</p>
        <div className="track-grid">
          {tracks.map((track) => (
            <div
              key={track.id}
              className="track-card"
              onClick={() => navigate('/learning/tree')}
              style={{ cursor: 'pointer' }}
            >
              <span className="track-icon">{track.icon}</span>
              <h3>{track.label}</h3>
              <div className="track-desc">{track.description}</div>
              <div className="track-meta">
                <span>{track.ageRange}</span>
                <span>{track.levels.join(' → ')}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ALL FEATURES */}
      <section style={{ marginBottom: 48 }}>
        <h2 className="section-title">Everything You Need</h2>
        <p className="section-subtitle">Research tools, visualization, teaching, assessment — all in one platform</p>
        <div className="feature-grid">
          {features.map((f) => (
            <div
              key={f.title}
              className="feature-card"
              onClick={() => navigate(f.link)}
              style={{ cursor: 'pointer' }}
            >
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
              <span className="feature-link">
                Explore → 
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ marginBottom: 48 }}>
        <h2 className="section-title">What Our Users Say</h2>
        <p className="section-subtitle">Loved by students, teachers, and researchers worldwide</p>
        <div className="testimonial-grid">
          {testimonials.map((t) => (
            <div key={t.author} className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <div className="testimonial-text">"{t.text}"</div>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.initial}</div>
                <div>
                  <div className="testimonial-name">{t.author}</div>
                  <div className="testimonial-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2>Ready to Begin Your Journey?</h2>
        <p>Join thousands of learners exploring Sanskrit through cutting-edge technology. Free forever.</p>
        <button className="btn btn-primary" onClick={() => navigate('/learning/tree')}>
          Start Learning Now 🚀
        </button>
      </section>
    </div>
  )
}