import { useState, useRef } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useKeyboard } from '../context/KeyboardContext'
import { useLanguage } from '../context/LanguageContext'

const navSections = [
  {
    title: 'Dashboard',
    links: [
      { to: '/', icon: '🏠', label: 'Overview' },
    ],
  },
  {
    title: 'NCERT Curriculum',
    links: [
      { to: '/research/ncert', icon: '📘', label: 'NCERT Library' },
    ],
  },
  {
    title: 'Learning',
    links: [
      { to: '/learning/tree', icon: '🌳', label: 'Learning Path' },
      { to: '/learning/child', icon: '🧒', label: 'Fun Mode (Kids)' },
      { to: '/learning/research', icon: '🏛️', label: 'Research Workspace' },
      { to: '/learning/curriculum', icon: '👨‍🏫', label: 'Curriculum Builder' },
    ],
  },
  {
    title: 'Research Suite',
    links: [
      { to: '/research/corpus', icon: '📚', label: 'Corpus & Search' },
      { to: '/research/ocr', icon: '📄', label: 'Manuscript OCR' },
      { to: '/research/annotate', icon: '🏛️', label: 'Annotation Tool' },
    ],
  },
  {
    title: 'Visualization',
    links: [
      { to: '/visualization/3d', icon: '🎨', label: '3D Viewer' },
      { to: '/visualization/grammar', icon: '🌳', label: 'Grammar Maps' },
      { to: '/visualization/timeline', icon: '📈', label: 'Timeline' },
    ],
  },
  {
    title: 'Teaching',
    links: [
      { to: '/teaching/dashboard', icon: '👨‍🏫', label: 'Teacher Dashboard' },
      { to: '/teaching/workspace', icon: '🧑‍🎓', label: 'Student Workspace' },
      { to: '/teaching/assessment', icon: '📝', label: 'Assessment' },
    ],
  },
  {
    title: 'AI Tools',
    links: [
      { to: '/tools/tutor', icon: '🤖', label: 'AI Sanskrit Tutor' },
      { to: '/tools/flashcards', icon: '📇', label: 'Flashcards (SRS)' },
      { to: '/tools/bookshelf', icon: '📚', label: 'Bookshelf' },
      { to: '/tools/jeopardy', icon: '🎮', label: 'Sanskrit Jeopardy' },
    ],
  },
  {
    title: 'Exam Practice',
    links: [
      { to: '/viva/simulator', icon: '🎙️', label: 'Viva Simulator' },
      { to: '/viva/lab', icon: '🗣️', label: 'Language Lab' },
      { to: '/viva/analytics', icon: '📊', label: 'Analytics' },
    ],
  },
]

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { theme, toggle } = useTheme()
  const navigate = useNavigate()
  const { keyboardVisible, toggleKeyboard } = useKeyboard()
  const { t, lang, toggle: toggleLang } = useLanguage()
  const kbDummyRef = useRef<HTMLTextAreaElement | null>(null)

  return (
    <div className="app-layout">
      <div className={`sidebar-overlay${sidebarOpen ? ' visible' : ''}`} onClick={() => setSidebarOpen(false)} />

      <nav className={`sidebar${sidebarOpen ? ' open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <div className="sidebar-logo">ॐ</div>
            <div className="sidebar-brand-text">
              <h1>संस्कृतम्</h1>
              <div className="subtitle">SanskritLab</div>
            </div>
          </div>
          <button className="sidebar-close" onClick={() => setSidebarOpen(false)} aria-label={t('Close')}>✕</button>
        </div>
        {navSections.map((section) => (
          <div className="nav-section" key={section.title}>
            <div className="nav-section-title">{t(section.title)}</div>
            {section.links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                <span className="nav-icon">{link.icon}</span>
                {t(link.label)}
              </NavLink>
            ))}
          </div>
        ))}
        <div className="sidebar-footer">
          <span>{t('Theme')}</span>
          <button className="theme-btn" onClick={toggle}>{theme === 'dark' ? '☀️' : '🌙'}</button>
        </div>
      </nav>

      <div className="main-wrapper">
        {/* Vedantu-style top orange navbar */}
        <div className="top-nav">
          <div className="top-nav-left">
            <button className="top-nav-hamburger" onClick={() => setSidebarOpen(true)}>☰</button>
            <div className="top-nav-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
              संस्कृतम् <span>Lab</span>
            </div>
            <div className="top-nav-links">
              <a onClick={() => navigate('/learning/tree')}>{t('Learn')}</a>
              <a onClick={() => navigate('/research/ncert')}>{t('NCERT')}</a>
              <a onClick={() => navigate('/research/corpus')}>{t('Research')}</a>
              <a onClick={() => navigate('/visualization/3d')}>{t('Visualize')}</a>
              <a onClick={() => navigate('/teaching/dashboard')}>{t('Teach')}</a>
              <a onClick={() => navigate('/viva/simulator')}>{t('Practice')}</a>
            </div>
          </div>
          <div className="top-nav-right">
            <button
              className={`btn btn-sm ${lang === 'hi' ? 'btn-primary' : 'btn-outline'}`}
              style={{ marginLeft: 8 }}
              onClick={toggleLang}
              title={t('Language / भाषा')}
            >
              {lang === 'hi' ? 'EN' : 'हि'}
            </button>
            <button
              className={`btn btn-sm ${keyboardVisible ? 'btn-primary' : 'btn-outline'}`}
              style={{ marginLeft: 8 }}
              onClick={() => toggleKeyboard(kbDummyRef as any)}
              title={t('Devanagari Keyboard')}
            >
              ⌨️ देव
            </button>
            <button className="btn-signin" onClick={toggle} title={t('Toggle theme')}>{theme === 'dark' ? '☀️' : '🌙'}</button>
            <button className="btn btn-sm btn-outline" style={{ marginLeft: 8 }} onClick={() => navigate('/tools/tutor')}>🤖 {t('Tutor')}</button>
            <button className="btn btn-sm btn-outline" style={{ marginLeft: 8 }} onClick={() => navigate('/auth/login')}>{t('Sign In')}</button>
          </div>
        </div>

        {/* Mobile header */}
        <header className="mobile-header">
          <button className="hamburger" onClick={() => setSidebarOpen(true)} aria-label={t('Open navigation')}>
            <span /><span /><span />
          </button>
          <span className="mobile-title">संस्कृतम्</span>
          <button className="theme-btn" onClick={toggle}>{theme === 'dark' ? '☀️' : '🌙'}</button>
        </header>

        <main className="main-content">
          <Outlet />
        </main>
        <textarea ref={kbDummyRef} style={{ position: 'absolute', left: -9999, top: -9999, width: 1, height: 1 }} readOnly />

        {/* Footer */}
        <footer className="footer">
          <div className="footer-grid">
            <div className="footer-col">
              <h4>SanskritLab</h4>
              <a onClick={() => navigate('/learning/tree')}>{t('Learning Path')}</a>
              <a onClick={() => navigate('/research/corpus')}>{t('Corpus & Search')}</a>
              <a onClick={() => navigate('/teaching/assessment')}>{t('Assessment')}</a>
              <a onClick={() => navigate('/viva/simulator')}>{t('Viva Practice')}</a>
            </div>
            <div className="footer-col">
              <h4>{t('For Teachers')}</h4>
              <a onClick={() => navigate('/teaching/dashboard')}>{t('Teacher Dashboard')}</a>
              <a onClick={() => navigate('/learning/curriculum')}>{t('Curriculum Builder')}</a>
              <a onClick={() => navigate('/teaching/workspace')}>{t('Student Workspace')}</a>
              <a onClick={() => navigate('/viva/analytics')}>{t('Analytics')}</a>
            </div>
            <div className="footer-col">
              <h4>{t('Research')}</h4>
              <a onClick={() => navigate('/research/ocr')}>{t('Manuscript OCR')}</a>
              <a onClick={() => navigate('/research/annotate')}>{t('Annotation Tool')}</a>
              <a onClick={() => navigate('/learning/research')}>{t('Research Workspace')}</a>
              <a onClick={() => navigate('/visualization/timeline')}>{t('Timeline')}</a>
            </div>
            <div className="footer-col">
              <h4>{t('More')}</h4>
              <a onClick={() => navigate('/')}>{t('Home')}</a>
              <a onClick={() => navigate('/learning/child')}>{t('Kids Mode')}</a>
              <a onClick={() => navigate('/visualization/grammar')}>{t('Grammar Maps')}</a>
              <a onClick={() => navigate('/visualization/3d')}>{t('3D Viewer')}</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>{t('© 2026 SanskritLab. Open source.')}</span>
            <span>{t('Made with ❤️ for Sanskrit')}</span>
          </div>
        </footer>
      </div>
    </div>
  )
}