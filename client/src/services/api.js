const isHttps = typeof window !== "undefined" && window.location?.protocol === "https:";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || (isHttps ? "" : "http://127.0.0.1:8080");
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://placeholder-url.supabase.co";
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "placeholder-anon-key";
const TUTOR_API_BASE = `${supabaseUrl}/functions/v1/tutor-g`;
async function fetchJson(url, init) {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...init?.headers ?? {}
    },
    ...init
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(detail || `API error: ${res.status}`);
  }
  return res.json();
}
const api = {
  health: () => fetchJson(`${BACKEND_URL}/api/health`).catch(() => ({
    status: "offline",
    service: "SanskritLab Fallback Engine",
    version: "0.2.0",
    modules: ["offline-client"]
  })),
  grammar: {
    parse: (text) => fetchJson(
      `${BACKEND_URL}/api/grammar/parse`,
      { method: "POST", body: JSON.stringify({ text }) }
    ),
    sandhi: (text) => fetchJson(
      `${BACKEND_URL}/api/grammar/sandhi`,
      { method: "POST", body: JSON.stringify({ text }) }
    ),
    sandhiJoin: (word1, word2) => fetchJson(
      `${BACKEND_URL}/api/grammar/sandhi-join`,
      { method: "POST", body: JSON.stringify({ word1, word2 }) }
    ),
    declensions: (stem, gender) => fetchJson(
      `${BACKEND_URL}/api/grammar/declensions?stem=${encodeURIComponent(stem ?? "\u0930\u093E\u092E")}&gender=${encodeURIComponent(gender ?? "masculine")}`
    )
  },
  corpus: {
    search: (q, period, category) => fetchJson(
      `${BACKEND_URL}/api/corpus/search?q=${encodeURIComponent(q)}&period=${encodeURIComponent(period ?? "")}&category=${encodeURIComponent(category ?? "")}`
    ).catch(() => []),
    listTexts: () => fetchJson(
      `${BACKEND_URL}/api/corpus/texts`
    ).catch(() => []),
    getText: (id) => fetchJson(
      `${BACKEND_URL}/api/corpus/texts/${encodeURIComponent(id)}`
    )
  },
  dictionary: {
    lookup: (word) => fetchJson(
      `${BACKEND_URL}/api/dictionary/lookup?word=${encodeURIComponent(word)}`
    ).catch(() => null),
    search: (q) => fetchJson(
      `${BACKEND_URL}/api/dictionary/search?q=${encodeURIComponent(q)}`
    ).catch(() => []),
    compoundSplit: (compound) => fetchJson(
      `${BACKEND_URL}/api/dictionary/compound-split`,
      { method: "POST", body: JSON.stringify({ compound }) }
    ).catch(() => ({ compound, components: [compound], samasa_type: "Unknown", explanation: "" }))
  },
  ocr: {
    recognize: (imageData, script = "Devanagari") => fetchJson(
      `${BACKEND_URL}/api/ocr/recognize`,
      { method: "POST", body: JSON.stringify({ image_data: imageData, script }) }
    )
  },
  assessment: {
    generate: (topic, count, level) => fetchJson(
      `${BACKEND_URL}/api/assessment/generate`,
      { method: "POST", body: JSON.stringify({ topic, count: count ?? 3, level: level ?? 1 }) }
    ).catch(() => ({ topic: topic ?? "general", level: level ?? 1, questions: [] }))
  },
  viva: {
    startSession: () => fetchJson(
      `${BACKEND_URL}/api/viva/session`,
      { method: "POST" }
    ).catch(() => ({ session_id: "offline", status: "ready", questions: [] })),
    evaluate: (questionId, responseText) => fetchJson(
      `${BACKEND_URL}/api/viva/evaluate`,
      { method: "POST", body: JSON.stringify({ question_id: questionId, response_text: responseText }) }
    )
  },
  analytics: {
    evaluate: (userId, module, score, weakAreas) => fetchJson(
      `${BACKEND_URL}/api/analytics/evaluate`,
      { method: "POST", body: JSON.stringify({ user_id: userId, module, score, weak_areas: weakAreas }) }
    ).catch(() => ({
      recommendations: ["Revise the fundamentals and practice the exercises for this module."],
      next_module: module,
      mastery_level: "Beginner"
    }))
  },
  tts: {
    synthesize: (text, accent = "sa-IN", speed = 0.9) => fetchJson(
      `${BACKEND_URL}/api/tts/synthesize`,
      { method: "POST", body: JSON.stringify({ text, accent, speed }) }
    )
  },
  tutor: {
    chat: (messages, opts) => fetchJson(
      `${TUTOR_API_BASE}/chat`,
      {
        method: "POST",
        headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` },
        body: JSON.stringify({ messages, mode: opts?.mode ?? "tutor" })
      }
    ),
    translate: (text, source = "sa", target = "hi") => fetchJson(
      `${TUTOR_API_BASE}/translate`,
      {
        method: "POST",
        headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` },
        body: JSON.stringify({ text, source, target })
      }
    )
  }
};
export {
  api
};
