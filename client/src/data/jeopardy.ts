export interface JeopardyClue {
  id: string
  value: number
  clue: string
  clueHi?: string
  answer: string
  answerHi?: string
}

export interface JeopardyCategory {
  id: string
  name: string
  nameHi?: string
  nameSanskrit: string
  icon: string
  clues: JeopardyClue[]
}

export const jeopardyCategories: JeopardyCategory[] = [
  {
    id: 'alphabet',
    name: 'Alphabet',
    nameHi: 'वर्णमाला',
    nameSanskrit: 'वर्णमाला',
    icon: '🔤',
    clues: [
      { id: 'al-200', value: 200, clue: 'The first vowel of the Sanskrit alphabet', clueHi: 'संस्कृत वर्णमाला का पहला स्वर', answer: 'What is अ (a)?', answerHi: 'अ (a) क्या है?' },
      { id: 'al-400', value: 400, clue: 'The dental consonant series — tongue touches the teeth', clueHi: 'दन्त्य व्यंजन श्रृंखला — जीभ दांतों को छूती है', answer: 'What is त थ द ध न?', answerHi: 'त थ द ध न क्या है?' },
      { id: 'al-600', value: 600, clue: 'The three sibilants of Sanskrit', clueHi: 'संस्कृत के तीन ऊष्म ध्वनि', answer: 'What are श, ष, स?', answerHi: 'श, ष, स क्या हैं?' },
      { id: 'al-800', value: 800, clue: 'This sound ends every Sanskrit word in pausa', clueHi: 'यह ध्वनि पौसा में प्रत्येक संस्कृत शब्द को समाप्त करती है', answer: 'What is विसर्ग (ḥ)?', answerHi: 'विसर्ग (ḥ) क्या है?' },
      { id: 'al-1000', value: 1000, clue: 'क + ष = this conjunct consonant, written with a vertical stroke', clueHi: 'क + ष = यह संयुक्ताक्षर, ऊर्ध्वरेखा से लिखा जाता है', answer: 'What is क्ष?', answerHi: 'क्ष क्या है?' },
    ],
  },
  {
    id: 'grammar',
    name: 'Grammar',
    nameHi: 'व्याकरणम्',
    nameSanskrit: 'व्याकरणम्',
    icon: '📐',
    clues: [
      { id: 'gr-200', value: 200, clue: 'The number of cases (vibhaktis) in Sanskrit', clueHi: 'संस्कृत में विभक्तियों की संख्या', answer: 'What is 8?', answerHi: '8 क्या है?' },
      { id: 'gr-400', value: 400, clue: 'Instrumental singular of राम', clueHi: 'राम का तृतीया विभक्ति एकवचन', answer: 'What is रामेण?', answerHi: 'रामेण क्या है?' },
      { id: 'gr-600', value: 600, clue: 'The grammatical gender of पुस्तकम्', clueHi: 'पुस्तकम् का व्याकरणीय लिंग', answer: 'What is neuter (नपुंसक)?', answerHi: 'नपुंसकलिंग क्या है?' },
      { id: 'gr-800', value: 800, clue: 'The suffix that forms the past passive participle, as in कृत', clueHi: 'यह प्रत्यय भूतकालीन कर्मणि कृदन्त बनाता है, जैसे कृत', answer: 'What is क्त (ta)?', answerHi: 'क्त (ta) क्या है?' },
      { id: 'gr-1000', value: 1000, clue: 'The oldest surviving grammar of Sanskrit, its author, and his aphorism style', clueHi: 'संस्कृत का सबसे प्राचीन व्याकरण, उसके लेखक, और उनकी सूत्र शैली', answer: 'What is the Aṣṭādhyāyī by Pāṇini, in sūtra form?', answerHi: 'पाणिनि की अष्टाध्यायी, सूत्र रूप में क्या है?' },
    ],
  },
  {
    id: 'sandhi',
    name: 'Sandhi & Compounds',
    nameHi: 'सन्धि-समासौ',
    nameSanskrit: 'सन्धि-समासौ',
    icon: '🧩',
    clues: [
      { id: 'sa-200', value: 200, clue: 'देव + इन्द्रः = this word', clueHi: 'देव + इन्द्रः = यह शब्द', answer: 'What is देवेन्द्रः?', answerHi: 'देवेन्द्रः क्या है?' },
      { id: 'sa-400', value: 400, clue: 'The type of compound in राजपुरुषः', clueHi: 'राजपुरुषः में समास का प्रकार', answer: 'What is Tatpuruṣa?', answerHi: 'तत्पुरुष क्या है?' },
      { id: 'sa-600', value: 600, clue: 'The sandhi rule that turns अ + ए into ऐ', clueHi: 'सन्धि नियम जो अ + ए को ऐ में बदलता है', answer: 'What is Vṛddhi sandhi?', answerHi: 'वृद्धि सन्धि क्या है?' },
      { id: 'sa-800', value: 800, clue: 'प्रति + दिनम् = this indeclinable compound', clueHi: 'प्रति + दिनम् = यह अव्ययीभाव समास', answer: 'What is प्रतिदिनम् (Avyayībhāva)?', answerHi: 'प्रतिदिनम् (अव्ययीभाव) क्या है?' },
      { id: 'sa-1000', value: 1000, clue: 'The 5th member of a compound that qualifies another noun, like चक्रपाणिः', clueHi: 'समास का पांचवां सदस्य जो अन्य नाम को विशेषित करता है, जैसे चक्रपाणिः', answer: 'What is Bahuvrīhi?', answerHi: 'बहुव्रीहि क्या है?' },
    ],
  },
  {
    id: 'texts',
    name: 'Classical Texts',
    nameHi: 'शास्त्रग्रन्थाः',
    nameSanskrit: 'शास्त्रग्रन्थाः',
    icon: '📜',
    clues: [
      { id: 'tx-200', value: 200, clue: 'The epic whose first verse begins तपःस्वाध्यायनिरतम्', clueHi: 'महाकाव्य जिसका पहला श्लोक तपःस्वाध्यायनिरतम् से शुरू होता है', answer: 'What is the Rāmāyaṇa of Vālmīki?', answerHi: 'वाल्मीकि का रामायण क्या है?' },
      { id: 'tx-400', value: 400, clue: 'Kālidāsa\'s play about King Duṣyanta and a forest maiden', clueHi: 'राजा दुष्यंत और वन कन्या पर कालिदास का नाटक', answer: 'What is अभिज्ञानशाकुन्तलम्?', answerHi: 'अभिज्ञानशाकुन्तलम् क्या है?' },
      { id: 'tx-600', value: 600, clue: 'The Upaniṣad that teaches तत्त्वमसि', clueHi: 'जो उपनिषद् तत्त्वमसि सिखाता है', answer: 'What is the Chāndogya Upaniṣad?', answerHi: 'छान्दोग्य उपनिषद् क्या है?' },
      { id: 'tx-800', value: 800, clue: 'The 111-verse lyric poem about a cloud messenger', clueHi: 'मेघ दूत पर 111 श्लोकों का गीतिकाव्य', answer: 'What is मेघदूतम्?', answerHi: 'मेघदूतम् क्या है?' },
      { id: 'tx-1000', value: 1000, clue: 'This Nārāyaṇa-authored fable collection has four books: Mitralābha, Suhṛdbheda, Vigraha, Sandhi', clueHi: 'नारायण द्वारा रचित इस कथा संग्रह में चार अध्याय हैं: मित्रलाभ, सुहृद्भेद, विग्रह, सन्धि', answer: 'What is हितोपदेशः?', answerHi: 'हितोपदेशः क्या है?' },
    ],
  },
  {
    id: 'philosophy',
    name: 'Philosophy',
    nameHi: 'दर्शनम्',
    nameSanskrit: 'दर्शनम्',
    icon: '🧠',
    clues: [
      { id: 'ph-200', value: 200, clue: 'The founder of the Yoga system', clueHi: 'योग दर्शन के संस्थापक', answer: 'Who is Patañjali?', answerHi: 'पतञ्जलि कौन हैं?' },
      { id: 'ph-400', value: 400, clue: 'The number of tattvas enumerated by Sāṅkhya', clueHi: 'सांख्य द्वारा गणित तत्त्वों की संख्या', answer: 'What is 25?', answerHi: '25 क्या है?' },
      { id: 'ph-600', value: 600, clue: 'The first aphorism of the Nyāya Sūtra lists this many padārthas', clueHi: 'न्यायसूत्र का पहला सूत्र इतने पदार्थों को सूचीबद्ध करता है', answer: 'What is 16?', answerHi: '16 क्या है?' },
      { id: 'ph-800', value: 800, clue: 'The Advaita commentator on the Brahma Sūtra', clueHi: 'ब्रह्मसूत्र पर अद्वैत भाष्यकार', answer: 'Who is Śaṅkara?', answerHi: 'शंकर कौन हैं?' },
      { id: 'ph-1000', value: 1000, clue: 'This Mīmāṃsā aphorism defines dharma as what is indicated by the Vedic command', clueHi: 'यह मीमांसा सूत्र धर्म को वैदिक आज्ञा द्वारा इंगित किया गया मानता है', answer: 'What is चोदनालक्षणो धर्मः?', answerHi: 'चोदनालक्षणो धर्मः क्या है?' },
    ],
  },
  {
    id: 'culture',
    name: 'Culture & Wisdom',
    nameHi: 'संस्कृतिः',
    nameSanskrit: 'संस्कृतिः',
    icon: '🏛️',
    clues: [
      { id: 'cu-200', value: 200, clue: 'The traditional Sanskrit greeting meaning "I bow to you"', clueHi: 'पारंपरिक संस्कृत अभिवादन जिसका अर्थ "मैं आपको नमस्कार करता हूँ"', answer: 'What is नमस्ते?', answerHi: 'नमस्ते क्या है?' },
      { id: 'cu-400', value: 400, clue: 'सत्यं हि परमं धर्मम् — this is the theme of which wise saying', clueHi: 'सत्यं हि परमं धर्मम् — यह किस बुद्धिमान कहावत का विषय है', answer: 'What is truth (सत्यम्)?', answerHi: 'सत्य (सत्यम्) क्या है?' },
      { id: 'cu-600', value: 600, clue: 'The festival that is the subject of "दीपोत्सव" celebrations', clueHi: '"दीपोत्सव" उत्सवों का विषय पर्व', answer: 'What is दीपावली (Diwali)?', answerHi: 'दीपावली (दिवाली) क्या है?' },
      { id: 'cu-800', value: 800, clue: 'The emperor of the first famous rock edicts written in a script ancestral to Devanagari', clueHi: 'देवनागरी की पूर्ववर्ती लिपि में लिखे गए प्रसिद्ध शिलालेखों के सम्राट', answer: 'Who is अशोक (Aśoka)?', answerHi: 'अशोक कौन हैं?' },
      { id: 'cu-1000', value: 1000, clue: 'अहिंसा परमो धर्मः — this virtue named in the verse is the highest dharma', clueHi: 'अहिंसा परमो धर्मः — इस श्लोक में नामित गुण परम धर्म है', answer: 'What is non-violence (अहिंसा)?', answerHi: 'अहिंसा (अहिंसा) क्या है?' },
    ],
  },
]

