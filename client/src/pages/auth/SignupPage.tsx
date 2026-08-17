import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { signUp, getAuthState, onAuthChange, updateAccountMeta, resendConfirmation } from '../../services/auth'
import { supabase } from '../../services/supabase'
import { schoolsApi } from '../../services/schools'
import { useLanguage } from '../../context/LanguageContext'

export const PENDING_SCHOOL_KEY = 'sanskritlab-pending-school'

function ResendConfirmation({ email }: { email: string }) {
  const { t } = useLanguage()
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)
  const [err, setErr] = useState('')
  const resend = async () => {
    setBusy(true)
    setErr('')
    try {
      await resendConfirmation(email)
      setDone(true)
    } catch (e: any) {
      setErr(e.message)
    } finally {
      setBusy(false)
    }
  }
  return (
    <span>
      <button className="btn btn-secondary" disabled={busy} onClick={resend}>
        {busy ? '⏳' : done ? '✅ ' + t('Sent!') : t('Resend email')}
      </button>
      {err && <span style={{ color: '#e55', fontSize: 12, marginLeft: 8 }}>{err}</span>}
    </span>
  )
}

type AccountType = 'learner' | 'institution' | 'teacher' | 'student'

const ACCOUNT_TYPES: { value: AccountType; icon: string; label: string; desc: string }[] = [
  { value: 'learner', icon: '🧑‍🎓', label: 'Learner', desc: 'Self-study Sanskrit at your own pace' },
  { value: 'institution', icon: '🏫', label: 'Institution', desc: 'Manage a school — also preview teacher & student views' },
  { value: 'teacher', icon: '👨‍🏫', label: 'Teacher', desc: 'Run classes, rosters, and assessments' },
  { value: 'student', icon: '📖', label: 'Student', desc: 'Follow lessons and track progress' },
]

export default function SignupPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { t } = useLanguage()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [accountType, setAccountType] = useState<AccountType>(() => {
    const preset = searchParams.get('type')
    return preset === 'institution' || preset === 'teacher' || preset === 'student' ? (preset as AccountType) : 'learner'
  })
  const [schoolName, setSchoolName] = useState('')
  const [schoolCity, setSchoolCity] = useState('')
  const [schoolState, setSchoolState] = useState('')
  const [schoolType, setSchoolType] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [needsConfirmation, setNeedsConfirmation] = useState(false)

  useEffect(() => {
    const unsub = onAuthChange((s) => { if (s.user) navigate('/') })
    return unsub
  }, [navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (accountType === 'institution' && !schoolName.trim()) {
      setError('School name is required for institution accounts')
      return
    }
    setLoading(true)
    try {
      await signUp(email, password, name, { accountType })
      const session = supabase.auth.getSession() as unknown as { data?: { session?: unknown } } | null
      const hasSession = !!session?.data?.session
      if (accountType === 'institution') {
        const schoolBody = {
          name: schoolName.trim(),
          city: schoolCity.trim() || null,
          state: schoolState.trim() || null,
          school_type: schoolType || null,
          board: 'CBSE',
          affiliation_status: 'pending',
          source: 'self-registered',
        }
        if (hasSession) {
          const school = await schoolsApi.create(schoolBody)
          try {
            await updateAccountMeta({ school_id: school.id })
          } catch {
            /* school created; metadata link best-effort */
          }
        } else {
          localStorage.setItem(PENDING_SCHOOL_KEY, JSON.stringify(schoolBody))
          setNeedsConfirmation(true)
        }
      }
      if (hasSession) navigate('/')
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

        {needsConfirmation ? (
          <div className="card" style={{ textAlign: 'center', padding: 32 }}>
            <p style={{ fontSize: 40, margin: '0 0 12px' }}>📬</p>
            <h3 style={{ marginBottom: 12 }}>{t('Check your email')}</h3>
            <p style={{ color: '#aaa', marginBottom: 16 }}>
              {t('We sent a confirmation link to ')}<strong>{email}</strong>.<br />
              {t('After you confirm and sign in, your school')} <strong>{schoolName}</strong> {t('will be registered to your account automatically.')}
            </p>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
              <button className="btn btn-primary" onClick={() => navigate('/auth/login')}>{t('Go to Sign In')}</button>
              <ResendConfirmation email={email} />
            </div>
          </div>
        ) : user ? (
          <div className="card" style={{ textAlign: 'center', padding: 32 }}>
            <p style={{ color: '#4caf50', marginBottom: 16 }}>{t('You are signed in as ')}{user.email}</p>
            <button className="btn btn-primary" onClick={() => navigate('/')}>{t('Go to Dashboard')}</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && <div className="auth-error">{error}</div>}

            <div className="form-group">
              <label>{t('I am a...')}</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {ACCOUNT_TYPES.map((a) => (
                  <button
                    type="button"
                    key={a.value}
                    onClick={() => setAccountType(a.value)}
                    title={a.desc}
                    className={`btn btn-sm ${accountType === a.value ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ padding: '6px 12px' }}
                  >
                    {a.icon} {a.label}
                  </button>
                ))}
              </div>
            </div>

            {accountType === 'institution' && (
              <div className="card" style={{ padding: 16, marginBottom: 12, background: 'rgba(255,140,0,0.06)', border: '1px solid rgba(255,140,0,0.35)' }}>
                <div className="form-group">
                  <label>{t('School Name')} *</label>
                  <input type="text" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} placeholder={t('e.g. Sarada Vidyalaya')} required />
                </div>
                <div className="form-group">
                  <label>{t('City')}</label>
                  <input type="text" value={schoolCity} onChange={(e) => setSchoolCity(e.target.value)} placeholder={t('e.g. Chennai')} />
                </div>
                <div className="form-group">
                  <label>{t('State')}</label>
                  <input type="text" value={schoolState} onChange={(e) => setSchoolState(e.target.value)} placeholder={t('e.g. Tamil Nadu')} />
                </div>
                <div className="form-group">
                  <label>{t('School Type')}</label>
                  <select value={schoolType} onChange={(e) => setSchoolType(e.target.value)}>
                    <option value="">{t('Select...')}</option>
                    <option>Primary School</option>
                    <option>Middle School</option>
                    <option>Secondary School</option>
                    <option>Senior Secondary School</option>
                  </select>
                </div>
                <p style={{ fontSize: 12, color: '#888', margin: 0 }}>
                  🏫 {t('Your school is registered instantly. As an institution you can switch between School, Teacher and Student views.')}
                </p>
              </div>
            )}

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
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t('At least 8 characters')} required minLength={8} />
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
