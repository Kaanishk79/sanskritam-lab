export interface LabWord {
  word: string
  meaning: string
  meaningHi?: string
}

export interface ReadingPassage {
  id: string
  title: string
  titleSanskrit: string
  level: string
  levelHi?: string
  text: string
  transliteration: string
  words: LabWord[]
  translation: string
  translationHi?: string
}

export const readingPassages: ReadingPassage[] = [
  {
    id: 'rp1',
    title: 'Śakuntalā Greets Duṣyanta',
    titleSanskrit: 'शकुन्तला दुष्यन्तं प्रति',
    level: 'Class 6',
    levelHi: 'कक्षा 6',
    text: 'अप्यधीतं सरस्वत्या यत्त्वया हृदयं गतम् । तद्विद्याधरलोकस्य श्रुत्वापि न भविष्यति ॥',
    transliteration: 'apyadhītaṃ sarasvatyā yattvayā hṛdayaṃ gatam | tadvidyādharalokasya śrutvāpi na bhaviṣyati ||',
    words: [
      { word: 'अपि', meaning: 'surely, indeed', meaningHi: 'निश्चय ही, सचमुच' },
      { word: 'अधीतम्', meaning: 'studied, learned', meaningHi: 'पढ़ा हुआ, सीखा हुआ' },
      { word: 'सरस्वत्या', meaning: 'by Sarasvatī (goddess of speech)', meaningHi: 'सरस्वती द्वारा (वाणी की देवी)' },
      { word: 'यत्', meaning: 'which', meaningHi: 'जो' },
      { word: 'हृदयम्', meaning: 'heart', meaningHi: 'हृदय' },
      { word: 'गतम्', meaning: 'gone, entered', meaningHi: 'गया हुआ, प्रविष्ट' },
      { word: 'विद्याधरलोकस्य', meaning: 'of the world of Vidyādharas', meaningHi: 'विद्याधरों के लोक का' },
      { word: 'श्रुत्वा', meaning: 'having heard', meaningHi: 'सुनकर' },
    ],
    translation: 'What you have studied with Sarasvatī herself and taken to heart — even the Vidyādhara world will not hear of it.',
    translationHi: 'तुमने स्वयं सरस्वती से जो पढ़ा और हृदय में धारण किया — उसे सुनकर भी विद्याधरों का लोक (वैसा) नहीं बन पाएगा।',
  },
  {
    id: 'rp2',
    title: 'Nīti from Hitopadeśa',
    titleSanskrit: 'हितोपदेशनीतिः',
    level: 'Class 8',
    levelHi: 'कक्षा 8',
    text: 'असाधुः साधुभावेन प्रच्छन्नो यः समाचरेत् । तं निगृह्णीयाद्राजा तु नीतिशास्त्रविशारदः ॥',
    transliteration: 'asādhuḥ sādhubhāvena pracchanno yaḥ samācaret | taṃ nigṛhṇīyādrājā tu nītiśāstravyāradaḥ ||',
    words: [
      { word: 'असाधुः', meaning: 'a wicked person', meaningHi: 'दुष्ट व्यक्ति' },
      { word: 'साधुभावेन', meaning: 'with good-natured appearance', meaningHi: 'सज्जन के भाव से' },
      { word: 'प्रच्छन्नः', meaning: 'concealed, disguised', meaningHi: 'छिपा हुआ, प्रच्छन्न' },
      { word: 'यः', meaning: 'who', meaningHi: 'जो' },
      { word: 'समाचरेत्', meaning: 'would behave', meaningHi: 'आचरण करे' },
      { word: 'तम्', meaning: 'him', meaningHi: 'उसे' },
      { word: 'निगृह्णीयात्', meaning: 'should restrain, punish', meaningHi: 'अवरुद्ध करे, दंड दे' },
      { word: 'नीतिशास्त्रविशारदः', meaning: 'expert in the science of polity', meaningHi: 'नीतिशास्त्र का विशेषज्ञ' },
    ],
    translation: 'A wicked person who behaves concealed under a good nature — a king expert in statecraft should restrain him.',
    translationHi: 'जो दुष्ट व्यक्ति सज्जनता की आड़ में छिपकर आचरण करता है — नीतिशास्त्र में निपुण राजा को उसे नियंत्रित करना चाहिए।',
  },
  {
    id: 'rp3',
    title: 'The Cloud Messenger (Opening)',
    titleSanskrit: 'मेघदूतपूर्वमेघः',
    level: 'Class 10',
    levelHi: 'कक्षा 10',
    text: 'कश्चित्कान्ताविरहगुरुणा स्वाधिकारात्प्रमत्तः शापेनास्तङ्गमितमहिमा वर्षभोग्येण भर्तुः ।',
    transliteration: 'kaścitkāntāvirahaguruṇā svādhikārātpramattaḥ śāpenāstaṅgitamahimā varṣabhogyena bhartuḥ |',
    words: [
      { word: 'कश्चित्', meaning: 'a certain (Yakṣa)', meaningHi: 'कोई एक (यक्ष)' },
      { word: 'कान्ताविरहगुरुणा', meaning: 'heavy with separation from his beloved', meaningHi: 'प्रियतमा के वियोग से भारी' },
      { word: 'स्वाधिकारात्', meaning: 'from his own office/duty', meaningHi: 'अपने कर्तव्य से' },
      { word: 'प्रमत्तः', meaning: 'careless, negligent', meaningHi: 'लापरवाह, असावधान' },
      { word: 'शापेन', meaning: 'by a curse', meaningHi: 'शाप द्वारा' },
      { word: 'अस्तङ्गमितमहिमा', meaning: 'one whose glory has set', meaningHi: 'जिसकी महिमा अस्त हो गई' },
      { word: 'वर्षभोग्येण', meaning: 'to be endured for a year', meaningHi: 'एक वर्ष तक सहने योग्य' },
      { word: 'भर्तुः', meaning: 'of the master (Kubera)', meaningHi: 'स्वामी (कुबेर) के' },
    ],
    translation: 'A certain Yakṣa, negligent of his duty and heavy with separation from his beloved, had his glory eclipsed by his master\u2019s curse for a year.',
    translationHi: 'कोई यक्ष, अपने कर्तव्य से असावधान और प्रियतमा के वियोग से भारी, स्वामी (कुबेर) के एक वर्ष सहने योग्य शाप से जिसकी महिमा अस्त हो गई।',
  },
  {
    id: 'rp4',
    title: 'Pāṇini\u2019s Grammar Begins',
    titleSanskrit: 'अष्टाध्यायीप्रारम्भः',
    level: 'BA 1st Year',
    levelHi: 'बीए प्रथम वर्ष',
    text: 'वृद्धिरादैच् । अदेङ्गुणः । अचोऽन्त्यादि टि । तिङ्शित्सार्वधातुकम् ।',
    transliteration: 'vṛddhirādaic | adeṅguṇaḥ | aco\u2019ntyādi ṭi | tiṅśitsārvadhātukam |',
    words: [
      { word: 'वृद्धिः', meaning: 'vṛddhi (the strengthened vowels ā, ai, au)', meaningHi: 'वृद्धि (आ, ऐ, औ — वर्धित स्वर)' },
      { word: 'आत्-ऐच्', meaning: 'ā and the ai/au sounds', meaningHi: 'आ तथा ऐ/औ ध्वनियाँ' },
      { word: 'आत्-एङ्', meaning: 'ā and e/o sounds', meaningHi: 'आ तथा ए/ओ ध्वनियाँ' },
      { word: 'गुणः', meaning: 'guṇa (grade a, e, o)', meaningHi: 'गुण (अ, ए, ओ स्वर)' },
      { word: 'अच्', meaning: 'the vowel class (pratyāhāra)', meaningHi: 'अच् प्रत्याहार (स्वर वर्ग)' },
      { word: 'टि', meaning: 'final vowel + following consonants', meaningHi: 'अंतिम स्वर + अनुवर्ती व्यंजन' },
      { word: 'तिङ्', meaning: 'finite verb endings', meaningHi: 'तिङन्त (क्रिया के प्रत्यय)' },
      { word: 'सार्वधातुकम्', meaning: 'strong endings (sārvadhātuka)', meaningHi: 'प्रबल प्रत्यय (सार्वधातुक)' },
    ],
    translation: '1.1.1 Vṛddhi is ā and ai, au. 1.1.2 Guṇa is ā and e, o. 1.1.64 The vowel-final part (ṭi). 3.4.113 Tiṅ-endings with śit-markers are sārvadhātuka.',
    translationHi: '1.1.1 वृद्धि = आ तथा ऐ, औ। 1.1.2 गुण = आ तथा ए, ओ। 1.1.64 स्वरांत अंश (टि)। 3.4.113 शित् चिह्न वाले तिङ् प्रत्यय सार्वधातुक कहलाते हैं।',
  },
  {
    id: 'rp5',
    title: 'Yoga: Stillness of Mind',
    titleSanskrit: 'योगसूत्रम्',
    level: 'BA 2nd Year',
    levelHi: 'बीए द्वितीय वर्ष',
    text: 'योगश्चित्तवृत्तिनिरोधः । तदा द्रष्टुः स्वरूपेऽवस्थानम् ।',
    transliteration: 'yogaścittavṛttinirodhaḥ | tadā draṣṭuḥ svarūpe\u2019vasthānam |',
    words: [
      { word: 'योगः', meaning: 'yoga', meaningHi: 'योग' },
      { word: 'चित्तवृत्तिनिरोधः', meaning: 'the suppression of the fluctuations of the mind', meaningHi: 'चित्त की वृत्तियों का निरोध' },
      { word: 'तदा', meaning: 'then', meaningHi: 'तब' },
      { word: 'द्रष्टुः', meaning: 'of the seer', meaningHi: 'द्रष्टा (देखने वाले) का' },
      { word: 'स्वरूपे', meaning: 'in one\u2019s own true form', meaningHi: 'अपने वास्तविक रूप में' },
      { word: 'अवस्थानम्', meaning: 'resting, abiding', meaningHi: 'स्थित होना, अवस्थान' },
    ],
    translation: '1.2 Yoga is the cessation of the fluctuations of the mind. 1.3 Then the seer abides in his own true nature.',
    translationHi: '1.2 योग चित्तवृत्तियों का निरोध है। 1.3 तब द्रष्टा अपने स्वरूप में स्थित रहता है।',
  },
  {
    id: 'rp6',
    title: 'The Greatest Dharmas',
    titleSanskrit: 'धर्मश्लोकाः',
    level: 'MA',
    levelHi: 'एमए',
    text: 'सत्यं हि परमं धर्मं तपः परममेव च । क्षमा परममैश्वर्यं तुष्टिः परमं सुखम् ॥',
    transliteration: 'satyaṃ hi paramaṃ dharmaṃ tapaḥ paramameva ca | kṣamā paramamaiśvaryaṃ tuṣṭiḥ paramaṃ sukham ||',
    words: [
      { word: 'सत्यम्', meaning: 'truth', meaningHi: 'सत्य' },
      { word: 'परमम्', meaning: 'highest, supreme', meaningHi: 'सर्वोच्च, परम' },
      { word: 'धर्मम्', meaning: 'dharma, righteousness', meaningHi: 'धर्म, धार्मिकता' },
      { word: 'तपः', meaning: 'austerity', meaningHi: 'तपस्या' },
      { word: 'क्षमा', meaning: 'forbearance, forgiveness', meaningHi: 'सहनशीलता, क्षमा' },
      { word: 'ऐश्वर्यम्', meaning: 'sovereignty, power', meaningHi: 'ऐश्वर्य, सत्ता' },
      { word: 'तुष्टिः', meaning: 'contentment', meaningHi: 'संतोष' },
      { word: 'सुखम्', meaning: 'happiness', meaningHi: 'सुख' },
    ],
    translation: 'Truth is indeed the highest dharma; austerity the highest too. Forbearance is the highest power; contentment the highest happiness.',
    translationHi: 'सत्य ही परम धर्म है, तथा तप भी परम है। क्षमा ही परम ऐश्वर्य है; संतोष ही परम सुख है।',
  },
]

