import { useState, useEffect, useCallback, useRef } from 'react'
import { devanagariLayouts, insertAtCursor } from '../services/keyboard'
import { useLanguage } from '../context/LanguageContext'

interface DevanagariKeyboardProps {
  targetRef: React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>
  onClose?: () => void
}

type TabKey = 'consonants' | 'vowels' | 'matras' | 'digits' | 'special'

const tabs: { key: TabKey; label: string }[] = [
  { key: 'consonants', label: 'व्यञ्जन' },
  { key: 'vowels', label: 'स्वर' },
  { key: 'matras', label: 'मात्रा' },
  { key: 'digits', label: 'अङ्क' },
  { key: 'special', label: 'चिह्न' },
]

export default function DevanagariKeyboard({ targetRef, onClose }: DevanagariKeyboardProps) {
  const { t } = useLanguage()
  const [tab, setTab] = useState<TabKey>('consonants')
  const [caps, setCaps] = useState(false)
  const [halant, setHalant] = useState(false)
  const keyboardRef = useRef<HTMLDivElement>(null)

  const type = useCallback((char: string) => {
    const input = targetRef.current
    if (!input) return

    let toInsert = char

    if (caps && devanagariLayouts.vowels.chars.flat().includes(char)) {
      // Caps mode only affects certain chars - keep simple
    }

    insertAtCursor(input, toInsert)
    if (halant) setHalant(false)
  }, [targetRef, caps, halant])

  const typeHalant = useCallback(() => {
    const input = targetRef.current
    if (!input) return
    insertAtCursor(input, '्')
  }, [targetRef])

  const typeSpace = useCallback(() => {
    const input = targetRef.current
    if (!input) return
    insertAtCursor(input, ' ')
  }, [targetRef])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (keyboardRef.current && !keyboardRef.current.contains(e.target as Node)) {
        // Don't close on outside click — user can close via the X button
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const layout = devanagariLayouts[tab]

  return (
    <div className="devanagari-keyboard" ref={keyboardRef}>
      <div className="kb-header">
        <span className="kb-title">देवनागरी कुञ्जीपटल</span>
        <div className="kb-actions">
          <button
            className={`kb-toggle ${caps ? 'active' : ''}`}
            onClick={() => setCaps((c) => !c)}
            title={t('Caps')}
          >
            अा
          </button>
          <button className="kb-close" onClick={onClose}>✕</button>
        </div>
      </div>

      <div className="kb-tabs">
        {tabs.map((t) => (
          <button
            key={t.key}
            className={`kb-tab ${tab === t.key ? 'active' : ''}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="kb-body">
        {'groups' in layout ? (
          layout.groups.map((group) => (
            <div key={group.name} className="kb-row">
              {group.chars.map((ch) => (
                <button key={ch} className="kb-key kons" onClick={() => type(ch)}>
                  {ch}
                </button>
              ))}
            </div>
          ))
        ) : (
          (layout as { chars: string[][] }).chars.map((row, i) => (
            <div key={i} className="kb-row">
              {row.map((ch) => (
                <button key={ch} className="kb-key" onClick={() => type(ch)}>
                  {ch}
                </button>
              ))}
            </div>
          ))
        )}

        <div className="kb-row kb-bottom-row">
          <button className="kb-key kb-key-halant" onClick={typeHalant}>् (Halant)</button>
          <button className="kb-key kb-key-space" onClick={typeSpace}>␣ Space</button>
          <button className="kb-key kb-key-bksp" onClick={() => {
            const input = targetRef.current
            if (input) insertAtCursor(input, '\b')
          }}>⌫</button>
        </div>
      </div>
    </div>
  )
}
