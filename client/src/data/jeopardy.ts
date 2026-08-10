export interface JeopardyClue {
  id: string
  value: number
  clue: string
  answer: string
}

export interface JeopardyCategory {
  id: string
  name: string
  nameSanskrit: string
  icon: string
  clues: JeopardyClue[]
}

export const jeopardyCategories: JeopardyCategory[] = [
  {
    id: 'alphabet',
    name: 'Alphabet',
    nameSanskrit: 'वर्णमाला',
    icon: '🔤',
    clues: [
      { id: 'al-200', value: 200, clue: 'The first vowel of the Sanskrit alphabet', answer: 'What is अ (a)?' },
      { id: 'al-400', value: 400, clue: 'The dental consonant series — tongue touches the teeth', answer: 'What is त थ द ध न?' },
      { id: 'al-600', value: 600, clue: 'The three sibilants of Sanskrit', answer: 'What are श, ष, स?' },
      { id: 'al-800', value: 800, clue: 'This sound ends every Sanskrit word in pausa', answer: 'What is विसर्ग (ḥ)?' },
      { id: 'al-1000', value: 1000, clue: 'क + ष = this conjunct consonant, written with a vertical stroke', answer: 'What is क्ष?' },
    ],
  },
  {
    id: 'grammar',
    name: 'Grammar',
    nameSanskrit: 'व्याकरणम्',
    icon: '📐',
    clues: [
      { id: 'gr-200', value: 200, clue: 'The number of cases (vibhaktis) in Sanskrit', answer: 'What is 8?' },
      { id: 'gr-400', value: 400, clue: 'Instrumental singular of राम', answer: 'What is रामेण?' },
      { id: 'gr-600', value: 600, clue: 'The grammatical gender of पुस्तकम्', answer: 'What is neuter (नपुंसक)?' },
      { id: 'gr-800', value: 800, clue: 'The suffix that forms the past passive participle, as in कृत', answer: 'What is क्त (ta)?' },
      { id: 'gr-1000', value: 1000, clue: 'The oldest surviving grammar of Sanskrit, its author, and his aphorism style', answer: 'What is the Aṣṭādhyāyī by Pāṇini, in sūtra form?' },
    ],
  },
  {
    id: 'sandhi',
    name: 'Sandhi & Compounds',
    nameSanskrit: 'सन्धि-समासौ',
    icon: '🧩',
    clues: [
      { id: 'sa-200', value: 200, clue: 'देव + इन्द्रः = this word', answer: 'What is देवेन्द्रः?' },
      { id: 'sa-400', value: 400, clue: 'The type of compound in राजपुरुषः', answer: 'What is Tatpuruṣa?' },
      { id: 'sa-600', value: 600, clue: 'The sandhi rule that turns अ + ए into ऐ', answer: 'What is Vṛddhi sandhi?' },
      { id: 'sa-800', value: 800, clue: 'प्रति + दिनम् = this indeclinable compound', answer: 'What is प्रतिदिनम् (Avyayībhāva)?' },
      { id: 'sa-1000', value: 1000, clue: 'The 5th member of a compound that qualifies another noun, like चक्रपाणिः', answer: 'What is Bahuvrīhi?' },
    ],
  },
  {
    id: 'texts',
    name: 'Classical Texts',
    nameSanskrit: 'शास्त्रग्रन्थाः',
    icon: '📜',
    clues: [
      { id: 'tx-200', value: 200, clue: 'The epic whose first verse begins तपःस्वाध्यायनिरतम्', answer: 'What is the Rāmāyaṇa of Vālmīki?' },
      { id: 'tx-400', value: 400, clue: 'Kālidāsa\'s play about King Duṣyanta and a forest maiden', answer: 'What is अभिज्ञानशाकुन्तलम्?' },
      { id: 'tx-600', value: 600, clue: 'The Upaniṣad that teaches तत्त्वमसि', answer: 'What is the Chāndogya Upaniṣad?' },
      { id: 'tx-800', value: 800, clue: 'The 111-verse lyric poem about a cloud messenger', answer: 'What is मेघदूतम्?' },
      { id: 'tx-1000', value: 1000, clue: 'This Nārāyaṇa-authored fable collection has four books: Mitralābha, Suhṛdbheda, Vigraha, Sandhi', answer: 'What is हितोपदेशः?' },
    ],
  },
  {
    id: 'philosophy',
    name: 'Philosophy',
    nameSanskrit: 'दर्शनम्',
    icon: '🧠',
    clues: [
      { id: 'ph-200', value: 200, clue: 'The founder of the Yoga system', answer: 'Who is Patañjali?' },
      { id: 'ph-400', value: 400, clue: 'The number of tattvas enumerated by Sāṅkhya', answer: 'What is 25?' },
      { id: 'ph-600', value: 600, clue: 'The first aphorism of the Nyāya Sūtra lists this many padārthas', answer: 'What is 16?' },
      { id: 'ph-800', value: 800, clue: 'The Advaita commentator on the Brahma Sūtra', answer: 'Who is Śaṅkara?' },
      { id: 'ph-1000', value: 1000, clue: 'This Mīmāṃsā aphorism defines dharma as what is indicated by the Vedic command', answer: 'What is चोदनालक्षणो धर्मः?' },
    ],
  },
  {
    id: 'culture',
    name: 'Culture & Wisdom',
    nameSanskrit: 'संस्कृतिः',
    icon: '🏛️',
    clues: [
      { id: 'cu-200', value: 200, clue: 'The traditional Sanskrit greeting meaning "I bow to you"', answer: 'What is नमस्ते?' },
      { id: 'cu-400', value: 400, clue: 'सत्यं हि परमं धर्मम् — this is the theme of which wise saying', answer: 'What is truth (सत्यम्)?' },
      { id: 'cu-600', value: 600, clue: 'The festival that is the subject of "दीपोत्सव" celebrations', answer: 'What is दीपावली (Diwali)?' },
      { id: 'cu-800', value: 800, clue: 'The emperor of the first famous rock edicts written in a script ancestral to Devanagari', answer: 'Who is अशोक (Aśoka)?' },
      { id: 'cu-1000', value: 1000, clue: 'अहिंसा परमो धर्मः — this virtue named in the verse is the highest dharma', answer: 'What is non-violence (अहिंसा)?' },
    ],
  },
]

