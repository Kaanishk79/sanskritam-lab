import { useState, useEffect } from "react";
import { BookOpen, School, ArrowLeft, X } from "lucide-react";
import { books, chapters, grammarBooks, bookHi } from "../../data/books";
import { useLanguage } from "../../context/LanguageContext";
import { fetchBookChapters, fetchChapterVerses } from "../../services/data";
import { DynamicIcon } from "../../components/icons";
import ChapterTextReader from "../../components/ChapterTextReader";
const categories = [
  { id: "all", label: "All Books", icon: "book" },
  { id: "children", label: "Children", icon: "smile" },
  { id: "textbook", label: "Textbook", icon: "book" },
  { id: "teen", label: "Teen", icon: "student" },
  { id: "classical", label: "Classical", icon: "manuscript" },
  { id: "grammar", label: "Grammar", icon: "grammar" },
  { id: "philosophy", label: "Philosophy", icon: "philosophy" },
  { id: "poetry", label: "Poetry", icon: "feathers" },
  { id: "drama", label: "Drama", icon: "shloka" },
  { id: "reference", label: "Reference", icon: "book" },
  { id: "commentary", label: "Commentary", icon: "quote" }
];
const levelLabels = ["Child", "Teen", "Undergrad", "Adv. Undergrad", "Graduate", "PhD"];
const govClassLabels = [
  { key: 1, label: "Class 1-2" },
  { key: 2, label: "Class 3-5" },
  { key: 6, label: "Class 6 (NCERT)" },
  { key: 7, label: "Class 7 (NCERT)" },
  { key: 8, label: "Class 8 (NCERT)" },
  { key: 9, label: "Class 9 (NCERT)" },
  { key: 10, label: "Class 10 (NCERT)" },
  { key: 11, label: "Class 11 (NCERT)" },
  { key: 12, label: "Class 12 (NCERT)" },
  { key: 13, label: "BA 1st Year (Govt)" },
  { key: 14, label: "BA 2nd Year (Govt)" },
  { key: 15, label: "BA 3rd Year (Govt)" },
  { key: 16, label: "MA Previous (Govt)" },
  { key: 17, label: "MA Final (Govt)" },
  { key: 18, label: "MPhil (Govt)" },
  { key: 19, label: "PhD (Govt)" }
];
function isInGovClass(book, govClass) {
  return book.govClassMin <= govClass && book.govClassMax >= govClass;
}
function BookshelfPage() {
  const { t, lang } = useLanguage();
  const formatGovClassRange = (min, max) => {
    if (min === max) {
      const found = govClassLabels.find((g) => g.key === min);
      if (found) return t(found.label);
      return t("Class {0}").replace("{0}", String(min));
    }
    const start = govClassLabels.find((g) => g.key === min);
    const end = govClassLabels.find((g) => g.key === max);
    if (start && end) return `${t(start.label)} \u2013 ${t(end.label)}`;
    if (start) return `${t(start.label)}+`;
    return t("Class {0}-{1}").replace("{0}", String(min)).replace("{1}", String(max));
  };
  const [viewMode, setViewMode] = useState("govclass");
  const [category, setCategory] = useState("all");
  const [levelFilter, setLevelFilter] = useState(null);
  const [govClassFilter, setGovClassFilter] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedGrammar, setSelectedGrammar] = useState(null);
  const [bookChapters, setBookChapters] = useState([]);
  const [chaptersLoading, setChaptersLoading] = useState(false);
  const [openChapter, setOpenChapter] = useState(null);
  const [chapterVerses, setChapterVerses] = useState([]);
  const [versesLoading, setVersesLoading] = useState(false);
  useEffect(() => {
    if (!selectedBook) return;
    const local = chapters[selectedBook.id] || [];
    setBookChapters(local);
    setOpenChapter(null);
    setChapterVerses([]);
    setChaptersLoading(true);
    fetchBookChapters(selectedBook.id).then((dbChapters) => {
      if (dbChapters && dbChapters.length > 0) {
        setBookChapters(dbChapters);
        return;
      }
      if (local.length === 0 && selectedBook.totalChapters > 0) {
        setBookChapters(
          Array.from({ length: selectedBook.totalChapters }, (_, i) => ({
            id: `${selectedBook.id}-ch-${i + 1}`,
            bookId: selectedBook.id,
            chapterNumber: i + 1,
            title: `${t("Chapter")} ${i + 1}`,
            titleSanskrit: "",
            verseCount: 0,
            contentPreview: t("Full text available in the database corpus")
          }))
        );
      }
    }).finally(() => setChaptersLoading(false));
  }, [selectedBook]);
  useEffect(() => {
    if (!selectedBook || !openChapter) {
      setChapterVerses([]);
      return;
    }
    setVersesLoading(true);
    fetchChapterVerses(selectedBook.id, openChapter.chapterNumber).then((verses) => setChapterVerses(verses)).finally(() => setVersesLoading(false));
  }, [selectedBook, openChapter]);
  const filtered = books.filter((b) => {
    if (viewMode === "category") {
      if (category !== "all" && b.category !== category) return false;
      if (levelFilter !== null && (b.levelMin > levelFilter || b.levelMax < levelFilter)) return false;
    }
    if (viewMode === "govclass" && govClassFilter !== null) {
      if (!isInGovClass(b, govClassFilter)) return false;
    }
    return true;
  }).sort((a, b) => a.sortOrder - b.sortOrder);
  return <div className="page-container">
      <div className="page-header">
        <h2>{t("Bookshelf \u2014 Complete Curriculum")}</h2>
        <p>{t("Browse all Sanskrit texts organized by class \u2014 from Class 1 NCERT to PhD government syllabus")}</p>
      </div>

      {!selectedBook && !selectedGrammar && <>
          <div className="bookshelf-filters">
            <div className="bookshelf-categories">
              <button className={`btn btn-sm ${viewMode === "govclass" ? "btn-primary" : "btn-secondary"}`} onClick={() => {
    setViewMode("govclass");
    setGovClassFilter(null);
  }} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <School size={14} /> <span>{t("By Class")}</span>
              </button>
              <button className={`btn btn-sm ${viewMode === "category" ? "btn-primary" : "btn-secondary"}`} onClick={() => {
    setViewMode("category");
    setCategory("all");
    setLevelFilter(null);
  }} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <BookOpen size={14} /> <span>{t("By Category")}</span>
              </button>
            </div>

            {viewMode === "category" && <>
                <div className="bookshelf-categories">
                  {categories.map((c) => <button key={c.id} className={`btn btn-sm ${category === c.id ? "btn-primary" : "btn-secondary"}`} onClick={() => setCategory(c.id)} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                      <DynamicIcon name={c.icon} size={14} /> <span>{t(c.label)}</span>
                    </button>)}
                </div>
                <div className="bookshelf-levels">
                  <span>{t("Level:")}</span>
                  {levelLabels.map((l, i) => <button key={i} className={`btn btn-xs ${levelFilter === i ? "btn-primary" : "btn-outline"}`} onClick={() => setLevelFilter(levelFilter === i ? null : i)}>
                      {t(l)}
                    </button>)}
                  {levelFilter !== null && <button className="btn btn-xs btn-outline" onClick={() => setLevelFilter(null)} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><X size={12} /> <span>{t("Clear")}</span></button>}
                </div>
              </>}

            {viewMode === "govclass" && <div className="bookshelf-levels">
                {govClassLabels.map((g) => <button key={g.key} className={`btn btn-xs ${govClassFilter === g.key ? "btn-primary" : "btn-outline"}`} onClick={() => setGovClassFilter(govClassFilter === g.key ? null : g.key)}>
                    {t(g.label)}
                  </button>)}
                {govClassFilter !== null && <button className="btn btn-xs btn-outline" onClick={() => setGovClassFilter(null)} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><X size={12} /> <span>{t("Clear")}</span></button>}
              </div>}
          </div>

          <div className="bookshelf-grid">
            {filtered.map((book) => <div key={book.id} className="book-card" onClick={() => setSelectedBook(book)}>
                <div className="book-icon" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                  <DynamicIcon name={book.category || "book"} size={24} />
                </div>
                <div className="book-info">
                  <div className="book-title">{book.title}</div>
                  <div className="book-sanskrit">{book.titleSanskrit}</div>
                  {book.author && <div className="book-author">{lang === "hi" ? bookHi[book.id]?.authorHi ?? book.author : book.author}{book.publisher ? ` \xB7 ${lang === "hi" ? bookHi[book.id]?.publisherHi ?? book.publisher : book.publisher}` : ""} · {lang === "hi" ? bookHi[book.id]?.periodHi ?? book.period : book.period}</div>}
                  <div className="book-meta">
                    <span className="book-level">{formatGovClassRange(book.govClassMin, book.govClassMax)}</span>
                    <span className="book-chapters">{book.totalChapters} {t("chapters")}</span>
                  </div>
                  <div className="book-desc">{lang === "hi" ? bookHi[book.id]?.descriptionHi ?? book.description : book.description}</div>
                </div>
              </div>)}
          </div>

          {filtered.length === 0 && <p className="empty-state">{t("No books match the selected filter")}</p>}

          <div className="section-header" style={{ marginTop: 40 }}>
            <h2>{t("Customized Grammar Textbooks")}</h2>
            <p>{t("Grammar books tailored to each learning level")}</p>
          </div>
          <div className="bookshelf-grid">
            {grammarBooks.map((gb) => <div key={gb.id} className="book-card grammar" onClick={() => setSelectedGrammar(gb)}>
                <div className="book-icon" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                  <DynamicIcon name="grammar" size={24} />
                </div>
                <div className="book-info">
                  <div className="book-title">{gb.title}</div>
                  <div className="book-sanskrit">{gb.titleSanskrit}</div>
                  <div className="book-meta">
                    <span className="book-level">{t(levelLabels[gb.level])}</span>
                    <span className="book-chapters">{gb.chapters.length} {t("chapters")}</span>
                    <span className="book-chapters">{gb.rulesCount} {t("rules")} · {gb.exercisesCount} {t("exercises")}</span>
                  </div>
                  <div className="book-desc">{gb.description}</div>
                </div>
              </div>)}
          </div>

          <div className="bookshelf-stats">
            <span>{books.length} {t("books")}</span>
            <span>{Object.values(chapters).flat().length} {t("chapters with details")}</span>
            <span>{grammarBooks.length} {t("grammar textbooks")}</span>
            <span>{books.reduce((s, b) => s + b.totalChapters, 0)}+ {t("total chapters")}</span>
          </div>
        </>}

      {selectedBook && <div className="book-detail">
          <button className="btn btn-sm btn-secondary" onClick={() => setSelectedBook(null)} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <ArrowLeft size={14} /> <span>{t("Back to Bookshelf")}</span>
          </button>
          <div className="book-detail-header">
            <span className="book-detail-icon" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              <DynamicIcon name={selectedBook.category || "book"} size={32} />
            </span>
            <div>
              <h2>{selectedBook.title}</h2>
              <div className="book-sanskrit large">{selectedBook.titleSanskrit}</div>
              {selectedBook.author && <p className="book-author">{lang === "hi" ? bookHi[selectedBook.id]?.authorHi ?? selectedBook.author : selectedBook.author}{selectedBook.publisher ? ` \xB7 ${lang === "hi" ? bookHi[selectedBook.id]?.publisherHi ?? selectedBook.publisher : selectedBook.publisher}` : ""} · {lang === "hi" ? bookHi[selectedBook.id]?.periodHi ?? selectedBook.period : selectedBook.period}</p>}
              <p className="book-desc">{lang === "hi" ? bookHi[selectedBook.id]?.descriptionHi ?? selectedBook.description : selectedBook.description}</p>
              <div className="grammar-stats">
                <span>{formatGovClassRange(selectedBook.govClassMin, selectedBook.govClassMax)}</span>
                <span>{selectedBook.totalChapters} {t("chapters")}</span>
              </div>
            </div>
          </div>

          <div className="book-chapter-list">
            <h3>{t("Chapters")} ({bookChapters.length})</h3>
            {chaptersLoading ? <p className="empty-state">{t("Loading chapters...")}</p> : bookChapters.length > 0 ? bookChapters.map((ch) => <div key={ch.id} className="chapter-card" onClick={() => setOpenChapter(openChapter?.id === ch.id ? null : ch)} style={{ cursor: "pointer" }}>
                  <div className="chapter-num">{ch.chapterNumber}</div>
                  <div className="chapter-info">
                    <div className="chapter-title">{ch.title}</div>
                    <div className="chapter-sanskrit">{ch.titleSanskrit}</div>
                    <div className="chapter-preview">{ch.contentPreview}</div>
                    {openChapter?.id === ch.id && <div className="chapter-verses-list" style={{ marginTop: 10 }}>
                        {selectedBook.id.startsWith("ncert-") ? (
                          <ChapterTextReader
                            bookId={selectedBook.id}
                            chapterNumber={ch.chapterNumber}
                            bookTitle={selectedBook.title}
                            chapterTitle={ch.title}
                          />
                        ) : versesLoading ? <p className="empty-state">{t("Loading verses...")}</p> : chapterVerses.length > 0 ? chapterVerses.map((v) => <div key={v.id} className="chapter-verse" style={{ marginBottom: 12, padding: 10, background: "rgba(255,255,255,0.03)", borderRadius: 8 }}>
                              <div className="verse-sanskrit" style={{ fontFamily: '"Noto Serif Devanagari", serif', fontSize: "1.15em", lineHeight: 1.9 }}>{v.content}</div>
                              {v.title && <div className="verse-title" style={{ fontSize: "0.85em", opacity: 0.7, marginTop: 4 }}>{lang === "hi" && v.title_hi ? v.title_hi : v.title}</div>}
                            </div>) : ch.contentPreview ? <div className="chapter-verse" style={{ marginBottom: 12, padding: 10, background: "rgba(255,255,255,0.03)", borderRadius: 8 }}>
                            <div className="verse-sanskrit" style={{ fontFamily: '"Noto Serif Devanagari", serif', fontSize: "1.15em", lineHeight: 1.9 }}>{ch.contentPreview}</div>
                          </div> : <p className="empty-state">{t("No verses available for this chapter yet")}</p>}
                      </div>}
                  </div>
                  <div className="chapter-verses">{ch.verseCount > 0 ? `${ch.verseCount} ${t("verses")}` : ""}</div>
                </div>) : <p className="empty-state">{t("Chapter details available in database")}</p>}
          </div>
        </div>}

      {selectedGrammar && <div className="book-detail">
          <button className="btn btn-sm btn-secondary" onClick={() => setSelectedGrammar(null)} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <ArrowLeft size={14} /> <span>{t("Back to Bookshelf")}</span>
          </button>
          <div className="book-detail-header">
            <span className="book-detail-icon" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              <DynamicIcon name="grammar" size={32} />
            </span>
            <div>
              <h2>{selectedGrammar.title}</h2>
              <div className="book-sanskrit large">{selectedGrammar.titleSanskrit}</div>
              <p className="book-desc">{selectedGrammar.description}</p>
              <div className="grammar-stats">
                <span>{selectedGrammar.rulesCount} {t("grammar rules")}</span>
                <span>{selectedGrammar.examplesCount} {t("examples")}</span>
                <span>{selectedGrammar.exercisesCount} {t("exercises")}</span>
              </div>
            </div>
          </div>

          <div className="book-chapter-list">
            <h3>{t("Syllabus")} ({selectedGrammar.chapters.length} {t("chapters")})</h3>
            {selectedGrammar.chapters.map((ch, i) => <div key={i} className="chapter-card">
                <div className="chapter-num">{ch.chapter}</div>
                <div className="chapter-info">
                  <div className="chapter-title">{ch.title}</div>
                  <div className="chapter-sections">
                    {ch.sections.map((s, j) => <span key={j} className="section-tag">{s}</span>)}
                  </div>
                </div>
              </div>)}
          </div>
        </div>}
    </div>;
}
export {
  BookshelfPage as default
};
