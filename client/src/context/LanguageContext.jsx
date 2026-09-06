import { createContext, useContext, useEffect, useState } from "react";
import { translations } from "../i18n/translations";
const LanguageContext = createContext(null);
function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const saved = localStorage.getItem("sanskritlab-lang");
      return saved === "en" ? "en" : "hi";
    } catch {
      return "hi";
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem("sanskritlab-lang", lang);
    } catch (e) {
      console.warn("Could not persist language to localStorage:", e);
    }
    document.documentElement.lang = lang === "hi" ? "hi" : "en";
  }, [lang]);
  const setLang = (l) => setLangState(l);
  const toggle = () => setLangState((prev) => prev === "en" ? "hi" : "en");
  const t = (key) => {
    if (lang !== "hi") return key;
    return translations[key] ?? key;
  };
  return <LanguageContext.Provider value={{ lang, setLang, toggle, t }}>
      {children}
    </LanguageContext.Provider>;
}
function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
export {
  LanguageProvider,
  useLanguage
};
