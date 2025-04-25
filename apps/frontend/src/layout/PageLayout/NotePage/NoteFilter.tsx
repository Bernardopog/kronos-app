"use client";

import { Button } from "@/ui/Button";
import Tab from "@/ui/Tab";
import Inert from "@/ui/Inert";
import Radio from "@/ui/Radio";
import { NoteContext } from "@/context/NoteContext";
import { useContext } from "react";

export default function NoteFilter({ state }: { state: boolean }) {
  const { changeFilterFavorite, changeFilterTag, tagList, filterTag } =
    useContext(NoteContext);

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
          action={() => changeFilterFavorite("all")}
        />
        <Radio
          label="Favoritos"
          value="favorites"
          htmlFor="favoritedFavorites"
          collection="favorite"
          action={() => changeFilterFavorite("favorites")}
        />
        <Radio
          label="Não Favoritos"
          value="notFavorites"
          htmlFor="notFavorites"
          collection="favorite"
          action={() => changeFilterFavorite("notFavorites")}
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
                ${filterTag === "all" && "bg-woodsmoke-200 dark:bg-woodsmoke-900"}`,
              }}
              action={() => {
                changeFilterTag("all");
              }}
              label="Todas"
            />
          </li>
          {tagList.map((tag) => {
            return (
              <li key={tag.id}>
                <Button
                  extraStyles={{
                    button: `size-full truncate
                    ${tag.id === filterTag && "bg-woodsmoke-200 dark:bg-woodsmoke-900"}`,
                  }}
                  action={() => {
                    changeFilterTag(tag.id);
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
