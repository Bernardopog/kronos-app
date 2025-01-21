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
          className="
            flex justify-center items-center fixed right-0 top-2/4 w-8 h-16 border rounded-l-xl text-xl border-woodsmoke-300 bg-woodsmoke-200 text-woodsmoke-900 translate-y-[-50%] duration-300 ease-in-out
            hover:border-woodsmoke-400 hover:bg-woodsmoke-300 hover:text-woodsmoke-950
            lg:hidden
          "
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
