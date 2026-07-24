export default function TeacherDashboardPage() {
  return (
    <div>
      <div className="page-header">
        <h2>👨‍🏫 Teacher Dashboard</h2>
        <p>Create custom lesson plans, design interactive exercises, and annotate manuscripts for classes</p>
      </div>

      <div className="analytics-grid">
        <div className="stat-card">
          <div className="stat-value">24</div>
          <div className="stat-label">Students</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">8</div>
          <div className="stat-label">Lesson Plans</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">92%</div>
          <div className="stat-label">Avg. Score</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">3</div>
          <div className="stat-label">Active Classes</div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3 style={{ marginBottom: 16 }}>Upcoming Lessons</h3>
          <div className="text-list">
            <div className="text-item">
              <div>
                <div className="text-title">Sandhi Rules — Class 5</div>
                <div className="text-meta">Tomorrow 10:00 AM · 12 students</div>
              </div>
            </div>
            <div className="text-item">
              <div>
                <div className="text-title">Bhagavad Gītā 2.47</div>
                <div className="text-meta">Wed 2:00 PM · 15 students</div>
              </div>
            </div>
            <div className="text-item">
              <div>
                <div className="text-title">Noun Declensions</div>
                <div className="text-meta">Fri 11:00 AM · 10 students</div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: 16 }}>Recent Activity</h3>
          <div style={{ color: '#888', fontSize: 14, lineHeight: 2 }}>
            <div>📝 Ravi submitted declension exercise — 85%</div>
            <div>📝 Priya submitted sandhi quiz — 92%</div>
            <div>💬 Ananya asked about compound splitting</div>
            <div>📚 Class 5 completed Ṛgveda 1.1</div>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: 24 }}>
        <h3 style={{ marginBottom: 16 }}>Create Lesson Plan</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input placeholder="Lesson title..." />
          <textarea
            placeholder="Lesson content, objectives, and exercises..."
            style={{ minHeight: 120, resize: 'vertical', background: '#1e1e3a', color: '#e0e0e0', border: '1px solid #333', borderRadius: 6, padding: 12 }}
          />
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn btn-primary">Save Lesson</button>
            <button className="btn btn-secondary">Assign to Class</button>
          </div>
        </div>
      </div>
    </div>
  )
}