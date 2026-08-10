-- SanskritLab Database Schema (standalone PostgreSQL, no Supabase auth dependency)

-- 1. LOCAL USERS
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  display_name TEXT,
  avatar_url TEXT,
  role TEXT CHECK (role IN ('student', 'teacher', 'researcher', 'admin')) DEFAULT 'student',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TRACKS (learning paths)
CREATE TABLE tracks (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  icon TEXT NOT NULL,
  description TEXT,
  age_range TEXT,
  class_range TEXT,
  color TEXT,
  min_level INT DEFAULT 0,
  max_level INT DEFAULT 6,
  sort_order INT DEFAULT 0
);

INSERT INTO tracks (id, label, icon, description, age_range, class_range, color, min_level, max_level, sort_order) VALUES
  ('child', 'Primary (Class 1-5)', '🧒', 'Playful learning with alphabet, words, simple sentences, colors, and stories', '5-12 years', 'Class 1-5', '#f39c12', 0, 1, 1),
  ('teen', 'Secondary (Class 6-10)', '📚', 'NCERT Sanskrit curriculum: Ruchira (6-8), Shemushi (9-10) with grammar and composition', '13-17 years', 'Class 6-10', '#2ecc71', 1, 3, 2),
  ('undergrad', 'Senior Secondary & BA (Class 11-BA 3rd)', '🎓', 'NCERT Bhaswati (11-12), UGC university syllabus: literature, drama, grammar, philosophy', '18-22 years', 'Class 11-BA III', '#3498db', 2, 4, 3),
  ('graduate', 'Postgraduate (MA 1st-MPhil)', '🔬', 'Vedic literature, linguistics, textual criticism, paleography, research methodology', 'MA/MPhil', 'MA-MPhil', '#9b59b6', 3, 5, 4),
  ('phd', 'Doctoral (PhD & Research)', '🏛️', 'Critical editions, advanced poetics, publication ethics, thesis & viva', 'PhD & beyond', 'PhD', '#e74c3c', 5, 6, 5);

-- 3. SKILLS
CREATE TABLE skills (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  prerequisites TEXT[] DEFAULT '{}',
  sort_order INT DEFAULT 0
);

INSERT INTO skills (id, name, description, icon, prerequisites, sort_order) VALUES
  ('skill-alphabet', 'Alphabet', 'Master Devanāgarī letters', '🔤', '{}', 1),
  ('skill-vocab-basics', 'Basic Vocabulary', 'First 50 Sanskrit words', '📖', '{skill-alphabet}', 2),
  ('skill-syntax', 'Sentence Structure', 'SOV order and agreement', '🔗', '{skill-vocab-basics}', 3),
  ('skill-declensions', 'Declensions', '8 cases across 3 genders', '📊', '{skill-syntax}', 4),
  ('skill-sandhi', 'Sandhi', 'Sound merger rules', '🔊', '{skill-declensions}', 5),
  ('skill-compounds', 'Compounds', 'Samāsa types', '🧩', '{skill-declensions}', 6),
  ('skill-classical-texts', 'Classical Texts', 'Read Kālidāsa and others', '📜', '{skill-sandhi,skill-compounds}', 7),
  ('skill-philosophy', 'Philosophy', 'Darśana systems', '🧠', '{skill-classical-texts}', 8),
  ('skill-paleography', 'Paleography', 'Read ancient scripts', '🔍', '{skill-philosophy}', 9),
  ('skill-critical-edition', 'Textual Criticism', 'Establish critical editions', '📐', '{skill-paleography}', 10),
  ('skill-phd-research', 'PhD Research', 'Critical edition & publication', '🏛️', '{skill-critical-edition}', 11);

