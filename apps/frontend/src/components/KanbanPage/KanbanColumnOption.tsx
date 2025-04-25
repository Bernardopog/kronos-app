"use client";
import { Dispatch, SetStateAction, useState } from "react";
import ColorPicker from "../ColorPicker/ColorPicker";
import KanbanColumnOptionsFooter from "./KanbanColumnOptionsFooter";
import { IColumn } from "@/mock/kanban/mockKanbanColumns";
import { Button } from "@/ui/Button/";

import { icons } from "@/icons/icons";
import Divider from "@/ui/Divider";

interface IKanbanColumnOptionProps {
  column: IColumn;
  setIsOptionsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function KanbanColumnOption({
  column,
  setIsOptionsOpen,
}: IKanbanColumnOptionProps) {
  const [hue, setHue] = useState<number>(column.color?.[0] ?? 0);
  const [saturation, setSaturation] = useState<number>(column.color?.[1] ?? 0);
  const [lightness, setLightness] = useState<number>(column.color?.[2] ?? 0);

  const [icon, setIcon] = useState<string>(column.icon ?? "");

  const columnColor = [hue, saturation, lightness];

  return (
    <>
      <section className="mb-2">
        <div className="flex items-center justify-between pr-4">
          <div
            style={{
              backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
            }}
            className="size-12 rounded-lg"
          />
          <p className="text-woodsmoke-950 dark:text-woodsmoke-100">{`hsl(${hue}, ${saturation}%, ${lightness}%)`}</p>
        </div>
        <ColorPicker
          hue={hue}
          saturation={saturation}
          lightness={lightness}
          setHue={setHue}
          setSaturation={setSaturation}
          setLightness={setLightness}
        />
      </section>
      <Divider />
      <ul
        className="grid grid-cols-7 gap-2 mt-2 p-2 border rounded-lg border-woodsmoke-300 bg-woodsmoke-200 ease-in-out duration-300
          dark:bg-woodsmoke-925 dark:border-woodsmoke-600"
        onKeyDown={(ev) => {
          if (ev.key === "Escape") {
            ev.currentTarget.blur();
          }
        }}
      >
        {Object.keys(icons).map((iconkey) => {
          return (
            <li key={iconkey} role="option" aria-selected={iconkey === icon}>
              <Button
                extraStyles={{
                  button: `text-woodsmoke-600 ease-in-out duration-300
                    hover:text-woodsmoke-950 hover:shadow-btn hover:shadow-woodsmoke-500/25
                    dark:text-woodsmoke-300 dark:hover:text-woodsmoke-100
                    ${iconkey === icon && "bg-apple-400 text-woodsmoke-925 hover:text-woodsmoke-950 dark:text-woodsmoke-925 dark:hover:text-woodsmoke-950"}
                  `,
                }}
                action={() => {
                  setIcon(iconkey);
                }}
                icon={icons[iconkey as keyof typeof icons]}
                ariaLabel={`${iconkey} Ícone`}
              />
            </li>
          );
        })}
      </ul>
      <KanbanColumnOptionsFooter
        column={column}
        color={columnColor}
        icon={icon}
        setIsOptionsOpen={setIsOptionsOpen}
      />
    </>
  );
}
