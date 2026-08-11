import { useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { useRole } from '../../context/RoleContext'

export default function StudentWorkspacePage() {
  const [activeTool, setActiveTool] = useState('text')
  const { t } = useLanguage()
  const { role, school, canSwitch, setRole } = useRole()

  const inStudentView = role === 'student'
  const allSections = school ? school.classes.flatMap((c) => (c.sections || []).map((sec) => ({ ...sec, className: c.name }))) : []
  const classes = school ? school.classes.filter((c) => c.is_active) : []
  const allStudents = school
    ? school.classes.flatMap((c) => (c.sections || []).flatMap((sec) => sec.students || [])).filter((st) => st.is_active)
    : []
  const sampleStudent = allStudents[0] || null
  const sampleSection = sampleStudent ? allSections.find((x) => x.id === sampleStudent.section_id) || null : null
  const sampleClass = sampleStudent ? classes.find((c) => c.id === sampleStudent.class_id) || null : null
  const classmates = sampleStudent
    ? allStudents.filter((st) => st.section_id === sampleStudent.section_id && st.id !== sampleStudent.id)
    : []

  if (inStudentView && school && sampleStudent) {
    return (
      <div>
        <div className="page-header">
          <h2>🧑‍🎓 {t('Student Workspace')} — {school.name}</h2>
          <p>
            {t('Previewing as')} <strong>{sampleStudent.name}</strong> · {sampleClass?.name || '—'} — {sampleSection?.name || '—'} · {t('Roll')} {sampleStudent.roll_no || '—'}
          </p>
        </div>

        <div className="analytics-grid">
          <div className="stat-card">
            <div className="stat-value">{sampleClass?.name?.replace(/[^0-9]/g, '') || '—'}</div>
            <div className="stat-label">{t('My Class')}</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{sampleSection?.name || '—'}</div>
            <div className="stat-label">{t('My Section')}</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{classmates.length + 1}</div>
            <div className="stat-label">{t('Classmates in Section')}</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">3</div>
            <div className="stat-label">{t('Pending Exercises')}</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
          {[
            { key: 'text', label: '📖 ' + t('Current Text') },
            { key: 'exercises', label: '📝 ' + t('Exercises') },
            { key: 'classmates', label: '👥 ' + t('My Classmates') },
          ].map((tool) => (
            <button
              key={tool.key}
              className={`btn ${activeTool === tool.key ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveTool(tool.key as string)}
            >
              {tool.label}
            </button>
          ))}
        </div>

        {activeTool === 'text' && (
          <div className="card">
            <div style={{ fontSize: 12, color: '#888', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
              {t('Current Assignment — Bhagavad Gītā 2.47 ·')} {sampleClass?.name || 'Class'} — {sampleSection?.name || 'A'}
            </div>
            <div style={{ fontSize: 28, lineHeight: 1.8, fontFamily: "'Noto Sans Devanagari', serif", color: '#f0f0f0', marginBottom: 16 }}>
              मा फलेषु कदाचन । मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥
            </div>
            <div style={{ color: '#888' }}>
              <p><strong>{t('Word-by-word:')}</strong> {t('mā — not, phaleṣu — in fruits, kadācana — ever')}</p>
              <p><strong>{t('Translation:')}</strong> {t('Never be motivated by the fruits of action, nor be attached to inaction.')}</p>
            </div>
          </div>
        )}

        {activeTool === 'exercises' && (
          <div className="card">
            <h3 style={{ marginBottom: 16 }}>{t('Pending Exercises')}</h3>
            <div className="text-list">
              <div className="text-item">
                <div className="text-title">{t('Declension Drill — राम')}</div>
                <div className="text-meta">{t('Due tomorrow · 8/10 correct')}</div>
              </div>
              <div className="text-item">
                <div className="text-title">{t('Sandhi Practice — Unit 3')}</div>
                <div className="text-meta">{t('Due Fri · Not started')}</div>
              </div>
              <div className="text-item">
                <div className="text-title">{t('Vocabulary Quiz — Week 4')}</div>
                <div className="text-meta">{t('Completed · 95%')}</div>
              </div>
            </div>
          </div>
        )}

        {activeTool === 'classmates' && (
          <div className="card">
            <h3 style={{ marginBottom: 16 }}>{t('My Classmates')} — {sampleSection?.name} ({classmates.length + 1})</h3>
            <div className="text-list">
              {[sampleStudent, ...classmates].map((st) => (
                <div className="text-item" key={st.id}>
                  <div>
                    <div className="text-title">{st.name}{st.id === sampleStudent.id ? ' 👈 ' + t('you (preview)') : ''}</div>
                    <div className="text-meta">{t('Roll')} {st.roll_no || '—'}{st.father_name ? ' · ' + st.father_name : ''}</div>
                  </div>
                </div>
              ))}
              {!classmates.length && <p style={{ color: '#888' }}>{t('Only you in this section so far.')}</p>}
            </div>
          </div>
        )}
      </div>
    )
  }

  if (canSwitch && school) {
    return (
      <div className="card" style={{ padding: 32, textAlign: 'center', maxWidth: 520, margin: '40px auto' }}>
        <h3>🧑‍🎓 {t('Student Workspace')}</h3>
        <p>{t('As an institution you can preview the student experience for your enrolled students.')}</p>
        <button className="btn btn-primary" onClick={() => setRole('student')}>{t('Enter Student View')}</button>
      </div>
    )
  }

  return (
    <div>
      <div className="page-header">
        <h2>🧑‍🎓 {t('Student Workspace')}</h2>
        <p>{t('Guided learning area with interactive texts, visualization tools, and collaboration')}</p>
      </div>

      <div className="analytics-grid">
        <div className="stat-card">
          <div className="stat-value">156</div>
          <div className="stat-label">{t('Verses Read')}</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">34</div>
          <div className="stat-label">{t('Exercises Done')}</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">88%</div>
          <div className="stat-label">{t('Accuracy')}</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">5</div>
          <div className="stat-label">{t('Day Streak')}</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        {[
          { key: 'text', label: '📖 ' + t('Current Text') },
          { key: 'exercises', label: '📝 ' + t('Exercises') },
          { key: 'notes', label: '📓 ' + t('My Notes') },
        ].map((t) => (
          <button
            key={t.key}
            className={`btn ${activeTool === t.key ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTool(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeTool === 'text' && (
        <div className="card">
          <div style={{ fontSize: 12, color: '#888', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
            {t('Current Assignment — Bhagavad Gītā 2.47')}
          </div>
          <div style={{ fontSize: 28, lineHeight: 1.8, fontFamily: "'Noto Sans Devanagari', serif", color: '#f0f0f0', marginBottom: 16 }}>
            मा फलेषु कदाचन । मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥
          </div>
          <div style={{ color: '#888' }}>
            <p><strong>{t('Word-by-word:')}</strong> {t('mā — not, phaleṣu — in fruits, kadācana — ever')}</p>
            <p><strong>{t('Translation:')}</strong> {t('Never be motivated by the fruits of action, nor be attached to inaction.')}</p>
          </div>
        </div>
      )}

      {activeTool === 'exercises' && (
        <div className="card">
          <h3 style={{ marginBottom: 16 }}>{t('Pending Exercises')}</h3>
          <div className="text-list">
            <div className="text-item">
              <div className="text-title">{t('Declension Drill — राम')}</div>
              <div className="text-meta">{t('Due tomorrow · 8/10 correct')}</div>
            </div>
            <div className="text-item">
              <div className="text-title">{t('Sandhi Practice — Unit 3')}</div>
              <div className="text-meta">{t('Due Fri · Not started')}</div>
            </div>
            <div className="text-item">
              <div className="text-title">{t('Vocabulary Quiz — Week 4')}</div>
              <div className="text-meta">{t('Completed · 95%')}</div>
            </div>
          </div>
        </div>
      )}

      {activeTool === 'notes' && (
        <div className="card">
          <textarea
            placeholder={t('Write your notes here...')}
            style={{ width: '100%', minHeight: 200, background: '#1e1e3a', color: '#e0e0e0', border: '1px solid #333', borderRadius: 6, padding: 12, resize: 'vertical' }}
          />
        </div>
      )}
    </div>
  )
}