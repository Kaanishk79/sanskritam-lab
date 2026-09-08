import { useState } from "react";
import {
  FileText,
  Download,
  Eye,
  CheckCircle2,
  Clock,
  Award,
  Printer,
  Maximize2,
  Minimize2,
  X,
  ExternalLink,
  Sparkles
} from "lucide-react";
import { samplePapersCatalog } from "../../data/samplePapers";
import { useLanguage } from "../../context/LanguageContext";

export default function SamplePapersPage() {
  const { t } = useLanguage();
  const [selectedClass, setSelectedClass] = useState(6);
  const [selectedSetIndex, setSelectedSetIndex] = useState(0); // 0: Set 1, 1: Set 2, 2: Set 3, -1: Master
  const [modalMode, setModalMode] = useState(null); // 'qp' | 'ms' | null
  const [modalFullscreen, setModalFullscreen] = useState(false);
  const [previewDocType, setPreviewDocType] = useState("qp"); // 'qp' | 'ms'

  const currentClassData = samplePapersCatalog.find((c) => c.classNum === selectedClass) || samplePapersCatalog[0];
  const isMasterSet = selectedSetIndex === -1;
  const currentSet = isMasterSet
    ? {
        setName: "Master Paper (Comprehensive)",
        setNameSanskrit: "सम्पूर्ण प्रतिदर्श-प्रश्नपत्रम्",
        ...currentClassData.generalSet
      }
    : currentClassData.sets[selectedSetIndex] || currentClassData.sets[0];

  const openViewer = (mode) => {
    setModalMode(mode);
  };

  const closeViewer = () => {
    setModalMode(null);
    setModalFullscreen(false);
  };

  const activeViewerUrl = modalMode === "qp" ? currentSet.questionPaperHtml : currentSet.markingSchemeHtml;
  const activePreviewUrl = previewDocType === "qp" ? currentSet.questionPaperHtml : currentSet.markingSchemeHtml;

  return (
    <div className="page-container" style={{ maxWidth: 1200, margin: "0 auto", padding: "20px 24px" }}>
      {/* Header */}
      <div className="page-header" style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <span style={{ fontSize: 28 }}>📜</span>
          <h2 style={{ margin: 0, fontSize: 26, fontWeight: 700 }}>
            {t("Sanskrit Annual Examination Sample Papers (२०२६-२७)")}
          </h2>
        </div>
        <p className="page-subtitle" style={{ fontSize: 14, opacity: 0.75, margin: 0 }}>
          {t("Official CBSE & NCERT pattern 80-marks model question papers, blueprints, and detailed marking schemes for Classes 6 to 9.")}
        </p>
      </div>

      {/* Class Switcher */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        {samplePapersCatalog.map((item) => {
          const isSelected = item.classNum === selectedClass;
          return (
            <button
              key={item.classNum}
              onClick={() => {
                setSelectedClass(item.classNum);
                setSelectedSetIndex(0);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 18px",
                borderRadius: 10,
                border: isSelected ? `2px solid ${item.badgeColor}` : "1px solid var(--border-color)",
                background: isSelected ? `${item.badgeColor}18` : "var(--bg-secondary)",
                color: isSelected ? "var(--vt-text)" : "var(--vt-text-light)",
                cursor: "pointer",
                fontWeight: isSelected ? 700 : 500,
                transition: "all 0.2s ease"
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: item.badgeColor
                }}
              />
              <span style={{ fontSize: 15 }}>{item.className}</span>
              <span style={{ fontSize: 12, opacity: 0.6 }}>({item.classNameSanskrit})</span>
            </button>
          );
        })}
      </div>

      {/* Main Grid: Blueprint & Actions */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24, marginBottom: 24 }}>
        {/* Left Column: Paper Overview & Set Selection */}
        <div className="card" style={{ padding: 22, display: "flex", flexDirection: "column", gap: 18, background: "var(--bg-secondary)", border: "1px solid var(--border-color)", borderRadius: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8, color: currentClassData.badgeColor }}>
                {currentClassData.className} · {currentClassData.bookTitle}
              </span>
              <h3 style={{ margin: "4px 0 0 0", fontSize: 20 }}>
                {currentClassData.bookTitleSanskrit}
              </h3>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <span className="chip" style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "var(--bg-tertiary)", padding: "4px 10px", borderRadius: 6, fontSize: 12 }}>
                <Award size={13} color="var(--sanskrit-gold)" />
                <span>{currentClassData.totalMarks} {t("Marks")}</span>
              </span>
              <span className="chip" style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "var(--bg-tertiary)", padding: "4px 10px", borderRadius: 6, fontSize: 12 }}>
                <Clock size={13} color="#3498db" />
                <span>{currentClassData.durationHours} {t("Hours")}</span>
              </span>
            </div>
          </div>

          {/* Set Selector Tabs */}
          <div>
            <div style={{ fontSize: 12, opacity: 0.6, marginBottom: 8, fontWeight: 600 }}>
              {t("Select Examination Set:")}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
              {currentClassData.sets.map((s, idx) => (
                <button
                  key={s.setId}
                  onClick={() => setSelectedSetIndex(idx)}
                  className={`btn ${selectedSetIndex === idx ? "btn-primary" : "btn-outline"}`}
                  style={{
                    padding: "8px 0",
                    fontSize: 13,
                    fontWeight: selectedSetIndex === idx ? 700 : 500,
                    textAlign: "center"
                  }}
                >
                  {s.setName}
                </button>
              ))}
              <button
                onClick={() => setSelectedSetIndex(-1)}
                className={`btn ${selectedSetIndex === -1 ? "btn-primary" : "btn-outline"}`}
                style={{
                  padding: "8px 0",
                  fontSize: 12,
                  fontWeight: selectedSetIndex === -1 ? 700 : 500,
                  textAlign: "center"
                }}
              >
                {t("Master")}
              </button>
            </div>
          </div>

          {/* Section Blueprint Breakdown */}
          <div style={{ background: "var(--bg-tertiary)", borderRadius: 10, padding: 14, border: "1px solid var(--border-color)" }}>
            <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 10, opacity: 0.8 }}>
              📑 {t("Question Paper Blueprint (अङ्कविभाजनम्)")}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
              {currentClassData.sections.map((sec) => (
                <div key={sec.code} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, padding: "6px 10px", background: "var(--bg-primary)", borderRadius: 6 }}>
                  <div>
                    <strong style={{ color: "var(--sanskrit-gold)", marginRight: 6 }}>खण्ड '{sec.code}'</strong>
                    <span style={{ opacity: 0.85 }}>{sec.name}</span>
                  </div>
                  <strong style={{ fontSize: 12 }}>{sec.marks}M</strong>
                </div>
              ))}
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: "auto" }}>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                className="btn btn-primary"
                onClick={() => openViewer("qp")}
                style={{ flex: 1, padding: "11px 16px", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: 14, fontWeight: 600 }}
              >
                <Eye size={16} />
                <span>{t("Interactive Question Paper")}</span>
              </button>

              <button
                className="btn btn-outline"
                onClick={() => openViewer("ms")}
                style={{ flex: 1, padding: "11px 16px", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: 14, fontWeight: 600 }}
              >
                <CheckCircle2 size={16} color="#2ecc71" />
                <span>{t("Marking Scheme")}</span>
              </button>
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <a
                href={currentSet.questionPaperPdf}
                download
                className="btn btn-outline"
                style={{ flex: 1, minWidth: 140, fontSize: 12, padding: "8px 10px", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6 }}
              >
                <Download size={13} />
                <span>{t("Paper PDF (4 Pages)")}</span>
              </a>

              <a
                href={currentSet.markingSchemePdf}
                download
                className="btn btn-outline"
                style={{ flex: 1, minWidth: 140, fontSize: 12, padding: "8px 10px", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6 }}
              >
                <Download size={13} />
                <span>{t("Scheme PDF (2 Pages)")}</span>
              </a>

              {currentSet.completeMasterPdf && (
                <a
                  href={currentSet.completeMasterPdf}
                  download
                  className="btn btn-outline"
                  style={{ flex: 1, minWidth: 140, fontSize: 12, padding: "8px 10px", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6 }}
                >
                  <Download size={13} />
                  <span>{t("Master Paper (6 Pages)")}</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Visual Preview Live Card */}
        <div className="card" style={{ padding: 20, display: "flex", flexDirection: "column", background: "var(--bg-secondary)", border: "1px solid var(--border-color)", borderRadius: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Sparkles size={16} color="var(--sanskrit-gold)" />
              <span style={{ fontWeight: 600, fontSize: 14 }}>{t("Live Document Preview")}</span>
            </div>

            {/* QP vs MS preview toggle */}
            <div style={{ display: "inline-flex", background: "var(--bg-tertiary)", borderRadius: 8, padding: 3, border: "1px solid var(--border-color)" }}>
              <button
                type="button"
                onClick={() => setPreviewDocType("qp")}
                style={{
                  padding: "4px 10px",
                  fontSize: 12,
                  fontWeight: 600,
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                  background: previewDocType === "qp" ? "var(--vt-orange)" : "transparent",
                  color: previewDocType === "qp" ? "#ffffff" : "var(--vt-text-light)",
                  transition: "all 0.2s"
                }}
              >
                {t("Question Paper")}
              </button>
              <button
                type="button"
                onClick={() => setPreviewDocType("ms")}
                style={{
                  padding: "4px 10px",
                  fontSize: 12,
                  fontWeight: 600,
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                  background: previewDocType === "ms" ? "var(--vt-orange)" : "transparent",
                  color: previewDocType === "ms" ? "#ffffff" : "var(--vt-text-light)",
                  transition: "all 0.2s"
                }}
              >
                {t("Marking Scheme")}
              </button>
            </div>
          </div>

          <div
            style={{
              flex: 1,
              minHeight: 480,
              background: "#ffffff",
              borderRadius: 8,
              overflow: "hidden",
              border: "1px solid var(--border-color)",
              position: "relative",
              boxShadow: "0 4px 16px rgba(0,0,0,0.12)"
            }}
          >
            {activePreviewUrl ? (
              <iframe
                key={`${selectedClass}-${selectedSetIndex}-${previewDocType}`}
                src={activePreviewUrl}
                title={`${currentClassData.className} ${currentSet.setName} Preview`}
                style={{
                  width: "100%",
                  height: "100%",
                  minHeight: 480,
                  border: "none",
                  background: "#ffffff"
                }}
              />
            ) : (
              <div style={{ textAlign: "center", opacity: 0.5, padding: 40, color: "var(--text-secondary)" }}>
                <FileText size={48} style={{ margin: "0 auto 12px" }} />
                <div>{t("Preview available inside interactive viewer")}</div>
              </div>
            )}
          </div>

          <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, flexWrap: "wrap", gap: 8 }}>
            <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>
              {currentSet.setNameSanskrit || currentSet.setName} ({previewDocType === "qp" ? t("Question Paper") : t("Marking Scheme")})
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button
                type="button"
                onClick={() => openViewer(previewDocType)}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--sanskrit-gold, #f59e0b)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  fontSize: 12,
                  fontWeight: 600,
                  padding: 0
                }}
              >
                <Maximize2 size={13} />
                <span>{t("Fullscreen Reader")}</span>
              </button>
              <a
                href={activePreviewUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  fontSize: 12,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  color: "var(--vt-orange, #e67e22)",
                  textDecoration: "none",
                  fontWeight: 600
                }}
              >
                <span>{t("Open tab")}</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Modal Viewer */}
      {modalMode && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(6px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: modalFullscreen ? 0 : 24
          }}
        >
          <div
            style={{
              width: modalFullscreen ? "100vw" : "92vw",
              maxWidth: modalFullscreen ? "100vw" : 1100,
              height: modalFullscreen ? "100vh" : "90vh",
              background: "var(--bg-primary)",
              borderRadius: modalFullscreen ? 0 : 12,
              border: "1px solid var(--border-color)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 18px",
                background: "var(--bg-secondary)",
                borderBottom: "1px solid var(--border-color)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <strong style={{ fontSize: 15 }}>
                  {currentClassData.className} {currentSet.setName} —{" "}
                  {modalMode === "qp" ? t("Question Paper (प्रश्नपत्रम्)") : t("Marking Scheme & Solutions (उत्तरकुञ्चिका)")}
                </strong>

                {/* Mode Switcher inside modal */}
                <div style={{ display: "inline-flex", background: "var(--bg-tertiary)", borderRadius: 6, padding: 2 }}>
                  <button
                    onClick={() => setModalMode("qp")}
                    style={{
                      border: "none",
                      background: modalMode === "qp" ? "var(--bg-primary)" : "transparent",
                      color: modalMode === "qp" ? "var(--vt-orange)" : "inherit",
                      padding: "4px 10px",
                      borderRadius: 4,
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer"
                    }}
                  >
                    {t("Question Paper")}
                  </button>
                  <button
                    onClick={() => setModalMode("ms")}
                    style={{
                      border: "none",
                      background: modalMode === "ms" ? "var(--bg-primary)" : "transparent",
                      color: modalMode === "ms" ? "#2ecc71" : "inherit",
                      padding: "4px 10px",
                      borderRadius: 4,
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer"
                    }}
                  >
                    {t("Marking Scheme")}
                  </button>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <a
                  href={modalMode === "qp" ? currentSet.questionPaperPdf : currentSet.markingSchemePdf}
                  download
                  className="btn btn-outline"
                  style={{ fontSize: 12, padding: "5px 10px", display: "inline-flex", alignItems: "center", gap: 4 }}
                  title={t("Download as PDF")}
                >
                  <Download size={13} />
                  <span>{t("PDF")}</span>
                </a>

                <button
                  className="btn btn-outline"
                  onClick={() => {
                    const iframe = document.getElementById("sample-paper-iframe");
                    if (iframe && iframe.contentWindow) {
                      iframe.contentWindow.print();
                    }
                  }}
                  style={{ fontSize: 12, padding: "5px 10px", display: "inline-flex", alignItems: "center", gap: 4 }}
                  title={t("Print this paper")}
                >
                  <Printer size={13} />
                  <span>{t("Print")}</span>
                </button>

                <button
                  className="btn btn-outline"
                  onClick={() => setModalFullscreen(!modalFullscreen)}
                  style={{ fontSize: 12, padding: "5px 8px" }}
                  title={modalFullscreen ? t("Exit Fullscreen") : t("Fullscreen")}
                >
                  {modalFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                </button>

                <button
                  className="btn btn-outline"
                  onClick={closeViewer}
                  style={{ fontSize: 12, padding: "5px 8px" }}
                  title={t("Close")}
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Iframe View with A4 Sheet Presentation */}
            <div
              style={{
                flex: 1,
                background: "var(--vt-bg, #0b0f19)",
                padding: modalFullscreen ? "8px 0" : "16px 20px",
                display: "flex",
                justifyContent: "center",
                overflowY: "auto"
              }}
            >
              <div
                style={{
                  width: "100%",
                  maxWidth: modalFullscreen ? 1020 : 880,
                  height: "100%",
                  background: "#ffffff",
                  borderRadius: modalFullscreen ? 0 : 8,
                  overflow: "hidden",
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.4)",
                  border: "1px solid rgba(255, 255, 255, 0.1)"
                }}
              >
                <iframe
                  id="sample-paper-iframe"
                  src={activeViewerUrl}
                  title="Sanskrit Sample Paper View"
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "none"
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
