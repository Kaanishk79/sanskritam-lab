-- ============================================================================
-- SanskritLab — complete required database schema
-- Idempotent: safe to run on a fresh project or an existing one.
-- Tables: 56 · RLS policies for every table · indexes · RPC functions
-- ============================================================================

-- ── Extensions ─────────────────────────────────────────────────────────────
create extension if not exists pg_trgm;

-- ── Helper: bump updated_at ────────────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path = public as $$
begin
  new.updated_at = now();
  return new;
end $$;

-- ===========================================================================
-- CONTENT TABLES (public read, no user data)
-- ===========================================================================

create table if not exists public.tracks (
  id text primary key,
  label text, icon text, description text,
  age_range text, class_range text, color text,
  min_level int, max_level int, sort_order int
);
alter table public.tracks enable row level security;
drop policy if exists "tracks_read" on public.tracks;
create policy "tracks_read" on public.tracks for select using (true);

create table if not exists public.skills (
  id text primary key,
  name text, description text, icon text,
  prerequisites text[], sort_order int
);
alter table public.skills enable row level security;
drop policy if exists "skills_read" on public.skills;
create policy "skills_read" on public.skills for select using (true);

create table if not exists public.lessons (
  id text primary key,
  title text, subtitle text, level int, track text,
  gov_class_id text, duration text,
  content jsonb, quiz jsonb, unlockables text[],
  sort_order int, created_at timestamptz default now(),
  course_id uuid, "order" int
);
alter table public.lessons enable row level security;
drop policy if exists "lessons_read" on public.lessons;
create policy "lessons_read" on public.lessons for select using (true);

create table if not exists public.texts (
  id text primary key,
  title text, author text, period text,
  content text, language text, script text,
  metadata jsonb, created_at timestamptz default now(),
  book_id text, chapter_number int, verse_number int, title_hi text
);
alter table public.texts enable row level security;
drop policy if exists "texts_read" on public.texts;
create policy "texts_read" on public.texts for select using (true);

create table if not exists public.dictionary (
  id uuid primary key default gen_random_uuid(),
  word text not null,
  root text,
  meanings text[],
  derivations text[],
  pos text,
  created_at timestamptz default now()
);
alter table public.dictionary enable row level security;
drop policy if exists "dictionary_read" on public.dictionary;
create policy "dictionary_read" on public.dictionary for select using (true);

create table if not exists public.books (
  id text primary key,
  title text, title_sanskrit text, author text, publisher text,
  period text, category text, level_min int, level_max int,
  track text, total_chapters int, description text, cover_icon text,
  sort_order int, gov_class_min int, gov_class_max int,
  created_at timestamptz default now()
);
alter table public.books enable row level security;
drop policy if exists "books_read" on public.books;
create policy "books_read" on public.books for select using (true);

create table if not exists public.chapters (
  id text primary key,
  book_id text not null,
  chapter_number int,
  title text, title_sanskrit text,
  verse_count int, content_preview text, sort_order int
);
alter table public.chapters enable row level security;
drop policy if exists "chapters_read" on public.chapters;
create policy "chapters_read" on public.chapters for select using (true);

create table if not exists public.grammar_books (
  id text primary key,
  title text, title_sanskrit text, track text, level int,
  description text, chapters jsonb,
  rules_count int, examples_count int, exercises_count int,
  created_at timestamptz default now()
);
alter table public.grammar_books enable row level security;
drop policy if exists "grammar_books_read" on public.grammar_books;
create policy "grammar_books_read" on public.grammar_books for select using (true);

create table if not exists public.corpus_texts (
  id uuid primary key default gen_random_uuid(),
  title text, title_iast text,
  content text, content_iast text,
  language text, source text,
  annotations jsonb, tags jsonb,
  uploaded_by uuid, is_verified boolean default false, version int default 1,
  created_at timestamptz default now(), updated_at timestamptz default now()
);
alter table public.corpus_texts enable row level security;
drop policy if exists "corpus_texts_read" on public.corpus_texts;
create policy "corpus_texts_read" on public.corpus_texts for select using (true);

create table if not exists public.manuscripts (
  id uuid primary key default gen_random_uuid(),
  name text, script text, period text,
  image_url text, transcription text,
  metadata jsonb, created_at timestamptz default now()
);
alter table public.manuscripts enable row level security;
drop policy if exists "manuscripts_read" on public.manuscripts;
create policy "manuscripts_read" on public.manuscripts for select using (true);

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  title text, description text, language text, level text,
  created_by uuid, is_published boolean default false,
  created_at timestamptz default now()
);
alter table public.courses enable row level security;
drop policy if exists "courses_read" on public.courses;
create policy "courses_read" on public.courses for select using (is_published);
drop policy if exists "courses_owner_all" on public.courses;
create policy "courses_owner_all" on public.courses
  for all using (created_by = auth.uid()) with check (created_by = auth.uid());

create table if not exists public.course_lessons (
  id uuid primary key default gen_random_uuid(),
  course_id uuid, title text, content text,
  "order" int, lesson_type text,
  created_at timestamptz default now()
);
alter table public.course_lessons enable row level security;
drop policy if exists "course_lessons_read" on public.course_lessons;
create policy "course_lessons_read" on public.course_lessons for select using (true);

create table if not exists public.practice_tests (
  id uuid primary key default gen_random_uuid(),
  course_id uuid, title text, questions jsonb,
  time_limit_minutes int, passing_score int,
  created_by uuid, created_at timestamptz default now()
);
alter table public.practice_tests enable row level security;
drop policy if exists "practice_tests_read" on public.practice_tests;
create policy "practice_tests_read" on public.practice_tests for select using (true);
drop policy if exists "practice_tests_owner_all" on public.practice_tests;
create policy "practice_tests_owner_all" on public.practice_tests
  for all using (created_by = auth.uid()) with check (created_by = auth.uid());

