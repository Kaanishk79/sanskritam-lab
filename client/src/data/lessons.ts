import type { Lesson } from '../types/curriculum'

export const lessons: Lesson[] = [
  // ═══ LEVEL 0: Alphabet & Pronunciation (Child track) ═══
  {
    id: 'alphabet-vowels',
    title: 'स्वराः — The Vowels',
    subtitle: 'Learn the 13 vowels of Devanāgarī',
    level: 0, track: 'child', govClassId: 'class-1-2', duration: '15 min',
    unlockables: ['skill-alphabet'],
    content: {
      introduction: 'Sanskrit has 13 vowels called स्वराः (svarāḥ). They are the foundation of all pronunciation.',
      sections: [
        {
          heading: 'Simple Vowels',
          body: 'अ a — आ ā — इ i — ई ī — उ u — ऊ ū — ऋ ṛ — ॠ ṝ — ऌ ḷ',
          devanagari: 'अ आ इ ई उ ऊ ऋ ॠ ऌ',
          transliteration: 'a ā i ī u ū ṛ ṝ ḷ',
          examples: [
            { text: 'अग्नि', meaning: 'fire' },
            { text: 'इन्द्र', meaning: 'lord Indra' },
            { text: 'उषा', meaning: 'dawn' },
          ],
        },
        {
          heading: 'Diphthongs',
          body: 'ए e — ऐ ai — ओ o — औ au — अं ṃ — अः ḥ',
          devanagari: 'ए ऐ ओ औ अं अः',
          transliteration: 'e ai o au aṃ aḥ',
        },
      ],
      summary: 'Practice making each sound. Open your mouth wide for ā, round your lips for u.',
    },
    quiz: [
      { id: 'q-v1', prompt: 'Which vowel is "इ"?', options: ['a', 'ā', 'i', 'u'], correctIndex: 2, explanation: 'इ is the short i vowel, pronounced like in "sit".', difficulty: 1 },
      { id: 'q-v2', prompt: 'How many simple vowels does Sanskrit have?', options: ['5', '9', '13', '7'], correctIndex: 1, explanation: 'Sanskrit has 9 simple vowels plus 4 diphthongs = 13 total.', difficulty: 1 },
      { id: 'q-v3', prompt: 'Match: अ = ?', options: ['u', 'a', 'i', 'e'], correctIndex: 1, explanation: 'अ is the short a vowel.', difficulty: 1 },
    ],
  },
  {
    id: 'alphabet-consonants',
    title: 'व्यञ्जनानि — The Consonants',
    subtitle: 'Master all 33 consonants by place of articulation',
    level: 0, track: 'child', govClassId: 'class-1-2', duration: '20 min',
    unlockables: ['skill-alphabet'],
    content: {
      introduction: 'Sanskrit organizes consonants by where in the mouth they are produced — from the throat to the lips.',
      sections: [
        {
          heading: 'Kaṇṭhya — Gutturals (Throat)',
          body: 'क ka — ख kha — ग ga — घ gha — ङ ṅa',
          devanagari: 'क ख ग घ ङ',
          transliteration: 'ka kha ga gha ṅa',
        },
        {
          heading: 'Tālavya — Palatals (Palate)',
          body: 'च ca — छ cha — ज ja — झ jha — ञ ña',
          devanagari: 'च छ ज झ ञ',
        },
        {
          heading: 'Mūrdhanya — Retroflex',
          body: 'ट ṭa — ठ ṭha — ड ḍa — ढ ḍha — ण ṇa',
          devanagari: 'ट ठ ड ढ ण',
        },
        {
          heading: 'Dantya — Dentals (Teeth)',
          body: 'त ta — थ tha — द da — ध dha — न na',
          devanagari: 'त थ द ध न',
        },
        {
          heading: 'Oṣṭhya — Labials (Lips)',
          body: 'प pa — फ pha — ब ba — भ bha — म ma',
          devanagari: 'प फ ब भ म',
        },
        {
          heading: 'Antaḥsthā — Semivowels',
          body: 'य ya — र ra — ल la — व va',
          devanagari: 'य र ल व',
        },
        {
          heading: 'Ūṣman — Sibilants & Aspirate',
          body: 'श śa — ष ṣa — स sa — ह ha',
          devanagari: 'श ष स ह',
        },
      ],
      summary: 'There are 5 groups × 5 = 25, plus 4 semivowels and 4 sibilants = 33 consonants.',
    },
    quiz: [
      { id: 'q-c1', prompt: 'क is which type?', options: ['Palatal', 'Guttural', 'Labial', 'Dental'], correctIndex: 1, explanation: 'क is गuttural (kaṇṭhya) — from the throat.', difficulty: 1 },
      { id: 'q-c2', prompt: 'Which is the dental series?', options: ['क ख ग घ ङ', 'च छ ज झ ञ', 'त थ द ध न', 'प फ ब भ म'], correctIndex: 2, explanation: 'त थ द ध न are the dental series — tongue touches the teeth.', difficulty: 2 },
    ],
  },

  // ═══ LEVEL 0: Simple words (Child) ═══
  {
    id: 'simple-words',
    title: 'सरलशब्दाः — Simple Words',
    subtitle: 'First words: family, nature, body parts',
    level: 0, track: 'child', govClassId: 'class-1-2', duration: '15 min',
    unlockables: ['skill-vocab-basics'],
    content: {
      introduction: 'Let\'s learn your first Sanskrit words! Repeat each word aloud.',
      sections: [
        {
          heading: 'परिवारः — Family',
          body: 'माता = mother, पिता = father, भ्राता = brother, स्वसा = sister',
          devanagari: 'माता पिता भ्राता स्वसा',
          transliteration: 'mātā pitā bhrātā svasā',
        },
        {
          heading: 'प्रकृतिः — Nature',
          body: 'सूर्यः = sun, चन्द्रः = moon, जलम् = water, अग्निः = fire',
          devanagari: 'सूर्यः चन्द्रः जलम् अग्निः',
        },
        {
          heading: 'शरीरम् — Body',
          body: 'मुखम् = face, नेत्रम् = eye, करः = hand, पादः = foot',
          devanagari: 'मुखम् नेत्रम् करः पादः',
        },
      ],
      summary: 'Great! You know 12 basic Sanskrit words. Practice by pointing to objects and saying their Sanskrit names.',
    },
    quiz: [
      { id: 'q-sw1', prompt: 'What is "mother" in Sanskrit?', options: ['पिता', 'माता', 'भ्राता', 'स्वसा'], correctIndex: 1, explanation: 'माता = mother.', difficulty: 1 },
      { id: 'q-sw2', prompt: 'जलम् means...?', options: ['Fire', 'Sun', 'Water', 'Moon'], correctIndex: 2, explanation: 'जलम् = water.', difficulty: 1 },
    ],
  },

  // ═══ LEVEL 1: Basic Sentences (Teen/Child) ═══
  {
    id: 'basic-sentences',
    title: 'सरलवाक्यानि — Basic Sentences',
    subtitle: 'Subject-Object-Verb in simple sentences',
    level: 1, track: 'teen', govClassId: 'class-3-5', duration: '20 min',
    unlockables: ['skill-syntax'],
    content: {
      introduction: 'Sanskrit word order is Subject-Object-Verb (SOV). Adjectives agree with nouns.',
      sections: [
        {
          heading: 'Simple SOV Structure',
          body: 'रामः फलं खादति = Rāma eats a fruit.\nरामः = subject (Rāma), फलम् = object (fruit), खादति = verb (eats)',
          devanagari: 'रामः फलं खादति',
          transliteration: 'Rāmaḥ phalaṃ khādati',
          examples: [
            { text: 'सीता जलं पिबति', meaning: 'Sītā drinks water' },
            { text: 'बालः पुस्तकं पठति', meaning: 'The boy reads a book' },
          ],
        },
        {
          heading: 'Adjective-Noun Agreement',
          body: 'Adjectives match the noun in gender, number, case.\nबालः = boy (masc.), बाला = girl (fem.)\nसुन्दरः बालः = beautiful boy\nसुन्दरी बाला = beautiful girl',
          devanagari: 'सुन्दरः बालः । सुन्दरी बाला',
        },
      ],
      summary: 'SOV order + adjective agreement are the foundation of all Sanskrit sentences.',
    },
    quiz: [
      { id: 'q-bs1', prompt: 'What is the word order in Sanskrit?', options: ['SVO', 'SOV', 'VSO', 'OSV'], correctIndex: 1, explanation: 'Sanskrit follows Subject-Object-Verb order.', difficulty: 1 },
      { id: 'q-bs2', prompt: 'Translate: रामः फलं खादति', options: ['Rāma eats a fruit', 'Rāma drinks water', 'Fruit eats Rāma', 'Rāma is a fruit'], correctIndex: 0, explanation: 'रामः (Rāma) + फलम् (fruit) + खादति (eats).', difficulty: 2 },
    ],
  },

  // ═══ LEVEL 2: Noun Declensions (Teen/Undergrad) ═══
  {
    id: 'declensions',
    title: 'विभक्तयः — The 8 Cases',
    subtitle: 'Master noun declensions across 3 genders',
    level: 2, track: 'undergrad', govClassId: 'class-7', duration: '30 min',
    unlockables: ['skill-declensions'],
    content: {
      introduction: 'Sanskrit nouns change form (decline) based on their grammatical role. There are 8 cases (vibhaktis) and 3 numbers (singular, dual, plural).',
      sections: [
        {
          heading: 'The 8 Cases (विभक्तयः)',
          body: '1. प्रथमा = Nominative (subject)\n2. द्वितीया = Accusative (object)\n3. तृतीया = Instrumental (by/with)\n4. चतुर्थी = Dative (to/for)\n5. पञ्चमी = Ablative (from)\n6. षष्ठी = Genitive (of)\n7. सप्तमी = Locative (in/on)\n8. सम्बोधन = Vocative (O!)',
        },
        {
          heading: 'राम — Masculine a-stem',
          body: 'Singular: रामः, रामम्, रामेण, रामाय, रामात्, रामस्य, रामे, हे राम\nDual: रामौ, रामौ, रामाभ्याम्, ...\nPlural: रामाः, रामान्, रामैः, ...',
          devanagari: 'रामः  रामम्  रामेण  रामाय  रामात्  रामस्य  रामे  हे राम',
          transliteration: 'rāmaḥ  rāmam  rāmeṇa  rāmāya  rāmāt  rāmasya  rāme  he rāma',
        },
        {
          heading: 'फल — Neuter a-stem',
          body: 'Nominative singular: फलम् (phalam)\nNominative plural: फलानि (phalāni)\nNote: Neuter nom./acc. are always identical.',
          devanagari: 'फलम्  फलानि',
        },
        {
          heading: 'बाला — Feminine ā-stem',
          body: 'Singular: बाला, बालाम्, बालया, बालायै, बालायाः, बालायाः, बालायाम्, हे बाले',
          devanagari: 'बाला  बालाम्  बालया  बालायै',
        },
      ],
      summary: 'Learn the paradigm of राम (masc.), फल (neut.), and बाला (fem.) to master the case system.',
    },
    quiz: [
      { id: 'q-d1', prompt: 'How many cases does Sanskrit have?', options: ['6', '7', '8', '10'], correctIndex: 2, explanation: 'Sanskrit has 8 cases (vibhaktis) plus the vocative.', difficulty: 1 },
      { id: 'q-d2', prompt: 'What is the instrumental singular of राम?', options: ['रामेण', 'रामाय', 'रामात्', 'रामस्य'], correctIndex: 0, explanation: 'Instrumental (तृतीया) singular of राम is रामेण.', difficulty: 3 },
      { id: 'q-d3', prompt: 'Neuter nominative plural ending?', options: ['-आः', '-अम्', '-आनि', '-ए'], correctIndex: 2, explanation: 'Neuter a-stem nominative plural ends in -आनि.', difficulty: 2 },
    ],
  },

  // ═══ LEVEL 3: Sandhi (Teen/Undergrad) ═══
  {
    id: 'sandhi-rules',
    title: 'सन्धिः — Sound Merger Rules',
    subtitle: 'The elegant rules of sound combination',
    level: 3, track: 'undergrad', govClassId: 'class-9', duration: '35 min',
    unlockables: ['skill-sandhi'],
    content: {
      introduction: 'Sandhi is the joining of sounds across word boundaries. Sanskrit texts are written with sandhi applied, so you must learn to split and apply these rules.',
      sections: [
        {
          heading: 'Guṇa Sandhi',
          body: 'अ/आ + इ/ई → ए\nअ/आ + उ/ऊ → ओ\nअ/आ + ऋ → अर्\nExample: देव + इन्द्रः = देवेन्द्रः',
          devanagari: 'देव + इन्द्रः = देवेन्द्रः',
          examples: [
            { text: 'राम + इच्छति', meaning: 'रामेच्छति (Rāma desires)' },
            { text: 'हित + उपदेशः', meaning: 'हितोपदेशः (beneficial advice)' },
          ],
        },
        {
          heading: 'Vṛddhi Sandhi',
          body: 'अ/आ + ए → ऐ\nअ/आ + ओ → औ\nExample: सदा + एव = सदैव',
          devanagari: 'सदा + एव = सदैव',
        },
        {
          heading: 'Yaṇ Sandhi',
          body: 'इ/ई + vowel → य् + vowel\nउ/ऊ + vowel → व् + vowel\nExample: इति + आह = इत्याह',
          devanagari: 'इति + आह = इत्याह',
          examples: [
            { text: 'अग्नि + इव', meaning: 'अग्निरिव (like fire)' },
          ],
        },
      ],
      summary: 'The three main sandhi types — Guṇa, Vṛddhi, and Yaṇ — cover 90% of cases in classical texts.',
    },
    quiz: [
      { id: 'q-s1', prompt: 'देव + इन्द्रः = ?', options: ['दवेन्द्रः', 'देवेन्द्रः', 'देवैन्द्रः', 'देवीन्द्रः'], correctIndex: 1, explanation: 'अ + इ = ए by Guṇa sandhi: देवेन्द्रः.', difficulty: 3 },
      { id: 'q-s2', prompt: 'Which sandhi produces ऐ?', options: ['Guṇa', 'Vṛddhi', 'Yaṇ', 'Ayādi'], correctIndex: 1, explanation: 'Vṛddhi sandhi: अ/आ + ए → ऐ.', difficulty: 2 },
    ],
  },

  // ═══ LEVEL 3: Compounds (Samāsa) ═══
  {
    id: 'compounds',
    title: 'समासाः — Compound Formation',
    subtitle: 'The art of combining words into compact forms',
    level: 3, track: 'teen', govClassId: 'class-9', duration: '25 min',
    unlockables: ['skill-compounds'],
    content: {
      introduction: 'Sanskrit loves compounds (samāsas). A single compound word can express what takes a full sentence in English.',
      sections: [
        {
          heading: 'Tatpuruṣa (Determinative)',
          body: 'First part modifies the second (like an object/complement).\nExample: राजपुरुषः = राजन् + पुरुषः (king\'s man)',
          devanagari: 'राजपुरुषः = राजन् + पुरुषः',
        },
        {
          heading: 'Bahuvrīhi (Exocentric)',
          body: 'Refers to something outside the compound.\nExample: चक्रपाणिः = चक्रम् + पाणिः (having a discus in hand = Viṣṇu)',
          devanagari: 'चक्रपाणिः',
        },
        {
          heading: 'Dvandva (Copulative)',
          body: 'Lists multiple items as a pair/group.\nExample: रामकृष्णौ = Rāma and Kṛṣṇa',
          devanagari: 'रामकृष्णौ',
        },
      ],
      summary: 'Tatpuruṣa, Bahuvrīhi, and Dvandva are the three main compound types.',
    },
    quiz: [
      { id: 'q-comp1', prompt: 'राजपुरुषः is which type of compound?', options: ['Tatpuruṣa', 'Bahuvrīhi', 'Dvandva', 'Avyayībhāva'], correctIndex: 0, explanation: 'राजपुरुषः = राजन् + पुरुषः is Tatpuruṣa: the king\'s man.', difficulty: 3 },
    ],
  },

  // ═══ LEVEL 4: Classical Poetry (Undergrad) ═══
  {
    id: 'kalidasa',
    title: 'कालिदासः — The Poet Laureate',
    subtitle: 'Analyzing the first verse of Abhijñānaśākuntalam',
    level: 4, track: 'undergrad', govClassId: 'ba-1', duration: '30 min',
    unlockables: ['skill-classical-texts'],
    content: {
      introduction: 'Kālidāsa is the greatest Sanskrit poet. His play Abhijñānaśākuntalam opens with a benedictory verse (nāndī).',
      sections: [
        {
          heading: 'Verse 1.1',
          body: 'आसीदुदन्तुमूलेषु सचेताः प्रभवः स्वयम् । विधाता तस्य चेतांसि विधिना विधिना दधे ॥',
          devanagari: 'आसीदुदन्तुमूलेषु सचेताः प्रभवः स्वयम् । विधाता तस्य चेतांसि विधिना विधिना दधे ॥',
          transliteration: 'āsīdudantumūleṣu sacetāḥ prabhavaḥ svayam | vidhātā tasya cetāṃsi vidhinā vidhinā dadhe ||',
          examples: [
            { text: 'आसीत् (āsīt)', meaning: 'was' },
            { text: 'प्रभवः (prabhavaḥ)', meaning: 'origins' },
          ],
        },
        {
          heading: 'Metre: Anuṣṭubh',
          body: '8 syllables per quarter-verse (pāda). Pattern: ⏑⏑−− ⏑⏑−− ⏑⏑−− ⏑⏑−×\nThis is the most common Sanskrit metre.',
        },
      ],
      summary: 'Kālidāsa\'s style is marked by elegant simplicity (prasāda guṇa). Every word carries precise meaning.',
    },
    quiz: [
      { id: 'q-kl1', prompt: 'Which metre is the most common in Classical Sanskrit?', options: ['Triṣṭubh', 'Anuṣṭubh', 'Gāyatrī', 'Jagatī'], correctIndex: 1, explanation: 'Anuṣṭubh (8 syllables/pāda) is the most common metre.', difficulty: 2 },
    ],
  },

  // ═══ LEVEL 4: Philosophy (Undergrad) ═══
  {
    id: 'nyaya-intro',
    title: 'न्यायः — Introduction to Logic',
    subtitle: 'The 16 categories of Nyāya philosophy',
    level: 4, track: 'undergrad', govClassId: 'ba-2', duration: '30 min',
    unlockables: ['skill-philosophy'],
    content: {
      introduction: 'Nyāya (lit. "method") is the school of logic and epistemology founded by Gautama Akṣapāda.',
      sections: [
        {
          heading: 'The 16 Padārthas',
          body: '1. प्रमाण (means of knowledge)\n2. प्रमेय (objects of knowledge)\n3. संशय (doubt)\n4. प्रयोजन (purpose)\n5. दृष्टान्त (example)\n6. सिद्धान्त (established doctrine)\n7. अवयव (members of inference)\n8. तर्क (hypothetical reasoning)\n9. निर्णय (certainty)\n10. वाद (discussion)\n11. जल्प (wrangling)\n12. वितण्डा (cavil)\n13. हेत्वाभास (fallacies)\n14. छल (quibble)\n15. जाति (analogous rejoinder)\n16. निग्रहस्थान (point of defeat)',
        },
        {
          heading: 'Anumāna — Inference',
          body: 'The 5-membered syllogism:\n1. प्रतिज्ञा (thesis): The hill has fire\n2. हेतु (reason): Because it has smoke\n3. उदाहरण (example): Wherever smoke, there fire (e.g. kitchen)\n4. उपनय (application): This hill has smoke\n5. निगमन (conclusion): Therefore it has fire',
        },
      ],
      summary: 'Nyāya provides the logical framework for all later Indian philosophy.',
    },
    quiz: [
      { id: 'q-ny1', prompt: 'How many categories (padārthas) does Nyāya recognize?', options: ['12', '16', '20', '7'], correctIndex: 1, explanation: 'Nyāya Sūtra 1.1.1 lists 16 padārthas.', difficulty: 3 },
      { id: 'q-ny2', prompt: 'What is the third member of the Nyāya syllogism?', options: ['Pratijñā', 'Hetu', 'Udāharaṇa', 'Nigamana'], correctIndex: 2, explanation: 'Udāharaṇa (example) is the third member.', difficulty: 4 },
    ],
  },

  // ═══ LEVEL 5: Textual Criticism (Graduate) ═══
  {
    id: 'textual-criticism',
    title: 'पाठसमालोचनम् — Textual Criticism',
    subtitle: 'Establishing critical editions from manuscript witnesses',
    level: 5, track: 'graduate', govClassId: 'ma-1', duration: '45 min',
    unlockables: ['skill-critical-edition'],
    content: {
      introduction: 'Textual criticism (pāṭhasamālocanam) is the science of reconstructing the original text from multiple manuscript copies.',
      sections: [
        {
          heading: 'Stemmatics (Stemma Codicum)',
          body: 'A stemma is a family tree of manuscripts showing how copies relate.\n- Archetype (lost original)\n- Hyparchetypes (intermediate lost copies)\n- Witnesses (extant manuscripts)',
        },
        {
          heading: 'Types of Variants',
          body: '1. लेखकप्रमादाः — Scribal errors (haplography, dittography, etc.)\n2. संशोधकप्रक्षेपाः — Conjectural emendations\n3. पाठभेदाः — Genuine variant readings',
        },
        {
          heading: 'Recension Method',
          body: 'Step 1: Collate all witnesses\nStep 2: Classify by shared errors\nStep 3: Construct stemma\nStep 4: Reconstruct archetype\nStep 5: Apply emendation (conjecture) where needed',
        },
      ],
      summary: 'A critical edition presents a reconstructed text with a critical apparatus documenting all variant readings.',
    },
    quiz: [
      { id: 'q-tc1', prompt: 'What is a stemma?', options: ['A type of poem', 'A family tree of MSS', 'A commentary', 'A grammatical rule'], correctIndex: 1, explanation: 'A stemma shows the genealogical relationship between manuscripts.', difficulty: 4 },
    ],
  },

  // ═══ LEVEL 5: Paleography (Graduate) ═══
  {
    id: 'paleography',
    title: 'पुरालिपिज्ञानम् — Paleography',
    subtitle: 'Reading ancient Devanāgarī and Grantha scripts',
    level: 5, track: 'graduate', govClassId: 'ma-2', duration: '40 min',
    unlockables: ['skill-paleography'],
    content: {
      introduction: 'Paleography is the study of ancient handwriting. Sanskrit manuscripts are found in Devanāgarī and Grantha (South Indian) scripts.',
      sections: [
        {
          heading: 'Devanāgarī Evolution',
          body: 'Brahmi (3rd BCE) → Gupta (4-6 CE) → Siddhamātṛkā (7-8 CE) → Nāgarī (9-10 CE) → Devanāgarī (11+ CE)',
        },
        {
          heading: 'Grantha Script',
          body: 'Used in Tamil Nadu and Kerala for Sanskrit manuscripts. Distinctive rounded shapes adapted to palm-leaf writing.',
        },
        {
          heading: 'Common Paleographical Challenges',
          body: '1. Confusion of सम (sa) and व (va) and ब (ba)\n2. Lack of word division in older MSS\n3. Abbreviations (like इति = इति)',
        },
      ],
      summary: 'Reading manuscripts requires practice identifying letter shapes across centuries of scribal tradition.',
    },
    quiz: [
      { id: 'q-pal1', prompt: 'Which script is primarily used for Sanskrit in South India?', options: ['Devanāgarī', 'Grantha', 'Brāhmī', 'Kharoṣṭhī'], correctIndex: 1, explanation: 'Grantha is the South Indian script for Sanskrit.', difficulty: 3 },
    ],
  },

  // ═══ LEVEL 6: Critical Edition (PhD) ═══
  {
    id: 'critical-edition',
    title: 'समालोचनसंस्करणम् — Critical Edition Preparation',
    subtitle: 'Building a full critical edition with apparatus',
    level: 6, track: 'phd', govClassId: 'mphil', duration: '60 min',
    unlockables: ['skill-phd-research'],
    content: {
      introduction: 'Preparing a critical edition is the highest form of text-historical scholarship. It requires paleography, textual criticism, and deep knowledge of the tradition.',
      sections: [
        {
          heading: 'Critical Apparatus Format',
          body: 'The apparatus (apparatus criticus) records every variant:\nSigla: A, B, C = manuscripts\n1a: ते च A B : तु C D\n1b: मया A C : तया B D',
        },
        {
          heading: 'Conjectural Emendation',
          body: 'When all witnesses give a corrupt reading, the editor may emend (conjecture).\nPrinciple: lectio difficilior potior (the more difficult reading is preferable)',
        },
        {
          heading: 'Digital Edition Standards',
          body: 'XML-TEI is the modern standard. Each manuscript is encoded, with variant readings linked to the base text.',
        },
      ],
      summary: 'A PhD-level critical edition is the definitive scholarly resource for a text.',
    },
    quiz: [
      { id: 'q-ce1', prompt: 'What does "lectio difficilior potior" mean?', options: ['Easier reading is better', 'The more difficult reading is preferable', 'Always follow the oldest MS', 'Never emend'], correctIndex: 1, explanation: '\'The more difficult reading is the stronger\' — scribes tend to simplify.', difficulty: 5 },
    ],
  },

  // ═══ LEVEL 0: Numbers & Colors (Child) ═══
  {
    id: 'numbers-colors',
    title: 'सङ्ख्या रङ्गाः च — Numbers and Colors',
    subtitle: 'Count 1-10 and name basic colors in Sanskrit',
    level: 0, track: 'child', govClassId: 'class-3-5', duration: '10 min',
    unlockables: ['skill-vocab-basics'],
    content: {
      introduction: 'Numbers and colors are some of the first words children learn. Let\'s practice counting and naming colors in Sanskrit!',
      sections: [
        {
          heading: 'सङ्ख्याः १-१० — Numbers 1-10',
          body: '१ एकः (one), २ द्वौ (two), ३ त्रयः (three), ४ चत्वारः (four), ५ पञ्च (five), ६ षट् (six), ७ सप्त (seven), ८ अष्ट (eight), ९ नव (nine), १० दश (ten)',
          devanagari: 'एकः द्वौ त्रयः चत्वारः पञ्च षट् सप्त अष्ट नव दश',
          transliteration: 'ekaḥ dvau trayaḥ catvāraḥ pañca ṣaṭ sapta aṣṭa nava daśa',
        },
        {
          heading: 'रङ्गाः — Colors',
          body: 'लोहितः = red, पीतः = yellow, नीलः = blue, श्वेतः = white, कृष्णः = black, हरितः = green',
          devanagari: 'लोहितः पीतः नीलः श्वेतः कृष्णः हरितः',
          transliteration: 'lohitaḥ pītaḥ nīlaḥ śvetaḥ kṛṣṇaḥ haritaḥ',
        },
      ],
      summary: 'Practice counting objects around you in Sanskrit, and name their colors!',
    },
    quiz: [
      { id: 'q-nc1', prompt: 'What is "five" in Sanskrit?', options: ['सप्त', 'पञ्च', 'दश', 'नव'], correctIndex: 1, explanation: 'पञ्च (pañca) = five.', difficulty: 1 },
      { id: 'q-nc2', prompt: 'नीलः means which color?', options: ['Red', 'Yellow', 'Blue', 'Green'], correctIndex: 2, explanation: 'नीलः (nīlaḥ) = blue.', difficulty: 1 },
    ],
  },

  // ═══ LEVEL 1: Everyday Vocabulary (Teen) ═══
  {
    id: 'everyday-vocab',
    title: 'नित्यव्यवहारशब्दाः — Everyday Vocabulary',
    subtitle: 'Greetings, food, directions, and time expressions',
    level: 1, track: 'teen', govClassId: 'class-6', duration: '15 min',
    unlockables: ['skill-vocab-basics'],
    content: {
      introduction: 'Build practical Sanskrit vocabulary for daily conversations — greetings, ordering food, asking directions, and telling time.',
      sections: [
        {
          heading: 'अभिवादनम् — Greetings',
          body: 'नमः = greeting, नमस्ते = hello to you, स्वागतम् = welcome, धन्यवादः = thank you, पुनर्दर्शनाय = goodbye',
          devanagari: 'नमः  नमस्ते  स्वागतम्  धन्यवादः  पुनर्दर्शनाय',
          transliteration: 'namaḥ namaste svāgatam dhanyavādaḥ punardarśanāya',
        },
        {
          heading: 'भोजनम् — Food',
          body: 'ओदनम् = rice, रोटिका = bread, दुग्धम् = milk, जलम् = water, फलम् = fruit, शाकम् = vegetable',
          devanagari: 'ओदनम्  रोटिका  दुग्धम्  जलम्  फलम्  शाकम्',
        },
        {
          heading: 'दिक् — Directions',
          body: 'उत्तरम् = north, दक्षिणम् = south, पूर्वम् = east, पश्चिमम् = west, वामतः = left, दक्षिणतः = right',
          devanagari: 'उत्तरम्  दक्षिणम्  पूर्वम्  पश्चिमम्  वामतः  दक्षिणतः',
        },
        {
          heading: 'कालः — Time',
          body: 'अद्य = today, श्वः = tomorrow, ह्यः = yesterday, प्रातः = morning, मध्याह्नः = noon, सायम् = evening, रात्रिः = night',
          devanagari: 'अद्य  श्वः  ह्यः  प्रातः  मध्याह्नः  सायम्  रात्रिः',
          transliteration: 'adya śvaḥ hyaḥ prātaḥ madhyāhnaḥ sāyam rātriḥ',
        },
      ],
      summary: 'With these 20+ words you can handle basic everyday situations in Sanskrit.',
    },
    quiz: [
      { id: 'q-ev1', prompt: 'How do you say "thank you" in Sanskrit?', options: ['नमस्ते', 'धन्यवादः', 'स्वागतम्', 'पुनर्दर्शनाय'], correctIndex: 1, explanation: 'धन्यवादः (dhanyavādaḥ) = thank you.', difficulty: 1 },
      { id: 'q-ev2', prompt: 'Which word means "tomorrow"?', options: ['अद्य', 'ह्यः', 'श्वः', 'प्रातः'], correctIndex: 2, explanation: 'श्वः (śvaḥ) = tomorrow.', difficulty: 2 },
    ],
  },

  // ═══ LEVEL 2: Verb Conjugation (Teen) ═══
  {
    id: 'verb-conjugation',
    title: 'क्रियापदरूपाणि — Verb Conjugation',
    subtitle: 'Present, imperfect, future, and perfect tenses',
    level: 2, track: 'teen', govClassId: 'class-8', duration: '35 min',
    unlockables: ['skill-conjugation'],
    content: {
      introduction: 'Sanskrit verbs conjugate for person (1st, 2nd, 3rd), number (singular, dual, plural), tense, mood, and voice (active, middle, passive).',
      sections: [
        {
          heading: 'लट् — Present Tense (Vartamāna)',
          body: 'पठ् + लट् → पठति "reads"\nSingular: पठामि, पठसि, पठति\nDual: पठावः, पठथः, पठतः\nPlural: पठामः, पठथ, पठन्ति',
          devanagari: 'पठामि  पठसि  पठति  पठावः  पठथः  पठतः  पठामः  पठथ  पठन्ति',
          transliteration: 'paṭhāmi paṭhasi paṭhati paṭhāvaḥ paṭhathaḥ paṭhataḥ paṭhāmaḥ paṭhatha paṭhanti',
          examples: [
            { text: 'रामः पठति', meaning: 'Rāma reads' },
            { text: 'वयं पठामः', meaning: 'We read' },
          ],
        },
        {
          heading: 'लङ् — Imperfect Tense (Anadyatana)',
          body: 'Past tense for actions completed "today but before now". Prefix अ- added.\nअपठम्, अपठः, अपठत्, अपठाव, अपठतम्, अपठताम्, अपठाम, अपठत, अपठन्',
          devanagari: 'अपठम्  अपठः  अपठत्  अपठाव  अपठतम्  अपठताम्  अपठाम  अपठत  अपठन्',
        },
        {
          heading: 'लृट् — Future Tense (Bhaviṣyat)',
          body: 'Add -स्य- infix.\nपठिष्यामि, पठिष्यसि, पठिष्यति\nExample: श्वः पठिष्यामि = I will read tomorrow.',
          devanagari: 'पठिष्यामि  पठिष्यसि  पठिष्यति',
          examples: [
            { text: 'श्वः पठिष्यामि', meaning: 'I will read tomorrow' },
          ],
        },
        {
          heading: 'लिट् — Perfect Tense (Parokṣa)',
          body: 'Remote past (before today). Often reduplicates the root.\nपठ् → पपाठ, पपठतुः, पपठुः\nजन् → जज्ञे (to be born, middle voice)',
          devanagari: 'पपाठ  पपठतुः  पपठुः',
        },
      ],
      summary: 'The four main tenses — present, imperfect, future, perfect — cover past, present, and future time.',
    },
    quiz: [
      { id: 'q-vc1', prompt: 'What is the 3rd person singular present of पठ्?', options: ['पठामि', 'पठसि', 'पठति', 'पठन्ति'], correctIndex: 2, explanation: 'पठति (paṭhati) = he/she reads, 3rd person singular present.', difficulty: 2 },
      { id: 'q-vc2', prompt: 'The imperfect tense uses which prefix?', options: ['अ-', 'स-', 'नि-', 'प्र-'], correctIndex: 0, explanation: 'अ- (a-) is the augment prefix for the imperfect tense.', difficulty: 3 },
    ],
  },

  // ═══ LEVEL 3: Kṛdanta (Undergrad) ═══
  {
    id: 'krdanta',
    title: 'कृदन्ताः — Primary Derivatives',
    subtitle: 'Forming nouns from roots with kṛt suffixes',
    level: 3, track: 'undergrad', govClassId: 'class-10', duration: '30 min',
    unlockables: ['skill-grammar'],
    content: {
      introduction: 'Kṛdanta (कृदन्त) are nouns derived directly from verbal roots using kṛt suffixes. They are essential for understanding complex Sanskrit sentences.',
      sections: [
        {
          heading: 'क्त — Past Passive Participle',
          body: 'Root + क्त → -त or -न past participle.\nकृ → कृत (done), भू → भूत (become), गम् → गत (gone), पठ् → पठित (read)\nCan be used adjectivally or as a finite verb in perfect passive constructions.',
          devanagari: 'कृतः  भूतः  गतः  पठितः',
          transliteration: 'kṛtaḥ bhūtaḥ gataḥ paṭhitaḥ',
          examples: [
            { text: 'तेन पुस्तकं पठितम्', meaning: 'The book was read by him' },
            { text: 'गतं दुःखं मा शोच', meaning: 'Do not grieve over past sorrow' },
          ],
        },
        {
          heading: 'क्त्वा — Absolutive (Gerund)',
          body: 'Root + क्त्वा → having done X\nगम् + क्त्वा → गत्वा (having gone)\nकृ + क्त्वा → कृत्वा (having done)\nFor compound roots: -त्वा after a simple root, -य after a prefix.',
          devanagari: 'गत्वा  कृत्वा  दृष्ट्वा  श्रुत्वा',
          examples: [
            { text: 'गृहं गत्वा भोजनं करोति', meaning: 'Having gone home, he cooks food.' },
          ],
        },
        {
          heading: 'तव्यत् & अनीयर् — Gerundives (Obligatory Participles)',
          body: 'Expressing "should be" or "must be" done.\nकृ + तव्यत् → कर्तव्यम् (should be done)\nपठ् + अनीयर् → पठनीयम् (should be read)\nपश् + अनीयर् → दर्शनीयम् (worth seeing)',
          devanagari: 'कर्तव्यम्  पठनीयम्  दर्शनीयम्',
        },
      ],
      summary: 'Kṛt suffixes transform roots into nouns, participles, and gerunds — a hallmark of Sanskrit\'s derivational power.',
    },
    quiz: [
      { id: 'q-krd1', prompt: 'Which suffix forms the past passive participle?', options: ['क्त्वा', 'क्त', 'तव्यत्', 'अनीयर्'], correctIndex: 1, explanation: 'क्त (ta) forms the past passive participle, e.g., कृत = done.', difficulty: 3 },
    ],
  },

  // ═══ LEVEL 3: Taddhita (Undergrad) ═══
  {
    id: 'taddhita',
    title: 'तद्धिताः — Secondary Derivatives',
    subtitle: 'Forming nouns from nouns with taddhita suffixes',
    level: 3, track: 'undergrad', govClassId: 'class-10', duration: '25 min',
    unlockables: ['skill-grammar'],
    content: {
      introduction: 'Taddhita (तद्धित) suffixes are added to nouns and adjectives to form new words — patronymics, abstract nouns, possessives, and relational terms.',
      sections: [
        {
          heading: 'अण्/अञ् — Patronymics (Gotra Names)',
          body: 'A family descendant name.\nउपगु + अण् → औपगवः (descendant of Upagu)\nवसिष्ठ + अण् → वासिष्ठः (descendant of Vasiṣṭha)\nNote the vṛddhi of the first syllable.',
          devanagari: 'औपगवः  वासिष्ठः',
        },
        {
          heading: 'अपत्यार्थे — Offspring Suffixes',
          body: 'इञ् → दाक्षिः (son of Dakṣa)\nयञ् → गार्ग्यः (descendant of Garga)\nठक् → कौट्स्यः (descendant of Kutsa)',
        },
        {
          heading: 'भावे — Abstract Nouns',
          body: 'त्व → देवत्वम् (divinity), मनुष्यत्वम् (humanity)\nता → ब्राह्मणता (brahminhood), सुन्दरता (beauty)\nइमन् → महिमा (greatness), लघिमा (lightness)',
          devanagari: 'देवत्वम्  ब्राह्मणता  महिमा',
          transliteration: 'devatvam brāhmaṇatā mahimā',
          examples: [
            { text: 'देवत्वम्', meaning: 'divinity' },
            { text: 'सुन्दरता', meaning: 'beauty' },
          ],
        },
      ],
      summary: 'Taddhita derivation shows how Sanskrit creates specialized vocabulary from common nouns, enriching its lexical flexibility.',
    },
    quiz: [
      { id: 'q-td1', prompt: 'What kind of noun does -त्व (-tva) form?', options: ['Patronymic', 'Abstract', 'Possessive', 'Comparative'], correctIndex: 1, explanation: '-त्व (-tva) forms abstract nouns like देवत्वम् (divinity).', difficulty: 3 },
    ],
  },

  // ═══ LEVEL 4: Kālidāsa Works (Undergrad) ═══
  {
    id: 'kalidasa-works',
    title: 'कालिदासप्रणीतग्रन्थाः — Kālidāsa\'s Complete Works',
    subtitle: 'An overview of all seven authentic works',
    level: 4, track: 'undergrad', govClassId: 'ba-1', duration: '20 min',
    unlockables: ['skill-classical-texts'],
    content: {
      introduction: 'Kālidāsa, the "Shakespeare of India," wrote three plays, two epic poems (mahākāvyas), and two lyric poems (khaṇḍakāvyas). Seven works are universally accepted as authentic.',
      sections: [
        {
          heading: 'नाटकानि — The Three Plays',
          body: 'अभिज्ञानशाकुन्तलम् = The Recognition of Śakuntalā — his masterpiece\nविक्रमोर्वशीयम् = The Hero and the Nymph\nमालविकाग्निमित्रम् = Mālavikā and Agnimitra',
          devanagari: 'अभिज्ञानशाकुन्तलम्  विक्रमोर्वशीयम्  मालविकाग्निमित्रम्',
          examples: [
            { text: 'अभिज्ञानशाकुन्तलम्', meaning: 'The Recognition of Śakuntalā — Act IV is famed for its pathos' },
          ],
        },
        {
          heading: 'महाकाव्ये — The Two Epics',
          body: 'रघुवंशम् = "The Dynasty of Raghu" — 19 cantos on the Solar dynasty\nकुमारसम्भवम् = "The Birth of Kumāra" — 17 cantos on Śiva and Pārvatī\'s marriage',
          devanagari: 'रघुवंशम्  कुमारसम्भवम्',
          transliteration: 'Raghuvaṃśam  Kumārasambhavam',
        },
        {
          heading: 'खण्डकाव्ये — The Two Lyrics',
          body: 'मेघदूतम् = "The Cloud Messenger" — 111 verses, a yakṣa sends a message via cloud\nऋतुसंहारः = "The Garland of Seasons" — 6 cantos describing the 6 Indian seasons',
          devanagari: 'मेघदूतम्  ऋतुसंहारः',
        },
      ],
      summary: 'Kālidāsa\'s seven works define classical Sanskrit literature. His hallmark is madhura (sweetness) and prasāda (lucidity).',
    },
    quiz: [
      { id: 'q-kw1', prompt: 'How many plays did Kālidāsa write?', options: ['Two', 'Three', 'Four', 'Five'], correctIndex: 1, explanation: 'Kālidāsa wrote three plays: Śakuntalā, Vikramorvaśīya, and Mālavikāgnimitra.', difficulty: 2 },
      { id: 'q-kw2', prompt: 'Which work is a lyric poem about a cloud messenger?', options: ['रघुवंशम्', 'कुमारसम्भवम्', 'मेघदूतम्', 'ऋतुसंहारः'], correctIndex: 2, explanation: 'मेघदूतम् (The Cloud Messenger) is a lyric poem of 111 verses.', difficulty: 1 },
    ],
  },

  // ═══ LEVEL 4: Sāṅkhya Philosophy (Undergrad) ═══
  {
    id: 'sankhya',
    title: 'साङ्ख्यम् — Enumeration Philosophy',
    subtitle: 'The 25 tattvas of Sāṅkhya dualism',
    level: 4, track: 'undergrad', govClassId: 'ba-3', duration: '25 min',
    unlockables: ['skill-philosophy'],
    content: {
      introduction: 'Sāṅkhya (the "enumeration" school), attributed to Kapila, is the oldest of the six orthodox systems. It provides a rigorous metaphysical dualism between puruṣa (consciousness) and prakṛti (matter).',
      sections: [
        {
          heading: 'The 25 Tattvas',
          body: '1. पुरुषः (Pure Consciousness)\n2. प्रकृतिः (Primordial Nature)\n3. महत् / बुद्धिः (Intellect)\n4. अहङ्कारः (Ego)\n5-9. पञ्च तन्मात्राणि (5 subtle elements): शब्द, स्पर्श, रूप, रस, गन्ध\n10-14. पञ्च महाभूतानि (5 gross elements): आकाश, वायु, अग्नि, आपः, पृथिवी\n15-19. पञ्च ज्ञानेन्द्रियाणि (5 sense organs)\n20-24. पञ्च कर्मेन्द्रियाणि (5 action organs)\n25. मनः (Mind)',
          devanagari: 'पुरुषः  प्रकृतिः  महत्  अहङ्कारः  तन्मात्राणि  महाभूतानि  ज्ञानेन्द्रियाणि  कर्मेन्द्रियाणि  मनः',
        },
        {
          heading: 'Dualism: Puruṣa vs Prakṛti',
          body: 'Puruṣa: pure consciousness, inactive, eternal, many.\nPrakṛti: unconscious but active, composed of three guṇas (sattva, rajas, tamas).\nLiberation = discerning the difference (viveka) between puruṣa and prakṛti.',
        },
        {
          heading: 'The Three Guṇas',
          body: 'सत्त्वम् = harmony, light, purity — rajas = activity, passion — तमः = inertia, darkness\nAll of prakṛti\'s evolutes are mixtures of these three strands.',
          devanagari: 'सत्त्वम्  रजः  तमः',
        },
      ],
      summary: 'Sāṅkhya enumeration provides the metaphysical framework adopted by Yoga and influenced Vedānta.',
    },
    quiz: [
      { id: 'q-sk1', prompt: 'How many tattvas does Sāṅkhya recognize?', options: ['16', '20', '24', '25'], correctIndex: 3, explanation: 'Sāṅkhya enumerates 25 tattvas: puruṣa + 24 evolutes of prakṛti.', difficulty: 3 },
    ],
  },

  // ═══ LEVEL 4: Yoga Sūtras (Undergrad) ═══
  {
    id: 'yoga-sutra',
    title: 'योगसूत्रम् — Patañjali\'s Yoga Sūtras',
    subtitle: 'The eight limbs (aṣṭāṅga) and the path to kaivalya',
    level: 4, track: 'undergrad', govClassId: 'ba-3', duration: '25 min',
    unlockables: ['skill-philosophy'],
    content: {
      introduction: 'The Yoga Sūtra of Patañjali (c. 400 CE) systematizes the practice of yoga in 195 sūtras divided into four pādas. It draws on Sāṅkhya metaphysics but adds īśvara (a special puruṣa).',
      sections: [
        {
          heading: 'अष्टाङ्गयोगः — The Eight Limbs',
          body: '1. यम (restraints: ahimsa, satya, asteya, brahmacarya, aparigraha)\n2. नियम (observances: śauca, santoṣa, tapas, svādhyāya, īśvarapraṇidhāna)\n3. आसन (posture)\n4. प्राणायाम (breath control)\n5. प्रत्याहार (sense withdrawal)\n6. धारणा (concentration)\n7. ध्यान (meditation)\n8. समाधि (absorption)',
          devanagari: 'यम  नियम  आसन  प्राणायाम  प्रत्याहार  धारणा  ध्यान  समाधिः',
        },
        {
          heading: 'The Four Pādas',
          body: 'समाधिपादः (On absorption) — defines yoga: योगश्चित्तवृत्तिनिरोधः\nसाधनपादः (On practice) — kriyāyoga and the eight limbs\nविभूतिपादः (On powers) — supernatural attainments (siddhis)\nकैवल्यपादः (On isolation) — final liberation of puruṣa',
          devanagari: 'योगश्चित्तवृत्तिनिरोधः',
          transliteration: 'yogaś cittavṛttinirodhaḥ',
          examples: [
            { text: 'योगश्चित्तवृत्तिनिरोधः', meaning: 'Yoga is the cessation of mental fluctuations (YS 1.2)' },
          ],
        },
      ],
      summary: 'Yoga Sūtra 1.2 defines the entire system: yoga is the stilling of the mind\'s modifications, leading to kaivalya.',
    },
    quiz: [
      { id: 'q-ys1', prompt: 'How many limbs does Patañjali\'s yoga have?', options: ['Six', 'Seven', 'Eight', 'Ten'], correctIndex: 2, explanation: 'Aṣṭāṅga yoga has eight limbs from yama to samādhi.', difficulty: 2 },
    ],
  },

  // ═══ LEVEL 4: Upanishads (Undergrad) ═══
  {
    id: 'upanishad',
    title: 'उपनिषदः — The Principal Upanishads',
    subtitle: 'The 12 major Upanishads and the Vedānta tradition',
    level: 4, track: 'undergrad', govClassId: 'ba-3', duration: '30 min',
    unlockables: ['skill-philosophy'],
    content: {
      introduction: 'The Upanishads (उपनिषदः) are the philosophical culmination of the Vedas. They teach the identity of ātman (individual self) and brahman (ultimate reality). The 12 principal Upanishads are the foundation of Vedānta.',
      sections: [
        {
          heading: 'The 12 Principal Upanishads',
          body: '1. ईश (Īśa) — 18 verses, the Self as Lord\n2. केन (Kena) — "By whom?" — the nature of Brahman\n3. कठ (Kaṭha) — Naciketas\' dialogue with Yama\n4. प्रश्न (Praśna) — 6 questions on meditation\n5. मुण्डक (Muṇḍaka) — two levels of knowledge\n6. माण्डूक्य (Māṇḍūkya) — the syllable OṂ\n7. ऐतरेय (Aitareya) — creation from the Self\n8. तैत्तिरीय (Taittirīya) — the five sheaths\n9. बृहदारण्यक (Bṛhadāraṇyaka) — the great forest teaching\n10. श्वेताश्वतर (Śvetāśvatara) — theistic Śaiva Upaniṣad\n11. छान्दोग्य (Chāndogya) — "You are that" (tat tvam asi)\n12. कौषीतकि (Kauṣītaki) — prāṇa and liberation',
          devanagari: 'ईश  केन  कठ  प्रश्न  मुण्डक  माण्डूक्य  ऐतरेय  तैत्तिरीय  बृहदारण्यक  श्वेताश्वतर  छान्दोग्य  कौषीतकि',
        },
        {
          heading: 'Mahāvākyas — The Great Sayings',
          body: 'अहं ब्रह्मास्मि (Aitareya) — "I am Brahman"\nतत्त्वमसि (Chāndogya) — "That you are"\nप्रज्ञानं ब्रह्म (Aitareya) — "Consciousness is Brahman"\nआत्मा ब्रह्म (Bṛhadāraṇyaka) — "The Self is Brahman"',
          devanagari: 'अहं ब्रह्मास्मि  तत्त्वमसि  प्रज्ञानं ब्रह्म  आत्मा ब्रह्म',
          transliteration: 'ahaṃ brahmāsmi  tat tvam asi  prajñānaṃ brahma  ātmā brahma',
        },
        {
          heading: 'Advaita Vedānta — Śaṅkara\'s Interpretation',
          body: 'Śaṅkara (c. 8th CE) founded Kevalādvaita (strict non-dualism).\nBrahman is sat-cit-ānanda (being-consciousness-bliss).\nThe world is mithyā (phenomenal appearance).\nLiberation (mokṣa) is realized through jñāna (knowledge) of the identity of ātman and brahman.',
        },
      ],
      summary: 'The Upanishads shift the focus from ritual to knowledge, establishing the core of Indian philosophy for the last 2,500 years.',
    },
    quiz: [
      { id: 'q-up1', prompt: 'Which Upaniṣad contains the teaching "tat tvam asi" (That you are)?', options: ['Kena', 'Kaṭha', 'Chāndogya', 'Bṛhadāraṇyaka'], correctIndex: 2, explanation: 'The Chāndogya Upaniṣad repeatedly teaches "tat tvam asi" — "That you are."', difficulty: 3 },
    ],
  },

  // ═══ LEVEL 5: Manuscript Studies (Graduate) ═══
  {
    id: 'manuscript-studies',
    title: 'हस्तलिखितशास्त्रम् — Manuscript Studies',
    subtitle: 'Codicology and manuscript cataloguing techniques',
    level: 5, track: 'graduate', govClassId: 'ma-2', duration: '35 min',
    unlockables: ['skill-paleography'],
    content: {
      introduction: 'Codicology (the study of manuscript books) examines the physical aspects: material, layout, script, and provenance. Accurate cataloguing is essential for textual scholarship.',
      sections: [
        {
          heading: 'Writing Materials',
          body: '1. ताडपत्रम् (palm leaf) — most common in South India; incised with a stylus, rubbed with ink\n2. त्वक् / भोजपत्रम् (birch bark) — used in Kashmir and the North; written with ink\n3. कागदम् (paper) — introduced from the 14th century onward\n4. धातुपत्रम् (metal plates) — copper plates for land grants and royal edicts',
          devanagari: 'ताडपत्रम्  भोजपत्रम्  कागदम्  धातुपत्रम्',
        },
        {
          heading: 'Codicological Description',
          body: 'A complete MS description includes: 1. Accession number 2. Script 3. Material 4. Dimensions 5. Number of folios 6. Lines per folio 7. Condition 8. Date/colophon 9. Scribe name 10. Provenance',
        },
        {
          heading: 'Cataloguing Systems',
          body: 'Descriptive catalogue: full transcription of incipit/explicit, colophon, and all key features.\nHandlist: brief entry for quick reference.\nUnion catalogue: aggregates holdings across multiple libraries.\nMajor projects: New Catalogus Catalogorum (Madras), AKU (Hamburg).',
        },
      ],
      summary: 'Systematic manuscript cataloguing preserves cultural heritage and provides the raw material for critical editions.',
    },
    quiz: [
      { id: 'q-ms1', prompt: 'Which material was most common for South Indian manuscripts?', options: ['Birch bark', 'Paper', 'Palm leaf', 'Metal'], correctIndex: 2, explanation: 'Palm leaf (tāḍapatra) was the primary material in South India.', difficulty: 3 },
    ],
  },

  // ═══ LEVEL 5: Lexicography (Graduate) ═══
  {
    id: 'lexicography',
    title: 'कोशविद्या — Sanskrit Lexicography',
    subtitle: 'Dictionaries, word studies, and semantic analysis',
    level: 5, track: 'graduate', govClassId: 'ma-1', duration: '30 min',
    unlockables: ['skill-critical-edition'],
    content: {
      introduction: 'Sanskrit lexicography has a 2,500-year tradition from ancient kośas to modern digital databases. A lexicographer analyzes meaning, usage, and etymology.',
      sections: [
        {
          heading: 'Traditional Kośas',
          body: 'अमरकोशः = Amarasimha\'s Thesaurus (c. 5th CE) — the most famous, with 10,000+ words in 3 kāṇḍas\nअनेकार्थकोशः = Dictionaries of homonyms\nनिघण्टुः = Vedic glossaries (the oldest, for the Vedas)',
          devanagari: 'अमरकोशः  निघण्टुः',
          examples: [
            { text: 'अमरकोशः', meaning: 'The immortal thesaurus — still used by every Sanskrit student' },
          ],
        },
        {
          heading: 'Modern Dictionaries',
          body: 'Monier-Williams Dictionary (1899) — 180,000 entries, the standard reference\nApte\'s Dictionary (1890) — practical with examples\nBöhtlingk & Roth (PW) — exhaustive, 7 volumes\nŚabdakalpadruma — encyclopedic Sanskrit-Sanskrit',
        },
        {
          heading: 'Digital Lexicography',
          body: 'Cologne Digital Sanskrit Dictionaries (Cologne University) — 30+ dictionaries online\nSanskrit-Hindi and Sanskrit-English digital corpuses\nOWC (Old Western Comparative) — historical-comparative tools',
        },
      ],
      summary: 'The transition from paper to digital lexicography has revolutionized Sanskrit word studies, enabling corpus-wide searches.',
    },
    quiz: [
      { id: 'q-lx1', prompt: 'Who wrote the most famous traditional thesaurus (Amarakośa)?', options: ['Patañjali', 'Amarasimha', 'Böhtlingk', 'Monier-Williams'], correctIndex: 1, explanation: 'Amarasimha composed the Amarakośa, the most famous Sanskrit thesaurus.', difficulty: 3 },
    ],
  },

  // ═══ LEVEL 6: Critical Edition Theory (PhD) ═══
  {
    id: 'critical-edition-theory',
    title: 'समालोचनसंस्करणसिद्धान्तः — Critical Edition Theory',
    subtitle: 'Lachmannian method vs. genealogical approaches',
    level: 6, track: 'phd', govClassId: 'mphil', duration: '60 min',
    unlockables: ['skill-phd-research'],
    content: {
      introduction: 'The theory behind critical editions has evolved from Karl Lachmann\'s 19th-century stemmatics to modern multi-dimensional genealogical methods and digital approaches.',
      sections: [
        {
          heading: 'Lachmannian Method',
          body: '1. Recensio: Gather all witnesses, classify by shared errors\n2. Examinatio: Construct the stemma (family tree)\n3. Emendatio: Correct obvious scribal errors\n4. Constitutio textus: Establish the text\nCritique: Assumes a single archetype and purely mechanical copying — rarely true in practice.',
        },
        {
          heading: 'Maas\'s Stemmatic Rules',
          body: 'Paul Maas (Textual Criticism, 1927):\n• Eliminatio codicum descriptorum: remove copies that are direct descendants of extant MSS\n• Error significativus (Ligature error): shared errors indicate relationship\n• Families are defined by common errors, not common correct readings',
          examples: [
            { text: 'Error coniunctivus', meaning: 'A shared error proving two MSS belong to the same family' },
            { text: 'Error separativus', meaning: 'An error showing a MS cannot be the ancestor of another' },
          ],
        },
        {
          heading: 'Modern Challenges',
          body: 'Contamination (horizontal transmission) — scribes used multiple exemplars\nOpen traditions — texts that evolve (e.g., the Mahābhārata)\nMulti-dimensional stemmatics — digital tools now allow phylogenetic analysis using computational methods',
        },
      ],
      summary: 'Critical edition theory has moved from rigid stemmatics to flexible, computer-assisted genealogical analysis.',
    },
    quiz: [
      { id: 'q-cet1', prompt: 'What is an "error coniunctivus"?', options: ['A random scribal error', 'A shared error indicating common ancestry', 'An error in the archetype', 'A conjectural emendation'], correctIndex: 1, explanation: 'An error coniunctivus (binding error) proves two manuscripts belong to the same family.', difficulty: 5 },
    ],
  },

  // ═══ LEVEL 6: Digital Humanities (PhD) ═══
  {
    id: 'digital-humanities',
    title: 'डिजिटलमानविकम् — Digital Sanskrit Humanities',
    subtitle: 'Corpus linguistics, TEI-XML, and digital tools',
    level: 6, track: 'phd', govClassId: 'phd', duration: '45 min',
    unlockables: ['skill-phd-research'],
    content: {
      introduction: 'Digital humanities applies computational methods to Sanskrit texts. This includes digital editions, automated analysis, and large-scale corpus research.',
      sections: [
        {
          heading: 'TEI-XML for Sanskrit',
          body: 'The Text Encoding Initiative (TEI) is the XML standard for digital editions.\nKey elements: <teiHeader> (metadata), <body> (text), <app> (apparatus variant readings)\nSanskrit-specific: @xml:lang="sa", <foreign> for non-Sanskrit terms',
        },
        {
          heading: 'Computational Sanskrit Tools',
          body: 'Sanskrit Heritage Engine (Paris) — morphological analysis and sandhi splitting\nDCS (Digital Corpus of Sanskrit) — 600,000+ sentences with lemmatization\nGRETIL — Göttingen Register of Electronic Texts\nSARIT — Search and Retrieval of Indian Texts',
        },
        {
          heading: 'Corpus Linguistics Methods',
          body: 'Lemmatization: mapping inflected forms to dictionary headwords\nPOS tagging: labelling parts of speech\nTreebanking: creating parse trees for syntax\nWord embedding: semantic vector analysis (e.g., word2vec for Sanskrit)',
        },
      ],
      summary: 'Digital tools have made vast Sanskrit corpora searchable and analyzable, enabling research questions impossible in the print era.',
    },
    quiz: [
      { id: 'q-dh1', prompt: 'Which XML standard is used for digital critical editions?', options: ['HTML', 'TEI-XML', 'JSON', 'YAML'], correctIndex: 1, explanation: 'TEI-XML (Text Encoding Initiative) is the standard for digital scholarly editions.', difficulty: 4 },
    ],
  },

  // ═══ LEVEL 6: Publication (PhD) ═══
  {
    id: 'publication',
    title: 'प्रकाशनम् — Scholarly Publication',
    subtitle: 'Journals, monographs, and peer review in Sanskrit studies',
    level: 6, track: 'phd', govClassId: 'phd', duration: '30 min',
    unlockables: ['skill-phd-research'],
    content: {
      introduction: 'Publishing research in Sanskrit studies requires knowledge of the major journals, monograph series, and the peer review process.',
      sections: [
        {
          heading: 'Major Journals',
          body: 'Journal of the American Oriental Society (JAOS) — since 1843\nWiener Zeitschrift für die Kunde Südasiens (WZKS)\nIndo-Iranian Journal\nJournal of Indian Philosophy\nBulletin d\'Études Indiennes\nAnnals of the Bhandarkar Oriental Research Institute (BORI)',
        },
        {
          heading: 'Monograph Series',
          body: 'Harvard Oriental Series (HOS) — critical editions and studies\nDelhi University Sanskrit Series\nKashi Sanskrit Series\nGaekwad\'s Oriental Series (GOS)\nDe Nobili Research Library (Vienna)',
        },
        {
          heading: 'Peer Review Process',
          body: '1. Abstract registration / pre-submission inquiry\n2. Double-blind peer review (usually 2-3 reviewers)\n3. Revise and resubmit (may involve 2-3 rounds)\n4. Proofreading and transliteration checking\n5. Publication (often 12-24 months after acceptance)',
        },
      ],
      summary: 'Publishing in reputable venues ensures scholarly impact and career advancement in Sanskrit academia.',
    },
    quiz: [
      { id: 'q-pub1', prompt: 'Which is the oldest continuously published journal in Sanskrit studies?', options: ['Indo-Iranian Journal', 'JAOS', 'WZKS', 'BORI Annals'], correctIndex: 1, explanation: 'JAOS (Journal of the American Oriental Society) has been publishing since 1843.', difficulty: 3 },
    ],
  },
  {
    id: 'avyayibhava',
    title: 'अव्ययीभावः — Indeclinable Compounds',
    subtitle: 'Adverbial compounds with a prior indeclinable',
    level: 3, track: 'undergrad', govClassId: 'class-9', duration: '20 min',
    unlockables: ['skill-compounds'],
    content: {
      introduction: 'Avyayībhāva (अव्ययीभाव) compounds have an indeclinable (avyaya) as the first member. The compound as a whole functions as an indeclinable adverb.',
      sections: [
        {
          heading: 'Structure & Meaning',
          body: 'Indeclinable + Noun → Adverbial indeclinable\nThe final noun loses its case ending; the whole compound is neuter nominative singular.\nExample: यथा + शक्ति = यथाशक्ति (according to ability)',
          devanagari: 'यथा + शक्ति = यथाशक्ति',
          examples: [
            { text: 'यथाशक्ति', meaning: 'according to one\'s ability' },
            { text: 'प्रतिदिनम्', meaning: 'daily (प्रति + दिनम्)' },
          ],
        },
        {
          heading: 'Common Prefixes',
          body: 'यथा (according to): यथान्यायम् (according to rule)\nप्रति (per/each): प्रतिदिनम् (daily), प्रतिवर्षम् (yearly)\nउप (near/along): उपग्रामम् (near the village)\nअनु (along/after): अनुकूलम् (favorable, lit. along the bank)\nसह (with): सहपरिवारम् (with family)',
          devanagari: 'यथान्यायम्  प्रतिदिनम्  उपग्रामम्  अनुकूलम्  सहपरिवारम्',
        },
        {
          heading: 'Nipātas as First Members',
          body: 'Many Avyayībhāva compounds use nipātas (particles):\nसाकम् (together): साकमध्वर्युभिः (together with the priests)\nविना (without): विनापराधम् (without offense)\nनिर् (without): नीरोगः (without disease)',
        },
      ],
      summary: 'Avyayībhāva compounds are easy to recognize: the first member is an indeclinable, and the compound acts as an adverb.',
    },
    quiz: [
      { id: 'q-avy1', prompt: 'What part of speech is an Avyayībhāva compound?', options: ['Noun', 'Verb', 'Indeclinable/Adverb', 'Adjective'], correctIndex: 2, explanation: 'Avyayībhāva compounds function as indeclinables (adverbs).', difficulty: 3 },
      { id: 'q-avy2', prompt: 'प्रतिदिनम् is which compound type?', options: ['Tatpuruṣa', 'Bahuvrīhi', 'Dvandva', 'Avyayībhāva'], correctIndex: 3, explanation: 'प्रति + दिनम् = प्रतिदिनम् — indeclinable prefix + noun = Avyayībhāva.', difficulty: 2 },
    ],
  },
  {
    id: 'relative-clauses',
    title: 'यच्छब्दाः — Relative Correlative Clauses',
    subtitle: 'Relative pronouns in correlative sentence structures',
    level: 2, track: 'teen', govClassId: 'class-8', duration: '25 min',
    unlockables: ['skill-syntax'],
    content: {
      introduction: 'Sanskrit uses a distinctive relative-correlative structure: य (who/which) in the first clause answers with त (that/he) in the main clause. This is one of Sanskrit\'s most characteristic syntactic patterns.',
      sections: [
        {
          heading: 'Basic Pattern',
          body: 'यः ... सः = "Who ... he"\nयः पठति सः जानाति = "Who reads, he knows"\nThe relative clause (यः) sets the condition; the correlative (सः) delivers the result.',
          devanagari: 'यः पठति सः जानाति',
          transliteration: 'yaḥ paṭhati saḥ jānāti',
          examples: [
            { text: 'यथा बीजं तथा वृक्षः', meaning: 'As the seed, so the tree' },
            { text: 'यदा रामः आगच्छति तदा सीता हसति', meaning: 'When Rāma comes, Sītā smiles' },
          ],
        },
        {
          heading: 'Relative Pronoun Forms',
          body: 'यः (masc. sg. nom.) — यौ (masc. dual) — ये (masc. pl.)\nया (fem. sg. nom.) — ये (fem. dual) — याः (fem. pl.)\nयत् (neut. sg. nom./acc.) — ये (neut. dual) — यानि (neut. pl.)\nCorrelative uses त- stems: सः, तौ, ते; सा, ते, ताः; तत्, ते, तानि',
        },
        {
          heading: 'Indefinite Relative',
          body: 'With चित्/चन added to the relative:\nयः कश्चित् = whoever\nयत् किञ्चित् = whatever\nयत्र क्वचित् = wherever\nयदा कदाचित् = whenever',
          devanagari: 'यः कश्चित्  यत् किञ्चित्  यत्र क्वचित्  यदा कदाचित्',
        },
      ],
      summary: 'The य-त correlative pair is the backbone of complex sentence formation in Sanskrit.',
    },
    quiz: [
      { id: 'q-rc1', prompt: 'In यः पठति सः जानाति, what does यः refer to?', options: ['The result', 'The relative clause subject', 'The object', 'The verb'], correctIndex: 1, explanation: 'यः is the relative pronoun introducing the subordinate clause "who reads."', difficulty: 2 },
      { id: 'q-rc2', prompt: 'Which correlative pairs with यदा?', options: ['तदा', 'तत्र', 'तथा', 'सः'], correctIndex: 0, explanation: 'यदा (when) pairs with तदा (then) in correlative structures.', difficulty: 2 },
    ],
  },
  {
    id: 'declensions-practice',
    title: 'विभक्त्यभ्यासः — Declension Practice',
    subtitle: 'Full paradigms and common patterns across all genders',
    level: 2, track: 'undergrad', govClassId: 'class-7', duration: '30 min',
    unlockables: ['skill-declensions'],
    content: {
      introduction: 'Mastering declensions requires practice with the three main stem types: a-stems (masc/neut), ā-stems (fem), and i-stems. Let\'s practice all cases systematically.',
      sections: [
        {
          heading: 'Masculine a-stem: बाल (boy)',
          body: 'Sg: बालः, बालम्, बालेन, बालाय, बालात्, बालस्य, बाले, हे बाल\nDu: बालौ, बालौ, बालाभ्याम्, बालाभ्याम्, बालाभ्याम्, बालयोः, बालयोः, हे बालौ\nPl: बालाः, बालान्, बालैः, बालेभ्यः, बालेभ्यः, बालानाम्, बालेषु, हे बालाः',
          devanagari: 'बालः  बालम्  बालेन  बालाय  बालात्  बालस्य  बाले',
          examples: [
            { text: 'बालः पठति', meaning: 'The boy reads' },
            { text: 'बालेन कृतम्', meaning: 'Done by the boy' },
          ],
        },
        {
          heading: 'Feminine ā-stem: बाला (girl)',
          body: 'Sg: बाला, बालाम्, बालया, बालायै, बालायाः, बालायाः, बालायाम्, हे बाले\nDu: बाले, बाले, बालाभ्याम्, बालाभ्याम्, बालाभ्याम्, बालयोः, बालयोः, हे बाले\nPl: बालाः, बालाः, बालाभिः, बालाभ्यः, बालाभ्यः, बालानाम्, बालासु, हे बालाः',
          devanagari: 'बाला  बालाम्  बालया  बालायै',
        },
        {
          heading: 'Neuter a-stem: फल (fruit)',
          body: 'Sg: फलम्, फलम्, फलेन, फलाय, फलात्, फलस्य, फले, हे फल\nDu: फले, फले, फलाभ्याम्, फलाभ्याम्, फलाभ्याम्, फलयोः, फलयोः, हे फले\nPl: फलानि, फलानि, फलैः, फलेभ्यः, फलेभ्यः, फलानाम्, फलेषु, हे फलानि\nNote: Neuter nom. and acc. are always identical in all numbers.',
        },
        {
          heading: 'i-stem: गिरि (mountain)',
          body: 'Sg: गिरिः, गिरिम्, गिरिणा, गिरये, गिरेः, गिरेः, गिरौ, हे गिरे\nPl: गिरयः, गिरीन्, गिरिभिः, गिरिभ्यः, गिरिभ्यः, गिरीणाम्, गिरिषु, हे गिरयः',
          devanagari: 'गिरिः  गिरिम्  गिरिणा  गिरये  गिरेः  गिरौ',
        },
      ],
      summary: 'Practice these four paradigms daily. Focus on the dative (चतुर्थी) and ablative (पञ्चमी) — they are the most commonly confused.',
    },
    quiz: [
      { id: 'q-dp1', prompt: 'What is the genitive plural of बाल?', options: ['बालस्य', 'बालानाम्', 'बालेभ्यः', 'बालायाः'], correctIndex: 1, explanation: 'बालानाम् = genitive plural of बाल (of the boys).', difficulty: 3 },
      { id: 'q-dp2', prompt: 'What is unique about neuter declensions?', options: ['They have no dual', 'Nom. and acc. are always identical', 'They lack the instrumental', 'They use only 3 cases'], correctIndex: 1, explanation: 'Neuter nouns have identical nominative and accusative forms in all three numbers.', difficulty: 2 },
    ],
  },
]

