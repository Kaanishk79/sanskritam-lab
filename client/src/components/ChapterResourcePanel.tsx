import { useMemo, useState } from 'react'
import type { Book, Chapter } from '../types/curriculum'
import { getGrammarTopics } from '../data/ncertGrammarSyllabus'
import { useLanguage } from '../context/LanguageContext'

type Tab = 'teach' | 'solve' | 'mindmap' | 'grammar'

interface ChapterResourcePanelProps {
  book: Book
  chapter: Chapter
  pdfUrl: string | null
  onClose: () => void
}

function deriveVocab(sanskrit: string): string[] {
  const words = (sanskrit || '').split(/[\s–—-]/).filter((w) => /[\u0900-\u097F]/.test(w) && w.length > 1)
  const seen = new Set<string>()
  const out: string[] = []
  for (const w of words) {
    const clean = w.replace(/[\u0964\u0965[:punct:]]/g, '')
    if (clean.length >= 3 && !seen.has(clean)) {
      seen.add(clean)
      out.push(clean)
      if (out.length >= 6) break
    }
  }
  return out
}

export default function ChapterResourcePanel({ book, chapter, pdfUrl, onClose }: ChapterResourcePanelProps) {
  const { t } = useLanguage()
  const [tab, setTab] = useState<Tab>('teach')
  const champ = chapter.titleSanskrit || chapter.title
  const govClass = Math.max((book as any).gov_class_min ?? book.govClassMin, 6)
  const grammarTopics = useMemo(() => getGrammarTopics(govClass), [govClass])
  const vocab = useMemo(() => deriveVocab(champ), [champ])

  const passage = (chapter as any).content_preview ?? chapter.contentPreview ?? ''
  const summary = passage || `${chapter.title}${t(' — a chapter from the NCERT ')}${book.title}.`

  const baseTabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'teach', label: t('Teach'), icon: '📖' },
    { id: 'solve', label: t('Solve'), icon: '✏️' },
    { id: 'mindmap', label: t('Mindmap'), icon: '🧠' },
    { id: 'grammar', label: t('Grammar'), icon: '📝' },
  ]

  return (
    <div style={{ marginTop: 8, border: '1px solid var(--accent)', borderRadius: 10, overflow: 'hidden', background: 'var(--bg-secondary)', padding: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-color)' }}>
        <strong style={{ fontSize: 14 }}>{chapter.titleSanskrit || chapter.title}</strong>
        <span style={{ fontSize: 12, opacity: 0.5 }}>· {book.titleSanskrit || book.title}</span>
        <div style={{ flex: 1 }} />
        {pdfUrl ? (
          <a className="btn btn-primary" style={{ fontSize: 12, padding: '4px 10px' }} href={pdfUrl} target="_blank" rel="noreferrer">
            📄 {t('PDF')}
          </a>
        ) : null}
        <button className="btn btn-outline" style={{ fontSize: 12, padding: '4px 10px' }} onClick={onClose}>✕ {t('Close')}</button>
      </div>

      <div style={{ display: 'flex', gap: 4, padding: '8px 14px 0', flexWrap: 'wrap' }}>
        {baseTabs.map((t) => (
          <button
            key={t.id}
            className={`btn ${tab === t.id ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setTab(t.id)}
            style={{ fontSize: 12, padding: '6px 12px' }}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      <div style={{ padding: '14px' }}>
        {tab === 'teach' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <div style={{ fontSize: 13, color: 'var(--sanskrit-gold)', marginBottom: 6 }}>📖 {t('What you will learn')}</div>
              <div style={{ fontSize: 14, lineHeight: 1.7 }}>{summary}</div>
            </div>
            {vocab.length > 0 && (
              <div>
                <div style={{ fontSize: 13, color: 'var(--sanskrit-gold)', marginBottom: 6 }}>🔤 {t('Key words')}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {vocab.map((w) => (
                    <span key={w} style={{ fontSize: 14, padding: '4px 10px', borderRadius: 6, background: 'var(--bg-tertiary)', fontFamily: "'Noto Sans Devanagari', serif" }}>{w}</span>
                  ))}
                </div>
              </div>
            )}
            <div>
              <div style={{ fontSize: 13, color: 'var(--sanskrit-gold)', marginBottom: 6 }}>👩‍🏫 {t('Teacher script')}</div>
              <div style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text-color)' }}>
                {t('1. Read the chapter title aloud and have students repeat it.')}<br />
                {t('2. Introduce the key words above with pictures and actions.')}<br />
                {t('3. Read a short section together, then translate line by line.')}<br />
                {t('4. Ask comprehension questions in Sanskrit (कः? का? किम्? कुत्र?).')}<br />
                {t('5. End with a fun recall game using the vocabulary.')}
              </div>
            </div>
          </div>
        )}

        {tab === 'solve' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ fontSize: 13, color: 'var(--sanskrit-gold)' }}>✏️ {t('Solve these questions')}</div>
            <div className="solve-question">
              <div style={{ fontSize: 14, fontWeight: 600 }}>{t('Q1. Fill in the blanks')}</div>
              <div style={{ fontSize: 14, lineHeight: 1.7, marginTop: 4 }}>
                {t('Complete the sentence from the chapter and write it in देवनागरी.')}
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
                <input placeholder={t('Type your answer…')} style={{ flex: 1, minWidth: 180, padding: '8px 10px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 6, fontFamily: "'Noto Sans Devanagari', sans-serif", fontSize: 15 }} />
                <button className="btn btn-outline" style={{ fontSize: 12 }} onClick={() => window.alert(t('Check against the textbook PDF for the correct sentence.'))}>{t('Check')}</button>
              </div>
            </div>
            <div className="solve-question">
              <div style={{ fontSize: 14, fontWeight: 600 }}>{t('2. Match the words')}</div>
              <div style={{ fontSize: 14, lineHeight: 1.7, marginTop: 4 }}>{t('Match each keyword (left) with its meaning (right).')}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 6 }}>
                {vocab.slice(0, 5).map((w, i) => (
                  <span key={w} style={{ fontSize: 13, padding: '3px 8px', borderRadius: 5, background: 'var(--bg-tertiary)' }}>{i + 1}. {w}</span>
                ))}
              </div>
            </div>
            <div className="solve-question">
              <div style={{ fontSize: 14, fontWeight: 600 }}>{t('3. Translate')}</div>
              <div style={{ fontSize: 14, lineHeight: 1.7, marginTop: 4 }}>{t('Translate this sentence into Sanskrit and say it aloud:')}</div>
              <div style={{ fontSize: 14, fontStyle: 'italic', marginTop: 4 }}>"{chapter.title}"</div>
            </div>
          </div>
        )}

        {tab === 'mindmap' && (
          <div>
            <div style={{ fontSize: 13, color: 'var(--sanskrit-gold)', marginBottom: 10 }}>🧠 {t('Chapter mind-map')}</div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{ fontSize: 16, fontWeight: 700, padding: '10px 18px', borderRadius: 10, background: 'var(--accent)', color: '#fff', textAlign: 'center' }}>
                {champ}
              </div>
              <div style={{ width: 1, height: 14, background: 'var(--border-color)' }} />
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, maxWidth: 520 }}>
                {[
                    { label: t('Main Idea'), desc: t('The central theme of the chapter') },
                    { label: t('Characters'), desc: t('The people / creatures in the lesson') },
                    { label: t('Vocabulary'), desc: vocab.slice(0, 4).join(', ') || t('New words') },
                    { label: t('Grammar Link'), desc: grammarTopics.slice(0, 2).map((t) => t.titleSanskrit).join(', ') },
                    { label: t('Moral / Message'), desc: t('What the chapter teaches us') },
                  ].map((n) => (
                  <div key={n.label} style={{ fontSize: 12, padding: '8px 12px', borderRadius: 8, background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', textAlign: 'center', maxWidth: 130 }}>
                    <strong>{n.label}</strong>
                    <div style={{ marginTop: 3, opacity: 0.75 }}>{n.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'grammar' && (
          <div>
            <div style={{ fontSize: 13, color: 'var(--sanskrit-gold)', marginBottom: 8 }}>📝 {t('Class')} {govClass} {t('grammar')} — {grammarTopics.length}{t(' topics')}</div>
            {grammarTopics.map((t) => (
              <div key={t.title} style={{ marginTop: 10, padding: '10px 12px', borderRadius: 8, background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{t.titleSanskrit} — {t.title}</div>
                {t.points.map((p, i) => (
                  <div key={i} style={{ fontSize: 13, marginTop: 3, marginLeft: 8, opacity: 0.85 }}>• {p}</div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}