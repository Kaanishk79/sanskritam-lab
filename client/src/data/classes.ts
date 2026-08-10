import type { ClassInfo, GovClassId } from '../types/curriculum'

export const classLevels: ClassInfo[] = [
  {
    id: 'class-1-2', label: 'Class 1-2', shortLabel: '1-2',
    govClassMin: 1, govClassMax: 2, track: 'child',
    description: 'Alphabet, basic words, simple greetings, colors, numbers 1-20, family terms',
    icon: '🖍️', color: '#f39c12', sortOrder: 1,
    ncertBookId: 'govt-class1-2',
  },
  {
    id: 'class-3-5', label: 'Class 3-5', shortLabel: '3-5',
    govClassMin: 3, govClassMax: 5, track: 'child',
    description: 'Nouns, present tense, simple sentences, stories, basic grammar',
    icon: '📗', color: '#e67e22', sortOrder: 2,
    ncertBookId: 'govt-class3-5',
  },
  {
    id: 'class-6', label: 'Class 6 (NCERT)', shortLabel: '6',
    govClassMin: 6, govClassMax: 6, track: 'teen',
    description: 'Deepakam Pratham Bhag: alphabet, vocabulary, simple stories, numbers',
    icon: '📘', color: '#2ecc71', sortOrder: 3,
    ncertBookId: 'ncert-deepakam-6',
  },
  {
    id: 'class-7', label: 'Class 7 (NCERT)', shortLabel: '7',
    govClassMin: 7, govClassMax: 7, track: 'teen',
    description: 'Deepakam (Saptam Kakshayaya): subhāṣitas, service, seasonal routine, brave stories',
    icon: '📘', color: '#27ae60', sortOrder: 4,
    ncertBookId: 'ncert-deepakam-7',
  },
  {
    id: 'class-8', label: 'Class 8 (NCERT)', shortLabel: '8',
    govClassMin: 8, govClassMax: 8, track: 'teen',
    description: 'Deepakam (Ashtam Kakshayaya): nīti ślokas, Digital India, Gita, pronunciation',
    icon: '📘', color: '#1abc9c', sortOrder: 5,
    ncertBookId: 'ncert-deepakam-8',
  },
  {
    id: 'class-9', label: 'Class 9 (NCERT)', shortLabel: '9',
    govClassMin: 9, govClassMax: 9, track: 'teen',
    description: 'Shemushi (Prathamo Bhaga): bhāratīvasantagītiḥ, godohanam, jāṭāyoḥ śauryam, paryāvaraṇam',
    icon: '📕', color: '#2980b9', sortOrder: 6,
    ncertBookId: 'ncert-shemushi-9',
  },
  {
    id: 'class-10', label: 'Class 10 (NCERT)', shortLabel: '10',
    govClassMin: 10, govClassMax: 10, track: 'teen',
    description: 'Shemushi (Dwitiyo Bhaga): śuciparyāvaraṇam, subhāṣitāni, bhūkampavibhīṣikā, anyoktayaḥ',
    icon: '📕', color: '#3498db', sortOrder: 7,
    ncertBookId: 'ncert-shemushi-10',
  },
  {
    id: 'class-11', label: 'Class 11 (NCERT)', shortLabel: '11',
    govClassMin: 11, govClassMax: 11, track: 'undergrad',
    description: 'Bhaswati (Bhag 1) & Shashwati (Bhag 1): kuśalapraśāsanam, sūktisudhā, vedāmṛtam',
    icon: '📙', color: '#8e44ad', sortOrder: 8,
    ncertBookId: 'ncert-bhaswati-11',
  },
  {
    id: 'class-12', label: 'Class 12 (NCERT)', shortLabel: '12',
    govClassMin: 12, govClassMax: 12, track: 'undergrad',
    description: 'Bhaswati (Bhag 2) & Shashwati (Bhag 2): anuśāsanam, madālasā, vidyayāmṛtamaśnute',
    icon: '📙', color: '#9b59b6', sortOrder: 9,
    ncertBookId: 'ncert-bhaswati-12',
  },
  {
    id: 'ba-1', label: 'BA 1st Year', shortLabel: 'BA-I',
    govClassMin: 13, govClassMax: 13, track: 'undergrad',
    description: 'History of Sanskrit Literature, Prose (Kādambarī), Poetry (Raghuvaṃśa), Laghusiddhāntakaumudī',
    icon: '🎓', color: '#e74c3c', sortOrder: 10,
    ncertBookId: 'govt-ba1-literature',
  },
  {
    id: 'ba-2', label: 'BA 2nd Year', shortLabel: 'BA-II',
    govClassMin: 14, govClassMax: 14, track: 'undergrad',
    description: 'Drama (Śakuntala, Svapnavāsavadattam), Poetics (Kāvyaprakāśa), Advanced Grammar',
    icon: '🎭', color: '#c0392b', sortOrder: 11,
    ncertBookId: 'govt-ba2-drama',
  },
  {
    id: 'ba-3', label: 'BA 3rd Year', shortLabel: 'BA-III',
    govClassMin: 15, govClassMax: 15, track: 'graduate',
    description: 'Philosophy (Gītā, Upaniṣads, Darśanas), Vedic Studies, Specialization',
    icon: '🕉️', color: '#d35400', sortOrder: 12,
    ncertBookId: 'govt-ba3-philosophy',
  },
  {
    id: 'ma-1', label: 'MA Previous', shortLabel: 'MA-I',
    govClassMin: 16, govClassMax: 16, track: 'graduate',
    description: 'Vedic Literature, Linguistics, Epic & Purāṇas, Classical Poetry, Aṣṭādhyāyī',
    icon: '🔬', color: '#16a085', sortOrder: 13,
    ncertBookId: 'govt-ma1-linguistics',
  },
  {
    id: 'ma-2', label: 'MA Final', shortLabel: 'MA-II',
    govClassMin: 17, govClassMax: 17, track: 'phd',
    description: 'Advanced Poetics, Dhvanyāloka, Sāhityadarpaṇa, Research Methods, Dissertation',
    icon: '📝', color: '#2c3e50', sortOrder: 14,
    ncertBookId: 'govt-ma2-poetics',
  },
  {
    id: 'mphil', label: 'MPhil', shortLabel: 'MPhil',
    govClassMin: 18, govClassMax: 18, track: 'phd',
    description: 'Textual Criticism, Paleography, Manuscriptology, Thesis Proposal & Defense',
    icon: '📐', color: '#7f8c8d', sortOrder: 15,
    ncertBookId: 'govt-mphil-criticism',
  },
  {
    id: 'phd', label: 'PhD', shortLabel: 'PhD',
    govClassMin: 19, govClassMax: 19, track: 'phd',
    description: 'Thesis Composition, Publication Ethics, Peer Review, Viva Voce',
    icon: '🎓', color: '#34495e', sortOrder: 16,
    ncertBookId: 'govt-phd-thesis',
  },
]

