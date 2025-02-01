import { useContext } from "react";
import ModalFooter from "../ModalFooter";
import { ToDoCategoryContext } from "@/context/ToDoCategoryContext";
import { ModalContext } from "@/context/ModalContext";

export default function ModalToDoRemoveCategory() {
  const { toggleModal } = useContext(ModalContext);
  const { selectedCategory, deleteCategory } = useContext(ToDoCategoryContext);

  console.log(selectedCategory);

  return (
    <>
      <div className="flex flex-col py-4 px-2 gap-4 text-woodsmoke-950 dark:text-woodsmoke-100">
        <p className="text-center">
          Você tem certeza que deseja excluir essa categoria?
        </p>
        <p className="text-center">
          Cuidado, essa ação é{" "}
          <span className="inline-block px-2 rounded-full font-bold text-poppy-600 bg-woodsmoke-950">
            irreversível !
          </span>
        </p>
      </div>
      <ModalFooter
        type={"delete"}
        action={() => {
          deleteCategory(selectedCategory?.id ?? "");
          toggleModal(null);
        }}
      />
    </>
  );
}
