"use client";
import { forwardRef, ForwardedRef, useCallback } from "react";
import useStartAnimation from "./useStartAnimation";
import Image from "next/image";

interface StartProps {
  containerRef?: ForwardedRef<HTMLDivElement>;
  titleRef?: React.RefObject<HTMLHeadingElement>;
}

const Start = forwardRef<HTMLDivElement, StartProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ containerRef, titleRef }, _ref) => {
    const { isClient, setRefs, textRef, monitorRef, techIconsRef } =
      useStartAnimation(containerRef || null);

    const scrollToProjects = useCallback(() => {
      const el = document.getElementById("myProjects");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, []);

    const whatsappLink = "https://wa.me/5582994300011";

    return (
      <section
        id="start"
        ref={setRefs}
        className="max-w-7xl mx-auto px-6 py-24 md:py-50 flex flex-col md:flex-row items-center gap-16 relative overflow-hidden"
      >
        <div className="absolute -right-64 bottom-0 w-64 h-64 bg-blue-500/5 rounded-full blur-2xl -z-10 transform rotate-45"></div>

        <div ref={textRef} className="md:w-1/2 space-y-8 perspective-1000">
          <div className="space-y-2 transform-style-preserve-3d">
            <span className="text-indigo-500 font-medium tracking-wider transform-style-preserve-3d"></span>
            <h2
              ref={titleRef}
              className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent mb-3 transform-style-preserve-3d"
            >
              Olá, Eu sou o Neto
            </h2>
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 transform-style-preserve-3d">
              Desenvolvedor <span className="text-indigo-500">Fullstack</span>
            </h3>
          </div>

          <div className="space-y-5 text-gray-600 dark:text-gray-300 leading-relaxed transform-style-preserve-3d">
            <p className="transform-style-preserve-3d">
              Bem-vindo ao meu portfólio! Sou um desenvolvedor web full-stack
              apaixonado por criar aplicações eficientes, escaláveis e
              visualmente impressionantes.
            </p>
            <p className="transform-style-preserve-3d">
              Especializado em soluções completas, desde interfaces imersivas
              até arquiteturas back-end robustas, com foco em performance e
              experiência do usuário.
            </p>
            <p className="transform-style-preserve-3d">
              Minha abordagem combina design inovador com código limpo,
              transformando conceitos em realidades digitais impactantes.
            </p>
          </div>

          <div className="flex gap-4 pt-4 transform-style-preserve-3d">
            <button
              onClick={scrollToProjects}
              className="px-8 py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-rotate-1 shadow-lg shadow-indigo-500/20"
            >
              Explorar Projetos
            </button>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all duration-300 hover:scale-105 hover:rotate-1 shadow-sm inline-flex items-center justify-center"
            >
              Contato Direto
            </a>
          </div>
        </div>

        <div
          ref={monitorRef}
          className="relative md:w-1/2 w-full max-w-[500px] h-[500px] perspective-1000 transform-style-preserve-3d"
        >
          <div className="absolute inset-0 bg-gray-900 rounded-2xl shadow-2xl overflow-hidden transform-style-preserve-3d transition-transform duration-500">
            <div className="absolute top-0 left-0 right-0 h-10 bg-gray-800 rounded-t-2xl flex items-center px-5">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="ml-3 text-xs text-gray-400">terminal — zsh</div>
            </div>

            <div className="absolute top-10 left-0 right-0 bottom-0 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-6 overflow-hidden">
              <div className="w-full h-full relative">
                <div className="absolute inset-0 overflow-auto text-green-400 font-mono text-xs md:text-sm p-4 opacity-80">
                  {isClient &&
                    Array.from({ length: 50 }).map((_, i) => (
                      <div key={i} className="whitespace-pre">
                        {i % 3 === 0 && (
                          <span className="text-blue-400">const</span>
                        )}
                        {i % 3 === 1 && (
                          <span className="text-purple-400">function</span>
                        )}
                        {i % 3 === 2 && (
                          <span className="text-yellow-400">return</span>
                        )}
                        {` developer = new FullstackDeveloper({`}
                        {i % 2 === 0 && `\n  name: "Neto",`}
                        {i % 2 === 1 && `\n  specialty: "React/Node",`}
                        {`\n  passion: "Creating amazing web experiences"`}
                        {`\n});`}
                      </div>
                    ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-white mb-4 animate-bounce">
                      👨‍💻
                    </div>
                    <p className="text-gray-400 mt-2">Fullstack Developer</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-8 left-1/4 right-1/4 h-8 bg-gray-700 rounded-b-lg transform-style-preserve-3d"></div>
          </div>

          {[
            {
              src: "/javascript.svg",
              alt: "JavaScript",
              pos: "top-12 left-12",
            },
            { src: "/reactjs.png", alt: "ReactJS", pos: "top-12 right-12" },
            {
              src: "/typescript.svg",
              alt: "TypeScript",
              pos: "bottom-12 left-1/4",
            },
            { src: "/nodejs.svg", alt: "Node.js", pos: "bottom-12 right-1/4" },
            { src: "/next.svg", alt: "Next.js", pos: "top-1/4 left-1/4" },
            {
              src: "/tailwindcss.svg",
              alt: "Tailwind CSS",
              pos: "top-1/4 right-1/4",
            },
          ].map((tech, index) => (
            <div
              key={tech.alt}
              ref={(el) => {
                techIconsRef.current[index] = el;
              }}
              className={`absolute w-12 h-12 md:w-20 md:h-20 ${tech.pos} rounded-2xl shadow-xl p-2 cursor-pointer transform-style-preserve-3d transition-transform duration-300 hover:z-10 hover:shadow-2xl will-change-transform`}
            >
              <Image
                src={tech.src}
                alt={tech.alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 5rem, 6rem"
              />

              <div className="absolute inset-0 rounded-2xl border-none hover:border-2 hover:border-indigo-400 transition-all duration-300"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }
);

Start.displayName = "Start";

export default Start;
