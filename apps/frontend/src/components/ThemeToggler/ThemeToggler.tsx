"use client";

import { useEffect, useState } from "react";
import { BsMoon, BsSun } from "react-icons/bs";
import Button from "../Button/Button";

interface IThemeTogglerProps {
  menuStatus?: boolean;
}

export default function ThemeToggler({ menuStatus }: IThemeTogglerProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const handleTheme = () => {
    const html = document.documentElement;
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      setTheme("light");
      localStorage.setItem("theme", "light");
    } else {
      html.classList.add("dark");
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    }
  }, []);

  return (
    <div className="self-center">
      {menuStatus && (
        <span
          className="
          inline-block w-full text-center text-base text-woodsmoke-950 ease-in-out duration-300
          dark:text-woodsmoke-50
        "
        >
          {theme === "dark" ? "Escuro" : "Claro"}
        </span>
      )}
      <Button
        ariaLabel={
          theme === "dark"
            ? "Alterar para Modo Claro"
            : "Alterar para Modo Escuro"
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
          {theme === "dark" ? <BsMoon /> : <BsSun />}
        </div>
      </Button>
    </div>
  );
}
