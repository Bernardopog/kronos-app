"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { BsFileText, BsKanban, BsListCheck } from "react-icons/bs";

interface ILinkList {
  name: string;
  path: string;
  label: string;
  icon: React.ReactNode;
}

const linkList: ILinkList[] = [
  {
    name: "kanban",
    path: "/pages/kanban",
    label: "Kanban",
    icon: <BsKanban />,
  },
  {
    name: "todo",
    path: "/pages/todo",
    label: "Tarefas",
    icon: <BsListCheck />,
  },
  {
    name: "note",
    path: "/pages/note",
    label: "Notas",
    icon: <BsFileText />,
  },
];

export default function NavbarLinkList() {
  const [selectedPage, setSelectedPage] = useState<string>("");
  const [selectedLink, setSelectedLink] = useState<string>("");

  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes(selectedPage)) {
      setSelectedLink(selectedPage);
    } else {
      setSelectedLink("home");
    }
  }, [pathname, selectedPage]);

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
            setSelectedPage(link.name);
          }}
        >
          <Link
            href={link.path}
            className={`
              flex justify-center size-full p-2 gap-x-12 font-bold text-2xl text-nowrap duration-300
              lg:justify-end lg:rounded-l-lg lg:pr-0.5
              ${selectedLink === link.name ? "bg-woodsmoke-50 text-woodsmoke-950" : "bg-woodsmoke-950 text-woodsmoke-50 hover:bg-woodsmoke-900"}
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
