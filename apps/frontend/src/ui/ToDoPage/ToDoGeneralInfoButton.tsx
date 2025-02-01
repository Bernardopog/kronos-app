"use client";
import { ToDoContext } from "@/context/ToDoContext";
import { useContext } from "react";
import { AiFillInfoCircle } from "react-icons/ai";

export default function ToDoGeneralInfoButton() {
  const { toggleGeneral, isGeneralShow } = useContext(ToDoContext);

  return (
    <>
      {!isGeneralShow && (
        <button
          className="to-do-tabs-button right-0 rounded-l-xl"
          onClick={() => {
            toggleGeneral("open");
          }}
          aria-label="Abrir informações gerais"
        >
          <AiFillInfoCircle />
        </button>
      )}
    </>
  );
}
