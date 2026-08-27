export interface Shloka {
  dev: string
  iast: string
  translation: string
  translationHi?: string
  source: string
}

export const SHLOKAS: Shloka[] = [
  { dev: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।', iast: 'karmaṇyevādhikāraste mā phaleṣu kadācana |', translation: 'Your right is to action alone, never to its fruits.', translationHi: 'तुम्हारा अधिकार केवल कर्म पर है, फलों पर कभी नहीं।', source: 'Bhagavad Gītā 2.47' },
  { dev: 'उद्यमेन हि सिध्यन्ति कार्याणि न मनोरथैः।', iast: 'udyamena hi sidhyanti kāryāṇi na manorathaiḥ |', translation: 'Tasks succeed by effort, not by wishes.', translationHi: 'कार्य प्रयत्न से सिद्ध होते हैं, इच्छाओं से नहीं।', source: 'Pañcatantra' },
  { dev: 'मातृवत् परदारेषु परद्रव्येषु लोष्टवत्।', iast: 'mātṛvat paradāreṣu paradravyeṣu loṣṭavat |', translation: "Treat others' wives as mothers, others' wealth as clods of earth.", translationHi: 'दूसरों की पत्नियों का माता की तरह, दूसरों के धन की मिट्टी के टुकड़े की तरह सम्मान करो।', source: 'Cāṇakya Nīti' },
  { dev: 'अहिंसा परमो धर्मः', iast: 'ahiṃsā paramo dharmaḥ', translation: 'Non-violence is the highest dharma.', translationHi: 'अहिंसा ही परम धर्म है।', source: 'Mahābhārata' },
  { dev: 'सत्यं शिवं सुन्दरम्', iast: 'satyaṃ śivaṃ sundaram', translation: 'Truth, goodness, beauty.', translationHi: 'सत्य, शिव, सुंदर — सत्य, कल्याण, सुंदरता।', source: 'Upaniṣadic motto' },
  { dev: 'आत्मानं विद्धि', iast: 'ātmānaṃ viddhi', translation: 'Know the Self.', translationHi: 'आत्मा को जानो।', source: 'Kaṭha Upaniṣad' },
  { dev: 'वसुधैव कुटुम्बकम्', iast: 'vasudhaiva kuṭumbakam', translation: 'The whole world is one family.', translationHi: 'संपूर्ण विश्व एक परिवार है।', source: 'Hitopadeśa' },
  { dev: 'श्रद्धावान् लभते ज्ञानम्', iast: 'śraddhāvān labhate jñānam', translation: 'The faithful obtain knowledge.', translationHi: 'श्रद्धावान व्यक्ति ज्ञान प्राप्त करता है।', source: 'Bhagavad Gītā 4.39' },
  { dev: 'परोपकाराय पुण्याय पापाय परपीडनम्', iast: 'paropakārāya puṇyāya pāpāya parapīḍanam', translation: 'For helping others is merit; harming others is sin.', translationHi: 'परोपकार पुण्य है, परपीड़न पाप है।', source: 'Vidyāraṇya' },
  { dev: 'संगच्छध्वं संवदध्वं', iast: 'saṃgacchadhvaṃ saṃvadadhvaṃ', translation: 'Walk together, speak together.', translationHi: 'साथ चलो, साथ बोलो।', source: 'Ṛgveda 10.191' },
]