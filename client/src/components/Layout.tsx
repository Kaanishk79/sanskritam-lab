import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const navSections = [
  {
    title: 'Dashboard',
    links: [
      { to: '/', icon: '🏠', label: 'Overview' },
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

  return (
    <div className="app-layout">
      <div className={`sidebar-overlay${sidebarOpen ? ' visible' : ''}`} onClick={() => setSidebarOpen(false)} />

      <nav className={`sidebar${sidebarOpen ? ' open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <h1>संस्कृतम्</h1>
            <div className="sidebar-subtitle">SanskritLab</div>
          </div>
          <button className="sidebar-close" onClick={() => setSidebarOpen(false)} aria-label="Close navigation">
            ✕
          </button>
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
      </nav>

      <div className="main-wrapper">
        <header className="mobile-header">
          <button className="hamburger" onClick={() => setSidebarOpen(true)} aria-label="Open navigation">
            <span /><span /><span />
          </button>
          <span className="mobile-title">संस्कृतम्</span>
        </header>
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}