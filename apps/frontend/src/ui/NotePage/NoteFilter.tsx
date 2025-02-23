"use client";

import FilterTab from "@/components/FilterTab/FilterTab";
import Radio from "@/components/Radio/Radio";
import { NoteContext } from "@/context/NoteContext";
import { useContext } from "react";

export function NoteFilter({ state }: { state: boolean }) {
  const { changeFilterFavorite, changeFilterTag, tagList, filterTag } =
    useContext(NoteContext);

  return (
    <section
      className={`
        flex flex-col absolute z-10 w-full h-full p-4 gap-y-2 bg-woodsmoke-100 text-woodsmoke-950 ease-in-out duration-300
        dark:bg-woodsmoke-925 dark:text-woodsmoke-200
        ${state ? "top-0" : "-top-full"}
      `}
    >
      <h4 className="text-2xl font-medium">Filtro</h4>
      <FilterTab title="Favoritos">
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
      </FilterTab>
      <FilterTab title="Tag">
        <ul
          className="
          flex flex-col max-h-64 p-2 gap-y-2 border rounded-lg border-woodsmoke-800 overflow-y-auto scrollbar-none
          xs:grid xs:grid-cols-2 xs:gap-2
          sm:grid-cols-3
          md:grid-cols-4
          lg:flex
        "
        >
          <li
            className={`
                p-1 rounded-lg border border-woodsmoke-200 cursor-pointer ease-in-out duration-300
                hover:bg-woodsmoke-200
                active:bg-woodsmoke-300
                dark:hover:bg-woodsmoke-900
                dark:active:bg-woodsmoke-700
                ${filterTag === "all" && "bg-woodsmoke-200 dark:bg-woodsmoke-900"}
              `}
          >
            <button
              type="button"
              className="size-full"
              onClick={() => {
                changeFilterTag("all");
              }}
            >
              Todas
            </button>
          </li>
          {tagList.map((tag) => {
            return (
              <li
                className={`
                  p-1 rounded-lg border border-woodsmoke-200 cursor-pointer ease-in-out duration-300
                  hover:bg-woodsmoke-200
                  active:bg-woodsmoke-300
                  dark:hover:bg-woodsmoke-900
                  dark:active:bg-woodsmoke-700
                ${tag.id === filterTag && "bg-woodsmoke-200 dark:bg-woodsmoke-900"}
              `}
                key={tag.id}
              >
                <button
                  type="button"
                  className="size-full truncate"
                  onClick={() => {
                    changeFilterTag(tag.id);
                  }}
                >
                  {tag.tagName}
                </button>
              </li>
            );
          })}
        </ul>
      </FilterTab>
    </section>
  );
}
