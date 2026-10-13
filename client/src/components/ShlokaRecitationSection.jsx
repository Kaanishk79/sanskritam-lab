import { useState, useEffect, useMemo } from "react";
import {
  Volume2,
  Pause,
  Play,
  RotateCcw,
  Square,
  Search,
  Sparkles,
  Copy,
  Check,
  BookOpen,
  ArrowRight,
  AlertCircle,
  BookMarked,
  Layers,
  Scroll,
  Flame,
  Award,
  Shield,
  Scale
} from "lucide-react";
import { SHLOKAS, SHLOKA_CATEGORIES, SHLOKA_BOOKS } from "../data/shlokas";
import { shlokaReciter } from "../services/recitationAudio";
import { useLanguage } from "../context/LanguageContext";
import { useNavigate } from "react-router-dom";

export default function ShlokaRecitationSection({ onExploreWord, compact = false, initialBook = null }) {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const hi = lang === "hi";

  // Navigation mode: "books" | "categories" | "all"
  const [activeTabMode, setActiveTabMode] = useState("books");
  const [selectedBook, setSelectedBook] = useState(initialBook || "all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [playerState, setPlayerState] = useState(shlokaReciter.getState());

  useEffect(() => {
    const unsubscribe = shlokaReciter.subscribe((state) => {
      setPlayerState(state);
    });
    return () => {
      unsubscribe();
      shlokaReciter.stop();
    };
  }, []);

  const activeBookObj = useMemo(() => {
    if (selectedBook === "all") return null;
    return SHLOKA_BOOKS.find((b) => b.id === selectedBook) || null;
  }, [selectedBook]);

  const filteredShlokas = useMemo(() => {
    return SHLOKAS.filter((s) => {
      // 1. Tab mode filter
      if (activeTabMode === "books" && selectedBook !== "all") {
        if (s.book !== selectedBook) return false;
      } else if (activeTabMode === "categories" && selectedCategory !== "all") {
        if (s.category !== selectedCategory) return false;
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
  }, [activeTabMode, selectedBook, selectedCategory, searchQuery]);

  const handleCopy = (shloka) => {
    const textToCopy = `${shloka.dev}\n${shloka.iast}\n\nEnglish: ${shloka.translation}\nHindi: ${shloka.translationHi || ""}\nSource: ${shloka.source}`;
    navigator.clipboard?.writeText(textToCopy);
    setCopiedId(shloka.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleWordClick = (word) => {
    const clean = word.replace(/[।॥,.\-?!:;]/g, "").trim();
    if (!clean) return;

    if (onExploreWord) {
      onExploreWord(clean);
    } else {
      window.dispatchEvent(new CustomEvent("sanskritlab:explore", { detail: clean }));
    }
  };

  const selectBookTab = (bookId) => {
    setActiveTabMode("books");
    setSelectedBook(bookId);
  };

  return (
    <section className="shloka-recitation-section" id="shlokas">
      <div className="section-header shloka-section-header">
        <div className="shloka-header-badge">
          <Sparkles size={16} />
          <span>{hi ? "पवित्र श्लोक एवं ग्रन्थ संग्रहः" : "Classical Shloka & Scripture Sanctuary"}</span>
        </div>
        <h2>
          {hi ? "संस्कृत श्लोकाः — ग्रन्थानुरूपं वर्गीकृताः" : "Classical Sanskrit Shlokas & Sacred Recitation"}
        </h2>
        <p>
          {hi
            ? "भगवद्गीता, वाल्मीकि रामायण, उपनिषद, वेद, हितोपदेश, पञ्चतन्त्र एवं नीतिशतक आदि ग्रन्थों से संकलित ७०+ प्रामाणिक श्लोक — अन्वय, अर्थ एवं सस्वर पाठ सहित।"
            : "Explore 70+ authentic Sanskrit shlokas organized by scripture and classical book — complete with English & Hindi meanings, word analysis, and audio recitation."}
        </p>
      </div>

      {/* Primary Mode Tabs (By Book vs By Category vs All) */}
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
          className={`btn ${activeTabMode === "books" ? "btn-primary" : "btn-outline"}`}
          onClick={() => setActiveTabMode("books")}
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
          <span>{hi ? "ग्रन्थाः (By Scripture & Book)" : "By Book / Scripture"}</span>
          <span
            style={{
              background: activeTabMode === "books" ? "rgba(255,255,255,0.25)" : "var(--bg-tertiary)",
              padding: "2px 8px",
              borderRadius: 12,
              fontSize: 11
            }}
          >
            {SHLOKA_BOOKS.length} {hi ? "ग्रन्थाः" : "Books"}
          </span>
        </button>

        <button
          className={`btn ${activeTabMode === "categories" ? "btn-primary" : "btn-outline"}`}
          onClick={() => setActiveTabMode("categories")}
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
          <span>{hi ? "विषयाः (By Theme / Category)" : "By Theme / Topic"}</span>
          <span
            style={{
              background: activeTabMode === "categories" ? "rgba(255,255,255,0.25)" : "var(--bg-tertiary)",
              padding: "2px 8px",
              borderRadius: 12,
              fontSize: 11
            }}
          >
            {SHLOKA_CATEGORIES.length - 1} {hi ? "विषयाः" : "Themes"}
          </span>
        </button>

        <button
          className={`btn ${activeTabMode === "all" ? "btn-primary" : "btn-outline"}`}
          onClick={() => {
            setActiveTabMode("all");
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
          <span
            style={{
              background: activeTabMode === "all" ? "rgba(255,255,255,0.25)" : "var(--bg-tertiary)",
              padding: "2px 8px",
              borderRadius: 12,
              fontSize: 11
            }}
          >
            {SHLOKAS.length}
          </span>
        </button>
      </div>

      {/* Sub-Selector Ribbon based on Active Tab Mode */}
      <div className="shloka-controls-bar" style={{ flexDirection: "column", gap: 14 }}>
        {/* Books Scroll Selector */}
        {activeTabMode === "books" && (
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

        {/* Categories Scroll Selector */}
        {activeTabMode === "categories" && (
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

        {/* Search Bar */}
        <div className="shloka-search-box" style={{ width: "100%", maxWidth: 640 }}>
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder={
              hi
                ? "श्लोक, शब्द, ग्रन्थ अथवा हिन्दी/अंग्रेजी अर्थ खोजें..."
                : "Search shlokas by text, meaning, book title, or source citation..."
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

      {/* Active Book Showcase Banner (when a book is selected in By Book mode) */}
      {activeTabMode === "books" && activeBookObj && (
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
              <span
                style={{
                  background: "var(--vt-orange)",
                  color: "#fff",
                  padding: "3px 10px",
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 700
                }}
              >
                {activeBookObj.author}
              </span>
              <strong style={{ fontSize: 20, color: "var(--text-primary)" }}>
                {activeBookObj.titleSanskrit} ({activeBookObj.title})
              </strong>
            </div>
            <p style={{ margin: 0, color: "var(--vt-text-light)", fontSize: 14, maxWidth: 780 }}>
              {activeBookObj.desc}
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              className="chip"
              style={{
                fontSize: 13,
                fontWeight: 700,
                padding: "6px 14px",
                background: "var(--bg-secondary)",
                borderRadius: 20
              }}
            >
              {filteredShlokas.length} {hi ? "श्लोकाः उपलभ्यन्ते" : "Shlokas in this Book"}
            </span>
            <button
              className="btn btn-sm btn-outline"
              onClick={() => setSelectedBook("all")}
              style={{ fontSize: 12, borderRadius: 20 }}
            >
              {hi ? "सर्वे ग्रन्थाः पश्यन्तु" : "View All Books"}
            </button>
          </div>
        </div>
      )}

      {/* Global Player Error Feedback */}
      {playerState.errorMessage && (
        <div className="shloka-player-alert">
          <AlertCircle size={18} />
          <span>{playerState.errorMessage}</span>
          <button
            className="dismiss-alert-btn"
            onClick={() => shlokaReciter.stop()}
          >
            {t("Dismiss")}
          </button>
        </div>
      )}

      {/* Shlokas Grid */}
      {filteredShlokas.length === 0 ? (
        <div className="shloka-empty-state">
          <BookOpen size={36} />
          <h4>{t("No shlokas found matching your query")}</h4>
          <p>{t("Try searching with different terms or selecting another book or category.")}</p>
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
          {filteredShlokas.map((s) => {
            const isThisPlaying =
              playerState.currentId === s.id && playerState.isPlaying;
            const isThisPaused =
              playerState.currentId === s.id && playerState.isPaused;
            const isThisLoading =
              playerState.currentId === s.id && playerState.isLoading;

            return (
              <article
                key={s.id}
                className={`shloka-card ${
                  isThisPlaying ? "playing" : isThisPaused ? "paused" : ""
                }`}
              >
                {/* Card Top Metadata Bar with Book Pill & Source Citation */}
                <div className="shloka-card-meta">
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
                    {s.book && (
                      <button
                        onClick={() => selectBookTab(s.book)}
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
                        title={hi ? `'${s.bookTitleSanskrit}' ग्रन्थस्य श्लोकाः पश्यन्तु` : `Filter by ${s.bookTitle}`}
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

                {/* Original Sanskrit Text in Devanagari */}
                <div className="shloka-devanagari">
                  {s.dev.split(" ").map((w, wIdx) => (
                    <span
                      key={wIdx}
                      className="shloka-interactive-word"
                      onClick={() => handleWordClick(w)}
                      title={t("Click word to inspect grammar & meaning in Explore Panel")}
                    >
                      {w}{" "}
                    </span>
                  ))}
                </div>

                {/* Roman IAST Transliteration */}
                <div className="shloka-iast">{s.iast}</div>

                {/* Meaning & Translation (Bilingual) */}
                <div className="shloka-translation">
                  <div className="translation-content">
                    {hi && s.translationHi ? s.translationHi : s.translation}
                  </div>
                  {/* Secondary English meaning when viewing Hindi or vice versa */}
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

                {/* Word Breakdown Preview */}
                {s.words && s.words.length > 0 && (
                  <div className="shloka-words-preview">
                    {s.words.slice(0, 6).map((wItem) => (
                      <span
                        key={wItem.word}
                        className="shloka-word-chip"
                        onClick={() => handleWordClick(wItem.word)}
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
                        onClick={() => handleWordClick(s.words[6].word)}
                      >
                        +{s.words.length - 6} {t("more")}
                      </span>
                    )}
                  </div>
                )}

                {/* Card Footer: Playback Controls & Copy Action */}
                <div className="shloka-card-footer">
                  <div className="recitation-controls-group">
                    {/* Primary Play/Pause Button */}
                    {isThisPlaying ? (
                      <button
                        className="btn-recite active-playing"
                        onClick={() => shlokaReciter.pause()}
                        title={t("Pause Recitation")}
                        aria-label="Pause"
                      >
                        <Pause size={15} />
                        <span>{t("Pause")}</span>
                      </button>
                    ) : isThisPaused ? (
                      <button
                        className="btn-recite active-paused"
                        onClick={() => shlokaReciter.resume()}
                        title={t("Resume Recitation")}
                        aria-label="Resume"
                      >
                        <Play size={15} />
                        <span>{t("Resume")}</span>
                      </button>
                    ) : (
                      <button
                        className="btn-recite"
                        onClick={() => shlokaReciter.play(s.id, s.dev)}
                        title={t("Recite Shloka aloud")}
                        aria-label="Recite Shloka"
                        disabled={isThisLoading}
                      >
                        {isThisLoading ? (
                          <div className="audio-loading-spinner" />
                        ) : (
                          <Volume2 size={16} />
                        )}
                        <span>
                          {isThisLoading
                            ? t("Loading audio...")
                            : t("Recite Shloka")}
                        </span>
                      </button>
                    )}

                    {/* Secondary Replay / Restart Control */}
                    {(isThisPlaying || isThisPaused) && (
                      <button
                        className="btn-recite-sub"
                        onClick={() => shlokaReciter.replay()}
                        title={t("Replay from beginning")}
                        aria-label="Replay"
                      >
                        <RotateCcw size={14} />
                      </button>
                    )}

                    {/* Stop Control */}
                    {(isThisPlaying || isThisPaused) && (
                      <button
                        className="btn-recite-sub"
                        onClick={() => shlokaReciter.stop()}
                        title={t("Stop Recitation")}
                        aria-label="Stop"
                      >
                        <Square size={13} />
                      </button>
                    )}

                    {/* Waveform Visualizer Animation during Recitation */}
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

                  <div className="shloka-actions-group">
                    <button
                      className="btn-icon-sub"
                      onClick={() => handleCopy(s)}
                      title={t("Copy Shloka text & translation")}
                      aria-label="Copy"
                    >
                      {copiedId === s.id ? (
                        <Check size={15} color="var(--vt-green)" />
                      ) : (
                        <Copy size={15} />
                      )}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Footer Banner */}
      <div className="shloka-bottom-banner">
        <div className="shloka-bottom-text">
          <h4>{t("Want to explore Sanskrit grammar and roots in depth?")}</h4>
          <p>
            {t("Click any word in any shloka to analyze its grammatical base, verbal root (dhātu), and Monier-Williams lexicon definition in the Explore Panel.")}
          </p>
        </div>
        <button
          className="btn btn-outline"
          onClick={() => navigate("/search?cat=shlokas")}
          style={{ whiteSpace: "nowrap" }}
        >
          {t("Search Shlokas in Khoj")} <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}
