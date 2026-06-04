import Link from "next/link";

const IMAGES = {
  workflow: "/screenshots/n8n-home.webp",
  crm: "/screenshots/central.webp",
  data: "https://lh3.googleusercontent.com/aida-public/AB6AXuA97_aXp_MEYRZBHx6gNn77vpacDiRez_VcPRxaY7VfvAwFsG3Q36Ym45kjcw_tZV1FWUiIqwHJaMaT1cRzik2nPQD8AcCJ84-vpc8YG7HQgTBkODY0jJDWNU7ltGac9YzVspwxiDmnOZP-XNivftP54Y8cGvC4Yh0n6G-dsapS0BXdcflUfomkxW9KiHTFrqnKZ3G2mU5qIgruMXR-Q9gQf5TQK3w_5wRQLEDtQ4d5eRz2NXuVSiOFSZCNe-0jR5H0WN_F3CTKKZG7=w900",
  integration: "/screenshots/manager.webp",
  services: "https://lh3.googleusercontent.com/aida-public/AB6AXuBe_rAKzjENlwd_4p6iwFfHAXif1JIvWrasWpU0jyliwlM8G1SX3g7SnZNc22PCYvPzgDoJp__G8cffsQp7V2KzsJ2hNFg8NOGVILFdb8ruZuKrpzwJV6--VT6A5xln77Xs0l3rxH29zMeNep11ds2aO0TYPnvtLCsoqSG3B_dUhK5oB83p4UxxCTHRFf2Sft07CtZQpJKYFfAPM8iY2rdvP7l-B-CYTzbmogp_UaL-Ae-Q8WWQkXpYkMzXHrtFtWu6L7MtR9_SR-Jh=w900",
  onya: "/screenshots/onya-phone.webp",
  mobile: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpbaoiHPCyRJbU8dJUWOFF7TCBLQhvw2pIKzfTR_vXZmx22KXF7Zhz0Fgy5B4vI_Q90FiuUaz--_I5Xs3tAElAD_7BKjgjWVYmt5LZpMu1uSnvQiiqx1LYZ4tBtuHqTdbVKQFW1L892eKkKFyrLa-S_b0fUhOxWQ3h1LHnNtXd83PC6Lbu-p64kv0sxE5gkgVWV1pxVerMKmzEQP4v_qmQXX5iNVZ69DD7h8ZTgpaRUIYf7GoZm3rL-zGXkSxFUyTCjGKfANV-fgEe=w900",
};

function ProjectCard({ src, label, delay, aspect, slug }: { src: string; label: string; delay: string; aspect?: string; slug?: string }) {
  const isVideo = src.endsWith(".mp4");
  const mediaClasses = aspect ? "w-full h-full object-contain" : "w-full h-auto object-contain";

  const CardContent = (
    <div className="project-card rounded-xl overflow-hidden shadow-xl animate-in hover:ring-2 hover:ring-accent/30 transition-all cursor-pointer" style={{ animationDelay: delay }}>
      <div className={aspect ? `${aspect} overflow-hidden` : "overflow-hidden"}>
        {isVideo ? (
          <video src={src} muted autoPlay loop playsInline className={mediaClasses} />
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={src} alt={label} className={mediaClasses} />
        )}
      </div>
      <div className="px-3 py-2 bg-white/5 border-t border-white/5 text-[10px] uppercase tracking-widest text-gray-500 font-semibold">
        {label}
      </div>
    </div>
  );

  if (slug) {
    return <Link href={`/projects/${slug}`} className="block">{CardContent}</Link>;
  }

  return CardContent;
}

export function Hero() {
  return (
    <main className="relative flex-grow flex flex-col lg:flex-row items-center pt-32 lg:pt-8 min-h-screen px-6 md:px-12 lg:px-24">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: "url(/screenshots/fondo-port.webp)" }}
      />
      <div className="w-full lg:w-2/5 flex flex-col justify-center py-12 lg:py-0 z-10 relative">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-6">
          Convierto procesos en<br />
          <span className="text-brand-blue">sistemas que funcionan solos</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-xl mb-10 leading-relaxed">
          Software engineer autodidacta. Diseño, construyo y despliego plataformas full-stack, CRMs, dashboards, scrapers y automatizaciones con IA, sobre Next.js, Python, TypeScript y n8n.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <a href="#work" className="bg-accent hover:bg-accent-light text-[#090C10] font-semibold py-3 px-8 rounded-full transition-colors">
            Ver proyectos
          </a>
          <a href="#contact" className="bg-transparent hover:bg-white/5 border border-white/20 text-white font-semibold py-3 px-8 rounded-full transition-colors">
            Hablemos
          </a>
        </div>
      </div>

      <div className="w-full lg:w-3/5 relative flex items-center justify-center mt-16 lg:mt-0 lg:pl-12">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-3xl bg-brand-blue/5 rounded-full blur-[120px] -z-10" />

        <div className="grid grid-cols-2 gap-3 w-full max-w-5xl relative z-20">
          <div className="col-span-2 w-full">
            <ProjectCard src={IMAGES.workflow} label="+10 Flujos de trabajo de n8n" delay="0.1s" slug="n8n-workflows" />
          </div>
          <ProjectCard src="/screenshots/growork.mp4" label="Growork" delay="0.15s" slug="growork" />
          <ProjectCard src={IMAGES.integration} label="Project Flow" delay="0.2s" slug="project-flow" />
        </div>

        <div className="absolute -right-12 -bottom-12 w-28 z-50 animate-in hidden sm:block" style={{ animationDelay: "0.3s" }}>
          <div className="project-card rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10 ring-4 ring-black/50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMAGES.mobile} alt="Móvil" className="w-full h-auto" />
          </div>
        </div>
      </div>
    </main>
  );
}