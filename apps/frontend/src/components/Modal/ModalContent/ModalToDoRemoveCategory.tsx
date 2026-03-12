import { useContext } from "react";
import ModalFooter from "../../../ui/Modal/ModalFooter";
import { ModalContext } from "@/context/ModalContext";
import { useToDoCategoryStore } from "@/store/ToDoCategoryStore";
import { useShallow } from "zustand/shallow";
import { useToDoFilterStore } from "@/store/ToDoFilterStore";

export default function ModalToDoRemoveCategory() {
  const { toggleModal } = useContext(ModalContext);
  const { selectedCategory, deleteCategory } = useToDoCategoryStore(
    useShallow((s) => ({
      selectedCategory: s.selectedCategory,
      deleteCategory: s.deleteCategory,
    })),
  );
  const filterController = useToDoFilterStore((s) => s.filterController);

  return (
    <>
      <div
        className="flex flex-col py-4 px-2 gap-4 text-woodsmoke-950 dark:text-woodsmoke-100"
        aria-live="polite"
      >
        <p className="text-center">
          Você tem certeza que deseja excluir essa categoria?
        </p>
        <p className="text-center">
          Cuidado, essa ação é{" "}
          <span className="inline-block px-2 rounded-full font-bold text-poppy-600 dark:bg-woodsmoke-950">
            irreversível !
          </span>
        </p>
      </div>
      <ModalFooter
        type={"delete"}
        action={() => {
          deleteCategory(selectedCategory?.id ?? "");
          filterController("category", "all");
          toggleModal(null);
        }}
      />
    </>
  );
}
