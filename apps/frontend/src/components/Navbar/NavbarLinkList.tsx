"use client";
import { NavbarContext } from "@/context/NavbarContext";
import { usePathname } from "next/navigation";
import { useContext, useEffect } from "react";
import NavbarLinkListItem from "./NavbarLinkListItem";
import Divider from "../Divider/Divider";
import { BsFileText, BsKanban, BsListCheck } from "react-icons/bs";
import { AiOutlineForm, AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";
import { AuthContext } from "@/context/AuthContext";

export default function NavbarLinkList() {
  const { currentPage, selectLink } = useContext(NavbarContext);
  const { user, logout } = useContext(AuthContext);

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
      link-list lg:pt-12
    "
    >
      {user && (
        <>
          <NavbarLinkListItem
            name="kanban"
            link="/kanbanlist"
            icon={<BsKanban />}
            label="Kanban"
          />
          <NavbarLinkListItem
            name="todo"
            link="/todo"
            icon={<BsListCheck />}
            label="Tarefas"
          />
          <NavbarLinkListItem
            name="note"
            link="/note"
            icon={<BsFileText />}
            label="Notas"
          />
          <li className="hidden w-full h-fit lg:block">
            <Divider className="bg-woodsmoke-300" />
          </li>
        </>
      )}
      {!user && (
        <>
          <NavbarLinkListItem
            name="signin"
            link="/signin"
            icon={<AiOutlineLogin />}
            label="Entrar"
          />
          <NavbarLinkListItem
            name="signup"
            link="/signup"
            icon={<AiOutlineForm />}
            label="Registrar"
          />
        </>
      )}
      {user && (
        <NavbarLinkListItem
          name="signout"
          link="/signin"
          icon={<AiOutlineLogout />}
          label="Sair"
          action={() => logout()}
        />
      )}
    </ul>
  );
}
