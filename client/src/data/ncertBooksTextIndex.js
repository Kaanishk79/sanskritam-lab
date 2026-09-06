/**
 * Index and resolver for NCERT Sanskrit full-text chapter files
 */

export const ncertTextBookMap = {
  "ncert-deepakam-6": {
    folder: "class6",
    prefix: "fsde1",
    totalChapters: 16,
    hasIntro: true,
    title: "दीपकम - भाग १ (कक्षा ६)"
  },
  "ncert-deepakam-7": {
    folder: "class7",
    prefix: "gsde1",
    totalChapters: 15,
    hasIntro: true,
    title: "दीपकम - भाग २ (कक्षा ७)"
  },
  "ncert-deepakam-8": {
    folder: "class8",
    prefix: "hsde1",
    totalChapters: 16,
    hasIntro: true,
    title: "दीपकम - भाग ३ (कक्षा ८)"
  },
  "ncert-shemushi-9": {
    folder: "class9",
    prefix: "ihsh1",
    totalChapters: 16,
    hasIntro: true,
    title: "शेमुषी - प्रथमो भागः (कक्षा ९)"
  },
  "ncert-vyakaranavithi": {
    folder: "class9&10grammar",
    prefix: "jhva1",
    totalChapters: 12,
    hasIntro: true,
    title: "व्याकरणवीथिः (कक्षा ९-१०)"
  }
};

/**
 * Returns the public URL to fetch the chapter's raw text
 */
export function getChapterTextUrl(bookId, chapterNum) {
  const meta = ncertTextBookMap[bookId];
  if (!meta) return null;
  const num = parseInt(chapterNum, 10);
  if (isNaN(num) || num < 1 || num > meta.totalChapters) return null;
  const chStr = String(num).padStart(2, "0");
  return `/books-data/${meta.folder}/${meta.prefix}${chStr}.txt`;
}

/**
 * Clean up and normalize Sanskrit Devanagari text content
 */
export function cleanChapterText(rawText) {
  if (!rawText) return "";

  // 1. Remove InDesign printer/export headers and metadata lines
  let text = rawText
    .split("\n")
    .filter((line) => {
      const trimmed = line.trim();
      if (!trimmed) return true;
      if (/Reprint\s+\d{4}-\d{2}/i.test(trimmed)) return false;
      if (/\.indd\s+\d+/i.test(trimmed)) return false;
      if (/Rationalised\s+\d{4}-\d{2}/i.test(trimmed)) return false;
      if (/^\d{1,3}\s*$/.test(trimmed)) return false;
      return true;
    })
    .join("\n");

  // 2. Normalize whitespace artifacts
  text = text
    .replace(/\t/g, " ")
    .replace(/[\u2009\u200a\u200b]/g, "")
    .replace(/\u00a0/g, " ");

  // 3. Fix split repha: [Char]र\s+[Consonant]्[Matra]? -> [Char]र्[Consonant][Matra]?
  text = text.replace(
    /([\u0900-\u094C\u094E-\u097F])र\s+([\u0915-\u0939])्([ािीुूृॄेैोौंःँ]?)/g,
    (_, prefix, targetCons, trailing) => `${prefix}र्${targetCons}${trailing || ""}`
  );

  // 4. Reconnect broken word linebreaks
  text = text
    .replace(/([\u0900-\u097F]्)\n\s*([\u0900-\u097F])/g, "$1$2")
    .replace(/([\u0900-\u097F])\n\s*([ािीुूृॄेैोौ्ंःँ])/g, "$1$2");

  // 5. Fix split halants
  text = text
    .replace(/([\u0900-\u097F])\s+्/g, "$1्")
    .replace(/्\s+([\u0900-\u097F])/g, "्$1");

  // 6. Fix split matras
  text = text.replace(/([\u0900-\u097F])\s+([ािीुूृॄेैोौ])/g, "$1$2");

  // 7. Fix split anusvara / visarga / chandrabindu
  text = text
    .replace(/([\u0900-\u097F])\s+([ंःँ])/g, "$1$2")
    .replace(/\s+([ंःँ])([\u0900-\u097F])/g, "$1$2");

  // 8. Collapse spaces and excessive blank lines
  text = text
    .replace(/[ ]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n");

  return text.trim();
}
