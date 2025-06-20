"use client";
import React, { useState, useRef, useEffect } from "react";
import { z } from "zod";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";
import {
  FaPaperPlane,
  FaSpinner,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaComment,
} from "react-icons/fa";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const contactFormSchema = z.object({
  firstName: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Por favor, insira um e-mail válido"),
  phone: z
    .string()
    .min(11, "Telefone deve ter pelo menos 11 dígitos")
    .optional(),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

interface ContactProps {
  containerRef?: React.RefObject<HTMLDivElement>;
  titleRef?: React.RefObject<HTMLHeadingElement>;
  contactSpanRef?: React.RefObject<HTMLSpanElement>;
}

const Contact: React.FC<ContactProps> = ({ containerRef, titleRef, contactSpanRef }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const localContainerRef = useRef<HTMLDivElement>(null);
  const localTitleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRefs = useRef<(HTMLInputElement | HTMLTextAreaElement | null)[]>(
    []
  );

  const finalContainerRef = containerRef || localContainerRef;
  const finalTitleRef = titleRef || localTitleRef;

  useEffect(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth <= 600;
    if (isMobile) return;

    const duration = 1;
    const ease = "elastic.out(1, 0.5)";
    const stagger = 0.3;

    const ctx = gsap.context(() => {
      gsap.from([finalTitleRef.current, descriptionRef.current], {
        y: 50,
        opacity: 0,
        duration,
        stagger,
        ease,
        scrollTrigger: {
          trigger: finalContainerRef.current,
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

        input.addEventListener("mouseenter", () => {
          gsap.to(input, {
            scale: 1.02,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
            duration: 0.3,
          });
        });

        input.addEventListener("mouseleave", () => {
          gsap.to(input, {
            scale: 1,
            boxShadow: "none",
            duration: 0.3,
          });
        });
      });
    }, finalContainerRef);

    return () => ctx.revert();
  }, [finalContainerRef, finalTitleRef]);

  const validateForm = (data: ContactFormData): boolean => {
    try {
      contactFormSchema.parse(data);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<ContactFormData> = {};
        error.errors.forEach((err) => {
          const path = err.path[0] as keyof ContactFormData;
          newErrors[path] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (validateForm(formData)) {
      try {
        await emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
          formData,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
        );

        gsap.from(".success-message", {
          y: 50,
          opacity: 0,
          scale: 0.8,
          duration: 0.8,
          ease: "back.out(1.7)",
        });

        setSubmitSuccess(true);
        setFormData({
          firstName: "",
          email: "",
          phone: "",
          message: "",
        });

        setTimeout(() => setSubmitSuccess(false), 5000);
      } catch (error) {
        console.error("Erro ao enviar mensagem:", error);
        alert("Erro ao enviar mensagem. Tente novamente mais tarde.");
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section
      ref={finalContainerRef}
      id="contact"
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 dark:opacity-5">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM3ODUyYjMiIGZpbGwtb3BhY2l0eT0iMC4yIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00eiIvPjwvZz48L2c+PC9zdmc+')]"></div>
        </div>
      </div>

      <div className="relative w-full max-w-6xl mx-auto text-center z-10">
        <h2
          ref={finalTitleRef}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-indigo-600 dark:text-indigo-400 mb-6 sm:mb-8"
        >
          Entre em{" "}
          <span ref={contactSpanRef} className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            Contato
          </span>
        </h2>

        <p
          ref={descriptionRef}
          className="text-gray-700 dark:text-gray-300 mx-auto mb-12 sm:mb-16 text-lg sm:text-xl px-2 sm:px-4 max-w-[90%] sm:max-w-[85%] md:max-w-3xl"
        >
          Vamos transformar suas ideias em realidade. Preencha o formulário
          abaixo e eu entrarei em contato o mais rápido possível.
        </p>

        <div className="relative w-full max-w-2xl mx-auto">
          {submitSuccess && (
            <div className="success-message mb-8 p-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl shadow-lg transition-all duration-300">
              Mensagem enviada com sucesso! Entrarei em contato em breve.
            </div>
          )}

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-800 p-8 sm:p-10 rounded-2xl shadow-2xl backdrop-blur-sm border border-gray-100 dark:border-gray-700"
          >
            <div className="mb-8 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-indigo-500 dark:text-indigo-400">
                <FaUser />
              </div>
              <input
                ref={(el) => {
                  inputRefs.current[0] = el;
                }}
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Seu nome completo"
                className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 ${
                  errors.firstName
                    ? "border-red-500"
                    : "border-gray-200 dark:border-gray-700 focus:border-indigo-500"
                } bg-white/80 dark:bg-gray-700/80 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all duration-300`}
              />
              {errors.firstName && (
                <p className="mt-2 text-sm text-red-500 animate-pulse">
                  {errors.firstName}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-indigo-500 dark:text-indigo-400">
                  <FaEnvelope />
                </div>
                <input
                  ref={(el) => {
                    inputRefs.current[1] = el;
                  }}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Seu melhor e-mail"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 ${
                    errors.email
                      ? "border-red-500"
                      : "border-gray-200 dark:border-gray-700 focus:border-indigo-500"
                  } bg-white/80 dark:bg-gray-700/80 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all duration-300`}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-500 animate-pulse">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-indigo-500 dark:text-indigo-400">
                  <FaPhone />
                </div>
                <input
                  ref={(el) => {
                    inputRefs.current[2] = el;
                  }}
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Telefone (opcional)"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 ${
                    errors.phone
                      ? "border-red-500"
                      : "border-gray-200 dark:border-gray-700 focus:border-indigo-500"
                  } bg-white/80 dark:bg-gray-700/80 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all duration-300`}
                />
                {errors.phone && (
                  <p className="mt-2 text-sm text-red-500 animate-pulse">
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-10 relative">
              <div className="absolute top-3 left-3 text-indigo-500 dark:text-indigo-400">
                <FaComment />
              </div>
              <textarea
                ref={(el) => {
                  inputRefs.current[3] = el;
                }}
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                placeholder="Conte-me sobre seu projeto..."
                className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 ${
                  errors.message
                    ? "border-red-500"
                    : "border-gray-200 dark:border-gray-700 focus:border-indigo-500"
                } bg-white/80 dark:bg-gray-700/80 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all duration-300`}
              />
              {errors.message && (
                <p className="mt-2 text-sm text-red-500 animate-pulse">
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <FaPaperPlane className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  <span className="relative overflow-hidden">
                    <span className="block group-hover:-translate-y-7 transition-transform duration-300">
                      Enviar Mensagem
                    </span>
                    <span className="absolute left-0 top-7 block group-hover:-translate-y-7 transition-transform duration-300 text-indigo-200">
                      Vamos conversar!
                    </span>
                  </span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
