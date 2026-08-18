import { useState } from 'react'
import { checkSanskrit, EXAMPLE_TEXTS, type FixResult } from '../../services/sanskritFixer'
import { api } from '../../services/api'
import { useLanguage } from '../../context/LanguageContext'

export default function FixMySanskritPage() {
  const { t } = useLanguage()
  const [input, setInput] = useState('')
  const [result, setResult] = useState<FixResult | null>(null)
  const [busy, setBusy] = useState(false)
  const [aiNote, setAiNote] = useState('')

  const fix = async () => {
    if (!input.trim()) return
    setBusy(true)
    setResult(null)
    setAiNote('')
    try {
      let aiText = ''
      let ai = false
      try {
        const res = await api.tutor.chat(
          [{ role: 'system', content: 'You correct Sanskrit. Reply ONLY with the corrected Sanskrit text (Devanagari), nothing else.' }, { role: 'user', content: input }],
          { mode: 'fix' },
        )
        aiText = res.reply.trim()
        ai = true
      } catch {
        /* offline — rule engine below */
      }
      const res = await checkSanskrit(input, async (w) => {
        const hit = await api.dictionary.lookup(w).catch(() => null)
        return hit && hit.meanings?.length ? hit.meanings[0] : null
      })
      if (ai && aiText && aiText !== input.trim()) {
        res.fixed = aiText
        res.issues.unshift({
          rule: 'ai',
          icon: '🤖',
          message: 'AI tutor rewrote your sentence.',
          suggestion: aiText,
          fix: aiText,
        })
        setAiNote(t('AI tutor is connected — this correction comes from the model.'))
      } else {
        setAiNote(t('AI tutor offline — corrections below use built-in grammar rules.'))
      }
      setResult(res)
    } finally {
      setBusy(false)
    }
  }

  const apply = (fix: string) => {
    setInput(fix)
    setResult(null)
  }

  return (
    <div>
      <div className="page-header">
        <h2>{t('🩺 Fix My Sanskrit')}</h2>
        <p>{t('Type any Sanskrit sentence — get instant grammar fixes: punctuation, missing spaces, sandhi joins and unknown words. Uses the AI tutor when connected.')}</p>
      </div>

      <div className="card" style={{ maxWidth: 760, margin: '0 auto', padding: 24 }}>
        <textarea
          className="lab-textarea"
          style={{ width: '100%', minHeight: 120, fontSize: 18, padding: 12, borderRadius: 10, border: '1px solid var(--vt-border)' }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('e.g. रामः वने वसति — or type in IAST: rāmaḥ vane vasati')}
        />
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '12px 0', alignItems: 'center' }}>
          <button className="btn btn-primary" onClick={fix} disabled={busy || !input.trim()}>
            {busy ? t('Checking…') : t('🔍 Check My Sanskrit')}
          </button>
          <span style={{ flex: 1 }} />
          <button className="btn btn-sm btn-secondary" onClick={() => setInput(EXAMPLE_TEXTS[Math.floor(Math.random() * EXAMPLE_TEXTS.length)])}>
            🎲 {t('Random example')}
          </button>
        </div>

        {result && (
          <div style={{ marginTop: 8 }}>
            {aiNote && <p className="badge" style={{ background: 'rgba(255,152,0,0.15)', color: 'var(--vt-orange)', marginBottom: 10 }}>{aiNote}</p>}

            <div className="card" style={{ padding: 16, marginBottom: 14, border: '2px solid #2e7d32' }}>
              <p style={{ margin: 0, fontWeight: 600, fontSize: 13 }}>{t('✅ Corrected text')}</p>
              <p style={{ fontSize: 20, margin: '6px 0 0' }}>{result.fixed}</p>
            </div>

            {result.issues.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <h4 style={{ marginBottom: 4 }}>{t('🔧 Fixes applied')} ({result.issues.length})</h4>
                {result.issues.map((iss, i) => (
                  <div key={i} className="card" style={{ padding: '12px 14px', margin: 0, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 20 }}>{iss.icon}</span>
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: 0 }}><strong>{iss.message}</strong></p>
                      <p style={{ margin: '4px 0 0', color: 'var(--vt-muted)' }}>{iss.suggestion}</p>
                    </div>
                    <button className="btn btn-sm btn-secondary" onClick={() => apply(iss.fix)}>{t('Apply')}</button>
                  </div>
                ))}
              </div>
            )}

            {result.unknownWords.length > 0 && (
              <div style={{ marginTop: 14 }}>
                <h4>{t('📖 Words not found in dictionary')}</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {result.unknownWords.map((u) => (
                    <span key={u.word} className="badge" style={{ background: 'rgba(198,40,40,0.1)', color: '#c62828', padding: '6px 10px' }}>
                      {u.word} <a href={`#/explore/${encodeURIComponent(u.word)}`} style={{ color: 'inherit' }}>→ {t('lookup')}</a>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {result.issues.length === 0 && result.unknownWords.length === 0 && (
              <p className="lab-feedback ok">{t('🎉 No issues found — your Sanskrit is perfect!')}</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}