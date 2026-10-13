import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Volume2, Sprout, Link2, Search, X, BookOpen, Layers, ChevronRight, ChevronLeft, ArrowRight, Sparkles } from "lucide-react";
import { supabase } from "../../services/supabase";
import { toIAST, toDevanagari } from "../../services/sanskrit";
import { speakWithFallback } from "../../services/speech";
import { useLanguage } from "../../context/LanguageContext";
import { bi } from "../../services/bilingual";

const POS_HI = {
  noun: "संज्ञा",
  verb: "क्रिया",
  adjective: "विशेषण",
  adverb: "क्रियाविशेषण",
  pronoun: "सर्वनाम",
  particle: "अव्यय",
  indeclinable: "अव्यय"
};

export const VARNA_CATEGORIES = [
  {
    id: "swara",
    title: "स्वराः (Vowels)",
    titleEn: "Vowels",
    letters: ["अ", "आ", "इ", "ई", "उ", "ऊ", "ऋ", "ऌ", "ए", "ऐ", "ओ", "औ"]
  },
  {
    id: "ka_varga",
    title: "क-वर्गः (Velars)",
    titleEn: "Ka-varga",
    letters: ["क", "ख", "ग", "घ", "ङ"]
  },
  {
    id: "cha_varga",
    title: "च-वर्गः (Palatals)",
    titleEn: "Cha-varga",
    letters: ["च", "छ", "ज", "झ", "ञ"]
  },
  {
    id: "ta_varga_retro",
    title: "ट-वर्गः (Retroflex)",
    titleEn: "Ṭa-varga",
    letters: ["ट", "ठ", "ड", "ढ", "ण"]
  },
  {
    id: "ta_varga_dental",
    title: "त-वर्गः (Dentals)",
    titleEn: "Ta-varga",
    letters: ["त", "थ", "द", "ध", "न"]
  },
  {
    id: "pa_varga",
    title: "प-वर्गः (Labials)",
    titleEn: "Pa-varga",
    letters: ["प", "फ", "ब", "भ", "म"]
  },
  {
    id: "antastha",
    title: "अन्तःस्थाः (Semivowels)",
    titleEn: "Semivowels",
    letters: ["य", "र", "ल", "व"]
  },
  {
    id: "ushman",
    title: "ऊष्माणः (Sibilants & Aspirate)",
    titleEn: "Sibilants & Aspirate",
    letters: ["श", "ष", "स", "ह"]
  }
];

// All valid Sanskrit starting letters in traditional order
export const ALL_VARNAS = VARNA_CATEGORIES.flatMap((c) => c.letters);

let cachedMonierCore = null;
let cachedVarnaMap = null;

export async function getMonierCoreWithIndex() {
  if (!cachedMonierCore || !cachedVarnaMap) {
    const mod = await import("../../data/monier_core.json");
    cachedMonierCore = mod.default || mod;

    const vMap = {};
    for (let i = 0; i < cachedMonierCore.length; i++) {
      const entry = cachedMonierCore[i];
      if (!entry.word) continue;
      const v = entry.word[0];
      if (!vMap[v]) vMap[v] = [];
      vMap[v].push({
        id: `mw-${i}-${entry.word}`,
        word: entry.word,
        iast: entry.iast,
        pos: entry.pos,
        meanings: entry.meanings,
        raw_def: entry.raw_def,
        source: "Monier-Williams"
      });
    }
    cachedVarnaMap = vMap;
  }
  return { list: cachedMonierCore, varnaMap: cachedVarnaMap };
}

