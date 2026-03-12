"use client";
import { Button } from "@/ui/Button";
import { TabCloseButton } from "@/ui/Button";
import Tab from "@/ui/Tab";
import Inert from "@/ui/Inert";
import Radio from "@/ui/Radio";
import { DeviceScreenContext } from "@/context/DeviceScreenContext";
import { useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useToDoFilterStore } from "@/store/ToDoFilterStore";
import { useShallow } from "zustand/shallow";
import { useToDoCategoryStore } from "@/store/ToDoCategoryStore";

export default function ToDoTaskFilter() {
  const {
    filterShowControl,
    isFilterShowing,
    toggleFilter,
    filterController,
    filterCategory,
  } = useToDoFilterStore(
    useShallow((s) => ({
      filterShowControl: s.filterShowControl,
      isFilterShowing: s.isFilterShowing,
      toggleFilter: s.toggleFilter,
      filterController: s.filterController,
      filterCategory: s.filter.category,
    })),
  );

  const categoryData = useToDoCategoryStore((s) => s.categoryData);

  const { device } = useContext(DeviceScreenContext);

  const { list: categories } = categoryData;

  return (
    <Inert value={isFilterShowing || device === "desktop"}>
      <section
        className={`
            flex flex-col fixed top-0 size-full p-4 gap-y-2 bg-woodsmoke-100 text-woodsmoke-950 duration-300 ease-in-out
            dark:bg-woodsmoke-950 dark:text-woodsmoke-200
            lg:static lg:translate-y-4 lg:rounded-t-lg
            ${filterShowControl ? "left-0" : "-left-full"}
          `}
        id="td-filter"
        aria-label="Filtros"
      >
        <TabCloseButton
          action={() => toggleFilter("close")}
          ariaLabel="Fechar filtro"
          icon={<AiOutlineClose />}
        />
        <h4 className="text-2xl font-medium">Filtros</h4>
        <Tab title="Status">
          <Radio
            label="Todos"
            value="all"
            htmlFor="allStatus"
            collection="status"
            selected={true}
            action={() => filterController("status", "all")}
          />
          <Radio
            label="Tarefas Completas"
            value="completed"
            htmlFor="completedStatus"
            collection="status"
            action={() => filterController("status", "completed")}
          />
          <Radio
            label="Tarefas Incompletas"
            value="uncompleted"
            htmlFor="uncompletedStatus"
            collection="status"
            action={() => filterController("status", "uncompleted")}
          />
        </Tab>
        <Tab title="Prioridade">
          <Radio
            label="Nenhum"
            value="all"
            htmlFor="allPriority"
            collection="priority"
            selected={true}
            action={() => filterController("priority", "all")}
          />
          <Radio
            label="Maior Prioridade"
            value="high"
            htmlFor="highPriority"
            collection="priority"
            action={() => filterController("priority", "high")}
          />
          <Radio
            label="Menor Prioridade"
            value="low"
            htmlFor="lowPriority"
            collection="priority"
            action={() => filterController("priority", "low")}
          />
        </Tab>
        <Tab title="Categorias">
          <ul
            role="menu"
            aria-labelledby="categoryLabel"
            className="grid grid-cols-3 mt-1 gap-2 animate-move-in opacity-0"
          >
            <li>
              <Button
                label="Todas"
                action={() => filterController("category", "all")}
                extraStyles={{
                  button: `size-full text-woodsmoke-900
                    dark:text-woodsmoke-300
                    hover:text-woodsmoke-950 hover:border-woodsmoke-400 
                    dark:hover:border-woodsmoke-700 dark:hover:text-woodsmoke-100
                    ${filterCategory === "all" && "bg-woodsmoke-200 border-woodsmoke-300 dark:border-woodsmoke-200 dark:bg-woodsmoke-900"}`,
                }}
              />
            </li>
            {categories.map((category) => {
              return (
                <li key={category.id}>
                  <Button
                    label={category.title}
                    action={() => filterController("category", category.id)}
                    extraStyles={{
                      button: `size-full text-woodsmoke-900
                        dark:text-woodsmoke-300
                        hover:text-woodsmoke-950 hover:border-woodsmoke-400 
                        dark:hover:border-woodsmoke-700 dark:hover:text-woodsmoke-100
                        ${filterCategory === category.id && "bg-woodsmoke-200 border-woodsmoke-300 dark:border-woodsmoke-200 dark:bg-woodsmoke-900"}`,
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </Tab>
      </section>
    </Inert>
  );
}
