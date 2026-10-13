import { supabase } from "./supabase";
import { SENTENCES } from "../data/sentenceBuilder";
import { CONCEPTS as REAL_CONCEPTS } from "../data/realWorld";
import { FESTIVALS, RITUS } from "../data/cultureCalendar";
import { QUOTES } from "../data/quotes";
import { CONCEPTS as EXPL_CONCEPTS } from "../data/conceptExplorer";
import { WORD_PAIRS, DEV_NUMBERS, SANDHI_PAIRS } from "../data/games";
import { DEBATE_TOPICS } from "../data/debates";
import { METERS, VERSE_THEMES } from "../data/creativeStudio";
import { VIVA_QUESTIONS } from "../data/viva";
import { TIMELINE_EVENTS } from "../data/timeline";
import { GRAMMAR_RULES, PHILOSOPHY_NETWORKS } from "../data/grammarMaps";
import { MANUSCRIPTS } from "../data/viewer";
import { SHLOKAS } from "../data/shlokas";
import { DHATUS } from "../data/dhatus";
import { prepTopics, newsArticles } from "../data/jeopardySite";
import { jeopardyCategories, doubleJeopardyCategories, finalJeopardy } from "../data/jeopardy";
import { anytimeTestQuestions } from "../data/jeopardyTest";
import { flashcardDecks, flashcards } from "../data/flashcards";
import { STORY_THEMES } from "../data/storyGenerator";
import { readingPassages } from "../data/languageLab";
async function loadRows(table) {
  try {
    const { data, error } = await supabase.from(table).select("*");
    if (error || !data || data.length === 0) return [];
    return data;
  } catch {
    return [];
  }
}
async function loadSentences() {
  const rows = await loadRows("sentence_builder_sentences");
  if (!rows.length) return SENTENCES;
  return rows.map((r) => ({
    id: String(r.id),
    level: r.level,
    sa: String(r.sa),
    iast: String(r.iast ?? ""),
    en: String(r.en ?? ""),
    words: r.words ?? []
  })).sort((a, b) => a.id < b.id ? -1 : 1);
}
async function loadRealWorldConcepts() {
  const rows = await loadRows("real_world_concepts");
  if (!rows.length) return REAL_CONCEPTS;
  return rows.map((r) => ({
    word: String(r.word),
    iast: String(r.iast ?? ""),
    meaning: String(r.meaning ?? ""),
    today: String(r.today ?? ""),
    example: String(r.example ?? ""),
    exampleEn: String(r.example_en ?? ""),
    emoji: String(r.emoji ?? "")
  })).map((c) => {
    const loc = REAL_CONCEPTS.find((x) => x.word === c.word);
    return loc ? { ...c, meaningHi: loc.meaningHi, todayHi: loc.todayHi, exampleHi: loc.exampleHi } : c;
  });
}
async function loadFestivals() {
  const rows = await loadRows("culture_festivals");
  if (!rows.length) return FESTIVALS;
  return rows.map((r) => {
    const loc = FESTIVALS.find((x) => x.id === String(r.id));
    return {
      id: String(r.id),
      name: String(r.name ?? ""),
      emoji: String(r.emoji ?? ""),
      icon: loc?.icon || "sparkles",
      month: Number(r.month ?? 1),
      day: Number(r.day ?? 1),
      approx: String(r.approx ?? ""),
      tithi: String(r.tithi ?? ""),
      meaning: String(r.meaning ?? ""),
      how: String(r.how ?? ""),
      phrase: String(r.phrase ?? ""),
      phraseEn: String(r.phrase_en ?? ""),
      nameHi: loc?.nameHi,
      approxHi: loc?.approxHi,
      tithiHi: loc?.tithiHi,
      meaningHi: loc?.meaningHi,
      howHi: loc?.howHi,
      phraseEnHi: loc?.phraseEnHi
    };
  }).sort((a, b) => a.month === b.month ? a.day - b.day : a.month - b.month);
}
async function loadRitus() {
  const rows = await loadRows("culture_ritus");
  if (!rows.length) return RITUS;
  return rows.map((r) => {
    const loc = RITUS.find((x) => x.name === String(r.name));
    return {
      name: String(r.name),
      months: String(r.months ?? ""),
      season: String(r.season ?? ""),
      emoji: String(r.emoji ?? ""),
      icon: loc?.icon || "sparkles",
      verse: String(r.verse ?? ""),
      monthsHi: loc?.monthsHi,
      seasonHi: loc?.seasonHi
    };
  });
}
async function loadQuotes() {
  const rows = await loadRows("quotes");
  if (!rows.length) return QUOTES;
  return rows.map((r) => ({
    id: String(r.id),
    sa: String(r.sa),
    iast: String(r.iast ?? ""),
    en: String(r.en ?? ""),
    speaker: String(r.speaker ?? ""),
    source: String(r.source ?? ""),
    category: String(r.category ?? "")
  }));
}
async function loadExplorerConcepts() {
  const rows = await loadRows("concept_explorer_concepts");
  if (!rows.length) return EXPL_CONCEPTS;
  return rows.map((r) => ({
    id: String(r.id),
    sa: String(r.sa),
    en: String(r.en ?? ""),
    cat: r.cat,
    def: String(r.def ?? ""),
    detail: String(r.detail ?? ""),
    example: String(r.example ?? ""),
    exampleEn: String(r.example_en ?? ""),
    related: r.related ?? [],
    emoji: String(r.emoji ?? "")
  })).map((c) => {
    const loc = EXPL_CONCEPTS.find((x) => x.id === c.id);
    return loc ? { ...c, defHi: loc.defHi, detailHi: loc.detailHi, exampleEnHi: loc.exampleEnHi } : c;
  });
}
async function loadWordPairs() {
  const rows = await loadRows("game_word_pairs");
  if (!rows.length) return WORD_PAIRS;
  return rows.map((r) => ({ sa: String(r.sa), iast: String(r.iast ?? ""), en: String(r.en ?? "") }));
}
async function loadDevNumbers() {
  const rows = await loadRows("game_numbers");
  if (!rows.length) return DEV_NUMBERS;
  return rows.map((r) => ({ n: Number(r.n), dev: String(r.dev), word: String(r.word), iast: String(r.iast ?? "") }));
}
async function loadSandhiPairs() {
  const rows = await loadRows("game_sandhi_pairs");
  if (!rows.length) return SANDHI_PAIRS;
  return rows.map((r) => ({ a: String(r.a), b: String(r.b) }));
}
async function loadDebateTopics() {
  const rows = await loadRows("debate_topics");
  if (!rows.length) return DEBATE_TOPICS;
  return rows.map((r) => ({
    id: String(r.id),
    title: String(r.title ?? ""),
    emoji: String(r.emoji ?? ""),
    question: String(r.question ?? ""),
    for: r.for_side ?? { side: "for", label: "For", points: [] },
    against: r.against_side ?? { side: "against", label: "Against", points: [] }
  })).map((d) => {
    const loc = DEBATE_TOPICS.find((x) => x.id === d.id);
    if (!loc) return d;
    const mergeStance = (s, ls) => {
      if (!s || !ls) return s;
      return {
        ...s,
        labelHi: ls.labelHi ?? s.labelHi,
        points: s.points.map((p, i) => {
          const lp = ls.points[i];
          return lp ? { ...p, hi: lp.hi ?? p.hi } : p;
        })
      };
    };
    return {
      ...d,
      titleHi: loc.titleHi,
      questionHi: loc.questionHi,
      for: mergeStance(d.for, loc.for),
      against: mergeStance(d.against, loc.against)
    };
  });
}
async function loadMeters() {
  const rows = await loadRows("creative_meters");
  if (!rows.length) return METERS;
  return rows.map((r) => ({
    name: String(r.name),
    syllables: Number(r.syllables ?? 8),
    lines: Number(r.lines ?? 4),
    desc: String(r.description ?? "")
  }));
}
async function loadThemes() {
  const rows = await loadRows("creative_themes");
  if (!rows.length) return VERSE_THEMES;
  return rows.map((r) => ({
    id: String(r.id),
    emoji: String(r.emoji ?? ""),
    title: String(r.title ?? ""),
    words: r.words ?? [],
    templates: r.templates ?? []
  }));
}
async function loadVivaQuestions() {
  const rows = await loadRows("viva_questions");
  if (!rows.length) return VIVA_QUESTIONS;
  return rows.map((r) => ({
    id: String(r.id),
    question: String(r.question),
    keyPoints: r.key_points ?? [],
    difficulty: Number(r.difficulty ?? 3)
  })).map((q) => {
    const loc = VIVA_QUESTIONS.find((x) => x.id === q.id);
    return loc ? { ...q, questionHi: loc.questionHi, keyPointsHi: loc.keyPointsHi } : q;
  });
}
async function loadTimelineEvents() {
  const rows = await loadRows("timeline_events");
  if (!rows.length) return TIMELINE_EVENTS;
  return rows.map((r) => ({
    year: String(r.year),
    title: String(r.title),
    description: String(r.description),
    category: r.category
  })).map((e) => {
    const loc = TIMELINE_EVENTS.find((x) => x.year === e.year);
    return loc ? { ...e, titleHi: loc.titleHi, descriptionHi: loc.descriptionHi } : e;
  });
}
async function loadGrammarRules() {
  const rows = await loadRows("grammar_rules");
  if (!rows.length) return GRAMMAR_RULES;
  return rows.map((r) => ({
    id: String(r.id),
    rule: String(r.rule),
    meaning: String(r.meaning),
    category: String(r.category)
  })).map((g) => {
    const loc = GRAMMAR_RULES.find((x) => x.id === g.id);
    return loc ? { ...g, meaningHi: loc.meaningHi } : g;
  });
}
async function loadPhilosophyNetworks() {
  const rows = await loadRows("philosophy_networks");
  if (!rows.length) return PHILOSOPHY_NETWORKS;
  return rows.map((r) => ({
    name: String(r.name),
    focus: String(r.focus),
    texts: String(r.texts),
    color: String(r.color)
  })).map((p) => {
    const loc = PHILOSOPHY_NETWORKS.find((x) => x.name === p.name);
    return loc ? { ...p, focusHi: loc.focusHi, textsHi: loc.textsHi } : p;
  });
}
async function loadManuscripts() {
  const rows = await loadRows("viewer_manuscripts");
  if (!rows.length) return MANUSCRIPTS;
  return rows.map((r) => ({
    id: Number(r.id),
    name: String(r.name),
    script: String(r.script),
    period: String(r.period),
    transcription: String(r.transcription),
    color: String(r.color)
  })).map((m) => {
    const loc = MANUSCRIPTS.find((x) => x.id === m.id);
    return loc ? { ...m, nameHi: loc.nameHi, scriptHi: loc.scriptHi, periodHi: loc.periodHi } : m;
  });
}
async function loadShlokas() {
  const rows = await loadRows("shlokas");
  if (!rows.length) return SHLOKAS;
  return rows.map((r) => {
    const loc = SHLOKAS.find((x) => x.dev === r.dev || x.id === r.id);
    return {
      id: String(r.id || loc?.id || Math.random()),
      dev: String(r.dev),
      iast: String(r.iast || loc?.iast || ""),
      translation: String(r.translation || loc?.translation || ""),
      translationHi: String(r.translation_hi || loc?.translationHi || ""),
      source: String(r.source || loc?.source || ""),
      category: String(r.category || loc?.category || "wisdom"),
      categoryLabel: loc?.categoryLabel || "Wisdom & Life Lessons",
      categoryLabelHi: loc?.categoryLabelHi || "सुभाषितानि नीतिश्च",
      words: r.words || loc?.words || []
    };
  });
}
async function loadDhatus() {
  const rows = await loadRows("dhatus");
  if (!rows.length) return DHATUS;
  return rows.map((r) => ({
    root: String(r.root),
    iast: String(r.iast),
    gana: String(r.gana),
    ganaNum: Number(r.gana_num),
    meaning: String(r.meaning),
    present: String(r.present)
  })).map((d) => {
    const loc = DHATUS.find((x) => x.root === d.root);
    return loc ? { ...d, meaningHi: loc.meaningHi } : d;
  });
}
async function loadPrepTopics() {
  const rows = await loadRows("jeopardy_prep_topics");
  if (!rows.length) return prepTopics;
  return rows.map((r) => ({
    id: String(r.id),
    title: String(r.title),
    titleSanskrit: String(r.title_sanskrit),
    icon: String(r.icon),
    summary: String(r.summary),
    points: r.points ?? []
  })).map((t) => {
    const loc = prepTopics.find((x) => x.id === t.id);
    return loc ? { ...t, titleHi: loc.titleHi, summaryHi: loc.summaryHi, pointsHi: loc.pointsHi } : t;
  });
}
async function loadNewsArticles() {
  const rows = await loadRows("jeopardy_news");
  if (!rows.length) return newsArticles;
  return rows.map((r) => ({
    id: String(r.id),
    tag: String(r.tag),
    title: String(r.title),
    excerpt: String(r.excerpt),
    date: String(r.date),
    icon: String(r.icon)
  })).map((n) => {
    const loc = newsArticles.find((x) => x.id === n.id);
    return loc ? { ...n, titleHi: loc.titleHi, excerptHi: loc.excerptHi } : n;
  });
}
async function loadFlashcardDecks() {
  const rows = await loadRows("flashcard_decks");
  if (!rows.length) return flashcardDecks.map((d) => ({ id: d.id, name: d.name, icon: d.icon, nameHi: d.nameHi ?? "" }));
  return rows.map((r) => ({ id: String(r.id), name: String(r.name), icon: String(r.icon) })).map((d) => {
    const loc = flashcardDecks.find((x) => x.id === d.id);
    return { ...d, nameHi: loc?.nameHi ?? "" };
  });
}
async function loadFlashcards() {
  const rows = await loadRows("flashcards");
  if (!rows.length) return flashcards;
  return rows.map((r) => ({
    id: String(r.id),
    front: String(r.front),
    back: String(r.back),
    backHi: String(r.backHi ?? ""),
    hint: r.hint ? String(r.hint) : void 0,
    hintHi: r.hintHi ? String(r.hintHi) : void 0,
    tags: r.tags ?? [],
    deckId: String(r.deck_id)
  }));
}
async function loadStoryThemes() {
  const rows = await loadRows("story_themes");
  if (!rows.length) return STORY_THEMES;
  return rows.map((r) => {
    const loc = STORY_THEMES.find((x) => x.id === String(r.id));
    return {
      id: String(r.id),
      emoji: String(r.emoji ?? ""),
      icon: loc?.icon || "book",
      title: String(r.title ?? ""),
      titleHi: loc?.titleHi || String(r.titleHi ?? ""),
      words: r.words ?? [],
      intro: r.intro ?? [],
      patterns: r.patterns ?? [],
      outro: r.outro ?? []
    };
  });
}
async function loadShlokaPassages() {
  const rows = await loadRows("shloka_passages");
  if (!rows.length) return readingPassages;
  return rows.map((r) => ({
    id: String(r.id),
    title: String(r.title),
    titleSanskrit: String(r.title_sanskrit),
    level: String(r.level),
    text: String(r.text),
    transliteration: String(r.transliteration),
    translation: String(r.translation),
    words: r.words ?? []
  })).map((p) => {
    const loc = readingPassages.find((x) => x.id === p.id);
    return loc ? { ...p, levelHi: loc.levelHi, translationHi: loc.translationHi } : p;
  });
}
async function loadJeopardyBoard() {
  const rows = await loadRows("jeopardy_questions");
  if (!rows.length) {
    return {
      categories: jeopardyCategories,
      doubleCategories: doubleJeopardyCategories,
      finalClue: {
        id: "final-1",
        value: 0,
        clue: finalJeopardy.clue,
        clueHi: finalJeopardy.clueHi,
        answer: finalJeopardy.answer,
        answerHi: finalJeopardy.answerHi,
        category: finalJeopardy.category,
        categoryHi: finalJeopardy.categoryHi,
        categorySanskrit: finalJeopardy.categorySanskrit
      },
      testQuestions: anytimeTestQuestions
    };
  }
  const byBoard = (board) => rows.filter((r) => r.board === board);
  const toCategory = (boardRows) => {
    const names = [...new Set(boardRows.map((r) => String(r.category)))];
    return names.map((name) => {
      const first = boardRows.find((r) => String(r.category) === name);
      return {
        id: String(first.id),
        name,
        nameHi: String(first.categoryHi ?? first.nameHi ?? ""),
        nameSanskrit: String(first.category_sanskrit ?? ""),
        icon: String(first.icon ?? ""),
        clues: boardRows.filter((r) => String(r.category) === name).map((r) => ({
          id: String(r.id),
          value: Number(r.value ?? 0),
          clue: String(r.clue),
          clueHi: String(r.clueHi ?? ""),
          answer: String(r.answer),
          answerHi: String(r.answerHi ?? "")
        }))
      };
    });
  };
  const categories = toCategory(byBoard("r1"));
  const doubleCategories = toCategory(byBoard("r2"));
  const finalRow = byBoard("final")[0];
  const finalClue = finalRow ? {
    id: String(finalRow.id),
    value: 0,
    clue: String(finalRow.clue),
    clueHi: String(finalRow.clueHi ?? ""),
    answer: String(finalRow.answer),
    answerHi: String(finalRow.answerHi ?? ""),
    category: String(finalRow.category),
    categoryHi: String(finalRow.categoryHi ?? ""),
    categorySanskrit: String(finalRow.category_sanskrit ?? "")
  } : {
    id: "final-1",
    value: 0,
    clue: finalJeopardy.clue,
    clueHi: finalJeopardy.clueHi,
    answer: finalJeopardy.answer,
    answerHi: finalJeopardy.answerHi,
    category: finalJeopardy.category,
    categoryHi: finalJeopardy.categoryHi,
    categorySanskrit: finalJeopardy.categorySanskrit
  };
  const testQuestions = byBoard("test").map((r) => ({
    id: String(r.id),
    category: String(r.category),
    prompt: String(r.clue),
    promptHi: String(r.promptHi ?? ""),
    options: r.options ?? [],
    optionsHi: r.optionsHi ?? [],
    correct: Number(r.correct ?? 0)
  }));
  return { categories, doubleCategories, finalClue, testQuestions };
}
export {
  loadDebateTopics,
  loadDevNumbers,
  loadDhatus,
  loadExplorerConcepts,
  loadFestivals,
  loadFlashcardDecks,
  loadFlashcards,
  loadGrammarRules,
  loadJeopardyBoard,
  loadManuscripts,
  loadMeters,
  loadNewsArticles,
  loadPhilosophyNetworks,
  loadPrepTopics,
  loadQuotes,
  loadRealWorldConcepts,
  loadRitus,
  loadSandhiPairs,
  loadSentences,
  loadShlokaPassages,
  loadShlokas,
  loadStoryThemes,
  loadThemes,
  loadTimelineEvents,
  loadVivaQuestions,
  loadWordPairs
};
