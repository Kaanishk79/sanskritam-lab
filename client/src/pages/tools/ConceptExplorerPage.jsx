import { useEffect, useMemo, useState } from "react";
import { BookOpen, Sparkles, Heart, Scroll, Volume2 } from "lucide-react";
import { CONCEPTS } from "../../data/conceptExplorer";
import { loadExplorerConcepts } from "../../services/contentDb";
import { toIAST } from "../../services/sanskrit";
import { speakWithFallback } from "../../services/speech";
import { useLanguage } from "../../context/LanguageContext";
function getCatIcon(cat) {
  switch (cat) {
    case "Grammar":
      return <BookOpen size={16} color="var(--vt-blue)" />;
    case "Philosophy":
      return <Sparkles size={16} color="var(--vt-gold)" />;
    case "Values":
      return <Heart size={16} color="#e74c3c" />;
    case "Texts":
      return <Scroll size={16} color="var(--vt-orange)" />;
    default:
      return <BookOpen size={16} color="var(--vt-orange)" />;
  }
}
function ConceptExplorerPage() {
  const { t, lang } = useLanguage();
  const [concepts, setConcepts] = useState(CONCEPTS);
  const [cat, setCat] = useState("all");
  const [selId, setSelId] = useState(CONCEPTS[0].id);
  const [speaking, setSpeaking] = useState(false);
  useEffect(() => {
    loadExplorerConcepts().then((cs) => {
      setConcepts(cs);
      setSelId((id) => cs.some((c) => c.id === id) ? id : cs[0].id);
    });
  }, []);
  const sel = concepts.find((c) => c.id === selId);
  const list = useMemo(
    () => cat === "all" ? concepts : concepts.filter((c) => c.cat === cat),
    [concepts, cat]
  );
  const speak = (text) => speakWithFallback(text, (s) => setSpeaking(s));
  const go = (id) => setSelId(id);
  return <div className="page-container">
      <div className="page-header">
        <h2>{t("Concept Explorer")}</h2>
        <p>{t("Grammar, philosophy, values and texts \u2014 big Sanskrit ideas explained in plain English.")}</p>
      </div>

      <div className="card" style={{ maxWidth: 820, margin: "0 auto", padding: 24 }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
          {["all", "Grammar", "Philosophy", "Values", "Texts"].map((c) => <button key={c} className={`btn btn-sm ${cat === c ? "btn-primary" : "btn-secondary"}`} onClick={() => setCat(c)}>
              {c === "all" ? t("All") : t(c)}
            </button>)}
        </div>

        <div className="card" style={{ padding: 20, marginBottom: 16, border: "2px solid rgba(255,152,0,0.4)", background: "rgba(255,152,0,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
            <h3 style={{ margin: 0, fontSize: 26, display: "flex", alignItems: "center", gap: 8 }}>
              {getCatIcon(sel.cat)}
              <span>{sel.sa}</span>
              <span style={{ color: "var(--vt-muted)", fontSize: 15, fontWeight: 400 }}>{sel.en} · {toIAST(sel.sa)}</span>
            </h3>
            <button className="btn btn-sm btn-secondary" onClick={() => speak(sel.sa + ". " + sel.example)} disabled={speaking} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <Volume2 size={14} /> <span>{t("Hear")}</span>
            </button>
          </div>
          <p style={{ margin: "8px 0 0", fontSize: 15, fontWeight: 600, color: "var(--vt-orange)" }}>{lang === "hi" && sel.defHi ? sel.defHi : sel.def}</p>
          <p style={{ margin: "10px 0 0" }}>{lang === "hi" && sel.detailHi ? sel.detailHi : sel.detail}</p>
          <div className="card" style={{ marginTop: 12, padding: "10px 14px", background: "rgba(255,255,255,0.03)" }}>
            <p style={{ margin: 0, fontSize: 18 }}>{sel.example}</p>
            <p style={{ margin: "4px 0 0", color: "var(--vt-muted)" }}>{lang === "hi" && sel.exampleEnHi ? sel.exampleEnHi : sel.exampleEn}</p>
          </div>
          {sel.related.length > 0 && <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 12, alignItems: "center" }}>
              <span style={{ fontSize: 13, color: "var(--vt-muted)" }}>{t("Related")}:</span>
              {sel.related.map((r) => {
    const rc = concepts.find((c) => c.id === r);
    return rc ? <button key={r} className="btn btn-sm btn-secondary" onClick={() => go(r)} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                    {getCatIcon(rc.cat)} <span>{rc.sa}</span>
                  </button> : null;
  })}
            </div>}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(190px,1fr))", gap: 10 }}>
          {list.map((c) => <button
    key={c.id}
    className="card"
    style={{ margin: 0, textAlign: "left", cursor: "pointer", border: sel.id === c.id ? "2px solid var(--vt-orange)" : "1px solid var(--vt-border)", padding: "12px 14px" }}
    onClick={() => go(c.id)}
  >
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {getCatIcon(c.cat)}
                <strong>{c.sa}</strong>
              </div>
              <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--vt-muted)" }}>{c.en} — {lang === "hi" && c.defHi ? c.defHi : c.def}</p>
            </button>)}
        </div>
      </div>
    </div>;
}
export {
  ConceptExplorerPage as default
};
