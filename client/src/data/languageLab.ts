export interface LabWord {
  word: string
  meaning: string
}

export interface ReadingPassage {
  id: string
  title: string
  titleSanskrit: string
  level: string
  text: string
  transliteration: string
  words: LabWord[]
  translation: string
}

export const readingPassages: ReadingPassage[] = [
  {
    id: 'rp1',
    title: 'Śakuntalā Greets Duṣyanta',
    titleSanskrit: 'शकुन्तला दुष्यन्तं प्रति',
    level: 'Class 6',
    text: 'अप्यधीतं सरस्वत्या यत्त्वया हृदयं गतम् । तद्विद्याधरलोकस्य श्रुत्वापि न भविष्यति ॥',
    transliteration: 'apyadhītaṃ sarasvatyā yattvayā hṛdayaṃ gatam | tadvidyādharalokasya śrutvāpi na bhaviṣyati ||',
    words: [
      { word: 'अपि', meaning: 'surely, indeed' },
      { word: 'अधीतम्', meaning: 'studied, learned' },
      { word: 'सरस्वत्या', meaning: 'by Sarasvatī (goddess of speech)' },
      { word: 'यत्', meaning: 'which' },
      { word: 'हृदयम्', meaning: 'heart' },
      { word: 'गतम्', meaning: 'gone, entered' },
      { word: 'विद्याधरलोकस्य', meaning: 'of the world of Vidyādharas' },
      { word: 'श्रुत्वा', meaning: 'having heard' },
    ],
    translation: 'What you have studied with Sarasvatī herself and taken to heart — even the Vidyādhara world will not hear of it.',
  },
  {
    id: 'rp2',
    title: 'Nīti from Hitopadeśa',
    titleSanskrit: 'हितोपदेशनीतिः',
    level: 'Class 8',
    text: 'असाधुः साधुभावेन प्रच्छन्नो यः समाचरेत् । तं निगृह्णीयाद्राजा तु नीतिशास्त्रविशारदः ॥',
    transliteration: 'asādhuḥ sādhubhāvena pracchanno yaḥ samācaret | taṃ nigṛhṇīyādrājā tu nītiśāstravyāradaḥ ||',
    words: [
      { word: 'असाधुः', meaning: 'a wicked person' },
      { word: 'साधुभावेन', meaning: 'with good-natured appearance' },
      { word: 'प्रच्छन्नः', meaning: 'concealed, disguised' },
      { word: 'यः', meaning: 'who' },
      { word: 'समाचरेत्', meaning: 'would behave' },
      { word: 'तम्', meaning: 'him' },
      { word: 'निगृह्णीयात्', meaning: 'should restrain, punish' },
      { word: 'नीतिशास्त्रविशारदः', meaning: 'expert in the science of polity' },
    ],
    translation: 'A wicked person who behaves concealed under a good nature — a king expert in statecraft should restrain him.',
  },
  {
    id: 'rp3',
    title: 'The Cloud Messenger (Opening)',
    titleSanskrit: 'मेघदूतपूर्वमेघः',
    level: 'Class 10',
    text: 'कश्चित्कान्ताविरहगुरुणा स्वाधिकारात्प्रमत्तः शापेनास्तङ्गमितमहिमा वर्षभोग्येण भर्तुः ।',
    transliteration: 'kaścitkāntāvirahaguruṇā svādhikārātpramattaḥ śāpenāstaṅgitamahimā varṣabhogyena bhartuḥ |',
    words: [
      { word: 'कश्चित्', meaning: 'a certain (Yakṣa)' },
      { word: 'कान्ताविरहगुरुणा', meaning: 'heavy with separation from his beloved' },
      { word: 'स्वाधिकारात्', meaning: 'from his own office/duty' },
      { word: 'प्रमत्तः', meaning: 'careless, negligent' },
      { word: 'शापेन', meaning: 'by a curse' },
      { word: 'अस्तङ्गमितमहिमा', meaning: 'one whose glory has set' },
      { word: 'वर्षभोग्येण', meaning: 'to be endured for a year' },
      { word: 'भर्तुः', meaning: 'of the master (Kubera)' },
    ],
    translation: 'A certain Yakṣa, negligent of his duty and heavy with separation from his beloved, had his glory eclipsed by his master\u2019s curse for a year.',
  },
  {
    id: 'rp4',
    title: 'Pāṇini\u2019s Grammar Begins',
    titleSanskrit: 'अष्टाध्यायीप्रारम्भः',
    level: 'BA 1st Year',
    text: 'वृद्धिरादैच् । अदेङ्गुणः । अचोऽन्त्यादि टि । तिङ्शित्सार्वधातुकम् ।',
    transliteration: 'vṛddhirādaic | adeṅguṇaḥ | aco\u2019ntyādi ṭi | tiṅśitsārvadhātukam |',
    words: [
      { word: 'वृद्धिः', meaning: 'vṛddhi (the strengthened vowels ā, ai, au)' },
      { word: 'आत्-ऐच्', meaning: 'ā and the ai/au sounds' },
      { word: 'आत्-एङ्', meaning: 'ā and e/o sounds' },
      { word: 'गुणः', meaning: 'guṇa (grade a, e, o)' },
      { word: 'अच्', meaning: 'the vowel class (pratyāhāra)' },
      { word: 'टि', meaning: 'final vowel + following consonants' },
      { word: 'तिङ्', meaning: 'finite verb endings' },
      { word: 'सार्वधातुकम्', meaning: 'strong endings (sārvadhātuka)' },
    ],
    translation: '1.1.1 Vṛddhi is ā and ai, au. 1.1.2 Guṇa is ā and e, o. 1.1.64 The vowel-final part (ṭi). 3.4.113 Tiṅ-endings with śit-markers are sārvadhātuka.',
  },
  {
    id: 'rp5',
    title: 'Yoga: Stillness of Mind',
    titleSanskrit: 'योगसूत्रम्',
    level: 'BA 2nd Year',
    text: 'योगश्चित्तवृत्तिनिरोधः । तदा द्रष्टुः स्वरूपेऽवस्थानम् ।',
    transliteration: 'yogaścittavṛttinirodhaḥ | tadā draṣṭuḥ svarūpe\u2019vasthānam |',
    words: [
      { word: 'योगः', meaning: 'yoga' },
      { word: 'चित्तवृत्तिनिरोधः', meaning: 'the suppression of the fluctuations of the mind' },
      { word: 'तदा', meaning: 'then' },
      { word: 'द्रष्टुः', meaning: 'of the seer' },
      { word: 'स्वरूपे', meaning: 'in one\u2019s own true form' },
      { word: 'अवस्थानम्', meaning: 'resting, abiding' },
    ],
    translation: '1.2 Yoga is the cessation of the fluctuations of the mind. 1.3 Then the seer abides in his own true nature.',
  },
  {
    id: 'rp6',
    title: 'The Greatest Dharmas',
    titleSanskrit: 'धर्मश्लोकाः',
    level: 'MA',
    text: 'सत्यं हि परमं धर्मं तपः परममेव च । क्षमा परममैश्वर्यं तुष्टिः परमं सुखम् ॥',
    transliteration: 'satyaṃ hi paramaṃ dharmaṃ tapaḥ paramameva ca | kṣamā paramamaiśvaryaṃ tuṣṭiḥ paramaṃ sukham ||',
    words: [
      { word: 'सत्यम्', meaning: 'truth' },
      { word: 'परमम्', meaning: 'highest, supreme' },
      { word: 'धर्मम्', meaning: 'dharma, righteousness' },
      { word: 'तपः', meaning: 'austerity' },
      { word: 'क्षमा', meaning: 'forbearance, forgiveness' },
      { word: 'ऐश्वर्यम्', meaning: 'sovereignty, power' },
      { word: 'तुष्टिः', meaning: 'contentment' },
      { word: 'सुखम्', meaning: 'happiness' },
    ],
    translation: 'Truth is indeed the highest dharma; austerity the highest too. Forbearance is the highest power; contentment the highest happiness.',
  },
]

