"use client";
import React, { forwardRef, ForwardedRef, useRef, useCallback } from "react";
import useProjectsAnimation from "./useProjectsAnimation";
import ProjectCard from "./ProjectCard";

interface Project {
  title: string;
  link: string;
  image: string;
  tags: string[];
}

interface MyProjectsProps {
  containerRef?: ForwardedRef<HTMLDivElement>;
  titleRef?: React.RefObject<HTMLHeadingElement>;
}

const MyProjects = forwardRef<HTMLDivElement, MyProjectsProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ containerRef, titleRef }, _ref) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const projectCardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

    const addToRefs = useCallback(
      (el: HTMLAnchorElement | null, index: number) => {
        if (el) projectCardsRef.current[index] = el;
      },
      []
    );

    const setRefs = useCallback(
      (el: HTMLDivElement | null) => {
        if (!el) return;
        if (typeof containerRef === "function") {
          containerRef(el);
        } else if (containerRef && "current" in containerRef) {
          (
            containerRef as React.MutableRefObject<HTMLDivElement | null>
          ).current = el;
        }
        sectionRef.current = el;
      },
      [containerRef]
    );

    const internalTitleRef = useRef<HTMLHeadingElement>(null);
    const safeTitleRef = titleRef ?? internalTitleRef;

    useProjectsAnimation(sectionRef, safeTitleRef, descRef, projectCardsRef);

    const projects: Project[] = [
      {
        title: "Cripto App",
        link: "https://cripto-app-flame.vercel.app/",
        image: "/CriptMoeda.png",
        tags: ["React", "API", "Crypto"],
      },
      {
        title: "PrimeFlix",
        link: "https://prime-flix-zeta-one.vercel.app/",
        image: "/PrimeFlix.png",
        tags: ["Movies"],
      },
      {
        title: "Simple To-Do List",
        link: "https://simple-to-do-list-vert.vercel.app/",
        image: "/simple-todo-list.png",
        tags: ["React", "Productivity"],
      },
      {
        title: "Projeto Arnia",
        link: "https://github.com/piciliano/ProjetoArnia",
        image: "/arnia.png",
        tags: ["To-Do"],
      },

      {
        title: "GitFinder",
        link: "https://github-finder-kkan.vercel.app/",
        image: "/gitfinder.png",
        tags: ["GitHub API", "Search"],
      },
      {
        title: "Protocol",
        link: "https://protocol-frontend.vercel.app/",
        image: "/finalpng1.png",
        tags: ["React", "Typescript", "Fullstack"],
      },
      {
        title: "Simple Album",
        link: "https://simple-album.vercel.app/",
        image: "/simple-album.png",
        tags: ["Photo Gallery", "UI/UX"],
      },
    ];

    return (
      <section
        ref={setRefs}
        id="myProjects"
        className="max-w-7xl mx-auto px-6 py-24 md:py-32"
      >
        <div className="flex flex-col items-center text-center mb-16">
          <div className="overflow-hidden mb-4">
            <h2
              ref={safeTitleRef}
              className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-500"
            >
              Meus Projetos
            </h2>
          </div>

          <div className="overflow-hidden max-w-3xl">
            <p
              ref={descRef}
              className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
            >
              Explore minha jornada criativa através desta seleção de projetos.
              Cada trabalho representa soluções inovadoras que combinam design
              elegante com funcionalidade robusta, criando experiências digitais
              memoráveis.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              addToRefs={addToRefs}
            />
          ))}
        </div>
      </section>
    );
  }
);

MyProjects.displayName = "MeusProjetos";

export default MyProjects;
