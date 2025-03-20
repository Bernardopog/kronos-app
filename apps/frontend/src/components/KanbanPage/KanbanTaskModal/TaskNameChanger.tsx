import { Dispatch, SetStateAction, useRef, useState } from "react";

interface ITaskNameChangerProps {
  newTaskName: string;
  setNewTaskName: Dispatch<SetStateAction<string>>;
}

export default function TaskNameChanger({
  newTaskName,
  setNewTaskName,
}: ITaskNameChangerProps) {
  const [isEditingTaskName, setIsEditingTaskName] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  function stopEditingTaskName() {
    setIsEditingTaskName(false);
  }

  return (
    <>
      {isEditingTaskName ? (
        <input
          type="text"
          value={newTaskName}
          onChange={(ev) => setNewTaskName(ev.target.value)}
          className="w-full p-2 rounded-md border border-woodsmoke-400 bg-woodsmoke-100 dark:border-woodsmoke-800 dark:bg-woodsmoke-950 outline-none"
          onKeyDown={(ev) => ev.key === "Enter" && stopEditingTaskName()}
          onBlur={() => stopEditingTaskName()}
          ref={inputRef}
        />
      ) : (
        <h2
          onClick={() => {
            setIsEditingTaskName(true);
            setTimeout(() => {
              inputRef.current?.focus();
            }, 50);
          }}
        >
          Título: <span className="text-xl font-bold">{newTaskName}</span>
        </h2>
      )}
    </>
  );
}
