"use client";
import React, { forwardRef, useRef } from "react";
import {
  FaReact,
  FaCss3Alt,
  FaHtml5,
  FaNodeJs,
  FaJs,
  FaBootstrap,
  FaSass,
} from "react-icons/fa";
import {
  SiStyledcomponents,
  SiExpress,
  SiNestjs,
  SiMongodb,
  SiTypescript,
  SiPostgresql,
  SiTypeorm,
  SiInsomnia,
  SiNextdotjs,
} from "react-icons/si";

import SkillIcon from "./SkillIcon";
import { useSkillsAnimation } from "./useSkillsAnimation";

const skillsData = [
  { icon: <FaReact className="text-[#61DAFB]" />, name: "React" },
  { icon: <FaCss3Alt className="text-[#1572B6]" />, name: "CSS3" },
  { icon: <FaHtml5 className="text-[#E34F26]" />, name: "HTML5" },
  { icon: <FaNodeJs className="text-[#339933]" />, name: "Node.js" },
  { icon: <FaJs className="text-[#F7DF1E]" />, name: "JavaScript" },
  { icon: <FaBootstrap className="text-[#7952B3]" />, name: "Bootstrap" },
  {
    icon: <SiStyledcomponents className="text-[#DB7093]" />,
    name: "Styled Components",
  },
  {
    icon: <SiExpress className="text-black dark:text-white" />,
    name: "Express",
  },
  { icon: <SiNestjs className="text-[#E0234E]" />, name: "NestJS" },
  { icon: <SiMongodb className="text-[#47A248]" />, name: "MongoDB" },
  { icon: <SiTypescript className="text-[#3178C6]" />, name: "TypeScript" },
  { icon: <SiPostgresql className="text-[#336791]" />, name: "PostgreSQL" },
  { icon: <FaSass className="text-[#CC6699]" />, name: "Sass" },
  { icon: <SiTypeorm className="text-[#E535AB]" />, name: "TypeORM" },
  { icon: <SiInsomnia className="text-[#5849BE]" />, name: "Insomnia" },
  { icon: <SiNextdotjs className="text-[#000000]" />, name: "Nextjs" },
];

const MySkills = forwardRef<
  HTMLElement,
  {
    titleRef?: React.RefObject<HTMLHeadingElement>;
    skillSpanRef?: React.RefObject<HTMLSpanElement>;
  }
>((props, ref) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const skillIconsRef = useRef<(HTMLDivElement | null)[]>([]);

  useSkillsAnimation(headingRef, textRef, sliderRef, skillIconsRef);

  return (
    <section
      ref={(el) => {
        if (el) {
          if (typeof ref === "function") {
            ref(el);
          } else if (ref) {
            ref.current = el;
          }
          sectionRef.current = el;
        }
      }}
      id="skills"
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 md:py-32 text-center"
    >
      <div className="w-full max-w-6xl mx-auto">
        <h2
          ref={props.titleRef ?? headingRef}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-indigo-600 dark:text-indigo-400 mb-4 sm:mb-6"
        >
          Minhas{" "}
          <span
            ref={props.skillSpanRef}
            className="text-gray-900 dark:text-white"
          >
            Skills
          </span>
        </h2>

        <p
          ref={textRef}
          className="text-gray-700 dark:text-gray-300 mx-auto mb-12 sm:mb-16 text-base sm:text-lg px-2 sm:px-4 max-w-[90%] sm:max-w-[85%] md:max-w-3xl"
        >
          Estas são as habilidades e ferramentas que tenho desenvolvido ao longo
          da minha jornada como desenvolvedor web fullstack. Cada tecnologia
          representa um passo no meu aprendizado e evolução, desde a criação de
          interfaces modernas e responsivas até a implementação de sistemas
          robustos.
        </p>

        <div
          ref={sliderRef}
          className="relative w-full py-4 sm:py-8 overflow-x-hidden"
        >
          <div className="flex animate-infinite-scroll gap-4 sm:gap-6 md:gap-8 w-max">
            {[...skillsData, ...skillsData].map((skill, i) => (
              <SkillIcon
                key={`${skill.name}-${i}`}
                ref={(el) => {
                  skillIconsRef.current[i] = el;
                }}
                icon={skill.icon}
                name={skill.name}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

MySkills.displayName = "MySkills";

export default MySkills;
