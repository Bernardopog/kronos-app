"use client";

import Button from "@/components/Button/Button";
import NavbarLinkList from "@/components/Navbar/NavbarLinkList";
import ThemeToggler from "@/components/ThemeToggler/ThemeToggler";
import { NavbarContext } from "@/context/NavbarContext";
import { useContext } from "react";

import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

export default function Navbar() {
  const { isNavbarOpen, toggleNavbar } = useContext(NavbarContext);

  return (
    <>
      <Button
        extraStyles={{
          button: "hidden fixed top-20 left-4 z-50 bg-woodsmoke-950 lg:flex",
        }}
        action={toggleNavbar}
      >
        {isNavbarOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
      </Button>
      <nav
        className={`
          flex flex-col justify-between fixed bottom-0 z-40 w-full pb-12 bg-woodsmoke-950/50 duration-500 ease-in-out backdrop-blur-sm
          lg:relative lg:size-full lg:bg-woodsmoke-950
          ${isNavbarOpen ? "" : "closed"}
      `}
        id="nav"
      >
        <NavbarLinkList />
        <ThemeToggler menuStatus={isNavbarOpen} />
      </nav>
    </>
  );
}
