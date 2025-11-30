import { Dispatch, ReactNode, SetStateAction, useState } from "react";

interface IAuthInputProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  icon: ReactNode;
  id: string;
  inputType: "text" | "email" | "password";
  placeholder: string;
  label: string;
  error: boolean;
  errorMessage: string;
}

export default function AuthInput({
  value,
  setValue,
  icon,
  id,
  inputType,
  placeholder,
  label,
  error,
  errorMessage,
}: IAuthInputProps) {
  const [editingInput, setEditingInput] = useState<boolean>(false);

  return (
    <label htmlFor={id} className="relative w-full">
      <span
        className={`absolute ease-in-out duration-300 
        ${editingInput || value.length > 0 ? "-top-6 left-0" : "top-1 left-2"}
        ${editingInput ? "font-bold" : "font-medium"}
        ${error ? "text-poppy-600" : "text-woodsmoke-950/75 dark:text-woodsmoke-100/75"}
      `}
      >
        {label}
      </span>
      <div
        className={`flex items-center justify-center absolute top-0 -right-px w-8 h-[calc(100%)] rounded-r-lg text-2xl text-woodsmoke-100
        dark:text-woodsmoke-950
          ${error ? "bg-poppy-600" : "bg-woodsmoke-950 dark:bg-woodsmoke-100"}
      `}
      >
        {icon}
      </div>
      <input
        type={inputType}
        placeholder={placeholder}
        id={id}
        onChange={(ev) => setValue(ev.target.value)}
        onFocus={() => setEditingInput(true)}
        onBlur={() => setEditingInput(false)}
        value={value}
        className={`w-full p-1 pl-2 pr-12 rounded-lg border bg-transparent ease-in-out duration-300
        placeholder:text-transparent
        ${editingInput ? "text-woodsmoke-950 dark:text-woodsmoke-100" : "text-woodsmoke-950/75 dark:text-woodsmoke-100/75"}
        ${error ? "border-poppy-600" : "border-woodsmoke-400 dark:border-woodsmoke-800"}`}
      />
      {error && (
        <span className="absolute right-0 -bottom-6 text-sm text-poppy-600">
          {errorMessage}
        </span>
      )}
    </label>
  );
}
