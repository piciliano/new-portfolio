"use client";
import { useEffect, useRef, useState, forwardRef, ForwardedRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AboutProps {
  containerRef?: ForwardedRef<HTMLDivElement>;
  titleRef?: React.RefObject<HTMLHeadingElement>;
}

const About = forwardRef<HTMLDivElement, AboutProps>(
  ({ containerRef, titleRef }, ref) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    const [isClient, setIsClient] = useState(false);

    const setRefs = (el: HTMLDivElement) => {
      sectionRef.current = el;
      if (typeof containerRef === "function") {
        containerRef(el);
      } else if (containerRef && "current" in containerRef) {
        (
          containerRef as React.MutableRefObject<HTMLDivElement | null>
        ).current = el;
      }
    };

    useEffect(() => {
      setIsClient(true);

      if (!sectionRef.current || !textRef.current) return;

      gsap.from(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 50,
        duration: 1.3,
        ease: "power3.out",
      });

      const elements = textRef.current.querySelectorAll("h2, p");

      if (elements.length > 0) {
        gsap.from(elements, {
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 30,
          stagger: 0.2,
          duration: 1,
          ease: "power2.out",
        });
      }
    }, []);

    return (
      <section
        id="about"
        ref={setRefs}
        className="max-w-5xl mx-auto px-6 py-24 md:py-32 flex flex-col md:flex-row items-center gap-10"
      >
        <div
          ref={textRef}
          className="md:w-3/5 space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed text-center md:text-left"
        >
          <h2
            ref={titleRef}
            className="text-4xl font-bold text-indigo-600 dark:text-indigo-400"
          >
            Sobre mim
          </h2>
          <p>
            Sou um desenvolvedor fullstack apaixonado por criar experiências web
            atraentes, responsivas e marcantes.
          </p>
          <p>
            Com habilidades essenciais, meu foco está em desenvolver designs
            estéticos, com alta performance e interatividade envolvente.
          </p>
          <p>
            Cada projeto que realizo reflete meu compromisso com os detalhes e a
            experiência do usuário.
          </p>
          <p>
            Explore meu portfólio para descobrir alguns dos trabalhos que já
            concluí, incluindo designs responsivos e soluções web inovadoras.
          </p>
          <p>
            Acredito que cada clique deve aproximar os usuários dos objetivos do
            negócio.
          </p>
          <p>
            Estou sempre aberto a colaborações e adoraria ajudar a transformar
            suas ideias criativas em realidade.
          </p>
          <p>
            Vamos conversar sobre como posso contribuir para realizar sua visão
            online. Obrigado pela sua visita!
          </p>
        </div>
        <div className="md:w-2/5 w-full flex justify-center">
          <img
            src="/neto.png"
            alt="Foto do Neto"
            className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full shadow-lg"
          />
        </div>
      </section>
    );
  }
);

About.displayName = "About";

export default About;
