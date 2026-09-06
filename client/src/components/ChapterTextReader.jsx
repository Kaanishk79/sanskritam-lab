import { useState, useEffect, useMemo } from "react";
import {
  Volume2,
  Copy,
  Check,
  Search,
  BookOpen,
  ZoomIn,
  ZoomOut,
  ExternalLink,
  Sparkles,
  AlertCircle
} from "lucide-react";
import { getChapterTextUrl, cleanChapterText } from "../data/ncertBooksTextIndex";
import { toIAST } from "../services/sanskrit";
import { speakWithFallback } from "../services/speech";
import { useLanguage } from "../context/LanguageContext";
import { useNavigate } from "react-router-dom";

export default function ChapterTextReader({ bookId, chapterNumber, bookTitle, chapterTitle }) {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fontSize, setFontSize] = useState(19); // px
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const [selectedWord, setSelectedWord] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const url = getChapterTextUrl(bookId, chapterNumber);

    if (!url) {
      setLoading(false);
      setError("Full chapter text not available for this book.");
      return;
    }

    setLoading(true);
    setError(null);
    setSelectedWord(null);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.text();
      })
      .then((raw) => {
        if (isMounted) {
          setText(cleanChapterText(raw));
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error("Failed to load chapter text:", err);
          setError("Unable to load chapter text from local server.");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [bookId, chapterNumber]);

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWordClick = (word) => {
    const cleanWord = word.replace(/[\u0964\u0965,.;:!?()[\]{}"'–—*०-९\d]/g, "").trim();
    if (!cleanWord || cleanWord.length < 1) return;
    setSelectedWord(cleanWord);
    speakWithFallback(cleanWord);
  };

  // Break text into paragraphs
  const paragraphs = useMemo(() => {
    if (!text) return [];
    return text.split("\n\n").filter((p) => p.trim().length > 0);
  }, [text]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {/* Control Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 10,
          padding: "8px 12px",
          background: "var(--bg-tertiary)",
          borderRadius: 8,
          border: "1px solid var(--border-color)"
        }}
      >
        {/* Search within chapter */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, flex: "1 1 200px", maxWidth: 300 }}>
          <Search size={14} style={{ opacity: 0.6 }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("Search in chapter…")}
            style={{
              width: "100%",
              padding: "4px 8px",
              fontSize: 12,
              background: "var(--bg-primary)",
              border: "1px solid var(--border-color)",
              borderRadius: 5,
              color: "inherit"
            }}
          />
        </div>

        {/* Font size & actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 2, background: "var(--bg-primary)", borderRadius: 6, padding: "2px 4px", border: "1px solid var(--border-color)" }}>
            <button
              className="btn btn-sm btn-ghost"
              onClick={() => setFontSize((f) => Math.max(14, f - 2))}
              style={{ padding: "2px 6px" }}
              title={t("Decrease text size")}
            >
              <ZoomOut size={13} />
            </button>
            <span style={{ fontSize: 11, minWidth: 28, textAlign: "center" }}>{fontSize}px</span>
            <button
              className="btn btn-sm btn-ghost"
              onClick={() => setFontSize((f) => Math.min(30, f + 2))}
              style={{ padding: "2px 6px" }}
              title={t("Increase text size")}
            >
              <ZoomIn size={13} />
            </button>
          </div>

          <button
            className="btn btn-sm btn-outline"
            onClick={handleCopy}
            style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, padding: "4px 8px" }}
            title={t("Copy chapter text")}
          >
            {copied ? <Check size={13} color="#2ecc71" /> : <Copy size={13} />}
            <span>{copied ? t("Copied") : t("Copy")}</span>
          </button>
        </div>
      </div>

      {/* Selected Word Quick Inspector Banner */}
      {selectedWord && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 14px",
            background: "rgba(230, 126, 34, 0.12)",
            border: "1px solid var(--vt-orange)",
            borderRadius: 8,
            animation: "fadeIn 0.2s ease"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 20, fontFamily: "'Noto Sans Devanagari', serif", fontWeight: 700 }}>
              {selectedWord}
            </span>
            <span style={{ fontSize: 13, opacity: 0.75, fontStyle: "italic" }}>
              [{toIAST(selectedWord)}]
            </span>
            <button
              className="btn btn-sm btn-ghost"
              onClick={() => speakWithFallback(selectedWord)}
              style={{ padding: "3px 6px" }}
              title={t("Pronounce")}
            >
              <Volume2 size={15} color="var(--vt-orange)" />
            </button>
          </div>

          <div style={{ display: "flex", gap: 6 }}>
            <button
              className="btn btn-sm btn-primary"
              onClick={() => navigate(`/explore/${encodeURIComponent(selectedWord)}`)}
              style={{ fontSize: 11, padding: "4px 10px" }}
            >
              <span>{t("Explore Word")}</span>
            </button>
            <button
              className="btn btn-sm btn-outline"
              onClick={() => setSelectedWord(null)}
              style={{ padding: "4px 8px", fontSize: 11 }}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Chapter Text Body */}
      {loading && (
        <div style={{ textAlign: "center", padding: "40px 0", opacity: 0.6 }}>
          <BookOpen size={28} style={{ margin: "0 auto 8px", animation: "spin 2s linear infinite" }} />
          <div>{t("Loading full Sanskrit chapter text…")}</div>
        </div>
      )}

      {error && (
        <div style={{ padding: "24px 16px", textAlign: "center", color: "#e67e22", background: "var(--bg-tertiary)", borderRadius: 8 }}>
          <AlertCircle size={24} style={{ margin: "0 auto 8px" }} />
          <div style={{ fontSize: 13 }}>{error}</div>
        </div>
      )}

      {!loading && !error && (
        <div
          style={{
            maxHeight: "60vh",
            overflowY: "auto",
            padding: "20px 24px",
            background: "var(--bg-primary)",
            borderRadius: 10,
            border: "1px solid var(--border-color)",
            lineHeight: 2.1,
            fontSize: `${fontSize}px`,
            fontFamily: "'Noto Sans Devanagari', 'Noto Serif Devanagari', 'Nirmala UI', sans-serif",
            textRendering: "optimizeLegibility",
            WebkitFontSmoothing: "antialiased"
          }}
        >
          {paragraphs.map((para, pIdx) => {
            const trimmed = para.trim();
            const isHeading =
              /^[१२३४५६७८९०\d]+[\.\)]/.test(trimmed) ||
              /^\([१२३४५६७८९०\d]+\)/.test(trimmed) ||
              trimmed.startsWith("प्रथमः पाठः") ||
              trimmed.startsWith("द्वितीयः पाठः") ||
              trimmed.startsWith("तृतीयः पाठः") ||
              trimmed.startsWith("चतुर्थः पाठः") ||
              trimmed.startsWith("पञ्चमः पाठः") ||
              trimmed.startsWith("अभ्यासः") ||
              trimmed.length < 35 && !trimmed.includes("।");

            const isVerse =
              (trimmed.includes("॥") || (trimmed.includes("।") && trimmed.split("\n").length >= 2)) &&
              !isHeading;

            if (isHeading) {
              return (
                <div
                  key={pIdx}
                  style={{
                    margin: "20px 0 10px 0",
                    fontWeight: 700,
                    color: "var(--sanskrit-gold)",
                    fontSize: `${fontSize * 1.15}px`,
                    borderBottom: "1px solid rgba(201, 168, 76, 0.25)",
                    paddingBottom: 6
                  }}
                >
                  {trimmed}
                </div>
              );
            }

            if (isVerse) {
              const lines = trimmed.split("\n");
              return (
                <div
                  key={pIdx}
                  style={{
                    margin: "18px 0",
                    padding: "14px 20px",
                    background: "rgba(201, 168, 76, 0.05)",
                    borderLeft: "3px solid var(--sanskrit-gold)",
                    borderRadius: "0 8px 8px 0",
                    textAlign: "center",
                    lineHeight: 2.2,
                    fontStyle: "italic"
                  }}
                >
                  {lines.map((line, lIdx) => (
                    <div key={lIdx}>
                      {line.split(" ").map((w, wIdx) => {
                        const isHighlighted = searchQuery && w.toLowerCase().includes(searchQuery.toLowerCase());
                        return (
                          <span
                            key={wIdx}
                            onClick={() => handleWordClick(w)}
                            style={{
                              cursor: "pointer",
                              padding: "1px 3px",
                              borderRadius: 4,
                              background: isHighlighted ? "rgba(241, 196, 15, 0.4)" : "transparent",
                              transition: "background 0.15s ease"
                            }}
                            onMouseEnter={(e) => {
                              if (!isHighlighted) e.currentTarget.style.background = "var(--bg-secondary)";
                            }}
                            onMouseLeave={(e) => {
                              if (!isHighlighted) e.currentTarget.style.background = "transparent";
                            }}
                            title={t("Click to listen & inspect")}
                          >
                            {w}{" "}
                          </span>
                        );
                      })}
                    </div>
                  ))}
                </div>
              );
            }

            // Standard prose paragraph
            const words = trimmed.split(/\s+/);
            return (
              <p
                key={pIdx}
                style={{
                  margin: "0 0 18px 0",
                  textAlign: "justify",
                  textJustify: "inter-word"
                }}
              >
                {words.map((w, wIdx) => {
                  const isHighlighted = searchQuery && w.toLowerCase().includes(searchQuery.toLowerCase());
                  return (
                    <span
                      key={wIdx}
                      onClick={() => handleWordClick(w)}
                      style={{
                        cursor: "pointer",
                        padding: "1px 2px",
                        borderRadius: 3,
                        background: isHighlighted ? "rgba(241, 196, 15, 0.4)" : "transparent",
                        transition: "background 0.15s ease"
                      }}
                      onMouseEnter={(e) => {
                        if (!isHighlighted) e.currentTarget.style.background = "var(--bg-secondary)";
                      }}
                      onMouseLeave={(e) => {
                        if (!isHighlighted) e.currentTarget.style.background = "transparent";
                      }}
                      title={t("Click to listen & inspect")}
                    >
                      {w}{" "}
                    </span>
                  );
                })}
              </p>
            );
          })}
        </div>
      )}

      <div style={{ fontSize: 11, opacity: 0.6, display: "flex", justifyContent: "space-between" }}>
        <span>💡 {t("Tip: Click on any Sanskrit word to hear its pronunciation and look up its root/meaning.")}</span>
        <span>{paragraphs.length} {t("sections")}</span>
      </div>
    </div>
  );
}
