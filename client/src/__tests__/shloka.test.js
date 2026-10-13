import { describe, it, expect, beforeEach, vi } from "vitest";
import { SHLOKAS, SHLOKA_CATEGORIES } from "../data/shlokas";
import { shlokaReciter } from "../services/recitationAudio";

describe("Sanskrit Shloka Recitation Dataset & Categories", () => {
  it("should have all 6 required categories plus all view", () => {
    const categoryIds = SHLOKA_CATEGORIES.map((c) => c.id);
    expect(categoryIds).toContain("all");
    expect(categoryIds).toContain("devotion");
    expect(categoryIds).toContain("knowledge");
    expect(categoryIds).toContain("wisdom");
    expect(categoryIds).toContain("peace");
    expect(categoryIds).toContain("morals");
    expect(categoryIds).toContain("daily");
  });

  it("should contain shlokas belonging to each required category", () => {
    const required = ["devotion", "knowledge", "wisdom", "peace", "morals", "daily"];
    for (const cat of required) {
      const inCat = SHLOKAS.filter((s) => s.category === cat);
      expect(inCat.length).toBeGreaterThan(0);
    }
  });

  it("should verify each shloka contains accurate Devanagari, IAST, translation, and source", () => {
    for (const s of SHLOKAS) {
      expect(s.id).toBeDefined();
      expect(s.dev).toBeTruthy();
      expect(s.iast).toBeTruthy();
      expect(s.translation).toBeTruthy();
      expect(s.source).toBeTruthy();
      expect(s.category).toBeTruthy();
      expect(s.categoryLabel).toBeTruthy();
    }
  });

  it("should have word breakdown for interactive dictionary exploration", () => {
    const sample = SHLOKAS.find((s) => s.id === "shloka-gayatri");
    expect(sample).toBeDefined();
    expect(sample.words).toBeDefined();
    expect(sample.words.length).toBeGreaterThan(0);
    expect(sample.words[0]).toHaveProperty("word");
    expect(sample.words[0]).toHaveProperty("meaning");
  });
});

describe("Shloka Reciter Audio Controller", () => {
  beforeEach(() => {
    shlokaReciter.stop();
  });

  it("should initialize in idle state", () => {
    const state = shlokaReciter.getState();
    expect(state.status).toBe("idle");
    expect(state.isPlaying).toBe(false);
    expect(state.isPaused).toBe(false);
  });

  it("should handle error state when playing empty text", () => {
    let lastState = null;
    const unsub = shlokaReciter.subscribe((s) => {
      lastState = s;
    });

    shlokaReciter.play("test-empty", "");
    expect(lastState.status).toBe("error");
    expect(lastState.errorMessage).toContain("No shloka text");
    unsub();
  });

  it("should support stop and reset to idle", () => {
    shlokaReciter.stop();
    const state = shlokaReciter.getState();
    expect(state.status).toBe("idle");
    expect(state.currentId).toBe(null);
  });
});
