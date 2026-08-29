export interface Manuscript {
  id: number
  name: string
  nameHi?: string
  script: string
  scriptHi?: string
  period: string
  periodHi?: string
  transcription: string
  color: string
}

export const MANUSCRIPTS: Manuscript[] = [
  { id: 1, name: 'Ṛgveda MS — Devanāgarī (12th CE)', nameHi: 'ऋग्वेद पाण्डुलिपि — देवनागरी (12वीं सदी ई.)', script: 'Devanagari', scriptHi: 'देवनागरी', period: '12th CE', periodHi: '12वीं सदी ई.', color: '#c9a84c', transcription: 'अग्निमीळे पुरोहितं यज्ञस्य देवं रत्वीजम् । होतारं रत्नधातमम् ॥' },
  { id: 2, name: 'Aṣṭādhyāyī MS — Grantha (14th CE)', nameHi: 'अष्टाध्यायी पाण्डुलिपि — ग्रंथ लिपि (14वीं सदी ई.)', script: 'Grantha', scriptHi: 'ग्रंथ', period: '14th CE', periodHi: '14वीं सदी ई.', color: '#8b7355', transcription: 'वृद्धिरादैच् । अदेङ् गुणः ।' },
  { id: 3, name: 'Śākuntalam — Devanāgarī (15th CE)', nameHi: 'अभिज्ञानशाकुन्तलम् — देवनागरी (15वीं सदी ई.)', script: 'Devanagari', scriptHi: 'देवनागरी', period: '15th CE', periodHi: '15वीं सदी ई.', color: '#a0896a', transcription: 'आसीदुदन्तुमूलेषु सचेताः प्रभवः स्वयम्' },
  { id: 4, name: 'Nyāya Sūtra — Grantha (16th CE)', nameHi: 'न्यायसूत्र — ग्रंथ लिपि (16वीं सदी ई.)', script: 'Grantha', scriptHi: 'ग्रंथ', period: '16th CE', periodHi: '16वीं सदी ई.', color: '#7a6b50', transcription: 'प्रमाणप्रमेयसंशयप्रयोजनदृष्टान्तसिद्धान्तावयवः' },
  { id: 5, name: 'Yoga Sūtra — Grantha (16th CE)', nameHi: 'योगसूत्र — ग्रंथ लिपि (16वीं सदी ई.)', script: 'Grantha', scriptHi: 'ग्रंथ', period: '16th CE', periodHi: '16वीं सदी ई.', color: '#8b7355', transcription: 'अथ योगानुशासनम् । योगः चित्तवृत्तिनिरोधः ॥' },
  { id: 6, name: 'Raghuvaṃśa — Devanāgarī (13th CE)', nameHi: 'रघुवंशम् — देवनागरी (13वीं सदी ई.)', script: 'Devanagari', scriptHi: 'देवनागरी', period: '13th CE', periodHi: '13वीं सदी ई.', color: '#c9a84c', transcription: 'वागर्थाविव सम्पृक्तौ वागर्थप्रतिपत्तये' },
  { id: 7, name: 'Rāmāyaṇa MS — Grantha (11th CE)', nameHi: 'रामायण पाण्डुलिपि — ग्रंथ लिपि (11वीं सदी ई.)', script: 'Grantha', scriptHi: 'ग्रंथ', period: '11th CE', periodHi: '11वीं सदी ई.', color: '#a0896a', transcription: 'तपःस्वाध्यायनिरतं तपस्वी वाग्विदां वरम् । नारदं परिपप्रच्छ वाल्मीकिर्मुनिपुङ्गवम् ॥' },
  { id: 8, name: 'Mahābhārata MS — Devanāgarī (14th CE)', nameHi: 'महाभारत पाण्डुलिपि — देवनागरी (14वीं सदी ई.)', script: 'Devanagari', scriptHi: 'देवनागरी', period: '14th CE', periodHi: '14वीं सदी ई.', color: '#8b7355', transcription: 'नारायणं नमस्कृत्य नरं चैव नरोत्तमम् । देवीं सरस्वतीं व्यासं ततो जयमुदीरयेत् ॥' },
  { id: 9, name: 'Bhagavad Gītā — Devanāgarī (13th CE)', nameHi: 'श्रीमद्भगवद्गीता — देवनागरी (13वीं सदी ई.)', script: 'Devanagari', scriptHi: 'देवनागरी', period: '13th CE', periodHi: '13वीं सदी ई.', color: '#c9a84c', transcription: 'धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः । मामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय ॥' },
  { id: 10, name: 'Īśāvāsya Upaniṣad — Grantha (10th CE)', nameHi: 'ईशावास्योपनिषद् — ग्रंथ लिपि (10वीं सदी ई.)', script: 'Grantha', scriptHi: 'ग्रंथ', period: '10th CE', periodHi: '10वीं सदी ई.', color: '#7a6b50', transcription: 'पूर्णमदः पूर्णमिदं पूर्णात् पूर्णमुदच्यते । पूर्णस्य पूर्णमादाय पूर्णमेवावशिष्यते ॥' },
  { id: 11, name: 'Kumārasambhava — Devanāgarī (12th CE)', nameHi: 'कुमारसम्भव — देवनागरी (12वीं सदी ई.)', script: 'Devanagari', scriptHi: 'देवनागरी', period: '12th CE', periodHi: '12वीं सदी ई.', color: '#a0896a', transcription: 'अस्त्युत्तरस्यां दिशि देवतात्मा हिमालयो नाम नगाधिराजः ।' },
  { id: 12, name: 'Meghadūta — Grantha (12th CE)', nameHi: 'मेघदूतम् — ग्रंथ लिपि (12वीं सदी ई.)', script: 'Grantha', scriptHi: 'ग्रंथ', period: '12th CE', periodHi: '12वीं सदी ई.', color: '#8b7355', transcription: 'कश्चित् कान्ताविरहगुरुणा स्वाधिकारात् प्रमत्तः शापेनास्तङ्गमितमहिमा वर्षभोग्येन भर्तुः' },
  { id: 13, name: 'Gītagovinda — Devanāgarī (13th CE)', nameHi: 'गीतगोविन्द — देवनागरी (13वीं सदी ई.)', script: 'Devanagari', scriptHi: 'देवनागरी', period: '13th CE', periodHi: '13वीं सदी ई.', color: '#c9a84c', transcription: 'मेघैर्मेदुरमम्बरं वनभुवः श्यामास्तमालद्रुमैः ।' },
  { id: 14, name: 'Bṛhadāraṇyaka Upaniṣad — Grantha (9th CE)', nameHi: 'बृहदारण्यकोपनिषद् — ग्रंथ लिपि (9वीं सदी ई.)', script: 'Grantha', scriptHi: 'ग्रंथ', period: '9th CE', periodHi: '9वीं सदी ई.', color: '#7a6b50', transcription: 'असतो मा सद्गमय तमसो मा ज्योतिर्गमय मृत्योर्मा अमृतं गमय' },
  { id: 15, name: 'Pañcatantra — Devanāgarī (14th CE)', nameHi: 'पञ्चतन्त्र — देवनागरी (14वीं सदी ई.)', script: 'Devanagari', scriptHi: 'देवनागरी', period: '14th CE', periodHi: '14वीं सदी ई.', color: '#a0896a', transcription: 'परोपकाराय फलन्ति वृक्षाः परोपकाराय वहन्ति नद्यः । परोपकाराय दुहन्ति गावः परोपकारार्थमिदं शरीरम् ॥' },
  { id: 16, name: 'Nāṭyaśāstra — Grantha (12th CE)', nameHi: 'नाट्यशास्त्र — ग्रंथ लिपि (12वीं सदी ई.)', script: 'Grantha', scriptHi: 'ग्रंथ', period: '12th CE', periodHi: '12वीं सदी ई.', color: '#8b7355', transcription: 'अथ नाट्यं प्रवक्ष्यामि ब्रह्मणा यदुदाहृतम् ।' },
]