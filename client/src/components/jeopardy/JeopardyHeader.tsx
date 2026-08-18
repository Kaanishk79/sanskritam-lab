import { NavLink, useNavigate } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import { useRole } from '../../context/RoleContext'

const navItems = [
  { to: '/tools/jeopardy', label: 'Sanskrit Jeopardy', icon: '🎮', end: true },
  { to: '/tools/jeopardy/play', label: 'Play the Game', icon: '🎯' },
  { to: '/tools/jeopardy/test', label: 'Anytime Test', icon: '⏱️' },
  { to: '/tools/jeopardy/prep', label: 'Prep Center', icon: '📚' },
  { to: '/tools/jeopardy/news', label: 'Read', icon: '📰' },
  { to: '/tools/jeopardy/builder', label: 'Quiz Builder', icon: '✏️', schoolOnly: true },
]

export default function JeopardyHeader() {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const { user } = useRole()

  return (
    <div className="j-site-header">
      <button className="j-logo" onClick={() => navigate('/tools/jeopardy')}>
        <span className="j-logo-word">SANSKRIT</span>
        <span className="j-logo-word j-logo-accent">JEOPARDY!</span>
      </button>
      <nav className="j-site-nav">
        {navItems.filter((i) => !('schoolOnly' in i) || i.schoolOnly !== true || user?.accountType === 'institution').map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => `j-nav-link${isActive ? ' active' : ''}`}
          >
            <span className="j-nav-icon">{item.icon}</span>
            <span>{t(item.label)}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
