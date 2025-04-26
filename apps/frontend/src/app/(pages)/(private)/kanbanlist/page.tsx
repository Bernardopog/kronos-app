"use client";
import { Button } from "@/ui/Button";
import { KanbanContext } from "@/context/KanbanContext";
import { ModalContext } from "@/context/ModalContext";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useContext, useEffect, useRef } from "react";
import { AiFillCopy, AiFillPlusCircle } from "react-icons/ai";
import { AuthContext } from "@/context/AuthContext";

export default function KanbanPage() {
  const { toggleModal } = useContext(ModalContext);
  const { kanbanList, authorizedKanbanList, deleteKanban } =
    useContext(KanbanContext);
  const { user } = useContext(AuthContext);

  const searchParams = useSearchParams();
  const router = useRouter();

  const kanbanidToDelete = searchParams.get("delete");

  const hasDeletedRef = useRef(false);

  useEffect(() => {
    if (!kanbanidToDelete || hasDeletedRef.current) return;

    hasDeletedRef.current = true;

    const deleteAndNavigate = async () => {
      await deleteKanban(kanbanidToDelete);

      // Limpa a URL antes de redirecionar (evita re-trigger)
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete("delete");
      const urlWithoutParam = `/kanbanlist?${newParams.toString()}`.replace(
        /\?$/,
        ""
      );

      router.replace(urlWithoutParam);
    };

    deleteAndNavigate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kanbanidToDelete, deleteKanban, router]);

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
        <div className="flex items-center w-full justify-end text-woodsmoke-900 dark:text-woodsmoke-100">
          Seu ID:{" "}
          <span className="inline-block ml-2 px-2 rounded-l-lg bg-woodsmoke-900 text-woodsmoke-100">
            {user?.id}
          </span>
          <Button
            extraStyles={{
              button: `inline-block p-0 px-2 rounded-none rounded-r-lg bg-woodsmoke-100 text-woodsmoke-900
                hover:text-woodsmoke-950`,
            }}
            ariaLabel="Copiar ID"
            icon={<AiFillCopy />}
            action={() => navigator.clipboard.writeText(user?.id ?? "")}
          />
        </div>
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
