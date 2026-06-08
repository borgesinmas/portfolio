import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ZoomableImage } from "@/components/ui/ZoomableImage";
import type { ReactNode } from "react";
import { getProjectBySlug, PROJECTS } from "@/lib/projects";
import { ApiContract, DataModelTable } from "@/components/case-study/CaseStudyPrimitives";

function ProjectFeatureIcon({ icon, title }: { icon?: string; title: string }) {
  if (!icon) return null;

  if (icon.startsWith("/")) {
    return (
      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 overflow-hidden">
        <Image
          src={icon}
          alt={`${title} logo`}
          width={32}
          height={32}
          className="w-8 h-8 object-contain"
        />
      </div>
    );
  }

  const iconClassName = "w-6 h-6 text-accent-light";
  const icons: Record<string, ReactNode> = {
    server: (
      <svg className={iconClassName} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="3" width="16" height="6" rx="2" />
        <rect x="4" y="15" width="16" height="6" rx="2" />
        <path d="M8 6h.01M8 18h.01M12 9v6" />
      </svg>
    ),
    terminal: (
      <svg className={iconClassName} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="m7 8 4 4-4 4" />
        <path d="M13 16h4" />
        <rect x="3" y="4" width="18" height="16" rx="2" />
      </svg>
    ),
    shield: (
      <svg className={iconClassName} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3 20 7v5c0 5-3.4 8.4-8 9-4.6-.6-8-4-8-9V7l8-4Z" />
        <path d="m9 12 2 2 4-5" />
      </svg>
    ),
    route: (
      <svg className={iconClassName} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="6" r="3" />
        <circle cx="18" cy="18" r="3" />
        <path d="M9 6h3a4 4 0 0 1 0 8H9a4 4 0 0 0 0 8h6" />
      </svg>
    ),
    deploy: (
      <svg className={iconClassName} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3 4 7l8 4 8-4-8-4Z" />
        <path d="M4 12l8 4 8-4" />
        <path d="M4 17l8 4 8-4" />
      </svg>
    ),
    cloud: (
      <svg className={iconClassName} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.5 18H8a5 5 0 1 1 1.2-9.85A6.5 6.5 0 0 1 21 12a3 3 0 0 1-3.5 6Z" />
        <path d="m9 13 2 2 4-5" />
      </svg>
    ),
  };

  return (
    <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-5">
      {icons[icon] ?? icons.server}
    </div>
  );
}

interface Props {
  params: Promise<{ slug: string }>;
}

// Slugs que tienen su propia página a medida en /projects/<slug>/page.tsx.
// Si se incluyen aquí, el template dinámico sobrescribe la página bespoke
// en el export estático (output: "export") y la deja inaccesible.
const BESPOKE_SLUGS = new Set([
  "growork",
  "email-operations-os",
  "n8n-workflows",
  "swiss-hotel-job-scraper",
  "command-center",
  "project-flow",
  "portal-clientes",
]);

