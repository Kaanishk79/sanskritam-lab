import { describe, it, expect } from "vitest";
import monierData from "../data/monier_core.json";
import { toDevanagari } from "../services/sanskrit";

// Test the search logic used in DictionaryPage.jsx
function searchLocalMonier(monierList, query) {
  if (!monierList || !monierList.length) return [];
  const trimmed = (query || "").trim();
  if (!trimmed) {
    return monierList.slice(0, 40).map((e, idx) => ({
      id: `mw-${idx}-${e.word}`,
      word: e.word,
      iast: e.iast,
      pos: e.pos,
      meanings: e.meanings,
      raw_def: e.raw_def,
      source: "Monier-Williams"
    }));
  }

  const qLower = trimmed.toLowerCase();
  const devQuery = toDevanagari(trimmed);

  const scored = [];
  for (let i = 0; i < monierList.length; i++) {
    const entry = monierList[i];
    const word = entry.word || "";
    const iast = (entry.iast || "").toLowerCase();

    let score = 0;

    // Exact matches
    if (word === trimmed || (devQuery && word === devQuery) || iast === qLower) {
      score = 100;
    } else if (word.startsWith(trimmed) || (devQuery && word.startsWith(devQuery)) || iast.startsWith(qLower)) {
      score = 80;
    } else if (word.includes(trimmed) || (devQuery && word.includes(devQuery)) || iast.includes(qLower)) {
      score = 60;
    } else if (entry.meanings?.some((m) => m.toLowerCase() === qLower)) {
      score = 50;
    } else if (entry.meanings?.some((m) => m.toLowerCase().includes(qLower))) {
      score = 40;
    } else if (entry.raw_def && entry.raw_def.toLowerCase().includes(qLower)) {
      score = 20;
    }

    if (score > 0) {
      scored.push({ entry, score });
    }
  }

  scored.sort((a, b) => b.score - a.score || a.entry.word.length - b.entry.word.length);

  return scored.slice(0, 50).map(({ entry }, idx) => ({
    id: `mw-${idx}-${entry.word}`,
    word: entry.word,
    iast: entry.iast,
    pos: entry.pos,
    meanings: entry.meanings,
    raw_def: entry.raw_def,
    source: "Monier-Williams"
  }));
}

describe("Monier-Williams (MW) Dictionary Data & Search", () => {
  it("contains comprehensive dictionary entries across the Sanskrit alphabet", () => {
    expect(monierData.length).toBeGreaterThan(50000);
    // Check that consonants and vowels across the alphabet exist
    const startingLetters = new Set(monierData.map((e) => e.word?.[0]));
    expect(startingLetters.has("अ")).toBe(true);
    expect(startingLetters.has("क")).toBe(true);
    expect(startingLetters.has("ग")).toBe(true);
    expect(startingLetters.has("ज")).toBe(true);
    expect(startingLetters.has("द")).toBe(true);
    expect(startingLetters.has("न")).toBe(true);
    expect(startingLetters.has("प")).toBe(true);
    expect(startingLetters.has("र")).toBe(true);
    expect(startingLetters.has("व")).toBe(true);
    expect(startingLetters.has("श")).toBe(true);
    expect(startingLetters.has("स")).toBe(true);
  });

  it("finds key Sanskrit headwords in Devanagari", () => {
    const rama = searchLocalMonier(monierData, "राम");
    expect(rama.length).toBeGreaterThan(0);
    expect(rama[0].word).toBe("राम");
    expect(rama[0].source).toBe("Monier-Williams");

    const guru = searchLocalMonier(monierData, "गुरु");
    expect(guru.length).toBeGreaterThan(0);
    expect(guru[0].word).toBe("गुरु");

    const vidya = searchLocalMonier(monierData, "विद्या");
    expect(vidya.length).toBeGreaterThan(0);
    expect(vidya[0].word).toBe("विद्या");
  });

  it("finds headwords using IAST transliteration", () => {
    const yoga = searchLocalMonier(monierData, "yoga");
    expect(yoga.length).toBeGreaterThan(0);
    expect(yoga[0].word).toBe("योग");

    const satya = searchLocalMonier(monierData, "satya");
    expect(satya.length).toBeGreaterThan(0);
    expect(satya[0].word).toBe("सत्य");
  });

  it("finds Sanskrit words from English meanings", () => {
    const teacher = searchLocalMonier(monierData, "teacher");
    expect(teacher.length).toBeGreaterThan(0);
    const hasGuru = teacher.some((e) => e.word === "गुरु");
    expect(hasGuru).toBe(true);

    const book = searchLocalMonier(monierData, "book");
    expect(book.length).toBeGreaterThan(0);
    const hasPustaka = book.some((e) => e.word === "पुस्तक");
    expect(hasPustaka).toBe(true);

    const knowledge = searchLocalMonier(monierData, "knowledge");
    expect(knowledge.length).toBeGreaterThan(0);
    const hasVidyaOrJnana = knowledge.some((e) => e.word === "विद्या" || e.word === "ज्ञान");
    expect(hasVidyaOrJnana).toBe(true);
  });

  it("categorizes all 59,995 words by their starting Sanskrit Varn (alphabet letter)", () => {
    const varnaMap = {};
    for (let i = 0; i < monierData.length; i++) {
      const e = monierData[i];
      if (!e.word) continue;
      const v = e.word[0];
      if (!varnaMap[v]) varnaMap[v] = [];
      varnaMap[v].push(e);
    }

    // Verify key Sanskrit phonetic classes have thousands of categorized words
    expect(varnaMap["अ"].length).toBeGreaterThan(10000);
    expect(varnaMap["स"].length).toBeGreaterThan(6000);
    expect(varnaMap["प"].length).toBeGreaterThan(5000);
    expect(varnaMap["क"].length).toBeGreaterThan(4000);
    expect(varnaMap["म"].length).toBeGreaterThan(2000);
    expect(varnaMap["र"].length).toBeGreaterThan(1000);
    expect(varnaMap["ग"].length).toBeGreaterThan(1000);
    expect(varnaMap["ह"].length).toBeGreaterThan(1000);

    // Verify all words in 'क' actually start with 'क'
    const allStartWithKa = varnaMap["क"].every((e) => e.word.startsWith("क"));
    expect(allStartWithKa).toBe(true);

    // Verify all words in 'स' actually start with 'स'
    const allStartWithSa = varnaMap["स"].every((e) => e.word.startsWith("स"));
    expect(allStartWithSa).toBe(true);
  });

  it("allows sub-searching within a specific Varn category", () => {
    const kaWords = monierData.filter((e) => e.word && e.word.startsWith("क"));
    const karmaInKa = searchLocalMonier(kaWords, "कर्म");
    expect(karmaInKa.length).toBeGreaterThan(0);
    expect(karmaInKa[0].word).toBe("कर्म");
    // Verify results are strictly within 'क'
    expect(karmaInKa.every((e) => e.word.startsWith("क"))).toBe(true);

    // Searching within 'क' for a non-existent word returns 0
    const nonexistentInKa = searchLocalMonier(kaWords, "xyznonexistent");
    expect(nonexistentInKa.length).toBe(0);
  });
});


