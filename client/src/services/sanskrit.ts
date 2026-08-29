import { supabase } from './supabase'

// ─── TRANSLITERATION ───

const DEV_VOWELS: [string, string][] = [
  ['ऍ', 'ê'], ['ऑ', 'ô'], ['औ', 'au'], ['ऐ', 'ai'], ['ओ', 'o'], ['ए', 'e'],
  ['ॠ', 'ṝ'], ['ऌ', 'ḷ'], ['ऋ', 'ṛ'], ['ऊ', 'ū'], ['ओ', 'o'],
  ['आ', 'ā'], ['इ', 'i'], ['ई', 'ī'], ['उ', 'u'], ['ऊ', 'ū'],
]

const DEV_CONSONANTS: [string, string][] = [
  ['क्ष', 'kṣ'], ['त्र', 'tra'], ['ज्ञ', 'jñ'],
  ['क', 'k'], ['ख', 'kh'], ['ग', 'g'], ['घ', 'gh'], ['ङ', 'ṅ'],
  ['च', 'c'], ['छ', 'ch'], ['ज', 'j'], ['झ', 'jh'], ['ञ', 'ñ'],
  ['ट', 'ṭ'], ['ठ', 'ṭh'], ['ड', 'ḍ'], ['ढ', 'ḍh'], ['ण', 'ṇ'],
  ['त', 't'], ['थ', 'th'], ['द', 'd'], ['ध', 'dh'], ['न', 'n'],
  ['प', 'p'], ['फ', 'ph'], ['ब', 'b'], ['भ', 'bh'], ['म', 'm'],
  ['य', 'y'], ['र', 'r'], ['ल', 'l'], ['व', 'v'], ['श', 'ś'],
  ['ष', 'ṣ'], ['स', 's'], ['ह', 'h'], ['ळ', 'ḷ'],
]

const DEV_SIGNS: [string, string][] = [
  ['ा', 'ā'], ['ि', 'i'], ['ी', 'ī'], ['ु', 'u'], ['ू', 'ū'],
  ['ृ', 'ṛ'], ['ॄ', 'ṝ'], ['े', 'e'], ['ै', 'ai'], ['ो', 'o'],
  ['ौ', 'au'], ['ं', 'ṃ'], ['ँ', 'ṃ'], ['ः', 'ḥ'], ['्', ''],
]

export function toIAST(input: string): string {
  let s = input.trim()
  let out = ''
  let i = 0
  while (i < s.length) {
    const c = s[i]
    const next = s[i + 1]
    const next2 = s[i + 2]
    const pair = next ? c + next : ''
    const trip = next2 ? c + next + next2 : ''
    const triple = DEV_CONSONANTS.find(([d]) => d === trip)
    if (triple) { out += triple[1]; i += 3; continue }
    const dbl = DEV_CONSONANTS.find(([d]) => d === pair)
    if (dbl) {
      out += dbl[1]
      i += 2
      const sign = DEV_SIGNS.find(([d]) => d === s[i])
      if (sign) { out += sign[1]; i += 1 }
      continue
    }
    if (c === 'अ') { out += 'a'; i += 1; continue }
    const vowel = DEV_VOWELS.find(([d]) => d === c)
    if (vowel) { out += vowel[1]; i += 1; continue }
    const cons = DEV_CONSONANTS.find(([d]) => d === c)
    if (cons) {
      out += cons[1]
      i += 1
      const sign = DEV_SIGNS.find(([d]) => d === s[i])
      if (sign) {
        i += 1
        if (sign[0] === 'ं' || sign[0] === 'ँ' || sign[0] === 'ः') { out += 'a' + sign[1] }
        else { out += sign[1] }
      }
      else { out += 'a' }
      continue
    }
    const sign = DEV_SIGNS.find(([d]) => d === c)
    if (sign) { out += sign[1]; i += 1; continue }
    out += c
    i += 1
  }
  return out
}

const IAST_TO_DEV: Record<string, string> = {
  ā: 'आ', ī: 'ई', ū: 'ऊ', ṛ: 'ऋ', ṝ: 'ॠ', ḷ: 'ऌ', ṃ: 'ं', ḥ: 'ः',
  kṣ: 'क्ष', kh: 'ख', gh: 'घ', ṅ: 'ङ', ch: 'छ', jh: 'झ', ñ: 'ञ',
  ṭ: 'ट', ṭh: 'ठ', ḍ: 'ड', ḍh: 'ढ', ṇ: 'ण', th: 'थ', dh: 'ध',
  ph: 'फ', bh: 'भ', ś: 'श', ṣ: 'ष',
}

const IAST_BASE: Record<string, string> = {
  a: 'अ', i: 'इ', u: 'उ', e: 'ए', o: 'ओ', ai: 'ऐ', au: 'औ',
  k: 'क', g: 'ग', c: 'च', j: 'ज', t: 'त', d: 'द', n: 'न',
  p: 'प', b: 'ब', m: 'म', y: 'य', r: 'र', l: 'ल', v: 'व', s: 'स', h: 'ह',
}

