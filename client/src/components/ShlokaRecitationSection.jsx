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
  AlertCircle
} from "lucide-react";
import { SHLOKAS, SHLOKA_CATEGORIES } from "../data/shlokas";
import { shlokaReciter } from "../services/recitationAudio";
import { useLanguage } from "../context/LanguageContext";
import { useNavigate } from "react-router-dom";

export default function ShlokaRecitationSection({ onExploreWord, compact = false }) {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const hi = lang === "hi";

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

  const filteredShlokas = useMemo(() => {
    return SHLOKAS.filter((s) => {
      const matchesCategory =
        selectedCategory === "all" || s.category === selectedCategory;

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      return (
        s.dev.toLowerCase().includes(q) ||
        s.iast.toLowerCase().includes(q) ||
        s.translation.toLowerCase().includes(q) ||
        (s.translationHi && s.translationHi.toLowerCase().includes(q)) ||
        s.source.toLowerCase().includes(q)
      );
    });
  }, [selectedCategory, searchQuery]);

  const handleCopy = (shloka) => {
    const textToCopy = `${shloka.dev}\n${shloka.iast}\n\nTranslation: ${shloka.translation}\nSource: ${shloka.source}`;
    navigator.clipboard?.writeText(textToCopy);
    setCopiedId(shloka.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleWordClick = (word) => {
    // Strip dandas and punctuation
    const clean = word.replace(/[।॥,.\-?!:;]/g, "").trim();
    if (!clean) return;

    if (onExploreWord) {
      onExploreWord(clean);
    } else {
      window.dispatchEvent(new CustomEvent("sanskritlab:explore", { detail: clean }));
    }
  };

  return (
    <section className="shloka-recitation-section" id="shlokas">
      <div className="section-header shloka-section-header">
        <div className="shloka-header-badge">
          <Sparkles size={16} />
          <span>{hi ? "पवित्र श्लोक पाठशाला" : "Sanskrit Shloka Recitation Sanctuary"}</span>
        </div>
        <h2>
          {hi ? "संस्कृत श्लोकाः एवं सस्वर पाठः" : "Classical Sanskrit Shlokas & Sacred Recitation"}
        </h2>
        <p>
          {hi
            ? "वैदिक ऋचाओं, उपनिषदों, भगवद्गीता एवं नीति ग्रन्थों के प्रामाणिक श्लोक — अर्थ, पदच्छेद एवं शुद्ध उच्चारण सहित श्रवण करें।"
            : "Discover, read, and listen to authentic Sanskrit verses from the Vedas, Upanishads, and Gita with clear chanting recitation."}
        </p>
      </div>

      {/* Category Pills & Search Filter */}
      <div className="shloka-controls-bar">
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

        <div className="shloka-search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder={
              hi
                ? "श्लोक, अर्थ अथवा ग्रन्थ खोजें..."
                : "Search by Sanskrit text, English meaning, or scripture..."
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

      {/* Global Player Status Feedback if Error */}
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
          <p>{t("Try searching with different terms or selecting another category.")}</p>
          <button
            className="btn btn-sm btn-outline"
            onClick={() => {
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
                {/* Card Top Metadata Bar */}
                <div className="shloka-card-meta">
                  <span className="shloka-category-chip">
                    {hi ? s.categoryLabelHi : s.categoryLabel}
                  </span>
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

                {/* Meaning & Translation */}
                <div className="shloka-translation">
                  <div className="translation-content">
                    {hi && s.translationHi ? s.translationHi : s.translation}
                  </div>
                </div>

                {/* Word Chips Breakdown */}
                {s.words && s.words.length > 0 && (
                  <div className="shloka-words-preview">
                    {s.words.slice(0, 5).map((wItem) => (
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
                    {s.words.length > 5 && (
                      <span
                        className="shloka-more-words"
                        onClick={() => navigate("/tools/shloka")}
                      >
                        +{s.words.length - 5} {t("more")}
                      </span>
                    )}
                  </div>
                )}

                {/* Card Footer: Playback Controls & Actions */}
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

      {/* Footer CTA to Full Shloka Explorer */}
      <div className="shloka-bottom-banner">
        <div className="shloka-bottom-text">
          <h4>{t("Want to analyze and annotate classical texts?")}</h4>
          <p>
            {t("Explore full metric meters, word-by-word sandhi breakdown, and multi-layered commentary in the dedicated Shloka Explorer.")}
          </p>
        </div>
        <button
          className="btn btn-outline"
          onClick={() => navigate("/tools/shloka")}
          style={{ whiteSpace: "nowrap" }}
        >
          {t("Open Shloka Explorer")} <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}
