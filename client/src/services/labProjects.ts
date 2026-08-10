export interface LabProjectContent {
  passageIds: string[]
  listeningIds: string[]
  writingIds: string[]
  readingIds: string[]
}

export interface LabProject {
  id: string
  title: string
  owner: string
  mode: 'individual' | 'institution'
  targetClass: string
  dueDate: string
  createdAt: string
  content: LabProjectContent
}

export interface LabSubmission {
  projectId: string
  userName: string
  className: string
  score: number
  submittedAt: string
}

export interface LabProfile {
  mode: 'individual' | 'institution'
  role: 'admin' | 'student'
  className: string
  ownerName: string
}

const PROJECTS_KEY = 'sanskrit-lab-projects'
const PROFILE_KEY = 'sanskrit-lab-profile'
const SUBMISSIONS_KEY = 'sanskrit-lab-submissions'

export const labClasses = [
  'Class 1-2',
  'Class 3-5',
  'Class 6 (NCERT)',
  'Class 7 (NCERT)',
  'Class 8 (NCERT)',
  'Class 9 (NCERT)',
  'Class 10 (NCERT)',
  'Class 11 (NCERT)',
  'Class 12 (NCERT)',
  'BA 1st Year (Govt)',
  'BA 2nd Year (Govt)',
  'BA 3rd Year (Govt)',
  'MA Previous (Govt)',
  'MA Final (Govt)',
  'MPhil (Govt)',
  'PhD (Govt)',
]

const defaultProfile = (): LabProfile => ({ mode: 'individual', role: 'student', className: 'Class 6 (NCERT)', ownerName: '' })

export function loadProjects(): LabProject[] {
  try {
    const raw = localStorage.getItem(PROJECTS_KEY)
    if (raw) return JSON.parse(raw)
  } catch { /* ignore */ }
  return []
}

export function saveProjects(projects: LabProject[]): void {
  try { localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects)) } catch { /* ignore */ }
}

export function loadProfile(): LabProfile {
  try {
    const raw = localStorage.getItem(PROFILE_KEY)
    if (raw) return { ...defaultProfile(), ...JSON.parse(raw) }
  } catch { /* ignore */ }
  return defaultProfile()
}

export function saveProfile(p: LabProfile): void {
  try { localStorage.setItem(PROFILE_KEY, JSON.stringify(p)) } catch { /* ignore */ }
}

export function loadSubmissions(): LabSubmission[] {
  try {
    const raw = localStorage.getItem(SUBMISSIONS_KEY)
    if (raw) return JSON.parse(raw)
  } catch { /* ignore */ }
  return []
}

export function saveSubmissions(s: LabSubmission[]): void {
  try { localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(s)) } catch { /* ignore */ }
}

export function newProjectId(): string {
  return 'p-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}

export function makeProject(
  title: string,
  owner: string,
  mode: 'individual' | 'institution',
  targetClass: string,
  dueDate: string,
  content: LabProjectContent
): LabProject {
  return { id: newProjectId(), title, owner, mode, targetClass, dueDate, createdAt: new Date().toISOString(), content }
}
