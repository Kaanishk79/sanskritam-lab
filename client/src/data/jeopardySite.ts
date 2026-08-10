export interface PrepTopic {
  id: string
  title: string
  titleSanskrit: string
  icon: string
  summary: string
  points: string[]
}

export const prepTopics: PrepTopic[] = [
  {
    id: 'alphabet',
    title: 'Alphabet Mastery',
    titleSanskrit: 'वर्णमाला',
    icon: '🔤',
    summary: 'All 49 letters: 13 vowels, 33 consonants, plus anusvāra and visarga. Learn order, classes, and pronunciation.',
    points: [
      '13 vowels: अ आ इ ई उ ऊ ऋ ॠ ऌ ॡ ए ऐ ओ औ',
      '5 consonant classes: क-वर्ग, च-वर्ग, ट-वर्ग, त-वर्ग, प-वर्ग',
      'Retroflex ट थ ड ढ ण — tongue curled back to the roof',
      'Anusvāra (ं) nasalizes the vowel; Visarga (ः) is a soft breath',
      'Conjuncts: क्ष, त्र, ज्ञ, श्र — memorize their shapes',
    ],
  },
  {
    id: 'declensions',
    title: 'Declension Tables',
    titleSanskrit: 'शब्दरूपाणि',
    icon: '📐',
    summary: 'The 8 cases × 3 numbers of the noun system — the skeleton of every Sanskrit sentence.',
    points: [
      'राम (masculine अ-): रामः रामौ रामाः',
      'फल (neuter अ-): फलम् फले फलानि',
      'लता (feminine आ-): लता लते लताः',
      'Instrumental = "by/with"; Dative = "to/for"; Locative = "in/on"',
      'Vocative (सम्बोधन) = addressing: हे राम!',
    ],
  },
  {
    id: 'sandhi',
    title: 'Sandhi Rules',
    titleSanskrit: 'सन्धि',
    icon: '🧩',
    summary: 'The sound-merging laws that make Sanskrit fluid: vowel, consonant, and visarga sandhi.',
    points: [
      'Guṇa: अ + इ/ई = ए; अ + उ/ऊ = ओ',
      'Vṛddhi: अ + ए = ऐ; अ + ओ = औ',
      'Yaṇ: इ/ई + vowel → य्; उ/ऊ + vowel → व्',
      'Consonant sandhi: त् + च = च्च (पृथक् + च → पृथक्च)',
      'Visarga → ओ before voiced sounds: नरः + गच्छति = नरो गच्छति',
    ],
  },
  {
    id: 'compounds',
    title: 'Compound Splitting',
    titleSanskrit: 'समासः',
    icon: '📦',
    summary: 'The 5 compound types and how to split them — essential for reading classical prose.',
    points: [
      'तत्पुरुष: राजपुरुषः = राजन् + पुरुषः (king\'s man)',
      'कर्मधारय: महाराजः = महान् + राजा',
      'द्वन्द्व: रामकृष्णौ = Rāma and Kṛṣṇa (pair)',
      'बहुव्रीहि: चक्रपाणिः = one with a discus in hand',
      'अव्ययीभाव: यथाशक्ति = according to ability',
    ],
  },
  {
    id: 'verbs',
    title: 'Verb System',
    titleSanskrit: 'क्रियापदम्',
    icon: '🏃',
    summary: '10 conjugation classes, 4 voices, present/imperfect/optative/imperative moods.',
    points: [
      '1st class (भ्वादि): भवति, पठति — vowel stem + अ',
      '4th class (दिवादि): पश्यति, नृत्यति',
      '9th class (क्र्यादि): जानाति, क्रीणाति — ना before consonants',
      'Parasmaipada vs. Ātmanepada endings',
      'Optative (विधिलिङ्): भवेत् "may he be"',
    ],
  },
  {
    id: 'texts',
    title: 'Canonical Texts',
    titleSanskrit: 'शास्त्रग्रन्थाः',
    icon: '📜',
    summary: 'The 14 vidyās: the 4 Vedas, 6 Vedāṅgas, and 4 subsidiary sciences — plus epics and kāvya.',
    points: [
      '4 Vedas: ऋग्वेद, यजुर्वेद, सामवेद, अथर्ववेद',
      '6 Vedāṅgas: शिक्षा, कल्प, व्याकरण, निरुक्त, छन्द, ज्योतिष',
      'Two epics: Rāmāyaṇa (24,000 verses) and Mahābhārata (100,000)',
      'Kālidāsa: 3 plays, 2 mahākāvyas, 2 lyric poems',
      'Darśanas: Nyāya, Vaiśeṣika, Sāṅkhya, Yoga, Mīmāṃsā, Vedānta',
    ],
  },
  {
    id: 'philosophy',
    title: 'Philosophy Terms',
    titleSanskrit: 'दर्शनशब्दाः',
    icon: '🧠',
    summary: 'The key technical terms of the six orthodox schools — the vocabulary of the darsanas.',
    points: [
      'प्रमाण: means of valid knowledge (perception, inference, word)',
      'पदार्थ: categories of reality — 16 in Nyāya, 6 in Vaiśeṣika',
      'तत्त्व: 25 principles of Sāṅkhya — puruṣa + prakṛti + 23 evolutes',
      'अष्टाङ्ग: the 8 limbs of Patañjali\'s Yoga',
      'महावाक्य: the 4 great sayings of Advaita Vedānta',
    ],
  },
  {
    id: 'culture',
    title: 'Culture & Festivals',
    titleSanskrit: 'संस्कृतिः',
    icon: '🏛️',
    summary: 'The living tradition: festivals, greetings, and the institutions of Sanskrit culture.',
    points: [
      'नमस्ते = नमः + ते — "I bow to you"',
      'Dīpāvalī celebrates Rāma\'s return to Ayodhyā',
      'Vasantapañcamī honors Sarasvatī, goddess of learning',
      'Nālandā Mahāvihāra: 9-story library, 10,000 students',
      'Aśoka\'s edicts: first written inscriptions, 3rd century BCE',
    ],
  },
]

