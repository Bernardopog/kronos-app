"use client";

import { useContext, useEffect } from "react";
import { BsMoon, BsSun } from "react-icons/bs";
import { Button } from "@/ui/Button/";
import { ThemeContext } from "@/context/ThemeContext";

interface IThemeTogglerProps {
  menuStatus?: boolean;
  themeIsDark: boolean;
}

export default function ThemeToggler({
  menuStatus,
  themeIsDark,
}: IThemeTogglerProps) {
  const { toggleTheme, setInitialTheme } = useContext(ThemeContext);

  const handleTheme = async () => {
    const newTheme = !themeIsDark;

    if ("cookieStore" in window) {
      await window.cookieStore?.set({
        name: "theme",
        value: newTheme ? "dark" : "light",
        path: "/",
      });
    } else {
      // biome-ignore lint/suspicious/noDocumentCookie: <For browsers that not support cookieStore>
      document.cookie = `theme=${newTheme ? "dark" : "light"}; path=/`;
    }
    document.documentElement.classList.toggle("dark");
    if (toggleTheme) {
      toggleTheme();
    }
  };

  useEffect(() => {
    setInitialTheme(themeIsDark ? "dark" : "light");
  }, [themeIsDark, setInitialTheme]);

  return (
    <div className="self-center">
      {menuStatus && (
        <span
          className="
          inline-block w-full text-center text-base text-woodsmoke-950 ease-in-out duration-300
          dark:text-woodsmoke-50
        "
        >
          {themeIsDark ? "Escuro" : "Claro"}
        </span>
      )}
      <Button
        ariaLabel={
          themeIsDark ? "Alterar para Modo Claro" : "Alterar para Modo Escuro"
        }
        extraStyles={{
          button: `
          bg-woodsmoke-200 dark:bg-woodsmoke-950 shadow-none ease-in-out duration-300
          ${menuStatus ? "w-20 h-8 rounded-full border border-woodsmoke-800 dark:border-woodsmoke-100 hover:border-woodsmoke-900 dark:hover:border-woodsmoke-50" : "border-none"}`,
          icon: "text-xl text-woodsmoke-950 dark:text-woodsmoke-50",
        }}
        action={() => handleTheme()}
      >
        <div
          className={`
            flex items-center justify-center size-6 rounded-full duration-300 ease-in-out
            ${menuStatus && "translate-x-6 dark:-translate-x-6"}
          `}
        >
          {themeIsDark ? <BsMoon /> : <BsSun />}
        </div>
      </Button>
    </div>
  );
}
