import {
  ToDoSection,
  KanbanSection,
  NoteSection,
} from "@/layout/PageLayout/HomePage";
import { NameTypes } from "@/shared/linkList";
import Link from "next/link";
import { ReactNode } from "react";

interface IHomeCardProps {
  name: NameTypes;
  href: string;
  label: string;
  icon: ReactNode;
  position: string;
}

export default function HomeCard({
  name,
  href,
  label,
  icon,
  position,
}: IHomeCardProps) {
  const positionMap: Record<string, string> = {
    "1": "md:col-start-1 md:col-end-3 lg:col-start-1 lg:col-end-4",
    "2": "md:col-start-3 md:col-end-4 md:row-start-1 md:row-end-3 lg:col-start-4 lg:row-start-1 lg:row-end-4",
    "3": "md:col-start-1 md:col-end-3 md:row-start-2 md:row-end-3 lg:col-start-1 lg:col-end-4 lg:row-start-1 lg:row-end-3",
  };

  const gridPos = positionMap[position];

  const sectionMap: Record<NameTypes, ReactNode> = {
    kanban: <KanbanSection />,
    todo: <ToDoSection />,
    note: <NoteSection />,
  };

  return (
    <article
      className={`flex flex-col ${gridPos} rounded-lg border p-2 gap-2 duration-300 ease-in-out overflow-hidden border-woodsmoke-950/25 dark:border-woodsmoke-100/25 hover:border-woodsmoke-950/50 dark:hover:border-woodsmoke-100/50`}
    >
      <header className="flex justify-between items-center text-woodsmoke-900 dark:text-woodsmoke-100">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-medium">{label}</h2>
          <span className="text-2xl">{icon}</span>
        </div>
        <Link href={href} className="text-sm">
          Ver detalhes
        </Link>
      </header>
      {sectionMap[name]}
    </article>
  );
}
