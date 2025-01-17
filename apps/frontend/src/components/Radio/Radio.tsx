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
      className="flex items-center gap-x-2"
      onClick={action}
    >
      <input
        className="peer hidden"
        type="radio"
        id={htmlFor}
        name={collection}
        value={value}
        defaultChecked={selected}
      />

      <div
        className="
      flex justify-center items-center bg-woodsmoke-200 size-5 rounded-full
        after:hidden after:bg-woodsmoke-700 after:size-2.5 after:rounded-full
        peer-checked:after:block
      "
      ></div>
      <span
        className="
          text-woodsmoke-500 
          peer-checked:font-medium peer-checked:text-woodsmoke-950 
        "
      >
        {label}
      </span>
    </label>
  );
}
