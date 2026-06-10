"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle, FileText, Loader2 } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "El nombre es obligatorio"),
  email: z.string().email("Introduce un email válido"),
  company: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

type ContactForm = z.infer<typeof contactSchema>;

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Error al enviar el mensaje");
      }

      setStatus("success");
      reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Error desconocido");
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-bg-secondary">
      <div className="max-w-content mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:items-start">
          {/* Columna izquierda: contexto + foto + redes */}
          <div>
            <p className="text-sm font-mono text-accent-light mb-3">Contacto</p>
            <h2 className="section-heading mb-4">Trabajemos juntos</h2>
            <p className="text-text-secondary leading-relaxed mb-8">
              Estoy abierto a roles de ingeniería full-stack, automatización e IA. 
              Si tu equipo necesita a alguien que diseñe, construya y despliegue sistemas 
              de principio a fin, escríbeme. Respondo en menos de 24 horas.
            </p>

            <div className="relative w-full max-w-xs aspect-square rounded-2xl overflow-hidden border-2 border-border hover:border-accent/40 transition-colors mb-8">
              <Image
                src="/screenshots/foto-luis.webp"
                alt="Luis Martínez"
                fill
                className="object-cover"
              />
            </div>

            <div className="flex items-center gap-6">
              <a
                href="https://github.com/Groworker"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/luismartinezborges"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>
              <a
                href="/Luis%20Martinez%20Borges%20CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors"
                aria-label="Curriculum Vitae"
              >
                <FileText size={18} />
                Ver CV
              </a>
            </div>
          </div>

          {/* Columna derecha: formulario */}
          <div className="card card-lg p-8 sm:p-10">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center text-center py-12">
                <CheckCircle size={48} className="text-accent mb-4" />
                <h3 className="text-xl font-semibold mb-2">Mensaje enviado</h3>
                <p className="text-text-secondary mb-6">
                  Gracias por contactar. Te responderé en menos de 24 horas.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="btn btn-outline"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1.5">
                      Nombre <span className="text-accent">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Tu nombre"
                      className="w-full px-4 py-3 rounded-xl bg-bg-primary border border-border focus:border-accent transition-colors"
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1.5">
                      Email <span className="text-accent">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      className="w-full px-4 py-3 rounded-xl bg-bg-primary border border-border focus:border-accent transition-colors"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium mb-1.5">
                      Empresa
                    </label>
                    <input
                      id="company"
                      type="text"
                      placeholder="Nombre de la empresa"
                      className="w-full px-4 py-3 rounded-xl bg-bg-primary border border-border focus:border-accent transition-colors"
                      {...register("company")}
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-1.5">
                      Asunto
                    </label>
                    <input
                      id="subject"
                      type="text"
                      placeholder="¿Sobre qué trata?"
                      className="w-full px-4 py-3 rounded-xl bg-bg-primary border border-border focus:border-accent transition-colors"
                      {...register("subject")}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1.5">
                    Mensaje <span className="text-accent">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Cuéntame sobre la oportunidad, el proyecto o lo que necesitéis..."
                    className="w-full px-4 py-3 rounded-xl bg-bg-primary border border-border focus:border-accent transition-colors resize-none"
                    {...register("message")}
                  />
                  {errors.message && (
                    <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>
                  )}
                </div>

                {status === "error" && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm">
                    {errorMessage || "Ha ocurrido un error. Inténtalo de nuevo más tarde."}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn btn-primary w-full justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Enviar mensaje
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
