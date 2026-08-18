export interface DebatePoint {
  sa: string
  iast: string
  en: string
}

export interface DebateStance {
  side: 'for' | 'against'
  label: string
  points: DebatePoint[]
}

export interface DebateTopic {
  id: string
  title: string
  emoji: string
  question: string
  for: DebateStance
  against: DebateStance
}

export const DEBATE_TOPICS: DebateTopic[] = [
  {
    id: 'grammar',
    title: 'Grammar First',
    emoji: '📖',
    question: 'Should beginners master grammar before reading texts?',
    for: {
      side: 'for',
      label: 'Grammar first',
      points: [
        { sa: 'व्याकरणं विना भाषा न शक्यते ज्ञातुम्।', iast: 'vyākaraṇaṃ vinā bhāṣā na śakyate jñātum।', en: 'Without grammar, language cannot be understood.' },
        { sa: 'पाणिनिः व्याकरणस्य मुखं अस्ति।', iast: 'pāṇiniḥ vyākaraṇasya mukhaṃ asti।', en: 'Pāṇini is the very mouth of grammar.' },
        { sa: 'नियमाः ज्ञात्वा वाक्यानि रचयितुं शक्नुमः।', iast: 'niyamāḥ jñātvā vākyāni racayituṃ śaknumaḥ।', en: 'Knowing the rules, we can compose sentences.' },
      ],
    },
    against: {
      side: 'against',
      label: 'Read first',
      points: [
        { sa: 'बालाः भाषां श्रवणेन एव शिक्षन्ते।', iast: 'bālāḥ bhāṣāṃ śravaṇena eva śikṣante।', en: 'Children learn language by listening alone.' },
        { sa: 'ग्रन्थपठनेन आनन्दः भवति।', iast: 'granthapaṭhanena ānandaḥ bhavati।', en: 'Reading texts brings joy.' },
        { sa: 'स्वाभाविकी भाषा व्याकरणात् पूर्वम् आगच्छति।', iast: 'svābhāvikī bhāṣā vyākaraṇāt pūrvam āgacchati।', en: 'Natural language comes before grammar.' },
      ],
    },
  },
  {
    id: 'spoken',
    title: 'Speak Sanskrit?',
    emoji: '🗣️',
    question: 'Should Sanskrit be spoken daily at home?',
    for: {
      side: 'for',
      label: 'Speak daily',
      points: [
        { sa: 'भाषा संवादेन एव जीवति।', iast: 'bhāṣā saṃvādena eva jīvati।', en: 'A language lives only through conversation.' },
        { sa: 'मातृभाषायाः पोषणं कर्तव्यम्।', iast: 'mātṛbhāṣāyāḥ poṣaṇaṃ kartavyam।', en: 'The mother tongue must be nurtured.' },
        { sa: 'अल्पम् अपि प्रतिदिनं वदामः।', iast: 'alpam api pratidinaṃ vadāmaḥ।', en: 'Even a little, let us speak every day.' },
      ],
    },
    against: {
      side: 'against',
      label: 'Study only',
      points: [
        { sa: 'संस्कृतं अध्ययनार्थम् अस्ति, न व्यवहारार्थम्।', iast: 'saṃskṛtaṃ adhyayanārtham asti, na vyavahārārtham।', en: 'Sanskrit is for study, not for daily business.' },
        { sa: 'ग्रन्थाः एव संस्कृतस्य धनम्।', iast: 'granthāḥ eva saṃskṛtasya dhanam।', en: 'The texts are Sanskrit\u2019s treasure.' },
        { sa: 'समयः विद्यायै व्ययितव्यः।', iast: 'samayaḥ vidyāyai vyayitavyaḥ।', en: 'Time should be spent on learning.' },
      ],
    },
  },
  {
    id: 'devotion',
    title: 'Path to Truth',
    emoji: '🛤️',
    question: 'Is devotion (bhakti) or knowledge (jñāna) the better path?',
    for: {
      side: 'for',
      label: 'Knowledge (jñāna)',
      points: [
        { sa: 'ज्ञानात् मोक्षः लभ्यते।', iast: 'jñānāt mokṣaḥ labhyate।', en: 'Through knowledge liberation is gained.' },
        { sa: 'अज्ञानम् एव दुःखस्य कारणम्।', iast: 'ajñānam eva duḥkhasya kāraṇam।', en: 'Ignorance itself is the cause of suffering.' },
        { sa: 'यथा दीपः अन्धकारं नाशयति।', iast: 'yathā dīpaḥ andhakāraṃ nāśayati।', en: 'As a lamp destroys darkness.' },
      ],
    },
    against: {
      side: 'against',
      label: 'Devotion (bhakti)',
      points: [
        { sa: 'भक्त्या एव भगवान् प्रसीदति।', iast: 'bhaktyā eva bhagavān prasīdati।', en: 'The Lord is pleased through devotion alone.' },
        { sa: 'प्रेम सर्वेभ्यः सुलभम्।', iast: 'prema sarvebhyaḥ sulabham।', en: 'Love is easy for everyone.' },
        { sa: 'शरणागतिः मार्गः श्रेष्ठः।', iast: 'śaraṇāgatiḥ mārgaḥ śreṣṭhaḥ।', en: 'Surrender is the best path.' },
      ],
    },
  },
  {
    id: 'digital',
    title: 'Digital Sanskrit',
    emoji: '💻',
    question: 'Does technology help or harm Sanskrit learning?',
    for: {
      side: 'for',
      label: 'Technology helps',
      points: [
        { sa: 'अन्तर्जालेन विद्या सर्वत्र प्राप्ता।', iast: 'antarjālena vidyā sarvatra prāptā।', en: 'Through the internet, knowledge reaches everywhere.' },
        { sa: 'श्रवणदर्शनाभ्याम् अभ्यासः सुलभः।', iast: 'śravaṇadarśanābhyām abhyāsaḥ sulabhaḥ।', en: 'Practice through audio and video is easy.' },
        { sa: 'यन्त्रम् अध्यापकस्य सहायकः।', iast: 'yantram adhyāpakasya sahāyakaḥ।', en: 'The machine is a teacher\u2019s helper.' },
      ],
    },
    against: {
      side: 'against',
      label: 'Technology harms',
      points: [
        { sa: 'यन्त्रं मानवसम्पर्कं न्यूनीकरोति।', iast: 'yantraṃ mānavasamparkaṃ nyūnīkaroti।', en: 'Machines reduce human contact.' },
        { sa: 'अत्यधिकं यन्त्रम् अस्वास्थ्यकरम्।', iast: 'atyadhikaṃ yantram asvāsthyakaram।', en: 'Too much screen time is unhealthy.' },
        { sa: 'गुरुवाक्यम् एव श्रेष्ठम्।', iast: 'guruvākyam eva śreṣṭham।', en: 'The teacher\u2019s word is best.' },
      ],
    },
  },
  {
    id: 'verses',
    title: 'Memorize or Understand?',
    emoji: '🧠',
    question: 'Should students memorize verses without full understanding?',
    for: {
      side: 'for',
      label: 'Memorize',
      points: [
        { sa: 'कण्ठस्था विद्या चिरस्थायिनी।', iast: 'kaṇṭhasthā vidyā cirasthāyinī।', en: 'Memorized knowledge lasts long.' },
        { sa: 'श्लोकाः उच्चारणेन शुद्धाः भवन्ति।', iast: 'ślokāḥ uccāraṇena śuddhāḥ bhavanti।', en: 'Verses become pure through recitation.' },
        { sa: 'स्मृतिः संस्कारान् वर्धयति।', iast: 'smṛtiḥ saṃskārān vardhayati।', en: 'Memory builds character.' },
      ],
    },
    against: {
      side: 'against',
      label: 'Understand',
      points: [
        { sa: 'अर्थज्ञानं विना श्लोकः मृतशरीरम्।', iast: 'arthajñānaṃ vinā ślokaḥ mṛtaśarīram।', en: 'Without understanding, a verse is a dead body.' },
        { sa: 'बोधः एव प्रयोजनम्।', iast: 'bodhaḥ eva prayojanam।', en: 'Comprehension is the real purpose.' },
        { sa: 'अर्थं ज्ञात्वा श्लोकः हृदि तिष्ठति।', iast: 'arthaṃ jñātvā ślokaḥ hṛdi tiṣṭhati।', en: 'Knowing the meaning, the verse stays in the heart.' },
      ],
    },
  },
]

export const DEBATE_WELCOME = 'नमस्ते! विषयं चिनुत।'