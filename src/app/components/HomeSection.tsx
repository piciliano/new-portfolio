"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Start from "./Start";
import About from "./About";
import MyProjects from "./MyProjects";
import MySkills from "./MySkills";

gsap.registerPlugin(ScrollTrigger);

export default function HomeSection() {
  const startRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const projetosRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startRef.current || !aboutRef.current || !projetosRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    tl.to(
      startRef.current,
      {
        y: -300,
        scale: 1.1,
        ease: "none",
      },
      0
    );

    tl.to(
      aboutRef.current,
      {
        y: -150,
        scale: 1.05,
        ease: "none",
      },
      0
    );

    tl.to(
      projetosRef.current,
      {
        y: -100,
        scale: 1.1,
        ease: "none",
      },
      0
    );

    tl.to(
      skillsRef.current,
      {
        y: -120,
        scale: 1.08,
        ease: "none",
      },
      0
    );

    return () => {
      ScrollTrigger.killAll();
      tl.kill();
    };
  }, []);

  return (
    <section className="flex flex-col gap-20 max-w-7xl mx-auto px-6 min-h-[200vh]">
      <Start containerRef={startRef} />
      <About containerRef={aboutRef} />
      <MyProjects containerRef={projetosRef} />
      <MySkills ref={skillsRef} />
    </section>
  );
}