-- 4. LESSONS
CREATE TABLE lessons (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  level INT NOT NULL CHECK (level >= 0 AND level <= 6),
  track TEXT REFERENCES tracks(id),
  gov_class_id TEXT,
  duration TEXT,
  content JSONB NOT NULL,
  quiz JSONB NOT NULL DEFAULT '[]',
  unlockables TEXT[] DEFAULT '{}',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TEXTS (Corpus)
CREATE TABLE texts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT,
  period TEXT,
  content TEXT NOT NULL,
  language TEXT DEFAULT 'Sanskrit',
  script TEXT DEFAULT 'Devanagari',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. ANNOTATIONS
CREATE TABLE annotations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  text_id TEXT REFERENCES texts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  layer TEXT CHECK (layer IN ('grammar', 'translation', 'commentary')),
  content TEXT NOT NULL,
  start_offset INT,
  end_offset INT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. USER PROGRESS
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  current_track TEXT REFERENCES tracks(id) DEFAULT 'child',
  current_level INT DEFAULT 0,
  current_gov_class TEXT DEFAULT 'class-1-2',
  xp INT DEFAULT 0,
  streak INT DEFAULT 0,
  completed_lessons TEXT[] DEFAULT '{}',
  quiz_scores JSONB DEFAULT '{}',
  skill_progress JSONB DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. ASSESSMENT ATTEMPTS
CREATE TABLE assessment_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  lesson_id TEXT REFERENCES lessons(id),
  score DECIMAL(5,2),
  max_score INT,
  answers JSONB,
  time_spent_sec INT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. MANUSCRIPTS
CREATE TABLE manuscripts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  script TEXT CHECK (script IN ('Devanagari', 'Grantha', 'sharada', 'Tibetan', 'Bhujimol')),
  period TEXT,
  image_url TEXT,
  transcription TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. BOOKS (group texts into logical works)
CREATE TABLE books (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  title_sanskrit TEXT,
  author TEXT,
  publisher TEXT,
  period TEXT,
  category TEXT CHECK (category IN ('vedic','classical','grammar','philosophy','poetry','drama','children','teen','textbook','reference','commentary')),
  level_min INT DEFAULT 0 CHECK (level_min >= 0 AND level_min <= 6),
  level_max INT DEFAULT 6 CHECK (level_max >= 0 AND level_max <= 6),
  track TEXT REFERENCES tracks(id),
  total_chapters INT DEFAULT 1,
  description TEXT,
  cover_icon TEXT DEFAULT '📖',
  sort_order INT DEFAULT 0,
  gov_class_min INT DEFAULT 1,
  gov_class_max INT DEFAULT 19,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. CHAPTERS (individual chapters/sections of each book)
CREATE TABLE chapters (
  id TEXT PRIMARY KEY,
  book_id TEXT REFERENCES books(id) ON DELETE CASCADE,
  chapter_number INT NOT NULL,
  title TEXT,
  title_sanskrit TEXT,
  verse_count INT DEFAULT 0,
  content_preview TEXT,
  sort_order INT DEFAULT 0
);

-- 12. GRAMMAR BOOKS (customized grammar textbooks per level)
CREATE TABLE grammar_books (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  title_sanskrit TEXT,
  track TEXT REFERENCES tracks(id),
  level INT NOT NULL CHECK (level >= 0 AND level <= 6),
  description TEXT,
  chapters JSONB NOT NULL DEFAULT '[]',
  rules_count INT DEFAULT 0,
  examples_count INT DEFAULT 0,
  exercises_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Update texts to reference books
ALTER TABLE texts ADD COLUMN book_id TEXT REFERENCES books(id);
ALTER TABLE texts ADD COLUMN chapter_number INT;
ALTER TABLE texts ADD COLUMN verse_number INT;

-- 13. DICTIONARY ENTRIES
CREATE TABLE dictionary (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  word TEXT NOT NULL,
  root TEXT,
  meanings TEXT[] DEFAULT '{}',
  derivations TEXT[] DEFAULT '{}',
  pos TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_dictionary_word ON dictionary(word);
CREATE INDEX idx_texts_period ON texts(period);
CREATE INDEX idx_texts_book ON texts(book_id);
CREATE INDEX idx_lessons_level ON lessons(level);
CREATE INDEX idx_annotations_text ON annotations(text_id);
CREATE INDEX idx_chapters_book ON chapters(book_id);
CREATE INDEX idx_grammar_books_level ON grammar_books(level);
CREATE INDEX idx_books_gov_class ON books(gov_class_min, gov_class_max);
