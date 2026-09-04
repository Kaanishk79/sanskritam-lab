import { supabase } from "./supabase";
import { getAuthState } from "./auth";
function userId() {
  return getAuthState().user?.id ?? null;
}
async function syncSRSFromDb() {
  const uid = userId();
  if (!uid) return null;
  try {
    const { data, error } = await supabase.from("srs_state").select("state").eq("user_id", uid).maybeSingle();
    if (error || !data || !data.state) return null;
    return data.state;
  } catch {
    return null;
  }
}
async function persistSRSToDb(state) {
  const uid = userId();
  if (!uid) return;
  try {
    const { data } = await supabase.from("srs_state").select("id").eq("user_id", uid).maybeSingle();
    if (data) {
      await supabase.from("srs_state").update({ state, updated_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("user_id", uid);
    } else {
      await supabase.from("srs_state").insert({ user_id: uid, state });
    }
  } catch {
  }
}
async function syncCustomQuizzesFromDb() {
  const uid = userId();
  if (!uid) return null;
  try {
    const { data, error } = await supabase.from("custom_quizzes").select("id, quiz").eq("user_id", uid);
    if (error || !data || data.length === 0) return null;
    return data.map((r) => r.quiz).filter(Boolean);
  } catch {
    return null;
  }
}
async function persistCustomQuizzesToDb(quizzes) {
  const uid = userId();
  if (!uid) return;
  try {
    await supabase.from("custom_quizzes").delete().eq("user_id", uid);
    if (quizzes.length > 0) {
      await supabase.from("custom_quizzes").insert(quizzes.map((q) => ({ user_id: uid, id: q.id, quiz: q })));
    }
  } catch {
  }
}
async function syncJeopardyFromDb() {
  const uid = userId();
  if (!uid) return null;
  try {
    const { data, error } = await supabase.from("jeopardy_boards").select("state").eq("user_id", uid).eq("kind", "play").maybeSingle();
    if (error || !data || !data.state) return null;
    return data.state;
  } catch {
    return null;
  }
}
async function persistJeopardyToDb(state) {
  const uid = userId();
  if (!uid) return;
  try {
    const { data } = await supabase.from("jeopardy_boards").select("id").eq("user_id", uid).eq("kind", "play").maybeSingle();
    if (data) {
      await supabase.from("jeopardy_boards").update({ state, updated_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", data.id);
    } else {
      await supabase.from("jeopardy_boards").insert({ user_id: uid, kind: "play", state });
    }
  } catch {
  }
}
async function syncTestBestFromDb() {
  const uid = userId();
  if (!uid) return null;
  try {
    const { data, error } = await supabase.from("jeopardy_boards").select("state").eq("user_id", uid).eq("kind", "test").maybeSingle();
    const best = data?.state?.best;
    if (error || best === void 0) return null;
    return best;
  } catch {
    return null;
  }
}
async function persistTestBestToDb(best) {
  const uid = userId();
  if (!uid) return;
  try {
    const { data } = await supabase.from("jeopardy_boards").select("id").eq("user_id", uid).eq("kind", "test").maybeSingle();
    const state = { best };
    if (data) {
      await supabase.from("jeopardy_boards").update({ state, updated_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", data.id);
    } else {
      await supabase.from("jeopardy_boards").insert({ user_id: uid, kind: "test", state });
    }
  } catch {
  }
}
async function syncLabStatsFromDb() {
  const uid = userId();
  if (!uid) return null;
  try {
    const { data, error } = await supabase.from("lab_stats").select("stats").eq("user_id", uid).maybeSingle();
    if (error || !data || !data.stats) return null;
    return data.stats;
  } catch {
    return null;
  }
}
async function persistLabStatsToDb(key, stats) {
  const uid = userId();
  if (!uid) return;
  try {
    const { data } = await supabase.from("lab_stats").select("stats").eq("user_id", uid).maybeSingle();
    const map = { ...data?.stats ?? {} };
    map[key] = stats;
    if (data) {
      await supabase.from("lab_stats").update({ stats: map, updated_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("user_id", uid);
    } else {
      await supabase.from("lab_stats").insert({ user_id: uid, stats: map });
    }
  } catch {
  }
}
async function syncOcrFromDb() {
  const uid = userId();
  if (!uid) return null;
  try {
    const { data, error } = await supabase.from("ocr_results").select("id, filename, script, text, created_at").eq("user_id", uid).order("created_at", { ascending: false }).limit(20);
    if (error || !data || data.length === 0) return null;
    return data.map((r) => ({
      id: String(r.id),
      filename: String(r.filename),
      script: String(r.script),
      text: String(r.text),
      createdAt: String(r.created_at)
    }));
  } catch {
    return null;
  }
}
async function saveOcrToDb(filename, script, text) {
  const uid = userId();
  if (!uid) return;
  try {
    await supabase.from("ocr_results").insert({ user_id: uid, filename, script, text });
  } catch {
  }
}
async function syncStoriesFromDb() {
  const uid = userId();
  if (!uid) return null;
  try {
    const { data, error } = await supabase.from("user_stories").select("id, theme_id, title, word1, word2, source, story, created_at").eq("user_id", uid).order("created_at", { ascending: false }).limit(30);
    if (error || !data || data.length === 0) return null;
    return data.map((r) => ({
      id: String(r.id),
      themeId: String(r.theme_id),
      title: String(r.title),
      word1: String(r.word1),
      word2: String(r.word2),
      source: String(r.source),
      story: r.story ?? [],
      createdAt: String(r.created_at)
    }));
  } catch {
    return null;
  }
}
async function saveStoryToDb(themeId, title, word1, word2, source, story) {
  const uid = userId();
  if (!uid) return;
  try {
    await supabase.from("user_stories").insert({ user_id: uid, theme_id: themeId, title, word1, word2, source, story });
  } catch {
  }
}
async function deleteStoryFromDb(id) {
  const uid = userId();
  if (!uid) return;
  try {
    await supabase.from("user_stories").delete().eq("user_id", uid).eq("id", id);
  } catch {
  }
}
async function syncToolHistoryFromDb() {
  const uid = userId();
  if (!uid) return null;
  try {
    const { data, error } = await supabase.from("tool_history").select("id, tool, input, output, created_at").eq("user_id", uid).order("created_at", { ascending: false }).limit(30);
    if (error || !data || data.length === 0) return null;
    return data.map((r) => ({
      id: String(r.id),
      tool: String(r.tool),
      input: String(r.input),
      output: String(r.output),
      createdAt: String(r.created_at)
    }));
  } catch {
    return null;
  }
}
async function saveToolHistoryToDb(tool, input, output) {
  const uid = userId();
  if (!uid) return;
  try {
    await supabase.from("tool_history").insert({ user_id: uid, tool, input, output });
  } catch {
  }
}
export {
  deleteStoryFromDb,
  persistCustomQuizzesToDb,
  persistJeopardyToDb,
  persistLabStatsToDb,
  persistSRSToDb,
  persistTestBestToDb,
  saveOcrToDb,
  saveStoryToDb,
  saveToolHistoryToDb,
  syncCustomQuizzesFromDb,
  syncJeopardyFromDb,
  syncLabStatsFromDb,
  syncOcrFromDb,
  syncSRSFromDb,
  syncStoriesFromDb,
  syncTestBestFromDb,
  syncToolHistoryFromDb
};
