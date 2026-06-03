"use client";
import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


const schema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email().max(120),
  type: z.string().min(1, "Selecciona una opción"),
  message: z.string().min(10).max(2000),
});

type FormData = z.infer<typeof schema>;

const TYPES = ["Automatización", "CRM / Dashboard", "IA aplicada", "Web App", "Consultoría", "Otro"];

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm text-text-secondary">{label}</label>
      {children}
      {error && <p className="text-xs text-error">{error}</p>}
    </div>
  );
}

const inputStyle = "w-full bg-bg-tertiary border border-border-hover rounded-lg px-4 py-3 text-sm text-text-primary placeholder:text-text-muted hover:border-accent/40 focus:border-accent focus:ring-1 focus:ring-accent/30 outline-none transition-all cursor-text";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error("");
      setStatus("ok");
      reset();
    } catch { setStatus("err"); }
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-bg-secondary">
      <div className="max-w-content mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:items-start">
          <div>
            <p className="text-sm font-mono text-accent-light mb-3">Contacto</p>
            <h2 className="section-heading mb-4">¿Hablamos?</h2>
            <p className="text-text-secondary leading-relaxed mb-8">
              Cuéntame sobre tu proyecto, proceso o idea. Te respondo en menos de 24h con una propuesta clara.
            </p>
            <div className="relative w-full max-w-md aspect-[4/5] mb-8 rounded-2xl overflow-hidden border-2 border-border hover:border-accent/40 transition-colors">
              <Image
                src="/screenshots/foto-luis.webp"
                alt="Luis Martínez"
                fill
                className="object-cover"
              />
            </div>

          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 lg:mt-36" noValidate>
            <Field label="Nombre" error={errors.name?.message}>
              <input {...register("name")} placeholder="Tu nombre" className={inputStyle} />
            </Field>
            <Field label="Email" error={errors.email?.message}>
              <input {...register("email")} type="email" placeholder="tu@email.com" className={inputStyle} />
            </Field>
            <Field label="¿Qué necesitas?" error={errors.type?.message}>
              <select {...register("type")} className={inputStyle + " appearance-none cursor-pointer"} defaultValue="">
                <option value="" disabled>Selecciona una opción</option>
                {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </Field>
            <Field label="Mensaje" error={errors.message?.message}>
              <textarea {...register("message")} rows={4} placeholder="Cuéntame sobre tu proyecto..." className={inputStyle + " resize-none"} />
            </Field>
            <button type="submit" disabled={status === "sending"} className="btn btn-primary w-full justify-center disabled:opacity-50">
              {status === "sending" ? "Enviando..." : status === "ok" ? "✓ Enviado. ¡Gracias!" : status === "err" ? "Error — Reintentar" : "Enviar mensaje"}
            </button>
            <div className="pt-8 mt-8 border-t border-border flex items-center justify-center gap-10">
              <a href="mailto:agenciasuiza8@gmail.com" className="text-text-muted hover:text-accent transition-colors" aria-label="Email">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
              </a>
              <a href="https://github.com/luismartinezborges" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent transition-colors" aria-label="GitHub">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              </a>
              <a href="https://linkedin.com/in/luismartinezborges" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent transition-colors" aria-label="LinkedIn">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