export const lessonHi: Record<string, { subtitleHi?: string; durationHi?: string }> = {
  'alphabet-vowels': { subtitleHi: 'देवनागरी के 13 स्वर सीखें', durationHi: '१५ मिनट' },
  'alphabet-consonants': { subtitleHi: 'उच्चारण-स्थान के अनुसार सभी 33 व्यंजन सीखें', durationHi: '२० मिनट' },
  'simple-words': { subtitleHi: 'प्रथम शब्द: परिवार, प्रकृति, शरीर के अंग', durationHi: '१५ मिनट' },
  'basic-sentences': { subtitleHi: 'सरल वाक्यों में कर्ता-कर्म-क्रिया', durationHi: '२० मिनट' },
  'declensions': { subtitleHi: 'तीन लिंगों में संज्ञा विभक्तियों में प्रवीण बनें', durationHi: '३० मिनट' },
  'sandhi-rules': { subtitleHi: 'ध्वनि-संयोजन के सुंदर नियम', durationHi: '३५ मिनट' },
  'compounds': { subtitleHi: 'शब्दों को संक्षिप्त रूपों में जोड़ने की कला', durationHi: '२५ मिनट' },
  'kalidasa': { subtitleHi: 'अभिज्ञानशाकुंतलम् के प्रथम छंद का विश्लेषण', durationHi: '३० मिनट' },
  'nyaya-intro': { subtitleHi: 'न्याय दर्शन की 16 श्रेणियाँ', durationHi: '३० मिनट' },
  'textual-criticism': { subtitleHi: 'पांडुलिपि-साक्ष्यों से समालोचनात्मक संस्करण स्थापित करना', durationHi: '४५ मिनट' },
  'paleography': { subtitleHi: 'प्राचीन देवनागरी और ग्रंथ लिपियाँ पढ़ना', durationHi: '४० मिनट' },
  'critical-edition': { subtitleHi: 'संसाधन सहित पूर्ण समालोचनात्मक संस्करण का निर्माण', durationHi: '६० मिनट' },
  'numbers-colors': { subtitleHi: 'संस्कृत में 1-10 गिनती और मूल रंगों के नाम', durationHi: '१० मिनट' },
  'everyday-vocab': { subtitleHi: 'अभिवादन, भोजन, दिशाएँ और समय के शब्द', durationHi: '१५ मिनट' },
  'verb-conjugation': { subtitleHi: 'वर्तमान, अन्यत् (अपूर्ण), भविष्यत् और परोक्ष (पूर्ण) काल', durationHi: '३५ मिनट' },
  'krdanta': { subtitleHi: 'कृत प्रत्ययों से धातु से संज्ञा-निर्माण', durationHi: '३० मिनट' },
  'taddhita': { subtitleHi: 'तद्धित प्रत्ययों से संज्ञा से संज्ञा-निर्माण', durationHi: '२५ मिनट' },
  'kalidasa-works': { subtitleHi: 'कालिदास की सभी सात प्रामाणिक कृतियों का परिचय', durationHi: '२० मिनट' },
  'sankhya': { subtitleHi: 'सांख्य द्वैतवाद के 25 तत्त्व', durationHi: '२५ मिनट' },
  'yoga-sutra': { subtitleHi: 'आठ अंग (अष्टांग) और कैवल्य का मार्ग', durationHi: '२५ मिनट' },
  'upanishad': { subtitleHi: '12 प्रमुख उपनिषद् और वेदांत परंपरा', durationHi: '३० मिनट' },
  'manuscript-studies': { subtitleHi: 'हस्तलिखित ग्रंथ-विज्ञान और पांडुलिपि सूचीकरण की तकनीकें', durationHi: '३५ मिनट' },
  'lexicography': { subtitleHi: 'शब्दकोश, शब्द-अध्ययन और अर्थ-विश्लेषण', durationHi: '३० मिनट' },
  'critical-edition-theory': { subtitleHi: 'लाचमानवादी विधि बनाम वंशावली-आधारित दृष्टिकोण', durationHi: '६० मिनट' },
  'digital-humanities': { subtitleHi: 'कोश-भाषाविज्ञान, TEI-XML और डिजिटल उपकरण', durationHi: '४५ मिनट' },
  'publication': { subtitleHi: 'संस्कृत अध्ययन में पत्रिकाएँ, शोध-मोनोग्राफ और सहकर्मी समीक्षा', durationHi: '३० मिनट' },
  'avyayibhava': { subtitleHi: 'पूर्व अव्यय सहित क्रिया-विशेषण समास', durationHi: '२० मिनट' },
  'relative-clauses': { subtitleHi: 'संबंधवाचक सर्वनाम और सापेक्ष वाक्य-रचना', durationHi: '२५ मिनट' },
  'declensions-practice': { subtitleHi: 'सभी लिंगों में पूर्ण रूप-तालिकाएँ और सामान्य प्रतिमान', durationHi: '३० मिनट' },
}