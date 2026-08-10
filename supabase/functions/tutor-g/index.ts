import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const DICT: Record<string, { meaning: string; iast: string; pos: string; info?: string }> = {
  "नमस्ते": { meaning: "Hello / Greetings", iast: "namaste", pos: "interjection" },
  "राम": { meaning: "Rama (the hero of Ramayana)", iast: "rāma", pos: "noun", info: "masculine a-stem noun" },
  "रामः": { meaning: "Rama (nominative singular)", iast: "rāmaḥ", pos: "noun", info: "masculine a-stem, nominative singular" },
  "रामम्": { meaning: "Rama (accusative singular)", iast: "rāmam", pos: "noun", info: "masculine a-stem, accusative singular" },
  "रामेण": { meaning: "by/with Rama (instrumental singular)", iast: "rāmeṇa", pos: "noun", info: "masculine a-stem, instrumental singular" },
  "रामाय": { meaning: "to/for Rama (dative singular)", iast: "rāmāya", pos: "noun", info: "masculine a-stem, dative singular" },
  "रामात्": { meaning: "from Rama (ablative singular)", iast: "rāmāt", pos: "noun", info: "masculine a-stem, ablative singular" },
  "रामस्य": { meaning: "of Rama (genitive singular)", iast: "rāmasya", pos: "noun", info: "masculine a-stem, genitive singular" },
  "रामे": { meaning: "in/on Rama (locative singular)", iast: "rāme", pos: "noun", info: "masculine a-stem, locative singular" },
  "रामौ": { meaning: "two Ramas (nominative dual)", iast: "rāmau", pos: "noun", info: "masculine a-stem, nominative dual" },
  "रामाः": { meaning: "Ramas (nominative plural)", iast: "rāmāḥ", pos: "noun", info: "masculine a-stem, nominative plural" },
  "वन": { meaning: "forest", iast: "vana", pos: "noun", info: "neuter a-stem noun" },
  "वनम्": { meaning: "forest (nom/acc singular)", iast: "vanam", pos: "noun", info: "neuter a-stem" },
  "वने": { meaning: "in the forest / two forests", iast: "vane", pos: "noun", info: "neuter a-stem, locative singular or nominative dual" },
  "वनानि": { meaning: "forests (nominative plural)", iast: "vanāni", pos: "noun", info: "neuter a-stem, nominative plural" },
  "पुस्तक": { meaning: "book", iast: "pustaka", pos: "noun", info: "neuter a-stem" },
  "पुस्तकम्": { meaning: "book (nom/acc singular)", iast: "pustakam", pos: "noun", info: "neuter a-stem" },
  "गुरु": { meaning: "teacher", iast: "guru", pos: "noun", info: "masculine u-stem" },
  "गुरुः": { meaning: "teacher (nominative singular)", iast: "guruḥ", pos: "noun", info: "masculine u-stem, nominative singular" },
  "गुरवे": { meaning: "to/for the teacher", iast: "gurave", pos: "noun", info: "masculine u-stem, dative singular" },
  "मित्र": { meaning: "friend", iast: "mitra", pos: "noun", info: "masculine a-stem" },
  "मित्रम्": { meaning: "friend (nom/acc singular)", iast: "mitram", pos: "noun", info: "neuter a-stem" },
  "जल": { meaning: "water", iast: "jala", pos: "noun", info: "neuter a-stem" },
  "जलम्": { meaning: "water (nom/acc singular)", iast: "jalam", pos: "noun" },
  "फल": { meaning: "fruit", iast: "phala", pos: "noun", info: "neuter a-stem" },
  "फलम्": { meaning: "fruit (nom/acc singular)", iast: "phalam", pos: "noun" },
  "ग्राम": { meaning: "village", iast: "grāma", pos: "noun", info: "masculine a-stem" },
  "ग्रामः": { meaning: "village (nominative singular)", iast: "grāmaḥ", pos: "noun" },
  "ग्रामम्": { meaning: "to the village (accusative singular)", iast: "grāmam", pos: "noun" },
  "नगर": { meaning: "city", iast: "nagara", pos: "noun", info: "neuter a-stem" },
  "नगरम्": { meaning: "city (nom/acc singular)", iast: "nagaram", pos: "noun" },
  "विद्यालय": { meaning: "school", iast: "vidyālaya", pos: "noun" },
  "विद्यालयः": { meaning: "school (nominative singular)", iast: "vidyālayaḥ", pos: "noun" },
  "देव": { meaning: "god / deity", iast: "deva", pos: "noun" },
  "देवः": { meaning: "god (nominative singular)", iast: "devaḥ", pos: "noun" },
  "देवम्": { meaning: "god (accusative singular)", iast: "devam", pos: "noun" },
  "देवी": { meaning: "goddess (nominative singular)", iast: "devī", pos: "noun", info: "feminine ī-stem" },
  "बालक": { meaning: "boy / child", iast: "bālaka", pos: "noun" },
  "बालकः": { meaning: "boy (nominative singular)", iast: "bālakaḥ", pos: "noun" },
  "बालिका": { meaning: "girl (nominative singular)", iast: "bālikā", pos: "noun" },
  "पिता": { meaning: "father (nominative singular)", iast: "pitā", pos: "noun", info: "irregular r-stem" },
  "पितुः": { meaning: "of the father", iast: "pituḥ", pos: "noun" },
  "माता": { meaning: "mother (nominative singular)", iast: "mātā", pos: "noun", info: "irregular r-stem" },
  "मातुः": { meaning: "of the mother", iast: "mātuḥ", pos: "noun" },
  "पुत्र": { meaning: "son", iast: "putra", pos: "noun" },
  "पुत्रः": { meaning: "son (nominative singular)", iast: "putraḥ", pos: "noun" },
  "पुत्री": { meaning: "daughter (nominative singular)", iast: "putrī", pos: "noun" },
  "अहम्": { meaning: "I", iast: "aham", pos: "pronoun" },
  "त्वम्": { meaning: "you (singular)", iast: "tvam", pos: "pronoun" },
  "सः": { meaning: "he / that (masculine nom sg)", iast: "saḥ", pos: "pronoun" },
  "सा": { meaning: "she / that (feminine nom sg)", iast: "sā", pos: "pronoun" },
  "तत्": { meaning: "it / that (neuter nom/acc sg)", iast: "tat", pos: "pronoun" },
  "ते": { meaning: "they (masculine nom pl) / your", iast: "te", pos: "pronoun" },
  "ताः": { meaning: "they (feminine nom pl)", iast: "tāḥ", pos: "pronoun" },
  "तानि": { meaning: "they (neuter nom pl)", iast: "tāni", pos: "pronoun" },
  "किम्": { meaning: "what?", iast: "kim", pos: "interrogative" },
  "कः": { meaning: "who? (masculine)", iast: "kaḥ", pos: "interrogative" },
  "का": { meaning: "who? (feminine)", iast: "kā", pos: "interrogative" },
  "कुत्र": { meaning: "where?", iast: "kutra", pos: "adverb" },
  "कदा": { meaning: "when?", iast: "kadā", pos: "adverb" },
  "कथम्": { meaning: "how?", iast: "katham", pos: "adverb" },
  "किमर्थम्": { meaning: "why?", iast: "kimartham", pos: "adverb" },
  "च": { meaning: "and", iast: "ca", pos: "conjunction" },
  "वा": { meaning: "or", iast: "vā", pos: "conjunction" },
  "चेत्": { meaning: "if", iast: "cet", pos: "conjunction" },
  "हि": { meaning: "indeed / because", iast: "hi", pos: "particle" },
  "न": { meaning: "not / no", iast: "na", pos: "particle" },
  "अत्र": { meaning: "here", iast: "atra", pos: "adverb" },
  "तत्र": { meaning: "there", iast: "tatra", pos: "adverb" },
  "सर्वत्र": { meaning: "everywhere", iast: "sarvatra", pos: "adverb" },
  "अद्य": { meaning: "today", iast: "adya", pos: "adverb" },
  "श्वः": { meaning: "tomorrow", iast: "śvaḥ", pos: "adverb" },
  "ह्यः": { meaning: "yesterday", iast: "hyaḥ", pos: "adverb" },
  "सदा": { meaning: "always", iast: "sadā", pos: "adverb" },
  "कदाचित्": { meaning: "sometimes / ever", iast: "kadācit", pos: "adverb" },
  "एक": { meaning: "one", iast: "eka", pos: "numeral" },
  "द्वि": { meaning: "two", iast: "dvi", pos: "numeral" },
  "त्रि": { meaning: "three", iast: "tri", pos: "numeral" },
  "चत्वार": { meaning: "four", iast: "catvāra", pos: "numeral" },
  "पञ्च": { meaning: "five", iast: "pañca", pos: "numeral" },
  "षट्": { meaning: "six", iast: "ṣaṭ", pos: "numeral" },
  "सप्त": { meaning: "seven", iast: "sapta", pos: "numeral" },
  "अष्ट": { meaning: "eight", iast: "aṣṭa", pos: "numeral" },
  "नव": { meaning: "nine", iast: "nava", pos: "numeral" },
  "दश": { meaning: "ten", iast: "daśa", pos: "numeral" },
};

