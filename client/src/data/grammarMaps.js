const GRAMMAR_RULES = [
  { id: "1.1.1", rule: "\u0935\u0943\u0926\u094D\u0927\u093F\u0930\u093E\u0926\u0948\u091A\u094D", meaning: "v\u1E5Bddhi is denoted by \u0101, ai, au", meaningHi: "\u0935\u0943\u0926\u094D\u0927\u093F \u0906, \u0910, \u0914 \u0938\u0947 \u0939\u094B\u0924\u0940 \u0939\u0948", category: "v\u1E5Bddhi" },
  { id: "1.1.2", rule: "\u0905\u0926\u0947\u0919\u094D \u0917\u0941\u0923\u0903", meaning: "gu\u1E47a is denoted by a, e, o", meaningHi: "\u0917\u0941\u0923 \u0905, \u090F, \u0913 \u0938\u0947 \u0939\u094B\u0924\u093E \u0939\u0948", category: "gu\u1E47a" },
  { id: "6.1.77", rule: "\u0907\u0915\u094B \u092F\u0923\u091A\u093F", meaning: "ik vowels become ya\u1E47 before a vowel", meaningHi: "\u0907\u0915 \u0938\u094D\u0935\u0930\u094B\u0902 \u0915\u0947 \u092C\u093E\u0926 \u0938\u094D\u0935\u0930 \u0938\u0947 \u092A\u0939\u0932\u0947 \u092F\u0923\u094D \u0939\u094B\u0924\u093E \u0939\u0948", category: "sandhi" }
];
const PHILOSOPHY_NETWORKS = [
  { name: "Ny\u0101ya", focus: "Logic & Epistemology", focusHi: "\u0924\u0930\u094D\u0915 \u0914\u0930 \u092A\u094D\u0930\u092E\u093E\u0923\u0936\u093E\u0938\u094D\u0924\u094D\u0930", texts: "Ny\u0101ya S\u016Btra", textsHi: "\u0928\u094D\u092F\u093E\u092F\u0938\u0942\u0924\u094D\u0930", color: "#e74c3c" },
  { name: "Ved\u0101nta", focus: "Non-duality", focusHi: "\u0905\u0926\u094D\u0935\u0948\u0924", texts: "Brahma S\u016Btra, Upani\u1E63ads", textsHi: "\u092C\u094D\u0930\u0939\u094D\u092E\u0938\u0942\u0924\u094D\u0930, \u0909\u092A\u0928\u093F\u0937\u0926\u094D", color: "#2ecc71" },
  { name: "M\u012Bm\u0101\u1E43s\u0101", focus: "Ritual Exegesis", focusHi: "\u0915\u0930\u094D\u092E\u0915\u093E\u0923\u094D\u0921 \u0935\u094D\u092F\u093E\u0916\u094D\u092F\u093E", texts: "P\u016Brva M\u012Bm\u0101\u1E43s\u0101 S\u016Btra", textsHi: "\u092A\u0942\u0930\u094D\u0935\u092E\u0940\u092E\u093E\u0902\u0938\u093E\u0938\u0942\u0924\u094D\u0930", color: "#f39c12" },
  { name: "S\u0101\u1E43khya", focus: "Enumeration", focusHi: "\u0917\u0923\u0928\u093E", texts: "S\u0101\u1E43khya K\u0101rik\u0101", textsHi: "\u0938\u093E\u0902\u0916\u094D\u092F\u0915\u093E\u0930\u093F\u0915\u093E", color: "#9b59b6" },
  { name: "Yoga", focus: "Union & Practice", focusHi: "\u092F\u094B\u0917 \u0914\u0930 \u0905\u092D\u094D\u092F\u093E\u0938", texts: "Yoga S\u016Btra", textsHi: "\u092F\u094B\u0917\u0938\u0942\u0924\u094D\u0930", color: "#1abc9c" }
];
export {
  GRAMMAR_RULES,
  PHILOSOPHY_NETWORKS
};
