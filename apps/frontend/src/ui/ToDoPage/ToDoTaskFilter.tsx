"use client";
import Divider from "@/components/Divider/Divider";
import Radio from "@/components/Radio/Radio";
import { ToDoContext } from "@/context/ToDoContext";
import { useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function ToDoTaskFilter() {
  const {
    changeFilterStatus,
    changeFilterPriority,
    isFilterShow,
    filterShowControl,
    toggleFilter,
  } = useContext(ToDoContext);

  return (
    <>
      <section
        className={`
            flex flex-col fixed top-0 size-full p-4 gap-y-2 bg-woodsmoke-100 text-woodsmoke-950 duration-500 ease-in-out
            lg:static lg:translate-y-[16px] lg:rounded-t-lg
            ${filterShowControl ? "-left-0" : "-left-full"}
          `}
        id="td-filter"
        aria-hidden={!isFilterShow}
      >
        <button
          className="
              absolute right-8 flex items-center justify-center size-8 border rounded-full text-2xl border-woodsmoke-200 bg-woodsmoke-50 text-woodsmoke-950 duration-300 ease-in-out
              hover:bg-woodsmoke-100
              lg:hidden
              "
          onClick={() => {
            toggleFilter("close");
          }}
          aria-label="Fechar filtro"
        >
          <AiOutlineClose />
        </button>
        <h4 className="text-2xl font-medium">Filtros</h4>
        <Divider />
        <div className="flex flex-col gap-y-2">
          <h5 className="text-lg font-medium text-woodsmoke-900">Status</h5>
          <Radio
            label="Todos"
            value="all"
            htmlFor="allStatus"
            collection="status"
            selected={true}
            action={() => changeFilterStatus("all")}
          />
          <Radio
            label="Tarefas Completas"
            value="completed"
            htmlFor="completedStatus"
            collection="status"
            action={() => changeFilterStatus("completed")}
          />
          <Radio
            label="Tarefas Incompletas"
            value="uncompleted"
            htmlFor="uncompletedStatus"
            collection="status"
            action={() => changeFilterStatus("uncompleted")}
          />
        </div>
        <Divider />
        <div className="flex flex-col gap-y-2">
          <h5 className="text-lg font-medium text-woodsmoke-900">Prioridade</h5>
          <Radio
            label="Nenhum"
            value="all"
            htmlFor="allPriority"
            collection="priority"
            selected={true}
            action={() => changeFilterPriority("all")}
          />
          <Radio
            label="Maior Prioridade"
            value="high"
            htmlFor="highPriority"
            collection="priority"
            action={() => changeFilterPriority("high")}
          />
          <Radio
            label="Menor Prioridade"
            value="low"
            htmlFor="lowPriority"
            collection="priority"
            action={() => changeFilterPriority("low")}
          />
        </div>
        <Divider />
      </section>
    </>
  );
}
