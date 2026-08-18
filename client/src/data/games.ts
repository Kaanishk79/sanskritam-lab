export interface WordPair {
  sa: string
  iast: string
  en: string
}

export const WORD_PAIRS: WordPair[] = [
  { sa: 'जलम्', iast: 'jalam', en: 'water' },
  { sa: 'अग्निः', iast: 'agniḥ', en: 'fire' },
  { sa: 'सूर्यः', iast: 'sūryaḥ', en: 'sun' },
  { sa: 'चन्द्रः', iast: 'candraḥ', en: 'moon' },
  { sa: 'वृक्षः', iast: 'vṛkṣaḥ', en: 'tree' },
  { sa: 'पुष्पम्', iast: 'puṣpam', en: 'flower' },
  { sa: 'गजः', iast: 'gajaḥ', en: 'elephant' },
  { sa: 'सिंहः', iast: 'siṃhaḥ', en: 'lion' },
  { sa: 'ग्रन्थः', iast: 'granthaḥ', en: 'book' },
  { sa: 'विद्यालयः', iast: 'vidyālayaḥ', en: 'school' },
  { sa: 'मित्रम्', iast: 'mitram', en: 'friend' },
  { sa: 'गृहम्', iast: 'gṛham', en: 'house' },
  { sa: 'आकाशम्', iast: 'ākāśam', en: 'sky' },
  { sa: 'समुद्रः', iast: 'samudraḥ', en: 'ocean' },
  { sa: 'पर्वतः', iast: 'parvataḥ', en: 'mountain' },
  { sa: 'नदी', iast: 'nadī', en: 'river' },
  { sa: 'अन्नम्', iast: 'annam', en: 'food' },
  { sa: 'दुग्धम्', iast: 'dugdham', en: 'milk' },
  { sa: 'अश्वः', iast: 'aśvaḥ', en: 'horse' },
  { sa: 'पक्षी', iast: 'pakṣī', en: 'bird' },
]

export interface DevNumber {
  n: number
  dev: string
  word: string
  iast: string
}

const DEV_DIGITS = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९']

export function toDevanagariNumber(n: number): string {
  return String(n).split('').map((c) => DEV_DIGITS[Number(c)]).join('')
}

export const DEV_NUMBERS: DevNumber[] = [
  { n: 1, dev: '१', word: 'एकम्', iast: 'ekam' },
  { n: 2, dev: '२', word: 'द्वे', iast: 'dve' },
  { n: 3, dev: '३', word: 'त्रीणि', iast: 'trīṇi' },
  { n: 4, dev: '४', word: 'चत्वारि', iast: 'catvāri' },
  { n: 5, dev: '५', word: 'पञ्च', iast: 'pañca' },
  { n: 6, dev: '६', word: 'षट्', iast: 'ṣaṭ' },
  { n: 7, dev: '७', word: 'सप्त', iast: 'sapta' },
  { n: 8, dev: '८', word: 'अष्ट', iast: 'aṣṭa' },
  { n: 9, dev: '९', word: 'नव', iast: 'nava' },
  { n: 10, dev: '१०', word: 'दश', iast: 'daśa' },
  { n: 11, dev: '११', word: 'एकादश', iast: 'ekādaśa' },
  { n: 12, dev: '१२', word: 'द्वादश', iast: 'dvādaśa' },
  { n: 15, dev: '१५', word: 'पञ्चदश', iast: 'pañcadaśa' },
  { n: 20, dev: '२०', word: 'विंशतिः', iast: 'viṃśatiḥ' },
]

export interface SandhiPair {
  a: string
  b: string
}

export const SANDHI_PAIRS: SandhiPair[] = [
  { a: 'रामः', b: 'अस्ति' },
  { a: 'रामः', b: 'वने' },
  { a: 'नरः', b: 'इव' },
  { a: 'सत्यम्', b: 'एव' },
  { a: 'फलम्', b: 'अस्ति' },
  { a: 'राजा', b: 'इति' },
  { a: 'तत्', b: 'आस्ते' },
  { a: 'हरिः', b: 'इति' },
  { a: 'देवः', b: 'इन्द्रः' },
  { a: 'विद्या', b: 'अन्नम्' },
]