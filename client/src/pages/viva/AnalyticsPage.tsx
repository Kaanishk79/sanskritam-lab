export default function AnalyticsPage() {
  return (
    <div>
      <div className="page-header">
        <h2>📊 Analytics Engine</h2>
        <p>Track student performance, highlight weak areas, and get customized study paths</p>
      </div>

      <div className="analytics-grid">
        <div className="stat-card">
          <div className="stat-value">87%</div>
          <div className="stat-label">Overall Accuracy</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">92%</div>
          <div className="stat-label">Declensions</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">78%</div>
          <div className="stat-label">Sandhi Rules</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">85%</div>
          <div className="stat-label">Vocabulary</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">70%</div>
          <div className="stat-label">Verb Conjugation</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">2h 15m</div>
          <div className="stat-label">Study Time Today</div>
        </div>
      </div>

      <div className="grid-2" style={{ alignItems: 'start' }}>
        <div className="card">
          <h3 style={{ marginBottom: 16 }}>Weak Areas — Recommendations</h3>
          <div className="text-list">
            <div className="text-item">
              <div>
                <div className="text-title">🟡 Verb Conjugation (70%)</div>
                <div className="text-meta">Practice present tense parasmaipada forms</div>
              </div>
            </div>
            <div className="text-item">
              <div>
                <div className="text-title">🟡 Sandhi Rules (78%)</div>
                <div className="text-meta">Focus on guṇa and vṛddhi sandhi</div>
              </div>
            </div>
            <div className="text-item">
              <div>
                <div className="text-title">🟢 Declensions (92%)</div>
                <div className="text-meta">Maintain current practice schedule</div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: 16 }}>Recommended Study Path</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ padding: 12, background: 'rgba(201,168,76,0.1)', borderRadius: 8, border: '1px solid rgba(201,168,76,0.2)' }}>
              <div style={{ color: 'var(--sanskrit-gold)', fontWeight: 600, marginBottom: 4 }}>Week 1 — Sandhi Deep Dive</div>
              <div style={{ color: '#888', fontSize: 13 }}>Guṇa, Vṛddhi, Yaṇ rules with 100+ practice examples</div>
            </div>
            <div style={{ padding: 12, background: 'rgba(201,168,76,0.1)', borderRadius: 8, border: '1px solid rgba(201,168,76,0.2)' }}>
              <div style={{ color: 'var(--sanskrit-gold)', fontWeight: 600, marginBottom: 4 }}>Week 2 — Verb Conjugation</div>
              <div style={{ color: '#888', fontSize: 13 }}>Present, imperfect, and optative moods</div>
            </div>
            <div style={{ padding: 12, background: 'rgba(201,168,76,0.1)', borderRadius: 8, border: '1px solid rgba(201,168,76,0.2)' }}>
              <div style={{ color: 'var(--sanskrit-gold)', fontWeight: 600, marginBottom: 4 }}>Week 3 — Compound Analysis</div>
              <div style={{ color: '#888', fontSize: 13 }}>Tatpuruṣa, Bahuvrīhi, Avyayībhāva compounds</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}