export const doubleJeopardyCategories: JeopardyCategory[] = [
  {
    id: 'verbs',
    name: 'Verbs',
    nameHi: 'क्रियापदम्',
    nameSanskrit: 'क्रियापदम्',
    icon: '🏃',
    clues: [
      { id: 'dv-400', value: 400, clue: 'The root of गच्छति (he goes)', clueHi: 'गच्छति (वह जाता है) का धातु', answer: 'What is गम् (gam)?', answerHi: 'गम् (gam) क्या है?' },
      { id: 'dv-800', value: 800, clue: 'The present 3rd person singular of भव्', clueHi: 'भव् का वर्तमान पुरुष एकवचन', answer: 'What is भवति?', answerHi: 'भवति क्या है?' },
      { id: 'dv-1200', value: 1200, clue: 'The tense of अस्मि, भवति, गच्छामः', clueHi: 'अस्मि, भवति, गच्छामः का काल', answer: 'What is present (वर्तमान)?', answerHi: 'वर्तमान काल क्या है?' },
      { id: 'dv-1600', value: 1600, clue: 'The 9th class (kṛt-ādāna) marker that turns भू into भव', clueHi: '9वां वर्ग (कृत्यादान) प्रत्यय जो भू को भव में बदलता है', answer: 'What is श्ना/अ (śna/śap)?', answerHi: 'श्ना/अ (śna/śap) क्या है?' },
      { id: 'dv-2000', value: 2000, clue: 'The optative 3rd singular of भव्, meaning "may he be"', clueHi: 'भव् का इच्छार्थ पुरुष एकवचन, "वह हो" अर्थ', answer: 'What is भवेत्?', answerHi: 'भवेत् क्या है?' },
    ],
  },
  {
    id: 'numbers',
    name: 'Numbers & Time',
    nameHi: 'संख्या-कालौ',
    nameSanskrit: 'संख्या-कालौ',
    icon: '🔢',
    clues: [
      { id: 'nm-400', value: 400, clue: 'The Sanskrit word for 1000', clueHi: '1000 का संस्कृत शब्द', answer: 'What is सहस्रम्?', answerHi: 'सहस्रम् क्या है?' },
      { id: 'nm-800', value: 800, clue: 'The word for "today" in Sanskrit', clueHi: 'संस्कृत में "आज" का शब्द', answer: 'What is अद्य?', answerHi: 'अद्य क्या है?' },
      { id: 'nm-1200', value: 1200, clue: '१०० = this Devanagari numeral word', clueHi: '१०० = यह देवनागरी संख्या शब्द', answer: 'What is शतम्?', answerHi: 'शतम् क्या है?' },
      { id: 'nm-1600', value: 1600, clue: 'The muhūrta of sunrise and the first month of the traditional year', clueHi: 'सूर्योदय का मुहूर्त और पारंपरिक वर्ष का पहला मास', answer: 'What are ब्राह्ममुहूर्त and चैत्र?', answerHi: 'ब्राह्ममुहूर्त और चैत्र क्या हैं?' },
      { id: 'nm-2000', value: 2000, clue: 'The number of years in one Kali-yuga cycle', clueHi: 'एक कलियुग चक्र में वर्षों की संख्या', answer: 'What is 432,000?', answerHi: '432,000 क्या है?' },
    ],
  },
  {
    id: 'sages',
    name: 'Sages & Seers',
    nameHi: 'ऋषयः',
    nameSanskrit: 'ऋषयः',
    icon: '🧘',
    clues: [
      { id: 'sg-400', value: 400, clue: 'The seer to whom the Gāyatrī mantra is attributed', clueHi: 'गायत्री मन्त्र जिस ऋषि को श्रेय दिया जाता है', answer: 'Who is विश्वामित्र?', answerHi: 'विश्वामित्र कौन हैं?' },
      { id: 'sg-800', value: 800, clue: 'The grammarian sage of the Aṣṭādhyāyī, born at Śalātura', clueHi: 'अष्टाध्यायी के व्याकरणाचार्य, शलातुर में जन्मे', answer: 'Who is पाणिनि?', answerHi: 'पाणिनि कौन हैं?' },
      { id: 'sg-1200', value: 1200, clue: 'The teacher of the Yoga Sūtras and author of the Mahābhāṣya', clueHi: 'योगसूत्र के शिक्षक और महाभाष्य के लेखक', answer: 'Who is पतञ्जलि?', answerHi: 'पतञ्जलि कौन हैं?' },
      { id: 'sg-1600', value: 1600, clue: 'The sage whose hermitage Duṣyanta visited and met Śakuntalā', clueHi: 'जिस ऋषि के आश्रम में दुष्यंत गए और शकुंतला से मिले', answer: 'Who is कण्व?', answerHi: 'कण्व कौन हैं?' },
      { id: 'sg-2000', value: 2000, clue: 'The Mīmāṃsā sage known as वृत्तिकार, famous for his commentary on the sūtras', clueHi: 'वृत्तिकार के नाम से प्रसिद्ध मीमांसा ऋषि, सूत्रों पर भाष्य के लिए प्रसिद्ध', answer: 'Who is शबर?', answerHi: 'शबर कौन हैं?' },
    ],
  },
  {
    id: 'epic',
    name: 'Epic Characters',
    nameHi: 'महाकाव्यपात्राणि',
    nameSanskrit: 'महाकाव्यपात्राणि',
    icon: '⚔️',
    clues: [
      { id: 'ep-400', value: 400, clue: 'The bow that Rāma strung to win Sītā', clueHi: 'धनुष जिसे राम ने सीता को पाने के लिए तोड़ा', answer: 'What is पिनाक (Śiva\'s bow)?', answerHi: 'पिनाक (शिव का धनुष) क्या है?' },
      { id: 'ep-800', value: 800, clue: 'The charioteer of Arjuna in the Mahābhārata', clueHi: 'महाभारत में अर्जुन के सारथी', answer: 'Who is कृष्ण?', answerHi: 'कृष्ण कौन हैं?' },
      { id: 'ep-1200', value: 1200, clue: 'The son of Vāyu and the mightiest warrior on the Pāṇḍava side', clueHi: 'वायु के पुत्र और पांडव पक्ष के सबसे शक्तिशाली योद्धा', answer: 'Who is भीम?', answerHi: 'भीम कौन हैं?' },
      { id: 'ep-1600', value: 1600, clue: 'The rakshasa king of Laṅkā who abducted Sītā', clueHi: 'लंका के राक्षस राजा जिन्होंने सीता का अपहरण किया', answer: 'Who is रावण?', answerHi: 'रावण कौन हैं?' },
      { id: 'ep-2000', value: 2000, clue: 'The name of Arjuna\'s bow, gifted by Agni at Khāṇḍava', clueHi: 'अर्जुन के धनुष का नाम, खांडव में अग्नि द्वारा दिया गया', answer: 'What is गाण्डीव?', answerHi: 'गाण्डीव क्या है?' },
    ],
  },
  {
    id: 'kavya',
    name: 'Poetry & Drama',
    nameHi: 'काव्य-नाटकौ',
    nameSanskrit: 'काव्य-नाटकौ',
    icon: '🎭',
    clues: [
      { id: 'kv-400', value: 400, clue: 'The playwright of मृच्छकटिकम् (The Little Clay Cart)', clueHi: 'मृच्छकटिकम् (छोटी मिट्टी की गाड़ी) के नाटककार', answer: 'Who is शूद्रक?', answerHi: 'शूद्रक कौन हैं?' },
      { id: 'kv-800', value: 800, clue: 'The verse-master Bhartṛhari\'s collection of 100 moral stanzas', clueHi: 'कवि भर्तृहरि के 100 नैतिक श्लोकों का संग्रह', answer: 'What is नीतिशतकम्?', answerHi: 'नीतिशतकम् क्या है?' },
      { id: 'kv-1200', value: 1200, clue: 'The metre of the famous भोजनं ब्रह्म verse', clueHi: 'प्रसिद्ध भोजनं ब्रह्म श्लोक का छन्द', answer: 'What is अनुष्टुभ्?', answerHi: 'अनुष्टुभ् क्या है?' },
      { id: 'kv-1600', value: 1600, clue: 'The hero of Kālidāsa\'s विक्रमोर्वशीयम्', clueHi: 'कालिदास के विक्रमोर्वशीयम् का नायक', answer: 'Who is पुरूरवस्?', answerHi: 'पुरूरवस् कौन हैं?' },
      { id: 'kv-2000', value: 2000, clue: 'The 18-syllable-a-quarter metre of the Mahābhārata', clueHi: 'महाभारत का 18 अक्षर प्रति पाद छन्द', answer: 'What is अनुष्टुभ्-based श्लोक (trimeter variant)?', answerHi: 'अनुष्टुभ्-आधारित श्लोक (त्रिमात्रा रूपांतर) क्या है?' },
    ],
  },
  {
    id: 'veda',
    name: 'Vedas & Upaniṣads',
    nameHi: 'वेद-उपनिषदौ',
    nameSanskrit: 'वेद-उपनिषदौ',
    icon: '🔥',
    clues: [
      { id: 'vd-400', value: 400, clue: 'The Veda of melodies, linked to the Sāma singers', clueHi: 'सामगायकों से जुड़ा संगीत का वेद', answer: 'What is सामवेद?', answerHi: 'सामवेद क्या है?' },
      { id: 'vd-800', value: 800, clue: 'The oldest Upaniṣad, ending with the famous journey of Naciketas', clueHi: 'प्रसिद्ध नचिकेता की यात्रा से समाप्त होने वाला सबसे प्राचीन उपनिषद्', answer: 'What is कठोपनिषद्?', answerHi: 'कठोपनिषद् क्या है?' },
      { id: 'vd-1200', value: 1200, clue: 'The word meaning "that which is heard" — the revealed Vedic canon', clueHi: '"सुना हुआ" अर्थ वाला शब्द — प्रकट वैदिक शास्त्र', answer: 'What is श्रुति?', answerHi: 'श्रुति क्या है?' },
      { id: 'vd-1600', value: 1600, clue: 'The deity of the first Ṛgveda hymn, the fire-priest of the sacrifice', clueHi: 'प्रथम ऋग्वेद स्तोत्र के देवता, यज्ञ के अग्निपुरोहित', answer: 'Who is अग्नि?', answerHi: 'अग्नि कौन हैं?' },
      { id: 'vd-2000', value: 2000, clue: 'This Upaniṣad ends with the mantra "ॐ — पूर्णमदः पूर्णमिदम्"', clueHi: 'यह उपनिषद् "ॐ — पूर्णमदः पूर्णमिदम्" मन्त्र से समाप्त होता है', answer: 'What is the ईशावास्योपनिषद्?', answerHi: 'ईशावास्योपनिषद् क्या है?' },
    ],
  },
]

export interface FinalJeopardyClue {
  category: string
  categoryHi?: string
  categorySanskrit: string
  clue: string
  clueHi?: string
  answer: string
  answerHi?: string
}

export const finalJeopardy: FinalJeopardyClue = {
  category: 'The Mahāvākyas',
  categoryHi: 'महावाक्य',
  categorySanskrit: 'महावाक्यानि',
  clue: 'These four great sayings from the four Vedas proclaim the identity of the individual self and Brahman — name one, with its source Veda',
  clueHi: 'चार वेदों से चार महान वचन आत्मा और ब्रह्म की एकता की घोषणा करते हैं — एक नाम बताएं, उसके वेद के साथ',
  answer: 'What are अहं ब्रह्मास्मि (Ṛgveda), तत्त्वमसि (Sāma), प्रज्ञानं ब्रह्म (Atharva), or अयमात्मा ब्रह्म (Yajur)?',
  answerHi: 'अहं ब्रह्मास्मि (ऋग्वेद), तत्त्वमसि (सामवेद), प्रज्ञानं ब्रह्म (अथर्ववेद), या अयमात्मा ब्रह्म (यजुर्वेद)?',
}
