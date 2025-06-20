"use client";
import { useEffect, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useProjectsAnimation(
  containerRef: RefObject<HTMLDivElement | null>,
  titleRef: RefObject<HTMLHeadingElement | null>,
  descRef: RefObject<HTMLParagraphElement | null>,
  projectCardsRef: RefObject<(HTMLAnchorElement | null)[]>
) {
  useEffect(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth <= 600;
    if (isMobile) return;

    if (!containerRef.current) return;

    const duration = 0.8;
    const ease = "power3.out";
    const stagger = 0.2;

    gsap.from([titleRef.current, descRef.current], {
      y: 30,
      opacity: 0,
      duration,
      stagger,
      ease,
      scrollTrigger: {
        trigger: containerRef.current,
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
  }, [containerRef, titleRef, descRef, projectCardsRef]);
}
