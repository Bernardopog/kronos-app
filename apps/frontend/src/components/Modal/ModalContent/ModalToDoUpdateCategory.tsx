import React, { useContext, useState } from "react";
import ModalFooter from "../ModalFooter";
import Input from "@/components/Input/Input";
import { ModalContext } from "@/context/ModalContext";
import { ToDoCategoryContext } from "@/context/ToDoCategoryContext";

export default function ModalToDoUpdateCategory() {
  const { toggleModal } = useContext(ModalContext);
  const { selectedCategory, updateCategory } = useContext(ToDoCategoryContext);
  const [newName, setNewName] = useState<string>(selectedCategory?.title ?? "");
  const [errorMessage, setErrorMessage] = useState<string>("");

  return (
    <>
      <div className="flex flex-col p-2 py-6">
        <Input
          label="Novo nome da Categoria"
          id="categoryNewName"
          value={newName}
          setValue={setNewName}
        />
        {errorMessage.length > 0 && (
          <span className="text-poppy-600 text-sm">{errorMessage}</span>
        )}
      </div>
      <ModalFooter
        type={"create"}
        action={() => {
          if (newName.trim() !== "") {
            updateCategory(selectedCategory?.id ?? "", newName);
            toggleModal(null);
          } else {
            setErrorMessage("O novo nome não pode estar em branco");
          }
        }}
      />
    </>
  );
}
