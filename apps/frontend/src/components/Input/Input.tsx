"use client";

import React, { Dispatch, SetStateAction, useState } from "react";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name?: string;
  id: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  errorMessage: string;
}

export default function Input({
  label,
  name,
  id,
  value,
  setValue,
  errorMessage,
}: IInputProps) {
  const [delayError, setDelayError] = useState<string>("");

  {
    setTimeout(() => {
      setDelayError(errorMessage);
    }, 50);
  }

  return (
    <div className="relative">
      <input
        type="text"
        name={name ?? id}
        id={id}
        className="
          peer w-full h-8 rounded-t-lg px-2 border-b border-woodsmoke-300 bg-woodsmoke-100 text-woodsmoke-950 
          dark:border-woodsmoke-900 dark:bg-woodsmoke-925 dark:text-woodsmoke-200
        "
        value={value}
        onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
          setValue(ev.target.value);
        }}
      />
      <label
        htmlFor={id}
        className={`
          absolute text-woodsmoke-600 duration-300 ease-in-out
          peer-focus:-top-6 peer-focus:left-0 peer-focus:font-bold peer-focus:text-woodsmoke-900
          dark:text-woodsmoke-300
          dark:peer-focus:text-woodsmoke-200
          ${value.length > 0 ? "-top-6 left-0" : "top-1 left-2"}`}
      >
        {label}
      </label>
      {errorMessage && (
        <span
          className="font-bold text-sm text-poppy-600"
          aria-live="assertive"
          aria-atomic="true"
        >
          {delayError}
        </span>
      )}
    </div>
  );
}
