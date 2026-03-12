"use client";
import { TabButton } from "@/ui/Button";
import { AiFillInfoCircle } from "react-icons/ai";
import { useToDoGeneralStore } from "@/store/ToDoGeneralStore";
import { useShallow } from "zustand/shallow";

export default function ToDoGeneralInfoButton() {
  const { toggleGeneral, isGeneralShowing } = useToDoGeneralStore(
    useShallow((s) => ({
      toggleGeneral: s.toggleGeneral,
      isGeneralShowing: s.isGeneralShowing,
    })),
  );

  return (
    <>
      {!isGeneralShowing && (
        <TabButton
          action={() => {
            toggleGeneral("open");
          }}
          ariaLabel="Abrir informações gerais"
          icon={<AiFillInfoCircle />}
          position="right"
        />
      )}
    </>
  );
}
