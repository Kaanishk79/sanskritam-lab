import type { Track, Level, UserProgress, Skill } from '../types/curriculum'

const STORAGE_KEY = 'sanskritlab-progress'

const initialSkills: Record<string, Skill> = {
  'skill-alphabet': { id: 'skill-alphabet', name: 'Alphabet', description: 'Master Devanāgarī letters', icon: '🔤', unlocked: true, completed: false, progress: 0, prerequisites: [], lessonIds: ['alphabet-vowels', 'alphabet-consonants'] },
  'skill-vocab-basics': { id: 'skill-vocab-basics', name: 'Basic Vocabulary', description: 'First 50 Sanskrit words — family, nature, body, food, directions', icon: '📖', unlocked: true, completed: false, progress: 0, prerequisites: [], lessonIds: ['simple-words', 'everyday-vocab', 'numbers-colors'] },
  'skill-syntax': { id: 'skill-syntax', name: 'Sentence Structure', description: 'SOV order, adjective agreement, relative clauses', icon: '🔗', unlocked: true, completed: false, progress: 0, prerequisites: [], lessonIds: ['basic-sentences', 'relative-clauses'] },
  'skill-conjugation': { id: 'skill-conjugation', name: 'Verb Conjugation', description: 'Tenses: present, imperfect, future, perfect — 9 forms each', icon: '🔊', unlocked: true, completed: false, progress: 0, prerequisites: [], lessonIds: ['verb-conjugation'] },
  'skill-declensions': { id: 'skill-declensions', name: 'Declensions', description: '8 cases across 3 genders, 3 numbers', icon: '📊', unlocked: true, completed: false, progress: 0, prerequisites: [], lessonIds: ['declensions', 'declensions-practice'] },
  'skill-sandhi': { id: 'skill-sandhi', name: 'Sandhi', description: 'Sound merger rules: Guṇa, Vṛddhi, Yaṇ, Visarga', icon: '🔊', unlocked: true, completed: false, progress: 0, prerequisites: [], lessonIds: ['sandhi-rules'] },
  'skill-compounds': { id: 'skill-compounds', name: 'Compounds', description: 'Samāsa types: Tatpuruṣa, Bahuvrīhi, Dvandva, Avyayībhāva', icon: '🧩', unlocked: true, completed: false, progress: 0, prerequisites: [], lessonIds: ['compounds', 'avyayibhava'] },
  'skill-grammar': { id: 'skill-grammar', name: 'Advanced Grammar', description: 'Kṛdanta & Taddhita: primary & secondary derivatives', icon: '📐', unlocked: true, completed: false, progress: 0, prerequisites: [], lessonIds: ['krdanta', 'taddhita'] },
  'skill-classical-texts': { id: 'skill-classical-texts', name: 'Classical Texts', description: 'Kālidāsa, Vyāsa, Bhavabhūti, Daṇḍin', icon: '📜', unlocked: true, completed: false, progress: 0, prerequisites: [], lessonIds: ['kalidasa', 'kalidasa-works'] },
  'skill-philosophy': { id: 'skill-philosophy', name: 'Philosophy', description: 'Nyāya, Sāṅkhya, Yoga, Vedānta, Mīmāṃsā', icon: '🧠', unlocked: true, completed: false, progress: 0, prerequisites: [], lessonIds: ['nyaya-intro', 'sankhya', 'yoga-sutra', 'upanishad'] },
  'skill-critical-edition': { id: 'skill-critical-edition', name: 'Textual Criticism', description: 'Stemmatics, recension, emendation, critical apparatus', icon: '📐', unlocked: true, completed: false, progress: 0, prerequisites: [], lessonIds: ['textual-criticism', 'lexicography'] },
  'skill-paleography': { id: 'skill-paleography', name: 'Paleography', description: 'Brāhmī, Gupta, Siddhamātṛkā, Nāgarī, Grantha scripts', icon: '🔍', unlocked: true, completed: false, progress: 0, prerequisites: [], lessonIds: ['paleography', 'manuscript-studies'] },
  'skill-phd-research': { id: 'skill-phd-research', name: 'PhD Research', description: 'Critical edition preparation, publication ethics, thesis writing', icon: '🏛️', unlocked: true, completed: false, progress: 0, prerequisites: [], lessonIds: ['critical-edition', 'critical-edition-theory', 'digital-humanities', 'publication'] },
}

export function getDefaultProgress(): UserProgress {
  return {
    completedLessons: [],
    quizScores: {},
    currentLevel: 0 as Level,
    currentTrack: 'child' as Track,
    currentGovClass: 'class-1-2' as UserProgress['currentGovClass'],
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