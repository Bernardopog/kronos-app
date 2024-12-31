"use client";

import Input from "@/components/Input/Input";
import { useState } from "react";

export default function ModalToDoCreate() {
  const [title, setTitle] = useState("");

  return (
    <div className="flex flex-col py-6 gap-y-8">
      <Input
        label="Título da Tarefa"
        id="title"
        value={title}
        setValue={setTitle}
      />
    </div>
  );
}
