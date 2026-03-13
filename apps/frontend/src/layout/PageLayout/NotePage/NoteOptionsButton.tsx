"use client";
import { TabButton } from "@/ui/Button";
import { AiFillSetting } from "react-icons/ai";
import { useNoteStore } from "@/store/NoteStore";
import { useNoteOptionsStore } from "@/store/NoteOptionsStore";
import { useShallow } from "zustand/shallow";

export default function NoteOptionsButton() {
  const { toggleOptions, isOptionsShowing } = useNoteOptionsStore(
    useShallow((s) => ({
      toggleOptions: s.toggleOptions,
      isOptionsShowing: s.isOptionsShowing,
    })),
  );

  const selectedNote = useNoteStore((s) => s.selectedNote);

  return (
    <>
      {!isOptionsShowing && selectedNote && (
        <TabButton
          action={() => {
            toggleOptions("open");
          }}
          ariaLabel="Abrir opções da nota"
          icon={<AiFillSetting />}
          position="right"
        />
      )}
    </>
  );
}
