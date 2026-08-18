export interface StoryTheme {
  id: string
  emoji: string
  title: string
  words: { sa: string; en: string }[]
  intro: string[]
  patterns: { sa: string; en: string }[]
  outro: string[]
}

export const STORY_THEMES: StoryTheme[] = [
  {
    id: 'forest', emoji: '🌲', title: 'Forest Adventure',
    words: [
      { sa: 'वनम्', en: 'forest' }, { sa: 'व्याघ्रः', en: 'tiger' }, { sa: 'गजः', en: 'elephant' },
      { sa: 'नदी', en: 'river' }, { sa: 'वृक्षः', en: 'tree' }, { sa: 'पक्षिणः', en: 'birds' },
      { sa: 'पुष्पम्', en: 'flower' }, { sa: 'सिंहः', en: 'lion' },
    ],
    intro: ['एकस्मिन् {w1} सुन्दरम् आसीत्।', 'तत्र {w2} अवसत्।'],
    patterns: [
      { sa: '{w2} प्रतिदिनं {w1} पर्यटति स्म।', en: 'The {w2} used to roam the {w1} every day.' },
      { sa: 'एकदा {w2} नदीतीरे जलम् अपिबत्।', en: 'One day the {w2} drank water at the riverbank.' },
      { sa: 'वृक्षे पक्षिणः मधुरं गायन्ति स्म।', en: 'The birds sang sweetly on the tree.' },
      { sa: '{w1} रमणीयम् आसीत्, पुष्पैः सुगन्धितम्।', en: 'The {w1} was beautiful, fragrant with flowers.' },
      { sa: 'सर्वे प्राणिनः शान्त्या न्यवसन्।', en: 'All the creatures lived in peace.' },
    ],
    outro: ['एवम् ते सुखेन समम् अवसन्।', 'इति कथा समाप्ता।'],
  },
  {
    id: 'village', emoji: '🏡', title: 'Village Life',
    words: [
      { sa: 'ग्रामः', en: 'village' }, { sa: 'कृषकः', en: 'farmer' }, { sa: 'धेनुः', en: 'cow' },
      { sa: 'क्षेत्रम्', en: 'field' }, { sa: 'बालकः', en: 'boy' }, { sa: 'गृहम्', en: 'house' },
      { sa: 'जलम्', en: 'water' }, { sa: 'विद्यालयः', en: 'school' },
    ],
    intro: ['अस्माकं {w1} रमणीयः अस्ति।', 'तत्र {w2} वसति।'],
    patterns: [
      { sa: '{w2} प्रतिदिनं प्रातः क्षेत्रम् गच्छति।', en: 'Every morning the {w2} goes to the field.' },
      { sa: 'धेनुः गृहे दुग्धम् यच्छति।', en: 'The cow gives milk at home.' },
      { sa: 'बालकाः {w1} विद्यालयम् पठितुम् गच्छन्ति।', en: 'The children go to the village school to study.' },
      { sa: '{w1} जलम् शुद्धम् अस्ति।', en: 'The village water is pure.' },
      { sa: 'सायंकाले सर्वे गृहे मिलन्ति।', en: 'In the evening everyone gathers at home.' },
    ],
    outro: ['इति अस्माकं {w1} जीवनम्।', 'सुखम् एव सर्वत्र।'],
  },
  {
    id: 'sky', emoji: '☁️', title: 'Sky & Nature',
    words: [
      { sa: 'सूर्यः', en: 'sun' }, { sa: 'चन्द्रः', en: 'moon' }, { sa: 'नक्षत्रम्', en: 'star' },
      { sa: 'मेघः', en: 'cloud' }, { sa: 'वायुः', en: 'wind' }, { sa: 'वर्षा', en: 'rain' },
      { sa: 'इन्द्रधनुः', en: 'rainbow' }, { sa: 'आकाशम्', en: 'sky' },
    ],
    intro: ['आकाशे {w1} उदेति।', '{w2} सदा प्रकाशते।'],
    patterns: [
      { sa: '{w1} प्रातःकाले रक्तवर्णः भवति।', en: 'The {w1} turns red in the morning.' },
      { sa: 'मेघाः आगच्छन्ति, {w2} प्रच्छादयन्ति।', en: 'The clouds come and hide the {w2}.' },
      { sa: 'वर्षा भवति चेत् इन्द्रधनुः दृश्यते।', en: 'When it rains, a rainbow appears.' },
      { sa: 'वायुः शीतलः वहति।', en: 'The wind blows cool.' },
      { sa: 'रात्रौ {w2} आकाशे शोभते।', en: 'At night the {w2} shines in the sky.' },
    ],
    outro: ['एवं प्रकृतिः सुन्दरी।', 'सर्वम् चक्रवत् भ्रमति।'],
  },
  {
    id: 'temple', emoji: '🛕', title: 'Temple & Devotion',
    words: [
      { sa: 'देवालयः', en: 'temple' }, { sa: 'पुजारी', en: 'priest' }, { sa: 'घण्टा', en: 'bell' },
      { sa: 'दीपः', en: 'lamp' }, { sa: 'भक्तः', en: 'devotee' }, { sa: 'पूजा', en: 'worship' },
      { sa: 'प्रसादः', en: 'offering' }, { sa: 'स्तोत्रम्', en: 'hymn' },
    ],
    intro: ['ग्रामे महान् {w1} अस्ति।', 'तत्र {w2} नित्यम् भवति।'],
    patterns: [
      { sa: 'प्रातःकाले घण्टानादः श्रूयते।', en: 'The ringing of bells is heard in the morning.' },
      { sa: 'भक्ताः {w1} आगत्य दीपम् प्रज्वालयन्ति।', en: 'Devotees come to the temple and light the lamp.' },
      { sa: '{w2} श्रद्धया स्तोत्रम् गायन्ति।', en: 'They sing hymns with devotion.' },
      { sa: 'पुजारी सर्वेभ्यः प्रसादम् यच्छति।', en: 'The priest gives prasad to everyone.' },
      { sa: 'सर्वे शान्तिम् अनुभवन्ति।', en: 'Everyone feels peace.' },
    ],
    outro: ['इति भक्तानां दिनचर्या।', 'श्रद्धा एव बलम्।'],
  },
  {
    id: 'ocean', emoji: '🌊', title: 'Ocean Voyage',
    words: [
      { sa: 'समुद्रः', en: 'ocean' }, { sa: 'नाविकः', en: 'sailor' }, { sa: 'नौका', en: 'boat' },
      { sa: 'मीनः', en: 'fish' }, { sa: 'तरङ्गः', en: 'wave' }, { sa: 'द्वीपः', en: 'island' },
      { sa: 'मुक्ता', en: 'pearl' }, { sa: 'वायुः', en: 'wind' },
    ],
    intro: ['विशालः {w1} तरङ्गैः गर्जति।', '{w2} नौकया यात्राम् करोति।'],
    patterns: [
      { sa: 'नौका तरङ्गेषु नृत्यति स्म।', en: 'The boat danced on the waves.' },
      { sa: '{w1} जले मीनाः क्रीडन्ति।', en: 'In the ocean water the fish play.' },
      { sa: 'दूरे {w2} द्वीपम् दृश्यते।', en: 'In the distance an island is seen.' },
      { sa: 'तत्र {w1} तटे मुक्ताः सन्ति।', en: 'There on the ocean shore there are pearls.' },
      { sa: 'वायुः नौकायै सहाय्यम् करोति।', en: 'The wind helps the boat.' },
    ],
    outro: ['नाविकः सफलः अभवत्।', 'इति समुद्रयात्रा समाप्ता।'],
  },
]

export function buildStory(
  theme: StoryTheme,
  word1: string,
  word2: string,
): { sa: string; en: string }[] {
  const fill = (t: string) => t.replaceAll('{w1}', word1).replaceAll('{w2}', word2)
  return [
    ...theme.intro.map((s) => ({ sa: fill(s), en: '' })),
    ...theme.patterns.map((s) => ({ sa: fill(s.sa), en: fill(s.en) })),
    ...theme.outro.map((s) => ({ sa: fill(s), en: '' })),
  ]
}