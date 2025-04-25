"use client";

import { useContext, useState } from "react";
import ModalFooter from "../../../ui/Modal/ModalFooter";
import { Input } from "@/ui/Input/";
import { ModalContext } from "@/context/ModalContext";
import { KanbanColumnContext } from "@/context/KanbanColumnContext";

export default function ModalKanbanCreateColumn() {
  const [title, setTitle] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { toggleModal } = useContext(ModalContext);
  const { createColumn } = useContext(KanbanColumnContext);

  const checkTitle = () => {
    if (title.trim() === "") {
      setErrorMessage("O Título da Coluna não pode estar em branco");
      return true;
    } else setErrorMessage("");
  };

  return (
    <>
      <div className="flex flex-col p-2 py-6 gap-y-8">
        <Input
          label="Título da Coluna"
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
          createColumn(title);
        }}
      />
    </>
  );
}
