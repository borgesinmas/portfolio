import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ZoomableImage } from "@/components/ZoomableImage";

export const metadata: Metadata = {
  title: "Growork — Caso de Estudio",
  description:
    "Caso de estudio de Growork: plataforma full-stack con web pública, pagos con Stripe, CRM, portal privado, web interna de operaciones, finanzas, automatizaciones, SEO e IA contextual.",
};

const stack = [
  "Next.js 16",
  "React 19",
  "TypeScript",
  "PostgreSQL",
  "Stripe",
  "Twenty CRM",
  "NestJS",
  "OpenAI",
  "n8n",
  "Tailwind CSS 4",
  "Cloudflare",
  "Gmail API",
  "Google Workspace",
];

const products = [
  {
    num: "01",
    title: "Web pública — growork.es",
    tech: "Next.js 16 · Stripe · Twenty CRM · n8n · PostgreSQL",
    text: "Captación, evaluación, checkout, blog SEO y portal privado. El webhook de Stripe es el punto central de aprovisionamiento: crea el usuario, registra los servicios, sincroniza el CRM y envía los emails.",
    link: null,
  },
  {
    num: "02",
    title: "Scraper de ofertas de empleo",
    tech: "Python · FastAPI · Playwright · PostgreSQL · APScheduler",
    text: "Cuatro scrapers (HotelCareer, Hogapage, Gastrojob, Hoteljob) que se ejecutan a diario, extraen emails con múltiples estrategias y alimentan la base de datos que usa el motor de envíos.",
    link: "/projects/swiss-hotel-job-scraper",
  },
  {
    num: "03",
    title: "Web interna — Email Operations OS",
    tech: "NestJS 16 · Next.js · Gmail API · OpenAI · Google Workspace",
    text: "La consola operativa real: motor de envíos diario con warmup progresivo, generación de emails con GPT-4o, clasificación de respuestas con IA y gestión automática de cuentas corporativas.",
    link: "/projects/email-operations-os",
  },
  {
    num: "04",
    title: "Portal privado del cliente",
    tech: "Next.js 16 · JWT · PostgreSQL · Twenty CRM · Web interna",
    text: "El candidato ve candidaturas, respuestas, estadísticas, plan, documentos y un chatbot IA con contexto acotado. Combina tres fuentes distintas de verdad sin que el usuario lo perciba.",
    link: "/projects/portal-clientes",
  },
];

const dataFlow = [
  "Candidato rellena formulario",
  "→",
  "Twenty CRM + n8n crea carpetas en Drive",
  "→",
  "Scraper extrae ofertas de hoteles",
  "→",
  "Email OS genera y envía CVs",
  "→",
  "Hotel responde por email",
  "→",
  "IA clasifica la respuesta",
  "→",
  "Portal muestra el resultado al candidato",
];

