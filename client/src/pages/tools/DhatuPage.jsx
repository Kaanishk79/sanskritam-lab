import { useEffect, useState } from "react";
import { Volume2 } from "lucide-react";
import { DHATUS } from "../../data/dhatus";
import { loadDhatus } from "../../services/contentDb";
import { speakWithFallback } from "../../services/speech";
import { useLanguage } from "../../context/LanguageContext";
const GANAS = ["All", "\u092D\u094D\u0935\u093E\u0926\u093F", "\u0905\u0926\u093E\u0926\u093F", "\u091C\u0941\u0939\u094B\u0924\u094D\u092F\u093E\u0926\u093F", "\u0926\u093F\u0935\u093E\u0926\u093F", "\u0938\u094D\u0935\u093E\u0926\u093F", "\u0924\u0928\u093E\u0926\u093F", "\u0915\u094D\u0930\u092F\u093E\u0926\u093F"];
function DhatuPage() {
  const { t, lang } = useLanguage();
  const [dhatus, setDhatus] = useState(DHATUS);
  const [q, setQ] = useState("");
  const [gana, setGana] = useState("All");
  useEffect(() => {
    let live = true;
    loadDhatus().then((rows2) => {
      if (live) setDhatus(rows2);
    });
    return () => {
      live = false;
    };
  }, []);
  const rows = dhatus.filter((d) => {
    const matchQ = !q.trim() || d.root.includes(q.trim()) || d.iast.includes(q.trim().toLowerCase()) || d.meaning.toLowerCase().includes(q.trim().toLowerCase()) || d.meaningHi && d.meaningHi.includes(q.trim());
    const matchG = gana === "All" || d.gana === gana;
    return matchQ && matchG;
  });
  return <div className="page-container">
      <div className="page-header">
        <h2>{t("Dh\u0101tu / Verb Explorer")}</h2>
        <p>{t("Browse common verbal roots: their ga\u1E47a (class), meaning, and present-tense form.")}</p>
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginBottom: 16, maxWidth: 640 }}>
        <input
    value={q}
    onChange={(e) => setQ(e.target.value)}
    placeholder={t("Search: \u092D\u0942, gam, to go, speak\u2026")}
    style={{ flex: 1, minWidth: 200, fontSize: 16 }}
  />
        <select value={gana} onChange={(e) => setGana(e.target.value)} style={{ padding: "8px 10px" }}>
          {GANAS.map((g) => <option key={g} value={g}>{g === "All" ? lang === "hi" ? "\u0938\u092D\u0940" : "All" : g}</option>)}
        </select>
        <span style={{ color: "var(--vt-muted)", fontSize: 13 }}>{rows.length} {t("roots")}</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 10 }}>
        {rows.map((d) => <div key={d.root} className="card" style={{ padding: 14, margin: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <strong style={{ fontSize: 22 }}>{d.root}</strong>
              <button className="btn btn-sm btn-outline" onClick={() => speakWithFallback(d.present)} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                <Volume2 size={13} /> <span>{d.present}</span>
              </button>
            </div>
            <div style={{ color: "var(--vt-muted)", fontSize: 13 }}>{d.iast} · {t("ga\u1E47a")} {d.ganaNum} ({d.gana})</div>
            <div style={{ color: "var(--vt-text)", marginTop: 4 }}>{lang === "hi" && d.meaningHi ? d.meaningHi : d.meaning}</div>
            <div style={{ color: "var(--vt-muted)", fontSize: 13, marginTop: 4 }}>अद्यतन: {d.present}</div>
          </div>)}
      </div>
      {rows.length === 0 && <p style={{ color: "var(--vt-muted)", textAlign: "center", padding: 20 }}>{t("No roots match.")}</p>}
    </div>;
}
export {
  DhatuPage as default
};
