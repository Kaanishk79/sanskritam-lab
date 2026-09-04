import { useEffect, useMemo, useState } from "react";
import { Check, X, RotateCcw, ArrowRight, BookOpen } from "lucide-react";
import { SENTENCES } from "../../data/sentenceBuilder";
import { loadSentences } from "../../services/contentDb";
import { toDevanagari } from "../../services/sanskrit";
import { useLanguage } from "../../context/LanguageContext";
const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const LEVELS = [
  { id: "easy", label: "Easy", color: "#2ecc71" },
  { id: "medium", label: "Medium", color: "#f39c12" },
  { id: "hard", label: "Hard", color: "#e74c3c" }
];
function SentenceBuilderPage() {
  const { t } = useLanguage();
  const [sentences, setSentences] = useState(SENTENCES);
  const [level, setLevel] = useState("all");
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState([]);
  const [checking, setChecking] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [iastMode, setIastMode] = useState(false);
  const [deck, setDeck] = useState([]);
  useEffect(() => {
    loadSentences().then(setSentences);
  }, []);
  const pool = useMemo(
    () => sentences.filter((s) => level === "all" || s.level === level),
    [sentences, level]
  );
  const sentence = pool[idx % pool.length];
  const target = sentence.words.map((w) => w.sa).join(" ");
  useEffect(() => {
    setDeck(shuffle(sentence.words.map((w) => w.sa)));
    setPicked([]);
    setChecking(false);
    setDone(false);
  }, [sentence.id]);
  const next = (move) => {
    setIdx((idx + move + pool.length) % pool.length);
  };
  const tap = (w) => {
    if (done || checking) return;
    const remaining = deck.filter((d) => picked.filter((p) => p === d).length < deck.filter((dd) => dd === d).length);
    if (!remaining.includes(w)) return;
    setPicked((p) => [...p, w]);
  };
  const remove = (i) => {
    setPicked((p) => p.filter((_, j) => j !== i));
  };
  const check = () => {
    setChecking(true);
    const ok = picked.join(" ") === target;
    if (ok) setScore((s) => s + 1);
    setDone(true);
  };
  const resetAll = () => {
    setScore(0);
    setIdx(0);
    setLevel("all");
    setDeck(shuffle((sentences[0]?.words ?? []).map((w) => w.sa)));
    setPicked([]);
    setChecking(false);
    setDone(false);
  };
  return <div className="page-container">
      <div className="page-header">
        <h2>{t("Sentence Builder")}</h2>
        <p>{t("Tap the word cards in the right order to build the Sanskrit sentence. Learn word order through play.")}</p>
      </div>

      <div className="card" style={{ maxWidth: 760, margin: "0 auto", padding: 24 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16, alignItems: "center" }}>
          <button className={`btn btn-sm ${level === "all" ? "btn-primary" : "btn-secondary"}`} onClick={() => {
    setLevel("all");
    resetAll();
  }}>{t("All")}</button>
          {LEVELS.map((l) => <button
    key={l.id}
    className={`btn btn-sm ${level === l.id ? "btn-primary" : "btn-secondary"}`}
    onClick={() => {
      setLevel(l.id);
      resetAll();
    }}
    style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
  >
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: l.color }} />
              <span>{t(l.label)}</span>
            </button>)}
          <span style={{ flex: 1 }} />
          <button className="btn btn-sm btn-secondary" onClick={() => setIastMode((m) => !m)}>
            {iastMode ? "\u0926\u0947\u0935\u0928\u093E\u0917\u0930\u0940" : "IAST"}
          </button>
          <span className="badge" style={{ background: "rgba(255,152,0,0.15)", color: "var(--vt-orange)" }}>{t("Score")}: {score}/{pool.length}</span>
        </div>

        {done && <div className="card" style={{ padding: 16, marginBottom: 16, border: picked.join(" ") === target ? "2px solid #2e7d32" : "2px solid #c62828" }}>
            <p style={{ margin: 0, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
              {picked.join(" ") === target ? <><Check size={18} color="#2e7d32" /> <span>{t("Correct! The sentence was:")}</span></> : <><X size={18} color="#c62828" /> <span>{t("Not quite \u2014 the sentence is:")}</span></>}
            </p>
            <p style={{ fontSize: 22, margin: "8px 0 0" }}>{sentence.sa}</p>
            <p style={{ margin: 0, color: "var(--vt-muted)" }}>{iastMode ? sentence.iast : toDevanagari(sentence.iast)} — {t(sentence.en)}</p>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button className="btn btn-sm btn-primary" onClick={() => next(1)} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                <span>{t("Next")}</span> <ArrowRight size={14} />
              </button>
              <button className="btn btn-sm btn-secondary" onClick={() => {
    setPicked([]);
    setDone(false);
    setChecking(false);
  }}>
                <RotateCcw size={14} /> <span>{t("Try Again")}</span>
              </button>
            </div>
          </div>}

        <div className="card" style={{ padding: 20, textAlign: "center", background: "linear-gradient(135deg,#16213e,#1a1a3e)", color: "#fff" }}>
          <p style={{ margin: 0, fontSize: 13, opacity: 0.8 }}>{t("Build this sentence")} — {t(sentence.en)}</p>
          <p style={{ margin: "8px 0 0", fontSize: 15, opacity: 0.75 }}>{iastMode ? sentence.iast : sentence.sa.split(" ").map(() => "\u2014").join(" ")}</p>
        </div>

        <div style={{ minHeight: 56, border: "2px dashed var(--vt-border)", borderRadius: 10, padding: 10, marginTop: 14, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "flex-start" }}>
          {picked.length === 0 && <span style={{ color: "var(--vt-muted)" }}>{t("Your sentence appears here\u2026")}</span>}
          {picked.map((w, i) => <button key={w + i} className="btn btn-sm btn-primary" onClick={() => remove(i)} title={t("Tap to remove")} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <span>{w}</span> <X size={12} />
            </button>)}
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
          {deck.filter((w) => picked.filter((p) => p === w).length < deck.filter((d) => d === w).length).map((word, i) => <button key={word + "-" + i} className="btn btn-secondary" onClick={() => tap(word)} style={{ fontSize: 18, padding: "10px 16px" }}>
                {word}
              </button>)}
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 18, alignItems: "center", flexWrap: "wrap" }}>
          <button className="btn btn-primary" onClick={check} disabled={picked.length !== sentence.words.length || done}>
            <Check size={15} /> <span>{t("Check Sentence")}</span>
          </button>
          <button className="btn btn-sm btn-secondary" onClick={() => next(1)}>
            <span>{t("Skip")}</span> <ArrowRight size={14} />
          </button>
          <button className="btn btn-sm btn-secondary" onClick={resetAll}>
            <RotateCcw size={14} /> <span>{t("Restart")}</span>
          </button>
          <span style={{ flex: 1 }} />
          <span className="badge">{t("Word order matters \u2014 verbs come last in Sanskrit!")}</span>
        </div>

        <div style={{ marginTop: 20 }}>
          <h4 style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <BookOpen size={16} /> <span>{t("Word bank for this sentence")}</span>
          </h4>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 8 }}>
            {sentence.words.map((w) => <div key={w.sa} className="card" style={{ padding: "8px 12px", margin: 0 }}>
                <strong>{w.sa}</strong>
                <div style={{ fontSize: 13, color: "var(--vt-muted)" }}>{w.en}</div>
              </div>)}
          </div>
        </div>
      </div>
    </div>;
}
export {
  SentenceBuilderPage as default
};
