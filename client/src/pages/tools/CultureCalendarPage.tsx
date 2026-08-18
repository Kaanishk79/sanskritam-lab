import { useMemo, useState } from 'react'
import { FESTIVALS, nextFestival, currentRitu } from '../../data/cultureCalendar'
import { toIAST } from '../../services/sanskrit'
import { speakWithFallback } from '../../services/speech'
import { useLanguage } from '../../context/LanguageContext'

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export default function CultureCalendarPage() {
  const { t } = useLanguage()
  const [selId, setSelId] = useState<string | null>(null)
  const [speaking, setSpeaking] = useState(false)

  const next = useMemo(() => nextFestival(), [])
  const ritu = useMemo(() => currentRitu(), [])

  const sel = FESTIVALS.find((f) => f.id === selId) || next.f

  const speak = (text: string) => speakWithFallback(text, (s) => setSpeaking(s))

  const byMonth = useMemo(() => {
    const map: Record<number, typeof FESTIVALS> = {}
    for (const f of FESTIVALS) {
      ;(map[f.month] ||= []).push(f)
    }
    return map
  }, [])

  return (
    <div>
      <div className="page-header">
        <h2>{t('🪔 Culture Calendar')}</h2>
        <p>{t('Festivals, tithis and seasons — the Sanskrit year, mapped to your calendar.')}</p>
      </div>

      <div className="card" style={{ maxWidth: 760, margin: '0 auto', padding: 24 }}>
        <div className="card" style={{ padding: 18, marginBottom: 16, border: '2px solid rgba(255,152,0,0.4)', background: 'rgba(255,152,0,0.06)' }}>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: 'var(--vt-orange)' }}>
            {next.days === 0 ? t('🎉 Today is') : t(`⏳ Coming in ${next.days} day${next.days === 1 ? '' : 's'}:`)}
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
            <h3 style={{ margin: '4px 0 0', fontSize: 24 }}>{next.f.emoji} {next.f.name}</h3>
            <button className="btn btn-sm btn-secondary" onClick={() => speak(next.f.phrase)} disabled={speaking}>🔊 {t('Say the greeting')}</button>
          </div>
          <p style={{ margin: '6px 0 0', color: 'var(--vt-muted)' }}>{next.f.approx} · {next.f.tithi}</p>
          <p style={{ margin: '10px 0 0', fontSize: 18 }}>{next.f.phrase}</p>
          <p style={{ margin: '2px 0 0', color: 'var(--vt-muted)' }}>{next.f.phraseEn} — {toIAST(next.f.phrase)}</p>
          <p style={{ margin: '10px 0 0' }}>{next.f.meaning}</p>
        </div>

        <div className="card" style={{ padding: 16, marginBottom: 18, textAlign: 'center' }}>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--vt-muted)' }}>{t('Current season in the Sanskrit year')}</p>
          <p style={{ margin: '4px 0 0', fontSize: 24 }}>{ritu.emoji} {ritu.name} <span style={{ color: 'var(--vt-muted)', fontSize: 16 }}>({ritu.season}, {ritu.months})</span></p>
          <p style={{ margin: '6px 0 0', fontStyle: 'italic', color: 'var(--vt-muted)' }}>{ritu.verse}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(190px,1fr))', gap: 10 }}>
          {Object.keys(byMonth).sort((a, b) => Number(a) - Number(b)).map((m) => (
            <div key={m} className="card" style={{ margin: 0, padding: '12px 14px' }}>
              <p style={{ margin: '0 0 8px', fontWeight: 700, color: 'var(--vt-orange)', fontSize: 13 }}>{MONTHS[Number(m) - 1]}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {byMonth[Number(m)].map((f) => (
                  <button
                    key={f.id}
                    className="btn btn-sm btn-secondary"
                    style={{ textAlign: 'left', justifyContent: 'flex-start' }}
                    onClick={() => setSelId(f.id)}
                  >
                    {f.emoji} {f.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="card" style={{ marginTop: 18, padding: 18 }}>
          <h3 style={{ margin: '0 0 6px' }}>{sel.emoji} {sel.name}</h3>
          <p style={{ margin: 0, color: 'var(--vt-muted)' }}>{sel.approx} · {sel.tithi}</p>
          <p style={{ margin: '12px 0 0' }}><strong>{t('Meaning')}:</strong> {sel.meaning}</p>
          <p style={{ margin: '8px 0 0' }}><strong>{t('How it is celebrated')}:</strong> {sel.how}</p>
          <div className="card" style={{ marginTop: 12, padding: '10px 14px', background: 'var(--vt-white)' }}>
            <p style={{ margin: 0, fontSize: 18 }}>{sel.phrase}</p>
            <p style={{ margin: '4px 0 0', color: 'var(--vt-muted)' }}>{sel.phraseEn}</p>
            <p style={{ margin: '2px 0 0', color: 'var(--vt-muted)', fontSize: 13, fontStyle: 'italic' }}>{toIAST(sel.phrase)}</p>
          </div>
          <button className="btn btn-sm btn-secondary" style={{ marginTop: 12 }} onClick={() => speak(sel.phrase)} disabled={speaking}>
            🔊 {t('Hear the phrase')}
          </button>
        </div>
      </div>
    </div>
  )
}