export interface ListeningItem {
  id: string
  text: string
  transliteration: string
  meaning: string
  hint: string
}

export const listeningItems: ListeningItem[] = [
  { id: 'l1', text: 'नमस्ते', transliteration: 'namaste', meaning: 'I bow to you', hint: '3 words' },
  { id: 'l2', text: 'अहं छात्रः', transliteration: 'ahaṃ chātraḥ', meaning: 'I am a student', hint: 'अहं + छात्रः' },
  { id: 'l3', text: 'त्वं कुत्र गच्छसि', transliteration: 'tvaṃ kutra gacchasi', meaning: 'Where are you going?', hint: 'कुत्र = where' },
  { id: 'l4', text: 'पुस्तकम् आनय', transliteration: 'pustakam ānaya', meaning: 'Bring the book', hint: 'imperative आनय' },
  { id: 'l5', text: 'रामः वनम् गच्छति', transliteration: 'rāmaḥ vanam gacchati', meaning: 'Rāma goes to the forest', hint: 'subject + object + verb' },
  { id: 'l6', text: 'सत्यमेव जयते', transliteration: 'satyameva jayate', meaning: 'Truth alone triumphs', hint: 'national motto' },
  { id: 'l7', text: 'विद्या ददाति विनयम्', transliteration: 'vidyā dadāti vinayam', meaning: 'Knowledge gives humility', hint: 'ददाति = gives' },
  { id: 'l8', text: 'संस्कृतं भारतस्य पवित्रा भाषा', transliteration: 'saṃskṛtaṃ bhāratasya pavitrā bhāṣā', meaning: 'Sanskrit is the sacred language of India', hint: 'पवित्रा = sacred' },
]

