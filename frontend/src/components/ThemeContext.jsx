import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const THEME_STORAGE_KEY = "autoprep-theme";
const ThemeContext = createContext(null);

/** Wrap the whole app with this once (in App.jsx or main.jsx) so every page shares one theme. */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/** Call this from any page/component to read or flip the current theme. */
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error(
      "useTheme must be used inside <ThemeProvider>. Wrap your app in main.jsx or App.jsx.",
    );
  }
  return ctx;
}
