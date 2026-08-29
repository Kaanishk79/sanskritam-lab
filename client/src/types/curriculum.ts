export type Track = 'child' | 'teen' | 'undergrad' | 'graduate' | 'phd'

export type Level = 0 | 1 | 2 | 3 | 4 | 5 | 6

export type GovClassId =
  | 'class-1-2' | 'class-3-5'
  | 'class-6' | 'class-7' | 'class-8' | 'class-9' | 'class-10'
  | 'class-11' | 'class-12'
  | 'ba-1' | 'ba-2' | 'ba-3'
  | 'ma-1' | 'ma-2'
  | 'mphil' | 'phd'

export interface ClassInfo {
  id: GovClassId
  label: string
  shortLabel: string
  govClassMin: number
  govClassMax: number
  track: Track
  description: string
  icon: string
  color: string
  sortOrder: number
  ncertBookId?: string
}

export interface Skill {
  id: string
  name: string
  description: string
  icon: string
  unlocked: boolean
  completed: boolean
  progress: number
  prerequisites: string[]
  lessonIds: string[]
}

export interface Lesson {
  id: string
  title: string
  subtitle: string
  subtitleHi?: string
  level: Level
  track: Track
  govClassId: GovClassId
  duration: string
  durationHi?: string
  content: LessonContent
  quiz: QuizQuestion[]
  unlockables: string[]
}

export interface LessonContent {
  introduction: string
  sections: LessonSection[]
  summary: string
  devanagari?: string
  transliteration?: string
  translation?: string
}

export interface LessonSection {
  heading: string
  body: string
  devanagari?: string
  transliteration?: string
  examples?: { text: string; meaning: string }[]
}

export interface QuizQuestion {
  id: string
  prompt: string
  options: string[]
  correctIndex: number
  explanation: string
  difficulty: number
}

export interface UserProgress {
  completedLessons: string[]
  quizScores: Record<string, number>
  currentLevel: Level
  currentTrack: Track
  currentGovClass: GovClassId
  streak: number
  xp: number
  skills: Record<string, Skill>
}

export interface TrackInfo {
  id: Track
  label: string
  icon: string
  description: string
  color: string
  classRange: string
  levels: Level[]
}

export interface Book {
  id: string
  title: string
  titleSanskrit: string
  author: string | null
  publisher?: string | null
  period: string
  category: string
  levelMin: Level
  levelMax: Level
  track: Track
  totalChapters: number
  description: string
  authorHi?: string | null
  publisherHi?: string | null
  periodHi?: string | null
  descriptionHi?: string | null
  coverIcon: string
  sortOrder: number
  govClassMin: number
  govClassMax: number
}

export interface Chapter {
  id: string
  bookId: string
  chapterNumber: number
  title: string
  titleSanskrit: string
  verseCount: number
  contentPreview: string
}

export interface GrammarBook {
  id: string
  title: string
  titleSanskrit: string
  track: Track
  level: Level
  description: string
  chapters: { chapter: number; title: string; sections: string[] }[]
  rulesCount: number
  examplesCount: number
  exercisesCount: number
}
