import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../../services/supabase'
import { toIAST } from '../../services/sanskrit'
import { useLanguage } from '../../context/LanguageContext'

interface DictRow {
  word: string
  root: string | null
  pos: string | null
  meanings: string[]
}

interface RootNode {
  root: string
  count: number
  words: DictRow[]
}

const CURATED_ROOTS: { root: string; meaning: string }[] = [
  { root: 'कृ', meaning: 'to do, make' },
  { root: 'भू', meaning: 'to be, become' },
  { root: 'गम्', meaning: 'to go' },
  { root: 'धा', meaning: 'to place, hold' },
  { root: 'श्रु', meaning: 'to hear' },
  { root: 'जन्', meaning: 'to be born' },
  { root: 'वद्', meaning: 'to speak' },
  { root: 'दृश्', meaning: 'to see' },
  { root: 'स्था', meaning: 'to stand' },
  { root: 'इ', meaning: 'to go' },
  { root: 'जि', meaning: 'to conquer' },
  { root: 'हन्', meaning: 'to strike' },
  { root: 'दा', meaning: 'to give' },
  { root: 'पा', meaning: 'to drink, protect' },
  { root: 'चर्', meaning: 'to move' },
  { root: 'स्मृ', meaning: 'to remember' },
]

export default function EtymologyTreePage() {
  const { t } = useLanguage()
  const [rows, setRows] = useState<DictRow[]>([])
  const [selRoot, setSelRoot] = useState<string | null>(null)
  const [q, setQ] = useState('')

  useEffect(() => {
    let alive = true
    supabase
      .from('dictionary')
      .select('word, root, pos, meanings')
      .not('root', 'is', null)
      .limit(2000)
      .then(({ data }) => {
        if (!alive || !data) return
        setRows(data as unknown as DictRow[])
        if (data.length > 0) setSelRoot(data[0].root)
      })
    return () => { alive = false }
  }, [])

  const roots = useMemo(() => {
    const map = new Map<string, DictRow[]>()
    for (const r of rows) {
      if (!r.root) continue
      const key = r.root.trim()
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(r)
    }
    const list: RootNode[] = [...map.entries()].map(([root, words]) => ({ root, count: words.length, words }))
    list.sort((a, b) => b.count - a.count)
    for (const c of CURATED_ROOTS) {
      if (!list.some((l) => l.root === c.root)) {
        list.push({ root: c.root, count: 0, words: [] })
      }
    }
    return list
  }, [rows])

  const filteredWords = useMemo(() => {
    const base = roots.find((r) => r.root === selRoot)?.words || []
    if (!q.trim()) return base
    return base.filter((w) => (w.word + (w.meanings || []).join(' ')).toLowerCase().includes(q.toLowerCase()))
  }, [roots, selRoot, q])

  const curRoot = roots.find((r) => r.root === selRoot)
  const curRootNote = CURATED_ROOTS.find((c) => c.root === selRoot)

  return (
    <div>
      <div className="page-header">
        <h2>{t('🌱 Etymology Tree')}</h2>
        <p>{t('One verbal root (dhātu), many words — see how Sanskrit words grow from their roots like branches from a tree.')}</p>
      </div>

      <div className="card" style={{ maxWidth: 820, margin: '0 auto', padding: 24 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
          {roots.slice(0, 40).map((r) => (
            <button
              key={r.root}
              className={`btn btn-sm ${selRoot === r.root ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setSelRoot(r.root)}
            >
              √{r.root}{r.count > 0 ? ` (${r.count})` : ''}
            </button>
          ))}
        </div>

        {curRoot && (
          <div className="card" style={{ padding: 20, marginBottom: 16, background: 'rgba(255,152,0,0.06)', border: '2px solid rgba(255,152,0,0.35)' }}>
            <p style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>
              √{curRoot.root} <span style={{ color: 'var(--vt-muted)', fontSize: 15, fontWeight: 400 }}>√{toIAST(curRoot.root)}</span>
            </p>
            {curRootNote && <p style={{ margin: '4px 0 0', color: 'var(--vt-muted)' }}>{curRootNote.meaning}</p>}
            <p style={{ margin: '10px 0 0', fontSize: 13 }}>
              {t('This root grows')} <strong>{curRoot.count}</strong> {t('words in our dictionary')}
              {curRoot.count === 0 && t(' — add words from the dictionary to see more branches.')}
            </p>
            <input
              className="lab-input"
              style={{ marginTop: 12, width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid var(--vt-border)' }}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t('Filter words of this root…')}
            />
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 10 }}>
          {filteredWords.map((w) => (
            <div key={w.word} className="card" style={{ margin: 0, padding: '12px 14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 6 }}>
                <strong style={{ fontSize: 17 }}>{w.word}</strong>
                {w.pos && <span className="badge">{w.pos}</span>}
              </div>
              <p style={{ margin: '6px 0 0', color: 'var(--vt-muted)', fontSize: 13 }}>
                {(w.meanings || []).slice(0, 3).join(' · ')}
              </p>
              <p style={{ margin: '4px 0 0', fontSize: 12, color: 'var(--vt-muted)', fontStyle: 'italic' }}>{toIAST(w.word)}</p>
              <a href={`#/explore/${encodeURIComponent(w.word)}`} style={{ fontSize: 13, color: 'var(--vt-orange)' }}>{t('Explore →')}</a>
            </div>
          ))}
        </div>

        {filteredWords.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--vt-muted)', padding: 20 }}>
            {t('No words for this root in the dictionary yet. Browse other roots above.')}
          </p>
        )}
      </div>
    </div>
  )
}