export interface ListeningItem {
  id: string
  text: string
  transliteration: string
  meaning: string
  meaningHi?: string
  hint: string
  hintHi?: string
}

export const listeningItems: ListeningItem[] = [
  { id: 'l1', text: 'नमस्ते', transliteration: 'namaste', meaning: 'I bow to you', meaningHi: 'मैं आपको प्रणाम करता हूँ', hint: '3 words', hintHi: '3 शब्द' },
  { id: 'l2', text: 'अहं छात्रः', transliteration: 'ahaṃ chātraḥ', meaning: 'I am a student', meaningHi: 'मैं छात्र हूँ', hint: 'अहं + छात्रः', hintHi: 'अहं + छात्रः' },
  { id: 'l3', text: 'त्वं कुत्र गच्छसि', transliteration: 'tvaṃ kutra gacchasi', meaning: 'Where are you going?', meaningHi: 'तुम कहाँ जा रहे हो?', hint: 'कुत्र = where', hintHi: 'कुत्र = कहाँ' },
  { id: 'l4', text: 'पुस्तकम् आनय', transliteration: 'pustakam ānaya', meaning: 'Bring the book', meaningHi: 'पुस्तक लाओ', hint: 'imperative आनय', hintHi: 'आज्ञार्थ रूप आनय' },
  { id: 'l5', text: 'रामः वनम् गच्छति', transliteration: 'rāmaḥ vanam gacchati', meaning: 'Rāma goes to the forest', meaningHi: 'राम वन जाता है', hint: 'subject + object + verb', hintHi: 'कर्ता + कर्म + क्रिया' },
  { id: 'l6', text: 'सत्यमेव जयते', transliteration: 'satyameva jayate', meaning: 'Truth alone triumphs', meaningHi: 'सत्य की ही विजय होती है', hint: 'national motto', hintHi: 'राष्ट्रीय आदर्श-वाक्य' },
  { id: 'l7', text: 'विद्या ददाति विनयम्', transliteration: 'vidyā dadāti vinayam', meaning: 'Knowledge gives humility', meaningHi: 'विद्या विनय देती है', hint: 'ददाति = gives', hintHi: 'ददाति = देता है' },
  { id: 'l8', text: 'संस्कृतं भारतस्य पवित्रा भाषा', transliteration: 'saṃskṛtaṃ bhāratasya pavitrā bhāṣā', meaning: 'Sanskrit is the sacred language of India', meaningHi: 'संस्कृत भारत की पवित्र भाषा है', hint: 'पवित्रा = sacred', hintHi: 'पवित्रा = पवित्र' },
]

