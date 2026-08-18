import { tryJoinSandhi, toDevanagari } from './sanskrit'

export interface FixIssue {
  rule: string
  icon: string
  message: string
  suggestion: string
  fix: string
}

export interface FixResult {
  fixed: string
  issues: FixIssue[]
  unknownWords: { word: string; meaning: string | null }[]
  iastInput: boolean
}

const DEV_RE = /[\u0900-\u097F]/

export function isDevanagari(text: string): boolean {
  return DEV_RE.test(text)
}

export function toTokens(text: string): string[] {
  return text
    .replace(/[।॥।\.!?;:,"'“”‘’()\u200c\u200d]+/g, ' ')
    .split(/\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
}

export async function checkSanskrit(
  input: string,
  lookups: (w: string) => Promise<string | null>,
): Promise<FixResult> {
  const text = input.trim()
  const issues: FixIssue[] = []
  const unknownWords: FixResult['unknownWords'] = []

  if (!text) return { fixed: '', issues, unknownWords, iastInput: false }

  const iastInput = !isDevanagari(text)
  let fixed = text

  if (iastInput) {
    const dev = toDevanagari(text).replace(/म(?=$|[\s।॥])/g, 'म्')
    issues.push({
      rule: 'transliterate',
      icon: '🔤',
      message: 'Your text looks like IAST (Latin) — Sanskrit is written in Devanagari.',
      suggestion: `Converted: ${dev}`,
      fix: dev,
    })
    fixed = dev
  }

  if (!/[।।]/.test(fixed) && !/[.!?]\s*$/.test(fixed)) {
    issues.push({
      rule: 'punctuation',
      icon: '।',
      message: 'A Sanskrit sentence should end with the danda (।).',
      suggestion: `End with ।: ${fixed.trim()} ।`,
      fix: fixed.trim() + ' ।',
    })
    fixed = fixed.trim() + ' ।'
  }

  const tokens = toTokens(fixed)
  for (const tok of tokens) {
    if (tok.length > 30) {
      issues.push({
        rule: 'long-token',
        icon: '✂️',
        message: `“${tok.slice(0, 24)}…” is very long — words may be joined without spaces.`,
        suggestion: 'Split the sentence into separate words.',
        fix: tok,
      })
      continue
    }
    const meaning = await lookups(tok)
    if (meaning === null) {
      const split = await trySplitKnown(tok, lookups)
      if (split) {
        issues.push({
          rule: 'missing-space',
          icon: '🖇️',
          message: `“${tok}” looks like two words stuck together.`,
          suggestion: `${split.join(' ')}`,
          fix: split.join(' '),
        })
        fixed = fixed.replace(tok, split.join(' '))
        continue
      }
      unknownWords.push({ word: tok, meaning: null })
    }
  }

  const fixedTokens = toTokens(fixed)
  for (let i = 0; i < fixedTokens.length - 1; i++) {
    const a = fixedTokens[i]
    const b = fixedTokens[i + 1]
    if (!isDevanagari(a) || !isDevanagari(b)) continue
    const joined = tryJoinSandhi(a, b)
    if (joined.ok && joined.result !== a + ' ' + b && joined.result !== a + b) {
      issues.push({
        rule: 'sandhi',
        icon: '🔊',
        message: `Sandhi suggests joining “${a} + ${b}”.`,
        suggestion: `${joined.result} — ${joined.explanation}`,
        fix: joined.result,
      })
    }
  }

  return { fixed, issues, unknownWords, iastInput }
}

async function trySplitKnown(
  tok: string,
  lookups: (w: string) => Promise<string | null>,
): Promise<[string, string] | null> {
  if (tok.length < 4) return null
  for (let i = 1; i < tok.length - 1; i++) {
    const pre = tok.slice(0, i)
    const suf = tok.slice(i)
    if (pre.length < 2 || suf.length < 2) continue
    const [pm, sm] = await Promise.all([lookups(pre), lookups(suf)])
    if (pm !== null && sm !== null) return [pre, suf]
  }
  return null
}

export const EXAMPLE_TEXTS = [
  'रामः वने वसति',
  'इदम् पुस्तकम् अस्ति',
  'सत्यमेव जयते',
  'rāmaḥ phalam khādati',
  'अहम् विद्यालयम् गच्छामि',
  'सीता वने वसति सुन्दरम्',
]