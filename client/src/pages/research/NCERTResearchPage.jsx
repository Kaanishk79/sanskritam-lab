import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  BookMarked,
  CheckCircle2,
  XCircle,
  ChevronUp,
  ChevronDown,
  FileText,
  ChevronRight,
  Search,
  X
} from "lucide-react";
import { books, chapters, grammarBooks, ncertChapterPdfUrl } from "../../data/books";
import { ncertTextBookMap } from "../../data/ncertBooksTextIndex";
import { fetchNCERTBooks, fetchChapters, fetchNCERTGrammarBooks } from "../../services/data";
import ChapterResourcePanel from "../../components/ChapterResourcePanel";
import { useLanguage } from "../../context/LanguageContext";

const classColors = {
  6: "#2ecc71",
  7: "#27ae60",
  8: "#1abc9c",
  9: "#2980b9",
  10: "#3498db",
  11: "#8e44ad",
  12: "#9b59b6"
};

function NCERTResearchPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("textbooks");
  const [expandedBook, setExpandedBook] = useState(null);
  const [expandedGrammar, setExpandedGrammar] = useState(null);
  const [resourceChapter, setResourceChapter] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [remoteBooks, setRemoteBooks] = useState(null);
  const [remoteChapters, setRemoteChapters] = useState(null);
  const [remoteGrammar, setRemoteGrammar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const [ncertBooks2, ncertGrammar2] = await Promise.all([
        fetchNCERTBooks(),
        fetchNCERTGrammarBooks()
      ]);
      if (ncertBooks2 && ncertBooks2.length > 0) {
        const bookIds = ncertBooks2.map((b) => b.id);
        const chs = await fetchChapters(bookIds);
        setRemoteBooks(ncertBooks2);
        setRemoteGrammar(ncertGrammar2 ?? []);
        if (chs) {
          const grouped = {};
          for (const ch of chs) {
            const bid = ch.book_id ?? ch.bookId;
            if (!bid) continue;
            if (!grouped[bid]) grouped[bid] = [];
            grouped[bid].push(ch);
          }
          setRemoteChapters(grouped);
        }
      }
      setLoading(false);
    }
    load();
  }, []);

  const isConnected = remoteBooks !== null;
  const ncertBooks = (isConnected ? remoteBooks : books.filter((b) => b.category === "textbook" && b.id.startsWith("ncert-"))) ?? [];
  const ncertChapters = isConnected ? remoteChapters ?? {} : chapters;
  const ncertGrammar = (isConnected ? remoteGrammar ?? [] : grammarBooks.filter((g) => g.id.startsWith("ncert-"))) ?? [];

  // Filtered by search query if any
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredBooks = useMemo(() => {
    if (!normalizedQuery) return ncertBooks;
    return ncertBooks.filter((b) => {
      const matchBook =
        b.title?.toLowerCase().includes(normalizedQuery) ||
        b.titleSanskrit?.toLowerCase().includes(normalizedQuery) ||
        b.description?.toLowerCase().includes(normalizedQuery);
      if (matchBook) return true;
      const bChapters = ncertChapters[b.id] || [];
      return bChapters.some(
        (c) =>
          c.title?.toLowerCase().includes(normalizedQuery) ||
          c.titleSanskrit?.toLowerCase().includes(normalizedQuery) ||
          c.contentPreview?.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [ncertBooks, ncertChapters, normalizedQuery]);

  const ncertClasses = useMemo(() => {
    return [6, 7, 8, 9, 10, 11, 12].map((num) => ({
      classLabel: `${t("Class")} ${num}`,
      classNum: num,
      books: filteredBooks.filter(
        (b) => (b.gov_class_min ?? b.govClassMin) <= num && (b.gov_class_max ?? b.govClassMax) >= num
      )
    }));
  }, [filteredBooks, t]);

  const filteredGrammar = useMemo(() => {
    if (!normalizedQuery) return ncertGrammar;
    return ncertGrammar.filter((gb) => {
      const matchGb =
        gb.title?.toLowerCase().includes(normalizedQuery) ||
        gb.titleSanskrit?.toLowerCase().includes(normalizedQuery) ||
        gb.description?.toLowerCase().includes(normalizedQuery);
      if (matchGb) return true;
      return (gb.chapters || []).some(
        (c) =>
          c.title?.toLowerCase().includes(normalizedQuery) ||
          (c.sections || []).some((s) => s.toLowerCase().includes(normalizedQuery))
      );
    });
  }, [ncertGrammar, normalizedQuery]);

  const toggleBook = (bookId) => {
    setExpandedBook(expandedBook === bookId ? null : bookId);
    setExpandedGrammar(null);
    setResourceChapter(null);
  };

  const toggleGrammar = (bookId) => {
    setExpandedGrammar(expandedGrammar === bookId ? null : bookId);
    setExpandedBook(null);
    setResourceChapter(null);
  };

  const openChapterResources = (book, ch) => {
    setResourceChapter((prev) =>
      prev && prev.chapter.id === ch.id ? null : { book, chapter: ch }
    );
  };

  const handleChapterNavigate = (targetNum) => {
    if (!resourceChapter) return;
    const chList = ncertChapters[resourceChapter.book.id] || [];
    const target = chList.find((c) => (c.chapter_number ?? c.chapterNumber) === targetNum);
    if (target) {
      setResourceChapter({ book: resourceChapter.book, chapter: target });
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>{t("NCERT Curriculum Library")}</h2>
        <p className="page-subtitle">
          {t("NCERT Sanskrit textbooks (Classes 6–12) and Vyakaranavithi grammar for CBSE curriculum")}
          {isConnected && <span style={{ marginLeft: 8, fontSize: 11, opacity: 0.5 }}>· {t("live from Supabase")}</span>}
          {!isConnected && !loading && <span style={{ marginLeft: 8, fontSize: 11, opacity: 0.5, color: "#e67e22" }}>· {t("offline mode")}</span>}
        </p>
      </div>

      <div style={{ marginBottom: 12, fontSize: 12, opacity: 0.75, display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
          {t("Connected:")} {isConnected ? <CheckCircle2 size={13} color="#2ecc71" /> : <XCircle size={13} color="#e74c3c" />}
        </span>
        <span>{t("Curriculum Books:")} {ncertBooks.length}</span>
        <span>{t("Chapters indexed:")} {Object.values(ncertChapters).reduce((acc, c) => acc + (c?.length || 0), 0)}</span>
        {expandedBook && <span>{t("Expanded:")} {expandedBook} · {t("chapters:")} {ncertChapters[expandedBook]?.length ?? 0}</span>}
      </div>

      {/* Controls Bar: Tabs & Search */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
        <div className="tab-bar" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button
            className={`btn ${activeTab === "textbooks" ? "btn-primary" : "btn-outline"}`}
            onClick={() => setActiveTab("textbooks")}
            style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            <BookOpen size={14} />
            <span>{t("NCERT Textbooks")}</span>
          </button>
          <button
            className={`btn ${activeTab === "grammar" ? "btn-primary" : "btn-outline"}`}
            onClick={() => setActiveTab("grammar")}
            style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            <BookMarked size={14} />
            <span>{t("NCERT Grammar (व्याकरणवीथिः)")}</span>
          </button>
        </div>

        {/* Global search within NCERT Corner */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, flex: "1 1 240px", maxWidth: 360, marginLeft: "auto" }}>
          <div style={{ position: "relative", width: "100%" }}>
            <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", opacity: 0.5 }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("Search chapters, topics, lessons…")}
              style={{
                width: "100%",
                padding: "7px 30px 7px 32px",
                fontSize: 13,
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-color)",
                borderRadius: 8,
                color: "inherit"
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                style={{
                  position: "absolute",
                  right: 8,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "inherit",
                  opacity: 0.6,
                  padding: 2
                }}
              >
                <X size={13} />
              </button>
            )}
          </div>
        </div>

        <button
          className="btn btn-outline"
          onClick={() => navigate("/ncert/papers")}
          style={{ display: "inline-flex", alignItems: "center", gap: 6, borderColor: "var(--vt-orange)" }}
        >
          <FileText size={14} color="var(--vt-orange)" />
          <span style={{ fontWeight: 600 }}>{t("Sample Papers (Sets 1-3)")}</span>
          <ChevronRight size={13} />
        </button>
      </div>

      {loading && (
        <div style={{ textAlign: "center", padding: 40, opacity: 0.6 }}>
          {t("Loading NCERT curriculum from database...")}
        </div>
      )}

      {!loading && activeTab === "textbooks" && (
        <div className="ncert-class-grid">
          {ncertClasses.map((group) => group.books.length > 0 && (
            <div key={group.classNum} className="ncert-class-section" style={{ marginBottom: 32 }}>
              <div
                className="ncert-class-header"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 16px",
                  borderRadius: 8,
                  background: classColors[group.classNum] + "18",
                  borderLeft: `4px solid ${classColors[group.classNum]}`,
                  marginBottom: 12
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontWeight: 700, fontSize: 16 }}>{group.classLabel}</span>
                  <span style={{ fontSize: 12, opacity: 0.6 }}>{group.books.length} {t("textbooks")}</span>
                </div>
                <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 4, background: classColors[group.classNum] + "30", fontWeight: 600 }}>
                  CBSE / NCERT
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {group.books.map((book) => {
                  const bChapters = ncertChapters[book.id] ?? [];
                  const isTextIndexed = ncertTextBookMap[book.id] && !ncertTextBookMap[book.id]?.isPdfOnly;

                  return (
                    <div key={book.id}>
                      <div
                        className="ncert-book-card"
                        onClick={() => toggleBook(book.id)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          padding: "12px 16px",
                          borderRadius: 8,
                          cursor: "pointer",
                          border: "1px solid var(--border-color)",
                          background: expandedBook === book.id ? "var(--bg-secondary)" : "var(--bg-primary)",
                          transition: "background 0.2s"
                        }}
                      >
                        <div style={{ display: "inline-flex", alignItems: "center" }}>
                          <BookOpen size={24} color="var(--vt-orange)" />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                            <span style={{ fontWeight: 600 }}>{book.title}</span>
                            <span style={{ fontSize: 11, padding: "2px 6px", borderRadius: 4, background: isTextIndexed ? "rgba(46, 204, 113, 0.15)" : "rgba(52, 152, 219, 0.15)", color: isTextIndexed ? "#27ae60" : "#2980b9", fontWeight: 600 }}>
                              {isTextIndexed ? t("Full Text + Audio") : t("Official PDF Edition")}
                            </span>
                          </div>
                          <div style={{ fontSize: 12, opacity: 0.6 }}>{book.titleSanskrit} · {book.period}</div>
                          <div style={{ fontSize: 12, marginTop: 4, opacity: 0.7 }}>{book.description}</div>
                        </div>
                        <div style={{ fontSize: 12, textAlign: "right", opacity: 0.5 }}>
                          <div>{bChapters.length} {t("chapters")}</div>
                        </div>
                        <span style={{ display: "inline-flex", alignItems: "center" }}>
                          {expandedBook === book.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </span>
                      </div>

                      {expandedBook === book.id && (
                        <div className="ncert-chapter-list" style={{ marginLeft: 32, marginTop: 8, display: "flex", flexDirection: "column", gap: 6 }}>
                          {bChapters.length === 0 && (
                            <p style={{ fontSize: 13, opacity: 0.5, padding: "8px 0" }}>{t("No chapters loaded for this book.")}</p>
                          )}
                          {bChapters.map((ch) => {
                            const chNum = ch.chapter_number ?? ch.chapterNumber;
                            const isOpen = resourceChapter?.chapter.id === ch.id;

                            return (
                              <div key={ch.id}>
                                <div
                                  onClick={() => openChapterResources(book, ch)}
                                  style={{
                                    padding: "10px 14px",
                                    borderRadius: 6,
                                    border: "1px solid var(--border-color)",
                                    background: isOpen ? "var(--bg-secondary)" : "var(--bg-tertiary)",
                                    cursor: "pointer",
                                    transition: "background 0.2s"
                                  }}
                                >
                                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
                                    <div>
                                      <span style={{ fontWeight: 600 }}>{chNum}. {ch.title}</span>
                                      {(ch.title_sanskrit || ch.titleSanskrit) && (
                                        <span style={{ fontSize: 13, marginLeft: 8, color: "var(--sanskrit-gold)", fontWeight: 500 }}>
                                          {ch.title_sanskrit || ch.titleSanskrit}
                                        </span>
                                      )}
                                      {ch.contentPreview && (
                                        <div style={{ fontSize: 12, opacity: 0.65, marginTop: 2 }}>
                                          {ch.contentPreview}
                                        </div>
                                      )}
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                      {(ch.verse_count ?? ch.verseCount ?? 0) > 0 && (
                                        <span style={{ fontSize: 11, opacity: 0.5 }}>
                                          {ch.verse_count ?? ch.verseCount} {t("verses")}
                                        </span>
                                      )}
                                      <span
                                        className="btn btn-sm btn-outline"
                                        style={{ fontSize: 11, padding: "2px 8px", display: "inline-flex", alignItems: "center", gap: 4 }}
                                      >
                                        <BookOpen size={12} color="var(--vt-orange)" />
                                        <span>{isOpen ? t("Hide") : t("Read / Study")}</span>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                {isOpen && (
                                  <ChapterResourcePanel
                                    book={book}
                                    chapter={ch}
                                    pdfUrl={ncertChapterPdfUrl(book.id, chNum)}
                                    onClose={() => setResourceChapter(null)}
                                    onChapterChange={handleChapterNavigate}
                                    totalChapters={bChapters.length}
                                  />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          {ncertClasses.every((g) => g.books.length === 0) && (
            <p style={{ opacity: 0.6, textAlign: "center", padding: 30 }}>
              {searchQuery ? t("No textbooks match your search query.") : t("No NCERT textbooks found.")}
            </p>
          )}
        </div>
      )}

      {!loading && activeTab === "grammar" && (
        <div className="ncert-grammar-section">
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {filteredGrammar.length === 0 && (
              <p style={{ opacity: 0.6, textAlign: "center", padding: 30 }}>
                {searchQuery ? t("No grammar books match your search query.") : t("No NCERT grammar books found.")}
              </p>
            )}
            {filteredGrammar.map((gb) => {
              const gbChapters = gb.chapters ?? [];

              return (
                <div key={gb.id}>
                  <div
                    className="grammar-book-card"
                    onClick={() => toggleGrammar(gb.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "12px 16px",
                      borderRadius: 8,
                      cursor: "pointer",
                      border: "1px solid var(--border-color)",
                      background: expandedGrammar === gb.id ? "var(--bg-secondary)" : "var(--bg-primary)"
                    }}
                  >
                    <div style={{ display: "inline-flex", alignItems: "center" }}>
                      <BookMarked size={26} color="var(--vt-orange)" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontWeight: 600 }}>{gb.title}</span>
                        <span style={{ fontSize: 11, padding: "2px 6px", borderRadius: 4, background: "rgba(46, 204, 113, 0.15)", color: "#27ae60", fontWeight: 600 }}>
                          {t("Full Text + Rules")}
                        </span>
                      </div>
                      <div style={{ fontSize: 12, opacity: 0.6 }}>{gb.title_sanskrit ?? gb.titleSanskrit ?? ""}</div>
                      <div style={{ fontSize: 12, marginTop: 4, opacity: 0.7 }}>{gb.description ?? ""}</div>
                    </div>
                    <div style={{ fontSize: 12, textAlign: "right", opacity: 0.5 }}>
                      <div>{gb.rules_count ?? gb.rulesCount ?? 0} {t("rules")}</div>
                      <div>{gbChapters.length} {t("chapters")}</div>
                    </div>
                    <span style={{ display: "inline-flex", alignItems: "center" }}>
                      {expandedGrammar === gb.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </span>
                  </div>

                  {expandedGrammar === gb.id && (
                    <div style={{ marginLeft: 32, marginTop: 8, display: "flex", flexDirection: "column", gap: 6 }}>
                      {gbChapters.map((ch) => {
                        const chId = `ch-grammar-${gb.id}-${ch.chapter}`;
                        const isSelected = resourceChapter?.chapter?.id === chId;
                        const chapterObj = {
                          id: chId,
                          bookId: gb.id,
                          chapterNumber: ch.chapter,
                          title: ch.title,
                          titleSanskrit: ch.titleSanskrit || ch.title,
                          contentPreview: (ch.sections || []).join(" · ")
                        };

                        return (
                          <div key={ch.chapter}>
                            <div
                              onClick={() => {
                                setResourceChapter(isSelected ? null : { book: gb, chapter: chapterObj });
                              }}
                              style={{
                                padding: "10px 14px",
                                borderRadius: 6,
                                background: isSelected ? "var(--bg-secondary)" : "var(--bg-tertiary)",
                                border: "1px solid var(--border-color)",
                                cursor: "pointer",
                                transition: "background 0.2s"
                              }}
                            >
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
                                <div>
                                  <div style={{ fontWeight: 600, fontSize: 14 }}>
                                    {t("Chapter")} {ch.chapter}: {ch.title}
                                  </div>
                                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 4 }}>
                                    {(ch.sections || []).map((s, i) => (
                                      <span key={i} className="chip" style={{ fontSize: 11 }}>
                                        {s}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                <span
                                  className="btn btn-sm btn-outline"
                                  style={{ fontSize: 11, padding: "2px 8px", display: "inline-flex", alignItems: "center", gap: 4 }}
                                >
                                  <BookOpen size={12} color="var(--vt-orange)" />
                                  <span>{isSelected ? t("Hide") : t("Read Text")}</span>
                                </span>
                              </div>
                            </div>
                            {isSelected && (
                              <ChapterResourcePanel
                                book={gb}
                                chapter={chapterObj}
                                pdfUrl={ncertChapterPdfUrl(gb.id, ch.chapter)}
                                onClose={() => setResourceChapter(null)}
                                onChapterChange={(targetNum) => {
                                  const targetCh = gbChapters.find((c) => c.chapter === targetNum);
                                  if (targetCh) {
                                    setResourceChapter({
                                      book: gb,
                                      chapter: {
                                        id: `ch-grammar-${gb.id}-${targetCh.chapter}`,
                                        bookId: gb.id,
                                        chapterNumber: targetCh.chapter,
                                        title: targetCh.title,
                                        titleSanskrit: targetCh.titleSanskrit || targetCh.title,
                                        contentPreview: (targetCh.sections || []).join(" · ")
                                      }
                                    });
                                  }
                                }}
                                totalChapters={gbChapters.length}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export { NCERTResearchPage as default };

