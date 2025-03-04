"use client";
import { ReactNode, useEffect, useRef } from "react";

interface IInertProps {
  children: ReactNode;
  value: boolean;
  style?: string;
}

export default function Inert({ children, value, style }: IInertProps) {
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (elementRef.current) {
      elementRef.current.inert = !value;
    }
  }, [value]);

  return (
    <div className={`${style}`} ref={elementRef}>
      {children}
    </div>
  );
}
