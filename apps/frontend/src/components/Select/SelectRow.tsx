"use client";

import { useState } from "react";
import { AiFillQuestionCircle } from "react-icons/ai";
import PriorityButton from "../Button/PriorityButton";

export default function SelectRow() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null);

  let color: string;

  switch (selectedPriority) {
    case "0":
      color = "bg-priority-none";
      break;
    case "1":
      color = "bg-priority-lowest";
      break;
    case "2":
      color = "bg-priority-lower";
      break;
    case "3":
      color = "bg-priority-medium";
      break;
    case "4":
      color = "bg-priority-higher";
      break;
    case "5":
      color = "bg-priority-highest";
      break;
    default:
      color = "bg-woodsmoke-100";
  }

  return (
    <div
      className="
      flex flex-col items-center gap-x-1
      sm:flex-row sm:gap-x-2
    "
    >
      <label className="text-woodsmoke-950 hover:font-bold" htmlFor="priority">
        Prioridade da Tarefa:
      </label>
      <div role="menu" className="flex gap-x-1 sm:gap-x-2">
        <button
          id="priority"
          role="menuitem"
          type="button"
          className={`
            flex items-center justify-center size-8 rounded-lg text-woodsmoke-950
            ${color}
            ${selectedPriority ? "font-bold" : "text-2xl"}
          `}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {selectedPriority ? selectedPriority : <AiFillQuestionCircle />}
        </button>
        {isMenuOpen && (
          <>
            <PriorityButton
              label="0"
              animationDelay={0.15}
              bgColor="bg-priority-none"
              action={() => setSelectedPriority("0")}
            />
            <PriorityButton
              label="1"
              animationDelay={0.2}
              bgColor="bg-priority-lowest"
              action={() => setSelectedPriority("1")}
            />
            <PriorityButton
              label="2"
              animationDelay={0.25}
              bgColor="bg-priority-lower"
              action={() => setSelectedPriority("2")}
            />
            <PriorityButton
              label="3"
              animationDelay={0.3}
              bgColor="bg-priority-medium"
              action={() => setSelectedPriority("3")}
            />
            <PriorityButton
              label="4"
              animationDelay={0.35}
              bgColor="bg-priority-higher"
              action={() => setSelectedPriority("4")}
            />
            <PriorityButton
              label="5"
              animationDelay={0.4}
              bgColor="bg-priority-highest"
              action={() => setSelectedPriority("5")}
            />
          </>
        )}
      </div>
    </div>
  );
}
