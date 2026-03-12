"use client";
import { NoteContext } from "@/context/NoteContext";
import { icons } from "@/icons/icons";
import formaterText from "@/modules/noteTextFormatter";
import Link from "next/link";
import { useContext, useState } from "react";

export default function NoteSection() {
  const { selectNote, noteList, tagList } = useContext(NoteContext);
  const [lastNote] = useState<string>(() =>
    typeof window !== "undefined"
      ? window.localStorage.getItem("lastViewedNote") || ""
      : "",
  );

  const noteData = noteList.find((note) => note.id === lastNote) ?? null;

  if (lastNote === "" || !noteData)
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
            {noteData.title}{" "}
            <span className="text-lg">
              {icons[noteData.icon as keyof typeof icons]}
            </span>
          </span>
        </p>
        {noteData.tags.length > 0 && (
          <p>
            <span className="font-medium text-woodsmoke-950 dark:text-woodsmoke-100">
              Tags:{" "}
            </span>
            {tagList
              .filter((tag) => noteData.tags.includes(tag.id))
              .map((tag) => tag.tagName)
              .join(", ")}
          </p>
        )}
        <p>
          <span className="font-medium text-woodsmoke-950 dark:text-woodsmoke-100">
            Data criação:{" "}
          </span>
          {new Date(noteData.creationDate).toLocaleDateString()}
        </p>
        {noteData?.updateDate && (
          <p>
            <span className="font-medium text-woodsmoke-950 dark:text-woodsmoke-100">
              Data edição:{" "}
            </span>
            {new Date(noteData.updateDate).toLocaleDateString()}
          </p>
        )}
      </header>
      <Link
        href={`/note`}
        onClick={() => selectNote(noteData)}
        className="flex-1 overflow-clip h-full min-h-0"
      >
        <div className="relative h-full min-h-0 max-h-full p-1 animate-fade-in">
          <p
            className="dark:text-woodsmoke-100"
            dangerouslySetInnerHTML={{
              __html: formaterText(noteData.description ?? ""),
            }}
          ></p>
          <div className="absolute top-0 left-0 bg-linear-to-b from-transparent to-woodsmoke-50 z-10 size-full duration-300 ease-in-out opacity-100 dark:to-woodsmoke-925 group-hover:opacity-0"></div>
        </div>
      </Link>
    </section>
  );
}
