import { supabase } from './supabase'
import { SENTENCES, type Sentence } from '../data/sentenceBuilder'
import { CONCEPTS as REAL_CONCEPTS, type Concept as RealConcept } from '../data/realWorld'
import { FESTIVALS, RITUS, type Festival, type Ritu } from '../data/cultureCalendar'
import { QUOTES, type Quote } from '../data/quotes'
import { CONCEPTS as EXPL_CONCEPTS, type Concept as ExplConcept } from '../data/conceptExplorer'
import { WORD_PAIRS, DEV_NUMBERS, SANDHI_PAIRS, type WordPair, type DevNumber, type SandhiPair } from '../data/games'
import { DEBATE_TOPICS, type DebateTopic, type DebateStance } from '../data/debates'
import { METERS, VERSE_THEMES, type Meter, type VerseTheme } from '../data/creativeStudio'
import { VIVA_QUESTIONS, type VivaQuestion } from '../data/viva'
import { TIMELINE_EVENTS, type TimelineEvent } from '../data/timeline'
import { GRAMMAR_RULES, PHILOSOPHY_NETWORKS, type GrammarRule, type PhilosophyNetwork } from '../data/grammarMaps'
import { MANUSCRIPTS, type Manuscript } from '../data/viewer'
import { SHLOKAS, type Shloka } from '../data/shlokas'
import { DHATUS, type Dhatu } from '../data/dhatus'
import { prepTopics, newsArticles, type PrepTopic, type NewsArticle } from '../data/jeopardySite'
import { jeopardyCategories, doubleJeopardyCategories, finalJeopardy, type JeopardyClue, type JeopardyCategory } from '../data/jeopardy'
import { anytimeTestQuestions, type TestQuestion } from '../data/jeopardyTest'
import { flashcardDecks, flashcards } from '../data/flashcards'
import type { Flashcard } from './srs'
import { STORY_THEMES, type StoryTheme } from '../data/storyGenerator'
import { readingPassages, type ReadingPassage } from '../data/languageLab'

type Row = Record<string, unknown>

async function loadRows(table: string): Promise<Row[]> {
  try {
    const { data, error } = await supabase.from(table).select('*')
    if (error || !data || data.length === 0) return []
    return data as Row[]
  } catch {
    return []
  }
}

export async function loadSentences(): Promise<Sentence[]> {
  const rows = await loadRows('sentence_builder_sentences')
  if (!rows.length) return SENTENCES
  return rows
    .map((r) => ({
      id: String(r.id),
      level: r.level as Sentence['level'],
      sa: String(r.sa),
      iast: String(r.iast ?? ''),
      en: String(r.en ?? ''),
      words: (r.words as Sentence['words']) ?? [],
    }))
    .sort((a, b) => (a.id < b.id ? -1 : 1))
}

export async function loadRealWorldConcepts(): Promise<RealConcept[]> {
  const rows = await loadRows('real_world_concepts')
  if (!rows.length) return REAL_CONCEPTS
  return rows.map((r) => ({
    word: String(r.word),
    iast: String(r.iast ?? ''),
    meaning: String(r.meaning ?? ''),
    today: String(r.today ?? ''),
    example: String(r.example ?? ''),
    exampleEn: String(r.example_en ?? ''),
    emoji: String(r.emoji ?? ''),
  }))
}

export async function loadFestivals(): Promise<Festival[]> {
  const rows = await loadRows('culture_festivals')
  if (!rows.length) return FESTIVALS
  return rows
    .map((r) => ({
      id: String(r.id),
      name: String(r.name ?? ''),
      emoji: String(r.emoji ?? ''),
      month: Number(r.month ?? 1),
      day: Number(r.day ?? 1),
      approx: String(r.approx ?? ''),
      tithi: String(r.tithi ?? ''),
      meaning: String(r.meaning ?? ''),
      how: String(r.how ?? ''),
      phrase: String(r.phrase ?? ''),
      phraseEn: String(r.phrase_en ?? ''),
    }))
    .sort((a, b) => (a.month === b.month ? a.day - b.day : a.month - b.month))
}