const VERBS: Record<string, { meaning: string; iast: string; root: string; root_iast: string; tense: string; person: string; number: string; pada: string }> = {
  "गच्छामि": { meaning: "I go", iast: "gacchāmi", root: "गम्", root_iast: "gam", tense: "present", person: "1st", number: "singular", pada: "parasmaipada" },
  "गच्छसि": { meaning: "you go (sg)", iast: "gacchasi", root: "गम्", root_iast: "gam", tense: "present", person: "2nd", number: "singular", pada: "parasmaipada" },
  "गच्छति": { meaning: "he/she/it goes", iast: "gacchati", root: "गम्", root_iast: "gam", tense: "present", person: "3rd", number: "singular", pada: "parasmaipada" },
  "गच्छावः": { meaning: "we two go", iast: "gacchāvaḥ", root: "गम्", root_iast: "gam", tense: "present", person: "1st", number: "dual", pada: "parasmaipada" },
  "गच्छथः": { meaning: "you two go", iast: "gacchathaḥ", root: "गम्", root_iast: "gam", tense: "present", person: "2nd", number: "dual", pada: "parasmaipada" },
  "गच्छतः": { meaning: "they two go", iast: "gacchataḥ", root: "गम्", root_iast: "gam", tense: "present", person: "3rd", number: "dual", pada: "parasmaipada" },
  "गच्छामः": { meaning: "we go", iast: "gacchāmaḥ", root: "गम्", root_iast: "gam", tense: "present", person: "1st", number: "plural", pada: "parasmaipada" },
  "गच्छथ": { meaning: "you (pl) go", iast: "gacchatha", root: "गम्", root_iast: "gam", tense: "present", person: "2nd", number: "plural", pada: "parasmaipada" },
  "गच्छन्ति": { meaning: "they go", iast: "gacchanti", root: "गम्", root_iast: "gam", tense: "present", person: "3rd", number: "plural", pada: "parasmaipada" },
  "आगच्छामि": { meaning: "I come", iast: "āgacchāmi", root: "आगम्", root_iast: "āgam", tense: "present", person: "1st", number: "singular", pada: "parasmaipada" },
  "आगच्छति": { meaning: "he/she/it comes", iast: "āgacchati", root: "आगम्", root_iast: "āgam", tense: "present", person: "3rd", number: "singular", pada: "parasmaipada" },
  "भवामि": { meaning: "I am / become", iast: "bhavāmi", root: "भू", root_iast: "bhū", tense: "present", person: "1st", number: "singular", pada: "parasmaipada" },
  "भवसि": { meaning: "you are", iast: "bhavasi", root: "भू", root_iast: "bhū", tense: "present", person: "2nd", number: "singular", pada: "parasmaipada" },
  "भवति": { meaning: "he/she/it is / becomes", iast: "bhavati", root: "भू", root_iast: "bhū", tense: "present", person: "3rd", number: "singular", pada: "parasmaipada" },
  "भवन्ति": { meaning: "they are", iast: "bhavanti", root: "भू", root_iast: "bhū", tense: "present", person: "3rd", number: "plural", pada: "parasmaipada" },
  "पठामि": { meaning: "I read / study", iast: "paṭhāmi", root: "पठ्", root_iast: "paṭh", tense: "present", person: "1st", number: "singular", pada: "parasmaipada" },
  "पठसि": { meaning: "you read", iast: "paṭhasi", root: "पठ्", root_iast: "paṭh", tense: "present", person: "2nd", number: "singular", pada: "parasmaipada" },
  "पठति": { meaning: "he/she/it reads", iast: "paṭhati", root: "पठ्", root_iast: "paṭh", tense: "present", person: "3rd", number: "singular", pada: "parasmaipada" },
  "पठन्ति": { meaning: "they read", iast: "paṭhanti", root: "पठ्", root_iast: "paṭh", tense: "present", person: "3rd", number: "plural", pada: "parasmaipada" },
  "लिखामि": { meaning: "I write", iast: "likhāmi", root: "लिख्", root_iast: "likh", tense: "present", person: "1st", number: "singular", pada: "parasmaipada" },
  "लिखसि": { meaning: "you write", iast: "likhasi", root: "लिख्", root_iast: "likh", tense: "present", person: "2nd", number: "singular", pada: "parasmaipada" },
  "लिखति": { meaning: "he/she/it writes", iast: "likhati", root: "लिख्", root_iast: "likh", tense: "present", person: "3rd", number: "singular", pada: "parasmaipada" },
  "पश्यामि": { meaning: "I see", iast: "paśyāmi", root: "दृश्", root_iast: "dṛś", tense: "present", person: "1st", number: "singular", pada: "parasmaipada" },
  "पश्यसि": { meaning: "you see", iast: "paśyasi", root: "दृश्", root_iast: "dṛś", tense: "present", person: "2nd", number: "singular", pada: "parasmaipada" },
  "पश्यति": { meaning: "he/she/it sees", iast: "paśyati", root: "दृश्", root_iast: "dṛś", tense: "present", person: "3rd", number: "singular", pada: "parasmaipada" },
  "पश्यन्ति": { meaning: "they see", iast: "paśyanti", root: "दृश्", root_iast: "dṛś", tense: "present", person: "3rd", number: "plural", pada: "parasmaipada" },
  "शृणोमि": { meaning: "I hear", iast: "śṛṇomi", root: "श्रु", root_iast: "śru", tense: "present", person: "1st", number: "singular", pada: "parasmaipada" },
  "शृणोति": { meaning: "he/she/it hears", iast: "śṛṇoti", root: "श्रु", root_iast: "śru", tense: "present", person: "3rd", number: "singular", pada: "parasmaipada" },
  "करोमि": { meaning: "I do / make", iast: "karomi", root: "कृ", root_iast: "kṛ", tense: "present", person: "1st", number: "singular", pada: "parasmaipada" },
  "करोषि": { meaning: "you do", iast: "karoṣi", root: "कृ", root_iast: "kṛ", tense: "present", person: "2nd", number: "singular", pada: "parasmaipada" },
  "करोति": { meaning: "he/she/it does", iast: "karoti", root: "कृ", root_iast: "kṛ", tense: "present", person: "3rd", number: "singular", pada: "parasmaipada" },
  "कुर्वन्ति": { meaning: "they do", iast: "kurvanti", root: "कृ", root_iast: "kṛ", tense: "present", person: "3rd", number: "plural", pada: "parasmaipada" },
  "वदामि": { meaning: "I speak / say", iast: "vadāmi", root: "वद्", root_iast: "vad", tense: "present", person: "1st", number: "singular", pada: "parasmaipada" },
  "वदति": { meaning: "he/she/it speaks", iast: "vadati", root: "वद्", root_iast: "vad", tense: "present", person: "3rd", number: "singular", pada: "parasmaipada" },
  "तिष्ठामि": { meaning: "I stand / stay", iast: "tiṣṭhāmi", root: "स्था", root_iast: "sthā", tense: "present", person: "1st", number: "singular", pada: "parasmaipada" },
  "तिष्ठति": { meaning: "he/she/it stands", iast: "tiṣṭhati", root: "स्था", root_iast: "sthā", tense: "present", person: "3rd", number: "singular", pada: "parasmaipada" },
  "गच्छ": { meaning: "go! (imperative sg)", iast: "gaccha", root: "गम्", root_iast: "gam", tense: "imperative", person: "2nd", number: "singular", pada: "parasmaipada" },
  "गच्छत": { meaning: "go! (imperative pl)", iast: "gacchata", root: "गम्", root_iast: "gam", tense: "imperative", person: "2nd", number: "plural", pada: "parasmaipada" },
  "अगच्छम्": { meaning: "I went (imperfect)", iast: "agaccham", root: "गम्", root_iast: "gam", tense: "imperfect", person: "1st", number: "singular", pada: "parasmaipada" },
  "अगच्छत्": { meaning: "he/she/it went (imperfect)", iast: "agacchat", root: "गम्", root_iast: "gam", tense: "imperfect", person: "3rd", number: "singular", pada: "parasmaipada" },
  "अस्ति": { meaning: "there is / he/she/it is", iast: "asti", root: "अस्", root_iast: "as", tense: "present", person: "3rd", number: "singular", pada: "parasmaipada" },
  "सन्ति": { meaning: "they are", iast: "santi", root: "अस्", root_iast: "as", tense: "present", person: "3rd", number: "plural", pada: "parasmaipada" },
  "अस्मि": { meaning: "I am", iast: "asmi", root: "अस्", root_iast: "as", tense: "present", person: "1st", number: "singular", pada: "parasmaipada" },
  "असि": { meaning: "you are (sg)", iast: "asi", root: "अस्", root_iast: "as", tense: "present", person: "2nd", number: "singular", pada: "parasmaipada" },
  "स्मः": { meaning: "we are", iast: "smaḥ", root: "अस्", root_iast: "as", tense: "present", person: "1st", number: "plural", pada: "parasmaipada" },
  "स्थ": { meaning: "you (pl) are", iast: "stha", root: "अस्", root_iast: "as", tense: "present", person: "2nd", number: "plural", pada: "parasmaipada" },
};