export interface WritingItem {
  id: string
  prompt: string
  promptHi?: string
  correct: string
  hint: string
  hintHi?: string
}

export const writingItems: WritingItem[] = [
  { id: 'w1', prompt: 'Write \u201cthe king\u201d in Devanagari', promptHi: 'देवनागरी में "राजा" लिखें', correct: 'राजा', hint: 'रा + जा', hintHi: 'रा + जा' },
  { id: 'w2', prompt: 'Write \u201cthe book\u201d in Devanagari', promptHi: 'देवनागरी में "पुस्तकम्" लिखें', correct: 'पुस्तकम्', hint: 'पुस्तकम्', hintHi: 'पुस्तकम्' },
  { id: 'w3', prompt: 'Write the numeral \u201c10\u201d in Devanagari digits', promptHi: 'देवनागरी अंकों में संख्या "१०" लिखें', correct: '१०', hint: '१ = 1, ० = 0', hintHi: '१ = 1, ० = 0' },
  { id: 'w4', prompt: 'Write \u201ctruth\u201d in Devanagari', promptHi: 'देवनागरी में "सत्यम्" लिखें', correct: 'सत्यम्', hint: 'सत्यम्', hintHi: 'सत्यम्' },
  { id: 'w5', prompt: 'Write the greeting \u201cnamaste\u201d in Devanagari', promptHi: 'देवनागरी में अभिवादन "नमस्ते" लिखें', correct: 'नमस्ते', hint: 'नमः + ते', hintHi: 'नमः + ते' },
  { id: 'w6', prompt: 'Write \u201ctoday\u201d in Devanagari', promptHi: 'देवनागरी में "अद्य" लिखें', correct: 'अद्य', hint: 'अद्य', hintHi: 'अद्य' },
  { id: 'w7', prompt: 'Write \u201cpeace\u201d (śānti) in Devanagari', promptHi: 'देवनागरी में "शान्तिः" (śānti) लिखें', correct: 'शान्तिः', hint: 'शान्तिः', hintHi: 'शान्तिः' },
  { id: 'w8', prompt: 'Write \u201cthe forest\u201d in Devanagari', promptHi: 'देवनागरी में "वनम्" लिखें', correct: 'वनम्', hint: 'वनम्', hintHi: 'वनम्' },
]