const IAST_SIGNS: Record<string, string> = {
  'ā': 'ा', 'ī': 'ी', 'i': 'ि', 'u': 'ु', 'ū': 'ू', 'ṛ': 'ृ', 'ṝ': 'ॄ', 'e': 'े', 'ai': 'ै', 'o': 'ो', 'au': 'ौ',
}

export function toDevanagari(input: string): string {
  let s = input.trim().replace(/\./g, '')
  let out = ''
  let i = 0
  const isVowel = (ch: string) => /[aeiouāīūṛṝḷêô]/.test(ch)
  while (i < s.length) {
    const c = s[i]
    if (c === 'a' && i === 0) { out += 'अ'; i += 1; continue }
    const single = IAST_TO_DEV[c]
    if (single) {
      out += single
      i += 1
      const next = s[i]
      if (next && isVowel(next)) {
        if (next === 'a') { i += 1 }
        else { out += IAST_SIGNS[next] || ''; i += 1 }
      }
      continue
    }
    let found: string | null = null
    let len = 0
    if (i + 2 <= s.length) {
      const t2 = s.slice(i, i + 2)
      if (IAST_TO_DEV[t2]) { found = IAST_TO_DEV[t2]; len = 2 }
    }
    if (!found && i + 3 <= s.length) {
      const t3 = s.slice(i, i + 3)
      if (IAST_TO_DEV[t3]) { found = IAST_TO_DEV[t3]; len = 3 }
    }
    if (found) {
      out += found
      i += len
      const next = s[i]
      if (next && isVowel(next)) {
        if (next === 'a') { i += 1 }
        else { out += IAST_SIGNS[next] || ''; i += 1 }
      }
      continue
    }
    if (i + 1 < s.length) {
      const n2 = s.slice(i, i + 2)
      if (IAST_SIGNS[n2]) { out += IAST_SIGNS[n2]; i += 2; continue }
    }
    if (c === 'a') {
      out += 'अ'
      i += 1
      continue
    }
    if (isVowel(c)) {
      out += IAST_BASE[c] || ''
      i += 1
      continue
    }
    const base = IAST_BASE[c]
    if (base) {
      out += base
      i += 1
      const next = s[i]
      if (next === 'a') { i += 1 }
      else if (next && isVowel(next)) {
        out += IAST_SIGNS[next] || ''
        i += 1
      } else if (next && (/[bcdfghjklmnpqrstvwxyz]/.test(next) || IAST_TO_DEV[next])) {
        out += '्'
      } else if (!next) {
        out += '्'
      }
      continue
    }
    out += c
    i += 1
  }
  return out
}

// ─── SANDHI ───

export interface SandhiRule {
  name: string
  devName: string
  rule: string
  example: string
}

export const SANDHI_RULES: SandhiRule[] = [
  { name: 'Dīrgha', devName: 'दीर्घ', rule: 'Same vowel doubles: अ/आ + अ/आ → आ', example: 'राम + अग्र = रामाग्र' },
  { name: 'Guṇa', devName: 'गुण', rule: 'अ/आ + इ/ई → ए · अ/आ + उ/ऊ → ओ · अ/आ + ऋ → अर्', example: 'देव + इन्द्र = देवेन्द्र' },
  { name: 'Vṛddhi', devName: 'वृद्धि', rule: 'अ/आ + ए → ऐ · अ/आ + ओ → औ', example: 'सदा + एव = सदैव' },
  { name: 'Yaṇ', devName: 'यण्', rule: 'इ/ई + vowel → य् · उ/ऊ + vowel → व् · ऋ + vowel → र्', example: 'इति + आदि = इत्यादि' },
  { name: 'Visarga', devName: 'विसर्ग', rule: 'अः + soft consonant → ओ · अः + vowel → अ (vowel merges)', example: 'नरः + इव = नर इव' },
]

function endsWithVowel(w: string): string | null {
  if (!w) return null
  const last = w[w.length - 1]
  const map: Record<string, string> = { 'ा': 'ā', 'ि': 'i', 'ी': 'ī', 'ु': 'u', 'ू': 'ū', 'ृ': 'ṛ', 'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au' }
  if (map[last]) return map[last]
  if ('अआइईउऊऋएऐओऔ'.includes(last)) {
    return { 'अ': 'a', 'आ': 'ā', 'इ': 'i', 'ई': 'ī', 'उ': 'u', 'ऊ': 'ū', 'ऋ': 'ṛ', 'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au' }[last] || null
  }
  if (CONSONANTS_DEV.includes(last)) return 'a'
  return null
}

function stripEndVowel(w: string): string {
  return w.replace(/[ाािीुूृेैोौअआइईउऊऋएऐओऔ]$/, '')
}

function startsWithVowel(w: string): string | null {
  const map: Record<string, string> = { 'अ': 'a', 'आ': 'ā', 'इ': 'i', 'ई': 'ī', 'उ': 'u', 'ऊ': 'ū', 'ऋ': 'ṛ', 'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au' }
  return map[w[0]] || null
}

function stripStartVowel(w: string): string {
  return w.replace(/^[अआइईउऊऋएऐओऔ]/, '')
}

const CONSONANTS_DEV = 'कखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह'

