import { HomeCard } from "@/ui/Card";
import WelcomeMessage from "@/components/WelcomeMessage";
import linkList from "@/shared/linkList";

export default function Home() {
  return (
    <main
      className="flex flex-col bg-woodsmoke-50 overflow-y-auto scrollbar-thin scrollbar-thumb-woodsmoke-950 scrollbar-track-woodsmoke-100 duration-300 ease-in-out dark:bg-woodsmoke-925"
      id="main"
    >
      <header className="px-8 py-2">
        <WelcomeMessage />
      </header>

      <section className="flex-1 grid grid-cols-1 grid-rows-3 m-2 gap-2 p-2 pb-16 rounded-lg md:grid-cols-3 md:grid-rows-2 lg:grid-cols-4 lg:grid-rows-3">
        {linkList.map((linkData, index) => (
          <HomeCard
            name={linkData.name}
            position={(index + 1).toString()}
            key={linkData.path}
            href={linkData.path}
            label={linkData.label}
            icon={linkData.icon}
          />
        ))}
      </section>
    </main>
  );
}
