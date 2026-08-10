import { useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'

export default function StudentWorkspacePage() {
  const [activeTool, setActiveTool] = useState('text')
  const { t } = useLanguage()

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