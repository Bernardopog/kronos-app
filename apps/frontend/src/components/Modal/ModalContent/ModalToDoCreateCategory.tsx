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

  const checkName = () => {
    if (categoryName.trim() === "") {
      setErrorMessage("O Nome da categoria nao pode estar em branco");
      return true;
    } else setErrorMessage("");
  };

  return (
    <>
      <div className="flex flex-col p-2 py-6">
        <Input
          label="Nome da Categoria"
          id="categoryName"
          value={categoryName}
          setValue={setCategoryName}
          errorMessage={errorMessage}
        />
      </div>
      <ModalFooter
        type={"create"}
        action={() => {
          if (checkName()) return;
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