function joinVowel(a: string, b: string): string | null {
  const pairs: Record<string, Record<string, string>> = {
    a: { a: 'ā', ā: 'ā', i: 'e', ī: 'e', u: 'o', ū: 'o', ṛ: 'ar', e: 'ai', ai: 'ai', o: 'au', au: 'au' },
    ā: { a: 'ā', ā: 'ā', i: 'e', ī: 'e', u: 'o', ū: 'o', ṛ: 'ar', e: 'ai', ai: 'ai', o: 'au', au: 'au' },
    i: { i: 'ī', ī: 'ī', a: 'y', ā: 'y', u: 'y', ū: 'y', e: 'y', o: 'y' },
    ī: { i: 'ī', ī: 'ī', a: 'y', ā: 'y', u: 'y', ū: 'y', e: 'y', o: 'y' },
    u: { u: 'ū', ū: 'ū', a: 'v', ā: 'v', i: 'v', ī: 'v', e: 'v', o: 'v' },
    ū: { u: 'ū', ū: 'ū', a: 'v', ā: 'v', i: 'v', ī: 'v', e: 'v', o: 'v' },
    ṛ: { a: 'r', ā: 'r', i: 'r', u: 'r' },
  }
  return pairs[a]?.[b] ?? null
}

export interface SandhiResult {
  ok: boolean
  result: string
  explanation: string
}

const VOWEL_SIGN: Record<string, string> = { a: '', ā: 'ा', i: 'ि', ī: 'ी', u: 'ु', ū: 'ू', ṛ: 'ृ', e: 'े', ai: 'ै', o: 'ो', au: 'ौ', ar: 'अर्' }

export function tryJoinSandhi(first: string, second: string): SandhiResult {
  const a = first.trim()
  const b = second.trim()
  if (!a || !b) return { ok: false, result: '', explanation: 'Enter both words.' }
  const endV = endsWithVowel(a)
  const startV = startsWithVowel(b)
  if (endV && startV) {
    const joined = joinVowel(endV, startV)
    if (joined) {
      if (joined.length === 1 && 'yvr'.includes(joined)) {
        const sv = { y: 'य', v: 'व', r: 'र' }[joined] || 'य'
        return { ok: true, result: stripEndVowel(a) + '्' + sv + VOWEL_SIGN[startV] + stripStartVowel(b), explanation: `Yaṇ sandhi: ${endV}/${startV} → ${joined}्` }
      }
      const rule = endV + '/' + startV
      const ruleName =
        rule === 'a/a' || rule === 'a/ā' || rule === 'ā/a' || rule === 'ā/ā' ? 'Dīrgha' :
        /^[aā][iīuūṛ]$/.test(rule) ? 'Guṇa' :
        /^[aā][eo]$/.test(rule) ? 'Vṛddhi' : 'Sandhi'
      return { ok: true, result: stripEndVowel(a) + VOWEL_SIGN[joined] + stripStartVowel(b), explanation: `${ruleName} sandhi: ${rule} → ${joined}` }
    }
    if (endV === 'a' && startV !== 'a') {
      return { ok: true, result: stripEndVowel(a) + b, explanation: `Elision: final अ dropped before vowel → ${a} + ${b}` }
    }
  }
  if (a.endsWith('ः')) {
    const b0 = b[0]
    if (b0 && CONSONANTS_DEV.includes(b0)) {
      if ('कखपफ'.includes(b0)) return { ok: true, result: a.slice(0, -1) + 'ः' + b, explanation: `Visarga stays before ${b0} (surds)` }
      return { ok: true, result: a.slice(0, -1) + 'ो ' + b, explanation: `Visarga → ओ before soft ${b0}` }
    }
    if (startV) {
      return { ok: true, result: a.slice(0, -1) + ' ' + b, explanation: `Visarga elided before vowel: ${a} + ${b}` }
    }
  }
  if (/[कखगघचछजझटठडढणतथदधनपफबभमयरलवशषसह]्$/.test(a)) {
    const b0 = b[0]
    if (b0 && CONSONANTS_DEV.includes(b0)) {
      const map: Record<string, [string, string]> = {
        'च': ['च्च', 'त् + च → च्च'], 'छ': ['च्छ', 'त् + छ → च्छ'],
        'ट': ['ट्ट', 'त् + ट → ट्ट'], 'त': ['त्त', 'त् + त → त्त'],
        'द': ['द्द', 'त् + द → द्द'], 'न': ['न्न', 'त् + न → न्न'],
        'स': ['त्स', 'त् + स → त्स'],
      }
      if (a.endsWith('त्') && map[b0]) {
        const m = map[b0]
        return { ok: true, result: a.slice(0, -2) + m[0] + b.slice(1), explanation: `Consonant sandhi: ${m[1]}` }
      }
      if (a.endsWith('न्') && (b0 === 'क' || b0 === 'ख')) {
        return { ok: true, result: a.slice(0, -1) + 'ङ्' + b, explanation: `न् + ${b0} → ङ्${b0}` }
      }
      return { ok: true, result: a + b, explanation: `Consonant + ${b0}: final consonant stays (e.g. पृथक् + च = पृथक्च)` }
    }
    if (startV) {
      return { ok: true, result: a.slice(0, -1) + VOWEL_SIGN[startV] + b.slice(1), explanation: `Consonant + vowel: virāma dropped, vowel attaches (e.g. सत्यम् + एव = सत्यमेव)` }
    }
  }
  return { ok: false, result: a + ' ' + b, explanation: 'No automatic rule matched — keep them separate (pada-pāṭha).' }
}

