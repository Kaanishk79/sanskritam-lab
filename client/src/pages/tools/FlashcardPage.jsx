import { useState, useEffect } from "react";
import { BarChart3, BookOpen, Target, Lightbulb, Trophy } from "lucide-react";
import { flashcards, flashcardDecks } from "../../data/flashcards";
import { loadSRS, saveSRS, initCards, getDueCards, getNewCards, getStats, gradeCard } from "../../services/srs";
import { loadFlashcards, loadFlashcardDecks } from "../../services/contentDb";
import { syncSRSFromDb, persistSRSToDb } from "../../services/userDb";
import { useLanguage } from "../../context/LanguageContext";
import { DynamicIcon } from "../../components/icons";
const TAG_HI = {
  vowel: "\u0938\u094D\u0935\u0930",
  consonant: "\u0935\u094D\u092F\u0902\u091C\u0928",
  noun: "\u0938\u0902\u091C\u094D\u091E\u093E",
  family: "\u092A\u0930\u093F\u0935\u093E\u0930",
  nature: "\u092A\u094D\u0930\u0915\u0943\u0924\u093F",
  verb: "\u0915\u094D\u0930\u093F\u092F\u093E",
  adjective: "\u0935\u093F\u0936\u0947\u0937\u0923",
  case: "\u0935\u093F\u092D\u0915\u094D\u0924\u093F",
  karaka: "\u0915\u093E\u0930\u0915",
  sandhi: "\u0938\u0902\u0927\u093F",
  compound: "\u0938\u092E\u093E\u0938",
  tatpurusa: "\u0924\u0924\u094D\u092A\u0941\u0930\u0941\u0937",
  bahuvrihi: "\u092C\u0939\u0941\u0935\u094D\u0930\u0940\u0939\u093F",
  karmadharaya: "\u0915\u0930\u094D\u092E\u0927\u093E\u0930\u092F",
  dvandva: "\u0926\u094D\u0935\u0928\u094D\u0926\u094D\u0935",
  avyayibhava: "\u0905\u0935\u094D\u092F\u092F\u0940\u092D\u093E\u0935",
  tense: "\u0915\u093E\u0932",
  mood: "\u0935\u0943\u0924\u094D\u0924\u093F",
  metre: "\u091B\u0902\u0926",
  grammar: "\u0935\u094D\u092F\u093E\u0915\u0930\u0923",
  text: "\u0917\u094D\u0930\u0902\u0925",
  school: "\u092A\u093E\u0920\u094D\u092F\u092A\u0941\u0938\u094D\u0924\u0915",
  academic: "\u0936\u0948\u0915\u094D\u0937\u0923\u093F\u0915",
  author: "\u0932\u0947\u0916\u0915",
  category: "\u0936\u094D\u0930\u0947\u0923\u0940",
  genre: "\u0935\u093F\u0927\u093E",
  drama: "\u0928\u093E\u091F\u0915",
  poetry: "\u0915\u093E\u0935\u094D\u092F",
  epic: "\u092E\u0939\u093E\u0915\u093E\u0935\u094D\u092F",
  gita: "\u0917\u0940\u0924\u093E",
  kalidasa: "\u0915\u093E\u0932\u093F\u0926\u093E\u0938",
  nyaya: "\u0928\u094D\u092F\u093E\u092F",
  epistemology: "\u091C\u094D\u091E\u093E\u0928\u092E\u0940\u092E\u093E\u0902\u0938\u093E",
  logic: "\u0924\u0930\u094D\u0915",
  vedanta: "\u0935\u0947\u0926\u093E\u0902\u0924",
  philosophy: "\u0926\u0930\u094D\u0936\u0928",
  philosopher: "\u0926\u093E\u0930\u094D\u0936\u0928\u093F\u0915",
  yoga: "\u092F\u094B\u0917",
  research: "\u0936\u094B\u0927",
  textcrit: "\u092A\u093E\u0920\u094D\u092F-\u0938\u092E\u093E\u0932\u094B\u091A\u0928\u093E",
  paleography: "\u092A\u094D\u0930\u093E\u091A\u0940\u0928 \u0932\u0947\u0916\u0928",
  codicology: "\u0917\u094D\u0930\u0902\u0925-\u0935\u093F\u091C\u094D\u091E\u093E\u0928",
  digital: "\u0921\u093F\u091C\u093F\u091F\u0932"
};
function FlashcardPage() {
  const { t, lang } = useLanguage();
  const [srsState, setSrsState] = useState(loadSRS());
  const [cardPool, setCardPool] = useState(flashcards);
  const [decks, setDecks] = useState(flashcardDecks);
  const [deck, setDeck] = useState("all");
  const [mode, setMode] = useState("stats");
  const [currentCard, setCurrentCard] = useState(null);
  const [showBack, setShowBack] = useState(false);
  const [cardsLeft, setCardsLeft] = useState(0);
  useEffect(() => {
    let live = true;
    loadFlashcards().then((fc) => {
      if (!live) return;
      setCardPool(fc);
      const state = loadSRS();
      const initialized = initCards(fc, state.cards);
      if (initialized !== state.cards) {
        const newState = { ...state, cards: initialized };
        saveSRS(newState);
        persistSRSToDb(newState);
        setSrsState(newState);
      } else {
        setSrsState(state);
      }
      syncSRSFromDb().then((dbState) => {
        if (dbState) {
          const merged = { ...dbState, cards: initCards(fc, dbState.cards) };
          setSrsState(merged);
          saveSRS(merged);
        }
      });
    });
    loadFlashcardDecks().then((d) => {
      if (live) setDecks(d);
    });
    return () => {
      live = false;
    };
  }, []);
  const stats = getStats(srsState.cards);
  const startReview = () => {
    const due = getDueCards(srsState.cards, deck);
    const newc = getNewCards(srsState.cards, deck);
    const all = [...due, ...newc];
    if (all.length === 0) return;
    setCurrentCard(all[0]);
    setCardsLeft(all.length - 1);
    setShowBack(false);
    setMode("review");
  };
  const handleGrade = (quality) => {
    if (!currentCard) return;
    const updated = gradeCard(srsState.cards, currentCard.card.id, quality);
    const newState = { ...srsState, cards: updated };
    setSrsState(newState);
    saveSRS(newState);
    persistSRSToDb(newState);
    const due = getDueCards(updated, deck);
    const newc = getNewCards(updated, deck);
    const remaining = [...due, ...newc].filter((c) => c.card.id !== currentCard.card.id);
    if (remaining.length > 0) {
      setCurrentCard(remaining[0]);
      setCardsLeft(remaining.length - 1);
      setShowBack(false);
    } else {
      setMode("stats");
      setCurrentCard(null);
    }
  };
  const deckCards = deck === "all" ? cardPool : cardPool.filter((f) => f.deckId === deck);
  const currentDeckName = deck === "all" ? t("All Decks") : lang === "hi" ? decks.find((d) => d.id === deck)?.nameHi || decks.find((d) => d.id === deck)?.name || t("All Decks") : decks.find((d) => d.id === deck)?.name || t("All Decks");
  return <div className="page-container">
      <div className="page-header">
        <h2>{t("Spaced Repetition Flashcards")}</h2>
        <p>{t("Anki-style SM-2 algorithm \u2014 master Sanskrit vocabulary, grammar, and more")}</p>
      </div>

      <div className="flashcard-mode-bar">
        <button className={`btn btn-sm ${mode === "stats" ? "btn-primary" : "btn-secondary"}`} onClick={() => setMode("stats")} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <BarChart3 size={14} /> <span>{t("Stats")}</span>
        </button>
        <button className={`btn btn-sm ${mode === "browse" ? "btn-primary" : "btn-secondary"}`} onClick={() => setMode("browse")} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <BookOpen size={14} /> <span>{t("Browse")}</span>
        </button>
        <button className={`btn btn-sm ${mode === "review" ? "btn-primary" : "btn-secondary"}`} onClick={() => {
    if (mode !== "review") startReview();
  }} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <Target size={14} /> <span>{t("Review")}</span>
        </button>
      </div>

      {mode === "stats" && <div>
          <div className="flashcard-deck-select">
            <span>{t("Deck:")}</span>
            <select value={deck} onChange={(e) => setDeck(e.target.value)}>
              <option value="all">{t("All Decks")}</option>
              {decks.map((d) => <option key={d.id} value={d.id}>{lang === "hi" ? d.nameHi || d.name : d.name}</option>)}
            </select>
            <button className="btn btn-primary btn-sm" onClick={startReview}>{t("Start Review")}</button>
          </div>

          <div className="flashcard-stats-grid">
            <div className="stat-card">
              <div className="stat-value">{stats.total}</div>
              <div className="stat-label">{t("Total Cards")}</div>
            </div>
            <div className="stat-card accent">
              <div className="stat-value">{stats.due + stats.newCards}</div>
              <div className="stat-label">{t("Due for Review")}</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{stats.newCards}</div>
              <div className="stat-label">{t("New")}</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{stats.young}</div>
              <div className="stat-label">{t("Learning")}</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{stats.mature}</div>
              <div className="stat-label">{t("Mature")}</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{stats.reviewed}</div>
              <div className="stat-label">{t("Reviewed")}</div>
            </div>
          </div>

          <div className="flashcard-decks-grid">
            {decks.map((d) => {
    const c = cardPool.filter((f) => f.deckId === d.id);
    const due = getDueCards(srsState.cards, d.id).length;
    return <div key={d.id} className="card deck-card" onClick={() => {
      setDeck(d.id);
      startReview();
    }}>
                  <div className="deck-icon" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                    <DynamicIcon name={d.icon} size={28} />
                  </div>
                  <div className="deck-name">{lang === "hi" ? d.nameHi || d.name : d.name}</div>
                  <div className="deck-count">{c.length} {t("cards")} · {due} {t("due")}</div>
                </div>;
  })}
          </div>
        </div>}

      {mode === "review" && currentCard && <div className="flashcard-review">
          <div className="flashcard-counter">{cardsLeft + 1} {t("remaining")}</div>

          <div className={`flashcard-card ${showBack ? "flipped" : ""}`} onClick={() => setShowBack(true)}>
            <div className="flashcard-inner">
              <div className="flashcard-front">
                <div className="flashcard-text">{currentCard.card.front}</div>
                {!showBack && <div className="flashcard-tap">{t("Tap to reveal")}</div>}
              </div>
              <div className="flashcard-back">
                <div className="flashcard-text">{lang === "hi" && currentCard.card.backHi ? currentCard.card.backHi : currentCard.card.back}</div>
                {(lang === "hi" ? currentCard.card.hintHi || currentCard.card.hint : currentCard.card.hint) && <div className="flashcard-hint" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                    <Lightbulb size={14} color="#ffd54f" />
                    <span>{lang === "hi" && currentCard.card.hintHi ? currentCard.card.hintHi : currentCard.card.hint}</span>
                  </div>}
                <div className="flashcard-tags">
                  {currentCard.card.tags.map((tg) => <span key={tg} className="tag">{lang === "hi" ? TAG_HI[tg] || tg : tg}</span>)}
                </div>
              </div>
            </div>
          </div>

          {showBack && <div className="flashcard-grade">
              <p>{t("How well did you know this?")}</p>
              <div className="flashcard-grade-btns">
                <button className="btn grade-again" onClick={() => handleGrade(0)}>{t("Again")}</button>
                <button className="btn grade-hard" onClick={() => handleGrade(2)}>{t("Hard")}</button>
                <button className="btn grade-good" onClick={() => handleGrade(3)}>{t("Good")}</button>
                <button className="btn grade-easy" onClick={() => handleGrade(5)}>{t("Easy")}</button>
              </div>
            </div>}
        </div>}

      {mode === "review" && !currentCard && <div className="card" style={{ textAlign: "center", padding: 48 }}>
          <div style={{ display: "inline-flex", justifyContent: "center", marginBottom: 16 }}>
            <Trophy size={48} color="#2ecc71" />
          </div>
          <h3>{t("All caught up!")}</h3>
          <p>{t("No due cards in {0}. Come back later.").replace("{0}", currentDeckName)}</p>
          <button className="btn btn-primary" onClick={() => setMode("stats")}>{t("Back to Stats")}</button>
        </div>}

      {mode === "browse" && <div>
          <div className="flashcard-deck-select">
            <span>{t("Deck:")}</span>
            <select value={deck} onChange={(e) => setDeck(e.target.value)}>
              <option value="all">{t("All Decks")}</option>
              {decks.map((d) => <option key={d.id} value={d.id}>{lang === "hi" ? d.nameHi || d.name : d.name}</option>)}
            </select>
            <span className="browse-count">{deckCards.length} {t("cards")}</span>
          </div>

          <div className="flashcard-browse-grid">
            {deckCards.map((fc) => {
    const sc = srsState.cards[fc.id];
    const isNew = !sc || sc.repetitions === 0;
    const due = sc && sc.nextReview <= Date.now();
    return <div key={fc.id} className={`browse-card ${isNew ? "new" : ""} ${due ? "due" : ""}`}>
                  <div className="browse-front">{fc.front}</div>
                  <div className="browse-back">{lang === "hi" && fc.backHi ? fc.backHi : fc.back}</div>
                  <div className="browse-meta">
                    {fc.tags.map((tg) => <span key={tg} className="tag">{lang === "hi" ? TAG_HI[tg] || tg : tg}</span>)}
                    {isNew && <span className="badge badge-new">{t("New")}</span>}
                    {due && <span className="badge badge-due">{t("Due")}</span>}
                    {sc && sc.repetitions > 0 && <span className="badge badge-learned">{t("Ease:")} {sc.ease}</span>}
                  </div>
                </div>;
  })}
          </div>
        </div>}

      {mode === "browse" && deckCards.length === 0 && <div className="card" style={{ textAlign: "center", padding: 32 }}>
          <p>{t("No cards in this deck.")}</p>
        </div>}
    </div>;
}
export {
  FlashcardPage as default
};
