const STORAGE_KEY = "sanskritlab-srs";

function getDefaultSRSState() {
  return { cards: {}, currentDeck: "all" };
}

function loadSRS() {
  try {
    if (typeof localStorage !== "undefined") {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    }
  } catch (e) {
    console.warn("[srs] Failed to load SRS state:", e);
  }
  return getDefaultSRSState();
}

function saveSRS(state) {
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  } catch (e) {
    console.warn("[srs] Failed to save SRS state (quota exceeded or disabled):", e);
  }
}

function initCards(flashcards, existing) {
  const result = { ...existing };
  for (const fc of flashcards) {
    if (!result[fc.id]) {
      result[fc.id] = {
        card: fc,
        ease: 2.5,
        interval: 0,
        repetitions: 0,
        nextReview: Date.now(),
        lastReviewed: null
      };
    }
  }
  return result;
}

function getDueCards(cards, deckId) {
  const now = Date.now();
  return Object.values(cards || {})
    .filter((c) => {
      if (!c || !c.card) return false;
      if (c.nextReview > now) return false;
      if (deckId && deckId !== "all" && c.card.deckId !== deckId) return false;
      return true;
    })
    .sort((a, b) => a.nextReview - b.nextReview);
}

function getNewCards(cards, deckId) {
  return Object.values(cards || {}).filter((c) => {
    if (!c || !c.card) return false;
    if (c.repetitions > 0) return false;
    if (deckId && deckId !== "all" && c.card.deckId !== deckId) return false;
    return true;
  });
}

function getStats(cards) {
  const values = Object.values(cards || {}).filter((c) => c && c.card);
  const due = getDueCards(cards);
  const newCards = getNewCards(cards);
  const mature = values.filter((c) => c.interval >= 21);
  const young = values.filter((c) => c.interval > 0 && c.interval < 21);
  return {
    total: values.length,
    due: due.length,
    newCards: newCards.length,
    mature: mature.length,
    young: young.length,
    reviewed: values.filter((c) => c.repetitions > 0).length
  };
}

function gradeCard(cards, cardId, quality, currentDeck) {
  const result = { ...cards };
  const sc = result[cardId];
  if (!sc) return result;
  let { ease, interval, repetitions } = sc;
  if (quality < 3) {
    repetitions = 0;
    interval = 1;
  } else {
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * ease);
    }
    repetitions++;
  }
  ease = Math.max(1.3, ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
  result[cardId] = {
    ...sc,
    ease: Math.round(ease * 100) / 100,
    interval,
    repetitions,
    nextReview: Date.now() + interval * 864e5,
    lastReviewed: Date.now()
  };

  const prev = loadSRS();
  saveSRS({
    ...prev,
    currentDeck: currentDeck !== undefined ? currentDeck : prev.currentDeck,
    cards: result
  });
  return result;
}

export {
  getDefaultSRSState,
  getDueCards,
  getNewCards,
  getStats,
  gradeCard,
  initCards,
  loadSRS,
  saveSRS
};
