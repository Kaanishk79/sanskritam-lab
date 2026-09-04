const SENTENCES = [
  {
    id: "s1",
    level: "easy",
    sa: "\u0930\u093E\u092E\u0903 \u092B\u0932\u092E\u094D \u0916\u093E\u0926\u0924\u093F",
    iast: "r\u0101ma\u1E25 phalam kh\u0101dati",
    en: "Rama eats a fruit",
    words: [
      { sa: "\u0930\u093E\u092E\u0903", en: "Rama (nom.)" },
      { sa: "\u092B\u0932\u092E\u094D", en: "fruit (acc.)" },
      { sa: "\u0916\u093E\u0926\u0924\u093F", en: "eats" }
    ]
  },
  {
    id: "s2",
    level: "easy",
    sa: "\u0938\u0940\u0924\u093E \u0935\u0928\u0947 \u0935\u0938\u0924\u093F",
    iast: "s\u012Bt\u0101 vane vasati",
    en: "Sita lives in the forest",
    words: [
      { sa: "\u0938\u0940\u0924\u093E", en: "Sita (nom.)" },
      { sa: "\u0935\u0928\u0947", en: "in the forest (loc.)" },
      { sa: "\u0935\u0938\u0924\u093F", en: "lives" }
    ]
  },
  {
    id: "s3",
    level: "easy",
    sa: "\u092C\u093E\u0932\u0915\u0903 \u092A\u0941\u0938\u094D\u0924\u0915\u092E\u094D \u092A\u0920\u0924\u093F",
    iast: "b\u0101laka\u1E25 pustakam pa\u1E6Dhati",
    en: "The boy reads a book",
    words: [
      { sa: "\u092C\u093E\u0932\u0915\u0903", en: "boy (nom.)" },
      { sa: "\u092A\u0941\u0938\u094D\u0924\u0915\u092E\u094D", en: "book (acc.)" },
      { sa: "\u092A\u0920\u0924\u093F", en: "reads" }
    ]
  },
  {
    id: "s4",
    level: "easy",
    sa: "\u0905\u0939\u092E\u094D \u0935\u093F\u0926\u094D\u092F\u093E\u0932\u092F\u092E\u094D \u0917\u091A\u094D\u091B\u093E\u092E\u093F",
    iast: "aham vidy\u0101layam gacch\u0101mi",
    en: "I go to school",
    words: [
      { sa: "\u0905\u0939\u092E\u094D", en: "I" },
      { sa: "\u0935\u093F\u0926\u094D\u092F\u093E\u0932\u092F\u092E\u094D", en: "to school (acc.)" },
      { sa: "\u0917\u091A\u094D\u091B\u093E\u092E\u093F", en: "I go" }
    ]
  },
  {
    id: "s5",
    level: "easy",
    sa: "\u091C\u0932\u092E\u094D \u0936\u0940\u0924\u092E\u094D \u0905\u0938\u094D\u0924\u093F",
    iast: "jalam \u015B\u012Btam asti",
    en: "The water is cold",
    words: [
      { sa: "\u091C\u0932\u092E\u094D", en: "water (nom.)" },
      { sa: "\u0936\u0940\u0924\u092E\u094D", en: "cold" },
      { sa: "\u0905\u0938\u094D\u0924\u093F", en: "is" }
    ]
  },
  {
    id: "s6",
    level: "easy",
    sa: "\u091A\u0928\u094D\u0926\u094D\u0930\u0903 \u0906\u0915\u093E\u0936\u0947 \u092D\u094D\u0930\u093E\u091C\u0924\u0947",
    iast: "candra\u1E25 \u0101k\u0101\u015Be bhr\u0101jate",
    en: "The moon shines in the sky",
    words: [
      { sa: "\u091A\u0928\u094D\u0926\u094D\u0930\u0903", en: "moon (nom.)" },
      { sa: "\u0906\u0915\u093E\u0936\u0947", en: "in the sky (loc.)" },
      { sa: "\u092D\u094D\u0930\u093E\u091C\u0924\u0947", en: "shines" }
    ]
  },
  {
    id: "s7",
    level: "easy",
    sa: "\u0938\u0924\u094D\u092F\u092E\u094D \u090F\u0935 \u091C\u092F\u0924\u0947",
    iast: "satyam eva jayate",
    en: "Truth alone triumphs",
    words: [
      { sa: "\u0938\u0924\u094D\u092F\u092E\u094D", en: "truth (nom.)" },
      { sa: "\u090F\u0935", en: "alone (emphatic)" },
      { sa: "\u091C\u092F\u0924\u0947", en: "triumphs" }
    ]
  },
  {
    id: "s8",
    level: "medium",
    sa: "\u0917\u0941\u0930\u0941\u0903 \u0936\u093F\u0937\u094D\u092F\u092E\u094D \u092A\u093E\u0920\u092F\u0924\u093F",
    iast: "guru\u1E25 \u015Bi\u1E63yam p\u0101\u1E6Dhayati",
    en: "The teacher teaches the disciple",
    words: [
      { sa: "\u0917\u0941\u0930\u0941\u0903", en: "teacher (nom.)" },
      { sa: "\u0936\u093F\u0937\u094D\u092F\u092E\u094D", en: "disciple (acc.)" },
      { sa: "\u092A\u093E\u0920\u092F\u0924\u093F", en: "teaches (caus.)" }
    ]
  },
  {
    id: "s9",
    level: "medium",
    sa: "\u0928\u0926\u0940 \u0917\u094D\u0930\u093E\u092E\u092E\u094D \u092A\u094D\u0930\u0935\u0939\u0924\u093F",
    iast: "nad\u012B gr\u0101mam pravahati",
    en: "The river flows past the village",
    words: [
      { sa: "\u0928\u0926\u0940", en: "river (nom.)" },
      { sa: "\u0917\u094D\u0930\u093E\u092E\u092E\u094D", en: "past the village (acc.)" },
      { sa: "\u092A\u094D\u0930\u0935\u0939\u0924\u093F", en: "flows" }
    ]
  },
  {
    id: "s10",
    level: "medium",
    sa: "\u0915\u0943\u0937\u0915\u0903 \u0915\u094D\u0937\u0947\u0924\u094D\u0930\u0947 \u0915\u093E\u0930\u094D\u092F\u092E\u094D \u0915\u0930\u094B\u0924\u093F",
    iast: "k\u1E5B\u1E63aka\u1E25 k\u1E63etre k\u0101ryam karoti",
    en: "The farmer works in the field",
    words: [
      { sa: "\u0915\u0943\u0937\u0915\u0903", en: "farmer (nom.)" },
      { sa: "\u0915\u094D\u0937\u0947\u0924\u094D\u0930\u0947", en: "in the field (loc.)" },
      { sa: "\u0915\u093E\u0930\u094D\u092F\u092E\u094D", en: "work (acc.)" },
      { sa: "\u0915\u0930\u094B\u0924\u093F", en: "does" }
    ]
  },
  {
    id: "s11",
    level: "medium",
    sa: "\u0905\u0939\u092E\u094D \u0938\u0902\u0938\u094D\u0915\u0943\u0924\u092E\u094D \u0905\u0927\u0940\u092E\u0939\u0947",
    iast: "aham sa\u1E43sk\u1E5Btam adh\u012Bmahe",
    en: "We study Sanskrit",
    words: [
      { sa: "\u0905\u0939\u092E\u094D", en: "we" },
      { sa: "\u0938\u0902\u0938\u094D\u0915\u0943\u0924\u092E\u094D", en: "Sanskrit (acc.)" },
      { sa: "\u0905\u0927\u0940\u092E\u0939\u0947", en: "study" }
    ]
  },
  {
    id: "s12",
    level: "medium",
    sa: "\u0935\u093E\u0928\u0930\u0903 \u0935\u0943\u0915\u094D\u0937\u092E\u094D \u0906\u0930\u094B\u0939\u0924\u093F",
    iast: "v\u0101nara\u1E25 v\u1E5Bk\u1E63am \u0101rohati",
    en: "The monkey climbs the tree",
    words: [
      { sa: "\u0935\u093E\u0928\u0930\u0903", en: "monkey (nom.)" },
      { sa: "\u0935\u0943\u0915\u094D\u0937\u092E\u094D", en: "tree (acc.)" },
      { sa: "\u0906\u0930\u094B\u0939\u0924\u093F", en: "climbs" }
    ]
  },
  {
    id: "s13",
    level: "hard",
    sa: "\u0905\u0927\u094D\u092F\u093E\u092A\u0915\u0903 \u092A\u093E\u0920\u092E\u094D \u0935\u094D\u092F\u093E\u0916\u094D\u092F\u093E\u0924\u093F",
    iast: "adhy\u0101paka\u1E25 p\u0101\u1E6Dham vy\u0101khy\u0101ti",
    en: "The professor explains the lesson",
    words: [
      { sa: "\u0905\u0927\u094D\u092F\u093E\u092A\u0915\u0903", en: "professor (nom.)" },
      { sa: "\u092A\u093E\u0920\u092E\u094D", en: "lesson (acc.)" },
      { sa: "\u0935\u094D\u092F\u093E\u0916\u094D\u092F\u093E\u0924\u093F", en: "explains" }
    ]
  },
  {
    id: "s14",
    level: "hard",
    sa: "\u092E\u093E\u0924\u093E \u092C\u093E\u0932\u093F\u0915\u093E\u092F\u0948 \u0915\u0925\u093E\u092E\u094D \u0915\u0925\u092F\u0924\u093F",
    iast: "m\u0101t\u0101 b\u0101lik\u0101yai kath\u0101m kathayati",
    en: "The mother tells a story to the girl",
    words: [
      { sa: "\u092E\u093E\u0924\u093E", en: "mother (nom.)" },
      { sa: "\u092C\u093E\u0932\u093F\u0915\u093E\u092F\u0948", en: "to the girl (dat.)" },
      { sa: "\u0915\u0925\u093E\u092E\u094D", en: "story (acc.)" },
      { sa: "\u0915\u0925\u092F\u0924\u093F", en: "tells" }
    ]
  },
  {
    id: "s15",
    level: "hard",
    sa: "\u0935\u093E\u092F\u0941\u0903 \u0935\u0947\u0917\u0947\u0928 \u0935\u0939\u0924\u093F",
    iast: "v\u0101yu\u1E25 vegena vahati",
    en: "The wind blows with speed",
    words: [
      { sa: "\u0935\u093E\u092F\u0941\u0903", en: "wind (nom.)" },
      { sa: "\u0935\u0947\u0917\u0947\u0928", en: "with speed (instr.)" },
      { sa: "\u0935\u0939\u0924\u093F", en: "blows" }
    ]
  },
  {
    id: "s16",
    level: "hard",
    sa: "\u0935\u093F\u0926\u094D\u092F\u093E \u0927\u0928\u092E\u094D \u0938\u0930\u094D\u0935\u0936\u094D\u0930\u0947\u0937\u094D\u0920\u092E\u094D",
    iast: "vidy\u0101 dhanam sarva\u015Bre\u1E63\u1E6Dham",
    en: "Knowledge is the best wealth",
    words: [
      { sa: "\u0935\u093F\u0926\u094D\u092F\u093E", en: "knowledge (nom.)" },
      { sa: "\u0927\u0928\u092E\u094D", en: "wealth (nom.)" },
      { sa: "\u0938\u0930\u094D\u0935\u0936\u094D\u0930\u0947\u0937\u094D\u0920\u092E\u094D", en: "the best of all" }
    ]
  }
];
const sentenceOfDay = () => SENTENCES[(/* @__PURE__ */ new Date()).getDate() % SENTENCES.length];
export {
  SENTENCES,
  sentenceOfDay
};
