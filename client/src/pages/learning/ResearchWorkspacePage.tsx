import { useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'

const manuscripts = [
  { siglum: 'A', name: 'MS 1 — Devanāgarī', date: '15th CE', readings: ['ते च', 'मया', 'भवति'] },
  { siglum: 'B', name: 'MS 2 — Grantha', date: '16th CE', readings: ['ते च', 'तया', 'भवति'] },
  { siglum: 'C', name: 'MS 3 — Devanāgarī', date: '17th CE', readings: ['तु', 'मया', 'भवति'] },
]

const baseText = 'अथ धर्मं व्याख्यास्यामः । ते च मया भवति ।'

export default function ResearchWorkspacePage() {
  const { t } = useLanguage()
  const [activeTool, setActiveTool] = useState<'collation' | 'apparatus' | 'paleography'>('collation')
  const [notes, setNotes] = useState('')

  return (
    <div>
      <div className="page-header">
        <h2>🏛️ {t('PhD Research Workspace')}</h2>
        <p>{t('Critical edition tools — collation, apparatus criticus, and paleographic analysis')}</p>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
        <button className={`btn ${activeTool === 'collation' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTool('collation')}>
          📋 {t('Collation')}
        </button>
        <button className={`btn ${activeTool === 'apparatus' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTool('apparatus')}>
          📐 {t('Critical Apparatus')}
        </button>
        <button className={`btn ${activeTool === 'paleography' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTool('paleography')}>
          🔍 {t('Paleography Notes')}
        </button>
      </div>

      {activeTool === 'collation' && (
        <div className="card">
          <h3 style={{ marginBottom: 16 }}>{t('Manuscript Collation')}</h3>
          <div style={{ marginBottom: 16, fontSize: 20, fontFamily: "'Noto Sans Devanagari', serif", color: '#f0f0f0', padding: 16, background: 'rgba(0,0,0,0.2)', borderRadius: 8 }}>
            {baseText}
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #2a2a4a', textAlign: 'left' }}>
                  <th style={{ padding: '8px 12px', color: '#888' }}>{t('Witness')}</th>
                  <th style={{ padding: '8px 12px', color: '#888' }}>{t('Date')}</th>
                  <th style={{ padding: '8px 12px', color: '#888' }}>{t('Reading 1')}</th>
                  <th style={{ padding: '8px 12px', color: '#888' }}>{t('Reading 2')}</th>
                  <th style={{ padding: '8px 12px', color: '#888' }}>{t('Reading 3')}</th>
                </tr>
              </thead>
              <tbody>
                {manuscripts.map((ms) => (
                  <tr key={ms.siglum} style={{ borderBottom: '1px solid #1e1e3a' }}>
                    <td style={{ padding: '8px 12px', fontWeight: 600, color: 'var(--sanskrit-gold)' }}>{ms.siglum}</td>
                    <td style={{ padding: '8px 12px', color: '#888' }}>{ms.date}</td>
                    {ms.readings.map((r, i) => (
                      <td key={i} style={{
                        padding: '8px 12px',
                        fontFamily: "'Noto Sans Devanagari', serif",
                        color: r !== manuscripts[0].readings[i] ? '#f44336' : '#e0e0e0',
                      }}>
                        {r}
                        {r !== manuscripts[0].readings[i] && ' ⚠️'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTool === 'apparatus' && (
        <div className="card">
          <h3 style={{ marginBottom: 16 }}>{t('Apparatus Criticus')}</h3>
          <div style={{ fontFamily: "'Noto Sans Devanagari', serif", fontSize: 18, marginBottom: 16, color: '#f0f0f0' }}>
            {baseText}
          </div>
          <div style={{ background: '#0a0a1a', borderRadius: 8, padding: 16, fontSize: 14, lineHeight: 2 }}>
            <div><strong style={{ color: 'var(--sanskrit-gold)' }}>1</strong> अथ धर्मं A B : अथ धम्मं C</div>
            <div><strong style={{ color: 'var(--sanskrit-gold)' }}>2</strong> ते च A B : तु C</div>
            <div><strong style={{ color: 'var(--sanskrit-gold)' }}>3</strong> मया A C : तया B</div>
            <div><strong style={{ color: 'var(--sanskrit-gold)' }}>4</strong> भवति A B C {t('(unanimous)')}</div>
          </div>
          <div style={{ marginTop: 16, fontSize: 12, color: '#888' }}>
            {t('Sigla: A = MS 1 (15th CE), B = MS 2 (Grantha, 16th CE), C = MS 3 (17th CE)')}
          </div>
        </div>
      )}

      {activeTool === 'paleography' && (
        <div className="grid-2" style={{ alignItems: 'start' }}>
          <div className="card">
            <h3 style={{ marginBottom: 16 }}>{t('Script Comparison')}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <div style={{ fontSize: 13, color: '#888', marginBottom: 4 }}>{t('Devanāgarī (15th CE)')}</div>
                <div style={{
                  fontFamily: "'Noto Sans Devanagari', serif",
                  fontSize: 28, padding: 16,
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: 8,
                  color: '#f0f0f0',
                }}>
                  अ थ ध र् मं व् या ख्य् आ स् या मः
                </div>
              </div>
              <div>
                <div style={{ fontSize: 13, color: '#888', marginBottom: 4 }}>{t('Grantha (16th CE)')}</div>
                <div style={{
                  fontFamily: "'Noto Sans Devanagari', serif",
                  fontSize: 28, padding: 16,
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: 8,
                  fontStyle: 'italic',
                  color: '#f0f0f0',
                }}>
                  𑌅 𑌥 𑌧𑌰𑍍𑌮𑌂 𑌵𑍍𑌯𑌾𑌕𑍍𑌯𑌾𑌸𑍍𑌯𑌾𑌮𑌃
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <h3 style={{ marginBottom: 16 }}>{t('Research Notes')}</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t('Paleographic observations, scribal hand notes, dating evidence...')}
              style={{
                width: '100%',
                minHeight: 200,
                background: '#1e1e3a',
                color: '#e0e0e0',
                border: '1px solid #333',
                borderRadius: 6,
                padding: 12,
                resize: 'vertical',
                fontFamily: "'Noto Sans Devanagari', sans-serif",
              }}
            />
            <button className="btn btn-primary" style={{ marginTop: 12 }}>{t('Save Notes')}</button>
          </div>
        </div>
      )}
    </div>
  )
}