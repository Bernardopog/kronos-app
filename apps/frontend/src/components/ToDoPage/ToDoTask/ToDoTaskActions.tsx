import { ModalContext } from "@/context/ModalContext";
import { ToDoContext } from "@/context/ToDoContext";
import { IToDoTask } from "@/mock/mockToDoList";
import { useContext } from "react";
import { AiFillCheckCircle, AiFillInfoCircle } from "react-icons/ai";

export default function ToDoTaskActions({ taskData }: { taskData: IToDoTask }) {
  const { toggleTaskCompletion, selectTask } = useContext(ToDoContext);
  const { toggleModal } = useContext(ModalContext);

  return (
    <div className="flex justify-end items-center w-2/6 gap-x-2">
      <button
        onClick={() => {
          toggleModal("read");
          selectTask(taskData);
        }}
      >
        <div className="to-do-btn">
          <AiFillInfoCircle />
        </div>
      </button>
      <button onClick={() => toggleTaskCompletion(taskData)}>
        <div className="to-do-btn">
          {taskData.isCompleted && <AiFillCheckCircle />}
        </div>
      </button>
    </div>
  );
}
