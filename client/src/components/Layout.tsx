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
      { to: '/visualization/3d', icon: '🎨', label: '3D Manuscript Viewer' },
      { to: '/visualization/grammar', icon: '🌳', label: 'Grammar Maps' },
      { to: '/visualization/timeline', icon: '📈', label: 'Timeline' },
    ],
  },
  {
    title: 'Teaching',
    links: [
      { to: '/teaching/dashboard', icon: '👨‍🏫', label: 'Teacher Dashboard' },
      { to: '/teaching/workspace', icon: '🧑‍🎓', label: 'Student Workspace' },
      { to: '/teaching/assessment', icon: '📝', label: 'Assessment Engine' },
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
  return (
    <div className="app-layout">
      <nav className="sidebar">
        <div className="sidebar-header">
          <h1>संस्कृतम्</h1>
          <div className="subtitle">SanskritLab</div>
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
              >
                <span className="nav-icon">{link.icon}</span>
                {link.label}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}