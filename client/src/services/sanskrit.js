import { supabase } from "./supabase";
import { lessons as localLessons } from "../data/lessons";
import { books as localBooks } from "../data/books";
import { SHLOKAS } from "../data/shlokas";
import { DHATUS as LOCAL_DHATUS } from "../data/dhatus";
import { CONCEPTS as LOCAL_CONCEPTS } from "../data/conceptExplorer";

let cachedMonierCore = null;
async function getMonierCore() {
  if (!cachedMonierCore) {
    try {
      const mod = await import("../data/monier_core.json");
      cachedMonierCore = mod.default || mod;
    } catch {
      cachedMonierCore = [];
    }
  }
  return cachedMonierCore;
}

const DEV_VOWELS = [
  ["\u0905", "a"],
  ["\u0906", "\u0101"],
  ["\u0907", "i"],
  ["\u0908", "\u012B"],
  ["\u0909", "u"],
  ["\u090A", "\u016B"],
  ["\u090B", "\u1E5B"],
  ["\u0960", "\u1E5D"],
  ["\u090C", "\u1E37"],
  ["\u0961", "\u1E39"],
  ["\u090F", "e"],
  ["\u0910", "ai"],
  ["\u0913", "o"],
  ["\u0914", "au"],
  ["\u090D", "\xEA"],
  ["\u0911", "\xF4"]
];
const DEV_CONSONANTS = [
  ["\u0915\u094D\u0937", "k\u1E63"],
  ["\u0924\u094D\u0930", "tr"],
  ["\u091C\u094D\u091E", "j\xF1"],
  ["\u0915", "k"],
  ["\u0916", "kh"],
  ["\u0917", "g"],
  ["\u0918", "gh"],
  ["\u0919", "\u1E45"],
  ["\u091A", "c"],
  ["\u091B", "ch"],
  ["\u091C", "j"],
  ["\u091D", "jh"],
  ["\u091E", "\xF1"],
  ["\u091F", "\u1E6D"],
  ["\u0920", "\u1E6Dh"],
  ["\u0921", "\u1E0D"],
  ["\u0922", "\u1E0Dh"],
  ["\u0923", "\u1E47"],
  ["\u0924", "t"],
  ["\u0925", "th"],
  ["\u0926", "d"],
  ["\u0927", "dh"],
  ["\u0928", "n"],
  ["\u092A", "p"],
  ["\u092B", "ph"],
  ["\u092C", "b"],
  ["\u092D", "bh"],
  ["\u092E", "m"],
  ["\u092F", "y"],
  ["\u0930", "r"],
  ["\u0932", "l"],
  ["\u0935", "v"],
  ["\u0936", "\u015B"],
  ["\u0937", "\u1E63"],
  ["\u0938", "s"],
  ["\u0939", "h"],
  ["\u0933", "\u1E37"]
];
const DEV_SIGNS = [
  ["\u093E", "\u0101"],
  ["\u093F", "i"],
  ["\u0940", "\u012B"],
  ["\u0941", "u"],
  ["\u0942", "\u016B"],
  ["\u0943", "\u1E5B"],
  ["\u0944", "\u1E5D"],
  ["\u0947", "e"],
  ["\u0948", "ai"],
  ["\u094B", "o"],
  ["\u094C", "au"],
  ["\u0902", "\u1E43"],
  ["\u0901", "\u1E43"],
  ["\u0903", "\u1E25"],
  ["\u094D", ""]
];
function toIAST(input) {
  let s = input.trim();
  let out = "";
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    const next = s[i + 1];
    const next2 = s[i + 2];
    const pair = next ? c + next : "";
    const trip = next2 ? c + next + next2 : "";
    const triple = DEV_CONSONANTS.find(([d]) => d === trip);
    if (triple) {
      out += triple[1];
      i += 3;
      const sign2 = DEV_SIGNS.find(([d]) => d === s[i]);
      if (sign2) {
        i += 1;
        if (sign2[0] === "\u0902" || sign2[0] === "\u0901" || sign2[0] === "\u0903") {
          out += "a" + sign2[1];
        } else {
          out += sign2[1];
        }
      } else {
        out += "a";
      }
      continue;
    }
    const dbl = DEV_CONSONANTS.find(([d]) => d === pair);
    if (dbl) {
      out += dbl[1];
      i += 2;
      const sign2 = DEV_SIGNS.find(([d]) => d === s[i]);
      if (sign2) {
        i += 1;
        if (sign2[0] === "\u0902" || sign2[0] === "\u0901" || sign2[0] === "\u0903") {
          out += "a" + sign2[1];
        } else {
          out += sign2[1];
        }
      } else {
        out += "a";
      }
      continue;
    }
    if (c === "\u0905") {
      out += "a";
      i += 1;
      continue;
    }
    const vowel = DEV_VOWELS.find(([d]) => d === c);
    if (vowel) {
      out += vowel[1];
      i += 1;
      continue;
    }
    const cons = DEV_CONSONANTS.find(([d]) => d === c);
    if (cons) {
      out += cons[1];
      i += 1;
      const sign2 = DEV_SIGNS.find(([d]) => d === s[i]);
      if (sign2) {
        i += 1;
        if (sign2[0] === "\u0902" || sign2[0] === "\u0901" || sign2[0] === "\u0903") {
          out += "a" + sign2[1];
        } else {
          out += sign2[1];
        }
      } else {
        out += "a";
      }
      continue;
    }
    const sign = DEV_SIGNS.find(([d]) => d === c);
    if (sign) {
      out += sign[1];
      i += 1;
      continue;
    }
    out += c;
    i += 1;
  }
  return out;
}
const IAST_TO_DEV = {
  \u0101: "\u0906",
  \u012B: "\u0908",
  \u016B: "\u090A",
  \u1E5B: "\u090B",
  \u1E5D: "\u0960",
  \u1E37: "\u090C",
  \u1E43: "\u0902",
  \u1E25: "\u0903",
  k\u1E63: "\u0915\u094D\u0937",
  kh: "\u0916",
  gh: "\u0918",
  \u1E45: "\u0919",
  ch: "\u091B",
  jh: "\u091D",
  \u00F1: "\u091E",
  \u1E6D: "\u091F",
  \u1E6Dh: "\u0920",
  \u1E0D: "\u0921",
  \u1E0Dh: "\u0922",
  \u1E47: "\u0923",
  th: "\u0925",
  dh: "\u0927",
  ph: "\u092B",
  bh: "\u092D",
  \u015B: "\u0936",
  \u1E63: "\u0937"
};
const IAST_BASE = {
  a: "\u0905",
  i: "\u0907",
  u: "\u0909",
  e: "\u090F",
  o: "\u0913",
  ai: "\u0910",
  au: "\u0914",
  k: "\u0915",
  g: "\u0917",
  c: "\u091A",
  j: "\u091C",
  t: "\u0924",
  d: "\u0926",
  n: "\u0928",
  p: "\u092A",
  b: "\u092C",
  m: "\u092E",
  y: "\u092F",
  r: "\u0930",
  l: "\u0932",
  v: "\u0935",
  s: "\u0938",
  h: "\u0939"
};
const IAST_SIGNS = {
  "\u0101": "\u093E",
  "\u012B": "\u0940",
  "i": "\u093F",
  "u": "\u0941",
  "\u016B": "\u0942",
  "\u1E5B": "\u0943",
  "\u1E5D": "\u0944",
  "e": "\u0947",
  "ai": "\u0948",
  "o": "\u094B",
  "au": "\u094C"
};
function toDevanagari(input) {
  let s = input.trim().replace(/[.,!?;:]+$/, "");
  let out = "";
  let i = 0;
  const isVowel = (ch) => /[aeiouāīūṛṝḷêô]/.test(ch);
  while (i < s.length) {
    const c = s[i];
    if (c === "a" && i === 0) {
      out += "\u0905";
      i += 1;
      continue;
    }
    let found = null;
    let len = 0;
    if (i + 3 <= s.length && IAST_TO_DEV[s.slice(i, i + 3)]) {
      found = IAST_TO_DEV[s.slice(i, i + 3)];
      len = 3;
    } else if (i + 2 <= s.length && IAST_TO_DEV[s.slice(i, i + 2)]) {
      found = IAST_TO_DEV[s.slice(i, i + 2)];
      len = 2;
    } else if (IAST_TO_DEV[c]) {
      found = IAST_TO_DEV[c];
      len = 1;
    }

    if (found) {
      out += found;
      const matchedKey = s.slice(i, i + len);
      i += len;
      const next = s[i];
      if (next && isVowel(next)) {
        if (next === "a") {
          i += 1;
        } else {
          out += IAST_SIGNS[next] || "";
          i += 1;
        }
      } else if (!isVowel(matchedKey) && matchedKey !== "\u1E43" && matchedKey !== "\u1E25") {
        if (next && (/[bcdfghjklmnpqrstvwxyz]/.test(next) || IAST_TO_DEV[next])) {
          out += "\u094D";
        } else if (!next) {
          out += "\u094D";
        }
      }
      continue;
    }

    if (isVowel(c)) {
      out += IAST_BASE[c] || "";
      i += 1;
      continue;
    }

    const base = IAST_BASE[c];
    if (base) {
      out += base;
      i += 1;
      const next = s[i];
      if (next === "a") {
        i += 1;
      } else if (next && isVowel(next)) {
        out += IAST_SIGNS[next] || "";
        i += 1;
      } else if (next && (/[bcdfghjklmnpqrstvwxyz]/.test(next) || IAST_TO_DEV[next])) {
        out += "\u094D";
      } else if (!next) {
        out += "\u094D";
      }
      continue;
    }
    out += c;
    i += 1;
  }
  return out;
}
const SANDHI_RULES = [
  { name: "D\u012Brgha", devName: "\u0926\u0940\u0930\u094D\u0918", rule: "Same vowel doubles: \u0905/\u0906 + \u0905/\u0906 \u2192 \u0906", example: "\u0930\u093E\u092E + \u0905\u0917\u094D\u0930 = \u0930\u093E\u092E\u093E\u0917\u094D\u0930" },
  { name: "Gu\u1E47a", devName: "\u0917\u0941\u0923", rule: "\u0905/\u0906 + \u0907/\u0908 \u2192 \u090F \xB7 \u0905/\u0906 + \u0909/\u090A \u2192 \u0913 \xB7 \u0905/\u0906 + \u090B \u2192 \u0905\u0930\u094D", example: "\u0926\u0947\u0935 + \u0907\u0928\u094D\u0926\u094D\u0930 = \u0926\u0947\u0935\u0947\u0928\u094D\u0926\u094D\u0930" },
  { name: "V\u1E5Bddhi", devName: "\u0935\u0943\u0926\u094D\u0927\u093F", rule: "\u0905/\u0906 + \u090F \u2192 \u0910 \xB7 \u0905/\u0906 + \u0913 \u2192 \u0914", example: "\u0938\u0926\u093E + \u090F\u0935 = \u0938\u0926\u0948\u0935" },
  { name: "Ya\u1E47", devName: "\u092F\u0923\u094D", rule: "\u0907/\u0908 + vowel \u2192 \u092F\u094D \xB7 \u0909/\u090A + vowel \u2192 \u0935\u094D \xB7 \u090B + vowel \u2192 \u0930\u094D", example: "\u0907\u0924\u093F + \u0906\u0926\u093F = \u0907\u0924\u094D\u092F\u093E\u0926\u093F" },
  { name: "Visarga", devName: "\u0935\u093F\u0938\u0930\u094D\u0917", rule: "\u0905\u0903 + soft consonant \u2192 \u0913 \xB7 \u0905\u0903 + vowel \u2192 \u0905 (vowel merges)", example: "\u0928\u0930\u0903 + \u0907\u0935 = \u0928\u0930 \u0907\u0935" }
];
function endsWithVowel(w) {
  if (!w) return null;
  const last = w[w.length - 1];
  const map = { "\u093E": "\u0101", "\u093F": "i", "\u0940": "\u012B", "\u0941": "u", "\u0942": "\u016B", "\u0943": "\u1E5B", "\u0947": "e", "\u0948": "ai", "\u094B": "o", "\u094C": "au" };
  if (map[last]) return map[last];
  if ("\u0905\u0906\u0907\u0908\u0909\u090A\u090B\u090F\u0910\u0913\u0914".includes(last)) {
    return { "\u0905": "a", "\u0906": "\u0101", "\u0907": "i", "\u0908": "\u012B", "\u0909": "u", "\u090A": "\u016B", "\u090B": "\u1E5B", "\u090F": "e", "\u0910": "ai", "\u0913": "o", "\u0914": "au" }[last] || null;
  }
  if (CONSONANTS_DEV.includes(last)) return "a";
  return null;
}
function stripEndVowel(w) {
  return w.replace(/[ािीुूृॄेैोौअआइईउऊऋएऐओऔ]$/, "");
}
function startsWithVowel(w) {
  const map = { "\u0905": "a", "\u0906": "\u0101", "\u0907": "i", "\u0908": "\u012B", "\u0909": "u", "\u090A": "\u016B", "\u090B": "\u1E5B", "\u090F": "e", "\u0910": "ai", "\u0913": "o", "\u0914": "au" };
  return map[w[0]] || null;
}
function stripStartVowel(w) {
  return w.replace(/^[अआइईउऊऋएऐओऔ]/, "");
}
const CONSONANTS_DEV = "\u0915\u0916\u0917\u0918\u0919\u091A\u091B\u091C\u091D\u091E\u091F\u0920\u0921\u0922\u0923\u0924\u0925\u0926\u0927\u0928\u092A\u092B\u092C\u092D\u092E\u092F\u0930\u0932\u0935\u0936\u0937\u0938\u0939";
const JASHTVA_MAP = {
  "\u0915": "\u0917", // k -> g
  "\u091A": "\u091C", // c -> j
  "\u091F": "\u0921", // ṭ -> ḍ
  "\u0924": "\u0926", // t -> d
  "\u092A": "\u092C"  // p -> b
};
function joinVowel(a, b) {
  const pairs = {
    a: { a: "\u0101", \u0101: "\u0101", i: "e", \u012B: "e", u: "o", \u016B: "o", \u1E5B: "ar", e: "ai", ai: "ai", o: "au", au: "au" },
    \u0101: { a: "\u0101", \u0101: "\u0101", i: "e", \u012B: "e", u: "o", \u016B: "o", \u1E5B: "ar", e: "ai", ai: "ai", o: "au", au: "au" },
    i: { i: "\u012B", \u012B: "\u012B", a: "y", \u0101: "y", u: "y", \u016B: "y", e: "y", o: "y" },
    \u012B: { i: "\u012B", \u012B: "\u012B", a: "y", \u0101: "y", u: "y", \u016B: "y", e: "y", o: "y" },
    u: { u: "\u016B", \u016B: "\u016B", a: "v", \u0101: "v", i: "v", \u012B: "v", e: "v", o: "v" },
    \u016B: { u: "\u016B", \u016B: "\u016B", a: "v", \u0101: "v", i: "v", \u012B: "v", e: "v", o: "v" },
    \u1E5B: { a: "r", \u0101: "r", i: "r", u: "r" }
  };
  return pairs[a]?.[b] ?? null;
}
const VOWEL_SIGN = { a: "", \u0101: "\u093E", i: "\u093F", \u012B: "\u0940", u: "\u0941", \u016B: "\u0942", \u1E5B: "\u0943", e: "\u0947", ai: "\u0948", o: "\u094B", au: "\u094C", ar: "\u0905\u0930\u094D" };
function tryJoinSandhi(first, second) {
  const a = first.trim();
  const b = second.trim();
  if (!a || !b) return { ok: false, result: "", explanation: "Enter both words." };
  const endV = endsWithVowel(a);
  const startV = startsWithVowel(b);
  if (endV && startV) {
    const joined = joinVowel(endV, startV);
    if (joined) {
      if (joined.length === 1 && "yvr".includes(joined)) {
        const sv = { y: "\u092F", v: "\u0935", r: "\u0930" }[joined] || "\u092F";
        const stripped = stripEndVowel(a);
        const baseWithVirama = stripped.endsWith("\u094D") ? stripped : stripped + "\u094D";
        return { ok: true, result: baseWithVirama + sv + VOWEL_SIGN[startV] + stripStartVowel(b), explanation: `Ya\u1E47 sandhi: ${endV}/${startV} \u2192 ${joined}\u094D` };
      }
      const rule = endV + "/" + startV;
      const ruleName = rule === "a/a" || rule === "a/\u0101" || rule === "\u0101/a" || rule === "\u0101/\u0101" ? "D\u012Brgha" : /^[aā][iīuūṛ]$/.test(rule) ? "Gu\u1E47a" : /^[aā][eo]$/.test(rule) ? "V\u1E5Bddhi" : "Sandhi";
      const baseClean = stripEndVowel(a).replace(/\u094D$/, "");
      return { ok: true, result: baseClean + VOWEL_SIGN[joined] + stripStartVowel(b), explanation: `${ruleName} sandhi: ${rule} \u2192 ${joined}` };
    }
    if (endV === "a" && startV !== "a") {
      return { ok: true, result: stripEndVowel(a) + b, explanation: `Elision: final \u0905 dropped before vowel \u2192 ${a} + ${b}` };
    }
  }
  if (a.endsWith("\u0903")) {
    const b0 = b[0];
    if (b0 && CONSONANTS_DEV.includes(b0)) {
      if ("\u0915\u0916\u092A\u092B".includes(b0)) return { ok: true, result: a.slice(0, -1) + "\u0903" + b, explanation: `Visarga stays before ${b0} (surds)` };
      return { ok: true, result: a.slice(0, -1) + "\u094B " + b, explanation: `Visarga \u2192 \u0913 before soft ${b0}` };
    }
    if (startV) {
      return { ok: true, result: a.slice(0, -1) + " " + b, explanation: `Visarga elided before vowel: ${a} + ${b}` };
    }
  }
  if (/[कखगघचछजझटठडढणतथदधनपफबभमयरलवशषसह]्$/.test(a)) {
    const b0 = b[0];
    const finalConsonant = a.slice(-2, -1);
    if (b0 && CONSONANTS_DEV.includes(b0)) {
      const map = {
        "\u091A": ["\u091A\u094D\u091A", "\u0924\u094D + \u091A \u2192 \u091A\u094D\u091A"],
        "\u091B": ["\u091A\u094D\u091B", "\u0924\u094D + \u091B \u2192 \u091A\u094D\u091B"],
        "\u091F": ["\u091F\u094D\u091F", "\u0924\u094D + \u091F \u2192 \u091F\u094D\u091F"],
        "\u0924": ["\u0924\u094D\u0924", "\u0924\u094D + \u0924 \u2192 \u0924\u094D\u0924"],
        "\u0926": ["\u0926\u094D\u0926", "\u0924\u094D + \u0926 \u2192 \u0926\u094D\u0926"],
        "\u0928": ["\u0928\u094D\u0928", "\u0924\u094D + \u0928 \u2192 \u0928\u094D\u0928"],
        "\u0938": ["\u0924\u094D\u0938", "\u0924\u094D + \u0938 \u2192 \u0924\u094D\u0938"]
      };
      if (a.endsWith("\u0924\u094D") && map[b0]) {
        const m = map[b0];
        return { ok: true, result: a.slice(0, -2) + m[0] + b.slice(1), explanation: `Consonant sandhi: ${m[1]}` };
      }
      if (a.endsWith("\u0928\u094D") && (b0 === "\u0915" || b0 === "\u0916")) {
        return { ok: true, result: a.slice(0, -1) + "\u0919\u094D" + b, explanation: `\u0928\u094D + ${b0} \u2192 \u0919\u094D${b0}` };
      }
      // Jash-tva before soft consonants
      if (JASHTVA_MAP[finalConsonant] && "गघजझडढदधबभयरलवह".includes(b0)) {
        const softRepl = JASHTVA_MAP[finalConsonant];
        return { ok: true, result: a.slice(0, -2) + softRepl + "\u094D" + b, explanation: `Ja\u015Btva sandhi: ${finalConsonant}\u094D \u2192 ${softRepl}\u094D before ${b0}` };
      }
      return { ok: true, result: a + b, explanation: `Consonant + ${b0}: final consonant stays (e.g. \u092A\u0943\u0925\u0915\u094D + \u091A = \u092A\u0943\u0925\u0915\u094D\u091A)` };
    }
    if (startV) {
      if (JASHTVA_MAP[finalConsonant]) {
        const softRepl = JASHTVA_MAP[finalConsonant];
        return { ok: true, result: a.slice(0, -2) + softRepl + VOWEL_SIGN[startV] + stripStartVowel(b), explanation: `Ja\u015Btva sandhi: ${finalConsonant}\u094D \u2192 ${softRepl} before vowel` };
      }
      return { ok: true, result: a.slice(0, -1) + VOWEL_SIGN[startV] + stripStartVowel(b), explanation: `Consonant + vowel: vir\u0101ma dropped, vowel attaches (e.g. \u0938\u0924\u094D\u092F\u092E\u094D + \u090F\u0935 = \u0938\u0924\u094D\u092F\u092E\u0947\u0935)` };
    }
  }
  return { ok: false, result: a + " " + b, explanation: "No automatic rule matched \u2014 keep them separate (pada-p\u0101\u1E6Dha)." };
}
function trySplitSandhi(word, pairs) {
  const results = [];
  for (const [a, b] of pairs) {
    const joined = tryJoinSandhi(a, b);
    if (joined.ok && joined.result.replace(/[ ्]/, "") === word.replace(/[ ्]/g, "")) {
      results.push({ ok: true, result: `${a} + ${b}`, explanation: `${a} + ${b} = ${joined.result} (${joined.explanation})` });
    }
  }
  return results;
}
const DHATUS = [
  { root: "\u092D\u0942", iast: "bh\u016B", gana: "\u092D\u094D\u0935\u093E\u0926\u093F", ganaNum: 1, meaning: "to be, become", present: "\u092D\u0935\u0924\u093F" },
  { root: "\u0915\u0943", iast: "k\u1E5B", gana: "\u0924\u0928\u093E\u0926\u093F", ganaNum: 8, meaning: "to do, make", present: "\u0915\u0930\u094B\u0924\u093F" },
  { root: "\u0917\u092E\u094D", iast: "gam", gana: "\u092D\u094D\u0935\u093E\u0926\u093F", ganaNum: 1, meaning: "to go", present: "\u0917\u091A\u094D\u091B\u0924\u093F" },
  { root: "\u092A\u0920\u094D", iast: "pa\u1E6Dh", gana: "\u092D\u094D\u0935\u093E\u0926\u093F", ganaNum: 1, meaning: "to read, recite", present: "\u092A\u0920\u0924\u093F" },
  { root: "\u0932\u093F\u0916\u094D", iast: "likh", gana: "\u092D\u094D\u0935\u093E\u0926\u093F", ganaNum: 1, meaning: "to write", present: "\u0932\u093F\u0916\u0924\u093F" },
  { root: "\u0935\u0926\u094D", iast: "vad", gana: "\u092D\u094D\u0935\u093E\u0926\u093F", ganaNum: 1, meaning: "to speak", present: "\u0935\u0926\u0924\u093F" },
  { root: "\u0907", iast: "i", gana: "\u0905\u0926\u093E\u0926\u093F", ganaNum: 2, meaning: "to go", present: "\u090F\u0924\u093F" },
  { root: "\u0906\u0938\u094D", iast: "\u0101s", gana: "\u0905\u0926\u093E\u0926\u093F", ganaNum: 2, meaning: "to sit, be", present: "\u0906\u0938\u094D\u0924\u0947" },
  { root: "\u0938\u094D\u0925\u093E", iast: "sth\u0101", gana: "\u092D\u094D\u0935\u093E\u0926\u093F", ganaNum: 1, meaning: "to stand, stay", present: "\u0924\u093F\u0937\u094D\u0920\u0924\u093F" },
  { root: "\u0926\u093E", iast: "d\u0101", gana: "\u091C\u0941\u0939\u094B\u0924\u094D\u092F\u093E\u0926\u093F", ganaNum: 3, meaning: "to give", present: "\u0926\u0926\u093E\u0924\u093F" },
  { root: "\u0927\u093E", iast: "dh\u0101", gana: "\u091C\u0941\u0939\u094B\u0924\u094D\u092F\u093E\u0926\u093F", ganaNum: 3, meaning: "to place, hold", present: "\u0926\u0927\u093E\u0924\u093F" },
  { root: "\u091C\u0928\u094D", iast: "jan", gana: "\u0926\u093F\u0935\u093E\u0926\u093F", ganaNum: 4, meaning: "to be born", present: "\u091C\u093E\u092F\u0924\u0947" },
  { root: "\u092E\u0928\u094D", iast: "man", gana: "\u0926\u093F\u0935\u093E\u0926\u093F", ganaNum: 4, meaning: "to think", present: "\u092E\u0928\u094D\u092F\u0924\u0947" },
  { root: "\u0936\u094D\u0930\u0941", iast: "\u015Bru", gana: "\u0938\u094D\u0935\u093E\u0926\u093F", ganaNum: 5, meaning: "to hear", present: "\u0936\u0943\u0923\u094B\u0924\u093F" },
  { root: "\u0938\u0941", iast: "su", gana: "\u0938\u094D\u0935\u093E\u0926\u093F", ganaNum: 5, meaning: "to press (Soma)", present: "\u0938\u0941\u0928\u094B\u0924\u093F" },
  { root: "\u0924\u0928\u094D", iast: "tan", gana: "\u0924\u0928\u093E\u0926\u093F", ganaNum: 8, meaning: "to stretch", present: "\u0924\u0928\u094B\u0924\u093F" },
  { root: "\u0915\u094D\u0930\u0940", iast: "kr\u012B", gana: "\u0915\u094D\u0930\u092F\u093E\u0926\u093F", ganaNum: 9, meaning: "to buy", present: "\u0915\u094D\u0930\u0940\u0923\u093E\u0924\u093F" },
  { root: "\u092A\u0942", iast: "p\u016B", gana: "\u0915\u094D\u0930\u092F\u093E\u0926\u093F", ganaNum: 9, meaning: "to purify", present: "\u092A\u0941\u0928\u093E\u0924\u093F" },
  { root: "\u0935\u091A\u094D", iast: "vac", gana: "\u0905\u0926\u093E\u0926\u093F", ganaNum: 2, meaning: "to speak", present: "\u0935\u0915\u094D\u0924\u093F" },
  { root: "\u0939\u0928\u094D", iast: "han", gana: "\u0905\u0926\u093E\u0926\u093F", ganaNum: 2, meaning: "to strike, kill", present: "\u0939\u0928\u094D\u0924\u093F" },
  { root: "\u091A\u0930\u094D", iast: "car", gana: "\u092D\u094D\u0935\u093E\u0926\u093F", ganaNum: 1, meaning: "to move, wander", present: "\u091A\u0930\u0924\u093F" },
  { root: "\u0928\u092E\u094D", iast: "nam", gana: "\u092D\u094D\u0935\u093E\u0926\u093F", ganaNum: 1, meaning: "to bow", present: "\u0928\u092E\u0924\u093F" },
  { root: "\u091C\u094D\u091E\u093E", iast: "j\xF1\u0101", gana: "\u0915\u094D\u0930\u092F\u093E\u0926\u093F", ganaNum: 9, meaning: "to know", present: "\u091C\u093E\u0928\u093E\u0924\u093F" },
  { root: "\u092A\u093E", iast: "p\u0101", gana: "\u092D\u094D\u0935\u093E\u0926\u093F", ganaNum: 1, meaning: "to drink", present: "\u092A\u093F\u092C\u0924\u093F" },
  { root: "\u0935\u0938\u094D", iast: "vas", gana: "\u092D\u094D\u0935\u093E\u0926\u093F", ganaNum: 1, meaning: "to dwell", present: "\u0935\u0938\u0924\u093F" },
  { root: "\u0930\u0941\u091A\u094D", iast: "ruc", gana: "\u0926\u093F\u0935\u093E\u0926\u093F", ganaNum: 4, meaning: "to shine, please", present: "\u0930\u094B\u091A\u0924\u0947" },
  { root: "\u0935\u0943", iast: "v\u1E5B", gana: "\u092D\u094D\u0935\u093E\u0926\u093F", ganaNum: 1, meaning: "to choose", present: "\u0935\u0943\u0923\u094B\u0924\u093F" },
  { root: "\u0926\u0943\u0936\u094D", iast: "d\u1E5B\u015B", gana: "\u0926\u093F\u0935\u093E\u0926\u093F", ganaNum: 4, meaning: "to see", present: "\u092A\u0936\u094D\u092F\u0924\u093F" },
  { root: "\u0916\u093E\u0926\u094D", iast: "kh\u0101d", gana: "\u092D\u094D\u0935\u093E\u0926\u093F", ganaNum: 1, meaning: "to eat", present: "\u0916\u093E\u0926\u0924\u093F" },
  { root: "\u091C\u093F", iast: "ji", gana: "\u092D\u094D\u0935\u093E\u0926\u093F", ganaNum: 1, meaning: "to conquer", present: "\u091C\u092F\u0924\u093F" },
  { root: "\u0926\u0943", iast: "d\u1E5B", gana: "\u092D\u094D\u0935\u093E\u0926\u093F", ganaNum: 1, meaning: "to regard", present: "\u0926\u0926\u0930\u094D\u0936" },
  { root: "\u092C\u0941\u0927\u094D", iast: "budh", gana: "\u092D\u094D\u0935\u093E\u0926\u093F", ganaNum: 1, meaning: "to wake, know", present: "\u092C\u094B\u0927\u0924\u093F" },
  { root: "\u092D\u091C\u094D", iast: "bhaj", gana: "\u092D\u094D\u0935\u093E\u0926\u093F", ganaNum: 1, meaning: "to share, worship", present: "\u092D\u091C\u0924\u093F" },
  { root: "\u092E\u0943", iast: "m\u1E5B", gana: "\u0926\u093F\u0935\u093E\u0926\u093F", ganaNum: 4, meaning: "to die", present: "\u092E\u094D\u0930\u093F\u092F\u0924\u0947" },
  { root: "\u092F\u0941\u0927\u094D", iast: "yudh", gana: "\u0926\u093F\u0935\u093E\u0926\u093F", ganaNum: 4, meaning: "to fight", present: "\u092F\u0941\u0927\u094D\u092F\u0924\u0947" },
  { root: "\u0935\u093F\u0936\u094D", iast: "vi\u015B", gana: "\u0938\u094D\u0935\u093E\u0926\u093F", ganaNum: 6, meaning: "to enter", present: "\u0935\u093F\u0936\u0924\u093F" },
  { root: "\u0938\u0943", iast: "s\u1E5B", gana: "\u092D\u094D\u0935\u093E\u0926\u093F", ganaNum: 1, meaning: "to flow, run", present: "\u0938\u0930\u0924\u093F" },
  { root: "\u0905\u0938\u094D", iast: "as", gana: "\u0905\u0926\u093E\u0926\u093F", ganaNum: 2, meaning: "to be (copula)", present: "\u0905\u0938\u094D\u0924\u093F" },
  { root: "\u0930\u092E\u094D", iast: "ram", gana: "\u092D\u094D\u0935\u093E\u0926\u093F", ganaNum: 1, meaning: "to delight", present: "\u0930\u092E\u0924\u0947" },
  { root: "\u092A\u094D\u0930\u091A\u094D\u091B\u094D", iast: "pracch", gana: "\u0938\u094D\u0935\u093E\u0926\u093F", ganaNum: 6, meaning: "to ask", present: "\u092A\u0943\u091A\u094D\u091B\u0924\u093F" }
];
function dayOfYear(d = /* @__PURE__ */ new Date()) {
  const start = new Date(d.getFullYear(), 0, 0);
  return Math.floor((d.getTime() - start.getTime()) / 864e5);
}
let cachedWordOfDay = null;
async function wordOfDay() {
  if (cachedWordOfDay) return cachedWordOfDay;
  try {
    const { data } = await supabase.from("dictionary").select("word, meanings, meanings_hi").order("id").limit(200);
    if (data && data.length > 0) {
      const row = data[dayOfYear() % data.length];
      cachedWordOfDay = { word: row.word, meanings: row.meanings || [], meaningsHi: row.meanings_hi || [], iast: toIAST(row.word) };
      return cachedWordOfDay;
    }
  } catch {
    /* Supabase unavailable — fall through to local fallback */
  }
  // Local fallback: pick a word from the Monier-Williams lexicon loaded into client memory
  const mod = await import("../data/monier_core.json");
  const monier = mod.default || mod;
  if (monier && monier.length) {
    const row = monier[dayOfYear() % monier.length];
    cachedWordOfDay = { word: row.word, meanings: row.meanings || [], meaningsHi: row.meanings_hi || [], iast: row.iast || toIAST(row.word) };
    return cachedWordOfDay;
  }
  // Absolute default if nothing else works
  cachedWordOfDay = { word: "ॐ", meanings: ["the sacred syllable"], meaningsHi: ["ॐ"], iast: "om" };
  return cachedWordOfDay;
}
const PHRASES_OF_DAY = [
  { dev: "\u0938\u0924\u094D\u092F\u092E\u0947\u0935 \u091C\u092F\u0924\u0947", iast: "satyameva jayate", meaning: "Truth alone triumphs", meaningHi: "\u0938\u0924\u094D\u092F \u0915\u0940 \u0938\u0926\u093E \u0935\u093F\u091C\u092F \u0939\u094B\u0924\u0940 \u0939\u0948" },
  { dev: "\u0935\u093F\u0926\u094D\u092F\u093E \u0926\u0926\u093E\u0924\u093F \u0935\u093F\u0928\u092F\u092E\u094D", iast: "vidy\u0101 dad\u0101ti vinayam", meaning: "Knowledge gives humility", meaningHi: "\u091C\u094D\u091E\u093E\u0928 \u0935\u093F\u0928\u092F \u0926\u0947\u0924\u093E \u0939\u0948" },
  { dev: "\u0905\u0924\u093F\u0925\u093F \u0926\u0947\u0935\u094B \u092D\u0935", iast: "atithi devo bhava", meaning: "The guest is a god", meaningHi: "\u0905\u0924\u093F\u0925\u093F \u0926\u0947\u0935 \u0915\u0947 \u0938\u092E\u093E\u0928 \u0939\u0948" },
  { dev: "\u0935\u0938\u0941\u0927\u0948\u0935 \u0915\u0941\u091F\u0941\u092E\u094D\u092C\u0915\u092E\u094D", iast: "vasudhaiva ku\u1E6Dumbakam", meaning: "The world is one family", meaningHi: "\u0938\u092E\u094D\u092A\u0942\u0930\u094D\u0923 \u0935\u093F\u0936\u094D\u0935 \u090F\u0915 \u092A\u0930\u093F\u0935\u093E\u0930 \u0939\u0948" },
  { dev: "\u0938\u0930\u094D\u0935\u0947 \u092D\u0935\u0928\u094D\u0924\u0941 \u0938\u0941\u0916\u093F\u0928\u0903", iast: "sarve bhavantu sukhina\u1E25", meaning: "May all be happy", meaningHi: "\u0938\u092D\u0940 \u0938\u0941\u0916\u0940 \u0939\u094B\u0902" },
  { dev: "\u0906 \u0928\u094B \u092D\u0926\u094D\u0930\u093E\u0903 \u0915\u094D\u0930\u0924\u0935\u094B \u092F\u0928\u094D\u0924\u0941 \u0935\u093F\u0936\u094D\u0935\u0924\u0903", iast: "\u0101 no bhadr\u0101\u1E25 kratavo yantu vi\u015Bvata\u1E25", meaning: "Let noble thoughts come from all sides", meaningHi: "\u091A\u093E\u0930\u094B\u0902 \u0913\u0930 \u0938\u0947 \u0936\u094D\u0930\u0947\u0937\u094D\u0920 \u0935\u093F\u091A\u093E\u0930 \u0906\u090F\u0901" },
  { dev: "\u0909\u0926\u094D\u0927\u0930\u0947\u0926\u093E\u0924\u094D\u092E\u0928\u093E\u0924\u094D\u092E\u093E\u0928\u092E\u094D", iast: "uddhared\u0101tman\u0101tm\u0101nam", meaning: "Lift yourself by yourself", meaningHi: "\u0938\u094D\u0935\u092F\u0902 \u0915\u094B \u0938\u094D\u0935\u092F\u0902 \u0939\u0940 \u090A\u092A\u0930 \u0909\u0920\u093E\u090F\u0901" },
  { dev: "\u092F\u094B\u0917\u0903 \u0915\u0930\u094D\u092E\u0938\u0941 \u0915\u094C\u0936\u0932\u092E\u094D", iast: "yoga\u1E25 karmasu kau\u015Balam", meaning: "Yoga is skill in action", meaningHi: "\u092F\u094B\u0917 \u0915\u0930\u094D\u092E \u092E\u0947\u0902 \u0915\u0941\u0936\u0932\u0924\u093E \u0939\u0948" },
  { dev: "\u0938\u093E \u0935\u093F\u0926\u094D\u092F\u093E \u092F\u093E \u0935\u093F\u092E\u0941\u0915\u094D\u0924\u092F\u0947", iast: "s\u0101 vidy\u0101 y\u0101 vimuktaye", meaning: "Knowledge is that which liberates", meaningHi: "\u091C\u094D\u091E\u093E\u0928 \u0935\u0939 \u0939\u0948 \u091C\u094B \u092E\u0941\u0915\u094D\u0924 \u0915\u0930\u0924\u093E \u0939\u0948" },
  { dev: "\u0928\u093E\u0938\u094D\u0924\u093F \u0935\u093F\u0926\u094D\u092F\u093E \u0938\u092E\u0902 \u091A\u0915\u094D\u0937\u0941\u0903", iast: "n\u0101sti vidy\u0101 sama\u1E43 cak\u1E63u\u1E25", meaning: "There is no eye like knowledge", meaningHi: "\u091C\u094D\u091E\u093E\u0928 \u0915\u0947 \u0938\u092E\u093E\u0928 \u0915\u094B\u0908 \u0906\u0901\u0916 \u0928\u0939\u0940\u0902" },
  { dev: "\u0927\u0930\u094D\u092E\u094B \u0930\u0915\u094D\u0937\u0924\u093F \u0930\u0915\u094D\u0937\u093F\u0924\u0903", iast: "dharmo rak\u1E63ati rak\u1E63ita\u1E25", meaning: "Dharma protects the protector", meaningHi: "\u0927\u0930\u094D\u092E \u0930\u0915\u094D\u0937\u0915 \u0915\u0940 \u0930\u0915\u094D\u0937\u093E \u0915\u0930\u0924\u093E \u0939\u0948" },
  { dev: "\u0938\u0902\u0938\u094D\u0915\u0943\u0924\u0902 \u0926\u0947\u0935\u092D\u093E\u0937\u093E", iast: "sa\u1E43sk\u1E5Bta\u1E43 devabh\u0101\u1E63\u0101", meaning: "Sanskrit is the language of the gods", meaningHi: "\u0938\u0902\u0938\u094D\u0915\u0943\u0924 \u0926\u0947\u0935\u094B\u0902 \u0915\u0940 \u092D\u093E\u0937\u093E \u0939\u0948" }
];
const VERSES_OF_DAY = [
  { dev: "\u0915\u0930\u094D\u092E\u0923\u094D\u092F\u0947\u0935\u093E\u0927\u093F\u0915\u093E\u0930\u0938\u094D\u0924\u0947 \u092E\u093E \u092B\u0932\u0947\u0937\u0941 \u0915\u0926\u093E\u091A\u0928\u0964", iast: "karma\u1E47yev\u0101dhik\u0101raste m\u0101 phale\u1E63u kad\u0101cana |", translation: "Your right is to action alone, never to its fruits.", translationHi: "\u0906\u092A\u0915\u093E \u0905\u0927\u093F\u0915\u093E\u0930 \u0915\u0947\u0935\u0932 \u0915\u0930\u094D\u092E \u092E\u0947\u0902 \u0939\u0948, \u092B\u0932\u094B\u0902 \u092E\u0947\u0902 \u0915\u092D\u0940 \u0928\u0939\u0940\u0902\u0964", source: "Bhagavad G\u012Bt\u0101 2.47", sourceHi: "\u0936\u094D\u0930\u0940\u092E\u0926\u094D\u092D\u0917\u0935\u0926\u094D\u0917\u0940\u0924\u093E 2.47" },
  { dev: "\u0909\u0926\u094D\u092F\u092E\u0947\u0928 \u0939\u093F \u0938\u093F\u0927\u094D\u092F\u0928\u094D\u0924\u093F \u0915\u093E\u0930\u094D\u092F\u093E\u0923\u093F \u0928 \u092E\u0928\u094B\u0930\u0925\u0948\u0903\u0964", iast: "udyamena hi sidhyanti k\u0101ry\u0101\u1E47i na manorathai\u1E25 |", translation: "Tasks succeed by effort, not by wishes.", translationHi: "\u0915\u093E\u0930\u094D\u092F \u092A\u0930\u093F\u0936\u094D\u0930\u092E \u0938\u0947 \u0938\u093F\u0926\u094D\u0927 \u0939\u094B\u0924\u0947 \u0939\u0948\u0902, \u0915\u0947\u0935\u0932 \u0907\u091A\u094D\u091B\u093E \u0938\u0947 \u0928\u0939\u0940\u0902\u0964", source: "Pa\xF1catantra", sourceHi: "\u092A\u0902\u091A\u0924\u0902\u0924\u094D\u0930" },
  { dev: "\u092E\u093E\u0924\u0943\u0935\u0924\u094D \u092A\u0930\u0926\u093E\u0930\u0947\u0937\u0941 \u092A\u0930\u0926\u094D\u0930\u0935\u094D\u092F\u0947\u0937\u0941 \u0932\u094B\u0937\u094D\u091F\u0935\u0924\u094D\u0964", iast: "m\u0101t\u1E5Bvat parad\u0101re\u1E63u paradravye\u1E63u lo\u1E63\u1E6Davat |", translation: "Treat others' wives as mothers, others' wealth as clods of earth.", translationHi: "\u092A\u0930\u0938\u094D\u0924\u094D\u0930\u0940 \u0915\u094B \u092E\u093E\u0924\u093E \u0915\u0947 \u0938\u092E\u093E\u0928 \u0914\u0930 \u092A\u0930\u093E\u092F\u0947 \u0927\u0928 \u0915\u094B \u092E\u093F\u091F\u094D\u091F\u0940 \u0915\u0947 \u0922\u0947\u0932\u0947 \u0915\u0947 \u0938\u092E\u093E\u0928 \u0938\u092E\u091D\u094B\u0964", source: "C\u0101\u1E47akya N\u012Bti", sourceHi: "\u091A\u093E\u0923\u0915\u094D\u092F \u0928\u0940\u0924\u093F" },
  { dev: "\u0905\u0939\u093F\u0902\u0938\u093E \u092A\u0930\u092E\u094B \u0927\u0930\u094D\u092E\u0903", iast: "ahi\u1E43s\u0101 paramo dharma\u1E25", translation: "Non-violence is the highest dharma.", translationHi: "\u0905\u0939\u093F\u0902\u0938\u093E \u0938\u092C\u0938\u0947 \u092C\u0921\u093C\u093E \u0927\u0930\u094D\u092E \u0939\u0948\u0964", source: "Mah\u0101bh\u0101rata", sourceHi: "\u092E\u0939\u093E\u092D\u093E\u0930\u0924" },
  { dev: "\u0938\u0924\u094D\u092F\u0902 \u0936\u093F\u0935\u0902 \u0938\u0941\u0928\u094D\u0926\u0930\u092E\u094D", iast: "satya\u1E43 \u015Biva\u1E43 sundaram", translation: "Truth, goodness, beauty.", translationHi: "\u0938\u0924\u094D\u092F, \u0936\u093F\u0935, \u0938\u094C\u0928\u094D\u0926\u0930\u094D\u092F\u0964", source: "Upani\u1E63adic motto", sourceHi: "\u0909\u092A\u0928\u093F\u0937\u0926\u094D" },
  { dev: "\u0906\u0924\u094D\u092E\u093E\u0928\u0902 \u0935\u093F\u0926\u094D\u0927\u093F", iast: "\u0101tm\u0101na\u1E43 viddhi", translation: "Know the Self.", translationHi: "\u0906\u0924\u094D\u092E\u093E \u0915\u094B \u091C\u093E\u0928\u094B\u0964", source: "Ka\u1E6Dha Upani\u1E63ad", sourceHi: "\u0915\u0920\u094B\u092A\u0928\u093F\u0937\u0926\u094D" },
  { dev: "\u0935\u0938\u0941\u0927\u0948\u0935 \u0915\u0941\u091F\u0941\u092E\u094D\u092C\u0915\u092E\u094D", iast: "vasudhaiva ku\u1E6Dumbakam", translation: "The whole world is one family.", translationHi: "\u0938\u092E\u094D\u092A\u0942\u0930\u094D\u0923 \u0935\u093F\u0936\u094D\u0935 \u090F\u0915 \u092A\u0930\u093F\u0935\u093E\u0930 \u0939\u0948\u0964", source: "Hitopade\u015Ba", sourceHi: "\u0939\u093F\u0924\u094B\u092A\u0926\u0947\u0936" },
  { dev: "\u0936\u094D\u0930\u0926\u094D\u0927\u093E\u0935\u093E\u0928\u094D \u0932\u092D\u0924\u0947 \u091C\u094D\u091E\u093E\u0928\u092E\u094D", iast: "\u015Braddh\u0101v\u0101n labhate j\xF1\u0101nam", translation: "The faithful obtain knowledge.", translationHi: "\u0936\u094D\u0930\u0926\u094D\u0927\u093E\u0935\u093E\u0928 \u0935\u094D\u092F\u0915\u094D\u0924\u093F \u091C\u094D\u091E\u093E\u0928 \u092A\u094D\u0930\u093E\u092A\u094D\u0924 \u0915\u0930\u0924\u093E \u0939\u0948\u0964", source: "Bhagavad G\u012Bt\u0101 4.39", sourceHi: "\u0936\u094D\u0930\u0940\u092E\u0926\u094D\u092D\u0917\u0935\u0926\u094D\u0917\u0940\u0924\u093E 4.39" },
  { dev: "\u092A\u0930\u094B\u092A\u0915\u093E\u0930\u093E\u092F \u092A\u0941\u0923\u094D\u092F\u093E\u092F \u092A\u093E\u092A\u093E\u092F \u092A\u0930\u092A\u0940\u0921\u0928\u092E\u094D", iast: "paropak\u0101r\u0101ya pu\u1E47y\u0101ya p\u0101p\u0101ya parap\u012B\u1E0Danam", translation: "For helping others is merit; harming others is sin.", translationHi: "\u0926\u0942\u0938\u0930\u094B\u0902 \u0915\u0940 \u0938\u0939\u093E\u092F\u0924\u093E \u0915\u0930\u0928\u093E \u092A\u0941\u0923\u094D\u092F \u0939\u0948, \u0926\u0942\u0938\u0930\u094B\u0902 \u0915\u094B \u0915\u0937\u094D\u091F \u0926\u0947\u0928\u093E \u092A\u093E\u092A\u0964", source: "Vidy\u0101ra\u1E47ya", sourceHi: "\u0935\u093F\u0926\u094D\u092F\u093E\u0930\u0923\u094D\u092F" },
  { dev: "\u0938\u0902\u0917\u091A\u094D\u091B\u0927\u094D\u0935\u0902 \u0938\u0902\u0935\u0926\u0927\u094D\u0935\u0902", iast: "sa\u1E43gacchadhva\u1E43 sa\u1E43vadadhva\u1E43", translation: "Walk together, speak together.", translationHi: "\u090F\u0915 \u0938\u093E\u0925 \u091A\u0932\u094B, \u090F\u0915 \u0938\u093E\u0925 \u092C\u094B\u0932\u094B\u0964", source: "\u1E5Agveda 10.191", sourceHi: "\u090B\u0917\u094D\u0935\u0947\u0926 10.191" }
];
function phraseOfDay() {
  return PHRASES_OF_DAY[dayOfYear() % PHRASES_OF_DAY.length];
}
function verseOfDay() {
  return VERSES_OF_DAY[dayOfYear() % VERSES_OF_DAY.length];
}
const DAILY_CHALLENGE_QUESTIONS = [
  { prompt: "\u0930\u093E\u092E\u0903 \u0915\u093E \u0905\u0930\u094D\u0925 \u0939\u0948?", promptHi: "\u0930\u093E\u092E\u0903 \u0915\u093E \u0905\u0930\u094D\u0925 \u0915\u094D\u092F\u093E \u0939\u0948?", options: ["God", "R\u0101ma (the hero)", "Sun", "Forest"], optionsHi: ["\u0926\u0947\u0935\u0924\u093E", "\u0930\u093E\u092E (\u0935\u0940\u0930)", "\u0938\u0942\u0930\u094D\u092F", "\u0935\u0928"], correct: 1, explanation: "\u0930\u093E\u092E\u0903 = R\u0101ma, hero of the R\u0101m\u0101ya\u1E47a.", explanationHi: "\u0930\u093E\u092E\u0903 = \u0930\u093E\u092E, \u0930\u093E\u092E\u093E\u092F\u0923 \u0915\u0947 \u0928\u093E\u092F\u0915\u0964" },
  { prompt: "\u0938\u0940\u0924\u093E \u0915\u093E \u0905\u0930\u094D\u0925 \u0939\u0948?", promptHi: "\u0938\u0940\u0924\u093E \u0915\u093E \u0905\u0930\u094D\u0925 \u0915\u094D\u092F\u093E \u0939\u0948?", options: ["Furrow", "River", "Daughter", "Moon"], optionsHi: ["\u0939\u0932 \u0915\u0940 \u0928\u093E\u0932\u0940", "\u0928\u0926\u0940", "\u092A\u0941\u0924\u094D\u0930\u0940", "\u091A\u0928\u094D\u0926\u094D\u0930\u092E\u093E"], correct: 0, explanation: "\u0938\u0940\u0924\u093E = furrow; S\u012Bt\u0101, consort of R\u0101ma.", explanationHi: "\u0938\u0940\u0924\u093E = \u0939\u0932 \u0915\u0940 \u0928\u093E\u0932\u0940; \u0938\u0940\u0924\u093E, \u0930\u093E\u092E \u0915\u0940 \u092A\u0924\u094D\u0928\u0940\u0964" },
  { prompt: '"I am a student" in Sanskrit?', promptHi: '\u0938\u0902\u0938\u094D\u0915\u0943\u0924 \u092E\u0947\u0902 "\u092E\u0948\u0902 \u091B\u093E\u0924\u094D\u0930 \u0939\u0942\u0901" \u0915\u0948\u0938\u0947 \u0915\u0939\u0924\u0947 \u0939\u0948\u0902?', options: ["\u0905\u0939\u0902 \u0917\u091A\u094D\u091B\u093E\u092E\u093F", "\u0905\u0939\u0902 \u091B\u093E\u0924\u094D\u0930\u0903", "\u0924\u094D\u0935\u0902 \u0915\u0941\u0924\u094D\u0930", "\u092D\u0935\u0924\u093F \u0928\u093E\u092E"], optionsHi: ["\u0905\u0939\u0902 \u0917\u091A\u094D\u091B\u093E\u092E\u093F", "\u0905\u0939\u0902 \u091B\u093E\u0924\u094D\u0930\u0903", "\u0924\u094D\u0935\u0902 \u0915\u0941\u0924\u094D\u0930", "\u092D\u0935\u0924\u093F \u0928\u093E\u092E"], correct: 1, explanation: "\u0905\u0939\u0902 \u091B\u093E\u0924\u094D\u0930\u0903 = I am a student.", explanationHi: "\u0905\u0939\u0902 \u091B\u093E\u0924\u094D\u0930\u0903 = \u092E\u0948\u0902 \u091B\u093E\u0924\u094D\u0930 \u0939\u0942\u0901\u0964" },
  { prompt: "\u0935\u093F\u0926\u094D\u092F\u093E \u0926\u0926\u093E\u0924\u093F \u0935\u093F\u0928\u092F\u092E\u094D \u2014 \u0935\u093F\u0926\u094D\u092F\u093E means?", promptHi: "\u0935\u093F\u0926\u094D\u092F\u093E \u0926\u0926\u093E\u0924\u093F \u0935\u093F\u0928\u092F\u092E\u094D \u2014 \u0935\u093F\u0926\u094D\u092F\u093E \u0915\u093E \u0905\u0930\u094D\u0925?", options: ["Money", "Knowledge", "Food", "Time"], optionsHi: ["\u0927\u0928", "\u091C\u094D\u091E\u093E\u0928", "\u092D\u094B\u091C\u0928", "\u0938\u092E\u092F"], correct: 1, explanation: '\u0935\u093F\u0926\u094D\u092F\u093E = knowledge; "Knowledge gives humility."', explanationHi: '\u0935\u093F\u0926\u094D\u092F\u093E = \u091C\u094D\u091E\u093E\u0928; "\u091C\u094D\u091E\u093E\u0928 \u0935\u093F\u0928\u092F \u0926\u0947\u0924\u093E \u0939\u0948\u0964"' },
  { prompt: "\u0926\u0947\u0935 + \u0907\u0928\u094D\u0926\u094D\u0930\u0903 = ?", promptHi: "\u0926\u0947\u0935 + \u0907\u0928\u094D\u0926\u094D\u0930\u0903 = ?", options: ["\u0926\u0947\u0935\u0947\u0928\u094D\u0926\u094D\u0930\u0903", "\u0926\u0947\u0935\u0940\u0928\u094D\u0926\u094D\u0930\u0903", "\u0926\u0935\u0947\u0928\u094D\u0926\u094D\u0930\u0903", "\u0926\u0947\u0935\u0948\u0928\u094D\u0926\u094D\u0930\u0903"], optionsHi: ["\u0926\u0947\u0935\u0947\u0928\u094D\u0926\u094D\u0930\u0903", "\u0926\u0947\u0935\u0940\u0928\u094D\u0926\u094D\u0930\u0903", "\u0926\u0935\u0947\u0928\u094D\u0926\u094D\u0930\u0903", "\u0926\u0947\u0935\u0948\u0928\u094D\u0926\u094D\u0930\u0903"], correct: 0, explanation: "Gu\u1E47a sandhi: \u0905 + \u0907 \u2192 \u090F = \u0926\u0947\u0935\u0947\u0928\u094D\u0926\u094D\u0930\u0903.", explanationHi: "\u0917\u0941\u0923 \u0938\u0902\u0927\u093F: \u0905 + \u0907 \u2192 \u090F = \u0926\u0947\u0935\u0947\u0928\u094D\u0926\u094D\u0930\u0903\u0964" },
  { prompt: "\u0938\u0924\u094D\u092F\u092E\u0947\u0935 \u091C\u092F\u0924\u0947 means?", promptHi: "\u0938\u0924\u094D\u092F\u092E\u0947\u0935 \u091C\u092F\u0924\u0947 \u0915\u093E \u0905\u0930\u094D\u0925?", options: ["Truth alone triumphs", "Peace everywhere", "Work is worship", "Om shanti"], optionsHi: ["\u0938\u0924\u094D\u092F \u0915\u0940 \u0938\u0926\u093E \u0935\u093F\u091C\u092F \u0939\u094B", "\u0938\u0930\u094D\u0935\u0924\u094D\u0930 \u0936\u093E\u0902\u0924\u093F", "\u0915\u0930\u094D\u092E \u0939\u0940 \u092A\u0942\u091C\u093E \u0939\u0948", "\u0950 \u0936\u093E\u0928\u094D\u0924\u093F"], correct: 0, explanation: '\u0938\u0924\u094D\u092F\u092E\u094D + \u090F\u0935 = \u0938\u0924\u094D\u092F\u092E\u0947\u0935; "Truth alone triumphs."', explanationHi: '\u0938\u0924\u094D\u092F\u092E\u094D + \u090F\u0935 = \u0938\u0924\u094D\u092F\u092E\u0947\u0935; "\u0938\u0924\u094D\u092F \u0915\u0940 \u0938\u0926\u093E \u0935\u093F\u091C\u092F \u0939\u094B\u0964"' },
  { prompt: '"to go" \u2014 which dh\u0101tu?', promptHi: '"\u091C\u093E\u0928\u093E" \u2014 \u0915\u094C\u0928 \u0938\u0940 \u0927\u093E\u0924\u0941?', options: ["\u0915\u0943", "\u0917\u092E\u094D", "\u092D\u0942", "\u092A\u0920\u094D"], optionsHi: ["\u0915\u0943", "\u0917\u092E\u094D", "\u092D\u0942", "\u092A\u0920\u094D"], correct: 1, explanation: "\u0917\u092E\u094D (gam) = to go \u2192 \u0917\u091A\u094D\u091B\u0924\u093F.", explanationHi: "\u0917\u092E\u094D (gam) = \u091C\u093E\u0928\u093E \u2192 \u0917\u091A\u094D\u091B\u0924\u093F\u0964" },
  { prompt: "\u0927\u0928\u094D\u092F\u0935\u093E\u0926\u0903 means?", promptHi: "\u0927\u0928\u094D\u092F\u0935\u093E\u0926\u0903 \u0915\u093E \u0905\u0930\u094D\u0925?", options: ["Goodbye", "Thank you", "Welcome", "Sorry"], optionsHi: ["\u0905\u0932\u0935\u093F\u0926\u093E", "\u0927\u0928\u094D\u092F\u0935\u093E\u0926", "\u0938\u094D\u0935\u093E\u0917\u0924", "\u0915\u094D\u0937\u092E\u093E"], correct: 1, explanation: "\u0927\u0928\u094D\u092F\u0935\u093E\u0926\u0903 = thank you.", explanationHi: "\u0927\u0928\u094D\u092F\u0935\u093E\u0926\u0903 = \u0927\u0928\u094D\u092F\u0935\u093E\u0926\u0964" },
  { prompt: "Who wrote the R\u0101m\u0101ya\u1E47a?", promptHi: "\u0930\u093E\u092E\u093E\u092F\u0923 \u0915\u093F\u0938\u0928\u0947 \u0932\u093F\u0916\u0940?", options: ["Vy\u0101sa", "V\u0101lm\u012Bki", "K\u0101lid\u0101sa", "Bharata"], optionsHi: ["\u0935\u094D\u092F\u093E\u0938", "\u0935\u093E\u0932\u094D\u092E\u0940\u0915\u093F", "\u0915\u093E\u0932\u093F\u0926\u093E\u0938", "\u092D\u0930\u0924"], correct: 1, explanation: "V\u0101lm\u012Bki composed the R\u0101m\u0101ya\u1E47a, the \u0101di-k\u0101vya.", explanationHi: "\u0935\u093E\u0932\u094D\u092E\u0940\u0915\u093F \u0928\u0947 \u0930\u093E\u092E\u093E\u092F\u0923 \u0915\u0940 \u0930\u091A\u0928\u093E \u0915\u0940, \u091C\u094B \u0906\u0926\u093F-\u0915\u093E\u0935\u094D\u092F \u0939\u0948\u0964" },
  { prompt: "\u0928\u092E\u0938\u094D\u0924\u0947 is used to?", promptHi: "\u0928\u092E\u0938\u094D\u0924\u0947 \u0915\u093E \u092A\u094D\u0930\u092F\u094B\u0917 \u0915\u093F\u0938\u0932\u093F\u090F \u0939\u094B\u0924\u093E \u0939\u0948?", options: ["Say goodbye only", "Greet with respect", "Ask a question", "Express anger"], optionsHi: ["\u0915\u0947\u0935\u0932 \u0935\u093F\u0926\u093E\u0908", "\u0938\u092E\u094D\u092E\u093E\u0928 \u0938\u0947 \u0905\u092D\u093F\u0935\u093E\u0926\u0928", "\u092A\u094D\u0930\u0936\u094D\u0928 \u092A\u0942\u091B\u0928\u093E", "\u0915\u094D\u0930\u094B\u091C\u093C \u0935\u094D\u092F\u0915\u094D\u0924 \u0915\u0930\u0928\u093E"], correct: 1, explanation: '\u0928\u092E\u0938\u094D\u0924\u0947 = a respectful greeting ("I bow to you").', explanationHi: '\u0928\u092E\u0938\u094D\u0924\u0947 = \u0938\u092E\u094D\u092E\u093E\u0928\u092A\u0942\u0930\u094D\u0935\u0915 \u0905\u092D\u093F\u0935\u093E\u0926\u0928 ("\u092E\u0948\u0902 \u0906\u092A\u0915\u094B \u0928\u092E\u0928 \u0915\u0930\u0924\u093E \u0939\u0942\u0901")\u0964' },
  { prompt: "The G\u012Bt\u0101 is part of which epic?", promptHi: "\u0917\u0940\u0924\u093E \u0915\u093F\u0938 \u092E\u0939\u093E\u0915\u093E\u0935\u094D\u092F \u0915\u093E \u092D\u093E\u0917 \u0939\u0948?", options: ["R\u0101m\u0101ya\u1E47a", "Mah\u0101bh\u0101rata", "Pur\u0101\u1E47as", "Vedas"], optionsHi: ["\u0930\u093E\u092E\u093E\u092F\u0923", "\u092E\u0939\u093E\u092D\u093E\u0930\u0924", "\u092A\u0941\u0930\u093E\u0923", "\u0935\u0947\u0926"], correct: 1, explanation: "The Bhagavad G\u012Bt\u0101 is in the Bh\u012B\u1E63ma Parva of the Mah\u0101bh\u0101rata.", explanationHi: "\u092D\u0917\u0935\u0926\u094D\u0917\u0940\u0924\u093E \u092E\u0939\u093E\u092D\u093E\u0930\u0924 \u0915\u0947 \u092D\u0940\u0937\u094D\u092E \u092A\u0930\u094D\u0935 \u092E\u0947\u0902 \u0939\u0948\u0964" },
  { prompt: "What is \u0926\u0940\u0930\u094D\u0918 sandhi?", promptHi: "\u0926\u0940\u0930\u094D\u0918 \u0938\u0902\u0927\u093F \u0915\u094D\u092F\u093E \u0939\u0948?", options: ["Same vowels double", "Vowel disappears", "Consonant changes", "No change"], optionsHi: ["\u090F\u0915 \u0939\u0940 \u0938\u094D\u0935\u0930 \u0926\u094B\u0939\u0930\u093E\u0924\u093E \u0939\u0948", "\u0938\u094D\u0935\u0930 \u0932\u0941\u092A\u094D\u0924 \u0939\u094B \u091C\u093E\u0924\u093E \u0939\u0948", "\u0935\u094D\u092F\u0902\u091C\u0928 \u092C\u0926\u0932\u0924\u093E \u0939\u0948", "\u0915\u094B\u0908 \u092A\u0930\u093F\u0935\u0930\u094D\u0924\u0928 \u0928\u0939\u0940\u0902"], correct: 0, explanation: "D\u012Brgha: \u0905 + \u0905 \u2192 \u0906 (same vowel lengthens).", explanationHi: "\u0926\u0940\u0930\u094D\u0918: \u0905 + \u0905 \u2192 \u0906 (\u090F\u0915 \u0939\u0940 \u0938\u094D\u0935\u0930 \u0932\u0902\u092C\u093E \u0939\u094B\u0924\u093E \u0939\u0948)\u0964" },
  { prompt: '"Where are you going?" in Sanskrit?', promptHi: '\u0938\u0902\u0938\u094D\u0915\u0943\u0924 \u092E\u0947\u0902 "\u0924\u0941\u092E \u0915\u0939\u093E\u0901 \u091C\u093E \u0930\u0939\u0947 \u0939\u094B?" \u0915\u0948\u0938\u0947 \u0915\u0939\u0924\u0947 \u0939\u0948\u0902?', options: ["\u0924\u094D\u0935\u0902 \u0915\u0941\u0924\u094D\u0930 \u0917\u091A\u094D\u091B\u0938\u093F", "\u0905\u0939\u0902 \u0907\u0939 \u0924\u093F\u0937\u094D\u0920\u093E\u092E\u093F", "\u0924\u0935 \u0928\u093E\u092E \u0915\u093F\u092E\u094D", "\u0907\u0926\u0902 \u092A\u0941\u0938\u094D\u0924\u0915\u092E\u094D"], optionsHi: ["\u0924\u094D\u0935\u0902 \u0915\u0941\u0924\u094D\u0930 \u0917\u091A\u094D\u091B\u0938\u093F", "\u0905\u0939\u0902 \u0907\u0939 \u0924\u093F\u0937\u094D\u0920\u093E\u092E\u093F", "\u0924\u0935 \u0928\u093E\u092E \u0915\u093F\u092E\u094D", "\u0907\u0926\u0902 \u092A\u0941\u0938\u094D\u0924\u0915\u092E\u094D"], correct: 0, explanation: "\u0924\u094D\u0935\u0902 \u0915\u0941\u0924\u094D\u0930 \u0917\u091A\u094D\u091B\u0938\u093F = Where are you going?", explanationHi: "\u0924\u094D\u0935\u0902 \u0915\u0941\u0924\u094D\u0930 \u0917\u091A\u094D\u091B\u0938\u093F = \u0924\u0941\u092E \u0915\u0939\u093E\u0901 \u091C\u093E \u0930\u0939\u0947 \u0939\u094B?" },
  { prompt: "\u0917\u0941\u0930\u0941 means?", promptHi: "\u0917\u0941\u0930\u0941 \u0915\u093E \u0905\u0930\u094D\u0925?", options: ["Student", "Teacher", "Parent", "Friend"], optionsHi: ["\u091B\u093E\u0924\u094D\u0930", "\u0936\u093F\u0915\u094D\u0937\u0915", "\u0905\u092D\u093F\u092D\u093E\u0935\u0915", "\u092E\u093F\u0924\u094D\u0930"], correct: 1, explanation: "\u0917\u0941\u0930\u0941 = teacher (lit. heavy with knowledge).", explanationHi: "\u0917\u0941\u0930\u0941 = \u0936\u093F\u0915\u094D\u0937\u0915 (\u0936\u092C\u094D\u0926\u0936\u0903 \u091C\u094D\u091E\u093E\u0928 \u0938\u0947 \u092D\u093E\u0930\u0940)\u0964" },
  { prompt: "\u0938\u094D\u0935\u093E\u0917\u0924\u092E\u094D means?", promptHi: "\u0938\u094D\u0935\u093E\u0917\u0924\u092E\u094D \u0915\u093E \u0905\u0930\u094D\u0925?", options: ["Farewell", "Welcome", "Thanks", "Blessing"], optionsHi: ["\u0935\u093F\u0926\u093E\u0908", "\u0938\u094D\u0935\u093E\u0917\u0924", "\u0927\u0928\u094D\u092F\u0935\u093E\u0926", "\u0906\u0936\u0940\u0930\u094D\u0935\u093E\u0926"], correct: 1, explanation: "\u0938\u094D\u0935\u093E\u0917\u0924\u092E\u094D = welcome.", explanationHi: "\u0938\u094D\u0935\u093E\u0917\u0924\u092E\u094D = \u0938\u094D\u0935\u093E\u0917\u0924 \u0939\u0948\u0964" }
];
async function searchAll(q, limit = 16) {
  const query = (q || "").trim();
  if (!query) return [];
  const qLower = query.toLowerCase();
  const devQuery = toDevanagari(query);
  const iastQuery = toIAST(query).toLowerCase();

  const results = [];
  const seen = new Set();

  // 1. Lessons
  for (const l of localLessons) {
    const titleLower = (l.title || "").toLowerCase();
    const subLower = (l.subtitle || "").toLowerCase();
    if (
      titleLower.includes(qLower) ||
      subLower.includes(qLower) ||
      (devQuery && (l.title || "").includes(devQuery)) ||
      (iastQuery && titleLower.includes(iastQuery))
    ) {
      results.push({
        kind: "lesson",
        id: l.id,
        title: l.title,
        sub: l.subtitle || `Level ${l.level} · ${l.track || "Sanskrit"} Lesson`,
        subHi: `स्तर ${l.level} · पाठ`
      });
      if (results.filter(r => r.kind === "lesson").length >= 3) break;
    }
  }

  // 2. Classical Texts & Books
  for (const b of localBooks) {
    const titleLower = (b.title || "").toLowerCase();
    const titleSa = b.titleSanskrit || "";
    const authorLower = (b.author || "").toLowerCase();
    if (
      titleLower.includes(qLower) ||
      titleSa.includes(query) ||
      (devQuery && titleSa.includes(devQuery)) ||
      authorLower.includes(qLower) ||
      (b.desc && b.desc.toLowerCase().includes(qLower))
    ) {
      results.push({
        kind: "text",
        id: b.id,
        title: b.titleSanskrit ? `${b.title} (${b.titleSanskrit})` : b.title,
        sub: b.author ? `${b.author} · ${b.category || "Classical Text"}` : (b.desc?.slice(0, 75) || "Classical Sanskrit Work"),
        subHi: b.titleSanskrit || "संस्कृत ग्रन्थः"
      });
      if (results.filter(r => r.kind === "text").length >= 3) break;
    }
  }

  // 3. Sacred Shlokas & Verses
  for (const s of SHLOKAS) {
    const dev = s.dev || "";
    const iast = (s.iast || "").toLowerCase();
    const trans = (s.translation || "").toLowerCase();
    const src = (s.source || "").toLowerCase();
    if (
      dev.includes(query) ||
      (devQuery && dev.includes(devQuery)) ||
      iast.includes(qLower) ||
      iast.includes(iastQuery) ||
      trans.includes(qLower) ||
      src.includes(qLower)
    ) {
      const firstLine = dev.split("।")[0]?.trim() || dev.slice(0, 32);
      results.push({
        kind: "shloka",
        id: s.id,
        title: firstLine,
        sub: `${s.source} — ${s.translation.slice(0, 70)}…`,
        subHi: s.translationHi ? `${s.source} — ${s.translationHi.slice(0, 70)}…` : void 0,
        extra: s.source
      });
      if (results.filter(r => r.kind === "shloka").length >= 3) break;
    }
  }

  // 4. Dhātu Verbal Roots
  for (const dh of LOCAL_DHATUS) {
    const root = dh.root || "";
    const iast = (dh.iast || "").toLowerCase();
    const meaning = (dh.meaning || "").toLowerCase();
    if (
      root.includes(query) ||
      (devQuery && root.includes(devQuery)) ||
      iast.includes(qLower) ||
      meaning.includes(qLower)
    ) {
      results.push({
        kind: "dhatu",
        id: dh.root,
        title: `${dh.root} (${dh.iast})`,
        sub: `Root: ${dh.meaning} · Gana: ${dh.gana || ""}`,
        subHi: `धातु: ${dh.meaning}`,
        extra: "धातु"
      });
      if (results.filter(r => r.kind === "dhatu").length >= 2) break;
    }
  }

  // 5. Concepts
  for (const c of LOCAL_CONCEPTS) {
    const sa = c.sa || "";
    const en = (c.en || "").toLowerCase();
    const def = (c.def || "").toLowerCase();
    if (
      sa.includes(query) ||
      (devQuery && sa.includes(devQuery)) ||
      en.includes(qLower) ||
      def.includes(qLower)
    ) {
      results.push({
        kind: "concept",
        id: c.en,
        title: `${c.sa} (${c.en})`,
        sub: c.def || "Sanskrit Concept",
        subHi: c.defHi || c.sa
      });
      if (results.filter(r => r.kind === "concept").length >= 2) break;
    }
  }

  // 6. Monier-Williams Sanskrit Dictionary
  try {
    const monier = await getMonierCore();
    if (monier && monier.length) {
      const scoredDict = [];
      for (let i = 0; i < monier.length; i++) {
        const entry = monier[i];
        const word = entry.word || "";
        const iast = (entry.iast || "").toLowerCase();
        let score = 0;

        if (word === query || (devQuery && word === devQuery) || iast === qLower || iast === iastQuery) {
          score = 100;
        } else if (word.startsWith(query) || (devQuery && word.startsWith(devQuery)) || iast.startsWith(qLower) || iast.startsWith(iastQuery)) {
          score = 80;
        } else if (word.includes(query) || (devQuery && word.includes(devQuery)) || iast.includes(qLower)) {
          score = 60;
        } else if (entry.meanings?.some(m => m.toLowerCase() === qLower)) {
          score = 50;
        } else if (entry.meanings?.some(m => m.toLowerCase().includes(qLower))) {
          score = 40;
        } else if (entry.raw_def && entry.raw_def.toLowerCase().includes(qLower)) {
          score = 25;
        }

        if (score > 0) {
          scoredDict.push({ entry, score });
          if (scoredDict.length >= 60) break;
        }
      }

      scoredDict.sort((a, b) => b.score - a.score || a.entry.word.length - b.entry.word.length);

      for (const { entry } of scoredDict.slice(0, 8)) {
        if (!seen.has(entry.word)) {
          seen.add(entry.word);
          results.push({
            kind: "dictionary",
            id: entry.word,
            title: entry.word,
            sub: (entry.meanings && entry.meanings.length ? entry.meanings : [entry.raw_def]).filter(Boolean).slice(0, 2).join(" · "),
            subHi: (entry.meanings_hi || []).slice(0, 2).join(" · ") || void 0,
            extra: entry.iast || toIAST(entry.word)
          });
        }
      }
    }
  } catch (err) {
    console.warn("Local Monier search fallback error:", err);
  }

  // 7. Optional Supabase remote queries if connected
  if (import.meta.env?.VITE_SUPABASE_URL) {
    try {
      const [dictR, lessonsR] = await Promise.all([
        supabase.from("dictionary").select("word, meanings, meanings_hi").ilike("word", `%${query}%`).limit(3),
        supabase.from("lessons").select("id, title, level").ilike("title", `%${query}%`).limit(2)
      ]);
      if (dictR?.data) {
        for (const d of dictR.data) {
          if (!seen.has(d.word)) {
            seen.add(d.word);
            results.push({
              kind: "dictionary",
              id: d.word,
              title: d.word,
              sub: (d.meanings || []).slice(0, 2).join(" · "),
              subHi: (d.meanings_hi || []).slice(0, 2).join(" · ") || void 0,
              extra: toIAST(d.word)
            });
          }
        }
      }
    } catch {}
  }

  return results.slice(0, limit);
}
export {
  DAILY_CHALLENGE_QUESTIONS,
  DHATUS,
  PHRASES_OF_DAY,
  SANDHI_RULES,
  VERSES_OF_DAY,
  dayOfYear,
  endsWithVowel,
  phraseOfDay,
  searchAll,
  startsWithVowel,
  toDevanagari,
  toIAST,
  tryJoinSandhi,
  trySplitSandhi,
  verseOfDay,
  wordOfDay
};
