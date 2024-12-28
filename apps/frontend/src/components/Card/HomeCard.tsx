import Link from "next/link";
import { ReactNode } from "react";

interface IHomeCardProps {
  path: string;
  label: string;
  icon: ReactNode;
  animationTime: number;
}

export default function HomeCard({
  path,
  label,
  icon,
  animationTime,
}: IHomeCardProps) {
  return (
    <Link
      href={path}
      aria-label={label}
      className="w-60 h-40 sm:w-72 sm:h-48 animate-move-in opacity-0"
      style={{ animationDelay: `${animationTime}ms` }}
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
