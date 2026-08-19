export interface Dhatu {
  root: string
  iast: string
  gana: string
  ganaNum: number
  meaning: string
  present: string
}

export const DHATUS: Dhatu[] = [
  { root: 'भू', iast: 'bhū', gana: 'भ्वादि', ganaNum: 1, meaning: 'to be, become', present: 'भवति' },
  { root: 'कृ', iast: 'kṛ', gana: 'तनादि', ganaNum: 8, meaning: 'to do, make', present: 'करोति' },
  { root: 'गम्', iast: 'gam', gana: 'भ्वादि', ganaNum: 1, meaning: 'to go', present: 'गच्छति' },
  { root: 'पठ्', iast: 'paṭh', gana: 'भ्वादि', ganaNum: 1, meaning: 'to read, recite', present: 'पठति' },
  { root: 'लिख्', iast: 'likh', gana: 'भ्वादि', ganaNum: 1, meaning: 'to write', present: 'लिखति' },
  { root: 'वद्', iast: 'vad', gana: 'भ्वादि', ganaNum: 1, meaning: 'to speak', present: 'वदति' },
  { root: 'इ', iast: 'i', gana: 'अदादि', ganaNum: 2, meaning: 'to go', present: 'एति' },
  { root: 'आस्', iast: 'ās', gana: 'अदादि', ganaNum: 2, meaning: 'to sit, be', present: 'आस्ते' },
  { root: 'स्था', iast: 'sthā', gana: 'भ्वादि', ganaNum: 1, meaning: 'to stand, stay', present: 'तिष्ठति' },
  { root: 'दा', iast: 'dā', gana: 'जुहोत्यादि', ganaNum: 3, meaning: 'to give', present: 'ददाति' },
  { root: 'धा', iast: 'dhā', gana: 'जुहोत्यादि', ganaNum: 3, meaning: 'to place, hold', present: 'दधाति' },
  { root: 'जन्', iast: 'jan', gana: 'दिवादि', ganaNum: 4, meaning: 'to be born', present: 'जायते' },
  { root: 'मन्', iast: 'man', gana: 'दिवादि', ganaNum: 4, meaning: 'to think', present: 'मन्यते' },
  { root: 'श्रु', iast: 'śru', gana: 'स्वादि', ganaNum: 5, meaning: 'to hear', present: 'शृणोति' },
  { root: 'सु', iast: 'su', gana: 'स्वादि', ganaNum: 5, meaning: 'to press (Soma)', present: 'सुनोति' },
  { root: 'तन्', iast: 'tan', gana: 'तनादि', ganaNum: 8, meaning: 'to stretch', present: 'तनोति' },
  { root: 'क्री', iast: 'krī', gana: 'क्रयादि', ganaNum: 9, meaning: 'to buy', present: 'क्रीणाति' },
  { root: 'पू', iast: 'pū', gana: 'क्रयादि', ganaNum: 9, meaning: 'to purify', present: 'पुनाति' },
  { root: 'वच्', iast: 'vac', gana: 'अदादि', ganaNum: 2, meaning: 'to speak', present: 'वक्ति' },
  { root: 'हन्', iast: 'han', gana: 'अदादि', ganaNum: 2, meaning: 'to strike, kill', present: 'हन्ति' },
  { root: 'चर्', iast: 'car', gana: 'भ्वादि', ganaNum: 1, meaning: 'to move, wander', present: 'चरति' },
  { root: 'नम्', iast: 'nam', gana: 'भ्वादि', ganaNum: 1, meaning: 'to bow', present: 'नमति' },
  { root: 'ज्ञा', iast: 'jñā', gana: 'क्रयादि', ganaNum: 9, meaning: 'to know', present: 'जानाति' },
  { root: 'पा', iast: 'pā', gana: 'भ्वादि', ganaNum: 1, meaning: 'to drink', present: 'पिबति' },
  { root: 'वस्', iast: 'vas', gana: 'भ्वादि', ganaNum: 1, meaning: 'to dwell', present: 'वसति' },
  { root: 'रुच्', iast: 'ruc', gana: 'दिवादि', ganaNum: 4, meaning: 'to shine, please', present: 'रोचते' },
  { root: 'वृ', iast: 'vṛ', gana: 'भ्वादि', ganaNum: 1, meaning: 'to choose', present: 'वृणोति' },
  { root: 'दृश्', iast: 'dṛś', gana: 'दिवादि', ganaNum: 4, meaning: 'to see', present: 'पश्यति' },
  { root: 'खाद्', iast: 'khād', gana: 'भ्वादि', ganaNum: 1, meaning: 'to eat', present: 'खादति' },
  { root: 'जि', iast: 'ji', gana: 'भ्वादि', ganaNum: 1, meaning: 'to conquer', present: 'जयति' },
  { root: 'दृ', iast: 'dṛ', gana: 'भ्वादि', ganaNum: 1, meaning: 'to regard', present: 'ददर्श' },
  { root: 'बुध्', iast: 'budh', gana: 'भ्वादि', ganaNum: 1, meaning: 'to wake, know', present: 'बोधति' },
  { root: 'भज्', iast: 'bhaj', gana: 'भ्वादि', ganaNum: 1, meaning: 'to share, worship', present: 'भजति' },
  { root: 'मृ', iast: 'mṛ', gana: 'दिवादि', ganaNum: 4, meaning: 'to die', present: 'म्रियते' },
  { root: 'युध्', iast: 'yudh', gana: 'दिवादि', ganaNum: 4, meaning: 'to fight', present: 'युध्यते' },
  { root: 'विश्', iast: 'viś', gana: 'स्वादि', ganaNum: 6, meaning: 'to enter', present: 'विशति' },
  { root: 'सृ', iast: 'sṛ', gana: 'भ्वादि', ganaNum: 1, meaning: 'to flow, run', present: 'सरति' },
  { root: 'अस्', iast: 'as', gana: 'अदादि', ganaNum: 2, meaning: 'to be (copula)', present: 'अस्ति' },
  { root: 'रम्', iast: 'ram', gana: 'भ्वादि', ganaNum: 1, meaning: 'to delight', present: 'रमते' },
  { root: 'प्रच्छ्', iast: 'pracch', gana: 'स्वादि', ganaNum: 6, meaning: 'to ask', present: 'पृच्छति' },
]