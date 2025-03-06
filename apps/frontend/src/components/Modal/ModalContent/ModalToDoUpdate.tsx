"use client";

import SelectRow from "@/components/Select/SelectRow";
import { ToDoContext } from "@/context/ToDoContext";
import { PriorityType } from "@/mock/mockToDoList";
import { useContext, useState } from "react";
import ModalFooter from "../ModalFooter";
import { ModalContext } from "@/context/ModalContext";
import Input from "@/components/Input/Input";
import TextArea from "@/components/TextArea/TextArea";
import SelectCategory from "@/components/Select/SelectCategory";

export default function ModalToDoUpdate() {
  const { toggleModal } = useContext(ModalContext);
  const { selectedTask, updateTask } = useContext(ToDoContext);

  const [newTitle, setNewTitle] = useState<string>(selectedTask?.title ?? "");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [newDescription, setNewDescription] = useState<string>(
    selectedTask?.description ?? ""
  );

  const [newPriority, setNewPriority] = useState<PriorityType>(
    selectedTask?.priority ?? "0"
  );
  const [newCategory, setNewCategory] = useState<string>(
    selectedTask?.category ?? ""
  );

  const checkTitle = () => {
    if (newTitle.trim() === "") {
      setErrorMessage("O título não pode estar em branco");
      return true;
    } else setErrorMessage("");
  };

  return (
    <>
      <div className="flex flex-col p-2 py-6 gap-y-8 text-woodsmoke-950">
        <Input
          label="Título:"
          id="title"
          name="title"
          value={newTitle}
          setValue={setNewTitle}
          errorMessage={errorMessage}
        />
        <TextArea
          label="Descrição:"
          id="description"
          value={newDescription}
          setValue={setNewDescription}
        />
        <SelectRow value={newPriority} setValue={setNewPriority} />
        <SelectCategory value={newCategory} setValue={setNewCategory} />
      </div>
      <ModalFooter
        type={"update"}
        action={() => {
          if (checkTitle()) return;
          updateTask({
            ...selectedTask!,
            title: newTitle,
            description: newDescription,
            priority: newPriority,
            category: newCategory,
          });
          toggleModal(null);
        }}
      />
    </>
  );
}
