import { useContext } from "react";
import ModalFooter from "../../../ui/Modal/ModalFooter";
import { ModalContext } from "@/context/ModalContext";
import { KanbanColumnContext } from "@/context/KanbanColumnContext";

export default function ModalKanbanColumnDelete() {
  const { columnList, deleteColumn } = useContext(KanbanColumnContext);
  const { toggleModal, fromId } = useContext(ModalContext);

  const columnName = columnList.find(
    (column) => column.id === fromId
  )!.columnName;

  return (
    <>
      <div
        className="flex flex-col py-4 px-2 gap-4 text-woodsmoke-950 dark:text-woodsmoke-100"
        aria-live="polite"
      >
        <p className="text-center">
          Você tem certeza que deseja excluir a Coluna: <br />
          <span className="font-bold text-2xl">{columnName}</span>
        </p>
        <p className="text-center">
          Cuidado, essa ação é
          <span className="inline-block px-2 rounded-full font-bold text-poppy-600 bg-woodsmoke-100 dark:bg-woodsmoke-950">
            irreversível !
          </span>
          Todas tarefas atribuidas a essa coluna também serão deletadas.
        </p>
      </div>
      <ModalFooter
        type={"delete"}
        action={() => {
          toggleModal(null);
          deleteColumn(fromId);
        }}
      />
    </>
  );
}
