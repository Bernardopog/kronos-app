export type TaskPriorityType = "low" | "medium" | "high";

export interface IKanbanTask {
  id: string;
  taskName: string;
  description?: string;
  priority: TaskPriorityType;
  creationDate: Date;
  completionDate?: Date;
  isCompleted: boolean;
  team?: string[];
}

const mockKanbanTaskList: IKanbanTask[] = [
  {
    id: "ba9f2",
    creationDate: new Date(),
    isCompleted: false,
    priority: "medium",
    taskName: "Estudar Matemática",
    description:
      "Estudar Baskara, estudar Polinomial, estudar Integral, estudar Logica, estudar Gráfico, estudar Funções",
  },
  {
    id: "k8a93",
    creationDate: new Date(),
    isCompleted: false,
    priority: "low",
    taskName: "Estudar Português",
  },
  {
    id: "hh192",
    creationDate: new Date(),
    isCompleted: false,
    priority: "high",
    taskName: "Estudar Ciências",
    description:
      "Estudar Física, estudar Química, estudar Biologia, estudar Astronomia",
    team: ["user1@example.com", "user2@example.com"],
  },
  {
    id: "h2q72",
    creationDate: new Date(),
    isCompleted: true,
    priority: "medium",
    taskName: "Estudar História",
    description:
      "Estudar História Geral, estudar História do Brasil, estudar História da Arte, estudar Filosofia",
  },
  {
    id: "1x9f2",
    creationDate: new Date(),
    isCompleted: true,
    priority: "low",
    taskName: "Estudar Geografia",
  },
];

export default mockKanbanTaskList;
