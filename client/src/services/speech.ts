export interface SpeechRecognitionResult {
  transcript: string
  confidence: number
  isFinal: boolean
}

export interface SpeechRecognitionState {
  isListening: boolean
  isSupported: boolean
  interimText: string
  finalText: string
  error: string | null
}

type SpeechRecognitionCallback = (result: SpeechRecognitionResult) => void

let recognition: any = null
let callbacks: SpeechRecognitionCallback[] = []
let state: SpeechRecognitionState = {
  isListening: false,
  isSupported: false,
  interimText: '',
  finalText: '',
  error: null,
}

function getSpeechRecognition(): any {
  const w = window as any
  return w.SpeechRecognition || w.webkitSpeechRecognition || null
}

export function isSpeechSupported(): boolean {
  return getSpeechRecognition() !== null
}

export function onSpeechResult(cb: SpeechRecognitionCallback): () => void {
  callbacks.push(cb)
  return () => { callbacks = callbacks.filter((c) => c !== cb) }
}

export function getSpeechState(): SpeechRecognitionState {
  return { ...state }
}

function notify(result: SpeechRecognitionResult) {
  callbacks.forEach((cb) => cb(result))
}

export function startListening(lang = 'sa-IN'): void {
  if (state.isListening) return
  const SR = getSpeechRecognition()
  if (!SR) {
    state = { ...state, error: 'Speech recognition not supported in this browser. Use Chrome.' }
    return
  }

  recognition = new SR()
  recognition.continuous = true
  recognition.interimResults = true
  recognition.lang = lang

  recognition.onresult = (event: any) => {
    let interim = ''
    let final = ''
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const r = event.results[i]
      if (r.isFinal) {
        final += r[0].transcript
      } else {
        interim += r[0].transcript
      }
    }

    state = {
      ...state,
      isListening: true,
      interimText: interim,
      finalText: state.finalText + final,
      error: null,
    }

    if (final) {
      notify({ transcript: final, confidence: 0.8, isFinal: true })
    }
  }

  recognition.onerror = (event: any) => {
    state = { ...state, error: `Speech error: ${event.error}` }
    stopListening()
  }

  recognition.onend = () => {
    state = { ...state, isListening: false }
  }

  recognition.start()
  state = { ...state, isListening: true, error: null }
}

export function stopListening(): void {
  if (recognition) {
    try { recognition.stop() } catch {}
    recognition = null
  }
  state = { ...state, isListening: false }
}

export function resetSpeech(): void {
  state = { isListening: false, isSupported: isSpeechSupported(), interimText: '', finalText: '', error: null }
}

let voices: SpeechSynthesisVoice[] = []
let voicesLoaded = false

function loadVoices(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return []
  const v = window.speechSynthesis.getVoices()
  if (v.length > 0) {
    voices = v
    voicesLoaded = true
  }
  return voices
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  loadVoices()
  window.speechSynthesis.onvoiceschanged = () => { loadVoices() }
}

export function pickVoice(): SpeechSynthesisVoice | null {
  if (!voicesLoaded) loadVoices()
  if (voices.length === 0) return null
  const langs = ['sa', 'hi', 'bn', 'mr', 'ne']
  const byLang = (prefix: string) => voices.find((v) => v.lang.toLowerCase().replace('_', '-').startsWith(prefix))
  for (const l of langs) {
    const v = byLang(l)
    if (v) return v
  }
  const byName = voices.find((v) => /devanagari|hindi|sanskrit|indian/i.test(v.name))
  if (byName) return byName
  return null
}

let currentUtterance: SpeechSynthesisUtterance | null = null
let ttsError: string | null = null

export function getTTSInfo(): { supported: boolean; voiceCount: number; voiceName: string | null; error: string | null } {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return { supported: false, voiceCount: 0, voiceName: null, error: 'Speech synthesis not supported' }
  }
  loadVoices()
  const voice = pickVoice()
  return { supported: true, voiceCount: voices.length, voiceName: voice ? voice.name : null, error: ttsError }
}

