const API_BASE = 'http://127.0.0.1:8080/api'
const GO_API_BASE = 'http://127.0.0.1:9090/api'

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  })
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json()
}

export const api = {
  health: () => fetchJson<{ status: string }>(`${API_BASE}/health`),

  corpus: {
    search: (q: string, period?: string) =>
      fetchJson<{ id: string; title: string; snippet: string; period: string; score: number }[]>(
        `${API_BASE}/corpus/search?q=${encodeURIComponent(q)}${period ? `&period=${encodeURIComponent(period)}` : ''}`
      ),
    listTexts: () => fetchJson<{ id: string; title: string; author: string; period: string; language: string }[]>(
      `${API_BASE}/corpus/texts`
    ),
    getText: (id: string) => fetchJson<{ id: string; title: string; content: string }>(
      `${API_BASE}/corpus/texts/${id}`
    ),
  },

  grammar: {
    parse: (text: string) =>
      fetchJson<{ tokens: { word: string; root: string; pos: string }[]; syntaxTree: string }>(
        `${API_BASE}/grammar/parse`,
        { method: 'POST', body: JSON.stringify({ text }) }
      ),
    sandhiSplit: (text: string) =>
      fetchJson<{ splits: string[] }>(`${API_BASE}/grammar/sandhi`, {
        method: 'POST',
        body: JSON.stringify({ text }),
      }),
  },

  dictionary: {
    lookup: (word: string) =>
      fetchJson<{ word: string; meanings: string[]; root: string }>(
        `${API_BASE}/dictionary/lookup?word=${encodeURIComponent(word)}`
      ),
    compoundSplit: (compound: string) =>
      fetchJson<{ components: string[]; explanation: string }>(
        `${API_BASE}/dictionary/compound-split`,
        { method: 'POST', body: JSON.stringify({ compound }) }
      ),
  },

  assessment: {
    generate: (topic: string, count: number) =>
      fetchJson<{ questions: { prompt: string; options: string[]; correctIdx: number; explanation: string }[] }>(
        `${GO_API_BASE}/assessment/generate`,
        { method: 'POST', body: JSON.stringify({ topic, count, language: 'sa' }) }
      ),
  },

  analytics: {
    evaluate: (userId: string, module: string, score: number, weakAreas: string[]) =>
      fetchJson<{ recommendations: string[]; nextModule: string }>(
        `${GO_API_BASE}/analytics/evaluate`,
        { method: 'POST', body: JSON.stringify({ user_id: userId, module, score, weak_areas: weakAreas }) }
      ),
  },

  viva: {
    startSession: () =>
      fetchJson<{ sessionId: string; status: string; questions: string[] }>(
        `${GO_API_BASE}/viva/session`,
        { method: 'POST' }
      ),
  },
}