const screenshots = [
  {
    src: "/screenshots/PORTAL.webp",
    alt: "Dashboard privado de Growork con plan activo, candidaturas y asistente IA",
    caption: "El portal convierte pagos, CRM y operativa interna en una experiencia que el cliente puede entender de un vistazo.",
  },
  {
    src: "/screenshots/pago.webp",
    alt: "Checkout y planes de Growork con precios dinámicos conectados a Stripe",
    caption: "Al confirmarse el pago, el webhook de Stripe crea el usuario, registra los servicios en PostgreSQL, sincroniza Twenty CRM y gestiona la activación diferida del plan.",
  },
  {
    src: "/screenshots/webinterna8.webp",
    alt: "Centro de envíos de la web interna — consola de operaciones NestJS",
    caption: "La web interna (NestJS + 13 módulos + 13 entidades TypeORM) es el motor real de candidaturas, respuestas y trazabilidad.",
  },
  {
    src: "/screenshots/n8n-subir-leads.webp",
    alt: "Workflow de n8n para la subida de documentos de leads de Growork",
    caption: "Los documentos viajan a n8n, que crea las carpetas en Drive, sube el CV y la carta, actualiza Twenty CRM y cierra el flujo sin ninguna tarea manual.",
  },
  {
    src: "/screenshots/arquitectura-portal.webp",
    alt: "Arquitectura del portal privado con tres fuentes de datos",
    caption: "El portal combina PostgreSQL para sesiones y servicios, Twenty CRM para el perfil comercial y la web interna para candidaturas, respuestas y documentos.",
  },
  {
    src: "/screenshots/finanzas.webp",
    alt: "Dashboard financiero interno de Growork",
    caption: "Finance actúa como fuente dinámica de precios. La web pública vende con precios actualizados y conserva un fallback local si la API no responde.",
  },
  {
    src: "/screenshots/vlog.webp",
    alt: "Blog SEO de Growork sobre trabajar en Suiza",
    caption: "El blog se diseñó como infraestructura SEO: contenido dinámico desde PostgreSQL, clusters, datos estructurados, sitemap dinámico y llms.txt.",
  },
  {
    src: "/screenshots/arquitectura.webp",
    alt: "Diagrama de arquitectura de Growork por capas",
    caption: "La parte más difícil fue mantener sincronizadas capas con responsabilidades distintas sin trasladar esa complejidad al usuario.",
  },
];

const flows = [
  {
    number: "01",
    title: "Evaluación pública",
    subtitle: "El primer contacto no termina en un email: arranca el sistema.",
    steps: [
      "Formulario individual o de pareja con datos, idiomas, disponibilidad, país y provincia.",
      "Subida de CV y carta en PDF con validación de archivo, MIME y magic bytes.",
      "Cloudflare Turnstile y rate limit por IP antes de tocar cualquier sistema externo.",
      "Creación o actualización del lead en Twenty CRM mediante GraphQL.",
      "Webhook a n8n para procesar los documentos y enviar el email de confirmación.",
    ],
  },
  {
    number: "02",
    title: "Pago y aprovisionamiento",
    subtitle: "Stripe confirma el dinero, pero el webhook convierte el pago en acceso real.",
    steps: [
      "Checkout autenticado y checkout invitado para comprar sin cuenta previa.",
      "Precios dinámicos desde Finance API con fallback local si la API no responde.",
      "Webhook idempotente: un UPDATE condicional evita duplicar usuarios o servicios aunque Stripe reenvíe el evento.",
      "Crea el usuario, registra client_services y sincroniza Twenty con backoff exponencial.",
      "El reloj del plan no empieza al pagar, sino cuando aparece el primer envío real.",
    ],
  },
  {
    number: "03",
    title: "Portal conectado",
    subtitle: "Una interfaz sencilla sobre tres fuentes de verdad distintas.",
    steps: [
      "PostgreSQL guarda usuarios, pagos, servicios, tokens, chat y rate limits.",
      "Twenty CRM aporta perfil, plan, pareja y estado comercial.",
      "La web interna aporta candidaturas, respuestas, documentos, adjuntos y métricas.",
      "El portal bloquea las vistas sin plan activo y funciona para individual y pareja.",
      "El chat IA recibe contexto acotado y se protege con sanitización y límites de uso.",
    ],
  },
];

const hardParts = [
  {
    title: "No había una única fuente de verdad",
    text: "Stripe conocía el pago; Twenty, el cliente; PostgreSQL, la sesión y los servicios; la web interna, las candidaturas; Finance, los precios. El trabajo fue conseguir que todas esas piezas se comportaran como un solo producto.",
  },
  {
    title: "Los sistemas no llegan a la vez",
    text: "El webhook de Stripe puede ejecutarse antes de que el workflow de Twenty haya creado el objeto Cliente. Por eso el sistema reintenta con backoff, deja estados recuperables y se autocorrige en las siguientes peticiones.",
  },
  {
    title: "La pareja cambia el modelo mental",
    text: "Un flujo individual se puede modelar de forma lineal. Una pareja exige vínculos, servicios compartidos, datos separados, precios distintos y sincronización cruzada entre Person y Cliente en el CRM.",
  },
  {
    title: "La operación debía ser invisible",
    text: "El usuario no necesita saber que existen CRM, workers, webhooks o identificadores internos. Necesita ver si su búsqueda avanza, qué se ha enviado y quién ha respondido.",
  },
];

