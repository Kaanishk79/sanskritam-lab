import { useEffect, useMemo, useState } from 'react'
import {
  loadProjects, saveProjects, loadProfile, saveProfile, loadSubmissions, saveSubmissions,
  makeProject, labClasses, type LabProject, type LabProfile, type LabSubmission, type LabProjectContent
} from '../../services/labProjects'
import { readingPassages, listeningItems, writingItems } from '../../data/languageLab'
import { useLanguage } from '../../context/LanguageContext'
import { getAuthState, onAuthChange } from '../../services/auth'
import '../viva/languageLab.css'

interface Props {
  activeProject: LabProject | null
  onOpenProject: (p: LabProject | null) => void
}

const selectAll = (setContent: (c: LabProjectContent) => void) =>
  setContent({
    passageIds: readingPassages.map((p) => p.id),
    listeningIds: listeningItems.map((l) => l.id),
    writingIds: writingItems.map((w) => w.id),
    readingIds: readingPassages.map((p) => p.id),
  })

const clearAll = (setContent: (c: LabProjectContent) => void) =>
  setContent({ passageIds: [], listeningIds: [], writingIds: [], readingIds: [] })

function ContentPicker({ content, setContent }: { content: LabProjectContent; setContent: (c: LabProjectContent) => void }) {
  const { t } = useLanguage()
  return (
    <div className="lab-picker">
      <div className="lab-picker-group">
        <h5>{t('📖 Reading Passages')}</h5>
        {readingPassages.map((p) => (
          <label className="lab-picker-row" key={p.id}>
            <input
              type="checkbox"
              checked={content.passageIds.includes(p.id)}
              onChange={(e) =>
                setContent({
                  ...content,
                  passageIds: e.target.checked ? [...content.passageIds, p.id] : content.passageIds.filter((x) => x !== p.id),
                })
              }
            />
            {p.title}
          </label>
        ))}
      </div>
      <div className="lab-picker-group">
        <h5>{t('👂 Listening Items')}</h5>
        {listeningItems.map((l) => (
          <label className="lab-picker-row" key={l.id}>
            <input
              type="checkbox"
              checked={content.listeningIds.includes(l.id)}
              onChange={(e) =>
                setContent({
                  ...content,
                  listeningIds: e.target.checked ? [...content.listeningIds, l.id] : content.listeningIds.filter((x) => x !== l.id),
                })
              }
            />
            {l.text}
          </label>
        ))}
      </div>
      <div className="lab-picker-group">
        <h5>{t('✍️ Writing Items')}</h5>
        {writingItems.map((w) => (
          <label className="lab-picker-row" key={w.id}>
            <input
              type="checkbox"
              checked={content.writingIds.includes(w.id)}
              onChange={(e) =>
                setContent({
                  ...content,
                  writingIds: e.target.checked ? [...content.writingIds, w.id] : content.writingIds.filter((x) => x !== w.id),
                })
              }
            />
            {w.prompt}
          </label>
        ))}
      </div>
    </div>
  )
}