create table if not exists public.challenges (
  id uuid primary key default gen_random_uuid(),
  title text, description text, challenge_type text,
  goal int, points_reward int, badge_reward text,
  starts_at timestamptz, ends_at timestamptz,
  is_seasonal boolean default false, season text, is_active boolean default true,
  created_at timestamptz default now()
);
alter table public.challenges enable row level security;
drop policy if exists "challenges_read" on public.challenges;
create policy "challenges_read" on public.challenges for select using (true);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text, description text, event_type text,
  starts_at timestamptz, ends_at timestamptz,
  banner_url text, prizes jsonb, is_active boolean default true,
  created_at timestamptz default now()
);
alter table public.events enable row level security;
drop policy if exists "events_read" on public.events;
create policy "events_read" on public.events for select using (true);

create table if not exists public.badge_rules (
  id uuid primary key default gen_random_uuid(),
  name text, description text, icon text, category text,
  condition_type text, condition_threshold int, is_auto boolean default true,
  created_at timestamptz default now()
);
alter table public.badge_rules enable row level security;
drop policy if exists "badge_rules_read" on public.badge_rules;
create policy "badge_rules_read" on public.badge_rules for select using (true);

create table if not exists public.api_endpoints (
  id uuid primary key default gen_random_uuid(),
  path text, method text, description text, category text,
  min_plan text, example_response text, is_active boolean default true,
  created_at timestamptz default now()
);
alter table public.api_endpoints enable row level security;
drop policy if exists "api_endpoints_read" on public.api_endpoints;
create policy "api_endpoints_read" on public.api_endpoints for select using (true);

create table if not exists public.rate_tiers (
  id uuid primary key default gen_random_uuid(),
  name text, requests_per_hour int, price numeric,
  is_active boolean default true, created_at timestamptz default now()
);
alter table public.rate_tiers enable row level security;
drop policy if exists "rate_tiers_read" on public.rate_tiers;
create policy "rate_tiers_read" on public.rate_tiers for select using (true);

create table if not exists public.apk_versions (
  id uuid primary key default gen_random_uuid(),
  version_name text, version_code int, file_name text, file_size bigint,
  notes text, storage_path text, app text,
  created_at timestamptz default now(), download_count bigint default 0
);
alter table public.apk_versions enable row level security;
drop policy if exists "apk_versions_read" on public.apk_versions;
create policy "apk_versions_read" on public.apk_versions for select using (true);

create table if not exists public.admin_settings (
  name text primary key,
  value text
);
alter table public.admin_settings enable row level security;
drop policy if exists "admin_settings_read" on public.admin_settings;
create policy "admin_settings_read" on public.admin_settings for select using (true);

-- ===========================================================================
-- USER DATA TABLES (owner-scoped)
-- ===========================================================================

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text, avatar_url text, role text,
  username text, bio text,
  is_tutor boolean default false, is_mentor boolean default false,
  score_points int default 0,
  created_at timestamptz default now(), updated_at timestamptz default now()
);
alter table public.profiles enable row level security;
drop policy if exists "profiles_read" on public.profiles;
create policy "profiles_read" on public.profiles for select using (true);
drop policy if exists "profiles_self_update" on public.profiles;
create policy "profiles_self_update" on public.profiles
  for update using (id = auth.uid()) with check (id = auth.uid());
drop policy if exists "profiles_self_insert" on public.profiles;
create policy "profiles_self_insert" on public.profiles
  for insert with check (id = auth.uid());

create table if not exists public.user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete cascade,
  current_track text, current_level int, current_gov_class text,
  xp int default 0, streak int default 0,
  completed_lessons text[], quiz_scores jsonb, skill_progress jsonb,
  updated_at timestamptz default now()
);
alter table public.user_progress enable row level security;
drop policy if exists "user_progress_own_select" on public.user_progress;
create policy "user_progress_own_select" on public.user_progress for select using (user_id = auth.uid());
drop policy if exists "user_progress_own_insert" on public.user_progress;
create policy "user_progress_own_insert" on public.user_progress for insert with check (user_id = auth.uid());
drop policy if exists "user_progress_own_update" on public.user_progress;
create policy "user_progress_own_update" on public.user_progress for update using (user_id = auth.uid()) with check (user_id = auth.uid());

create table if not exists public.user_scores (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete cascade,
  total_points int default 0,
  texts_uploaded int default 0, annotations_made int default 0,
  lessons_completed int default 0, votes_cast int default 0, comments_made int default 0,
  updated_at timestamptz default now()
);
alter table public.user_scores enable row level security;
drop policy if exists "user_scores_own_select" on public.user_scores;
create policy "user_scores_own_select" on public.user_scores for select using (user_id = auth.uid());
drop policy if exists "user_scores_own_insert" on public.user_scores;
create policy "user_scores_own_insert" on public.user_scores for insert with check (user_id = auth.uid());
drop policy if exists "user_scores_own_update" on public.user_scores;
create policy "user_scores_own_update" on public.user_scores for update using (user_id = auth.uid()) with check (user_id = auth.uid());

create table if not exists public.streaks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete cascade,
  current_streak int default 0, longest_streak int default 0,
  last_activity timestamptz, streak_freeze boolean default false
);
alter table public.streaks enable row level security;
drop policy if exists "streaks_own_select" on public.streaks;
create policy "streaks_own_select" on public.streaks for select using (user_id = auth.uid());
drop policy if exists "streaks_own_insert" on public.streaks;
create policy "streaks_own_insert" on public.streaks for insert with check (user_id = auth.uid());
drop policy if exists "streaks_own_update" on public.streaks;
create policy "streaks_own_update" on public.streaks for update using (user_id = auth.uid()) with check (user_id = auth.uid());

