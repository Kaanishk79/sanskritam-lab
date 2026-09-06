import { createContext, useContext, useState, useEffect } from "react";
const ThemeContext = createContext({ theme: "dark", toggle: () => {
} });
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      const stored = localStorage.getItem("sanskritlab-theme");
      if (stored === "light" || stored === "dark") return stored;
    } catch {
      // Storage access blocked or unavailable
    }
    return "dark";
  });
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("sanskritlab-theme", theme);
    } catch (e) {
      console.warn("Could not persist theme to localStorage:", e);
    }
  }, [theme]);
  const toggle = () => setTheme((t) => t === "dark" ? "light" : "dark");
  return <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>;
}
function useTheme() {
  return useContext(ThemeContext);
}
export {
  ThemeProvider,
  useTheme
};
