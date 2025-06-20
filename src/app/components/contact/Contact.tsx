"use client";
import React, { useState, useRef } from "react";
import { z } from "zod";
import emailjs from "@emailjs/browser";
import useContactAnimation from "./useContactAnimation";
import ContactForm from "./ContactForm";

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

const Contact: React.FC<ContactProps> = ({
  containerRef,
  titleRef,
  contactSpanRef,
}) => {
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

  useContactAnimation(
    finalContainerRef,
    finalTitleRef,
    descriptionRef,
    formRef,
    inputRefs
  );

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
          <span
            ref={contactSpanRef}
            className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400"
          >
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
          <ContactForm
            formData={formData}
            errors={errors}
            isLoading={isLoading}
            submitSuccess={submitSuccess}
            inputRefs={inputRefs}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;
