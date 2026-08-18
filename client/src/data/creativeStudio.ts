export interface Meter {
  name: string
  syllables: number
  lines: number
  desc: string
}

export const METERS: Meter[] = [
  { name: 'अनुष्टुभ्', syllables: 8, lines: 4, desc: '8 syllables × 4 lines — the most common shloka meter' },
  { name: 'त्रिष्टुभ्', syllables: 11, lines: 4, desc: '11 syllables × 4 lines — the meter of Vedic hymns' },
  { name: 'गायत्री', syllables: 8, lines: 3, desc: '8 syllables × 3 lines — the sacred Vedic meter' },
]

export interface ThemeWord {
  sa: string
  iast: string
  en: string
}

export interface VerseTheme {
  id: string
  emoji: string
  title: string
  words: ThemeWord[]
  templates: string[][]
}

export const VERSE_THEMES: VerseTheme[] = [
  {
    id: 'nature',
    emoji: '🌳',
    title: 'प्रकृतिः — Nature',
    words: [
      { sa: 'वृक्षाः', iast: 'vṛkṣāḥ', en: 'trees' },
      { sa: 'जलम्', iast: 'jalam', en: 'water' },
      { sa: 'पर्वताः', iast: 'parvatāḥ', en: 'mountains' },
      { sa: 'नदी', iast: 'nadī', en: 'river' },
      { sa: 'चन्द्रः', iast: 'candraḥ', en: 'moon' },
      { sa: 'सूर्यः', iast: 'sūryaḥ', en: 'sun' },
      { sa: 'पुष्पाणि', iast: 'puṣpāṇi', en: 'flowers' },
      { sa: 'पक्षिणः', iast: 'pakṣiṇaḥ', en: 'birds' },
    ],
    templates: [
      ['{1} {2} प्रकाशन्ते', '{1} {2} प्रकाशते'],
      ['वने {1} {2} सन्ति', 'वने {1} {2} अस्ति'],
      ['अहो {1} {2} शोभनम्', 'अहो {1} {2} शोभना'],
      ['{1} {2} सदा रम्यम्', '{1} {2} सदा रम्या'],
    ],
  },
  {
    id: 'learning',
    emoji: '📚',
    title: 'विद्या — Learning',
    words: [
      { sa: 'विद्या', iast: 'vidyā', en: 'knowledge' },
      { sa: 'गुरुः', iast: 'guruḥ', en: 'teacher' },
      { sa: 'पुस्तकम्', iast: 'pustakam', en: 'book' },
      { sa: 'शिष्याः', iast: 'śiṣyāḥ', en: 'students' },
      { sa: 'ध्यानम्', iast: 'dhyānam', en: 'meditation' },
      { sa: 'ज्ञानम्', iast: 'jñānam', en: 'wisdom' },
      { sa: 'शब्दाः', iast: 'śabdāḥ', en: 'words' },
      { sa: 'पाठाः', iast: 'pāṭhāḥ', en: 'lessons' },
    ],
    templates: [
      ['{1} {2} प्रयच्छति', '{1} {2} प्रयच्छति'],
      ['गुरोः {1} {2} शिक्षामः', 'गुरोः {1} {2} शिक्षते'],
      ['{1} {2} प्रकाशाय', '{1} {2} प्रकाशाय'],
      ['{1} {2} स्मरामः', '{1} {2} स्मरामः'],
    ],
  },
  {
    id: 'peace',
    emoji: '🕊️',
    title: 'शान्तिः — Peace',
    words: [
      { sa: 'शान्तिः', iast: 'śāntiḥ', en: 'peace' },
      { sa: 'हृदयम्', iast: 'hṛdayam', en: 'heart' },
      { sa: 'प्रेम', iast: 'prema', en: 'love' },
      { sa: 'दया', iast: 'dayā', en: 'compassion' },
      { sa: 'सत्यम्', iast: 'satyam', en: 'truth' },
      { sa: 'मनः', iast: 'manaḥ', en: 'mind' },
      { sa: 'धर्मः', iast: 'dharmaḥ', en: 'righteousness' },
      { sa: 'आनन्दः', iast: 'ānandaḥ', en: 'joy' },
    ],
    templates: [
      ['{1} {2} हृदि तिष्ठति', '{1} {2} हृदि तिष्ठति'],
      ['{1} {2} सर्वदा भवेत्', '{1} {2} सर्वदा भवेत्'],
      ['मनः {1} {2} धारयेत्', 'मनः {1} {2} धारयेत्'],
      ['{1} {2} प्रशान्तिः', '{1} {2} प्रशान्तिः'],
    ],
  },
  {
    id: 'cosmos',
    emoji: '🌌',
    title: 'ब्रह्माण्डम् — Cosmos',
    words: [
      { sa: 'आकाशम्', iast: 'ākāśam', en: 'sky' },
      { sa: 'तारकाः', iast: 'tārakāḥ', en: 'stars' },
      { sa: 'वेदाः', iast: 'vedāḥ', en: 'the Vedas' },
      { sa: 'मन्त्राः', iast: 'mantrāḥ', en: 'mantras' },
      { sa: 'अग्निः', iast: 'agniḥ', en: 'fire' },
      { sa: 'इन्द्रः', iast: 'indraḥ', en: 'Indra' },
      { sa: 'सूर्यः', iast: 'sūryaḥ', en: 'sun' },
      { sa: 'चन्द्रः', iast: 'candraḥ', en: 'moon' },
    ],
    templates: [
      ['आकाशे {1} {2} भान्ति', 'आकाशे {1} {2} भाति'],
      ['{1} {2} प्रकाशयन्ति', '{1} {2} प्रकाशयति'],
      ['देवाः {1} {2} वहन्ति', 'देवः {1} {2} वहति'],
      ['{1} {2} अनन्तम्', '{1} {2} अनन्ता'],
    ],
  },
]

export interface VerseLine {
  sa: string
  iast: string
  gloss: string
  syllables: number
}

export const VOWELS = 'अआइईउऊऋएऐओऔ'
export const VOWEL_SIGNS = 'ािीुूृेैोौ'
export const CONSONANTS_DEV = 'कखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह'

export function countSyllables(sa: string): number {
  let n = 0
  let prevHalant = false
  for (const ch of sa) {
    if (ch === '्') {
      prevHalant = true
      continue
    }
    if (VOWELS.includes(ch) || VOWEL_SIGNS.includes(ch)) {
      n += 1
      prevHalant = false
    } else if (CONSONANTS_DEV.includes(ch)) {
      if (!prevHalant) n += 1
      prevHalant = false
    } else {
      prevHalant = false
    }
  }
  return n
}