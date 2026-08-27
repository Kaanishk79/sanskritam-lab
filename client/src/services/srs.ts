export interface Flashcard {
  id: string
  front: string
  back: string
  backHi?: string
  hint?: string
  hintHi?: string
  tags: string[]
  deckId: string
}

export interface SM2Card {
  card: Flashcard
  ease: number
  interval: number
  repetitions: number
  nextReview: number
  lastReviewed: number | null
}

export interface SRSState {
  cards: Record<string, SM2Card>
  currentDeck: string
}

const STORAGE_KEY = 'sanskritlab-srs'

export function getDefaultSRSState(): SRSState {
  return { cards: {}, currentDeck: 'all' }
}

export function loadSRS(): SRSState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return getDefaultSRSState()
}

export function saveSRS(state: SRSState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function initCards(flashcards: Flashcard[], existing: Record<string, SM2Card>): Record<string, SM2Card> {
  const result = { ...existing }
  for (const fc of flashcards) {
    if (!result[fc.id]) {
      result[fc.id] = {
        card: fc,
        ease: 2.5,
        interval: 0,
        repetitions: 0,
        nextReview: Date.now(),
        lastReviewed: null,
      }
    }
  }
  return result
}

export function getDueCards(cards: Record<string, SM2Card>, deckId?: string): SM2Card[] {
  const now = Date.now()
  return Object.values(cards).filter((c) => {
    if (c.nextReview > now) return false
    if (deckId && deckId !== 'all' && c.card.deckId !== deckId) return false
    return true
  }).sort((a, b) => a.nextReview - b.nextReview)
}

export function getNewCards(cards: Record<string, SM2Card>, deckId?: string): SM2Card[] {
  return Object.values(cards).filter((c) => {
    if (c.repetitions > 0) return false
    if (deckId && deckId !== 'all' && c.card.deckId !== deckId) return false
    return true
  })
}

export function getStats(cards: Record<string, SM2Card>) {
  const values = Object.values(cards)
  const due = getDueCards(cards)
  const newCards = getNewCards(cards)
  const mature = values.filter((c) => c.interval >= 21)
  const young = values.filter((c) => c.interval > 0 && c.interval < 21)
  return {
    total: values.length,
    due: due.length,
    newCards: newCards.length,
    mature: mature.length,
    young: young.length,
    reviewed: values.filter((c) => c.repetitions > 0).length,
  }
}

export function gradeCard(
  cards: Record<string, SM2Card>,
  cardId: string,
  quality: number,
): Record<string, SM2Card> {
  const result = { ...cards }
  const sc = result[cardId]
  if (!sc) return result

  let { ease, interval, repetitions } = sc

  if (quality < 3) {
    repetitions = 0
    interval = 1
  } else {
    if (repetitions === 0) {
      interval = 1
    } else if (repetitions === 1) {
      interval = 6
    } else {
      interval = Math.round(interval * ease)
    }
    repetitions++
  }

  ease = Math.max(1.3, ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)))

  result[cardId] = {
    ...sc,
    ease: Math.round(ease * 100) / 100,
    interval,
    repetitions,
    nextReview: Date.now() + interval * 86400000,
    lastReviewed: Date.now(),
  }

  saveSRS({ ...loadSRS(), cards: result })
  return result
}
