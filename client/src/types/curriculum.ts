export type Track = 'child' | 'teen' | 'undergrad' | 'graduate' | 'phd'

export type Level = 0 | 1 | 2 | 3 | 4 | 5 | 6

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
  level: Level
  track: Track
  duration: string
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
  ageRange: string
  levels: Level[]
}