"use client";

import React, { useState } from "react";
import { AiFillCopy } from "react-icons/ai";
import hypertextData from "@/data/hypertextHelp";

import {
  IoMdArrowDropleftCircle,
  IoMdArrowDroprightCircle,
} from "react-icons/io";
import { Button } from "@/ui/Button";

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
        dark:after:border-b-woodsmoke-900
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
              <Button
                extraStyles={{
                  button: `mx-auto my-2 px-2 text-woodsmoke-900
                    dark:text-woodsmoke-200
                    hover:bg-woodsmoke-950
                  `,
                }}
                action={() =>
                  navigator.clipboard.writeText(hypertextHelp.example)
                }
                icon={<AiFillCopy />}
                label="Copiar Exemplo"
              />
            </React.Fragment>
          ))}
        <footer className="flex justify-center items-center absolute left-0 w-full h-8 gap-x-2 rounded-b-lg bg-woodsmoke-300 dark:bg-woodsmoke-800">
          <Button
            extraStyles={{ button: "border-none" }}
            action={() => changePage("back")}
            ariaLabel="Página Anterior"
            icon={<IoMdArrowDropleftCircle />}
          />
          <p>
            {helpPage}/{hypertextData.length}
          </p>
          <Button
            extraStyles={{ button: "border-none" }}
            action={() => changePage("front")}
            ariaLabel="Próxima Página"
            icon={<IoMdArrowDroprightCircle />}
          />
        </footer>
      </>
    </article>
  );
}
