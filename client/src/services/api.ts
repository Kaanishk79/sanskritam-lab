const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''
const API_BASE = `${supabaseUrl}/functions/v1/apiv2`
const TUTOR_API_BASE = `${supabaseUrl}/functions/v1/tutor-g`

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
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
  health: () => fetchJson<{ status: string; timestamp?: string }>(`${API_BASE}/health`),

  corpus: {
    search: (q: string, opts?: { page?: number; size?: number }) =>
      fetchJson<{ items: { id: string; title: string; snippet?: string; period?: string; score?: number }[]; total: number }>(
        `${API_BASE}/corpus?search=${encodeURIComponent(q)}&page=${opts?.page ?? 1}&size=${opts?.size ?? 20}`
      ),
    listTexts: (opts?: { page?: number; size?: number }) =>
      fetchJson<{ items: { id: string; title: string; title_iast?: string; language?: string }[]; total: number }>(
        `${API_BASE}/corpus?page=${opts?.page ?? 1}&size=${opts?.size ?? 100}`
      ),
    getText: (id: string) =>
      fetchJson<{ id: string; title: string; content: string; language?: string }>(
        `${API_BASE}/corpus/${encodeURIComponent(id)}`
      ),
  },

  courses: {
    list: (opts?: { language?: string; level?: string }) =>
      fetchJson<{ id: string; title: string; description?: string; language?: string; level?: string }[]>(
        `${API_BASE}/courses?language=${encodeURIComponent(opts?.language ?? 'sa')}&level=${encodeURIComponent(opts?.level ?? '')}`
      ),
    getLessons: (courseId: string) =>
      fetchJson<{ id: string; title: string; content?: string; order?: number }[]>(
        `${API_BASE}/courses/${encodeURIComponent(courseId)}/lessons`
      ),
  },

  tutor: {
    chat: (messages: { role: string; content: string }[], opts?: { mode?: string }) =>
      fetchJson<{ reply: string; citations?: string[]; difficulty?: string; suggested_exercise?: string; mode?: string }>(
        `${TUTOR_API_BASE}/chat`,
        { method: 'POST', body: JSON.stringify({ messages, mode: opts?.mode ?? 'tutor' }) }
      ),
    translate: (text: string, source = 'sa', target = 'hi') =>
      fetchJson<{ translated_text: string; word_count?: number; source?: string; target?: string }>(
        `${TUTOR_API_BASE}/translate`,
        { method: 'POST', body: JSON.stringify({ text, source, target }) }
      ),
  },

  dictionary: {
    lookup: (word: string) =>
      fetchJson<{ word: string; meanings: string[]; root?: string; derivations?: string[]; pos?: string } | null>(
        `${API_BASE}/dictionary/lookup?word=${encodeURIComponent(word)}`
      ).catch(() => null),
    compoundSplit: (compound: string) =>
      fetchJson<{ components: string[]; explanation: string }>(
        `${API_BASE}/dictionary/compound-split`,
        { method: 'POST', body: JSON.stringify({ compound }) }
      ).catch(() => ({ components: [], explanation: '' })),
  },

  assessment: {
    generate: (topic: string, count: number) =>
      fetchJson<{ questions: { prompt: string; options: string[]; correctIdx: number; explanation: string }[] }>(
        `${API_BASE}/assessment/generate`,
        { method: 'POST', body: JSON.stringify({ topic, count, language: 'sa' }) }
      ).catch(() => ({ questions: [] })),
  },

  analytics: {
    evaluate: (userId: string, module: string, score: number, weakAreas: string[]) =>
      fetchJson<{ recommendations: string[]; nextModule: string }>(
        `${API_BASE}/analytics/evaluate`,
        { method: 'POST', body: JSON.stringify({ user_id: userId, module, score, weak_areas: weakAreas }) }
      ).catch(() => ({
        recommendations: ['Revise the fundamentals and practice the exercises for this module.'],
        nextModule: module,
      })),
  },

  viva: {
    startSession: () =>
      fetchJson<{ sessionId: string; status: string; questions: string[] }>(
        `${API_BASE}/viva/session`,
        { method: 'POST' }
      ).catch(() => ({ sessionId: 'offline', status: 'ready', questions: [] })),
  },
}