export interface TestQuestion {
  id: string
  category: string
  prompt: string
  options: string[]
  correct: number
}

export const anytimeTestQuestions: TestQuestion[] = [
  { id: 't01', category: 'Alphabet', prompt: 'Which of these is the retroflex स (ṣa)?', options: ['श', 'ष', 'स', 'ह'], correct: 1 },
  { id: 't02', category: 'Alphabet', prompt: 'How many vowels (svara) does the Sanskrit alphabet have?', options: ['12', '13', '14', '16'], correct: 2 },
  { id: 't03', category: 'Alphabet', prompt: 'Which conjunct is formed by क + ष?', options: ['क्क', 'क्ष', 'ज्ञ', 'त्र'], correct: 1 },
  { id: 't04', category: 'Alphabet', prompt: 'The letter ळ belongs to which class of sounds?', options: ['Dental', 'Retroflex', 'Palatal', 'Labial'], correct: 1 },
  { id: 't05', category: 'Alphabet', prompt: 'Which sound ends words in विसर्ग?', options: ['म्', 'ः', 'ँ', '्'], correct: 1 },
  { id: 't06', category: 'Grammar', prompt: 'Instrumental plural of रामः is:', options: ['रामेण', 'रामैः', 'रामेभ्यः', 'रामाय'], correct: 1 },
  { id: 't07', category: 'Grammar', prompt: 'The case of the word in रामाय गच्छति is:', options: ['Genitive', 'Dative', 'Accusative', 'Ablative'], correct: 1 },
  { id: 't08', category: 'Grammar', prompt: 'देव is an example of which stem class?', options: ['उ-कारान्त', 'इ-कारान्त', 'अ-कारान्त', 'आ-कारान्त'], correct: 2 },
  { id: 't09', category: 'Grammar', prompt: 'Which suffix forms the present participle, as in पठन्?', options: ['शतृ', 'क्त', 'कृत्य', 'तव्य'], correct: 0 },
  { id: 't10', category: 'Grammar', prompt: 'The dual of अहम् is:', options: ['वयम्', 'आवाम्', 'युवाम्', 'भवन्तौ'], correct: 1 },
  { id: 't11', category: 'Sandhi', prompt: 'न + एति = ?', options: ['नैति', 'नेति', 'नयति', 'नैतिः'], correct: 1 },
  { id: 't12', category: 'Sandhi', prompt: 'Which compound type is नीलोत्पलम्?', options: ['Tatpuruṣa', 'Dvandva', 'Karmadhāraya', 'Bahuvrīhi'], correct: 2 },
  { id: 't13', category: 'Sandhi', prompt: 'गुरु + उपदेशः = ?', options: ['गुरूपदेशः', 'गुर्वोपदेशः', 'गुरुपदेशः', 'गुरूवपदेशः'], correct: 0 },
  { id: 't14', category: 'Sandhi', prompt: 'The word विद्यालयः contains which sandhi?', options: ['Guṇa', 'Vṛddhi', 'Yaṇ', 'Viśarga'], correct: 0 },
  { id: 't15', category: 'Sandhi', prompt: 'राम + ईश्वरः = ?', options: ['रामेश्वरः', 'रामैश्वरः', 'रामीश्वरः', 'रामेश्वरम्'], correct: 0 },
  { id: 't16', category: 'Texts', prompt: 'Which text is a commentary on the Brahma Sūtras by Śaṅkara?', options: ['Śārīraka Bhāṣya', 'Mahābhāṣya', 'Kāśikā', 'Siddhānta Kaumudī'], correct: 0 },
  { id: 't17', category: 'Texts', prompt: 'The Nāṭyaśāstra, the ancient treatise on drama, was written by:', options: ['Bharata', 'Viśākhadatta', 'Śūdraka', 'Bāṇa'], correct: 0 },
  { id: 't18', category: 'Texts', prompt: 'Which collection has 700 verses?', options: ['Hitopadeśa', 'Bhagavad Gītā', 'Meghadūta', 'Niśīthacūrṇi'], correct: 1 },
  { id: 't19', category: 'Texts', prompt: 'The author of the Rāmāyaṇa is:', options: ['Vālmīki', 'Vyāsa', 'Tulsīdāsa', 'Kālidāsa'], correct: 0 },
  { id: 't20', category: 'Texts', prompt: 'मनुस्मृति is primarily a text on:', options: ['Grammar', 'Dharma-śāstra', 'Medicine', 'Astronomy'], correct: 1 },
  { id: 't21', category: 'Philosophy', prompt: 'Which school denies the existence of a permanent self (anātma)?', options: ['Sāṅkhya', 'Buddhism', 'Vedānta', 'Mīmāṃsā'], correct: 1 },
  { id: 't22', category: 'Philosophy', prompt: 'The four pramāṇas of Nyāya are:', options: ['Perception, Inference, Word, Comparison', 'Perception, Inference, Word, Postulation', 'Perception, Inference, Comparison, Memory', 'Perception, Word, Postulation, Non-cognition'], correct: 0 },
  { id: 't23', category: 'Philosophy', prompt: 'Puruṣa and Prakṛti are the two principles of which darśana?', options: ['Yoga', 'Sāṅkhya', 'Vaiśeṣika', 'Nyāya'], correct: 1 },
  { id: 't24', category: 'Philosophy', prompt: 'The Yama that means "truthfulness" is:', options: ['अहिंसा', 'सत्य', 'अस्तेय', 'ब्रह्मचर्य'], correct: 1 },
  { id: 't25', category: 'Philosophy', prompt: 'अद्वैत means:', options: ['Dualism', 'Non-dualism', 'Monotheism', 'Pantheism'], correct: 1 },
  { id: 't26', category: 'Culture', prompt: 'The greeting नमस्ते literally means:', options: ['I bow to you', 'I love you', 'Peace to all', 'Good morning'], correct: 0 },
  { id: 't27', category: 'Culture', prompt: 'Which emperor issued edicts in Prākrit with the word धम्म?', options: ['Candra Gupta', 'Aśoka', 'Harṣa', 'Samudra Gupta'], correct: 1 },
  { id: 't28', category: 'Culture', prompt: 'The festival celebrating the return of Rāma to Ayodhyā is:', options: ['Holi', 'Dīpāvalī', 'Rakṣābandhana', 'Vasantapañcamī'], correct: 1 },
  { id: 't29', category: 'Culture', prompt: 'वसन्तपञ्चमी is dedicated to the goddess of learning:', options: ['Lakṣmī', 'Sarasvatī', 'Durgā', 'Pārvatī'], correct: 1 },
  { id: 't30', category: 'Culture', prompt: 'The ancient Indian university known for its library and international students:', options: ['Taxila', 'Nālandā', 'Vikramaśilā', 'Sārnāth'], correct: 1 },
]

export const TEST_PASS_THRESHOLD = 21
export const TEST_TIME_SECONDS = 10 * 60
