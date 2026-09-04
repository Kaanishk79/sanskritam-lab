import { useEffect, useMemo, useState } from "react";
import { Globe, Dices, Volume2, Sparkles } from "lucide-react";
import { CONCEPTS } from "../../data/realWorld";
import { loadRealWorldConcepts } from "../../services/contentDb";
import { toIAST } from "../../services/sanskrit";
import { speakWithFallback } from "../../services/speech";
import { useLanguage } from "../../context/LanguageContext";
function RealWorldPage() {
  const { t, lang } = useLanguage();
  const hi = lang === "hi";
  const [concepts, setConcepts] = useState(CONCEPTS);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(CONCEPTS[Math.floor(Math.random() * CONCEPTS.length)]);
  const [speaking, setSpeaking] = useState(false);
  useEffect(() => {
    loadRealWorldConcepts().then((cs) => {
      setConcepts(cs);
      setSel((s) => cs.find((c) => c.word === s.word) ?? cs[Math.floor(Math.random() * cs.length)]);
    });
  }, []);
  const filtered = useMemo(
    () => concepts.filter((c) => (c.word + c.meaning + c.today + (c.meaningHi ?? "") + (c.todayHi ?? "")).toLowerCase().includes(q.toLowerCase())),
    [concepts, q]
  );
  const random = () => setSel(concepts[Math.floor(Math.random() * concepts.length)]);
  const speak = (text) => speakWithFallback(text, (s) => setSpeaking(s));
  return <div className="page-container">
      <div className="page-header">
        <h2>{t("Sanskrit \u2192 Real World")}</h2>
        <p>{t("Ancient Sanskrit ideas are alive in your daily life \u2014 discover the word behind the things you already do.")}</p>
      </div>

      <div className="card" style={{ maxWidth: 760, margin: "0 auto", padding: 24 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16, alignItems: "center" }}>
          <input
    className="lab-input"
    style={{ flex: 1, minWidth: 200, padding: "8px 12px", borderRadius: 8, border: "1px solid var(--vt-border)" }}
    value={q}
    onChange={(e) => setQ(e.target.value)}
    placeholder={t("Search a concept \u2014 karma, yoga, zero\u2026")}
  />
          <button className="btn btn-sm btn-secondary" onClick={random} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <Dices size={14} /> <span>{t("Daily Connection")}</span>
          </button>
        </div>

        <div className="card" style={{ padding: 20, marginBottom: 18, border: "2px solid rgba(255,152,0,0.4)", background: "rgba(255,152,0,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
            <h3 style={{ margin: 0, fontSize: 26, display: "flex", alignItems: "center", gap: 8 }}>
              <Globe size={22} color="var(--vt-orange)" />
              <span>{sel.word}</span>
              <span style={{ color: "var(--vt-muted)", fontSize: 16, fontWeight: 400 }}>{sel.iast}</span>
            </h3>
            <button className="btn btn-sm btn-secondary" onClick={() => speak(sel.word + ". " + sel.example)} disabled={speaking} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <Volume2 size={14} /> <span>{t("Hear it")}</span>
            </button>
          </div>
          <p style={{ margin: "6px 0", fontSize: 15, fontWeight: 600, color: "var(--vt-orange)" }}>{hi ? sel.meaningHi ?? sel.meaning : sel.meaning}</p>
          <p style={{ margin: 0 }}>{t("Today:")} {hi ? sel.todayHi ?? sel.today : sel.today}</p>
          <div className="card" style={{ marginTop: 12, padding: "10px 14px", background: "rgba(255,255,255,0.03)" }}>
            <p style={{ margin: 0, fontSize: 18 }}>{sel.example}</p>
            <p style={{ margin: "4px 0 0", color: "var(--vt-muted)" }}>{hi ? sel.exampleHi ?? sel.exampleEn : sel.exampleEn}</p>
            <p style={{ margin: "2px 0 0", color: "var(--vt-muted)", fontSize: 13, fontStyle: "italic" }}>{toIAST(sel.example)}</p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 10 }}>
          {filtered.map((c) => <button
    key={c.word}
    className="card"
    style={{ margin: 0, textAlign: "left", cursor: "pointer", border: sel.word === c.word ? "2px solid var(--vt-orange)" : "1px solid var(--vt-border)", padding: "12px 14px" }}
    onClick={() => setSel(c)}
  >
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Sparkles size={13} color="var(--vt-orange)" />
                <strong>{c.word} <span style={{ fontWeight: 400, color: "var(--vt-muted)" }}>{c.iast}</span></strong>
              </div>
              <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--vt-muted)" }}>{hi ? c.meaningHi ?? c.meaning : c.meaning}</p>
            </button>)}
        </div>
      </div>
    </div>;
}
export {
  RealWorldPage as default
};
