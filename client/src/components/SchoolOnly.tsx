import { useNavigate } from 'react-router-dom'
import { useRole } from '../context/RoleContext'
import { useLanguage } from '../context/LanguageContext'

export default function SchoolOnly({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const { user, guest } = useRole()
  const { t } = useLanguage()

  if (user?.accountType === 'institution') return <>{children}</>

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <span style={{ fontSize: 40 }}>🔒</span>
          <h2>{t('School feature')}</h2>
          <p>{t('The Language Lab is available only to institution / school accounts.')}</p>
        </div>

        <div className="card" style={{ textAlign: 'center', padding: 28 }}>
          <p style={{ color: '#aaa', fontSize: 13.5, lineHeight: 1.7, marginBottom: 18 }}>
            {t('Sign in with a school account — or register your school for free — to unlock the Pronunciation Lab with speech recognition, recordings, and teacher feedback.')}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
            {guest && (
              <button className="btn btn-primary" onClick={() => navigate('/auth/login')}>
                {t('Sign In')}
              </button>
            )}
            <button className="btn btn-primary" onClick={() => navigate('/auth/signup?type=institution')}>
              🏫 {t('Register School')}
            </button>
            {!guest && (
              <button className="btn btn-secondary" onClick={() => navigate('/auth/login')}>
                {t('Sign In')}
              </button>
            )}
            <button className="btn btn-outline" onClick={() => navigate('/')}>
              {t('Go to Dashboard')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
