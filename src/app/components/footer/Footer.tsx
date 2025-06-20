"use client";

import { FiGithub, FiLinkedin, FiMail, FiInstagram } from "react-icons/fi";
import { SiWhatsapp } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-black/80 backdrop-blur-lg border-t border-indigo-500/20 py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        <div className="flex space-x-6 mb-4">
          <a
            href="https://github.com/piciliano"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-indigo-400 transition-colors duration-300 text-xl"
            aria-label="GitHub"
          >
            <FiGithub />
          </a>
          <a
            href="https://linkedin.com/in/picilianovasconcelos"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-indigo-400 transition-colors duration-300 text-xl"
            aria-label="LinkedIn"
          >
            <FiLinkedin />
          </a>
          <a
            href="mailto:picilianovasconcelos@gmail.com"
            className="text-white/70 hover:text-indigo-400 transition-colors duration-300 text-xl"
            aria-label="Email"
          >
            <FiMail />
          </a>
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-indigo-400 transition-colors duration-300 text-xl"
            aria-label="Instagram"
          >
            <FiInstagram />
          </a>
          <a
            href="https://wa.me/5582994300011"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-indigo-400 transition-colors duration-300 text-xl"
            aria-label="WhatsApp"
          >
            <SiWhatsapp />
          </a>
        </div>

        <div className="text-xs text-white/50">
          &copy; {new Date().getFullYear()} Todos os direitos reservados
        </div>
      </div>
    </footer>
  );
}
