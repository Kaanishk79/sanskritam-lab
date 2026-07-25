-- SanskritLab Database Schema for Supabase (PostgreSQL)
-- Run this in the Supabase SQL Editor after creating your project.

-- 1. PROFILES (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
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
  color TEXT,
  min_level INT DEFAULT 0,
  max_level INT DEFAULT 6,
  sort_order INT DEFAULT 0
);

INSERT INTO tracks (id, label, icon, description, age_range, color, min_level, max_level, sort_order) VALUES
  ('child', 'Child', '🧒', 'Playful learning with colors, games, and simple stories', '5-12 years', '#f39c12', 0, 1, 1),
  ('teen', 'Teen', '📚', 'School curriculum with grammar basics and exam prep', '13-17 years', '#2ecc71', 1, 3, 2),
  ('undergrad', 'Undergraduate', '🎓', 'Classical texts, advanced grammar, philosophy foundations', '18-22 years', '#3498db', 2, 4, 3),
  ('graduate', 'Graduate', '🔬', 'Textual criticism, manuscript studies, advanced darśanas', 'MA/MPhil', '#9b59b6', 3, 5, 4),
  ('phd', 'PhD / Researcher', '🏛️', 'Critical editions, paleography, text-historical analysis', 'PhD & beyond', '#e74c3c', 5, 6, 5);

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

INSERT INTO texts (id, title, author, period, content, language) VALUES
  ('rv-1-1', 'Ṛgveda 1.1', 'Traditional', '1500-1200 BCE', 'अग्निमीळे पुरोहितं यज्ञस्य देवं रत्वीजम् । होतारं रत्नधातमम् ॥', 'Vedic Sanskrit'),
  ('panini-1-1', 'Aṣṭādhyāyī 1.1', 'Pāṇini', '~500 BCE', 'वृद्धिरादैच् । अदेङ् गुणः ।', 'Classical Sanskrit'),
  ('gita-2-47', 'Bhagavad Gītā 2.47', 'Vyāsa', '~200 BCE', 'मा फलेषु कदाचन । मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥', 'Classical Sanskrit');

-- 6. ANNOTATIONS
CREATE TABLE annotations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  text_id TEXT REFERENCES texts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
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
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  current_track TEXT REFERENCES tracks(id) DEFAULT 'child',
  current_level INT DEFAULT 0,
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
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
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
  script TEXT CHECK (script IN ('Devanagari', 'Grantha')),
  period TEXT,
  image_url TEXT,
  transcription TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. DICTIONARY ENTRIES
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
CREATE INDEX idx_lessons_level ON lessons(level);
CREATE INDEX idx_annotations_text ON annotations(text_id);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE annotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_attempts ENABLE ROW LEVEL SECURITY;

-- RLS Policies: users can only read/write their own data
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can view own progress" ON user_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can upsert own progress" ON user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON user_progress FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own annotations" ON annotations FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own attempts" ON assessment_attempts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own attempts" ON assessment_attempts FOR INSERT WITH CHECK (auth.uid() = user_id);
-- Public read access for texts, lessons, tracks, skills, manuscripts, dictionary
CREATE POLICY "Public read texts" ON texts FOR SELECT USING (true);
CREATE POLICY "Public read lessons" ON lessons FOR SELECT USING (true);
CREATE POLICY "Public read tracks" ON tracks FOR SELECT USING (true);
CREATE POLICY "Public read skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Public read manuscripts" ON manuscripts FOR SELECT USING (true);
CREATE POLICY "Public read dictionary" ON dictionary FOR SELECT USING (true);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name) VALUES (NEW.id, NEW.raw_user_meta_data->>'display_name');
  INSERT INTO public.user_progress (user_id) VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();