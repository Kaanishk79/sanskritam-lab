const METERS = [
  { name: "\u0905\u0928\u0941\u0937\u094D\u091F\u0941\u092D\u094D", syllables: 8, lines: 4, desc: "8 syllables \xD7 4 lines \u2014 the most common shloka meter" },
  { name: "\u0924\u094D\u0930\u093F\u0937\u094D\u091F\u0941\u092D\u094D", syllables: 11, lines: 4, desc: "11 syllables \xD7 4 lines \u2014 the meter of Vedic hymns" },
  { name: "\u0917\u093E\u092F\u0924\u094D\u0930\u0940", syllables: 8, lines: 3, desc: "8 syllables \xD7 3 lines \u2014 the sacred Vedic meter" }
];
const VERSE_THEMES = [
  {
    id: "nature",
    icon: "tree",
    title: "\u092A\u094D\u0930\u0915\u0943\u0924\u093F\u0903 \u2014 Nature",
    words: [
      { sa: "\u0935\u0943\u0915\u094D\u0937\u093E\u0903", iast: "v\u1E5Bk\u1E63\u0101\u1E25", en: "trees" },
      { sa: "\u091C\u0932\u092E\u094D", iast: "jalam", en: "water" },
      { sa: "\u092A\u0930\u094D\u0935\u0924\u093E\u0903", iast: "parvat\u0101\u1E25", en: "mountains" },
      { sa: "\u0928\u0926\u0940", iast: "nad\u012B", en: "river" },
      { sa: "\u091A\u0928\u094D\u0926\u094D\u0930\u0903", iast: "candra\u1E25", en: "moon" },
      { sa: "\u0938\u0942\u0930\u094D\u092F\u0903", iast: "s\u016Brya\u1E25", en: "sun" },
      { sa: "\u092A\u0941\u0937\u094D\u092A\u093E\u0923\u093F", iast: "pu\u1E63p\u0101\u1E47i", en: "flowers" },
      { sa: "\u092A\u0915\u094D\u0937\u093F\u0923\u0903", iast: "pak\u1E63i\u1E47a\u1E25", en: "birds" }
    ],
    templates: [
      ["{1} {2} \u092A\u094D\u0930\u0915\u093E\u0936\u0928\u094D\u0924\u0947", "{1} {2} \u092A\u094D\u0930\u0915\u093E\u0936\u0924\u0947"],
      ["\u0935\u0928\u0947 {1} {2} \u0938\u0928\u094D\u0924\u093F", "\u0935\u0928\u0947 {1} {2} \u0905\u0938\u094D\u0924\u093F"],
      ["\u0905\u0939\u094B {1} {2} \u0936\u094B\u092D\u0928\u092E\u094D", "\u0905\u0939\u094B {1} {2} \u0936\u094B\u092D\u0928\u093E"],
      ["{1} {2} \u0938\u0926\u093E \u0930\u092E\u094D\u092F\u092E\u094D", "{1} {2} \u0938\u0926\u093E \u0930\u092E\u094D\u092F\u093E"]
    ]
  },
  {
    id: "learning",
    icon: "books",
    title: "\u0935\u093F\u0926\u094D\u092F\u093E \u2014 Learning",
    words: [
      { sa: "\u0935\u093F\u0926\u094D\u092F\u093E", iast: "vidy\u0101", en: "knowledge" },
      { sa: "\u0917\u0941\u0930\u0941\u0903", iast: "guru\u1E25", en: "teacher" },
      { sa: "\u092A\u0941\u0938\u094D\u0924\u0915\u092E\u094D", iast: "pustakam", en: "book" },
      { sa: "\u0936\u093F\u0937\u094D\u092F\u093E\u0903", iast: "\u015Bi\u1E63y\u0101\u1E25", en: "students" },
      { sa: "\u0927\u094D\u092F\u093E\u0928\u092E\u094D", iast: "dhy\u0101nam", en: "meditation" },
      { sa: "\u091C\u094D\u091E\u093E\u0928\u092E\u094D", iast: "j\xF1\u0101nam", en: "wisdom" },
      { sa: "\u0936\u092C\u094D\u0926\u093E\u0903", iast: "\u015Babd\u0101\u1E25", en: "words" },
      { sa: "\u092A\u093E\u0920\u093E\u0903", iast: "p\u0101\u1E6Dh\u0101\u1E25", en: "lessons" }
    ],
    templates: [
      ["{1} {2} \u092A\u094D\u0930\u092F\u091A\u094D\u091B\u0924\u093F", "{1} {2} \u092A\u094D\u0930\u092F\u091A\u094D\u091B\u0924\u093F"],
      ["\u0917\u0941\u0930\u094B\u0903 {1} {2} \u0936\u093F\u0915\u094D\u0937\u093E\u092E\u0903", "\u0917\u0941\u0930\u094B\u0903 {1} {2} \u0936\u093F\u0915\u094D\u0937\u0924\u0947"],
      ["{1} {2} \u092A\u094D\u0930\u0915\u093E\u0936\u093E\u092F", "{1} {2} \u092A\u094D\u0930\u0915\u093E\u0936\u093E\u092F"],
      ["{1} {2} \u0938\u094D\u092E\u0930\u093E\u092E\u0903", "{1} {2} \u0938\u094D\u092E\u0930\u093E\u092E\u0903"]
    ]
  },
  {
    id: "peace",
    icon: "om",
    title: "\u0936\u093E\u0928\u094D\u0924\u093F\u0903 \u2014 Peace",
    words: [
      { sa: "\u0936\u093E\u0928\u094D\u0924\u093F\u0903", iast: "\u015B\u0101nti\u1E25", en: "peace" },
      { sa: "\u0939\u0943\u0926\u092F\u092E\u094D", iast: "h\u1E5Bdayam", en: "heart" },
      { sa: "\u092A\u094D\u0930\u0947\u092E", iast: "prema", en: "love" },
      { sa: "\u0926\u092F\u093E", iast: "day\u0101", en: "compassion" },
      { sa: "\u0938\u0924\u094D\u092F\u092E\u094D", iast: "satyam", en: "truth" },
      { sa: "\u092E\u0928\u0903", iast: "mana\u1E25", en: "mind" },
      { sa: "\u0927\u0930\u094D\u092E\u0903", iast: "dharma\u1E25", en: "righteousness" },
      { sa: "\u0906\u0928\u0928\u094D\u0926\u0903", iast: "\u0101nanda\u1E25", en: "joy" }
    ],
    templates: [
      ["{1} {2} \u0939\u0943\u0926\u093F \u0924\u093F\u0937\u094D\u0920\u0924\u093F", "{1} {2} \u0939\u0943\u0926\u093F \u0924\u093F\u0937\u094D\u0920\u0924\u093F"],
      ["{1} {2} \u0938\u0930\u094D\u0935\u0926\u093E \u092D\u0935\u0947\u0924\u094D", "{1} {2} \u0938\u0930\u094D\u0935\u0926\u093E \u092D\u0935\u0947\u0924\u094D"],
      ["\u092E\u0928\u0903 {1} {2} \u0927\u093E\u0930\u092F\u0947\u0924\u094D", "\u092E\u0928\u0903 {1} {2} \u0927\u093E\u0930\u092F\u0947\u0924\u094D"],
      ["{1} {2} \u092A\u094D\u0930\u0936\u093E\u0928\u094D\u0924\u093F\u0903", "{1} {2} \u092A\u094D\u0930\u0936\u093E\u0928\u094D\u0924\u093F\u0903"]
    ]
  },
  {
    id: "cosmos",
    icon: "compass",
    title: "\u092C\u094D\u0930\u0939\u094D\u092E\u093E\u0923\u094D\u0921\u092E\u094D \u2014 Cosmos",
    words: [
      { sa: "\u0906\u0915\u093E\u0936\u092E\u094D", iast: "\u0101k\u0101\u015Bam", en: "sky" },
      { sa: "\u0924\u093E\u0930\u0915\u093E\u0903", iast: "t\u0101rak\u0101\u1E25", en: "stars" },
      { sa: "\u0935\u0947\u0926\u093E\u0903", iast: "ved\u0101\u1E25", en: "the Vedas" },
      { sa: "\u092E\u0928\u094D\u0924\u094D\u0930\u093E\u0903", iast: "mantr\u0101\u1E25", en: "mantras" },
      { sa: "\u0905\u0917\u094D\u0928\u093F\u0903", iast: "agni\u1E25", en: "fire" },
      { sa: "\u0907\u0928\u094D\u0926\u094D\u0930\u0903", iast: "indra\u1E25", en: "Indra" },
      { sa: "\u0938\u0942\u0930\u094D\u092F\u0903", iast: "s\u016Brya\u1E25", en: "sun" },
      { sa: "\u091A\u0928\u094D\u0926\u094D\u0930\u0903", iast: "candra\u1E25", en: "moon" }
    ],
    templates: [
      ["\u0906\u0915\u093E\u0936\u0947 {1} {2} \u092D\u093E\u0928\u094D\u0924\u093F", "\u0906\u0915\u093E\u0936\u0947 {1} {2} \u092D\u093E\u0924\u093F"],
      ["{1} {2} \u092A\u094D\u0930\u0915\u093E\u0936\u092F\u0928\u094D\u0924\u093F", "{1} {2} \u092A\u094D\u0930\u0915\u093E\u0936\u092F\u0924\u093F"],
      ["\u0926\u0947\u0935\u093E\u0903 {1} {2} \u0935\u0939\u0928\u094D\u0924\u093F", "\u0926\u0947\u0935\u0903 {1} {2} \u0935\u0939\u0924\u093F"],
      ["{1} {2} \u0905\u0928\u0928\u094D\u0924\u092E\u094D", "{1} {2} \u0905\u0928\u0928\u094D\u0924\u093E"]
    ]
  }
];
const VOWELS = "\u0905\u0906\u0907\u0908\u0909\u090A\u090B\u090F\u0910\u0913\u0914";
const VOWEL_SIGNS = "\u093E\u093F\u0940\u0941\u0942\u0943\u0947\u0948\u094B\u094C";
const CONSONANTS_DEV = "\u0915\u0916\u0917\u0918\u0919\u091A\u091B\u091C\u091D\u091E\u091F\u0920\u0921\u0922\u0923\u0924\u0925\u0926\u0927\u0928\u092A\u092B\u092C\u092D\u092E\u092F\u0930\u0932\u0935\u0936\u0937\u0938\u0939";
function countSyllables(sa) {
  let n = 0;
  let prevHalant = false;
  for (const ch of sa) {
    if (ch === "\u094D") {
      prevHalant = true;
      continue;
    }
    if (VOWELS.includes(ch) || VOWEL_SIGNS.includes(ch)) {
      n += 1;
      prevHalant = false;
    } else if (CONSONANTS_DEV.includes(ch)) {
      if (!prevHalant) n += 1;
      prevHalant = false;
    } else {
      prevHalant = false;
    }
  }
  return n;
}
export {
  CONSONANTS_DEV,
  METERS,
  VERSE_THEMES,
  VOWELS,
  VOWEL_SIGNS,
  countSyllables
};
