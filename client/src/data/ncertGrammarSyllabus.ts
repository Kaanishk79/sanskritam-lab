export interface GrammarTopic {
  title: string
  titleSanskrit: string
  points: string[]
}

export interface ClassGrammar {
  band: string
  label: string
  topics: GrammarTopic[]
}

export const grammarSyllabus: Record<number, ClassGrammar> = {
  6: {
    band: '6-8',
    label: 'माध्यमिक व्याकरणम् — कक्षा ६',
    topics: [
      { title: 'Varnavicāra (Phonetics)', titleSanskrit: 'वर्ण-विचारः', points: [
        'उच्चारण-स्थानानि (articulatory phonetics) emphasised alongside the Varnamala',
        'स्वराः (vowels) and व्यञ्जनानि (consonants) with their उच्चारण-स्थान',
        'Classification: ह्रस्व, दीर्घ, प्लुत swaras and five varga groups',
      ] },
      { title: 'Śabdarūpāṇi (Noun Forms)', titleSanskrit: 'शब्दरूपाणि', points: [
        'Core forms for Class 6: बालक (masculine), बालिका (feminine), पुष्प (neuter)',
        'All eight cases (विभक्तयः) across singular, dual and plural',
        'Practical endings only — the essential set required at this level',
      ] },
      { title: 'Dhāturūpāṇi (Verb Forms)', titleSanskrit: 'धातुरूपाणि', points: [
        'Five lakāras: लट् (present), लृट् (future), लङ् (past), लोट् (imperative), विधिलिङ् (optative)',
        'Core verbs: पठ्, लिख्, गम्, भू, कृ, दा, अस्',
        'Conjugations in all six person/endings (प्रथम/मध्यम/उत्तम)',
      ] },
      { title: 'Kāraka evaṁ Vibhakti', titleSanskrit: 'कारक एवं विभक्ति', points: [
        'उपपद-विभक्ति: तृतीया (सह / सार्धम्), चतुर्थी (नमः / स्वाहा)',
        'How to map कारक with correct विभक्ति in simple sentences',
      ] },
      { title: 'Sandhi', titleSanskrit: 'सन्धि कार्यम्', points: [
        'Svara Sandhi only: दीर्घ, गुण, वृद्धि, यण्',
        'Join and split practice between vowels',
      ] },
      { title: 'Pratyayāḥ (Suffixes)', titleSanskrit: 'प्रत्ययाः', points: [
        'Core connectives: क्त्वा, तुमुन्, ल्यप्',
        'Example: कृत्वा, गन्तुम्, आगम्य in short sentences',
      ] },
      { title: 'Rachnātmak Kārya (Creative)', titleSanskrit: 'रचनात्मक कार्यम्', points: [
        'Simple translation (sentence level) and paragraph gap-fill',
        'अव्यय: अपि, च, एव, कुत्र, अद्य',
      ] },
    ],
  },
  7: {
    band: '6-8',
    label: 'माध्यमिक व्याकरणम् — कक्षा ७',
    topics: [
      { title: 'Varnavicāra', titleSanskrit: 'वर्ण-विचारः', points: [
        'Refinement of उच्चारण-स्थान for accuracy',
        'Consonant clusters and visarga practice',
      ] },
      { title: 'Śabdarūpāṇi', titleSanskrit: 'शब्दरूपाणि', points: [
        'Forms: कवि, मति, नदी, पितृ, मातृ (new genders)',
        'Pronouns: तत्, किम्, अस्मद्, युष्मद्',
      ] },
      { title: 'Dhāturūpāṇi', titleSanskrit: 'धातुरूपाणि', points: [
        'Five lakāras with पठ्, लिख्, गम्, भू, कृ etc.',
        'Personal endings practice through sentences',
      ] },
      { title: 'Kāraka eva Vibhakti', titleSanskrit: 'कारक एवं विभक्ति', points: [
        'उपपद-विभक्ति rules: तृतीया with सह, चतुर्थी with नमः',
      ] },
      { title: 'Sandhi', titleSanskrit: 'सन्धि कार्यम्', points: [
        'Svara Sandhi: दीर्घ, गुण, वृद्धि, यण्',
      ] },
      { title: 'Rachnā', titleSanskrit: 'रचनात्मक कार्यम्', points: [
        'Sentence making with new words; short paragraph writing',
      ] },
    ],
  },
  8: {
    band: '6-8',
    label: 'माता-भाषा व्याकरणम् — कक्षा ८',
    topics: [
      { title: 'Śabdrūpāṇi', titleSanskrit: 'शब्दरूपाणि', points: [
        'राजन्, भवत् (honorific) — new declensions',
        'संख्याएं: १–४ in all genders, complete counting १–१००',
      ] },
      { title: 'Dhāturūpāṇi', titleSanskrit: 'धातुरूपाणि', points: [
        'Five lakāras with core verb set',
        'Voice: beginning of passive forms',
      ] },
      { title: 'Kāraka & Vibhakti', titleSanskrit: 'कारक एवं विभक्ति', points: [
        'उपपद-विभक्ति in longer sentences',
      ] },
      { title: 'Sandhi', titleSanskrit: 'सन्धि', points: [
        'Svara Sandhi: दीर्घ, गुण, वृद्धि, यण्',
      ] },
      { title: 'Derivatives', titleSanskrit: 'प्रत्यय', points: [
        'क्त्वा, तुमुन्, ल्यप् forming compound verbs',
      ] },
    ],
  },
  9: {
    band: '9-10',
    label: 'Vyakaranavīthi — कक्षा ९',
    topics: [
      { title: 'Varna vyakarana', titleSanskrit: 'वर्ण-विचार', points: [
        'Phonetic classification and script properties',
      ] },
      { title: 'Saṃjñā & Paribhāṣā', titleSanskrit: 'संज्ञा एवं परिभाषा', points: [
        'Terminology (25-mark applied grammar block)',
      ] },
      { title: 'Sandhi', titleSanskrit: 'सन्धि', points: [
        'Svara: यण, अयादि, पूर्व-रूप',
        'Vyañjana: जश्त्व, अनुस्वार, परिसवर्ण',
        'Visarga: उत्त्व, रुटव, लोप, सक्त्व',
      ] },
      { title: 'Śabda & Dhātu', titleSanskrit: 'शब्दरूप एवं धातुरूप', points: [
        'Consonant-ending nouns: आत्मन्, शर्मन्, वाच्',
        'Ātmanepada verbs in translation',
      ] },
      { title: 'Upasarga & Avyaya', titleSanskrit: 'उपसर्ग एवं अव्यय', points: [
        '22 prefixes (उपसर्ग) and sentence placement',
      ] },
      { title: 'Pratyaya', titleSanskrit: 'प्रत्यय', points: [
        'Krt: क्त, क्तवतु, शतृ, शानच, तव्यत्, अनीयर्',
        'Taddhita: मतुप्, इन्, ठक्, त्व, तन्; Stri: टाप्, ङीप्',
      ] },
      { title: 'Samāsa', titleSanskrit: 'समास', points: [
        'अव्ययीभाव, तत्पुरुष (वि and नञ follow), द्वन्द्व, बहुव्रीहि',
      ] },
      { title: 'Kāraka & Vibhakti', titleSanskrit: 'कारक और विभक्ति', points: [
        'Advanced mapping in long sentences',
      ] },
      { title: 'Vākya', titleSanskrit: 'वाच्य परिवर्तन', points: [
        'Karta-bhāva → karma → bhāva (present only)',
      ] },
      { title: 'Rachanā', titleSanskrit: 'रचना प्रयोग', points: [
        'Letter frames with मञ्जूषा (clue box)',
        'Picture description / अनुच्छेद (5 sentences)',
        'Translation (अनुवादः) from Hindi/English texts',
      ] },
    ],
  },
  10: {
    band: '9-10',
    label: 'Vyākaraṇavīthi — कक्षा १०',
    topics: [
      { title: 'Varn vicāra', titleSanskrit: 'वर्ण-विचार', points: ['Phonetic classification'] },
      { title: 'Sandhi', titleSanskrit: 'सन्धि', points: ['Svara, vyañjana, visarga detail'] },
      { title: 'Shabda & dhātu', titleSanskrit: 'शब्दरूप-धातुरूप', points: ['Consonant stems & verb forms'] },
      { title: 'Prefixes', titleSanskrit: 'उपसर्ग अव्यय', points: ['22 prefixes + indeclinables'] },
      { title: 'Pratyaya', titleSanskrit: 'प्रत्यय', points: ['Krt, taddhita, stri suffixes'] },
      { title: 'Samasa', titleSanskrit: 'समास', points: ['Compound types & vigraha'] },
      { title: 'Kāraka', titleSanskrit: 'कारक', points: ['Case mapping'] },
      { title: 'Vachya', titleSanskrit: 'वाच्य', points: ['Voice change (present only)'] },
      { title: 'Rachana', titleSanskrit: 'रचना', points: ['Letter / description / translation'] },
    ],
  },
  11: {
    band: '11-12',
    label: 'उच्च व्याकरण एवं साहित्य — कक्षा ११',
    topics: [
      { title: 'Sukshma Vyakaranam', titleSanskrit: 'सूक्ष्म व्याकरणम्', points: [
        'Identify कर्ता, क्रिया, विशेषण, विशेष्य in literary passages',
      ] },
      { title: 'Etymology', titleSanskrit: 'प्राकृत-प्रत्यय-विभाग', points: [
        'Break words into their historic root + suffix parts',
      ] },
      { title: 'Chandas (Metre)', titleSanskrit: 'छन्दः परिचय', points: [
        'Anuṣṭubh, Indravajrā, Upendravajrā',
        'Vasantatilakā, Mālinī, Māndākrāntā, Śikharīṇī',
      ] },
      { title: 'Alaṅkāra', titleSanskrit: 'अलङ्कार परिचय', points: [
        'Anuprāsa, Yamaka, Śleṣa',
        'Upamā, Rūpaka, Utprekṣā, Atiśayokti',
      ] },
      { title: 'Unseen Passage', titleSanskrit: 'अपठित-अवबोधन', points: [
        '10-mark comprehension with title selection',
      ] },
    ],
  },
  12: {
    band: '11-12',
    label: 'Advanced Vyakaranam — कक्षा १२',
    topics: [
      { title: 'Textual Analysis', titleSanskrit: 'सूक्ष्म व्याकरण', points: [
        'Contextual identification of क्रिया, कर्ता, विशेषण etc.',
      ] },
      { title: 'Etymology', titleSanskrit: 'प्रकृति-प्रत्यय-विभाग', points: [
        'Deconstruct historical compounds',
      ] },
      { title: 'Special rules', titleSanskrit: 'कारक-विशेष-विभक्ति', points: [
        'निर्धारण and आज्ञा usages in classical prose',
      ] },
      { title: 'Meters & Figures', titleSanskrit: 'छन्द एवं अलङ्कार', points: [
        'Scansion and figure hunting in Bhaswati verses',
      ] },
      { title: 'Unseen Passage', titleSanskrit: 'अपठित-अवबोधन', points: [
        '10-mark comprehension assessment',
      ] },
    ],
  },
}

function sanitize(points: string[]): string[] {
  return points.map((p) => (p || '').replace(/\s+/g, ' ').trim()).filter(Boolean)
}

function pickKey(govClass: number): number {
  if (govClass <= 6) return 6
  if (govClass === 7) return 7
  if (govClass === 8) return 8
  if (govClass === 9) return 9
  if (govClass === 10) return 10
  if (govClass === 11) return 11
  return 12
}

export function getGrammarTopics(govClass: number): GrammarTopic[] {
  const entry = grammarSyllabus[pickKey(govClass)]
  return entry ? entry.topics.map((t) => ({ ...t, points: sanitize(t.points) })) : []
}

export const classRangeForBand = (govClass: number) => {
  if (govClass <= 8) return '6-8'
  if (govClass <= 10) return '9-10'
  return '11-12'
}