export async function loadRitus(): Promise<Ritu[]> {
  const rows = await loadRows('culture_ritus')
  if (!rows.length) return RITUS
  return rows.map((r) => ({
    name: String(r.name),
    months: String(r.months ?? ''),
    season: String(r.season ?? ''),
    emoji: String(r.emoji ?? ''),
    verse: String(r.verse ?? ''),
  }))
}

export async function loadQuotes(): Promise<Quote[]> {
  const rows = await loadRows('quotes')
  if (!rows.length) return QUOTES
  return rows.map((r) => ({
    id: String(r.id),
    sa: String(r.sa),
    iast: String(r.iast ?? ''),
    en: String(r.en ?? ''),
    speaker: String(r.speaker ?? ''),
    source: String(r.source ?? ''),
    category: String(r.category ?? ''),
  }))
}

export async function loadExplorerConcepts(): Promise<ExplConcept[]> {
  const rows = await loadRows('concept_explorer_concepts')
  if (!rows.length) return EXPL_CONCEPTS
  return rows.map((r) => ({
    id: String(r.id),
    sa: String(r.sa),
    en: String(r.en ?? ''),
    cat: r.cat as ExplConcept['cat'],
    def: String(r.def ?? ''),
    detail: String(r.detail ?? ''),
    example: String(r.example ?? ''),
    exampleEn: String(r.example_en ?? ''),
    related: (r.related as string[]) ?? [],
    emoji: String(r.emoji ?? ''),
  }))
}

export async function loadWordPairs(): Promise<WordPair[]> {
  const rows = await loadRows('game_word_pairs')
  if (!rows.length) return WORD_PAIRS
  return rows.map((r) => ({ sa: String(r.sa), iast: String(r.iast ?? ''), en: String(r.en ?? '') }))
}

export async function loadDevNumbers(): Promise<DevNumber[]> {
  const rows = await loadRows('game_numbers')
  if (!rows.length) return DEV_NUMBERS
  return rows.map((r) => ({ n: Number(r.n), dev: String(r.dev), word: String(r.word), iast: String(r.iast ?? '') }))
}

export async function loadSandhiPairs(): Promise<SandhiPair[]> {
  const rows = await loadRows('game_sandhi_pairs')
  if (!rows.length) return SANDHI_PAIRS
  return rows.map((r) => ({ a: String(r.a), b: String(r.b) }))
}

export async function loadDebateTopics(): Promise<DebateTopic[]> {
  const rows = await loadRows('debate_topics')
  if (!rows.length) return DEBATE_TOPICS
  return rows.map((r) => ({
    id: String(r.id),
    title: String(r.title ?? ''),
    emoji: String(r.emoji ?? ''),
    question: String(r.question ?? ''),
    for: (r.for_side as DebateStance) ?? { side: 'for', label: 'For', points: [] },
    against: (r.against_side as DebateStance) ?? { side: 'against', label: 'Against', points: [] },
  }))
}

export async function loadMeters(): Promise<Meter[]> {
  const rows = await loadRows('creative_meters')
  if (!rows.length) return METERS
  return rows.map((r) => ({
    name: String(r.name),
    syllables: Number(r.syllables ?? 8),
    lines: Number(r.lines ?? 4),
    desc: String(r.description ?? ''),
  }))
}

export async function loadThemes(): Promise<VerseTheme[]> {
  const rows = await loadRows('creative_themes')
  if (!rows.length) return VERSE_THEMES
  return rows.map((r) => ({
    id: String(r.id),
    emoji: String(r.emoji ?? ''),
    title: String(r.title ?? ''),
    words: (r.words as VerseTheme['words']) ?? [],
    templates: (r.templates as VerseTheme['templates']) ?? [],
  }))
}

export async function loadVivaQuestions(): Promise<VivaQuestion[]> {
  const rows = await loadRows('viva_questions')
  if (!rows.length) return VIVA_QUESTIONS
  return rows.map((r) => ({
    id: String(r.id),
    question: String(r.question),
    keyPoints: (r.key_points as string[]) ?? [],
    difficulty: Number(r.difficulty ?? 3),
  }))
}

