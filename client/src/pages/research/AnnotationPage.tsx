import { useEffect, useState } from 'react'
import { supabase } from '../../services/supabase'
import { useLanguage } from '../../context/LanguageContext'

const layers = ['grammar', 'translation', 'commentary'] as const
type Layer = (typeof layers)[number]

interface TextRow { id: string; title: string; title_hi?: string | null; content?: string }

export default function AnnotationPage() {
  const { t, lang } = useLanguage()
  const [activeLayer, setActiveLayer] = useState<Layer>('grammar')
  const [texts, setTexts] = useState<TextRow[]>([])
  const [selectedText, setSelectedText] = useState<string>('')
  const [annotations, setAnnotations] = useState<Record<string, string>>({
    grammar: '',
    translation: '',
    commentary: '',
  })
  const [editors, setEditors] = useState<Record<string, string>>({
    grammar: '',
    translation: '',
    commentary: '',
  })
  const [notice, setNotice] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      const { data } = await supabase
        .from('texts')
        .select('id,title,title_hi,content')
        .order('id')
        .limit(40)
      setTexts(data ?? [])
      setSelectedText((data?.[0]?.id) ?? '')
      setLoading(false)
    })()
  }, [])

  useEffect(() => {
    if (!selectedText) return
    ;(async () => {
      const { data, error } = await supabase
        .from('annotations')
        .select('id,text_id,layer,content')
        .eq('text_id', selectedText)
      if (error || !data) {
        return
      }
      const mapped: Record<string, string> = { grammar: '', translation: '', commentary: '' }
      for (const a of data) {
        if (a.layer in mapped) mapped[a.layer as Layer] = a.content
      }
      setAnnotations(mapped)
      setEditors(mapped)
    })()
  }, [selectedText])

  const saveAnnotation = async () => {
    const content = (editors[activeLayer] ?? '').trim()
    setNotice('')
    if (!content) return
    try {
      let { error } = await supabase
        .from('annotations')
        .insert({ text_id: selectedText, layer: activeLayer, content })
      if (error) {
        setNotice('⚠️ ' + error.message + ' — ' + t('saved only on this device for now.'))
      } else {
        setNotice(t('Saved to database') + ' ✅')
      }
    } catch {
      setNotice('⚠️ ' + t('Could not reach the database') + ' — ' + t('saved only on this device for now.'))
    }
    setAnnotations((prev) => ({ ...prev, [activeLayer]: content }))
    setEditors((prev) => ({ ...prev, [activeLayer]: '' }))
  }

  const selected = texts.find((t) => t.id === selectedText)

  return (
    <div>
      <div className="page-header">
        <h2>🏛️ {t('Annotation Tool')}</h2>
        <p>{t('Add multi-level notes to texts — from grammar breakdowns to classical commentaries')}</p>
      </div>

      {loading ? (
        <p style={{ opacity: 0.6 }}>{t('Loading texts…')}</p>
      ) : (
        <div className="card" style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', marginBottom: 8, color: '#aaa', fontSize: 13 }}>
            {t('Select Text')}
          </label>
          <select
            value={selectedText}
            onChange={(e) => setSelectedText(e.target.value)}
            style={{ width: '100%', maxWidth: 480 }}
          >
            {texts.map((t) => <option key={t.id} value={t.id}>{lang === 'hi' && t.title_hi ? t.title_hi : t.title}</option>)}
          </select>
          {selected?.content && (
            <div
              style={{
                fontSize: 28,
                lineHeight: 1.8,
                fontFamily: "'Noto Sans Devanagari', serif",
                color: '#f0f0f0',
                marginTop: 16,
                padding: 16,
                background: 'rgba(0,0,0,0.2)',
                borderRadius: 8,
                whiteSpace: 'pre-wrap',
                maxHeight: 260,
                overflowY: 'auto',
              }}
            >
              {selected.content}
            </div>
          )}
        </div>
      )}

      <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
        {layers.map((layer) => (
          <button
            key={layer}
            className={`btn ${activeLayer === layer ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveLayer(layer)}
          >
            {t(layer[0].toUpperCase() + layer.slice(1))}
          </button>
        ))}
      </div>

      <div className={`annotation-layer ${activeLayer}`}>
        <div style={{ fontSize: 12, color: '#888', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
          {t(`${activeLayer} Layer`)}
        </div>

        <label style={{ display: 'block', marginBottom: 8, color: '#aaa', fontSize: 13 }}>
          {t(`Existing ${activeLayer} annotation`)}
        </label>
        <div
          style={{
            whiteSpace: 'pre-wrap',
            fontSize: 14,
            lineHeight: 1.6,
            color: '#e0e0e0',
            padding: 12,
            background: 'rgba(0,0,0,0.15)',
            borderRadius: 6,
            marginBottom: 16,
            minHeight: 40,
          }}
        >
          {annotations[activeLayer] || `— ${t('none yet')} —`}
        </div>

        <label style={{ display: 'block', marginBottom: 8, color: '#aaa', fontSize: 13 }}>
          {t(`Write ${activeLayer} annotation`)}
        </label>
        <textarea
          value={editors[activeLayer] ?? ''}
          onChange={(e) => setEditors({ ...editors, [activeLayer]: e.target.value })}
          style={{
            width: '100%',
            minHeight: 150,
            background: 'rgba(0,0,0,0.2)',
            border: 'none',
            color: '#e0e0e0',
            padding: 12,
            borderRadius: 6,
            fontSize: 14,
            lineHeight: 1.6,
            resize: 'vertical',
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
          <button className="btn btn-primary" onClick={saveAnnotation} disabled={!selectedText}>
            {t('Save Annotation')}
          </button>
          {notice && <span style={{ fontSize: 13, color: '#aaa' }}>{notice}</span>}
        </div>
      </div>
    </div>
  )
}