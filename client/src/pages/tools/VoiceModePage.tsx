import { useEffect, useRef, useState } from 'react'
import { startListening, stopListening, isSpeechSupported, onSpeechResult, speakWithFallback, hasTTS } from '../../services/speech'
import { toIAST } from '../../services/sanskrit'
import { api } from '../../services/api'
import { useLanguage } from '../../context/LanguageContext'

interface VoiceEntry {
  word: string | null
  meanings: string[]
  iast: string | null
  pos: string | null
  suggestions: { title: string; sub: string }[]
}

interface HistoryItem {
  heard: string
  reply: string
  entries: VoiceEntry[]
  at: number
}

const EN_MAP: Record<string, string> = {
  namaste: 'नमस्ते', hello: 'नमस्ते', hi: 'नमस्ते', water: 'जल', teacher: 'गुरु', knowledge: 'विद्या',
  peace: 'शान्ति', book: 'पुस्तक', sun: 'सूर्य', moon: 'चन्द्र', love: 'प्रेम', truth: 'सत्य',
  home: 'गृह', friend: 'मित्र', god: 'देव', mother: 'माता', father: 'पिता', language: 'भाषा',
  word: 'शब्द', heart: 'हृदय', sky: 'आकाश', earth: 'भूमि', fire: 'अग्नि', wind: 'वायु',
  king: 'राजा', child: 'बालक', eye: 'नेत्र', hand: 'हस्त', time: 'काल', death: 'मृत्यु',
}

const SAMPLES = [
  'नमस्ते', 'जल', 'विद्या', 'गुरु', 'शान्ति', 'सत्य',
]

