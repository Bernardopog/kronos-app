import { ReactNode } from "react";
import Divider from "../Divider";

interface ITabProps {
  children: ReactNode;
  title: string;
}

export default function Tab({ children, title }: ITabProps) {
  return (
    <>
      <Divider />
      <h5 className="tab-title">{title}</h5>
      {children}
    </>
  );
}
