"use client";

interface ICheckboxProps {
  label: string;
  htmlFor: string;
  action: () => void;
}

export default function Checkbox({ label, htmlFor, action }: ICheckboxProps) {
  return (
    <label htmlFor={htmlFor} className="flex items-center gap-x-2">
      <input
        type="checkbox"
        className="peer hidden"
        id={htmlFor}
        onChange={action}
      />
      <div
        className="
          flex justify-center items-center bg-woodsmoke-200 size-5 rounded-sm duration-300 ease-in-out
          after:hidden after:bg-woodsmoke-700 after:size-3 after:rounded-sm
          peer-checked:after:block
          dark:bg-woodsmoke-900
          dark:after:bg-woodsmoke-200
      "
      ></div>
      <span
        className="
          text-woodsmoke-500 duration-300 ease-in-out
          peer-checked:font-medium peer-checked:text-woodsmoke-950
          dark:text-woodsmoke-300
          dark:peer-checked:text-woodsmoke-50
        "
      >
        {label}
      </span>
    </label>
  );
}
