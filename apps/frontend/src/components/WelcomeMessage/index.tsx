"use client";

import { AuthContext } from "@/context/AuthContext";
import { useContext, useEffect, useRef, useState } from "react";

export default function WelcomeMessage() {
  const { user, updateUserDisplayName } = useContext(AuthContext);

  const [isEditingName, setIsEditingName] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setNewDisplayName(user?.displayName ?? user?.username ?? "");
  }, [user?.displayName, user?.username]);

  function handleUpdateDisplayName() {
    if (newDisplayName === user?.displayName) return setIsEditingName(false);
    if (newDisplayName?.trim() === "") return setIsEditingName(false);
    if (!newDisplayName) return setIsEditingName(false);
    updateUserDisplayName(newDisplayName);
    setIsEditingName(false);
  }

  return (
    <h2 className="text-center text-[2rem] text-woodsmoke-950 dark:text-woodsmoke-50">
      Olá,
      {isEditingName ? (
        <input
          ref={inputRef}
          type="text"
          className="border rounded-lg border-woodsmoke-200 dark:border-woodsmoke-800"
          value={newDisplayName}
          onChange={(ev) => setNewDisplayName(ev.target.value)}
          onBlur={() => handleUpdateDisplayName()}
          onKeyDown={(ev) => ev.key === "Enter" && handleUpdateDisplayName()}
        />
      ) : (
        <span
          className="inline-block font-bold capitalize px-2 border rounded-lg border-woodsmoke-200 cursor-pointer dark:border-woodsmoke-800"
          onClick={() => {
            setIsEditingName(true);
            setTimeout(() => inputRef.current?.focus(), 100);
          }}
        >
          {user?.displayName ?? user?.username}
        </span>
      )}
      , seja bem-vindo(a)!
    </h2>
  );
}
