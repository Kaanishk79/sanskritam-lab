export interface StoryTheme {
  id: string
  emoji: string
  title: string
  titleHi?: string
  words: { sa: string; en: string; hi?: string }[]
  intro: string[]
  patterns: { sa: string; en: string; hi?: string }[]
  outro: string[]
}

export const STORY_THEMES: StoryTheme[] = [
  {
    id: 'forest', emoji: '🌲', title: 'Forest Adventure', titleHi: 'वन की यात्रा',
    words: [
      { sa: 'वनम्', en: 'forest', hi: 'जंगल' }, { sa: 'व्याघ्रः', en: 'tiger', hi: 'बाघ' },
      { sa: 'गजः', en: 'elephant', hi: 'हाथी' }, { sa: 'नदी', en: 'river', hi: 'नदी' },
      { sa: 'वृक्षः', en: 'tree', hi: 'पेड़' }, { sa: 'पक्षिणः', en: 'birds', hi: 'पक्षी' },
      { sa: 'पुष्पम्', en: 'flower', hi: 'फूल' }, { sa: 'सिंहः', en: 'lion', hi: 'शेर' },
    ],
    intro: ['एकस्मिन् {w1} सुन्दरम् आसीत्।', 'तत्र {w2} अवसत्।'],
    patterns: [
      { sa: '{w2} प्रतिदिनं {w1} पर्यटति स्म।', en: 'The {w2} used to roam the {w1} every day.', hi: '{w2} हर दिन {w1} में घूमता था।' },
      { sa: 'एकदा {w2} नदीतीरे जलम् अपिबत्।', en: 'One day the {w2} drank water at the riverbank.', hi: 'एक दिन {w2} ने नदी तट पर पानी पिया।' },
      { sa: 'वृक्षे पक्षिणः मधुरं गायन्ति स्म।', en: 'The birds sang sweetly on the tree.', hi: 'पक्षियों ने पेड़ पर मधुर गान किया।' },
      { sa: '{w1} रमणीयम् आसीत्, पुष्पैः सुगन्धितम्।', en: 'The {w1} was beautiful, fragrant with flowers.', hi: '{w1} फूलों की सुगंध से सुंदर था।' },
      { sa: 'सर्वे प्राणिनः शान्त्या न्यवसन्।', en: 'All the creatures lived in peace.', hi: 'सभी प्राणी शांति से रहते थे।' },
    ],
    outro: ['एवम् ते सुखेन समम् अवसन्।', 'इति कथा समाप्ता।'],
  },
  {
    id: 'village', emoji: '🏡', title: 'Village Life', titleHi: 'ग्रामीण जीवन',
    words: [
      { sa: 'ग्रामः', en: 'village', hi: 'गाँव' }, { sa: 'कृषकः', en: 'farmer', hi: 'किसान' },
      { sa: 'धेनुः', en: 'cow', hi: 'गाय' }, { sa: 'क्षेत्रम्', en: 'field', hi: 'खेत' },
      { sa: 'बालकः', en: 'boy', hi: 'लड़का' }, { sa: 'गृहम्', en: 'house', hi: 'घर' },
      { sa: 'जलम्', en: 'water', hi: 'पानी' }, { sa: 'विद्यालयः', en: 'school', hi: 'विद्यालय' },
    ],
    intro: ['अस्माकं {w1} रमणीयः अस्ति।', 'तत्र {w2} वसति।'],
    patterns: [
      { sa: '{w2} प्रतिदिनं प्रातः क्षेत्रम् गच्छति।', en: 'Every morning the {w2} goes to the field.', hi: 'हर सुबह {w2} खेत जाता है।' },
      { sa: 'धेनुः गृहे दुग्धम् यच्छति।', en: 'The cow gives milk at home.', hi: 'गाय घर पर दूध देती है।' },
      { sa: 'बालकाः {w1} विद्यालयम् पठितुम् गच्छन्ति।', en: 'The children go to the village school to study.', hi: 'बच्चे पढ़ने के लिए गाँव के विद्यालय जाते हैं।' },
      { sa: '{w1} जलम् शुद्धम् अस्ति।', en: 'The village water is pure.', hi: 'गाँव का पानी शुद्ध है।' },
      { sa: 'सायंकाले सर्वे गृहे मिलन्ति।', en: 'In the evening everyone gathers at home.', hi: 'शाम को सभी घर पर इकट्ठा होते हैं।' },
    ],
    outro: ['इति अस्माकं {w1} जीवनम्।', 'सुखम् एव सर्वत्र।'],
  },
  {
    id: 'sky', emoji: '☁️', title: 'Sky & Nature', titleHi: 'आकाश और प्रकृति',
    words: [
      { sa: 'सूर्यः', en: 'sun', hi: 'सूर्य' }, { sa: 'चन्द्रः', en: 'moon', hi: 'चाँद' },
      { sa: 'नक्षत्रम्', en: 'star', hi: 'तारा' }, { sa: 'मेघः', en: 'cloud', hi: 'बादल' },
      { sa: 'वायुः', en: 'wind', hi: 'हवा' }, { sa: 'वर्षा', en: 'rain', hi: 'वर्षा' },
      { sa: 'इन्द्रधनुः', en: 'rainbow', hi: 'इंद्रधनुष' }, { sa: 'आकाशम्', en: 'sky', hi: 'आकाश' },
    ],
    intro: ['आकाशे {w1} उदेति।', '{w2} सदा प्रकाशते।'],
    patterns: [
      { sa: '{w1} प्रातःकाले रक्तवर्णः भवति।', en: 'The {w1} turns red in the morning.', hi: 'सुबह {w1} लाल हो जाता है।' },
      { sa: 'मेघाः आगच्छन्ति, {w2} प्रच्छादयन्ति।', en: 'The clouds come and hide the {w2}.', hi: 'बादल आते हैं और {w2} को छिपा लेते हैं।' },
      { sa: 'वर्षा भवति चेत् इन्द्रधनुः दृश्यते।', en: 'When it rains, a rainbow appears.', hi: 'जब वर्षा होती है, इंद्रधनुष दिखता है।' },
      { sa: 'वायुः शीतलः वहति।', en: 'The wind blows cool.', hi: 'ठंडी हवा चलती है।' },
      { sa: 'रात्रौ {w2} आकाशे शोभते।', en: 'At night the {w2} shines in the sky.', hi: 'रात में {w2} आकाश में चमकता है।' },
    ],
    outro: ['एवं प्रकृतिः सुन्दरी।', 'सर्वम् चक्रवत् भ्रमति।'],
  },
  {
    id: 'temple', emoji: '🛕', title: 'Temple & Devotion', titleHi: 'मंदिर और भक्ति',
    words: [
      { sa: 'देवालयः', en: 'temple', hi: 'मंदिर' }, { sa: 'पुजारी', en: 'priest', hi: 'पुजारी' },
      { sa: 'घण्टा', en: 'bell', hi: 'घंटी' }, { sa: 'दीपः', en: 'lamp', hi: 'दीपक' },
      { sa: 'भक्तः', en: 'devotee', hi: 'भक्त' }, { sa: 'पूजा', en: 'worship', hi: 'पूजा' },
      { sa: 'प्रसादः', en: 'offering', hi: 'प्रसाद' }, { sa: 'स्तोत्रम्', en: 'hymn', hi: 'स्तोत्र' },
    ],
    intro: ['ग्रामे महान् {w1} अस्ति।', 'तत्र {w2} नित्यम् भवति।'],
    patterns: [
      { sa: 'प्रातःकाले घण्टानादः श्रूयते।', en: 'The ringing of bells is heard in the morning.', hi: 'सुबह घंटियों की आवाज़ सुनाई देती है।' },
      { sa: 'भक्ताः {w1} आगत्य दीपम् प्रज्वालयन्ति।', en: 'Devotees come to the temple and light the lamp.', hi: 'भक्त मंदिर आकर दीप जलाते हैं।' },
      { sa: '{w2} श्रद्धया स्तोत्रम् गायन्ति।', en: 'They sing hymns with devotion.', hi: 'वे श्रद्धा से स्तोत्र गाते हैं।' },
      { sa: 'पुजारी सर्वेभ्यः प्रसादम् यच्छति।', en: 'The priest gives prasad to everyone.', hi: 'पुजारी सभी को प्रसाद देते हैं।' },
      { sa: 'सर्वे शान्तिम् अनुभवन्ति।', en: 'Everyone feels peace.', hi: 'सभी शांति का अनुभव करते हैं।' },
    ],
    outro: ['इति भक्तानां दिनचर्या।', 'श्रद्धा एव बलम्।'],
  },
  {
    id: 'ocean', emoji: '🌊', title: 'Ocean Voyage', titleHi: 'समुद्र यात्रा',
    words: [
      { sa: 'समुद्रः', en: 'ocean', hi: 'समुद्र' }, { sa: 'नाविकः', en: 'sailor', hi: 'नाविक' },
      { sa: 'नौका', en: 'boat', hi: 'नाव' }, { sa: 'मीनः', en: 'fish', hi: 'मछली' },
      { sa: 'तरङ्गः', en: 'wave', hi: 'लहर' }, { sa: 'द्वीपः', en: 'island', hi: 'द्वीप' },
      { sa: 'मुक्ता', en: 'pearl', hi: 'मोती' }, { sa: 'वायुः', en: 'wind', hi: 'हवा' },
    ],
    intro: ['विशालः {w1} तरङ्गैः गर्जति।', '{w2} नौकया यात्राम् करोति।'],
    patterns: [
      { sa: 'नौका तरङ्गेषु नृत्यति स्म।', en: 'The boat danced on the waves.', hi: 'नाव लहरों पर नाचती थी।' },
      { sa: '{w1} जले मीनाः क्रीडन्ति।', en: 'In the ocean water the fish play.', hi: 'समुद्र के जल में मछलियाँ खेलती हैं।' },
      { sa: 'दूरे {w2} द्वीपम् दृश्यते।', en: 'In the distance an island is seen.', hi: 'दूर एक द्वीप दिखता है।' },
      { sa: 'तत्र {w1} तटे मुक्ताः सन्ति।', en: 'There on the ocean shore there are pearls.', hi: 'समुद्र के तट पर मोती हैं।' },
      { sa: 'वायुः नौकायै सहाय्यम् करोति।', en: 'The wind helps the boat.', hi: 'हवा नाव की सहायता करती है।' },
    ],
    outro: ['नाविकः सफलः अभवत्।', 'इति समुद्रयात्रा समाप्ता।'],
  },
]

export function buildStory(
  theme: StoryTheme,
  word1: string,
  word2: string,
): { sa: string; en: string; hi: string }[] {
  const fill = (t: string) => t.replaceAll('{w1}', word1).replaceAll('{w2}', word2)
  return [
    ...theme.intro.map((s) => ({ sa: fill(s), en: '', hi: '' })),
    ...theme.patterns.map((s) => ({ sa: fill(s.sa), en: fill(s.en), hi: fill(s.hi ?? '') })),
    ...theme.outro.map((s) => ({ sa: fill(s), en: '', hi: '' })),
  ]
}