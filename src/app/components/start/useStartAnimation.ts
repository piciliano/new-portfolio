import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useStartAnimation = (
  containerRef: React.ForwardedRef<HTMLDivElement>
) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const monitorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const techIconsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isClient, setIsClient] = useState(false);

  const setRefs = (el: HTMLDivElement) => {
    sectionRef.current = el;
    if (typeof containerRef === "function") {
      containerRef(el);
    } else if (containerRef && "current" in containerRef) {
      (containerRef as React.MutableRefObject<HTMLDivElement | null>).current =
        el;
    }
  };

  useEffect(() => {
    setIsClient(true);

    const isMobile = typeof window !== "undefined" && window.innerWidth <= 600;
    if (isMobile) return;

    const duration = isMobile ? 0.5 : 1.5;
    const ease = isMobile ? "power1.out" : "power3.out";
    const stagger = isMobile ? 0.08 : 0.15;

    if (!sectionRef.current) return;

    gsap.from(sectionRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 80,
      duration,
      ease,
    });

    const elements = textRef.current?.querySelectorAll("h2, h3, p");

    if (elements && elements.length > 0) {
      gsap.from(elements, {
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        x: -50,
        rotationY: 45,
        transformOrigin: "left center",
        stagger,
        duration: isMobile ? 0.5 : 1,
        ease: isMobile ? "power1.out" : "back.out(1.2)",
      });
    }

    if (monitorRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: monitorRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      tl.from(monitorRef.current, {
        opacity: 0,
        x: 100,
        rotationY: -45,
        transformOrigin: "right center",
        duration: 1.2,
        ease: "back.out(1.7)",
      });

      monitorRef.current.addEventListener("mousemove", (e) => {
        const rect = monitorRef.current?.getBoundingClientRect();
        if (!rect) return;

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateY = ((x - centerX) / centerX) * 10;
        const rotateX = ((centerY - y) / centerY) * 10;

        gsap.to(monitorRef.current, {
          rotationY: rotateY,
          rotationX: rotateX,
          transformPerspective: 1000,
          transformOrigin: "center center",
          ease: "power1.out",
          duration: 0.5,
        });
      });

      monitorRef.current.addEventListener("mouseleave", () => {
        gsap.to(monitorRef.current, {
          rotationY: 0,
          rotationX: 0,
          duration: 1,
          ease: "elastic.out(1, 0.5)",
        });
      });
    }

    techIconsRef.current.forEach((icon, i) => {
      if (!icon) return;

      const delay = i * 0.15;
      const startX = i % 2 === 0 ? -200 : 200;

      gsap.from(icon, {
        scrollTrigger: {
          trigger: icon,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        x: startX,
        scale: 1,
        duration: 1,
        delay,
        ease: "power3.out",
        onComplete: () => {
          gsap.to(icon, {
            y: 15,
            duration: 3,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay,
          });
        },
      });

      icon.addEventListener("mousemove", (e) => {
        const rect = icon.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        gsap.to(icon, {
          rotationY: ((x - centerX) / centerX) * 20,
          rotationX: ((centerY - y) / centerY) * -20,
          z: 50,
          duration: 0.3,
          transformOrigin: "center center",
          transformPerspective: 1000,
        });
      });

      icon.addEventListener("mouseleave", () => {
        gsap.to(icon, {
          rotationY: 0,
          rotationX: 0,
          z: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.3)",
        });
      });
    });
  }, []);

  return {
    isClient,
    setRefs,
    textRef,
    monitorRef,
    techIconsRef,
  };
};

export default useStartAnimation;
