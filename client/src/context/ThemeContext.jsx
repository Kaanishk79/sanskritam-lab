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
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    }
    return "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.colorScheme = theme;
    try {
      localStorage.setItem("sanskritlab-theme", theme);
    } catch (e) {
      console.warn("Could not persist theme to localStorage:", e);
    }
  }, [theme]);

  // Listen for OS system theme changes if user hasn't explicitly set preference
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
    const handleChange = (e) => {
      try {
        const stored = localStorage.getItem("sanskritlab-theme");
        if (!stored) {
          setTheme(e.matches ? "light" : "dark");
        }
      } catch {}
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  return (
    <ThemeContext.Provider value={{ theme, toggle, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
function useTheme() {
  return useContext(ThemeContext);
}
export {
  ThemeProvider,
  useTheme
};
