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
 * Clean up text content by removing printer artifacts like reprint dates, page markers, indd lines
 */
export function cleanChapterText(rawText) {
  if (!rawText) return "";
  return rawText
    .split("\n")
    .filter((line) => {
      const trimmed = line.trim();
      if (!trimmed) return true;
      if (/Reprint\s+\d{4}-\d{2}/i.test(trimmed)) return false;
      if (/\.indd\s+\d+/i.test(trimmed)) return false;
      if (/Rationalised\s+\d{4}-\d{2}/i.test(trimmed)) return false;
      return true;
    })
    .join("\n");
}
