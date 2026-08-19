import { supabase } from './supabase'
import { getAuthState } from './auth'
import type { SRSState } from './srs'
import type { CustomQuiz } from './customQuizzes'

function userId(): string | null {
  return getAuthState().user?.id ?? null
}

export async function syncSRSFromDb(): Promise<SRSState | null> {
  const uid = userId()
  if (!uid) return null
  try {
    const { data, error } = await supabase.from('srs_state').select('state').eq('user_id', uid).maybeSingle()
    if (error || !data || !data.state) return null
    return (data as { state: SRSState }).state
  } catch {
    return null
  }
}

export async function persistSRSToDb(state: SRSState): Promise<void> {
  const uid = userId()
  if (!uid) return
  try {
    const { data } = await supabase.from('srs_state').select('id').eq('user_id', uid).maybeSingle()
    if (data) {
      await supabase.from('srs_state').update({ state, updated_at: new Date().toISOString() }).eq('user_id', uid)
    } else {
      await supabase.from('srs_state').insert({ user_id: uid, state })
    }
  } catch { /* offline */ }
}

export async function syncCustomQuizzesFromDb(): Promise<CustomQuiz[] | null> {
  const uid = userId()
  if (!uid) return null
  try {
    const { data, error } = await supabase.from('custom_quizzes').select('id, quiz').eq('user_id', uid)
    if (error || !data || data.length === 0) return null
    return data.map((r) => (r as { quiz: CustomQuiz }).quiz).filter(Boolean)
  } catch {
    return null
  }
}

export async function persistCustomQuizzesToDb(quizzes: CustomQuiz[]): Promise<void> {
  const uid = userId()
  if (!uid) return
  try {
    await supabase.from('custom_quizzes').delete().eq('user_id', uid)
    if (quizzes.length > 0) {
      await supabase.from('custom_quizzes').insert(quizzes.map((q) => ({ user_id: uid, id: q.id, quiz: q })))
    }
  } catch { /* offline */ }
}

export async function syncJeopardyFromDb(): Promise<unknown | null> {
  const uid = userId()
  if (!uid) return null
  try {
    const { data, error } = await supabase.from('jeopardy_boards').select('state').eq('user_id', uid).eq('kind', 'play').maybeSingle()
    if (error || !data || !data.state) return null
    return (data as { state: unknown }).state
  } catch {
    return null
  }
}

export async function persistJeopardyToDb(state: unknown): Promise<void> {
  const uid = userId()
  if (!uid) return
  try {
    const { data } = await supabase.from('jeopardy_boards').select('id').eq('user_id', uid).eq('kind', 'play').maybeSingle()
    if (data) {
      await supabase.from('jeopardy_boards').update({ state, updated_at: new Date().toISOString() }).eq('id', data.id)
    } else {
      await supabase.from('jeopardy_boards').insert({ user_id: uid, kind: 'play', state })
    }
  } catch { /* offline */ }
}

export async function syncTestBestFromDb(): Promise<number | null> {
  const uid = userId()
  if (!uid) return null
  try {
    const { data, error } = await supabase.from('jeopardy_boards').select('state').eq('user_id', uid).eq('kind', 'test').maybeSingle()
    const best = (data as { state?: { best?: number } } | null)?.state?.best
    if (error || best === undefined) return null
    return best
  } catch {
    return null
  }
}

export async function persistTestBestToDb(best: number): Promise<void> {
  const uid = userId()
  if (!uid) return
  try {
    const { data } = await supabase.from('jeopardy_boards').select('id').eq('user_id', uid).eq('kind', 'test').maybeSingle()
    const state = { best }
    if (data) {
      await supabase.from('jeopardy_boards').update({ state, updated_at: new Date().toISOString() }).eq('id', data.id)
    } else {
      await supabase.from('jeopardy_boards').insert({ user_id: uid, kind: 'test', state })
    }
  } catch { /* offline */ }
}

export async function syncLabStatsFromDb(): Promise<Record<string, unknown> | null> {
  const uid = userId()
  if (!uid) return null
  try {
    const { data, error } = await supabase.from('lab_stats').select('stats').eq('user_id', uid).maybeSingle()
    if (error || !data || !data.stats) return null
    return (data as { stats: Record<string, unknown> }).stats
  } catch {
    return null
  }
}

