import { AiFillCheckCircle, AiFillWarning } from "react-icons/ai";

interface IPasswordHintProps {
  pass: boolean;
  text: string;
}

export default function PasswordHint({ pass, text }: IPasswordHintProps) {
  return (
    <div
      className={`flex items-center gap-x-2 ${pass ? "text-apple-500" : "text-poppy-500"}`}
    >
      <span className="text-xl">
        {pass ? <AiFillCheckCircle /> : <AiFillWarning />}
      </span>
      <p>{text}</p>
    </div>
  );
}