export const doubleJeopardyCategories: JeopardyCategory[] = [
  {
    id: 'verbs',
    name: 'Verbs',
    nameSanskrit: 'क्रियापदम्',
    icon: '🏃',
    clues: [
      { id: 'dv-400', value: 400, clue: 'The root of गच्छति (he goes)', answer: 'What is गम् (gam)?' },
      { id: 'dv-800', value: 800, clue: 'The present 3rd person singular of भव्', answer: 'What is भवति?' },
      { id: 'dv-1200', value: 1200, clue: 'The tense of अस्मि, भवति, गच्छामः', answer: 'What is present (वर्तमान)?' },
      { id: 'dv-1600', value: 1600, clue: 'The 9th class (kṛt-ādāna) marker that turns भू into भव', answer: 'What is श्ना/अ (śna/śap)?' },
      { id: 'dv-2000', value: 2000, clue: 'The optative 3rd singular of भव्, meaning "may he be"', answer: 'What is भवेत्?' },
    ],
  },
  {
    id: 'numbers',
    name: 'Numbers & Time',
    nameSanskrit: 'संख्या-कालौ',
    icon: '🔢',
    clues: [
      { id: 'nm-400', value: 400, clue: 'The Sanskrit word for 1000', answer: 'What is सहस्रम्?' },
      { id: 'nm-800', value: 800, clue: 'The word for "today" in Sanskrit', answer: 'What is अद्य?' },
      { id: 'nm-1200', value: 1200, clue: '१०० = this Devanagari numeral word', answer: 'What is शतम्?' },
      { id: 'nm-1600', value: 1600, clue: 'The muhūrta of sunrise and the first month of the traditional year', answer: 'What are ब्राह्ममुहूर्त and चैत्र?' },
      { id: 'nm-2000', value: 2000, clue: 'The number of years in one Kali-yuga cycle', answer: 'What is 432,000?' },
    ],
  },
  {
    id: 'sages',
    name: 'Sages & Seers',
    nameSanskrit: 'ऋषयः',
    icon: '🧘',
    clues: [
      { id: 'sg-400', value: 400, clue: 'The seer to whom the Gāyatrī mantra is attributed', answer: 'Who is विश्वामित्र?' },
      { id: 'sg-800', value: 800, clue: 'The grammarian sage of the Aṣṭādhyāyī, born at Śalātura', answer: 'Who is पाणिनि?' },
      { id: 'sg-1200', value: 1200, clue: 'The teacher of the Yoga Sūtras and author of the Mahābhāṣya', answer: 'Who is पतञ्जलि?' },
      { id: 'sg-1600', value: 1600, clue: 'The sage whose hermitage Duṣyanta visited and met Śakuntalā', answer: 'Who is कण्व?' },
      { id: 'sg-2000', value: 2000, clue: 'The Mīmāṃsā sage known as वृत्तिकार, famous for his commentary on the sūtras', answer: 'Who is शबर?' },
    ],
  },
  {
    id: 'epic',
    name: 'Epic Characters',
    nameSanskrit: 'महाकाव्यपात्राणि',
    icon: '⚔️',
    clues: [
      { id: 'ep-400', value: 400, clue: 'The bow that Rāma strung to win Sītā', answer: 'What is पिनाक (Śiva\'s bow)?' },
      { id: 'ep-800', value: 800, clue: 'The charioteer of Arjuna in the Mahābhārata', answer: 'Who is कृष्ण?' },
      { id: 'ep-1200', value: 1200, clue: 'The son of Vāyu and the mightiest warrior on the Pāṇḍava side', answer: 'Who is भीम?' },
      { id: 'ep-1600', value: 1600, clue: 'The rakshasa king of Laṅkā who abducted Sītā', answer: 'Who is रावण?' },
      { id: 'ep-2000', value: 2000, clue: 'The name of Arjuna\'s bow, gifted by Agni at Khāṇḍava', answer: 'What is गाण्डीव?' },
    ],
  },
  {
    id: 'kavya',
    name: 'Poetry & Drama',
    nameSanskrit: 'काव्य-नाटकौ',
    icon: '🎭',
    clues: [
      { id: 'kv-400', value: 400, clue: 'The playwright of मृच्छकटिकम् (The Little Clay Cart)', answer: 'Who is शूद्रक?' },
      { id: 'kv-800', value: 800, clue: 'The verse-master Bhartṛhari\'s collection of 100 moral stanzas', answer: 'What is नीतिशतकम्?' },
      { id: 'kv-1200', value: 1200, clue: 'The metre of the famous भोजनं ब्रह्म verse', answer: 'What is अनुष्टुभ्?' },
      { id: 'kv-1600', value: 1600, clue: 'The hero of Kālidāsa\'s विक्रमोर्वशीयम्', answer: 'Who is पुरूरवस्?' },
      { id: 'kv-2000', value: 2000, clue: 'The 18-syllable-a-quarter metre of the Mahābhārata', answer: 'What is अनुष्टुभ्-based श्लोक (trimeter variant)?' },
    ],
  },
  {
    id: 'veda',
    name: 'Vedas & Upaniṣads',
    nameSanskrit: 'वेद-उपनिषदौ',
    icon: '🔥',
    clues: [
      { id: 'vd-400', value: 400, clue: 'The Veda of melodies, linked to the Sāma singers', answer: 'What is सामवेद?' },
      { id: 'vd-800', value: 800, clue: 'The oldest Upaniṣad, ending with the famous journey of Naciketas', answer: 'What is कठोपनिषद्?' },
      { id: 'vd-1200', value: 1200, clue: 'The word meaning "that which is heard" — the revealed Vedic canon', answer: 'What is श्रुति?' },
      { id: 'vd-1600', value: 1600, clue: 'The deity of the first Ṛgveda hymn, the fire-priest of the sacrifice', answer: 'Who is अग्नि?' },
      { id: 'vd-2000', value: 2000, clue: 'This Upaniṣad ends with the mantra "ॐ — पूर्णमदः पूर्णमिदम्"', answer: 'What is the ईशावास्योपनिषद्?' },
    ],
  },
]

export interface FinalJeopardyClue {
  category: string
  categorySanskrit: string
  clue: string
  answer: string
}

export const finalJeopardy: FinalJeopardyClue = {
  category: 'The Mahāvākyas',
  categorySanskrit: 'महावाक्यानि',
  clue: 'These four great sayings from the four Vedas proclaim the identity of the individual self and Brahman — name one, with its source Veda',
  answer: 'What are अहं ब्रह्मास्मि (Ṛgveda), तत्त्वमसि (Sāma), प्रज्ञानं ब्रह्म (Atharva), or अयमात्मा ब्रह्म (Yajur)?',
}
