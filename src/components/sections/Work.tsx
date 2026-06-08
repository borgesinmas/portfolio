import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "@/lib/projects";

function HeroProject({ project }: { project: (typeof PROJECTS)[number] }) {
  return (
    <div className="work-hero rounded-2xl overflow-hidden group flex flex-col">
      {/* Media — ratio 16:9 en móvil, cinematográfico en pantallas mayores */}
      <div className="relative aspect-video sm:aspect-[21/9] overflow-hidden bg-bg-secondary">
        {project.video ? (
          <video
            src={project.video}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        ) : (
          <Image
            src={project.images[0] ?? project.heroImage}
            alt={project.title}
            fill
            className="object-cover"
          />
        )}
      </div>

      {/* Info — una sola fila horizontal */}
      <div className="bg-bg-secondary border-t border-border px-5 sm:px-8 md:px-10 py-6 sm:py-7 flex flex-wrap items-center gap-x-10 gap-y-5">

        {/* Título + descripción */}
        <div className="flex-1 min-w-[200px]">
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-1.5 leading-tight">
            {project.title}
          </h3>
          <p className="text-text-secondary text-sm leading-relaxed line-clamp-2">
            {project.solution}
          </p>
        </div>

        {/* Métricas */}
        <div className="flex gap-6 shrink-0">
          {project.results.map((r) => (
            <div key={r.label} className="text-center">
              <div className="text-xl font-bold text-accent-light">{r.value}</div>
              <div className="text-[10px] text-text-muted mt-0.5 max-w-[72px] leading-snug uppercase tracking-wide">
                {r.label}
              </div>
            </div>
          ))}
        </div>

        {/* Stack */}
        <div className="flex flex-wrap gap-1.5 shrink-0">
          {project.stack.slice(0, 5).map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
          {project.stack.length > 5 && (
            <span className="tag opacity-60">+{project.stack.length - 5}</span>
          )}
        </div>

        {/* Botones */}
        <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto sm:ml-auto">
          <Link
            href={`/projects/${project.slug}`}
            className="btn btn-primary group/cta w-fit transition-all hover:-translate-y-0.5 hover:bg-accent-light hover:shadow-[0_10px_30px_-12px_rgba(52,211,153,0.75)]"
          >
            Ver mas del proyecto
            <span aria-hidden="true" className="transition-transform group-hover/cta:translate-x-1">-&gt;</span>
          </Link>

          {project.websiteUrl && (
            <a
              href={project.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline group/website w-fit transition-all hover:-translate-y-0.5 hover:border-accent hover:bg-white/5 hover:text-accent-light hover:shadow-[0_10px_30px_-16px_rgba(52,211,153,0.55)]"
            >
              growork.es
              <span aria-hidden="true" className="transition-transform group-hover/website:translate-x-1">-&gt;</span>
            </a>
          )}
        </div>

      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: (typeof PROJECTS)[number] }) {
  const imageClassName =
    "object-cover transition-transform duration-500 group-hover:scale-105";

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="work-card card card-lg h-full overflow-hidden group flex flex-col hover:ring-2 hover:ring-accent/30 transition-all"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={project.images[0] ?? project.heroImage}
          alt={project.title}
          fill
          className={imageClassName}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090C10]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6 flex flex-col flex-1">
        {/* Título — altura fija 2 líneas */}
        <h3 className="h-[3.5rem] overflow-hidden text-xl font-semibold tracking-tight leading-tight mb-3 line-clamp-2">
          {project.title}
        </h3>

        {/* Descripción — altura fija 5 líneas */}
        <p className="h-[7.5rem] overflow-hidden text-sm text-text-secondary mb-5 leading-relaxed line-clamp-5">
          {project.solution}
        </p>

        {/* Métricas — altura fija */}
        <div className="grid h-[6.5rem] overflow-hidden grid-cols-3 items-center gap-3 mb-5 py-4 border-y border-border">
          {project.results.map((r) => (
            <div key={r.label} className="text-center">
              <div className="text-lg font-bold tracking-tight text-accent-light">
                {r.value}
              </div>
              <div className="h-[2rem] overflow-hidden line-clamp-2 text-[10px] text-text-muted mt-0.5 uppercase tracking-wide leading-tight">
                {r.label}
              </div>
            </div>
          ))}
        </div>

        {/* Stack — altura fija */}
        <div className="h-[4.25rem] overflow-hidden flex content-start flex-wrap gap-1.5 mb-5">
          {project.stack.slice(0, 5).map((t) => (
            <span key={t} className="tag text-[10px]">
              {t}
            </span>
          ))}
          {project.stack.length > 5 && (
            <span className="tag text-[10px] opacity-60">+{project.stack.length - 5}</span>
          )}
        </div>

        {/* Botón — siempre al fondo */}
        <span className="btn btn-outline group/cta mt-auto w-fit text-sm transition-all hover:-translate-y-0.5 hover:border-accent hover:bg-white/5 hover:text-accent-light hover:shadow-[0_10px_30px_-16px_rgba(52,211,153,0.55)]">
          Ver mas
          <span aria-hidden="true" className="transition-transform group-hover/cta:translate-x-1">-&gt;</span>
        </span>
      </div>
    </Link>
  );
}

export function Work() {
  const [hero, ...rest] = PROJECTS;

  return (
    <section id="work" className="py-20 sm:py-28 bg-bg-primary">
      <div className="max-w-content mx-auto px-6">
        <div className="mb-14">
          <p className="text-sm font-mono text-accent-light mb-3">Proyectos</p>
          <h2 className="section-heading mb-4">Casos reales</h2>
          <p className="section-sub">
            Productos full-stack, automatizaciones e infraestructura que resuelven problemas reales. Varios forman parte de un mismo ecosistema; otros son productos independientes.
          </p>
        </div>

        <div className="mb-12">
          <HeroProject project={hero} />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
