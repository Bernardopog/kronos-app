"use client";

import { Button } from "@/ui/Button";
import Divider from "@/ui/Divider";
import RecentTask from "@/ui/RecentTask";
import ToDoCategory from "@/components/ToDoPage/ToDoCategory/ToDoCategory";
import { ToDoCategoryContext } from "@/context/ToDoCategoryContext";
import { ModalContext } from "@/context/ModalContext";
import { ToDoContext } from "@/context/ToDoContext";
import { useContext } from "react";
import { AiFillPlusCircle, AiOutlineClose } from "react-icons/ai";
import { TabCloseButton } from "@/ui/Button";
import Inert from "@/ui/Inert";
import { DeviceScreenContext } from "@/context/DeviceScreenContext";

export default function ToDoGeneralInfo() {
  const { isGeneralShow, generalShowControl, toggleGeneral, recentList } =
    useContext(ToDoContext);
  const { device } = useContext(DeviceScreenContext);
  const { toggleModal } = useContext(ModalContext);
  const { categoryList } = useContext(ToDoCategoryContext);

  return (
    <Inert value={isGeneralShow || device === "desktop"}>
      <section
        className={`
          flex flex-col fixed top-0 size-full p-4 gap-y-2 bg-woodsmoke-100 text-woodsmoke-950 duration-300 ease-in-out
          dark:bg-woodsmoke-950 dark:text-woodsmoke-200
          lg:static lg:translate-y-[16px] lg:rounded-t-lg
          ${generalShowControl ? "right-0" : "-right-full"}
        `}
        id="td-general"
      >
        <TabCloseButton
          action={() => toggleGeneral("close")}
          ariaLabel="Fechar informações gerais"
          icon={<AiOutlineClose />}
        />
        <h4 className="text-2xl font-medium">Informações Gerais</h4>
        <Divider />
        <section>
          <div className="flex justify-between items-center">
            <h5 className="tab-title">Categorias ({categoryList.length})</h5>
            <Button
              ariaLabel="Criar categoria"
              label="Criar Categoria"
              extraStyles={{
                button: `px-2 text-woodsmoke-900
                hover:bg-apple-600
                dark:text-woodsmoke-200
                dark:hover:shadow-[0_0_5px_3px] dark:hover:shadow-apple-500/25`,
                label: "hidden sm:inline",
              }}
              action={() => {
                toggleModal({
                  headerTitle: "Criar Categoria",
                  type: "create",
                  content: "toDoCreateCategory",
                });
              }}
              icon={<AiFillPlusCircle />}
            />
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
        </section>
        <Divider />
        <div>
          <h5 className="tab-title">Tarefas Recentes</h5>
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
    </Inert>
  );
}
