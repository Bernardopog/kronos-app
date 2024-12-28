"use client";

import { ReactNode } from "react";

interface IButtonProps {
  action?: () => void;
  children: ReactNode;
  label?: string;
  ariaLabel?: string;
  extraStyles?: {
    label?: string;
    button?: string;
  };
}

export default function Button({
  action,
  children,
  label,
  ariaLabel,
  extraStyles,
}: IButtonProps) {
  return (
    <button
      onClick={action}
      aria-label={ariaLabel}
      className={`flex items-center justify-center size-8 rounded-full shadow-base shadow-black/25 ${extraStyles?.button}`}
    >
      <span className={extraStyles?.label}>{label}</span>
      <span className={"text-2xl text-woodsmoke-50"}>{children}</span>
    </button>
  );
}
