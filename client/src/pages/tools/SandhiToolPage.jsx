import { useEffect, useState } from "react";
import { Sparkles, BookOpen, FlaskConical, History } from "lucide-react";
import { tryJoinSandhi, SANDHI_RULES } from "../../services/sanskrit";
import { useLanguage } from "../../context/LanguageContext";
import { syncToolHistoryFromDb, saveToolHistoryToDb } from "../../services/userDb";
const PRACTICE = [
  ["\u0926\u0947\u0935", "\u0907\u0928\u094D\u0926\u094D\u0930", "\u0926\u0947\u0935\u0947\u0928\u094D\u0926\u094D\u0930"],
  ["\u0938\u0926\u093E", "\u090F\u0935", "\u0938\u0926\u0948\u0935"],
  ["\u0930\u093E\u092E", "\u0905\u0917\u094D\u0930", "\u0930\u093E\u092E\u093E\u0917\u094D\u0930"],
  ["\u0907\u0924\u093F", "\u0906\u0926\u093F", "\u0907\u0924\u094D\u092F\u093E\u0926\u093F"],
  ["\u0928\u0930", "\u0907\u0935", "\u0928\u0930\u0947\u0935"],
  ["\u0939\u093F\u0924", "\u0909\u092A\u0926\u0947\u0936", "\u0939\u093F\u0924\u094B\u092A\u0926\u0947\u0936"],
  ["\u0938\u0924\u094D\u092F\u092E\u094D", "\u090F\u0935", "\u0938\u0924\u094D\u092F\u092E\u0947\u0935"],
  ["\u092A\u0943\u0925\u0915\u094D", "\u091A", "\u092A\u0943\u0925\u0915\u094D\u091A"],
  ["\u0924\u0924\u094D", "\u091A", "\u0924\u091A\u094D\u091A"],
  ["\u0935\u093F\u0926\u094D\u092F\u093E\u0932\u092F", "\u0905\u0927\u0940\u0936", "\u0935\u093F\u0926\u094D\u092F\u093E\u0932\u092F\u093E\u0927\u0940\u0936"]
];
function SandhiToolPage() {
  const { t } = useLanguage();
  const [a, setA] = useState("\u0926\u0947\u0935");
  const [b, setB] = useState("\u0907\u0928\u094D\u0926\u094D\u0930");
  const [res, setRes] = useState(null);
  const [history, setHistory] = useState([]);
  useEffect(() => {
    let live = true;
    syncToolHistoryFromDb().then((rows) => {
      if (live && rows) setHistory(rows.filter((h) => h.tool === "sandhi").slice(0, 10));
    });
    return () => {
      live = false;
    };
  }, []);
  const applyResult = (inputA, inputB) => {
    const r = tryJoinSandhi(inputA, inputB);
    setRes(r);
    saveToolHistoryToDb("sandhi", `${inputA} + ${inputB}`, r.result);
  };
  const join = () => applyResult(a, b);
  return <div className="page-container">
      <div className="page-header">
        <h2>{t("Sandhi Tool")}</h2>
        <p>{t("Join two Sanskrit words and see which sandhi rule applies \u2014 with the exact rule explained.")}</p>
      </div>

      <div className="card" style={{ padding: 24, maxWidth: 640, margin: "0 auto 16px" }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <input value={a} onChange={(e) => setA(e.target.value)} style={{ flex: 1, minWidth: 140, fontSize: 18 }} />
          <span style={{ fontSize: 22, color: "var(--vt-muted)" }}>+</span>
          <input value={b} onChange={(e) => setB(e.target.value)} style={{ flex: 1, minWidth: 140, fontSize: 18 }} />
          <button className="btn btn-primary" onClick={join} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <Sparkles size={14} /> <span>{t("Join")}</span>
          </button>
        </div>

        {res && <div className={res.ok ? "sandhi-ok" : ""} style={{ marginTop: 16, padding: 14, background: res.ok ? "rgba(76,175,80,.1)" : "rgba(255,100,100,.08)", borderRadius: 8 }}>
            <div style={{ fontSize: 26, fontWeight: 700 }}>{res.result}</div>
            <div style={{ color: res.ok ? "#4caf50" : "#e55", marginTop: 4, fontSize: 14 }}>{res.explanation}</div>
          </div>}
      </div>

      {history.length > 0 && <div className="card" style={{ padding: 20, margin: "0 auto 16px", maxWidth: 640 }}>
          <h3 style={{ marginTop: 0, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
            <History size={16} /> <span>{t("Recent joins")}</span>
          </h3>
          <div className="text-list">
            {history.map((h) => <div key={h.id} className="text-item">
                <div>
                  <div className="text-title" style={{ fontSize: 15 }}>{h.input}</div>
                  <div className="text-meta">→ {h.output} · {new Date(h.createdAt).toLocaleDateString()}</div>
                </div>
              </div>)}
          </div>
        </div>}

      <div className="card" style={{ padding: 20, margin: "0 auto 16px", maxWidth: 640 }}>
        <h3 style={{ marginTop: 0, display: "flex", alignItems: "center", gap: 8 }}>
          <BookOpen size={16} /> <span>{t("The rules")}</span>
        </h3>
        {SANDHI_RULES.map((r) => <div key={r.name} style={{ marginBottom: 12 }}>
            <strong>{r.devName} · {r.name}</strong>
            <div style={{ color: "var(--vt-muted)", fontSize: 14 }}>{r.rule}</div>
            <div style={{ color: "var(--vt-muted)", fontSize: 13, fontStyle: "italic" }}>{r.example}</div>
          </div>)}
      </div>

      <div className="card" style={{ padding: 20, margin: "0 auto", maxWidth: 640 }}>
        <h3 style={{ marginTop: 0, display: "flex", alignItems: "center", gap: 8 }}>
          <FlaskConical size={16} /> <span>{t("Practice")}</span>
        </h3>
        {PRACTICE.map(([x, y, expected]) => <div key={x + y} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8, flexWrap: "wrap" }}>
            <code style={{ background: "rgba(255,255,255,.06)", padding: "4px 8px", borderRadius: 4 }}>{x} + {y}</code>
            <button className="btn btn-sm btn-outline" onClick={() => {
    setA(x);
    setB(y);
    applyResult(x, y);
  }}>=?</button>
            <span style={{ color: "var(--vt-muted)", fontSize: 13 }}>{expected}</span>
          </div>)}
      </div>
    </div>;
}
export {
  SandhiToolPage as default
};
