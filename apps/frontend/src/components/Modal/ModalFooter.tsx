"use client";
import { ModalContext } from "@/context/ModalContext";
import React, { useContext } from "react";

export default function ModalFooter() {
  const { toggleModal } = useContext(ModalContext);

  return (
    <footer className="flex h-10 text-xl font-bold text-woodsmoke-50">
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
        Concluir
      </button>
    </footer>
  );
}
