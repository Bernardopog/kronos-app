"use client";
import { TabButton } from "@/ui/Button";
import { ToDoContext } from "@/context/ToDoContext";
import { useContext } from "react";
import { AiFillFilter } from "react-icons/ai";

export default function ToDoFilterButton() {
  const { toggleFilter, isFilterShow } = useContext(ToDoContext);

  return (
    <>
      {!isFilterShow && (
        <TabButton
          action={() => {
            toggleFilter("open");
          }}
          ariaLabel="Abrir filtro"
          icon={<AiFillFilter />}
          position="left"
        />
      )}
    </>
  );
}
