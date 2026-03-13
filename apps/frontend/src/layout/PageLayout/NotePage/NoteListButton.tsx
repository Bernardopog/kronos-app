"use client";
import { TabButton } from "@/ui/Button";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { useNoteListStore } from "@/store/NoteListStore";
import { useShallow } from "zustand/shallow";

export default function NoteListButton() {
  const { toggleList, isListShow } = useNoteListStore(
    useShallow((s) => ({
      toggleList: s.toggleList,
      isListShow: s.isListShowing,
    })),
  );

  return (
    <>
      {!isListShow && (
        <TabButton
          action={() => {
            toggleList("open");
          }}
          ariaLabel="Abrir lista de notas"
          icon={<AiOutlineUnorderedList />}
          position="left"
        />
      )}
    </>
  );
}
