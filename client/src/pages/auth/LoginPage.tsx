import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { signIn, getAuthState, onAuthChange, resendConfirmation } from '../../services/auth'
import { schoolsApi } from '../../services/schools'
import { useLanguage } from '../../context/LanguageContext'

export default function LoginPage() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [notConfirmed, setNotConfirmed] = useState(false)
  const [resending, setResending] = useState(false)
  const [resent, setResent] = useState(false)

  useEffect(() => {
    const unsub = onAuthChange((s) => { if (s.user) navigate('/') })
    return unsub
  }, [navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setNotConfirmed(false)
    setLoading(true)
    try {
      let loginEmail = email.trim()
      if (!loginEmail.includes('@')) {
        const resolved = await schoolsApi.resolveLogin(loginEmail)
        loginEmail = resolved.email
      }
      await signIn(loginEmail, password)
      navigate('/')
    } catch (err: any) {
      const msg = err.message || ''
      if (/not confirmed/i.test(msg) || /email_not_confirmed/i.test(msg)) {
        setNotConfirmed(true)
        setError(t('Your email is not confirmed yet — click the link we sent you, or resend it below.'))
      } else {
        setError(msg)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    setResending(true)
    setResent(false)
    try {
      await resendConfirmation(email)
      setResent(true)
      setError(null)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setResending(false)
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
              <label>{t('Email or Username')}</label>
              <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t('your@email.com or your username')} required />
            </div>
            <div className="form-group">
              <label>{t('Password')}</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
              {loading ? t('Signing in...') : t('Sign In')}
            </button>
            {notConfirmed && (
              <div className="auth-error" style={{ marginTop: 12, textAlign: 'center' }}>
                {resent && <p style={{ color: '#4caf50' }}>📬 {t('Confirmation email sent — check your inbox and spam folder.')}</p>}
                <button type="button" className="btn btn-sm btn-secondary" disabled={resending} onClick={handleResend}>
                  {resending ? '⏳' : t('Resend confirmation email')}
                </button>
              </div>
            )}
          </form>
        )}

        <div className="auth-footer">
          {t("Don't have an account? ")}<a onClick={() => navigate('/auth/signup')}>{t('Sign up')}</a>
        </div>
      </div>
    </div>
  )
}