const decisions = [
  {
    question: "¿Landing o plataforma?",
    decision: "Convertir Growork en una plataforma completa.",
    why: "La web pública solo resolvía la captación. En cuanto aparecieron pagos, seguimiento, CRM y candidaturas, hizo falta un sistema con estado propio.",
  },
  {
    question: "¿Cuándo empieza el plan?",
    decision: "En la primera candidatura enviada, no en el pago.",
    why: "Alinea el producto con el valor entregado. Pagar no significa que el servicio haya empezado a operar.",
  },
  {
    question: "¿El CRM como única base de datos?",
    decision: "Twenty para la relación comercial; PostgreSQL para el estado operativo.",
    why: "El portal necesita sesiones, pagos, tokens, rate limits y chat con control propio. No todo debe vivir en el CRM.",
  },
];

const techScreenshots = [
  {
    src: "/screenshots/n8n-generar-email.webp",
    alt: "Workflow de n8n para la generación automática de emails de candidatura",
    caption: "El workflow de generación de emails combina datos del cliente, la oferta y el contexto para producir un email personalizado antes de pasarlo al worker de envío.",
  },
  {
    src: "/screenshots/n8n-creador-carpetas.webp",
    alt: "Workflow de n8n para la creación automática de carpetas en Google Drive",
    caption: "Cuando un lead entra al sistema, n8n crea automáticamente la estructura de carpetas en Drive: CV, cartas, versiones antiguas y definitivas, sin ninguna intervención manual.",
  },
];

const evolution = [
  "Nació como una web pública para explicar servicios de empleabilidad en Suiza.",
  "Se añadió el formulario de evaluación con documentos, Turnstile, Twenty CRM y n8n.",
  "Llegaron los pagos con Stripe: servicios puntuales, planes y checkout invitado.",
  "Se construyó el portal privado con candidaturas, respuestas, plan, perfil y chat IA.",
  "El flujo de parejas obligó a replantear formularios, CRM, Stripe, portal y servicios.",
  "Se conectó la web interna, se reforzó la seguridad y el blog evolucionó a infraestructura SEO.",
];

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="mb-10">
      <p className="text-sm font-mono text-accent-light mb-3 uppercase tracking-wider">{eyebrow}</p>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{title}</h2>
      {text && <p className="text-lg text-text-secondary leading-relaxed max-w-3xl">{text}</p>}
    </div>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="card p-5">
      <p className="text-3xl md:text-4xl font-bold text-accent-light mb-1">{value}</p>
      <p className="text-sm text-text-secondary leading-snug">{label}</p>
    </div>
  );
}

