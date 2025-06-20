"use client";
import { useEffect, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function useContactAnimation(
  containerRef: RefObject<HTMLDivElement | null>,
  titleRef: RefObject<HTMLHeadingElement | null>,
  descriptionRef: RefObject<HTMLParagraphElement | null>,
  formRef: RefObject<HTMLFormElement | null>,
  inputRefs: RefObject<(HTMLInputElement | HTMLTextAreaElement | null)[]>
) {
  useEffect(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth <= 600;
    if (isMobile) return;

    if (
      !containerRef.current ||
      !titleRef.current ||
      !descriptionRef.current ||
      !formRef.current ||
      !inputRefs.current
    ) {
      return;
    }

    const duration = 1;
    const ease = "elastic.out(1, 0.5)";
    const stagger = 0.3;

    const ctx = gsap.context(() => {
      gsap.from([titleRef.current, descriptionRef.current].filter(Boolean), {
        y: 50,
        opacity: 0,
        duration,
        stagger,
        ease,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(formRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        delay: 0.4,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      inputRefs.current.forEach((input, i) => {
        if (!input) return;

        gsap.from(input, {
          x: -50,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: input,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });

        const onMouseEnter = () => {
          gsap.to(input, {
            scale: 1.02,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
            duration: 0.3,
          });
        };

        const onMouseLeave = () => {
          gsap.to(input, {
            scale: 1,
            boxShadow: "none",
            duration: 0.3,
          });
        };

        input.addEventListener("mouseenter", onMouseEnter);
        input.addEventListener("mouseleave", onMouseLeave);

        // Remove os listeners no cleanup
        return () => {
          input.removeEventListener("mouseenter", onMouseEnter);
          input.removeEventListener("mouseleave", onMouseLeave);
        };
      });
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef, titleRef, descriptionRef, formRef, inputRefs]);
}
