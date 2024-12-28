import HomeCard from "@/components/Card/HomeCard";

import { BsKanban, BsListCheck, BsFileText } from "react-icons/bs";

const cardLinkList = [
  {
    path: "/pages/kanban",
    label: "Kanban",
    icon: <BsKanban />,
  },
  {
    path: "/pages/todo",
    label: "Tarefas",
    icon: <BsListCheck />,
  },
  {
    path: "/pages/note",
    label: "Notas",
    icon: <BsFileText />,
  },
];

export default function Home() {
  return (
    <main
      className="bg-woodsmoke-50 overflow-y-scroll scrollbar-thin scrollbar-thumb-woodsmoke-950 scrollbar-track-woodsmoke-100"
      id="main"
    >
      <header className="px-8 py-4">
        <h2 className="text-[2rem]">
          Olá, <span className="font-bold">John Doe</span>, seja bem-vindo!
        </h2>
      </header>
      <section
        className="
        flex flex-col items-center justify-center h-full gap-8
        md:gap-4
        lg:flex-row lg:h-[calc(100%-6rem)]
      "
      >
        {cardLinkList.map((card, idx) => (
          <HomeCard
            key={card.path}
            path={card.path}
            label={card.label}
            icon={card.icon}
            animationTime={250 * (idx + 1)}
          />
        ))}
      </section>
    </main>
  );
}
