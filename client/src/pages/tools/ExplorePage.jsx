import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Search, Compass } from "lucide-react";
import ExplorePanel from "../../components/ExplorePanel";
import { useLanguage } from "../../context/LanguageContext";
const SAMPLE_VERSE = "\u0938\u0924\u094D\u092F\u092E\u0947\u0935 \u091C\u092F\u0924\u0947 \u0928\u093E\u0928\u0943\u0924\u092E\u094D";
const SAMPLE_WORDS = ["\u0930\u093E\u092E", "\u0938\u0940\u0924\u093E", "\u0915\u0943\u0937\u094D\u0923", "\u0935\u093F\u0926\u094D\u092F\u093E", "\u0917\u0941\u0930\u0941", "\u0905\u0917\u094D\u0928\u093F", "\u0907\u0928\u094D\u0926\u094D\u0930", "\u092E\u093E\u0924\u093E", "\u092A\u093F\u0924\u093E"];
function ExplorePage() {
  const { t, lang } = useLanguage();
  const { word: routeWord } = useParams();
  const navigate = useNavigate();
  const [word, setWord] = useState(routeWord ? decodeURIComponent(routeWord) : "");
  const [input, setInput] = useState("");
  useEffect(() => {
    const handler = (e) => {
      const w = e.detail;
      setWord(w);
      navigate(`/explore/${encodeURIComponent(w)}`, { replace: true });
    };
    window.addEventListener("sanskritlab:explore", handler);
    return () => window.removeEventListener("sanskritlab:explore", handler);
  }, [navigate]);
  useEffect(() => {
    if (routeWord) setWord(decodeURIComponent(routeWord));
  }, [routeWord]);
  const submit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setWord(input.trim());
      navigate(`/explore/${encodeURIComponent(input.trim())}`, { replace: true });
    }
  };
  return <div className="page-container">
      <div className="page-header">
        <h2>{t("Explore Mode")}</h2>
        <p>{t("Click any Sanskrit word to see its meaning, grammar, pronunciation, related words and where it appears in texts.")}</p>
      </div>

      <form onSubmit={submit} className="form-group" style={{ display: "flex", gap: 8, maxWidth: 560 }}>
        <input
    value={input}
    onChange={(e) => setInput(e.target.value)}
    placeholder={lang === "hi" ? "\u0930\u093E\u092E / r\u0101ma / \u0915\u093F\u0938\u0940 \u092A\u093E\u0920 \u0938\u0947 \u0936\u092C\u094D\u0926\u2026" : "\u0930\u093E\u092E / r\u0101ma / a word from a text\u2026"}
    style={{ flex: 1 }}
  />
        <button type="submit" className="btn btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <Search size={15} /> <span>{t("Explore")}</span>
        </button>
      </form>

      <div style={{ margin: "16px 0", display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <span style={{ color: "#888" }}>{t("Try:")}</span>
        {SAMPLE_WORDS.map((w) => <button key={w} className="btn btn-sm btn-outline" onClick={() => {
    setWord(w);
    setInput("");
    navigate(`/explore/${encodeURIComponent(w)}`, { replace: true });
  }}>
            {w}
          </button>)}
      </div>

      {!word && <div className="card" style={{ padding: 24, maxWidth: 560 }}>
          <h3 style={{ marginTop: 0, display: "flex", alignItems: "center", gap: 8 }}>
            <Compass size={18} color="var(--vt-orange)" /> <span>{t("Try the clickable verse")}</span>
          </h3>
          <p style={{ fontSize: 22, margin: "12px 0", lineHeight: 2 }}>
            {SAMPLE_VERSE.split(" ").map((w, i) => <span key={i}>
                <button
    className="explore-word"
    onClick={() => {
      setWord(w);
      navigate(`/explore/${encodeURIComponent(w)}`, { replace: true });
    }}
    title={t("Click to explore")}
  >{w}</button>{" "}
              </span>)}
          </p>
          <p style={{ color: "#888", fontSize: 13 }}>
            {t("Every underlined word in this app can be clicked to open its full Explore panel.")}
          </p>
        </div>}

      {word && <ExplorePanel word={word} onClose={() => navigate("/explore", { replace: true })} />}
    </div>;
}
export {
  ExplorePage as default
};
