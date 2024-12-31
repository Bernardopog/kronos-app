interface IPriorityButtonProps {
  label: string;
  animationDelay: number;
  bgColor: string;
  action: () => void;
}

export default function PriorityButton({
  label,
  animationDelay,
  bgColor,
  action,
}: IPriorityButtonProps) {
  return (
    <button
      role="menuitem"
      style={{ animationDelay: `${animationDelay}s` }}
      type="button"
      className={`priority-btn ${bgColor}`}
      onClick={action}
    >
      {label}
    </button>
  );
}