create table if not exists public.user_badges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete cascade,
  name text, description text, icon text,
  created_at timestamptz default now()
);
alter table public.user_badges enable row level security;
drop policy if exists "user_badges_own" on public.user_badges;
create policy "user_badges_own" on public.user_badges
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create table if not exists public.badges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete cascade,
  name text, description text, icon text, category text,
  created_at timestamptz default now()
);
alter table public.badges enable row level security;
drop policy if exists "badges_own" on public.badges;
create policy "badges_own" on public.badges
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create table if not exists public.assessment_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete cascade,
  lesson_id text, score numeric, max_score int,
  answers jsonb, time_spent_sec int,
  created_at timestamptz default now()
);
alter table public.assessment_attempts enable row level security;
drop policy if exists "assessment_attempts_own_all" on public.assessment_attempts;
create policy "assessment_attempts_own_all" on public.assessment_attempts
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create table if not exists public.annotations (
  id uuid primary key default gen_random_uuid(),
  text_id text, user_id uuid references auth.users (id) on delete cascade,
  layer text, content text,
  start_offset int, end_offset int,
  upvotes int default 0,
  created_at timestamptz default now(), updated_at timestamptz default now()
);
alter table public.annotations enable row level security;
drop policy if exists "annotations_read" on public.annotations;
create policy "annotations_read" on public.annotations for select using (true);
drop policy if exists "annotations_own_insert" on public.annotations;
create policy "annotations_own_insert" on public.annotations for insert with check (user_id = auth.uid());
drop policy if exists "annotations_own_delete" on public.annotations;
create policy "annotations_own_delete" on public.annotations for delete using (user_id = auth.uid());

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  content text, author_id uuid references auth.users (id) on delete cascade,
  parent_type text, parent_id uuid,
  created_at timestamptz default now()
);
alter table public.comments enable row level security;
drop policy if exists "comments_read" on public.comments;
create policy "comments_read" on public.comments for select using (true);
drop policy if exists "comments_insert" on public.comments;
create policy "comments_insert" on public.comments for insert with check (author_id = auth.uid());
drop policy if exists "comments_own_delete" on public.comments;
create policy "comments_own_delete" on public.comments for delete using (author_id = auth.uid());

create table if not exists public.community_posts (
  id uuid primary key default gen_random_uuid(),
  title text, content text, post_type text,
  author_id uuid references auth.users (id) on delete cascade,
  votes int default 0, tags jsonb,
  created_at timestamptz default now(), updated_at timestamptz default now()
);
alter table public.community_posts enable row level security;
drop policy if exists "community_posts_read" on public.community_posts;
create policy "community_posts_read" on public.community_posts for select using (true);
drop policy if exists "community_posts_own_all" on public.community_posts;
create policy "community_posts_own_all" on public.community_posts
  for all using (author_id = auth.uid()) with check (author_id = auth.uid());

create table if not exists public.lesson_forks (
  id uuid primary key default gen_random_uuid(),
  original_lesson_id text, forked_by uuid references auth.users (id) on delete cascade,
  title text, content text, version int default 1,
  parent_fork_id uuid,
  created_at timestamptz default now(), updated_at timestamptz default now()
);
alter table public.lesson_forks enable row level security;
drop policy if exists "lesson_forks_read" on public.lesson_forks;
create policy "lesson_forks_read" on public.lesson_forks for select using (true);
drop policy if exists "lesson_forks_owner_all" on public.lesson_forks;
create policy "lesson_forks_owner_all" on public.lesson_forks
  for all using (forked_by = auth.uid()) with check (forked_by = auth.uid());

create table if not exists public.course_versions (
  id uuid primary key default gen_random_uuid(),
  course_id uuid, version int default 1, snapshot jsonb, changelog text,
  created_by uuid references auth.users (id) on delete cascade,
  created_at timestamptz default now()
);
alter table public.course_versions enable row level security;
drop policy if exists "course_versions_owner_all" on public.course_versions;
create policy "course_versions_owner_all" on public.course_versions
  for all using (created_by = auth.uid()) with check (created_by = auth.uid());

create table if not exists public.test_attempts (
  id uuid primary key default gen_random_uuid(),
  test_id uuid, user_id uuid references auth.users (id) on delete cascade,
  answers jsonb, score int, passed boolean,
  started_at timestamptz, completed_at timestamptz
);
alter table public.test_attempts enable row level security;
drop policy if exists "test_attempts_own_all" on public.test_attempts;
create policy "test_attempts_own_all" on public.test_attempts
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create table if not exists public.challenge_progress (
  id uuid primary key default gen_random_uuid(),
  challenge_id uuid, user_id uuid references auth.users (id) on delete cascade,
  progress int default 0, completed boolean default false, completed_at timestamptz,
  created_at timestamptz default now()
);
alter table public.challenge_progress enable row level security;
drop policy if exists "challenge_progress_own" on public.challenge_progress;
create policy "challenge_progress_own" on public.challenge_progress
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create table if not exists public.challenge_participants (
  id uuid primary key default gen_random_uuid(),
  challenge_id uuid, user_id uuid references auth.users (id) on delete cascade,
  progress int default 0, completed boolean default false, completed_at timestamptz,
  created_at timestamptz default now()
);
alter table public.challenge_participants enable row level security;
drop policy if exists "challenge_participants_own" on public.challenge_participants;
create policy "challenge_participants_own" on public.challenge_participants
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create table if not exists public.mentor_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete cascade,
  headline text, bio text, languages jsonb, specializations jsonb,
  is_available boolean default true,
  total_sessions int default 0, rating int default 0, thanks_count int default 0,
  badge text, created_at timestamptz default now()
);
alter table public.mentor_profiles enable row level security;
drop policy if exists "mentor_profiles_read" on public.mentor_profiles;
create policy "mentor_profiles_read" on public.mentor_profiles for select using (true);
drop policy if exists "mentor_profiles_own_all" on public.mentor_profiles;
create policy "mentor_profiles_own_all" on public.mentor_profiles
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create table if not exists public.mentors (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete cascade,
  headline text, bio text, languages jsonb, specializations jsonb,
  is_available boolean default true,
  total_sessions int default 0, rating int default 0, thanks_count int default 0,
  badge text, created_at timestamptz default now()
);
alter table public.mentors enable row level security;
drop policy if exists "mentors_read" on public.mentors;
create policy "mentors_read" on public.mentors for select using (true);
drop policy if exists "mentors_own_all" on public.mentors;
create policy "mentors_own_all" on public.mentors
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create table if not exists public.mentorship_sessions (
  id uuid primary key default gen_random_uuid(),
  mentor_id uuid, learner_id uuid references auth.users (id) on delete cascade,
  status text, session_type text,
  scheduled_at timestamptz, duration_minutes int, notes text,
  created_at timestamptz default now()
);
alter table public.mentorship_sessions enable row level security;
drop policy if exists "mentorship_sessions_owner" on public.mentorship_sessions;
create policy "mentorship_sessions_owner" on public.mentorship_sessions
  for all using (learner_id = auth.uid()) with check (learner_id = auth.uid());

