"use client";
import { NavbarContext } from "@/context/NavbarContext";
import Link from "next/link";
import { ReactNode, useContext } from "react";

interface IHomeCardProps {
  name: string;
  path: string;
  label: string;
  icon: ReactNode;
  animationTime: number;
}

export default function HomeCard({
  name,
  path,
  label,
  icon,
  animationTime,
}: IHomeCardProps) {
  const { currentPage, selectCurrentPage, selectedLink } =
    useContext(NavbarContext);

  return (
    <Link
      href={path}
      aria-label={label}
      className="w-60 h-40 sm:w-72 sm:h-48 animate-move-in opacity-0"
      style={{ animationDelay: `${animationTime}ms` }}
      onClick={() => {
        selectCurrentPage(name);
        console.log(currentPage, selectedLink);
      }}
    >
      <article
        className={`
        flex flex-col items-center p-8 border rounded-2xl shadow-base bg-woodsmoke-50 border-woodsmoke-200 shadow-black/25 duration-300 ease-in-out
        hover:shadow-base-floating hover:shadow-black/15 hover:-translate-y-5 hover:bg-woodsmoke-100 hover:border-woodsmoke-300
      `}
      >
        <span className="text-[4rem] text-woodsmoke-950">{icon}</span>
        <h3 className="font-medium text-[2rem]">{label}</h3>
      </article>
    </Link>
  );
}
