import { BsFileText, BsKanban, BsListCheck } from "react-icons/bs";

interface ILinkList {
  name: string;
  path: string;
  label: string;
  icon: React.ReactNode;
}

const linkList: ILinkList[] = [
  {
    name: "kanban",
    path: "/pages/kanban",
    label: "Kanban",
    icon: <BsKanban />,
  },
  {
    name: "todo",
    path: "/pages/todo",
    label: "Tarefas",
    icon: <BsListCheck />,
  },
  {
    name: "note",
    path: "/pages/note",
    label: "Notas",
    icon: <BsFileText />,
  },
];

export default linkList;
