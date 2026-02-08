import { BsFileText, BsKanban, BsListCheck } from "react-icons/bs";

export type NameTypes = "kanban" | "todo" | "note";

interface ILinkList {
  name: NameTypes;
  path: string;
  label: string;
  icon: React.ReactNode;
}

const linkList: ILinkList[] = [
  {
    name: "kanban",
    path: "/kanbanlist",
    label: "Kanban",
    icon: <BsKanban />,
  },
  {
    name: "todo",
    path: "/todo",
    label: "Tarefas",
    icon: <BsListCheck />,
  },
  {
    name: "note",
    path: "/note",
    label: "Notas",
    icon: <BsFileText />,
  },
];

export default linkList;
