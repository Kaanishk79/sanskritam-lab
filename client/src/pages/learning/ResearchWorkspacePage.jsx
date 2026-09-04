import { useState } from "react";
import { FileText, Sliders, Search, AlertCircle, Check } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { supabase } from "../../services/supabase";
import { getAuthState } from "../../services/auth";
function ResearchWorkspacePage() {
  const { t } = useLanguage();
  const [activeTool, setActiveTool] = useState("collation");
  const [notes, setNotes] = useState("");
  const [savedStatus, setSavedStatus] = useState(false);
  const manuscripts = [
    { siglum: "A", name: "MS Sanskrit 1", date: "15th c.", readings: ["\u0905\u0925 \u0927\u0930\u094D\u092E\u0902", "\u0935\u094D\u092F\u093E\u0916\u094D\u092F\u093E\u0938\u094D\u092F\u093E\u092E\u0903", "\u092F\u0924\u094B\u093D\u092D\u094D\u092F\u0941\u0926\u092F"] },
    { siglum: "B", name: "MS Grantha 2", date: "16th c.", readings: ["\u0905\u0925 \u0927\u0930\u094D\u092E\u0902", "\u0935\u094D\u092F\u093E\u0916\u094D\u092F\u093E\u0938\u094D\u092F\u093E\u092E\u0903", "\u092F\u0924\u094B\u092D\u094D\u092F\u0941\u0926\u092F"] },
    { siglum: "C", name: "MS Sharada 3", date: "17th c.", readings: ["\u0905\u0925 \u0927\u092E\u094D\u092E\u0902", "\u0935\u094D\u092F\u093E\u0916\u094D\u092F\u093E\u0938\u094D\u092F\u093E\u092E\u0903", "\u092F\u0924\u094B\u093D\u092D\u094D\u092F\u0941\u0926\u092F"] }
  ];
  const baseText = "\u0905\u0925 \u0927\u0930\u094D\u092E\u0902 \u0935\u094D\u092F\u093E\u0916\u094D\u092F\u093E\u0938\u094D\u092F\u093E\u092E\u0903 \u0964 \u092F\u0924\u094B\u093D\u092D\u094D\u092F\u0941\u0926\u092F\u0928\u093F\u0903\u0936\u094D\u0930\u0947\u092F\u0938\u0938\u093F\u0926\u094D\u0927\u093F\u0903 \u0938 \u0927\u0930\u094D\u092E\u0903 \u0965";
  const handleSaveNotes = async () => {
    try {
      const user = getAuthState().user;
      if (user && notes.trim()) {
        await supabase.from("annotations").insert({
          user_id: user.id,
          text_id: "sample-manuscript-note",
          layer: "paleography",
          content: notes
        });
        setSavedStatus(true);
        setTimeout(() => setSavedStatus(false), 3e3);
      }
    } catch {
    }
  };
  return <div className="page-container">
      <div className="page-header">
        <h2>{t("PhD Research Workspace")}</h2>
        <p>{t("Critical edition tools \u2014 collation, apparatus criticus, and paleographic analysis")}</p>
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        <button
    className={`btn ${activeTool === "collation" ? "btn-primary" : "btn-secondary"}`}
    onClick={() => setActiveTool("collation")}
    style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
  >
          <FileText size={14} />
          <span>{t("Collation")}</span>
        </button>
        <button
    className={`btn ${activeTool === "apparatus" ? "btn-primary" : "btn-secondary"}`}
    onClick={() => setActiveTool("apparatus")}
    style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
  >
          <Sliders size={14} />
          <span>{t("Critical Apparatus")}</span>
        </button>
        <button
    className={`btn ${activeTool === "paleography" ? "btn-primary" : "btn-secondary"}`}
    onClick={() => setActiveTool("paleography")}
    style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
  >
          <Search size={14} />
          <span>{t("Paleography Notes")}</span>
        </button>
      </div>

      {activeTool === "collation" && <div className="card">
          <h3 style={{ marginBottom: 16 }}>{t("Manuscript Collation")}</h3>
          <div style={{ marginBottom: 16, fontSize: 20, fontFamily: "'Noto Sans Devanagari', serif", color: "var(--vt-text)", padding: 16, background: "rgba(0,0,0,0.2)", borderRadius: 8 }}>
            {baseText}
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--vt-border)", textAlign: "left" }}>
                  <th style={{ padding: "8px 12px", color: "var(--vt-muted)" }}>{t("Witness")}</th>
                  <th style={{ padding: "8px 12px", color: "var(--vt-muted)" }}>{t("Date")}</th>
                  <th style={{ padding: "8px 12px", color: "var(--vt-muted)" }}>{t("Reading 1")}</th>
                  <th style={{ padding: "8px 12px", color: "var(--vt-muted)" }}>{t("Reading 2")}</th>
                  <th style={{ padding: "8px 12px", color: "var(--vt-muted)" }}>{t("Reading 3")}</th>
                </tr>
              </thead>
              <tbody>
                {manuscripts.map((ms) => <tr key={ms.siglum} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <td style={{ padding: "8px 12px", fontWeight: 600, color: "var(--sanskrit-gold)" }}>{ms.siglum}</td>
                    <td style={{ padding: "8px 12px", color: "var(--vt-muted)" }}>{ms.date}</td>
                    {ms.readings.map((r, i) => <td key={i} style={{
    padding: "8px 12px",
    fontFamily: "'Noto Sans Devanagari', serif",
    color: r !== manuscripts[0].readings[i] ? "#f44336" : "var(--vt-text)"
  }}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                          {r}
                          {r !== manuscripts[0].readings[i] && <AlertCircle size={13} color="#f44336" />}
                        </span>
                      </td>)}
                  </tr>)}
              </tbody>
            </table>
          </div>
        </div>}

      {activeTool === "apparatus" && <div className="card">
          <h3 style={{ marginBottom: 16 }}>{t("Apparatus Criticus")}</h3>
          <div style={{ fontFamily: "'Noto Sans Devanagari', serif", fontSize: 18, marginBottom: 16, color: "var(--vt-text)" }}>
            {baseText}
          </div>
          <div style={{ background: "rgba(0,0,0,0.2)", borderRadius: 8, padding: 16, fontSize: 14, lineHeight: 2 }}>
            <div><strong style={{ color: "var(--sanskrit-gold)" }}>1</strong> अथ धर्मं A B : अथ धम्मं C</div>
            <div><strong style={{ color: "var(--sanskrit-gold)" }}>2</strong> ते च A B : तु C</div>
            <div><strong style={{ color: "var(--sanskrit-gold)" }}>3</strong> मया A C : तया B</div>
            <div><strong style={{ color: "var(--sanskrit-gold)" }}>4</strong> भवति A B C {t("(unanimous)")}</div>
          </div>
          <div style={{ marginTop: 16, fontSize: 12, color: "var(--vt-muted)" }}>
            {t("Sigla: A = MS 1 (15th CE), B = MS 2 (Grantha, 16th CE), C = MS 3 (17th CE)")}
          </div>
        </div>}

      {activeTool === "paleography" && <div className="grid-2" style={{ alignItems: "start" }}>
          <div className="card">
            <h3 style={{ marginBottom: 16 }}>{t("Script Comparison")}</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <div style={{ fontSize: 13, color: "var(--vt-muted)", marginBottom: 4 }}>{t("Devan\u0101gar\u012B (15th CE)")}</div>
                <div style={{
    fontFamily: "'Noto Sans Devanagari', serif",
    fontSize: 28,
    padding: 16,
    background: "rgba(255,255,255,0.03)",
    borderRadius: 8,
    color: "var(--vt-text)"
  }}>
                  अ थ ध र् मं व् या ख्य् आ स् या मः
                </div>
              </div>
              <div>
                <div style={{ fontSize: 13, color: "var(--vt-muted)", marginBottom: 4 }}>{t("Grantha (16th CE)")}</div>
                <div style={{
    fontFamily: "'Noto Sans Devanagari', serif",
    fontSize: 28,
    padding: 16,
    background: "rgba(255,255,255,0.03)",
    borderRadius: 8,
    fontStyle: "italic",
    color: "var(--vt-text)"
  }}>
                  𑌅 𑌥 𑌧𑌰𑍍𑌮𑌂 𑌵𑍍𑌯𑌾𑌕𑍍𑌯𑌾𑌸𑍍𑌯𑌾𑌮𑌃
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <h3 style={{ marginBottom: 16 }}>{t("Research Notes")}</h3>
            <textarea
    value={notes}
    onChange={(e) => setNotes(e.target.value)}
    placeholder={t("Paleographic observations, scribal hand notes, dating evidence...")}
    style={{
      width: "100%",
      minHeight: 200,
      background: "rgba(255,255,255,0.03)",
      color: "var(--vt-text)",
      border: "1px solid var(--vt-border)",
      borderRadius: 6,
      padding: 12,
      resize: "vertical",
      fontFamily: "'Noto Sans Devanagari', sans-serif"
    }}
  />
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 12 }}>
              <button className="btn btn-primary" onClick={handleSaveNotes}>{t("Save Notes")}</button>
              {savedStatus && <span style={{ color: "var(--vt-green)", fontSize: 13, fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 4 }}>
                  <Check size={14} />
                  <span>{t("Notes saved successfully!")}</span>
                </span>}
            </div>
          </div>
        </div>}
    </div>;
}
export {
  ResearchWorkspacePage as default
};
