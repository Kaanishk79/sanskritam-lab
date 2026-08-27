export interface DebatePoint {
  sa: string
  iast: string
  en: string
  hi?: string
}

export interface DebateStance {
  side: 'for' | 'against'
  label: string
  labelHi?: string
  points: DebatePoint[]
}

export interface DebateTopic {
  id: string
  title: string
  titleHi?: string
  emoji: string
  question: string
  questionHi?: string
  for: DebateStance
  against: DebateStance
}

export const DEBATE_TOPICS: DebateTopic[] = [
  {
    id: 'grammar',
    title: 'Grammar First',
    titleHi: 'पहले व्याकरण',
    emoji: '📖',
    question: 'Should beginners master grammar before reading texts?',
    questionHi: 'क्या शुरुआती लोगों को ग्रंथ पढ़ने से पहले व्याकरण सीखना चाहिए?',
    for: {
      side: 'for',
      label: 'Grammar first',
      labelHi: 'पहले व्याकरण',
      points: [
        { sa: 'व्याकरणं विना भाषा न शक्यते ज्ञातुम्।', iast: 'vyākaraṇaṃ vinā bhāṣā na śakyate jñātum।', en: 'Without grammar, language cannot be understood.', hi: 'व्याकरण के बिना भाषा को समझा नहीं जा सकता।' },
        { sa: 'पाणिनिः व्याकरणस्य मुखं अस्ति।', iast: 'pāṇiniḥ vyākaraṇasya mukhaṃ asti।', en: 'Pāṇini is the very mouth of grammar.', hi: 'पाणिनि व्याकरण का मुख है।' },
        { sa: 'नियमाः ज्ञात्वा वाक्यानि रचयितुं शक्नुमः।', iast: 'niyamāḥ jñātvā vākyāni racayituṃ śaknumaḥ।', en: 'Knowing the rules, we can compose sentences.', hi: 'नियम जानकर हम वाक्य बना सकते हैं।' },
      ],
    },
    against: {
      side: 'against',
      label: 'Read first',
      labelHi: 'पहले पढ़ें',
      points: [
        { sa: 'बालाः भाषां श्रवणेन एव शिक्षन्ते।', iast: 'bālāḥ bhāṣāṃ śravaṇena eva śikṣante।', en: 'Children learn language by listening alone.', hi: 'बच्चे केवल सुनकर भाषा सीखते हैं।' },
        { sa: 'ग्रन्थपठनेन आनन्दः भवति।', iast: 'granthapaṭhanena ānandaḥ bhavati।', en: 'Reading texts brings joy.', hi: 'ग्रंथ पढ़ने से आनंद मिलता है।' },
        { sa: 'स्वाभाविकी भाषा व्याकरणात् पूर्वम् आगच्छति।', iast: 'svābhāvikī bhāṣā vyākaraṇāt pūrvam āgacchati।', en: 'Natural language comes before grammar.', hi: 'स्वाभाविक भाषा व्याकरण से पहले आती है।' },
      ],
    },
  },
  {
    id: 'spoken',
    title: 'Speak Sanskrit?',
    titleHi: 'क्या संस्कृत बोलें?',
    emoji: '🗣️',
    question: 'Should Sanskrit be spoken daily at home?',
    questionHi: 'क्या घर में रोज़ संस्कृत बोलनी चाहिए?',
    for: {
      side: 'for',
      label: 'Speak daily',
      labelHi: 'रोज़ बोलें',
      points: [
        { sa: 'भाषा संवादेन एव जीवति।', iast: 'bhāṣā saṃvādena eva jīvati।', en: 'A language lives only through conversation.', hi: 'भाषा केवल संवाद से जीवित रहती है।' },
        { sa: 'मातृभाषायाः पोषणं कर्तव्यम्।', iast: 'mātṛbhāṣāyāḥ poṣaṇaṃ kartavyam।', en: 'The mother tongue must be nurtured.', hi: 'मातृभाषा का पालन-पोषण करना चाहिए।' },
        { sa: 'अल्पम् अपि प्रतिदिनं वदामः।', iast: 'alpam api pratidinaṃ vadāmaḥ।', en: 'Even a little, let us speak every day.', hi: 'थोड़ा भी हो, रोज़ बोलें।' },
      ],
    },
    against: {
      side: 'against',
      label: 'Study only',
      labelHi: 'केवल अध्ययन',
      points: [
        { sa: 'संस्कृतं अध्ययनार्थम् अस्ति, न व्यवहारार्थम्।', iast: 'saṃskṛtaṃ adhyayanārtham asti, na vyavahārārtham।', en: 'Sanskrit is for study, not for daily business.', hi: 'संस्कृत अध्ययन के लिए है, दैनिक व्यवहार के लिए नहीं।' },
        { sa: 'ग्रन्थाः एव संस्कृतस्य धनम्।', iast: 'granthāḥ eva saṃskṛtasya dhanam।', en: 'The texts are Sanskrit\u2019s treasure.', hi: 'ग्रंथ ही संस्कृत का धन हैं।' },
        { sa: 'समयः विद्यायै व्ययितव्यः।', iast: 'samayaḥ vidyāyai vyayitavyaḥ।', en: 'Time should be spent on learning.', hi: 'समय विद्या पर व्यय होना चाहिए।' },
      ],
    },
  },
  {
    id: 'devotion',
    title: 'Path to Truth',
    titleHi: 'सत्य का मार्ग',
    emoji: '🛤️',
    question: 'Is devotion (bhakti) or knowledge (jñāna) the better path?',
    questionHi: 'भक्ति या ज्ञान — कौन बेहतर मार्ग है?',
    for: {
      side: 'for',
      label: 'Knowledge (jñāna)',
      labelHi: 'ज्ञान',
      points: [
        { sa: 'ज्ञानात् मोक्षः लभ्यते।', iast: 'jñānāt mokṣaḥ labhyate।', en: 'Through knowledge liberation is gained.', hi: 'ज्ञान से मोक्ष प्राप्त होता है।' },
        { sa: 'अज्ञानम् एव दुःखस्य कारणम्।', iast: 'ajñānam eva duḥkhasya kāraṇam।', en: 'Ignorance itself is the cause of suffering.', hi: 'अज्ञान ही दुःख का कारण है।' },
        { sa: 'यथा दीपः अन्धकारं नाशयति।', iast: 'yathā dīpaḥ andhakāraṃ nāśayati।', en: 'As a lamp destroys darkness.', hi: 'जैसे दीपक अंधकार का नाश करता है।' },
      ],
    },
    against: {
      side: 'against',
      label: 'Devotion (bhakti)',
      labelHi: 'भक्ति',
      points: [
        { sa: 'भक्त्या एव भगवान् प्रसीदति।', iast: 'bhaktyā eva bhagavān prasīdati।', en: 'The Lord is pleased through devotion alone.', hi: 'केवल भक्ति से भगवान् प्रसन्न होते हैं।' },
        { sa: 'प्रेम सर्वेभ्यः सुलभम्।', iast: 'prema sarvebhyaḥ sulabham।', en: 'Love is easy for everyone.', hi: 'प्रेम सबके लिए सुलभ है।' },
        { sa: 'शरणागतिः मार्गः श्रेष्ठः।', iast: 'śaraṇāgatiḥ mārgaḥ śreṣṭhaḥ।', en: 'Surrender is the best path.', hi: 'शरणागति सर्वोत्तम मार्ग है।' },
      ],
    },
  },
  {
    id: 'digital',
    title: 'Digital Sanskrit',
    titleHi: 'डिजिटल संस्कृत',
    emoji: '💻',
    question: 'Does technology help or harm Sanskrit learning?',
    questionHi: 'क्या प्रौद्योगिकी संस्कृत सीखने में सहायक है या हानिकारक?',
    for: {
      side: 'for',
      label: 'Technology helps',
      labelHi: 'प्रौद्योगिकी सहायक',
      points: [
        { sa: 'अन्तर्जालेन विद्या सर्वत्र प्राप्ता।', iast: 'antarjālena vidyā sarvatra prāptā।', en: 'Through the internet, knowledge reaches everywhere.', hi: 'अंतर्जाल से ज्ञान सर्वत्र पहुँचता है।' },
        { sa: 'श्रवणदर्शनाभ्याम् अभ्यासः सुलभः।', iast: 'śravaṇadarśanābhyām abhyāsaḥ sulabhaḥ।', en: 'Practice through audio and video is easy.', hi: 'श्रवण-दर्शन से अभ्यास सरल होता है।' },
        { sa: 'यन्त्रम् अध्यापकस्य सहायकः।', iast: 'yantram adhyāpakasya sahāyakaḥ।', en: 'The machine is a teacher\u2019s helper.', hi: 'यंत्र शिक्षक का सहायक है।' },
      ],
    },
    against: {
      side: 'against',
      label: 'Technology harms',
      labelHi: 'प्रौद्योगिकी हानिकारक',
      points: [
        { sa: 'यन्त्रं मानवसम्पर्कं न्यूनीकरोति।', iast: 'yantraṃ mānavasamparkaṃ nyūnīkaroti।', en: 'Machines reduce human contact.', hi: 'यंत्र मानव संपर्क कम करते हैं।' },
        { sa: 'अत्यधिकं यन्त्रम् अस्वास्थ्यकरम्।', iast: 'atyadhikaṃ yantram asvāsthyakaram।', en: 'Too much screen time is unhealthy.', hi: 'अत्यधिक स्क्रीन समय अस्वास्थ्यकर है।' },
        { sa: 'गुरुवाक्यम् एव श्रेष्ठम्।', iast: 'guruvākyam eva śreṣṭham।', en: 'The teacher\u2019s word is best.', hi: 'गुरु का वचन ही श्रेष्ठ है।' },
      ],
    },
  },
  {
    id: 'verses',
    title: 'Memorize or Understand?',
    titleHi: 'रटें या समझें?',
    emoji: '🧠',
    question: 'Should students memorize verses without full understanding?',
    questionHi: 'क्या छात्रों को पूरी समझ के बिना श्लोक रटने चाहिए?',
    for: {
      side: 'for',
      label: 'Memorize',
      labelHi: 'रटें',
      points: [
        { sa: 'कण्ठस्था विद्या चिरस्थायिनी।', iast: 'kaṇṭhasthā vidyā cirasthāyinī।', en: 'Memorized knowledge lasts long.', hi: 'कंठस्थ ज्ञान दीर्घकाल तक रहता है।' },
        { sa: 'श्लोकाः उच्चारणेन शुद्धाः भवन्ति।', iast: 'ślokāḥ uccāraṇena śuddhāḥ bhavanti।', en: 'Verses become pure through recitation.', hi: 'उच्चारण से श्लोक शुद्ध होते हैं।' },
        { sa: 'स्मृतिः संस्कारान् वर्धयति।', iast: 'smṛtiḥ saṃskārān vardhayati।', en: 'Memory builds character.', hi: 'स्मरणशक्ति संस्कार बढ़ाती है।' },
      ],
    },
    against: {
      side: 'against',
      label: 'Understand',
      labelHi: 'समझें',
      points: [
        { sa: 'अर्थज्ञानं विना श्लोकः मृतशरीरम्।', iast: 'arthajñānaṃ vinā ślokaḥ mṛtaśarīram।', en: 'Without understanding, a verse is a dead body.', hi: 'समझ के बिना श्लोक मृत शरीर है।' },
        { sa: 'बोधः एव प्रयोजनम्।', iast: 'bodhaḥ eva prayojanam।', en: 'Comprehension is the real purpose.', hi: 'बोध ही वास्तविक उद्देश्य है।' },
        { sa: 'अर्थं ज्ञात्वा श्लोकः हृदि तिष्ठति।', iast: 'arthaṃ jñātvā ślokaḥ hṛdi tiṣṭhati।', en: 'Knowing the meaning, the verse stays in the heart.', hi: 'अर्थ जानकर श्लोक हृदय में स्थापित होता है।' },
      ],
    },
  },
]

export const DEBATE_WELCOME = 'नमस्ते! विषयं चिनुत।'
