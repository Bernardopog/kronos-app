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
        flex flex-col items-center max-h-[calc(100%-7rem)] w-full px-1 pb-4 gap-4 overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-woodsmoke-600
        lg:max-h-[calc(100%-7rem)]
      "
      id="td-task-list"
    >
      {toDoTaskList.length > 0 ? (
        toDoTaskList
          .filter((task) => {
            if (filterCategory === "all") return true;
            else return task.category === filterCategory;
          })
          .filter((task) => {
            if (filterStatus === "all") return true;
            else if (filterStatus === "completed") return task.isCompleted;
            else return !task.isCompleted;
          })
          .sort((a, b) => {
            if (filterPriority === "all") return 0;
            else if (filterPriority === "high") {
              if (+a.priority > +b.priority) return -1;
              else if (+a.priority < +b.priority) return 1;
              else return 0;
            } else if (filterPriority === "low") {
              if (+a.priority > +b.priority) return 1;
              else if (+a.priority < +b.priority) return -1;
              else return 0;
            } else return 0;
          })
          .map((task, idx) => (
            <ToDoTask
              key={task.id}
              taskData={task}
              animationDelay={50 * (idx + 1)}
            />
          ))
      ) : (
        <div className="flex flex-col items-center text-woodsmoke-950">
          <p className="italic opacity-75">Ainda não há tarefas...</p>
          <Button
            label="Criar Tarefa"
            extraStyles={{
              button:
                "w-auto px-2 gap-x-2 bg-apple-600 text-woodsmoke-50 duration-300 ease-in-out hover:bg-apple-700",
            }}
            action={() => {
              toggleModal({
                content: "toDoCreate",
                type: "create",
                headerTitle: "Criar Tarefa",
              });
            }}
          >
            <AiFillPlusCircle />
          </Button>
        </div>
      )}
    </ul>
  );
}
