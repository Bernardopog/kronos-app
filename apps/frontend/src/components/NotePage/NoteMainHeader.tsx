"use client";

import { AiFillTag, AiOutlineClockCircle, AiOutlineTag } from "react-icons/ai";
import { INote } from "@/mock/mockNote";
import Divider from "@/components/Divider/Divider";
import { useContext, useEffect, useRef, useState } from "react";
import { ModalContext } from "@/context/ModalContext";
import { NoteContext } from "@/context/NoteContext";

interface INoteMainHeaderProps {
  selectedNote: INote;
}

export default function NoteMainHeader({ selectedNote }: INoteMainHeaderProps) {
  const [noteTitle, setNoteTitle] = useState<string>(selectedNote?.title ?? "");
  const [editableTitle, setEditableTitle] = useState<boolean>(false);

  const titleInputRef = useRef<HTMLInputElement>(null);

  const { updateNote } = useContext(NoteContext);
  const { toggleModal } = useContext(ModalContext);

  const noteCreateDate = selectedNote?.date.createDate;
  const noteUpdateDate = selectedNote?.date.updateDate;

  useEffect(() => {
    if (editableTitle && titleInputRef.current) titleInputRef.current.focus();
  }, [editableTitle, noteTitle, selectedNote]);

  return (
    <header className="px-4 pt-4">
      {editableTitle ? (
        <input
          className="
          w-full text-2xl bg-woodsmoke-100
          focus:pl-4 focus:outline focus:outline-woodsmoke-600 focus:rounded-lg ease-in-out duration-300
          dark:bg-woodsmoke-950 dark:focus:outline-woodsmoke-100
        "
          ref={titleInputRef}
          type="text"
          value={noteTitle}
          onChange={(ev) => {
            setNoteTitle(ev.target.value);
          }}
          onBlur={() => {
            updateNote({ ...selectedNote, title: noteTitle });
            setEditableTitle(false);
          }}
          onKeyDown={(ev) => {
            if (ev.key === "Enter") {
              updateNote({ ...selectedNote, title: noteTitle });
              setEditableTitle(false);
            }
          }}
        />
      ) : (
        <h2
          className="text-2xl"
          onMouseUp={() => {
            setEditableTitle(true);
          }}
        >
          {selectedNote?.title}
        </h2>
      )}
      <section
        className="
        flex flex-col items-start mt-12 gap-2 text-woodsmoke-900 dark:text-woodsmoke-300
        lg:flex-row
      "
      >
        <div className="flex items-start gap-x-2">
          <span className="text-xl md:text-2xl">
            <AiOutlineTag />
          </span>
          <p className="font-medium text-woodsmoke-800 dark:text-woodsmoke-200">
            Tags:
          </p>
          <ul className="flex flex-wrap gap-x-2">
            {selectedNote.tags?.map((tag, idx) => {
              return (
                <li key={tag.id}>
                  <p className="capitalize">
                    {tag.tagName}
                    {idx === selectedNote.tags!.length - 1 ? "." : ","}
                  </p>
                </li>
              );
            })}
            {selectedNote.tags?.length === 0 && (
              <li>
                <p>Sem Tags</p>
              </li>
            )}
          </ul>
        </div>
        <button
          className="
            flex justify-between items-center border rounded-full ml-4 px-4 gap-x-2 font-medium border-woodsmoke-200
            hover:bg-woodsmoke-950 hover:border-woodsmoke-400 hover:text-woodsmoke-100 ease-in-out duration-300
          "
          onClick={() => {
            toggleModal({
              headerTitle: "Gerenciar Tags",
              type: "read",
              content: "noteReadTags",
            });
          }}
        >
          <AiFillTag />
          Gerenciar Tags
        </button>
      </section>

      <section className="flex items-center mt-2 gap-x-2 text-woodsmoke-900 dark:text-woodsmoke-300">
        <span className="text-xl md:text-2xl">
          <AiOutlineClockCircle />
        </span>
        <div className="flex gap-x-8">
          {noteCreateDate && (
            <p className="flex flex-col items-center w-full font-medium">
              <span className="text-woodsmoke-800 dark:text-woodsmoke-200 text-sm md:text-base">
                Data Criação:
              </span>
              <span className="font-normal inline-block ml-2 text-sm md:text-base">
                {noteCreateDate.getDate().toString().padStart(2, "0")} /{" "}
                {(noteCreateDate.getMonth() + 1).toString().padStart(2, "0")} /{" "}
                {noteCreateDate.getFullYear()}
              </span>
            </p>
          )}
          {noteUpdateDate && (
            <p className="flex flex-col items-center w-full font-medium">
              <span className="text-woodsmoke-800 dark:text-woodsmoke-200 text-sm md:text-base">
                Data Edição:
              </span>
              <span className="font-normal inline-block ml-2 text-sm md:text-base">
                {noteUpdateDate.getDate().toString().padStart(2, "0")} /{" "}
                {(noteUpdateDate.getMonth() + 1).toString().padStart(2, "0")} /{" "}
                {noteUpdateDate.getFullYear()}
              </span>
            </p>
          )}
        </div>
      </section>
      <div className="mt-4 mx-8 lg:mx-24">
        <Divider />
      </div>
    </header>
  );
}