create table if not exists public.mentor_requests (
  id uuid primary key default gen_random_uuid(),
  learner_id uuid references auth.users (id) on delete cascade,
  mentor_id uuid, status text default 'pending',
  question text, context text,
  created_at timestamptz default now(), resolved_at timestamptz
);
alter table public.mentor_requests enable row level security;
drop policy if exists "mentor_requests_insert" on public.mentor_requests;
create policy "mentor_requests_insert" on public.mentor_requests
  for insert with check (learner_id = auth.uid());
drop policy if exists "mentor_requests_own_select" on public.mentor_requests;
create policy "mentor_requests_own_select" on public.mentor_requests
  for select using (learner_id = auth.uid());

create table if not exists public.thank_yous (
  id uuid primary key default gen_random_uuid(),
  session_id uuid, giver_id uuid references auth.users (id) on delete cascade,
  mentor_id uuid, rating int, message text,
  created_at timestamptz default now()
);
alter table public.thank_yous enable row level security;
drop policy if exists "thank_yous_insert" on public.thank_yous;
create policy "thank_yous_insert" on public.thank_yous for insert with check (giver_id = auth.uid());
drop policy if exists "thank_yous_own_select" on public.thank_yous;
create policy "thank_yous_own_select" on public.thank_yous for select using (giver_id = auth.uid());

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid references auth.users (id) on delete cascade,
  target_type text, target_id uuid, reason text,
  status text default 'open', reviewed_by uuid,
  created_at timestamptz default now()
);
alter table public.reports enable row level security;
drop policy if exists "reports_insert" on public.reports;
create policy "reports_insert" on public.reports for insert with check (reporter_id = auth.uid());
drop policy if exists "reports_own_select" on public.reports;
create policy "reports_own_select" on public.reports for select using (reporter_id = auth.uid());

create table if not exists public.developer_apps (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete cascade,
  name text, description text,
  api_key text, api_key_prefix text,
  rate_plan text, requests_per_hour int,
  is_active boolean default true, last_used_at timestamptz,
  created_at timestamptz default now()
);
alter table public.developer_apps enable row level security;
drop policy if exists "developer_apps_owner_all" on public.developer_apps;
create policy "developer_apps_owner_all" on public.developer_apps
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create table if not exists public.api_usage_logs (
  id uuid primary key default gen_random_uuid(),
  app_id uuid, endpoint text, method text,
  status_code int, response_time_ms int,
  created_at timestamptz default now()
);
alter table public.api_usage_logs enable row level security;
drop policy if exists "api_usage_logs_owner_select" on public.api_usage_logs;
create policy "api_usage_logs_owner_select" on public.api_usage_logs
  for select using (app_id in (select id from public.developer_apps where user_id = auth.uid()));

create table if not exists public.project_requests (
  id uuid primary key default gen_random_uuid(),
  title text, description text, author text,
  status text default 'open', created_at timestamptz default now()
);
alter table public.project_requests enable row level security;
drop policy if exists "project_requests_read" on public.project_requests;
create policy "project_requests_read" on public.project_requests for select using (true);
drop policy if exists "project_requests_insert" on public.project_requests;
create policy "project_requests_insert" on public.project_requests for insert with check (true);

-- ===========================================================================
-- SCHOOLS DOMAIN (edge function uses service role; client gets owner access)
-- ===========================================================================

create table if not exists public.schools (
  id uuid primary key default gen_random_uuid(),
  udise_code text, cbse_affiliation_no text, cbse_exam_code text,
  name text not null, short_code text,
  school_type text, management text, board text, medium text[],
  affiliation_status text, address text, city text, district text,
  state text, pincode text, phone text, email text, website text,
  principal_name text, source text,
  is_active boolean default true,
  owner_id uuid references auth.users (id) on delete set null,
  owner_email text,
  created_at timestamptz default now(), updated_at timestamptz default now()
);
alter table public.schools enable row level security;
drop policy if exists "schools_read" on public.schools;
create policy "schools_read" on public.schools for select using (true);
drop policy if exists "schools_owner_update" on public.schools;
create policy "schools_owner_update" on public.schools
  for update using (owner_id = auth.uid()) with check (owner_id = auth.uid());

create table if not exists public.school_teachers (
  id uuid primary key default gen_random_uuid(),
  school_id uuid references public.schools (id) on delete cascade,
  teacher_code text,
  name text, email text, phone text, designation text,
  subjects text[], qualification text,
  joining_date date, status text default 'active',
  created_at timestamptz default now(), updated_at timestamptz default now()
);
alter table public.school_teachers enable row level security;
drop policy if exists "school_teachers_read" on public.school_teachers;
create policy "school_teachers_read" on public.school_teachers for select using (true);
drop policy if exists "school_teachers_owner_all" on public.school_teachers;
create policy "school_teachers_owner_all" on public.school_teachers
  for all using (school_id in (select id from public.schools where owner_id = auth.uid()))
  with check (school_id in (select id from public.schools where owner_id = auth.uid()));

create table if not exists public.school_settings (
  id uuid primary key default gen_random_uuid(),
  school_id uuid references public.schools (id) on delete cascade,
  branding jsonb, features jsonb, curriculum jsonb,
  updated_by uuid,
  created_at timestamptz default now(), updated_at timestamptz default now()
);
alter table public.school_settings enable row level security;
drop policy if exists "school_settings_owner_all" on public.school_settings;
create policy "school_settings_owner_all" on public.school_settings
  for all using (school_id in (select id from public.schools where owner_id = auth.uid()))
  with check (school_id in (select id from public.schools where owner_id = auth.uid()));

