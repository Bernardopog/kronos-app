"use client";

import { createContext, ReactNode, useState } from "react";

interface INavbarContext {
  isNavbarOpen: boolean;
  toggleNavbar: () => void;
}

const NavbarContext = createContext({} as INavbarContext);

const NavbarProvider = ({ children }: { children: ReactNode }) => {
  const [isNavbarOpen, setIsNavbarOpen] = useState<boolean>(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <NavbarContext.Provider value={{ isNavbarOpen, toggleNavbar }}>
      {children}
    </NavbarContext.Provider>
  );
};

export { NavbarContext, NavbarProvider };