export interface WritingItem {
  id: string
  prompt: string
  correct: string
  hint: string
}

export const writingItems: WritingItem[] = [
  { id: 'w1', prompt: 'Write \u201cthe king\u201d in Devanagari', correct: 'राजा', hint: 'रा + जा' },
  { id: 'w2', prompt: 'Write \u201cthe book\u201d in Devanagari', correct: 'पुस्तकम्', hint: 'पुस्तकम्' },
  { id: 'w3', prompt: 'Write the numeral \u201c10\u201d in Devanagari digits', correct: '१०', hint: '१ = 1, ० = 0' },
  { id: 'w4', prompt: 'Write \u201ctruth\u201d in Devanagari', correct: 'सत्यम्', hint: 'सत्यम्' },
  { id: 'w5', prompt: 'Write the greeting \u201cnamaste\u201d in Devanagari', correct: 'नमस्ते', hint: 'नमः + ते' },
  { id: 'w6', prompt: 'Write \u201ctoday\u201d in Devanagari', correct: 'अद्य', hint: 'अद्य' },
  { id: 'w7', prompt: 'Write \u201cpeace\u201d (śānti) in Devanagari', correct: 'शान्तिः', hint: 'शान्तिः' },
  { id: 'w8', prompt: 'Write \u201cthe forest\u201d in Devanagari', correct: 'वनम्', hint: 'वनम्' },
]

export interface ComprehensionQuestion {
  id: string
  question: string
  options: string[]
  correct: number
}

export const comprehensionQuestions: Record<string, ComprehensionQuestion[]> = {
  rp1: [
    {
      id: 'c1',
      question: 'Who is addressed in the verse?',
      options: ['Duṣyanta', 'Kālidāsa', 'Sarasvatī', 'A Vidyādhara'],
      correct: 0,
    },
    {
      id: 'c2',
      question: 'What has been learned \u201ctaken to heart\u201d?',
      options: ['A mantra', 'What was studied with Sarasvatī', 'A dance', 'A story'],
      correct: 1,
    },
    {
      id: 'c3',
      question: 'The word हृदयम् means:',
      options: ['hand', 'heart', 'head', 'home'],
      correct: 1,
    },
  ],
  rp2: [
    {
      id: 'c4',
      question: 'How does the wicked person behave?',
      options: ['Openly wicked', 'Concealed under a good nature', 'Away from society', 'As a king'],
      correct: 1,
    },
    {
      id: 'c5',
      question: 'Who should restrain such a person?',
      options: ['A teacher', 'A merchant', 'A king expert in statecraft', 'A priest'],
      correct: 2,
    },
    {
      id: 'c6',
      question: 'नीतिशास्त्र means:',
      options: ['religion', 'science of polity', 'grammar', 'medicine'],
      correct: 1,
    },
  ],
  rp5: [
    {
      id: 'c7',
      question: 'Yoga is defined as:',
      options: ['physical postures', 'cessation of mind-fluctuations', 'breath control', 'meditation on a deity'],
      correct: 1,
    },
    {
      id: 'c8',
      question: 'After cessation, the seer abides in:',
      options: ['the world', 'his own true form', 'the mind', 'silence'],
      correct: 1,
    },
    {
      id: 'c9',
      question: 'चित्त means:',
      options: ['heart', 'mind', 'body', 'breath'],
      correct: 1,
    },
  ],
  rp6: [
    {
      id: 'c10',
      question: 'According to the verse, the highest dharma is:',
      options: ['wealth', 'truth', 'worship', 'fasting'],
      correct: 1,
    },
    {
      id: 'c11',
      question: 'तुष्टिः is described as the highest:',
      options: ['happiness', 'power', 'dharma', 'austerity'],
      correct: 0,
    },
    {
      id: 'c12',
      question: 'क्षमा means:',
      options: ['anger', 'forbearance', 'greed', 'doubt'],
      correct: 1,
    },
  ],
}

export interface LabSkillStats {
  score: number
  attempts: number
}

export const emptyLabStats = (): Record<string, LabSkillStats> => ({
  listening: { score: 0, attempts: 0 },
  speaking: { score: 0, attempts: 0 },
  reading: { score: 0, attempts: 0 },
  writing: { score: 0, attempts: 0 },
})