export async function loadTimelineEvents(): Promise<TimelineEvent[]> {
  const rows = await loadRows('timeline_events')
  if (!rows.length) return TIMELINE_EVENTS
  return rows.map((r) => ({
    year: String(r.year),
    title: String(r.title),
    description: String(r.description),
    category: r.category as TimelineEvent['category'],
  }))
}

export async function loadGrammarRules(): Promise<GrammarRule[]> {
  const rows = await loadRows('grammar_rules')
  if (!rows.length) return GRAMMAR_RULES
  return rows.map((r) => ({
    id: String(r.id),
    rule: String(r.rule),
    meaning: String(r.meaning),
    category: String(r.category),
  }))
}

export async function loadPhilosophyNetworks(): Promise<PhilosophyNetwork[]> {
  const rows = await loadRows('philosophy_networks')
  if (!rows.length) return PHILOSOPHY_NETWORKS
  return rows.map((r) => ({
    name: String(r.name),
    focus: String(r.focus),
    texts: String(r.texts),
    color: String(r.color),
  }))
}

export async function loadManuscripts(): Promise<Manuscript[]> {
  const rows = await loadRows('viewer_manuscripts')
  if (!rows.length) return MANUSCRIPTS
  return rows.map((r) => ({
    id: Number(r.id),
    name: String(r.name),
    script: String(r.script),
    period: String(r.period),
    transcription: String(r.transcription),
    color: String(r.color),
  }))
}

export async function loadShlokas(): Promise<Shloka[]> {
  const rows = await loadRows('shlokas')
  if (!rows.length) return SHLOKAS
  return rows.map((r) => ({
    dev: String(r.dev),
    iast: String(r.iast),
    translation: String(r.translation),
    source: String(r.source),
  }))
}

export async function loadDhatus(): Promise<Dhatu[]> {
  const rows = await loadRows('dhatus')
  if (!rows.length) return DHATUS
  return rows.map((r) => ({
    root: String(r.root),
    iast: String(r.iast),
    gana: String(r.gana),
    ganaNum: Number(r.gana_num),
    meaning: String(r.meaning),
    present: String(r.present),
  }))
}

export async function loadPrepTopics(): Promise<PrepTopic[]> {
  const rows = await loadRows('jeopardy_prep_topics')
  if (!rows.length) return prepTopics
  return rows.map((r) => ({
    id: String(r.id),
    title: String(r.title),
    titleSanskrit: String(r.title_sanskrit),
    icon: String(r.icon),
    summary: String(r.summary),
    points: (r.points as string[]) ?? [],
  }))
}

export async function loadNewsArticles(): Promise<NewsArticle[]> {
  const rows = await loadRows('jeopardy_news')
  if (!rows.length) return newsArticles
  return rows.map((r) => ({
    id: String(r.id),
    tag: String(r.tag),
    title: String(r.title),
    excerpt: String(r.excerpt),
    date: String(r.date),
    icon: String(r.icon),
  }))
}

export async function loadFlashcardDecks(): Promise<{ id: string; name: string; icon: string }[]> {
  const rows = await loadRows('flashcard_decks')
  if (!rows.length) return flashcardDecks
  return rows.map((r) => ({ id: String(r.id), name: String(r.name), icon: String(r.icon) }))
}

export async function loadFlashcards(): Promise<Flashcard[]> {
  const rows = await loadRows('flashcards')
  if (!rows.length) return flashcards
  return rows.map((r) => ({
    id: String(r.id),
    front: String(r.front),
    back: String(r.back),
    backHi: String((r as any).backHi ?? ''),
    hint: r.hint ? String(r.hint) : undefined,
    hintHi: (r as any).hintHi ? String((r as any).hintHi) : undefined,
    tags: (r.tags as string[]) ?? [],
    deckId: String(r.deck_id),
  }))
}

export async function loadStoryThemes(): Promise<StoryTheme[]> {
  const rows = await loadRows('story_themes')
  if (!rows.length) return STORY_THEMES
  return rows.map((r) => ({
    id: String(r.id),
    emoji: String(r.emoji),
    title: String(r.title),
    titleHi: String(r.titleHi ?? ''),
    words: (r.words as StoryTheme['words']) ?? [],
    intro: (r.intro as string[]) ?? [],
    patterns: (r.patterns as StoryTheme['patterns']) ?? [],
    outro: (r.outro as string[]) ?? [],
  }))
}

