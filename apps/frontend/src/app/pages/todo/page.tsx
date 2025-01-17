import ToDoFilterButton from "@/ui/ToDoPage/ToDoFilterButton";
import ToDoHeader from "@/ui/ToDoPage/ToDoHeader";
import ToDoTaskFilter from "@/ui/ToDoPage/ToDoTaskFilter";
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
      <ToDoFilterButton />
      <ToDoTaskFilter />
    </main>
  );
}
