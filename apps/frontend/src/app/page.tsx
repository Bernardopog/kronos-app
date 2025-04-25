import { HomeCard } from "@/ui/Card";
import WelcomeMessage from "@/components/WelcomeMessage";
import linkList from "@/shared/linkList";

export default function Home() {
  return (
    <main
      className="
        bg-woodsmoke-50 overflow-y-auto scrollbar-thin scrollbar-thumb-woodsmoke-950 scrollbar-track-woodsmoke-100 duration-300 ease-in-out
        dark:bg-woodsmoke-925
        "
      id="main"
    >
      <header className="px-8 py-4">
        <WelcomeMessage />
      </header>
      <section
        className="
        flex flex-col items-center justify-start h-[calc(100%-6rem)] mt-6 gap-8
        lg:flex-row lg:justify-center lg:h-[calc(100%-7rem)]
      "
      >
        {linkList.map((link, idx) => (
          <HomeCard
            key={link.path}
            name={link.name}
            path={link.path}
            label={link.label}
            icon={link.icon}
            animationTime={250 * (idx + 1)}
          />
        ))}
      </section>
    </main>
  );
}
