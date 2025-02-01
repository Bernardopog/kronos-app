"use client";
import { NavbarContext } from "@/context/NavbarContext";
import linkList from "@/shared/linkList";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect } from "react";

export default function NavbarLinkList() {
  const { currentPage, selectCurrentPage, selectedLink, selectLink } =
    useContext(NavbarContext);

  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes(currentPage)) {
      selectLink(currentPage);
    } else {
      selectLink("home");
    }
  }, [pathname, currentPage, selectLink]);

  return (
    <ul
      className="
      flex w-full
      lg:flex-col lg:items-end lg:pt-16 lg:gap-y-2
    "
    >
      {linkList.map((link) => (
        <li
          className="
            flex items-center justify-center h-full w-2/6 rounded-none 
            lg:w-auto lg:rounded-l-lg
          "
          key={link.name}
          onClick={() => {
            selectCurrentPage(link.name);
          }}
        >
          <Link
            href={link.path}
            className={`
              flex justify-center size-full p-2 gap-x-12 font-bold text-2xl text-nowrap duration-300
              lg:justify-end lg:rounded-l-lg lg:pr-0.5
              ${
                selectedLink === link.name
                  ? "bg-woodsmoke-50 text-woodsmoke-950 dark:bg-woodsmoke-925 dark:text-woodsmoke-50"
                  : `
              bg-woodsmoke-200 text-woodsmoke-800 
              hover:bg-woodsmoke-100 
              dark:bg-woodsmoke-950 dark:text-woodsmoke-600 
              dark:hover:bg-woodsmoke-950 dark:hover:text-woodsmoke-300
              `
              }
            `}
          >
            <span className="hidden lg:inline">{link.label}</span>
            <span className="text-3xl">{link.icon}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
