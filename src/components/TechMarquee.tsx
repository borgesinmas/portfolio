import Image from "next/image";

const TECHS = [
  { name: "Zoho", src: "/screenshots/zoho-logo.svg" },
  { name: "Antigravity", src: "/screenshots/antigrabity-logo.webp" },
  { name: "ChatGPT", src: "/screenshots/chatgpt-logo.webp" },
  { name: "Dokploy", src: "/screenshots/dokploy-logo.webp" },
  { name: "Anthropic", src: "/screenshots/anthropic-logo.svg" },
  { name: "Cloudflare", src: "/screenshots/cloudflare-logo.webp" },
  { name: "n8n", src: "/screenshots/n8n-logo.svg" },
  { name: "Supabase", src: "/screenshots/supabase.webp" },
  { name: "PostgreSQL", src: "/screenshots/postgresql.webp" },
  { name: "React", src: "/screenshots/react.webp" },
  { name: "Stripe", src: "/screenshots/stripe.webp" },
];

export function TechMarquee() {
  return (
    <section id="stack" className="scroll-mt-16 py-16 sm:py-20 bg-[var(--bg-primary)]">
      <div className="max-w-content mx-auto px-6 mb-10 text-center">
        <p className="text-sm font-mono text-[var(--accent-light)] mb-3">Stack</p>
        <h2 className="section-heading mb-4">Tecnologías que utilizo</h2>
        <p className="section-sub mx-auto">
          Infraestructura probada en producción para escalar con seguridad.
        </p>
      </div>

      <div className="px-4 sm:px-6">
        <div className="flex flex-nowrap justify-center gap-2">
          {TECHS.map((tech) => (
            <div
              key={tech.name}
              className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] p-1.5 transition-colors hover:border-[var(--border-hover)] hover:bg-[var(--bg-card-hover)]"
            >
              <div className="relative w-full h-full bg-white rounded-xl p-2">
                <Image
                  src={tech.src}
                  alt={tech.name}
                  fill
                  className="object-contain p-0.5"
                  sizes="96px"
                  unoptimized
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
