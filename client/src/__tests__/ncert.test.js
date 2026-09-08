import { describe, it, expect } from "vitest";
import { books, chapters, grammarBooks, ncertPdfCodes, ncertChapterPdfUrl } from "../data/books";
import {
  ncertTextBookMap,
  getChapterTextUrl,
  getChapterPdfUrl,
  cleanChapterText
} from "../data/ncertBooksTextIndex";

describe("NCERT Books and Chapters Dataset", () => {
  const ncertBooks = books.filter((b) => b.category === "textbook" && b.id.startsWith("ncert-"));
  const ncertGrammar = grammarBooks.filter((g) => g.id.startsWith("ncert-"));

  it("includes all 10 NCERT textbooks across Classes 6 to 12", () => {
    const ids = ncertBooks.map((b) => b.id);
    expect(ids).toContain("ncert-deepakam-6");
    expect(ids).toContain("ncert-deepakam-7");
    expect(ids).toContain("ncert-deepakam-8");
    expect(ids).toContain("ncert-shemushi-9");
    expect(ids).toContain("ncert-sharada-9");
    expect(ids).toContain("ncert-shemushi-10");
    expect(ids).toContain("ncert-bhaswati-11");
    expect(ids).toContain("ncert-shashwati-11");
    expect(ids).toContain("ncert-bhaswati-12");
    expect(ids).toContain("ncert-shashwati-12");
    expect(ncertBooks.length).toBe(10);
  });

  it("includes NCERT Vyakaranavithi in grammar books and master chapters", () => {
    const grammarIds = ncertGrammar.map((g) => g.id);
    expect(grammarIds).toContain("ncert-vyakaranavithi");
    expect(chapters["ncert-vyakaranavithi"]).toBeDefined();
    expect(chapters["ncert-vyakaranavithi"].length).toBe(12);
  });

  it("every NCERT book has a populated chapters array matching totalChapters", () => {
    for (const book of ncertBooks) {
      const bookChapters = chapters[book.id];
      expect(bookChapters, `Chapters missing for book ${book.id}`).toBeDefined();
      expect(Array.isArray(bookChapters)).toBe(true);
      expect(bookChapters.length).toBe(book.totalChapters);

      bookChapters.forEach((ch, idx) => {
        expect(ch.id).toBeDefined();
        expect(ch.bookId).toBe(book.id);
        expect(ch.chapterNumber).toBe(idx + 1);
        expect(ch.title).toBeTruthy();
        expect(ch.titleSanskrit).toBeTruthy();
        // Devanagari regex test
        expect(/[\u0900-\u097F]/.test(ch.titleSanskrit), `titleSanskrit should contain Devanagari characters: ${ch.titleSanskrit}`).toBe(true);
      });
    }
  });

  it("all NCERT books have valid official PDF codes and generate valid URLs", () => {
    for (const book of ncertBooks) {
      expect(ncertPdfCodes[book.id], `Missing ncertPdfCode for ${book.id}`).toBeDefined();
      const ch1Url = ncertChapterPdfUrl(book.id, 1);
      expect(ch1Url).toMatch(/^https:\/\/ncert\.nic\.in\/textbook\/pdf\/[a-z0-9]{5}01\.pdf$/);
    }
  });
});

describe("NCERT Text Book Map & URL Resolution", () => {
  it("resolves text URLs for digitized books (classes 6-9 and Vyakaranavithi)", () => {
    expect(getChapterTextUrl("ncert-deepakam-6", 1)).toBe("/books-data/class6/fsde101.txt");
    expect(getChapterTextUrl("ncert-deepakam-7", 2)).toBe("/books-data/class7/gsde102.txt");
    expect(getChapterTextUrl("ncert-deepakam-8", 16)).toBe("/books-data/class8/hsde116.txt");
    expect(getChapterTextUrl("ncert-shemushi-9", 1)).toBe("/books-data/class9/ihsh101.txt");
    expect(getChapterTextUrl("ncert-sharada-9", 1)).toBe("/books-data/class9/ihsh101.txt");
    expect(getChapterTextUrl("ncert-vyakaranavithi", 12)).toBe("/books-data/class9&10grammar/jhva112.txt");
  });

  it("returns null text URL for PDF-only books or invalid chapter numbers", () => {
    expect(getChapterTextUrl("ncert-shemushi-10", 1)).toBeNull();
    expect(getChapterTextUrl("ncert-bhaswati-11", 1)).toBeNull();
    expect(getChapterTextUrl("ncert-deepakam-6", 99)).toBeNull();
    expect(getChapterTextUrl("ncert-deepakam-6", 0)).toBeNull();
    expect(getChapterTextUrl("invalid-book", 1)).toBeNull();
  });

  it("generates correct official NCERT chapter PDF URLs via getChapterPdfUrl", () => {
    expect(getChapterPdfUrl("ncert-shemushi-10", 5)).toBe("https://ncert.nic.in/textbook/pdf/jhsk105.pdf");
    expect(getChapterPdfUrl("ncert-bhaswati-11", 1)).toBe("https://ncert.nic.in/textbook/pdf/khsk101.pdf");
    expect(getChapterPdfUrl("ncert-shashwati-12", 11)).toBe("https://ncert.nic.in/textbook/pdf/lhsk211.pdf");
  });

  it("cleanChapterText cleans and normalizes OCR artifacts", () => {
    const dirty = "  प्रथमः पाठः   \r\n\r\n\r\n\r\n  विद्या ददाति विनयं ।   \r\n";
    const cleaned = cleanChapterText(dirty);
    expect(cleaned).toContain("प्रथमः पाठः");
    expect(cleaned).toContain("विद्या ददाति विनयं ।");
    expect(cleaned).not.toContain("\r");
    expect(cleaned.indexOf("\n\n\n")).toBe(-1);
  });
});
