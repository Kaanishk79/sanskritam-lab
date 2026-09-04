import { createClient } from "@supabase/supabase-js";
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://placeholder-url.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "placeholder-anon-key";
const SUPABASE_URL = supabaseUrl;
const SUPABASE_ANON_KEY = supabaseAnonKey;
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const auth = {
  signUp: (email, password, meta) => supabase.auth.signUp({
    email,
    password,
    options: { data: meta || { display_name: email.split("@")[0] } }
  }),
  signIn: (email, password) => supabase.auth.signInWithPassword({ email, password }),
  signOut: () => supabase.auth.signOut(),
  getUser: () => supabase.auth.getUser(),
  updateUser: (data) => supabase.auth.updateUser({ data }),
  onAuthChange: (callback) => supabase.auth.onAuthStateChange(callback)
};
const profiles = {
  get: (userId) => supabase.from("profiles").select("*").eq("id", userId).single(),
  update: (userId, data) => supabase.from("profiles").update(data).eq("id", userId)
};
const texts = {
  list: () => supabase.from("texts").select("*").order("id"),
  get: (id) => supabase.from("texts").select("*").eq("id", id).single(),
  search: (query) => supabase.from("texts").select("*").or(`title.ilike.%${query}%,content.ilike.%${query}%`)
};
const lessonsDb = {
  list: (level) => {
    let q = supabase.from("lessons").select("*").order("sort_order");
    if (level !== void 0) q = q.eq("level", level);
    return q;
  },
  get: (id) => supabase.from("lessons").select("*").eq("id", id).single()
};
const tracksDb = {
  list: () => supabase.from("tracks").select("*").order("sort_order")
};
const skillsDb = {
  list: () => supabase.from("skills").select("*").order("sort_order")
};
const progressDb = {
  get: (userId) => supabase.from("user_progress").select("*").eq("user_id", userId).single(),
  upsert: (data) => supabase.from("user_progress").upsert(data)
};
const annotationsDb = {
  list: (textId) => supabase.from("annotations").select("*").eq("text_id", textId).order("created_at"),
  create: (data) => supabase.from("annotations").insert(data),
  delete: (id) => supabase.from("annotations").delete().eq("id", id)
};
const assessmentDb = {
  record: (data) => supabase.from("assessment_attempts").insert(data),
  history: (userId) => supabase.from("assessment_attempts").select("*, lessons(title)").eq("user_id", userId).order("created_at", { ascending: false })
};
const booksDb = {
  list: () => supabase.from("books").select("*").order("sort_order"),
  getByCategory: (category) => supabase.from("books").select("*").eq("category", category).order("sort_order"),
  getNCERT: () => supabase.from("books").select("*").ilike("id", "ncert%").order("gov_class_min")
};
const chaptersDb = {
  listByBook: (bookId) => supabase.from("chapters").select("*").eq("book_id", bookId).order("chapter_number"),
  listByBooks: (bookIds) => supabase.from("chapters").select("*").in("book_id", bookIds).order("chapter_number")
};
const grammarBooksDb = {
  list: () => supabase.from("grammar_books").select("*").order("level"),
  getNCERT: () => supabase.from("grammar_books").select("*").ilike("id", "ncert%").order("level")
};
const dictionaryDb = {
  lookup: (word) => supabase.from("dictionary").select("*").ilike("word", word),
  search: (q) => supabase.from("dictionary").select("*").or(`word.ilike.%${q}%,meanings.cs.{${q}}`).limit(20)
};
export {
  SUPABASE_ANON_KEY,
  SUPABASE_URL,
  annotationsDb,
  assessmentDb,
  auth,
  booksDb,
  chaptersDb,
  dictionaryDb,
  grammarBooksDb,
  lessonsDb,
  profiles,
  progressDb,
  skillsDb,
  supabase,
  texts,
  tracksDb
};
