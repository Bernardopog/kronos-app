import { ReactNode } from "react";

interface ITabCloseButtonProps {
  action: () => void;
  icon: ReactNode;
  ariaLabel: string;
}

export default function TabCloseButton({
  action,
  ariaLabel,
  icon,
}: ITabCloseButtonProps) {
  return (
    <button
      className="
        absolute right-8 z-50 flex items-center justify-center size-8 border rounded-full text-2xl border-woodsmoke-200 bg-woodsmoke-50 text-woodsmoke-950 duration-300 ease-in-out
        hover:bg-woodsmoke-100
        dark:bg-woodsmoke-900 dark:border-woodsmoke-600 dark:text-woodsmoke-50
        dark:hover:bg-woodsmoke-950
        lg:hidden
      "
      onClick={action}
      aria-label={ariaLabel}
      type="button"
    >
      {icon}
    </button>
  );
}
