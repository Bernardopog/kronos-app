"use client";
import { icons } from "@/icons/icons";
import formaterText from "@/modules/noteTextFormatter";
import { useNoteStore } from "@/store/NoteStore";
import { useNoteTagStore } from "@/store/NoteTagStore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

export default function NoteSection() {
  const { tagData, getTags } = useNoteTagStore(
    useShallow((s) => ({
      tagData: s.tagData,
      getTags: s.getTags,
    })),
  );
  const { fetched: tagFetched, list: tags } = tagData;

  const { selectNote, noteData, getNotes, selectedNote } = useNoteStore(
    useShallow((s) => ({
      selectNote: s.selectNote,
      noteData: s.noteData,
      getNotes: s.getNotes,
      selectedNote: s.selectedNote,
    })),
  );
  const { fetched: noteFetched, list: notes } = noteData;

  const [lastNote] = useState<string>(() =>
    typeof window !== "undefined"
      ? window.localStorage.getItem("lastViewedNote") || ""
      : "",
  );

  useEffect(() => {
    if (tagFetched) return;
    getTags();
  }, [tagFetched, getTags]);

  useEffect(() => {
    if (noteFetched) return;
    const noteSpecificData = notes.find((note) => note.id === lastNote) ?? null;
    if (!noteSpecificData) return;
    selectNote(noteSpecificData);
    getNotes();
  });

  if (lastNote === "" || !selectedNote)
    return (
      <div className="flex items-center justify-center size-full">
        <p className="text-woodsmoke-950/75 text-lg italic">
          É necessário visualizar uma nota antes.
        </p>
      </div>
    );

  return (
    <section className="group flex flex-col flex-1 md:flex-row">
      <header className="flex flex-col gap-1 pr-2 w-52 text-sm overflow-hidden text-woodsmoke-950/75 dark:text-woodsmoke-100/75">
        <p className="text-nowrap truncate">
          <span className="font-medium text-woodsmoke-950 dark:text-woodsmoke-100">
            Título:
          </span>{" "}
          <span className="inline-flex items-center gap-1">
            {selectedNote.title}{" "}
            <span className="text-lg">
              {icons[selectedNote.icon as keyof typeof icons]}
            </span>
          </span>
        </p>
        {selectedNote.tags.length > 0 && (
          <p>
            <span className="font-medium text-woodsmoke-950 dark:text-woodsmoke-100">
              Tags:{" "}
            </span>
            {tags
              .filter((tag) => selectedNote.tags.includes(tag.id))
              .map((tag) => tag.tagName)
              .join(", ")}
          </p>
        )}
        <p>
          <span className="font-medium text-woodsmoke-950 dark:text-woodsmoke-100">
            Data criação:{" "}
          </span>
          {new Date(selectedNote.creationDate).toLocaleDateString()}
        </p>
        {selectedNote?.updateDate && (
          <p>
            <span className="font-medium text-woodsmoke-950 dark:text-woodsmoke-100">
              Data edição:{" "}
            </span>
            {new Date(selectedNote.updateDate).toLocaleDateString()}
          </p>
        )}
      </header>
      <Link
        href={`/note`}
        onClick={() => selectNote(selectedNote)}
        className="flex-1 overflow-clip h-full min-h-0"
      >
        <div className="relative h-full min-h-0 max-h-full p-1 animate-fade-in">
          <p
            className="dark:text-woodsmoke-100"
            dangerouslySetInnerHTML={{
              __html: formaterText(selectedNote.description ?? ""),
            }}
          ></p>
          <div className="absolute top-0 left-0 bg-linear-to-b from-transparent to-woodsmoke-50 z-10 size-full duration-300 ease-in-out opacity-100 dark:to-woodsmoke-925 group-hover:opacity-0"></div>
        </div>
      </Link>
    </section>
  );
}