export function trySplitSandhi(word: string, pairs: [string, string][]): SandhiResult[] {
  const results: SandhiResult[] = []
  for (const [a, b] of pairs) {
    const joined = tryJoinSandhi(a, b)
    if (joined.ok && joined.result.replace(/[ ्]/, '') === word.replace(/[ ्]/g, '')) {
      results.push({ ok: true, result: `${a} + ${b}`, explanation: `${a} + ${b} = ${joined.result} (${joined.explanation})` })
    }
  }
  return results
}

// ─── DHĀTU ───

export interface Dhatu {
  root: string
  iast: string
  gana: string
  ganaNum: number
  meaning: string
  present: string
}

export const DHATUS: Dhatu[] = [
  { root: 'भू', iast: 'bhū', gana: 'भ्वादि', ganaNum: 1, meaning: 'to be, become', present: 'भवति' },
  { root: 'कृ', iast: 'kṛ', gana: 'तनादि', ganaNum: 8, meaning: 'to do, make', present: 'करोति' },
  { root: 'गम्', iast: 'gam', gana: 'भ्वादि', ganaNum: 1, meaning: 'to go', present: 'गच्छति' },
  { root: 'पठ्', iast: 'paṭh', gana: 'भ्वादि', ganaNum: 1, meaning: 'to read, recite', present: 'पठति' },
  { root: 'लिख्', iast: 'likh', gana: 'भ्वादि', ganaNum: 1, meaning: 'to write', present: 'लिखति' },
  { root: 'वद्', iast: 'vad', gana: 'भ्वादि', ganaNum: 1, meaning: 'to speak', present: 'वदति' },
  { root: 'इ', iast: 'i', gana: 'अदादि', ganaNum: 2, meaning: 'to go', present: 'एति' },
  { root: 'आस्', iast: 'ās', gana: 'अदादि', ganaNum: 2, meaning: 'to sit, be', present: 'आस्ते' },
  { root: 'स्था', iast: 'sthā', gana: 'भ्वादि', ganaNum: 1, meaning: 'to stand, stay', present: 'तिष्ठति' },
  { root: 'दा', iast: 'dā', gana: 'जुहोत्यादि', ganaNum: 3, meaning: 'to give', present: 'ददाति' },
  { root: 'धा', iast: 'dhā', gana: 'जुहोत्यादि', ganaNum: 3, meaning: 'to place, hold', present: 'दधाति' },
  { root: 'जन्', iast: 'jan', gana: 'दिवादि', ganaNum: 4, meaning: 'to be born', present: 'जायते' },
  { root: 'मन्', iast: 'man', gana: 'दिवादि', ganaNum: 4, meaning: 'to think', present: 'मन्यते' },
  { root: 'श्रु', iast: 'śru', gana: 'स्वादि', ganaNum: 5, meaning: 'to hear', present: 'शृणोति' },
  { root: 'सु', iast: 'su', gana: 'स्वादि', ganaNum: 5, meaning: 'to press (Soma)', present: 'सुनोति' },
  { root: 'तन्', iast: 'tan', gana: 'तनादि', ganaNum: 8, meaning: 'to stretch', present: 'तनोति' },
  { root: 'क्री', iast: 'krī', gana: 'क्रयादि', ganaNum: 9, meaning: 'to buy', present: 'क्रीणाति' },
  { root: 'पू', iast: 'pū', gana: 'क्रयादि', ganaNum: 9, meaning: 'to purify', present: 'पुनाति' },
  { root: 'वच्', iast: 'vac', gana: 'अदादि', ganaNum: 2, meaning: 'to speak', present: 'वक्ति' },
  { root: 'हन्', iast: 'han', gana: 'अदादि', ganaNum: 2, meaning: 'to strike, kill', present: 'हन्ति' },
  { root: 'चर्', iast: 'car', gana: 'भ्वादि', ganaNum: 1, meaning: 'to move, wander', present: 'चरति' },
  { root: 'नम्', iast: 'nam', gana: 'भ्वादि', ganaNum: 1, meaning: 'to bow', present: 'नमति' },
  { root: 'ज्ञा', iast: 'jñā', gana: 'क्रयादि', ganaNum: 9, meaning: 'to know', present: 'जानाति' },
  { root: 'पा', iast: 'pā', gana: 'भ्वादि', ganaNum: 1, meaning: 'to drink', present: 'पिबति' },
  { root: 'वस्', iast: 'vas', gana: 'भ्वादि', ganaNum: 1, meaning: 'to dwell', present: 'वसति' },
  { root: 'रुच्', iast: 'ruc', gana: 'दिवादि', ganaNum: 4, meaning: 'to shine, please', present: 'रोचते' },
  { root: 'वृ', iast: 'vṛ', gana: 'भ्वादि', ganaNum: 1, meaning: 'to choose', present: 'वृणोति' },
  { root: 'दृश्', iast: 'dṛś', gana: 'दिवादि', ganaNum: 4, meaning: 'to see', present: 'पश्यति' },
  { root: 'खाद्', iast: 'khād', gana: 'भ्वादि', ganaNum: 1, meaning: 'to eat', present: 'खादति' },
  { root: 'जि', iast: 'ji', gana: 'भ्वादि', ganaNum: 1, meaning: 'to conquer', present: 'जयति' },
  { root: 'दृ', iast: 'dṛ', gana: 'भ्वादि', ganaNum: 1, meaning: 'to regard', present: 'ददर्श' },
  { root: 'बुध्', iast: 'budh', gana: 'भ्वादि', ganaNum: 1, meaning: 'to wake, know', present: 'बोधति' },
  { root: 'भज्', iast: 'bhaj', gana: 'भ्वादि', ganaNum: 1, meaning: 'to share, worship', present: 'भजति' },
  { root: 'मृ', iast: 'mṛ', gana: 'दिवादि', ganaNum: 4, meaning: 'to die', present: 'म्रियते' },
  { root: 'युध्', iast: 'yudh', gana: 'दिवादि', ganaNum: 4, meaning: 'to fight', present: 'युध्यते' },
  { root: 'विश्', iast: 'viś', gana: 'स्वादि', ganaNum: 6, meaning: 'to enter', present: 'विशति' },
  { root: 'सृ', iast: 'sṛ', gana: 'भ्वादि', ganaNum: 1, meaning: 'to flow, run', present: 'सरति' },
  { root: 'अस्', iast: 'as', gana: 'अदादि', ganaNum: 2, meaning: 'to be (copula)', present: 'अस्ति' },
  { root: 'रम्', iast: 'ram', gana: 'भ्वादि', ganaNum: 1, meaning: 'to delight', present: 'रमते' },
  { root: 'प्रच्छ्', iast: 'pracch', gana: 'स्वादि', ganaNum: 6, meaning: 'to ask', present: 'पृच्छति' },
]

