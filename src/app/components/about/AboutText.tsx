"use client";
import { forwardRef, ForwardedRef } from "react";

interface AboutTextProps {
  titleRef?: ForwardedRef<HTMLHeadingElement>;
}

const AboutText = forwardRef<HTMLDivElement, AboutTextProps>(
  ({ titleRef }, ref) => {
    return (
      <div
        ref={ref}
        className="md:w-3/5 space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed text-center md:text-left"
      >
        <h2
          ref={titleRef}
          className="text-4xl font-bold text-indigo-600 dark:text-indigo-400"
        >
          Sobre mim
        </h2>
        <p>
          Sou um desenvolvedor fullstack apaixonado por criar experiências web
          atraentes, responsivas e marcantes.
        </p>
        <p>
          Com habilidades essenciais, meu foco está em desenvolver designs
          estéticos, com alta performance e interatividade envolvente.
        </p>
        <p>
          Cada projeto que realizo reflete meu compromisso com os detalhes e a
          experiência do usuário.
        </p>
        <p>
          Explore meu portfólio para descobrir alguns dos trabalhos que já
          concluí, incluindo designs responsivos e soluções web inovadoras.
        </p>
        <p>
          Acredito que cada clique deve aproximar os usuários dos objetivos do
          negócio.
        </p>
        <p>
          Estou sempre aberto a colaborações e adoraria ajudar a transformar
          suas ideias criativas em realidade.
        </p>
        <p>
          Vamos conversar sobre como posso contribuir para realizar sua visão
          online. Obrigado pela sua visita!
        </p>
      </div>
    );
  }
);

AboutText.displayName = "AboutText";

export default AboutText;