export function speakText(text: string): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  const synth = window.speechSynthesis
  ttsError = null
  try { synth.cancel() } catch { /* ignore */ }
  try { synth.resume() } catch { /* ignore */ }

  const makeUtterance = (withVoice: boolean): SpeechSynthesisUtterance => {
    const u = new SpeechSynthesisUtterance(text)
    u.rate = 0.8
    u.pitch = 1
    u.onerror = (e: any) => {
      ttsError = e?.error || 'speech error'
    }
    if (withVoice) {
      const voice = pickVoice()
      if (voice) {
        u.voice = voice
        u.lang = voice.lang
      } else {
        u.lang = 'hi-IN'
      }
    } else {
      u.lang = 'hi-IN'
    }
    return u
  }

  const attempt = (withVoice: boolean) => {
    const u = makeUtterance(withVoice)
    currentUtterance = u
    let started = false
    u.onstart = () => { started = true }
    synth.speak(u)
    setTimeout(() => {
      if (!started && !synth.speaking && !synth.pending) {
        try { synth.cancel() } catch { /* ignore */ }
        if (withVoice) {
          attempt(false)
        } else if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
          window.speechSynthesis.speak(makeUtterance(false))
        }
      }
    }, 900)
  }

  attempt(true)
}

export function hasTTS(): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false
  loadVoices()
  return voices.length > 0
}

export function getCurrentUtterance(): SpeechSynthesisUtterance | null {
  return currentUtterance
}

export type SpeakMode = 'browser' | 'online' | 'online2' | 'none'

const PROXY_TTS_URL = (text: string) =>
  '/api/tts?q=' + encodeURIComponent(text.slice(0, 200))
const STREAM_ELEMENTS_URL = (text: string) =>
  'https://api.streamelements.com/kappa/v2/speech?voice=hi-IN&text=' + encodeURIComponent(text.slice(0, 200))
const GOOGLE_TTS_URL = (text: string) =>
  'https://translate.google.com/translate_tts?ie=UTF-8&tl=hi&client=tw-ob&q=' + encodeURIComponent(text.slice(0, 200))

export function speakWithFallback(
  text: string,
  onState?: (speaking: boolean, mode: SpeakMode) => void,
): () => void {
  const synth = typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis : null
  const voice = synth ? pickVoice() : null
  let finished = false
  let timers: number[] = []
  let activeAudio: HTMLAudioElement | null = null
  let browserStarted = false

  const clearTimers = () => {
    timers.forEach((t) => window.clearTimeout(t))
    timers = []
  }
  const done = (mode: SpeakMode) => {
    if (finished) return
    finished = true
    clearTimers()
    activeAudio?.pause()
    activeAudio = null
    onState?.(false, mode)
  }
  const playOnline = (urls: string[]) => {
    let idx = 0
    let token = 0
    const tryNext = () => {
      if (finished) return
      if (idx >= urls.length) { done('none'); return }
      const myToken = ++token
      const url = urls[idx++]
      const audio = new Audio(url)
      activeAudio = audio
      const fail = () => {
        if (finished || myToken !== token) return
        try { audio.pause(); audio.src = '' } catch { /* ignore */ }
        if (activeAudio === audio) activeAudio = null
        tryNext()
      }
      audio.onerror = fail
      audio.onended = () => { if (myToken === token && !finished) done('online') }
      timers.push(window.setTimeout(fail, 8000))
      audio.play().catch(fail)
    }
    onState?.(true, 'online')
    tryNext()
  }

  const fallback = () => {
    if (finished) return
    playOnline([PROXY_TTS_URL(text), STREAM_ELEMENTS_URL(text), GOOGLE_TTS_URL(text)])
  }

  if (!synth || !voice) {
    fallback()
  } else {
    try { synth.cancel() } catch { /* ignore */ }
    try { synth.resume() } catch { /* ignore */ }

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.8
    utterance.pitch = 1
    utterance.voice = voice
    utterance.lang = voice.lang
    utterance.onstart = () => { browserStarted = true }
    utterance.onend = () => { if (browserStarted) done('browser') }
    utterance.onerror = () => {
      if (!browserStarted && !finished) {
        try { synth.cancel() } catch { /* ignore */ }
        fallback()
      } else {
        done('browser')
      }
    }

    onState?.(true, 'browser')
    timers.push(window.setTimeout(() => synth.speak(utterance), 60))
    timers.push(window.setTimeout(() => {
      if (!browserStarted && !finished) {
        try { synth.cancel() } catch { /* ignore */ }
        fallback()
      }
    }, 1500))
    timers.push(window.setTimeout(() => {
      if (!finished) {
        try { synth.cancel() } catch { /* ignore */ }
        done('browser')
      }
    }, 40000))
  }

  return () => {
    finished = true
    clearTimers()
    try { synth?.cancel() } catch { /* ignore */ }
    activeAudio?.pause()
  }
}

resetSpeech()
