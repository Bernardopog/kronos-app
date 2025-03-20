import Calendar from "@/components/Calendar/Calendar";
import { KanbanContext } from "@/context/KanbanContext";
import { Dispatch, SetStateAction, useContext } from "react";

interface IDateChangerProps {
  newCompletionDate: Date | null;
  setNewCompletionDate: Dispatch<SetStateAction<Date | null>>;
}

export default function DateChanger({
  newCompletionDate,
  setNewCompletionDate,
}: IDateChangerProps) {
  const { selectedKanbanTask } = useContext(KanbanContext);

  return (
    <section
      className="flex flex-col items-start gap-2 w-full
    md:flex-row"
    >
      <Calendar
        date={selectedKanbanTask!.creationDate}
        setDate={() => {}}
        type="read"
      />
      <Calendar
        date={newCompletionDate}
        setDate={setNewCompletionDate}
        type="update"
      />
    </section>
  );
}
