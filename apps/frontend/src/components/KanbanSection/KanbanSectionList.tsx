import { icons } from "@/icons/icons";
import { IKanbanWithSections } from "@/mock/kanban/mockKanbans";

interface IKanbanSectionListProps {
  title: string;
  list: IKanbanWithSections[];
  showEmptyKanban: boolean;
}

export default function KanbanSectionList({
  title,
  list,
  showEmptyKanban,
}: IKanbanSectionListProps) {
  const columnColorLight = (column: { color: number[] }) =>
    column.color[2] > 60 ? "text-woodsmoke-950" : "text-woodsmoke-50";

  return (
    <>
      <h3 className="font-bold text-lg mt-2 text-woodsmoke-950 dark:text-woodsmoke-50">
        {title}
      </h3>
      <ul className="overflow-y-auto pl-2">
        {list.map((kanban) => {
          if (!showEmptyKanban && kanban.columns.length === 0) return null;
          return (
            <li key={kanban.id}>
              <h4 className="font-bold text-woodsmoke-950 dark:text-woodsmoke-50">
                {kanban.title}
              </h4>
              {kanban.columns.length > 0 ? (
                <ul className="grid grid-cols-1 gap-2 p-2 border-l rounded-r-lg border-woodsmoke-950/25 bg-woodsmoke-100 dark:border-woodsmoke-50/25 dark:bg-woodsmoke-950 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {kanban.columns &&
                    kanban.columns.map((column) => {
                      return (
                        <li key={column.id} className="flex gap-1">
                          <div
                            style={{
                              backgroundColor: `hsla(${column.color[0]}, ${column.color[1]}%, ${column.color[2]}%, 0.75)`,
                            }}
                            className="grid place-content-center size-6 rounded-lg"
                          >
                            <span className={`${columnColorLight(column)}`}>
                              {column.icon &&
                                icons[column.icon as keyof typeof icons]}
                            </span>
                          </div>
                          <h5 className="font-medium text-woodsmoke-950/75 dark:text-woodsmoke-50/75">
                            {column.columnName}
                          </h5>
                          <span className="text-woodsmoke-950/75 dark:text-woodsmoke-50/75">
                            ({column._count.tasks})
                          </span>
                        </li>
                      );
                    })}
                </ul>
              ) : (
                <span className="italic text-woodsmoke-950/75 dark:text-woodsmoke-50/75">
                  Sem colunas...
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}
