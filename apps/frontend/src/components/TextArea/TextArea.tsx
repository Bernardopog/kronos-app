import { Dispatch, SetStateAction } from "react";

interface ITextAreaProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  label: string;
  id: string;
}

export default function TextArea({
  value,
  setValue,
  label,
  id,
}: ITextAreaProps) {
  return (
    <div className="relative ">
      <textarea
        maxLength={250}
        id={id}
        value={value}
        onChange={(ev) => {
          setValue(ev.target.value);
        }}
        className="
          peer w-full min-h-16 max-h-32 rounded-lg px-2 py-1 border-b border-woodsmoke-300 bg-woodsmoke-100
          dark:border-woodsmoke-900 dark:bg-woodsmoke-925 dark:text-woodsmoke-200
        "
      />
      <label
        htmlFor={id}
        className={`
          absolute text-woodsmoke-600 duration-300 ease-in-out
          peer-focus:-top-6 peer-focus:left-0 peer-focus:font-bold peer-focus:text-woodsmoke-900
          dark:text-woodsmoke-300
          dark:peer-focus:text-woodsmoke-200
          ${value.length > 0 ? "-top-6 left-0" : "top-1 left-2"}
      `}
      >
        {label}
      </label>
    </div>
  );
}
