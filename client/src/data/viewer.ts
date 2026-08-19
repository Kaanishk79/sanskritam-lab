export interface Manuscript {
  id: number
  name: string
  script: string
  period: string
  transcription: string
  color: string
}

export const MANUSCRIPTS: Manuscript[] = [
  { id: 1, name: 'Ṛgveda MS — Devanāgarī (12th CE)', script: 'Devanagari', period: '12th CE', color: '#c9a84c', transcription: 'अग्निमीळे पुरोहितं यज्ञस्य देवं रत्वीजम् । होतारं रत्नधातमम् ॥' },
  { id: 2, name: 'Aṣṭādhyāyī MS — Grantha (14th CE)', script: 'Grantha', period: '14th CE', color: '#8b7355', transcription: 'वृद्धिरादैच् । अदेङ् गुणः ।' },
  { id: 3, name: 'Śākuntalam — Devanāgarī (15th CE)', script: 'Devanagari', period: '15th CE', color: '#a0896a', transcription: 'आसीदुदन्तुमूलेषु सचेताः प्रभवः स्वयम्' },
  { id: 4, name: 'Nyāya Sūtra — Grantha (16th CE)', script: 'Grantha', period: '16th CE', color: '#7a6b50', transcription: 'प्रमाणप्रमेयसंशयप्रयोजनदृष्टान्तसिद्धान्तावयवः' },
  { id: 5, name: 'Yoga Sūtra — Grantha (16th CE)', script: 'Grantha', period: '16th CE', color: '#8b7355', transcription: 'अथ योगानुशासनम् । योगः चित्तवृत्तिनिरोधः ॥' },
  { id: 6, name: 'Raghuvaṃśa — Devanāgarī (13th CE)', script: 'Devanagari', period: '13th CE', color: '#c9a84c', transcription: 'वागर्थाविव सम्पृक्तौ वागर्थप्रतिपत्तये' },
]