import Checkbox from "@/ui/Checkbox";
import { Dispatch, SetStateAction } from "react";

interface IKanbanSectionControllerProps {
  showEmptyKanban: boolean;
  setShowEmptyKanban: Dispatch<SetStateAction<boolean>>;
  showOthersKanbans: boolean;
  setShowOthersKanbans: Dispatch<SetStateAction<boolean>>;
  showMyKanbans: boolean;
  setShowMyKanbans: Dispatch<SetStateAction<boolean>>;
}

export default function KanbanSectionController({
  showEmptyKanban,
  setShowEmptyKanban,
  showOthersKanbans,
  setShowOthersKanbans,
  showMyKanbans,
  setShowMyKanbans,
}: IKanbanSectionControllerProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <Checkbox
        label="Meus Kanbans"
        htmlFor="showMine"
        action={() => setShowMyKanbans(!showMyKanbans)}
        selected={showMyKanbans}
      />
      <Checkbox
        label="Outros Kanbans"
        htmlFor="showOthers"
        action={() => setShowOthersKanbans(!showOthersKanbans)}
      />
      <Checkbox
        label="Kanbans Vazios"
        htmlFor="showEmpty"
        action={() => setShowEmptyKanban(!showEmptyKanban)}
      />
    </div>
  );
}
