"use client";

import React, { useState } from "react";
import { AiFillCopy } from "react-icons/ai";
import hypertextData from "@/data/hypertextHelp";

import {
  IoMdArrowDropleftCircle,
  IoMdArrowDroprightCircle,
} from "react-icons/io";

export default function HyperTextModal() {
  const [helpPage, setHelpPage] = useState<number>(1);

  const changePage = (direction: "back" | "front") => {
    if (direction === "back") {
      if (helpPage === 1) setHelpPage(hypertextData.length);
      else setHelpPage(helpPage - 1);
    } else if (direction === "front") {
      if (helpPage === hypertextData.length) setHelpPage(1);
      else setHelpPage(helpPage + 1);
    }
  };

  return (
    <article
      className="
        absolute top-16 -right-2 bg-woodsmoke-200 w-72 p-2 rounded-t-lg text-woodsmoke-950
        dark:bg-woodsmoke-900 dark:text-woodsmoke-100 whitespace-pre-wrap
        after:block after:absolute after:bottom-full after:right-4 after:border-[16px] after:border-transparent after:border-b-woodsmoke-200
        after:dark:border-b-woodsmoke-900
    "
    >
      <>
        {hypertextData
          .filter((hypertextHelp) => {
            return hypertextHelp.page === helpPage;
          })
          .map((hypertextHelp) => (
            <React.Fragment key={hypertextHelp.title}>
              <h2 className="min-h-12 text-center text-xl font-bold">
                {hypertextHelp.title}
              </h2>
              <p className="inline-block min-h-">{hypertextHelp.description}</p>
              <button
                className="flex justify-center items-center w-full my-2 p-1 gap-x-2 rounded-lg bg-woodsmoke-925 text-woodsmoke-100"
                type="button"
                onClick={() =>
                  navigator.clipboard.writeText(hypertextHelp.example)
                }
              >
                Copiar Exemplo
                <AiFillCopy />
              </button>
            </React.Fragment>
          ))}
        <footer className="flex justify-center items-center absolute left-0 w-full h-8 gap-x-2 rounded-b-lg bg-woodsmoke-300 dark:bg-woodsmoke-800">
          <button className="text-2xl" onClick={() => changePage("back")}>
            <IoMdArrowDropleftCircle />
          </button>
          <span>
            {helpPage}/{hypertextData.length}
          </span>
          <button className="text-2xl" onClick={() => changePage("front")}>
            <IoMdArrowDroprightCircle />
          </button>
        </footer>
      </>
    </article>
  );
}
