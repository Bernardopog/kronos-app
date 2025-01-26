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
        className="text-woodsmoke-900 animate-move-left-to-right opacity-0"
      >
        {title}
      </p>
    </div>
  );
}