const POSTPOSITIONS: Record<string, { meaning: string }> = {
  "उपरि": { meaning: "above / on top of" },
  "अधः": { meaning: "below / under" },
  "पुरतः": { meaning: "in front of" },
  "पश्चात्": { meaning: "behind / after" },
  "समीपे": { meaning: "near" },
  "अन्तः": { meaning: "inside" },
  "बहिः": { meaning: "outside" },
  "अभितः": { meaning: "around / on both sides" },
  "सह": { meaning: "with" },
  "विना": { meaning: "without" },
  "प्रति": { meaning: "towards / per" },
  "उद्दिश्य": { meaning: "regarding / about" },
};

const SANDHI_RULES: { name: string; description: string; example: string }[] = [
  { name: "a + a → ā", description: "अ + अ = आ (similar vowels merge into long)", example: "राम + अर्थ → रामार्थ" },
  { name: "a + i → e", description: "अ + इ = ए (vowel combination)", example: "राम + इच्छा → रामेच्छा" },
  { name: "a + u → o", description: "अ + उ = ओ", example: "राम + उक्त → रामोक्त" },
  { name: "a + e → ai", description: "अ + ए = ऐ", example: "राम + एक → रामैक" },
  { name: "a + o → au", description: "अ + ओ = औ", example: "राम + ओजस् → रामौजस्" },
  { name: "visarga → s", description: "visarga before a hard consonant becomes s", example: "रामः + च → रामश्च" },
  { name: "visarga → r", description: "visarga before a vowel becomes r", example: "रामः + आगच्छति → राम आगच्छति" },
  { name: "visarga drops", description: "visarga drops before a soft consonant", example: "गुरुः + याति → गुरुर्याति" },
];

