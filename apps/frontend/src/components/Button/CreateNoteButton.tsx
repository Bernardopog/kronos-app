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
        flex flex-col items-center justify-center w-full min-h-20 rounded-lg border border-apple-500 bg-apple-600 text-woodsmoke-100 ease-in-out duration-300 opacity-25
        dark:border-woodsmoke-900
        hover:bg-apple-700 hover:opacity-100
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
