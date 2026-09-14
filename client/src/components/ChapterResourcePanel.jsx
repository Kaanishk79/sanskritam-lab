import { useMemo, useState } from "react";
import {
  BookOpen,
  GraduationCap,
  Pencil,
  Brain,
  FileText,
  X,
  Languages,
} from "lucide-react";
import { getGrammarTopics } from "../data/ncertGrammarSyllabus";
import { useLanguage } from "../context/LanguageContext";
import ChapterTextReader from "./ChapterTextReader";

function deriveVocab(sanskrit, preview = "") {
  const combined = `${sanskrit || ""} ${preview || ""}`;
  const words = combined.split(/[\s–—,.;:!?()[\]{}"'\\/]+/).filter((w) => /[\u0900-\u097F]/.test(w) && w.length > 1);
  const seen = new Set();
  const out = [];
  for (const w of words) {
    const clean = w.replace(/[^\u0900-\u097F]/g, "").trim();
    if (clean.length >= 3 && !seen.has(clean)) {
      seen.add(clean);
      out.push(clean);
      if (out.length >= 8) break;
    }
  }
  return out;
}

function ChapterResourcePanel({ book, chapter, pdfUrl, onClose, onChapterChange, totalChapters }) {
  const { t } = useLanguage();
  const [tab, setTab] = useState("read");
  const champ = chapter.titleSanskrit || chapter.title;
  const govClass = Math.max(book.gov_class_min ?? book.govClassMin, 6);
  const grammarTopics = useMemo(() => getGrammarTopics(govClass), [govClass]);
  const passage = chapter.content_preview ?? chapter.contentPreview ?? "";
  const vocab = useMemo(() => deriveVocab(champ, passage), [champ, passage]);
  const summary = passage || `${chapter.title}${t(" — a chapter from the NCERT ")}${book.title}.`;

  const baseTabs = [
    { id: "read", label: t("Read Text (पाठः)"), icon: <BookOpen size={14} /> },
    { id: "teach", label: t("Teach"), icon: <GraduationCap size={14} /> },
    { id: "solve", label: t("Solve"), icon: <Pencil size={14} /> },
    { id: "mindmap", label: t("Mindmap"), icon: <Brain size={14} /> },
    { id: "grammar", label: t("Grammar"), icon: <FileText size={14} /> },
  ];

  return (
    <div style={{ marginTop: 8, border: "1px solid var(--accent)", borderRadius: 10, overflow: "hidden", background: "var(--bg-secondary)", padding: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: "var(--bg-tertiary)", borderBottom: "1px solid var(--border-color)" }}>
        <strong style={{ fontSize: 14 }}>{chapter.titleSanskrit || chapter.title}</strong>
        <span style={{ fontSize: 12, opacity: 0.5 }}>· {book.titleSanskrit || book.title}</span>
        <div style={{ flex: 1 }} />
        {pdfUrl ? (
          <a className="btn btn-primary" style={{ fontSize: 12, padding: "4px 10px", display: "inline-flex", alignItems: "center", gap: 6 }} href={pdfUrl} target="_blank" rel="noreferrer">
            <FileText size={13} /> {t("PDF")}
          </a>
        ) : null}
        <button className="btn btn-outline" style={{ fontSize: 12, padding: "4px 10px", display: "inline-flex", alignItems: "center", gap: 6 }} onClick={onClose}>
          <X size={13} /> {t("Close")}
        </button>
      </div>

      <div style={{ display: "flex", gap: 4, padding: "8px 14px 0", flexWrap: "wrap" }}>
        {baseTabs.map((t2) => (
          <button
            key={t2.id}
            className={`btn ${tab === t2.id ? "btn-primary" : "btn-outline"}`}
            onClick={() => setTab(t2.id)}
            style={{ fontSize: 12, padding: "6px 12px", display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            {t2.icon} <span>{t2.label}</span>
          </button>
        ))}
      </div>

      <div style={{ padding: "14px" }}>
        {tab === "read" && (
          <ChapterTextReader
            bookId={book.id}
            chapterNumber={chapter.chapter_number ?? chapter.chapterNumber}
            bookTitle={book.title}
            chapterTitle={chapter.titleSanskrit ? `${chapter.titleSanskrit} (${chapter.title})` : chapter.title}
            onChapterChange={onChapterChange}
            totalChapters={totalChapters || book.total_chapters || book.totalChapters}
          />
        )}

        {tab === "teach" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <div style={{ fontSize: 13, color: "var(--sanskrit-gold)", marginBottom: 6, display: "flex", alignItems: "center", gap: 6 }}>
                <BookOpen size={14} /> <span>{t("What you will learn")}</span>
              </div>
              <div style={{ fontSize: 14, lineHeight: 1.7 }}>{summary}</div>
            </div>
            {vocab.length > 0 && (
              <div>
                <div style={{ fontSize: 13, color: "var(--sanskrit-gold)", marginBottom: 6, display: "flex", alignItems: "center", gap: 6 }}>
                  <Languages size={14} /> <span>{t("Key words")}</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {vocab.map((w) => (
                    <span key={w} style={{ fontSize: 14, padding: "4px 10px", borderRadius: 6, background: "var(--bg-tertiary)", fontFamily: "'Noto Sans Devanagari', serif" }}>
                      {w}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div>
              <div style={{ fontSize: 13, color: "var(--sanskrit-gold)", marginBottom: 6, display: "flex", alignItems: "center", gap: 6 }}>
                <GraduationCap size={14} /> <span>{t("Teacher script")}</span>
              </div>
              <div style={{ fontSize: 14, lineHeight: 1.7, color: "var(--text-color)" }}>
                {t("1. Read the chapter title aloud and have students repeat it.")}<br />
                {t("2. Introduce the key words above with pictures and actions.")}<br />
                {t("3. Read a short section together, then translate line by line.")}<br />
                {t("4. Ask comprehension questions in Sanskrit (कः? का? किम्? कुत्र?).")}<br />
                {t("5. End with a fun recall game using the vocabulary.")}
              </div>
            </div>
          </div>
        )}

        {tab === "solve" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ fontSize: 13, color: "var(--sanskrit-gold)", display: "flex", alignItems: "center", gap: 6 }}>
              <Pencil size={14} /> <span>{t("Solve these questions")}</span>
            </div>
            <div className="solve-question">
              <div style={{ fontSize: 14, fontWeight: 600 }}>{t("Q1. Fill in the blanks")}</div>
              <div style={{ fontSize: 14, lineHeight: 1.7, marginTop: 4 }}>
                {t("Complete the sentence from the chapter and write it in देवनागरी.")}
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
                <input placeholder={t("Type your answer…")} style={{ flex: 1, minWidth: 180, padding: "8px 10px", background: "var(--bg-primary)", border: "1px solid var(--border-color)", borderRadius: 6, fontFamily: "'Noto Sans Devanagari', sans-serif", fontSize: 15 }} />
                <button className="btn btn-outline" style={{ fontSize: 12 }} onClick={() => window.alert(t("Check against the textbook PDF for the correct sentence."))}>
                  {t("Check")}
                </button>
              </div>
            </div>
            <div className="solve-question">
              <div style={{ fontSize: 14, fontWeight: 600 }}>{t("2. Match the words")}</div>
              <div style={{ fontSize: 14, lineHeight: 1.7, marginTop: 4 }}>{t("Match each keyword (left) with its meaning (right).")}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 6 }}>
                {vocab.slice(0, 5).map((w, i) => (
                  <span key={w} style={{ fontSize: 13, padding: "3px 8px", borderRadius: 5, background: "var(--bg-tertiary)" }}>
                    {i + 1}. {w}
                  </span>
                ))}
              </div>
            </div>
            <div className="solve-question">
              <div style={{ fontSize: 14, fontWeight: 600 }}>{t("3. Translate")}</div>
              <div style={{ fontSize: 14, lineHeight: 1.7, marginTop: 4 }}>{t("Translate this sentence into Sanskrit and say it aloud:")}</div>
              <div style={{ fontSize: 14, fontStyle: "italic", marginTop: 4 }}>"{chapter.title}"</div>
            </div>
          </div>
        )}

        {tab === "mindmap" && (
          <div>
            <div style={{ fontSize: 13, color: "var(--sanskrit-gold)", marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>
              <Brain size={14} /> <span>{t("Chapter mind-map")}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <div style={{ fontSize: 16, fontWeight: 700, padding: "10px 18px", borderRadius: 10, background: "var(--accent)", color: "#fff", textAlign: "center" }}>
                {champ}
              </div>
              <div style={{ width: 1, height: 14, background: "var(--border-color)" }} />
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, maxWidth: 520 }}>
                {[
                  { label: t("Main Idea"), desc: t("The central theme of the chapter") },
                  { label: t("Characters"), desc: t("The people / creatures in the lesson") },
                  { label: t("Vocabulary"), desc: vocab.slice(0, 4).join(", ") || t("New words") },
                  { label: t("Grammar Link"), desc: grammarTopics.slice(0, 2).map((t2) => t2.titleSanskrit).join(", ") },
                  { label: t("Moral / Message"), desc: t("What the chapter teaches us") },
                ].map((n) => (
                  <div key={n.label} style={{ fontSize: 12, padding: "8px 12px", borderRadius: 8, background: "var(--bg-tertiary)", border: "1px solid var(--border-color)", textAlign: "center", maxWidth: 130 }}>
                    <strong>{n.label}</strong>
                    <div style={{ marginTop: 3, opacity: 0.75 }}>{n.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "grammar" && (
          <div>
            <div style={{ fontSize: 13, color: "var(--sanskrit-gold)", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
              <FileText size={14} /> <span>{t("Class")} {govClass} {t("grammar")} — {grammarTopics.length} {t("topics")}</span>
            </div>
            {grammarTopics.map((t2) => (
              <div key={t2.title} style={{ marginTop: 10, padding: "10px 12px", borderRadius: 8, background: "var(--bg-tertiary)", border: "1px solid var(--border-color)" }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{t2.titleSanskrit} — {t2.title}</div>
                {t2.points.map((p, i) => (
                  <div key={i} style={{ fontSize: 13, marginTop: 3, marginLeft: 8, opacity: 0.85 }}>• {p}</div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export { ChapterResourcePanel as default };
