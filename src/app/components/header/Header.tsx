"use client";
import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const base =
    "fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out";
  const style = scrolled
    ? "bg-gradient-to-b from-black/80 to-black/60 backdrop-blur-lg shadow-lg border-b border-indigo-500/20 py-2"
    : "bg-transparent py-4";

  const menuItems = [
    { label: "Início", id: "start" },
    { label: "Sobre", id: "about" },
    { label: "Meus Projetos", id: "myProjects" },
    { label: "Skills", id: "skills" },
    { label: "Contato", id: "contact" },
  ];

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute("href");
    if (!href) return;
    const id = href.substring(1);
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className={`${base} ${style}`}>
      <nav className="container mx-auto flex justify-between items-center px-6 md:px-8">
        <div className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          Neto Developer
        </div>
        <ul className="hidden md:flex space-x-8 text-lg">
          {menuItems.map(({ label, id }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={handleScrollToSection}
                className="relative text-white/90 hover:text-white transition-colors group"
              >
                {label}
                <span className="block h-0.5 bg-gradient-to-r from-indigo-400 to-purple-500 absolute bottom-[-4px] left-0 right-0 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </a>
            </li>
          ))}
        </ul>

        <button className="md:hidden text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </nav>
    </header>
  );
}
