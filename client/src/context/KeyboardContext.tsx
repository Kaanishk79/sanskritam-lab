import { createContext, useContext, useState, useRef, useCallback, type ReactNode } from 'react'
import DevanagariKeyboard from '../components/DevanagariKeyboard'

interface KeyboardContextType {
  keyboardVisible: boolean
  openKeyboard: (ref: React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>) => void
  closeKeyboard: () => void
  toggleKeyboard: (ref: React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>) => void
  registerInput: (ref: React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>) => void
}

const KeyboardContext = createContext<KeyboardContextType | null>(null)

export function KeyboardProvider({ children }: { children: ReactNode }) {
  const [keyboardVisible, setKeyboardVisible] = useState(false)
  const [currentTarget, setCurrentTarget] = useState<React.RefObject<HTMLInputElement | HTMLTextAreaElement | null> | null>(null)
  const defaultRef = useRef<HTMLTextAreaElement | HTMLInputElement | null>(null)

  const openKeyboard = useCallback((ref: React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>) => {
    setCurrentTarget(ref)
    setKeyboardVisible(true)
  }, [])

  const closeKeyboard = useCallback(() => {
    setKeyboardVisible(false)
    setCurrentTarget(null)
  }, [])

  const toggleKeyboard = useCallback((ref: React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>) => {
    if (keyboardVisible && currentTarget === ref) {
      closeKeyboard()
    } else {
      openKeyboard(ref)
    }
  }, [keyboardVisible, currentTarget, openKeyboard, closeKeyboard])

  const registerInput = useCallback((ref: React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>) => {
    defaultRef.current = ref.current
  }, [])

  return (
    <KeyboardContext.Provider value={{ keyboardVisible, openKeyboard, closeKeyboard, toggleKeyboard, registerInput }}>
      {children}
      {keyboardVisible && currentTarget && (
        <div className="kb-overlay">
          <DevanagariKeyboard targetRef={currentTarget} onClose={closeKeyboard} />
        </div>
      )}
    </KeyboardContext.Provider>
  )
}

export function useKeyboard() {
  const ctx = useContext(KeyboardContext)
  if (!ctx) throw new Error('useKeyboard must be used within KeyboardProvider')
  return ctx
}