function tokens(text: string): string[] {
  return text
    .replace(/[।॥\.,!?;:"'“”‘’()\-—\u200c\u200d]+/g, ' ')
    .split(/\s+/)
    .map((t) => t.trim())
    .filter(Boolean)
}

const stripEnding = (w: string) => (w.length > 1 ? w.replace(/[ाःाीूेैोौंँ]$/, '') : w)

export default function VoiceModePage() {
  const { t } = useLanguage()
  const [supported] = useState(isSpeechSupported)
  const [hasVoice] = useState(hasTTS)
  const [listening, setListening] = useState(false)
  const [interim, setInterim] = useState('')
  const [lang, setLang] = useState<'hi-IN' | 'en-IN'>('hi-IN')
  const [muted, setMuted] = useState(false)
  const [busy, setBusy] = useState(false)
  const [lastHeard, setLastHeard] = useState('')
  const [entries, setEntries] = useState<VoiceEntry[]>([])
  const [suggestions, setSuggestionsState] = useState<VoiceEntry[]>([])
  const [reply, setReply] = useState('')
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [aiActive, setAiActive] = useState(false)
  const bufferRef = useRef('')

  useEffect(() => {
    const unsub = onSpeechResult((r) => {
      bufferRef.current += r.transcript + ' '
      setInterim(r.transcript)
      setListening(true)
      if (r.isFinal) {
        const phrase = bufferRef.current.trim()
        bufferRef.current = ''
        processPhrase(phrase)
      }
    })
    return unsub
  }, [lang, muted])

  const toggleMic = () => {
    if (listening) {
      stopListening()
      setListening(false)
      if (bufferRef.current.trim()) processPhrase(bufferRef.current.trim())
      bufferRef.current = ''
      return
    }
    bufferRef.current = ''
    setInterim('')
    startListening(lang)
    setListening(true)
  }

  const lookup = async (word: string): Promise<VoiceEntry | null> => {
    const dev = /[\u0900-\u097F]/.test(word) ? word : EN_MAP[word.toLowerCase()] || null
    const candidates = dev ? [dev, stripEnding(dev)] : []
    for (const c of candidates) {
      const hit = await api.dictionary.lookup(c)
      if (hit && hit.meanings?.length) {
        return { word: c, meanings: hit.meanings.slice(0, 5), iast: toIAST(c), pos: hit.pos || null, suggestions: [] }
      }
    }
    const sug = await api.dictionary.lookup(dev || word).catch(() => null)
    if (sug && sug.meanings?.length) {
      return { word: dev || word, meanings: sug.meanings.slice(0, 5), iast: toIAST(dev || word), pos: sug.pos || null, suggestions: [] }
    }
    return null
  }

  const localReply = (phrase: string, found: VoiceEntry[]): string => {
    const p = phrase.toLowerCase()
    if (/नमस्ते|नमस्कार|hello|namaste/.test(p)) {
      return 'नमस्ते! 🙏 अहम् संस्कृतम् अध्यापयामि। किम् इच्छसि भोः? — I teach Sanskrit. What would you like to learn?'
    }
    if (found.length > 0) {
      const parts = found.slice(0, 3).map((e) => `${e.word} — ${e.meanings.slice(0, 2).join(', ')}`)
      return parts.join(' । ')
    }
    return 'क्षम्यताम् — क्षमा करें, यह शब्द मेरे शब्दकोश में नहीं मिला। नीचे के सुझाव देखें।'
  }

  const processPhrase = async (phrase: string) => {
    const clean = phrase.trim()
    if (!clean) return
    setBusy(true)
    setLastHeard(clean)
    const words = tokens(clean)
    const found: VoiceEntry[] = []
    const suggestions: VoiceEntry[] = []
    for (const w of words.slice(0, 5)) {
      const e = await lookup(w)
      if (e) found.push(e)
    }
    let text = ''
    let ai = false
    try {
      const res = await api.tutor.chat([{ role: 'user', content: clean }], { mode: 'voice' })
      text = res.reply
      ai = true
    } catch {
      text = localReply(clean, found)
    }
    if (found.length === 0) {
      const res = await api.dictionary.lookup(clean).catch(() => null)
      if (!res) {
        const { searchAll } = await import('../../services/sanskrit')
        const sres = await searchAll(clean, 4)
        suggestions.push({ word: null, meanings: [], iast: null, pos: null, suggestions: sres.map((s) => ({ title: s.title, sub: s.sub })) })
      }
    }
    setEntries(found)
    setSuggestionsState(suggestions)
    setReply(text)
    setAiActive(ai)
    setHistory((h) => [{ heard: clean, reply: text, entries: found, at: Date.now() }, ...h].slice(0, 12))
    if (!muted && text) speakWithFallback(text)
    setBusy(false)
  }

  const speak = (text: string) => {
    if (text) speakWithFallback(text)
  }

  const useSample = (s: string) => {
    processPhrase(s)
  }

  const stopSpeaking = () => {
    const synth = typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis : null
    try { synth?.cancel() } catch { /* ignore */ }
  }

  return (
    <div>
      <div className="page-header">
        <h2>{t('🎤 Voice Mode')}</h2>
        <p>{t('Speak in Sanskrit or Hindi — hear the word, its meaning, and a spoken reply. Works fully offline, and uses the AI tutor when it is connected.')}</p>
      </div>

      <div className="card" style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center', padding: 32 }}>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', marginBottom: 16 }}>
          <select
            className="btn btn-sm btn-secondary"
            value={lang}
            onChange={(e) => setLang(e.target.value as 'hi-IN' | 'en-IN')}
            style={{ height: 36 }}
          >
            <option value="hi-IN">🇮🇳 हिन्दी / संस्कृत</option>
            <option value="en-IN">🇬🇧 English (namaste → नमस्ते)</option>
          </select>
          <button className={`btn btn-sm ${muted ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setMuted((m) => !m)}>
            {muted ? '🔇 ' + t('Muted') : '🔊 ' + t('Voice replies on')}
          </button>
          <button className="btn btn-sm btn-secondary" onClick={stopSpeaking}>{t('⏹ Stop audio')}</button>
        </div>

        {!supported && (
          <p className="badge" style={{ background: 'var(--vt-orange)', color: 'white', padding: '8px 14px' }}>
            {t('Speech recognition needs Chrome/Edge with a microphone. You can still type below.')}
          </p>
        )}

        <button
          onClick={toggleMic}
          className="btn"
          style={{
            width: 120, height: 120, borderRadius: 60, fontSize: 44, lineHeight: 1,
            background: listening ? 'var(--vt-orange)' : 'var(--vt-primary)',
            color: '#fff', border: 'none', boxShadow: listening ? '0 0 0 12px rgba(255,152,0,0.25)' : 'var(--vt-shadow)',
            transition: 'all .2s', cursor: 'pointer',
          }}
          title={listening ? t('Stop listening') : t('Start listening')}
        >
          {listening ? '⏹' : '🎤'}
        </button>
        <p style={{ marginTop: 10, fontWeight: 600 }}>
          {listening ? t('Listening… speak now') : t('Tap the mic and speak')}
        </p>
        {interim && <p style={{ color: 'var(--vt-muted)', fontStyle: 'italic' }}>“{interim}”</p>}
        {!supported && (
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 12 }}>
            <input
              style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid var(--vt-border)', width: 260 }}
              placeholder={t('Type a word (e.g. जल)…')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.target as HTMLInputElement).value.trim()) {
                  processPhrase((e.target as HTMLInputElement).value)
                  ;(e.target as HTMLInputElement).value = ''
                }
              }}
            />
            <button className="btn btn-primary" onClick={() => {
              const inp = document.querySelector<HTMLInputElement>('input[placeholder]')
              if (inp?.value.trim()) processPhrase(inp.value)
            }}>{t('Look up')}</button>
          </div>
        )}

        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginTop: 16 }}>
          {SAMPLES.map((s) => (
            <button key={s} className="btn btn-sm btn-secondary" onClick={() => useSample(s)}>{s}</button>
          ))}
        </div>

        {busy && <p style={{ color: 'var(--vt-muted)' }}>{t('Thinking…')}</p>}

        {lastHeard && (
          <div style={{ marginTop: 20, textAlign: 'left' }}>
            <p><strong>{t('You said:')}</strong> <span style={{ fontSize: 18 }}>{lastHeard}</span></p>
            {entries.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10 }}>
                {entries.map((e) => (
                  <div key={e.word} style={{ border: '1px solid var(--vt-border)', borderRadius: 10, padding: '12px 16px', background: 'var(--vt-white)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                      <div>
                        <span style={{ fontSize: 22, fontWeight: 700 }}>{e.word}</span>
                        {e.iast && <span style={{ color: 'var(--vt-muted)', marginLeft: 8 }}>{e.iast}</span>}
                        {e.pos && <span className="badge" style={{ marginLeft: 8 }}>{e.pos}</span>}
                      </div>
                      <button className="btn btn-sm btn-secondary" onClick={() => speak(e.word!)}>🔊 {t('Hear')}</button>
                    </div>
                    <p style={{ margin: '6px 0 0', color: 'var(--vt-muted)' }}>{e.meanings.join(' · ')}</p>
                  </div>
                ))}
              </div>
            )}
            {suggestions.length > 0 && (
              <div style={{ marginTop: 10 }}>
                <p style={{ fontWeight: 600 }}>{t('Did you mean?')}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {suggestions[0].suggestions.map((s) => (
                    <div key={s.title} style={{ border: '1px dashed var(--vt-border)', borderRadius: 8, padding: '8px 12px' }}>
                      <strong>{s.title}</strong> <span style={{ color: 'var(--vt-muted)' }}>— {s.sub}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {reply && (
              <div style={{ marginTop: 14, padding: '12px 16px', borderRadius: 10, background: 'rgba(255,152,0,0.08)', border: '1px solid rgba(255,152,0,0.3)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 20 }}>{aiActive ? '🤖' : '💬'}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0 }}>{reply}</p>
                  <p style={{ margin: '6px 0 0', fontSize: 12, color: 'var(--vt-muted)' }}>
                    {aiActive ? t('AI tutor reply') : t('Offline reply — AI tutor will answer when connected')}
                  </p>
                </div>
                <button className="btn btn-sm btn-secondary" onClick={() => speak(reply)}>🔊</button>
              </div>
            )}
          </div>
        )}

        {history.length > 0 && (
          <div style={{ marginTop: 24, textAlign: 'left' }}>
            <h4 style={{ marginBottom: 8 }}>{t('🕘 Conversation History')}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {history.slice(1).map((h, i) => (
                <div key={h.at + '-' + i} style={{ border: '1px solid var(--vt-border)', borderRadius: 8, padding: '10px 14px' }}>
                  <p style={{ margin: 0, fontWeight: 600 }}>“{h.heard}”</p>
                  <p style={{ margin: '4px 0 0', color: 'var(--vt-muted)', fontSize: 14 }}>
                    {h.entries.length > 0
                      ? h.entries.map((e) => `${e.word} — ${e.meanings[0] || ''}`).join(' · ')
                      : h.reply}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {!hasVoice && (
          <p className="badge" style={{ marginTop: 16, background: 'var(--vt-border)', color: 'var(--vt-muted)' }}>
            {t('No offline voice installed — online voices will be used when available.')}
          </p>
        )}
      </div>
    </div>
  )
}