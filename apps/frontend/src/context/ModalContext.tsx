"use client";

import { createContext, ReactNode, useState } from "react";

export type TypeModal = "create" | "read" | "update" | "delete" | "none";
type ModalContent = "toDoRead" | "none";

interface IModalContext {
  isModalOpen: boolean;
  typeOfModal: TypeModal;
  modalContent: ModalContent;
  toggleModal: (type: TypeModal, content?: ModalContent) => void;
}

const ModalContext = createContext({} as IModalContext);

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [typeOfModal, setTypeOfModal] = useState<TypeModal>("none");
  const [modalContent, setModalContent] = useState<ModalContent>("none");

  /**
   * Toggles the state of the modal between open and closed.
   * When called, it inverts the current state of `isModalOpen`.
   * Additionally, it sets the type of the modal to the given `type` and the content of the modal to the given `content`.
   * @param {TypeModal} type The type of the modal to open.
   * @param {ModalContent} [content="none"] The content of the modal to open.
   */
  const toggleModal = (type: TypeModal, content?: ModalContent) => {
    setIsModalOpen(!isModalOpen);
    setTypeOfModal(type);
    if (content) setModalContent(content);
  };

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        typeOfModal,
        modalContent,
        toggleModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
