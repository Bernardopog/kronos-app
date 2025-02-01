interface IRecentTaskProps {
  title: string;
  animationDuration: number;
}

export default function RecentTask({
  title,
  animationDuration,
}: IRecentTaskProps) {
  return (
    <div className="overflow-clip">
      <p
        style={{ animationDelay: `${animationDuration}ms` }}
        className="
          animate-move-left-to-right opacity-0 text-woodsmoke-900
          dark:text-woodsmoke-400
        "
      >
        {title}
      </p>
    </div>
  );
}
