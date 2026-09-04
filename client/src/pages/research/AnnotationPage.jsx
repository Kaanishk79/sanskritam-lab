import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { supabase } from "../../services/supabase";
import { useLanguage } from "../../context/LanguageContext";
const layers = ["grammar", "translation", "commentary"];
function AnnotationPage() {
  const { t, lang } = useLanguage();
  const [activeLayer, setActiveLayer] = useState("grammar");
  const [texts, setTexts] = useState([]);
  const [selectedText, setSelectedText] = useState("");
  const [annotations, setAnnotations] = useState({});
  const [editors, setEditors] = useState({});
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    ;
    (async () => {
      setLoading(true);
      const { data } = await supabase.from("texts").select("id,title,title_hi,content").order("id");
      if (data && data.length > 0) {
        setTexts(data);
        setSelectedText(data[0].id);
      }
      setLoading(false);
    })();
  }, []);
  useEffect(() => {
    if (!selectedText) return;
    (async () => {
      const { data } = await supabase.from("annotations").select("layer,content").eq("text_id", selectedText);
      if (!data) {
        setAnnotations({});
        return;
      }
      const mapped = { grammar: "", translation: "", commentary: "" };
      for (const a of data) {
        if (a.layer in mapped) mapped[a.layer] = a.content;
      }
      setAnnotations(mapped);
      setEditors(mapped);
    })();
  }, [selectedText]);
  const saveAnnotation = async () => {
    const content = (editors[activeLayer] ?? "").trim();
    setNotice("");
    if (!content) return;
    try {
      let { error } = await supabase.from("annotations").insert({ text_id: selectedText, layer: activeLayer, content });
      if (error) {
        setNotice(error.message + " \u2014 " + t("saved only on this device for now."));
      } else {
        setNotice(t("Saved to database successfully."));
      }
    } catch {
      setNotice(t("Could not reach the database") + " \u2014 " + t("saved only on this device for now."));
    }
    setAnnotations((prev) => ({ ...prev, [activeLayer]: content }));
    setEditors((prev) => ({ ...prev, [activeLayer]: "" }));
  };
  const selected = texts.find((t2) => t2.id === selectedText);
  return <div className="page-container">
      <div className="page-header">
        <h2>{t("Annotation Tool")}</h2>
        <p>{t("Add multi-level notes to texts \u2014 from grammar breakdowns to classical commentaries")}</p>
      </div>

      {loading ? <p style={{ opacity: 0.6 }}>{t("Loading texts\u2026")}</p> : <div className="card" style={{ marginBottom: 24 }}>
          <label style={{ display: "block", marginBottom: 8, color: "var(--vt-muted)", fontSize: 13 }}>
            {t("Select Text")}
          </label>
          <select
    value={selectedText}
    onChange={(e) => setSelectedText(e.target.value)}
    style={{ width: "100%", maxWidth: 480 }}
  >
            {texts.map((t2) => <option key={t2.id} value={t2.id}>{lang === "hi" && t2.title_hi ? t2.title_hi : t2.title}</option>)}
          </select>
          {selected?.content && <div
    style={{
      fontSize: 28,
      lineHeight: 1.8,
      fontFamily: "'Noto Sans Devanagari', serif",
      color: "var(--vt-text)",
      marginTop: 16,
      padding: 16,
      background: "rgba(0,0,0,0.2)",
      borderRadius: 8,
      whiteSpace: "pre-wrap",
      maxHeight: 260,
      overflowY: "auto"
    }}
  >
              {selected.content}
            </div>}
        </div>}

      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        {layers.map((layer) => <button
    key={layer}
    className={`btn ${activeLayer === layer ? "btn-primary" : "btn-secondary"}`}
    onClick={() => setActiveLayer(layer)}
  >
            {t(layer[0].toUpperCase() + layer.slice(1))}
          </button>)}
      </div>

      <div className={`annotation-layer ${activeLayer}`}>
        <div style={{ fontSize: 12, color: "var(--vt-muted)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>
          {t(`${activeLayer} Layer`)}
        </div>

        <label style={{ display: "block", marginBottom: 8, color: "var(--vt-muted)", fontSize: 13 }}>
          {t(`Existing ${activeLayer} annotation`)}
        </label>
        <div
    style={{
      whiteSpace: "pre-wrap",
      fontSize: 14,
      lineHeight: 1.6,
      color: "var(--vt-text)",
      padding: 12,
      background: "rgba(0,0,0,0.15)",
      borderRadius: 6,
      marginBottom: 16,
      minHeight: 40
    }}
  >
          {annotations[activeLayer] || `\u2014 ${t("none yet")} \u2014`}
        </div>

        <label style={{ display: "block", marginBottom: 8, color: "var(--vt-muted)", fontSize: 13 }}>
          {t(`Write ${activeLayer} annotation`)}
        </label>
        <textarea
    value={editors[activeLayer] ?? ""}
    onChange={(e) => setEditors({ ...editors, [activeLayer]: e.target.value })}
    style={{
      width: "100%",
      minHeight: 150,
      background: "rgba(0,0,0,0.2)",
      border: "none",
      color: "var(--vt-text)",
      padding: 12,
      borderRadius: 6,
      fontSize: 14,
      lineHeight: 1.6,
      resize: "vertical"
    }}
  />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
          <button className="btn btn-primary" onClick={saveAnnotation} disabled={!selectedText}>
            {t("Save Annotation")}
          </button>
          {notice && <span style={{ fontSize: 13, color: "var(--vt-muted)", display: "inline-flex", alignItems: "center", gap: 6 }}>
              {notice.includes("successfully") ? <CheckCircle2 size={14} color="#2ecc71" /> : <AlertCircle size={14} color="#f39c12" />}
              <span>{notice}</span>
            </span>}
        </div>
      </div>
    </div>;
}
export {
  AnnotationPage as default
};
