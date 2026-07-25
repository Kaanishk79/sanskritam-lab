import { tracks } from '../../data/tracks'
import { useProgress } from '../../hooks/useProgress'
import { lessons } from '../../data/lessons'
import { useNavigate } from 'react-router-dom'

export default function SkillTreePage() {
  const { progress, switchTrack, recommendedTrack } = useProgress()
  const navigate = useNavigate()

  return (
    <div>
      <div className="page-header">
        <h2>🌳 Learning Path</h2>
        <p>Your journey from the alphabet to critical editions. Choose your track and start learning.</p>
      </div>

      <div className="analytics-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))' }}>
        <div className="stat-card">
          <div className="stat-value">{progress.xp}</div>
          <div className="stat-label">XP</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{progress.streak}</div>
          <div className="stat-label">Day Streak</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{progress.completedLessons.length}</div>
          <div className="stat-label">Lessons Done</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{Object.values(progress.skills).filter((s) => s.completed).length}</div>
          <div className="stat-label">Skills</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
        {tracks.map((track) => (
          <button
            key={track.id}
            className={`btn ${progress.currentTrack === track.id ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => switchTrack(track.id)}
            style={progress.currentTrack === track.id ? { border: `2px solid ${track.color}` } : undefined}
          >
            {track.icon} {track.label}
          </button>
        ))}
      </div>

      {progress.currentTrack !== recommendedTrack && progress.completedLessons.length > 0 && (
        <div style={{ padding: 14, background: 'rgba(201,168,76,0.1)', borderRadius: 8, marginBottom: 20, border: '1px solid rgba(201,168,76,0.3)', fontSize: 14, color: '#ccc' }}>
          💡 Based on your XP ({progress.xp}), we recommend the <strong>{tracks.find((t) => t.id === recommendedTrack)?.label}</strong> track.
        </div>
      )}

      <div className="grid-2" style={{ alignItems: 'start' }}>
        <div className="card">
          <h3 style={{ marginBottom: 16 }}>Skills</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {Object.values(progress.skills).map((skill) => {
              const unlocked = skill.unlocked || progress.completedLessons.some((id) => skill.lessonIds.includes(id))
              return (
                <div
                  key={skill.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '10px 14px',
                    background: unlocked ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.01)',
                    borderRadius: 8,
                    opacity: unlocked ? 1 : 0.4,
                    border: skill.completed ? '1px solid rgba(76,175,80,0.3)' : '1px solid transparent',
                  }}
                >
                  <span style={{ fontSize: 24 }}>{skill.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 14, color: '#e0e0e0' }}>{skill.name}</span>
                      <span style={{ fontSize: 12, color: skill.completed ? '#4caf50' : skill.unlocked ? 'var(--sanskrit-gold)' : '#555' }}>
                        {skill.completed ? '✓ Completed' : skill.unlocked ? 'In Progress' : '🔒 Locked'}
                      </span>
                    </div>
                    <div style={{ fontSize: 12, color: '#777' }}>{skill.description}</div>
                    <div style={{ width: '100%', height: 4, background: '#1e1e3a', borderRadius: 2, marginTop: 6 }}>
                      <div style={{ width: `${skill.progress}%`, height: '100%', background: 'var(--sanskrit-gold)', borderRadius: 2, transition: 'width 0.3s' }} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: 16 }}>Available Lessons</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {lessons.filter((l) => {
              const trackLevels: Record<string, number[]> = { child: [0, 1], teen: [1, 2, 3], undergrad: [2, 3, 4], graduate: [3, 4, 5], phd: [5, 6] }
              return trackLevels[progress.currentTrack]?.includes(l.level)
            }).map((lesson) => {
              const done = progress.completedLessons.includes(lesson.id)
              const score = progress.quizScores[lesson.id]
              const skill = Object.values(progress.skills).find((s) => s.lessonIds.includes(lesson.id))
              const blocked = skill && !skill.unlocked
              return (
                <div
                  key={lesson.id}
                  className="text-item"
                  onClick={() => !blocked && navigate(`/learning/lesson/${lesson.id}`)}
                  style={{ opacity: blocked ? 0.4 : 1, cursor: blocked ? 'not-allowed' : 'pointer' }}
                >
                  <div>
                    <div className="text-title">{done ? '✓' : '○'} {lesson.title}</div>
                    <div className="text-meta">Level {lesson.level} · {lesson.duration} · {lesson.subtitle}</div>
                  </div>
                  {score !== undefined && (
                    <span style={{ fontSize: 13, color: score >= 0.7 ? '#4caf50' : '#f44336' }}>
                      {Math.round(score * 100)}%
                    </span>
                  )}
                  {blocked && <span style={{ fontSize: 13, color: '#555' }}>🔒</span>}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}