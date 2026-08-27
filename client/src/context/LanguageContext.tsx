import { createContext, useContext, useEffect, useState } from 'react'
import { translations } from '../i18n/translations'

export type Lang = 'en' | 'hi'

interface LanguageContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  toggle: () => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem('sanskritlab-lang')
    return saved === 'en' ? 'en' : 'hi'
  })

  useEffect(() => {
    localStorage.setItem('sanskritlab-lang', lang)
    document.documentElement.lang = lang === 'hi' ? 'hi' : 'en'
  }, [lang])

  const setLang = (l: Lang) => setLangState(l)
  const toggle = () => setLangState((prev) => (prev === 'en' ? 'hi' : 'en'))

  const t = (key: string): string => {
    if (lang !== 'hi') return key
    return translations[key] ?? key
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
