import React, { useContext } from "react";
import ModalFooter from "../ModalFooter";
import { NoteContext } from "@/context/NoteContext";
import { AiOutlinePlus } from "react-icons/ai";
import { ModalContext } from "@/context/ModalContext";

export default function ModalReadTag() {
  const { tagList, selectedNote, addTag, removeTag } = useContext(NoteContext);
  const { changeModalData } = useContext(ModalContext);

  return (
    <>
      <section className="flex flex-col p-2 py-6 gap-y-4">
        <div>
          <h4 className="bold font-bold text-woodsmoke-900 dark:text-woodsmoke-100">
            Tags Disponíveis:
          </h4>
          <ul className="grid grid-cols-4 p-2 border rounded-lg gap-1 border-woodsmoke-200 dark:border-woodsmoke-800">
            {tagList.map((tag) => {
              return (
                <li
                  key={tag.id}
                  className={`
                    flex items-center justify-center border rounded-lg bg-woodsmoke-100 text-woodsmoke-800
                    dark:text-woodsmoke-200 dark:bg-woodsmoke-925
                    ${selectedNote?.tags.includes(tag.id) ? "border-apple-600 dark:border-apple-300" : "border-woodsmoke-200"}
                  `}
                >
                  <button
                    className="size-full"
                    onClick={() => {
                      addTag(tag.id);
                      if (selectedNote?.tags.includes(tag.id))
                        removeTag(tag.id);
                    }}
                  >
                    {tag.tagName}
                  </button>
                </li>
              );
            })}
            <li
              className="
                flex items-center justify-center border rounded-lg border-apple-500 bg-apple-600 text-woodsmoke-100 ease-in-out duration-300
              hover:bg-apple-700 hover:opacity-100
              "
            >
              <button
                className="flex items-center"
                onClick={() => {
                  changeModalData({
                    headerTitle: "Criar Tag",
                    type: "create",
                    content: "noteCreateTag",
                  });
                }}
              >
                <AiOutlinePlus />
                Criar Tag
              </button>
            </li>
          </ul>
        </div>
        {selectedNote!.tags.length > 0 ? (
          <div>
            <h4 className="bold font-bold text-woodsmoke-900 dark:text-woodsmoke-100">
              Tags Usadas:
            </h4>
            <ul className="grid grid-cols-4 p-2 border rounded-lg gap-1 border-woodsmoke-200 dark:border-woodsmoke-800">
              {selectedNote?.tags.map((tag) => {
                return (
                  <li
                    key={tag}
                    className="
                    flex items-center justify-center border rounded-lg border-woodsmoke-200 bg-woodsmoke-100 text-woodsmoke-800
                    dark:text-woodsmoke-200 dark:bg-woodsmoke-925
                    "
                  >
                    <button
                      className="size-full"
                      onClick={() => {
                        removeTag(tag);
                      }}
                    >
                      {tagList[tagList.findIndex((t) => t.id === tag)].tagName}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <p className="mt-6 text-woodsmoke-100">Ainda não há tags...</p>
        )}
      </section>
      <ModalFooter type="read" action={() => {}} />
    </>
  );
}
