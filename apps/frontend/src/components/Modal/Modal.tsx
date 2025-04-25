"use client";
import {
  ModalCreateTag,
  ModalDeleteTag,
  ModalKanbanColumnDelete,
  ModalKanbanCreate,
  ModalKanbanCreateColumn,
  ModalKanbanCreateTask,
  ModalKanbanDelete,
  ModalNoteDelete,
  ModalReadTag,
  ModalToDoCreate,
  ModalToDoCreateCategory,
  ModalToDoRead,
  ModalToDoRemove,
  ModalToDoRemoveCategory,
  ModalToDoRemoveSingle,
  ModalToDoUpdate,
  ModalToDoUpdateCategory,
} from "@/components/Modal/ModalContent";
import ModalHeader from "@/ui/Modal/ModalHeader";
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
