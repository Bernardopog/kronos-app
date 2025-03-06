"use client";

import { useContext, useState } from "react";
import ModalFooter from "../ModalFooter";
import { KanbanContext } from "@/context/KanbanContext";
import Input from "@/components/Input/Input";
import { ModalContext } from "@/context/ModalContext";
import { useRouter } from "next/navigation";
import Checkbox from "@/components/Checkbox/Checkbox";

export default function ModalKanbanCreate() {
  const [title, setTitle] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { toggleModal } = useContext(ModalContext);
  const { createKanban } = useContext(KanbanContext);
  const [redirectEnabled, setRedirectEnabled] = useState<boolean>(false);

  const checkTitle = () => {
    if (title.trim() === "") {
      setErrorMessage("O Título do Kanban não pode estar em branco");
      return true;
    } else setErrorMessage("");
  };

  const router = useRouter();

  return (
    <>
      <div className="flex flex-col p-2 py-6 gap-y-8">
        <Input
          label="Título do Kanban"
          id="title"
          value={title}
          setValue={setTitle}
          errorMessage={errorMessage}
        />
        <Checkbox
          label="Redirecionar para o Kanban criado"
          htmlFor="redirect"
          action={() => {
            setRedirectEnabled(!redirectEnabled);
          }}
        />
      </div>
      <ModalFooter
        type={"create"}
        action={() => {
          if (checkTitle()) return;
          toggleModal(null);
          const newKanban = createKanban(title);
          if (redirectEnabled) router.push(`/kanbanlist/${newKanban.id}`);
        }}
      />
    </>
  );
}
