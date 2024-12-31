import ToDoHeader from "@/ui/ToDoPage/ToDoHeader";
import ToDoTaskList from "@/ui/ToDoPage/ToDoTaskList";

export default function ToDoPage() {
  return (
    <main
      className="
        grid 
        page to-do-page-layout
      "
      id="main"
    >
      <ToDoHeader />
      <ToDoTaskList />
    </main>
  );
}
