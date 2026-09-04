import { toDevanagari } from "./sanskrit";
const EXAMPLE_TEXTS = [
  { label: "IAST Input", text: "aham grham gacchami" },
  { label: "Missing Danda", text: "\u0935\u093F\u0926\u094D\u092F\u093E \u0926\u0926\u093E\u0924\u093F \u0935\u093F\u0928\u092F\u0902" },
  { label: "Unseparated Words", text: "\u0938\u0924\u094D\u092F\u0902\u0935\u0926\u0927\u0930\u094D\u092E\u0902\u091A\u0930" },
  { label: "Sandhi Junction", text: "\u0928\u0930 + \u0908\u0936\u0903" }
];
function isDevanagari(str) {
  return /[\u0900-\u097F]/.test(str);
}
function toTokens(text) {
  return text.split(/[\s,.;!?।॥]+/).map((w) => w.trim()).filter(Boolean);
}
async function checkSanskrit(text, lookup) {
  const issues = [];
  const unknownWords = [];
  const iastInput = /^[a-zA-Zāīūṛṝḷḹṃḥṅñṇtnśṣshḍḍhṭṭh\s.,!?]+$/.test(text.trim()) && !isDevanagari(text);
  let fixed = text;
  if (iastInput) {
    const dev = toDevanagari(text).replace(/म(?=$|[\s।॥])/g, "\u092E\u094D");
    issues.push({
      rule: "transliterate",
      icon: "alphabet",
      message: "Your text looks like IAST (Latin) \u2014 Sanskrit is written in Devanagari.",
      messageHi: "\u0906\u092A\u0915\u093E \u092A\u093E\u0920 IAST (\u0932\u0948\u091F\u093F\u0928) \u091C\u0948\u0938\u093E \u0932\u0917\u0924\u093E \u0939\u0948 \u2014 \u0938\u0902\u0938\u094D\u0915\u0943\u0924 \u0926\u0947\u0935\u0928\u093E\u0917\u0930\u0940 \u092E\u0947\u0902 \u0932\u093F\u0916\u0940 \u091C\u093E\u0924\u0940 \u0939\u0948\u0964",
      suggestion: `Converted: ${dev}`,
      suggestionHi: `\u092A\u0930\u093F\u0935\u0930\u094D\u0924\u093F\u0924: ${dev}`,
      fix: dev
    });
    fixed = dev;
  }
  if (!/[।।]/.test(fixed) && !/[.!?]\s*$/.test(fixed)) {
    issues.push({
      rule: "punctuation",
      icon: "punctuation",
      message: "A Sanskrit sentence should end with the danda (\u0964).",
      messageHi: "\u0938\u0902\u0938\u094D\u0915\u0943\u0924 \u0935\u093E\u0915\u094D\u092F \u0915\u093E \u0905\u0902\u0924 \u0926\u0902\u0921 (\u0964) \u0938\u0947 \u0939\u094B\u0928\u093E \u091A\u093E\u0939\u093F\u090F\u0964",
      suggestion: `End with \u0964: ${fixed.trim()} \u0964`,
      suggestionHi: `\u0964 \u0938\u0947 \u0938\u092E\u093E\u092A\u094D\u0924 \u0915\u0930\u0947\u0902: ${fixed.trim()} \u0964`,
      fix: fixed.trim() + " \u0964"
    });
    fixed = fixed.trim() + " \u0964";
  }
  const tokens = toTokens(fixed);
  for (const tok of tokens) {
    if (tok.length > 30) {
      issues.push({
        rule: "long-token",
        icon: "syntax",
        message: `\u201C${tok.slice(0, 24)}\u2026\u201D is very long \u2014 words may be joined without spaces.`,
        messageHi: `\u201C${tok.slice(0, 24)}\u2026\u201D \u092C\u0939\u0941\u0924 \u0932\u0902\u092C\u093E \u0939\u0948 \u2014 \u0936\u092C\u094D\u0926 \u092C\u093F\u0928\u093E \u0938\u094D\u0925\u093E\u0928 \u0915\u0947 \u091C\u0941\u0921\u093C\u0947 \u0939\u094B \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964`,
        suggestion: "Split the sentence into separate words.",
        suggestionHi: "\u0935\u093E\u0915\u094D\u092F \u0915\u094B \u0905\u0932\u0917-\u0905\u0932\u0917 \u0936\u092C\u094D\u0926\u094B\u0902 \u092E\u0947\u0902 \u0935\u093F\u092D\u093E\u091C\u093F\u0924 \u0915\u0930\u0947\u0902\u0964",
        fix: tok
      });
      continue;
    }
    if (lookup) {
      const meaning = await lookup(tok);
      if (meaning === null) {
        unknownWords.push({ word: tok, meaning: null });
      }
    }
  }
  return { fixed, issues, unknownWords, iastInput };
}
export {
  EXAMPLE_TEXTS,
  checkSanskrit
};
