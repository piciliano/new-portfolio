"use client";
import { useEffect, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useAnimation(
  sectionRef: RefObject<HTMLDivElement | null>,
  textRef: RefObject<HTMLDivElement | null>
) {
  useEffect(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth <= 600;
    if (isMobile) return;

    const duration = isMobile ? 0.5 : 1.3;
    const ease = isMobile ? "power1.out" : "power3.out";
    const stagger = isMobile ? 0.08 : 0.2;

    if (!sectionRef.current || !textRef.current) return;

    gsap.from(sectionRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 50,
      duration,
      ease,
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
        stagger,
        duration: isMobile ? 0.5 : 1,
        ease: isMobile ? "power1.out" : "power2.out",
      });
    }
  }, [sectionRef, textRef]);
}
