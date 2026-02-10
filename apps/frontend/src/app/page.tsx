import { HomeCard } from "@/ui/Card";
import WelcomeMessage from "@/components/WelcomeMessage";
import linkList from "@/shared/linkList";

export default function Home() {
  return (
    <main
      className="flex flex-col bg-woodsmoke-50 overflow-y-auto scrollbar-thin scrollbar-thumb-woodsmoke-950 scrollbar-track-woodsmoke-100 duration-300 ease-in-out dark:bg-woodsmoke-925"
      id="main"
    >
      <header className="px-8 py-2 lg:fixed lg:top-2 lg:left-1/2 lg:w-full lg:-translate-x-1/2">
        <WelcomeMessage />
      </header>

      <section className="flex-1 grid grid-cols-1 grid-rows-[repeat(3,60vh)] m-2 gap-2 p-2 pb-16 rounded-lg md:grid-cols-3 md:grid-rows-[calc(50vh-3rem-3.5rem)_calc(50vh-3rem-3.5rem)] lg:grid-cols-4 lg:grid-rows-[repeat(2,calc(28vh-3rem))_calc(44vh-2rem)] lg:pb-4">
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
