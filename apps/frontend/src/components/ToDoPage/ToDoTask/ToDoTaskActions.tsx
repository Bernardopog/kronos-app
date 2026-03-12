import { ModalContext } from "@/context/ModalContext";
import { IToDoTask } from "@/mock/mockToDoList";
import { useToDoStore } from "@/store/ToDoStore";
import _ from "lodash";
import { useContext } from "react";
import { AiFillCheckCircle, AiFillInfoCircle } from "react-icons/ai";
import { useShallow } from "zustand/shallow";

export default function ToDoTaskActions({
  taskData,
  readonly,
}: {
  taskData: IToDoTask;
  readonly: boolean;
}) {
  const { toggleTaskCompletion, selectTask } = useToDoStore(
    useShallow((s) => ({
      toggleTaskCompletion: s.toggleTaskCompletion,
      selectTask: s.selectTask,
    })),
  );
  const { toggleModal } = useContext(ModalContext);

  return (
    <div className="flex justify-end items-center w-2/6 gap-x-2">
      <button
        onClick={() => {
          toggleModal({
            content: "toDoRead",
            type: "read",
            headerTitle: "Sobre a tarefa",
          });
          selectTask(taskData);
        }}
      >
        <div className="to-do-btn">
          <AiFillInfoCircle />
        </div>
      </button>
      {!readonly && (
        <button onClick={() => toggleTaskCompletion(taskData.id)}>
          <div className="to-do-btn">
            {taskData.isCompleted && <AiFillCheckCircle />}
          </div>
        </button>
      )}
    </div>
  );
}
