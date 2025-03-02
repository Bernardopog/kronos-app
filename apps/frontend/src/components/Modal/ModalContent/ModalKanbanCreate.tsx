"use client";

import { useContext, useState } from "react";
import ModalFooter from "../ModalFooter";
import { KanbanContext } from "@/context/KanbanContext";
import Input from "@/components/Input/Input";
import { ModalContext } from "@/context/ModalContext";

export default function ModalKanbanCreate() {
  const [title, setTitle] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { toggleModal } = useContext(ModalContext);
  const { createKanban } = useContext(KanbanContext);

  const checkTitle = () => {
    if (title.trim() === "") {
      setErrorMessage("O Título nao pode estar em branco");
      return true;
    } else setErrorMessage("");
  };

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
      </div>
      <ModalFooter
        type={"create"}
        action={() => {
          if (checkTitle()) return;
          toggleModal(null);
          createKanban(title);
        }}
      />
    </>
  );
}
