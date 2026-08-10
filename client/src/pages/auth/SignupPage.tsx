import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { signUp, getAuthState, onAuthChange } from '../../services/auth'
import { useLanguage } from '../../context/LanguageContext'

export default function SignupPage() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const unsub = onAuthChange((s) => { if (s.user) navigate('/') })
    return unsub
  }, [navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await signUp(email, password, name)
      navigate('/')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const user = getAuthState().user

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <span className="auth-om">ॐ</span>
          <h2>{t('Create Account')}</h2>
          <p>{t('Join SanskritLab — free forever')}</p>
        </div>

        {user ? (
          <div className="card" style={{ textAlign: 'center', padding: 32 }}>
            <p style={{ color: '#4caf50', marginBottom: 16 }}>{t('You are signed in as ')}{user.email}</p>
            <button className="btn btn-primary" onClick={() => navigate('/')}>{t('Go to Dashboard')}</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && <div className="auth-error">{error}</div>}
            <div className="form-group">
              <label>{t('Full Name')}</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={t('Your name')} required />
            </div>
            <div className="form-group">
              <label>{t('Email')}</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required />
            </div>
            <div className="form-group">
              <label>{t('Password')}</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t('At least 6 characters')} required minLength={6} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
              {loading ? t('Creating account...') : t('Create Account')}
            </button>
          </form>
        )}

        <div className="auth-footer">
          {t('Already have an account? ')}<a onClick={() => navigate('/auth/login')}>{t('Sign in')}</a>
        </div>
      </div>
    </div>
  )
}
