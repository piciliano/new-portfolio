"use client";
import { forwardRef, ForwardedRef, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Project {
  title: string;
  link: string;
  image: string;
  tags: string[];
}

interface MyProjectsProps {
  containerRef?: ForwardedRef<HTMLDivElement>;
}

const MyProjects = forwardRef<HTMLDivElement, MyProjectsProps>(
  ({ containerRef }, ref) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const projectCardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

    const addToRefs = (el: HTMLAnchorElement | null, index: number) => {
      if (el && !projectCardsRef.current.includes(el)) {
        projectCardsRef.current[index] = el;
      }
    };

    gsap.registerPlugin(ScrollTrigger);

    const setRefs = (el: HTMLDivElement) => {
      if (!el) return;
      if (typeof containerRef === "function") {
        containerRef(el);
      } else if (containerRef && "current" in containerRef) {
        (
          containerRef as React.MutableRefObject<HTMLDivElement | null>
        ).current = el;
      }
      sectionRef.current = el;
    };

    useEffect(() => {
      if (!sectionRef.current) return;

      gsap.from([titleRef.current, descRef.current], {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      projectCardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 0.6,
          delay: index * 0.1,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        gsap.to(card, {
          y: -10,
          duration: 2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }, []);

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
        tags: ["Next.js", "Movies", "TMDB API"],
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
        tags: ["Fullstack", "Education"],
      },
      {
        title: "Simple Album",
        link: "https://simple-album.vercel.app/",
        image: "/simple-album.png",
        tags: ["Photo Gallery", "UI/UX"],
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
        tags: ["Web3", "Blockchain"],
      },
    ];

    return (
      <section
        ref={setRefs}
        id="meus-projetos"
        className="max-w-7xl mx-auto px-6 py-24 md:py-32"
      >
        <div className="flex flex-col items-center text-center mb-16">
          <div className="overflow-hidden mb-4">
            <h2
              ref={titleRef}
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
            <a
              key={project.title}
              ref={(el) => addToRefs(el, index)}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-bold text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white text-xs rounded-full border border-white/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center justify-center px-3 py-1 bg-indigo-600 text-white text-xs font-medium rounded-full shadow-lg group-hover:bg-white group-hover:text-indigo-600 transition-colors">
                  Ver Projeto
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>
    );
  }
);

MyProjects.displayName = "MeusProjetos";

export default MyProjects;
