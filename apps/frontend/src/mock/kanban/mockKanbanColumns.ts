export interface IColumn {
  id: string;
  columnName: string;
  tasksId: string[];
  kanbanId: string;
  color?: number[];
}

const mockColumnList: IColumn[] = [
  {
    id: "colqk12",
    columnName: "To Do",
    tasksId: ["ba9f2", "k8a93"],
    kanbanId: "1234567890abcdef",
    color: [0, 50, 50],
  },
  {
    id: "kbl127k",
    columnName: "Doing",
    tasksId: ["hh192"],
    kanbanId: "1234567890abcdef",
  },
  {
    id: "fa6nlxq",
    columnName: "Done",
    tasksId: ["h2q72", "1x9f2"],
    kanbanId: "1234567890abcdef",
  },
];

export default mockColumnList;
