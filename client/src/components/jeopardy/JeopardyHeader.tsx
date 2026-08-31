import { NavLink, useNavigate } from 'react-router-dom'
import { Gamepad2, Target, Clock, BookOpen, Newspaper, Pencil } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { useRole } from '../../context/RoleContext'

const navItems = [
  { to: '/tools/jeopardy', label: 'Sanskrit Jeopardy', icon: Gamepad2, end: true },
  { to: '/tools/jeopardy/play', label: 'Play the Game', icon: Target },
  { to: '/tools/jeopardy/test', label: 'Anytime Test', icon: Clock },
  { to: '/tools/jeopardy/prep', label: 'Prep Center', icon: BookOpen },
  { to: '/tools/jeopardy/news', label: 'Read', icon: Newspaper },
  { to: '/tools/jeopardy/builder', label: 'Quiz Builder', icon: Pencil, schoolOnly: true },
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
        {navItems.filter((i) => !('schoolOnly' in i) || i.schoolOnly !== true || user?.accountType === 'institution').map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `j-nav-link${isActive ? ' active' : ''}`}
            >
              <span className="j-nav-icon"><Icon size={15} /></span>
              <span>{t(item.label)}</span>
            </NavLink>
          )
        })}
      </nav>
    </div>
  )
}
