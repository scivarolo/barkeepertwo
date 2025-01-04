import { useEffect, useMemo, useState } from "react";
import { Theme, ThemeContext, ThemeProviderProps } from ".";

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "barkeeper-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme:dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  });

  const value = useMemo(() => {
    return {
      theme,
      setTheme: (theme: Theme) => {
        localStorage.setItem(storageKey, theme);
        setTheme(theme);
      },
    };
  }, [theme, storageKey]);

  return (
    <ThemeContext.Provider {...props} value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
