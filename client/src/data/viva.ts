export interface VivaQuestion {
  id: string
  question: string
  keyPoints: string[]
  difficulty: number
}

export const VIVA_QUESTIONS: VivaQuestion[] = [
  { id: 'v1', question: 'Explain the concept of द्रव्य (substance) in Nyāya philosophy.', keyPoints: ['substratum of qualities', '9 dravyas', 'eternal'], difficulty: 4 },
  { id: 'v2', question: 'What is the difference between गुण (quality) and क्रिया (action) in Vaiśeṣika?', keyPoints: ['guṇa = quality residing in substance', 'kriyā = action/motion', 'both inhere in dravya'], difficulty: 4 },
  { id: 'v3', question: 'Describe the वृद्धि sandhi rule with examples.', keyPoints: ['a/ā + e = ai', 'a/ā + o = au', 'example: sadā + eva = sadaiva'], difficulty: 3 },
  { id: 'v4', question: 'Explain the three genders (लिङ्ग) in Sanskrit grammar.', keyPoints: ['pulliṅga = masculine', 'strīliṅga = feminine', 'napuṃsakaliṅga = neuter', 'gender is grammatical not natural'], difficulty: 2 },
  { id: 'v5', question: 'What is the significance of the उपनिषद्s in Vedānta?', keyPoints: ['end of Vedas', 'ātman = brahman', 'tattvamasi', '12 principal upaniṣads'], difficulty: 4 },
  { id: 'v6', question: 'Define योगः according to Patañjali.', keyPoints: ['yogaś citta-vṛtti-nirodhaḥ', 'cessation of mental fluctuations', '8 limbs'], difficulty: 3 },
  { id: 'v7', question: 'What are the 5 types of compounds in Sanskrit? Give examples.', keyPoints: ['tatpuruṣa', 'karmadhāraya', 'dvandva', 'bahuvrīhi', 'avyayībhāva'], difficulty: 3 },
  { id: 'v8', question: 'Explain the Nyāya 5-membered syllogism.', keyPoints: ['pratijñā', 'hetu', 'udāharaṇa', 'upanaya', 'nigamana'], difficulty: 4 },
  { id: 'v9', question: 'What is निष्कामकर्म in the Bhagavad Gītā?', keyPoints: ['action without desire for fruits', 'Gītā 2.47', 'mā phaleṣu kadācana'], difficulty: 3 },
  { id: 'v10', question: "Describe the 8 limbs of Patañjali's Yoga.", keyPoints: ['yama', 'niyama', 'āsana', 'prāṇāyāma', 'pratyāhāra', 'dhāraṇā', 'dhyāna', 'samādhi'], difficulty: 3 },
]