// ─── DAILY PICKS ───

export function dayOfYear(d = new Date()): number {
  const start = new Date(d.getFullYear(), 0, 0)
  return Math.floor((d.getTime() - start.getTime()) / 86400000)
}

export async function wordOfDay(): Promise<{ word: string; meanings: string[]; meaningsHi: string[]; iast: string } | null> {
  const { data } = await supabase
    .from('dictionary')
    .select('word, meanings, meanings_hi')
    .order('id')
    .limit(200)
  if (!data || data.length === 0) return null
  const row = data[dayOfYear() % data.length]
  return { word: row.word, meanings: row.meanings || [], meaningsHi: row.meanings_hi || [], iast: toIAST(row.word) }
}

export const PHRASES_OF_DAY: { dev: string; iast: string; meaning: string; meaningHi?: string }[] = [
  { dev: 'सत्यमेव जयते', iast: 'satyameva jayate', meaning: 'Truth alone triumphs', meaningHi: 'सत्य की सदा विजय होती है' },
  { dev: 'विद्या ददाति विनयम्', iast: 'vidyā dadāti vinayam', meaning: 'Knowledge gives humility', meaningHi: 'ज्ञान विनय देता है' },
  { dev: 'अतिथि देवो भव', iast: 'atithi devo bhava', meaning: 'The guest is a god', meaningHi: 'अतिथि देव के समान है' },
  { dev: 'वसुधैव कुटुम्बकम्', iast: 'vasudhaiva kuṭumbakam', meaning: 'The world is one family', meaningHi: 'सम्पूर्ण विश्व एक परिवार है' },
  { dev: 'सर्वे भवन्तु सुखिनः', iast: 'sarve bhavantu sukhinaḥ', meaning: 'May all be happy', meaningHi: 'सभी सुखी हों' },
  { dev: 'आ नो भद्राः क्रतवो यन्तु विश्वतः', iast: 'ā no bhadrāḥ kratavo yantu viśvataḥ', meaning: 'Let noble thoughts come from all sides', meaningHi: 'चारों ओर से श्रेष्ठ विचार आएँ' },
  { dev: 'उद्धरेदात्मनात्मानम्', iast: 'uddharedātmanātmānam', meaning: 'Lift yourself by yourself', meaningHi: 'स्वयं को स्वयं ही ऊपर उठाएँ' },
  { dev: 'योगः कर्मसु कौशलम्', iast: 'yogaḥ karmasu kauśalam', meaning: 'Yoga is skill in action', meaningHi: 'योग कर्म में कुशलता है' },
  { dev: 'सा विद्या या विमुक्तये', iast: 'sā vidyā yā vimuktaye', meaning: 'Knowledge is that which liberates', meaningHi: 'ज्ञान वह है जो मुक्त करता है' },
  { dev: 'नास्ति विद्या समं चक्षुः', iast: 'nāsti vidyā samaṃ cakṣuḥ', meaning: 'There is no eye like knowledge', meaningHi: 'ज्ञान के समान कोई आँख नहीं' },
  { dev: 'धर्मो रक्षति रक्षितः', iast: 'dharmo rakṣati rakṣitaḥ', meaning: 'Dharma protects the protector', meaningHi: 'धर्म रक्षक की रक्षा करता है' },
  { dev: 'संस्कृतं देवभाषा', iast: 'saṃskṛtaṃ devabhāṣā', meaning: 'Sanskrit is the language of the gods', meaningHi: 'संस्कृत देवों की भाषा है' },
]