const EXERCISES: { question: string; options: string[]; answer: number; explanation: string }[] = [
  { question: "What case is 'रामम्' in?", options: ["Nominative", "Accusative", "Genitive", "Locative"], answer: 1, explanation: "'रामम्' is the accusative singular form of 'राम', used for the direct object." },
  { question: "What does 'गच्छति' mean?", options: ["I go", "You go", "He/she/it goes", "They go"], answer: 2, explanation: "'गच्छति' is 3rd person singular present tense of √गम् (to go)." },
  { question: "What is the root of 'पठति'?", options: ["पठ्", "पाठ्", "पठति", "पाठति"], answer: 0, explanation: "The root (धातु) is 'पठ्' meaning 'to read/study'." },
  { question: "'रामः फलम् खादति' — who is eating?", options: ["The fruit", "Rama", "The forest", "The book"], answer: 1, explanation: "रामः is the subject (nominative), so Rama is eating the fruit." },
  { question: "What does 'अहम्' mean?", options: ["You", "He", "I", "We"], answer: 2, explanation: "'अहम्' is the first person singular pronoun meaning 'I'." },
  { question: "Which number is 'गच्छावः'?", options: ["Singular", "Dual", "Plural", "None"], answer: 1, explanation: "The ending '-आवः' indicates first person dual — 'we two go'." },
  { question: "What sandhi is 'रामेच्छा' from?", options: ["a + i → e", "a + u → o", "a + a → ā", "visarga → s"], answer: 0, explanation: "राम (a) + इच्छा (i) → रामेच्छा (e), this is a + i → e sandhi." },
  { question: "'त्वम्' refers to what person?", options: ["1st person", "2nd person", "3rd person", "It is not a person"], answer: 1, explanation: "'त्वम्' is the 2nd person singular pronoun, meaning 'you'." },
];

