const lessons = [
  // ═══ LEVEL 0: Alphabet & Pronunciation (Child track) ═══
  {
    id: "alphabet-vowels",
    title: "\u0938\u094D\u0935\u0930\u093E\u0903 \u2014 The Vowels",
    subtitle: "Learn the 13 vowels of Devan\u0101gar\u012B",
    level: 0,
    track: "child",
    govClassId: "class-1-2",
    duration: "15 min",
    unlockables: ["skill-alphabet"],
    content: {
      introduction: "Sanskrit has 13 vowels called \u0938\u094D\u0935\u0930\u093E\u0903 (svar\u0101\u1E25). They are the foundation of all pronunciation.",
      sections: [
        {
          heading: "Simple Vowels",
          body: "\u0905 a \u2014 \u0906 \u0101 \u2014 \u0907 i \u2014 \u0908 \u012B \u2014 \u0909 u \u2014 \u090A \u016B \u2014 \u090B \u1E5B \u2014 \u0960 \u1E5D \u2014 \u090C \u1E37",
          devanagari: "\u0905 \u0906 \u0907 \u0908 \u0909 \u090A \u090B \u0960 \u090C",
          transliteration: "a \u0101 i \u012B u \u016B \u1E5B \u1E5D \u1E37",
          examples: [
            { text: "\u0905\u0917\u094D\u0928\u093F", meaning: "fire" },
            { text: "\u0907\u0928\u094D\u0926\u094D\u0930", meaning: "lord Indra" },
            { text: "\u0909\u0937\u093E", meaning: "dawn" }
          ]
        },
        {
          heading: "Diphthongs",
          body: "\u090F e \u2014 \u0910 ai \u2014 \u0913 o \u2014 \u0914 au \u2014 \u0905\u0902 \u1E43 \u2014 \u0905\u0903 \u1E25",
          devanagari: "\u090F \u0910 \u0913 \u0914 \u0905\u0902 \u0905\u0903",
          transliteration: "e ai o au a\u1E43 a\u1E25"
        }
      ],
      summary: "Practice making each sound. Open your mouth wide for \u0101, round your lips for u."
    },
    quiz: [
      { id: "q-v1", prompt: 'Which vowel is "\u0907"?', options: ["a", "\u0101", "i", "u"], correctIndex: 2, explanation: '\u0907 is the short i vowel, pronounced like in "sit".', difficulty: 1 },
      { id: "q-v2", prompt: "How many simple vowels does Sanskrit have?", options: ["5", "9", "13", "7"], correctIndex: 1, explanation: "Sanskrit has 9 simple vowels plus 4 diphthongs = 13 total.", difficulty: 1 },
      { id: "q-v3", prompt: "Match: \u0905 = ?", options: ["u", "a", "i", "e"], correctIndex: 1, explanation: "\u0905 is the short a vowel.", difficulty: 1 }
    ]
  },
  {
    id: "alphabet-consonants",
    title: "\u0935\u094D\u092F\u091E\u094D\u091C\u0928\u093E\u0928\u093F \u2014 The Consonants",
    subtitle: "Master all 33 consonants by place of articulation",
    level: 0,
    track: "child",
    govClassId: "class-1-2",
    duration: "20 min",
    unlockables: ["skill-alphabet"],
    content: {
      introduction: "Sanskrit organizes consonants by where in the mouth they are produced \u2014 from the throat to the lips.",
      sections: [
        {
          heading: "Ka\u1E47\u1E6Dhya \u2014 Gutturals (Throat)",
          body: "\u0915 ka \u2014 \u0916 kha \u2014 \u0917 ga \u2014 \u0918 gha \u2014 \u0919 \u1E45a",
          devanagari: "\u0915 \u0916 \u0917 \u0918 \u0919",
          transliteration: "ka kha ga gha \u1E45a"
        },
        {
          heading: "T\u0101lavya \u2014 Palatals (Palate)",
          body: "\u091A ca \u2014 \u091B cha \u2014 \u091C ja \u2014 \u091D jha \u2014 \u091E \xF1a",
          devanagari: "\u091A \u091B \u091C \u091D \u091E"
        },
        {
          heading: "M\u016Brdhanya \u2014 Retroflex",
          body: "\u091F \u1E6Da \u2014 \u0920 \u1E6Dha \u2014 \u0921 \u1E0Da \u2014 \u0922 \u1E0Dha \u2014 \u0923 \u1E47a",
          devanagari: "\u091F \u0920 \u0921 \u0922 \u0923"
        },
        {
          heading: "Dantya \u2014 Dentals (Teeth)",
          body: "\u0924 ta \u2014 \u0925 tha \u2014 \u0926 da \u2014 \u0927 dha \u2014 \u0928 na",
          devanagari: "\u0924 \u0925 \u0926 \u0927 \u0928"
        },
        {
          heading: "O\u1E63\u1E6Dhya \u2014 Labials (Lips)",
          body: "\u092A pa \u2014 \u092B pha \u2014 \u092C ba \u2014 \u092D bha \u2014 \u092E ma",
          devanagari: "\u092A \u092B \u092C \u092D \u092E"
        },
        {
          heading: "Anta\u1E25sth\u0101 \u2014 Semivowels",
          body: "\u092F ya \u2014 \u0930 ra \u2014 \u0932 la \u2014 \u0935 va",
          devanagari: "\u092F \u0930 \u0932 \u0935"
        },
        {
          heading: "\u016A\u1E63man \u2014 Sibilants & Aspirate",
          body: "\u0936 \u015Ba \u2014 \u0937 \u1E63a \u2014 \u0938 sa \u2014 \u0939 ha",
          devanagari: "\u0936 \u0937 \u0938 \u0939"
        }
      ],
      summary: "There are 5 groups \xD7 5 = 25, plus 4 semivowels and 4 sibilants = 33 consonants."
    },
    quiz: [
      { id: "q-c1", prompt: "\u0915 is which type?", options: ["Palatal", "Guttural", "Labial", "Dental"], correctIndex: 1, explanation: "\u0915 is \u0917uttural (ka\u1E47\u1E6Dhya) \u2014 from the throat.", difficulty: 1 },
      { id: "q-c2", prompt: "Which is the dental series?", options: ["\u0915 \u0916 \u0917 \u0918 \u0919", "\u091A \u091B \u091C \u091D \u091E", "\u0924 \u0925 \u0926 \u0927 \u0928", "\u092A \u092B \u092C \u092D \u092E"], correctIndex: 2, explanation: "\u0924 \u0925 \u0926 \u0927 \u0928 are the dental series \u2014 tongue touches the teeth.", difficulty: 2 }
    ]
  },
  // ═══ LEVEL 0: Simple words (Child) ═══
  {
    id: "simple-words",
    title: "\u0938\u0930\u0932\u0936\u092C\u094D\u0926\u093E\u0903 \u2014 Simple Words",
    subtitle: "First words: family, nature, body parts",
    level: 0,
    track: "child",
    govClassId: "class-1-2",
    duration: "15 min",
    unlockables: ["skill-vocab-basics"],
    content: {
      introduction: "Let's learn your first Sanskrit words! Repeat each word aloud.",
      sections: [
        {
          heading: "\u092A\u0930\u093F\u0935\u093E\u0930\u0903 \u2014 Family",
          body: "\u092E\u093E\u0924\u093E = mother, \u092A\u093F\u0924\u093E = father, \u092D\u094D\u0930\u093E\u0924\u093E = brother, \u0938\u094D\u0935\u0938\u093E = sister",
          devanagari: "\u092E\u093E\u0924\u093E \u092A\u093F\u0924\u093E \u092D\u094D\u0930\u093E\u0924\u093E \u0938\u094D\u0935\u0938\u093E",
          transliteration: "m\u0101t\u0101 pit\u0101 bhr\u0101t\u0101 svas\u0101"
        },
        {
          heading: "\u092A\u094D\u0930\u0915\u0943\u0924\u093F\u0903 \u2014 Nature",
          body: "\u0938\u0942\u0930\u094D\u092F\u0903 = sun, \u091A\u0928\u094D\u0926\u094D\u0930\u0903 = moon, \u091C\u0932\u092E\u094D = water, \u0905\u0917\u094D\u0928\u093F\u0903 = fire",
          devanagari: "\u0938\u0942\u0930\u094D\u092F\u0903 \u091A\u0928\u094D\u0926\u094D\u0930\u0903 \u091C\u0932\u092E\u094D \u0905\u0917\u094D\u0928\u093F\u0903"
        },
        {
          heading: "\u0936\u0930\u0940\u0930\u092E\u094D \u2014 Body",
          body: "\u092E\u0941\u0916\u092E\u094D = face, \u0928\u0947\u0924\u094D\u0930\u092E\u094D = eye, \u0915\u0930\u0903 = hand, \u092A\u093E\u0926\u0903 = foot",
          devanagari: "\u092E\u0941\u0916\u092E\u094D \u0928\u0947\u0924\u094D\u0930\u092E\u094D \u0915\u0930\u0903 \u092A\u093E\u0926\u0903"
        }
      ],
      summary: "Great! You know 12 basic Sanskrit words. Practice by pointing to objects and saying their Sanskrit names."
    },
    quiz: [
      { id: "q-sw1", prompt: 'What is "mother" in Sanskrit?', options: ["\u092A\u093F\u0924\u093E", "\u092E\u093E\u0924\u093E", "\u092D\u094D\u0930\u093E\u0924\u093E", "\u0938\u094D\u0935\u0938\u093E"], correctIndex: 1, explanation: "\u092E\u093E\u0924\u093E = mother.", difficulty: 1 },
      { id: "q-sw2", prompt: "\u091C\u0932\u092E\u094D means...?", options: ["Fire", "Sun", "Water", "Moon"], correctIndex: 2, explanation: "\u091C\u0932\u092E\u094D = water.", difficulty: 1 }
    ]
  },
  // ═══ LEVEL 1: Basic Sentences (Teen/Child) ═══
  {
    id: "basic-sentences",
    title: "\u0938\u0930\u0932\u0935\u093E\u0915\u094D\u092F\u093E\u0928\u093F \u2014 Basic Sentences",
    subtitle: "Subject-Object-Verb in simple sentences",
    level: 1,
    track: "teen",
    govClassId: "class-3-5",
    duration: "20 min",
    unlockables: ["skill-syntax"],
    content: {
      introduction: "Sanskrit word order is Subject-Object-Verb (SOV). Adjectives agree with nouns.",
      sections: [
        {
          heading: "Simple SOV Structure",
          body: "\u0930\u093E\u092E\u0903 \u092B\u0932\u0902 \u0916\u093E\u0926\u0924\u093F = R\u0101ma eats a fruit.\n\u0930\u093E\u092E\u0903 = subject (R\u0101ma), \u092B\u0932\u092E\u094D = object (fruit), \u0916\u093E\u0926\u0924\u093F = verb (eats)",
          devanagari: "\u0930\u093E\u092E\u0903 \u092B\u0932\u0902 \u0916\u093E\u0926\u0924\u093F",
          transliteration: "R\u0101ma\u1E25 phala\u1E43 kh\u0101dati",
          examples: [
            { text: "\u0938\u0940\u0924\u093E \u091C\u0932\u0902 \u092A\u093F\u092C\u0924\u093F", meaning: "S\u012Bt\u0101 drinks water" },
            { text: "\u092C\u093E\u0932\u0903 \u092A\u0941\u0938\u094D\u0924\u0915\u0902 \u092A\u0920\u0924\u093F", meaning: "The boy reads a book" }
          ]
        },
        {
          heading: "Adjective-Noun Agreement",
          body: "Adjectives match the noun in gender, number, case.\n\u092C\u093E\u0932\u0903 = boy (masc.), \u092C\u093E\u0932\u093E = girl (fem.)\n\u0938\u0941\u0928\u094D\u0926\u0930\u0903 \u092C\u093E\u0932\u0903 = beautiful boy\n\u0938\u0941\u0928\u094D\u0926\u0930\u0940 \u092C\u093E\u0932\u093E = beautiful girl",
          devanagari: "\u0938\u0941\u0928\u094D\u0926\u0930\u0903 \u092C\u093E\u0932\u0903 \u0964 \u0938\u0941\u0928\u094D\u0926\u0930\u0940 \u092C\u093E\u0932\u093E"
        }
      ],
      summary: "SOV order + adjective agreement are the foundation of all Sanskrit sentences."
    },
    quiz: [
      { id: "q-bs1", prompt: "What is the word order in Sanskrit?", options: ["SVO", "SOV", "VSO", "OSV"], correctIndex: 1, explanation: "Sanskrit follows Subject-Object-Verb order.", difficulty: 1 },
      { id: "q-bs2", prompt: "Translate: \u0930\u093E\u092E\u0903 \u092B\u0932\u0902 \u0916\u093E\u0926\u0924\u093F", options: ["R\u0101ma eats a fruit", "R\u0101ma drinks water", "Fruit eats R\u0101ma", "R\u0101ma is a fruit"], correctIndex: 0, explanation: "\u0930\u093E\u092E\u0903 (R\u0101ma) + \u092B\u0932\u092E\u094D (fruit) + \u0916\u093E\u0926\u0924\u093F (eats).", difficulty: 2 }
    ]
  },
  // ═══ LEVEL 2: Noun Declensions (Teen/Undergrad) ═══
  {
    id: "declensions",
    title: "\u0935\u093F\u092D\u0915\u094D\u0924\u092F\u0903 \u2014 The 8 Cases",
    subtitle: "Master noun declensions across 3 genders",
    level: 2,
    track: "undergrad",
    govClassId: "class-7",
    duration: "30 min",
    unlockables: ["skill-declensions"],
    content: {
      introduction: "Sanskrit nouns change form (decline) based on their grammatical role. There are 8 cases (vibhaktis) and 3 numbers (singular, dual, plural).",
      sections: [
        {
          heading: "The 8 Cases (\u0935\u093F\u092D\u0915\u094D\u0924\u092F\u0903)",
          body: "1. \u092A\u094D\u0930\u0925\u092E\u093E = Nominative (subject)\n2. \u0926\u094D\u0935\u093F\u0924\u0940\u092F\u093E = Accusative (object)\n3. \u0924\u0943\u0924\u0940\u092F\u093E = Instrumental (by/with)\n4. \u091A\u0924\u0941\u0930\u094D\u0925\u0940 = Dative (to/for)\n5. \u092A\u091E\u094D\u091A\u092E\u0940 = Ablative (from)\n6. \u0937\u0937\u094D\u0920\u0940 = Genitive (of)\n7. \u0938\u092A\u094D\u0924\u092E\u0940 = Locative (in/on)\n8. \u0938\u092E\u094D\u092C\u094B\u0927\u0928 = Vocative (O!)"
        },
        {
          heading: "\u0930\u093E\u092E \u2014 Masculine a-stem",
          body: "Singular: \u0930\u093E\u092E\u0903, \u0930\u093E\u092E\u092E\u094D, \u0930\u093E\u092E\u0947\u0923, \u0930\u093E\u092E\u093E\u092F, \u0930\u093E\u092E\u093E\u0924\u094D, \u0930\u093E\u092E\u0938\u094D\u092F, \u0930\u093E\u092E\u0947, \u0939\u0947 \u0930\u093E\u092E\nDual: \u0930\u093E\u092E\u094C, \u0930\u093E\u092E\u094C, \u0930\u093E\u092E\u093E\u092D\u094D\u092F\u093E\u092E\u094D, ...\nPlural: \u0930\u093E\u092E\u093E\u0903, \u0930\u093E\u092E\u093E\u0928\u094D, \u0930\u093E\u092E\u0948\u0903, ...",
          devanagari: "\u0930\u093E\u092E\u0903  \u0930\u093E\u092E\u092E\u094D  \u0930\u093E\u092E\u0947\u0923  \u0930\u093E\u092E\u093E\u092F  \u0930\u093E\u092E\u093E\u0924\u094D  \u0930\u093E\u092E\u0938\u094D\u092F  \u0930\u093E\u092E\u0947  \u0939\u0947 \u0930\u093E\u092E",
          transliteration: "r\u0101ma\u1E25  r\u0101mam  r\u0101me\u1E47a  r\u0101m\u0101ya  r\u0101m\u0101t  r\u0101masya  r\u0101me  he r\u0101ma"
        },
        {
          heading: "\u092B\u0932 \u2014 Neuter a-stem",
          body: "Nominative singular: \u092B\u0932\u092E\u094D (phalam)\nNominative plural: \u092B\u0932\u093E\u0928\u093F (phal\u0101ni)\nNote: Neuter nom./acc. are always identical.",
          devanagari: "\u092B\u0932\u092E\u094D  \u092B\u0932\u093E\u0928\u093F"
        },
        {
          heading: "\u092C\u093E\u0932\u093E \u2014 Feminine \u0101-stem",
          body: "Singular: \u092C\u093E\u0932\u093E, \u092C\u093E\u0932\u093E\u092E\u094D, \u092C\u093E\u0932\u092F\u093E, \u092C\u093E\u0932\u093E\u092F\u0948, \u092C\u093E\u0932\u093E\u092F\u093E\u0903, \u092C\u093E\u0932\u093E\u092F\u093E\u0903, \u092C\u093E\u0932\u093E\u092F\u093E\u092E\u094D, \u0939\u0947 \u092C\u093E\u0932\u0947",
          devanagari: "\u092C\u093E\u0932\u093E  \u092C\u093E\u0932\u093E\u092E\u094D  \u092C\u093E\u0932\u092F\u093E  \u092C\u093E\u0932\u093E\u092F\u0948"
        }
      ],
      summary: "Learn the paradigm of \u0930\u093E\u092E (masc.), \u092B\u0932 (neut.), and \u092C\u093E\u0932\u093E (fem.) to master the case system."
    },
    quiz: [
      { id: "q-d1", prompt: "How many cases does Sanskrit have?", options: ["6", "7", "8", "10"], correctIndex: 2, explanation: "Sanskrit has 8 cases (vibhaktis) plus the vocative.", difficulty: 1 },
      { id: "q-d2", prompt: "What is the instrumental singular of \u0930\u093E\u092E?", options: ["\u0930\u093E\u092E\u0947\u0923", "\u0930\u093E\u092E\u093E\u092F", "\u0930\u093E\u092E\u093E\u0924\u094D", "\u0930\u093E\u092E\u0938\u094D\u092F"], correctIndex: 0, explanation: "Instrumental (\u0924\u0943\u0924\u0940\u092F\u093E) singular of \u0930\u093E\u092E is \u0930\u093E\u092E\u0947\u0923.", difficulty: 3 },
      { id: "q-d3", prompt: "Neuter nominative plural ending?", options: ["-\u0906\u0903", "-\u0905\u092E\u094D", "-\u0906\u0928\u093F", "-\u090F"], correctIndex: 2, explanation: "Neuter a-stem nominative plural ends in -\u0906\u0928\u093F.", difficulty: 2 }
    ]
  },
  // ═══ LEVEL 3: Sandhi (Teen/Undergrad) ═══
  {
    id: "sandhi-rules",
    title: "\u0938\u0928\u094D\u0927\u093F\u0903 \u2014 Sound Merger Rules",
    subtitle: "The elegant rules of sound combination",
    level: 3,
    track: "undergrad",
    govClassId: "class-9",
    duration: "35 min",
    unlockables: ["skill-sandhi"],
    content: {
      introduction: "Sandhi is the joining of sounds across word boundaries. Sanskrit texts are written with sandhi applied, so you must learn to split and apply these rules.",
      sections: [
        {
          heading: "Gu\u1E47a Sandhi",
          body: "\u0905/\u0906 + \u0907/\u0908 \u2192 \u090F\n\u0905/\u0906 + \u0909/\u090A \u2192 \u0913\n\u0905/\u0906 + \u090B \u2192 \u0905\u0930\u094D\nExample: \u0926\u0947\u0935 + \u0907\u0928\u094D\u0926\u094D\u0930\u0903 = \u0926\u0947\u0935\u0947\u0928\u094D\u0926\u094D\u0930\u0903",
          devanagari: "\u0926\u0947\u0935 + \u0907\u0928\u094D\u0926\u094D\u0930\u0903 = \u0926\u0947\u0935\u0947\u0928\u094D\u0926\u094D\u0930\u0903",
          examples: [
            { text: "\u0930\u093E\u092E + \u0907\u091A\u094D\u091B\u0924\u093F", meaning: "\u0930\u093E\u092E\u0947\u091A\u094D\u091B\u0924\u093F (R\u0101ma desires)" },
            { text: "\u0939\u093F\u0924 + \u0909\u092A\u0926\u0947\u0936\u0903", meaning: "\u0939\u093F\u0924\u094B\u092A\u0926\u0947\u0936\u0903 (beneficial advice)" }
          ]
        },
        {
          heading: "V\u1E5Bddhi Sandhi",
          body: "\u0905/\u0906 + \u090F \u2192 \u0910\n\u0905/\u0906 + \u0913 \u2192 \u0914\nExample: \u0938\u0926\u093E + \u090F\u0935 = \u0938\u0926\u0948\u0935",
          devanagari: "\u0938\u0926\u093E + \u090F\u0935 = \u0938\u0926\u0948\u0935"
        },
        {
          heading: "Ya\u1E47 Sandhi",
          body: "\u0907/\u0908 + vowel \u2192 \u092F\u094D + vowel\n\u0909/\u090A + vowel \u2192 \u0935\u094D + vowel\nExample: \u0907\u0924\u093F + \u0906\u0939 = \u0907\u0924\u094D\u092F\u093E\u0939",
          devanagari: "\u0907\u0924\u093F + \u0906\u0939 = \u0907\u0924\u094D\u092F\u093E\u0939",
          examples: [
            { text: "\u0905\u0917\u094D\u0928\u093F + \u0907\u0935", meaning: "\u0905\u0917\u094D\u0928\u093F\u0930\u093F\u0935 (like fire)" }
          ]
        }
      ],
      summary: "The three main sandhi types \u2014 Gu\u1E47a, V\u1E5Bddhi, and Ya\u1E47 \u2014 cover 90% of cases in classical texts."
    },
    quiz: [
      { id: "q-s1", prompt: "\u0926\u0947\u0935 + \u0907\u0928\u094D\u0926\u094D\u0930\u0903 = ?", options: ["\u0926\u0935\u0947\u0928\u094D\u0926\u094D\u0930\u0903", "\u0926\u0947\u0935\u0947\u0928\u094D\u0926\u094D\u0930\u0903", "\u0926\u0947\u0935\u0948\u0928\u094D\u0926\u094D\u0930\u0903", "\u0926\u0947\u0935\u0940\u0928\u094D\u0926\u094D\u0930\u0903"], correctIndex: 1, explanation: "\u0905 + \u0907 = \u090F by Gu\u1E47a sandhi: \u0926\u0947\u0935\u0947\u0928\u094D\u0926\u094D\u0930\u0903.", difficulty: 3 },
      { id: "q-s2", prompt: "Which sandhi produces \u0910?", options: ["Gu\u1E47a", "V\u1E5Bddhi", "Ya\u1E47", "Ay\u0101di"], correctIndex: 1, explanation: "V\u1E5Bddhi sandhi: \u0905/\u0906 + \u090F \u2192 \u0910.", difficulty: 2 }
    ]
  },
  // ═══ LEVEL 3: Compounds (Samāsa) ═══
  {
    id: "compounds",
    title: "\u0938\u092E\u093E\u0938\u093E\u0903 \u2014 Compound Formation",
    subtitle: "The art of combining words into compact forms",
    level: 3,
    track: "teen",
    govClassId: "class-9",
    duration: "25 min",
    unlockables: ["skill-compounds"],
    content: {
      introduction: "Sanskrit loves compounds (sam\u0101sas). A single compound word can express what takes a full sentence in English.",
      sections: [
        {
          heading: "Tatpuru\u1E63a (Determinative)",
          body: "First part modifies the second (like an object/complement).\nExample: \u0930\u093E\u091C\u092A\u0941\u0930\u0941\u0937\u0903 = \u0930\u093E\u091C\u0928\u094D + \u092A\u0941\u0930\u0941\u0937\u0903 (king's man)",
          devanagari: "\u0930\u093E\u091C\u092A\u0941\u0930\u0941\u0937\u0903 = \u0930\u093E\u091C\u0928\u094D + \u092A\u0941\u0930\u0941\u0937\u0903"
        },
        {
          heading: "Bahuvr\u012Bhi (Exocentric)",
          body: "Refers to something outside the compound.\nExample: \u091A\u0915\u094D\u0930\u092A\u093E\u0923\u093F\u0903 = \u091A\u0915\u094D\u0930\u092E\u094D + \u092A\u093E\u0923\u093F\u0903 (having a discus in hand = Vi\u1E63\u1E47u)",
          devanagari: "\u091A\u0915\u094D\u0930\u092A\u093E\u0923\u093F\u0903"
        },
        {
          heading: "Dvandva (Copulative)",
          body: "Lists multiple items as a pair/group.\nExample: \u0930\u093E\u092E\u0915\u0943\u0937\u094D\u0923\u094C = R\u0101ma and K\u1E5B\u1E63\u1E47a",
          devanagari: "\u0930\u093E\u092E\u0915\u0943\u0937\u094D\u0923\u094C"
        }
      ],
      summary: "Tatpuru\u1E63a, Bahuvr\u012Bhi, and Dvandva are the three main compound types."
    },
    quiz: [
      { id: "q-comp1", prompt: "\u0930\u093E\u091C\u092A\u0941\u0930\u0941\u0937\u0903 is which type of compound?", options: ["Tatpuru\u1E63a", "Bahuvr\u012Bhi", "Dvandva", "Avyay\u012Bbh\u0101va"], correctIndex: 0, explanation: "\u0930\u093E\u091C\u092A\u0941\u0930\u0941\u0937\u0903 = \u0930\u093E\u091C\u0928\u094D + \u092A\u0941\u0930\u0941\u0937\u0903 is Tatpuru\u1E63a: the king's man.", difficulty: 3 }
    ]
  },
  // ═══ LEVEL 4: Classical Poetry (Undergrad) ═══
  {
    id: "kalidasa",
    title: "\u0915\u093E\u0932\u093F\u0926\u093E\u0938\u0903 \u2014 The Poet Laureate",
    subtitle: "Analyzing the first verse of Abhij\xF1\u0101na\u015B\u0101kuntalam",
    level: 4,
    track: "undergrad",
    govClassId: "ba-1",
    duration: "30 min",
    unlockables: ["skill-classical-texts"],
    content: {
      introduction: "K\u0101lid\u0101sa is the greatest Sanskrit poet. His play Abhij\xF1\u0101na\u015B\u0101kuntalam opens with a benedictory verse (n\u0101nd\u012B).",
      sections: [
        {
          heading: "Verse 1.1",
          body: "\u0906\u0938\u0940\u0926\u0941\u0926\u0928\u094D\u0924\u0941\u092E\u0942\u0932\u0947\u0937\u0941 \u0938\u091A\u0947\u0924\u093E\u0903 \u092A\u094D\u0930\u092D\u0935\u0903 \u0938\u094D\u0935\u092F\u092E\u094D \u0964 \u0935\u093F\u0927\u093E\u0924\u093E \u0924\u0938\u094D\u092F \u091A\u0947\u0924\u093E\u0902\u0938\u093F \u0935\u093F\u0927\u093F\u0928\u093E \u0935\u093F\u0927\u093F\u0928\u093E \u0926\u0927\u0947 \u0965",
          devanagari: "\u0906\u0938\u0940\u0926\u0941\u0926\u0928\u094D\u0924\u0941\u092E\u0942\u0932\u0947\u0937\u0941 \u0938\u091A\u0947\u0924\u093E\u0903 \u092A\u094D\u0930\u092D\u0935\u0903 \u0938\u094D\u0935\u092F\u092E\u094D \u0964 \u0935\u093F\u0927\u093E\u0924\u093E \u0924\u0938\u094D\u092F \u091A\u0947\u0924\u093E\u0902\u0938\u093F \u0935\u093F\u0927\u093F\u0928\u093E \u0935\u093F\u0927\u093F\u0928\u093E \u0926\u0927\u0947 \u0965",
          transliteration: "\u0101s\u012Bdudantum\u016Ble\u1E63u sacet\u0101\u1E25 prabhava\u1E25 svayam | vidh\u0101t\u0101 tasya cet\u0101\u1E43si vidhin\u0101 vidhin\u0101 dadhe ||",
          examples: [
            { text: "\u0906\u0938\u0940\u0924\u094D (\u0101s\u012Bt)", meaning: "was" },
            { text: "\u092A\u094D\u0930\u092D\u0935\u0903 (prabhava\u1E25)", meaning: "origins" }
          ]
        },
        {
          heading: "Metre: Anu\u1E63\u1E6Dubh",
          body: "8 syllables per quarter-verse (p\u0101da). Pattern: \u23D1\u23D1\u2212\u2212 \u23D1\u23D1\u2212\u2212 \u23D1\u23D1\u2212\u2212 \u23D1\u23D1\u2212\xD7\nThis is the most common Sanskrit metre."
        }
      ],
      summary: "K\u0101lid\u0101sa's style is marked by elegant simplicity (pras\u0101da gu\u1E47a). Every word carries precise meaning."
    },
    quiz: [
      { id: "q-kl1", prompt: "Which metre is the most common in Classical Sanskrit?", options: ["Tri\u1E63\u1E6Dubh", "Anu\u1E63\u1E6Dubh", "G\u0101yatr\u012B", "Jagat\u012B"], correctIndex: 1, explanation: "Anu\u1E63\u1E6Dubh (8 syllables/p\u0101da) is the most common metre.", difficulty: 2 }
    ]
  },
  // ═══ LEVEL 4: Philosophy (Undergrad) ═══
  {
    id: "nyaya-intro",
    title: "\u0928\u094D\u092F\u093E\u092F\u0903 \u2014 Introduction to Logic",
    subtitle: "The 16 categories of Ny\u0101ya philosophy",
    level: 4,
    track: "undergrad",
    govClassId: "ba-2",
    duration: "30 min",
    unlockables: ["skill-philosophy"],
    content: {
      introduction: 'Ny\u0101ya (lit. "method") is the school of logic and epistemology founded by Gautama Ak\u1E63ap\u0101da.',
      sections: [
        {
          heading: "The 16 Pad\u0101rthas",
          body: "1. \u092A\u094D\u0930\u092E\u093E\u0923 (means of knowledge)\n2. \u092A\u094D\u0930\u092E\u0947\u092F (objects of knowledge)\n3. \u0938\u0902\u0936\u092F (doubt)\n4. \u092A\u094D\u0930\u092F\u094B\u091C\u0928 (purpose)\n5. \u0926\u0943\u0937\u094D\u091F\u093E\u0928\u094D\u0924 (example)\n6. \u0938\u093F\u0926\u094D\u0927\u093E\u0928\u094D\u0924 (established doctrine)\n7. \u0905\u0935\u092F\u0935 (members of inference)\n8. \u0924\u0930\u094D\u0915 (hypothetical reasoning)\n9. \u0928\u093F\u0930\u094D\u0923\u092F (certainty)\n10. \u0935\u093E\u0926 (discussion)\n11. \u091C\u0932\u094D\u092A (wrangling)\n12. \u0935\u093F\u0924\u0923\u094D\u0921\u093E (cavil)\n13. \u0939\u0947\u0924\u094D\u0935\u093E\u092D\u093E\u0938 (fallacies)\n14. \u091B\u0932 (quibble)\n15. \u091C\u093E\u0924\u093F (analogous rejoinder)\n16. \u0928\u093F\u0917\u094D\u0930\u0939\u0938\u094D\u0925\u093E\u0928 (point of defeat)"
        },
        {
          heading: "Anum\u0101na \u2014 Inference",
          body: "The 5-membered syllogism:\n1. \u092A\u094D\u0930\u0924\u093F\u091C\u094D\u091E\u093E (thesis): The hill has fire\n2. \u0939\u0947\u0924\u0941 (reason): Because it has smoke\n3. \u0909\u0926\u093E\u0939\u0930\u0923 (example): Wherever smoke, there fire (e.g. kitchen)\n4. \u0909\u092A\u0928\u092F (application): This hill has smoke\n5. \u0928\u093F\u0917\u092E\u0928 (conclusion): Therefore it has fire"
        }
      ],
      summary: "Ny\u0101ya provides the logical framework for all later Indian philosophy."
    },
    quiz: [
      { id: "q-ny1", prompt: "How many categories (pad\u0101rthas) does Ny\u0101ya recognize?", options: ["12", "16", "20", "7"], correctIndex: 1, explanation: "Ny\u0101ya S\u016Btra 1.1.1 lists 16 pad\u0101rthas.", difficulty: 3 },
      { id: "q-ny2", prompt: "What is the third member of the Ny\u0101ya syllogism?", options: ["Pratij\xF1\u0101", "Hetu", "Ud\u0101hara\u1E47a", "Nigamana"], correctIndex: 2, explanation: "Ud\u0101hara\u1E47a (example) is the third member.", difficulty: 4 }
    ]
  },
  // ═══ LEVEL 5: Textual Criticism (Graduate) ═══
  {
    id: "textual-criticism",
    title: "\u092A\u093E\u0920\u0938\u092E\u093E\u0932\u094B\u091A\u0928\u092E\u094D \u2014 Textual Criticism",
    subtitle: "Establishing critical editions from manuscript witnesses",
    level: 5,
    track: "graduate",
    govClassId: "ma-1",
    duration: "45 min",
    unlockables: ["skill-critical-edition"],
    content: {
      introduction: "Textual criticism (p\u0101\u1E6Dhasam\u0101locanam) is the science of reconstructing the original text from multiple manuscript copies.",
      sections: [
        {
          heading: "Stemmatics (Stemma Codicum)",
          body: "A stemma is a family tree of manuscripts showing how copies relate.\n- Archetype (lost original)\n- Hyparchetypes (intermediate lost copies)\n- Witnesses (extant manuscripts)"
        },
        {
          heading: "Types of Variants",
          body: "1. \u0932\u0947\u0916\u0915\u092A\u094D\u0930\u092E\u093E\u0926\u093E\u0903 \u2014 Scribal errors (haplography, dittography, etc.)\n2. \u0938\u0902\u0936\u094B\u0927\u0915\u092A\u094D\u0930\u0915\u094D\u0937\u0947\u092A\u093E\u0903 \u2014 Conjectural emendations\n3. \u092A\u093E\u0920\u092D\u0947\u0926\u093E\u0903 \u2014 Genuine variant readings"
        },
        {
          heading: "Recension Method",
          body: "Step 1: Collate all witnesses\nStep 2: Classify by shared errors\nStep 3: Construct stemma\nStep 4: Reconstruct archetype\nStep 5: Apply emendation (conjecture) where needed"
        }
      ],
      summary: "A critical edition presents a reconstructed text with a critical apparatus documenting all variant readings."
    },
    quiz: [
      { id: "q-tc1", prompt: "What is a stemma?", options: ["A type of poem", "A family tree of MSS", "A commentary", "A grammatical rule"], correctIndex: 1, explanation: "A stemma shows the genealogical relationship between manuscripts.", difficulty: 4 }
    ]
  },
  // ═══ LEVEL 5: Paleography (Graduate) ═══
  {
    id: "paleography",
    title: "\u092A\u0941\u0930\u093E\u0932\u093F\u092A\u093F\u091C\u094D\u091E\u093E\u0928\u092E\u094D \u2014 Paleography",
    subtitle: "Reading ancient Devan\u0101gar\u012B and Grantha scripts",
    level: 5,
    track: "graduate",
    govClassId: "ma-2",
    duration: "40 min",
    unlockables: ["skill-paleography"],
    content: {
      introduction: "Paleography is the study of ancient handwriting. Sanskrit manuscripts are found in Devan\u0101gar\u012B and Grantha (South Indian) scripts.",
      sections: [
        {
          heading: "Devan\u0101gar\u012B Evolution",
          body: "Brahmi (3rd BCE) \u2192 Gupta (4-6 CE) \u2192 Siddham\u0101t\u1E5Bk\u0101 (7-8 CE) \u2192 N\u0101gar\u012B (9-10 CE) \u2192 Devan\u0101gar\u012B (11+ CE)"
        },
        {
          heading: "Grantha Script",
          body: "Used in Tamil Nadu and Kerala for Sanskrit manuscripts. Distinctive rounded shapes adapted to palm-leaf writing."
        },
        {
          heading: "Common Paleographical Challenges",
          body: "1. Confusion of \u0938\u092E (sa) and \u0935 (va) and \u092C (ba)\n2. Lack of word division in older MSS\n3. Abbreviations (like \u0907\u0924\u093F = \u0907\u0924\u093F)"
        }
      ],
      summary: "Reading manuscripts requires practice identifying letter shapes across centuries of scribal tradition."
    },
    quiz: [
      { id: "q-pal1", prompt: "Which script is primarily used for Sanskrit in South India?", options: ["Devan\u0101gar\u012B", "Grantha", "Br\u0101hm\u012B", "Kharo\u1E63\u1E6Dh\u012B"], correctIndex: 1, explanation: "Grantha is the South Indian script for Sanskrit.", difficulty: 3 }
    ]
  },
  // ═══ LEVEL 6: Critical Edition (PhD) ═══
  {
    id: "critical-edition",
    title: "\u0938\u092E\u093E\u0932\u094B\u091A\u0928\u0938\u0902\u0938\u094D\u0915\u0930\u0923\u092E\u094D \u2014 Critical Edition Preparation",
    subtitle: "Building a full critical edition with apparatus",
    level: 6,
    track: "phd",
    govClassId: "mphil",
    duration: "60 min",
    unlockables: ["skill-phd-research"],
    content: {
      introduction: "Preparing a critical edition is the highest form of text-historical scholarship. It requires paleography, textual criticism, and deep knowledge of the tradition.",
      sections: [
        {
          heading: "Critical Apparatus Format",
          body: "The apparatus (apparatus criticus) records every variant:\nSigla: A, B, C = manuscripts\n1a: \u0924\u0947 \u091A A B : \u0924\u0941 C D\n1b: \u092E\u092F\u093E A C : \u0924\u092F\u093E B D"
        },
        {
          heading: "Conjectural Emendation",
          body: "When all witnesses give a corrupt reading, the editor may emend (conjecture).\nPrinciple: lectio difficilior potior (the more difficult reading is preferable)"
        },
        {
          heading: "Digital Edition Standards",
          body: "XML-TEI is the modern standard. Each manuscript is encoded, with variant readings linked to the base text."
        }
      ],
      summary: "A PhD-level critical edition is the definitive scholarly resource for a text."
    },
    quiz: [
      { id: "q-ce1", prompt: 'What does "lectio difficilior potior" mean?', options: ["Easier reading is better", "The more difficult reading is preferable", "Always follow the oldest MS", "Never emend"], correctIndex: 1, explanation: "'The more difficult reading is the stronger' \u2014 scribes tend to simplify.", difficulty: 5 }
    ]
  },
  // ═══ LEVEL 0: Numbers & Colors (Child) ═══
  {
    id: "numbers-colors",
    title: "\u0938\u0919\u094D\u0916\u094D\u092F\u093E \u0930\u0919\u094D\u0917\u093E\u0903 \u091A \u2014 Numbers and Colors",
    subtitle: "Count 1-10 and name basic colors in Sanskrit",
    level: 0,
    track: "child",
    govClassId: "class-3-5",
    duration: "10 min",
    unlockables: ["skill-vocab-basics"],
    content: {
      introduction: "Numbers and colors are some of the first words children learn. Let's practice counting and naming colors in Sanskrit!",
      sections: [
        {
          heading: "\u0938\u0919\u094D\u0916\u094D\u092F\u093E\u0903 \u0967-\u0967\u0966 \u2014 Numbers 1-10",
          body: "\u0967 \u090F\u0915\u0903 (one), \u0968 \u0926\u094D\u0935\u094C (two), \u0969 \u0924\u094D\u0930\u092F\u0903 (three), \u096A \u091A\u0924\u094D\u0935\u093E\u0930\u0903 (four), \u096B \u092A\u091E\u094D\u091A (five), \u096C \u0937\u091F\u094D (six), \u096D \u0938\u092A\u094D\u0924 (seven), \u096E \u0905\u0937\u094D\u091F (eight), \u096F \u0928\u0935 (nine), \u0967\u0966 \u0926\u0936 (ten)",
          devanagari: "\u090F\u0915\u0903 \u0926\u094D\u0935\u094C \u0924\u094D\u0930\u092F\u0903 \u091A\u0924\u094D\u0935\u093E\u0930\u0903 \u092A\u091E\u094D\u091A \u0937\u091F\u094D \u0938\u092A\u094D\u0924 \u0905\u0937\u094D\u091F \u0928\u0935 \u0926\u0936",
          transliteration: "eka\u1E25 dvau traya\u1E25 catv\u0101ra\u1E25 pa\xF1ca \u1E63a\u1E6D sapta a\u1E63\u1E6Da nava da\u015Ba"
        },
        {
          heading: "\u0930\u0919\u094D\u0917\u093E\u0903 \u2014 Colors",
          body: "\u0932\u094B\u0939\u093F\u0924\u0903 = red, \u092A\u0940\u0924\u0903 = yellow, \u0928\u0940\u0932\u0903 = blue, \u0936\u094D\u0935\u0947\u0924\u0903 = white, \u0915\u0943\u0937\u094D\u0923\u0903 = black, \u0939\u0930\u093F\u0924\u0903 = green",
          devanagari: "\u0932\u094B\u0939\u093F\u0924\u0903 \u092A\u0940\u0924\u0903 \u0928\u0940\u0932\u0903 \u0936\u094D\u0935\u0947\u0924\u0903 \u0915\u0943\u0937\u094D\u0923\u0903 \u0939\u0930\u093F\u0924\u0903",
          transliteration: "lohita\u1E25 p\u012Bta\u1E25 n\u012Bla\u1E25 \u015Bveta\u1E25 k\u1E5B\u1E63\u1E47a\u1E25 harita\u1E25"
        }
      ],
      summary: "Practice counting objects around you in Sanskrit, and name their colors!"
    },
    quiz: [
      { id: "q-nc1", prompt: 'What is "five" in Sanskrit?', options: ["\u0938\u092A\u094D\u0924", "\u092A\u091E\u094D\u091A", "\u0926\u0936", "\u0928\u0935"], correctIndex: 1, explanation: "\u092A\u091E\u094D\u091A (pa\xF1ca) = five.", difficulty: 1 },
      { id: "q-nc2", prompt: "\u0928\u0940\u0932\u0903 means which color?", options: ["Red", "Yellow", "Blue", "Green"], correctIndex: 2, explanation: "\u0928\u0940\u0932\u0903 (n\u012Bla\u1E25) = blue.", difficulty: 1 }
    ]
  },
  // ═══ LEVEL 1: Everyday Vocabulary (Teen) ═══
  {
    id: "everyday-vocab",
    title: "\u0928\u093F\u0924\u094D\u092F\u0935\u094D\u092F\u0935\u0939\u093E\u0930\u0936\u092C\u094D\u0926\u093E\u0903 \u2014 Everyday Vocabulary",
    subtitle: "Greetings, food, directions, and time expressions",
    level: 1,
    track: "teen",
    govClassId: "class-6",
    duration: "15 min",
    unlockables: ["skill-vocab-basics"],
    content: {
      introduction: "Build practical Sanskrit vocabulary for daily conversations \u2014 greetings, ordering food, asking directions, and telling time.",
      sections: [
        {
          heading: "\u0905\u092D\u093F\u0935\u093E\u0926\u0928\u092E\u094D \u2014 Greetings",
          body: "\u0928\u092E\u0903 = greeting, \u0928\u092E\u0938\u094D\u0924\u0947 = hello to you, \u0938\u094D\u0935\u093E\u0917\u0924\u092E\u094D = welcome, \u0927\u0928\u094D\u092F\u0935\u093E\u0926\u0903 = thank you, \u092A\u0941\u0928\u0930\u094D\u0926\u0930\u094D\u0936\u0928\u093E\u092F = goodbye",
          devanagari: "\u0928\u092E\u0903  \u0928\u092E\u0938\u094D\u0924\u0947  \u0938\u094D\u0935\u093E\u0917\u0924\u092E\u094D  \u0927\u0928\u094D\u092F\u0935\u093E\u0926\u0903  \u092A\u0941\u0928\u0930\u094D\u0926\u0930\u094D\u0936\u0928\u093E\u092F",
          transliteration: "nama\u1E25 namaste sv\u0101gatam dhanyav\u0101da\u1E25 punardar\u015Ban\u0101ya"
        },
        {
          heading: "\u092D\u094B\u091C\u0928\u092E\u094D \u2014 Food",
          body: "\u0913\u0926\u0928\u092E\u094D = rice, \u0930\u094B\u091F\u093F\u0915\u093E = bread, \u0926\u0941\u0917\u094D\u0927\u092E\u094D = milk, \u091C\u0932\u092E\u094D = water, \u092B\u0932\u092E\u094D = fruit, \u0936\u093E\u0915\u092E\u094D = vegetable",
          devanagari: "\u0913\u0926\u0928\u092E\u094D  \u0930\u094B\u091F\u093F\u0915\u093E  \u0926\u0941\u0917\u094D\u0927\u092E\u094D  \u091C\u0932\u092E\u094D  \u092B\u0932\u092E\u094D  \u0936\u093E\u0915\u092E\u094D"
        },
        {
          heading: "\u0926\u093F\u0915\u094D \u2014 Directions",
          body: "\u0909\u0924\u094D\u0924\u0930\u092E\u094D = north, \u0926\u0915\u094D\u0937\u093F\u0923\u092E\u094D = south, \u092A\u0942\u0930\u094D\u0935\u092E\u094D = east, \u092A\u0936\u094D\u091A\u093F\u092E\u092E\u094D = west, \u0935\u093E\u092E\u0924\u0903 = left, \u0926\u0915\u094D\u0937\u093F\u0923\u0924\u0903 = right",
          devanagari: "\u0909\u0924\u094D\u0924\u0930\u092E\u094D  \u0926\u0915\u094D\u0937\u093F\u0923\u092E\u094D  \u092A\u0942\u0930\u094D\u0935\u092E\u094D  \u092A\u0936\u094D\u091A\u093F\u092E\u092E\u094D  \u0935\u093E\u092E\u0924\u0903  \u0926\u0915\u094D\u0937\u093F\u0923\u0924\u0903"
        },
        {
          heading: "\u0915\u093E\u0932\u0903 \u2014 Time",
          body: "\u0905\u0926\u094D\u092F = today, \u0936\u094D\u0935\u0903 = tomorrow, \u0939\u094D\u092F\u0903 = yesterday, \u092A\u094D\u0930\u093E\u0924\u0903 = morning, \u092E\u0927\u094D\u092F\u093E\u0939\u094D\u0928\u0903 = noon, \u0938\u093E\u092F\u092E\u094D = evening, \u0930\u093E\u0924\u094D\u0930\u093F\u0903 = night",
          devanagari: "\u0905\u0926\u094D\u092F  \u0936\u094D\u0935\u0903  \u0939\u094D\u092F\u0903  \u092A\u094D\u0930\u093E\u0924\u0903  \u092E\u0927\u094D\u092F\u093E\u0939\u094D\u0928\u0903  \u0938\u093E\u092F\u092E\u094D  \u0930\u093E\u0924\u094D\u0930\u093F\u0903",
          transliteration: "adya \u015Bva\u1E25 hya\u1E25 pr\u0101ta\u1E25 madhy\u0101hna\u1E25 s\u0101yam r\u0101tri\u1E25"
        }
      ],
      summary: "With these 20+ words you can handle basic everyday situations in Sanskrit."
    },
    quiz: [
      { id: "q-ev1", prompt: 'How do you say "thank you" in Sanskrit?', options: ["\u0928\u092E\u0938\u094D\u0924\u0947", "\u0927\u0928\u094D\u092F\u0935\u093E\u0926\u0903", "\u0938\u094D\u0935\u093E\u0917\u0924\u092E\u094D", "\u092A\u0941\u0928\u0930\u094D\u0926\u0930\u094D\u0936\u0928\u093E\u092F"], correctIndex: 1, explanation: "\u0927\u0928\u094D\u092F\u0935\u093E\u0926\u0903 (dhanyav\u0101da\u1E25) = thank you.", difficulty: 1 },
      { id: "q-ev2", prompt: 'Which word means "tomorrow"?', options: ["\u0905\u0926\u094D\u092F", "\u0939\u094D\u092F\u0903", "\u0936\u094D\u0935\u0903", "\u092A\u094D\u0930\u093E\u0924\u0903"], correctIndex: 2, explanation: "\u0936\u094D\u0935\u0903 (\u015Bva\u1E25) = tomorrow.", difficulty: 2 }
    ]
  },
  // ═══ LEVEL 2: Verb Conjugation (Teen) ═══
  {
    id: "verb-conjugation",
    title: "\u0915\u094D\u0930\u093F\u092F\u093E\u092A\u0926\u0930\u0942\u092A\u093E\u0923\u093F \u2014 Verb Conjugation",
    subtitle: "Present, imperfect, future, and perfect tenses",
    level: 2,
    track: "teen",
    govClassId: "class-8",
    duration: "35 min",
    unlockables: ["skill-conjugation"],
    content: {
      introduction: "Sanskrit verbs conjugate for person (1st, 2nd, 3rd), number (singular, dual, plural), tense, mood, and voice (active, middle, passive).",
      sections: [
        {
          heading: "\u0932\u091F\u094D \u2014 Present Tense (Vartam\u0101na)",
          body: '\u092A\u0920\u094D + \u0932\u091F\u094D \u2192 \u092A\u0920\u0924\u093F "reads"\nSingular: \u092A\u0920\u093E\u092E\u093F, \u092A\u0920\u0938\u093F, \u092A\u0920\u0924\u093F\nDual: \u092A\u0920\u093E\u0935\u0903, \u092A\u0920\u0925\u0903, \u092A\u0920\u0924\u0903\nPlural: \u092A\u0920\u093E\u092E\u0903, \u092A\u0920\u0925, \u092A\u0920\u0928\u094D\u0924\u093F',
          devanagari: "\u092A\u0920\u093E\u092E\u093F  \u092A\u0920\u0938\u093F  \u092A\u0920\u0924\u093F  \u092A\u0920\u093E\u0935\u0903  \u092A\u0920\u0925\u0903  \u092A\u0920\u0924\u0903  \u092A\u0920\u093E\u092E\u0903  \u092A\u0920\u0925  \u092A\u0920\u0928\u094D\u0924\u093F",
          transliteration: "pa\u1E6Dh\u0101mi pa\u1E6Dhasi pa\u1E6Dhati pa\u1E6Dh\u0101va\u1E25 pa\u1E6Dhatha\u1E25 pa\u1E6Dhata\u1E25 pa\u1E6Dh\u0101ma\u1E25 pa\u1E6Dhatha pa\u1E6Dhanti",
          examples: [
            { text: "\u0930\u093E\u092E\u0903 \u092A\u0920\u0924\u093F", meaning: "R\u0101ma reads" },
            { text: "\u0935\u092F\u0902 \u092A\u0920\u093E\u092E\u0903", meaning: "We read" }
          ]
        },
        {
          heading: "\u0932\u0919\u094D \u2014 Imperfect Tense (Anadyatana)",
          body: 'Past tense for actions completed "today but before now". Prefix \u0905- added.\n\u0905\u092A\u0920\u092E\u094D, \u0905\u092A\u0920\u0903, \u0905\u092A\u0920\u0924\u094D, \u0905\u092A\u0920\u093E\u0935, \u0905\u092A\u0920\u0924\u092E\u094D, \u0905\u092A\u0920\u0924\u093E\u092E\u094D, \u0905\u092A\u0920\u093E\u092E, \u0905\u092A\u0920\u0924, \u0905\u092A\u0920\u0928\u094D',
          devanagari: "\u0905\u092A\u0920\u092E\u094D  \u0905\u092A\u0920\u0903  \u0905\u092A\u0920\u0924\u094D  \u0905\u092A\u0920\u093E\u0935  \u0905\u092A\u0920\u0924\u092E\u094D  \u0905\u092A\u0920\u0924\u093E\u092E\u094D  \u0905\u092A\u0920\u093E\u092E  \u0905\u092A\u0920\u0924  \u0905\u092A\u0920\u0928\u094D"
        },
        {
          heading: "\u0932\u0943\u091F\u094D \u2014 Future Tense (Bhavi\u1E63yat)",
          body: "Add -\u0938\u094D\u092F- infix.\n\u092A\u0920\u093F\u0937\u094D\u092F\u093E\u092E\u093F, \u092A\u0920\u093F\u0937\u094D\u092F\u0938\u093F, \u092A\u0920\u093F\u0937\u094D\u092F\u0924\u093F\nExample: \u0936\u094D\u0935\u0903 \u092A\u0920\u093F\u0937\u094D\u092F\u093E\u092E\u093F = I will read tomorrow.",
          devanagari: "\u092A\u0920\u093F\u0937\u094D\u092F\u093E\u092E\u093F  \u092A\u0920\u093F\u0937\u094D\u092F\u0938\u093F  \u092A\u0920\u093F\u0937\u094D\u092F\u0924\u093F",
          examples: [
            { text: "\u0936\u094D\u0935\u0903 \u092A\u0920\u093F\u0937\u094D\u092F\u093E\u092E\u093F", meaning: "I will read tomorrow" }
          ]
        },
        {
          heading: "\u0932\u093F\u091F\u094D \u2014 Perfect Tense (Parok\u1E63a)",
          body: "Remote past (before today). Often reduplicates the root.\n\u092A\u0920\u094D \u2192 \u092A\u092A\u093E\u0920, \u092A\u092A\u0920\u0924\u0941\u0903, \u092A\u092A\u0920\u0941\u0903\n\u091C\u0928\u094D \u2192 \u091C\u091C\u094D\u091E\u0947 (to be born, middle voice)",
          devanagari: "\u092A\u092A\u093E\u0920  \u092A\u092A\u0920\u0924\u0941\u0903  \u092A\u092A\u0920\u0941\u0903"
        }
      ],
      summary: "The four main tenses \u2014 present, imperfect, future, perfect \u2014 cover past, present, and future time."
    },
    quiz: [
      { id: "q-vc1", prompt: "What is the 3rd person singular present of \u092A\u0920\u094D?", options: ["\u092A\u0920\u093E\u092E\u093F", "\u092A\u0920\u0938\u093F", "\u092A\u0920\u0924\u093F", "\u092A\u0920\u0928\u094D\u0924\u093F"], correctIndex: 2, explanation: "\u092A\u0920\u0924\u093F (pa\u1E6Dhati) = he/she reads, 3rd person singular present.", difficulty: 2 },
      { id: "q-vc2", prompt: "The imperfect tense uses which prefix?", options: ["\u0905-", "\u0938-", "\u0928\u093F-", "\u092A\u094D\u0930-"], correctIndex: 0, explanation: "\u0905- (a-) is the augment prefix for the imperfect tense.", difficulty: 3 }
    ]
  },
  // ═══ LEVEL 3: Kṛdanta (Undergrad) ═══
  {
    id: "krdanta",
    title: "\u0915\u0943\u0926\u0928\u094D\u0924\u093E\u0903 \u2014 Primary Derivatives",
    subtitle: "Forming nouns from roots with k\u1E5Bt suffixes",
    level: 3,
    track: "undergrad",
    govClassId: "class-10",
    duration: "30 min",
    unlockables: ["skill-grammar"],
    content: {
      introduction: "K\u1E5Bdanta (\u0915\u0943\u0926\u0928\u094D\u0924) are nouns derived directly from verbal roots using k\u1E5Bt suffixes. They are essential for understanding complex Sanskrit sentences.",
      sections: [
        {
          heading: "\u0915\u094D\u0924 \u2014 Past Passive Participle",
          body: "Root + \u0915\u094D\u0924 \u2192 -\u0924 or -\u0928 past participle.\n\u0915\u0943 \u2192 \u0915\u0943\u0924 (done), \u092D\u0942 \u2192 \u092D\u0942\u0924 (become), \u0917\u092E\u094D \u2192 \u0917\u0924 (gone), \u092A\u0920\u094D \u2192 \u092A\u0920\u093F\u0924 (read)\nCan be used adjectivally or as a finite verb in perfect passive constructions.",
          devanagari: "\u0915\u0943\u0924\u0903  \u092D\u0942\u0924\u0903  \u0917\u0924\u0903  \u092A\u0920\u093F\u0924\u0903",
          transliteration: "k\u1E5Bta\u1E25 bh\u016Bta\u1E25 gata\u1E25 pa\u1E6Dhita\u1E25",
          examples: [
            { text: "\u0924\u0947\u0928 \u092A\u0941\u0938\u094D\u0924\u0915\u0902 \u092A\u0920\u093F\u0924\u092E\u094D", meaning: "The book was read by him" },
            { text: "\u0917\u0924\u0902 \u0926\u0941\u0903\u0916\u0902 \u092E\u093E \u0936\u094B\u091A", meaning: "Do not grieve over past sorrow" }
          ]
        },
        {
          heading: "\u0915\u094D\u0924\u094D\u0935\u093E \u2014 Absolutive (Gerund)",
          body: "Root + \u0915\u094D\u0924\u094D\u0935\u093E \u2192 having done X\n\u0917\u092E\u094D + \u0915\u094D\u0924\u094D\u0935\u093E \u2192 \u0917\u0924\u094D\u0935\u093E (having gone)\n\u0915\u0943 + \u0915\u094D\u0924\u094D\u0935\u093E \u2192 \u0915\u0943\u0924\u094D\u0935\u093E (having done)\nFor compound roots: -\u0924\u094D\u0935\u093E after a simple root, -\u092F after a prefix.",
          devanagari: "\u0917\u0924\u094D\u0935\u093E  \u0915\u0943\u0924\u094D\u0935\u093E  \u0926\u0943\u0937\u094D\u091F\u094D\u0935\u093E  \u0936\u094D\u0930\u0941\u0924\u094D\u0935\u093E",
          examples: [
            { text: "\u0917\u0943\u0939\u0902 \u0917\u0924\u094D\u0935\u093E \u092D\u094B\u091C\u0928\u0902 \u0915\u0930\u094B\u0924\u093F", meaning: "Having gone home, he cooks food." }
          ]
        },
        {
          heading: "\u0924\u0935\u094D\u092F\u0924\u094D & \u0905\u0928\u0940\u092F\u0930\u094D \u2014 Gerundives (Obligatory Participles)",
          body: 'Expressing "should be" or "must be" done.\n\u0915\u0943 + \u0924\u0935\u094D\u092F\u0924\u094D \u2192 \u0915\u0930\u094D\u0924\u0935\u094D\u092F\u092E\u094D (should be done)\n\u092A\u0920\u094D + \u0905\u0928\u0940\u092F\u0930\u094D \u2192 \u092A\u0920\u0928\u0940\u092F\u092E\u094D (should be read)\n\u092A\u0936\u094D + \u0905\u0928\u0940\u092F\u0930\u094D \u2192 \u0926\u0930\u094D\u0936\u0928\u0940\u092F\u092E\u094D (worth seeing)',
          devanagari: "\u0915\u0930\u094D\u0924\u0935\u094D\u092F\u092E\u094D  \u092A\u0920\u0928\u0940\u092F\u092E\u094D  \u0926\u0930\u094D\u0936\u0928\u0940\u092F\u092E\u094D"
        }
      ],
      summary: "K\u1E5Bt suffixes transform roots into nouns, participles, and gerunds \u2014 a hallmark of Sanskrit's derivational power."
    },
    quiz: [
      { id: "q-krd1", prompt: "Which suffix forms the past passive participle?", options: ["\u0915\u094D\u0924\u094D\u0935\u093E", "\u0915\u094D\u0924", "\u0924\u0935\u094D\u092F\u0924\u094D", "\u0905\u0928\u0940\u092F\u0930\u094D"], correctIndex: 1, explanation: "\u0915\u094D\u0924 (ta) forms the past passive participle, e.g., \u0915\u0943\u0924 = done.", difficulty: 3 }
    ]
  },
  // ═══ LEVEL 3: Taddhita (Undergrad) ═══
  {
    id: "taddhita",
    title: "\u0924\u0926\u094D\u0927\u093F\u0924\u093E\u0903 \u2014 Secondary Derivatives",
    subtitle: "Forming nouns from nouns with taddhita suffixes",
    level: 3,
    track: "undergrad",
    govClassId: "class-10",
    duration: "25 min",
    unlockables: ["skill-grammar"],
    content: {
      introduction: "Taddhita (\u0924\u0926\u094D\u0927\u093F\u0924) suffixes are added to nouns and adjectives to form new words \u2014 patronymics, abstract nouns, possessives, and relational terms.",
      sections: [
        {
          heading: "\u0905\u0923\u094D/\u0905\u091E\u094D \u2014 Patronymics (Gotra Names)",
          body: "A family descendant name.\n\u0909\u092A\u0917\u0941 + \u0905\u0923\u094D \u2192 \u0914\u092A\u0917\u0935\u0903 (descendant of Upagu)\n\u0935\u0938\u093F\u0937\u094D\u0920 + \u0905\u0923\u094D \u2192 \u0935\u093E\u0938\u093F\u0937\u094D\u0920\u0903 (descendant of Vasi\u1E63\u1E6Dha)\nNote the v\u1E5Bddhi of the first syllable.",
          devanagari: "\u0914\u092A\u0917\u0935\u0903  \u0935\u093E\u0938\u093F\u0937\u094D\u0920\u0903"
        },
        {
          heading: "\u0905\u092A\u0924\u094D\u092F\u093E\u0930\u094D\u0925\u0947 \u2014 Offspring Suffixes",
          body: "\u0907\u091E\u094D \u2192 \u0926\u093E\u0915\u094D\u0937\u093F\u0903 (son of Dak\u1E63a)\n\u092F\u091E\u094D \u2192 \u0917\u093E\u0930\u094D\u0917\u094D\u092F\u0903 (descendant of Garga)\n\u0920\u0915\u094D \u2192 \u0915\u094C\u091F\u094D\u0938\u094D\u092F\u0903 (descendant of Kutsa)"
        },
        {
          heading: "\u092D\u093E\u0935\u0947 \u2014 Abstract Nouns",
          body: "\u0924\u094D\u0935 \u2192 \u0926\u0947\u0935\u0924\u094D\u0935\u092E\u094D (divinity), \u092E\u0928\u0941\u0937\u094D\u092F\u0924\u094D\u0935\u092E\u094D (humanity)\n\u0924\u093E \u2192 \u092C\u094D\u0930\u093E\u0939\u094D\u092E\u0923\u0924\u093E (brahminhood), \u0938\u0941\u0928\u094D\u0926\u0930\u0924\u093E (beauty)\n\u0907\u092E\u0928\u094D \u2192 \u092E\u0939\u093F\u092E\u093E (greatness), \u0932\u0918\u093F\u092E\u093E (lightness)",
          devanagari: "\u0926\u0947\u0935\u0924\u094D\u0935\u092E\u094D  \u092C\u094D\u0930\u093E\u0939\u094D\u092E\u0923\u0924\u093E  \u092E\u0939\u093F\u092E\u093E",
          transliteration: "devatvam br\u0101hma\u1E47at\u0101 mahim\u0101",
          examples: [
            { text: "\u0926\u0947\u0935\u0924\u094D\u0935\u092E\u094D", meaning: "divinity" },
            { text: "\u0938\u0941\u0928\u094D\u0926\u0930\u0924\u093E", meaning: "beauty" }
          ]
        }
      ],
      summary: "Taddhita derivation shows how Sanskrit creates specialized vocabulary from common nouns, enriching its lexical flexibility."
    },
    quiz: [
      { id: "q-td1", prompt: "What kind of noun does -\u0924\u094D\u0935 (-tva) form?", options: ["Patronymic", "Abstract", "Possessive", "Comparative"], correctIndex: 1, explanation: "-\u0924\u094D\u0935 (-tva) forms abstract nouns like \u0926\u0947\u0935\u0924\u094D\u0935\u092E\u094D (divinity).", difficulty: 3 }
    ]
  },
  // ═══ LEVEL 4: Kālidāsa Works (Undergrad) ═══
  {
    id: "kalidasa-works",
    title: "\u0915\u093E\u0932\u093F\u0926\u093E\u0938\u092A\u094D\u0930\u0923\u0940\u0924\u0917\u094D\u0930\u0928\u094D\u0925\u093E\u0903 \u2014 K\u0101lid\u0101sa's Complete Works",
    subtitle: "An overview of all seven authentic works",
    level: 4,
    track: "undergrad",
    govClassId: "ba-1",
    duration: "20 min",
    unlockables: ["skill-classical-texts"],
    content: {
      introduction: 'K\u0101lid\u0101sa, the "Shakespeare of India," wrote three plays, two epic poems (mah\u0101k\u0101vyas), and two lyric poems (kha\u1E47\u1E0Dak\u0101vyas). Seven works are universally accepted as authentic.',
      sections: [
        {
          heading: "\u0928\u093E\u091F\u0915\u093E\u0928\u093F \u2014 The Three Plays",
          body: "\u0905\u092D\u093F\u091C\u094D\u091E\u093E\u0928\u0936\u093E\u0915\u0941\u0928\u094D\u0924\u0932\u092E\u094D = The Recognition of \u015Aakuntal\u0101 \u2014 his masterpiece\n\u0935\u093F\u0915\u094D\u0930\u092E\u094B\u0930\u094D\u0935\u0936\u0940\u092F\u092E\u094D = The Hero and the Nymph\n\u092E\u093E\u0932\u0935\u093F\u0915\u093E\u0917\u094D\u0928\u093F\u092E\u093F\u0924\u094D\u0930\u092E\u094D = M\u0101lavik\u0101 and Agnimitra",
          devanagari: "\u0905\u092D\u093F\u091C\u094D\u091E\u093E\u0928\u0936\u093E\u0915\u0941\u0928\u094D\u0924\u0932\u092E\u094D  \u0935\u093F\u0915\u094D\u0930\u092E\u094B\u0930\u094D\u0935\u0936\u0940\u092F\u092E\u094D  \u092E\u093E\u0932\u0935\u093F\u0915\u093E\u0917\u094D\u0928\u093F\u092E\u093F\u0924\u094D\u0930\u092E\u094D",
          examples: [
            { text: "\u0905\u092D\u093F\u091C\u094D\u091E\u093E\u0928\u0936\u093E\u0915\u0941\u0928\u094D\u0924\u0932\u092E\u094D", meaning: "The Recognition of \u015Aakuntal\u0101 \u2014 Act IV is famed for its pathos" }
          ]
        },
        {
          heading: "\u092E\u0939\u093E\u0915\u093E\u0935\u094D\u092F\u0947 \u2014 The Two Epics",
          body: `\u0930\u0918\u0941\u0935\u0902\u0936\u092E\u094D = "The Dynasty of Raghu" \u2014 19 cantos on the Solar dynasty
\u0915\u0941\u092E\u093E\u0930\u0938\u092E\u094D\u092D\u0935\u092E\u094D = "The Birth of Kum\u0101ra" \u2014 17 cantos on \u015Aiva and P\u0101rvat\u012B's marriage`,
          devanagari: "\u0930\u0918\u0941\u0935\u0902\u0936\u092E\u094D  \u0915\u0941\u092E\u093E\u0930\u0938\u092E\u094D\u092D\u0935\u092E\u094D",
          transliteration: "Raghuva\u1E43\u015Bam  Kum\u0101rasambhavam"
        },
        {
          heading: "\u0916\u0923\u094D\u0921\u0915\u093E\u0935\u094D\u092F\u0947 \u2014 The Two Lyrics",
          body: '\u092E\u0947\u0918\u0926\u0942\u0924\u092E\u094D = "The Cloud Messenger" \u2014 111 verses, a yak\u1E63a sends a message via cloud\n\u090B\u0924\u0941\u0938\u0902\u0939\u093E\u0930\u0903 = "The Garland of Seasons" \u2014 6 cantos describing the 6 Indian seasons',
          devanagari: "\u092E\u0947\u0918\u0926\u0942\u0924\u092E\u094D  \u090B\u0924\u0941\u0938\u0902\u0939\u093E\u0930\u0903"
        }
      ],
      summary: "K\u0101lid\u0101sa's seven works define classical Sanskrit literature. His hallmark is madhura (sweetness) and pras\u0101da (lucidity)."
    },
    quiz: [
      { id: "q-kw1", prompt: "How many plays did K\u0101lid\u0101sa write?", options: ["Two", "Three", "Four", "Five"], correctIndex: 1, explanation: "K\u0101lid\u0101sa wrote three plays: \u015Aakuntal\u0101, Vikramorva\u015B\u012Bya, and M\u0101lavik\u0101gnimitra.", difficulty: 2 },
      { id: "q-kw2", prompt: "Which work is a lyric poem about a cloud messenger?", options: ["\u0930\u0918\u0941\u0935\u0902\u0936\u092E\u094D", "\u0915\u0941\u092E\u093E\u0930\u0938\u092E\u094D\u092D\u0935\u092E\u094D", "\u092E\u0947\u0918\u0926\u0942\u0924\u092E\u094D", "\u090B\u0924\u0941\u0938\u0902\u0939\u093E\u0930\u0903"], correctIndex: 2, explanation: "\u092E\u0947\u0918\u0926\u0942\u0924\u092E\u094D (The Cloud Messenger) is a lyric poem of 111 verses.", difficulty: 1 }
    ]
  },
  // ═══ LEVEL 4: Sāṅkhya Philosophy (Undergrad) ═══
  {
    id: "sankhya",
    title: "\u0938\u093E\u0919\u094D\u0916\u094D\u092F\u092E\u094D \u2014 Enumeration Philosophy",
    subtitle: "The 25 tattvas of S\u0101\u1E45khya dualism",
    level: 4,
    track: "undergrad",
    govClassId: "ba-3",
    duration: "25 min",
    unlockables: ["skill-philosophy"],
    content: {
      introduction: 'S\u0101\u1E45khya (the "enumeration" school), attributed to Kapila, is the oldest of the six orthodox systems. It provides a rigorous metaphysical dualism between puru\u1E63a (consciousness) and prak\u1E5Bti (matter).',
      sections: [
        {
          heading: "The 25 Tattvas",
          body: "1. \u092A\u0941\u0930\u0941\u0937\u0903 (Pure Consciousness)\n2. \u092A\u094D\u0930\u0915\u0943\u0924\u093F\u0903 (Primordial Nature)\n3. \u092E\u0939\u0924\u094D / \u092C\u0941\u0926\u094D\u0927\u093F\u0903 (Intellect)\n4. \u0905\u0939\u0919\u094D\u0915\u093E\u0930\u0903 (Ego)\n5-9. \u092A\u091E\u094D\u091A \u0924\u0928\u094D\u092E\u093E\u0924\u094D\u0930\u093E\u0923\u093F (5 subtle elements): \u0936\u092C\u094D\u0926, \u0938\u094D\u092A\u0930\u094D\u0936, \u0930\u0942\u092A, \u0930\u0938, \u0917\u0928\u094D\u0927\n10-14. \u092A\u091E\u094D\u091A \u092E\u0939\u093E\u092D\u0942\u0924\u093E\u0928\u093F (5 gross elements): \u0906\u0915\u093E\u0936, \u0935\u093E\u092F\u0941, \u0905\u0917\u094D\u0928\u093F, \u0906\u092A\u0903, \u092A\u0943\u0925\u093F\u0935\u0940\n15-19. \u092A\u091E\u094D\u091A \u091C\u094D\u091E\u093E\u0928\u0947\u0928\u094D\u0926\u094D\u0930\u093F\u092F\u093E\u0923\u093F (5 sense organs)\n20-24. \u092A\u091E\u094D\u091A \u0915\u0930\u094D\u092E\u0947\u0928\u094D\u0926\u094D\u0930\u093F\u092F\u093E\u0923\u093F (5 action organs)\n25. \u092E\u0928\u0903 (Mind)",
          devanagari: "\u092A\u0941\u0930\u0941\u0937\u0903  \u092A\u094D\u0930\u0915\u0943\u0924\u093F\u0903  \u092E\u0939\u0924\u094D  \u0905\u0939\u0919\u094D\u0915\u093E\u0930\u0903  \u0924\u0928\u094D\u092E\u093E\u0924\u094D\u0930\u093E\u0923\u093F  \u092E\u0939\u093E\u092D\u0942\u0924\u093E\u0928\u093F  \u091C\u094D\u091E\u093E\u0928\u0947\u0928\u094D\u0926\u094D\u0930\u093F\u092F\u093E\u0923\u093F  \u0915\u0930\u094D\u092E\u0947\u0928\u094D\u0926\u094D\u0930\u093F\u092F\u093E\u0923\u093F  \u092E\u0928\u0903"
        },
        {
          heading: "Dualism: Puru\u1E63a vs Prak\u1E5Bti",
          body: "Puru\u1E63a: pure consciousness, inactive, eternal, many.\nPrak\u1E5Bti: unconscious but active, composed of three gu\u1E47as (sattva, rajas, tamas).\nLiberation = discerning the difference (viveka) between puru\u1E63a and prak\u1E5Bti."
        },
        {
          heading: "The Three Gu\u1E47as",
          body: "\u0938\u0924\u094D\u0924\u094D\u0935\u092E\u094D = harmony, light, purity \u2014 rajas = activity, passion \u2014 \u0924\u092E\u0903 = inertia, darkness\nAll of prak\u1E5Bti's evolutes are mixtures of these three strands.",
          devanagari: "\u0938\u0924\u094D\u0924\u094D\u0935\u092E\u094D  \u0930\u091C\u0903  \u0924\u092E\u0903"
        }
      ],
      summary: "S\u0101\u1E45khya enumeration provides the metaphysical framework adopted by Yoga and influenced Ved\u0101nta."
    },
    quiz: [
      { id: "q-sk1", prompt: "How many tattvas does S\u0101\u1E45khya recognize?", options: ["16", "20", "24", "25"], correctIndex: 3, explanation: "S\u0101\u1E45khya enumerates 25 tattvas: puru\u1E63a + 24 evolutes of prak\u1E5Bti.", difficulty: 3 }
    ]
  },
  // ═══ LEVEL 4: Yoga Sūtras (Undergrad) ═══
  {
    id: "yoga-sutra",
    title: "\u092F\u094B\u0917\u0938\u0942\u0924\u094D\u0930\u092E\u094D \u2014 Pata\xF1jali's Yoga S\u016Btras",
    subtitle: "The eight limbs (a\u1E63\u1E6D\u0101\u1E45ga) and the path to kaivalya",
    level: 4,
    track: "undergrad",
    govClassId: "ba-3",
    duration: "25 min",
    unlockables: ["skill-philosophy"],
    content: {
      introduction: "The Yoga S\u016Btra of Pata\xF1jali (c. 400 CE) systematizes the practice of yoga in 195 s\u016Btras divided into four p\u0101das. It draws on S\u0101\u1E45khya metaphysics but adds \u012B\u015Bvara (a special puru\u1E63a).",
      sections: [
        {
          heading: "\u0905\u0937\u094D\u091F\u093E\u0919\u094D\u0917\u092F\u094B\u0917\u0903 \u2014 The Eight Limbs",
          body: "1. \u092F\u092E (restraints: ahimsa, satya, asteya, brahmacarya, aparigraha)\n2. \u0928\u093F\u092F\u092E (observances: \u015Bauca, santo\u1E63a, tapas, sv\u0101dhy\u0101ya, \u012B\u015Bvarapra\u1E47idh\u0101na)\n3. \u0906\u0938\u0928 (posture)\n4. \u092A\u094D\u0930\u093E\u0923\u093E\u092F\u093E\u092E (breath control)\n5. \u092A\u094D\u0930\u0924\u094D\u092F\u093E\u0939\u093E\u0930 (sense withdrawal)\n6. \u0927\u093E\u0930\u0923\u093E (concentration)\n7. \u0927\u094D\u092F\u093E\u0928 (meditation)\n8. \u0938\u092E\u093E\u0927\u093F (absorption)",
          devanagari: "\u092F\u092E  \u0928\u093F\u092F\u092E  \u0906\u0938\u0928  \u092A\u094D\u0930\u093E\u0923\u093E\u092F\u093E\u092E  \u092A\u094D\u0930\u0924\u094D\u092F\u093E\u0939\u093E\u0930  \u0927\u093E\u0930\u0923\u093E  \u0927\u094D\u092F\u093E\u0928  \u0938\u092E\u093E\u0927\u093F\u0903"
        },
        {
          heading: "The Four P\u0101das",
          body: "\u0938\u092E\u093E\u0927\u093F\u092A\u093E\u0926\u0903 (On absorption) \u2014 defines yoga: \u092F\u094B\u0917\u0936\u094D\u091A\u093F\u0924\u094D\u0924\u0935\u0943\u0924\u094D\u0924\u093F\u0928\u093F\u0930\u094B\u0927\u0903\n\u0938\u093E\u0927\u0928\u092A\u093E\u0926\u0903 (On practice) \u2014 kriy\u0101yoga and the eight limbs\n\u0935\u093F\u092D\u0942\u0924\u093F\u092A\u093E\u0926\u0903 (On powers) \u2014 supernatural attainments (siddhis)\n\u0915\u0948\u0935\u0932\u094D\u092F\u092A\u093E\u0926\u0903 (On isolation) \u2014 final liberation of puru\u1E63a",
          devanagari: "\u092F\u094B\u0917\u0936\u094D\u091A\u093F\u0924\u094D\u0924\u0935\u0943\u0924\u094D\u0924\u093F\u0928\u093F\u0930\u094B\u0927\u0903",
          transliteration: "yoga\u015B cittav\u1E5Bttinirodha\u1E25",
          examples: [
            { text: "\u092F\u094B\u0917\u0936\u094D\u091A\u093F\u0924\u094D\u0924\u0935\u0943\u0924\u094D\u0924\u093F\u0928\u093F\u0930\u094B\u0927\u0903", meaning: "Yoga is the cessation of mental fluctuations (YS 1.2)" }
          ]
        }
      ],
      summary: "Yoga S\u016Btra 1.2 defines the entire system: yoga is the stilling of the mind's modifications, leading to kaivalya."
    },
    quiz: [
      { id: "q-ys1", prompt: "How many limbs does Pata\xF1jali's yoga have?", options: ["Six", "Seven", "Eight", "Ten"], correctIndex: 2, explanation: "A\u1E63\u1E6D\u0101\u1E45ga yoga has eight limbs from yama to sam\u0101dhi.", difficulty: 2 }
    ]
  },
  // ═══ LEVEL 4: Upanishads (Undergrad) ═══
  {
    id: "upanishad",
    title: "\u0909\u092A\u0928\u093F\u0937\u0926\u0903 \u2014 The Principal Upanishads",
    subtitle: "The 12 major Upanishads and the Ved\u0101nta tradition",
    level: 4,
    track: "undergrad",
    govClassId: "ba-3",
    duration: "30 min",
    unlockables: ["skill-philosophy"],
    content: {
      introduction: "The Upanishads (\u0909\u092A\u0928\u093F\u0937\u0926\u0903) are the philosophical culmination of the Vedas. They teach the identity of \u0101tman (individual self) and brahman (ultimate reality). The 12 principal Upanishads are the foundation of Ved\u0101nta.",
      sections: [
        {
          heading: "The 12 Principal Upanishads",
          body: `1. \u0908\u0936 (\u012A\u015Ba) \u2014 18 verses, the Self as Lord
2. \u0915\u0947\u0928 (Kena) \u2014 "By whom?" \u2014 the nature of Brahman
3. \u0915\u0920 (Ka\u1E6Dha) \u2014 Naciketas' dialogue with Yama
4. \u092A\u094D\u0930\u0936\u094D\u0928 (Pra\u015Bna) \u2014 6 questions on meditation
5. \u092E\u0941\u0923\u094D\u0921\u0915 (Mu\u1E47\u1E0Daka) \u2014 two levels of knowledge
6. \u092E\u093E\u0923\u094D\u0921\u0942\u0915\u094D\u092F (M\u0101\u1E47\u1E0D\u016Bkya) \u2014 the syllable O\u1E42
7. \u0910\u0924\u0930\u0947\u092F (Aitareya) \u2014 creation from the Self
8. \u0924\u0948\u0924\u094D\u0924\u093F\u0930\u0940\u092F (Taittir\u012Bya) \u2014 the five sheaths
9. \u092C\u0943\u0939\u0926\u093E\u0930\u0923\u094D\u092F\u0915 (B\u1E5Bhad\u0101ra\u1E47yaka) \u2014 the great forest teaching
10. \u0936\u094D\u0935\u0947\u0924\u093E\u0936\u094D\u0935\u0924\u0930 (\u015Avet\u0101\u015Bvatara) \u2014 theistic \u015Aaiva Upani\u1E63ad
11. \u091B\u093E\u0928\u094D\u0926\u094B\u0917\u094D\u092F (Ch\u0101ndogya) \u2014 "You are that" (tat tvam asi)
12. \u0915\u094C\u0937\u0940\u0924\u0915\u093F (Kau\u1E63\u012Btaki) \u2014 pr\u0101\u1E47a and liberation`,
          devanagari: "\u0908\u0936  \u0915\u0947\u0928  \u0915\u0920  \u092A\u094D\u0930\u0936\u094D\u0928  \u092E\u0941\u0923\u094D\u0921\u0915  \u092E\u093E\u0923\u094D\u0921\u0942\u0915\u094D\u092F  \u0910\u0924\u0930\u0947\u092F  \u0924\u0948\u0924\u094D\u0924\u093F\u0930\u0940\u092F  \u092C\u0943\u0939\u0926\u093E\u0930\u0923\u094D\u092F\u0915  \u0936\u094D\u0935\u0947\u0924\u093E\u0936\u094D\u0935\u0924\u0930  \u091B\u093E\u0928\u094D\u0926\u094B\u0917\u094D\u092F  \u0915\u094C\u0937\u0940\u0924\u0915\u093F"
        },
        {
          heading: "Mah\u0101v\u0101kyas \u2014 The Great Sayings",
          body: '\u0905\u0939\u0902 \u092C\u094D\u0930\u0939\u094D\u092E\u093E\u0938\u094D\u092E\u093F (Aitareya) \u2014 "I am Brahman"\n\u0924\u0924\u094D\u0924\u094D\u0935\u092E\u0938\u093F (Ch\u0101ndogya) \u2014 "That you are"\n\u092A\u094D\u0930\u091C\u094D\u091E\u093E\u0928\u0902 \u092C\u094D\u0930\u0939\u094D\u092E (Aitareya) \u2014 "Consciousness is Brahman"\n\u0906\u0924\u094D\u092E\u093E \u092C\u094D\u0930\u0939\u094D\u092E (B\u1E5Bhad\u0101ra\u1E47yaka) \u2014 "The Self is Brahman"',
          devanagari: "\u0905\u0939\u0902 \u092C\u094D\u0930\u0939\u094D\u092E\u093E\u0938\u094D\u092E\u093F  \u0924\u0924\u094D\u0924\u094D\u0935\u092E\u0938\u093F  \u092A\u094D\u0930\u091C\u094D\u091E\u093E\u0928\u0902 \u092C\u094D\u0930\u0939\u094D\u092E  \u0906\u0924\u094D\u092E\u093E \u092C\u094D\u0930\u0939\u094D\u092E",
          transliteration: "aha\u1E43 brahm\u0101smi  tat tvam asi  praj\xF1\u0101na\u1E43 brahma  \u0101tm\u0101 brahma"
        },
        {
          heading: "Advaita Ved\u0101nta \u2014 \u015Aa\u1E45kara's Interpretation",
          body: "\u015Aa\u1E45kara (c. 8th CE) founded Keval\u0101dvaita (strict non-dualism).\nBrahman is sat-cit-\u0101nanda (being-consciousness-bliss).\nThe world is mithy\u0101 (phenomenal appearance).\nLiberation (mok\u1E63a) is realized through j\xF1\u0101na (knowledge) of the identity of \u0101tman and brahman."
        }
      ],
      summary: "The Upanishads shift the focus from ritual to knowledge, establishing the core of Indian philosophy for the last 2,500 years."
    },
    quiz: [
      { id: "q-up1", prompt: 'Which Upani\u1E63ad contains the teaching "tat tvam asi" (That you are)?', options: ["Kena", "Ka\u1E6Dha", "Ch\u0101ndogya", "B\u1E5Bhad\u0101ra\u1E47yaka"], correctIndex: 2, explanation: 'The Ch\u0101ndogya Upani\u1E63ad repeatedly teaches "tat tvam asi" \u2014 "That you are."', difficulty: 3 }
    ]
  },
  // ═══ LEVEL 5: Manuscript Studies (Graduate) ═══
  {
    id: "manuscript-studies",
    title: "\u0939\u0938\u094D\u0924\u0932\u093F\u0916\u093F\u0924\u0936\u093E\u0938\u094D\u0924\u094D\u0930\u092E\u094D \u2014 Manuscript Studies",
    subtitle: "Codicology and manuscript cataloguing techniques",
    level: 5,
    track: "graduate",
    govClassId: "ma-2",
    duration: "35 min",
    unlockables: ["skill-paleography"],
    content: {
      introduction: "Codicology (the study of manuscript books) examines the physical aspects: material, layout, script, and provenance. Accurate cataloguing is essential for textual scholarship.",
      sections: [
        {
          heading: "Writing Materials",
          body: "1. \u0924\u093E\u0921\u092A\u0924\u094D\u0930\u092E\u094D (palm leaf) \u2014 most common in South India; incised with a stylus, rubbed with ink\n2. \u0924\u094D\u0935\u0915\u094D / \u092D\u094B\u091C\u092A\u0924\u094D\u0930\u092E\u094D (birch bark) \u2014 used in Kashmir and the North; written with ink\n3. \u0915\u093E\u0917\u0926\u092E\u094D (paper) \u2014 introduced from the 14th century onward\n4. \u0927\u093E\u0924\u0941\u092A\u0924\u094D\u0930\u092E\u094D (metal plates) \u2014 copper plates for land grants and royal edicts",
          devanagari: "\u0924\u093E\u0921\u092A\u0924\u094D\u0930\u092E\u094D  \u092D\u094B\u091C\u092A\u0924\u094D\u0930\u092E\u094D  \u0915\u093E\u0917\u0926\u092E\u094D  \u0927\u093E\u0924\u0941\u092A\u0924\u094D\u0930\u092E\u094D"
        },
        {
          heading: "Codicological Description",
          body: "A complete MS description includes: 1. Accession number 2. Script 3. Material 4. Dimensions 5. Number of folios 6. Lines per folio 7. Condition 8. Date/colophon 9. Scribe name 10. Provenance"
        },
        {
          heading: "Cataloguing Systems",
          body: "Descriptive catalogue: full transcription of incipit/explicit, colophon, and all key features.\nHandlist: brief entry for quick reference.\nUnion catalogue: aggregates holdings across multiple libraries.\nMajor projects: New Catalogus Catalogorum (Madras), AKU (Hamburg)."
        }
      ],
      summary: "Systematic manuscript cataloguing preserves cultural heritage and provides the raw material for critical editions."
    },
    quiz: [
      { id: "q-ms1", prompt: "Which material was most common for South Indian manuscripts?", options: ["Birch bark", "Paper", "Palm leaf", "Metal"], correctIndex: 2, explanation: "Palm leaf (t\u0101\u1E0Dapatra) was the primary material in South India.", difficulty: 3 }
    ]
  },
  // ═══ LEVEL 5: Lexicography (Graduate) ═══
  {
    id: "lexicography",
    title: "\u0915\u094B\u0936\u0935\u093F\u0926\u094D\u092F\u093E \u2014 Sanskrit Lexicography",
    subtitle: "Dictionaries, word studies, and semantic analysis",
    level: 5,
    track: "graduate",
    govClassId: "ma-1",
    duration: "30 min",
    unlockables: ["skill-critical-edition"],
    content: {
      introduction: "Sanskrit lexicography has a 2,500-year tradition from ancient ko\u015Bas to modern digital databases. A lexicographer analyzes meaning, usage, and etymology.",
      sections: [
        {
          heading: "Traditional Ko\u015Bas",
          body: "\u0905\u092E\u0930\u0915\u094B\u0936\u0903 = Amarasimha's Thesaurus (c. 5th CE) \u2014 the most famous, with 10,000+ words in 3 k\u0101\u1E47\u1E0Das\n\u0905\u0928\u0947\u0915\u093E\u0930\u094D\u0925\u0915\u094B\u0936\u0903 = Dictionaries of homonyms\n\u0928\u093F\u0918\u0923\u094D\u091F\u0941\u0903 = Vedic glossaries (the oldest, for the Vedas)",
          devanagari: "\u0905\u092E\u0930\u0915\u094B\u0936\u0903  \u0928\u093F\u0918\u0923\u094D\u091F\u0941\u0903",
          examples: [
            { text: "\u0905\u092E\u0930\u0915\u094B\u0936\u0903", meaning: "The immortal thesaurus \u2014 still used by every Sanskrit student" }
          ]
        },
        {
          heading: "Modern Dictionaries",
          body: "Monier-Williams Dictionary (1899) \u2014 180,000 entries, the standard reference\nApte's Dictionary (1890) \u2014 practical with examples\nB\xF6htlingk & Roth (PW) \u2014 exhaustive, 7 volumes\n\u015Aabdakalpadruma \u2014 encyclopedic Sanskrit-Sanskrit"
        },
        {
          heading: "Digital Lexicography",
          body: "Cologne Digital Sanskrit Dictionaries (Cologne University) \u2014 30+ dictionaries online\nSanskrit-Hindi and Sanskrit-English digital corpuses\nOWC (Old Western Comparative) \u2014 historical-comparative tools"
        }
      ],
      summary: "The transition from paper to digital lexicography has revolutionized Sanskrit word studies, enabling corpus-wide searches."
    },
    quiz: [
      { id: "q-lx1", prompt: "Who wrote the most famous traditional thesaurus (Amarako\u015Ba)?", options: ["Pata\xF1jali", "Amarasimha", "B\xF6htlingk", "Monier-Williams"], correctIndex: 1, explanation: "Amarasimha composed the Amarako\u015Ba, the most famous Sanskrit thesaurus.", difficulty: 3 }
    ]
  },
  // ═══ LEVEL 6: Critical Edition Theory (PhD) ═══
  {
    id: "critical-edition-theory",
    title: "\u0938\u092E\u093E\u0932\u094B\u091A\u0928\u0938\u0902\u0938\u094D\u0915\u0930\u0923\u0938\u093F\u0926\u094D\u0927\u093E\u0928\u094D\u0924\u0903 \u2014 Critical Edition Theory",
    subtitle: "Lachmannian method vs. genealogical approaches",
    level: 6,
    track: "phd",
    govClassId: "mphil",
    duration: "60 min",
    unlockables: ["skill-phd-research"],
    content: {
      introduction: "The theory behind critical editions has evolved from Karl Lachmann's 19th-century stemmatics to modern multi-dimensional genealogical methods and digital approaches.",
      sections: [
        {
          heading: "Lachmannian Method",
          body: "1. Recensio: Gather all witnesses, classify by shared errors\n2. Examinatio: Construct the stemma (family tree)\n3. Emendatio: Correct obvious scribal errors\n4. Constitutio textus: Establish the text\nCritique: Assumes a single archetype and purely mechanical copying \u2014 rarely true in practice."
        },
        {
          heading: "Maas's Stemmatic Rules",
          body: "Paul Maas (Textual Criticism, 1927):\n\u2022 Eliminatio codicum descriptorum: remove copies that are direct descendants of extant MSS\n\u2022 Error significativus (Ligature error): shared errors indicate relationship\n\u2022 Families are defined by common errors, not common correct readings",
          examples: [
            { text: "Error coniunctivus", meaning: "A shared error proving two MSS belong to the same family" },
            { text: "Error separativus", meaning: "An error showing a MS cannot be the ancestor of another" }
          ]
        },
        {
          heading: "Modern Challenges",
          body: "Contamination (horizontal transmission) \u2014 scribes used multiple exemplars\nOpen traditions \u2014 texts that evolve (e.g., the Mah\u0101bh\u0101rata)\nMulti-dimensional stemmatics \u2014 digital tools now allow phylogenetic analysis using computational methods"
        }
      ],
      summary: "Critical edition theory has moved from rigid stemmatics to flexible, computer-assisted genealogical analysis."
    },
    quiz: [
      { id: "q-cet1", prompt: 'What is an "error coniunctivus"?', options: ["A random scribal error", "A shared error indicating common ancestry", "An error in the archetype", "A conjectural emendation"], correctIndex: 1, explanation: "An error coniunctivus (binding error) proves two manuscripts belong to the same family.", difficulty: 5 }
    ]
  },
  // ═══ LEVEL 6: Digital Humanities (PhD) ═══
  {
    id: "digital-humanities",
    title: "\u0921\u093F\u091C\u093F\u091F\u0932\u092E\u093E\u0928\u0935\u093F\u0915\u092E\u094D \u2014 Digital Sanskrit Humanities",
    subtitle: "Corpus linguistics, TEI-XML, and digital tools",
    level: 6,
    track: "phd",
    govClassId: "phd",
    duration: "45 min",
    unlockables: ["skill-phd-research"],
    content: {
      introduction: "Digital humanities applies computational methods to Sanskrit texts. This includes digital editions, automated analysis, and large-scale corpus research.",
      sections: [
        {
          heading: "TEI-XML for Sanskrit",
          body: 'The Text Encoding Initiative (TEI) is the XML standard for digital editions.\nKey elements: <teiHeader> (metadata), <body> (text), <app> (apparatus variant readings)\nSanskrit-specific: @xml:lang="sa", <foreign> for non-Sanskrit terms'
        },
        {
          heading: "Computational Sanskrit Tools",
          body: "Sanskrit Heritage Engine (Paris) \u2014 morphological analysis and sandhi splitting\nDCS (Digital Corpus of Sanskrit) \u2014 600,000+ sentences with lemmatization\nGRETIL \u2014 G\xF6ttingen Register of Electronic Texts\nSARIT \u2014 Search and Retrieval of Indian Texts"
        },
        {
          heading: "Corpus Linguistics Methods",
          body: "Lemmatization: mapping inflected forms to dictionary headwords\nPOS tagging: labelling parts of speech\nTreebanking: creating parse trees for syntax\nWord embedding: semantic vector analysis (e.g., word2vec for Sanskrit)"
        }
      ],
      summary: "Digital tools have made vast Sanskrit corpora searchable and analyzable, enabling research questions impossible in the print era."
    },
    quiz: [
      { id: "q-dh1", prompt: "Which XML standard is used for digital critical editions?", options: ["HTML", "TEI-XML", "JSON", "YAML"], correctIndex: 1, explanation: "TEI-XML (Text Encoding Initiative) is the standard for digital scholarly editions.", difficulty: 4 }
    ]
  },
  // ═══ LEVEL 6: Publication (PhD) ═══
  {
    id: "publication",
    title: "\u092A\u094D\u0930\u0915\u093E\u0936\u0928\u092E\u094D \u2014 Scholarly Publication",
    subtitle: "Journals, monographs, and peer review in Sanskrit studies",
    level: 6,
    track: "phd",
    govClassId: "phd",
    duration: "30 min",
    unlockables: ["skill-phd-research"],
    content: {
      introduction: "Publishing research in Sanskrit studies requires knowledge of the major journals, monograph series, and the peer review process.",
      sections: [
        {
          heading: "Major Journals",
          body: "Journal of the American Oriental Society (JAOS) \u2014 since 1843\nWiener Zeitschrift f\xFCr die Kunde S\xFCdasiens (WZKS)\nIndo-Iranian Journal\nJournal of Indian Philosophy\nBulletin d'\xC9tudes Indiennes\nAnnals of the Bhandarkar Oriental Research Institute (BORI)"
        },
        {
          heading: "Monograph Series",
          body: "Harvard Oriental Series (HOS) \u2014 critical editions and studies\nDelhi University Sanskrit Series\nKashi Sanskrit Series\nGaekwad's Oriental Series (GOS)\nDe Nobili Research Library (Vienna)"
        },
        {
          heading: "Peer Review Process",
          body: "1. Abstract registration / pre-submission inquiry\n2. Double-blind peer review (usually 2-3 reviewers)\n3. Revise and resubmit (may involve 2-3 rounds)\n4. Proofreading and transliteration checking\n5. Publication (often 12-24 months after acceptance)"
        }
      ],
      summary: "Publishing in reputable venues ensures scholarly impact and career advancement in Sanskrit academia."
    },
    quiz: [
      { id: "q-pub1", prompt: "Which is the oldest continuously published journal in Sanskrit studies?", options: ["Indo-Iranian Journal", "JAOS", "WZKS", "BORI Annals"], correctIndex: 1, explanation: "JAOS (Journal of the American Oriental Society) has been publishing since 1843.", difficulty: 3 }
    ]
  },
  {
    id: "avyayibhava",
    title: "\u0905\u0935\u094D\u092F\u092F\u0940\u092D\u093E\u0935\u0903 \u2014 Indeclinable Compounds",
    subtitle: "Adverbial compounds with a prior indeclinable",
    level: 3,
    track: "undergrad",
    govClassId: "class-9",
    duration: "20 min",
    unlockables: ["skill-compounds"],
    content: {
      introduction: "Avyay\u012Bbh\u0101va (\u0905\u0935\u094D\u092F\u092F\u0940\u092D\u093E\u0935) compounds have an indeclinable (avyaya) as the first member. The compound as a whole functions as an indeclinable adverb.",
      sections: [
        {
          heading: "Structure & Meaning",
          body: "Indeclinable + Noun \u2192 Adverbial indeclinable\nThe final noun loses its case ending; the whole compound is neuter nominative singular.\nExample: \u092F\u0925\u093E + \u0936\u0915\u094D\u0924\u093F = \u092F\u0925\u093E\u0936\u0915\u094D\u0924\u093F (according to ability)",
          devanagari: "\u092F\u0925\u093E + \u0936\u0915\u094D\u0924\u093F = \u092F\u0925\u093E\u0936\u0915\u094D\u0924\u093F",
          examples: [
            { text: "\u092F\u0925\u093E\u0936\u0915\u094D\u0924\u093F", meaning: "according to one's ability" },
            { text: "\u092A\u094D\u0930\u0924\u093F\u0926\u093F\u0928\u092E\u094D", meaning: "daily (\u092A\u094D\u0930\u0924\u093F + \u0926\u093F\u0928\u092E\u094D)" }
          ]
        },
        {
          heading: "Common Prefixes",
          body: "\u092F\u0925\u093E (according to): \u092F\u0925\u093E\u0928\u094D\u092F\u093E\u092F\u092E\u094D (according to rule)\n\u092A\u094D\u0930\u0924\u093F (per/each): \u092A\u094D\u0930\u0924\u093F\u0926\u093F\u0928\u092E\u094D (daily), \u092A\u094D\u0930\u0924\u093F\u0935\u0930\u094D\u0937\u092E\u094D (yearly)\n\u0909\u092A (near/along): \u0909\u092A\u0917\u094D\u0930\u093E\u092E\u092E\u094D (near the village)\n\u0905\u0928\u0941 (along/after): \u0905\u0928\u0941\u0915\u0942\u0932\u092E\u094D (favorable, lit. along the bank)\n\u0938\u0939 (with): \u0938\u0939\u092A\u0930\u093F\u0935\u093E\u0930\u092E\u094D (with family)",
          devanagari: "\u092F\u0925\u093E\u0928\u094D\u092F\u093E\u092F\u092E\u094D  \u092A\u094D\u0930\u0924\u093F\u0926\u093F\u0928\u092E\u094D  \u0909\u092A\u0917\u094D\u0930\u093E\u092E\u092E\u094D  \u0905\u0928\u0941\u0915\u0942\u0932\u092E\u094D  \u0938\u0939\u092A\u0930\u093F\u0935\u093E\u0930\u092E\u094D"
        },
        {
          heading: "Nip\u0101tas as First Members",
          body: "Many Avyay\u012Bbh\u0101va compounds use nip\u0101tas (particles):\n\u0938\u093E\u0915\u092E\u094D (together): \u0938\u093E\u0915\u092E\u0927\u094D\u0935\u0930\u094D\u092F\u0941\u092D\u093F\u0903 (together with the priests)\n\u0935\u093F\u0928\u093E (without): \u0935\u093F\u0928\u093E\u092A\u0930\u093E\u0927\u092E\u094D (without offense)\n\u0928\u093F\u0930\u094D (without): \u0928\u0940\u0930\u094B\u0917\u0903 (without disease)"
        }
      ],
      summary: "Avyay\u012Bbh\u0101va compounds are easy to recognize: the first member is an indeclinable, and the compound acts as an adverb."
    },
    quiz: [
      { id: "q-avy1", prompt: "What part of speech is an Avyay\u012Bbh\u0101va compound?", options: ["Noun", "Verb", "Indeclinable/Adverb", "Adjective"], correctIndex: 2, explanation: "Avyay\u012Bbh\u0101va compounds function as indeclinables (adverbs).", difficulty: 3 },
      { id: "q-avy2", prompt: "\u092A\u094D\u0930\u0924\u093F\u0926\u093F\u0928\u092E\u094D is which compound type?", options: ["Tatpuru\u1E63a", "Bahuvr\u012Bhi", "Dvandva", "Avyay\u012Bbh\u0101va"], correctIndex: 3, explanation: "\u092A\u094D\u0930\u0924\u093F + \u0926\u093F\u0928\u092E\u094D = \u092A\u094D\u0930\u0924\u093F\u0926\u093F\u0928\u092E\u094D \u2014 indeclinable prefix + noun = Avyay\u012Bbh\u0101va.", difficulty: 2 }
    ]
  },
  {
    id: "relative-clauses",
    title: "\u092F\u091A\u094D\u091B\u092C\u094D\u0926\u093E\u0903 \u2014 Relative Correlative Clauses",
    subtitle: "Relative pronouns in correlative sentence structures",
    level: 2,
    track: "teen",
    govClassId: "class-8",
    duration: "25 min",
    unlockables: ["skill-syntax"],
    content: {
      introduction: "Sanskrit uses a distinctive relative-correlative structure: \u092F (who/which) in the first clause answers with \u0924 (that/he) in the main clause. This is one of Sanskrit's most characteristic syntactic patterns.",
      sections: [
        {
          heading: "Basic Pattern",
          body: '\u092F\u0903 ... \u0938\u0903 = "Who ... he"\n\u092F\u0903 \u092A\u0920\u0924\u093F \u0938\u0903 \u091C\u093E\u0928\u093E\u0924\u093F = "Who reads, he knows"\nThe relative clause (\u092F\u0903) sets the condition; the correlative (\u0938\u0903) delivers the result.',
          devanagari: "\u092F\u0903 \u092A\u0920\u0924\u093F \u0938\u0903 \u091C\u093E\u0928\u093E\u0924\u093F",
          transliteration: "ya\u1E25 pa\u1E6Dhati sa\u1E25 j\u0101n\u0101ti",
          examples: [
            { text: "\u092F\u0925\u093E \u092C\u0940\u091C\u0902 \u0924\u0925\u093E \u0935\u0943\u0915\u094D\u0937\u0903", meaning: "As the seed, so the tree" },
            { text: "\u092F\u0926\u093E \u0930\u093E\u092E\u0903 \u0906\u0917\u091A\u094D\u091B\u0924\u093F \u0924\u0926\u093E \u0938\u0940\u0924\u093E \u0939\u0938\u0924\u093F", meaning: "When R\u0101ma comes, S\u012Bt\u0101 smiles" }
          ]
        },
        {
          heading: "Relative Pronoun Forms",
          body: "\u092F\u0903 (masc. sg. nom.) \u2014 \u092F\u094C (masc. dual) \u2014 \u092F\u0947 (masc. pl.)\n\u092F\u093E (fem. sg. nom.) \u2014 \u092F\u0947 (fem. dual) \u2014 \u092F\u093E\u0903 (fem. pl.)\n\u092F\u0924\u094D (neut. sg. nom./acc.) \u2014 \u092F\u0947 (neut. dual) \u2014 \u092F\u093E\u0928\u093F (neut. pl.)\nCorrelative uses \u0924- stems: \u0938\u0903, \u0924\u094C, \u0924\u0947; \u0938\u093E, \u0924\u0947, \u0924\u093E\u0903; \u0924\u0924\u094D, \u0924\u0947, \u0924\u093E\u0928\u093F"
        },
        {
          heading: "Indefinite Relative",
          body: "With \u091A\u093F\u0924\u094D/\u091A\u0928 added to the relative:\n\u092F\u0903 \u0915\u0936\u094D\u091A\u093F\u0924\u094D = whoever\n\u092F\u0924\u094D \u0915\u093F\u091E\u094D\u091A\u093F\u0924\u094D = whatever\n\u092F\u0924\u094D\u0930 \u0915\u094D\u0935\u091A\u093F\u0924\u094D = wherever\n\u092F\u0926\u093E \u0915\u0926\u093E\u091A\u093F\u0924\u094D = whenever",
          devanagari: "\u092F\u0903 \u0915\u0936\u094D\u091A\u093F\u0924\u094D  \u092F\u0924\u094D \u0915\u093F\u091E\u094D\u091A\u093F\u0924\u094D  \u092F\u0924\u094D\u0930 \u0915\u094D\u0935\u091A\u093F\u0924\u094D  \u092F\u0926\u093E \u0915\u0926\u093E\u091A\u093F\u0924\u094D"
        }
      ],
      summary: "The \u092F-\u0924 correlative pair is the backbone of complex sentence formation in Sanskrit."
    },
    quiz: [
      { id: "q-rc1", prompt: "In \u092F\u0903 \u092A\u0920\u0924\u093F \u0938\u0903 \u091C\u093E\u0928\u093E\u0924\u093F, what does \u092F\u0903 refer to?", options: ["The result", "The relative clause subject", "The object", "The verb"], correctIndex: 1, explanation: '\u092F\u0903 is the relative pronoun introducing the subordinate clause "who reads."', difficulty: 2 },
      { id: "q-rc2", prompt: "Which correlative pairs with \u092F\u0926\u093E?", options: ["\u0924\u0926\u093E", "\u0924\u0924\u094D\u0930", "\u0924\u0925\u093E", "\u0938\u0903"], correctIndex: 0, explanation: "\u092F\u0926\u093E (when) pairs with \u0924\u0926\u093E (then) in correlative structures.", difficulty: 2 }
    ]
  },
  {
    id: "declensions-practice",
    title: "\u0935\u093F\u092D\u0915\u094D\u0924\u094D\u092F\u092D\u094D\u092F\u093E\u0938\u0903 \u2014 Declension Practice",
    subtitle: "Full paradigms and common patterns across all genders",
    level: 2,
    track: "undergrad",
    govClassId: "class-7",
    duration: "30 min",
    unlockables: ["skill-declensions"],
    content: {
      introduction: "Mastering declensions requires practice with the three main stem types: a-stems (masc/neut), \u0101-stems (fem), and i-stems. Let's practice all cases systematically.",
      sections: [
        {
          heading: "Masculine a-stem: \u092C\u093E\u0932 (boy)",
          body: "Sg: \u092C\u093E\u0932\u0903, \u092C\u093E\u0932\u092E\u094D, \u092C\u093E\u0932\u0947\u0928, \u092C\u093E\u0932\u093E\u092F, \u092C\u093E\u0932\u093E\u0924\u094D, \u092C\u093E\u0932\u0938\u094D\u092F, \u092C\u093E\u0932\u0947, \u0939\u0947 \u092C\u093E\u0932\nDu: \u092C\u093E\u0932\u094C, \u092C\u093E\u0932\u094C, \u092C\u093E\u0932\u093E\u092D\u094D\u092F\u093E\u092E\u094D, \u092C\u093E\u0932\u093E\u092D\u094D\u092F\u093E\u092E\u094D, \u092C\u093E\u0932\u093E\u092D\u094D\u092F\u093E\u092E\u094D, \u092C\u093E\u0932\u092F\u094B\u0903, \u092C\u093E\u0932\u092F\u094B\u0903, \u0939\u0947 \u092C\u093E\u0932\u094C\nPl: \u092C\u093E\u0932\u093E\u0903, \u092C\u093E\u0932\u093E\u0928\u094D, \u092C\u093E\u0932\u0948\u0903, \u092C\u093E\u0932\u0947\u092D\u094D\u092F\u0903, \u092C\u093E\u0932\u0947\u092D\u094D\u092F\u0903, \u092C\u093E\u0932\u093E\u0928\u093E\u092E\u094D, \u092C\u093E\u0932\u0947\u0937\u0941, \u0939\u0947 \u092C\u093E\u0932\u093E\u0903",
          devanagari: "\u092C\u093E\u0932\u0903  \u092C\u093E\u0932\u092E\u094D  \u092C\u093E\u0932\u0947\u0928  \u092C\u093E\u0932\u093E\u092F  \u092C\u093E\u0932\u093E\u0924\u094D  \u092C\u093E\u0932\u0938\u094D\u092F  \u092C\u093E\u0932\u0947",
          examples: [
            { text: "\u092C\u093E\u0932\u0903 \u092A\u0920\u0924\u093F", meaning: "The boy reads" },
            { text: "\u092C\u093E\u0932\u0947\u0928 \u0915\u0943\u0924\u092E\u094D", meaning: "Done by the boy" }
          ]
        },
        {
          heading: "Feminine \u0101-stem: \u092C\u093E\u0932\u093E (girl)",
          body: "Sg: \u092C\u093E\u0932\u093E, \u092C\u093E\u0932\u093E\u092E\u094D, \u092C\u093E\u0932\u092F\u093E, \u092C\u093E\u0932\u093E\u092F\u0948, \u092C\u093E\u0932\u093E\u092F\u093E\u0903, \u092C\u093E\u0932\u093E\u092F\u093E\u0903, \u092C\u093E\u0932\u093E\u092F\u093E\u092E\u094D, \u0939\u0947 \u092C\u093E\u0932\u0947\nDu: \u092C\u093E\u0932\u0947, \u092C\u093E\u0932\u0947, \u092C\u093E\u0932\u093E\u092D\u094D\u092F\u093E\u092E\u094D, \u092C\u093E\u0932\u093E\u092D\u094D\u092F\u093E\u092E\u094D, \u092C\u093E\u0932\u093E\u092D\u094D\u092F\u093E\u092E\u094D, \u092C\u093E\u0932\u092F\u094B\u0903, \u092C\u093E\u0932\u092F\u094B\u0903, \u0939\u0947 \u092C\u093E\u0932\u0947\nPl: \u092C\u093E\u0932\u093E\u0903, \u092C\u093E\u0932\u093E\u0903, \u092C\u093E\u0932\u093E\u092D\u093F\u0903, \u092C\u093E\u0932\u093E\u092D\u094D\u092F\u0903, \u092C\u093E\u0932\u093E\u092D\u094D\u092F\u0903, \u092C\u093E\u0932\u093E\u0928\u093E\u092E\u094D, \u092C\u093E\u0932\u093E\u0938\u0941, \u0939\u0947 \u092C\u093E\u0932\u093E\u0903",
          devanagari: "\u092C\u093E\u0932\u093E  \u092C\u093E\u0932\u093E\u092E\u094D  \u092C\u093E\u0932\u092F\u093E  \u092C\u093E\u0932\u093E\u092F\u0948"
        },
        {
          heading: "Neuter a-stem: \u092B\u0932 (fruit)",
          body: "Sg: \u092B\u0932\u092E\u094D, \u092B\u0932\u092E\u094D, \u092B\u0932\u0947\u0928, \u092B\u0932\u093E\u092F, \u092B\u0932\u093E\u0924\u094D, \u092B\u0932\u0938\u094D\u092F, \u092B\u0932\u0947, \u0939\u0947 \u092B\u0932\nDu: \u092B\u0932\u0947, \u092B\u0932\u0947, \u092B\u0932\u093E\u092D\u094D\u092F\u093E\u092E\u094D, \u092B\u0932\u093E\u092D\u094D\u092F\u093E\u092E\u094D, \u092B\u0932\u093E\u092D\u094D\u092F\u093E\u092E\u094D, \u092B\u0932\u092F\u094B\u0903, \u092B\u0932\u092F\u094B\u0903, \u0939\u0947 \u092B\u0932\u0947\nPl: \u092B\u0932\u093E\u0928\u093F, \u092B\u0932\u093E\u0928\u093F, \u092B\u0932\u0948\u0903, \u092B\u0932\u0947\u092D\u094D\u092F\u0903, \u092B\u0932\u0947\u092D\u094D\u092F\u0903, \u092B\u0932\u093E\u0928\u093E\u092E\u094D, \u092B\u0932\u0947\u0937\u0941, \u0939\u0947 \u092B\u0932\u093E\u0928\u093F\nNote: Neuter nom. and acc. are always identical in all numbers."
        },
        {
          heading: "i-stem: \u0917\u093F\u0930\u093F (mountain)",
          body: "Sg: \u0917\u093F\u0930\u093F\u0903, \u0917\u093F\u0930\u093F\u092E\u094D, \u0917\u093F\u0930\u093F\u0923\u093E, \u0917\u093F\u0930\u092F\u0947, \u0917\u093F\u0930\u0947\u0903, \u0917\u093F\u0930\u0947\u0903, \u0917\u093F\u0930\u094C, \u0939\u0947 \u0917\u093F\u0930\u0947\nPl: \u0917\u093F\u0930\u092F\u0903, \u0917\u093F\u0930\u0940\u0928\u094D, \u0917\u093F\u0930\u093F\u092D\u093F\u0903, \u0917\u093F\u0930\u093F\u092D\u094D\u092F\u0903, \u0917\u093F\u0930\u093F\u092D\u094D\u092F\u0903, \u0917\u093F\u0930\u0940\u0923\u093E\u092E\u094D, \u0917\u093F\u0930\u093F\u0937\u0941, \u0939\u0947 \u0917\u093F\u0930\u092F\u0903",
          devanagari: "\u0917\u093F\u0930\u093F\u0903  \u0917\u093F\u0930\u093F\u092E\u094D  \u0917\u093F\u0930\u093F\u0923\u093E  \u0917\u093F\u0930\u092F\u0947  \u0917\u093F\u0930\u0947\u0903  \u0917\u093F\u0930\u094C"
        }
      ],
      summary: "Practice these four paradigms daily. Focus on the dative (\u091A\u0924\u0941\u0930\u094D\u0925\u0940) and ablative (\u092A\u091E\u094D\u091A\u092E\u0940) \u2014 they are the most commonly confused."
    },
    quiz: [
      { id: "q-dp1", prompt: "What is the genitive plural of \u092C\u093E\u0932?", options: ["\u092C\u093E\u0932\u0938\u094D\u092F", "\u092C\u093E\u0932\u093E\u0928\u093E\u092E\u094D", "\u092C\u093E\u0932\u0947\u092D\u094D\u092F\u0903", "\u092C\u093E\u0932\u093E\u092F\u093E\u0903"], correctIndex: 1, explanation: "\u092C\u093E\u0932\u093E\u0928\u093E\u092E\u094D = genitive plural of \u092C\u093E\u0932 (of the boys).", difficulty: 3 },
      { id: "q-dp2", prompt: "What is unique about neuter declensions?", options: ["They have no dual", "Nom. and acc. are always identical", "They lack the instrumental", "They use only 3 cases"], correctIndex: 1, explanation: "Neuter nouns have identical nominative and accusative forms in all three numbers.", difficulty: 2 }
    ]
  }
];
const lessonHi = {
  "alphabet-vowels": { subtitleHi: "\u0926\u0947\u0935\u0928\u093E\u0917\u0930\u0940 \u0915\u0947 13 \u0938\u094D\u0935\u0930 \u0938\u0940\u0916\u0947\u0902", durationHi: "\u0967\u096B \u092E\u093F\u0928\u091F" },
  "alphabet-consonants": { subtitleHi: "\u0909\u091A\u094D\u091A\u093E\u0930\u0923-\u0938\u094D\u0925\u093E\u0928 \u0915\u0947 \u0905\u0928\u0941\u0938\u093E\u0930 \u0938\u092D\u0940 33 \u0935\u094D\u092F\u0902\u091C\u0928 \u0938\u0940\u0916\u0947\u0902", durationHi: "\u0968\u0966 \u092E\u093F\u0928\u091F" },
  "simple-words": { subtitleHi: "\u092A\u094D\u0930\u0925\u092E \u0936\u092C\u094D\u0926: \u092A\u0930\u093F\u0935\u093E\u0930, \u092A\u094D\u0930\u0915\u0943\u0924\u093F, \u0936\u0930\u0940\u0930 \u0915\u0947 \u0905\u0902\u0917", durationHi: "\u0967\u096B \u092E\u093F\u0928\u091F" },
  "basic-sentences": { subtitleHi: "\u0938\u0930\u0932 \u0935\u093E\u0915\u094D\u092F\u094B\u0902 \u092E\u0947\u0902 \u0915\u0930\u094D\u0924\u093E-\u0915\u0930\u094D\u092E-\u0915\u094D\u0930\u093F\u092F\u093E", durationHi: "\u0968\u0966 \u092E\u093F\u0928\u091F" },
  "declensions": { subtitleHi: "\u0924\u0940\u0928 \u0932\u093F\u0902\u0917\u094B\u0902 \u092E\u0947\u0902 \u0938\u0902\u091C\u094D\u091E\u093E \u0935\u093F\u092D\u0915\u094D\u0924\u093F\u092F\u094B\u0902 \u092E\u0947\u0902 \u092A\u094D\u0930\u0935\u0940\u0923 \u092C\u0928\u0947\u0902", durationHi: "\u0969\u0966 \u092E\u093F\u0928\u091F" },
  "sandhi-rules": { subtitleHi: "\u0927\u094D\u0935\u0928\u093F-\u0938\u0902\u092F\u094B\u091C\u0928 \u0915\u0947 \u0938\u0941\u0902\u0926\u0930 \u0928\u093F\u092F\u092E", durationHi: "\u0969\u096B \u092E\u093F\u0928\u091F" },
  "compounds": { subtitleHi: "\u0936\u092C\u094D\u0926\u094B\u0902 \u0915\u094B \u0938\u0902\u0915\u094D\u0937\u093F\u092A\u094D\u0924 \u0930\u0942\u092A\u094B\u0902 \u092E\u0947\u0902 \u091C\u094B\u0921\u093C\u0928\u0947 \u0915\u0940 \u0915\u0932\u093E", durationHi: "\u0968\u096B \u092E\u093F\u0928\u091F" },
  "kalidasa": { subtitleHi: "\u0905\u092D\u093F\u091C\u094D\u091E\u093E\u0928\u0936\u093E\u0915\u0941\u0902\u0924\u0932\u092E\u094D \u0915\u0947 \u092A\u094D\u0930\u0925\u092E \u091B\u0902\u0926 \u0915\u093E \u0935\u093F\u0936\u094D\u0932\u0947\u0937\u0923", durationHi: "\u0969\u0966 \u092E\u093F\u0928\u091F" },
  "nyaya-intro": { subtitleHi: "\u0928\u094D\u092F\u093E\u092F \u0926\u0930\u094D\u0936\u0928 \u0915\u0940 16 \u0936\u094D\u0930\u0947\u0923\u093F\u092F\u093E\u0901", durationHi: "\u0969\u0966 \u092E\u093F\u0928\u091F" },
  "textual-criticism": { subtitleHi: "\u092A\u093E\u0902\u0921\u0941\u0932\u093F\u092A\u093F-\u0938\u093E\u0915\u094D\u0937\u094D\u092F\u094B\u0902 \u0938\u0947 \u0938\u092E\u093E\u0932\u094B\u091A\u0928\u093E\u0924\u094D\u092E\u0915 \u0938\u0902\u0938\u094D\u0915\u0930\u0923 \u0938\u094D\u0925\u093E\u092A\u093F\u0924 \u0915\u0930\u0928\u093E", durationHi: "\u096A\u096B \u092E\u093F\u0928\u091F" },
  "paleography": { subtitleHi: "\u092A\u094D\u0930\u093E\u091A\u0940\u0928 \u0926\u0947\u0935\u0928\u093E\u0917\u0930\u0940 \u0914\u0930 \u0917\u094D\u0930\u0902\u0925 \u0932\u093F\u092A\u093F\u092F\u093E\u0901 \u092A\u0922\u093C\u0928\u093E", durationHi: "\u096A\u0966 \u092E\u093F\u0928\u091F" },
  "critical-edition": { subtitleHi: "\u0938\u0902\u0938\u093E\u0927\u0928 \u0938\u0939\u093F\u0924 \u092A\u0942\u0930\u094D\u0923 \u0938\u092E\u093E\u0932\u094B\u091A\u0928\u093E\u0924\u094D\u092E\u0915 \u0938\u0902\u0938\u094D\u0915\u0930\u0923 \u0915\u093E \u0928\u093F\u0930\u094D\u092E\u093E\u0923", durationHi: "\u096C\u0966 \u092E\u093F\u0928\u091F" },
  "numbers-colors": { subtitleHi: "\u0938\u0902\u0938\u094D\u0915\u0943\u0924 \u092E\u0947\u0902 1-10 \u0917\u093F\u0928\u0924\u0940 \u0914\u0930 \u092E\u0942\u0932 \u0930\u0902\u0917\u094B\u0902 \u0915\u0947 \u0928\u093E\u092E", durationHi: "\u0967\u0966 \u092E\u093F\u0928\u091F" },
  "everyday-vocab": { subtitleHi: "\u0905\u092D\u093F\u0935\u093E\u0926\u0928, \u092D\u094B\u091C\u0928, \u0926\u093F\u0936\u093E\u090F\u0901 \u0914\u0930 \u0938\u092E\u092F \u0915\u0947 \u0936\u092C\u094D\u0926", durationHi: "\u0967\u096B \u092E\u093F\u0928\u091F" },
  "verb-conjugation": { subtitleHi: "\u0935\u0930\u094D\u0924\u092E\u093E\u0928, \u0905\u0928\u094D\u092F\u0924\u094D (\u0905\u092A\u0942\u0930\u094D\u0923), \u092D\u0935\u093F\u0937\u094D\u092F\u0924\u094D \u0914\u0930 \u092A\u0930\u094B\u0915\u094D\u0937 (\u092A\u0942\u0930\u094D\u0923) \u0915\u093E\u0932", durationHi: "\u0969\u096B \u092E\u093F\u0928\u091F" },
  "krdanta": { subtitleHi: "\u0915\u0943\u0924 \u092A\u094D\u0930\u0924\u094D\u092F\u092F\u094B\u0902 \u0938\u0947 \u0927\u093E\u0924\u0941 \u0938\u0947 \u0938\u0902\u091C\u094D\u091E\u093E-\u0928\u093F\u0930\u094D\u092E\u093E\u0923", durationHi: "\u0969\u0966 \u092E\u093F\u0928\u091F" },
  "taddhita": { subtitleHi: "\u0924\u0926\u094D\u0927\u093F\u0924 \u092A\u094D\u0930\u0924\u094D\u092F\u092F\u094B\u0902 \u0938\u0947 \u0938\u0902\u091C\u094D\u091E\u093E \u0938\u0947 \u0938\u0902\u091C\u094D\u091E\u093E-\u0928\u093F\u0930\u094D\u092E\u093E\u0923", durationHi: "\u0968\u096B \u092E\u093F\u0928\u091F" },
  "kalidasa-works": { subtitleHi: "\u0915\u093E\u0932\u093F\u0926\u093E\u0938 \u0915\u0940 \u0938\u092D\u0940 \u0938\u093E\u0924 \u092A\u094D\u0930\u093E\u092E\u093E\u0923\u093F\u0915 \u0915\u0943\u0924\u093F\u092F\u094B\u0902 \u0915\u093E \u092A\u0930\u093F\u091A\u092F", durationHi: "\u0968\u0966 \u092E\u093F\u0928\u091F" },
  "sankhya": { subtitleHi: "\u0938\u093E\u0902\u0916\u094D\u092F \u0926\u094D\u0935\u0948\u0924\u0935\u093E\u0926 \u0915\u0947 25 \u0924\u0924\u094D\u0924\u094D\u0935", durationHi: "\u0968\u096B \u092E\u093F\u0928\u091F" },
  "yoga-sutra": { subtitleHi: "\u0906\u0920 \u0905\u0902\u0917 (\u0905\u0937\u094D\u091F\u093E\u0902\u0917) \u0914\u0930 \u0915\u0948\u0935\u0932\u094D\u092F \u0915\u093E \u092E\u093E\u0930\u094D\u0917", durationHi: "\u0968\u096B \u092E\u093F\u0928\u091F" },
  "upanishad": { subtitleHi: "12 \u092A\u094D\u0930\u092E\u0941\u0916 \u0909\u092A\u0928\u093F\u0937\u0926\u094D \u0914\u0930 \u0935\u0947\u0926\u093E\u0902\u0924 \u092A\u0930\u0902\u092A\u0930\u093E", durationHi: "\u0969\u0966 \u092E\u093F\u0928\u091F" },
  "manuscript-studies": { subtitleHi: "\u0939\u0938\u094D\u0924\u0932\u093F\u0916\u093F\u0924 \u0917\u094D\u0930\u0902\u0925-\u0935\u093F\u091C\u094D\u091E\u093E\u0928 \u0914\u0930 \u092A\u093E\u0902\u0921\u0941\u0932\u093F\u092A\u093F \u0938\u0942\u091A\u0940\u0915\u0930\u0923 \u0915\u0940 \u0924\u0915\u0928\u0940\u0915\u0947\u0902", durationHi: "\u0969\u096B \u092E\u093F\u0928\u091F" },
  "lexicography": { subtitleHi: "\u0936\u092C\u094D\u0926\u0915\u094B\u0936, \u0936\u092C\u094D\u0926-\u0905\u0927\u094D\u092F\u092F\u0928 \u0914\u0930 \u0905\u0930\u094D\u0925-\u0935\u093F\u0936\u094D\u0932\u0947\u0937\u0923", durationHi: "\u0969\u0966 \u092E\u093F\u0928\u091F" },
  "critical-edition-theory": { subtitleHi: "\u0932\u093E\u091A\u092E\u093E\u0928\u0935\u093E\u0926\u0940 \u0935\u093F\u0927\u093F \u092C\u0928\u093E\u092E \u0935\u0902\u0936\u093E\u0935\u0932\u0940-\u0906\u0927\u093E\u0930\u093F\u0924 \u0926\u0943\u0937\u094D\u091F\u093F\u0915\u094B\u0923", durationHi: "\u096C\u0966 \u092E\u093F\u0928\u091F" },
  "digital-humanities": { subtitleHi: "\u0915\u094B\u0936-\u092D\u093E\u0937\u093E\u0935\u093F\u091C\u094D\u091E\u093E\u0928, TEI-XML \u0914\u0930 \u0921\u093F\u091C\u093F\u091F\u0932 \u0909\u092A\u0915\u0930\u0923", durationHi: "\u096A\u096B \u092E\u093F\u0928\u091F" },
  "publication": { subtitleHi: "\u0938\u0902\u0938\u094D\u0915\u0943\u0924 \u0905\u0927\u094D\u092F\u092F\u0928 \u092E\u0947\u0902 \u092A\u0924\u094D\u0930\u093F\u0915\u093E\u090F\u0901, \u0936\u094B\u0927-\u092E\u094B\u0928\u094B\u0917\u094D\u0930\u093E\u092B \u0914\u0930 \u0938\u0939\u0915\u0930\u094D\u092E\u0940 \u0938\u092E\u0940\u0915\u094D\u0937\u093E", durationHi: "\u0969\u0966 \u092E\u093F\u0928\u091F" },
  "avyayibhava": { subtitleHi: "\u092A\u0942\u0930\u094D\u0935 \u0905\u0935\u094D\u092F\u092F \u0938\u0939\u093F\u0924 \u0915\u094D\u0930\u093F\u092F\u093E-\u0935\u093F\u0936\u0947\u0937\u0923 \u0938\u092E\u093E\u0938", durationHi: "\u0968\u0966 \u092E\u093F\u0928\u091F" },
  "relative-clauses": { subtitleHi: "\u0938\u0902\u092C\u0902\u0927\u0935\u093E\u091A\u0915 \u0938\u0930\u094D\u0935\u0928\u093E\u092E \u0914\u0930 \u0938\u093E\u092A\u0947\u0915\u094D\u0937 \u0935\u093E\u0915\u094D\u092F-\u0930\u091A\u0928\u093E", durationHi: "\u0968\u096B \u092E\u093F\u0928\u091F" },
  "declensions-practice": { subtitleHi: "\u0938\u092D\u0940 \u0932\u093F\u0902\u0917\u094B\u0902 \u092E\u0947\u0902 \u092A\u0942\u0930\u094D\u0923 \u0930\u0942\u092A-\u0924\u093E\u0932\u093F\u0915\u093E\u090F\u0901 \u0914\u0930 \u0938\u093E\u092E\u093E\u0928\u094D\u092F \u092A\u094D\u0930\u0924\u093F\u092E\u093E\u0928", durationHi: "\u0969\u0966 \u092E\u093F\u0928\u091F" }
};
export {
  lessonHi,
  lessons
};
