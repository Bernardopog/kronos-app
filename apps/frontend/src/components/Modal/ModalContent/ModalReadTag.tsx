import { useContext, useEffect } from "react";
import ModalFooter from "../../../ui/Modal/ModalFooter";
import { AiFillDelete, AiOutlinePlus } from "react-icons/ai";
import { ModalContext } from "@/context/ModalContext";
import { Button } from "@/ui/Button";
import { useNoteStore } from "@/store/NoteStore";
import { useNoteTagStore } from "@/store/NoteTagStore";
import { useShallow } from "zustand/shallow";

export default function ModalReadTag() {
  const { addTag, removeTag, selectedNote } = useNoteStore(
    useShallow((s) => ({
      addTag: s.addTag,
      removeTag: s.removeTag,
      selectedNote: s.selectedNote,
    })),
  );

  const { tagData, getTags } = useNoteTagStore(
    useShallow((s) => ({
      tagData: s.tagData,
      getTags: s.getTags,
    })),
  );
  const { fetched, list: tags } = tagData;

  const { changeModalData } = useContext(ModalContext);

  useEffect(() => {
    if (fetched) return;
    getTags();
  }, [fetched, getTags]);

  return (
    <>
      <section className="flex flex-col p-2 py-6 gap-y-4">
        <div>
          <h4 className="bold font-bold text-woodsmoke-900 dark:text-woodsmoke-100">
            Tags Disponíveis:
          </h4>
          <ul className="grid grid-cols-4 p-2 border rounded-lg gap-1 border-woodsmoke-200 dark:border-woodsmoke-800">
            {tags.map((tag) => {
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
                      if (selectedNote?.tags.includes(tag.id)) {
                        removeTag(tag.id);
                      } else {
                        addTag(tag.id);
                      }
                    }}
                    label={tag.tagName}
                    ariaLabel={`Adicionar Tag ${tag.tagName}`}
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
                    dark:hover:shadow-[0_0_5px_3px] dark:hover:shadow-apple-600/25`,
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
                    dark:hover:shadow-[0_0_5px_3px] dark:hover:shadow-poppy-600/25`,
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
                      label={tags[tags.findIndex((t) => t.id === tag)].tagName}
                      ariaLabel={`Remover Tag ${
                        tags[tags.findIndex((t) => t.id === tag)].tagName
                      }`}
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
