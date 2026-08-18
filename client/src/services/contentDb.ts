import { supabase } from './supabase'
import { SENTENCES, type Sentence } from '../data/sentenceBuilder'
import { CONCEPTS as REAL_CONCEPTS, type Concept as RealConcept } from '../data/realWorld'
import { FESTIVALS, RITUS, type Festival, type Ritu } from '../data/cultureCalendar'
import { QUOTES, type Quote } from '../data/quotes'
import { CONCEPTS as EXPL_CONCEPTS, type Concept as ExplConcept } from '../data/conceptExplorer'
import { WORD_PAIRS, DEV_NUMBERS, SANDHI_PAIRS, type WordPair, type DevNumber, type SandhiPair } from '../data/games'
import { DEBATE_TOPICS, type DebateTopic, type DebateStance } from '../data/debates'
import { METERS, VERSE_THEMES, type Meter, type VerseTheme } from '../data/creativeStudio'

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