export async function generateStaticParams() {
  return PROJECTS
    .filter((p) => !BESPOKE_SLUGS.has(p.slug))
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Caso de Estudio`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const idx = PROJECTS.findIndex((p) => p.slug === slug);
  const prev = PROJECTS[idx - 1];
  const next = PROJECTS[idx + 1];
  const imageClassName = "object-contain p-4";
  const isAutomationProject =
    project.category.toLowerCase().includes("automatizaci?n") ||
    project.stack.some((tool) => ["n8n", "openai"].includes(tool.toLowerCase()));
  const ctaTitle = project.ctaTitle ?? "¿Tienes un proyecto similar?";
  const ctaDescription =
    project.ctaDescription ??
    (isAutomationProject
      ? "Puedo ayudarte a automatizar procesos, construir dashboards o desarrollar sistemas end-to-end que ahorren horas de trabajo manual."
      : "Puedo ayudarte a diseñar, construir y desplegar productos digitales claros, seguros y preparados para operar en producción.");
  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    image: project.heroImage,
    url: `/projects/${project.slug}`,
    genre: project.category,
    keywords: project.stack.join(", "),
    ...(project.websiteUrl ? { sameAs: project.websiteUrl } : {}),
  };

  return (
    <main className="project-page min-h-screen text-text-primary pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      {/* Breadcrumb */}
      <div className="max-w-content mx-auto px-6 pt-8">
        <Link
          href="/#work"
          className="project-kicker text-sm text-accent hover:text-accent-light transition-colors font-mono inline-flex items-center gap-2 px-4 py-2 rounded-full"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Volver a proyectos
        </Link>
      </div>

      {/* Hero Section */}
      <section className="max-w-content mx-auto px-6 pt-12 pb-20">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-10">
          {project.title}
        </h1>

        <div className="grid lg:grid-cols-[7fr_3fr] gap-6">
          {/* Video */}
          <div className="card card-lg overflow-hidden relative bg-bg-secondary aspect-video">
            {project.video ? (
              <video
                src={project.video}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="aspect-video relative">
                <Image
                  src={project.heroImage}
                  alt={project.title}
                  fill
                  className={imageClassName}
                  priority
                />
              </div>
            )}
          </div>

          {/* Texto */}
          <div className="card p-6 md:p-8 flex flex-col justify-center">
            <h2 className="text-sm font-mono text-accent-light mb-4 uppercase tracking-wider">
              Resumen
            </h2>
            <p className="text-text-secondary text-base leading-relaxed">
              {project.longDescription ?? project.description}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="max-w-content mx-auto px-6 mb-20">
        <div className="card p-8 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {project.results.map((r) => (
              <div key={r.label} className="text-center md:text-left">
                <div className="text-4xl md:text-5xl font-bold tracking-tight text-accent mb-2">
                  {r.value}
                </div>
                <div className="text-sm text-text-muted uppercase tracking-wider font-medium">
                  {r.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="max-w-content mx-auto px-6 mb-20">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Problem */}
          <div className="card p-8 md:p-10 border-l-4 border-l-error/60">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-error">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <h2 className="text-sm font-mono uppercase tracking-wider text-error">
                El Problema
              </h2>
            </div>
            <p className="text-text-secondary text-lg leading-relaxed">
              {project.problem}
            </p>
          </div>

          {/* Solution */}
          <div className="card p-8 md:p-10 border-l-4 border-l-success/60">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-success">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h2 className="text-sm font-mono uppercase tracking-wider text-success">
                La Solución
              </h2>
            </div>
            <p className="text-text-secondary text-lg leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>
      </section>

      {/* Evidence */}
      {project.evidence && project.evidence.length > 0 && (
        <section className="max-w-content mx-auto px-6 mb-20">
          <div className="mb-10">
            <h2 className="text-sm font-mono text-accent-light mb-3 uppercase tracking-wider">
              {project.evidenceEyebrow ?? "Evidencias visuales"}
            </h2>
            <p className="text-2xl md:text-3xl font-bold tracking-tight">
              {project.evidenceTitle ?? "Pruebas visuales del proyecto"}
            </p>
            {project.evidenceIntro && (
              <p className="text-text-secondary text-lg leading-relaxed mt-4 max-w-3xl">
                {project.evidenceIntro}
              </p>
            )}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {project.evidence.map((item, i) => (
              <div
                key={item.image}
                className={`card overflow-hidden ${i < 2 ? "lg:col-span-2" : ""}`}
              >
                <div className="relative aspect-video bg-bg-primary border-b border-border overflow-hidden">
                  <ZoomableImage
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    containerClassName="h-full"
                    imageClassName="object-contain p-4"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <p className="text-xs font-mono text-accent-light mb-3">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-text-secondary leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Mobile showcase */}
      {project.mobileShowcase && (
        <section className="max-w-content mx-auto px-6 mb-20">
          <div className="card p-6 md:p-10">
            <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-center">
              <div>
                <h2 className="text-sm font-mono text-accent-light mb-3 uppercase tracking-wider">
                  {project.mobileShowcase.eyebrow ?? "Mobile-first"}
                </h2>
                <p className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
                  {project.mobileShowcase.title}
                </p>
                <p className="text-text-secondary text-lg leading-relaxed mb-6 max-w-2xl">
                  {project.mobileShowcase.text}
                </p>
                {project.mobileShowcase.bullets &&
                  project.mobileShowcase.bullets.length > 0 && (
                    <ul className="space-y-3">
                      {project.mobileShowcase.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex gap-3 items-start text-text-secondary leading-relaxed"
                        >
                          <span className="text-accent font-mono text-xs mt-1.5 shrink-0">
                            &rarr;
                          </span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
              </div>
              <div className="mx-auto w-full max-w-[280px]">
                {project.mobileShowcase.link ? (
                  <Link
                    href={project.mobileShowcase.link}
                    className="block group/mobile relative"
                    title="Ver proyecto completo"
                  >
                    <div className="relative aspect-[9/19] overflow-hidden rounded-[2rem] border border-border bg-bg-primary transition-all group-hover/mobile:border-accent/50 group-hover/mobile:shadow-[0_0_30px_-8px_rgba(52,211,153,0.4)]">
                      <Image
                        src={project.mobileShowcase.image}
                        alt={project.mobileShowcase.alt}
                        fill
                        sizes="280px"
                        className="object-contain transition-transform duration-500 group-hover/mobile:scale-[1.03]"
                      />
                    </div>
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono text-accent opacity-0 group-hover/mobile:opacity-100 transition-opacity whitespace-nowrap flex items-center gap-1">
                      Ver proyecto
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </Link>
                ) : (
                  <div className="relative aspect-[9/19] overflow-hidden rounded-[2rem] border border-border bg-bg-primary">
                    <Image
                      src={project.mobileShowcase.image}
                      alt={project.mobileShowcase.alt}
                      fill
                      sizes="280px"
                      className="object-contain"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Tools */}
      {project.tools && project.tools.length > 0 && (
        <section className="max-w-content mx-auto px-6 mb-20">
          <div className="mb-10">
            <h2 className="text-sm font-mono text-accent-light mb-3 uppercase tracking-wider">
              Herramientas
            </h2>
            <p className="text-2xl md:text-3xl font-bold tracking-tight">
              Qué utilicé y por qué
            </p>
            {project.toolsIntro && (
              <p className="text-text-secondary text-lg leading-relaxed mt-4 max-w-3xl">
                {project.toolsIntro}
              </p>
            )}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.tools.map((tool, i) => (
              <div key={i} className="card p-8">
                <ProjectFeatureIcon icon={tool.icon} title={tool.title} />
                <h3 className="text-lg font-semibold mb-3">{tool.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {tool.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Features */}
      {project.features && project.features.length > 0 && (
        <section className="max-w-content mx-auto px-6 mb-20">
          <div className="mb-10">
            <h2 className="text-sm font-mono text-accent-light mb-3 uppercase tracking-wider">
              Funcionalidades
            </h2>
            <p className="text-2xl md:text-3xl font-bold tracking-tight">
              Qué incluye el producto
            </p>
            {project.featuresIntro && (
              <p className="text-text-secondary text-lg leading-relaxed mt-4 max-w-3xl">
                {project.featuresIntro}
              </p>
            )}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.features.map((feature, i) => (
              <div
                key={i}
                className="card p-8 hover:ring-1 hover:ring-accent/20 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                  <span className="text-accent font-bold text-lg">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Process */}
      {project.process && project.process.length > 0 && (
        <section className="max-w-content mx-auto px-6 mb-20">
          <div className="mb-10">
            <h2 className="text-sm font-mono text-accent-light mb-3 uppercase tracking-wider">
              Proceso
            </h2>
            <p className="text-2xl md:text-3xl font-bold tracking-tight">
              Cómo lo construí
            </p>
            {project.processIntro && (
              <p className="text-text-secondary text-lg leading-relaxed mt-4 max-w-3xl">
                {project.processIntro}
              </p>
            )}
          </div>
          <div className="card p-8 md:p-10">
            <div className="space-y-4">
              {project.process.map((step, i) => (
                <div
                  key={i}
                  className="grid md:grid-cols-[96px_1fr] gap-4 p-4 rounded-lg bg-bg-primary/50"
                >
                  <div className="text-accent font-mono text-sm font-bold">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-text-secondary leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Challenges */}
      {project.challenges && project.challenges.length > 0 && (
        <section className="max-w-content mx-auto px-6 mb-20">
          <div className="mb-10">
            <h2 className="text-sm font-mono text-accent-light mb-3 uppercase tracking-wider">
              Dudas y decisiones
            </h2>
            <p className="text-2xl md:text-3xl font-bold tracking-tight">
              Problemas que tuve que resolver
            </p>
            {project.challengesIntro && (
              <p className="text-text-secondary text-lg leading-relaxed mt-4 max-w-3xl">
                {project.challengesIntro}
              </p>
            )}
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {project.challenges.map((challenge, i) => (
              <div key={i} className="card p-8 border-l-4 border-l-accent/60">
                <h3 className="text-lg font-semibold mb-3">{challenge.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {challenge.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Architecture */}
      {project.architecture && project.architecture.length > 0 && (
        <section className="max-w-content mx-auto px-6 mb-20">
          <div className="mb-10">
            <h2 className="text-sm font-mono text-accent-light mb-3 uppercase tracking-wider">
              Arquitectura
            </h2>
            <p className="text-2xl md:text-3xl font-bold tracking-tight">
              Cómo está construido
            </p>
            {project.architectureIntro && (
              <p className="text-text-secondary text-lg leading-relaxed mt-4 max-w-3xl">
                {project.architectureIntro}
              </p>
            )}
          </div>
          <div className="card p-8 md:p-10">
            <div className="space-y-4">
              {project.architecture.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 rounded-lg bg-bg-primary/50"
                >
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-accent text-xs font-bold">{i + 1}</span>
                  </div>
                  <p className="text-text-secondary leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Data Model */}
      {project.dataModel && project.dataModel.length > 0 && (
        <section className="max-w-content mx-auto px-6 mb-20">
          <div className="mb-10">
            <h2 className="text-sm font-mono text-accent-light mb-3 uppercase tracking-wider">
              Modelo de datos
            </h2>
            <p className="text-2xl md:text-3xl font-bold tracking-tight">
              {project.dataModelTitle ?? "Cómo se estructuran los datos"}
            </p>
            {project.dataModelIntro && (
              <p className="text-text-secondary text-lg leading-relaxed mt-4 max-w-3xl">
                {project.dataModelIntro}
              </p>
            )}
          </div>
          <DataModelTable items={project.dataModel} />
        </section>
      )}

      {/* API Contract */}
      {project.apiContract && project.apiContract.length > 0 && (
        <section className="max-w-content mx-auto px-6 mb-20">
          <div className="mb-10">
            <h2 className="text-sm font-mono text-accent-light mb-3 uppercase tracking-wider">
              Contrato de API
            </h2>
            <p className="text-2xl md:text-3xl font-bold tracking-tight">
              {project.apiContractTitle ?? "Endpoints e integraciones"}
            </p>
            {project.apiContractIntro && (
              <p className="text-text-secondary text-lg leading-relaxed mt-4 max-w-3xl">
                {project.apiContractIntro}
              </p>
            )}
          </div>
          <ApiContract endpoints={project.apiContract} />
        </section>
      )}


      {/* Tech Stack */}
      <section className="max-w-content mx-auto px-6 mb-20">
        <div className="mb-10">
          <h2 className="text-sm font-mono text-accent-light mb-3 uppercase tracking-wider">
            Stack Tecnológico
          </h2>
          <p className="text-2xl md:text-3xl font-bold tracking-tight">
            Tecnologías utilizadas
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {project.stack.map((t) => (
            <span
              key={t}
              className="px-5 py-2.5 bg-bg-secondary border border-white/10 rounded-full text-sm font-medium hover:border-accent/30 hover:text-accent transition-colors cursor-default"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-content mx-auto px-6 mb-20">
        <div className="card p-10 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {ctaTitle}
          </h2>
          <p className="text-text-secondary text-lg mb-8 max-w-2xl mx-auto">
            {ctaDescription}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/#contact"
              className="bg-accent hover:bg-accent-light text-[#090C10] font-semibold py-3 px-8 rounded-full transition-colors"
            >
              Hablemos
            </Link>
            <Link
              href="/#work"
              className="bg-transparent hover:bg-white/5 border border-white/20 text-white font-semibold py-3 px-8 rounded-full transition-colors"
            >
              Ver más proyectos
            </Link>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="max-w-content mx-auto px-6 py-16 border-t border-white/5">
        <div className="flex justify-between items-center">
          {prev ? (
            <Link
              href={`/projects/${prev.slug}`}
              className="group flex flex-col"
            >
              <span className="text-xs text-text-muted font-mono mb-1 flex items-center gap-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Proyecto anterior
              </span>
              <span className="text-text-primary group-hover:text-accent transition-colors font-semibold text-lg">
                {prev.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              className="group flex flex-col items-end text-right"
            >
              <span className="text-xs text-text-muted font-mono mb-1 flex items-center gap-1">
                Siguiente proyecto
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
              <span className="text-text-primary group-hover:text-accent transition-colors font-semibold text-lg">
                {next.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>
    </main>
  );
}
