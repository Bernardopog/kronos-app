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
