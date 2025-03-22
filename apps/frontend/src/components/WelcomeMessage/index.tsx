"use client";

import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

export default function WelcomeMessage() {
  const { user } = useContext(AuthContext);

  return (
    <h2 className="text-center text-[2rem] text-woodsmoke-950 dark:text-woodsmoke-50">
      Olá,
      <span className="font-bold capitalize">
        {user?.displayName ?? user?.username}
      </span>
      , seja bem-vindo!
    </h2>
  );
}
