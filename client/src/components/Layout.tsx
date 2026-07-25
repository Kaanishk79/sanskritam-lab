import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const navSections = [
  {
    title: 'Dashboard',
    links: [
      { to: '/', icon: '🏠', label: 'Overview' },
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
    title: 'Exam Practice',
    links: [
      { to: '/viva/simulator', icon: '🎙️', label: 'Viva Simulator' },
      { to: '/viva/analytics', icon: '📊', label: 'Analytics' },
    ],
  },
]

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { theme, toggle } = useTheme()
  const navigate = useNavigate()

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
          <button className="sidebar-close" onClick={() => setSidebarOpen(false)} aria-label="Close">✕</button>
        </div>
        {navSections.map((section) => (
          <div className="nav-section" key={section.title}>
            <div className="nav-section-title">{section.title}</div>
            {section.links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                <span className="nav-icon">{link.icon}</span>
                {link.label}
              </NavLink>
            ))}
          </div>
        ))}
        <div className="sidebar-footer">
          <span>Theme</span>
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
              <a onClick={() => navigate('/learning/tree')}>Learn</a>
              <a onClick={() => navigate('/research/corpus')}>Research</a>
              <a onClick={() => navigate('/visualization/3d')}>Visualize</a>
              <a onClick={() => navigate('/teaching/dashboard')}>Teach</a>
              <a onClick={() => navigate('/viva/simulator')}>Practice</a>
            </div>
          </div>
          <div className="top-nav-right">
            <button className="btn-signin" onClick={toggle}>{theme === 'dark' ? '☀️' : '🌙'}</button>
          </div>
        </div>

        {/* Mobile header */}
        <header className="mobile-header">
          <button className="hamburger" onClick={() => setSidebarOpen(true)} aria-label="Open navigation">
            <span /><span /><span />
          </button>
          <span className="mobile-title">संस्कृतम्</span>
          <button className="theme-btn" onClick={toggle}>{theme === 'dark' ? '☀️' : '🌙'}</button>
        </header>

        <main className="main-content">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-grid">
            <div className="footer-col">
              <h4>SanskritLab</h4>
              <a onClick={() => navigate('/learning/tree')}>Learning Path</a>
              <a onClick={() => navigate('/research/corpus')}>Corpus</a>
              <a onClick={() => navigate('/teaching/assessment')}>Assessment</a>
              <a onClick={() => navigate('/viva/simulator')}>Viva Practice</a>
            </div>
            <div className="footer-col">
              <h4>For Teachers</h4>
              <a onClick={() => navigate('/teaching/dashboard')}>Dashboard</a>
              <a onClick={() => navigate('/learning/curriculum')}>Curriculum Builder</a>
              <a onClick={() => navigate('/teaching/workspace')}>Student Workspace</a>
              <a onClick={() => navigate('/viva/analytics')}>Analytics</a>
            </div>
            <div className="footer-col">
              <h4>Research</h4>
              <a onClick={() => navigate('/research/ocr')}>Manuscript OCR</a>
              <a onClick={() => navigate('/research/annotate')}>Annotation Tool</a>
              <a onClick={() => navigate('/learning/research')}>Research Workspace</a>
              <a onClick={() => navigate('/visualization/timeline')}>Timeline</a>
            </div>
            <div className="footer-col">
              <h4>More</h4>
              <a onClick={() => navigate('/')}>Home</a>
              <a onClick={() => navigate('/learning/child')}>Kids Mode</a>
              <a onClick={() => navigate('/visualization/grammar')}>Grammar Maps</a>
              <a onClick={() => navigate('/visualization/3d')}>3D Viewer</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 SanskritLab. Open source.</span>
            <span>Made with ❤️ for Sanskrit</span>
          </div>
        </footer>
      </div>
    </div>
  )
}