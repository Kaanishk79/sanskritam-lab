import { useEffect, useMemo, useRef, useState } from 'react'
import { readingPassages, listeningItems, writingItems, comprehensionQuestions, emptyLabStats, type ReadingPassage, type LabSkillStats } from '../../data/languageLab'
import { startListening, stopListening, isSpeechSupported, onSpeechResult, speakWithFallback } from '../../services/speech'
import type { LabProject } from '../../services/labProjects'
import LabAssignments from './LabAssignments'
import { useKeyboard } from '../../context/KeyboardContext'
import { useLanguage } from '../../context/LanguageContext'
import './languageLab.css'

type LabTab = 'library' | 'listening' | 'speaking' | 'reading' | 'writing' | 'report' | 'assignments'

const STORAGE_KEY = 'sanskrit-lab-stats'

const loadStats = (): Record<string, LabSkillStats> => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { ...emptyLabStats(), ...JSON.parse(raw) }
  } catch { /* ignore */ }
  return emptyLabStats()
}

const saveStats = (s: Record<string, LabSkillStats>) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)) } catch { /* ignore */ }
}

const normalize = (s: string) =>
  s.replace(/[।॥\.,!?;:"'\u200c\u200d\s]+/g, '').toLowerCase()

function useAudioRecorder() {
  const [recording, setRecording] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const mediaRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const [supported] = useState(() => typeof MediaRecorder !== 'undefined')

  const start = async () => {
    if (!supported) return
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const rec = new MediaRecorder(stream)
      chunksRef.current = []
      rec.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data) }
      rec.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        setAudioUrl(URL.createObjectURL(blob))
        stream.getTracks().forEach((tr) => tr.stop())
      }
      mediaRef.current = rec
      rec.start()
      setRecording(true)
    } catch { /* permission denied */ }
  }

  const stop = () => {
    if (mediaRef.current && mediaRef.current.state !== 'inactive') mediaRef.current.stop()
    setRecording(false)
  }

  useEffect(() => () => {
    if (mediaRef.current && mediaRef.current.state !== 'inactive') mediaRef.current.stop()
  }, [])

  return { recording, audioUrl, start, stop, supported }
}

