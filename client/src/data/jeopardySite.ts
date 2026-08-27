export interface PrepTopic {
  id: string
  title: string
  titleHi?: string
  titleSanskrit: string
  icon: string
  summary: string
  summaryHi?: string
  points: string[]
  pointsHi?: string[]
}

export const prepTopics: PrepTopic[] = [
  {
    id: 'alphabet',
    title: 'Alphabet Mastery',
    titleHi: 'वर्णमाला में दक्षता',
    titleSanskrit: 'वर्णमाला',
    icon: '🔤',
    summary: 'All 49 letters: 13 vowels, 33 consonants, plus anusvāra and visarga. Learn order, classes, and pronunciation.',
    summaryHi: 'सभी 49 अक्षर: 13 स्वर, 33 व्यंजन, अनुस्वार और विसर्ग सहित। क्रम, वर्ग और उच्चारण सीखें।',
    points: [
      '13 vowels: अ आ इ ई उ ऊ ऋ ॠ ऌ ॡ ए ऐ ओ औ',
      '5 consonant classes: क-वर्ग, च-वर्ग, ट-वर्ग, त-वर्ग, प-वर्ग',
      'Retroflex ट थ ड ढ ण — tongue curled back to the roof',
      'Anusvāra (ं) nasalizes the vowel; Visarga (ः) is a soft breath',
      'Conjuncts: क्ष, त्र, ज्ञ, श्र — memorize their shapes',
    ],
    pointsHi: [
      '13 स्वर: अ आ इ ई उ ऊ ऋ ॠ ऌ ॡ ए ऐ ओ औ',
      '5 व्यंजन वर्ग: क-वर्ग, च-वर्ग, ट-वर्ग, त-वर्ग, प-वर्ग',
      'मूर्धन्य ट थ ड ढ ण — जीभ पीछे मुड़ी हुई',
      'अनुस्वार (ं) स्वर को नासिक बनाता है; विसर्ग (ः) कोमल श्वास है',
      'संयुक्ताक्षर: क्ष, त्र, ज्ञ, श्र — इनके आकार याद रखें',
    ],
  },
  {
    id: 'declensions',
    title: 'Declension Tables',
    titleHi: 'शब्दरूप सारणी',
    titleSanskrit: 'शब्दरूपाणि',
    icon: '📐',
    summary: 'The 8 cases × 3 numbers of the noun system — the skeleton of every Sanskrit sentence.',
    summaryHi: 'नाम प्रणाली की 8 विभक्तियाँ × 3 वचन — हर संस्कृत वाक्य की रीढ़।',
    points: [
      'राम (masculine अ-): रामः रामौ रामाः',
      'फल (neuter अ-): फलम् फले फलानि',
      'लता (feminine आ-): लता लते लताः',
      'Instrumental = "by/with"; Dative = "to/for"; Locative = "in/on"',
      'Vocative (सम्बोधन) = addressing: हे राम!',
    ],
    pointsHi: [
      'राम (पुल्लिङ्ग अ-): रामः रामौ रामाः',
      'फल (नपुंसकलिङ्ग अ-): फलम् फले फलानि',
      'लता (स्त्रीलिङ्ग आ-): लता लते लताः',
      'तृतीया = "द्वारा/सहित"; चतुर्थी = "को/के लिए"; सप्तमी = "में/पर"',
      'सम्बोधन = संबोधन: हे राम!',
    ],
  },
  {
    id: 'sandhi',
    title: 'Sandhi Rules',
    titleHi: 'सन्धि नियम',
    titleSanskrit: 'सन्धि',
    icon: '🧩',
    summary: 'The sound-merging laws that make Sanskrit fluid: vowel, consonant, and visarga sandhi.',
    summaryHi: 'ध्वनि विलय नियम जो संस्कृत को प्रवाहमय बनाते हैं: स्वर, व्यंजन और विसर्ग सन्धि।',
    points: [
      'Guṇa: अ + इ/ई = ए; अ + उ/ऊ = ओ',
      'Vṛddhi: अ + ए = ऐ; अ + ओ = औ',
      'Yaṇ: इ/ई + vowel → य्; उ/ऊ + vowel → व्',
      'Consonant sandhi: त् + च = च्च (पृथक् + च → पृथक्च)',
      'Visarga → ओ before voiced sounds: नरः + गच्छति = नरो गच्छति',
    ],
    pointsHi: [
      'गुण: अ + इ/ई = ए; अ + उ/ऊ = ओ',
      'वृद्धि: अ + ए = ऐ; अ + ओ = औ',
      'यण: इ/ई + स्वर → य्; उ/ऊ + स्वर → व्',
      'व्यंजन सन्धि: त् + च = च्च (पृथक् + च → पृथक्च)',
      'विसर्ग → ओ घन्ध्व ध्वनि से पहले: नरः + गच्छति = नरो गच्छति',
    ],
  },
  {
    id: 'compounds',
    title: 'Compound Splitting',
    titleHi: 'समास विभाजन',
    titleSanskrit: 'समासः',
    icon: '📦',
    summary: 'The 5 compound types and how to split them — essential for reading classical prose.',
    summaryHi: '5 प्रकार के समास और उन्हें कैसे विभाजित करें — शास्त्रीय गद्य पढ़ने के लिए आवश्यक।',
    points: [
      'तत्पुरुष: राजपुरुषः = राजन् + पुरुषः (king\'s man)',
      'कर्मधारय: महाराजः = महान् + राजा',
      'द्वन्द्व: रामकृष्णौ = Rāma and Kṛṣṇa (pair)',
      'बहुव्रीहि: चक्रपाणिः = one with a discus in hand',
      'अव्ययीभाव: यथाशक्ति = according to ability',
    ],
    pointsHi: [
      'तत्पुरुष: राजपुरुषः = राजन् + पुरुषः (राजा का पुरुष)',
      'कर्मधारय: महाराजः = महान् + राजा',
      'द्वन्द्व: रामकृष्णौ = राम और कृष्ण (युगल)',
      'बहुव्रीहि: चक्रपाणिः = हाथ में चक्र वाला',
      'अव्ययीभाव: यथाशक्ति = शक्ति के अनुसार',
    ],
  },
  {
    id: 'verbs',
    title: 'Verb System',
    titleHi: 'क्रिया प्रणाली',
    titleSanskrit: 'क्रियापदम्',
    icon: '🏃',
    summary: '10 conjugation classes, 4 voices, present/imperfect/optative/imperative moods.',
    summaryHi: '10 धातु वर्ग, 4 वाच्य, वर्तमान/अनद्यतन/इच्छार्थ/लोट् विधि।',
    points: [
      '1st class (भ्वादि): भवति, पठति — vowel stem + अ',
      '4th class (दिवादि): पश्यति, नृत्यति',
      '9th class (क्र्यादि): जानाति, क्रीणाति — ना before consonants',
      'Parasmaipada vs. Ātmanepada endings',
      'Optative (विधिलिङ्): भवेत् "may he be"',
    ],
    pointsHi: [
      '1वां वर्ग (भ्वादि): भवति, पठति — स्वर धातु + अ',
      '4वां वर्ग (दिवादि): पश्यति, नृत्यति',
      '9वां वर्ग (क्र्यादि): जानाति, क्रीणाति — व्यंजन से पहले ना',
      'परस्मैपद बनाम आत्मनेपद प्रत्यय',
      'इच्छार्थ (विधिलिङ्): भवेत् "वह हो"',
    ],
  },
  {
    id: 'texts',
    title: 'Canonical Texts',
    titleHi: 'शास्त्रीय ग्रंथ',
    titleSanskrit: 'शास्त्रग्रन्थाः',
    icon: '📜',
    summary: 'The 14 vidyās: the 4 Vedas, 6 Vedāṅgas, and 4 subsidiary sciences — plus epics and kāvya.',
    summaryHi: '14 विद्याएँ: 4 वेद, 6 वेदांग, और 4 सहायक विज्ञान — और महाकाव्य तथा काव्य।',
    points: [
      '4 Vedas: ऋग्वेद, यजुर्वेद, सामवेद, अथर्ववेद',
      '6 Vedāṅgas: शिक्षा, कल्प, व्याकरण, निरुक्त, छन्द, ज्योतिष',
      'Two epics: Rāmāyaṇa (24,000 verses) and Mahābhārata (100,000)',
      'Kālidāsa: 3 plays, 2 mahākāvyas, 2 lyric poems',
      'Darśanas: Nyāya, Vaiśeṣika, Sāṅkhya, Yoga, Mīmāṃsā, Vedānta',
    ],
    pointsHi: [
      '4 वेद: ऋग्वेद, यजुर्वेद, सामवेद, अथर्ववेद',
      '6 वेदांग: शिक्षा, कल्प, व्याकरण, निरुक्त, छन्द, ज्योतिष',
      'दो महाकाव्य: रामायण (24,000 श्लोक) और महाभारत (100,000)',
      'कालिदास: 3 नाटक, 2 महाकाव्य, 2 गीतिकाव्य',
      'दर्शन: न्याय, वैशेषिक, सांख्य, योग, मीमांसा, वेदान्त',
    ],
  },
  {
    id: 'philosophy',
    title: 'Philosophy Terms',
    titleHi: 'दर्शन शब्दावली',
    titleSanskrit: 'दर्शनशब्दाः',
    icon: '🧠',
    summary: 'The key technical terms of the six orthodox schools — the vocabulary of the darsanas.',
    summaryHi: 'छह आस्तिक दर्शनों की प्रमुख तकनीकी शब्दावली — दर्शनों का शब्दकोश।',
    points: [
      'प्रमाण: means of valid knowledge (perception, inference, word)',
      'पदार्थ: categories of reality — 16 in Nyāya, 6 in Vaiśeṣika',
      'तत्त्व: 25 principles of Sāṅkhya — puruṣa + prakṛti + 23 evolutes',
      'अष्टाङ्ग: the 8 limbs of Patañjali\'s Yoga',
      'महावाक्य: the 4 great sayings of Advaita Vedānta',
    ],
    pointsHi: [
      'प्रमाण: मान्य ज्ञान के साधन (प्रत्यक्ष, अनुमान, शब्द)',
      'पदार्थ: वास्तविकता की श्रेणियाँ — न्याय में 16, वैशेषिक में 6',
      'तत्त्व: सांख्य के 25 सिद्धांत — पुरुष + प्रकृति + 23 विकृतियाँ',
      'अष्टांग: पतञ्जलि के योग के 8 अंग',
      'महावाक्य: अद्वैत वेदान्त के 4 महान वचन',
    ],
  },
  {
    id: 'culture',
    title: 'Culture & Festivals',
    titleHi: 'संस्कृति और उत्सव',
    titleSanskrit: 'संस्कृतिः',
    icon: '🏛️',
    summary: 'The living tradition: festivals, greetings, and the institutions of Sanskrit culture.',
    summaryHi: 'जीवित परंपरा: उत्सव, अभिवादन, और संस्कृत संस्कृति के संस्थान।',
    points: [
      'नमस्ते = नमः + ते — "I bow to you"',
      'Dīpāvalī celebrates Rāma\'s return to Ayodhyā',
      'Vasantapañcamī honors Sarasvatī, goddess of learning',
      'Nālandā Mahāvihāra: 9-story library, 10,000 students',
      'Aśoka\'s edicts: first written inscriptions, 3rd century BCE',
    ],
    pointsHi: [
      'नमस्ते = नमः + ते — "मैं आपको नमस्कार करता हूँ"',
      'दीपावली राम की अयोध्या वापसी का उत्सव है',
      'वसन्तपञ्चमी विद्या की देवी सरस्वती का सम्मान करती है',
      'नालन्दा महाविहार: 9 मंजिल पुस्तकालय, 10,000 छात्र',
      'अशोक के अभिलेख: प्रथम लिखित शिलालेख, ईसा पूर्व 3वीं शताब्दी',
    ],
  },
]

