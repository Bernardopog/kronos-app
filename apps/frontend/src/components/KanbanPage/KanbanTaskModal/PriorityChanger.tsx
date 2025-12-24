import { Button } from "@/ui/Button";
import { TaskPriorityType } from "@/mock/kanban/mockKanbanTasks";
import { Dispatch, SetStateAction } from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

interface IPriorityChangerProps {
  newTaskPriority: TaskPriorityType;
  setNewTaskPriority: Dispatch<SetStateAction<TaskPriorityType>>;
}

export default function PriorityChanger({
  newTaskPriority,
  setNewTaskPriority,
}: IPriorityChangerProps) {
  let formattedPriority = "";

  switch (newTaskPriority) {
    case "low":
      formattedPriority = "Baixa";
      break;
    case "medium":
      formattedPriority = "Média";
      break;
    case "high":
      formattedPriority = "Alta";
      break;
  }

  type PriorityChangeTypes = "increment" | "decrement";

  function handlePriorityChange(type: PriorityChangeTypes) {
    if (type === "increment") {
      if (newTaskPriority === "low") {
        setNewTaskPriority("medium");
      } else if (newTaskPriority === "medium") {
        setNewTaskPriority("high");
      }
    } else {
      if (newTaskPriority === "medium") {
        setNewTaskPriority("low");
      } else if (newTaskPriority === "high") {
        setNewTaskPriority("medium");
      }
    }
  }

  return (
    <div className="flex items-center gap-x-4">
      <p>Prioridade:</p>
      <div className="flex items-center gap-x-2">
        <Button
          action={() => {
            handlePriorityChange("decrement");
          }}
          ariaLabel="Diminuir Prioridade"
          icon={<AiOutlineArrowDown />}
          extraStyles={{
            button: `hover:bg-priority-lowest hover:text-woodsmoke-950
            dark:hover:shadow-[0_0_5px_3px] dark:hover:shadow-priority-lowest`,
          }}
        />
        <span>{formattedPriority}</span>
        <Button
          action={() => {
            handlePriorityChange("increment");
          }}
          ariaLabel="Aumentar Prioridade"
          icon={<AiOutlineArrowUp />}
          extraStyles={{
            button: `hover:bg-priority-highest hover:text-woodsmoke-950
            dark:hover:shadow-[0_0_5px_3px] dark:hover:shadow-priority-highest`,
          }}
        />
      </div>
    </div>
  );
}
