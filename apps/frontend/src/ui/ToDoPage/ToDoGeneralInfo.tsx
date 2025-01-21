"use client";

import { ToDoContext } from "@/context/ToDoContext";
import { useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function ToDoGeneralInfo() {
  const { isGeneralShow, generalShowControl, toggleGeneral } =
    useContext(ToDoContext);

  return (
    <>
      <section
        className={`
          flex flex-col fixed top-0 size-full p-4 gap-y-2 bg-woodsmoke-100 text-woodsmoke-950 duration-500 ease-in-out
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
      </section>
    </>
  );
}
