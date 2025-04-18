import Calendar from "@/components/Calendar/Calendar";
import { KanbanTaskContext } from "@/context/KanbanTaskContext";
import { Dispatch, SetStateAction, useContext } from "react";

interface IDateChangerProps {
  newCompletionDate: Date | null;
  setNewCompletionDate: Dispatch<SetStateAction<Date | null>>;
}

export default function DateChanger({
  newCompletionDate,
  setNewCompletionDate,
}: IDateChangerProps) {
  const { selectedKanbanTask } = useContext(KanbanTaskContext);

  return (
    <section
      className="flex flex-col items-start gap-2 w-full
    md:flex-row"
    >
      <Calendar
        date={new Date(selectedKanbanTask!.creationDate)}
        setDate={() => {}}
        type="read"
      />
      <Calendar
        date={newCompletionDate ? new Date(newCompletionDate) : null}
        setDate={setNewCompletionDate}
        type="update"
      />
    </section>
  );
}
