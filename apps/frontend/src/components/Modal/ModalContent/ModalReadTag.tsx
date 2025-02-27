import React, { useContext } from "react";
import ModalFooter from "../ModalFooter";
import { NoteContext } from "@/context/NoteContext";
import { AiFillDelete, AiOutlinePlus } from "react-icons/ai";
import { ModalContext } from "@/context/ModalContext";
import Button from "@/components/Button/Button";

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
                <li key={tag.id}>
                  <Button
                    extraStyles={{
                      button: `size-full p-0 px-2 text-woodsmoke-800
                        dark:text-woodsmoke-200
                        hover:bg-woodsmoke-900
                        dark:hover:bg-apple-600/25
                        ${selectedNote?.tags.includes(tag.id) ? "border-apple-600 dark:border-apple-300 hover:boder-apple-600 dark:hover:border-apple-300" : "border-woodsmoke-200 hover:border-woodsmoke-200"}`,
                      icon: "text-xl",
                    }}
                    action={() => {
                      addTag(tag.id);
                      if (selectedNote?.tags.includes(tag.id))
                        removeTag(tag.id);
                    }}
                    label={tag.tagName}
                  />
                </li>
              );
            })}
            <li>
              <Button
                extraStyles={{
                  button: `size-full p-0 px-2 text-woodsmoke-800
                    dark:text-woodsmoke-200
                    hover:bg-apple-600
                    dark:hover:shadow-btn dark:hover:shadow-apple-600/25`,
                  icon: "text-xl",
                }}
                action={() => {
                  changeModalData({
                    headerTitle: "Criar Tag",
                    type: "create",
                    content: "noteCreateTag",
                  });
                }}
                icon={<AiOutlinePlus />}
                label="Criar Tag"
              />
            </li>
            <li>
              <Button
                extraStyles={{
                  button: `text-nowrap size-full p-0 px-2 text-woodsmoke-800
                    dark:text-woodsmoke-200
                    hover:bg-poppy-600
                    dark:hover:shadow-btn dark:hover:shadow-poppy-600/25`,
                  icon: "text-xl",
                }}
                action={() => {
                  changeModalData({
                    headerTitle: "Deletar Tag",
                    type: "delete",
                    content: "noteDeleteTag",
                  });
                }}
                icon={<AiFillDelete />}
                label="Deletar Tag"
              />
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
                  <li key={tag}>
                    <Button
                      extraStyles={{
                        button: `size-full p-0
                          hover:border-woodsmoke-400
                          dark:hover:border-woodsmoke-600
                        `,
                        label: "text-woodsmoke-800 dark:text-woodsmoke-200",
                      }}
                      action={() => {
                        removeTag(tag);
                      }}
                      label={
                        tagList[tagList.findIndex((t) => t.id === tag)].tagName
                      }
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <p className="mt-6 text-woodsmoke-900 dark:text-woodsmoke-200">
            Ainda não há tags...
          </p>
        )}
      </section>
      <ModalFooter type="read" action={() => {}} />
    </>
  );
}
