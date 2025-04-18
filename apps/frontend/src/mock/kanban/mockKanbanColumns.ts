export interface IColumn {
  id: string;
  columnName: string;
  tasks: string[];
  kanbanId: string;
  color: number[];
  icon?: string;
}

const mockColumnList: IColumn[] = [
  {
    id: "colqk12",
    columnName: "To Do",
    tasks: ["ba9f2", "k8a93"],
    kanbanId: "1234567890abcdef",
    color: [0, 50, 50],
    icon: "book",
  },
  {
    id: "kbl127k",
    columnName: "Doing",
    tasks: ["hh192"],
    kanbanId: "1234567890abcdef",
    color: [50, 50, 50],
    icon: "book",
  },
  {
    id: "fa6nlxq",
    columnName: "Done",
    tasks: ["h2q72", "1x9f2"],
    kanbanId: "1234567890abcdef",
    color: [100, 50, 50],
  },
];

export default mockColumnList;
