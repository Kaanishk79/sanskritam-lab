import { useEffect, useRef, useState } from "react";
import { Volume2, X, History } from "lucide-react";
import { toIAST, toDevanagari } from "../../services/sanskrit";
import { speakWithFallback } from "../../services/speech";
import { useLanguage } from "../../context/LanguageContext";
import { syncToolHistoryFromDb, saveToolHistoryToDb } from "../../services/userDb";
const SAMPLES = ["\u0930\u093E\u092E\u093E\u092F\u0923\u092E\u094D", "\u092D\u0917\u0935\u0926\u094D\u0917\u0940\u0924\u093E", "\u0938\u0924\u094D\u092F\u092E\u0947\u0935 \u091C\u092F\u0924\u0947", "\u0928\u092E\u0938\u094D\u0924\u0947", "vidy\u0101 dad\u0101ti vinayam", "sa\u1E43sk\u1E5Bta\u1E43 devabh\u0101\u1E63\u0101"];
function TransliteratePage() {
  const { t } = useLanguage();
  const [dev, setDev] = useState("\u0930\u093E\u092E\u093E\u092F\u0923\u092E\u094D");
  const [iast, setIast] = useState(toIAST("\u0930\u093E\u092E\u093E\u092F\u0923\u092E\u094D"));
  const [history, setHistory] = useState([]);
  const saveTimer = useRef(null);
  const scheduleSave = (input, output) => {
    if (saveTimer.current) window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(() => {
      saveToolHistoryToDb("transliterate", input, output);
    }, 800);
  };
  useEffect(() => {
    return () => {
      if (saveTimer.current) window.clearTimeout(saveTimer.current);
    };
  }, []);
  useEffect(() => {
    let live = true;
    syncToolHistoryFromDb().then((rows) => {
      if (live && rows) setHistory(rows.filter((h) => h.tool === "transliterate").slice(0, 10));
    });
    return () => {
      live = false;
    };
  }, []);
  const fromDev = (v) => {
    setDev(v);
    const out = toIAST(v);
    setIast(out);
    if (v.trim()) scheduleSave(v, out);
  };
  const fromIast = (v) => {
    setIast(v);
    const out = toDevanagari(v);
    setDev(out);
    if (v.trim()) scheduleSave(v, out);
  };
  return <div className="page-container">
      <div className="page-header">
        <h2>{t("Transliteration Tool")}</h2>
        <p>{t("Type Devanagari or IAST and watch it convert live, in both directions.")}</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
        <div className="card" style={{ padding: 20 }}>
          <label style={{ fontWeight: 600 }}>देवनागरी · Devanagari</label>
          <textarea
    rows={4}
    value={dev}
    onChange={(e) => fromDev(e.target.value)}
    style={{ width: "100%", marginTop: 8, fontSize: 20, lineHeight: 1.8 }}
    placeholder="रामायणम्"
  />
        </div>
        <div className="card" style={{ padding: 20 }}>
          <label style={{ fontWeight: 600 }}>IAST · Roman</label>
          <textarea
    rows={4}
    value={iast}
    onChange={(e) => fromIast(e.target.value)}
    style={{ width: "100%", marginTop: 8, fontSize: 18, lineHeight: 1.8 }}
    placeholder="rāmāyaṇam"
  />
        </div>
      </div>

      <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <span style={{ color: "var(--vt-muted)" }}>{t("Try:")}</span>
        {SAMPLES.map((s) => <button key={s} className="btn btn-sm btn-outline" onClick={() => toIAST(s) === s ? fromIast(s) : fromDev(s)}>{s}</button>)}
        <button className="btn btn-sm btn-primary" onClick={() => speakWithFallback(dev)} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <Volume2 size={14} /> <span>{t("Speak")}</span>
        </button>
        <button className="btn btn-sm btn-outline" onClick={() => {
    setDev("");
    setIast("");
  }} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
          <X size={13} /> <span>{t("Clear")}</span>
        </button>
      </div>

      <div className="card" style={{ padding: 20, marginTop: 16, maxWidth: 640 }}>
        <h3 style={{ marginTop: 0 }}>{t("How to type IAST")}</h3>
        <table style={{ width: "100%", fontSize: 14 }}>
          <tbody>
            {[["\u0101", "\u0906"], ["\u012B", "\u0908"], ["\u016B", "\u090A"], ["\u1E5B", "\u090B"], ["\u015B", "\u0936"], ["\u1E63", "\u0937"], ["\u1E43", "\u0902"], ["\u1E25", "\u0903"], ["\u1E6D", "\u091F"], ["\u1E0D", "\u0921"], ["\u1E47", "\u0923"], ["\xF1", "\u091E"]].map(([r, d]) => <tr key={r}><td style={{ padding: "2px 8px", color: "var(--vt-muted)" }}>{r}</td><td>{d}</td></tr>)}
          </tbody>
        </table>
      </div>

      {history.length > 0 && <div className="card" style={{ padding: 20, marginTop: 16, maxWidth: 640 }}>
          <h3 style={{ marginTop: 0, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
            <History size={16} /> <span>{t("Recent conversions")}</span>
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
    </div>;
}
export {
  TransliteratePage as default
};