export interface NewsArticle {
  id: string
  tag: string
  title: string
  excerpt: string
  date: string
  icon: string
}

export const newsArticles: NewsArticle[] = [
  {
    id: 'n1',
    tag: 'News & Events',
    title: 'University adopts SanskritLab for first-year BA Sanskrit',
    excerpt: 'A new pilot program will use the platform\'s bookshelf and assessment tools across three colleges this semester.',
    date: 'Aug 2026',
    icon: '🏛️',
  },
  {
    id: 'n2',
    tag: 'News & Events',
    title: 'New NCERT Class 12 shashwati grammar chapters added',
    excerpt: 'The full सश्वती grammar textbook is now browsable, searchable, and verse-linked in the library.',
    date: 'Jul 2026',
    icon: '📖',
  },
  {
    id: 'n3',
    tag: 'News & Events',
    title: 'OCR engine now handles clear Grantha scans',
    excerpt: 'Manuscript transcription receives preprocessing upgrades for palm-leaf and Grantha-adjacent scripts.',
    date: 'Jun 2026',
    icon: '📜',
  },
  {
    id: 'n4',
    tag: 'Behind the Scenes',
    title: 'How the Sanskrit Jeopardy clue board was built',
    excerpt: 'A tour of the data pipeline: six categories, thirty clues, two rounds, and one final wager — all open source.',
    date: 'Aug 2026',
    icon: '🎬',
  },
  {
    id: 'n5',
    tag: 'Behind the Scenes',
    title: 'From OCR to edition: the corpus pipeline',
    excerpt: 'Scanned manuscripts become searchable text through preprocessing, recognition, and collation steps.',
    date: 'May 2026',
    icon: '🔍',
  },
  {
    id: 'n6',
    tag: 'Contestants',
    title: 'Meet Riya: from Class 6 NCERT to śloka champion',
    excerpt: 'A student\'s journey through the learning tracks — her streak, her viva scores, and her favorite verses.',
    date: 'Jul 2026',
    icon: '🌟',
  },
  {
    id: 'n7',
    tag: 'Contestants',
    title: 'Five-time winner Ananya on daily drill habits',
    excerpt: 'The key to her 92% accuracy: sandhi practice, spaced-repetition flashcards, and the Anytime Test.',
    date: 'Jun 2026',
    icon: '🏆',
  },
  {
    id: 'n8',
    tag: 'Contestants',
    title: 'Teacher spotlight: Mr. Joshi\'s classroom league',
    excerpt: 'How one teacher runs a weekly Jeopardy-style tournament between his Class 8 sections.',
    date: 'May 2026',
    icon: '👨‍🏫',
  },
]
