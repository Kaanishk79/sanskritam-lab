const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8080'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-url.supabase.co'
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key'
const TUTOR_API_BASE = `${supabaseUrl}/functions/v1/tutor-g`

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    ...init,
  })
  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw new Error(detail || `API error: ${res.status}`)
  }
  return res.json()
}

export const api = {
  health: () =>
    fetchJson<{ status: string; service: string; version: string; modules: string[] }>(`${BACKEND_URL}/api/health`)
      .catch(() => ({
        status: 'offline',
        service: 'SanskritLab Fallback Engine',
        version: '0.2.0',
        modules: ['offline-client'],
      })),

  grammar: {
    parse: (text: string) =>
      fetchJson<{ tokens: { word: string; root: string; pos: string; case_info?: string; meaning?: string }[]; syntax_tree: string }>(
        `${BACKEND_URL}/api/grammar/parse`,
        { method: 'POST', body: JSON.stringify({ text }) }
      ),
    sandhi: (text: string) =>
      fetchJson<{ original: string; splits: string[]; rule_applied?: string; explanation?: string }>(
        `${BACKEND_URL}/api/grammar/sandhi`,
        { method: 'POST', body: JSON.stringify({ text }) }
      ),
    sandhiJoin: (word1: string, word2: string) =>
      fetchJson<{ joined: string; rule: string; paninian_sutra: string }>(
        `${BACKEND_URL}/api/grammar/sandhi-join`,
        { method: 'POST', body: JSON.stringify({ word1, word2 }) }
      ),
    declensions: (stem?: string, gender?: string) =>
      fetchJson<{ stem: string; gender: string; paradigm: { case_num: number; case_name: string; singular: string; dual: string; plural: string }[] }>(
        `${BACKEND_URL}/api/grammar/declensions?stem=${encodeURIComponent(stem ?? 'राम')}&gender=${encodeURIComponent(gender ?? 'masculine')}`
      ),
  },

  corpus: {
    search: (q: string, period?: string, category?: string) =>
      fetchJson<{ id: string; title: string; snippet: string; period: string; category: string; score: number }[]>(
        `${BACKEND_URL}/api/corpus/search?q=${encodeURIComponent(q)}&period=${encodeURIComponent(period ?? '')}&category=${encodeURIComponent(category ?? '')}`
      ).catch(() => []),
    listTexts: () =>
      fetchJson<{ id: string; title: string; title_iast: string; author: string; period: string; content: string; translation_en: string; translation_hi: string; language: string; category: string }[]>(
        `${BACKEND_URL}/api/corpus/texts`
      ).catch(() => []),
    getText: (id: string) =>
      fetchJson<{ id: string; title: string; content: string; translation_en: string; translation_hi: string; language?: string }>(
        `${BACKEND_URL}/api/corpus/texts/${encodeURIComponent(id)}`
      ),
  },

  dictionary: {
    lookup: (word: string) =>
      fetchJson<{ word: string; iast: string; meanings: string[]; meanings_hi: string[]; root?: string; root_meaning?: string; derivations: string[]; pos: string; gender?: string } | null>(
        `${BACKEND_URL}/api/dictionary/lookup?word=${encodeURIComponent(word)}`
      ).catch(() => null),
    search: (q: string) =>
      fetchJson<{ word: string; iast: string; meanings: string[]; meanings_hi: string[]; pos: string }[]>(
        `${BACKEND_URL}/api/dictionary/search?q=${encodeURIComponent(q)}`
      ).catch(() => []),
    compoundSplit: (compound: string) =>
      fetchJson<{ compound: string; components: string[]; samasa_type: string; explanation: string }>(
        `${BACKEND_URL}/api/dictionary/compound-split`,
        { method: 'POST', body: JSON.stringify({ compound }) }
      ).catch(() => ({ compound, components: [compound], samasa_type: 'Unknown', explanation: '' })),
  },

  ocr: {
    recognize: (imageData: string, script = 'Devanagari') =>
      fetchJson<{ text: string; script: string; confidence: number; lines_detected: number; words: string[] }>(
        `${BACKEND_URL}/api/ocr/recognize`,
        { method: 'POST', body: JSON.stringify({ image_data: imageData, script }) }
      ),
  },

  assessment: {
    generate: (topic?: string, count?: number, level?: number) =>
      fetchJson<{ topic: string; level: number; questions: { id: string; prompt: string; prompt_hi: string; options: string[]; options_hi: string[]; correct_idx: number; explanation: string; explanation_hi: string }[] }>(
        `${BACKEND_URL}/api/assessment/generate`,
        { method: 'POST', body: JSON.stringify({ topic, count: count ?? 3, level: level ?? 1 }) }
      ).catch(() => ({ topic: topic ?? 'general', level: level ?? 1, questions: [] })),
  },

  viva: {
    startSession: () =>
      fetchJson<{ session_id: string; status: string; questions: { id: string; topic: string; question_sa: string; question_en: string; question_hi: string; expected_points: string[] }[] }>(
        `${BACKEND_URL}/api/viva/session`,
        { method: 'POST' }
      ).catch(() => ({ session_id: 'offline', status: 'ready', questions: [] })),
    evaluate: (questionId: string, responseText: string) =>
      fetchJson<{ score: number; max_score: number; feedback: string; feedback_hi: string; matched_points: string[]; pronunciation_tips: string[] }>(
        `${BACKEND_URL}/api/viva/evaluate`,
        { method: 'POST', body: JSON.stringify({ question_id: questionId, response_text: responseText }) }
      ),
  },

  analytics: {
    evaluate: (userId: string, module: string, score: number, weakAreas: string[]) =>
      fetchJson<{ recommendations: string[]; next_module: string; mastery_level: string }>(
        `${BACKEND_URL}/api/analytics/evaluate`,
        { method: 'POST', body: JSON.stringify({ user_id: userId, module, score, weak_areas: weakAreas }) }
      ).catch(() => ({
        recommendations: ['Revise the fundamentals and practice the exercises for this module.'],
        next_module: module,
        mastery_level: 'Beginner',
      })),
  },

  tts: {
    synthesize: (text: string, accent = 'sa-IN', speed = 0.9) =>
      fetchJson<{ audio_url: string; duration_ms: number; text: string }>(
        `${BACKEND_URL}/api/tts/synthesize`,
        { method: 'POST', body: JSON.stringify({ text, accent, speed }) }
      ),
  },

  tutor: {
    chat: (messages: { role: string; content: string }[], opts?: { mode?: string }) =>
      fetchJson<{ reply: string; citations?: string[]; difficulty?: string; suggested_exercise?: string; mode?: string }>(
        `${TUTOR_API_BASE}/chat`,
        {
          method: 'POST',
          headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` },
          body: JSON.stringify({ messages, mode: opts?.mode ?? 'tutor' })
        }
      ),
    translate: (text: string, source = 'sa', target = 'hi') =>
      fetchJson<{ translated_text: string; word_count?: number; source?: string; target?: string }>(
        `${TUTOR_API_BASE}/translate`,
        {
          method: 'POST',
          headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` },
          body: JSON.stringify({ text, source, target })
        }
      ),
  },
}