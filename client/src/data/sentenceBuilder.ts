export interface SentenceWord {
  sa: string
  en: string
}

export interface Sentence {
  id: string
  level: 'easy' | 'medium' | 'hard'
  sa: string
  iast: string
  en: string
  words: SentenceWord[]
}

export const SENTENCES: Sentence[] = [
  {
    id: 's1', level: 'easy',
    sa: 'रामः फलम् खादति', iast: 'rāmaḥ phalam khādati',
    en: 'Rama eats a fruit',
    words: [
      { sa: 'रामः', en: 'Rama (nom.)' }, { sa: 'फलम्', en: 'fruit (acc.)' }, { sa: 'खादति', en: 'eats' },
    ],
  },
  {
    id: 's2', level: 'easy',
    sa: 'सीता वने वसति', iast: 'sītā vane vasati',
    en: 'Sita lives in the forest',
    words: [
      { sa: 'सीता', en: 'Sita (nom.)' }, { sa: 'वने', en: 'in the forest (loc.)' }, { sa: 'वसति', en: 'lives' },
    ],
  },
  {
    id: 's3', level: 'easy',
    sa: 'बालकः पुस्तकम् पठति', iast: 'bālakaḥ pustakam paṭhati',
    en: 'The boy reads a book',
    words: [
      { sa: 'बालकः', en: 'boy (nom.)' }, { sa: 'पुस्तकम्', en: 'book (acc.)' }, { sa: 'पठति', en: 'reads' },
    ],
  },
  {
    id: 's4', level: 'easy',
    sa: 'अहम् विद्यालयम् गच्छामि', iast: 'aham vidyālayam gacchāmi',
    en: 'I go to school',
    words: [
      { sa: 'अहम्', en: 'I' }, { sa: 'विद्यालयम्', en: 'to school (acc.)' }, { sa: 'गच्छामि', en: 'I go' },
    ],
  },
  {
    id: 's5', level: 'easy',
    sa: 'जलम् शीतम् अस्ति', iast: 'jalam śītam asti',
    en: 'The water is cold',
    words: [
      { sa: 'जलम्', en: 'water (nom.)' }, { sa: 'शीतम्', en: 'cold' }, { sa: 'अस्ति', en: 'is' },
    ],
  },
  {
    id: 's6', level: 'easy',
    sa: 'चन्द्रः आकाशे भ्राजते', iast: 'candraḥ ākāśe bhrājate',
    en: 'The moon shines in the sky',
    words: [
      { sa: 'चन्द्रः', en: 'moon (nom.)' }, { sa: 'आकाशे', en: 'in the sky (loc.)' }, { sa: 'भ्राजते', en: 'shines' },
    ],
  },
  {
    id: 's7', level: 'easy',
    sa: 'सत्यम् एव जयते', iast: 'satyam eva jayate',
    en: 'Truth alone triumphs',
    words: [
      { sa: 'सत्यम्', en: 'truth (nom.)' }, { sa: 'एव', en: 'alone (emphatic)' }, { sa: 'जयते', en: 'triumphs' },
    ],
  },
  {
    id: 's8', level: 'medium',
    sa: 'गुरुः शिष्यम् पाठयति', iast: 'guruḥ śiṣyam pāṭhayati',
    en: 'The teacher teaches the disciple',
    words: [
      { sa: 'गुरुः', en: 'teacher (nom.)' }, { sa: 'शिष्यम्', en: 'disciple (acc.)' }, { sa: 'पाठयति', en: 'teaches (caus.)' },
    ],
  },
  {
    id: 's9', level: 'medium',
    sa: 'नदी ग्रामम् प्रवहति', iast: 'nadī grāmam pravahati',
    en: 'The river flows past the village',
    words: [
      { sa: 'नदी', en: 'river (nom.)' }, { sa: 'ग्रामम्', en: 'past the village (acc.)' }, { sa: 'प्रवहति', en: 'flows' },
    ],
  },
  {
    id: 's10', level: 'medium',
    sa: 'कृषकः क्षेत्रे कार्यम् करोति', iast: 'kṛṣakaḥ kṣetre kāryam karoti',
    en: 'The farmer works in the field',
    words: [
      { sa: 'कृषकः', en: 'farmer (nom.)' }, { sa: 'क्षेत्रे', en: 'in the field (loc.)' }, { sa: 'कार्यम्', en: 'work (acc.)' }, { sa: 'करोति', en: 'does' },
    ],
  },
  {
    id: 's11', level: 'medium',
    sa: 'अहम् संस्कृतम् अधीमहे', iast: 'aham saṃskṛtam adhīmahe',
    en: 'We study Sanskrit',
    words: [
      { sa: 'अहम्', en: 'we' }, { sa: 'संस्कृतम्', en: 'Sanskrit (acc.)' }, { sa: 'अधीमहे', en: 'study' },
    ],
  },
  {
    id: 's12', level: 'medium',
    sa: 'वानरः वृक्षम् आरोहति', iast: 'vānaraḥ vṛkṣam ārohati',
    en: 'The monkey climbs the tree',
    words: [
      { sa: 'वानरः', en: 'monkey (nom.)' }, { sa: 'वृक्षम्', en: 'tree (acc.)' }, { sa: 'आरोहति', en: 'climbs' },
    ],
  },
  {
    id: 's13', level: 'hard',
    sa: 'अध्यापकः पाठम् व्याख्याति', iast: 'adhyāpakaḥ pāṭham vyākhyāti',
    en: 'The professor explains the lesson',
    words: [
      { sa: 'अध्यापकः', en: 'professor (nom.)' }, { sa: 'पाठम्', en: 'lesson (acc.)' }, { sa: 'व्याख्याति', en: 'explains' },
    ],
  },
  {
    id: 's14', level: 'hard',
    sa: 'माता बालिकायै कथाम् कथयति', iast: 'mātā bālikāyai kathām kathayati',
    en: 'The mother tells a story to the girl',
    words: [
      { sa: 'माता', en: 'mother (nom.)' }, { sa: 'बालिकायै', en: 'to the girl (dat.)' }, { sa: 'कथाम्', en: 'story (acc.)' }, { sa: 'कथयति', en: 'tells' },
    ],
  },
  {
    id: 's15', level: 'hard',
    sa: 'वायुः वेगेन वहति', iast: 'vāyuḥ vegena vahati',
    en: 'The wind blows with speed',
    words: [
      { sa: 'वायुः', en: 'wind (nom.)' }, { sa: 'वेगेन', en: 'with speed (instr.)' }, { sa: 'वहति', en: 'blows' },
    ],
  },
  {
    id: 's16', level: 'hard',
    sa: 'विद्या धनम् सर्वश्रेष्ठम्', iast: 'vidyā dhanam sarvaśreṣṭham',
    en: 'Knowledge is the best wealth',
    words: [
      { sa: 'विद्या', en: 'knowledge (nom.)' }, { sa: 'धनम्', en: 'wealth (nom.)' }, { sa: 'सर्वश्रेष्ठम्', en: 'the best of all' },
    ],
  },
]

export const sentenceOfDay = (): Sentence => SENTENCES[new Date().getDate() % SENTENCES.length]