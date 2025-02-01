"use client";
import { ToDoContext } from "@/context/ToDoContext";
import { useContext } from "react";
import { AiFillFilter } from "react-icons/ai";

export default function ToDoFilterButton() {
  const { toggleFilter, isFilterShow } = useContext(ToDoContext);

  return (
    <>
      {!isFilterShow && (
        <button
          className="to-do-tabs-button left-0 rounded-r-xl"
          onClick={() => {
            toggleFilter("open");
          }}
          aria-label="Abrir filtro"
        >
          <AiFillFilter />
        </button>
      )}
    </>
  );
}
