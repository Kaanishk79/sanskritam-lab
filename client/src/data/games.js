const WORD_PAIRS = [
  { sa: "\u091C\u0932\u092E\u094D", iast: "jalam", en: "water", hi: "\u092A\u093E\u0928\u0940" },
  { sa: "\u0905\u0917\u094D\u0928\u093F\u0903", iast: "agni\u1E25", en: "fire", hi: "\u0906\u0917" },
  { sa: "\u0938\u0942\u0930\u094D\u092F\u0903", iast: "s\u016Brya\u1E25", en: "sun", hi: "\u0938\u0942\u0930\u091C" },
  { sa: "\u091A\u0928\u094D\u0926\u094D\u0930\u0903", iast: "candra\u1E25", en: "moon", hi: "\u091A\u093E\u0901\u0926" },
  { sa: "\u0935\u0943\u0915\u094D\u0937\u0903", iast: "v\u1E5Bk\u1E63a\u1E25", en: "tree", hi: "\u092A\u0947\u0921\u093C" },
  { sa: "\u092A\u0941\u0937\u094D\u092A\u092E\u094D", iast: "pu\u1E63pam", en: "flower", hi: "\u092B\u0942\u0932" },
  { sa: "\u0917\u091C\u0903", iast: "gaja\u1E25", en: "elephant", hi: "\u0939\u093E\u0925\u0940" },
  { sa: "\u0938\u093F\u0902\u0939\u0903", iast: "si\u1E43ha\u1E25", en: "lion", hi: "\u0936\u0947\u0930" },
  { sa: "\u0917\u094D\u0930\u0928\u094D\u0925\u0903", iast: "grantha\u1E25", en: "book", hi: "\u092A\u0941\u0938\u094D\u0924\u0915" },
  { sa: "\u0935\u093F\u0926\u094D\u092F\u093E\u0932\u092F\u0903", iast: "vidy\u0101laya\u1E25", en: "school", hi: "\u0935\u093F\u0926\u094D\u092F\u093E\u0932\u092F" },
  { sa: "\u092E\u093F\u0924\u094D\u0930\u092E\u094D", iast: "mitram", en: "friend", hi: "\u092E\u093F\u0924\u094D\u0930" },
  { sa: "\u0917\u0943\u0939\u092E\u094D", iast: "g\u1E5Bham", en: "house", hi: "\u0918\u0930" },
  { sa: "\u0906\u0915\u093E\u0936\u092E\u094D", iast: "\u0101k\u0101\u015Bam", en: "sky", hi: "\u0906\u0915\u093E\u0936" },
  { sa: "\u0938\u092E\u0941\u0926\u094D\u0930\u0903", iast: "samudra\u1E25", en: "ocean", hi: "\u0938\u092E\u0941\u0926\u094D\u0930" },
  { sa: "\u092A\u0930\u094D\u0935\u0924\u0903", iast: "parvata\u1E25", en: "mountain", hi: "\u092A\u0939\u093E\u0921\u093C" },
  { sa: "\u0928\u0926\u0940", iast: "nad\u012B", en: "river", hi: "\u0928\u0926\u0940" },
  { sa: "\u0905\u0928\u094D\u0928\u092E\u094D", iast: "annam", en: "food", hi: "\u0916\u093E\u0928\u093E" },
  { sa: "\u0926\u0941\u0917\u094D\u0927\u092E\u094D", iast: "dugdham", en: "milk", hi: "\u0926\u0942\u0927" },
  { sa: "\u0905\u0936\u094D\u0935\u0903", iast: "a\u015Bva\u1E25", en: "horse", hi: "\u0918\u094B\u0921\u093C\u093E" },
  { sa: "\u092A\u0915\u094D\u0937\u0940", iast: "pak\u1E63\u012B", en: "bird", hi: "\u092A\u0915\u094D\u0937\u0940" }
];
const DEV_DIGITS = ["\u0966", "\u0967", "\u0968", "\u0969", "\u096A", "\u096B", "\u096C", "\u096D", "\u096E", "\u096F"];
function toDevanagariNumber(n) {
  return String(n).split("").map((c) => DEV_DIGITS[Number(c)]).join("");
}
const DEV_NUMBERS = [
  { n: 1, dev: "\u0967", word: "\u090F\u0915\u092E\u094D", iast: "ekam" },
  { n: 2, dev: "\u0968", word: "\u0926\u094D\u0935\u0947", iast: "dve" },
  { n: 3, dev: "\u0969", word: "\u0924\u094D\u0930\u0940\u0923\u093F", iast: "tr\u012B\u1E47i" },
  { n: 4, dev: "\u096A", word: "\u091A\u0924\u094D\u0935\u093E\u0930\u093F", iast: "catv\u0101ri" },
  { n: 5, dev: "\u096B", word: "\u092A\u091E\u094D\u091A", iast: "pa\xF1ca" },
  { n: 6, dev: "\u096C", word: "\u0937\u091F\u094D", iast: "\u1E63a\u1E6D" },
  { n: 7, dev: "\u096D", word: "\u0938\u092A\u094D\u0924", iast: "sapta" },
  { n: 8, dev: "\u096E", word: "\u0905\u0937\u094D\u091F", iast: "a\u1E63\u1E6Da" },
  { n: 9, dev: "\u096F", word: "\u0928\u0935", iast: "nava" },
  { n: 10, dev: "\u0967\u0966", word: "\u0926\u0936", iast: "da\u015Ba" },
  { n: 11, dev: "\u0967\u0967", word: "\u090F\u0915\u093E\u0926\u0936", iast: "ek\u0101da\u015Ba" },
  { n: 12, dev: "\u0967\u0968", word: "\u0926\u094D\u0935\u093E\u0926\u0936", iast: "dv\u0101da\u015Ba" },
  { n: 15, dev: "\u0967\u096B", word: "\u092A\u091E\u094D\u091A\u0926\u0936", iast: "pa\xF1cada\u015Ba" },
  { n: 20, dev: "\u0968\u0966", word: "\u0935\u093F\u0902\u0936\u0924\u093F\u0903", iast: "vi\u1E43\u015Bati\u1E25" }
];
const SANDHI_PAIRS = [
  { a: "\u0930\u093E\u092E\u0903", b: "\u0905\u0938\u094D\u0924\u093F" },
  { a: "\u0930\u093E\u092E\u0903", b: "\u0935\u0928\u0947" },
  { a: "\u0928\u0930\u0903", b: "\u0907\u0935" },
  { a: "\u0938\u0924\u094D\u092F\u092E\u094D", b: "\u090F\u0935" },
  { a: "\u092B\u0932\u092E\u094D", b: "\u0905\u0938\u094D\u0924\u093F" },
  { a: "\u0930\u093E\u091C\u093E", b: "\u0907\u0924\u093F" },
  { a: "\u0924\u0924\u094D", b: "\u0906\u0938\u094D\u0924\u0947" },
  { a: "\u0939\u0930\u093F\u0903", b: "\u0907\u0924\u093F" },
  { a: "\u0926\u0947\u0935\u0903", b: "\u0907\u0928\u094D\u0926\u094D\u0930\u0903" },
  { a: "\u0935\u093F\u0926\u094D\u092F\u093E", b: "\u0905\u0928\u094D\u0928\u092E\u094D" }
];
export {
  DEV_NUMBERS,
  SANDHI_PAIRS,
  WORD_PAIRS,
  toDevanagariNumber
};
