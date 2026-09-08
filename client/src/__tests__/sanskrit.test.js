import { describe, it, expect } from "vitest";
import {
  toIAST,
  toDevanagari,
  tryJoinSandhi,
  endsWithVowel,
  startsWithVowel
} from "../services/sanskrit";

describe("toIAST Transliteration", () => {
  it("transliterates independent vowels correctly", () => {
    expect(toIAST("अ")).toBe("a");
    expect(toIAST("आ")).toBe("ā");
    expect(toIAST("इ")).toBe("i");
    expect(toIAST("ई")).toBe("ī");
    expect(toIAST("उ")).toBe("u");
    expect(toIAST("ऊ")).toBe("ū");
    expect(toIAST("ऋ")).toBe("ṛ");
    expect(toIAST("ए")).toBe("e");
    expect(toIAST("ऐ")).toBe("ai");
    expect(toIAST("ओ")).toBe("o");
    expect(toIAST("औ")).toBe("au");
  });

  it("transliterates words with ligatures and virama accurately", () => {
    expect(toIAST("राम")).toBe("rāma");
    expect(toIAST("रामः")).toBe("rāmaḥ");
    expect(toIAST("रामम्")).toBe("rāmam");
    expect(toIAST("अग्नि")).toBe("agni");
    expect(toIAST("विद्या")).toBe("vidyā");
    expect(toIAST("कृष्ण")).toBe("kṛṣṇa");
  });
});

describe("toDevanagari Transliteration", () => {
  it("converts simple words correctly", () => {
    expect(toDevanagari("rāma")).toBe("राम");
    expect(toDevanagari("guru")).toBe("गुरु");
    expect(toDevanagari("deva")).toBe("देव");
  });

  it("does not strip valid diacritic characters", () => {
    expect(toDevanagari("kṛṣṇa")).toBe("कृष्ण");
    expect(toDevanagari("rāmaḥ")).toBe("रामः");
  });
});

describe("Vowel Boundary Detection", () => {
  it("detects word endings", () => {
    expect(endsWithVowel("राम")).toBe("a");
    expect(endsWithVowel("रमा")).toBe("ā");
    expect(endsWithVowel("हरि")).toBe("i");
    expect(endsWithVowel("नदी")).toBe("ī");
    expect(endsWithVowel("गुरु")).toBe("u");
    expect(endsWithVowel("वाक्")).toBeNull();
  });

  it("detects word starts", () => {
    expect(startsWithVowel("अग्नि")).toBe("a");
    expect(startsWithVowel("आदि")).toBe("ā");
    expect(startsWithVowel("इव")).toBe("i");
    expect(startsWithVowel("राम")).toBeNull();
  });
});

describe("Sandhi Engine (tryJoinSandhi)", () => {
  it("handles Dīrgha Sandhi (सवर्णदीर्घः)", () => {
    const r1 = tryJoinSandhi("राम", "अग्र");
    expect(r1.ok).toBe(true);
    expect(r1.result).toBe("रामाग्र");

    const r2 = tryJoinSandhi("अग्नि", "इव");
    expect(r2.ok).toBe(true);
    expect(r2.result).toBe("अग्नीव");

    const r3 = tryJoinSandhi("विद्या", "आलयः");
    expect(r3.ok).toBe(true);
    expect(r3.result).toBe("विद्यालयः");
  });

  it("handles Guṇa Sandhi (आद्गुणः)", () => {
    const r1 = tryJoinSandhi("देव", "इन्द्रः");
    expect(r1.ok).toBe(true);
    expect(r1.result).toBe("देवेन्द्रः");

    const r2 = tryJoinSandhi("सूर्य", "उदयः");
    expect(r2.ok).toBe(true);
    expect(r2.result).toBe("सूर्योदयः");
  });

  it("handles Vṛddhi Sandhi (वृद्धिरेचि)", () => {
    const r = tryJoinSandhi("सदा", "एव");
    expect(r.ok).toBe(true);
    expect(r.result).toBe("सदैव");
  });

  it("handles Yaṇ Sandhi (इको यणचि)", () => {
    const r1 = tryJoinSandhi("इति", "आदि");
    expect(r1.ok).toBe(true);
    expect(r1.result).toBe("इत्यादि");

    const r2 = tryJoinSandhi("इति", "अत्र");
    expect(r2.ok).toBe(true);
    expect(r2.result).toBe("इत्यत्र");

    const r3 = tryJoinSandhi("प्रति", "एकम्");
    expect(r3.ok).toBe(true);
    expect(r3.result).toBe("प्रत्येकम्");
  });

  it("handles Jash-tva Consonant Sandhi (झलां जशोऽन्ते)", () => {
    const r1 = tryJoinSandhi("वाक्", "ईशः");
    expect(r1.ok).toBe(true);
    expect(r1.result).toBe("वागीशः");

    const r2 = tryJoinSandhi("सत्", "आनन्दः");
    expect(r2.ok).toBe(true);
    expect(r2.result).toBe("सदानन्दः");

    const r3 = tryJoinSandhi("दिक्", "गजः");
    expect(r3.ok).toBe(true);
    expect(r3.result).toBe("दिग्गजः");
  });
});
