import { useEffect, useMemo, useState } from "react";
import {
  Target,
  BookOpen,
  Volume2,
  Trophy,
  Sparkles,
  RotateCcw,
  Check,
  X
} from "lucide-react";
import { QUOTES } from "../../data/quotes";
import { loadQuotes } from "../../services/contentDb";
import { toIAST } from "../../services/sanskrit";
import { speakWithFallback } from "../../services/speech";
import { useLanguage } from "../../context/LanguageContext";
const NUM_Q = 10;
function makeQuiz(pool) {
  const p = [...pool].sort(() => Math.random() - 0.5);
  return p.slice(0, NUM_Q);
}
function makeOptions(q, speakers) {
  const others = speakers.filter((s) => s !== q.speaker).sort(() => Math.random() - 0.5).slice(0, 3);
  return [q.speaker, ...others].sort(() => Math.random() - 0.5);
}
function WhoSaidItPage() {
  const { t } = useLanguage();
  const [quotes, setQuotes] = useState(QUOTES);
  const [mode, setMode] = useState("quiz");
  const [quiz, setQuiz] = useState(() => makeQuiz(QUOTES));
  const [qi, setQi] = useState(0);
  const [options, setOptions] = useState([]);
  const [answered, setAnswered] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [cat, setCat] = useState("all");
  useEffect(() => {
    loadQuotes().then(setQuotes);
  }, []);
  const q = quiz[qi];
  const speakers = useMemo(() => [...new Set(quotes.map((qq) => qq.speaker))], [quotes]);
  const dayQ = useMemo(() => quotes[Math.floor(Date.now() / 864e5) % quotes.length], [quotes]);
  const start = (fresh = true) => {
    setQuiz(fresh ? makeQuiz(quotes) : quiz);
    setQi(0);
    setScore(0);
    setFinished(false);
    setAnswered(null);
    setOptions(makeOptions(quiz[0], speakers));
  };
  const pick = (s) => {
    if (answered) return;
    setAnswered(s);
    if (s === q.speaker) setScore((sc) => sc + 1);
    setTimeout(() => {
      if (qi + 1 >= quiz.length) {
        setFinished(true);
      } else {
        const ni = qi + 1;
        setQi(ni);
        setOptions(makeOptions(quiz[ni], speakers));
        setAnswered(null);
      }
    }, 1400);
  };
  const speak = (text) => speakWithFallback(text, (s) => setSpeaking(s));
  const cats = useMemo(() => ["all", ...new Set(quotes.map((qq) => qq.category))], [quotes]);
  const learnList = useMemo(
    () => cat === "all" ? quotes : quotes.filter((qq) => qq.category === cat),
    [cat, quotes]
  );
  return <div className="page-container">
      <div className="page-header">
        <h2>{t("Who Said It?")}</h2>
        <p>{t("Match famous Sanskrit verses to their speakers \u2014 from the G\u012Bt\u0101 to K\u0101lid\u0101sa.")}</p>
      </div>

      <div className="card" style={{ maxWidth: 760, margin: "0 auto", padding: 24 }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 16, alignItems: "center" }}>
          <button className={`btn btn-sm ${mode === "quiz" ? "btn-primary" : "btn-secondary"}`} onClick={() => setMode("quiz")} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <Target size={14} /> <span>{t("Quiz")}</span>
          </button>
          <button className={`btn btn-sm ${mode === "learn" ? "btn-primary" : "btn-secondary"}`} onClick={() => setMode("learn")} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <BookOpen size={14} /> <span>{t("Learn Quotes")}</span>
          </button>
          <span style={{ flex: 1 }} />
          {mode === "quiz" && <>
              <span className="badge">{t("Score")}: {score}/{finished ? quiz.length : qi + (answered !== null ? 1 : 0)}</span>
              <button className="btn btn-sm btn-secondary" onClick={() => start(true)} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                <RotateCcw size={13} /> <span>{t("New Quiz")}</span>
              </button>
            </>}
        </div>

        {mode === "quiz" && <>
            {!finished && q && <div>
                <div className="card" style={{ padding: 20, marginBottom: 16, textAlign: "center", background: "linear-gradient(135deg,#16213e,#1a1a3e)", color: "#fff" }}>
                  <p style={{ margin: 0, fontSize: 13, opacity: 0.7 }}>{t("Question")} {qi + 1} / {quiz.length}</p>
                  <p style={{ margin: "10px 0", fontSize: 24 }}>{q.sa}</p>
                  <p style={{ margin: 0, color: "#ffd54f", fontSize: 14, fontStyle: "italic" }}>{toIAST(q.sa)}</p>
                  <button className="btn btn-sm btn-secondary" style={{ marginTop: 12, display: "inline-flex", alignItems: "center", gap: 6 }} onClick={() => speak(q.sa)} disabled={speaking}>
                    <Volume2 size={14} /> <span>{t("Hear the quote")}</span>
                  </button>
                </div>
                <p style={{ fontWeight: 600, margin: "0 0 10px" }}>{t("Who said it?")}</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 10 }}>
                  {(answered ? options : options).map((opt) => {
    const isPick = answered === opt;
    const isCorrect = q.speaker === opt;
    let style = { margin: 0 };
    if (answered) {
      if (isCorrect) style = { ...style, border: "2px solid #2e7d32", background: "rgba(46,125,50,0.08)" };
      else if (isPick) style = { ...style, border: "2px solid #c62828", background: "rgba(198,40,40,0.08)" };
      else style = { ...style, opacity: 0.5 };
    }
    return <button key={opt} className="card" style={style} onClick={() => pick(opt)} disabled={!!answered}>
                        <strong>{opt}</strong>
                      </button>;
  })}
                </div>
                {answered && <p className="lab-feedback" style={{ color: answered === q.speaker ? "#2e7d32" : "#c62828", fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
                    {answered === q.speaker ? <><Check size={16} /> <span>{t("Correct!")}</span></> : <><X size={16} /> <span>{t("It was")} {q.speaker}</span></>}
                    <span style={{ display: "block", color: "var(--vt-muted)", fontWeight: 400, marginLeft: 8 }}>{q.source}</span>
                  </p>}
              </div>}
            {finished && <div className="card" style={{ padding: 32, textAlign: "center" }}>
                <div style={{ display: "inline-flex", justifyContent: "center", marginBottom: 12 }}>
                  <Trophy size={48} color={score >= 8 ? "#f1c40f" : score >= 5 ? "#2ecc71" : "var(--vt-orange)"} />
                </div>
                <h3>{t("Quiz complete!")}</h3>
                <p style={{ fontSize: 22 }}>{t("You scored")} <strong>{score} / {quiz.length}</strong></p>
                <p style={{ color: "var(--vt-muted)" }}>{score >= 8 ? t("\u015Aabda-j\xF1\u0101na at its best! You know the masters.") : score >= 5 ? t("Good! Revisit the Learn tab to meet the speakers.") : t("Keep reading \u2014 every verse teaches.")}</p>
                <button className="btn btn-primary" onClick={() => start(true)} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <RotateCcw size={15} /> <span>{t("Play Again")}</span>
                </button>
              </div>}
          </>}

        {mode === "learn" && <div>
            <div className="card" style={{ padding: 16, marginBottom: 16, border: "2px solid rgba(255,152,0,0.4)", background: "rgba(255,152,0,0.06)" }}>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "var(--vt-orange)", display: "flex", alignItems: "center", gap: 6 }}>
                <Sparkles size={14} /> <span>{t("Quote of the day")}</span>
              </p>
              <p style={{ margin: "8px 0 0", fontSize: 22 }}>{dayQ.sa}</p>
              <p style={{ margin: "4px 0 0", color: "var(--vt-muted)", fontStyle: "italic" }}>{dayQ.en}</p>
              <p style={{ margin: "4px 0 0", fontWeight: 600 }}>— {dayQ.speaker}, <span style={{ fontWeight: 400, color: "var(--vt-muted)" }}>{dayQ.source}</span></p>
              <button className="btn btn-sm btn-secondary" style={{ marginTop: 10, display: "inline-flex", alignItems: "center", gap: 6 }} onClick={() => speak(dayQ.sa)}>
                <Volume2 size={14} /> <span>{t("Hear it")}</span>
              </button>
            </div>

            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
              {cats.map((c) => <button key={c} className={`btn btn-sm ${cat === c ? "btn-primary" : "btn-secondary"}`} onClick={() => setCat(c)}>{c}</button>)}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {learnList.map((qq) => <div key={qq.id} className="card" style={{ margin: 0, padding: "12px 16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "flex-start" }}>
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: 0, fontSize: 19 }}>{qq.sa}</p>
                      <p style={{ margin: "4px 0 0", color: "var(--vt-muted)", fontSize: 13, fontStyle: "italic" }}>{qq.en}</p>
                      <p style={{ margin: "6px 0 0", fontWeight: 600 }}>— {qq.speaker} <span style={{ fontWeight: 400, color: "var(--vt-muted)" }}>· {qq.source}</span></p>
                    </div>
                    <button className="btn btn-sm btn-secondary" onClick={() => speak(qq.sa)}>
                      <Volume2 size={14} />
                    </button>
                  </div>
                </div>)}
            </div>
          </div>}
      </div>
    </div>;
}
export {
  WhoSaidItPage as default
};
