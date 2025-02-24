"use client";
import TabButton from "@/components/Button/TabButton";
import { ToDoContext } from "@/context/ToDoContext";
import { useContext } from "react";
import { AiFillInfoCircle } from "react-icons/ai";

export default function ToDoGeneralInfoButton() {
  const { toggleGeneral, isGeneralShow } = useContext(ToDoContext);

  return (
    <>
      {!isGeneralShow && (
        <TabButton
          action={() => {
            toggleGeneral("open");
          }}
          ariaLabel="Abrir informações gerais"
          icon={<AiFillInfoCircle />}
          position="right"
        />
      )}
    </>
  );
}