export function searchLocalMonier(monierList, query) {
  if (!monierList || !monierList.length) return [];
  const trimmed = (query || "").trim();
  if (!trimmed) {
    return monierList.map((e, idx) => ({
      id: e.id || `mw-${idx}-${e.word}`,
      word: e.word,
      iast: e.iast,
      pos: e.pos,
      meanings: e.meanings,
      raw_def: e.raw_def,
      source: e.source || "Monier-Williams"
    }));
  }

  const qLower = trimmed.toLowerCase();
  const devQuery = toDevanagari(trimmed);

  const scored = [];
  for (let i = 0; i < monierList.length; i++) {
    const entry = monierList[i];
    const word = entry.word || "";
    const iast = (entry.iast || "").toLowerCase();

    let score = 0;

    // Exact matches
    if (word === trimmed || (devQuery && word === devQuery) || iast === qLower) {
      score = 100;
    } else if (word.startsWith(trimmed) || (devQuery && word.startsWith(devQuery)) || iast.startsWith(qLower)) {
      score = 80;
    } else if (word.includes(trimmed) || (devQuery && word.includes(devQuery)) || iast.includes(qLower)) {
      score = 60;
    } else if (entry.meanings?.some((m) => m.toLowerCase() === qLower)) {
      score = 50;
    } else if (entry.meanings?.some((m) => m.toLowerCase().includes(qLower))) {
      score = 40;
    } else if (entry.raw_def && entry.raw_def.toLowerCase().includes(qLower)) {
      score = 20;
    }

    if (score > 0) {
      scored.push({ entry, score });
    }
  }

  scored.sort((a, b) => b.score - a.score || (a.entry.word?.length || 0) - (b.entry.word?.length || 0));

  return scored.map(({ entry }, idx) => ({
    id: entry.id || `mw-${idx}-${entry.word}`,
    word: entry.word,
    iast: entry.iast,
    pos: entry.pos,
    meanings: entry.meanings,
    raw_def: entry.raw_def,
    source: entry.source || "Monier-Williams"
  }));
}

