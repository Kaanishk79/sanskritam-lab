import { createContext, useContext, useState, useEffect } from "react";
const ThemeContext = createContext({ theme: "dark", toggle: () => {
} });
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem("sanskritlab-theme");
    if (stored === "light" || stored === "dark") return stored;
    return "dark";
  });
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("sanskritlab-theme", theme);
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
