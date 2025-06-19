"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

import Start from "./Start";
import About from "./About";
import MyProjects from "./MyProjects";
import MySkills from "./MySkills";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  alpha: number;
  velocity: {
    x: number;
    y: number;
  };
  life: number;
};

export default function HomeSection() {
  const startRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const projetosRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const particlesContainerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleId = useRef(0);

  useEffect(() => {
    // Função para criar novas partículas
    const createParticles = () => {
      const newParticles: Particle[] = [];
      const particleCount = Math.floor(Math.random() * 3) + 2; // 2-4 partículas por frame

      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.2 + Math.random() * 0.5;

        newParticles.push({
          id: particleId.current++,
          x: 0,
          y: 0,
          size: 2 + Math.random() * 3,
          alpha: 0.7 + Math.random() * 0.3,
          velocity: {
            x: Math.cos(angle) * speed,
            y: Math.sin(angle) * speed,
          },
          life: 50 + Math.random() * 100,
        });
      }

      setParticles((prev) => [...prev, ...newParticles]);
    };

    // Animação das partículas
    let animationFrameId: number;
    const animateParticles = () => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.velocity.x,
            y: p.y + p.velocity.y,
            life: p.life - 1,
            alpha: p.alpha * 0.98,
            size: p.size * 0.99,
          }))
          .filter((p) => p.life > 0)
      );

      animationFrameId = requestAnimationFrame(animateParticles);
    };

    animationFrameId = requestAnimationFrame(animateParticles);
    const particleInterval = setInterval(createParticles, 100);

    // Restante do seu código de scroll e animação...
    let lastScrollY = window.scrollY;
    let rotation = 0;
    let scrollTimeout: NodeJS.Timeout;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const icon = iconRef.current;
      if (!icon) return;

      const direction = currentScrollY > lastScrollY ? 1 : -1;
      rotation += direction * 5;

      if (
        Math.sign(currentScrollY - lastScrollY) !==
        Math.sign(lastScrollY - (window.scrollY || 0))
      ) {
        gsap.to(icon, {
          scale: 1.2,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: "power1.out",
        });
      }

      gsap.to(icon, {
        rotation: rotation,
        duration: 0.3,
        ease: "power1.out",
      });

      lastScrollY = currentScrollY;

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        gsap.to(icon, {
          scale: 1,
          rotation: Math.round(rotation / 45) * 45,
          duration: 0.5,
          ease: "elastic.out(1, 0.5)",
        });
      }, 100);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    if (iconRef.current) {
      gsap.to(iconRef.current, {
        motionPath: {
          path: [
            { x: 0, y: 0 },
            { x: 80, y: 200 },
            { x: -120, y: 500 },
            { x: 80, y: 900 },
            { x: 0, y: 1200 },
          ],
          curviness: 1.2,
          autoRotate: false,
        },
        ease: "sine.inOut",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
        },
        onUpdate: () => {
          if (iconRef.current && particlesContainerRef.current) {
            const rect = iconRef.current.getBoundingClientRect();
            particlesContainerRef.current.style.transform = `translate(${
              rect.left + rect.width / 2
            }px, ${rect.top + rect.height / 2}px)`;
          }
        },
      });

      gsap.to(iconRef.current, {
        boxShadow: "0 0 15px 5px rgba(97, 218, 251, 0.7)",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
      },
    });

    if (
      startRef.current &&
      aboutRef.current &&
      projetosRef.current &&
      skillsRef.current
    ) {
      tl.to(startRef.current, { y: -150, scale: 1.05, ease: "sine.inOut" }, 0);
      tl.to(aboutRef.current, { y: -80, scale: 1.03, ease: "sine.inOut" }, 0);
      tl.to(
        projetosRef.current,
        { y: -60, scale: 1.05, ease: "sine.inOut" },
        0
      );
      tl.to(skillsRef.current, { y: -70, scale: 1.03, ease: "sine.inOut" }, 0);
    }

    return () => {
      clearInterval(particleInterval);
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", onScroll);
      clearTimeout(scrollTimeout);
      ScrollTrigger.killAll();
      tl.kill();
    };
  }, []);

  return (
    <section className="relative z-10 flex flex-col gap-20 max-w-7xl mx-auto px-6 min-h-[200vh]">
      {/* Container do ícone React */}
      <div
        ref={iconRef}
        className="w-16 aspect-square rounded-full fixed top-0 left-1/2 -translate-x-1/2 z-50 pointer-events-none flex items-center justify-center
        border-2 border-cyan-400/30 bg-cyan-500/10 backdrop-blur-[2px]"
      >
        <img
          src="/reactjs.png"
          alt="React Icon"
          className="w-full h-full object-contain rounded-full p-2 animate-[spin_20s_linear_infinite]"
        />
      </div>

      {/* Container das partículas (posicionamento absoluto) */}
      <div
        ref={particlesContainerRef}
        className="fixed top-0 left-0 z-40 pointer-events-none"
        style={{ transformOrigin: "center center" }}
      >
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-cyan-400 shadow-cyan-400/50"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.alpha,
              boxShadow: `0 0 ${particle.size * 2}px ${
                particle.size / 2
              }px rgba(97, 218, 251, ${particle.alpha * 0.7})`,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </div>

      <Start containerRef={startRef} />
      <About containerRef={aboutRef} />
      <MyProjects containerRef={projetosRef} />
      <MySkills ref={skillsRef} />
    </section>
  );
}
