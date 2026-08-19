import { useEffect, useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { supabase } from '../../services/supabase'
import { getAuthState } from '../../services/auth'

export default function AnalyticsPage() {
  const { t } = useLanguage()
  const [real, setReal] = useState<{
    streak: number
    xp: number
    attempts: number
    avgScore: number
    stories: number
    labAttempts: number
    labAvg: number
  } | null>(null)

  useEffect(() => {
    let live = true
    const user = getAuthState().user
    if (!user) return
    Promise.all([
      supabase.from('user_progress').select('streak, xp').eq('user_id', user.id).maybeSingle(),
      supabase.from('lab_stats').select('stats').eq('user_id', user.id).maybeSingle(),
      supabase.from('assessment_attempts').select('score, max_score').eq('user_id', user.id),
      supabase.from('user_stories').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
    ])
      .then(([progressRes, labRes, attemptsRes, storiesRes]) => {
        if (!live) return
        const progress = progressRes.data as { streak?: number; xp?: number } | null
        const labMap = (labRes.data as { stats?: Record<string, { score?: number; attempts?: number }> } | null)?.stats
        const rows = (attemptsRes.data as { score: number; max_score: number }[] | null) ?? []
        const attempts = rows.length
        const pct = rows.reduce((s, r) => s + (r.max_score > 0 ? (r.score / r.max_score) * 100 : 0), 0)
        const avgScore = attempts > 0 ? Math.round(pct / attempts) : 0
        let labAttempts = 0
        let labSum = 0
        for (const v of Object.values(labMap ?? {})) {
          labAttempts += v.attempts ?? 0
          labSum += (v.score ?? 0) * (v.attempts ?? 0)
        }
        const labAvg = labAttempts > 0 ? Math.round(labSum / labAttempts) : 0
        setReal({
          streak: progress?.streak ?? 0,
          xp: progress?.xp ?? 0,
          attempts,
          avgScore,
          stories: storiesRes.count ?? 0,
          labAttempts,
          labAvg,
        })
      })
      .catch(() => undefined)
    return () => {
      live = false
    }
  }, [])

  return (
    <div>
      <div className="page-header">
        <h2>📊 {t('Analytics Engine')}</h2>
        <p>{t('Track student performance, highlight weak areas, and get customized study paths')}</p>
      </div>

      {real && (
        <div className="card" style={{ marginBottom: 24, padding: 20 }}>
          <h3 style={{ marginTop: 0, marginBottom: 16 }}>📈 {t('Real data')}</h3>
          <div className="analytics-grid" style={{ marginBottom: 0 }}>
            <div className="stat-card">
              <div className="stat-value">{real.streak}</div>
              <div className="stat-label">{t('Day Streak')}</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{real.xp}</div>
              <div className="stat-label">{t('XP')}</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{real.attempts}</div>
              <div className="stat-label">{t('Attempts')}</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{real.avgScore}%</div>
              <div className="stat-label">{t('Avg Score')}</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{real.stories}</div>
              <div className="stat-label">{t('Stories')}</div>
            </div>
          </div>
          {real.labAttempts > 0 && (
            <p style={{ color: '#888', fontSize: 13, marginTop: 12 }}>
              {t('Lab practice')}: {real.labAttempts} {t('attempts')} · {t('avg')} {real.labAvg}%
            </p>
          )}
        </div>
      )}

      <div className="analytics-grid">
        <div className="stat-card">
          <div className="stat-value">87%</div>
          <div className="stat-label">{t('Overall Accuracy')}</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">92%</div>
          <div className="stat-label">{t('Declensions')}</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">78%</div>
          <div className="stat-label">{t('Sandhi Rules')}</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">85%</div>
          <div className="stat-label">{t('Vocabulary')}</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">70%</div>
          <div className="stat-label">{t('Verb Conjugation')}</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">2h 15m</div>
          <div className="stat-label">{t('Study Time Today')}</div>
        </div>
      </div>

      <div className="grid-2" style={{ alignItems: 'start' }}>
        <div className="card">
          <h3 style={{ marginBottom: 16 }}>{t('Weak Areas — Recommendations')}</h3>
          <div className="text-list">
            <div className="text-item">
              <div>
                <div className="text-title">🟡 {t('Verb Conjugation')} (70%)</div>
                <div className="text-meta">{t('Practice present tense parasmaipada forms')}</div>
              </div>
            </div>
            <div className="text-item">
              <div>
                <div className="text-title">🟡 {t('Sandhi Rules')} (78%)</div>
                <div className="text-meta">{t('Focus on guṇa and vṛddhi sandhi')}</div>
              </div>
            </div>
            <div className="text-item">
              <div>
                <div className="text-title">🟢 {t('Declensions')} (92%)</div>
                <div className="text-meta">{t('Maintain current practice schedule')}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: 16 }}>{t('Recommended Study Path')}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ padding: 12, background: 'rgba(201,168,76,0.1)', borderRadius: 8, border: '1px solid rgba(201,168,76,0.2)' }}>
              <div style={{ color: 'var(--sanskrit-gold)', fontWeight: 600, marginBottom: 4 }}>{t('Week 1 — Sandhi Deep Dive')}</div>
              <div style={{ color: '#888', fontSize: 13 }}>{t('Guṇa, Vṛddhi, Yaṇ rules with 100+ practice examples')}</div>
            </div>
            <div style={{ padding: 12, background: 'rgba(201,168,76,0.1)', borderRadius: 8, border: '1px solid rgba(201,168,76,0.2)' }}>
              <div style={{ color: 'var(--sanskrit-gold)', fontWeight: 600, marginBottom: 4 }}>{t('Week 2 — Verb Conjugation')}</div>
              <div style={{ color: '#888', fontSize: 13 }}>{t('Present, imperfect, and optative moods')}</div>
            </div>
            <div style={{ padding: 12, background: 'rgba(201,168,76,0.1)', borderRadius: 8, border: '1px solid rgba(201,168,76,0.2)' }}>
              <div style={{ color: 'var(--sanskrit-gold)', fontWeight: 600, marginBottom: 4 }}>{t('Week 3 — Compound Analysis')}</div>
              <div style={{ color: '#888', fontSize: 13 }}>{t('Tatpuruṣa, Bahuvrīhi, Avyayībhāva compounds')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}