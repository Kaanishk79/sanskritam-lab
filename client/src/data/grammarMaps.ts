export interface GrammarRule {
  id: string
  rule: string
  meaning: string
  meaningHi?: string
  category: string
}

export const GRAMMAR_RULES: GrammarRule[] = [
  { id: '1.1.1', rule: 'वृद्धिरादैच्', meaning: 'vṛddhi is denoted by ā, ai, au', meaningHi: 'वृद्धि आ, ऐ, औ से होती है', category: 'vṛddhi' },
  { id: '1.1.2', rule: 'अदेङ् गुणः', meaning: 'guṇa is denoted by a, e, o', meaningHi: 'गुण अ, ए, ओ से होता है', category: 'guṇa' },
  { id: '6.1.77', rule: 'इको यणचि', meaning: 'ik vowels become yaṇ before a vowel', meaningHi: 'इक स्वरों के बाद स्वर से पहले यण् होता है', category: 'sandhi' },
]

export interface PhilosophyNetwork {
  name: string
  focus: string
  focusHi?: string
  texts: string
  textsHi?: string
  color: string
}

export const PHILOSOPHY_NETWORKS: PhilosophyNetwork[] = [
  { name: 'Nyāya', focus: 'Logic & Epistemology', focusHi: 'तर्क और प्रमाणशास्त्र', texts: 'Nyāya Sūtra', textsHi: 'न्यायसूत्र', color: '#e74c3c' },
  { name: 'Vedānta', focus: 'Non-duality', focusHi: 'अद्वैत', texts: 'Brahma Sūtra, Upaniṣads', textsHi: 'ब्रह्मसूत्र, उपनिषद्', color: '#2ecc71' },
  { name: 'Mīmāṃsā', focus: 'Ritual Exegesis', focusHi: 'कर्मकाण्ड व्याख्या', texts: 'Pūrva Mīmāṃsā Sūtra', textsHi: 'पूर्वमीमांसासूत्र', color: '#f39c12' },
  { name: 'Sāṃkhya', focus: 'Enumeration', focusHi: 'गणना', texts: 'Sāṃkhya Kārikā', textsHi: 'सांख्यकारिका', color: '#9b59b6' },
  { name: 'Yoga', focus: 'Union & Practice', focusHi: 'योग और अभ्यास', texts: 'Yoga Sūtra', textsHi: 'योगसूत्र', color: '#1abc9c' },
]