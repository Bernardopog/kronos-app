"use client";
import { ReactNode, useState } from "react";
import { createContext } from "react";

interface IThemeContext {
  theme: "dark" | "light";
  toggleTheme: () => void;
  setInitialTheme: (theme: "dark" | "light") => void;
}

const ThemeContext = createContext({} as IThemeContext);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const setInitialTheme = (theme: "dark" | "light") => setTheme(theme);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setInitialTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
