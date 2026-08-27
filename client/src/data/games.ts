export interface WordPair {
  sa: string
  iast: string
  en: string
  hi?: string
}

export const WORD_PAIRS: WordPair[] = [
  { sa: 'जलम्', iast: 'jalam', en: 'water', hi: 'पानी' },
  { sa: 'अग्निः', iast: 'agniḥ', en: 'fire', hi: 'आग' },
  { sa: 'सूर्यः', iast: 'sūryaḥ', en: 'sun', hi: 'सूरज' },
  { sa: 'चन्द्रः', iast: 'candraḥ', en: 'moon', hi: 'चाँद' },
  { sa: 'वृक्षः', iast: 'vṛkṣaḥ', en: 'tree', hi: 'पेड़' },
  { sa: 'पुष्पम्', iast: 'puṣpam', en: 'flower', hi: 'फूल' },
  { sa: 'गजः', iast: 'gajaḥ', en: 'elephant', hi: 'हाथी' },
  { sa: 'सिंहः', iast: 'siṃhaḥ', en: 'lion', hi: 'शेर' },
  { sa: 'ग्रन्थः', iast: 'granthaḥ', en: 'book', hi: 'पुस्तक' },
  { sa: 'विद्यालयः', iast: 'vidyālayaḥ', en: 'school', hi: 'विद्यालय' },
  { sa: 'मित्रम्', iast: 'mitram', en: 'friend', hi: 'मित्र' },
  { sa: 'गृहम्', iast: 'gṛham', en: 'house', hi: 'घर' },
  { sa: 'आकाशम्', iast: 'ākāśam', en: 'sky', hi: 'आकाश' },
  { sa: 'समुद्रः', iast: 'samudraḥ', en: 'ocean', hi: 'समुद्र' },
  { sa: 'पर्वतः', iast: 'parvataḥ', en: 'mountain', hi: 'पहाड़' },
  { sa: 'नदी', iast: 'nadī', en: 'river', hi: 'नदी' },
  { sa: 'अन्नम्', iast: 'annam', en: 'food', hi: 'खाना' },
  { sa: 'दुग्धम्', iast: 'dugdham', en: 'milk', hi: 'दूध' },
  { sa: 'अश्वः', iast: 'aśvaḥ', en: 'horse', hi: 'घोड़ा' },
  { sa: 'पक्षी', iast: 'pakṣī', en: 'bird', hi: 'पक्षी' },
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