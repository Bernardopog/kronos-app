"use client";

import { createContext, ReactNode, useState } from "react";

export type TypeModal = "create" | "read" | "update" | "delete" | "none";
type ModalContent =
  | "toDoRead"
  | "toDoCreate"
  | "toDoUpdate"
  | "toDoRemove"
  | "none";

interface IModalContext {
  isModalOpen: boolean;
  modalData: IModalData | null;
  toggleModal: (modalData: IModalData | null) => void;
  changeModalData: (modalData: IModalData) => void;
}

interface IModalData {
  headerTitle: string;
  type: TypeModal;
  content: ModalContent;
}

const ModalContext = createContext({} as IModalContext);

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<IModalData | null>(null);

  /**
   * Toggles the state of the modal between open and closed.
   * If called with an argument, it also updates the modalData state.
   * @param {IModalData | null} modalData The modal data to update if the modal is being opened.
   */
  const toggleModal = (modalData: IModalData | null) => {
    setIsModalOpen(!isModalOpen);
    if (modalData) setModalData(modalData);
  };

  const changeModalData = (modalData: IModalData) => {
    setModalData(modalData);
  };

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        modalData,
        toggleModal,
        changeModalData,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
