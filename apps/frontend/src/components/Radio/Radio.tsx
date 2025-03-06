"use client";

interface IRadioProps {
  label: string;
  value: string;
  htmlFor: string;
  collection: string;
  selected?: boolean;
  action?: () => void;
}
export default function Radio({
  label,
  htmlFor,
  value,
  collection,
  selected,
  action,
}: IRadioProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="flex items-center rounded-lg gap-x-2 bg-gradient-to-r from-woodsmoke-100 to-woodsmoke-200 cursor-pointer ease-in-out duration-300
      dark:from-woodsmoke-950 dark:to-woodsmoke-925
      "
      onClick={action}
      tabIndex={0}
    >
      <input
        className="peer absolute opacity-0"
        type="radio"
        id={htmlFor}
        name={collection}
        value={value}
        defaultChecked={selected}
      />

      <div
        className="
          flex justify-center items-center bg-woodsmoke-200 size-5 rounded-full duration-300 ease-in-out
          after:hidden after:bg-woodsmoke-700 after:size-2.5 after:rounded-full
          peer-checked:after:block
          dark:bg-woodsmoke-900
          dark:after:bg-woodsmoke-200
      "
      />
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