create table if not exists public.school_classes (
  id uuid primary key default gen_random_uuid(),
  school_id uuid references public.schools (id) on delete cascade,
  name text, class_teacher_id uuid,
  is_active boolean default true,
  created_at timestamptz default now(), updated_at timestamptz default now()
);
alter table public.school_classes enable row level security;
drop policy if exists "school_classes_read" on public.school_classes;
create policy "school_classes_read" on public.school_classes for select using (true);
drop policy if exists "school_classes_owner_all" on public.school_classes;
create policy "school_classes_owner_all" on public.school_classes
  for all using (school_id in (select id from public.schools where owner_id = auth.uid()))
  with check (school_id in (select id from public.schools where owner_id = auth.uid()));

create table if not exists public.class_sections (
  id uuid primary key default gen_random_uuid(),
  class_id uuid references public.school_classes (id) on delete cascade,
  name text, student_count int default 0,
  is_active boolean default true,
  created_at timestamptz default now(), updated_at timestamptz default now()
);
alter table public.class_sections enable row level security;
drop policy if exists "class_sections_read" on public.class_sections;
create policy "class_sections_read" on public.class_sections for select using (true);
drop policy if exists "class_sections_owner_all" on public.class_sections;
create policy "class_sections_owner_all" on public.class_sections
  for all using (class_id in (
    select c.id from public.school_classes c join public.schools s on s.id = c.school_id where s.owner_id = auth.uid()
  ))
  with check (class_id in (
    select c.id from public.school_classes c join public.schools s on s.id = c.school_id where s.owner_id = auth.uid()
  ));

create table if not exists public.students (
  id uuid primary key default gen_random_uuid(),
  school_id uuid references public.schools (id) on delete cascade,
  class_id uuid, section_id uuid,
  admission_no text, roll_no text,
  name text not null, gender text,
  date_of_birth date, admission_date date,
  father_name text, mother_name text, phone text, address text,
  status text default 'active', is_active boolean default true,
  lab_code text,
  created_at timestamptz default now(), updated_at timestamptz default now()
);
alter table public.students enable row level security;
drop policy if exists "students_owner_all" on public.students;
create policy "students_owner_all" on public.students
  for all using (school_id in (select id from public.schools where owner_id = auth.uid()))
  with check (school_id in (select id from public.schools where owner_id = auth.uid()));

-- ===========================================================================
-- SMART CLASSROOM (sc_*) — device/hardware demo tables
-- ===========================================================================

create table if not exists public.sc_users (
  id bigint generated by default as identity primary key,
  name text, email text, password text, role text
);
alter table public.sc_users enable row level security;
drop policy if exists "sc_users_read" on public.sc_users;
create policy "sc_users_read" on public.sc_users for select using (true);
drop policy if exists "sc_users_insert" on public.sc_users;
create policy "sc_users_insert" on public.sc_users for insert with check (true);

create table if not exists public.sc_noise_logs (
  id bigint generated by default as identity primary key,
  level float8, status text, timestamp timestamptz default now()
);
alter table public.sc_noise_logs enable row level security;
drop policy if exists "sc_noise_logs_read" on public.sc_noise_logs;
create policy "sc_noise_logs_read" on public.sc_noise_logs for select using (true);
drop policy if exists "sc_noise_logs_insert" on public.sc_noise_logs;
create policy "sc_noise_logs_insert" on public.sc_noise_logs for insert with check (true);

create table if not exists public.sc_light_logs (
  id bigint generated by default as identity primary key,
  brightness float8, daylight float8, occupancy boolean, auto_mode boolean,
  timestamp timestamptz default now()
);
alter table public.sc_light_logs enable row level security;
drop policy if exists "sc_light_logs_read" on public.sc_light_logs;
create policy "sc_light_logs_read" on public.sc_light_logs for select using (true);
drop policy if exists "sc_light_logs_insert" on public.sc_light_logs;
create policy "sc_light_logs_insert" on public.sc_light_logs for insert with check (true);

create table if not exists public.sc_photo_captures (
  id bigint generated by default as identity primary key,
  url text, approved boolean default false, consent_given boolean default false,
  timestamp timestamptz default now()
);
alter table public.sc_photo_captures enable row level security;
drop policy if exists "sc_photo_captures_read" on public.sc_photo_captures;
create policy "sc_photo_captures_read" on public.sc_photo_captures for select using (true);
drop policy if exists "sc_photo_captures_insert" on public.sc_photo_captures;
create policy "sc_photo_captures_insert" on public.sc_photo_captures for insert with check (true);

create table if not exists public.sc_discipline_scores (
  id bigint generated by default as identity primary key,
  class_name text, points int default 0, streak int default 0,
  updated_at timestamptz default now()
);
alter table public.sc_discipline_scores enable row level security;
drop policy if exists "sc_discipline_scores_read" on public.sc_discipline_scores;
create policy "sc_discipline_scores_read" on public.sc_discipline_scores for select using (true);
drop policy if exists "sc_discipline_scores_insert" on public.sc_discipline_scores;
create policy "sc_discipline_scores_insert" on public.sc_discipline_scores for insert with check (true);

-- ===========================================================================
-- INDEXES
-- ===========================================================================

-- lookups
create index if not exists idx_dictionary_word_trgm on public.dictionary using gin (word gin_trgm_ops);
create index if not exists idx_dictionary_meanings_gin on public.dictionary using gin (meanings);
create index if not exists idx_dictionary_root on public.dictionary (root);
create index if not exists idx_texts_title_trgm on public.texts using gin (title gin_trgm_ops);
create index if not exists idx_texts_content_trgm on public.texts using gin (content gin_trgm_ops);
create index if not exists idx_lessons_level_sort on public.lessons (level, sort_order);
create index if not exists idx_lessons_title_trgm on public.lessons using gin (title gin_trgm_ops);
create index if not exists idx_books_category on public.books (category, sort_order);
create index if not exists idx_books_title_trgm on public.books using gin (title gin_trgm_ops);
create index if not exists idx_chapters_book on public.chapters (book_id, chapter_number);
create index if not exists idx_corpus_title_trgm on public.corpus_texts using gin (title gin_trgm_ops);
create index if not exists idx_corpus_lang on public.corpus_texts (language);
create index if not exists idx_annotations_text on public.annotations (text_id);
create index if not exists idx_comments_parent on public.comments (parent_type, parent_id);
create index if not exists idx_flashcards_course on public.flashcards (course_id);
create index if not exists idx_assessment_user on public.assessment_attempts (user_id, created_at desc);
create index if not exists idx_schools_name_trgm on public.schools using gin (name gin_trgm_ops);
create index if not exists idx_students_school on public.students (school_id);
create index if not exists idx_teachers_school on public.school_teachers (school_id);
create index if not exists idx_classes_school on public.school_classes (school_id);
create index if not exists idx_sections_class on public.class_sections (class_id);

