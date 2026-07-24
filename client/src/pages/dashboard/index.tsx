export default function Dashboard() {
  return (
    <div>
      <div className="page-header">
        <h2>SanskritLab</h2>
        <p>Bridging deep historical research with modern education</p>
      </div>

      <div className="analytics-grid">
        <div className="stat-card">
          <div className="stat-value">12</div>
          <div className="stat-label">Corpus Texts</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">4</div>
          <div className="stat-label">Time Periods</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">3</div>
          <div className="stat-label">Philosophy Schools</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">1k+</div>
          <div className="stat-label">Grammar Rules</div>
        </div>
      </div>

      <div className="grid-3">
        <div className="module-card">
          <span className="module-icon">📚</span>
          <h3>Research & Digitization</h3>
          <p>OCR manuscript conversion, smart corpus search, and layered annotation tools for deep textual analysis.</p>
        </div>
        <div className="module-card">
          <span className="module-icon">🎨</span>
          <h3>3D Visualization</h3>
          <p>Interactive manuscript viewers, grammar mind maps, and evolutionary timelines spanning centuries.</p>
        </div>
        <div className="module-card">
          <span className="module-icon">🎓</span>
          <h3>Teaching & Assessment</h3>
          <p>Teacher dashboards, student workspaces, AI viva exams, and auto-generated grammar drills.</p>
        </div>
      </div>
    </div>
  )
}