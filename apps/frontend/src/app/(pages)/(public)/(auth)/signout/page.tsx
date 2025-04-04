"use client";

import { AuthContext } from "@/context/AuthContext";
import { useContext, useEffect } from "react";

export default function SignOutPage() {
  const { logout } = useContext(AuthContext);
  useEffect(() => {
    logout();
    window.location.href = "/signin";
  });

  return (
    <div
      className="
      flex justify-center items-center font-bold text-2xl text-woodsmoke-950 bg-woodsmoke-100 
    dark:bg-woodsmoke-925 dark:text-woodsmoke-100"
      id="main"
    >
      Saindo...
    </div>
  );
}
