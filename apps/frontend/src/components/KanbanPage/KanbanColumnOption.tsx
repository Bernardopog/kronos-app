"use client";
import { useState } from "react";
import ColorPicker from "../ColorPicker/ColorPicker";
import KanbanColumnOptionsFooter from "./KanbanColumnOptionsFooter";
import { IColumn } from "@/mock/kanban/mockKanbanColumns";

interface IKanbanColumnOptionProps {
  column: IColumn;
  isOptionsOpen: boolean;
}

export default function KanbanColumnOption({
  column,
  isOptionsOpen,
}: IKanbanColumnOptionProps) {
  const [hue, setHue] = useState<number>(column.color?.[0] ?? 0);
  const [saturation, setSaturation] = useState<number>(column.color?.[1] ?? 0);
  const [lightness, setLightness] = useState<number>(column.color?.[2] ?? 0);

  const columnColor = [hue, saturation, lightness];

  return (
    <div
      className={`relative bg-woodsmoke-200 duration-300 ease-in-out overflow-clip
        dark:bg-woodsmoke-925
        ${isOptionsOpen ? "h-full p-2 blur-0" : "h-0 blur-sm"}
      `}
    >
      <div className="flex items-center justify-between pr-4">
        <div
          style={{
            backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
          }}
          className="size-12 rounded-lg"
        />
        <div className="text-white">{`hsl(${hue}, ${saturation}%, ${lightness}%)`}</div>
      </div>
      <ColorPicker
        hue={hue}
        saturation={saturation}
        lightness={lightness}
        setHue={setHue}
        setSaturation={setSaturation}
        setLightness={setLightness}
      />
      <KanbanColumnOptionsFooter column={column} color={columnColor} />
    </div>
  );
}
