"use client";
import { useEffect, useState } from "react";
import { throttle } from "lodash";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = throttle(() => {
      setScrolled(window.scrollY > 50);
    }, 100);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const base =
    "fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out";
  const style = scrolled
    ? "bg-gradient-to-b from-black/80 to-black/60 backdrop-blur-lg shadow-lg border-b border-indigo-500/20 py-2"
    : "bg-transparent py-4";

  return (
    <header className={`${base} ${style}`}>
      <nav className="container mx-auto flex justify-between items-center px-6 md:px-8">
        <div className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          Neto Developer
        </div>
        <ul className="hidden md:flex space-x-8 text-lg">
          {["Início", "Sobre", "Projetos", "Tecnologias", "Contato"].map(
            (item) => (
              <li key={item}>
                <a
                  href={`#${item}`}
                  className="relative text-white/90 hover:text-white transition-colors group"
                >
                  {item}
                  <span className="block h-0.5 bg-gradient-to-r from-indigo-400 to-purple-500 absolute bottom-[-4px] left-0 right-0 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                </a>
              </li>
            )
          )}
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
