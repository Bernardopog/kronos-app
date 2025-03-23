"use client";
import Button from "@/components/Button/Button";
import { KanbanContext } from "@/context/KanbanContext";
import { ModalContext } from "@/context/ModalContext";
import Link from "next/link";
import { useContext } from "react";
import { AiFillPlusCircle } from "react-icons/ai";

export default function KanbanPage() {
  const { toggleModal } = useContext(ModalContext);
  const { kanbanList, authorizedKanbanList } = useContext(KanbanContext);

  return (
    <main
      className="page flex flex-col content-start justify-start px-2 gap-2 text-woodsmoke-900 dark:text-woodsmoke-200"
      id="main"
    >
      <section
        className={`flex flex-col w-full p-2 gap-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-woodsmoke-950 overflow-y-auto
        dark:scrollbar-thumb-woodsmoke-100
        ${authorizedKanbanList.length > 0 && "max-h-[50%]"}
      `}
      >
        <h2 className="w-full text-2xl font-bold">Meus Kanbans</h2>
        <div className="flex flex-wrap gap-2">
          {kanbanList.map((kanban) => (
            <Link
              key={kanban.id}
              href={`/kanbanlist/${kanban.id}`}
              className="flex items-center justify-center min-w-64 w-[90%] max-w-72 h-20 border border-woodsmoke-200 rounded-lg font-bold overflow-clip duration-300 ease-in-out
                hover:shadow-btn hover:shadow-woodsmoke-800/25 
                dark:border-woodsmoke-800 dark:hover:shadow-btn 
                dark:hover:shadow-woodsmoke-800/25"
            >
              <span className="inline-block mx-2 truncate">{kanban.title}</span>
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
              min-w-64 w-[90%] max-w-[18rem] h-20 border-dashed
              hover:bg-apple-600
              dark:hover:shadow-btn dark:hover:shadow-apple-600/25
            `,
            }}
          />
        </div>
      </section>
      {authorizedKanbanList.length > 0 && (
        <section
          className="flex flex-col w-full p-2 gap-2 max-h-[50%] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-woodsmoke-950 overflow-y-auto
        dark:scrollbar-thumb-woodsmoke-100
      "
        >
          <h2 className="w-full text-2xl font-bold">Outros Kanbans</h2>
          <div className="flex flex-wrap gap-2">
            {authorizedKanbanList.map((kanban) => (
              <Link
                key={kanban.id}
                href={`/kanbanlist/${kanban.id}`}
                className="flex items-center justify-center min-w-64 w-[90%] max-w-72 h-20 border border-woodsmoke-200 rounded-lg font-bold overflow-clip duration-300 ease-in-out
                hover:shadow-btn hover:shadow-woodsmoke-800/25 
                dark:border-woodsmoke-800 dark:hover:shadow-btn 
                dark:hover:shadow-woodsmoke-800/25"
              >
                <span className="inline-block mx-2 truncate">
                  {kanban.title}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
