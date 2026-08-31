import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Download, Save, Eye, EyeOff, Check } from 'lucide-react'
import { lessons, lessonHi } from '../../data/lessons'
import { useLanguage } from '../../context/LanguageContext'

export default function CurriculumBuilderPage() {
  const navigate = useNavigate()
  const { t, lang } = useLanguage()
  const [selectedLevel, setSelectedLevel] = useState<number>(0)
  const [customTitle, setCustomTitle] = useState('')
  const [customContent, setCustomContent] = useState('')

  const filtered = lessons.filter((l) => l.level === selectedLevel)

  const [showPreview, setShowPreview] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')

  const handleExport = () => {
    const data = JSON.stringify({ title: customTitle, content: customContent, level: selectedLevel }, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `lesson-${selectedLevel}-${customTitle || 'custom'}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleSaveCustom = () => {
    if (!customTitle.trim()) return
    try {
      const stored = localStorage.getItem('sanskritlab_custom_curriculum')
      const list = stored ? JSON.parse(stored) : []
      list.push({
        id: 'custom-' + Date.now(),
        title: customTitle,
        content: customContent,
        level: selectedLevel,
        createdAt: new Date().toISOString(),
      })
      localStorage.setItem('sanskritlab_custom_curriculum', JSON.stringify(list))
      setSaveMessage(t('Saved to custom curriculum!'))
      setTimeout(() => setSaveMessage(''), 3000)
    } catch {}
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>{t('Curriculum Builder')}</h2>
        <p>{t('Design custom lessons, browse existing content by level, and export your own curriculum.')}</p>
      </div>

      <div className="grid-2" style={{ alignItems: 'start' }}>
        <div className="card">
          <h3 style={{ marginBottom: 16 }}>{t('Browse by Level')}</h3>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
            {[0, 1, 2, 3, 4, 5, 6].map((lvl) => (
              <button
                key={lvl}
                className={`btn ${selectedLevel === lvl ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setSelectedLevel(lvl)}
              >
                {t('Level')} {lvl}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {filtered.map((l) => (
              <div
                key={l.id}
                className="text-item"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`/learning/lesson/${l.id}`)}
              >
                <div>
                  <div className="text-title">{l.title}</div>
                  <div className="text-meta">{l.track} · {lang === 'hi' && lessonHi[l.id]?.durationHi ? lessonHi[l.id].durationHi : l.duration} · {l.quiz.length}{t(' questions')}</div>
                </div>
                <span style={{ fontSize: 12, color: 'var(--vt-muted)' }}>{l.content.sections.length}{t(' sections')}</span>
              </div>
            ))}
            {filtered.length === 0 && (
              <div style={{ fontSize: 14, color: 'var(--vt-muted)', padding: 16, textAlign: 'center' }}>
                {t('No lessons at this level')}
              </div>
            )}
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: 16 }}>{t('Create Custom Lesson')}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input
              placeholder={t('Lesson title...')}
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
            />
            <select value={selectedLevel} onChange={(e) => setSelectedLevel(Number(e.target.value))}>
              {[0, 1, 2, 3, 4, 5, 6].map((lvl) => (
                <option key={lvl} value={lvl}>{t('Level')} {lvl}</option>
              ))}
            </select>
            <textarea
              placeholder={t('Lesson content (supports Devanāgarī, markdown)...')}
              value={customContent}
              onChange={(e) => setCustomContent(e.target.value)}
              style={{
                minHeight: 200,
                resize: 'vertical',
                background: 'var(--vt-bg)',
                color: 'var(--vt-text)',
                border: '1px solid var(--vt-border)',
                borderRadius: 6,
                padding: 12,
                fontFamily: "'Noto Sans Devanagari', sans-serif",
              }}
            />
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
              <button className="btn btn-primary" onClick={handleExport} disabled={!customTitle.trim()} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <Download size={14} />
                <span>{t('Export Lesson')}</span>
              </button>
              <button className="btn btn-secondary" onClick={handleSaveCustom} disabled={!customTitle.trim()} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <Save size={14} />
                <span>{t('Save to Library')}</span>
              </button>
              <button className="btn btn-secondary" onClick={() => setShowPreview(!showPreview)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                {showPreview ? <EyeOff size={14} /> : <Eye size={14} />}
                <span>{showPreview ? t('Hide Preview') : t('Preview')}</span>
              </button>
              {saveMessage && (
                <span style={{ color: 'var(--vt-green)', fontSize: 13, fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  <Check size={14} />
                  <span>{saveMessage}</span>
                </span>
              )}
            </div>

            {showPreview && (
              <div style={{ marginTop: 16, padding: 16, background: 'var(--vt-bg)', borderRadius: 8, border: '1px solid var(--vt-border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: 12, color: 'var(--vt-orange)', fontWeight: 600 }}>{t('Level')} {selectedLevel}</span>
                  <span style={{ fontSize: 11, color: 'var(--vt-muted)' }}>{t('Preview Mode')}</span>
                </div>
                <h4 style={{ margin: '0 0 8px 0', fontSize: 18 }}>{customTitle || t('Untitled Lesson')}</h4>
                <div style={{ fontSize: 14, lineHeight: 1.7, whiteSpace: 'pre-wrap', color: 'var(--vt-text-light)', fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                  {customContent || t('No content entered yet.')}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}