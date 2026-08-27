import { useState, useEffect } from 'react'
import { supabase } from '../services/supabase'
import { toIAST, toDevanagari } from '../services/sanskrit'
import { speakWithFallback } from '../services/speech'
import { useLanguage } from '../context/LanguageContext'

interface DictionaryRow {
  word: string
  root: string | null
  pos: string | null
  meanings: string[] | null
  meanings_hi: string[] | null
  derivations: string[] | null
}

interface TextRef {
  id: string
  title: string
  snippet: string
  source: 'texts' | 'corpus'
}

interface RelatedWord {
  word: string
  meanings: string[]
  meanings_hi: string[]
}

interface Concept {
  name: string
  icon: string
  desc: string
}

export function exploreWord(word: string) {
  window.dispatchEvent(new CustomEvent('sanskritlab:explore', { detail: word }))
}

export default function ExplorePanel({ word, onClose }: { word: string; onClose?: () => void }) {
  const { t, lang } = useLanguage()
  const [entry, setEntry] = useState<DictionaryRow | null>(null)
  const [related, setRelated] = useState<RelatedWord[]>([])
  const [refs, setRefs] = useState<TextRef[]>([])
  const [examples, setExamples] = useState<TextRef[]>([])
  const [concepts, setConcepts] = useState<Concept[]>([])
  const [loading, setLoading] = useState(true)
  const [speaking, setSpeaking] = useState(false)

  useEffect(() => {
    let alive = true
    const w = word.trim()
    if (!w) { setLoading(false); return }
    setLoading(true)
    setEntry(null); setRelated([]); setRefs([]); setExamples([]); setConcepts([])

    const iast = toIAST(w)
    const doSearch = async () => {
      const [dict, sameRoot, textsR, corpusR] = await Promise.all([
        supabase.from('dictionary').select('*').ilike('word', w).limit(1),
        supabase.from('dictionary').select('word, meanings, meanings_hi').ilike('root', `%${w.slice(0, 1)}%`).limit(6),
        supabase.from('texts').select('id, title, content').ilike('content', `%${w}%`).limit(5),
        supabase.from('corpus_texts').select('id, title, content').ilike('content', `%${w}%`).limit(5),
      ])
      if (!alive) return
      const row = dict.data?.[0] as DictionaryRow | undefined
      setEntry(row || null)
      const relatedWords: RelatedWord[] = []
      if (row?.root && sameRoot.data) {
        for (const r of sameRoot.data as { word: string; meanings: string[]; meanings_hi: string[] }[]) {
          if (r.word !== w) relatedWords.push({ word: r.word, meanings: r.meanings || [], meanings_hi: r.meanings_hi || [] })
        }
      }
      if (row?.derivations && row.derivations.length > 0) {
        const derivR = await supabase
          .from('dictionary')
          .select('word, meanings, meanings_hi')
          .in('word', row.derivations)
          .limit(6)
        if (alive && derivR.data) {
          for (const d of derivR.data as { word: string; meanings: string[]; meanings_hi: string[] }[]) {
            if (!relatedWords.some((r) => r.word === d.word)) relatedWords.push({ word: d.word, meanings: d.meanings || [], meanings_hi: d.meanings_hi || [] })
          }
        }
      }
      setRelated(relatedWords.slice(0, 6))

      const makeSnippet = (content: string, needle: string): string => {
        const idx = content.indexOf(needle)
        if (idx < 0) return content.slice(0, 80)
        const start = Math.max(0, idx - 30)
        const end = Math.min(content.length, idx + needle.length + 50)
        return (start > 0 ? '…' : '') + content.slice(start, end) + (end < content.length ? '…' : '')
      }
      const textRefs: TextRef[] = (textsR.data || []).slice(0, 3).map((x: any) => ({
        id: x.id, title: x.title, snippet: makeSnippet(x.content, w), source: 'texts',
      }))
      const corpusRefs: TextRef[] = (corpusR.data || []).slice(0, 3).map((x: any) => ({
        id: x.id, title: x.title, snippet: makeSnippet(x.content, w), source: 'corpus',
      }))
      setRefs(textRefs)
      setExamples(corpusRefs)

      const conceptMatches = iast.split(/[a-z]*/).filter(Boolean)
      const concepts: Concept[] = []
      if (conceptMatches.length || w.length <= 6) {
        concepts.push({ name: 'Root family', icon: '🌱', desc: row?.root ? `Derives from ${toDevanagari(row.root) || row.root} (${toIAST(row.root)})` : 'Etymology via dictionary root field' })
      }
      if (row?.pos) concepts.push({ name: 'Part of speech', icon: '🏷️', desc: row.pos })
      setConcepts(concepts)
      setLoading(false)
    }
    doSearch().catch(() => { if (alive) setLoading(false) })
    return () => { alive = false }
  }, [word])

  const iast = toIAST(word)
  const speak = () => {
    const stop = speakWithFallback(word, (sp) => setSpeaking(sp))
    setTimeout(() => stop, 20000)
  }

  return (
    <div className="explore-panel card" style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <div>
          <h2 style={{ fontSize: 34, margin: 0 }}>{word}</h2>
          <p style={{ color: '#888', margin: '4px 0 0', fontSize: 15 }}>{iast}</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-sm btn-outline" onClick={speak} disabled={speaking}>
            {speaking ? '🔊…' : '🔊 ' + t('Pronounce')}
          </button>
          {onClose && (
            <button className="btn btn-sm btn-outline" onClick={onClose}>✕</button>
          )}
        </div>
      </div>

      {loading ? (
        <p style={{ color: '#888' }}>⏳ {t('Looking up')}…</p>
      ) : (
        <>
          <div className="explore-section">
            <h4>📖 {t('Meaning')}</h4>
            {entry ? (
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {(lang === 'hi' && entry.meanings_hi && entry.meanings_hi.length ? entry.meanings_hi : entry.meanings || []).map((m, i) => <li key={i}>{m}</li>)}
                {(lang === 'hi' ? (entry.meanings_hi?.length || 0) : entry.meanings?.length || 0) === 0 && <li style={{ color: '#888' }}>—</li>}
              </ul>
            ) : (
              <p style={{ color: '#888', margin: 0 }}>{t('Not in dictionary yet — try the related-words and text references below.')}</p>
            )}
          </div>

          <div className="explore-section">
            <h4>🔤 {t('Grammar')}</h4>
            <p style={{ margin: 0 }}>
              <span className="chip">{t('Part of speech')}: {entry?.pos || '—'}</span>{' '}
              <span className="chip">{t('Root')}: {entry?.root ? `${toDevanagari(entry.root) || entry.root} (${toIAST(entry.root)})` : '—'}</span>{' '}
              <span className="chip">IAST: {iast}</span>
            </p>
          </div>

          {related.length > 0 && (
            <div className="explore-section">
              <h4>🔗 {t('Related words')}</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {related.map((r) => (
                  <button key={r.word} className="btn btn-sm btn-outline" onClick={() => exploreWord(r.word)}>
                    {r.word} <span style={{ color: '#999' }}>({lang === 'hi' && r.meanings_hi?.length ? r.meanings_hi[0] : (r.meanings[0] || '')})</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {refs.length > 0 && (
            <div className="explore-section">
              <h4>📜 {t('Text references')}</h4>
              {refs.map((r) => (
                <div key={r.id} style={{ marginBottom: 8 }}>
                  <strong style={{ fontSize: 14 }}>{r.title}</strong>
                  <p style={{ margin: '2px 0', color: '#bbb', fontSize: 13 }}>{r.snippet}</p>
                </div>
              ))}
            </div>
          )}

          {examples.length > 0 && (
            <div className="explore-section">
              <h4>💬 {t('Example sentences')}</h4>
              {examples.map((r) => (
                <div key={r.id} style={{ marginBottom: 8 }}>
                  <strong style={{ fontSize: 14 }}>{r.title}</strong>
                  <p style={{ margin: '2px 0', color: '#bbb', fontSize: 13 }}>{r.snippet}</p>
                  <button className="btn btn-sm btn-outline" onClick={() => speakWithFallback(r.snippet.slice(0, 120))}>🔊</button>
                </div>
              ))}
            </div>
          )}

          {concepts.length > 0 && (
            <div className="explore-section">
              <h4>🧠 {t('Related concepts')}</h4>
              {concepts.map((c) => (
                <p key={c.name} style={{ margin: '2px 0', fontSize: 14 }}>
                  {c.icon} <strong>{t(c.name)}</strong> — {c.desc}
                </p>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
