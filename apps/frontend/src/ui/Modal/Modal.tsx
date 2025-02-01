"use client";
import ModalToDoCreate from "@/components/Modal/ModalContent/ModalToDoCreate";
import ModalToDoCreateCategory from "@/components/Modal/ModalContent/ModalToDoCreateCategory";
import ModalToDoRead from "@/components/Modal/ModalContent/ModalToDoRead";
import ModalToDoRemove from "@/components/Modal/ModalContent/ModalToDoRemove";
import ModalToDoRemoveCategory from "@/components/Modal/ModalContent/ModalToDoRemoveCategory";
import ModalToDoRemoveSingle from "@/components/Modal/ModalContent/ModalToDoRemoveSingle";
import ModalToDoUpdate from "@/components/Modal/ModalContent/ModalToDoUpdate";
import ModalToDoUpdateCategory from "@/components/Modal/ModalContent/ModalToDoUpdateCategory";
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
            className="
              relative min-w-72 w-5/6 max-w-[32rem] h-auto rounded-2xl bg-woodsmoke-50 animate-move-in
              dark:bg-woodsmoke-950 dark:shadow-xl dark:shadow-woodsmoke-500/25
            "
            onClick={(ev) => {
              ev.stopPropagation();
            }}
          >
            <ModalHeader
              type={modalData!.type}
              title={modalData!.headerTitle}
            />
            <section className="h-full">
              {modalData?.content === "toDoRead" && <ModalToDoRead />}
              {modalData?.content === "toDoCreate" && <ModalToDoCreate />}
              {modalData?.content === "toDoRemove" && <ModalToDoRemove />}
              {modalData?.content === "toDoRemoveSingle" && (
                <ModalToDoRemoveSingle />
              )}
              {modalData?.content === "toDoUpdate" && <ModalToDoUpdate />}
              {modalData?.content === "toDoCreateCategory" && (
                <ModalToDoCreateCategory />
              )}
              {modalData?.content === "toDoRemoveCategory" && (
                <ModalToDoRemoveCategory />
              )}
              {modalData?.content === "toDoUpdateCategory" && (
                <ModalToDoUpdateCategory />
              )}
            </section>
          </section>
        </div>
      )}
    </>
  );
}