const GREETINGS: { pattern: RegExp; response: string }[] = [
  { pattern: /^(नमस्ते|नमस्कार|hello|hi|hey)/i, response: "नमस्ते! I am your Sanskrit tutor. You can ask me about word meanings, grammar, verb conjugations, or sentence structure." },
  { pattern: /^(धन्यवाद|thanks|thank you)/i, response: "You're welcome! Feel free to ask more questions about Sanskrit." },
];


const AI_API_KEY = Deno.env.get("AI_API_KEY") || Deno.env.get("OPENAI_API_KEY") || "";
const AI_BASE_URL = (Deno.env.get("AI_BASE_URL") || "https://api.openai.com/v1").replace(/\/$/, "");
const AI_MODEL = Deno.env.get("AI_MODEL") || "google/gemma-4-26b-a4b-it:free";
const AI_TIMEOUT_MS = parseInt(Deno.env.get("AI_TIMEOUT_MS") || "60000");

const CORS_HEADERS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST,OPTIONS", "Access-Control-Allow-Headers": "Authorization,Content-Type,apikey" };

function json(d: unknown, s = 200) { return new Response(JSON.stringify(d), { status: s, headers: { "Content-Type": "application/json", ...CORS_HEADERS } }); }
function err(m: string, s = 400) { return json({ detail: m }, s); }

