"use client";

import Input from "@/components/Input/Input";
import SelectRow from "@/components/Select/SelectRow";
import TextArea from "@/components/TextArea/TextArea";
import { useContext, useState } from "react";
import ModalFooter from "../ModalFooter";
import { ModalContext } from "@/context/ModalContext";
import { ToDoContext } from "@/context/ToDoContext";
import { PriorityType } from "@/mock/mockToDoList";

export default function ModalToDoCreate() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<PriorityType>("0");

  const { toggleModal } = useContext(ModalContext);
  const { createTask } = useContext(ToDoContext);

  return (
    <>
      <div className="flex flex-col p-2 py-6 gap-y-8">
        <Input
          label="Título da Tarefa"
          id="title"
          value={title}
          setValue={setTitle}
        />
        <TextArea
          label="Descricão da Tarefa"
          id="description"
          value={description}
          setValue={setDescription}
        />
        <SelectRow value={priority} setValue={setPriority} />
      </div>
      <ModalFooter
        type={"create"}
        action={() => {
          toggleModal(null);
          createTask({ title, description, priority });
        }}
      />
    </>
  );
}
