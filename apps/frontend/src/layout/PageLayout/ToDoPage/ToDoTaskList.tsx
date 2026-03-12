"use client";
import { Button } from "@/ui/Button";
import ToDoTask from "@/components/ToDoPage/ToDoTask/ToDoTask";
import { ModalContext } from "@/context/ModalContext";
import { useContext, useEffect } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { useToDoStore } from "@/store/ToDoStore";
import { useShallow } from "zustand/shallow";
import { useToDoFilterStore } from "@/store/ToDoFilterStore";

export default function ToDoTaskList() {
  const { toggleModal } = useContext(ModalContext);

  const { toDoData, getToDos } = useToDoStore(
    useShallow((s) => ({
      toDoData: s.toDoData,
      getToDos: s.getToDos,
    })),
  );

  const filter = useToDoFilterStore((s) => s.filter);

  const { fetched, list: tasks } = toDoData;
  const { category, status, priority } = filter;

  useEffect(() => {
    if (fetched) return;
    getToDos();
  }, [fetched, getToDos]);

  return (
    <ul
      className="flex flex-col items-center max-h-[calc(100%-7rem)] w-full px-1 pb-4 gap-4 overflow-y-auto scrollbar-base lg:max-h-[calc(100%-7rem)]"
      id="td-task-list"
    >
      {tasks.length > 0 ? (
        tasks
          .filter((task) => {
            if (category === "all") return true;
            else return task.categoryId === category;
          })
          .filter((task) => {
            if (status === "all") return true;
            else if (status === "completed") return task.isCompleted;
            else return !task.isCompleted;
          })
          .sort((a, b) => {
            if (priority === "all") return 0;
            else if (priority === "high") {
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
            } else if (priority === "low") {
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
                dark:hover:shadow-[0_0_5px_3px] dark:hover:shadow-apple-500/25
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
