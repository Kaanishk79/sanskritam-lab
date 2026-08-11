import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const SUPABASE_URL = supabaseUrl
export const SUPABASE_ANON_KEY = supabaseAnonKey

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ─── AUTH ───
export const auth = {
  signUp: (email: string, password: string, meta?: Record<string, unknown>) =>
    supabase.auth.signUp({
      email,
      password,
      options: { data: meta || { display_name: email.split('@')[0] } },
    }),
  signIn: (email: string, password: string) =>
    supabase.auth.signInWithPassword({ email, password }),
  signOut: () => supabase.auth.signOut(),
  getUser: () => supabase.auth.getUser(),
  updateUser: (data: Record<string, unknown>) => supabase.auth.updateUser({ data }),
  onAuthChange: (callback: (event: string, session: unknown) => void) =>
    supabase.auth.onAuthStateChange(callback),
}

// ─── PROFILES ───
export const profiles = {
  get: (userId: string) =>
    supabase.from('profiles').select('*').eq('id', userId).single(),
  update: (userId: string, data: Record<string, unknown>) =>
    supabase.from('profiles').update(data).eq('id', userId),
}

// ─── TEXTS ───
export const texts = {
  list: () => supabase.from('texts').select('*').order('id'),
  get: (id: string) => supabase.from('texts').select('*').eq('id', id).single(),
  search: (query: string) =>
    supabase.from('texts').select('*').or(`title.ilike.%${query}%,content.ilike.%${query}%`),
}

// ─── LESSONS ───
export const lessonsDb = {
  list: (level?: number) => {
    let q = supabase.from('lessons').select('*').order('sort_order')
    if (level !== undefined) q = q.eq('level', level)
    return q
  },
  get: (id: string) => supabase.from('lessons').select('*').eq('id', id).single(),
}

// ─── TRACKS ───
export const tracksDb = {
  list: () => supabase.from('tracks').select('*').order('sort_order'),
}

// ─── SKILLS ───
export const skillsDb = {
  list: () => supabase.from('skills').select('*').order('sort_order'),
}

// ─── USER PROGRESS ───
export const progressDb = {
  get: (userId: string) =>
    supabase.from('user_progress').select('*').eq('user_id', userId).single(),
  upsert: (data: Record<string, unknown>) =>
    supabase.from('user_progress').upsert(data),
}

// ─── ANNOTATIONS ───
export const annotationsDb = {
  list: (textId: string) =>
    supabase.from('annotations').select('*').eq('text_id', textId).order('created_at'),
  create: (data: Record<string, unknown>) =>
    supabase.from('annotations').insert(data),
  delete: (id: string) => supabase.from('annotations').delete().eq('id', id),
}

// ─── ASSESSMENT ───
export const assessmentDb = {
  record: (data: Record<string, unknown>) =>
    supabase.from('assessment_attempts').insert(data),
  history: (userId: string) =>
    supabase.from('assessment_attempts').select('*, lessons(title)').eq('user_id', userId).order('created_at', { ascending: false }),
}

// ─── BOOKS ───
export const booksDb = {
  list: () => supabase.from('books').select('*').order('sort_order'),
  getByCategory: (category: string) =>
    supabase.from('books').select('*').eq('category', category).order('sort_order'),
  getNCERT: () =>
    supabase.from('books').select('*').ilike('id', 'ncert%').order('gov_class_min'),
}

// ─── CHAPTERS ───
export const chaptersDb = {
  listByBook: (bookId: string) =>
    supabase.from('chapters').select('*').eq('book_id', bookId).order('chapter_number'),
  listByBooks: (bookIds: string[]) =>
    supabase.from('chapters').select('*').in('book_id', bookIds).order('chapter_number'),
}

// ─── GRAMMAR BOOKS ───
export const grammarBooksDb = {
  list: () => supabase.from('grammar_books').select('*').order('level'),
  getNCERT: () =>
    supabase.from('grammar_books').select('*').ilike('id', 'ncert%').order('level'),
}

// ─── DICTIONARY ───
export const dictionaryDb = {
  lookup: (word: string) =>
    supabase.from('dictionary').select('*').ilike('word', word),
  search: (q: string) =>
    supabase.from('dictionary').select('*').or(`word.ilike.%${q}%,meanings.cs.{${q}}`).limit(20),
}