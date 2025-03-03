"use client";
import Button from "@/components/Button/Button";
import { KanbanContext } from "@/context/KanbanContext";
import { ModalContext } from "@/context/ModalContext";
import Link from "next/link";
import { useContext } from "react";
import { AiFillPlusCircle } from "react-icons/ai";

export default function KanbanPage() {
  const { toggleModal } = useContext(ModalContext);
  const { kanbanList } = useContext(KanbanContext);

  return (
    <main
      className="page flex flex-wrap content-start gap-2 text-woodsmoke-900 dark:text-woodsmoke-200"
      id="main"
    >
      {kanbanList.map((kanban) => (
        <Link
          key={kanban.id}
          href={`/kanbanlist/${kanban.id}`}
          className="flex items-center justify-center min-w-72 max-w-[22rem] h-20 border border-woodsmoke-200 rounded-lg font-bold overflow-clip duration-300 ease-in-out 
            hover:shadow-btn hover:shadow-woodsmoke-800/25 
            dark:border-woodsmoke-800 dark:hover:shadow-btn 
            dark:hover:shadow-woodsmoke-800/25"
        >
          {kanban.title}
        </Link>
      ))}
      <Button
        action={() =>
          toggleModal({
            content: "kanbanCreate",
            type: "create",
            headerTitle: "Criar Kanban",
          })
        }
        label="Criar Kanban"
        icon={<AiFillPlusCircle />}
        extraStyles={{
          button: `
            min-w-72 h-20 border-dashed
            hover:bg-apple-600
            dark:hover:shadow-btn dark:hover:shadow-apple-600/25
          `,
        }}
      />
    </main>
  );
}
