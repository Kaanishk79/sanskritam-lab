export interface Dhatu {
  root: string
  iast: string
  gana: string
  ganaNum: number
  meaning: string
  meaningHi?: string
  present: string
}

export const DHATUS: Dhatu[] = [
  { root: 'भू', iast: 'bhū', gana: 'भ्वादि', ganaNum: 1, meaning: 'to be, become', meaningHi: 'होना, बनना', present: 'भवति' },
  { root: 'कृ', iast: 'kṛ', gana: 'तनादि', ganaNum: 8, meaning: 'to do, make', meaningHi: 'करना, बनाना', present: 'करोति' },
  { root: 'गम्', iast: 'gam', gana: 'भ्वादि', ganaNum: 1, meaning: 'to go', meaningHi: 'जाना', present: 'गच्छति' },
  { root: 'पठ्', iast: 'paṭh', gana: 'भ्वादि', ganaNum: 1, meaning: 'to read, recite', meaningHi: 'पढ़ना, पाठ करना', present: 'पठति' },
  { root: 'लिख्', iast: 'likh', gana: 'भ्वादि', ganaNum: 1, meaning: 'to write', meaningHi: 'लिखना', present: 'लिखति' },
  { root: 'वद्', iast: 'vad', gana: 'भ्वादि', ganaNum: 1, meaning: 'to speak', meaningHi: 'बोलना, कहना', present: 'वदति' },
  { root: 'इ', iast: 'i', gana: 'अदादि', ganaNum: 2, meaning: 'to go', meaningHi: 'जाना', present: 'एति' },
  { root: 'आस्', iast: 'ās', gana: 'अदादि', ganaNum: 2, meaning: 'to sit, be', meaningHi: 'बैठना, होना', present: 'आस्ते' },
  { root: 'स्था', iast: 'sthā', gana: 'भ्वादि', ganaNum: 1, meaning: 'to stand, stay', meaningHi: 'खड़ा होना, रहना', present: 'तिष्ठति' },
  { root: 'दा', iast: 'dā', gana: 'जुहोत्यादि', ganaNum: 3, meaning: 'to give', meaningHi: 'देना', present: 'ददाति' },
  { root: 'धा', iast: 'dhā', gana: 'जुहोत्यादि', ganaNum: 3, meaning: 'to place, hold', meaningHi: 'रखना, धारण करना', present: 'दधाति' },
  { root: 'जन्', iast: 'jan', gana: 'दिवादि', ganaNum: 4, meaning: 'to be born', meaningHi: 'जन्म लेना', present: 'जायते' },
  { root: 'मन्', iast: 'man', gana: 'दिवादि', ganaNum: 4, meaning: 'to think', meaningHi: 'सोचना, मानना', present: 'मन्यते' },
  { root: 'श्रु', iast: 'śru', gana: 'स्वादि', ganaNum: 5, meaning: 'to hear', meaningHi: 'सुनना', present: 'शृणोति' },
  { root: 'सु', iast: 'su', gana: 'स्वादि', ganaNum: 5, meaning: 'to press (Soma)', meaningHi: 'निचोड़ना (सोम)', present: 'सुनोति' },
  { root: 'तन्', iast: 'tan', gana: 'तनादि', ganaNum: 8, meaning: 'to stretch', meaningHi: 'फैलाना, तानना', present: 'तनोति' },
  { root: 'क्री', iast: 'krī', gana: 'क्रयादि', ganaNum: 9, meaning: 'to buy', meaningHi: 'खरीदना', present: 'क्रीणाति' },
  { root: 'पू', iast: 'pū', gana: 'क्रयादि', ganaNum: 9, meaning: 'to purify', meaningHi: 'शुद्ध करना', present: 'पुनाति' },
  { root: 'वच्', iast: 'vac', gana: 'अदादि', ganaNum: 2, meaning: 'to speak', meaningHi: 'बोलना, कहना', present: 'वक्ति' },
  { root: 'हन्', iast: 'han', gana: 'अदादि', ganaNum: 2, meaning: 'to strike, kill', meaningHi: 'मारना, प्रहार करना', present: 'हन्ति' },
  { root: 'चर्', iast: 'car', gana: 'भ्वादि', ganaNum: 1, meaning: 'to move, wander', meaningHi: 'चलना, भटकना', present: 'चरति' },
  { root: 'नम्', iast: 'nam', gana: 'भ्वादि', ganaNum: 1, meaning: 'to bow', meaningHi: 'नमन करना, झुकना', present: 'नमति' },
  { root: 'ज्ञा', iast: 'jñā', gana: 'क्रयादि', ganaNum: 9, meaning: 'to know', meaningHi: 'जानना', present: 'जानाति' },
  { root: 'पा', iast: 'pā', gana: 'भ्वादि', ganaNum: 1, meaning: 'to drink', meaningHi: 'पीना', present: 'पिबति' },
  { root: 'वस्', iast: 'vas', gana: 'भ्वादि', ganaNum: 1, meaning: 'to dwell', meaningHi: 'रहना, निवास करना', present: 'वसति' },
  { root: 'रुच्', iast: 'ruc', gana: 'दिवादि', ganaNum: 4, meaning: 'to shine, please', meaningHi: 'चमकना, प्रसन्न करना', present: 'रोचते' },
  { root: 'वृ', iast: 'vṛ', gana: 'भ्वादि', ganaNum: 1, meaning: 'to choose', meaningHi: 'चुनना', present: 'वृणोति' },
  { root: 'दृश्', iast: 'dṛś', gana: 'दिवादि', ganaNum: 4, meaning: 'to see', meaningHi: 'देखना', present: 'पश्यति' },
  { root: 'खाद्', iast: 'khād', gana: 'भ्वादि', ganaNum: 1, meaning: 'to eat', meaningHi: 'खाना', present: 'खादति' },
  { root: 'जि', iast: 'ji', gana: 'भ्वादि', ganaNum: 1, meaning: 'to conquer', meaningHi: 'जीतना, विजय प्राप्त करना', present: 'जयति' },
  { root: 'दृ', iast: 'dṛ', gana: 'भ्वादि', ganaNum: 1, meaning: 'to regard', meaningHi: 'देखना, विचार करना', present: 'ददर्श' },
  { root: 'बुध्', iast: 'budh', gana: 'भ्वादि', ganaNum: 1, meaning: 'to wake, know', meaningHi: 'जागना, जानना', present: 'बोधति' },
  { root: 'भज्', iast: 'bhaj', gana: 'भ्वादि', ganaNum: 1, meaning: 'to share, worship', meaningHi: 'बाँटना, पूजा करना', present: 'भजति' },
  { root: 'मृ', iast: 'mṛ', gana: 'दिवादि', ganaNum: 4, meaning: 'to die', meaningHi: 'मरना', present: 'म्रियते' },
  { root: 'युध्', iast: 'yudh', gana: 'दिवादि', ganaNum: 4, meaning: 'to fight', meaningHi: 'लड़ना', present: 'युध्यते' },
  { root: 'विश्', iast: 'viś', gana: 'स्वादि', ganaNum: 6, meaning: 'to enter', meaningHi: 'प्रवेश करना', present: 'विशति' },
  { root: 'सृ', iast: 'sṛ', gana: 'भ्वादि', ganaNum: 1, meaning: 'to flow, run', meaningHi: 'बहना, दौड़ना', present: 'सरति' },
  { root: 'अस्', iast: 'as', gana: 'अदादि', ganaNum: 2, meaning: 'to be (copula)', meaningHi: 'होना (संयोजक)', present: 'अस्ति' },
  { root: 'रम्', iast: 'ram', gana: 'भ्वादि', ganaNum: 1, meaning: 'to delight', meaningHi: 'आनंदित होना, रमना', present: 'रमते' },
  { root: 'प्रच्छ्', iast: 'pracch', gana: 'स्वादि', ganaNum: 6, meaning: 'to ask', meaningHi: 'पूछना', present: 'पृच्छति' },
]