export default function LanguageLabPage() {
  const { t, lang } = useLanguage()
  const { toggleKeyboard } = useKeyboard()
  const [tab, setTab] = useState<LabTab>('library')
  const [stats, setStats] = useState<Record<string, LabSkillStats>>(loadStats)
  const [activePassage, setActivePassage] = useState<ReadingPassage>(readingPassages[0])
  const [spokenIndex, setSpokenIndex] = useState(0)
  const [recognitionText, setRecognitionText] = useState('')
  const [recognizing, setRecognizing] = useState(false)
  const [speechSupported] = useState(isSpeechSupported)
  const [listeningIndex, setListeningIndex] = useState(0)
  const [listeningAnswer, setListeningAnswer] = useState('')
  const [listeningResult, setListeningResult] = useState<boolean | null>(null)
  const [writingIndex, setWritingIndex] = useState(0)
  const [writingAnswer, setWritingAnswer] = useState('')
  const [writingResult, setWritingResult] = useState<boolean | null>(null)
  const [readingPassageId, setReadingPassageId] = useState<string>('rp1')
  const [readingAnswers, setReadingAnswers] = useState<Record<string, number>>({})
  const [readingScore, setReadingScore] = useState<number | null>(null)
  const [activeProject, setActiveProject] = useState<LabProject | null>(null)
  const [speaking, setSpeaking] = useState(false)
  const [ttsMode, setTtsMode] = useState<'browser' | 'online' | 'online2' | 'none'>('browser')
  const recorder = useAudioRecorder()

  const speak = (text: string) => {
    if (!text.trim()) return
    speakWithFallback(text, (isSpeaking, mode) => {
      setSpeaking(isSpeaking)
      setTtsMode(mode)
    })
  }

  const scopedPassages = useMemo(() => {
    if (!activeProject) return readingPassages
    return readingPassages.filter((p) => activeProject.content.passageIds.includes(p.id))
  }, [activeProject])

  const scopedListening = useMemo(() => {
    if (!activeProject) return listeningItems
    return listeningItems.filter((l) => activeProject.content.listeningIds.includes(l.id))
  }, [activeProject])

  const scopedWriting = useMemo(() => {
    if (!activeProject) return writingItems
    return writingItems.filter((w) => activeProject.content.writingIds.includes(w.id))
  }, [activeProject])

  useEffect(() => saveStats(stats), [stats])

  useEffect(() => {
    const unsub = onSpeechResult((r) => {
      setRecognitionText((prev) => prev + r.transcript + ' ')
    })
    return unsub
  }, [])

  const addStat = (key: string, score: number) => {
    setStats((s) => {
      const prev = s[key] ?? { score: 0, attempts: 0 }
      const n = prev.attempts + 1
      const next = { score: Math.round((prev.score * prev.attempts + score) / n), attempts: n }
      saveStats({ ...s, [key]: next })
      return { ...s, [key]: next }
    })
  }

  const toggleRecognition = () => {
    if (recognizing) {
      stopListening()
      setRecognizing(false)
      return
    }
    if (speechSupported) {
      startListening()
      setRecognizing(true)
      setRecognitionText('')
    }
  }

  const checkListening = () => {
    const correct = normalize(listeningAnswer) === normalize(scopedListening[listeningIndex].text)
    setListeningResult(correct)
    addStat('listening', correct ? 100 : 0)
  }

  const checkWriting = () => {
    const correct = normalize(writingAnswer) === normalize(scopedWriting[writingIndex].correct)
    setWritingResult(correct)
    addStat('writing', correct ? 100 : 0)
  }

  useEffect(() => {
    if (!scopedPassages.some((p) => p.id === readingPassageId)) {
      setReadingPassageId(scopedPassages[0]?.id ?? 'rp1')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scopedPassages])

  const readingQ = readingPassageId ? (comprehensionQuestions[readingPassageId] ?? []) : []

  const submitReading = () => {
    if (readingQ.length === 0) return
    const correct = readingQ.filter((q) => readingAnswers[q.id] === q.correct).length
    const score = Math.round((correct / readingQ.length) * 100)
    setReadingScore(score)
    addStat('reading', score)
  }

  const overall = useMemo(() => {
    const keys = Object.values(stats).filter((s) => s.attempts > 0)
    if (keys.length === 0) return 0
    return Math.round(keys.reduce((a, s) => a + s.score, 0) / keys.length)
  }, [stats])

  const tabs: { id: LabTab; label: string; icon: string }[] = [
    { id: 'library', label: 'Digital Library', icon: '📚' },
    { id: 'assignments', label: 'Assignments & Projects', icon: '📋' },
    { id: 'listening', label: 'Listening', icon: '👂' },
    { id: 'speaking', label: 'Speaking', icon: '🗣️' },
    { id: 'reading', label: 'Reading', icon: '📖' },
    { id: 'writing', label: 'Writing', icon: '✍️' },
    { id: 'report', label: 'Report', icon: '📊' },
  ]

  const viewPassage = scopedPassages.find((p) => p.id === activePassage.id) ?? scopedPassages[0]

  return (
    <div>
      <div className="page-header">
        <h2>{t('🗣️ Sanskrit Language Lab')}</h2>
        <p>{t('Digital language lab — Listening, Speaking, Reading & Writing practice with record & playback')}</p>
      </div>

      <div className="lab-tabs">
        {tabs.map((tb) => (
          <button
            key={tb.id}
            className={`btn btn-sm ${tab === tb.id ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setTab(tb.id)}
          >
            {tb.icon} {t(tb.label)}
          </button>
        ))}
      </div>

      {speaking && (
        <div className={`lab-speaking ${ttsMode !== 'browser' ? 'lab-speaking-online' : ''}`}>
          🔊 {t('Speaking…')}{ttsMode !== 'browser' && ` (${t('online voice')})`}
        </div>
      )}

      {tab === 'assignments' && (
        <LabAssignments activeProject={activeProject} onOpenProject={setActiveProject} />
      )}

      {tab === 'library' && (
        <div className="lab-library">
          <div className="lab-passage-list">
            {scopedPassages.map((p) => (
              <button
                key={p.id}
                className={`lab-passage-item ${activePassage.id === p.id ? 'active' : ''}`}
                onClick={() => setActivePassage(p)}
              >
                <span className="lab-passage-level">{p.level}</span>
                <span className="lab-passage-title">{lang === 'hi' ? p.titleSanskrit : p.title}</span>
              </button>
            ))}
          </div>
          <div className="lab-passage-viewer">
            <div className="lab-passage-head">
              <h3>{lang === 'hi' ? viewPassage.titleSanskrit : viewPassage.title}</h3>
              <span className="lab-passage-level">{viewPassage.level}</span>
            </div>
            <div className="lab-passage-text">{viewPassage.text}</div>
            <div className="lab-passage-translit">{viewPassage.transliteration}</div>
            <div className="lab-passage-actions">
              <button className="btn btn-sm btn-primary" onClick={() => speak(viewPassage.text)}>🔊 {t('Hear Passage')}</button>
              {recorder.supported && (
                <>
                  <button className={`btn btn-sm ${recorder.recording ? 'btn-danger' : 'btn-secondary'}`} onClick={() => (recorder.recording ? recorder.stop() : recorder.start())}>
                    {recorder.recording ? '⏹ ' + t('Stop Recording') : '🎙️ ' + t('Record Reading')}
                  </button>
                  {recorder.audioUrl && (
                    <audio controls src={recorder.audioUrl} className="lab-audio" />
                  )}
                </>
              )}
            </div>
            <div className="lab-words">
              {viewPassage.words.map((w) => (
                <div className="lab-word" key={w.word}>
                  <span className="lab-word-sa">{w.word}</span>
                  <span className="lab-word-en">{w.meaning}</span>
                </div>
              ))}
            </div>
            <div className="lab-translation">
              <strong>{t('Translation')}: </strong>{viewPassage.translation}
            </div>
          </div>
        </div>
      )}

      {tab === 'listening' && (
        <div className="lab-card">
          <h3>{t('Listening Drill')}</h3>
          <p>{t('Hear the phrase, then type what you heard in Devanagari')}</p>
          <div className="lab-exercise">
            <div className="lab-exercise-bar">
              <span className="lab-counter">{listeningIndex + 1} / {scopedListening.length}</span>
              <button className="btn btn-sm btn-primary" onClick={() => speak(scopedListening[listeningIndex].text)}>
                🔊 {t('Play Phrase')}
              </button>
              <button
                className="btn btn-sm btn-secondary"
                onClick={() => {
                  setListeningIndex((i) => (i + 1) % scopedListening.length)
                  setListeningAnswer('')
                  setListeningResult(null)
                }}
              >
                {t('Skip →')}
              </button>
            </div>
            <div className="lab-phrase-box">
              <p className="lab-phrase">{scopedListening[listeningIndex].transliteration}</p>
              <p className="lab-hint">{t('Hint')}: {scopedListening[listeningIndex].hint}</p>
            </div>
            <div className="lab-input-row">
              <textarea
                className="lab-textarea"
                value={listeningAnswer}
                onChange={(e) => setListeningAnswer(e.target.value)}
                placeholder={t('Type in Devanagari…')}
              />
              <button className="btn btn-sm btn-secondary" onClick={() => toggleKeyboard({ current: document.querySelector('.lab-textarea') } as any)} title={t('Devanagari Keyboard')}>⌨️ देव</button>
            </div>
            <div className="lab-actions">
              <button className="btn btn-primary" onClick={checkListening} disabled={!listeningAnswer.trim()}>{t('Check')}</button>
              <button className="btn btn-sm btn-secondary" onClick={() => { setListeningAnswer(listeningItems[listeningIndex].text); setListeningResult(null) }}>{t('Show Answer')}</button>
            </div>
            {listeningResult !== null && (
              <p className={`lab-feedback ${listeningResult ? 'ok' : 'no'}`}>
                {listeningResult ? t('✓ Correct! Well done.') : t('✗ Not quite — try again.')}
              </p>
            )}
          </div>
        </div>
      )}

      {tab === 'speaking' && (
        <div className="lab-card">
          <h3>{t('Speaking Drill')}</h3>
          <p>{t('Record yourself reading this passage, then play it back to self-check. Optionally verify with speech recognition.')}</p>
          <div className="lab-exercise">
            <div className="lab-exercise-bar">
              <span className="lab-counter">{spokenIndex + 1} / {scopedPassages.length}</span>
              <button className="btn btn-sm btn-secondary" onClick={() => setSpokenIndex((i) => (i + 1) % scopedPassages.length)}>
                {t('Skip →')}
              </button>
            </div>
            <div className="lab-phrase-box">
              <p className="lab-phrase">{scopedPassages[spokenIndex].text}</p>
              <p className="lab-hint">{scopedPassages[spokenIndex].transliteration}</p>
            </div>
            <div className="lab-actions">
              <button className="btn btn-sm btn-primary" onClick={() => speak(scopedPassages[spokenIndex].text)}>🔊 {t('Hear Passage')}</button>
              {recorder.supported && (
                <button className={`btn btn-sm ${recorder.recording ? 'btn-danger' : 'btn-primary'}`} onClick={() => (recorder.recording ? recorder.stop() : recorder.start())}>
                  {recorder.recording ? '⏹ ' + t('Stop Recording') : '🎙️ ' + t('Record Yourself')}
                </button>
              )}
              {recorder.audioUrl && <audio controls src={recorder.audioUrl} className="lab-audio" />}
            </div>
            {speechSupported && (
              <div className="lab-recognize">
                <button className={`btn btn-sm btn-secondary ${recognizing ? 'btn-danger' : ''}`} onClick={toggleRecognition}>
                  {recognizing ? '⏹ ' + t('Stop Listening') : '🎙️ ' + t('Speech Check')}
                </button>
                {recognitionText && (
                  <p className="lab-recognition">{recognitionText}</p>
                )}
              </div>
            )}
            <div className="lab-selfeval">
              <p>{t('How did you do?')}</p>
              <button className="btn btn-sm btn-primary" onClick={() => { addStat('speaking', 100); alert(t('Great — pronunciation practice recorded!')) }}>{t('Excellent!')}</button>
              <button className="btn btn-sm btn-secondary" onClick={() => { addStat('speaking', 70); alert(t('Good — keep practicing.')) }}>{t('Good')}</button>
              <button className="btn btn-sm btn-secondary" onClick={() => { addStat('speaking', 40); alert(t('Needs work — try again.')) }}>{t('Needs Work')}</button>
            </div>
          </div>
        </div>
      )}

      {tab === 'reading' && (
        <div className="lab-card">
          <h3>{t('Reading Comprehension')}</h3>
          <div className="lab-reading-select">
            {scopedPassages.map((p) => (
              <button key={p.id} className={`btn btn-sm ${readingPassageId === p.id ? 'btn-primary' : 'btn-secondary'}`} onClick={() => { setReadingPassageId(p.id); setReadingAnswers({}); setReadingScore(null) }}>
                {p.title}
              </button>
            ))}
          </div>
          {readingQ.length > 0 && (
            <div className="lab-exercise">
              <div className="lab-phrase-box">
                <p className="lab-phrase">{scopedPassages.find((p) => p.id === readingPassageId)?.text}</p>
              </div>
              {readingQ.map((q, qi) => (
                <div className="lab-question" key={q.id}>
                  <p className="lab-q-text">{qi + 1}. {q.question}</p>
                  <div className="lab-options">
                    {q.options.map((opt, oi) => (
                      <button
                        key={oi}
                        className={`lab-opt ${readingAnswers[q.id] === oi ? 'chosen' : ''}`}
                        onClick={() => setReadingAnswers((a) => ({ ...a, [q.id]: oi }))}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <button className="btn btn-primary" onClick={submitReading} disabled={readingQ.some((q) => readingAnswers[q.id] === undefined)}>
                {t('Submit Answers')}
              </button>
              {readingScore !== null && (
                <p className={`lab-feedback ${readingScore >= 60 ? 'ok' : 'no'}`}>
                  {t('Score:')} <strong>{readingScore}%</strong>
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {tab === 'writing' && (
        <div className="lab-card">
          <h3>{t('Writing Drill')}</h3>
          <p>{t('Type the requested word in Devanagari')}</p>
          <div className="lab-exercise">
            <div className="lab-exercise-bar">
              <span className="lab-counter">{writingIndex + 1} / {scopedWriting.length}</span>
              <button className="btn btn-sm btn-secondary" onClick={() => { setWritingIndex((i) => (i + 1) % scopedWriting.length); setWritingAnswer(''); setWritingResult(null) }}>
                {t('Skip →')}
              </button>
            </div>
            <div className="lab-phrase-box">
              <p className="lab-prompt">{scopedWriting[writingIndex].prompt}</p>
              <p className="lab-hint">{t('Hint')}: {scopedWriting[writingIndex].hint}</p>
            </div>
            <div className="lab-input-row">
              <textarea
                className="lab-textarea"
                value={writingAnswer}
                onChange={(e) => setWritingAnswer(e.target.value)}
                placeholder={t('Type in Devanagari…')}
              />
              <button className="btn btn-sm btn-secondary" onClick={() => toggleKeyboard({ current: document.querySelector('.lab-textarea') } as any)} title={t('Devanagari Keyboard')}>⌨️ देव</button>
            </div>
            <div className="lab-actions">
              <button className="btn btn-primary" onClick={checkWriting} disabled={!writingAnswer.trim()}>{t('Check')}</button>
              <button className="btn btn-sm btn-secondary" onClick={() => { setWritingAnswer(scopedWriting[writingIndex].correct); setWritingResult(null) }}>{t('Show Answer')}</button>
            </div>
            {writingResult !== null && (
              <p className={`lab-feedback ${writingResult ? 'ok' : 'no'}`}>
                {writingResult ? t('✓ Correct! Well done.') : t('✗ Not quite — try again.')}
              </p>
            )}
          </div>
        </div>
      )}

      {tab === 'report' && (
        <div className="lab-card">
          <h3>{t('Progress Report')}</h3>
          <div className="lab-report-score">
            <span className="lab-report-big">{overall}%</span>
            <span>{t('Overall Skill Average')}</span>
          </div>
          <div className="lab-report-rows">
            {Object.entries(stats).map(([key, s]) => (
              <div className="lab-report-row" key={key}>
                <span className="lab-report-label">{t(key === 'listening' ? '👂 Listening' : key === 'speaking' ? '🗣️ Speaking' : key === 'reading' ? '📖 Reading' : '✍️ Writing')}</span>
                <div className="lab-report-bar"><div style={{ width: `${s.attempts > 0 ? s.score : 0}%` }} /></div>
                <span className="lab-report-val">{s.attempts > 0 ? `${s.score}%` : '—'}</span>
              </div>
            ))}
          </div>
          <p className="lab-report-note">{t('Report is generated from your practice sessions — attempt each drill to build your report.')}</p>
          <button className="btn btn-sm btn-secondary" onClick={() => { setStats(emptyLabStats()); saveStats(emptyLabStats()) }}>{t('Reset Report')}</button>
        </div>
      )}
    </div>
  )
}
