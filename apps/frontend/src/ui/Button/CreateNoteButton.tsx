"use client";
import React from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import Button from "./Button";

interface ICreateNoteButtonProps {
  action: () => void;
}

export default function CreateNoteButton({ action }: ICreateNoteButtonProps) {
  return (
    <Button
      extraStyles={{
        button: `
          w-full min-h-12 border-dashed rounded-lg text-woodsmoke-900
          dark:text-woodsmoke-200
          hover:bg-apple-600
          dark:hover:shadow-[0_0_5px_3px] dark:hover:shadow-apple-600/25
        `,
      }}
      action={action}
      icon={<AiFillPlusCircle />}
      label="Criar nova nota"
    />
  );
}