-- one row per user (client uses .single())
create unique index if not exists uq_user_progress_user on public.user_progress (user_id);
create unique index if not exists uq_user_scores_user on public.user_scores (user_id);
create unique index if not exists uq_streaks_user on public.streaks (user_id);
create unique index if not exists uq_school_settings_school on public.school_settings (school_id);
create unique index if not exists uq_schools_short_code on public.schools (short_code) where short_code is not null;
create unique index if not exists uq_schools_udise on public.schools (udise_code) where udise_code is not null;
create unique index if not exists students_lab_code_school_uniq on public.students (school_id, lab_code) where lab_code is not null;
create unique index if not exists uq_teachers_code_school on public.school_teachers (school_id, teacher_code) where teacher_code is not null;

-- ===========================================================================
-- RPC FUNCTIONS used by the app
-- ===========================================================================

create or replace function public.increment_user_score(uid uuid, points integer)
returns void language plpgsql security definer set search_path = public as $$
begin
  insert into public.user_scores (user_id, total_points)
  values (uid, points)
  on conflict (user_id) do update set total_points = public.user_scores.total_points + points, updated_at = now();
end $$;

create or replace function public.increment_annotation_upvotes(ann_id uuid)
returns void language plpgsql security definer set search_path = public as $$
begin
  update public.annotations set upvotes = upvotes + 1 where id = ann_id;
end $$;

create or replace function public.increment_download(p_id uuid)
returns void language sql security definer set search_path = public as $$
  update public.apk_versions set download_count = download_count + 1 where id = p_id;
$$;

-- Admin-only helpers: service_role (edge functions) only, never anon/authenticated
create or replace function public.admin_delete_release(p_key text, p_id uuid)
returns void language plpgsql security definer set search_path = public as $$
begin
  if p_key = current_setting('app.admin_key', true) then
    delete from public.apk_versions where id = p_id;
  end if;
end $$;

create or replace function public.set_project_status(request_id uuid, new_status text)
returns void language plpgsql security definer set search_path = public as $$
begin
  update public.project_requests set status = new_status where id = request_id;
end $$;

revoke execute on function public.admin_delete_release(text, uuid) from anon, authenticated;
revoke execute on function public.admin_delete_release(text, uuid) from public;
revoke execute on function public.set_project_status(uuid, text) from anon, authenticated;
revoke execute on function public.set_project_status(uuid, text) from public;

-- ===========================================================================
-- updated_at triggers
-- ===========================================================================

drop trigger if exists trg_profiles_updated on public.profiles;
create trigger trg_profiles_updated before update on public.profiles
  for each row execute function public.set_updated_at();
drop trigger if exists trg_user_progress_updated on public.user_progress;
create trigger trg_user_progress_updated before update on public.user_progress
  for each row execute function public.set_updated_at();
drop trigger if exists trg_schools_updated on public.schools;
create trigger trg_schools_updated before update on public.schools
  for each row execute function public.set_updated_at();
drop trigger if exists trg_students_updated on public.students;
create trigger trg_students_updated before update on public.students
  for each row execute function public.set_updated_at();
drop trigger if exists trg_school_classes_updated on public.school_classes;
create trigger trg_school_classes_updated before update on public.school_classes
  for each row execute function public.set_updated_at();
drop trigger if exists trg_class_sections_updated on public.class_sections;
create trigger trg_class_sections_updated before update on public.class_sections
  for each row execute function public.set_updated_at();
drop trigger if exists trg_school_teachers_updated on public.school_teachers;
create trigger trg_school_teachers_updated before update on public.school_teachers
  for each row execute function public.set_updated_at();
drop trigger if exists trg_school_settings_updated on public.school_settings;
create trigger trg_school_settings_updated before update on public.school_settings
  for each row execute function public.set_updated_at();
drop trigger if exists trg_annotations_updated on public.annotations;
create trigger trg_annotations_updated before update on public.annotations
  for each row execute function public.set_updated_at();

-- ===========================================================================
-- SEED: badge rules (needed by the badges engine)
-- ===========================================================================

insert into public.badge_rules (name, description, icon, category, condition_type, condition_threshold, is_auto)
select * from (values
  ('First Step', 'Complete your first lesson', '🌱', 'learning', 'lessons_completed', 1, true),
  ('Scholar', 'Complete 25 lessons', '📚', 'learning', 'lessons_completed', 25, true),
  ('Sanskrit Sage', 'Complete 100 lessons', '🧘', 'learning', 'lessons_completed', 100, true),
  ('Word Wizard', 'Look up 50 dictionary words', '🔍', 'vocabulary', 'lookups', 50, true),
  ('Voice Master', 'Complete 10 speaking drills', '🎤', 'speaking', 'speaking_drills', 10, true),
  ('Streak Keeper', 'Maintain a 7 day streak', '🔥', 'consistency', 'streak_days', 7, true),
  ('Shloka Lover', 'Read 10 shlokas', '🪔', 'reading', 'shlokas_read', 10, true),
  ('Contributor', 'Add your first annotation', '🏛️', 'community', 'annotations_made', 1, true)
) as seed(name, description, icon, category, condition_type, condition_threshold, is_auto)
where not exists (select 1 from public.badge_rules);

-- ===========================================================================
-- TOOL CONTENT TABLES (seeded by migration tool_content_tables)
-- ===========================================================================

create table if not exists public.sentence_builder_sentences (
  id text primary key, level text, sa text, iast text, en text, words jsonb
);
alter table public.sentence_builder_sentences enable row level security;
drop policy if exists "sbs_read" on public.sentence_builder_sentences;
create policy "sbs_read" on public.sentence_builder_sentences for select using (true);

