import {
  ToDoFilterButton,
  ToDoGeneralInfo,
  ToDoGeneralInfoButton,
  ToDoHeader,
  ToDoTaskFilter,
  ToDoTaskList,
} from "@/layout/PageLayout/ToDoPage";

export default function ToDoPage() {
  return (
    <main
      className="
        grid overflow-clip
        page to-do-page-layout
      "
      id="main"
    >
      <ToDoHeader />
      <ToDoTaskList />
      <ToDoFilterButton />
      <ToDoGeneralInfoButton />
      <ToDoTaskFilter />
      <ToDoGeneralInfo />
    </main>
  );
}
