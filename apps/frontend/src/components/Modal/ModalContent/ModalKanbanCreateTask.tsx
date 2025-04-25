"use client";

import { useContext, useState } from "react";
import ModalFooter from "../../../ui/Modal/ModalFooter";
import { Input } from "@/ui/Input/";
import { ModalContext } from "@/context/ModalContext";
import TextArea from "@/ui/TextArea";
import { Button } from "@/ui/Button";
import { TaskPriorityType } from "@/mock/kanban/mockKanbanTasks";
import { KanbanTaskContext } from "@/context/KanbanTaskContext";

export default function ModalKanbanCreateTask() {
  const [title, setTitle] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<TaskPriorityType>("low");

  const { toggleModal } = useContext(ModalContext);
  const { createTask } = useContext(KanbanTaskContext);

  const checkTitle = () => {
    if (title.trim() === "") {
      setErrorMessage("O Título da Tarefa não pode estar em branco");
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
        <TextArea
          label="Descrição da Task"
          id="description"
          setValue={setDescription}
          value={description}
        />
        <div className="flex flex-col gap-2">
          <h4 className="font-bold text-woodsmoke-800 dark:text-woodsmoke-300">
            Prioridade:
          </h4>
          <div className="flex gap-2">
            <Button
              action={() => setPriority("low")}
              label="Baixa"
              extraStyles={{
                button: `px-2
                dark:text-woodsmoke-200 
                hover:bg-apple-600 hover:border-transparent 
                dark:hover:shadow-btn dark:hover:shadow-apple-600/25
                ${priority === "low" ? "bg-apple-600 text-woodsmoke-50 border-transparent" : "text-woodsmoke-900"}`,
              }}
            />
            <Button
              action={() => setPriority("medium")}
              label="Média"
              extraStyles={{
                button: `px-2
                dark:text-woodsmoke-200 
                hover:bg-[#b19a25] hover:border-transparent 
                dark:hover:shadow-btn dark:hover:shadow-[#b19a25]/25
                ${priority === "medium" ? "bg-[#b19a25] text-woodsmoke-50 border-transparent" : "text-woodsmoke-900"}`,
              }}
            />
            <Button
              action={() => setPriority("high")}
              label="Alta"
              extraStyles={{
                button: `px-2
                dark:text-woodsmoke-200 
                hover:bg-poppy-600 hover:border-transparent 
                dark:hover:shadow-btn dark:hover:shadow-poppy-600/25
                ${priority === "high" ? "bg-poppy-600 text-woodsmoke-50 border-transparent" : "text-woodsmoke-900"}`,
              }}
            />
          </div>
        </div>
      </div>
      <ModalFooter
        type={"create"}
        action={() => {
          if (checkTitle()) return;
          toggleModal(null);
          createTask({
            taskName: title,
            description,
            priority,
          });
        }}
      />
    </>
  );
}
