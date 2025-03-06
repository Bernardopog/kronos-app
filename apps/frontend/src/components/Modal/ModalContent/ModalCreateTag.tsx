"use client";
import { useContext, useState } from "react";
import ModalFooter from "../ModalFooter";
import { NoteContext } from "@/context/NoteContext";
import Input from "@/components/Input/Input";
import Checkbox from "@/components/Checkbox/Checkbox";
import { ModalContext } from "@/context/ModalContext";

export default function ModalCreateTag() {
  const { createTag, tagList } = useContext(NoteContext);
  const { toggleModal } = useContext(ModalContext);

  const [tagName, setTagName] = useState<string>("");
  const [closeWhenCreate, setCloseWhenCreate] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showTagList, setShowTagList] = useState<boolean>(false);

  const checkTagName = () => {
    if (tagName.trim() === "") {
      setErrorMessage("O nome da tag não pode estar em branco");
      return true;
    } else {
      setErrorMessage("");
    }
  };

  return (
    <>
      <div className="flex flex-col p-2 py-6 gap-y-4">
        <Input
          id="tag"
          label="Tag"
          setValue={setTagName}
          value={tagName}
          name="tag"
          errorMessage={errorMessage}
        />
        <div className="flex flex-col gap-y-2">
          <Checkbox
            label="Mostrar lista de Tags"
            htmlFor="show-tag-list"
            action={() => setShowTagList(!showTagList)}
          />
          <Checkbox
            label="Fechar modal ao criar tag"
            htmlFor="close-modal-question"
            action={() => setCloseWhenCreate(!closeWhenCreate)}
          />
        </div>

        <ul
          className={`
          grid grid-cols-4 rounded-lg border-woodsmoke-200 dark:border-woodsmoke-800 ease-in-out duration-300
          ${showTagList ? "h-24 p-2 border overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-woodsmoke-950" : "h-0 overflow-clip p-0 border-none"}
        `}
          aria-hidden={!showTagList}
        >
          {tagList.map((tag) => (
            <li
              key={tag.id}
              className="text-woodsmoke-950 dark:text-woodsmoke-100"
            >
              {tag.tagName}
            </li>
          ))}
        </ul>
      </div>
      <ModalFooter
        type="create"
        action={() => {
          if (checkTagName()) return;
          createTag(tagName);
          if (closeWhenCreate) toggleModal(null);
        }}
      />
    </>
  );
}
