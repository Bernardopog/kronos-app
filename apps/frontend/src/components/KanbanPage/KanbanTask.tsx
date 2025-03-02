import { IKanbanTask } from "@/mock/kanban/mockKanbanTasks";

export default function KanbanTask({ task }: { task: IKanbanTask }) {
  return (
    <li
      className="min-h-20 rounded-lg border border-woodsmoke-300 overflow-clip ease-in-out duration-300
      dark:border-woodsmoke-700
    "
    >
      <h3
        className="px-2 bg-woodsmoke-200 text-woodsmoke-800 ease-in-out duration-300
      dark:bg-woodsmoke-950 dark:text-woodsmoke-200"
      >
        {task?.taskName}
      </h3>
      <div className="relative h-14 max-h-16 overflow-clip">
        <p
          className="px-2 text-sm text-wrap text-woodsmoke-600 ease-in-out duration-300
          dark:text-woodsmoke-300
        "
        >
          {task?.description}
        </p>
        <div className="absolute -bottom-2 size-full select-none bg-gradient-to-b from-woodsmoke-925/5 to-woodsmoke-950/75"></div>
      </div>
    </li>
  );
}

// git commit -m "feat: add Kanban Modals to Modal Context and create Kanban Modals components"
