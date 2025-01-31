"use client";

import Input from "@/components/Input/Input";
import React, { useContext, useState } from "react";
import ModalFooter from "../ModalFooter";
import { ModalContext } from "@/context/ModalContext";
import { ToDoCategoryContext } from "@/context/ToDoCategoryContext";

export default function ModalToDoCreateCategory() {
  const [categoryName, setCategoryName] = useState<string>("");
  const { toggleModal } = useContext(ModalContext);
  const { createCategory } = useContext(ToDoCategoryContext);
  const [errorMessage, setErrorMessage] = useState<string>("");

  return (
    <>
      <div className="flex flex-col p-2 py-6">
        <Input
          label="Nome da Categoria"
          id="categoryName"
          value={categoryName}
          setValue={setCategoryName}
        />
        {errorMessage.length > 0 && (
          <span className="text-poppy-600 text-sm">{errorMessage}</span>
        )}
      </div>
      <ModalFooter
        type={"create"}
        action={() => {
          if (categoryName.trim() !== "") {
            createCategory(categoryName);
            toggleModal(null);
          } else {
            setErrorMessage("O nome não pode estar em branco");
          }
        }}
      />
    </>
  );
}
