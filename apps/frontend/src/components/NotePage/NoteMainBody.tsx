"use client";

import { NoteContext } from "@/context/NoteContext";
import { INote } from "@/mock/mockNote";
import formaterText from "@/mod/noteTextFormatter";
import { useContext, useEffect, useRef, useState } from "react";

interface INoteMainBodyProps {
  selectedNote: INote;
}

export default function NoteMainBody({ selectedNote }: INoteMainBodyProps) {
  const { changeContent } = useContext(NoteContext);

  const descInputRef = useRef<HTMLTextAreaElement>(null);

  const [noteDescription, setNoteDescription] = useState<string>("Digite Aqui");
  const [editableDesc, setEditableDesc] = useState<boolean>(false);

  useEffect(() => {
    if (editableDesc && descInputRef.current) descInputRef.current.focus();
    setNoteDescription(
      selectedNote?.description === ""
        ? "Digite Aqui"
        : (selectedNote?.description ?? "Digite Aqui")
    );
  }, [editableDesc, selectedNote]);

  return (
    <div className="size-full py-4 px-6">
      {editableDesc ? (
        <textarea
          className="
          w-full min-h-full p-2 rounded-lg bg-transparent scrollbar-thin scrollbar-track-transparent scrollbar-thumb-woodsmoke-900 ease-in-out duration-300 
          focus:outline focus:outline-woodsmoke-600
          dark:bg-woodsmoke-950 dark:scrollbar-thumb-woodsmoke-100
          dark:focus:outline-woodsmoke-100
        "
          name="description"
          id="description"
          ref={descInputRef}
          value={noteDescription}
          onChange={(ev) => {
            if (noteDescription.length > 20000) return;
            else if (ev.target.value.length > 20000) return;
            else setNoteDescription(ev.target.value);
          }}
          onBlur={() => {
            changeContent(noteDescription);
            setEditableDesc(false);
          }}
        />
      ) : (
        <p
          onDoubleClick={() => {
            setEditableDesc(true);
          }}
          className={`min-h-[95%] whitespace-pre-wrap`}
          dangerouslySetInnerHTML={{
            __html: formaterText(noteDescription),
          }}
        ></p>
      )}
    </div>
  );
}
