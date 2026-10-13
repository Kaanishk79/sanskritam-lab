import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Scroll,
  Volume2,
  Sparkles,
  BookOpen,
  BookMarked,
  Layers,
  Search,
  Star,
  Copy,
  Check,
  Pause,
  Play,
  RotateCcw,
  Square,
  ArrowRight,
  Bookmark,
  Share2,
  X
} from "lucide-react";
import { readingPassages } from "../../data/languageLab";
import { SHLOKAS, SHLOKA_BOOKS, SHLOKA_CATEGORIES } from "../../data/shlokas";
import { loadShlokaPassages, loadShlokas } from "../../services/contentDb";
import { shlokaReciter } from "../../services/recitationAudio";
import ExplorePanel from "../../components/ExplorePanel";
import { speakWithFallback } from "../../services/speech";
import { useLanguage } from "../../context/LanguageContext";

function ShlokaPage() {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const hi = lang === "hi";
  const urlBook = searchParams.get("book") || "all";
  const urlCat = searchParams.get("cat") || "all";
  const urlTab = searchParams.get("tab") || "books";

  // State
  const [activeTab, setActiveTab] = useState(urlTab); // "books" | "categories" | "all" | "favorites" | "prose"
  const [selectedBook, setSelectedBook] = useState(urlBook);
  const [selectedCategory, setSelectedCategory] = useState(urlCat);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [exploreWord, setExploreWord] = useState(null);
  const [openPassage, setOpenPassage] = useState(null);
  const [playerState, setPlayerState] = useState(shlokaReciter.getState());

  // Bookmarked shlokas stored in localStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("sanskrit_favorite_shlokas");
      return saved ? JSON.parse(saved) : ["shloka-karmanye", "shloka-gayatri", "shloka-asato-ma"];
    } catch {
      return ["shloka-karmanye", "shloka-gayatri", "shloka-asato-ma"];
    }
  });

  // Audio reciter listener
  useEffect(() => {
    const unsubscribe = shlokaReciter.subscribe((state) => {
      setPlayerState(state);
    });
    return () => {
      unsubscribe();
      shlokaReciter.stop();
    };
  }, []);

  // Listen for global explore events
  useEffect(() => {
    const handler = (e) => setExploreWord(e.detail);
    window.addEventListener("sanskritlab:explore", handler);
    return () => window.removeEventListener("sanskritlab:explore", handler);
  }, []);

  // Sync favorites to localStorage
  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem("sanskrit_favorite_shlokas", JSON.stringify(next));
      } catch (err) {
        console.warn("Could not save favorite shlokas:", err);
      }
      return next;
    });
  };

  const handleCopy = (shloka) => {
    const textToCopy = `${shloka.dev}\n${shloka.iast}\n\nEnglish: ${shloka.translation}\nHindi: ${shloka.translationHi || ""}\nSource: ${shloka.source}`;
    navigator.clipboard?.writeText(textToCopy);
    setCopiedId(shloka.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clickWord = (w) => {
    const clean = w.replace(/[।॥,.\-?!:;]/g, "").trim();
    if (clean) setExploreWord(clean);
  };

  // Filtered shlokas based on active tab and search
  const displayedShlokas = useMemo(() => {
    return SHLOKAS.filter((s) => {
      // 1. Tab filter
      if (activeTab === "books" && selectedBook !== "all") {
        if (s.book !== selectedBook) return false;
      } else if (activeTab === "categories" && selectedCategory !== "all") {
        if (s.category !== selectedCategory) return false;
      } else if (activeTab === "favorites") {
        if (!favorites.includes(s.id)) return false;
      }

      // 2. Search query filter
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      return (
        s.dev.toLowerCase().includes(q) ||
        s.iast.toLowerCase().includes(q) ||
        s.translation.toLowerCase().includes(q) ||
        (s.translationHi && s.translationHi.toLowerCase().includes(q)) ||
        s.source.toLowerCase().includes(q) ||
        (s.bookTitle && s.bookTitle.toLowerCase().includes(q)) ||
        (s.bookTitleSanskrit && s.bookTitleSanskrit.includes(q))
      );
    });
  }, [activeTab, selectedBook, selectedCategory, searchQuery, favorites]);

  const activeBookObj = useMemo(() => {
    if (selectedBook === "all") return null;
    return SHLOKA_BOOKS.find((b) => b.id === selectedBook) || null;
  }, [selectedBook]);

  // Verse of the Day
  const dayVerse = useMemo(() => {
    return SHLOKAS[Math.floor(Date.now() / 864e5) % SHLOKAS.length] || SHLOKAS[0];
  }, []);

  return (
    <div className="page-container" style={{ maxWidth: 1260, margin: "0 auto", padding: "24px 16px" }}>
      {/* ─── 1. HEADER SECTION ─── */}
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 16px",
            borderRadius: 999,
            background: "rgba(255, 106, 0, 0.1)",
            color: "var(--vt-orange)",
            fontSize: 13,
            fontWeight: 700,
            marginBottom: 12
          }}
        >
          <Sparkles size={16} />
          <span>{hi ? "संस्कृत श्लोक साधनम् (Sanskrit Shloka Sanctuary)" : "Classical Sanskrit Shloka Sanctuary"}</span>
        </div>
        <h1 style={{ fontSize: "2.4rem", fontWeight: 800, margin: "0 0 10px 0", color: "var(--text-primary)" }}>
          {hi ? "संस्कृत श्लोकाः" : "Sanskrit Shlokas & Sacred Recitation"}
        </h1>
        <p style={{ maxWidth: 760, margin: "0 auto 18px auto", color: "var(--vt-text-light)", fontSize: 15, lineHeight: 1.6 }}>
          {hi
            ? "भगवद्गीता, वाल्मीकि रामायण, उपनिषद, वेद, हितोपदेश, पञ्चतन्त्र, नीतिशतक, चाणक्यनीति एवं महाभारत के ७०+ प्रामाणिक श्लोक — सस्वर पाठ, पदच्छेद, हिन्दी-अंग्रेजी अर्थ एवं व्याकरण विश्लेषण सहित।"
            : "Explore 70+ authentic Sanskrit verses organized across 10 canonical scriptures — with authentic audio recitation, word analysis, and bilingual commentary."}
        </p>

        {/* Global Statistics Chips */}
        <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", fontSize: 13 }}>
          <span className="chip" style={{ padding: "6px 14px", background: "var(--bg-secondary)", borderRadius: 8, border: "1px solid var(--vt-border)", fontWeight: 600 }}>
            📜 {SHLOKAS.length} {hi ? "प्रामाणिक श्लोकाः" : "Classical Shlokas"}
          </span>
          <span className="chip" style={{ padding: "6px 14px", background: "var(--bg-secondary)", borderRadius: 8, border: "1px solid var(--vt-border)", fontWeight: 600 }}>
            📚 {SHLOKA_BOOKS.length} {hi ? "प्रमुख ग्रन्थाः" : "Canonical Scriptures"}
          </span>
          <span className="chip" style={{ padding: "6px 14px", background: "rgba(46, 125, 50, 0.1)", color: "var(--vt-green)", borderRadius: 8, border: "1px solid rgba(46, 125, 50, 0.2)", fontWeight: 600 }}>
            🎧 {hi ? "सस्वर सजीव पाठः" : "Audio Recitation Supported"}
          </span>
          <span className="chip" style={{ padding: "6px 14px", background: "rgba(63, 81, 181, 0.1)", color: "var(--vt-blue)", borderRadius: 8, border: "1px solid rgba(63, 81, 181, 0.2)", fontWeight: 600 }}>
            ⭐ {favorites.length} {hi ? "प्रियाः श्लोकाः" : "Saved Favorites"}
          </span>
        </div>
      </div>

      {/* ─── 2. VERSE OF THE DAY (दिनस्य श्लोकः) ─── */}
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
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
          <Sparkles size={18} color="var(--vt-orange)" />
          <strong style={{ fontSize: 15, color: "var(--vt-orange)" }}>
            {hi ? "दिनस्य श्लोकः (Verse of the Day)" : "Verse of the Day"}
          </strong>
          {dayVerse.bookTitle && (
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "var(--vt-blue)",
                background: "rgba(63, 81, 181, 0.1)",
                padding: "3px 10px",
                borderRadius: 20
              }}
            >
              📖 {hi ? dayVerse.bookTitleSanskrit || dayVerse.bookTitle : dayVerse.bookTitle}
            </span>
          )}
          <span className="chip" style={{ marginLeft: "auto", fontSize: 12, fontWeight: 600 }}>
            {dayVerse.source}
          </span>
        </div>
        <div style={{ fontSize: 21, lineHeight: 1.9, fontWeight: 700, color: "var(--vt-text)" }}>
          {dayVerse.dev.split(" ").map((w, j) => (
            <span key={j}>
              <button className="explore-word" onClick={() => clickWord(w)} title={t("Click word to inspect in Explore Panel")}>
                {w}
              </button>{" "}
            </span>
          ))}
        </div>
        <div style={{ color: "var(--vt-muted)", fontSize: 13.5, fontStyle: "italic", marginTop: 8 }}>
          {dayVerse.iast}
        </div>
        <div style={{ color: "var(--vt-text)", fontSize: 15, marginTop: 10, lineHeight: 1.6 }}>
          {hi && dayVerse.translationHi ? dayVerse.translationHi : dayVerse.translation}
        </div>
        {hi && dayVerse.translation && (
          <div style={{ color: "var(--vt-text-lighter)", fontSize: 12.5, fontStyle: "italic", marginTop: 4 }}>
            En: {dayVerse.translation}
          </div>
        )}
        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <button
            className="btn btn-sm btn-primary"
            style={{ display: "inline-flex", alignItems: "center", gap: 6, borderRadius: 20 }}
            onClick={() => speakWithFallback(dayVerse.dev)}
          >
            <Volume2 size={14} /> <span>{hi ? "सस्वरं शृणोतु" : "Listen Aloud"}</span>
          </button>
          <button
            className="btn btn-sm btn-outline"
            style={{ display: "inline-flex", alignItems: "center", gap: 6, borderRadius: 20 }}
            onClick={() => handleCopy(dayVerse)}
          >
            {copiedId === dayVerse.id ? <Check size={14} color="var(--vt-green)" /> : <Copy size={14} />}
            <span>{copiedId === dayVerse.id ? (hi ? "प्रतिलिपिः कृता" : "Copied!") : (hi ? "प्रतिलिपिं कुरु" : "Copy Verse")}</span>
          </button>
        </div>
      </div>

      {/* ─── 3. PRIMARY NAVIGATION TABS (ग्रन्थाः | विषयाः | सर्वे | प्रियाः | गद्यपाठाः) ─── */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 10,
          marginBottom: 20,
          flexWrap: "wrap"
        }}
      >
        <button
          className={`btn ${activeTab === "books" ? "btn-primary" : "btn-outline"}`}
          onClick={() => setActiveTab("books")}
          style={{
            borderRadius: 30,
            padding: "8px 20px",
            fontSize: 14,
            fontWeight: 700,
            display: "inline-flex",
            alignItems: "center",
            gap: 8
          }}
        >
          <BookMarked size={16} />
          <span>{hi ? "ग्रन्थाः (By Scripture & Book)" : "By Scripture & Book"}</span>
          <span style={{ background: activeTab === "books" ? "rgba(255,255,255,0.25)" : "var(--bg-tertiary)", padding: "2px 8px", borderRadius: 12, fontSize: 11 }}>
            {SHLOKA_BOOKS.length} {hi ? "ग्रन्थाः" : "Books"}
          </span>
        </button>

        <button
          className={`btn ${activeTab === "categories" ? "btn-primary" : "btn-outline"}`}
          onClick={() => setActiveTab("categories")}
          style={{
            borderRadius: 30,
            padding: "8px 20px",
            fontSize: 14,
            fontWeight: 700,
            display: "inline-flex",
            alignItems: "center",
            gap: 8
          }}
        >
          <Layers size={16} />
          <span>{hi ? "विषयाः (By Theme / Category)" : "By Theme / Category"}</span>
          <span style={{ background: activeTab === "categories" ? "rgba(255,255,255,0.25)" : "var(--bg-tertiary)", padding: "2px 8px", borderRadius: 12, fontSize: 11 }}>
            {SHLOKA_CATEGORIES.length - 1} {hi ? "विषयाः" : "Themes"}
          </span>
        </button>

        <button
          className={`btn ${activeTab === "all" ? "btn-primary" : "btn-outline"}`}
          onClick={() => {
            setActiveTab("all");
            setSelectedBook("all");
            setSelectedCategory("all");
          }}
          style={{
            borderRadius: 30,
            padding: "8px 20px",
            fontSize: 14,
            fontWeight: 700,
            display: "inline-flex",
            alignItems: "center",
            gap: 8
          }}
        >
          <Scroll size={16} />
          <span>{hi ? "सर्वे श्लोकाः (All Verses)" : "All Shlokas"}</span>
          <span style={{ background: activeTab === "all" ? "rgba(255,255,255,0.25)" : "var(--bg-tertiary)", padding: "2px 8px", borderRadius: 12, fontSize: 11 }}>
            {SHLOKAS.length}
          </span>
        </button>

        <button
          className={`btn ${activeTab === "favorites" ? "btn-primary" : "btn-outline"}`}
          onClick={() => setActiveTab("favorites")}
          style={{
            borderRadius: 30,
            padding: "8px 20px",
            fontSize: 14,
            fontWeight: 700,
            display: "inline-flex",
            alignItems: "center",
            gap: 8
          }}
        >
          <Star size={16} fill={activeTab === "favorites" ? "#fff" : "var(--vt-orange)"} />
          <span>{hi ? "मम प्रियाः श्लोकाः (Saved)" : "Saved Favorites"}</span>
          <span style={{ background: activeTab === "favorites" ? "rgba(255,255,255,0.25)" : "var(--bg-tertiary)", padding: "2px 8px", borderRadius: 12, fontSize: 11 }}>
            {favorites.length}
          </span>
        </button>

        <button
          className={`btn ${activeTab === "prose" ? "btn-primary" : "btn-outline"}`}
          onClick={() => setActiveTab("prose")}
          style={{
            borderRadius: 30,
            padding: "8px 20px",
            fontSize: 14,
            fontWeight: 700,
            display: "inline-flex",
            alignItems: "center",
            gap: 8
          }}
        >
          <BookOpen size={16} />
          <span>{hi ? "गद्यपाठाः (Classical Prose)" : "Classical Prose Passages"}</span>
        </button>
      </div>

      {/* ─── 4. SUB-CONTROLS & SEARCH BAR ─── */}
      {activeTab !== "prose" && (
        <div className="shloka-controls-bar" style={{ flexDirection: "column", gap: 14 }}>
          {/* Books Ribbon */}
          {activeTab === "books" && (
            <div className="shloka-categories-scroll">
              <button
                className={`shloka-category-tab ${selectedBook === "all" ? "active" : ""}`}
                onClick={() => setSelectedBook("all")}
              >
                <span className="cat-title">{hi ? "सर्वे ग्रन्थाः" : "All Books"}</span>
                <span className="cat-count">{SHLOKAS.length}</span>
              </button>
              {SHLOKA_BOOKS.map((b) => {
                const count = SHLOKAS.filter((s) => s.book === b.id).length;
                const active = selectedBook === b.id;
                return (
                  <button
                    key={b.id}
                    className={`shloka-category-tab ${active ? "active" : ""}`}
                    onClick={() => setSelectedBook(b.id)}
                    title={b.desc}
                  >
                    <span className="cat-title">{hi ? b.titleSanskrit : b.title}</span>
                    <span className="cat-count">{count}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Categories Ribbon */}
          {activeTab === "categories" && (
            <div className="shloka-categories-scroll">
              {SHLOKA_CATEGORIES.map((cat) => {
                const count =
                  cat.id === "all"
                    ? SHLOKAS.length
                    : SHLOKAS.filter((s) => s.category === cat.id).length;
                const active = selectedCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    className={`shloka-category-tab ${active ? "active" : ""}`}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    <span className="cat-title">{hi ? cat.labelHi : cat.label}</span>
                    <span className="cat-count">{count}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Search Input Box */}
          <div className="shloka-search-box" style={{ width: "100%", maxWidth: 680 }}>
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder={
                hi
                  ? "श्लोके, अन्वये, ग्रन्थे अथवा अर्थे अन्वेषणम्... (उदा. कर्म, सत्य, गीता, शांति, विद्या)"
                  : "Search shlokas by text, English/Hindi meaning, book title, or citation..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="clear-search-btn"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
        </div>
      )}

      {/* ─── 5. ACTIVE SCRIPTURE BANNER ─── */}
      {activeTab === "books" && activeBookObj && (
        <div
          className="card"
          style={{
            padding: "20px 24px",
            marginBottom: 24,
            borderRadius: 14,
            background: "linear-gradient(135deg, rgba(255, 106, 0, 0.08) 0%, rgba(63, 81, 181, 0.06) 100%)",
            border: "1.5px solid rgba(255, 106, 0, 0.25)",
            textAlign: "left",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <span style={{ background: "var(--vt-orange)", color: "#fff", padding: "3px 10px", borderRadius: 6, fontSize: 12, fontWeight: 700 }}>
                {activeBookObj.author}
              </span>
              <strong style={{ fontSize: 21, color: "var(--text-primary)" }}>
                {activeBookObj.titleSanskrit} ({activeBookObj.title})
              </strong>
            </div>
            <p style={{ margin: 0, color: "var(--vt-text-light)", fontSize: 14, maxWidth: 780 }}>
              {activeBookObj.desc}
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span className="chip" style={{ fontSize: 13, fontWeight: 700, padding: "6px 14px", background: "var(--bg-secondary)", borderRadius: 20 }}>
              {displayedShlokas.length} {hi ? "श्लोकाः लब्धाः" : "Verses in this Book"}
            </span>
            <button
              className="btn btn-sm btn-outline"
              onClick={() => setSelectedBook("all")}
              style={{ fontSize: 12, borderRadius: 20 }}
            >
              {hi ? "सर्वे ग्रन्थाः" : "All Books"}
            </button>
          </div>
        </div>
      )}

      {/* ─── 6. SHLOKAS GRID ─── */}
      {activeTab !== "prose" && (
        <>
          {displayedShlokas.length === 0 ? (
            <div className="shloka-empty-state">
              <BookOpen size={36} />
              <h4>{t("No shlokas found matching your query")}</h4>
              <p>{t("Try searching with different terms or selecting another scripture or category.")}</p>
              <button
                className="btn btn-sm btn-outline"
                onClick={() => {
                  setSelectedBook("all");
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
              >
                {t("Reset Filters")}
              </button>
            </div>
          ) : (
            <div className="shloka-card-grid">
              {displayedShlokas.map((s) => {
                const isThisPlaying = playerState.currentId === s.id && playerState.isPlaying;
                const isThisPaused = playerState.currentId === s.id && playerState.isPaused;
                const isThisLoading = playerState.currentId === s.id && playerState.isLoading;
                const isFavorited = favorites.includes(s.id);

                return (
                  <article
                    key={s.id}
                    className={`shloka-card ${isThisPlaying ? "playing" : isThisPaused ? "paused" : ""}`}
                  >
                    {/* Top Metadata Bar */}
                    <div className="shloka-card-meta">
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
                        {s.book && (
                          <button
                            onClick={() => {
                              setActiveTab("books");
                              setSelectedBook(s.book);
                            }}
                            style={{
                              background: "rgba(255, 106, 0, 0.12)",
                              color: "var(--vt-orange)",
                              border: "1px solid rgba(255, 106, 0, 0.3)",
                              borderRadius: 20,
                              padding: "2px 10px",
                              fontSize: 11,
                              fontWeight: 700,
                              cursor: "pointer",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 4
                            }}
                            title={hi ? `'${s.bookTitleSanskrit}' ग्रन्थस्य श्लोकाः` : `Filter by ${s.bookTitle}`}
                          >
                            <BookMarked size={12} />
                            <span>{hi ? s.bookTitleSanskrit || s.bookTitle : s.bookTitle}</span>
                          </button>
                        )}
                        <span className="shloka-category-chip">
                          {hi ? s.categoryLabelHi : s.categoryLabel}
                        </span>
                      </div>
                      <span className="shloka-source-badge">{s.source}</span>
                    </div>

                    {/* Devanagari Sanskrit Verse */}
                    <div className="shloka-devanagari">
                      {s.dev.split(" ").map((w, wIdx) => (
                        <span
                          key={wIdx}
                          className="shloka-interactive-word"
                          onClick={() => clickWord(w)}
                          title={t("Click word to inspect grammar & meaning in Explore Panel")}
                        >
                          {w}{" "}
                        </span>
                      ))}
                    </div>

                    {/* IAST Transliteration */}
                    <div className="shloka-iast">{s.iast}</div>

                    {/* Translation & Commentary */}
                    <div className="shloka-translation">
                      <div className="translation-content">
                        {hi && s.translationHi ? s.translationHi : s.translation}
                      </div>
                      {hi && s.translation && (
                        <div style={{ fontSize: 12, color: "var(--vt-text-lighter)", marginTop: 6, fontStyle: "italic" }}>
                          En: {s.translation}
                        </div>
                      )}
                      {!hi && s.translationHi && (
                        <div style={{ fontSize: 12, color: "var(--vt-text-lighter)", marginTop: 6 }}>
                          हिन्दी: {s.translationHi}
                        </div>
                      )}
                    </div>

                    {/* Word-by-word padachheda breakdown */}
                    {s.words && s.words.length > 0 && (
                      <div className="shloka-words-preview">
                        {s.words.slice(0, 6).map((wItem) => (
                          <span
                            key={wItem.word}
                            className="shloka-word-chip"
                            onClick={() => clickWord(wItem.word)}
                          >
                            <strong>{wItem.word}</strong>
                            <span className="gloss">
                              {hi ? wItem.meaningHi || wItem.meaning : wItem.meaning}
                            </span>
                          </span>
                        ))}
                        {s.words.length > 6 && (
                          <span
                            className="shloka-more-words"
                            onClick={() => clickWord(s.words[6].word)}
                          >
                            +{s.words.length - 6} {t("more")}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Card Footer Actions */}
                    <div className="shloka-card-footer">
                      <div className="recitation-controls-group">
                        {isThisPlaying ? (
                          <button
                            className="btn-recite active-playing"
                            onClick={() => shlokaReciter.pause()}
                            title={t("Pause Recitation")}
                          >
                            <Pause size={15} /> <span>{t("Pause")}</span>
                          </button>
                        ) : isThisPaused ? (
                          <button
                            className="btn-recite active-paused"
                            onClick={() => shlokaReciter.resume()}
                            title={t("Resume Recitation")}
                          >
                            <Play size={15} /> <span>{t("Resume")}</span>
                          </button>
                        ) : (
                          <button
                            className="btn-recite"
                            onClick={() => shlokaReciter.play(s.id, s.dev)}
                            title={t("Recite Shloka aloud")}
                            disabled={isThisLoading}
                          >
                            {isThisLoading ? <div className="audio-loading-spinner" /> : <Volume2 size={16} />}
                            <span>{isThisLoading ? t("Loading audio...") : t("Recite Shloka")}</span>
                          </button>
                        )}

                        {(isThisPlaying || isThisPaused) && (
                          <button
                            className="btn-recite-sub"
                            onClick={() => shlokaReciter.replay()}
                            title={t("Replay from beginning")}
                          >
                            <RotateCcw size={14} />
                          </button>
                        )}

                        {(isThisPlaying || isThisPaused) && (
                          <button
                            className="btn-recite-sub"
                            onClick={() => shlokaReciter.stop()}
                            title={t("Stop Recitation")}
                          >
                            <Square size={13} />
                          </button>
                        )}

                        {isThisPlaying && (
                          <div className="audio-waveform-bars" aria-hidden="true">
                            <span className="wave-bar b1" />
                            <span className="wave-bar b2" />
                            <span className="wave-bar b3" />
                            <span className="wave-bar b4" />
                            <span className="wave-bar b5" />
                          </div>
                        )}
                      </div>

                      <div className="shloka-actions-group" style={{ display: "flex", gap: 6 }}>
                        {/* Bookmark / Favorite Button */}
                        <button
                          className="btn-icon-sub"
                          onClick={() => toggleFavorite(s.id)}
                          title={isFavorited ? (hi ? "प्रियाणाम् अपसारय" : "Remove from favorites") : (hi ? "प्रियाणाम् योजय" : "Save to favorites")}
                          style={{ color: isFavorited ? "var(--vt-orange)" : "inherit" }}
                        >
                          <Star size={15} fill={isFavorited ? "var(--vt-orange)" : "none"} />
                        </button>

                        {/* Copy Button */}
                        <button
                          className="btn-icon-sub"
                          onClick={() => handleCopy(s)}
                          title={t("Copy Shloka text & translation")}
                        >
                          {copiedId === s.id ? <Check size={15} color="var(--vt-green)" /> : <Copy size={15} />}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* ─── 7. CLASSICAL PROSE PASSAGES TAB ─── */}
      {activeTab === "prose" && (
        <div style={{ marginTop: 24 }}>
          <h3 style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
            <Scroll size={20} color="var(--vt-orange)" /> <span>{t("Classical Reading Passages")} (गद्यपाठाः)</span>
          </h3>
          {readingPassages.map((p) => (
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
                <strong style={{ fontSize: 17 }}>
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
      )}

      {/* Explore Panel Modal */}
      {exploreWord && <ExplorePanel word={exploreWord} onClose={() => setExploreWord(null)} />}
    </div>
  );
}

export default ShlokaPage;
