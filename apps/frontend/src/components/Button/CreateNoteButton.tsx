"use client";
import React from "react";
import { AiFillPlusCircle } from "react-icons/ai";

interface ICreateNoteButtonProps {
  action: () => void;
}

export default function CreateNoteButton({ action }: ICreateNoteButtonProps) {
  return (
    <button
      className="
        flex items-center justify-center w-full min-h-12 rounded-lg border gap-x-2 border-apple-500 bg-apple-600 text-woodsmoke-100 ease-in-out duration-300
        dark:border-woodsmoke-900
      "
      onClick={action}
    >
      <span className="text-3xl">
        <AiFillPlusCircle />
      </span>
      Criar nova nota
    </button>
  );
}
