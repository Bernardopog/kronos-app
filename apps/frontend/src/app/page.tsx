import HomeCard from "@/components/Card/HomeCard";
import linkList from "@/shared/linkList";

export default function Home() {
  return (
    <main
      className="
        bg-woodsmoke-50 overflow-y-auto scrollbar-thin scrollbar-thumb-woodsmoke-950 scrollbar-track-woodsmoke-100
        dark:bg-woodsmoke-925
        "
      id="main"
    >
      <header className="px-8 py-4">
        <h2 className="text-[2rem] text-woodsmoke-950 dark:text-woodsmoke-50">
          Olá, <span className="font-bold">John Doe</span>, seja bem-vindo!
        </h2>
      </header>
      <section
        className="
        flex flex-col items-center justify-center h-full gap-8
        md:gap-4
        lg:flex-row lg:h-[calc(100%-6rem)]
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