export const govClassMap: Record<GovClassId, ClassInfo> = Object.fromEntries(
  classLevels.map((c) => [c.id, c])
) as Record<GovClassId, ClassInfo>

export function getGovClassFor(xp: number, completedLessons: number): GovClassId {
  if (xp < 30 || completedLessons < 2) return 'class-1-2'
  if (xp < 60 || completedLessons < 5) return 'class-3-5'
  if (xp < 100 || completedLessons < 8) return 'class-6'
  if (xp < 150 || completedLessons < 10) return 'class-7'
  if (xp < 200 || completedLessons < 12) return 'class-8'
  if (xp < 260 || completedLessons < 14) return 'class-9'
  if (xp < 330 || completedLessons < 16) return 'class-10'
  if (xp < 400 || completedLessons < 18) return 'class-11'
  if (xp < 480 || completedLessons < 20) return 'class-12'
  if (xp < 570 || completedLessons < 22) return 'ba-1'
  if (xp < 670 || completedLessons < 24) return 'ba-2'
  if (xp < 780 || completedLessons < 26) return 'ba-3'
  if (xp < 900 || completedLessons < 28) return 'ma-1'
  if (xp < 1050 || completedLessons < 30) return 'ma-2'
  if (xp < 1200 || completedLessons < 32) return 'mphil'
  return 'phd'
}

export function getNextGovClass(current: GovClassId): GovClassId | null {
  const idx = classLevels.findIndex((c) => c.id === current)
  if (idx < 0 || idx >= classLevels.length - 1) return null
  return classLevels[idx + 1].id
}

export function getPrevGovClass(current: GovClassId): GovClassId | null {
  const idx = classLevels.findIndex((c) => c.id === current)
  if (idx <= 0) return null
  return classLevels[idx - 1].id
}
