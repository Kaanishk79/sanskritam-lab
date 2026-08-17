import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import { useRole } from '../../context/RoleContext'

const OPTIONS = [
  {
    key: 'guest',
    icon: '🆓',
    title: 'Free / Guest',
    desc: 'Start exploring instantly — no account, no email. Perfect for a quick look.',
    cta: 'Continue as Guest →',
    features: ['Full access to lessons & tools', 'Progress kept on this device', 'Upgrade anytime to save online'],
  },
  {
    key: 'individual',
    icon: '🧑‍🎓',
    title: 'Individual',
    desc: 'A free personal account to learn at your own pace and track progress across devices.',
    cta: 'Sign up / Sign in →',
    features: ['Unlimited lessons & quizzes', 'Progress, XP & streaks saved', 'Daily challenges & flashcards'],
  },
  {
    key: 'school',
    icon: '🏫',
    title: 'Institution / School',
    desc: 'Register your school, create classes, manage teachers, students and assessments.',
    cta: 'Register School →',
    features: ['Instant school registration', 'School, teacher & student views', 'Rosters, assessments & analytics'],
  },
]

export default function RolePickPage() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const { user, beginGuest } = useRole()

  if (user) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-brand">
            <span className="auth-om">ॐ</span>
            <h2>{t('Welcome Back')}</h2>
            <p>{t('You are signed in as ')}{user.email}</p>
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
            <button className="btn btn-primary" onClick={() => navigate('/')}>{t('Go to Dashboard')}</button>
            <button className="btn btn-secondary" onClick={() => navigate('/auth/login')}>{t('Switch Account')}</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ maxWidth: 760 }}>
        <div className="auth-brand">
          <span className="auth-om">ॐ</span>
          <h2>{t('How would you like to begin?')}</h2>
          <p>{t('Choose how you want to use SanskritLab')}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 12, marginBottom: 16 }}>
          {OPTIONS.map((o) => (
            <div
              key={o.key}
              className="card"
              style={{
                padding: 20,
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                cursor: 'pointer',
                transition: 'transform .15s, border-color .15s',
                border: '1px solid rgba(255,140,0,0.25)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = '#ff8c00' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'rgba(255,140,0,0.25)' }}
              onClick={() => {
                if (o.key === 'guest') {
                  beginGuest()
                  navigate('/')
                } else if (o.key === 'individual') {
                  navigate('/auth/login')
                } else {
                  navigate('/auth/signup?type=institution')
                }
              }}
            >
              <div style={{ fontSize: 34 }}>{o.icon}</div>
              <strong style={{ fontSize: 15 }}>{t(o.title)}</strong>
              <p style={{ fontSize: 12.5, color: '#aaa', margin: 0, lineHeight: 1.5 }}>{t(o.desc)}</p>
              <ul style={{ margin: '4px 0 8px', paddingLeft: 16, fontSize: 12, color: '#bbb', lineHeight: 1.7 }}>
                {o.features.map((f) => (
                  <li key={f}>{t(f)}</li>
                ))}
              </ul>
              <button className="btn btn-sm btn-primary" style={{ marginTop: 'auto', justifyContent: 'center' }}>{t(o.cta)}</button>
            </div>
          ))}
        </div>

        <div className="auth-footer" style={{ margin: 0 }}>
          {t('Already have an account? ')}<a onClick={() => navigate('/auth/login')}>{t('Sign in')}</a>
          {' · '}
          {t('New here? ')}<a onClick={() => navigate('/auth/signup')}>{t('Create account')}</a>
        </div>
      </div>
    </div>
  )
}