async function parseBody<T>(r: Request): Promise<T> {
  const ct = r.headers.get("content-type") || "";
  if (ct.includes("application/json")) { const t = await r.text(); return JSON.parse(t); }
  const f = await r.formData(); return Object.fromEntries(f) as T;
}

async function callAI(system: string, user: string, temperature: number): Promise<{ content: string; error?: string; status?: number }> {
  for (let attempt = 0; attempt < 3; attempt++) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), Math.min(AI_TIMEOUT_MS, 20000));
    try {
      const res = await fetch(`${AI_BASE_URL}/chat/completions`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + AI_API_KEY },
        body: JSON.stringify({ model: AI_MODEL, messages: [{ role: "system", content: system }, { role: "user", content: user }], temperature, max_tokens: 2048 }),
        signal: ctrl.signal,
      });
      if (!res.ok) { const t = await res.text().catch(() => ""); return { content: "", error: `AI service error: ${res.status}${t ? " - " + t.slice(0, 200) : ""}`, status: res.status }; }
      const data = await res.json();
      const msg = data?.choices?.[0]?.message || {};
      const content = (msg?.content || msg?.reasoning || "").trim();
      if (content) return { content };
    } catch (e) {
      if (attempt === 2) return { content: "", error: e instanceof Error && e.name === "AbortError" ? "AI request timed out" : "AI request failed" };
    } finally {
      clearTimeout(timer);
    }
    await new Promise((r) => setTimeout(r, 800 * (attempt + 1)));
  }
  return { content: "", error: "AI returned an empty response after retries" };
}

