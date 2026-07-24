export interface CorpusText {
  id: string
  title: string
  author: string
  period: string
  content: string
  language: string
}

export interface SearchResult {
  id: string
  title: string
  snippet: string
  period: string
  score: number
}

export interface Annotation {
  id: string
  textId: string
  layer: string
  content: string
  startOffset: number
  endOffset: number
}

export interface GrammarToken {
  word: string
  root: string
  pos: string
  caseInfo?: string
}

export interface AssessmentQuestion {
  prompt: string
  options: string[]
  correctIdx: number
  explanation: string
}

export interface VivaSession {
  sessionId: string
  status: string
  questions: string[]
}

export interface StudyPath {
  recommendations: string[]
  nextModule: string
}

export interface Manuscript {
  id: string
  name: string
  script: 'Devanagari' | 'Grantha'
  imageUrl: string
  transcription: string
}

export interface TimelineEvent {
  year: string
  title: string
  description: string
  category: 'text' | 'grammar' | 'philosophy' | 'history'
}

export type UserRole = 'teacher' | 'student' | 'researcher'