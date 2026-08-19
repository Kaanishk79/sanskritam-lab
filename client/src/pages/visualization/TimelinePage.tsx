import { useEffect, useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { TIMELINE_EVENTS, type TimelineEvent } from '../../data/timeline'
import { loadTimelineEvents } from '../../services/contentDb'

export default function TimelinePage() {
  const { t } = useLanguage()
  const [events, setEvents] = useState<TimelineEvent[]>(TIMELINE_EVENTS)

  useEffect(() => {
    let live = true
    loadTimelineEvents().then((rows) => {
      if (live) setEvents(rows)
    })
    return () => {
      live = false
    }
  }, [])

  return (
    <div>
      <div className="page-header">
        <h2>📈 {t('Evolutionary Timeline')}</h2>
        <p>{t('Interactive timeline showing how Sanskrit language and philosophy evolved over centuries')}</p>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        {(['all', 'text', 'grammar', 'philosophy'] as const).map((cat) => (
          <button key={cat} className="btn btn-secondary">
            {cat === 'all' ? t('All Events') : t(cat.charAt(0).toUpperCase() + cat.slice(1))}
          </button>
        ))}
      </div>

      <div className="timeline">
        {events.map((e, i) => (
          <div key={i} className="timeline-item">
            <div
              className="badge"
              style={{
                background: e.category === 'text' ? '#2d5016' : e.category === 'grammar' ? '#7d3c00' : '#4a148c',
                color: e.category === 'text' ? '#a8e6a3' : e.category === 'grammar' ? '#ffcc80' : '#ce93d8',
                marginBottom: 8,
                display: 'inline-block',
              }}
            >
              {e.year}
            </div>
            <h3 style={{ color: '#f0f0f0', fontSize: 16, marginBottom: 4 }}>{e.title}</h3>
            <p style={{ color: '#777', fontSize: 14 }}>{e.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
