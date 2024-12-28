import Link from "next/link";

export default function Header() {
  return (
    <header
      className="
        flex justify-center items-center h-16 bg-woodsmoke-950 
        lg:justify-start lg:px-4
      "
    >
      <Link href="/">
        <h1 className="text-[2rem] font-black text-woodsmoke-50">Kronos</h1>
      </Link>
    </header>
  );
}
