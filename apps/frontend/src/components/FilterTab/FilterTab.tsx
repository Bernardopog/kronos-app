import { ReactNode } from "react";
import Divider from "../Divider/Divider";

interface IFilterTabProps {
  children: ReactNode;
  title: string;
}

export default function FilterTab({ children, title }: IFilterTabProps) {
  return (
    <>
      <Divider />
      <h5 className="to-do-tabs-title">{title}</h5>
      {children}
    </>
  );
}
