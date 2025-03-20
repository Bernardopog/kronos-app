"use client";

import { createContext, ReactNode, RefObject, useRef, useState } from "react";

export type TypeModal = "create" | "read" | "update" | "delete" | "none";
type ModalContent =
  | "toDoRead"
  | "toDoCreate"
  | "toDoUpdate"
  | "toDoRemove"
  | "toDoRemoveSingle"
  | "toDoCreateCategory"
  | "toDoUpdateCategory"
  | "toDoRemoveCategory"
  | "noteReadTags"
  | "noteCreateTag"
  | "noteDeleteTag"
  | "noteDelete"
  | "kanbanCreate"
  | "kanbanCreateColumn"
  | "kanbanCreateTask"
  | "kanbanDelete"
  | "kanbanColumnDelete"
  | "none";

interface IModalData {
  headerTitle: string;
  type: TypeModal;
  content: ModalContent;
}

interface IModalContext {
  isModalOpen: boolean;
  modalData: IModalData | null;
  modalRef: RefObject<HTMLDivElement | null>;
  fromId: string;
  toggleModal: (modalData: IModalData | null, dataId?: string) => void;
  changeModalData: (modalData: IModalData) => void;
}

const ModalContext = createContext({} as IModalContext);

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<IModalData | null>(null);
  const [fromId, setFromId] = useState<string>("");

  const modalRef = useRef<HTMLDivElement>(null);

  /**
   * Toggles the state of the modal between open and closed.
   * If called with an argument, it also updates the modalData state.
   * @param {IModalData | null} modalData The modal data to update if the modal is being opened.
   */
  const toggleModal = (modalData: IModalData | null, dataId?: string) => {
    if (dataId) setFromId(dataId);
    setIsModalOpen(!isModalOpen);
    if (modalData) setModalData(modalData);
    setTimeout(() => {
      if (modalRef.current) modalRef.current.focus();
    }, 50);
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
        modalRef,
        fromId,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
