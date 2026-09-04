let recognition = null;
let callbacks = [];
let state = {
  isListening: false,
  isSupported: false,
  interimText: "",
  finalText: "",
  error: null
};
function getSpeechRecognition() {
  const w = window;
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
}
function isSpeechSupported() {
  return getSpeechRecognition() !== null;
}
function onSpeechResult(cb) {
  callbacks.push(cb);
  return () => {
    callbacks = callbacks.filter((c) => c !== cb);
  };
}
function getSpeechState() {
  return { ...state };
}
function notify(result) {
  callbacks.forEach((cb) => cb(result));
}
function startListening(lang = "sa-IN") {
  if (state.isListening) return;
  const SR = getSpeechRecognition();
  if (!SR) {
    state = { ...state, error: "Speech recognition not supported in this browser. Use Chrome." };
    return;
  }
  recognition = new SR();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = lang;
  recognition.onresult = (event) => {
    let interim = "";
    let final = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const r = event.results[i];
      if (r.isFinal) {
        final += r[0].transcript;
      } else {
        interim += r[0].transcript;
      }
    }
    state = {
      ...state,
      isListening: true,
      interimText: interim,
      finalText: state.finalText + final,
      error: null
    };
    if (final) {
      notify({ transcript: final, confidence: 0.8, isFinal: true });
    }
  };
  recognition.onerror = (event) => {
    state = { ...state, error: `Speech error: ${event.error}` };
    stopListening();
  };
  recognition.onend = () => {
    state = { ...state, isListening: false };
  };
  recognition.start();
  state = { ...state, isListening: true, error: null };
}
function stopListening() {
  if (recognition) {
    try {
      recognition.stop();
    } catch {
    }
    recognition = null;
  }
  state = { ...state, isListening: false };
}
function resetSpeech() {
  state = { isListening: false, isSupported: isSpeechSupported(), interimText: "", finalText: "", error: null };
}
let voices = [];
let voicesLoaded = false;
function loadVoices() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return [];
  const v = window.speechSynthesis.getVoices();
  if (v.length > 0) {
    voices = v;
    voicesLoaded = true;
  }
  return voices;
}
if (typeof window !== "undefined" && "speechSynthesis" in window) {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    loadVoices();
  };
}
function pickVoice() {
  if (!voicesLoaded) loadVoices();
  if (voices.length === 0) return null;
  const langs = ["sa", "hi", "bn", "mr", "ne"];
  const byLang = (prefix) => voices.find((v) => v.lang.toLowerCase().replace("_", "-").startsWith(prefix));
  for (const l of langs) {
    const v = byLang(l);
    if (v) return v;
  }
  const byName = voices.find((v) => /devanagari|hindi|sanskrit|indian/i.test(v.name));
  if (byName) return byName;
  return null;
}
let currentUtterance = null;
let ttsError = null;
function getTTSInfo() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return { supported: false, voiceCount: 0, voiceName: null, error: "Speech synthesis not supported" };
  }
  loadVoices();
  const voice = pickVoice();
  return { supported: true, voiceCount: voices.length, voiceName: voice ? voice.name : null, error: ttsError };
}
function speakText(text) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const synth = window.speechSynthesis;
  ttsError = null;
  try {
    synth.cancel();
  } catch {
  }
  try {
    synth.resume();
  } catch {
  }
  const makeUtterance = (withVoice) => {
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.8;
    u.pitch = 1;
    u.onerror = (e) => {
      ttsError = e?.error || "speech error";
    };
    if (withVoice) {
      const voice = pickVoice();
      if (voice) {
        u.voice = voice;
        u.lang = voice.lang;
      } else {
        u.lang = "hi-IN";
      }
    } else {
      u.lang = "hi-IN";
    }
    return u;
  };
  const attempt = (withVoice) => {
    const u = makeUtterance(withVoice);
    currentUtterance = u;
    let started = false;
    u.onstart = () => {
      started = true;
    };
    synth.speak(u);
    setTimeout(() => {
      if (!started && !synth.speaking && !synth.pending) {
        try {
          synth.cancel();
        } catch {
        }
        if (withVoice) {
          attempt(false);
        } else if (typeof window !== "undefined" && "speechSynthesis" in window) {
          window.speechSynthesis.speak(makeUtterance(false));
        }
      }
    }, 900);
  };
  attempt(true);
}
function hasTTS() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
  loadVoices();
  return voices.length > 0;
}
function getCurrentUtterance() {
  return currentUtterance;
}
const PROXY_TTS_URL = (text) => "/api/tts?q=" + encodeURIComponent(text.slice(0, 200));
const STREAM_ELEMENTS_URL = (text) => "https://api.streamelements.com/kappa/v2/speech?voice=hi-IN&text=" + encodeURIComponent(text.slice(0, 200));
const GOOGLE_TTS_URL = (text) => "https://translate.google.com/translate_tts?ie=UTF-8&tl=hi&client=tw-ob&q=" + encodeURIComponent(text.slice(0, 200));
function speakWithFallback(text, onState) {
  const synth = typeof window !== "undefined" && "speechSynthesis" in window ? window.speechSynthesis : null;
  const voice = synth ? pickVoice() : null;
  let finished = false;
  let timers = [];
  let activeAudio = null;
  let browserStarted = false;
  const clearTimers = () => {
    timers.forEach((t) => window.clearTimeout(t));
    timers = [];
  };
  const done = (mode) => {
    if (finished) return;
    finished = true;
    clearTimers();
    activeAudio?.pause();
    activeAudio = null;
    onState?.(false, mode);
  };
  const playOnline = (urls) => {
    let idx = 0;
    let token = 0;
    const tryNext = () => {
      if (finished) return;
      if (idx >= urls.length) {
        done("none");
        return;
      }
      const myToken = ++token;
      const url = urls[idx++];
      const audio = new Audio(url);
      activeAudio = audio;
      const fail = () => {
        if (finished || myToken !== token) return;
        try {
          audio.pause();
          audio.src = "";
        } catch {
        }
        if (activeAudio === audio) activeAudio = null;
        tryNext();
      };
      audio.onerror = fail;
      audio.onended = () => {
        if (myToken === token && !finished) done("online");
      };
      timers.push(window.setTimeout(fail, 8e3));
      audio.play().catch(fail);
    };
    onState?.(true, "online");
    tryNext();
  };
  const fallback = () => {
    if (finished) return;
    playOnline([PROXY_TTS_URL(text), STREAM_ELEMENTS_URL(text), GOOGLE_TTS_URL(text)]);
  };
  if (!synth || !voice) {
    fallback();
  } else {
    try {
      synth.cancel();
    } catch {
    }
    try {
      synth.resume();
    } catch {
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.pitch = 1;
    utterance.voice = voice;
    utterance.lang = voice.lang;
    utterance.onstart = () => {
      browserStarted = true;
    };
    utterance.onend = () => {
      if (browserStarted) done("browser");
    };
    utterance.onerror = () => {
      if (!browserStarted && !finished) {
        try {
          synth.cancel();
        } catch {
        }
        fallback();
      } else {
        done("browser");
      }
    };
    onState?.(true, "browser");
    timers.push(window.setTimeout(() => synth.speak(utterance), 60));
    timers.push(window.setTimeout(() => {
      if (!browserStarted && !finished) {
        try {
          synth.cancel();
        } catch {
        }
        fallback();
      }
    }, 1500));
    timers.push(window.setTimeout(() => {
      if (!finished) {
        try {
          synth.cancel();
        } catch {
        }
        done("browser");
      }
    }, 4e4));
  }
  return () => {
    finished = true;
    clearTimers();
    try {
      synth?.cancel();
    } catch {
    }
    activeAudio?.pause();
  };
}
resetSpeech();
export {
  getCurrentUtterance,
  getSpeechState,
  getTTSInfo,
  hasTTS,
  isSpeechSupported,
  onSpeechResult,
  pickVoice,
  resetSpeech,
  speakText,
  speakWithFallback,
  startListening,
  stopListening
};
