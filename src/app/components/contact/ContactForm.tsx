"use client";
import React from "react";
import {
  FaPaperPlane,
  FaSpinner,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaComment,
} from "react-icons/fa";
import { ContactFormData } from "./Contact";

interface ContactFormProps {
  formData: ContactFormData;
  errors: Partial<ContactFormData>;
  isLoading: boolean;
  submitSuccess: boolean;
  inputRefs: React.MutableRefObject<
    (HTMLInputElement | HTMLTextAreaElement | null)[]
  >;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({
  formData,
  errors,
  isLoading,
  submitSuccess,
  inputRefs,
  handleChange,
  handleSubmit,
}) => {
  return (
    <>
      {submitSuccess && (
        <div className="success-message mb-8 p-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl shadow-lg transition-all duration-300">
          Mensagem enviada com sucesso! Entrarei em contato em breve.
        </div>
      )}

      <form
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
    </>
  );
};

export default ContactForm;