function FlowCard({ number, title, subtitle, steps }: { number: string; title: string; subtitle: string; steps: string[] }) {
  return (
    <div className="card p-6 md:p-7">
      <div className="flex items-start gap-4 mb-5">
        <span className="text-4xl font-bold font-mono text-accent/35">{number}</span>
        <div>
          <h3 className="text-2xl font-bold tracking-tight mb-2">{title}</h3>
          <p className="text-sm text-text-secondary leading-relaxed">{subtitle}</p>
        </div>
      </div>
      <ol className="space-y-3">
        {steps.map((step, index) => (
          <li key={step} className="flex gap-3 text-sm text-text-secondary leading-relaxed">
            <span className="mt-0.5 font-mono text-xs text-accent-light shrink-0">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function ScreenshotFigure({ src, alt, caption, priority }: { src: string; alt: string; caption: string; priority?: boolean }) {
  return (
    <figure className="group">
      <div className="card card-lg overflow-hidden relative bg-bg-secondary aspect-video">
        <ZoomableImage
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 900px) 520px, 100vw"
          caption={caption}
          priority={priority}
          containerClassName="h-full"
          imageClassName="object-contain p-4 transition-transform duration-700 group-hover:scale-[1.015]"
        />
      </div>
      <figcaption className="mt-3 text-xs text-text-muted leading-relaxed">{caption}</figcaption>
    </figure>
  );
}

export default function GroworkCaseStudy() {
  return (
    <main className="project-page min-h-screen text-text-primary pt-16">
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

      <article className="max-w-[1120px] mx-auto px-6 pt-16 pb-32">

        {/* ── 1. HERO ── */}
        <header className="mb-20">
          <div className="flex items-center gap-3 mb-8 flex-wrap">
            <span className="text-xs text-text-muted font-mono">2024 — presente</span>
            <span className="text-xs text-text-muted font-mono">Núcleo del ecosistema Growork</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8">
            Growork
          </h1>

          <p className="text-xl md:text-2xl text-text-secondary leading-relaxed mb-7 max-w-4xl">
            Empezó como una web para ayudar a candidatos hispanohablantes a trabajar en Suiza. Terminó siendo cuatro productos conectados: una web pública con pagos, un scraper de ofertas, una consola interna de operaciones y un portal privado para clientes.
          </p>

          <div className="mb-10 flex flex-wrap items-center gap-4">
            <a href="https://growork.es" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Visitar growork.es
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>

          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Metric value="4" label="productos conectados: web, scraper, Email OS y portal" />
            <Metric value="54" label="API routes en la web pública" />
            <Metric value="13" label="módulos NestJS en la web interna" />
            <Metric value="10+" label="flujos de n8n en producción" />
          </div>

          <div className="flex flex-wrap gap-2">
            {stack.map((tech) => (
              <span key={tech} className="tag">{tech}</span>
            ))}
          </div>
        </header>

        {/* ── 2. VIDEO ── */}
        <section className="mb-24">
          <div className="overflow-hidden rounded-xl border border-border bg-bg-secondary">
            <video src="/screenshots/growork.mp4" autoPlay loop muted playsInline className="w-full" />
          </div>
          <p className="mt-3 text-xs text-text-muted leading-relaxed">
            La capa pública del producto: captación, planes, contenido SEO y conversión.
          </p>
        </section>

        {/* ── 3. EL PROYECTO ── */}
        <section className="mb-24">
          <SectionHeading
            eyebrow="El proyecto"
            title="Una web que acabó necesitando una arquitectura de producto"
            text="Un candidato que quiere trabajar en Suiza no necesita solo información. Necesita que alguien prepare su CV, lo envíe a los hoteles correctos, gestione las respuestas y le muestre el progreso. Eso no se resuelve con una landing."
          />

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                title: "Captación y venta",
                text: "Home, formulario de evaluación individual o en pareja, planes y precios dinámicos, checkout autenticado e invitado, blog SEO y tracking de conversión.",
              },
              {
                title: "Operaciones conectadas",
                text: "Twenty CRM para leads y clientes, scraper diario de ofertas, web interna para envíos y respuestas, n8n para documentos y Google Workspace para emails corporativos.",
              },
              {
                title: "Experiencia privada",
                text: "Portal con dashboard, candidaturas, respuestas, estadísticas, plan activo, documentos y chatbot IA con contexto acotado al caso del cliente.",
              },
            ].map((item) => (
              <div key={item.title} className="card p-6">
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 4. EL ECOSISTEMA ── */}
        <section className="mb-24">
          <SectionHeading
            eyebrow="El ecosistema"
            title="Cuatro productos que forman un único sistema operativo"
            text="Lo que el cliente ve como una plataforma es, por dentro, cuatro sistemas independientes que se sincronizan."
          />

          <div className="grid md:grid-cols-2 gap-5 mb-8">
            {products.map((item) => (
              <div key={item.title} className="card p-6">
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-2xl font-bold font-mono text-accent/35 shrink-0">{item.num}</span>
                  <div>
                    <h3 className="text-lg font-bold tracking-tight mb-1">{item.title}</h3>
                    <p className="text-xs font-mono text-accent-light">{item.tech}</p>
                  </div>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">{item.text}</p>
                {item.link && (
                  <Link href={item.link} className="text-xs font-mono text-accent hover:text-accent-light transition-colors">
                    Ver caso de estudio →
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="card p-6 md:p-8">
            <p className="text-sm font-mono text-accent-light mb-4 uppercase tracking-wider">El flujo de datos</p>
            <div className="flex flex-wrap items-center gap-2 text-sm font-mono">
              {dataFlow.map((step, i) => (
                <span
                  key={i}
                  className={step === "→"
                    ? "text-accent/40"
                    : "bg-bg-primary/50 border border-border rounded px-2 py-1 text-text-secondary"}
                >
                  {step}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. EVIDENCIA VISUAL ── */}
        <section className="mb-24">
          <SectionHeading
            eyebrow="Evidencia visual"
            title="Las piezas que había que hacer encajar"
            text="Portal, pagos, web interna, automatizaciones, finanzas y arquitectura. Cada captura corresponde a un sistema real."
          />

          <div className="grid md:grid-cols-2 gap-7">
            {screenshots.map((s, i) => (
              <ScreenshotFigure key={s.src} {...s} priority={i === 0} />
            ))}
          </div>
        </section>

        {/* ── 6. CÓMO FUNCIONA ── */}
        <section className="mb-24">
          <SectionHeading
            eyebrow="Cómo funciona"
            title="Los tres flujos que mejor explican la complejidad"
            text="No son features aisladas. Son procesos que cruzan frontend, backend, CRM, pagos, automatizaciones y decisiones de producto."
          />

          <div className="grid lg:grid-cols-3 gap-5">
            {flows.map((flow) => (
              <FlowCard key={flow.title} {...flow} />
            ))}
          </div>
        </section>

        {/* ── 7. LO QUE FUE DIFÍCIL + DECISIONES ── */}
        <section className="mb-24">
          <SectionHeading
            eyebrow="Lo que fue difícil"
            title="La dificultad estaba en los estados reales, no en la tecnología"
            text="Elegir Next.js, Stripe o PostgreSQL no era lo complicado. Lo complicado era que cada integración tenía su propia forma de fallar, su propio ritmo y su propia definición de verdad."
          />

          <div className="grid md:grid-cols-2 gap-5 mb-12">
            {hardParts.map((item) => (
              <div key={item.title} className="card p-6">
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-text-secondary leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          <SectionHeading
            eyebrow="Decisiones"
            title="Preguntas que obligaron a pensar como producto"
          />

          <div className="space-y-4">
            {decisions.map((item) => (
              <div key={item.question} className="card p-6 md:p-7 grid md:grid-cols-[200px_1fr_1fr] gap-5">
                <div>
                  <p className="text-sm font-mono text-accent-light mb-2">Duda</p>
                  <h3 className="text-lg font-semibold">{item.question}</h3>
                </div>
                <div>
                  <p className="text-sm font-mono text-text-muted mb-2">Decisión</p>
                  <p className="text-text-secondary leading-relaxed">{item.decision}</p>
                </div>
                <div>
                  <p className="text-sm font-mono text-text-muted mb-2">Por qué importaba</p>
                  <p className="text-text-secondary leading-relaxed">{item.why}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 8. EVIDENCIA TÉCNICA ── */}
        <section className="mb-24">
          <SectionHeading
            eyebrow="Automatizaciones"
            title="Los workflows que eliminan el trabajo manual"
            text="Cada flujo de n8n encapsula un proceso que antes requería intervención humana. Estas son dos de las piezas que mejor muestran cómo el sistema opera solo."
          />

          <div className="grid md:grid-cols-2 gap-7">
            {techScreenshots.map((s, i) => (
              <ScreenshotFigure key={s.src} {...s} priority={i === 0} />
            ))}
          </div>
        </section>

        {/* ── 9. SISTEMAS INTERNOS ── */}
        <section className="mb-24">
          <div className="grid lg:grid-cols-[1fr_0.9fr] gap-6 items-center mb-10">
            <div>
              <SectionHeading
                eyebrow="Motor de candidaturas"
                title="La web interna: el sistema que hace el trabajo real"
                text="La mayor parte del tiempo operativo de Growork no vive en la web pública, sino en una consola interna construida con NestJS y Next.js."
              />
              <ul className="space-y-3 text-sm text-text-secondary mb-6">
                {[
                  "Scheduler diario (6:00 AM): crea los jobs de envío para cada cliente activo.",
                  "Worker cada minuto: genera el email con GPT-4o-mini y lo envía por Gmail API.",
                  "Warmup progresivo: cada cuenta empieza con 2 emails/día y sube hasta 25.",
                  "Preview manual: aprueba o rechaza cada email antes de enviarlo.",
                  "Respuestas: lee Gmail, deduplica y clasifica con IA (entrevista, negativa, automática).",
                  "Google Workspace: crea cuentas corporativas cuando un cliente completa el workflow.",
                ].map((item) => (
                  <li key={item} className="flex gap-3 items-start">
                    <span className="text-accent font-mono text-xs mt-1 shrink-0">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/projects/email-operations-os" className="btn btn-outline">
                Ver Email Operations OS
              </Link>
            </div>
            <div className="card card-lg overflow-hidden relative bg-bg-secondary aspect-video">
              <Image
                src="/screenshots/webinterna1.webp"
                alt="Dashboard de la web interna de operaciones de Growork"
                fill
                className="object-contain p-4"
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-[0.9fr_1fr] gap-6 items-center">
            <div className="card p-6 md:p-8">
              <p className="text-sm font-mono text-accent-light mb-4 uppercase tracking-wider">Ecosistema conectado</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">
                El acceso a las herramientas también tuvo que ordenarse
              </h2>
              <p className="text-text-secondary leading-relaxed mb-5">
                Growork acabó teniendo CRM, finanzas, web interna, n8n, base de datos, Dokploy y gestor de proyectos. Creé una web central para operar el ecosistema sin depender de favoritos ni servicios expuestos.
              </p>
              <Link href="/projects/command-center" className="btn btn-outline">
                Ver Command Center
              </Link>
            </div>
            <div className="card card-lg overflow-hidden relative bg-bg-secondary aspect-video">
              <Image
                src="/screenshots/central.webp"
                alt="Command Center de Growork con accesos a herramientas internas"
                fill
                className="object-contain p-4"
              />
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="border-t border-border pt-16 pb-0">
          <div className="mb-16">
            <p className="text-sm font-mono text-accent-light mb-6 uppercase tracking-wider">Cómo creció</p>
            <ol className="space-y-3">
              {evolution.map((item, index) => (
                <li key={item} className="flex gap-4 items-start text-text-secondary">
                  <span className="font-mono text-xs text-accent-light mt-1 shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ol>
          </div>

          <p className="text-xl md:text-2xl text-text-secondary leading-relaxed max-w-3xl mx-auto text-center mb-10">
            Growork es el proyecto que mejor resume mi perfil: bajo problemas ambiguos a una arquitectura concreta, conecto negocio con tecnología y construyo productos que sostienen operaciones reales.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="https://growork.es" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Visitar growork.es
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
            <Link href="/projects/portal-clientes" className="btn btn-outline">
              Ver portal privado
            </Link>
            <Link href="/projects/email-operations-os" className="btn btn-outline">
              Ver web interna
            </Link>
          </div>
        </footer>

      </article>
    </main>
  );
}
