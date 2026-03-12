"use client";
import { TabButton } from "@/ui/Button";
import { AiFillFilter } from "react-icons/ai";
import { useToDoFilterStore } from "@/store/ToDoFilterStore";
import { useShallow } from "zustand/shallow";

export default function ToDoFilterButton() {
  const { isFilterShowing, toggleFilter } = useToDoFilterStore(
    useShallow((s) => ({
      isFilterShowing: s.isFilterShowing,
      toggleFilter: s.toggleFilter,
    })),
  );

  return (
    <>
      {!isFilterShowing && (
        <TabButton
          action={() => {
            toggleFilter("open");
          }}
          ariaLabel="Abrir filtro"
          icon={<AiFillFilter />}
          position="left"
        />
      )}
    </>
  );
}
