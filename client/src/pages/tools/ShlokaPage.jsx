import { useState, useEffect } from "react";
import { Scroll, Volume2, Sparkles, BookOpen } from "lucide-react";
import { readingPassages } from "../../data/languageLab";
import { SHLOKAS } from "../../data/shlokas";
import { loadShlokaPassages, loadShlokas } from "../../services/contentDb";
import ExplorePanel from "../../components/ExplorePanel";
import { speakWithFallback } from "../../services/speech";
import { useLanguage } from "../../context/LanguageContext";
import ShlokaRecitationSection from "../../components/ShlokaRecitationSection";

function ShlokaPage() {
  const { t, lang } = useLanguage();
  const hi = lang === "hi";
  const [passages, setPassages] = useState(readingPassages);
  const [verses, setVerses] = useState(SHLOKAS);
  const [openPassage, setOpenPassage] = useState(null);
  const [exploreWord, setExploreWord] = useState(null);

  useEffect(() => {
    let live = true;
    loadShlokaPassages().then((rows) => {
      if (live) setPassages(rows);
    });
    loadShlokas().then((rows) => {
      if (live) setVerses(rows);
    });
    return () => {
      live = false;
    };
  }, []);

  useEffect(() => {
    const handler = (e) => setExploreWord(e.detail);
    window.addEventListener("sanskritlab:explore", handler);
    return () => window.removeEventListener("sanskritlab:explore", handler);
  }, []);

  const clickWord = (w) => {
    const clean = w.replace(/[।॥,.\-?!:;]/g, "").trim();
    if (clean) setExploreWord(clean);
  };

  const dayVerse = verses[Math.floor(Date.now() / 864e5) % verses.length] || SHLOKAS[0];

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>{t("Shloka & Verse Recitation Sanctuary")}</h2>
        <p>
          {t(
            "Classical verses with transliteration, word analysis, and authentic recitation controls — click any word to inspect its meaning."
          )}
        </p>
      </div>

      {/* Verse of the Day Card */}
      <div
        className="card"
        style={{
          padding: 24,
          marginBottom: 32,
          border: "2px solid rgba(255,106,0,0.35)",
          background: "linear-gradient(135deg, rgba(255,106,0,0.06) 0%, rgba(63,81,181,0.05) 100%)",
          borderRadius: "var(--vt-radius)"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <Sparkles size={18} color="var(--vt-orange)" />
          <strong style={{ fontSize: 15, color: "var(--vt-orange)" }}>
            {t("Verse of the Day")}
          </strong>
          <span className="chip" style={{ marginLeft: "auto", fontSize: 11 }}>
            {dayVerse.source}
          </span>
        </div>
        <div style={{ fontSize: 20, lineHeight: 1.9, fontWeight: 600, color: "var(--vt-text)" }}>
          {dayVerse.dev.split(" ").map((w, j) => (
            <span key={j}>
              <button className="explore-word" onClick={() => clickWord(w)}>
                {w}
              </button>{" "}
            </span>
          ))}
        </div>
        <div style={{ color: "var(--vt-muted)", fontSize: 13, fontStyle: "italic", marginTop: 8 }}>
          {dayVerse.iast}
        </div>
        <div style={{ color: "var(--vt-text)", fontSize: 14, marginTop: 8, lineHeight: 1.6 }}>
          {lang === "hi" && dayVerse.translationHi ? dayVerse.translationHi : dayVerse.translation}
        </div>
        <button
          className="btn btn-sm btn-outline"
          style={{ marginTop: 14, display: "inline-flex", alignItems: "center", gap: 6 }}
          onClick={() => speakWithFallback(dayVerse.dev)}
        >
          <Volume2 size={14} /> <span>{t("Listen aloud")}</span>
        </button>
      </div>

      {/* Main Recitation Library */}
      <ShlokaRecitationSection onExploreWord={(w) => clickWord(w)} />

      {/* Classical Prose Passages */}
      <div style={{ marginTop: 48 }}>
        <h3 style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
          <Scroll size={20} /> <span>{t("Classical Reading Passages")}</span>
        </h3>
        {passages.map((p) => (
          <div key={p.id} className="card" style={{ padding: 22, marginBottom: 16 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 8
              }}
            >
              <strong>
                {p.titleSanskrit}{" "}
                <span style={{ color: "var(--vt-muted)", fontWeight: 400 }}>· {p.title}</span>
              </strong>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  className="btn btn-sm btn-outline"
                  onClick={() => speakWithFallback(p.text)}
                  title={t("Hear passage")}
                >
                  <Volume2 size={14} />
                </button>
                <button
                  className="btn btn-sm btn-outline"
                  onClick={() => setOpenPassage(openPassage === p.id ? null : p.id)}
                >
                  {openPassage === p.id ? t("Hide translation") : t("Show translation")}
                </button>
              </div>
            </div>
            <p style={{ fontSize: 19, lineHeight: 2, margin: "14px 0", cursor: "pointer" }}>
              {p.text.split(" ").map((w, i) => (
                <span key={i}>
                  <button className="explore-word" onClick={() => clickWord(w)}>
                    {w}
                  </button>{" "}
                </span>
              ))}
            </p>
            {openPassage === p.id && (
              <div style={{ borderTop: "1px solid var(--vt-border)", paddingTop: 14 }}>
                <div style={{ color: "var(--vt-muted)", fontStyle: "italic", fontSize: 13.5 }}>
                  {p.transliteration}
                </div>
                <div style={{ color: "var(--vt-text)", marginTop: 8, fontSize: 14 }}>
                  {hi ? p.translationHi ?? p.translation : p.translation}
                </div>
                <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {p.words.slice(0, 10).map((w) => (
                    <span key={w.word} className="chip">
                      {w.word}{" "}
                      <span style={{ color: "var(--vt-muted)" }}>
                        = {hi ? w.meaningHi ?? w.meaning : w.meaning}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {exploreWord && <ExplorePanel word={exploreWord} onClose={() => setExploreWord(null)} />}
    </div>
  );
}

export default ShlokaPage;
