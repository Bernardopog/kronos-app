"use client";

import { Button } from "@/ui/Button";
import Tab from "@/ui/Tab";
import Inert from "@/ui/Inert";
import Radio from "@/ui/Radio";
import { useEffect } from "react";
import { useNoteTagStore } from "@/store/NoteTagStore";
import { useShallow } from "zustand/shallow";
import { useNoteFilterStore } from "@/store/NoteFilterStore";

export default function NoteFilter({ state }: { state: boolean }) {
  const { filterController, filter } = useNoteFilterStore(
    useShallow((s) => ({
      filterController: s.filterController,
      filter: s.filter,
    })),
  );
  const { tagData, getTags } = useNoteTagStore(
    useShallow((s) => ({
      tagData: s.tagData,
      getTags: s.getTags,
    })),
  );
  const { fetched, list: tags } = tagData;

  useEffect(() => {
    if (fetched) return;
    getTags();
  }, [fetched, getTags]);

  return (
    <Inert
      value={state}
      style={`
        flex flex-col absolute z-10 w-full h-full p-4 gap-y-2 bg-woodsmoke-100 text-woodsmoke-950 ease-in-out duration-300
        dark:bg-woodsmoke-925 dark:text-woodsmoke-200
        ${state ? "top-0" : "-top-full"}
      `}
    >
      <h4 className="text-2xl font-medium">Filtro</h4>
      <Tab title="Favoritos">
        <Radio
          label="Todos"
          value="all"
          htmlFor="allFavorites"
          collection="favorite"
          selected={true}
          action={() => filterController("favorite", "all")}
        />
        <Radio
          label="Favoritos"
          value="favorites"
          htmlFor="favoritedFavorites"
          collection="favorite"
          action={() => filterController("favorite", "favorites")}
        />
        <Radio
          label="Não Favoritos"
          value="notFavorites"
          htmlFor="notFavorites"
          collection="favorite"
          action={() => filterController("favorite", "notFavorites")}
        />
      </Tab>
      <Tab title="Tag">
        <ul
          className="
          flex flex-col max-h-64 p-2 gap-y-2 border rounded-lg border-woodsmoke-800 overflow-y-auto scrollbar-none
          xs:grid xs:grid-cols-2 xs:gap-2
          sm:grid-cols-3
          md:grid-cols-4
          lg:flex
        "
        >
          <li>
            <Button
              extraStyles={{
                button: `size-full 
                ${filter.tag === "all" && "bg-woodsmoke-200 dark:bg-woodsmoke-900"}`,
              }}
              action={() => {
                filterController("tag", "all");
              }}
              label="Todas"
            />
          </li>
          {tags.map((tag) => {
            return (
              <li key={tag.id}>
                <Button
                  extraStyles={{
                    button: `size-full truncate
                    ${tag.id === filter.tag && "bg-woodsmoke-200 dark:bg-woodsmoke-900"}`,
                  }}
                  action={() => {
                    filterController("tag", tag.id);
                  }}
                  label={tag.tagName}
                />
              </li>
            );
          })}
        </ul>
      </Tab>
    </Inert>
  );
}