export async function persistLabStatsToDb(key: string, stats: Record<string, unknown>): Promise<void> {
  const uid = userId()
  if (!uid) return
  try {
    const { data } = await supabase.from('lab_stats').select('stats').eq('user_id', uid).maybeSingle()
    const map = { ...(((data as { stats?: Record<string, unknown> } | null)?.stats) ?? {}) }
    map[key] = stats
    if (data) {
      await supabase.from('lab_stats').update({ stats: map, updated_at: new Date().toISOString() }).eq('user_id', uid)
    } else {
      await supabase.from('lab_stats').insert({ user_id: uid, stats: map })
    }
  } catch { /* offline */ }
}

export interface OcrResult {
  id: string
  filename: string
  script: string
  text: string
  createdAt: string
}

export async function syncOcrFromDb(): Promise<OcrResult[] | null> {
  const uid = userId()
  if (!uid) return null
  try {
    const { data, error } = await supabase
      .from('ocr_results')
      .select('id, filename, script, text, created_at')
      .eq('user_id', uid)
      .order('created_at', { ascending: false })
      .limit(20)
    if (error || !data || data.length === 0) return null
    return data.map((r) => ({
      id: String(r.id),
      filename: String(r.filename),
      script: String(r.script),
      text: String(r.text),
      createdAt: String(r.created_at),
    }))
  } catch {
    return null
  }
}

export async function saveOcrToDb(filename: string, script: string, text: string): Promise<void> {
  const uid = userId()
  if (!uid) return
  try {
    await supabase.from('ocr_results').insert({ user_id: uid, filename, script, text })
  } catch { /* offline */ }
}

export interface SavedStory {
  id: string
  themeId: string
  title: string
  word1: string
  word2: string
  source: string
  story: { sa: string; en: string }[]
  createdAt: string
}

export async function syncStoriesFromDb(): Promise<SavedStory[] | null> {
  const uid = userId()
  if (!uid) return null
  try {
    const { data, error } = await supabase
      .from('user_stories')
      .select('id, theme_id, title, word1, word2, source, story, created_at')
      .eq('user_id', uid)
      .order('created_at', { ascending: false })
      .limit(30)
    if (error || !data || data.length === 0) return null
    return data.map((r) => ({
      id: String(r.id),
      themeId: String(r.theme_id),
      title: String(r.title),
      word1: String(r.word1),
      word2: String(r.word2),
      source: String(r.source),
      story: (r.story as { sa: string; en: string }[]) ?? [],
      createdAt: String(r.created_at),
    }))
  } catch {
    return null
  }
}

export async function saveStoryToDb(
  themeId: string,
  title: string,
  word1: string,
  word2: string,
  source: string,
  story: { sa: string; en: string }[],
): Promise<void> {
  const uid = userId()
  if (!uid) return
  try {
    await supabase.from('user_stories').insert({ user_id: uid, theme_id: themeId, title, word1, word2, source, story })
  } catch { /* offline */ }
}

export async function deleteStoryFromDb(id: string): Promise<void> {
  const uid = userId()
  if (!uid) return
  try {
    await supabase.from('user_stories').delete().eq('user_id', uid).eq('id', id)
  } catch { /* offline */ }
}

export interface ToolHistoryEntry {
  id: string
  tool: string
  input: string
  output: string
  createdAt: string
}

export async function syncToolHistoryFromDb(): Promise<ToolHistoryEntry[] | null> {
  const uid = userId()
  if (!uid) return null
  try {
    const { data, error } = await supabase
      .from('tool_history')
      .select('id, tool, input, output, created_at')
      .eq('user_id', uid)
      .order('created_at', { ascending: false })
      .limit(30)
    if (error || !data || data.length === 0) return null
    return data.map((r) => ({
      id: String(r.id),
      tool: String(r.tool),
      input: String(r.input),
      output: String(r.output),
      createdAt: String(r.created_at),
    }))
  } catch {
    return null
  }
}

export async function saveToolHistoryToDb(tool: string, input: string, output: string): Promise<void> {
  const uid = userId()
  if (!uid) return
  try {
    await supabase.from('tool_history').insert({ user_id: uid, tool, input, output })
  } catch { /* offline */ }
}