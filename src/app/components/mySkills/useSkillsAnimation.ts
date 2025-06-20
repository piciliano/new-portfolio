"use client";
import { useEffect, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useSkillsAnimation(
  headingRef: RefObject<HTMLElement | null>,
  textRef: RefObject<HTMLElement | null>,
  sliderRef: RefObject<HTMLElement | null>,
  skillIconsRef: RefObject<(HTMLElement | null)[]>
) {
  useEffect(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth <= 600;
    if (isMobile) return;

    const duration = 0.8;
    const ease = "power3.out";
    const stagger = 0.05;

    if (headingRef.current) {
      gsap.from(headingRef.current, {
        y: 50,
        opacity: 0,
        duration,
        ease,
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }

    if (textRef.current) {
      gsap.from(textRef.current, {
        y: 50,
        opacity: 0,
        duration,
        delay: 0.2,
        ease,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }

    const skillIcons = skillIconsRef.current;

    const mouseEnterHandlers: Array<() => void> = [];
    const mouseLeaveHandlers: Array<() => void> = [];

    skillIcons.forEach((icon, i) => {
      if (!icon) return;

      gsap.from(icon, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        delay: i * stagger,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: sliderRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      const handleMouseEnter = () => {
        gsap.to(icon, {
          y: -10,
          scale: 1.1,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(icon, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      icon.addEventListener("mouseenter", handleMouseEnter);
      icon.addEventListener("mouseleave", handleMouseLeave);

      mouseEnterHandlers.push(handleMouseEnter);
      mouseLeaveHandlers.push(handleMouseLeave);
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      skillIcons.forEach((icon, i) => {
        if (!icon) return;
        icon.removeEventListener("mouseenter", mouseEnterHandlers[i]);
        icon.removeEventListener("mouseleave", mouseLeaveHandlers[i]);
      });
    };
  }, [headingRef, textRef, sliderRef, skillIconsRef]);
}