export const VERSES_OF_DAY: { dev: string; iast: string; translation: string; translationHi?: string; source: string; sourceHi?: string }[] = [
  { dev: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।', iast: 'karmaṇyevādhikāraste mā phaleṣu kadācana |', translation: 'Your right is to action alone, never to its fruits.', translationHi: 'आपका अधिकार केवल कर्म में है, फलों में कभी नहीं।', source: 'Bhagavad Gītā 2.47', sourceHi: 'श्रीमद्भगवद्गीता 2.47' },
  { dev: 'उद्यमेन हि सिध्यन्ति कार्याणि न मनोरथैः।', iast: 'udyamena hi sidhyanti kāryāṇi na manorathaiḥ |', translation: 'Tasks succeed by effort, not by wishes.', translationHi: 'कार्य परिश्रम से सिद्ध होते हैं, केवल इच्छा से नहीं।', source: 'Pañcatantra', sourceHi: 'पंचतंत्र' },
  { dev: 'मातृवत् परदारेषु परद्रव्येषु लोष्टवत्।', iast: 'mātṛvat paradāreṣu paradravyeṣu loṣṭavat |', translation: 'Treat others\' wives as mothers, others\' wealth as clods of earth.', translationHi: 'परस्त्री को माता के समान और पराये धन को मिट्टी के ढेले के समान समझो।', source: 'Cāṇakya Nīti', sourceHi: 'चाणक्य नीति' },
  { dev: 'अहिंसा परमो धर्मः', iast: 'ahiṃsā paramo dharmaḥ', translation: 'Non-violence is the highest dharma.', translationHi: 'अहिंसा सबसे बड़ा धर्म है।', source: 'Mahābhārata', sourceHi: 'महाभारत' },
  { dev: 'सत्यं शिवं सुन्दरम्', iast: 'satyaṃ śivaṃ sundaram', translation: 'Truth, goodness, beauty.', translationHi: 'सत्य, शिव, सौन्दर्य।', source: 'Upaniṣadic motto', sourceHi: 'उपनिषद्' },
  { dev: 'आत्मानं विद्धि', iast: 'ātmānaṃ viddhi', translation: 'Know the Self.', translationHi: 'आत्मा को जानो।', source: 'Kaṭha Upaniṣad', sourceHi: 'कठोपनिषद्' },
  { dev: 'वसुधैव कुटुम्बकम्', iast: 'vasudhaiva kuṭumbakam', translation: 'The whole world is one family.', translationHi: 'सम्पूर्ण विश्व एक परिवार है।', source: 'Hitopadeśa', sourceHi: 'हितोपदेश' },
  { dev: 'श्रद्धावान् लभते ज्ञानम्', iast: 'śraddhāvān labhate jñānam', translation: 'The faithful obtain knowledge.', translationHi: 'श्रद्धावान व्यक्ति ज्ञान प्राप्त करता है।', source: 'Bhagavad Gītā 4.39', sourceHi: 'श्रीमद्भगवद्गीता 4.39' },
  { dev: 'परोपकाराय पुण्याय पापाय परपीडनम्', iast: 'paropakārāya puṇyāya pāpāya parapīḍanam', translation: 'For helping others is merit; harming others is sin.', translationHi: 'दूसरों की सहायता करना पुण्य है, दूसरों को कष्ट देना पाप।', source: 'Vidyāraṇya', sourceHi: 'विद्यारण्य' },
  { dev: 'संगच्छध्वं संवदध्वं', iast: 'saṃgacchadhvaṃ saṃvadadhvaṃ', translation: 'Walk together, speak together.', translationHi: 'एक साथ चलो, एक साथ बोलो।', source: 'Ṛgveda 10.191', sourceHi: 'ऋग्वेद 10.191' },
]

export function phraseOfDay(): typeof PHRASES_OF_DAY[number] {
  return PHRASES_OF_DAY[dayOfYear() % PHRASES_OF_DAY.length]
}

export function verseOfDay(): typeof VERSES_OF_DAY[number] {
  return VERSES_OF_DAY[dayOfYear() % VERSES_OF_DAY.length]
}

// ─── DAILY CHALLENGE ───

export interface ChallengeQuestion {
  prompt: string
  promptHi: string
  options: string[]
  optionsHi: string[]
  correct: number
  explanation: string
  explanationHi: string
}

export const DAILY_CHALLENGE_QUESTIONS: ChallengeQuestion[] = [
  { prompt: 'रामः का अर्थ है?', promptHi: 'रामः का अर्थ क्या है?', options: ['God', 'Rāma (the hero)', 'Sun', 'Forest'], optionsHi: ['देवता', 'राम (वीर)', 'सूर्य', 'वन'], correct: 1, explanation: 'रामः = Rāma, hero of the Rāmāyaṇa.', explanationHi: 'रामः = राम, रामायण के नायक।' },
  { prompt: 'सीता का अर्थ है?', promptHi: 'सीता का अर्थ क्या है?', options: ['Furrow', 'River', 'Daughter', 'Moon'], optionsHi: ['हल की नाली', 'नदी', 'पुत्री', 'चन्द्रमा'], correct: 0, explanation: 'सीता = furrow; Sītā, consort of Rāma.', explanationHi: 'सीता = हल की नाली; सीता, राम की पत्नी।' },
  { prompt: '"I am a student" in Sanskrit?', promptHi: 'संस्कृत में "मैं छात्र हूँ" कैसे कहते हैं?', options: ['अहं गच्छामि', 'अहं छात्रः', 'त्वं कुत्र', 'भवति नाम'], optionsHi: ['अहं गच्छामि', 'अहं छात्रः', 'त्वं कुत्र', 'भवति नाम'], correct: 1, explanation: 'अहं छात्रः = I am a student.', explanationHi: 'अहं छात्रः = मैं छात्र हूँ।' },
  { prompt: 'विद्या ददाति विनयम् — विद्या means?', promptHi: 'विद्या ददाति विनयम् — विद्या का अर्थ?', options: ['Money', 'Knowledge', 'Food', 'Time'], optionsHi: ['धन', 'ज्ञान', 'भोजन', 'समय'], correct: 1, explanation: 'विद्या = knowledge; "Knowledge gives humility."', explanationHi: 'विद्या = ज्ञान; "ज्ञान विनय देता है।"' },
  { prompt: 'देव + इन्द्रः = ?', promptHi: 'देव + इन्द्रः = ?', options: ['देवेन्द्रः', 'देवीन्द्रः', 'दवेन्द्रः', 'देवैन्द्रः'], optionsHi: ['देवेन्द्रः', 'देवीन्द्रः', 'दवेन्द्रः', 'देवैन्द्रः'], correct: 0, explanation: 'Guṇa sandhi: अ + इ → ए = देवेन्द्रः.', explanationHi: 'गुण संधि: अ + इ → ए = देवेन्द्रः।' },
  { prompt: 'सत्यमेव जयते means?', promptHi: 'सत्यमेव जयते का अर्थ?', options: ['Truth alone triumphs', 'Peace everywhere', 'Work is worship', 'Om shanti'], optionsHi: ['सत्य की सदा विजय हो', 'सर्वत्र शांति', 'कर्म ही पूजा है', 'ॐ शान्ति'], correct: 0, explanation: 'सत्यम् + एव = सत्यमेव; "Truth alone triumphs."', explanationHi: 'सत्यम् + एव = सत्यमेव; "सत्य की सदा विजय हो।"' },
  { prompt: '"to go" — which dhātu?', promptHi: '"जाना" — कौन सी धातु?', options: ['कृ', 'गम्', 'भू', 'पठ्'], optionsHi: ['कृ', 'गम्', 'भू', 'पठ्'], correct: 1, explanation: 'गम् (gam) = to go → गच्छति.', explanationHi: 'गम् (gam) = जाना → गच्छति।' },
  { prompt: 'धन्यवादः means?', promptHi: 'धन्यवादः का अर्थ?', options: ['Goodbye', 'Thank you', 'Welcome', 'Sorry'], optionsHi: ['अलविदा', 'धन्यवाद', 'स्वागत', 'क्षमा'], correct: 1, explanation: 'धन्यवादः = thank you.', explanationHi: 'धन्यवादः = धन्यवाद।' },
  { prompt: 'Who wrote the Rāmāyaṇa?', promptHi: 'रामायण किसने लिखी?', options: ['Vyāsa', 'Vālmīki', 'Kālidāsa', 'Bharata'], optionsHi: ['व्यास', 'वाल्मीकि', 'कालिदास', 'भरत'], correct: 1, explanation: 'Vālmīki composed the Rāmāyaṇa, the ādi-kāvya.', explanationHi: 'वाल्मीकि ने रामायण की रचना की, जो आदि-काव्य है।' },
  { prompt: 'नमस्ते is used to?', promptHi: 'नमस्ते का प्रयोग किसलिए होता है?', options: ['Say goodbye only', 'Greet with respect', 'Ask a question', 'Express anger'], optionsHi: ['केवल विदाई', 'सम्मान से अभिवादन', 'प्रश्न पूछना', 'क्रोज़ व्यक्त करना'], correct: 1, explanation: 'नमस्ते = a respectful greeting ("I bow to you").', explanationHi: 'नमस्ते = सम्मानपूर्वक अभिवादन ("मैं आपको नमन करता हूँ")।' },
  { prompt: 'The Gītā is part of which epic?', promptHi: 'गीता किस महाकाव्य का भाग है?', options: ['Rāmāyaṇa', 'Mahābhārata', 'Purāṇas', 'Vedas'], optionsHi: ['रामायण', 'महाभारत', 'पुराण', 'वेद'], correct: 1, explanation: 'The Bhagavad Gītā is in the Bhīṣma Parva of the Mahābhārata.', explanationHi: 'भगवद्गीता महाभारत के भीष्म पर्व में है।' },
  { prompt: 'What is दीर्घ sandhi?', promptHi: 'दीर्घ संधि क्या है?', options: ['Same vowels double', 'Vowel disappears', 'Consonant changes', 'No change'], optionsHi: ['एक ही स्वर दोहराता है', 'स्वर लुप्त हो जाता है', 'व्यंजन बदलता है', 'कोई परिवर्तन नहीं'], correct: 0, explanation: 'Dīrgha: अ + अ → आ (same vowel lengthens).', explanationHi: 'दीर्घ: अ + अ → आ (एक ही स्वर लंबा होता है)।' },
  { prompt: '"Where are you going?" in Sanskrit?', promptHi: 'संस्कृत में "तुम कहाँ जा रहे हो?" कैसे कहते हैं?', options: ['त्वं कुत्र गच्छसि', 'अहं इह तिष्ठामि', 'तव नाम किम्', 'इदं पुस्तकम्'], optionsHi: ['त्वं कुत्र गच्छसि', 'अहं इह तिष्ठामि', 'तव नाम किम्', 'इदं पुस्तकम्'], correct: 0, explanation: 'त्वं कुत्र गच्छसि = Where are you going?', explanationHi: 'त्वं कुत्र गच्छसि = तुम कहाँ जा रहे हो?' },
  { prompt: 'गुरु means?', promptHi: 'गुरु का अर्थ?', options: ['Student', 'Teacher', 'Parent', 'Friend'], optionsHi: ['छात्र', 'शिक्षक', 'अभिभावक', 'मित्र'], correct: 1, explanation: 'गुरु = teacher (lit. heavy with knowledge).', explanationHi: 'गुरु = शिक्षक (शब्दशः ज्ञान से भारी)।' },
  { prompt: 'स्वागतम् means?', promptHi: 'स्वागतम् का अर्थ?', options: ['Farewell', 'Welcome', 'Thanks', 'Blessing'], optionsHi: ['विदाई', 'स्वागत', 'धन्यवाद', 'आशीर्वाद'], correct: 1, explanation: 'स्वागतम् = welcome.', explanationHi: 'स्वागतम् = स्वागत है।' },
]

// ─── SEARCH ───

export interface SearchResult {
  kind: 'dictionary' | 'lesson' | 'text' | 'corpus'
  id: string
  title: string
  sub: string
  subHi?: string
  extra?: string
}

export async function searchAll(q: string, limit = 8): Promise<SearchResult[]> {
  const query = q.trim()
  if (!query) return []
  const results: SearchResult[] = []
  const [dict, dictEn, lessons, texts, corpus] = await Promise.all([
    supabase.from('dictionary').select('word, meanings, meanings_hi').ilike('word', `%${query}%`).limit(limit),
    supabase.from('dictionary').select('word, meanings, meanings_hi').contains('meanings', [query]).limit(limit),
    supabase.from('lessons').select('id, title, level').ilike('title', `%${query}%`).limit(limit),
    supabase.from('texts').select('id, title, author').ilike('title', `%${query}%`).limit(limit),
    supabase.from('corpus_texts').select('id, title').ilike('title', `%${query}%`).limit(limit),
  ])
  const seen = new Set<string>()
  if (dict.data) {
    for (const d of dict.data) {
      seen.add(d.word)
      results.push({
        kind: 'dictionary',
        id: d.word,
        title: d.word,
        sub: (d.meanings || []).slice(0, 2).join(' · '),
        subHi: (d.meanings_hi || []).slice(0, 2).join(' · ') || undefined,
        extra: toIAST(d.word),
      })
    }
  }
  if (dictEn.data) {
    for (const d of dictEn.data) {
      if (seen.has(d.word)) continue
      seen.add(d.word)
      results.push({
        kind: 'dictionary',
        id: d.word,
        title: `${d.word} — ${(d.meanings || [])[0] || ''}`,
        sub: (d.meanings || []).slice(1, 3).join(' · ') || 'English meaning match',
        subHi: (d.meanings_hi || []).slice(1, 3).join(' · ') || undefined,
        extra: toIAST(d.word),
      })
    }
  }
  if (lessons.data) {
    for (const l of lessons.data) {
      results.push({ kind: 'lesson', id: l.id, title: l.title, sub: `Level ${l.level} lesson`, subHi: `स्तर ${l.level} · पाठ` })
    }
  }
  if (texts.data) {
    for (const tx of texts.data) {
      results.push({ kind: 'text', id: tx.id, title: tx.title, sub: tx.author || 'Sanskrit text', subHi: tx.author || 'संस्कृत ग्रंथ' })
    }
  }
  if (corpus.data) {
    for (const c of corpus.data) {
      results.push({ kind: 'corpus', id: c.id, title: c.title, sub: 'Corpus text', subHi: 'कोश में पाठ' })
    }
  }
  return results.slice(0, 12)
}
