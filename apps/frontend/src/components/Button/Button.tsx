"use client";

import { ReactNode } from "react";

interface IButtonProps {
  action?: () => void;
  children?: ReactNode;
  label?: string;
  ariaLabel?: string;
  icon?: ReactNode;
  extraStyles?: {
    label?: string;
    button?: string;
    icon?: string;
  };
  type?: "submit" | "button";
}

export default function Button({
  children,
  action,
  label,
  ariaLabel,
  icon,
  extraStyles,
  type,
}: IButtonProps) {
  return (
    <button
      title={ariaLabel ?? ""}
      onClick={action}
      aria-label={ariaLabel}
      className={`btn-base active:brightness-75 ${extraStyles?.button}`}
      type={type ?? "button"}
    >
      {(children || icon) && (
        <span className={`text-2xl ${extraStyles?.icon}`}>
          {children ?? icon}
        </span>
      )}
      {label && <span className={`${extraStyles?.label}`}>{label}</span>}
    </button>
  );
}
