export interface GrammarRule {
  id: string
  rule: string
  meaning: string
  category: string
}

export const GRAMMAR_RULES: GrammarRule[] = [
  { id: '1.1.1', rule: 'वृद्धिरादैच्', meaning: 'vṛddhi is denoted by ā, ai, au', category: 'vṛddhi' },
  { id: '1.1.2', rule: 'अदेङ् गुणः', meaning: 'guṇa is denoted by a, e, o', category: 'guṇa' },
  { id: '6.1.77', rule: 'इको यणचि', meaning: 'ik vowels become yaṇ before a vowel', category: 'sandhi' },
]

export interface PhilosophyNetwork {
  name: string
  focus: string
  texts: string
  color: string
}

export const PHILOSOPHY_NETWORKS: PhilosophyNetwork[] = [
  { name: 'Nyāya', focus: 'Logic & Epistemology', texts: 'Nyāya Sūtra', color: '#e74c3c' },
  { name: 'Vedānta', focus: 'Non-duality', texts: 'Brahma Sūtra, Upaniṣads', color: '#2ecc71' },
  { name: 'Mīmāṃsā', focus: 'Ritual Exegesis', texts: 'Pūrva Mīmāṃsā Sūtra', color: '#f39c12' },
  { name: 'Sāṃkhya', focus: 'Enumeration', texts: 'Sāṃkhya Kārikā', color: '#9b59b6' },
  { name: 'Yoga', focus: 'Union & Practice', texts: 'Yoga Sūtra', color: '#1abc9c' },
]