function DictionaryPage() {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const urlVarn = searchParams.get("varn") || "ALL";
  const urlQ = searchParams.get("q") || "";

  const [q, setQ] = useState(urlQ);
  const [selectedVarna, setSelectedVarna] = useState(urlVarn);
  const [activeGroup, setActiveGroup] = useState("ALL");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(60);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [varnaIndex, setVarnaIndex] = useState({});
  const [allWordsCount, setAllWordsCount] = useState(0);

  // Initialize data on mount
  useEffect(() => {
    let mounted = true;
    async function init() {
      setLoading(true);
      try {
        const { list, varnaMap } = await getMonierCoreWithIndex();
        if (mounted) {
          setVarnaIndex(varnaMap);
          setAllWordsCount(list.length);
          setLoading(false);
        }
      } catch (err) {
        console.error("Failed to load dictionary:", err);
        if (mounted) {
          setError(t("Failed to load dictionary data."));
          setLoading(false);
        }
      }
    }
    init();
    return () => {
      mounted = false;
    };
  }, [t]);

  // Sync state when URL params change
  useEffect(() => {
    if (urlVarn && urlVarn !== selectedVarna) {
      setSelectedVarna(urlVarn);
    }
    if (urlQ !== q) {
      setQ(urlQ);
    }
  }, [urlVarn, urlQ]);

  // Compute letter counts
  const letterCounts = useMemo(() => {
    const counts = {};
    for (const v of ALL_VARNAS) {
      counts[v] = varnaIndex[v]?.length || 0;
    }
    return counts;
  }, [varnaIndex]);

  // Handle setting Varna
  const handleSelectVarna = (v) => {
    setSelectedVarna(v);
    setPage(1);
    const newParams = new URLSearchParams(searchParams);
    if (v === "ALL") {
      newParams.delete("varn");
    } else {
      newParams.set("varn", v);
    }
    setSearchParams(newParams);
  };

  // Handle query change
  const handleQueryChange = (val) => {
    setQ(val);
    setPage(1);
    const newParams = new URLSearchParams(searchParams);
    if (val.trim()) {
      newParams.set("q", val);
    } else {
      newParams.delete("q");
    }
    setSearchParams(newParams);
  };

  // Compute filtered entries
  const filteredEntries = useMemo(() => {
    const trimmed = q.trim();

    // 1. If a specific varn is selected and no query
    if (selectedVarna !== "ALL" && !trimmed) {
      return varnaIndex[selectedVarna] || [];
    }

    // 2. If a specific varn is selected with a search query
    if (selectedVarna !== "ALL" && trimmed) {
      const baseList = varnaIndex[selectedVarna] || [];
      return searchLocalMonier(baseList, trimmed);
    }

    // 3. If "ALL" is selected with a query
    if (selectedVarna === "ALL" && trimmed) {
      if (cachedMonierCore) {
        return searchLocalMonier(cachedMonierCore, trimmed);
      }
      return [];
    }

    // 4. If "ALL" is selected and no query: return all words flattened by varn order
    if (selectedVarna === "ALL" && !trimmed) {
      const list = [];
      for (const v of ALL_VARNAS) {
        if (varnaIndex[v]) {
          list.push(...varnaIndex[v]);
        }
      }
      return list;
    }

    return [];
  }, [varnaIndex, selectedVarna, q]);

  // Calculate pagination
  const totalEntries = filteredEntries.length;
  const totalPages = Math.ceil(totalEntries / pageSize) || 1;
  const paginatedEntries = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredEntries.slice(start, start + pageSize);
  }, [filteredEntries, page, pageSize]);

  // Current Varna category info if selected
  const activeCategory = useMemo(() => {
    if (selectedVarna === "ALL") return null;
    return VARNA_CATEGORIES.find((cat) => cat.letters.includes(selectedVarna));
  }, [selectedVarna]);

  const quickPicks = ["राम", "विद्या", "कर्म", "सत्य", "गुरु", "योग", "शान्ति", "धर्म"];

  return (
    <div className="page-container" style={{ maxWidth: 1200, margin: "0 auto", padding: "20px 16px" }}>
      {/* Header Banner */}
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 999, background: "rgba(255, 106, 0, 0.1)", color: "var(--vt-orange)", fontSize: 13, fontWeight: 600, marginBottom: 12 }}>
          <Sparkles size={16} />
          <span>{lang === "hi" ? "वर्णाक्रमेण सम्पूर्ण शब्दकोशः" : "Complete Sanskrit Lexicon by Varn / Alphabet"}</span>
        </div>
        <h1 style={{ fontSize: "2.3rem", fontWeight: 800, margin: "0 0 8px 0", color: "var(--text-primary)" }}>
          {lang === "hi" ? "संस्कृत शब्दकोशः" : "Sanskrit Dictionary"}
        </h1>
        <p style={{ color: "var(--vt-text-light)", fontSize: 15, maxWidth: 680, margin: "0 auto 16px auto", lineHeight: 1.6 }}>
          {lang === "hi"
            ? "मोनियर-विलियम्स कोशस्य सम्पूर्ण शब्दाः वर्णाक्रमेण वर्गीकृताः। प्रत्येकस्य वर्णस्य शब्दाः द्रष्टुं शक्यन्ते।"
            : "Explore the comprehensive Monier-Williams Sanskrit lexicon (~60,000 words), categorized and browsable by starting Varn (alphabet letter)."}
        </p>

        {/* Global Stats Badges */}
        <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", fontSize: 13 }}>
          <span className="chip" style={{ padding: "5px 12px", background: "var(--bg-secondary)", borderRadius: 8, border: "1px solid var(--vt-border)", fontWeight: 600 }}>
            📚 {allWordsCount ? allWordsCount.toLocaleString() : "59,995"} {lang === "hi" ? "कुल शब्दाः" : "Total Words"}
          </span>
          <span className="chip" style={{ padding: "5px 12px", background: "var(--bg-secondary)", borderRadius: 8, border: "1px solid var(--vt-border)", fontWeight: 600 }}>
            🔤 44 {lang === "hi" ? "वर्णाः" : "Starting Varnas"}
          </span>
          <span className="chip" style={{ padding: "5px 12px", background: "rgba(46, 125, 50, 0.1)", color: "var(--vt-green)", borderRadius: 8, border: "1px solid rgba(46, 125, 50, 0.2)", fontWeight: 600 }}>
            ⚡ {lang === "hi" ? "पूर्णतः ऑफलाइन उपलब्धम्" : "100% Offline Available"}
          </span>
        </div>
      </div>

      {/* Search Input Box */}
      <div style={{ maxWidth: 640, margin: "0 auto 24px auto" }}>
        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
          <Search size={20} style={{ position: "absolute", left: 16, color: "var(--vt-text-lighter)" }} />
          <input
            id="dictionary-search-input"
            value={q}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder={
              selectedVarna !== "ALL"
                ? lang === "hi"
                  ? `'${selectedVarna}' वर्णे अन्वेषणम्... (उदा. शब्दः, IAST, अर्थः)`
                  : `Search within '${selectedVarna}' words... (word, IAST, meaning)`
                : lang === "hi"
                ? "शब्दान्वेषणम्: राम, rāma, knowledge, कर्म, guru…"
                : "Search any word: rāma, राम, knowledge, karma, guru…"
            }
            style={{
              width: "100%",
              padding: "14px 44px 14px 48px",
              fontSize: 16,
              borderRadius: 30,
              border: "2px solid var(--vt-border)",
              background: "var(--vt-card)",
              color: "var(--text-primary)",
              boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
              outline: "none"
            }}
          />
          {q && (
            <button
              onClick={() => handleQueryChange("")}
              style={{
                position: "absolute",
                right: 14,
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: 4,
                color: "var(--vt-text-light)"
              }}
              title={lang === "hi" ? "स्वच्छं कुरु" : "Clear search"}
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, flexWrap: "wrap", marginTop: 10 }}>
          <span style={{ fontSize: 12, color: "var(--vt-text-lighter)" }}>{lang === "hi" ? "शीघ्रम्:" : "Quick picks:"}</span>
          {quickPicks.map((word) => (
            <button
              key={word}
              onClick={() => {
                handleSelectVarna("ALL");
                handleQueryChange(word);
              }}
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--vt-border)",
                borderRadius: 16,
                padding: "2px 10px",
                fontSize: 12,
                cursor: "pointer",
                color: "var(--vt-text)"
              }}
            >
              {word}
            </button>
          ))}
        </div>
      </div>

      {/* Varna Categorization Section */}
      <div
        className="card"
        style={{
          padding: "18px 20px",
          marginBottom: 24,
          borderRadius: 16,
          background: "var(--vt-card)",
          border: "1px solid var(--vt-border)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.03)"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Layers size={18} color="var(--vt-orange)" />
            <span style={{ fontWeight: 700, fontSize: 15, color: "var(--text-primary)" }}>
              {lang === "hi" ? "वर्णाक्रमेण चयनम् (Select by Starting Letter):" : "Browse by Starting Varn (Alphabet):"}
            </span>
          </div>

          <button
            onClick={() => handleSelectVarna("ALL")}
            className={`btn btn-sm ${selectedVarna === "ALL" ? "btn-primary" : "btn-outline"}`}
            style={{ borderRadius: 20, padding: "4px 14px", fontSize: 13, fontWeight: 600 }}
          >
            {lang === "hi" ? "सर्वे वर्णाः (All 59k Words)" : "All Words (All Letters)"}
          </button>
        </div>

        {/* Phonetic Category Selector Tabs */}
        <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 8, marginBottom: 12, scrollbarWidth: "thin" }}>
          <button
            onClick={() => setActiveGroup("ALL")}
            style={{
              padding: "5px 12px",
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 600,
              border: "1px solid var(--vt-border)",
              cursor: "pointer",
              background: activeGroup === "ALL" ? "var(--vt-orange)" : "var(--bg-secondary)",
              color: activeGroup === "ALL" ? "#fff" : "var(--vt-text)",
              whiteSpace: "nowrap"
            }}
          >
            {lang === "hi" ? "सर्वे वर्गाः" : "All Groups"}
          </button>
          {VARNA_CATEGORIES.map((cat) => {
            const isGroupActive = activeGroup === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveGroup(cat.id)}
                style={{
                  padding: "5px 12px",
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 600,
                  border: "1px solid var(--vt-border)",
                  cursor: "pointer",
                  background: isGroupActive ? "var(--vt-orange)" : "var(--bg-secondary)",
                  color: isGroupActive ? "#fff" : "var(--vt-text)",
                  whiteSpace: "nowrap"
                }}
              >
                {cat.title}
              </button>
            );
          })}
        </div>

        {/* Letters Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(68px, 1fr))",
            gap: 8,
            maxHeight: 280,
            overflowY: "auto",
            padding: "4px 2px"
          }}
        >
          {ALL_VARNAS.filter((letter) => {
            if (activeGroup === "ALL") return true;
            const cat = VARNA_CATEGORIES.find((c) => c.id === activeGroup);
            return cat?.letters.includes(letter);
          }).map((letter) => {
            const count = letterCounts[letter] || 0;
            const isSelected = selectedVarna === letter;
            return (
              <button
                key={letter}
                onClick={() => handleSelectVarna(letter)}
                disabled={count === 0}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "8px 4px",
                  borderRadius: 10,
                  border: isSelected ? "2px solid var(--vt-orange)" : "1px solid var(--vt-border)",
                  background: isSelected ? "var(--vt-orange-light, rgba(255, 106, 0, 0.12))" : "var(--bg-secondary)",
                  cursor: count > 0 ? "pointer" : "not-allowed",
                  opacity: count > 0 ? 1 : 0.4,
                  transition: "all 0.15s ease"
                }}
                title={`${letter} — ${count} ${lang === "hi" ? "शब्दाः" : "words"}`}
              >
                <span style={{ fontSize: 20, fontWeight: 800, color: isSelected ? "var(--vt-orange)" : "var(--text-primary)" }}>
                  {letter}
                </span>
                <span style={{ fontSize: 10, color: isSelected ? "var(--vt-orange)" : "var(--vt-text-lighter)", fontWeight: 600 }}>
                  {count > 999 ? `${(count / 1000).toFixed(1)}k` : count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Current Selection Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
          padding: "12px 18px",
          background: "var(--bg-secondary)",
          borderRadius: 12,
          marginBottom: 20,
          border: "1px solid var(--vt-border)"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          {selectedVarna !== "ALL" ? (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: "var(--vt-orange)",
                  color: "#fff",
                  fontSize: 20,
                  fontWeight: 800
                }}
              >
                {selectedVarna}
              </span>
              <div>
                <strong style={{ fontSize: 16, color: "var(--text-primary)" }}>
                  {lang === "hi" ? `'${selectedVarna}' वर्णेन आरभ्यमाणाः शब्दाः` : `Words starting with '${selectedVarna}'`}
                </strong>
                {activeCategory && (
                  <span style={{ fontSize: 12, color: "var(--vt-text-light)", marginLeft: 6 }}>
                    ({activeCategory.title})
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <BookOpen size={20} color="var(--vt-orange)" />
              <strong style={{ fontSize: 16, color: "var(--text-primary)" }}>
                {q.trim()
                  ? lang === "hi"
                    ? `अन्वेषणपरिणामाः: "${q}"`
                    : `Search Results for "${q}"`
                  : lang === "hi"
                  ? "सर्वे शब्दाः (वर्णाक्रमेण)"
                  : "All Words (Alphabetical Stream)"}
              </strong>
            </div>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 13, color: "var(--vt-text-light)", fontWeight: 600 }}>
            {lang === "hi"
              ? `${totalEntries.toLocaleString()} शब्दाः लब्धाः`
              : `${totalEntries.toLocaleString()} words found`}
          </span>

          {/* Page size selector */}
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
            style={{
              padding: "4px 8px",
              borderRadius: 6,
              fontSize: 12,
              border: "1px solid var(--vt-border)",
              background: "var(--vt-card)",
              color: "var(--text-primary)"
            }}
          >
            <option value={30}>30 / {lang === "hi" ? "पृष्ठम्" : "page"}</option>
            <option value={60}>60 / {lang === "hi" ? "पृष्ठम्" : "page"}</option>
            <option value={120}>120 / {lang === "hi" ? "पृष्ठम्" : "page"}</option>
            <option value={240}>240 / {lang === "hi" ? "पृष्ठम्" : "page"}</option>
          </select>
        </div>
      </div>

      {/* Loading & Error States */}
      {loading && (
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <div className="spinner" style={{ margin: "0 auto 16px auto" }}></div>
          <p style={{ color: "var(--vt-text-light)", fontSize: 15 }}>
            {lang === "hi" ? "कोशशब्दाः वर्णाक्रमेण सज्जीक्रियन्ते..." : "Loading and indexing 60,000 dictionary words by Varn..."}
          </p>
        </div>
      )}

      {error && !loading && (
        <div style={{ padding: 16, background: "rgba(220, 53, 69, 0.1)", border: "1px solid #dc3545", borderRadius: 10, color: "#dc3545", marginBottom: 20 }}>
          {error}
        </div>
      )}

      {/* Words Grid */}
      {!loading && paginatedEntries.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
          {paginatedEntries.map((e) => {
            const firstLetter = e.word?.[0];
            return (
              <div
                key={e.id}
                className="card"
                style={{
                  padding: 16,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  borderRadius: 12,
                  border: "1px solid var(--vt-border)",
                  background: "var(--vt-card)",
                  transition: "transform 0.15s ease, box-shadow 0.15s ease"
                }}
              >
                {/* Word Top Bar */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                      <strong style={{ fontSize: 24, fontWeight: 700, color: "var(--text-primary)" }}>{e.word}</strong>
                      {firstLetter && (
                        <button
                          onClick={() => handleSelectVarna(firstLetter)}
                          style={{
                            fontSize: 11,
                            padding: "2px 6px",
                            borderRadius: 4,
                            background: "var(--bg-secondary)",
                            border: "1px solid var(--vt-border)",
                            color: "var(--vt-orange)",
                            fontWeight: 700,
                            cursor: "pointer"
                          }}
                          title={lang === "hi" ? `'${firstLetter}' वर्णस्य शब्दाः पश्यन्तु` : `View all words starting with '${firstLetter}'`}
                        >
                          वर्णः {firstLetter}
                        </button>
                      )}
                    </div>
                    <div style={{ color: "var(--vt-text-light)", fontSize: 13, marginTop: 2 }}>
                      <em>{e.iast || toIAST(e.word)}</em>
                      {e.pos ? ` · ${bi(lang, e.pos, POS_HI[e.pos] || e.pos)}` : ""}
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 6 }}>
                    <button
                      className="btn btn-sm btn-outline"
                      onClick={() => speakWithFallback(e.word)}
                      title={t("Hear pronunciation")}
                      style={{ padding: "6px 8px" }}
                    >
                      <Volume2 size={15} />
                    </button>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => navigate(`/explore/${encodeURIComponent(e.word)}`)}
                      style={{ padding: "6px 12px", fontSize: 12, fontWeight: 600 }}
                    >
                      <span>{t("Explore")}</span>
                    </button>
                  </div>
                </div>

                {/* Meanings */}
                <div style={{ flex: 1 }}>
                  <ul style={{ margin: 0, paddingLeft: 18, color: "var(--vt-text)", lineHeight: 1.5, fontSize: 14 }}>
                    {(lang === "hi" && e.meanings_hi && e.meanings_hi.length ? e.meanings_hi : e.meanings || []).slice(0, 4).map((m, i) => (
                      <li key={i}>{m}</li>
                    ))}
                    {(lang === "hi" ? e.meanings_hi?.length || 0 : e.meanings?.length || 0) === 0 && e.raw_def ? (
                      <li style={{ color: "var(--vt-text-light)" }}>{e.raw_def.slice(0, 180)}</li>
                    ) : (lang === "hi" ? e.meanings_hi?.length || 0 : e.meanings?.length || 0) === 0 ? (
                      <li style={{ color: "var(--vt-text-lighter)" }}>—</li>
                    ) : null}
                  </ul>
                </div>

                {/* Footer Info: Root & Derivations */}
                <div style={{ borderTop: "1px solid var(--vt-border)", paddingTop: 8, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12 }}>
                  {e.root ? (
                    <div style={{ color: "var(--vt-text-light)", display: "flex", alignItems: "center", gap: 5 }}>
                      <Sprout size={13} color="var(--vt-green)" />
                      <span>{t("Root")}: {toDevanagari(e.root) || e.root}</span>
                    </div>
                  ) : (
                    <span style={{ color: "var(--vt-text-lighter)", fontSize: 11 }}>MW 1899</span>
                  )}

                  <span className="chip" style={{ fontSize: 10, padding: "2px 6px", background: "rgba(230, 126, 34, 0.12)", color: "var(--vt-orange)", borderRadius: 4, fontWeight: 600 }}>
                    Monier-Williams
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {!loading && paginatedEntries.length === 0 && (
        <div className="card" style={{ textAlign: "center", padding: "48px 20px", marginTop: 16, borderRadius: 16 }}>
          <BookOpen size={40} color="var(--vt-orange)" style={{ opacity: 0.6, marginBottom: 12 }} />
          <h3 style={{ fontSize: 18, margin: "0 0 6px 0", color: "var(--text-primary)" }}>
            {lang === "hi" ? "कोऽपि शब्दः न प्राप्तः" : "No words found"}
          </h3>
          <p style={{ color: "var(--vt-text-light)", fontSize: 14, margin: "0 0 16px 0" }}>
            {q
              ? lang === "hi"
                ? `"${q}" कृते कोऽपि परिणामः नास्ति। वर्णाक्रमेण अन्विषन्तु वा अन्यशब्दं प्रयतन्ताम्।`
                : `No entries matched "${q}". Try clearing the search or exploring letters above.`
              : lang === "hi"
              ? "अस्मिन् वर्णे कोऽपि शब्दः नास्ति।"
              : "No words exist for this letter category."}
          </p>
          <button
            onClick={() => {
              setQ("");
              setSelectedVarna("ALL");
            }}
            className="btn btn-outline"
            style={{ borderRadius: 20 }}
          >
            {lang === "hi" ? "सर्वे शब्दाः पश्यन्तु" : "View All Words"}
          </button>
        </div>
      )}

      {/* Pagination Controls */}
      {!loading && totalEntries > 0 && totalPages > 1 && (
        <div
          style={{
            marginTop: 32,
            padding: "16px 20px",
            background: "var(--vt-card)",
            borderRadius: 14,
            border: "1px solid var(--vt-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12
          }}
        >
          <div style={{ fontSize: 13, color: "var(--vt-text-light)" }}>
            {lang === "hi"
              ? `दर्शयति ${((page - 1) * pageSize + 1).toLocaleString()} – ${Math.min(page * pageSize, totalEntries).toLocaleString()} / ${totalEntries.toLocaleString()} शब्दाः`
              : `Showing ${((page - 1) * pageSize + 1).toLocaleString()} – ${Math.min(page * pageSize, totalEntries).toLocaleString()} of ${totalEntries.toLocaleString()} words`}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <button
              className="btn btn-sm btn-outline"
              onClick={() => setPage(1)}
              disabled={page === 1}
              style={{ padding: "6px 10px", fontSize: 12 }}
            >
              « {lang === "hi" ? "प्रथमम्" : "First"}
            </button>
            <button
              className="btn btn-sm btn-outline"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              style={{ padding: "6px 10px" }}
            >
              <ChevronLeft size={14} />
            </button>

            <span style={{ fontSize: 13, fontWeight: 700, padding: "0 8px", color: "var(--text-primary)" }}>
              {lang === "hi" ? `पृष्ठम् ${page} / ${totalPages}` : `Page ${page} of ${totalPages}`}
            </span>

            <button
              className="btn btn-sm btn-outline"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              style={{ padding: "6px 10px" }}
            >
              <ChevronRight size={14} />
            </button>
            <button
              className="btn btn-sm btn-outline"
              onClick={() => setPage(totalPages)}
              disabled={page === totalPages}
              style={{ padding: "6px 10px", fontSize: 12 }}
            >
              {lang === "hi" ? "अन्तिमम्" : "Last"} »
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DictionaryPage;
