"use client";
import ThemeToggler from "@/components/ThemeToggler/ThemeToggler";
import { DeviceScreenContext } from "@/context/DeviceScreenContext";
import Link from "next/link";
import { useContext } from "react";

export default function Header({themeIsDark}: {themeIsDark:boolean}) {
  const { device } = useContext(DeviceScreenContext);

  return (
    <header
      className="
        flex justify-center items-center h-16 bg-woodsmoke-200 dark:bg-woodsmoke-950
        lg:justify-start lg:px-4 duration-300 ease-in-out
      "
      id="header"
    >
      <Link href="/">
        <h1 className="text-[2rem] font-black text-woodsmoke-950 dark:text-woodsmoke-50">
          Kronos
        </h1>
      </Link>
      <div className="absolute right-2">
        {device !== "desktop" && <ThemeToggler themeIsDark={themeIsDark} />}
      </div>
    </header>
  );
}
