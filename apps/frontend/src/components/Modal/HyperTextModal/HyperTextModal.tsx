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
    <article className="flex flex-col absolute top-10 -right-2 w-96 h-96 p-2 pb-8 rounded-lg shadow-lg bg-woodsmoke-200 text-woodsmoke-950 dark:bg-woodsmoke-900 dark:text-woodsmoke-100">
      {hypertextData
        .filter((help) => help.page === helpPage)
        .map((help, idx) => (
          <React.Fragment key={idx}>
            <header className="font-bold text-lg text-center">
              {help.title}
            </header>
            <section className="flex flex-col flex-1 justify-between">
              <div>
                <p className="inline-block my-2 whitespace-pre-wrap">
                  {help.description}
                </p>
                {help.visualExample && (
                  <div className="p-2 rounded-lg whitespace-pre-wrap bg-woodsmoke-100 dark:bg-woodsmoke-950">
                    {help.visualExample}
                  </div>
                )}
              </div>
              <Button
                extraStyles={{
                  button: `mx-auto my-2 px-2 text-woodsmoke-900
                    dark:text-woodsmoke-200
                    hover:bg-woodsmoke-950
                  `,
                }}
                action={() => navigator.clipboard.writeText(help.example)}
                icon={<AiFillCopy />}
                label="Copiar Exemplo"
              />
            </section>
            <footer className="flex justify-center items-center absolute left-0 bottom-0 w-full h-8 gap-x-2 rounded-b-lg bg-woodsmoke-300 dark:bg-woodsmoke-800">
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
          </React.Fragment>
        ))}
    </article>
  );
}
