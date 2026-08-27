export interface TestQuestion {
  id: string
  category: string
  prompt: string
  promptHi?: string
  options: string[]
  optionsHi?: string[]
  correct: number
}

export const anytimeTestQuestions: TestQuestion[] = [
  { id: 't01', category: 'Alphabet', prompt: 'Which of these is the retroflex स (ṣa)?', promptHi: 'इनमें कौन मूर्धन्य स (ष) है?', options: ['श', 'ष', 'स', 'ह'], optionsHi: ['श', 'ष', 'स', 'ह'], correct: 1 },
  { id: 't02', category: 'Alphabet', prompt: 'How many vowels (svara) does the Sanskrit alphabet have?', promptHi: 'संस्कृत वर्णमाला में कितने स्वर हैं?', options: ['12', '13', '14', '16'], optionsHi: ['12', '13', '14', '16'], correct: 2 },
  { id: 't03', category: 'Alphabet', prompt: 'Which conjunct is formed by क + ष?', promptHi: 'क + ष से कौन सा संयुक्ताक्षर बनता है?', options: ['क्क', 'क्ष', 'ज्ञ', 'त्र'], optionsHi: ['क्क', 'क्ष', 'ज्ञ', 'त्र'], correct: 1 },
  { id: 't04', category: 'Alphabet', prompt: 'The letter ळ belongs to which class of sounds?', promptHi: 'अक्षर ळ किस वर्ग का है?', options: ['Dental', 'Retroflex', 'Palatal', 'Labial'], optionsHi: ['दन्त्य', 'मूर्धन्य', 'तालव्य', 'ओष्ठ्य'], correct: 1 },
  { id: 't05', category: 'Alphabet', prompt: 'Which sound ends words in विसर्ग?', promptHi: 'विसर्ग से कौन सा ध्वनि शब्द समाप्त होता है?', options: ['म्', 'ः', 'ँ', '्'], optionsHi: ['म्', 'ः', 'ँ', '्'], correct: 1 },
  { id: 't06', category: 'Grammar', prompt: 'Instrumental plural of रामः is:', promptHi: 'रामः का तृतीया बहुवचन है:', options: ['रामेण', 'रामैः', 'रामेभ्यः', 'रामाय'], optionsHi: ['रामेण', 'रामैः', 'रामेभ्यः', 'रामाय'], correct: 1 },
  { id: 't07', category: 'Grammar', prompt: 'The case of the word in रामाय गच्छति is:', promptHi: 'रामाय गच्छति में शब्द का विभक्ति कौन सी है?', options: ['Genitive', 'Dative', 'Accusative', 'Ablative'], optionsHi: ['षष्ठी', 'चतुर्थी', 'द्वितीय', 'पञ्चमी'], correct: 1 },
  { id: 't08', category: 'Grammar', prompt: 'देव is an example of which stem class?', promptHi: 'देव किस प्रत्यय वर्ग का उदाहरण है?', options: ['उ-कारान्त', 'इ-कारान्त', 'अ-कारान्त', 'आ-कारान्त'], optionsHi: ['उ-कारान्त', 'इ-कारान्त', 'अ-कारान्त', 'आ-कारान्त'], correct: 2 },
  { id: 't09', category: 'Grammar', prompt: 'Which suffix forms the present participle, as in पठन्?', promptHi: 'पठन् में कौन सा प्रत्यय वर्तमान कृदन्त बनाता है?', options: ['शतृ', 'क्त', 'कृत्य', 'तव्य'], optionsHi: ['शतृ', 'क्त', 'कृत्य', 'तव्य'], correct: 0 },
  { id: 't10', category: 'Grammar', prompt: 'The dual of अहम् is:', promptHi: 'अहम् का द्विवचन है:', options: ['वयम्', 'आवाम्', 'युवाम्', 'भवन्तौ'], optionsHi: ['वयम्', 'आवाम्', 'युवाम्', 'भवन्तौ'], correct: 1 },
  { id: 't11', category: 'Sandhi', prompt: 'न + एति = ?', promptHi: 'न + एति = ?', options: ['नैति', 'नेति', 'नयति', 'नैतिः'], optionsHi: ['नैति', 'नेति', 'नयति', 'नैतिः'], correct: 1 },
  { id: 't12', category: 'Sandhi', prompt: 'Which compound type is नीलोत्पलम्?', promptHi: 'नीलोत्पलम् किस प्रकार का समास है?', options: ['Tatpuruṣa', 'Dvandva', 'Karmadhāraya', 'Bahuvrīhi'], optionsHi: ['तत्पुरुष', 'द्वन्द्व', 'कर्मधारय', 'बहुव्रीहि'], correct: 2 },
  { id: 't13', category: 'Sandhi', prompt: 'गुरु + उपदेशः = ?', promptHi: 'गुरु + उपदेशः = ?', options: ['गुरूपदेशः', 'गुर्वोपदेशः', 'गुरुपदेशः', 'गुरूवपदेशः'], optionsHi: ['गुरूपदेशः', 'गुर्वोपदेशः', 'गुरुपदेशः', 'गुरूवपदेशः'], correct: 0 },
  { id: 't14', category: 'Sandhi', prompt: 'The word विद्यालयः contains which sandhi?', promptHi: 'विद्यालयः शब्द में कौन सी सन्धि है?', options: ['Guṇa', 'Vṛddhi', 'Yaṇ', 'Viśarga'], optionsHi: ['गुण', 'वृद्धि', 'यण', 'विसर्ग'], correct: 0 },
  { id: 't15', category: 'Sandhi', prompt: 'राम + ईश्वरः = ?', promptHi: 'राम + ईश्वरः = ?', options: ['रामेश्वरः', 'रामैश्वरः', 'रामीश्वरः', 'रामेश्वरम्'], optionsHi: ['रामेश्वरः', 'रामैश्वरः', 'रामीश्वरः', 'रामेश्वरम्'], correct: 0 },
  { id: 't16', category: 'Texts', prompt: 'Which text is a commentary on the Brahma Sūtras by Śaṅkara?', promptHi: 'कौन सा ग्रंथ शंकर का ब्रह्मसूत्र पर भाष्य है?', options: ['Śārīraka Bhāṣya', 'Mahābhāṣya', 'Kāśikā', 'Siddhānta Kaumudī'], optionsHi: ['शारीरक भाष्य', 'महाभाष्य', 'काशिका', 'सिद्धान्त कौमुदी'], correct: 0 },
  { id: 't17', category: 'Texts', prompt: 'The Nāṭyaśāstra, the ancient treatise on drama, was written by:', promptHi: 'नाट्यशास्त्र, नाटक पर प्राचीन ग्रंथ, किसने लिखा?', options: ['Bharata', 'Viśākhadatta', 'Śūdraka', 'Bāṇa'], optionsHi: ['भरत', 'विशाखदत्त', 'शूद्रक', 'बाण'], correct: 0 },
  { id: 't18', category: 'Texts', prompt: 'Which collection has 700 verses?', promptHi: 'किस संग्रह में 700 श्लोक हैं?', options: ['Hitopadeśa', 'Bhagavad Gītā', 'Meghadūta', 'Niśīthacūrṇi'], optionsHi: ['हितोपदेश', 'भगवद्गीता', 'मेघदूत', 'निशीथचूर्णी'], correct: 1 },
  { id: 't19', category: 'Texts', prompt: 'The author of the Rāmāyaṇa is:', promptHi: 'रामायण के लेखक हैं:', options: ['Vālmīki', 'Vyāsa', 'Tulsīdāsa', 'Kālidāsa'], optionsHi: ['वाल्मीकि', 'व्यास', 'तुलसीदास', 'कालिदास'], correct: 0 },
  { id: 't20', category: 'Texts', prompt: 'मनुस्मृति is primarily a text on:', promptHi: 'मनुस्मृति मुख्य रूप से किस पर ग्रंथ है?', options: ['Grammar', 'Dharma-śāstra', 'Medicine', 'Astronomy'], optionsHi: ['व्याकरण', 'धर्मशास्त्र', 'चिकित्सा', 'ज्योतिष'], correct: 1 },
  { id: 't21', category: 'Philosophy', prompt: 'Which school denies the existence of a permanent self (anātma)?', promptHi: 'कौन सा दर्शन स्थायी आत्मा के अस्तित्व को अस्वीकार करता है (अनात्म)?', options: ['Sāṅkhya', 'Buddhism', 'Vedānta', 'Mīmāṃsā'], optionsHi: ['सांख्य', 'बौद्ध', 'वेदान्त', 'मीमांसा'], correct: 1 },
  { id: 't22', category: 'Philosophy', prompt: 'The four pramāṇas of Nyāya are:', promptHi: 'न्याय के चार प्रमाण कौन से हैं?', options: ['Perception, Inference, Word, Comparison', 'Perception, Inference, Word, Postulation', 'Perception, Inference, Comparison, Memory', 'Perception, Word, Postulation, Non-cognition'], optionsHi: ['प्रत्यक्ष, अनुमान, शब्द, उपमान', 'प्रत्यक्ष, अनुमान, शब्द, अर्थापत्ति', 'प्रत्यक्ष, अनुमान, उपमान, स्मृति', 'प्रत्यक्ष, शब्द, अर्थापत्ति, अभाव'], correct: 0 },
  { id: 't23', category: 'Philosophy', prompt: 'Puruṣa and Prakṛti are the two principles of which darśana?', promptHi: 'पुरुष और प्रकृति किस दर्शन के दो सिद्धांत हैं?', options: ['Yoga', 'Sāṅkhya', 'Vaiśeṣika', 'Nyāya'], optionsHi: ['योग', 'सांख्य', 'वैशेषिक', 'न्याय'], correct: 1 },
  { id: 't24', category: 'Philosophy', prompt: 'The Yama that means "truthfulness" is:', promptHi: '"सत्य" अर्थ वाला यम कौन सा है?', options: ['अहिंसा', 'सत्य', 'अस्तेय', 'ब्रह्मचर्य'], optionsHi: ['अहिंसा', 'सत्य', 'अस्तेय', 'ब्रह्मचर्य'], correct: 1 },
  { id: 't25', category: 'Philosophy', prompt: 'अद्वैत means:', promptHi: 'अद्वैत का अर्थ है:', options: ['Dualism', 'Non-dualism', 'Monotheism', 'Pantheism'], optionsHi: ['द्वैतवाद', 'अद्वैतवाद', 'एकेश्वरवाद', 'सर्वव्यापकवाद'], correct: 1 },
  { id: 't26', category: 'Culture', prompt: 'The greeting नमस्ते literally means:', promptHi: 'नमस्ते अभिवादन का शाब्दिक अर्थ है:', options: ['I bow to you', 'I love you', 'Peace to all', 'Good morning'], optionsHi: ['मैं आपको नमस्कार करता हूँ', 'मैं आपसे प्रेम करता हूँ', 'सबको शांति', 'सुप्रभात'], correct: 0 },
  { id: 't27', category: 'Culture', prompt: 'Which emperor issued edicts in Prākrit with the word धम्म?', promptHi: 'किस सम्राट ने प्राकृत में धम्म शब्द के साथ अभिलेख जारी किए?', options: ['Candra Gupta', 'Aśoka', 'Harṣa', 'Samudra Gupta'], optionsHi: ['चन्द्रगुप्त', 'अशोक', 'हर्ष', 'समुद्रगुप्त'], correct: 1 },
  { id: 't28', category: 'Culture', prompt: 'The festival celebrating the return of Rāma to Ayodhyā is:', promptHi: 'अयोध्या में राम की वापसी का पर्व है:', options: ['Holi', 'Dīpāvalī', 'Rakṣābandhana', 'Vasantapañcamī'], optionsHi: ['होली', 'दीपावली', 'रक्षाबन्धन', 'वसन्तपञ्चमी'], correct: 1 },
  { id: 't29', category: 'Culture', prompt: 'वसन्तपञ्चमी is dedicated to the goddess of learning:', promptHi: 'वसन्तपञ्चमी विद्या की देवी को समर्पित है:', options: ['Lakṣmī', 'Sarasvatī', 'Durgā', 'Pārvatī'], optionsHi: ['लक्ष्मी', 'सरस्वती', 'दुर्गा', 'पार्वती'], correct: 1 },
  { id: 't30', category: 'Culture', prompt: 'The ancient Indian university known for its library and international students:', promptHi: 'अपनी पुस्तकालय और अंतर्राष्ट्रीय छात्रों के लिए प्रसिद्ध प्राचीन भारतीय विश्वविद्यालय:', options: ['Taxila', 'Nālandā', 'Vikramaśilā', 'Sārnāth'], optionsHi: ['तक्षशिला', 'नालन्दा', 'विक्रमशिला', 'सारनाथ'], correct: 1 },
]

export const TEST_PASS_THRESHOLD = 21
export const TEST_TIME_SECONDS = 10 * 60
