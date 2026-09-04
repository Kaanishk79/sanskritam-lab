import { supabase } from "./supabase";
import { lessons as localLessons } from "../data/lessons";
import { tracks as localTracks } from "../data/tracks";
const hasSupabase = () => !!import.meta.env.VITE_SUPABASE_URL;
async function fetchTracks() {
  if (!hasSupabase()) return localTracks;
  const { data } = await supabase.from("tracks").select("*").order("sort_order");
  if (data && data.length > 0) {
    return data.map((t) => ({
      id: t.id,
      label: t.label,
      icon: t.icon,
      description: t.description,
      color: t.color,
      classRange: t.class_range ?? "",
      levels: [t.min_level, t.max_level]
    }));
  }
  return localTracks;
}
async function fetchLessons(level) {
  if (!hasSupabase()) {
    return level !== void 0 ? localLessons.filter((l) => l.level === level) : localLessons;
  }
  let q = supabase.from("lessons").select("*").order("sort_order");
  if (level !== void 0) q = q.eq("level", level);
  const { data } = await q;
  if (data && data.length > 0) {
    return data.map((l) => ({
      id: l.id,
      title: l.title,
      subtitle: l.subtitle,
      level: l.level,
      track: l.track,
      govClassId: l.gov_class_id ?? "class-1-2",
      duration: l.duration,
      content: l.content,
      quiz: l.quiz,
      unlockables: l.unlockables
    }));
  }
  return level !== void 0 ? localLessons.filter((l) => l.level === level) : localLessons;
}
async function fetchLesson(id) {
  if (!hasSupabase()) return localLessons.find((l) => l.id === id) ?? null;
  const { data } = await supabase.from("lessons").select("*").eq("id", id).single();
  if (data) {
    return {
      id: data.id,
      title: data.title,
      subtitle: data.subtitle,
      level: data.level,
      track: data.track,
      govClassId: data.gov_class_id ?? "class-1-2",
      duration: data.duration,
      content: data.content,
      quiz: data.quiz,
      unlockables: data.unlockables
    };
  }
  return localLessons.find((l) => l.id === id) ?? null;
}
async function fetchBooks() {
  if (!hasSupabase()) return null;
  const { data } = await supabase.from("books").select("*").order("sort_order");
  return data ?? null;
}
async function fetchNCERTBooks() {
  if (!hasSupabase()) return null;
  const { data } = await supabase.from("books").select("*").ilike("id", "ncert%").order("gov_class_min");
  return data ?? null;
}
async function fetchChapters(bookIds) {
  if (!hasSupabase() || bookIds.length === 0) return null;
  const { data } = await supabase.from("chapters").select("*").in("book_id", bookIds).order("chapter_number");
  return data ?? null;
}
async function fetchBookChapters(bookId) {
  if (!hasSupabase()) return null;
  const { data } = await supabase.from("chapters").select("id, book_id, chapter_number, title, title_sanskrit, verse_count, content_preview").eq("book_id", bookId).order("chapter_number");
  return (data ?? []).map((c) => ({
    id: c.id,
    bookId: c.book_id,
    chapterNumber: c.chapter_number,
    title: c.title,
    titleSanskrit: c.title_sanskrit ?? "",
    verseCount: c.verse_count ?? 0,
    contentPreview: c.content_preview ?? ""
  }));
}
async function fetchChapterVerses(bookId, chapterNumber) {
  if (!hasSupabase()) return [];
  const { data } = await supabase.from("texts").select("id, title, title_hi, content, verse_number").eq("book_id", bookId).eq("chapter_number", chapterNumber).order("verse_number", { ascending: true });
  return data ?? [];
}
async function fetchGrammarBooks() {
  if (!hasSupabase()) return null;
  const { data } = await supabase.from("grammar_books").select("*").order("level");
  return data ?? null;
}
async function fetchNCERTGrammarBooks() {
  if (!hasSupabase()) return null;
  const { data } = await supabase.from("grammar_books").select("*").ilike("id", "ncert%").order("level");
  return data ?? null;
}
async function fetchTexts() {
  if (!hasSupabase()) {
    return [
      { id: "rv-1-1", title: "\u1E5Agveda 1.1", author: "Traditional", period: "1500-1200 BCE", content: "\u0905\u0917\u094D\u0928\u093F\u092E\u0940\u0933\u0947 \u092A\u0941\u0930\u094B\u0939\u093F\u0924\u0902 \u092F\u091C\u094D\u091E\u0938\u094D\u092F \u0926\u0947\u0935\u0902 \u0930\u0924\u094D\u0935\u0940\u091C\u092E\u094D \u0964 \u0939\u094B\u0924\u093E\u0930\u0902 \u0930\u0924\u094D\u0928\u0927\u093E\u0924\u092E\u092E\u094D \u0965", language: "Vedic Sanskrit" },
      { id: "panini-1-1", title: "A\u1E63\u1E6D\u0101dhy\u0101y\u012B 1.1", author: "P\u0101\u1E47ini", period: "~500 BCE", content: "\u0935\u0943\u0926\u094D\u0927\u093F\u0930\u093E\u0926\u0948\u091A\u094D \u0964 \u0905\u0926\u0947\u0919\u094D \u0917\u0941\u0923\u0903 \u0964", language: "Classical Sanskrit" },
      { id: "gita-2-47", title: "Bhagavad G\u012Bt\u0101 2.47", author: "Vy\u0101sa", period: "~200 BCE", content: "\u092E\u093E \u092B\u0932\u0947\u0937\u0941 \u0915\u0926\u093E\u091A\u0928 \u0964 \u092E\u093E \u0915\u0930\u094D\u092E\u092B\u0932\u0939\u0947\u0924\u0941\u0930\u094D\u092D\u0942\u0930\u094D\u092E\u093E \u0924\u0947 \u0938\u0919\u094D\u0917\u094B\u093D\u0938\u094D\u0924\u094D\u0935\u0915\u0930\u094D\u092E\u0923\u093F \u0965", language: "Classical Sanskrit" }
    ];
  }
  const { data } = await supabase.from("texts").select("*").order("id");
  return data ?? [];
}
async function lookupWord(word) {
  if (!hasSupabase()) return null;
  const { data } = await supabase.from("dictionary").select("*").ilike("word", word);
  return data?.[0] ?? null;
}
async function fetchProgress(userId) {
  if (!hasSupabase()) return null;
  const { data } = await supabase.from("user_progress").select("*").eq("user_id", userId).single();
  return data;
}
async function saveProgress(userId, data) {
  if (!hasSupabase()) return;
  await supabase.from("user_progress").upsert({ user_id: userId, ...data });
}
export {
  fetchBookChapters,
  fetchBooks,
  fetchChapterVerses,
  fetchChapters,
  fetchGrammarBooks,
  fetchLesson,
  fetchLessons,
  fetchNCERTBooks,
  fetchNCERTGrammarBooks,
  fetchProgress,
  fetchTexts,
  fetchTracks,
  lookupWord,
  saveProgress
};