export interface ComprehensionQuestion {
  id: string
  question: string
  questionHi?: string
  options: string[]
  optionsHi?: string[]
  correct: number
}

export const comprehensionQuestions: Record<string, ComprehensionQuestion[]> = {
  rp1: [
    {
      id: 'c1',
      question: 'Who is addressed in the verse?',
      questionHi: 'इस श्लोक में किसे संबोधित किया गया है?',
      options: ['Duṣyanta', 'Kālidāsa', 'Sarasvatī', 'A Vidyādhara'],
      optionsHi: ['दुष्यंत', 'कालिदास', 'सरस्वती', 'एक विद्याधर'],
      correct: 0,
    },
    {
      id: 'c2',
      question: 'What has been learned \u201ctaken to heart\u201d?',
      questionHi: 'क्या \u201cहृदयंगत\u201d किया गया है?',
      options: ['A mantra', 'What was studied with Sarasvatī', 'A dance', 'A story'],
      optionsHi: ['एक मंत्र', 'सरस्वती के साथ जो पढ़ा गया', 'एक नृत्य', 'एक कथा'],
      correct: 1,
    },
    {
      id: 'c3',
      question: 'The word हृदयम् means:',
      questionHi: 'हृदयम् शब्द का अर्थ है:',
      options: ['hand', 'heart', 'head', 'home'],
      optionsHi: ['हाथ', 'हृदय', 'सिर', 'घर'],
      correct: 1,
    },
  ],
  rp2: [
    {
      id: 'c4',
      question: 'How does the wicked person behave?',
      questionHi: 'दुष्ट व्यक्ति कैसा आचरण करता है?',
      options: ['Openly wicked', 'Concealed under a good nature', 'Away from society', 'As a king'],
      optionsHi: ['प्रकट रूप में दुष्ट', 'सज्जनता की आड़ में छिपकर', 'समाज से दूर', 'राजा की तरह'],
      correct: 1,
    },
    {
      id: 'c5',
      question: 'Who should restrain such a person?',
      questionHi: 'ऐसे व्यक्ति को किसे नियंत्रित करना चाहिए?',
      options: ['A teacher', 'A merchant', 'A king expert in statecraft', 'A priest'],
      optionsHi: ['गुरु', 'व्यापारी', 'नीतिशास्त्र में निपुण राजा', 'पुरोहित'],
      correct: 2,
    },
    {
      id: 'c6',
      question: 'नीतिशास्त्र means:',
      questionHi: 'नीतिशास्त्र का अर्थ है:',
      options: ['religion', 'science of polity', 'grammar', 'medicine'],
      optionsHi: ['धर्म', 'राजनीति-शास्त्र', 'व्याकरण', 'चिकित्सा'],
      correct: 1,
    },
  ],
  rp5: [
    {
      id: 'c7',
      question: 'Yoga is defined as:',
      questionHi: 'योग की परिभाषा है:',
      options: ['physical postures', 'cessation of mind-fluctuations', 'breath control', 'meditation on a deity'],
      optionsHi: ['शारीरिक आसन', 'चित्तवृत्तियों का निरोध', 'श्वास-नियंत्रण', 'देवता पर ध्यान'],
      correct: 1,
    },
    {
      id: 'c8',
      question: 'After cessation, the seer abides in:',
      questionHi: 'निरोध के बाद द्रष्टा किसमें स्थित रहता है?',
      options: ['the world', 'his own true form', 'the mind', 'silence'],
      optionsHi: ['संसार में', 'अपने वास्तविक रूप में', 'मन में', 'मौन में'],
      correct: 1,
    },
    {
      id: 'c9',
      question: 'चित्त means:',
      questionHi: 'चित्त का अर्थ है:',
      options: ['heart', 'mind', 'body', 'breath'],
      optionsHi: ['हृदय', 'मन', 'शरीर', 'श्वास'],
      correct: 1,
    },
  ],
  rp6: [
    {
      id: 'c10',
      question: 'According to the verse, the highest dharma is:',
      questionHi: 'श्लोक के अनुसार परम धर्म क्या है?',
      options: ['wealth', 'truth', 'worship', 'fasting'],
      optionsHi: ['धन', 'सत्य', 'पूजा', 'उपवास'],
      correct: 1,
    },
    {
      id: 'c11',
      question: 'तुष्टिः is described as the highest:',
      questionHi: 'तुष्टि को किसका परम बताया गया है?',
      options: ['happiness', 'power', 'dharma', 'austerity'],
      optionsHi: ['सुख', 'ऐश्वर्य', 'धर्म', 'तप'],
      correct: 0,
    },
    {
      id: 'c12',
      question: 'क्षमा means:',
      questionHi: 'क्षमा का अर्थ है:',
      options: ['anger', 'forbearance', 'greed', 'doubt'],
      optionsHi: ['क्रोध', 'सहनशीलता', 'लोभ', 'संदेह'],
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