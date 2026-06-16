import { useEffect, useState } from "react";

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    const root = document.documentElement;

    root.classList.remove("dark", "light", "yellow");

    if (theme === "dark") {
      root.classList.add("dark");
    }

    if (theme === "light") {
      root.classList.add("light");
    }

    if (theme === "yellow") {
      root.classList.add("yellow");
    }

    if (theme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

      root.classList.toggle("dark", isDark);
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, setTheme };
}