create table if not exists public.real_world_concepts (
  id bigserial primary key, word text, iast text, meaning text, today text, example text, example_en text, emoji text
);
alter table public.real_world_concepts enable row level security;
drop policy if exists "rwc_read" on public.real_world_concepts;
create policy "rwc_read" on public.real_world_concepts for select using (true);

create table if not exists public.culture_festivals (
  id text primary key, name text, emoji text, month int, day int, approx text, tithi text, meaning text, how text, phrase text, phrase_en text
);
alter table public.culture_festivals enable row level security;
drop policy if exists "cf_read" on public.culture_festivals;
create policy "cf_read" on public.culture_festivals for select using (true);

create table if not exists public.culture_ritus (
  id bigserial primary key, name text, months text, season text, emoji text, verse text
);
alter table public.culture_ritus enable row level security;
drop policy if exists "cr_read" on public.culture_ritus;
create policy "cr_read" on public.culture_ritus for select using (true);

create table if not exists public.quotes (
  id text primary key, sa text, iast text, en text, speaker text, source text, category text
);
alter table public.quotes enable row level security;
drop policy if exists "quotes_read" on public.quotes;
create policy "quotes_read" on public.quotes for select using (true);

create table if not exists public.concept_explorer_concepts (
  id text primary key, sa text, en text, cat text, def text, detail text, example text, example_en text, related jsonb, emoji text
);
alter table public.concept_explorer_concepts enable row level security;
drop policy if exists "cec_read" on public.concept_explorer_concepts;
create policy "cec_read" on public.concept_explorer_concepts for select using (true);

create table if not exists public.game_word_pairs (
  id bigserial primary key, sa text, iast text, en text
);
alter table public.game_word_pairs enable row level security;
drop policy if exists "gwp_read" on public.game_word_pairs;
create policy "gwp_read" on public.game_word_pairs for select using (true);

create table if not exists public.game_numbers (
  id bigserial primary key, n int, dev text, word text, iast text
);
alter table public.game_numbers enable row level security;
drop policy if exists "gn_read" on public.game_numbers;
create policy "gn_read" on public.game_numbers for select using (true);

create table if not exists public.game_sandhi_pairs (
  id bigserial primary key, a text, b text
);
alter table public.game_sandhi_pairs enable row level security;
drop policy if exists "gsp_read" on public.game_sandhi_pairs;
create policy "gsp_read" on public.game_sandhi_pairs for select using (true);

create table if not exists public.debate_topics (
  id text primary key, title text, emoji text, question text, for_side jsonb, against_side jsonb
);
alter table public.debate_topics enable row level security;
drop policy if exists "dt_read" on public.debate_topics;
create policy "dt_read" on public.debate_topics for select using (true);

create table if not exists public.creative_meters (
  id bigserial primary key, name text, syllables int, lines int, description text
);
alter table public.creative_meters enable row level security;
drop policy if exists "cm_read" on public.creative_meters;
create policy "cm_read" on public.creative_meters for select using (true);

create table if not exists public.creative_themes (
  id text primary key, emoji text, title text, words jsonb, templates jsonb
);
alter table public.creative_themes enable row level security;
drop policy if exists "ct_read" on public.creative_themes;
create policy "ct_read" on public.creative_themes for select using (true);

-- ===========================================================================
-- TOOL USER DATA TABLES (owner-scoped; synced by services/userDb.ts)
-- ===========================================================================

create table if not exists public.srs_state (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete cascade,
  state jsonb,
  updated_at timestamptz default now()
);
alter table public.srs_state enable row level security;
drop policy if exists "srs_state_own_all" on public.srs_state;
create policy "srs_state_own_all" on public.srs_state
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create unique index if not exists uq_srs_state_user on public.srs_state (user_id);

