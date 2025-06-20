"use client";
import { useRef, forwardRef, ForwardedRef } from "react";

import AboutText from "./AboutText";
import useAnimation from "./UseAnimation";
import Image from "next/image";

interface AboutProps {
  containerRef?: ForwardedRef<HTMLDivElement>;
  titleRef?: React.RefObject<HTMLHeadingElement>;
}

const About = forwardRef<HTMLDivElement, AboutProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ containerRef, titleRef }, _ref) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

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

    useAnimation(sectionRef, textRef);

    return (
      <section
        id="about"
        ref={setRefs}
        className="max-w-5xl mx-auto px-6 py-24 md:py-32 flex flex-col md:flex-row items-center gap-10"
      >
        <AboutText ref={textRef} titleRef={titleRef} />
        <div className="md:w-2/5 w-full flex justify-center">
          <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full shadow-lg overflow-hidden">
            <Image
              src="/neto.png"
              alt="Foto do Neto"
              fill
              className="object-cover"
              priority={true} // opcional, pra carregar rápido no LCP
            />
          </div>
        </div>
      </section>
    );
  }
);

About.displayName = "About";

export default About;
