export default function Divider({ className }: { className?: string }) {
  return (
    <div
      className={`w-full h-0.5 rounded-full bg-woodsmoke-200 dark:bg-woodsmoke-900 duration-300 ease-in-out
      ${className}`}
    />
  );
}
