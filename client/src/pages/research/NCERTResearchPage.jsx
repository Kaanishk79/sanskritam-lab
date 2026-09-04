import { useState, useEffect } from "react";
import {
  BookOpen,
  BookMarked,
  CheckCircle2,
  XCircle,
  ChevronUp,
  ChevronDown
} from "lucide-react";
import { books, chapters, grammarBooks, ncertChapterPdfUrl } from "../../data/books";
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
  const [activeTab, setActiveTab] = useState("textbooks");
  const [expandedBook, setExpandedBook] = useState(null);
  const [expandedGrammar, setExpandedGrammar] = useState(null);
  const [resourceChapter, setResourceChapter] = useState(null);
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
  const ncertClasses = [6, 7, 8, 9, 10, 11, 12].map((num) => ({
    classLabel: `${t("Class")} ${num}`,
    classNum: num,
    books: ncertBooks.filter((b) => b.gov_class_min <= num && b.gov_class_max >= num)
  }));
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
    setResourceChapter(
      (prev) => prev && prev.chapter.id === ch.id ? null : { book, chapter: ch }
    );
  };
  return <div className="page-container">
      <div className="page-header">
        <h2>{t("NCERT Curriculum Library")}</h2>
        <p className="page-subtitle">
          {t("NCERT Sanskrit textbooks (Class 6\u201312) and Shashwati grammar books for CBSE curriculum")}
          {isConnected && <span style={{ marginLeft: 8, fontSize: 11, opacity: 0.5 }}>· {t("live from Supabase")}</span>}
          {!isConnected && !loading && <span style={{ marginLeft: 8, fontSize: 11, opacity: 0.5, color: "#e67e22" }}>· {t("offline mode")}</span>}
        </p>
      </div>

      <div style={{ marginBottom: 8, fontSize: 12, opacity: 0.7, display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
          {t("Connected:")} {isConnected ? <CheckCircle2 size={13} color="#2ecc71" /> : <XCircle size={13} color="#e74c3c" />}
        </span>
        <span>{t("Chapters loaded:")} {Object.keys(ncertChapters).length} {t("books")}</span>
        {expandedBook && <span>{t("Expanded:")} {expandedBook} · {t("chapters:")} {ncertChapters[expandedBook]?.length ?? 0}</span>}
      </div>
      <div className="tab-bar" style={{ display: "flex", gap: 8, marginBottom: 24 }}>
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
          <span>{t("NCERT Grammar (Shashwati)")}</span>
        </button>
      </div>

      {loading && <div style={{ textAlign: "center", padding: 40, opacity: 0.6 }}>
          {t("Loading NCERT curriculum from database...")}
        </div>}

      {!loading && activeTab === "textbooks" && <div className="ncert-class-grid">
          {ncertClasses.map((group) => group.books.length > 0 && <div key={group.classNum} className="ncert-class-section" style={{ marginBottom: 32 }}>
                <div
    className="ncert-class-header"
    style={{
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "12px 16px",
      borderRadius: 8,
      background: classColors[group.classNum] + "18",
      borderLeft: `4px solid ${classColors[group.classNum]}`,
      marginBottom: 12
    }}
  >
                  <span style={{ fontWeight: 700, fontSize: 16 }}>{group.classLabel}</span>
                  <span style={{ fontSize: 12, opacity: 0.6 }}>{group.books.length} {t("textbooks")}</span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {group.books.map((book) => <div key={book.id}>
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
                          <div style={{ fontWeight: 600 }}>{book.title}</div>
                          <div style={{ fontSize: 12, opacity: 0.6 }}>{book.titleSanskrit} · {book.period}</div>
                          <div style={{ fontSize: 12, marginTop: 4, opacity: 0.7 }}>{book.description}</div>
                        </div>
                        <div style={{ fontSize: 12, textAlign: "right", opacity: 0.5 }}>
                          <div>{(ncertChapters[book.id] ?? []).length} {t("chapters")}</div>
                        </div>
                        <span style={{ display: "inline-flex", alignItems: "center" }}>
                          {expandedBook === book.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </span>
                      </div>

                      {expandedBook === book.id && <div className="ncert-chapter-list" style={{ marginLeft: 52, marginTop: 8, display: "flex", flexDirection: "column", gap: 6 }}>
                          {(ncertChapters[book.id] ?? []).length === 0 && <p style={{ fontSize: 13, opacity: 0.5, padding: "8px 0" }}>{t("No chapters loaded for this book.")}</p>}
                          {(ncertChapters[book.id] ?? []).map((ch) => <div key={ch.id}>
                              <div
    onClick={() => openChapterResources(book, ch)}
    style={{
      padding: "8px 12px",
      borderRadius: 6,
      border: "1px solid var(--border-color)",
      background: resourceChapter?.chapter.id === ch.id ? "var(--bg-secondary)" : "var(--bg-tertiary)",
      cursor: "pointer",
      transition: "background 0.2s"
    }}
  >
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                  <div>
                                    <span style={{ fontWeight: 500 }}>{ch.chapter_number ?? ch.chapterNumber}. {ch.title}</span>
                                    {ch.title_sanskrit && <span style={{ fontSize: 12, marginLeft: 8, opacity: 0.6 }}>{ch.title_sanskrit}</span>}
                                  </div>
                                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                    {ch.verse_count > 0 && <span style={{ fontSize: 11, opacity: 0.5 }}>{ch.verse_count} {t("verses")}</span>}
                                    <span title={t("Open resources")} style={{ display: "inline-flex" }}><BookOpen size={13} color="var(--vt-orange)" /></span>
                                  </div>
                                </div>
                              </div>
                              {resourceChapter?.chapter.id === ch.id && <ChapterResourcePanel
    book={book}
    chapter={ch}
    pdfUrl={ncertChapterPdfUrl(book.id, ch.chapter_number ?? ch.chapterNumber)}
    onClose={() => setResourceChapter(null)}
  />}
                            </div>)}
                        </div>}
                    </div>)}
                </div>
              </div>)}
          {ncertClasses.every((g) => g.books.length === 0) && <p style={{ opacity: 0.6 }}>{t("No NCERT textbooks found.")}</p>}
        </div>}

      {!loading && activeTab === "grammar" && <div className="ncert-grammar-section">
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {ncertGrammar.length === 0 && <p style={{ opacity: 0.6 }}>{t("No NCERT grammar books found.")}</p>}
            {ncertGrammar.map((gb) => <div key={gb.id}>
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
                    <div style={{ fontWeight: 600 }}>{gb.title}</div>
                    <div style={{ fontSize: 12, opacity: 0.6 }}>{gb.title_sanskrit ?? ""}</div>
                    <div style={{ fontSize: 12, marginTop: 4, opacity: 0.7 }}>{gb.description ?? ""}</div>
                  </div>
                  <div style={{ fontSize: 12, textAlign: "right", opacity: 0.5 }}>
                    <div>{gb.rules_count ?? 0} {t("rules")}</div>
                    <div>{(gb.chapters ?? []).length} {t("chapters")}</div>
                  </div>
                  <span style={{ display: "inline-flex", alignItems: "center" }}>
                    {expandedGrammar === gb.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </span>
                </div>

                {expandedGrammar === gb.id && <div style={{ marginLeft: 52, marginTop: 8 }}>
                    {(gb.chapters ?? []).map((ch) => <div
    key={ch.chapter}
    style={{
      padding: "8px 12px",
      marginBottom: 4,
      borderRadius: 6,
      background: "var(--bg-tertiary)",
      fontSize: 13
    }}
  >
                        <div style={{ fontWeight: 500 }}>{t("Chapter")} {ch.chapter}: {ch.title}</div>
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 4 }}>
                          {ch.sections.map((s, i) => <span key={i} className="chip" style={{ fontSize: 11 }}>{s}</span>)}
                        </div>
                      </div>)}
                  </div>}
              </div>)}
          </div>
        </div>}
    </div>;
}
export {
  NCERTResearchPage as default
};
