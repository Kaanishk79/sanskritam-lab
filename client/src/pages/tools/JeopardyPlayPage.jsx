import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, X, RotateCcw, Pencil, HelpCircle } from "lucide-react";
import { jeopardyCategories, doubleJeopardyCategories, finalJeopardy } from "../../data/jeopardy";
import { loadCustomQuizzes } from "../../services/customQuizzes";
import { syncJeopardyFromDb, persistJeopardyToDb } from "../../services/userDb";
import { useLanguage } from "../../context/LanguageContext";
import JeopardyHeader from "../../components/jeopardy/JeopardyHeader";
import { DynamicIcon } from "../../components/icons";
import "../tools/jeopardy.css";
const STORAGE_KEY = "sanskrit-jeopardy-v2";
const emptyRound = () => ({ played: [], revealed: false });
const emptyFinal = () => ({ played: [], revealed: false, wager: 0 });
const loadState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        round1: { ...emptyRound(), ...parsed.round1 },
        round2: { ...emptyRound(), ...parsed.round2 },
        final: { ...emptyFinal(), ...parsed.final },
        best: parsed.best ?? 0
      };
    }
  } catch {
  }
  return { round1: emptyRound(), round2: emptyRound(), final: emptyFinal(), best: 0 };
};
const ROUND1_TOTAL = 30;
const ROUND2_TOTAL = 30;
function JeopardyPlayPage() {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const [round, setRound] = useState("r1");
  const [customQuiz, setCustomQuiz] = useState(null);
  const [quizId, setQuizId] = useState("");
  const [round1, setRound1] = useState(loadState().round1);
  const [round2, setRound2] = useState(loadState().round2);
  const [final, setFinal] = useState(loadState().final);
  const [best, setBest] = useState(loadState().best);
  const [active, setActive] = useState(null);
  const [clueRevealed, setClueRevealed] = useState(false);
  const [wager, setWager] = useState("");
  const [finalResult, setFinalResult] = useState(null);
  useEffect(() => {
    const quizzes = loadCustomQuizzes();
    const savedId = sessionStorage.getItem("sanskrit-jeopardy-selected");
    if (savedId) {
      sessionStorage.removeItem("sanskrit-jeopardy-selected");
      const found = quizzes.find((q) => q.id === savedId);
      if (found) {
        setCustomQuiz(found);
        setQuizId(found.id);
        setRound("r1");
        return;
      }
    }
    setQuizId(quizzes.length > 0 ? "" : "");
  }, []);
  useEffect(() => {
    if (!quizId) {
      setCustomQuiz(null);
      return;
    }
    const found = loadCustomQuizzes().find((q) => q.id === quizId);
    setCustomQuiz(found ?? null);
  }, [quizId]);
  useEffect(() => {
    syncJeopardyFromDb().then((saved) => {
      if (!saved) return;
      const s = saved;
      const ns = {
        round1: { ...emptyRound(), ...s.round1 },
        round2: { ...emptyRound(), ...s.round2 },
        final: { ...emptyFinal(), ...s.final },
        best: s.best ?? 0
      };
      setRound1(ns.round1);
      setRound2(ns.round2);
      setFinal(ns.final);
      setBest(ns.best);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(ns));
      } catch {
      }
    });
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ round1, round2, final, best }));
    } catch {
    }
    persistJeopardyToDb({ round1, round2, final, best });
  }, [round1, round2, final, best]);
  const scoreOf = (played) => played.reduce((s, p) => s + p.points, 0);
  const score1 = useMemo(() => scoreOf(round1.played), [round1]);
  const score2 = useMemo(() => scoreOf(round2.played), [round2]);
  const total = score1 + score2 + final.played.reduce((s, p) => s + p.points, 0);
  const currentCats = round === "r1" ? customQuiz?.categories ?? jeopardyCategories : round === "r2" ? doubleJeopardyCategories : [];
  const currentFinal = customQuiz?.final ?? finalJeopardy;
  const currentState = round === "r1" ? round1 : round === "r2" ? round2 : null;
  const currentSetState = round === "r1" ? setRound1 : round === "r2" ? setRound2 : null;
  const openClue = (clue) => {
    setActive(clue);
    setClueRevealed(false);
  };
  const closeClue = () => {
    setActive(null);
    setClueRevealed(false);
  };
  const mark = (result) => {
    if (!active || !currentSetState) return;
    const points = result === "correct" ? active.value : -active.value;
    const updater = (s) => ({ ...s, played: [...s.played, { id: active.id, result, points }] });
    if (round === "r1") setRound1(updater);
    else setRound2(updater);
    closeClue();
  };
  const lockFinal = () => {
    setFinal((f) => ({ ...f, revealed: false, wager: Math.max(0, Math.min(Math.floor(Number(wager) || 0), Math.max(0, total))) }));
  };
  const markFinal = (result) => {
    const w = final.wager;
    setFinal((f) => ({ ...f, played: [{ id: "final", result, points: result === "correct" ? w : -w }] }));
    setFinalResult(result);
    setBest((b) => {
      const newTotal = total + (result === "correct" ? w : -w);
      return newTotal > b ? newTotal : b;
    });
  };
  const resetGame = () => {
    setRound1(emptyRound());
    setRound2(emptyRound());
    setFinal({ played: [], revealed: false, wager: 0 });
    setFinalResult(null);
    setWager("");
    setBest(0);
    setRound("r1");
    closeClue();
  };
  const r1Done = round1.played.length >= ROUND1_TOTAL;
  const r2Done = round2.played.length >= ROUND2_TOTAL;
  const totalValue1 = customQuiz ? currentCats.reduce((s, c) => s + c.clues.reduce((t2, k) => t2 + k.value, 0), 0) : 9e3;
  const totalValue2 = 18e3;
  const renderBoard = () => {
    if (!currentCats || !currentState) return null;
    const playedIds = new Set(currentState.played.map((p) => p.id));
    return <div className="j-board">
        {currentCats.map((cat) => <div className="j-col" key={cat.id}>
            <div className="j-cat">
              <span className="j-cat-icon"><DynamicIcon name="vocab" size={14} /></span>
              <span>{lang === "hi" && cat.nameHi ? cat.nameHi : cat.name}</span>
            </div>
            {cat.clues.map((clue) => {
      const done = playedIds.has(clue.id);
      const prev = currentState.played.find((p) => p.id === clue.id);
      return <button
        key={clue.id}
        className={`j-tile${done ? ` j-done j-${prev?.result}` : ""}`}
        onClick={() => openClue(clue)}
        disabled={done}
      >
                  {done ? prev?.result === "correct" ? <Check size={16} /> : <X size={16} /> : clue.value}
                </button>;
    })}
          </div>)}
      </div>;
  };
  return <div className="page-container">
      <JeopardyHeader />
      <div className="page-header">
        <h2>{t("Play the Game")}</h2>
        <p>{t("Play the classic 6\xD75 game board \u2014 reveal an answer, respond with the question, and score points")}</p>
      </div>

      <div className="j-statsbar">
        <div className="j-stat j-score">{t("Round 1")}: <strong>{score1}</strong> / {totalValue1}</div>
        <div className="j-stat j-score">{t("Double Jeopardy")}: <strong>{score2}</strong> / {totalValue2}</div>
        <div className="j-stat j-score">{t("Total Score")}: <strong>{total}</strong></div>
        <div className="j-stat">{t("Best Score")}: <strong>{best}</strong></div>
        <button className="btn btn-sm btn-secondary" onClick={resetGame} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <RotateCcw size={13} /> <span>{t("New Game")}</span>
        </button>
      </div>

      <div className="j-quiz-picker">
        <label>{t("Quiz:")}</label>
        <select value={quizId} onChange={(e) => setQuizId(e.target.value)}>
          <option value="">{t("Classic \u2014 Sanskrit Jeopardy")}</option>
          {loadCustomQuizzes().map((q) => <option key={q.id} value={q.id}>{q.name}</option>)}
        </select>
        <button className="btn btn-sm btn-secondary" onClick={() => navigate("/tools/jeopardy/builder")} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <Pencil size={13} /> <span>{t("Quiz Builder")}</span>
        </button>
        {customQuiz && <span className="j-quiz-picker-note">
            {t("Playing custom quiz:")} {customQuiz.name}
          </span>}
      </div>

      <div className="j-round-tabs">
        <button className={`btn btn-sm ${round === "r1" ? "btn-primary" : "btn-secondary"}`} onClick={() => setRound("r1")} disabled={r1Done}>
          {t("Jeopardy! Round")}
        </button>
        <button className={`btn btn-sm ${round === "r2" ? "btn-primary" : "btn-secondary"}`} onClick={() => setRound("r2")} disabled={r2Done}>
          {t("Double Jeopardy!")}
        </button>
        <button className={`btn btn-sm ${round === "final" ? "btn-primary" : "btn-secondary"}`} onClick={() => {
    lockFinal();
    setRound("final");
  }}>
          {t("Final Jeopardy!")}
        </button>
      </div>

      {round !== "final" && renderBoard()}

      {round === "final" && <div className="j-final">
          <div className="j-final-cat">
            <div className="j-cat" style={{ minHeight: 60 }}>
              <span>{lang === "hi" ? currentFinal.categorySanskrit : currentFinal.category}</span>
            </div>
            <div className="j-final-wager">
              <label>{t("Your wager (0 to {0}):").replace("{0}", String(Math.max(0, total)))}</label>
              <input
    type="number"
    min="0"
    max={Math.max(0, total)}
    value={wager}
    onChange={(e) => setWager(e.target.value)}
    placeholder={t("Enter wager")}
    disabled={final.revealed}
  />
              {!final.revealed && <button className="btn btn-primary" onClick={() => {
    lockFinal();
    setFinal((f) => ({ ...f, revealed: true }));
  }}>
                  {t("Lock In & Reveal Clue")}
                </button>}
            </div>
          </div>

          {final.revealed && <div className="j-final-clue">
              <h3>{lang === "hi" && currentFinal.clueHi ? currentFinal.clueHi : currentFinal.clue}</h3>
              {finalResult === null ? <div className="j-final-actions">
                  <div className="j-final-answer-box">{lang === "hi" && currentFinal.answerHi ? currentFinal.answerHi : currentFinal.answer}</div>
                  <div className="j-final-btns">
                    <button className="btn btn-primary" onClick={() => markFinal("correct")}>{t("I got it right (+{0})").replace("{0}", String(final.wager))}</button>
                    <button className="btn btn-secondary" onClick={() => markFinal("miss")}>{t("I missed it (\u2212{0})").replace("{0}", String(final.wager))}</button>
                  </div>
                </div> : <div className={`j-final-result j-${finalResult}`}>
                  {finalResult === "correct" ? `${t("Final Jeopardy! correct!")} +${final.wager} \u2014 ${t("Total Score")}: ${total}` : `${t("Final Jeopardy! miss")} \u2014 ${t("Total Score")}: ${total}`}
                </div>}
            </div>}
        </div>}

      {r1Done && round !== "r2" && <div className="j-gameover">{t("Jeopardy! round complete \u2014 move to Double Jeopardy!")}</div>}
      {r2Done && <div className="j-gameover">{t("Double Jeopardy! round complete \u2014 on to Final Jeopardy!")}</div>}

      {active && currentSetState && <div className="j-modal-backdrop" onClick={closeClue}>
          <div className="j-modal" onClick={(e) => e.stopPropagation()}>
            <div className="j-modal-value">{active.value}</div>
            <h3>{lang === "hi" && active.clueHi ? active.clueHi : active.clue}</h3>
            <div className="j-modal-answer">{clueRevealed ? lang === "hi" && active.answerHi ? active.answerHi : active.answer : <HelpCircle size={32} color="var(--vt-orange)" />}</div>
            <div className="j-modal-actions">
              {!clueRevealed ? <button className="btn btn-primary" onClick={() => setClueRevealed(true)}>{t("Reveal Answer")}</button> : <>
                  <button className="btn btn-primary" onClick={() => mark("correct")}>{t("Correct (+{0})").replace("{0}", String(active.value))}</button>
                  <button className="btn btn-secondary" onClick={() => mark("miss")}>{t("Miss (\u2212{0})").replace("{0}", String(active.value))}</button>
                </>}
              <button className="btn btn-sm btn-ghost" onClick={closeClue}>{t("Back to Board")}</button>
            </div>
          </div>
        </div>}
    </div>;
}
export {
  JeopardyPlayPage as default
};
