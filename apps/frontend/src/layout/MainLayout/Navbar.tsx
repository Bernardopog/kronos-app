"use client";

import { Button } from "@/ui/Button";
import NavbarLinkList from "@/components/Navbar/NavbarLinkList";
import ThemeToggler from "@/components/ThemeToggler/ThemeToggler";
import { DeviceScreenContext } from "@/context/DeviceScreenContext";
import { NavbarContext } from "@/context/NavbarContext";
import { useContext } from "react";

import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

export default function Navbar() {
  const { isNavbarOpen, toggleNavbar } = useContext(NavbarContext);
  const { device } = useContext(DeviceScreenContext);

  return (
    <>
      <Button
        ariaLabel={isNavbarOpen ? "Fechar Menu" : "Abrir Menu"}
        extraStyles={{
          button: `hidden fixed top-20 left-4 z-50 rounded-full bg-woodsmoke-200 
            dark:border dark:bg-woodsmoke-950 
            hover:border-woodsmoke-400 
            lg:flex`,
          icon: "text-woodsmoke-950 dark:text-woodsmoke-50",
        }}
        action={toggleNavbar}
        icon={isNavbarOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
      />
      <nav
        className={`
          flex flex-col justify-between fixed bottom-0 z-40 w-full bg-woodsmoke-200/50 duration-300 ease-in-out backdrop-blur-sm
          dark:bg-woodsmoke-950/50
          lg:relative lg:size-full lg:pb-12 lg:bg-woodsmoke-200
          lg:dark:bg-woodsmoke-950
          ${isNavbarOpen ? "" : "closed"}
      `}
        id="nav"
      >
        <NavbarLinkList />
        {device === "desktop" && <ThemeToggler menuStatus={isNavbarOpen} />}
      </nav>
    </>
  );
}
