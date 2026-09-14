import { useEffect, useState } from "react";
import { History, RotateCcw, Check, X, ArrowRight, Trophy } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { supabase } from "../../services/supabase";
import { getAuthState } from "../../services/auth";
const sampleQuestions = [
  {
    prompt: "What is the correct form of \u0930\u093E\u092E (Rama) in instrumental singular?",
    promptHi: "\u0930\u093E\u092E \u0915\u093E \u0924\u0943\u0924\u0940\u092F\u093E \u090F\u0915\u0935\u091A\u0928 (\u0915\u0930\u0923) \u0915\u094C\u0928 \u0938\u093E \u0938\u0939\u0940 \u0930\u0942\u092A \u0939\u0948?",
    options: ["\u0930\u093E\u092E\u0947\u0923", "\u0930\u093E\u092E\u093E\u092F", "\u0930\u093E\u092E\u093E\u0924\u094D", "\u0930\u093E\u092E\u0938\u094D\u092F"],
    optionsHi: ["\u0930\u093E\u092E\u0947\u0923", "\u0930\u093E\u092E\u093E\u092F", "\u0930\u093E\u092E\u093E\u0924\u094D", "\u0930\u093E\u092E\u0938\u094D\u092F"],
    correctIdx: 0,
    explanation: "Instrumental singular of \u0930\u093E\u092E is \u0930\u093E\u092E\u0947\u0923 (r\u0101me\u1E47a).",
    explanationHi: "\u0930\u093E\u092E \u0915\u093E \u0924\u0943\u0924\u0940\u092F\u093E \u090F\u0915\u0935\u091A\u0928 \u0930\u093E\u092E\u0947\u0923 \u0939\u0948\u0964"
  },
  {
    prompt: "Which sandhi rule applies to \u0905\u0917\u094D\u0928\u093F + \u0907\u0935 (yielding \u0905\u0917\u094D\u0928\u0940\u0935)?",
    promptHi: "\u0905\u0917\u094D\u0928\u093F + \u0907\u0935 (\u0905\u0917\u094D\u0928\u0940\u0935) \u092E\u0947\u0902 \u0915\u094C\u0928 \u0938\u093E \u0938\u0902\u0927\u093F \u0928\u093F\u092F\u092E \u0932\u093E\u0917\u0942 \u0939\u094B\u0924\u093E \u0939\u0948?",
    options: ["\u0938\u0935\u0930\u094D\u0923\u0926\u0940\u0930\u094D\u0918\u0903 (i + i \u2192 \u012B)", "\u0917\u0941\u0923\u0903 (a + i \u2192 e)", "\u0935\u0943\u0926\u094D\u0927\u093F\u0903 (a + e \u2192 ai)", "\u092F\u0923\u094D (i + a \u2192 ya)"],
    optionsHi: ["\u0938\u0935\u0930\u094D\u0923\u0926\u0940\u0930\u094D\u0918\u0903 (\u0907 + \u0907 \u2192 \u0908)", "\u0917\u0941\u0923\u0903 (\u0905 + \u0907 \u2192 \u090F)", "\u0935\u0943\u0926\u094D\u0927\u093F\u0903 (\u0905 + \u090F \u2192 \u0910)", "\u092F\u0923\u094D (\u0907 + \u0905 \u2192 \u092F)"],
    correctIdx: 0,
    explanation: "\u0907 + \u0907 \u2192 \u0908 by \u0938\u0935\u0930\u094D\u0923\u0926\u0940\u0930\u094D\u0918 sandhi (P\u0101\u1E47ini 6.1.101 aka\u1E25 savar\u1E47e d\u012Brgha\u1E25): \u0905\u0917\u094D\u0928\u093F + \u0907\u0935 \u2192 \u0905\u0917\u094D\u0928\u0940\u0935.",
    explanationHi: "\u0938\u0935\u0930\u094D\u0923\u0926\u0940\u0930\u094D\u0918 \u0938\u0902\u0927\u093F \u0938\u0947 \u0907 + \u0907 \u2192 \u0908 (\u0905\u0915\u0903 \u0938\u0935\u0930\u094D\u0923\u0947 \u0926\u0940\u0930\u094D\u0918\u0903): \u0905\u0917\u094D\u0928\u093F + \u0907\u0935 \u2192 \u0905\u0917\u094D\u0928\u0940\u0935\u0964"
  },
  {
    prompt: "What is the dative singular of \u092B\u0932 (phala, neuter)?",
    promptHi: "\u092B\u0932 (\u0928\u092A\u0941\u0902\u0938\u0915) \u0915\u093E \u091A\u0924\u0941\u0930\u094D\u0925\u0940 \u090F\u0915\u0935\u091A\u0928 \u0915\u094D\u092F\u093E \u0939\u0948?",
    options: ["\u092B\u0932\u093E\u092F", "\u092B\u0932\u0947\u0928", "\u092B\u0932\u093E\u0924\u094D", "\u092B\u0932\u0938\u094D\u092F"],
    optionsHi: ["\u092B\u0932\u093E\u092F", "\u092B\u0932\u0947\u0928", "\u092B\u0932\u093E\u0924\u094D", "\u092B\u0932\u0938\u094D\u092F"],
    correctIdx: 0,
    explanation: "Dative singular of neuter \u092B\u0932 is \u092B\u0932\u093E\u092F (phal\u0101ya).",
    explanationHi: "\u0928\u092A\u0941\u0902\u0938\u0915 \u092B\u0932 \u0915\u093E \u091A\u0924\u0941\u0930\u094D\u0925\u0940 \u090F\u0915\u0935\u091A\u0928 \u092B\u0932\u093E\u092F \u0939\u0948\u0964"
  }
];
function AssessmentPage() {
  const { t, lang } = useLanguage();
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [attempts, setAttempts] = useState([]);
  const q = sampleQuestions[currentQ];
  const handleAnswer = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    setAnswers((prev) => [...prev, { selected: idx, correct: idx === q.correctIdx }]);
    if (idx === q.correctIdx) setScore((s) => s + 1);
  };
  const next = () => {
    if (currentQ < sampleQuestions.length - 1) {
      setCurrentQ((c) => c + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };
  useEffect(() => {
    const user = getAuthState().user;
    if (!user) return;
    let live = true;
    supabase.from("assessment_attempts").select("id, lesson_id, score, max_score, created_at").eq("user_id", user.id).order("created_at", { ascending: false }).limit(10).then(({ data, error }) => {
      if (live && !error && data && data.length > 0) setAttempts(data);
    }, () => void 0);
    return () => {
      live = false;
    };
  }, []);
  useEffect(() => {
    if (!finished) return;
    const user = getAuthState().user;
    if (!user) return;
    supabase.from("assessment_attempts").insert({ user_id: user.id, lesson_id: "sample-grammar-quiz", score, max_score: sampleQuestions.length, answers, time_spent_sec: 0 }).then(() => {
      const u = getAuthState().user;
      if (!u) return;
      return supabase.from("assessment_attempts").select("id, lesson_id, score, max_score, created_at").eq("user_id", u.id).order("created_at", { ascending: false }).limit(10).then(({ data, error }) => {
        if (!error && data && data.length > 0) setAttempts(data);
      }, () => void 0);
    }, () => void 0);
  }, [finished, score, answers]);
  const pastAttempts = attempts.length > 0 && <div className="card" style={{ marginTop: 16 }}>
      <h3 style={{ marginTop: 0, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
        <History size={18} /> <span>{t("Past attempts")}</span>
      </h3>
      <div className="text-list">
        {attempts.map((a) => <div key={a.id} className="text-item">
            <div>
              <div className="text-title">{a.lesson_id}</div>
              <div className="text-meta">
                {a.score}/{a.max_score} · {new Date(a.created_at).toLocaleDateString()}
              </div>
            </div>
          </div>)}
      </div>
    </div>;
  if (finished) {
    return <div className="page-container">
        <div className="page-header">
          <h2>{t("Assessment Engine")}</h2>
          <p>{t("Auto-generated drills for declensions, sandhi exercises, and timed practice quizzes")}</p>
        </div>
        <div className="card" style={{ textAlign: "center", padding: 40 }}>
          <div style={{ display: "inline-flex", justifyContent: "center", marginBottom: 12 }}>
            <Trophy size={48} color={score === sampleQuestions.length ? "#2ecc71" : "var(--vt-orange)"} />
          </div>
          <h3 style={{ fontSize: 24, marginBottom: 8 }}>{t("Assessment Complete!")}</h3>
          <div style={{ fontSize: 48, fontWeight: 700, color: "var(--sanskrit-gold)", margin: "16px 0" }}>
            {score}/{sampleQuestions.length}
          </div>
          <p style={{ color: "var(--vt-muted)" }}>
            {score === sampleQuestions.length ? t("Perfect score! Excellent Sanskrit knowledge!") : t("Review the explanations and try again.")}
          </p>
          <button
      className="btn btn-primary"
      style={{ marginTop: 20, display: "inline-flex", alignItems: "center", gap: 6 }}
      onClick={() => {
        setCurrentQ(0);
        setSelected(null);
        setScore(0);
        setFinished(false);
        setAnswers([]);
      }}
    >
            <RotateCcw size={14} /> <span>{t("Retry")}</span>
          </button>
        </div>
        {pastAttempts}
      </div>;
  }
  return <div className="page-container">
      <div className="page-header">
        <h2>{t("Assessment Engine")}</h2>
        <p>{t("Auto-generated drills for declensions, sandhi exercises, and timed practice quizzes")}</p>
      </div>

      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
          <span style={{ color: "var(--vt-muted)", fontSize: 13 }}>
            {t("Question")} {currentQ + 1} {t("of")} {sampleQuestions.length}
          </span>
          <span className="badge" style={{ background: "var(--sanskrit-card)", color: "var(--sanskrit-gold)" }}>
            {t("Score:")} {score}
          </span>
        </div>

        <h3 style={{ fontSize: 18, marginBottom: 20, lineHeight: 1.5 }}>{lang === "hi" && q.promptHi ? q.promptHi : q.prompt}</h3>

        <div style={{ marginBottom: 20 }}>
          {q.options.map((opt, idx) => <button
    key={idx}
    className={`assessment-option${selected !== null && idx === q.correctIdx ? " correct" : ""}${selected === idx && idx !== q.correctIdx ? " wrong" : ""}`}
    onClick={() => handleAnswer(idx)}
    disabled={selected !== null}
  >
              {lang === "hi" && q.optionsHi ? q.optionsHi[idx] : opt}
            </button>)}
        </div>

        {selected !== null && <div style={{ padding: 16, background: "var(--vt-bg)", border: "1px solid var(--vt-border)", borderRadius: 8, marginBottom: 20 }}>
            <div style={{ color: selected === q.correctIdx ? "#4caf50" : "#f44336", fontWeight: 600, marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
              {selected === q.correctIdx ? <><Check size={16} /> <span>{t("Correct!")}</span></> : <><X size={16} /> <span>{t("Incorrect")}</span></>}
            </div>
            <div style={{ color: "var(--vt-muted)", fontSize: 14 }}>{lang === "hi" && q.explanationHi ? q.explanationHi : q.explanation}</div>
          </div>}

        {selected !== null && <button className="btn btn-primary" onClick={next} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span>{currentQ < sampleQuestions.length - 1 ? t("Next Question") : t("See Results")}</span>
            <ArrowRight size={14} />
          </button>}
      </div>
      {pastAttempts}
    </div>;
}
export {
  AssessmentPage as default
};
