import { useState, useEffect } from "react";
import { Scroll, Volume2, Sparkles } from "lucide-react";
import { readingPassages } from "../../data/languageLab";
import { SHLOKAS } from "../../data/shlokas";
import { loadShlokaPassages, loadShlokas } from "../../services/contentDb";
import ExplorePanel from "../../components/ExplorePanel";
import { speakWithFallback } from "../../services/speech";
import { useLanguage } from "../../context/LanguageContext";
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
  const clickWord = (w) => setExploreWord(w);
  const dayVerse = verses[Math.floor(Date.now() / 864e5) % verses.length];
  return <div className="page-container">
      <div className="page-header">
        <h2>{t("Shloka / Verse Explorer")}</h2>
        <p>{t("Classical verses with translation alongside \u2014 click any word to see its meaning.")}</p>
      </div>

      <h3 style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Scroll size={18} /> <span>{t("Classical passages")}</span>
      </h3>
      {passages.map((p) => <div key={p.id} className="card" style={{ padding: 20, marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
            <strong>{p.titleSanskrit} <span style={{ color: "var(--vt-muted)", fontWeight: 400 }}>· {p.title}</span></strong>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn btn-sm btn-outline" onClick={() => speakWithFallback(p.text)}>
                <Volume2 size={13} />
              </button>
              <button className="btn btn-sm btn-outline" onClick={() => setOpenPassage(openPassage === p.id ? null : p.id)}>
                {openPassage === p.id ? t("Hide translation") : t("Show translation")}
              </button>
            </div>
          </div>
          <p style={{ fontSize: 20, lineHeight: 2, margin: "10px 0", cursor: "pointer" }}>
            {p.text.split(" ").map((w, i) => <span key={i}>
                <button className="explore-word" onClick={() => clickWord(w)}>{w}</button>{" "}
              </span>)}
          </p>
          {openPassage === p.id && <div style={{ borderTop: "1px solid var(--vt-border)", paddingTop: 12 }}>
              <div style={{ color: "var(--vt-muted)", fontStyle: "italic" }}>{p.transliteration}</div>
              <div style={{ color: "var(--vt-text)", marginTop: 6 }}>{hi ? p.translationHi ?? p.translation : p.translation}</div>
              <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 6 }}>
                {p.words.slice(0, 10).map((w) => <span key={w.word} className="chip">{w.word} <span style={{ color: "var(--vt-muted)" }}>= {hi ? w.meaningHi ?? w.meaning : w.meaning}</span></span>)}
              </div>
            </div>}
        </div>)}

      <h3 style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 8 }}>
        <Sparkles size={18} /> <span>{t("Verse of the day")}</span>
      </h3>
      <div className="card" style={{ padding: 16, maxWidth: 640, border: "2px solid rgba(255,152,0,0.4)", background: "rgba(255,152,0,0.06)" }}>
        <div style={{ fontSize: 18, lineHeight: 1.8 }}>
          {dayVerse.dev.split(" ").map((w, j) => <span key={j}>
              <button className="explore-word" onClick={() => clickWord(w)}>{w}</button>{" "}
            </span>)}
        </div>
        <div style={{ color: "var(--vt-muted)", fontSize: 12, fontStyle: "italic", marginTop: 4 }}>{dayVerse.iast}</div>
        <div style={{ color: "var(--vt-text)", fontSize: 13, marginTop: 4 }}>{lang === "hi" && dayVerse.translationHi ? dayVerse.translationHi : dayVerse.translation}</div>
        <div style={{ color: "var(--vt-muted)", fontSize: 11, marginTop: 2 }}>{dayVerse.source}</div>
        <button className="btn btn-sm btn-outline" style={{ marginTop: 10, display: "inline-flex", alignItems: "center", gap: 6 }} onClick={() => speakWithFallback(dayVerse.dev)}>
          <Volume2 size={13} /> <span>{t("Hear it")}</span>
        </button>
      </div>

      {exploreWord && <ExplorePanel word={exploreWord} onClose={() => setExploreWord(null)} />}
    </div>;
}
export {
  ShlokaPage as default
};
