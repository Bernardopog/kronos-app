"use client";
import ModalToDoCreate from "@/components/Modal/ModalContent/ModalToDoCreate";
import ModalToDoRead from "@/components/Modal/ModalContent/ModalToDoRead";
import ModalToDoRemove from "@/components/Modal/ModalContent/ModalToDoRemove";
import ModalHeader from "@/components/Modal/ModalHeader";
import { ModalContext } from "@/context/ModalContext";
import { useContext } from "react";

export default function Modal() {
  const { isModalOpen, modalData, toggleModal } = useContext(ModalContext);

  return (
    <>
      {isModalOpen && (
        <div
          className="flex justify-center items-center fixed top-0 z-[100] size-full bg-woodsmoke-950/50 backdrop-blur-sm"
          onClick={() => {
            toggleModal(null);
          }}
        >
          <section
            className="relative min-w-72 w-5/6 max-w-[32rem] h-auto rounded-2xl bg-woodsmoke-50 animate-move-in"
            onClick={(ev) => {
              ev.stopPropagation();
            }}
          >
            <ModalHeader type={modalData!.type} title="Sobre a tarefa" />
            <section className="h-full">
              {modalData?.content === "toDoRead" && <ModalToDoRead />}
              {modalData?.content === "toDoCreate" && <ModalToDoCreate />}
              {modalData?.content === "toDoRemove" && <ModalToDoRemove />}
            </section>
          </section>
        </div>
      )}
    </>
  );
}
