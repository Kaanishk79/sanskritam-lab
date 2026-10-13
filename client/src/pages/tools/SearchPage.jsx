import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  BookMarked,
  Scroll,
  FolderArchive,
  Sparkles,
  Sprout,
  Compass,
  Search,
  ArrowRight,
  Filter
} from "lucide-react";
import { searchAll } from "../../services/sanskrit";
import { useLanguage } from "../../context/LanguageContext";

const KIND_ICON = {
  dictionary: <BookOpen size={20} color="var(--vt-orange)" />,
  lesson: <BookMarked size={20} color="var(--vt-blue)" />,
  text: <Scroll size={20} color="var(--vt-gold)" />,
  shloka: <Sparkles size={20} color="#e11d48" />,
  dhatu: <Sprout size={20} color="#16a34a" />,
  concept: <Compass size={20} color="#7c3aed" />,
  corpus: <FolderArchive size={20} color="#2ecc71" />
};

const KIND_LABEL = {
  dictionary: "Dictionary",
  lesson: "Lesson",
  text: "Text",
  shloka: "Shloka",
  dhatu: "Dhātu Root",
  concept: "Concept",
  corpus: "Corpus"
};

const SAMPLE_SEARCHES = [
  "राम",
  "विद्या",
  "गीता",
  "अग्नि",
  "शान्ति",
  "योग",
  "कर्म",
  "dhatu",
  "sandhi"
];

const CATEGORIES = [
  { id: "all", label: "All", labelHi: "सर्वाणि" },
  { id: "dictionary", label: "Dictionary", labelHi: "शब्दकोषः" },
  { id: "lesson", label: "Lessons", labelHi: "पाठाः" },
  { id: "shloka", label: "Shlokas", labelHi: "श्लोकाः" },
  { id: "text", label: "Texts", labelHi: "ग्रन्थाः" },
  { id: "dhatu", label: "Dhātus", labelHi: "धातवः" },
  { id: "concept", label: "Concepts", labelHi: "सङ्कल्पाः" }
];

