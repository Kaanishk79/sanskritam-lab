import type { Track, Level, UserProgress, Skill } from '../types/curriculum'

const STORAGE_KEY = 'sanskritlab-progress'

const initialSkills: Record<string, Skill> = {
  'skill-alphabet': { id: 'skill-alphabet', name: 'Alphabet', description: 'Master Devanāgarī letters', icon: '🔤', unlocked: true, completed: false, progress: 0, prerequisites: [], lessonIds: ['alphabet-vowels', 'alphabet-consonants'] },
  'skill-vocab-basics': { id: 'skill-vocab-basics', name: 'Basic Vocabulary', description: 'First 50 Sanskrit words', icon: '📖', unlocked: false, completed: false, progress: 0, prerequisites: ['skill-alphabet'], lessonIds: ['simple-words'] },
  'skill-syntax': { id: 'skill-syntax', name: 'Sentence Structure', description: 'SOV order and agreement', icon: '🔗', unlocked: true, completed: false, progress: 0, prerequisites: ['skill-vocab-basics'], lessonIds: ['basic-sentences'] },
  'skill-declensions': { id: 'skill-declensions', name: 'Declensions', description: '8 cases across 3 genders', icon: '📊', unlocked: false, completed: false, progress: 0, prerequisites: ['skill-syntax'], lessonIds: ['declensions'] },
  'skill-sandhi': { id: 'skill-sandhi', name: 'Sandhi', description: 'Sound merger rules', icon: '🔊', unlocked: false, completed: false, progress: 0, prerequisites: ['skill-declensions'], lessonIds: ['sandhi-rules'] },
  'skill-compounds': { id: 'skill-compounds', name: 'Compounds', description: 'Samāsa types', icon: '🧩', unlocked: false, completed: false, progress: 0, prerequisites: ['skill-declensions'], lessonIds: ['compounds'] },
  'skill-classical-texts': { id: 'skill-classical-texts', name: 'Classical Texts', description: 'Read Kālidāsa and others', icon: '📜', unlocked: false, completed: false, progress: 0, prerequisites: ['skill-sandhi', 'skill-compounds'], lessonIds: ['kalidasa'] },
  'skill-philosophy': { id: 'skill-philosophy', name: 'Philosophy', description: 'Darśana systems', icon: '🧠', unlocked: false, completed: false, progress: 0, prerequisites: ['skill-classical-texts'], lessonIds: ['nyaya-intro'] },
  'skill-critical-edition': { id: 'skill-critical-edition', name: 'Textual Criticism', description: 'Establish critical editions', icon: '📐', unlocked: false, completed: false, progress: 0, prerequisites: ['skill-paleography'], lessonIds: ['textual-criticism'] },
  'skill-paleography': { id: 'skill-paleography', name: 'Paleography', description: 'Read ancient scripts', icon: '🔍', unlocked: false, completed: false, progress: 0, prerequisites: ['skill-philosophy'], lessonIds: ['paleography'] },
  'skill-phd-research': { id: 'skill-phd-research', name: 'PhD Research', description: 'Critical edition & publication', icon: '🏛️', unlocked: false, completed: false, progress: 0, prerequisites: ['skill-critical-edition'], lessonIds: ['critical-edition'] },
}

export function getDefaultProgress(): UserProgress {
  return {
    completedLessons: [],
    quizScores: {},
    currentLevel: 0 as Level,
    currentTrack: 'child' as Track,
    streak: 0,
    xp: 0,
    skills: { ...initialSkills },
  }
}

export function loadProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return getDefaultProgress()
}

export function saveProgress(p: UserProgress): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p))
}

export function getLevelForTrack(track: Track): Level[] {
  const map: Record<Track, Level[]> = {
    child: [0, 1],
    teen: [1, 2, 3],
    undergrad: [2, 3, 4],
    graduate: [3, 4, 5],
    phd: [5, 6],
  }
  return map[track]
}

export function getLevelLabel(level: Level): string {
  const labels = ['Alphabet', 'Vocabulary', 'Grammar', 'Advanced Grammar', 'Classical Texts', 'Research', 'Critical Edition']
  return labels[level] ?? 'Unknown'
}

export function calculateXP(quizScore: number, difficulty: number): number {
  return Math.round(quizScore * 10 * (1 + difficulty * 0.5))
}

export function updateProgress(
  progress: UserProgress,
  lessonId: string,
  quizScore: number,
  difficulty: number,
): UserProgress {
  const p = { ...progress }
  const earned = calculateXP(quizScore, difficulty)

  if (!p.completedLessons.includes(lessonId)) {
    p.completedLessons = [...p.completedLessons, lessonId]
  }
  p.quizScores[lessonId] = quizScore
  p.xp += earned
  p.streak = quizScore >= 0.6 ? p.streak + 1 : 0

  for (const skill of Object.values(p.skills)) {
    if (skill.lessonIds.includes(lessonId)) {
      const completed = skill.lessonIds.filter((id) => p.completedLessons.includes(id)).length
      skill.progress = Math.round((completed / skill.lessonIds.length) * 100)
      if (skill.progress >= 80) skill.completed = true
    }
  }

  for (const skill of Object.values(p.skills)) {
    if (!skill.unlocked && skill.prerequisites.every((pre) => {
      const preSkill = p.skills[pre]
      return preSkill?.completed ?? false
    })) {
      const preLessons = skill.prerequisites.flatMap((pre) => p.skills[pre]?.lessonIds ?? [])
      if (preLessons.every((id) => p.completedLessons.includes(id))) {
        skill.unlocked = true
      }
    }
  }

  saveProgress(p)
  return p
}

export function getRecommendedTrack(xp: number): Track {
  if (xp < 50) return 'child'
  if (xp < 200) return 'teen'
  if (xp < 500) return 'undergrad'
  if (xp < 1000) return 'graduate'
  return 'phd'
}