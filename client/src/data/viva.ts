export interface VivaQuestion {
  id: string
  question: string
  questionHi?: string
  keyPoints: string[]
  keyPointsHi?: string[]
  difficulty: number
}

export const VIVA_QUESTIONS: VivaQuestion[] = [
  { id: 'v1', question: 'Explain the concept of द्रव्य (substance) in Nyāya philosophy.', questionHi: 'न्याय दर्शन में द्रव्य (पदार्थ) की अवधारणा समझाइए।', keyPoints: ['substratum of qualities', '9 dravyas', 'eternal'], keyPointsHi: ['गुणों का आश्रय', '9 द्रव्य', 'शाश्वत'], difficulty: 4 },
  { id: 'v2', question: 'What is the difference between गुण (quality) and क्रिया (action) in Vaiśeṣika?', questionHi: 'वैशेषिक में गुण (गुण) और क्रिया (क्रिया) में क्या अंतर है?', keyPoints: ['guṇa = quality residing in substance', 'kriyā = action/motion', 'both inhere in dravya'], keyPointsHi: ['गुण = द्रव्य में निहित गुण', 'क्रिया = कर्म/गति', 'दोनों द्रव्य में स्थित'], difficulty: 4 },
  { id: 'v3', question: 'Describe the वृद्धि sandhi rule with examples.', questionHi: 'वृद्धि सन्धि नियम का उदाहरण सहित वर्णन कीजिए।', keyPoints: ['a/ā + e = ai', 'a/ā + o = au', 'example: sadā + eva = sadaiva'], keyPointsHi: ['अ/आ + ए = ऐ', 'अ/आ + ओ = औ', 'उदाहरण: सदा + एव = सदैव'], difficulty: 3 },
  { id: 'v4', question: 'Explain the three genders (लिङ्ग) in Sanskrit grammar.', questionHi: 'संस्कृत व्याकरण में तीन लिङ्गों को समझाइए।', keyPoints: ['pulliṅga = masculine', 'strīliṅga = feminine', 'napuṃsakaliṅga = neuter', 'gender is grammatical not natural'], keyPointsHi: ['पुल्लिङ्ग = पुरुषवाचक', 'स्त्रीलिङ्ग = स्त्रीवाचक', 'नपुंसकलिङ्ग = नपुंसकवाचक', 'लिङ्ग व्याकरणीय है, प्राकृतिक नहीं'], difficulty: 2 },
  { id: 'v5', question: 'What is the significance of the उपनिषद्s in Vedānta?', questionHi: 'वेदान्त में उपनिषद्ों का महत्व क्या है?', keyPoints: ['end of Vedas', 'ātman = brahman', 'tattvamasi', '12 principal upaniṣads'], keyPointsHi: ['वेदों का अंत भाग', 'आत्मा = ब्रह्म', 'तत्त्वमसि', '12 प्रमुख उपनिषद्'], difficulty: 4 },
  { id: 'v6', question: 'Define योगः according to Patañjali.', questionHi: 'पतञ्जलि के अनुसार योगः की परिभाषा बताइए।', keyPoints: ['yogaś citta-vṛtti-nirodhaḥ', 'cessation of mental fluctuations', '8 limbs'], keyPointsHi: ['योगश्चित्तवृत्तिनिरोधः', 'मानस वृत्तियों का निरोध', 'अष्टांग योग'], difficulty: 3 },
  { id: 'v7', question: 'What are the 5 types of compounds in Sanskrit? Give examples.', questionHi: 'संस्कृत में 5 प्रकार के समास कौन से हैं? उदाहरण दीजिए।', keyPoints: ['tatpuruṣa', 'karmadhāraya', 'dvandva', 'bahuvrīhi', 'avyayībhāva'], keyPointsHi: ['तत्पुरुष', 'कर्मधारय', 'द्वन्द्व', 'बहुव्रीहि', 'अव्ययीभाव'], difficulty: 3 },
  { id: 'v8', question: 'Explain the Nyāya 5-membered syllogism.', questionHi: 'न्याय के पंचांग न्याय को समझाइए।', keyPoints: ['pratijñā', 'hetu', 'udāharaṇa', 'upanaya', 'nigamana'], keyPointsHi: ['प्रतिज्ञा', 'हेतु', 'उदाहरण', 'उपनय', 'निगमन'], difficulty: 4 },
  { id: 'v9', question: 'What is निष्कामकर्म in the Bhagavad Gītā?', questionHi: 'भगवद्गीता में निष्कामकर्म क्या है?', keyPoints: ['action without desire for fruits', 'Gītā 2.47', 'mā phaleṣu kadācana'], keyPointsHi: ['फल की इच्छा के बिना कर्म', 'गीता 2.47', 'मा फलेषु कदाचन'], difficulty: 3 },
  { id: 'v10', question: "Describe the 8 limbs of Patañjali's Yoga.", questionHi: 'पतञ्जलि के योग के अष्टांग का वर्णन कीजिए।', keyPoints: ['yama', 'niyama', 'āsana', 'prāṇāyāma', 'pratyāhāra', 'dhāraṇā', 'dhyāna', 'samādhi'], keyPointsHi: ['यम', 'नियम', 'आसन', 'प्राणायाम', 'प्रत्याहार', 'धारणा', 'ध्यान', 'समाधि'], difficulty: 3 },
]