function SearchPage() {
  const { t, lang } = useLanguage();
  const hi = lang === "hi";
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("all");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const timer = useRef(0);

  useEffect(() => {
    const query = q.trim();
    if (!query) {
      setResults([]);
      return;
    }
    setLoading(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(async () => {
      try {
        const hits = await searchAll(query, 24);
        setResults(hits);
      } catch (err) {
        console.error("Search failed:", err);
      } finally {
        setLoading(false);
      }
    }, 200);
    return () => window.clearTimeout(timer.current);
  }, [q]);

  const filteredResults = category === "all"
    ? results
    : results.filter((r) => r.kind === category);

  const open = (r) => {
    if (r.kind === "dictionary") navigate(`/explore/${encodeURIComponent(r.id || r.title)}`);
    else if (r.kind === "lesson") navigate(`/learning/lesson/${r.id}`);
    else if (r.kind === "shloka") navigate("/#shlokas");
    else if (r.kind === "dhatu") navigate("/tools/dhatu");
    else if (r.kind === "concept") navigate("/tools/concepts");
    else if (r.kind === "text") navigate("/tools/bookshelf");
    else navigate("/research/corpus");
  };

  return (
    <div className="page-container" style={{ textAlign: "center" }}>
      <div className="page-header" style={{ maxWidth: 760, margin: "0 auto 28px" }}>
        <h2>
          <Search size={26} color="var(--vt-orange)" />
          <span>{hi ? "संस्कृत खोज — सर्वाङ्गीण अनुसन्धानम्" : "Sanskrit Search — Universal Lexicon & Library"}</span>
        </h2>
        <p>
          {hi
            ? "शब्दकोशः, पाठाः, श्लोकाः, ग्रन्थाः, धातवः एवं दार्शनिक सङ्कल्पाः — देवनागरी अथवा आङ्ग्लभाषायां अन्वेषणं कुर्वन्तु।"
            : "Search across 60,000+ Monier-Williams dictionary entries, classical verses, lessons, texts, and grammatical roots in Devanagari or English."}
        </p>
      </div>

      {/* Main Search Input */}
      <div style={{ maxWidth: 720, margin: "0 auto 20px" }}>
        <div style={{ position: "relative" }}>
          <Search
            size={20}
            style={{
              position: "absolute",
              left: 16,
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--vt-muted)",
              pointerEvents: "none"
            }}
          />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={hi ? "खोजें: राम, विद्या, गीता, grammar, sandhi…" : "Search words, lessons, verses: राम, vidyā, gītā, grammar, sandhi…"}
            style={{
              fontSize: 16,
              padding: "14px 44px 14px 46px",
              borderRadius: 50,
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
              textAlign: "left"
            }}
            autoFocus
          />
          {q && (
            <button
              onClick={() => setQ("")}
              style={{
                position: "absolute",
                right: 16,
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                color: "var(--vt-muted)",
                fontSize: 18,
                cursor: "pointer"
              }}
              title={t("Clear")}
            >
              ✕
            </button>
          )}
        </div>

        {/* Quick Suggestion Pills */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", alignItems: "center", marginTop: 14 }}>
          <span style={{ fontSize: 12, color: "var(--vt-muted)", fontWeight: 600 }}>
            {hi ? "शीघ्र खोज:" : "Quick Searches:"}
          </span>
          {SAMPLE_SEARCHES.map((term) => (
            <button
              key={term}
              className="btn btn-sm"
              onClick={() => setQ(term)}
              style={{
                padding: "4px 12px",
                borderRadius: 50,
                fontSize: 12,
                background: "var(--vt-white)",
                border: "1px solid var(--vt-border)",
                color: "var(--vt-text-light)"
              }}
            >
              {term}
            </button>
          ))}
        </div>

        {/* Category Filters (Active when query present) */}
        {q.trim() && results.length > 0 && (
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center", marginTop: 16 }}>
            {CATEGORIES.map((cat) => {
              const count = cat.id === "all"
                ? results.length
                : results.filter((r) => r.kind === cat.id).length;
              if (cat.id !== "all" && count === 0) return null;
              const active = category === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  style={{
                    padding: "5px 12px",
                    borderRadius: 50,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    border: "1px solid",
                    borderColor: active ? "var(--vt-orange)" : "var(--vt-border)",
                    background: active ? "var(--vt-orange)" : "var(--vt-white)",
                    color: active ? "#fff" : "var(--vt-text-light)",
                    transition: "all 0.15s"
                  }}
                >
                  {hi ? cat.labelHi : cat.label} ({count})
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Results View */}
      {q.trim() && (
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "left" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "8px 4px 14px" }}>
            <p style={{ color: "var(--vt-text-light)", fontSize: 13, margin: 0 }}>
              {loading
                ? (hi ? "अन्वेषणं क्रियते…" : "Searching across lexicon & library…")
                : `${filteredResults.length} ${t("results for")} “${q.trim()}”`}
            </p>
          </div>

          {filteredResults.map((r, i) => (
            <div
              key={`${r.kind}-${r.id}-${i}`}
              className="card search-hit"
              style={{
                padding: "16px 20px",
                marginBottom: 10,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 14,
                transition: "all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)"
              }}
              onClick={() => open(r)}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: "var(--bg-secondary)",
                  flexShrink: 0
                }}
              >
                {KIND_ICON[r.kind] || <Search size={18} color="var(--vt-orange)" />}
              </span>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ fontWeight: 700, fontSize: 15, color: "var(--vt-text)" }}>
                    {r.title}
                  </span>
                  {r.extra && (
                    <span style={{ color: "var(--vt-orange)", fontSize: 13, fontWeight: 500 }}>
                      · {r.extra}
                    </span>
                  )}
                </div>
                <div
                  style={{
                    color: "var(--vt-text-light)",
                    fontSize: 13,
                    marginTop: 3,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  }}
                >
                  {hi ? r.subHi ?? r.sub : r.sub}
                </div>
              </div>

              <span
                className="badge"
                style={{
                  background: "var(--bg-secondary)",
                  color: "var(--vt-text-light)",
                  border: "1px solid var(--vt-border)",
                  flexShrink: 0
                }}
              >
                {t(KIND_LABEL[r.kind] || r.kind)}
              </span>

              <ArrowRight size={14} color="var(--vt-muted)" style={{ flexShrink: 0 }} />
            </div>
          ))}

          {!loading && filteredResults.length === 0 && (
            <div
              className="card"
              style={{
                padding: "40px 20px",
                textAlign: "center",
                borderRadius: "var(--vt-radius)"
              }}
            >
              <Search size={32} color="var(--vt-muted)" style={{ margin: "0 auto 10px" }} />
              <h4 style={{ margin: "0 0 6px", color: "var(--vt-text)" }}>
                {hi ? "कोऽपि परिणामः न प्राप्तः" : "No matches found"}
              </h4>
              <p style={{ color: "var(--vt-muted)", fontSize: 13, margin: 0 }}>
                {hi
                  ? "कृपया संक्षिप्तं पदं वा आङ्ग्लपर्यायं प्रयुञ्जीत।"
                  : "Try typing a shorter Sanskrit word, IAST spelling, or an English concept keyword."}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Default Search Tips State */}
      {!q.trim() && (
        <div
          className="card"
          style={{
            padding: 30,
            maxWidth: 720,
            margin: "12px auto 0",
            textAlign: "left"
          }}
        >
          <h3 style={{ marginTop: 0, color: "var(--vt-text)", display: "flex", alignItems: "center", gap: 8 }}>
            <Sparkles size={18} color="var(--vt-orange)" />
            <span>{hi ? "खोज मार्गदर्शिका" : "How Sanskrit Search Works"}</span>
          </h3>
          <ul style={{ color: "var(--vt-text-light)", paddingLeft: 20, lineHeight: 1.8, fontSize: 14 }}>
            <li>
              <strong>{hi ? "देवनागरी पदानि:" : "Devanagari Words:"}</strong> {hi ? "राम, विद्या, शान्ति, अग्नि, कृष्ण" : "राम, विद्या, शान्ति, अग्नि, कृष्ण (direct dictionary definition)"}
            </li>
            <li>
              <strong>{hi ? "रोमन / IAST पदानि:" : "IAST / Romanized:"}</strong> rāma, vidyā, gītā, śānti, yoga, karma
            </li>
            <li>
              <strong>{hi ? "आङ्ग्ल विषयाः:" : "English Meanings & Concepts:"}</strong> fire, knowledge, teacher, grammar, sandhi, declension
            </li>
            <li>
              <strong>{hi ? "संस्कृत ग्रन्थाः एवं श्लोकाः:" : "Classical Literature & Verses:"}</strong> Gita, Ramayana, Gayatri, Upanishad, Chanakya
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export { SearchPage as default };
