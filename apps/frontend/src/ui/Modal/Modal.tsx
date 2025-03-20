"use client";
import ModalCreateTag from "@/components/Modal/ModalContent/ModalCreateTag";
import ModalDeleteTag from "@/components/Modal/ModalContent/ModalDeleteTag";
import ModalKanbanColumnDelete from "@/components/Modal/ModalContent/ModalKanbanColumnDelete";
import ModalKanbanCreate from "@/components/Modal/ModalContent/ModalKanbanCreate";
import ModalKanbanCreateColumn from "@/components/Modal/ModalContent/ModalKanbanCreateColumn";
import ModalKanbanCreateTask from "@/components/Modal/ModalContent/ModalKanbanCreateTask";
import ModalKanbanDelete from "@/components/Modal/ModalContent/ModalKanbanDelete";
import ModalNoteDelete from "@/components/Modal/ModalContent/ModalNoteDelete";
import ModalReadTag from "@/components/Modal/ModalContent/ModalReadTag";
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
  const { isModalOpen, modalData, toggleModal, modalRef } =
    useContext(ModalContext);

  return (
    <>
      {isModalOpen && (
        <div
          className="flex justify-center items-center fixed top-0 z-[100] size-full bg-woodsmoke-950/50 backdrop-blur-sm"
          onClick={() => {
            toggleModal(null);
          }}
        >
          <div aria-live="assertive" className="opacity-0 absolute -z-50">
            Modal Aberto
          </div>
          <section
            ref={modalRef}
            tabIndex={-1}
            className="
              relative min-w-72 w-5/6 max-w-[32rem] h-auto rounded-2xl bg-woodsmoke-50 animate-move-in
              dark:bg-woodsmoke-950 dark:shadow-xl dark:shadow-woodsmoke-500/25
            "
            onClick={(ev) => {
              ev.stopPropagation();
            }}
            onKeyDown={(ev) => {
              if (ev.key === "Escape") {
                toggleModal(null);
              }
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
              {modalData?.content === "noteReadTags" && <ModalReadTag />}
              {modalData?.content === "noteCreateTag" && <ModalCreateTag />}
              {modalData?.content === "noteDeleteTag" && <ModalDeleteTag />}
              {modalData?.content === "noteDelete" && <ModalNoteDelete />}
              {modalData?.content === "kanbanCreate" && <ModalKanbanCreate />}
              {modalData?.content === "kanbanCreateColumn" && (
                <ModalKanbanCreateColumn />
              )}
              {modalData?.content === "kanbanCreateTask" && (
                <ModalKanbanCreateTask />
              )}
              {modalData?.content === "kanbanDelete" && <ModalKanbanDelete />}
              {modalData?.content === "kanbanColumnDelete" && (
                <ModalKanbanColumnDelete />
              )}
            </section>
          </section>
        </div>
      )}
    </>
  );
}
