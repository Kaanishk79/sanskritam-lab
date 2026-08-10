-- SanskritLab security hardening
-- Locks down shared smart-classroom (sc_*) tables that previously granted
-- ANONYMOUS users full CRUD (sc_users held email + password).
-- Adds owner-scoped RLS policies for user tables that had RLS enabled but
-- zero policies (locked/broken). Adds an auto-provision trigger on signup.

-- ---------------------------------------------------------------
-- 1. sc_* shared tables: remove anonymous full access
-- ---------------------------------------------------------------
drop policy if exists anon_all_sc_noise_logs on public.sc_noise_logs;
drop policy if exists auth_all_sc_noise_logs on public.sc_noise_logs;
drop policy if exists anon_all_sc_light_logs on public.sc_light_logs;
drop policy if exists auth_all_sc_light_logs on public.sc_light_logs;
drop policy if exists anon_all_sc_photo_captures on public.sc_photo_captures;
drop policy if exists auth_all_sc_photo_captures on public.sc_photo_captures;
drop policy if exists anon_all_sc_discipline_scores on public.sc_discipline_scores;
drop policy if exists auth_all_sc_discipline_scores on public.sc_discipline_scores;
drop policy if exists anon_all_sc_users on public.sc_users;
drop policy if exists auth_all_sc_users on public.sc_users;

create policy "sc_noise_logs_insert_any"
  on public.sc_noise_logs for insert with check (true);

create policy "sc_light_logs_insert_any"
  on public.sc_light_logs for insert with check (true);

create policy "sc_photo_captures_insert_auth"
  on public.sc_photo_captures for insert with check (auth.role() = 'authenticated');

create policy "sc_photo_captures_update_auth"
  on public.sc_photo_captures for update using (auth.role() = 'authenticated');

create policy "sc_discipline_scores_insert_auth"
  on public.sc_discipline_scores for insert with check (auth.role() = 'authenticated');

create policy "sc_discipline_scores_select_auth"
  on public.sc_discipline_scores for select using (auth.role() = 'authenticated');

create policy "sc_users_insert_auth"
  on public.sc_users for insert with check (auth.role() = 'authenticated');

-- ---------------------------------------------------------------
-- 2. profiles: users can create their own row
-- ---------------------------------------------------------------
create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- ---------------------------------------------------------------
-- 3. Owner-scoped RLS policies for user-owned tables
-- ---------------------------------------------------------------
create policy "streaks_select_own" on public.streaks for select using (auth.uid() = user_id);
create policy "streaks_insert_own" on public.streaks for insert with check (auth.uid() = user_id);
create policy "streaks_update_own" on public.streaks for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "streaks_delete_own" on public.streaks for delete using (auth.uid() = user_id);

create policy "user_scores_select" on public.user_scores for select using (auth.uid() = user_id);
create policy "user_scores_insert" on public.user_scores for insert with check (auth.uid() = user_id);
create policy "user_scores_update" on public.user_scores for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "badges_select_own" on public.badges for select using (auth.uid() = user_id);

create policy "challenge_progress_select_own" on public.challenge_progress for select using (auth.uid() = user_id);
create policy "challenge_progress_insert_own" on public.challenge_progress for insert with check (auth.uid() = user_id);
create policy "challenge_progress_update_own" on public.challenge_progress for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "challenge_progress_delete_own" on public.challenge_progress for delete using (auth.uid() = user_id);

create policy "comments_select_any" on public.comments for select using (auth.role() = 'authenticated');
create policy "comments_insert_own" on public.comments for insert with check (auth.uid() = author_id);
create policy "comments_update_own" on public.comments for update using (auth.uid() = author_id) with check (auth.uid() = author_id);
create policy "comments_delete_own" on public.comments for delete using (auth.uid() = author_id);

create policy "community_posts_select_any" on public.community_posts for select using (auth.role() = 'authenticated');
create policy "community_posts_insert_own" on public.community_posts for insert with check (auth.uid() = author_id);
create policy "community_posts_update_own" on public.community_posts for update using (auth.uid() = author_id) with check (auth.uid() = author_id);
create policy "community_posts_delete_own" on public.community_posts for delete using (auth.uid() = author_id);

create policy "test_attempts_select_own" on public.test_attempts for select using (auth.uid() = user_id);
create policy "test_attempts_insert_own" on public.test_attempts for insert with check (auth.uid() = user_id);

create policy "mentorship_sessions" on public.mentorship_sessions
  for select using (auth.uid() = mentor_id or auth.uid() = learner_id);
create policy "mentorship_sessions_insert_participant" on public.mentorship_sessions
  for insert with check (auth.uid() = mentor_id or auth.uid() = learner_id);

-- ---------------------------------------------------------------
-- 4. Auto-create profile + streak + score on signup
-- ---------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, role)
  values (
  new.id,
  coalesce(new.raw_user_meta_data ->> 'display_name', new.email),
  'student'
  )
  on conflict (id) do nothing;

  insert into public.streaks (user_id, current_streak, longest_streak, streak_freeze)
  values (new.id, 0, 0, false)
  on conflict (user_id) do nothing;

  insert into public.user_scores (user_id, total_points)
  values (new.id, 0)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();