import { NavbarContext } from "@/context/NavbarContext";
import Link from "next/link";
import { ReactNode, useContext } from "react";

interface INavbarListItemProps {
  name: string;
  link: string;
  icon: ReactNode;
  label: string;
  action?: () => void;
}

export default function NavbarLinkListItem({
  name,
  link,
  icon,
  label,
  action,
}: INavbarListItemProps) {
  const { selectedLink, selectCurrentPage } = useContext(NavbarContext);

  return (
    <li
      className="
        flex items-center justify-center h-full w-full rounded-none 
        lg:w-auto lg:rounded-l-lg
      "
      onClick={() => {
        action?.();
        selectCurrentPage(name);
      }}
    >
      <Link
        href={link}
        className={`
          flex justify-center size-full p-2 gap-x-12 font-bold text-2xl text-nowrap duration-300
          lg:justify-end lg:rounded-l-lg lg:pr-0.5
          ${
            selectedLink === name
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
        <span className="hidden lg:inline">{label}</span>
        <span className="text-3xl">{icon}</span>
      </Link>
    </li>
  );
}
