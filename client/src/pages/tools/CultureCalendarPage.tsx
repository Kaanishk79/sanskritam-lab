import { useEffect, useMemo, useState } from 'react'
import { FESTIVALS, RITUS, type Festival, type Ritu } from '../../data/cultureCalendar'
import { loadFestivals, loadRitus } from '../../services/contentDb'
import { toIAST } from '../../services/sanskrit'
import { speakWithFallback } from '../../services/speech'
import { useLanguage } from '../../context/LanguageContext'

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const MONTHS_HI = ['जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर']

function findNext(festivals: Festival[], now: Date): { f: Festival; days: number } {
  let best = festivals[0]
  let bestDays = 9999
  for (const f of festivals) {
    const d = new Date(now.getFullYear(), f.month - 1, f.day)
    let days = Math.round((d.getTime() - now.getTime()) / 86400000)
    if (days < 0) {
      const nextYr = new Date(now.getFullYear() + 1, f.month - 1, f.day)
      days = Math.round((nextYr.getTime() - now.getTime()) / 86400000)
    }
    if (days < bestDays) {
      bestDays = days
      best = f
    }
  }
  return { f: best, days: bestDays }
}

function findRitu(ritus: Ritu[], now: Date): Ritu {
  const m = now.getMonth()
  if (m >= 2 && m <= 4) return ritus[0]
  if (m >= 4 && m <= 6) return ritus[1]
  if (m >= 6 && m <= 8) return ritus[2]
  if (m >= 8 && m <= 10) return ritus[3]
  if (m >= 10 || m === 0) return m === 0 ? ritus[5] : ritus[4]
  return ritus[4]
}

export default function CultureCalendarPage() {
  const { t, lang } = useLanguage()
  const pick = (hi?: string, en?: string) => (lang === 'hi' ? hi ?? en ?? '' : en ?? '')
  const [festivals, setFestivals] = useState<Festival[]>(FESTIVALS)
  const [ritus, setRitus] = useState<Ritu[]>(RITUS)
  const [selId, setSelId] = useState<string | null>(null)
  const [speaking, setSpeaking] = useState(false)

  useEffect(() => {
    loadFestivals().then(setFestivals)
    loadRitus().then(setRitus)
  }, [])

  const next = useMemo(() => findNext(festivals, new Date()), [festivals])
  const ritu = useMemo(() => findRitu(ritus, new Date()), [ritus])

  const sel = festivals.find((f) => f.id === selId) || next.f

  const speak = (text: string) => speakWithFallback(text, (s) => setSpeaking(s))

  const byMonth = useMemo(() => {
    const map: Record<number, typeof FESTIVALS> = {}
    for (const f of festivals) {
      ;(map[f.month] ||= []).push(f)
    }
    return map
  }, [festivals])

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
            <h3 style={{ margin: '4px 0 0', fontSize: 24 }}>{next.f.emoji} {pick(next.f.nameHi, next.f.name)}</h3>
            <button className="btn btn-sm btn-secondary" onClick={() => speak(next.f.phrase)} disabled={speaking}>🔊 {t('Say the greeting')}</button>
          </div>
          <p style={{ margin: '6px 0 0', color: 'var(--vt-muted)' }}>{pick(next.f.approxHi, next.f.approx)} · {pick(next.f.tithiHi, next.f.tithi)}</p>
          <p style={{ margin: '10px 0 0', fontSize: 18 }}>{next.f.phrase}</p>
          <p style={{ margin: '2px 0 0', color: 'var(--vt-muted)' }}>{pick(next.f.phraseEnHi, next.f.phraseEn)} — {toIAST(next.f.phrase)}</p>
          <p style={{ margin: '10px 0 0' }}>{pick(next.f.meaningHi, next.f.meaning)}</p>
        </div>

        <div className="card" style={{ padding: 16, marginBottom: 18, textAlign: 'center' }}>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--vt-muted)' }}>{t('Current season in the Sanskrit year')}</p>
          <p style={{ margin: '4px 0 0', fontSize: 24 }}>{ritu.emoji} {ritu.name} <span style={{ color: 'var(--vt-muted)', fontSize: 16 }}>({pick(ritu.seasonHi, ritu.season)}, {pick(ritu.monthsHi, ritu.months)})</span></p>
          <p style={{ margin: '6px 0 0', fontStyle: 'italic', color: 'var(--vt-muted)' }}>{ritu.verse}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(190px,1fr))', gap: 10 }}>
          {Object.keys(byMonth).sort((a, b) => Number(a) - Number(b)).map((m) => (
            <div key={m} className="card" style={{ margin: 0, padding: '12px 14px' }}>
              <p style={{ margin: '0 0 8px', fontWeight: 700, color: 'var(--vt-orange)', fontSize: 13 }}>{lang === 'hi' ? MONTHS_HI[Number(m) - 1] : MONTHS[Number(m) - 1]}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {byMonth[Number(m)].map((f) => (
                  <button
                    key={f.id}
                    className="btn btn-sm btn-secondary"
                    style={{ textAlign: 'left', justifyContent: 'flex-start' }}
                    onClick={() => setSelId(f.id)}
                  >
                    {f.emoji} {pick(f.nameHi, f.name)}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="card" style={{ marginTop: 18, padding: 18 }}>
          <h3 style={{ margin: '0 0 6px' }}>{sel.emoji} {pick(sel.nameHi, sel.name)}</h3>
          <p style={{ margin: 0, color: 'var(--vt-muted)' }}>{pick(sel.approxHi, sel.approx)} · {pick(sel.tithiHi, sel.tithi)}</p>
          <p style={{ margin: '12px 0 0' }}><strong>{t('Meaning')}:</strong> {pick(sel.meaningHi, sel.meaning)}</p>
          <p style={{ margin: '8px 0 0' }}><strong>{t('How it is celebrated')}:</strong> {pick(sel.howHi, sel.how)}</p>
          <div className="card" style={{ marginTop: 12, padding: '10px 14px', background: 'var(--vt-white)' }}>
            <p style={{ margin: 0, fontSize: 18 }}>{sel.phrase}</p>
            <p style={{ margin: '4px 0 0', color: 'var(--vt-muted)' }}>{pick(sel.phraseEnHi, sel.phraseEn)}</p>
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