export default function LabAssignments({ activeProject, onOpenProject }: Props) {
  const { t } = useLanguage()
  const [authUser, setAuthUser] = useState(getAuthState().user)
  const [profile, setProfile] = useState<LabProfile>(loadProfile)
  const [projects, setProjects] = useState<LabProject[]>(loadProjects)
  const [submissions, setSubmissions] = useState<LabSubmission[]>(loadSubmissions)
  const [designing, setDesigning] = useState(false)
  const [adminAssigning, setAdminAssigning] = useState(false)

  useEffect(() => onAuthChange((s) => setAuthUser(s.user)), [])

  const ownerName = authUser?.displayName || profile.ownerName || 'Admin'

  useEffect(() => saveProfile(profile), [profile])
  useEffect(() => saveProjects(projects), [projects])
  useEffect(() => saveSubmissions(submissions), [submissions])

  const setMode = (mode: 'individual' | 'institution') => setProfile((p) => ({ ...p, mode }))

  const myProjects = useMemo(
    () => projects.filter((p) => (p.mode === 'individual' ? p.owner === ownerName : false)),
    [projects, ownerName]
  )
  const assignedProjects = useMemo(
    () => projects.filter((p) => p.mode === 'institution' && p.targetClass === profile.className),
    [projects, profile.className]
  )

  const deleteProject = (id: string) => {
    setProjects((ps) => ps.filter((p) => p.id !== id))
    if (activeProject?.id === id) onOpenProject(null)
  }

  const submitAssignment = (p: LabProject, score: number) => {
    setSubmissions((s) => [
      ...s.filter((x) => !(x.projectId === p.id && x.userName === ownerName)),
      { projectId: p.id, userName: ownerName, className: profile.className, score, submittedAt: new Date().toISOString() },
    ])
  }

  const mineSubmitted = (p: LabProject) => submissions.some((s) => s.projectId === p.id && s.userName === ownerName)

  return (
    <div className="lab-assignments">
      <div className="lab-mode-bar">
        <span className="lab-mode-label">{t('Mode:')}</span>
        <button
          className={`btn btn-sm ${profile.mode === 'individual' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setMode('individual')}
        >
          {t('👤 Individual')}
        </button>
        <button
          className={`btn btn-sm ${profile.mode === 'institution' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setMode('institution')}
        >
          {t('🏫 Institution')}
        </button>
      </div>

      {profile.mode === 'institution' && (
        <div className="lab-institution-bar">
          <span>{t('I am:')}</span>
          <button
            className={`btn btn-sm ${profile.role === 'admin' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setProfile((p) => ({ ...p, role: 'admin' }))}
          >
            {t('👩‍🏫 Admin')}
          </button>
          <button
            className={`btn btn-sm ${profile.role === 'student' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setProfile((p) => ({ ...p, role: 'student' }))}
          >
            {t('🎓 Student')}
          </button>
          <span className="lab-mode-label">{t('My class:')}</span>
          <select
            className="lab-class-select"
            value={profile.className}
            onChange={(e) => setProfile((p) => ({ ...p, className: e.target.value }))}
          >
            {labClasses.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      )}

      {profile.mode === 'individual' && !designing && (
        <div className="lab-individual">
          <div className="lab-section-head">
            <h4>{t('My Custom Projects')}</h4>
            <button className="btn btn-sm btn-primary" onClick={() => setDesigning(true)}>{t('➕ Design New Project')}</button>
          </div>
          <p className="lab-section-note">{t('Design your own lab project — pick passages, listening and writing items — then practice with it.')}</p>
          {myProjects.length === 0 && <p className="lab-empty">{t('No custom projects yet — design one to get started.')}</p>}
          <div className="lab-project-grid">
            {myProjects.map((p) => (
              <div className={`lab-project-card${activeProject?.id === p.id ? ' active' : ''}`} key={p.id}>
                <h5>{p.title}</h5>
                <div className="lab-project-meta">
                  <span>{p.content.passageIds.length} {t('passages')}</span> ·
                  <span>{p.content.listeningIds.length} {t('listening')}</span> ·
                  <span>{p.content.writingIds.length} {t('writing')}</span>
                </div>
                <div className="lab-project-actions">
                  <button className="btn btn-sm btn-primary" onClick={() => onOpenProject(activeProject?.id === p.id ? null : p)}>
                    {activeProject?.id === p.id ? t('✕ Close Project') : t('▶ Practice')}
                  </button>
                  <button className="btn btn-sm btn-secondary" onClick={() => deleteProject(p.id)}>{t('Delete')}</button>
                </div>
              </div>
            ))}
          </div>
          {activeProject && (
            <div className="lab-active-project">
              {t('Active project')}: <strong>{activeProject.title}</strong> — {t('use the Listening, Reading & Writing tabs to practice its content')}
            </div>
          )}
        </div>
      )}

      {profile.mode === 'individual' && designing && (
        <IndividualDesigner
          ownerName={ownerName}
          onSave={(p) => {
            setProjects((ps) => [...ps, p])
            setDesigning(false)
          }}
          onCancel={() => setDesigning(false)}
        />
      )}

      {profile.mode === 'institution' && profile.role === 'admin' && !adminAssigning && (
        <div className="lab-admin">
          <div className="lab-section-head">
            <h4>{t('Admin — Class-wise Assignments')}</h4>
            <button className="btn btn-sm btn-primary" onClick={() => setAdminAssigning(true)}>{t('➕ Assign Project')}</button>
          </div>
          <p className="lab-section-note">{t('Assign lab projects to a class or grade. Students in that class will see them instantly.')}</p>
          {projects.filter((p) => p.mode === 'institution').length === 0 && (
            <p className="lab-empty">{t('No assignments yet — assign your first project.')}</p>
          )}
          <div className="lab-project-grid">
            {projects.filter((p) => p.mode === 'institution').map((p) => {
              const subs = submissions.filter((s) => s.projectId === p.id)
              return (
                <div className={`lab-project-card${activeProject?.id === p.id ? ' active' : ''}`} key={p.id}>
                  <h5>{p.title}</h5>
                  <div className="lab-project-meta">
                    <span>{t('Class:')} {p.targetClass}</span> ·
                    <span>{t('Due:')} {p.dueDate || '—'}</span>
                  </div>
                  <div className="lab-project-meta">{subs.length} {t('submissions')} {subs.length > 0 && `· avg ${Math.round(subs.reduce((a, s) => a + s.score, 0) / subs.length)}%`}</div>
                  <div className="lab-project-actions">
                    <button className="btn btn-sm btn-primary" onClick={() => onOpenProject(activeProject?.id === p.id ? null : p)}>
                      {activeProject?.id === p.id ? t('✕ Close') : t('👁 View')}
                    </button>
                    <button className="btn btn-sm btn-secondary" onClick={() => deleteProject(p.id)}>{t('Delete')}</button>
                  </div>
                  {subs.length > 0 && (
                    <div className="lab-subs">
                      {subs.map((s, i) => (
                        <div className="lab-sub-row" key={i}>
                          <span>{s.userName}</span>
                          <span>{s.className}</span>
                          <strong>{s.score}%</strong>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {profile.mode === 'institution' && profile.role === 'admin' && adminAssigning && (
        <AdminAssigner
          ownerName={ownerName}
          onSave={(p) => {
            setProjects((ps) => [...ps, p])
            setAdminAssigning(false)
          }}
          onCancel={() => setAdminAssigning(false)}
        />
      )}

      {profile.mode === 'institution' && profile.role === 'student' && (
        <div className="lab-student">
          <h4>{t('My Assignments')} — {profile.className}</h4>
          <p className="lab-section-note">{t('Projects assigned by your admin for your class. Complete them to submit your score.')}</p>
          {assignedProjects.length === 0 && (
            <p className="lab-empty">{t('No assignments for your class yet — check back later.')}</p>
          )}
          <div className="lab-project-grid">
            {assignedProjects.map((p) => {
              const done = mineSubmitted(p)
              return (
                <div className={`lab-project-card${activeProject?.id === p.id ? ' active' : ''}`} key={p.id}>
                  <h5>{p.title}</h5>
                  <div className="lab-project-meta">
                    <span>{t('Assigned by:')} {p.owner}</span> ·
                    <span>{t('Due:')} {p.dueDate || '—'}</span>
                  </div>
                  <div className="lab-project-meta">
                    {p.content.passageIds.length} {t('passages')} · {p.content.listeningIds.length} {t('listening')} · {p.content.writingIds.length} {t('writing')}
                  </div>
                  <div className="lab-project-actions">
                    <button className="btn btn-sm btn-primary" onClick={() => onOpenProject(activeProject?.id === p.id ? null : p)}>
                      {activeProject?.id === p.id ? t('✕ Close') : t('▶ Start')}
                    </button>
                    {done && <button className="btn btn-sm btn-secondary" onClick={() => submitAssignment(p, 100)}>{t('↻ Resubmit')}</button>}
                  </div>
                  {done && <div className="lab-done-badge">✓ {t('Submitted')}</div>}
                </div>
              )
            })}
          </div>
          <div className="lab-submit-box">
            <h5>{t('Submit Current Project Score')}</h5>
            {activeProject && profile.className === activeProject.targetClass ? (
              <button className="btn btn-sm btn-primary" onClick={() => submitAssignment(activeProject, 100)}>
                {t('📤 Submit my score for')} «{activeProject.title}»
              </button>
            ) : (
              <p className="lab-empty">{t('Open an assigned project from above to submit your score.')}</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function IndividualDesigner({ ownerName, onSave, onCancel }: { ownerName: string; onSave: (p: LabProject) => void; onCancel: () => void }) {
  const { t } = useLanguage()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState<LabProjectContent>({ passageIds: [], listeningIds: [], writingIds: [], readingIds: [] })

  const save = () => {
    if (!title.trim()) return
    onSave(makeProject(title.trim(), ownerName, 'individual', '', '', content))
  }

  return (
    <div className="lab-designer">
      <div className="lab-section-head">
        <h4>{t('Design Your Own Project')}</h4>
        <button className="btn btn-sm btn-secondary" onClick={onCancel}>{t('✕ Cancel')}</button>
      </div>
      <label className="lab-title-field">
        <span>{t('Project title:')}</span>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={t('e.g. My Sandhi Drill Pack')} />
      </label>
      <div className="lab-picker-tools">
        <button className="btn btn-sm btn-secondary" onClick={() => selectAll(setContent)}>{t('Select All')}</button>
        <button className="btn btn-sm btn-secondary" onClick={() => clearAll(setContent)}>{t('Clear All')}</button>
      </div>
      <ContentPicker content={content} setContent={setContent} />
      <div className="lab-actions">
        <button className="btn btn-primary" onClick={save} disabled={!title.trim() || (content.passageIds.length === 0 && content.listeningIds.length === 0 && content.writingIds.length === 0)}>
          {t('💾 Save My Project')}
        </button>
      </div>
    </div>
  )
}

function AdminAssigner({ ownerName, onSave, onCancel }: { ownerName: string; onSave: (p: LabProject) => void; onCancel: () => void }) {
  const { t } = useLanguage()
  const [title, setTitle] = useState('')
  const [targetClass, setTargetClass] = useState(labClasses[0])
  const [dueDate, setDueDate] = useState('')
  const [content, setContent] = useState<LabProjectContent>({ passageIds: [], listeningIds: [], writingIds: [], readingIds: [] })

  const save = () => {
    const ttl = title.trim() || t('Assignment') + ' — ' + targetClass
    onSave(makeProject(ttl, ownerName, 'institution', targetClass, dueDate, content))
  }

  const hasContent = content.passageIds.length > 0 || content.listeningIds.length > 0 || content.writingIds.length > 0

  return (
    <div className="lab-designer">
      <div className="lab-section-head">
        <h4>{t('Assign Project to Class')}</h4>
        <button className="btn btn-sm btn-secondary" onClick={onCancel}>{t('✕ Cancel')}</button>
      </div>
      <label className="lab-title-field">
        <span>{t('Project title:')}</span>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={t('e.g. Class 6 Listening Drill')} />
      </label>
      <div className="lab-admin-fields">
        <label>
          <span>{t('Assign to class/grade:')}</span>
          <select value={targetClass} onChange={(e) => setTargetClass(e.target.value)}>
            {labClasses.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
        <label>
          <span>{t('Due date:')}</span>
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </label>
      </div>
      <div className="lab-picker-tools">
        <button className="btn btn-sm btn-secondary" onClick={() => selectAll(setContent)}>{t('Select All')}</button>
        <button className="btn btn-sm btn-secondary" onClick={() => clearAll(setContent)}>{t('Clear All')}</button>
      </div>
      <ContentPicker content={content} setContent={setContent} />
      <div className="lab-actions">
        {!hasContent && <p className="lab-empty">{t('Pick at least one passage, listening or writing item above.')}</p>}
        <button className="btn btn-primary" onClick={save} disabled={!hasContent}>
          {t('📤 Assign to Class')}
        </button>
      </div>
    </div>
  )
}
