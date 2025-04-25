"use client";

import { ReactNode } from "react";

interface ITabButtonProps {
  ariaLabel: string;
  icon: ReactNode;
  position: "left" | "right";
  action: () => void;
}

export default function TabButton({
  ariaLabel,
  icon,
  action,
  position,
}: ITabButtonProps) {
  return (
    <button
      className={`
          tab-button
          ${position === "left" ? "left-0 rounded-r-xl" : "right-0 rounded-l-xl"}
        `}
      onClick={action}
      aria-label={ariaLabel}
      type="button"
    >
      {icon}
    </button>
  );
}
