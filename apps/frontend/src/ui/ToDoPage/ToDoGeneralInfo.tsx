"use client";

import Button from "@/components/Button/Button";
import Divider from "@/components/Divider/Divider";
import RecentTask from "@/components/RecentTask/RecentTask";
import ToDoCategory from "@/components/ToDoPage/ToDoCategory/ToDoCategory";
import { ToDoCategoryContext } from "@/context/ToDoCategoryContext";
import { ModalContext } from "@/context/ModalContext";
import { ToDoContext } from "@/context/ToDoContext";
import { useContext } from "react";
import { AiFillPlusCircle, AiOutlineClose } from "react-icons/ai";

export default function ToDoGeneralInfo() {
  const { isGeneralShow, generalShowControl, toggleGeneral, recentList } =
    useContext(ToDoContext);
  const { toggleModal } = useContext(ModalContext);
  const { categoryList } = useContext(ToDoCategoryContext);

  return (
    <>
      <section
        className={`
          flex flex-col fixed top-0 size-full p-4 gap-y-2 bg-woodsmoke-100 text-woodsmoke-950 duration-300 ease-in-out
          dark:bg-woodsmoke-950 dark:text-woodsmoke-200
          lg:static lg:translate-y-[16px] lg:rounded-t-lg
          ${generalShowControl ? "-right-0" : "-right-full"}
        `}
        id="td-general"
        aria-hidden={!isGeneralShow}
      >
        <button
          className="
            absolute right-8 flex items-center justify-center size-8 border rounded-full text-2xl border-woodsmoke-200 bg-woodsmoke-50 text-woodsmoke-950 duration-300 ease-in-out
            hover:bg-woodsmoke-100
            dark:bg-woodsmoke-900 dark:border-woodsmoke-600 dark:text-woodsmoke-50
            dark:hover:bg-woodsmoke-950
            lg:hidden
          "
          onClick={() => {
            toggleGeneral("close");
          }}
          aria-label="Fechar informações gerais"
        >
          <AiOutlineClose />
        </button>
        <h4 className="text-2xl font-medium">Informações Gerais</h4>
        <Divider />
        <div>
          <div className="flex justify-between items-center">
            <h5 className="to-do-tabs-title">
              Categorias ({categoryList.length})
            </h5>
            <Button
              ariaLabel="Criar categoria"
              label="Criar Categoria"
              extraStyles={{
                button:
                  "w-fit px-2 gap-x-2 bg-apple-600 text-woodsmoke-50 duration-300 ease-in-out hover:bg-apple-700",
                label: "hidden lg:inline",
              }}
              action={() => {
                toggleModal({
                  headerTitle: "Criar Categoria",
                  type: "create",
                  content: "toDoCreateCategory",
                });
              }}
            >
              <AiFillPlusCircle />
            </Button>
          </div>
          <ul
            className="
            flex flex-col max-h-52 mt-4 p-2 gap-y-2 rounded-lg bg-woodsmoke-200 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-woodsmoke-400 duration-300 ease-in-out
            dark:bg-woodsmoke-925
          "
          >
            {categoryList.map((category) => {
              return (
                <ToDoCategory
                  key={category.id}
                  id={category.id}
                  title={category.title}
                />
              );
            })}
          </ul>
        </div>
        <Divider />
        <div>
          <h5 className="to-do-tabs-title">Tarefas Recentes</h5>
          <div>
            {recentList.toReversed().map((recentTask, idx) => (
              <RecentTask
                key={recentTask.id}
                title={recentTask.title}
                animationDuration={250 * (idx + 1)}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