export async function loadShlokaPassages(): Promise<ReadingPassage[]> {
  const rows = await loadRows('shloka_passages')
  if (!rows.length) return readingPassages
  return rows.map((r) => ({
    id: String(r.id),
    title: String(r.title),
    titleSanskrit: String(r.title_sanskrit),
    level: String(r.level),
    text: String(r.text),
    transliteration: String(r.transliteration),
    translation: String(r.translation),
    words: (r.words as ReadingPassage['words']) ?? [],
  }))
}

export interface JeopardyBoardData {
  categories: JeopardyCategory[]
  doubleCategories: JeopardyCategory[]
  finalClue: JeopardyClue & { category: string; categoryHi?: string; categorySanskrit: string }
  testQuestions: TestQuestion[]
}

export async function loadJeopardyBoard(): Promise<JeopardyBoardData> {
  const rows = await loadRows('jeopardy_questions')
  if (!rows.length) {
    return {
      categories: jeopardyCategories,
      doubleCategories: doubleJeopardyCategories,
      finalClue: {
        id: 'final-1',
        value: 0,
        clue: finalJeopardy.clue,
        clueHi: finalJeopardy.clueHi,
        answer: finalJeopardy.answer,
        answerHi: finalJeopardy.answerHi,
        category: finalJeopardy.category,
        categoryHi: finalJeopardy.categoryHi,
        categorySanskrit: finalJeopardy.categorySanskrit,
      },
      testQuestions: anytimeTestQuestions,
    }
  }
  const byBoard = (board: string) => rows.filter((r) => r.board === board)
  const toCategory = (boardRows: Row[]): JeopardyCategory[] => {
    const names = [...new Set(boardRows.map((r) => String(r.category)))]
    return names.map((name) => {
      const first = boardRows.find((r) => String(r.category) === name)!
      return {
        id: String(first.id),
        name,
        nameHi: String(first.categoryHi ?? first.nameHi ?? ''),
        nameSanskrit: String(first.category_sanskrit ?? ''),
        icon: String(first.icon ?? ''),
        clues: boardRows
          .filter((r) => String(r.category) === name)
          .map((r) => ({
            id: String(r.id),
            value: Number(r.value ?? 0),
            clue: String(r.clue),
            clueHi: String(r.clueHi ?? ''),
            answer: String(r.answer),
            answerHi: String(r.answerHi ?? ''),
          })),
      }
    })
  }
  const categories = toCategory(byBoard('r1'))
  const doubleCategories = toCategory(byBoard('r2'))
  const finalRow = byBoard('final')[0]
  const finalClue: JeopardyBoardData['finalClue'] = finalRow
    ? {
        id: String(finalRow.id),
        value: 0,
        clue: String(finalRow.clue),
        clueHi: String((finalRow as any).clueHi ?? ''),
        answer: String(finalRow.answer),
        answerHi: String((finalRow as any).answerHi ?? ''),
        category: String(finalRow.category),
        categoryHi: String((finalRow as any).categoryHi ?? ''),
        categorySanskrit: String(finalRow.category_sanskrit ?? ''),
      }
    : {
        id: 'final-1',
        value: 0,
        clue: finalJeopardy.clue,
        clueHi: finalJeopardy.clueHi,
        answer: finalJeopardy.answer,
        answerHi: finalJeopardy.answerHi,
        category: finalJeopardy.category,
        categoryHi: finalJeopardy.categoryHi,
        categorySanskrit: finalJeopardy.categorySanskrit,
      }
  const testQuestions: TestQuestion[] = byBoard('test').map((r) => ({
    id: String(r.id),
    category: String(r.category),
    prompt: String(r.clue),
    promptHi: String((r as any).promptHi ?? ''),
    options: (r.options as string[]) ?? [],
    optionsHi: ((r as any).optionsHi as string[]) ?? [],
    correct: Number(r.correct ?? 0),
  }))
  return { categories, doubleCategories, finalClue, testQuestions }
}