function offlineLookup(text: string): { t: string; unknown: number } {
  const tokens = text.split(/[\s,.;:!?]+/).filter(Boolean);
  const parts: string[] = [];
  let found = 0;
  for (const w of tokens) {
    const clean = w.replace(/[।॥,.?!]/g, "");
    if (!clean) { parts.push(w); continue; }
    const v = VERBS[clean];
    if (v) { parts.push(`${clean} → ${v.iast} (${v.meaning})`); found++; continue; }
    const d = DICT[clean];
    if (d) { parts.push(`${clean} → ${d.iast} (${d.meaning})`); found++; continue; }
    parts.push(w);
  }
  return { t: parts.join(" | "), unknown: tokens.length - found };
}

Deno.serve(async (req: Request) => {
  const url = new URL(req.url);
  const path = url.pathname.replace(/^\/[^\/]+\/?/, "");
  const method = req.method;

  try {
    if (method === "OPTIONS") return new Response(null, { status: 204, headers: CORS_HEADERS });
    if (!AI_API_KEY) return err("AI service not configured: set AI_API_KEY secret", 503);

    if ((path === "tutor/chat" || path === "chat") && method === "POST") {
      const body = await parseBody(req);
      const lang = body.language || "sa";
      const diff = body.difficulty || "beginner";
      const system = `You are a ${lang} language tutor. Answer concisely for a ${diff} learner. Return valid JSON only: {"reply":"...","difficulty":"...","suggested_exercise":null}`;
      const history: { role: string; content: string }[] = Array.isArray(body.messages) && body.messages.length ? body.messages.slice(-8) : (body.message ? [{ role: "user", content: body.message }] : []);
      if (!history.length) return err("message required", 400);
      const last = history[history.length - 1]?.content || "";
      const user = `Conversation so far:\n${history.map((m) => m.role + ": " + m.content).join("\n")}`;
      const ai = await callAI(system, user, 0.7);
      if (ai.error) {
        const lookup = offlineLookup(last);
        const reply = lookup.unknown === 0
          ? `Offline lookup: ${lookup.t}`
          : `AI services are offline right now. ${lookup.unknown} word${lookup.unknown === 1 ? "" : "s"} found in the offline dictionary: ${lookup.t}`;
        return json({ reply, citations: [], difficulty: diff, suggested_exercise: null, mode: "tutor", provider: "offline-dict" });
      }
      const txt = ai.content;
      try { const j = JSON.parse(txt.replace(/```json\s*|```\s*/g, "").trim()); return json({ reply: j.reply || txt, citations: [], difficulty: j.difficulty || diff, suggested_exercise: j.suggested_exercise || null, mode: "tutor" }); }
      catch { return json({ reply: txt || "I'm having trouble responding right now.", citations: [], difficulty: diff, suggested_exercise: null, mode: "tutor" }); }
    }

    if ((path === "tutor/translate" || path === "translate") && method === "POST") {
      const body = await parseBody(req);
      const src = body.source || url.searchParams.get("source") || "sa";
      const tgt = body.target || url.searchParams.get("target") || "en";
      const prompt = `Translate this ${src} text to ${tgt}. Return ONLY valid JSON: {"translated_text":"...","word_count":N}`;
      const dt = body.text || url.searchParams.get("text") || "";
      if (!dt) return err("text required", 400);
      const ai = await callAI(prompt, dt, 0.3);
      if (ai.error) {
        const fallback = offlineLookup(dt);
        return json({ translated_text: fallback.t, word_count: dt.split(/\s+/).filter(Boolean).length, source: src, target: tgt, provider: "offline-dict", offline: true });
      }
      const txt = ai.content;
      try { const j = JSON.parse(txt.replace(/```json\s*|```\s*/g, "").trim()); return json({ translated_text: j.translated_text || txt, word_count: j.word_count || 0, source: src, target: tgt }); }
      catch { return json({ translated_text: txt, word_count: 0, source: src, target: tgt }); }
    }

    return err("Not found", 404);
  } catch (e) {
    return err(e instanceof Error ? e.message : "Internal server error", 500);
  }
});
