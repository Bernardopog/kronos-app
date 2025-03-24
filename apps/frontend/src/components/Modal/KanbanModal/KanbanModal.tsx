"use client";

import Button from "@/components/Button/Button";
import Divider from "@/components/Divider/Divider";
import ColumnChanger from "@/components/KanbanPage/KanbanTaskModal/ColumnChanger";
import DateChanger from "@/components/KanbanPage/KanbanTaskModal/DateChanger";
import DescriptionChanger from "@/components/KanbanPage/KanbanTaskModal/DescriptionChanger";
import PriorityChanger from "@/components/KanbanPage/KanbanTaskModal/PriorityChanger";
import TaskNameChanger from "@/components/KanbanPage/KanbanTaskModal/TaskNameChanger";
import { KanbanContext } from "@/context/KanbanContext";
import { IColumn } from "@/mock/kanban/mockKanbanColumns";
import { IKanbanTask, TaskPriorityType } from "@/mock/kanban/mockKanbanTasks";
import { FormEvent, useContext, useEffect, useState } from "react";
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineDelete,
  AiOutlineSave,
} from "react-icons/ai";

export default function KanbanModal() {
  const {
    selectedKanbanTask,
    toggleTaskModal,
    columnList,
    updateColumnDragAndDrop,
    updateTask,
    deleteTask,
  } = useContext(KanbanContext);

  const [newTaskName, setNewTaskName] = useState<string>("");
  const [newTaskDescription, setNewTaskDescription] = useState<string>("");
  const [newTaskPriority, setNewTaskPriority] =
    useState<TaskPriorityType>("low");
  const [newColumn, setNewColumn] = useState<IColumn | null>(null);
  const [newCompletionDate, setNewCompletionDate] = useState<Date | null>(
    selectedKanbanTask?.completionDate ?? null
  );

  const [isColumnOptionsOpen, setIsColumnOptionsOpen] =
    useState<boolean>(false);
  const [isEditingDescription, setIsEditingDescription] =
    useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  useEffect(() => {
    setNewTaskName(selectedKanbanTask?.taskName ?? "");
    setNewTaskDescription(selectedKanbanTask?.description ?? "");
    setNewTaskPriority(selectedKanbanTask?.priority ?? "low");
    setIsColumnOptionsOpen(false);
    setIsEditingDescription(false);
    setNewColumn(null);
  }, [selectedKanbanTask]);

  const column = columnList.find((column) =>
    column.tasksId.includes(selectedKanbanTask?.id ?? "")
  );

  function resetFields() {
    setNewTaskName(selectedKanbanTask!.taskName);
    setNewTaskDescription(selectedKanbanTask?.description ?? "");
    setNewTaskPriority(selectedKanbanTask!.priority);
    setIsColumnOptionsOpen(false);
    setIsEditingDescription(false);
    setNewColumn(null);
  }

  function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    const newTask: IKanbanTask = {
      ...selectedKanbanTask!,
      taskName: newTaskName,
      description: newTaskDescription,
      priority: newTaskPriority,
      completionDate: newCompletionDate ?? undefined,
    };
    updateTask(selectedKanbanTask!.id, newTask);
    if (column!.id !== newColumn?.id && newColumn) {
      updateColumnDragAndDrop(newColumn.id, newTask.id, column!.id);
    }
  }

  return (
    <form
      className="max-h-[100dvh] overflow-y-auto scrollbar-thin scrollbar-thumb-woodsmoke-400 scrollbar-track-transparent lg:pr-8"
      onSubmit={handleSubmit}
    >
      <Button
        action={() => {
          toggleTaskModal();
          resetFields();
        }}
        icon={<AiOutlineClose />}
        ariaLabel="Fechar"
        extraStyles={{
          button: "absolute right-4 top-4 text-woodsmoke-100 bg-woodsmoke-950",
        }}
      />
      {selectedKanbanTask && column && (
        <section className="flex flex-col gap-2">
          <TaskNameChanger
            newTaskName={newTaskName}
            setNewTaskName={setNewTaskName}
          />
          <Divider />
          <ColumnChanger
            isColumnOptionsOpen={isColumnOptionsOpen}
            setIsColumnOptionsOpen={setIsColumnOptionsOpen}
            column={column}
            newColumn={newColumn}
            setNewColumn={setNewColumn}
          />
          <Divider />
          <PriorityChanger
            newTaskPriority={newTaskPriority}
            setNewTaskPriority={setNewTaskPriority}
          />
          <Divider />
          <DateChanger
            newCompletionDate={newCompletionDate}
            setNewCompletionDate={setNewCompletionDate}
          />
          <Divider />
          <h3>Descrição:</h3>
          <DescriptionChanger
            isEditingDescription={isEditingDescription}
            newTaskDescription={newTaskDescription}
            setIsEditingDescription={setIsEditingDescription}
            setNewTaskDescription={setNewTaskDescription}
          />
        </section>
      )}
      <footer className="flex justify-end relative right-0 bottom-8 h-12 w-full mb-2 py-1 gap-x-4">
        {confirmDelete ? (
          <div className="flex mr-auto gap-x-2">
            <Button
              action={() => setConfirmDelete(false)}
              ariaLabel="Cancelar Deleção"
              extraStyles={{
                button: `mr-auto px-2 bg-woodsmoke-950 text-woodsmoke-100
            hover:bg-crud-create-light
            dark:hover:shadow-btn dark:hover:shadow-crud-create-light/25`,
              }}
              icon={<AiOutlineClose />}
            />
            <Button
              action={() => {
                deleteTask(selectedKanbanTask!.id);
                setConfirmDelete(false);
                toggleTaskModal();
                resetFields();
              }}
              ariaLabel="Confirmar Deleção"
              extraStyles={{
                button: `mr-auto px-2 bg-woodsmoke-950 text-woodsmoke-100
          hover:bg-crud-delete-light
          dark:hover:shadow-btn dark:hover:shadow-crud-delete-light/25`,
              }}
              icon={<AiOutlineCheck />}
            />
          </div>
        ) : (
          <Button
            action={() => setConfirmDelete(true)}
            label="Deletar"
            extraStyles={{
              button: `mr-auto px-2 bg-woodsmoke-950 text-woodsmoke-100
            hover:bg-crud-delete-light
            dark:hover:shadow-btn dark:hover:shadow-crud-delete-light/25`,
            }}
            icon={<AiOutlineDelete />}
          />
        )}

        <Button
          action={() => {
            toggleTaskModal();
            resetFields();
          }}
          label="Cancelar"
          extraStyles={{
            button: `px-2 bg-woodsmoke-950 text-woodsmoke-100
            hover:bg-crud-delete-light
            dark:hover:shadow-btn dark:hover:shadow-crud-delete-light/25`,
          }}
          icon={<AiOutlineClose />}
        />
        <Button
          action={() => toggleTaskModal()}
          label="Salvar"
          extraStyles={{
            button: `px-2 bg-woodsmoke-950 text-woodsmoke-100
            hover:bg-crud-create-light
            dark:hover:shadow-btn dark:hover:shadow-crud-create-light/25`,
          }}
          icon={<AiOutlineSave />}
          type="submit"
        />
      </footer>
    </form>
  );
}