export interface NewsArticle {
  id: string
  tag: string
  tagHi?: string
  title: string
  titleHi?: string
  excerpt: string
  excerptHi?: string
  date: string
  icon: string
}

export const newsArticles: NewsArticle[] = [
  {
    id: 'n1',
    tag: 'News & Events',
    tagHi: 'समाचार और कार्यक्रम',
    title: 'University adopts SanskritLab for first-year BA Sanskrit',
    titleHi: 'विश्वविद्यालय ने प्रथम वर्ष BA संस्कृत के लिए SanskritLab अपनाया',
    excerpt: 'A new pilot program will use the platform\'s bookshelf and assessment tools across three colleges this semester.',
    excerptHi: 'एक नया पायलट कार्यक्रम इस सेमेस्टर में तीन महाविद्यालयों में प्लेटफॉर्म के पुस्तकालय और मूल्यांकन उपकरणों का उपयोग करेगा।',
    date: 'Aug 2026',
    icon: '🏛️',
  },
  {
    id: 'n2',
    tag: 'News & Events',
    tagHi: 'समाचार और कार्यक्रम',
    title: 'New NCERT Class 12 shashwati grammar chapters added',
    titleHi: 'NCERT कक्षा 12 सश्वती व्याकरण के नए अध्याय जोड़े गए',
    excerpt: 'The full सश्वती grammar textbook is now browsable, searchable, and verse-linked in the library.',
    excerptHi: 'संपूर्ण सश्वती व्याकरण पाठ्यपुस्तक अब पुस्तकालय में ब्राउज़ करने योग्य, खोजने योग्य और श्लोक-संबंधित है।',
    date: 'Jul 2026',
    icon: '📖',
  },
  {
    id: 'n3',
    tag: 'News & Events',
    tagHi: 'समाचार और कार्यक्रम',
    title: 'OCR engine now handles clear Grantha scans',
    titleHi: 'OCR इंजन अब स्पष्ट ग्रंथ स्कैन को संभालता है',
    excerpt: 'Manuscript transcription receives preprocessing upgrades for palm-leaf and Grantha-adjacent scripts.',
    excerptHi: 'हस्तलिपि प्रतिलिपि को ताड़पत्र और ग्रंथ-संबंधित लिपियों के लिए पूर्व-प्रसंस्करण अपग्रेड प्राप्त होता है।',
    date: 'Jun 2026',
    icon: '📜',
  },
  {
    id: 'n4',
    tag: 'Behind the Scenes',
    tagHi: 'पर्दे के पीछे',
    title: 'How the Sanskrit Jeopardy clue board was built',
    titleHi: 'संस्कृत जेपर्डी क्लू बोर्ड कैसे बनाया गया',
    excerpt: 'A tour of the data pipeline: six categories, thirty clues, two rounds, and one final wager — all open source.',
    excerptHi: 'डेटा पाइपलाइन का दौरा: छह श्रेणियाँ, तीस क्लू, दो दौर, और एक अंतिम दांव — सब ओपन सोर्स।',
    date: 'Aug 2026',
    icon: '🎬',
  },
  {
    id: 'n5',
    tag: 'Behind the Scenes',
    tagHi: 'पर्दे के पीछे',
    title: 'From OCR to edition: the corpus pipeline',
    titleHi: 'OCR से संस्करण तक: कोर्पस पाइपलाइन',
    excerpt: 'Scanned manuscripts become searchable text through preprocessing, recognition, and collation steps.',
    excerptHi: 'स्कैन की गई हस्तलिपियाँ पूर्व-प्रसंस्करण, पहचान और संकलन चरणों से खोजने योग्य पाठ बन जाती हैं।',
    date: 'May 2026',
    icon: '🔍',
  },
  {
    id: 'n6',
    tag: 'Contestants',
    tagHi: 'प्रतिभागी',
    title: 'Meet Riya: from Class 6 NCERT to śloka champion',
    titleHi: 'रिया से मिलें: कक्षा 6 NCERT से श्लोक चैंपियन तक',
    excerpt: 'A student\'s journey through the learning tracks — her streak, her viva scores, and her favorite verses.',
    excerptHi: 'एक छात्रा की शिक्षण मार्गों से यात्रा — उसकी लगातार सफलता, विवा स्कोर, और पसंदीदा श्लोक।',
    date: 'Jul 2026',
    icon: '🌟',
  },
  {
    id: 'n7',
    tag: 'Contestants',
    tagHi: 'प्रतिभागी',
    title: 'Five-time winner Ananya on daily drill habits',
    titleHi: 'पांच बार की विजेता अनन्या दैनिक अभ्यास की आदतों पर',
    excerpt: 'The key to her 92% accuracy: sandhi practice, spaced-repetition flashcards, and the Anytime Test.',
    excerptHi: 'उसकी 92% सटीकता की कुंजी: सन्धि अभ्यास, स्पेस्ड-रिपीटिशन फ्लैशकार्ड, और एनीटाइम टेस्ट।',
    date: 'Jun 2026',
    icon: '🏆',
  },
  {
    id: 'n8',
    tag: 'Contestants',
    tagHi: 'प्रतिभागी',
    title: 'Teacher spotlight: Mr. Joshi\'s classroom league',
    titleHi: 'शिक्षक स्पॉटलाइट: श्री जोशी की कक्षा लीग',
    excerpt: 'How one teacher runs a weekly Jeopardy-style tournament between his Class 8 sections.',
    excerptHi: 'एक शिक्षक अपनी कक्षा 8 की शाखाओं के बीच साप्ताहिक जेपर्डी-शैली टूर्नामेंट कैसे चलाता है।',
    date: 'May 2026',
    icon: '👨‍🏫',
  },
]