create table if not exists public.custom_quizzes (
  id text primary key,
  user_id uuid references auth.users (id) on delete cascade,
  quiz jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table public.custom_quizzes enable row level security;
drop policy if exists "custom_quizzes_own_all" on public.custom_quizzes;
create policy "custom_quizzes_own_all" on public.custom_quizzes
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create index if not exists idx_custom_quizzes_user on public.custom_quizzes (user_id);

create table if not exists public.jeopardy_boards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete cascade,
  kind text default 'play',
  state jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table public.jeopardy_boards enable row level security;
drop policy if exists "jeopardy_boards_own_all" on public.jeopardy_boards;
create policy "jeopardy_boards_own_all" on public.jeopardy_boards
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create unique index if not exists uq_jeopardy_user_kind on public.jeopardy_boards (user_id, kind);

create table if not exists public.lab_stats (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete cascade,
  stats jsonb,
  updated_at timestamptz default now()
);
alter table public.lab_stats enable row level security;
drop policy if exists "lab_stats_own_all" on public.lab_stats;
create policy "lab_stats_own_all" on public.lab_stats
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create unique index if not exists uq_lab_stats_user on public.lab_stats (user_id);

create table if not exists public.viva_questions (
  id text primary key,
  question text not null,
  key_points jsonb not null,
  difficulty int not null
);
alter table public.viva_questions enable row level security;
drop policy if exists "viva_questions_read" on public.viva_questions;
create policy "viva_questions_read" on public.viva_questions for select using (true);
grant select on public.viva_questions to anon, authenticated;

create table if not exists public.timeline_events (
  id serial primary key,
  year text not null,
  title text not null,
  description text not null,
  category text not null
);
alter table public.timeline_events enable row level security;
drop policy if exists "timeline_events_read" on public.timeline_events;
create policy "timeline_events_read" on public.timeline_events for select using (true);
grant select on public.timeline_events to anon, authenticated;

create table if not exists public.grammar_rules (
  id text primary key,
  rule text not null,
  meaning text not null,
  category text not null
);
alter table public.grammar_rules enable row level security;
drop policy if exists "grammar_rules_read" on public.grammar_rules;
create policy "grammar_rules_read" on public.grammar_rules for select using (true);
grant select on public.grammar_rules to anon, authenticated;

create table if not exists public.philosophy_networks (
  id serial primary key,
  name text not null,
  focus text not null,
  texts text not null,
  color text not null
);
alter table public.philosophy_networks enable row level security;
drop policy if exists "philosophy_networks_read" on public.philosophy_networks;
create policy "philosophy_networks_read" on public.philosophy_networks for select using (true);
grant select on public.philosophy_networks to anon, authenticated;

create table if not exists public.viewer_manuscripts (
  id int primary key,
  name text not null,
  script text not null,
  period text not null,
  transcription text not null,
  color text not null
);
alter table public.viewer_manuscripts enable row level security;
drop policy if exists "viewer_manuscripts_read" on public.viewer_manuscripts;
create policy "viewer_manuscripts_read" on public.viewer_manuscripts for select using (true);
grant select on public.viewer_manuscripts to anon, authenticated;

create table if not exists public.shlokas (
  id serial primary key,
  dev text not null,
  iast text not null,
  translation text not null,
  source text not null
);
alter table public.shlokas enable row level security;
drop policy if exists "shlokas_read" on public.shlokas;
create policy "shlokas_read" on public.shlokas for select using (true);
grant select on public.shlokas to anon, authenticated;

create table if not exists public.dhatus (
  id serial primary key,
  root text not null,
  iast text not null,
  gana text not null,
  gana_num int not null,
  meaning text not null,
  present text not null
);
alter table public.dhatus enable row level security;
drop policy if exists "dhatus_read" on public.dhatus;
create policy "dhatus_read" on public.dhatus for select using (true);
grant select on public.dhatus to anon, authenticated;

create table if not exists public.jeopardy_prep_topics (
  id text primary key,
  title text not null,
  title_sanskrit text not null,
  icon text not null,
  summary text not null,
  points jsonb not null
);
alter table public.jeopardy_prep_topics enable row level security;
drop policy if exists "jeopardy_prep_topics_read" on public.jeopardy_prep_topics;
create policy "jeopardy_prep_topics_read" on public.jeopardy_prep_topics for select using (true);
grant select on public.jeopardy_prep_topics to anon, authenticated;

create table if not exists public.jeopardy_news (
  id text primary key,
  tag text not null,
  title text not null,
  excerpt text not null,
  date text not null,
  icon text not null
);
alter table public.jeopardy_news enable row level security;
drop policy if exists "jeopardy_news_read" on public.jeopardy_news;
create policy "jeopardy_news_read" on public.jeopardy_news for select using (true);
grant select on public.jeopardy_news to anon, authenticated;

create table if not exists public.jeopardy_questions (
  id text primary key,
  board text not null,
  category text not null,
  category_sanskrit text not null,
  icon text not null,
  value int not null default 0,
  clue text not null,
  answer text not null,
  options jsonb,
  correct int
);
alter table public.jeopardy_questions enable row level security;
drop policy if exists "jeopardy_questions_read" on public.jeopardy_questions;
create policy "jeopardy_questions_read" on public.jeopardy_questions for select using (true);
create index if not exists idx_jeopardy_questions_board on public.jeopardy_questions (board);
grant select on public.jeopardy_questions to anon, authenticated;

create table if not exists public.flashcard_decks (
  id text primary key,
  name text not null,
  icon text not null
);
alter table public.flashcard_decks enable row level security;
drop policy if exists "flashcard_decks_read" on public.flashcard_decks;
create policy "flashcard_decks_read" on public.flashcard_decks for select using (true);
grant select on public.flashcard_decks to anon, authenticated;

create table if not exists public.flashcards (
  id text primary key,
  front text not null,
  back text not null,
  hint text,
  tags jsonb not null,
  deck_id text not null references public.flashcard_decks (id) on delete cascade
);
alter table public.flashcards enable row level security;
drop policy if exists "flashcards_read" on public.flashcards;
create policy "flashcards_read" on public.flashcards for select using (true);
create index if not exists idx_flashcards_deck on public.flashcards (deck_id);
grant select on public.flashcards to anon, authenticated;

create table if not exists public.story_themes (
  id text primary key,
  emoji text not null,
  title text not null,
  words jsonb not null,
  intro jsonb not null,
  patterns jsonb not null,
  outro jsonb not null
);
alter table public.story_themes enable row level security;
drop policy if exists "story_themes_read" on public.story_themes;
create policy "story_themes_read" on public.story_themes for select using (true);
grant select on public.story_themes to anon, authenticated;

create table if not exists public.shloka_passages (
  id text primary key,
  title text not null,
  title_sanskrit text not null,
  level text not null,
  text text not null,
  transliteration text not null,
  translation text not null,
  words jsonb not null
);
alter table public.shloka_passages enable row level security;
drop policy if exists "shloka_passages_read" on public.shloka_passages;
create policy "shloka_passages_read" on public.shloka_passages for select using (true);
grant select on public.shloka_passages to anon, authenticated;

create table if not exists public.ocr_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  filename text not null,
  script text not null default 'Devanagari',
  text text not null,
  created_at timestamptz not null default now()
);
alter table public.ocr_results enable row level security;
drop policy if exists "ocr_owner_all" on public.ocr_results;
create policy "ocr_owner_all" on public.ocr_results
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create index if not exists idx_ocr_results_user on public.ocr_results (user_id, created_at desc);
grant select, insert, update, delete on public.ocr_results to authenticated;

create table if not exists public.user_stories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  theme_id text not null,
  title text not null,
  word1 text not null,
  word2 text not null,
  source text not null default 'template',
  story jsonb not null,
  created_at timestamptz not null default now()
);
alter table public.user_stories enable row level security;
drop policy if exists "stories_owner_all" on public.user_stories;
create policy "stories_owner_all" on public.user_stories
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create index if not exists idx_user_stories_user on public.user_stories (user_id, created_at desc);
grant select, insert, update, delete on public.user_stories to authenticated;

create table if not exists public.tool_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  tool text not null,
  input text not null,
  output text not null,
  created_at timestamptz not null default now()
);
alter table public.tool_history enable row level security;
drop policy if exists "history_owner_all" on public.tool_history;
create policy "history_owner_all" on public.tool_history
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create index if not exists idx_tool_history_user on public.tool_history (user_id, created_at desc);
grant select, insert, update, delete on public.tool_history to authenticated;