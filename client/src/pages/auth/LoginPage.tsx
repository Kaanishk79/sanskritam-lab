import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { signIn, getAuthState, onAuthChange } from '../../services/auth'
import { useLanguage } from '../../context/LanguageContext'

export default function LoginPage() {
  const navigate = useNavigate()
  const { t } = useLanguage()
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
      await signIn(email, password)
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
          <h2>{t('Welcome Back')}</h2>
          <p>{t('Sign in to your SanskritLab account')}</p>
        </div>

        {user ? (
          <div className="card" style={{ textAlign: 'center', padding: 32 }}>
            <p style={{ color: '#4caf50', marginBottom: 16 }}>{t('You are already signed in as ')}{user.email}</p>
            <button className="btn btn-primary" onClick={() => navigate('/')}>{t('Go to Dashboard')}</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && <div className="auth-error">{error}</div>}
            <div className="form-group">
              <label>{t('Email')}</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required />
            </div>
            <div className="form-group">
              <label>{t('Password')}</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
              {loading ? t('Signing in...') : t('Sign In')}
            </button>
          </form>
        )}

        <div className="auth-footer">
          {t("Don't have an account? ")}<a onClick={() => navigate('/auth/signup')}>{t('Sign up')}</a>
        </div>
      </div>
    </div>
  )
}
