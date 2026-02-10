"use client";
import { useContext } from "react";
import ModalFooter from "../../../ui/Modal/ModalFooter";
import { ModalContext } from "@/context/ModalContext";
import { KanbanContext } from "@/context/KanbanContext";
import { AuthContext } from "@/context/AuthContext";

export default function ModalKanbanLeave() {
  const { toggleModal } = useContext(ModalContext);
  const { selectedKanban, removeUserFromKanban } = useContext(KanbanContext);
  const { user } = useContext(AuthContext);

  return (
    <>
      <div
        className="flex flex-col py-4 px-2 gap-4 text-woodsmoke-950 dark:text-woodsmoke-100"
        aria-live="polite"
      >
        <p className="text-center">
          Você tem certeza que deseja sair do Kanban: <br />
          <span className="font-bold text-2xl">{selectedKanban?.title}</span>
        </p>
        <p className="text-center">
          Após isso ser feito você não poderá mais voltar ao Kanban, a não ser
          que o Dono ou Administrador lhe adicione novamente.
        </p>
      </div>
      <ModalFooter
        type={"custom"}
        customMessage="Sair"
        action={() => {
          if (!user) return;
          removeUserFromKanban(user.id as string);
          toggleModal(null);
        }}
      />
    </>
  );
}
