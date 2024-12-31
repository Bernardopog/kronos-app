"use client";

import { createContext, ReactNode, useState } from "react";

export type TypeModal = "create" | "read" | "update" | "delete" | "none";

interface IModalContext {
  isModalOpen: boolean;
  typeOfModal: TypeModal;
  toggleModal: (type: TypeModal) => void;
}

const ModalContext = createContext({} as IModalContext);

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [typeOfModal, setTypeOfModal] = useState<TypeModal>("none");

  /**
   * Toggles the state of the modal between open and closed.
   * When called, it inverts the current state of `isModalOpen`.
   * @param {TypeModal} type The type of modal to open.
   */
  const toggleModal = (type: TypeModal) => {
    setIsModalOpen(!isModalOpen);
    setTypeOfModal(type);
  };

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        typeOfModal,
        toggleModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
