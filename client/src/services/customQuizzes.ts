import type { JeopardyCategory, FinalJeopardyClue } from '../data/jeopardy'

export interface CustomQuiz {
  id: string
  name: string
  nameSanskrit: string
  icon: string
  description: string
  categories: JeopardyCategory[]
  final?: FinalJeopardyClue
  createdAt: number
}

const STORAGE_KEY = 'sanskrit-jeopardy-custom'

export function loadCustomQuizzes(): CustomQuiz[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) return parsed as CustomQuiz[]
    }
  } catch { /* ignore */ }
  return []
}

export function persistCustomQuizzes(quizzes: CustomQuiz[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(quizzes))
  } catch { /* ignore */ }
}

export function makeCustomQuizId(): string {
  return 'qz-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7)
}

export function validateQuiz(q: CustomQuiz): string | null {
  if (!q.name.trim()) return 'name'
  if (q.categories.length < 3) return 'categories-min'
  for (const cat of q.categories) {
    if (!cat.name.trim()) return 'category-name'
    if (cat.clues.length < 3) return 'clues-min'
    for (const c of cat.clues) {
      if (!c.clue.trim() || !c.answer.trim()) return 'clue-empty'
    }
  }
  return null
}
