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
  const startTitleRef = useRef<HTMLHeadingElement>(null);
  const aboutTitleRef = useRef<HTMLHeadingElement>(null);
  const projetosTitleRef = useRef<HTMLHeadingElement>(null);
  const skillsTitleRef = useRef<HTMLHeadingElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleId = useRef(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    const createParticles = () => {
      const newParticles: Particle[] = [];
      const particleCount = Math.floor(Math.random() * 3) + 2;

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
  }, [isClient]);

  useEffect(() => {
    if (!isClient) return;
    const titleRefs = [startTitleRef, aboutTitleRef, projetosTitleRef, skillsTitleRef];
    const handleScroll = () => {
      let found = false;
      for (const ref of titleRefs) {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          if (rect.bottom > 0 && rect.top < window.innerHeight) {
            if (iconRef.current) {
              iconRef.current.style.display = 'block';
              iconRef.current.style.position = 'fixed';
              gsap.to(iconRef.current, {
                top: rect.top,
                left: rect.left - 16 - iconRef.current.offsetWidth,
                duration: 0.4,
                ease: 'power2.out',
                onUpdate: () => {
                  if (iconRef.current && particlesContainerRef.current) {
                    const iconRect = iconRef.current.getBoundingClientRect();
                    particlesContainerRef.current.style.top = `${iconRect.top + iconRect.height / 2}px`;
                    particlesContainerRef.current.style.left = `${iconRect.left + iconRect.width / 2}px`;
                  }
                }
              });
            }
            found = true;
            break;
          }
        }
      }
      if (!found && iconRef.current) {
        iconRef.current.style.display = 'none';
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isClient]);

  return (
    <section className="relative z-10 flex flex-col gap-20 max-w-7xl mx-auto px-6 min-h-[200vh]">
      {isClient && (
        <div
          ref={iconRef}
          style={{ position: 'fixed', zIndex: 1000, display: 'none', pointerEvents: 'none', border: 'none', background: 'transparent' }}
        >
          <img
            src="/reactjs.png"
            alt="React Icon"
            className="w-10 h-10 object-contain rounded-full p-1 shadow-lg"
            style={{ background: 'transparent', border: 'none' }}
          />
        </div>
      )}

      {isClient && (
        <div
          ref={particlesContainerRef}
          className="fixed z-40 pointer-events-none"
          style={{ transformOrigin: "center center", top: 0, left: 0 }}
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
                boxShadow: `0 0 ${particle.size * 2}px ${particle.size / 2}px rgba(97, 218, 251, ${particle.alpha * 0.7})`,
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
        </div>
      )}

      <Start containerRef={startRef} titleRef={startTitleRef as React.RefObject<HTMLHeadingElement>} />
      <About containerRef={aboutRef} titleRef={aboutTitleRef as React.RefObject<HTMLHeadingElement>} />
      <MyProjects containerRef={projetosRef} titleRef={projetosTitleRef as React.RefObject<HTMLHeadingElement>} />
      <MySkills ref={skillsRef} titleRef={skillsTitleRef as React.RefObject<HTMLHeadingElement>} />
    </section>
  );
}
