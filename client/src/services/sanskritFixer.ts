import { toDevanagari } from './sanskrit'

export interface FixIssue {
  rule: string
  icon: string
  message: string
  messageHi?: string
  suggestion: string
  suggestionHi?: string
  fix: string
}

export interface FixResult {
  fixed: string
  issues: FixIssue[]
  unknownWords: { word: string; meaning: string | null }[]
  iastInput: boolean
}

export const EXAMPLE_TEXTS = [
  { label: 'IAST Input', text: 'aham grham gacchami' },
  { label: 'Missing Danda', text: 'विद्या ददाति विनयं' },
  { label: 'Unseparated Words', text: 'सत्यंवदधर्मंचर' },
  { label: 'Sandhi Junction', text: 'नर + ईशः' },
]

function isDevanagari(str: string): boolean {
  return /[\u0900-\u097F]/.test(str)
}

function toTokens(text: string): string[] {
  return text
    .split(/[\s,.;!?।॥]+/)
    .map((w) => w.trim())
    .filter(Boolean)
}

export async function checkSanskrit(
  text: string,
  lookup?: (w: string) => Promise<string | null>,
): Promise<FixResult> {
  const issues: FixIssue[] = []
  const unknownWords: { word: string; meaning: string | null }[] = []

  const iastInput = /^[a-zA-Zāīūṛṝḷḹṃḥṅñṇtnśṣshḍḍhṭṭh\s.,!?]+$/.test(text.trim()) && !isDevanagari(text)
  let fixed = text

  if (iastInput) {
    const dev = toDevanagari(text).replace(/म(?=$|[\s।॥])/g, 'म्')
    issues.push({
      rule: 'transliterate',
      icon: 'alphabet',
      message: 'Your text looks like IAST (Latin) — Sanskrit is written in Devanagari.',
      messageHi: 'आपका पाठ IAST (लैटिन) जैसा लगता है — संस्कृत देवनागरी में लिखी जाती है।',
      suggestion: `Converted: ${dev}`,
      suggestionHi: `परिवर्तित: ${dev}`,
      fix: dev,
    })
    fixed = dev
  }

  if (!/[।।]/.test(fixed) && !/[.!?]\s*$/.test(fixed)) {
    issues.push({
      rule: 'punctuation',
      icon: 'punctuation',
      message: 'A Sanskrit sentence should end with the danda (।).',
      messageHi: 'संस्कृत वाक्य का अंत दंड (।) से होना चाहिए।',
      suggestion: `End with ।: ${fixed.trim()} ।`,
      suggestionHi: `। से समाप्त करें: ${fixed.trim()} ।`,
      fix: fixed.trim() + ' ।',
    })
    fixed = fixed.trim() + ' ।'
  }

  const tokens = toTokens(fixed)
  for (const tok of tokens) {
    if (tok.length > 30) {
      issues.push({
        rule: 'long-token',
        icon: 'syntax',
        message: `“${tok.slice(0, 24)}…” is very long — words may be joined without spaces.`,
        messageHi: `“${tok.slice(0, 24)}…” बहुत लंबा है — शब्द बिना स्थान के जुड़े हो सकते हैं।`,
        suggestion: 'Split the sentence into separate words.',
        suggestionHi: 'वाक्य को अलग-अलग शब्दों में विभाजित करें।',
        fix: tok,
      })
      continue
    }
    if (lookup) {
      const meaning = await lookup(tok)
      if (meaning === null) {
        unknownWords.push({ word: tok, meaning: null })
      }
    }
  }

  return { fixed, issues, unknownWords, iastInput }
}