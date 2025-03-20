import Button from "@/components/Button/Button";
import { Dispatch, SetStateAction, useRef } from "react";
import { AiOutlineEdit } from "react-icons/ai";

interface ITaskDescriptionProps {
  newTaskDescription: string;
  setNewTaskDescription: Dispatch<SetStateAction<string>>;
  isEditingDescription: boolean;
  setIsEditingDescription: Dispatch<SetStateAction<boolean>>;
}

export default function DescriptionChanger({
  newTaskDescription,
  setNewTaskDescription,
  isEditingDescription,
  setIsEditingDescription,
}: ITaskDescriptionProps) {
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  return (
    <div
      className={`
        group relative h-96 border mb-12 p-2 rounded-lg  border-woodsmoke-400
        dark:border-woodsmoke-800
        ${isEditingDescription ? "bg-woodsmoke-100/50 dark:bg-woodsmoke-950/50" : "bg-woodsmoke-100 dark:bg-woodsmoke-950"}
    `}
    >
      <Button
        extraStyles={{
          button: `absolute top-1 right-1 opacity-0 bg-woodsmoke-100
            hover:bg-crud-update-light
            dark:bg-woodsmoke-950
            dark:hover:shadow-btn dark:hover:shadow-crud-update-light/25
            group-hover:opacity-100
          `,
        }}
        ariaLabel="Editar Descrição"
        icon={<AiOutlineEdit />}
        action={() => {
          setTimeout(() => {
            setIsEditingDescription(!isEditingDescription);
            descriptionRef.current?.focus();
          }, 50);
        }}
      />
      {isEditingDescription ? (
        <textarea
          onChange={(e) => setNewTaskDescription(e.target.value)}
          value={newTaskDescription}
          ref={descriptionRef}
          className="size-full rounded-lg scrollbar-thin scrollbar-track-transparent resize-none bg-transparent scrollbar-thumb-woodsmoke-900 ease-in-out duration-300
          focus:outline focus:outline-woodsmoke-600
          dark:scrollbar-thumb-woodsmoke-100"
        />
      ) : (
        <p className="whitespace-pre-wrap">{newTaskDescription}</p>
      )}
    </div>
  );
}
