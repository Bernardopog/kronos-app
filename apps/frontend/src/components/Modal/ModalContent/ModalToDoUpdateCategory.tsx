import { useContext, useState } from "react";
import ModalFooter from "../../../ui/Modal/ModalFooter";
import { Input } from "@/ui/Input/";
import { ModalContext } from "@/context/ModalContext";
import { useToDoCategoryStore } from "@/store/ToDoCategoryStore";
import { useShallow } from "zustand/shallow";

export default function ModalToDoUpdateCategory() {
  const { toggleModal } = useContext(ModalContext);
  const { selectedCategory, updateCategory } = useToDoCategoryStore(
    useShallow((s) => ({
      selectedCategory: s.selectedCategory,
      updateCategory: s.updateCategory,
    })),
  );
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
          errorMessage={errorMessage}
        />
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
