import { useEffect, useRef, useState } from "react";
import {
  Mic,
  Square,
  Volume2,
  VolumeX,
  Bot,
  MessageSquare,
  History
} from "lucide-react";
import { startListening, stopListening, isSpeechSupported, onSpeechResult, speakWithFallback, hasTTS } from "../../services/speech";
import { toIAST } from "../../services/sanskrit";
import { api } from "../../services/api";
import { useLanguage } from "../../context/LanguageContext";
const EN_MAP = {
  namaste: "\u0928\u092E\u0938\u094D\u0924\u0947",
  hello: "\u0928\u092E\u0938\u094D\u0924\u0947",
  hi: "\u0928\u092E\u0938\u094D\u0924\u0947",
  water: "\u091C\u0932",
  teacher: "\u0917\u0941\u0930\u0941",
  knowledge: "\u0935\u093F\u0926\u094D\u092F\u093E",
  peace: "\u0936\u093E\u0928\u094D\u0924\u093F",
  book: "\u092A\u0941\u0938\u094D\u0924\u0915",
  sun: "\u0938\u0942\u0930\u094D\u092F",
  moon: "\u091A\u0928\u094D\u0926\u094D\u0930",
  love: "\u092A\u094D\u0930\u0947\u092E",
  truth: "\u0938\u0924\u094D\u092F",
  home: "\u0917\u0943\u0939",
  friend: "\u092E\u093F\u0924\u094D\u0930",
  god: "\u0926\u0947\u0935",
  mother: "\u092E\u093E\u0924\u093E",
  father: "\u092A\u093F\u0924\u093E",
  language: "\u092D\u093E\u0937\u093E",
  word: "\u0936\u092C\u094D\u0926",
  heart: "\u0939\u0943\u0926\u092F",
  sky: "\u0906\u0915\u093E\u0936",
  earth: "\u092D\u0942\u092E\u093F",
  fire: "\u0905\u0917\u094D\u0928\u093F",
  wind: "\u0935\u093E\u092F\u0941",
  king: "\u0930\u093E\u091C\u093E",
  child: "\u092C\u093E\u0932\u0915",
  eye: "\u0928\u0947\u0924\u094D\u0930",
  hand: "\u0939\u0938\u094D\u0924",
  time: "\u0915\u093E\u0932",
  death: "\u092E\u0943\u0924\u094D\u092F\u0941"
};
const SAMPLES = [
  "\u0928\u092E\u0938\u094D\u0924\u0947",
  "\u091C\u0932",
  "\u0935\u093F\u0926\u094D\u092F\u093E",
  "\u0917\u0941\u0930\u0941",
  "\u0936\u093E\u0928\u094D\u0924\u093F",
  "\u0938\u0924\u094D\u092F"
];
const POS_HI = {
  noun: "\u0938\u0902\u091C\u094D\u091E\u093E",
  verb: "\u0915\u094D\u0930\u093F\u092F\u093E",
  adjective: "\u0935\u093F\u0936\u0947\u0937\u0923",
  adverb: "\u0915\u094D\u0930\u093F\u092F\u093E\u0935\u093F\u0936\u0947\u0937\u0923",
  pronoun: "\u0938\u0930\u094D\u0935\u0928\u093E\u092E",
  particle: "\u0905\u0935\u094D\u092F\u092F",
  indeclinable: "\u0905\u0935\u094D\u092F\u092F",
  interjection: "\u0935\u093F\u0938\u094D\u092E\u092F\u093E\u0926\u093F\u092C\u094B\u0927\u0915",
  root_verb: "\u0927\u093E\u0924\u0941",
  prefix: "\u0909\u092A\u0938\u0930\u094D\u0917",
  suffix: "\u092A\u094D\u0930\u0924\u094D\u092F\u092F",
  symbol: "\u0938\u0902\u0915\u0947\u0924",
  numeral: "\u0938\u0902\u0916\u094D\u092F\u093E\u0935\u093E\u091A\u0940"
};
function tokens(text) {
  return text.replace(/[।॥\.,!?;:"'“”‘’()\-—\u200c\u200d]+/g, " ").split(/\s+/).map((t) => t.trim()).filter(Boolean);
}
const stripEnding = (w) => w.length > 1 ? w.replace(/[ाःाीूेैोौंँ]$/, "") : w;
function VoiceModePage() {
  const { t, lang: uiLang } = useLanguage();
  const hi = uiLang === "hi";
  const [supported] = useState(isSpeechSupported);
  const [hasVoice] = useState(hasTTS);
  const [listening, setListening] = useState(false);
  const [interim, setInterim] = useState("");
  const [lang, setLang] = useState("hi-IN");
  const [muted, setMuted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [lastHeard, setLastHeard] = useState("");
  const [entries, setEntries] = useState([]);
  const [suggestions, setSuggestionsState] = useState([]);
  const [reply, setReply] = useState("");
  const [history, setHistory] = useState([]);
  const [aiActive, setAiActive] = useState(false);
  const bufferRef = useRef("");
  useEffect(() => {
    const unsub = onSpeechResult((r) => {
      bufferRef.current += r.transcript + " ";
      setInterim(r.transcript);
      setListening(true);
      if (r.isFinal) {
        const phrase = bufferRef.current.trim();
        bufferRef.current = "";
        processPhrase(phrase);
      }
    });
    return unsub;
  }, [lang, muted]);
  const toggleMic = () => {
    if (listening) {
      stopListening();
      setListening(false);
      if (bufferRef.current.trim()) processPhrase(bufferRef.current.trim());
      bufferRef.current = "";
      return;
    }
    bufferRef.current = "";
    setInterim("");
    startListening(lang);
    setListening(true);
  };
  const lookup = async (word) => {
    const dev = /[\u0900-\u097F]/.test(word) ? word : EN_MAP[word.toLowerCase()] || null;
    const candidates = dev ? [dev, stripEnding(dev)] : [];
    for (const c of candidates) {
      try {
        const res = await api.dictionary.lookup(c);
        if (res) {
          return {
            word: res.word,
            meanings: res.meanings || [],
            meanings_hi: res.meanings_hi || [],
            iast: res.iast || toIAST(res.word),
            pos: res.pos,
            suggestions: []
          };
        }
      } catch {
      }
    }
    return null;
  };
  const askAi = async (phrase) => {
    try {
      const res = await api.tutor.chat([
        { role: "user", content: `User spoke this in Sanskrit/Hindi: "${phrase}". Reply in 1-2 concise Sanskrit or Hindi sentences with meaning. Keep it conversational.` }
      ]);
      return res.reply || null;
    } catch {
      return null;
    }
  };
  const processPhrase = async (raw) => {
    if (!raw.trim()) return;
    setBusy(true);
    setLastHeard(raw);
    setListening(false);
    stopListening();
    const words = tokens(raw);
    const hits = [];
    const suggs = [];
    for (const w of words.slice(0, 4)) {
      const hit = await lookup(w);
      if (hit?.word) hits.push(hit);
      else if (hit?.suggestions?.length) suggs.push(hit);
    }
    setEntries(hits);
    setSuggestionsState(suggs);
    let spokenReply = "";
    const aiAnswer = await askAi(raw);
    if (aiAnswer) {
      spokenReply = aiAnswer;
      setAiActive(true);
    } else if (hits.length > 0) {
      setAiActive(false);
      const first = hits[0];
      const meaning = (hi && first.meanings_hi?.length ? first.meanings_hi[0] : first.meanings[0]) || "";
      spokenReply = `${first.word} \u2014 ${meaning}`;
    } else {
      setAiActive(false);
      spokenReply = hi ? `\u0938\u0941\u0928\u093E: ${raw}\u0964 \u0936\u092C\u094D\u0926\u0915\u094B\u0936 \u092E\u0947\u0902 \u0928\u0939\u0940\u0902 \u092E\u093F\u0932\u093E\u0964` : `Heard: ${raw}. Not found in local dictionary.`;
    }
    setReply(spokenReply);
    setBusy(false);
    if (!muted && spokenReply) {
      speak(spokenReply);
    }
    setHistory((h) => [{ heard: raw, reply: spokenReply, entries: hits, at: Date.now() }, ...h.slice(0, 9)]);
  };
  const speak = (text) => {
    speakWithFallback(text);
  };
  const stopSpeaking = () => {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  };
  const handleSample = (s) => {
    processPhrase(s);
  };
  return <div className="page-container">
      <div className="page-header">
        <h2>{t("Voice Mode")}</h2>
        <p>{t("Speak in Sanskrit or Hindi \u2014 hear the word, its meaning, and a spoken reply. Works fully offline, and uses the AI tutor when it is connected.")}</p>
      </div>

      <div className="card" style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", padding: 32 }}>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", alignItems: "center", flexWrap: "wrap", marginBottom: 16 }}>
          <select
            className="btn btn-sm btn-secondary"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            style={{ height: 36 }}
          >
            <option value="hi-IN">हिन्दी / संस्कृत</option>
            <option value="en-IN">English (namaste → नमस्ते)</option>
          </select>
        </div>

        {!supported && <p className="badge" style={{ background: "var(--vt-orange)", color: "white", padding: "8px 14px" }}>
            {t("Speech recognition needs Chrome/Edge with a microphone. You can still type below.")}
          </p>}

        <button
    onClick={toggleMic}
    className="btn"
    style={{
      width: 120,
      height: 120,
      borderRadius: 60,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      background: listening ? "var(--vt-orange)" : "var(--vt-primary)",
      color: "#fff",
      border: "none",
      boxShadow: listening ? "0 0 0 12px rgba(255,152,0,0.25)" : "var(--vt-shadow)",
      transition: "all .2s",
      cursor: "pointer",
      margin: "0 auto"
    }}
    title={listening ? t("Stop listening") : t("Start listening")}
  >
          {listening ? <Square size={40} /> : <Mic size={40} />}
        </button>
        <p style={{ marginTop: 12, fontWeight: 600 }}>
          {listening ? t("Listening\u2026 speak now") : t("Tap the mic and speak")}
        </p>
        {interim && <p style={{ color: "var(--vt-muted)", fontStyle: "italic" }}>“{interim}”</p>}
        {!supported && <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 12 }}>
            <input
    style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid var(--vt-border)", width: 260 }}
    placeholder={t("Type a word (e.g. \u091C\u0932)\u2026")}
    onKeyDown={(e) => {
      if (e.key === "Enter" && e.target.value.trim()) {
        processPhrase(e.target.value);
        e.target.value = "";
      }
    }}
  />
            <button className="btn btn-primary" onClick={() => {
    const inp = document.querySelector("input[placeholder]");
    if (inp?.value.trim()) processPhrase(inp.value);
  }}>{t("Look up")}</button>
          </div>}

        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginTop: 16 }}>
          {SAMPLES.map((s) => <button key={s} className="btn btn-sm btn-secondary" onClick={() => processPhrase(s)}>{s}</button>)}
        </div>

        {busy && <p style={{ color: "var(--vt-muted)" }}>{t("Thinking\u2026")}</p>}

        {lastHeard && <div style={{ marginTop: 20, textAlign: "left" }}>
            <p><strong>{t("You said:")}</strong> <span style={{ fontSize: 18 }}>{lastHeard}</span></p>
            {entries.length > 0 && <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 10 }}>
                {entries.map((e) => <div key={e.word} style={{ border: "1px solid var(--vt-border)", borderRadius: 10, padding: "12px 16px", background: "rgba(255,255,255,0.03)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                      <div>
                        <span style={{ fontSize: 22, fontWeight: 700 }}>{e.word}</span>
                        {e.iast && <span style={{ color: "var(--vt-muted)", marginLeft: 8 }}>{e.iast}</span>}
                        {e.pos && <span className="badge" style={{ marginLeft: 8 }}>{hi ? POS_HI[e.pos] || e.pos : e.pos}</span>}
                      </div>
                      <button className="btn btn-sm btn-secondary" onClick={() => speak(e.word)} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                        <Volume2 size={13} /> <span>{t("Hear")}</span>
                      </button>
                    </div>
                    <p style={{ margin: "6px 0 0", color: "var(--vt-muted)" }}>{(hi && e.meanings_hi?.length ? e.meanings_hi : e.meanings).join(" \xB7 ")}</p>
                  </div>)}
              </div>}
            {suggestions.length > 0 && <div style={{ marginTop: 10 }}>
                <p style={{ fontWeight: 600 }}>{t("Did you mean?")}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {suggestions[0].suggestions.map((s) => <div key={s.title} style={{ border: "1px dashed var(--vt-border)", borderRadius: 8, padding: "8px 12px" }}>
                      <strong>{s.title}</strong> <span style={{ color: "var(--vt-muted)" }}>— {s.sub}</span>
                    </div>)}
                </div>
              </div>}
            {reply && <div style={{ marginTop: 14, padding: "12px 16px", borderRadius: 10, background: "rgba(255,152,0,0.08)", border: "1px solid rgba(255,152,0,0.3)", display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", marginTop: 2 }}>
                  {aiActive ? <Bot size={20} color="var(--vt-orange)" /> : <MessageSquare size={20} color="var(--vt-gold)" />}
                </span>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0 }}>{reply}</p>
                  <p style={{ margin: "6px 0 0", fontSize: 12, color: "var(--vt-muted)" }}>
                    {aiActive ? t("AI tutor reply") : t("Offline reply \u2014 AI tutor will answer when connected")}
                  </p>
                </div>
                <button className="btn btn-sm btn-secondary" onClick={() => speak(reply)}>
                  <Volume2 size={14} />
                </button>
              </div>}
          </div>}

        {history.length > 0 && <div style={{ marginTop: 24, textAlign: "left" }}>
            <h4 style={{ marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
              <History size={16} /> <span>{t("Conversation History")}</span>
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {history.slice(1).map((h, i) => <div key={h.at + "-" + i} style={{ border: "1px solid var(--vt-border)", borderRadius: 8, padding: "10px 14px" }}>
                  <p style={{ margin: 0, fontWeight: 600 }}>“{h.heard}”</p>
                  <p style={{ margin: "4px 0 0", color: "var(--vt-muted)", fontSize: 14 }}>
                    {h.entries.length > 0 ? h.entries.map((e) => `${e.word} \u2014 ${hi ? e.meanings_hi?.[0] || e.meanings[0] : e.meanings[0] || ""}`).join(" \xB7 ") : h.reply}
                  </p>
                </div>)}
            </div>
          </div>}

        {!hasVoice && <p className="badge" style={{ marginTop: 16, background: "var(--vt-border)", color: "var(--vt-muted)" }}>
            {t("No offline voice installed \u2014 online voices will be used when available.")}
          </p>}
      </div>
    </div>;
}
export {
  VoiceModePage as default
};
