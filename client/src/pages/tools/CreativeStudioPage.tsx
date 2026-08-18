import { useMemo, useState } from 'react'
import { METERS, VERSE_THEMES, countSyllables, type VerseLine, type Meter, type VerseTheme } from '../../data/creativeStudio'
import { api } from '../../services/api'
import { toIAST } from '../../services/sanskrit'
import { speakWithFallback } from '../../services/speech'
import { useLanguage } from '../../context/LanguageContext'

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function buildLines(theme: VerseTheme, meter: Meter, rngSeed: number): VerseLine[] {
  void rngSeed
  const used: string[] = []
  const takeWord = () => {
    const free = theme.words.filter((w) => !used.includes(w.sa))
    const w = pick(free.length ? free : theme.words)
    used.push(w.sa)
    return w
  }
  const lines: VerseLine[] = []
  for (let i = 0; i < meter.lines; i++) {
    const w1 = takeWord()
    const w2 = takeWord()
    const tpl = pick(theme.templates)
    const plural = tpl[0].includes('न्ते') || tpl[0].includes('न्ति')
    const t = tpl[plural ? 0 : 1] ?? tpl[0]
    const sa = t.replace('{1}', w1.sa).replace('{2}', w2.sa)
    lines.push({
      sa,
      iast: toIAST(sa),
      gloss: `${w1.en} + ${w2.en}`,
      syllables: countSyllables(sa),
    })
  }
  return lines
}

export default function CreativeStudioPage() {
  const { t } = useLanguage()
  const [themeId, setThemeId] = useState('nature')
  const [meterIdx, setMeterIdx] = useState(0)
  const [lines, setLines] = useState<VerseLine[]>([])
  const [busy, setBusy] = useState(false)

  const theme = useMemo(() => VERSE_THEMES.find((x) => x.id === themeId) ?? VERSE_THEMES[0], [themeId])
  const meter = METERS[meterIdx]

  const compose = async () => {
    setBusy(true)
    setLines(buildLines(theme, meter, Math.random()))
    try {
      const res = await api.tutor.chat(
        [{ role: 'user', content: `Compose a short Sanskrit verse (${meter.lines} lines, about ${meter.syllables} syllables per line) on the theme of ${theme.title}. Return each line on its own line, Devanagari only.` }],
        { mode: 'create' },
      )
      const aiLines = (res.reply ?? '')
        .split('\n')
        .map((s) => s.trim())
        .filter((s) => /[अ-ह]/.test(s))
        .slice(0, meter.lines)
      if (aiLines.length > 0) {
        setLines(aiLines.map((sa) => ({ sa, iast: toIAST(sa), gloss: '', syllables: countSyllables(sa) })))
      }
    } catch {
      /* offline template stays */
    }
    setBusy(false)
  }

  const speakVerse = () => {
    lines.forEach((l, i) => setTimeout(() => speakWithFallback(l.sa), i * 4000))
  }

  return (
    <div>
      <div className="page-header">
        <h2>{t('🎨 Creative Studio')}</h2>
        <p>{t('Compose your own Sanskrit verse — pick a theme and a meter, then hear it aloud.')}</p>
      </div>

      <div className="card" style={{ maxWidth: 760, margin: '0 auto', padding: 24 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12, alignItems: 'center' }}>
          {VERSE_THEMES.map((th) => (
            <button key={th.id} className={`btn btn-sm ${th.id === themeId ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setThemeId(th.id)}>
              {th.emoji} {th.title.split('—')[0].trim()}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16, alignItems: 'center' }}>
          {METERS.map((m, i) => (
            <button key={m.name} className={`btn btn-sm ${i === meterIdx ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setMeterIdx(i)}>
              {m.name} ({m.syllables})
            </button>
          ))}
          <span style={{ flex: 1 }} />
          <button className="btn btn-primary" onClick={compose} disabled={busy}>
            {busy ? t('Composing…') : t('✨ Compose verse')}
          </button>
        </div>

        <p style={{ fontSize: 13, opacity: 0.7, margin: '0 0 14px' }}>{meter.name} — {meter.desc}</p>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
          {theme.words.map((w) => (
            <span key={w.sa} className="badge">{w.sa} <em style={{ opacity: 0.7 }}>{w.en}</em></span>
          ))}
        </div>

        {lines.length > 0 && (
          <div>
            <div className="card" style={{ padding: 20, background: 'linear-gradient(135deg,#16213e,#1a1a3e)', color: '#fff', textAlign: 'center' }}>
              {lines.map((l, i) => (
                <p key={i} style={{ margin: '8px 0' }}>
                  {l.sa}
                  <span style={{ display: 'block', fontSize: 13, color: '#ffd54f', fontStyle: 'italic' }}>{l.iast}</span>
                  {l.gloss && <span style={{ display: 'block', fontSize: 12, opacity: 0.6 }}>{l.gloss}</span>}
                  <span className="badge" style={{ marginTop: 4, opacity: 0.8 }}>{l.syllables}/{meter.syllables} {t('syllables')}</span>
                </p>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <button className="btn btn-secondary btn-sm" onClick={speakVerse}>🔊 {t('Hear the verse')}</button>
              <button className="btn btn-secondary btn-sm" onClick={compose} disabled={busy}>{t('🔄 Re-compose')}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}