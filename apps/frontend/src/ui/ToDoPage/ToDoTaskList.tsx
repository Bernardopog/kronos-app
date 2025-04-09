"use client";
import Button from "@/components/Button/Button";
import ToDoTask from "@/components/ToDoPage/ToDoTask/ToDoTask";
import { ModalContext } from "@/context/ModalContext";
import { ToDoContext } from "@/context/ToDoContext";
import React, { useContext } from "react";
import { AiFillPlusCircle } from "react-icons/ai";

export default function ToDoTaskList() {
  const { toDoTaskList, filterStatus, filterPriority, filterCategory } =
    useContext(ToDoContext);
  const { toggleModal } = useContext(ModalContext);

  return (
    <ul
      className="
        flex flex-col items-center max-h-[calc(100%-7rem)] w-full px-1 pb-4 gap-4 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-woodsmoke-600
        lg:max-h-[calc(100%-7rem)]
      "
      id="td-task-list"
    >
      {toDoTaskList.length > 0 ? (
        toDoTaskList
          .filter((task) => {
            if (filterCategory === "all") return true;
            else return task.categoryId === filterCategory;
          })
          .filter((task) => {
            if (filterStatus === "all") return true;
            else if (filterStatus === "completed") return task.isCompleted;
            else return !task.isCompleted;
          })
          .sort((a, b) => {
            if (filterPriority === "all") return 0;
            else if (filterPriority === "high") {
              if (
                +a.priority.replace("level_", "") >
                +b.priority.replace("level_", "")
              )
                return -1;
              else if (
                +a.priority.replace("level_", "") <
                +b.priority.replace("level_", "")
              )
                return 1;
              else return 0;
            } else if (filterPriority === "low") {
              if (
                +a.priority.replace("level_", "") >
                +b.priority.replace("level_", "")
              )
                return 1;
              else if (
                +a.priority.replace("level_", "") <
                +b.priority.replace("level_", "")
              )
                return -1;
              else return 0;
            } else return 0;
          })
          .map((task, idx) => (
            <ToDoTask
              key={task.id}
              taskData={task}
              piority={task.priority.replace("level_", "")}
              animationDelay={50 * (idx + 1)}
            />
          ))
      ) : (
        <div className="flex flex-col items-center text-woodsmoke-950 dark:text-woodsmoke-200">
          <p className="italic opacity-75">Ainda não há tarefas...</p>
          <Button
            label="Criar Tarefa"
            extraStyles={{
              button: `px-2 text-woodsmoke-900 dark:text-woodsmoke-200
                hover:bg-apple-600 
                hover:border-transparent 
                dark:hover:shadow-btn dark:hover:shadow-apple-500/25
                `,
              label: "hidden sm:inline",
            }}
            action={() => {
              toggleModal({
                content: "toDoCreate",
                type: "create",
                headerTitle: "Criar Tarefa",
              });
            }}
            icon={<AiFillPlusCircle />}
          />
        </div>
      )}
    </ul>
  );
}
