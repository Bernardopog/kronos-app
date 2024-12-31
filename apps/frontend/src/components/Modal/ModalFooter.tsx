"use client";
import { ModalContext, TypeModal } from "@/context/ModalContext";
import React, { useContext } from "react";

interface IModalFooterProps {
  type: TypeModal;
}

export default function ModalFooter({ type }: IModalFooterProps) {
  const { toggleModal } = useContext(ModalContext);

  return (
    <footer className="flex h-10 text-xl font-bold text-woodsmoke-50">
      {type !== "read" && (
        <>
          <button
            type="button"
            className="modal-btn rounded-bl-2xl bg-crud-delete-dark hover:bg-crud-delete-light"
            onClick={() => {
              toggleModal("none");
            }}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="modal-btn rounded-br-2xl bg-crud-create-dark hover:bg-crud-create-light"
          >
            {type === "create" && "Criar"}
            {type === "update" && "Atualizar"}
            {type === "delete" && "Excluir"}
          </button>
        </>
      )}
      {type === "read" && (
        <button
          type="button"
          className="modal-btn rounded-b-2xl bg-crud-read-dark hover:bg-crud-read-light"
          onClick={() => {
            toggleModal("none");
          }}
        >
          Fechar
        </button>
      )}
    </footer>
  );
}
