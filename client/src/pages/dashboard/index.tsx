import { useNavigate } from 'react-router-dom'
import { tracks } from '../../data/tracks'

const features = [
  { icon: '📜', title: 'Manuscript Digitization', desc: 'Convert scanned Devanāgarī & Grantha manuscripts into searchable Unicode with OCR.', link: '/research/ocr' },
  { icon: '🔍', title: 'Smart Corpus & Search', desc: 'Explore texts by time period with semantic search and dictionary integration.', link: '/research/corpus' },
  { icon: '🏛️', title: 'Layered Annotation', desc: 'Add grammar breakdowns, commentaries, and translations to any text.', link: '/research/annotate' },
  { icon: '🎨', title: '3D Manuscript Viewer', desc: 'Interactive 3D palm-leaf models with digitized text overlays.', link: '/visualization/3d' },
  { icon: '🌳', title: 'Grammar & Mind Maps', desc: 'Pāṇini\'s rules as branching diagrams. Philosophy networks visualized.', link: '/visualization/grammar' },
  { icon: '📈', title: 'Evolutionary Timeline', desc: '3000 years of Sanskrit evolution on an interactive timeline.', link: '/visualization/timeline' },
  { icon: '🎓', title: 'Teacher Dashboard', desc: 'Lesson plans, exercises, manuscript annotations for your class.', link: '/teaching/dashboard' },
  { icon: '🧑‍🎓', title: 'Student Workspace', desc: 'Guided learning with interactive texts and collaboration tools.', link: '/teaching/workspace' },
  { icon: '📝', title: 'Assessment Engine', desc: 'Auto-generated drills for declensions, sandhi, and grammar.', link: '/teaching/assessment' },
  { icon: '🎙️', title: 'AI Viva Simulator', desc: 'Oral exams with audio evaluation and real-time pronunciation feedback.', link: '/viva/simulator' },
  { icon: '📊', title: 'Analytics Engine', desc: 'Track performance, find weak areas, get customized study paths.', link: '/viva/analytics' },
  { icon: '🧒', title: 'Fun Learning Mode', desc: 'Kid-friendly flashcards, picture-word games, and colorful activities.', link: '/learning/child' },
]

const testimonials = [
  { text: 'This platform transformed how I teach Sanskrit. The annotation tools and 3D manuscripts bring ancient texts to life for my students.', author: 'Dr. Ananya Sharma', role: 'Professor, University of Delhi', initial: 'A' },
  { text: 'The adaptive learning path from alphabet to critical editions is incredible. I went from zero to reading Kālidāsa in 6 months.', author: 'Rajesh Patel', role: 'PhD Candidate, Oxford', initial: 'R' },
  { text: 'My 8-year-old loves the fun mode! The picture-word matching makes learning Sanskrit feel like play.', author: 'Priya Krishnan', role: 'Parent & Homeschool Teacher', initial: 'P' },
  { text: 'The AI viva simulator helped me prepare for my oral exams with accurate pronunciation feedback.', author: 'Sneha Reddy', role: 'MA Sanskrit Student', initial: 'S' },
]

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-tag">🌟 India's Most Advanced Sanskrit Platform</div>
            <h1>
              Bridge <span className="highlight">Ancient Wisdom</span><br />with Modern Technology
            </h1>
            <p>
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
          </div>
          <div className="hero-right">
            <div className="hero-card">
              <div className="price">100% Free</div>
              <div className="price-label">Lifetime access · No hidden fees</div>
              <ul>
                <li>12+ curated lessons</li>
                <li>5 learning tracks (Child → PhD)</li>
                <li>AI viva simulator</li>
                <li>Research & annotation tools</li>
                <li>3D manuscript viewer</li>
                <li>Open source</li>
              </ul>
              <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => navigate('/learning/tree')}>
                Get Started Free
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <div className="stats-bar">
        <div className="stat-item">
          <div className="stat-value">3,000+</div>
          <div className="stat-label">Years of Texts</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">12</div>
          <div className="stat-label">Curated Lessons</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">5</div>
          <div className="stat-label">Learning Tracks</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">2.1k+</div>
          <div className="stat-label">Lines of Code</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">100%</div>
          <div className="stat-label">Free & Open</div>
        </div>
      </div>

      {/* LEARNING TRACKS */}
      <section className="section">
        <div className="section-header">
          <h2>Choose Your Learning Path</h2>
          <p>From young beginners to doctoral researchers — a track for every stage</p>
        </div>
        <div className="track-row">
          {tracks.map((track) => (
            <div key={track.id} className="track-card" onClick={() => navigate('/learning/tree')}>
              <span className="track-icon">{track.icon}</span>
              <h3>{track.label}</h3>
              <div className="track-desc">{track.description}</div>
              <div className="track-age">{track.ageRange}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-header">
          <h2>Everything You Need</h2>
          <p>Research tools, visualization, teaching, assessment — all in one platform</p>
        </div>
        <div className="card-grid">
          {features.map((f) => (
            <div key={f.title} className="vt-card" onClick={() => navigate(f.link)}>
              <div className="card-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
              <span className="card-link">Explore →</span>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-header">
          <h2>What Our Users Say</h2>
          <p>Loved by students, teachers, and researchers worldwide</p>
        </div>
        <div className="testimonial-row">
          {testimonials.map((t) => (
            <div key={t.author} className="testimonial-card">
              <div className="stars">★★★★★</div>
              <div className="quote">"{t.text}"</div>
              <div className="author">
                <div className="avatar">{t.initial}</div>
                <div>
                  <div className="name">{t.author}</div>
                  <div className="role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="cta-bar">
        <h2>Ready to Begin Your Journey?</h2>
        <p>Join thousands of learners exploring Sanskrit through cutting-edge technology. Free forever.</p>
        <button className="btn" onClick={() => navigate('/learning/tree')}>
          Start Learning Now 🚀
        </button>
      </div>
    </>
  )
}