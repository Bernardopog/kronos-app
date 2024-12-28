"use client";

import { createContext, ReactNode, useState } from "react";

interface INavbarContext {
  isNavbarOpen: boolean;
  toggleNavbar: () => void;
  currentPage: string;
  selectedLink: string;
  selectCurrentPage: (page: string) => void;
  selectLink: (link: string) => void;
}

const NavbarContext = createContext({} as INavbarContext);

const NavbarProvider = ({ children }: { children: ReactNode }) => {
  const [isNavbarOpen, setIsNavbarOpen] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<string>("");
  const [selectedLink, setSelectedLink] = useState<string>("");

  /**
   * Toggles the state of the navbar between open and closed.
   * When called, it inverts the current state of `isNavbarOpen`.
   */
  const toggleNavbar = () => setIsNavbarOpen(!isNavbarOpen);

  /**
   * Selects the current page.
   * @param {string} page The page to select.
   */
  const selectCurrentPage = (page: string) => setCurrentPage(page);

  /**
   * Selects the current link.
   * @param {string} link The link to select.
   */
  const selectLink = (link: string) => setSelectedLink(link);

  return (
    <NavbarContext.Provider
      value={{
        isNavbarOpen,
        toggleNavbar,
        currentPage,
        selectedLink,
        selectCurrentPage,
        selectLink,
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
};

export { NavbarContext, NavbarProvider };
