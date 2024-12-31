import { TypeModal } from "@/context/ModalContext";
import React from "react";

import { FaPlus, FaPencilAlt, FaMinus, FaInfo } from "react-icons/fa";

interface IIcons {
  [key: string]: React.ReactNode;
}

const icons: IIcons = {
  create: <FaPlus />,
  read: <FaInfo />,
  update: <FaPencilAlt />,
  delete: <FaMinus />,
};

interface IModalHeaderProps {
  type: TypeModal;
  title: string;
}

export default function ModalHeader({ type, title }: IModalHeaderProps) {
  return (
    <header
      className={`
      flex items-center w-full p-2 rounded-t-2xl gap-x-4 h-10 text-woodsmoke-50 text-xl
      ${type === "create" && "bg-crud-create-dark"}
      ${type === "read" && "bg-crud-read-dark"}
      ${type === "update" && "bg-crud-update-dark"}
      ${type === "delete" && "bg-crud-delete-dark"}
    `}
    >
      <h2 className="order-1 font-bold">{title}</h2>
      <span className="p-0.5 border-2 rounded-full border-woodsmoke-50">
        {icons[type]}
      </span>
    </header>
  );
}
