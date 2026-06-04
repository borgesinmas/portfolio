import Link from "next/link";
import type { Metadata } from "next";
import { ZoomableImage } from "@/components/ZoomableImage";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarClock,
  Database,
  Download,
  MailSearch,
  RefreshCcw,
  Search,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { DataModelTable } from "@/components/CaseStudyPrimitives";

export const metadata: Metadata = {
  title: "Scraper de Empleo de Hoteles Suizos — Caso de Estudio",
  description:
    "Caso de estudio de un sistema multi-scraper con FastAPI, Playwright y PostgreSQL para localizar ofertas en hoteles suizos, extraer emails, deduplicar contactos y operar las ejecuciones desde un dashboard propio.",
};

const SOURCES = [
  {
    name: "HotelCareer",
    url: "hotelcareer.ch",
    detail: "Búsqueda por ciudad, radio y país, con historial de ejecuciones y exportación por ciudad.",
  },
  {
    name: "Hogapage",
    url: "hogapage.ch",
    detail: "Scraper adaptado a categorías y radios más amplios para cubrir más ofertas de hostelería.",
  },
  {
    name: "Gastrojob",
    url: "gastrojob.ch",
    detail: "Extracción por regiones, categorías y tipos de empleo del sector gastro-hotelero.",
  },
  {
    name: "Hoteljob",
    url: "hoteljob-schweiz.de",
    detail: "Fuente adicional para ampliar la cobertura y no depender de un único portal.",
  },
];

const METRICS = [
  { value: "4", label: "portales conectados" },
  { value: "24h", label: "ejecución programada" },
  { value: "3", label: "reintentos por fallo" },
  { value: "1", label: "vista unificada" },
];

const PIPELINE = [
  {
    step: "01",
    title: "Configurar la búsqueda",
    text: "Ciudad, radio, país, portal y ventana de ejecución quedan definidos antes de lanzar el proceso. La operativa empieza con parámetros visibles, no con constantes escondidas en un script.",
  },
  {
    step: "02",
    title: "Recolectar listados",
    text: "Cada fuente navega sus resultados, pagina cuando hace falta y guarda las URLs candidatas con su estado de progreso, para poder auditar dónde se quedó una ejecución.",
  },
  {
    step: "03",
    title: "Entrar al detalle",
    text: "El scraper abre cada oferta, extrae los campos útiles y busca emails por varias rutas: enlaces mailto, texto visible, expresiones regulares y lectura del código fuente.",
  },
  {
    step: "04",
    title: "Normalizar y deduplicar",
    text: "Los resultados aterrizan en PostgreSQL, se cruzan por email y quedan listos para revisar, exportar o reutilizar sin repetir contactos entre portales.",
  },
];

const DATA_LAYER = [
  {
    title: "Datos de ejecución",
    text: "Estado, portal, ciudad, radio, timestamps, progreso, error, intento actual y ruta de logs. Sirven para saber qué pasó sin abrir el servidor.",
  },
  {
    title: "Datos de oferta",
    text: "Título, empresa, ubicación, URL, email, fuente y relación con la ejecución. El objetivo es convertir páginas dispersas en contactos verificables.",
  },
  {
    title: "Vista operativa",
    text: "Una vista SQL unificada permite consultar los resultados de todos los portales con la misma forma, aunque cada scraper mantenga sus tablas y matices.",
  },
];

const EXECUTION_FLOW = [
  "Lanzamiento manual desde el dashboard para búsquedas puntuales.",
  "Programación diaria con APScheduler para mantener el inventario fresco.",
  "Eventos SSE y logs persistidos para seguir las ejecuciones largas.",
  "Parada y reanudación manual cuando una fuente se atasca o hay que ajustar parámetros.",
  "Auto-retry cada 10 minutos para errores transitorios, con un límite de tres intentos.",
];

const CAPABILITIES = [
  {
    icon: Search,
    title: "Extracción multifuente",
    description:
      "Cada portal tiene su propio módulo de listados, filtros y detalle. El sistema evita una abstracción falsa: comparte la operativa común, pero respeta las diferencias reales de cada web.",
  },
  {
    icon: MailSearch,
    title: "Emails accionables",
    description:
      "No se queda en capturar URLs. Busca emails con mailto, expresiones regulares y lectura del código fuente, e incluso reconstruye direcciones ofuscadas («hr [at] hotel [dot] com») para convertir ofertas dispersas en contactos listos.",
  },
  {
    icon: Database,
    title: "Persistencia y deduplicación",
    description:
      "PostgreSQL guarda ejecuciones, ofertas y resultados. La deduplicación por email reduce el ruido y evita insistir sobre el mismo contacto entre fuentes distintas.",
  },
  {
    icon: CalendarClock,
    title: "Scheduler diario",
    description:
      "APScheduler lanza extracciones automáticas en ventanas configurables, recalcula la hora cada día con un re-scheduler a las 00:01 y permite ejecutar manualmente cuando hace falta.",
  },
  {
    icon: RefreshCcw,
    title: "Reintentos automáticos",
    description:
      "Un servicio revisa cada 10 minutos las ejecuciones fallidas o pendientes, respeta las paradas manuales y reintenta hasta tres veces antes de dar el caso por agotado.",
  },
  {
    icon: Download,
    title: "Operativa exportable",
    description:
      "El dashboard permite revisar el historial, abrir los logs, descargar CSV y limpiar ejecuciones sin tocar la base de datos ni ejecutar scripts a mano.",
  },
];

const ARCHITECTURE = [
  {
    title: "FastAPI como centro operativo",
    text: "La aplicación expone endpoints para lanzar, parar, reanudar, consultar el historial, descargar CSV, programar ejecuciones y leer los logs. Las mutaciones exigen una API key.",
  },
  {
    title: "Playwright por fuente",
    text: "Los scrapers navegan los portales, aplican filtros, recopilan URLs y entran al detalle de cada oferta para extraer los campos útiles.",
  },
  {
    title: "PostgreSQL como memoria",
    text: "Cada fuente tiene sus propias tablas de ejecuciones y ofertas. Una vista SQL unificada permite consultar todo el inventario sin duplicar datos.",
  },
  {
    title: "Dashboard estático",
    text: "HTML, CSS y JavaScript modular sirven una interfaz rápida para la extracción manual, la programación diaria, el historial, los logs y las exportaciones.",
  },
  {
    title: "Scheduler y auto-retry",
    text: "APScheduler se encarga de los trabajos diarios y un servicio de retry recupera los errores transitorios de red, timeouts o bloqueos temporales.",
  },
];

const DECISIONS = [
  {
    label: "Breadth-first antes que detalle",
    text: "Primero recopila las URLs de los resultados y después entra en cada oferta. Así reduce la navegación redundante y mantiene un mejor control del progreso.",
  },
  {
    label: "Deduplicar por email, no por URL",
    text: "Una misma empresa puede aparecer en varios portales o publicar ofertas similares. El email es la unidad operativa que importa para contactar.",
  },
  {
    label: "Respetar las paradas manuales",
    text: "El sistema distingue entre un fallo técnico y una parada solicitada. Si alguien detiene una ejecución, el auto-retry no la resucita por su cuenta.",
  },
  {
    label: "Anti-ban pragmático",
    text: "Rotación de user-agents, pausas aleatorias (jitter) y ejecuciones escalonadas, además de ventanas horarias aleatorias cada día, reducen la fricción sin convertir el scraper en una caja negra.",
  },
];

const STACK = [
  { name: "Python + FastAPI", why: "API asíncrona, routers por fuente y una base limpia para el dashboard, el scheduler y las operaciones." },
  { name: "Playwright", why: "Navegación real para portales con contenido dinámico, formularios, cookies y páginas de detalle." },
  { name: "SQLAlchemy 2.0 + PostgreSQL", why: "Modelos por fuente, persistencia histórica, deduplicación y una vista unificada de ofertas. Pool con pre-ping y reciclado de conexiones." },
  { name: "APScheduler", why: "Ejecuciones diarias en ventanas configurables, re-scheduler diario y trabajos de recuperación." },
  { name: "SSE + logs", why: "Feedback en tiempo real desde el dashboard durante las ejecuciones largas." },
  { name: "Docker", why: "Despliegue reproducible con volumen persistente para datos, logs y exportaciones." },
];

const dataModel = [
  {
    name: "scrape_executions (× 4 fuentes)",
    purpose:
      "Metadata de cada ejecución por portal. Es lo que permite auditar una corrida sin abrir el servidor y lo que consume el auto-retry.",
    fields: ["status", "city", "radius", "country", "start_time", "offers_count", "retry_count", "max_retries", "log_text", "is_hidden"],
  },
  {
    name: "job_offers_<fuente> (× 4)",
    purpose:
      "Ofertas extraídas por portal, con la oferta atada a su ejecución. Cada fuente conserva sus matices (p. ej. industria en tres de ellas).",
    fields: ["puesto", "empresa", "ciudad", "email", "url_oferta", "pais", "fuente", "fecha_scrape", "texto_oferta"],
  },
  {
    name: "job_offers (VIEW)",
    purpose:
      "Vista que cruza las cuatro fuentes con UNION ALL y deduplica por email (DISTINCT ON LOWER(email)), conservando la oferta más reciente de cada contacto.",
    fields: ["DISTINCT ON (LOWER(email))", "UNION ALL × 4", "ORDER BY fecha_scrape DESC"],
  },
  {
    name: "<fuente>_daily_config (× 4)",
    purpose:
      "Configuración diaria por portal: qué ciudades, con qué radio y filtros, y en qué ventana horaria se ejecuta de forma automática.",
    fields: ["cities", "radius", "is_active", "window_start", "window_end"],
  },
];

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-mono text-accent-light uppercase tracking-wider mb-3">
      {children}
    </p>
  );
}

export default function SwissHotelJobScraperPage() {
  return (
    <main className="project-page min-h-screen text-text-primary pt-16">
      <div className="max-w-content mx-auto px-6 pt-8">
        <Link
          href="/#work"
          className="project-kicker text-sm text-accent hover:text-accent-light transition-colors font-mono inline-flex items-center gap-2 px-4 py-2 rounded-full"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Volver a proyectos
        </Link>
      </div>

      <article className="max-w-[1120px] mx-auto px-6 pt-16 pb-32">
        <header className="mb-16">
          <div className="flex items-center gap-3 mb-8 flex-wrap">
            <span className="text-xs text-text-muted font-mono">2026</span>
            <span className="text-xs text-text-muted font-mono">FastAPI + Playwright + PostgreSQL</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 max-w-5xl">
            Scraper de empleo para hoteles suizos
          </h1>

          <p className="text-xl md:text-2xl text-text-secondary leading-relaxed max-w-4xl mb-8">
            Un sistema operativo para buscar oportunidades en el sector hotelero suizo: ejecuta scrapers en cuatro portales, extrae emails de contacto, deduplica ofertas, guarda histórico y permite operar todo desde un dashboard propio.
          </p>

          <div className="flex flex-wrap gap-2">
            {["Python", "FastAPI", "Playwright", "PostgreSQL", "SQLAlchemy", "APScheduler", "Docker", "Vanilla JS"].map((tech) => (
              <span key={tech} className="tag">
                {tech}
              </span>
            ))}
          </div>
        </header>

        <section className="mb-20">
          <div className="card card-lg overflow-hidden relative bg-bg-secondary aspect-video">
            <ZoomableImage
              src="/screenshots/scraper.webp"
              alt="Dashboard del scraper mostrando el historial de ejecuciones de HotelCareer"
              fill
              containerClassName="h-full"
              imageClassName="object-contain p-4"
              priority
            />
          </div>
        </section>

        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
          {METRICS.map((metric) => (
            <div key={metric.label} className="card p-6">
              <div className="text-3xl md:text-4xl font-bold tracking-tight text-accent mb-2">
                {metric.value}
              </div>
              <p className="text-xs text-text-muted uppercase tracking-wider font-medium">
                {metric.label}
              </p>
            </div>
          ))}
        </section>

        <section className="mb-24">
          <SectionLabel>Pipeline</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
            De una búsqueda dispersa a datos listos para accionar.
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            {PIPELINE.map((item) => (
              <div key={item.step} className="card p-6">
                <p className="text-sm font-mono text-accent-light mb-5">{item.step}</p>
                <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-10 mb-24">
          <div>
            <SectionLabel>El problema</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Buscar a mano no escalaba.
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed mb-5">
              Para contactar con hoteles en Suiza no bastaba con mirar una bolsa de empleo de vez en cuando. Había que revisar varias fuentes, repetir filtros por ciudades o regiones, abrir las ofertas una a una, localizar los emails, evitar duplicados y conservar un histórico fiable.
            </p>
            <p className="text-lg text-text-secondary leading-relaxed">
              El verdadero cuello de botella no era encontrar una oferta concreta, sino convertir cientos de resultados dispersos en una base de contactos útil, limpia y accionable.
            </p>
          </div>

          <div>
            <SectionLabel>La solución</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Una herramienta interna, no un script suelto.
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed mb-5">
              Construí una aplicación modular con FastAPI y Playwright que centraliza cuatro scrapers, registra cada ejecución, muestra logs, permite parar o reanudar procesos y exporta los resultados para campañas posteriores.
            </p>
            <p className="text-lg text-text-secondary leading-relaxed">
              La parte importante fue diseñarla para el uso real: fallos de red, selectores que cambian, ejecuciones largas, contactos repetidos y la necesidad de operar sin entrar al servidor.
            </p>
          </div>
        </section>

        <section className="mb-24">
          <SectionLabel>Fuentes conectadas</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-10">
            Cuatro portales, una misma operativa.
          </h2>

          <div className="grid md:grid-cols-2 gap-5">
            {SOURCES.map((source) => (
              <div key={source.name} className="card p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{source.name}</h3>
                    <p className="text-sm font-mono text-accent-light">{source.url}</p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <Workflow size={18} className="text-accent" aria-hidden="true" />
                  </div>
                </div>
                <p className="text-text-secondary leading-relaxed">{source.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <SectionLabel>Datos</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
            El valor no está en extraer HTML, sino en dejar una base fiable.
          </h2>
          <p className="text-lg text-text-secondary leading-relaxed mb-10 max-w-4xl">
            El sistema separa lo que ocurre durante la ejecución de lo que queda como resultado comercial. Esa diferencia permite auditar fallos sin ensuciar la base de contactos.
          </p>

          <div className="grid md:grid-cols-3 gap-5">
            {DATA_LAYER.map((item) => (
              <div key={item.title} className="card p-7">
                <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-5">
                  <Database size={20} className="text-accent" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <SectionLabel>Modelo de datos</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
            Tablas por fuente, una sola vista para consultar.
          </h2>
          <p className="text-lg text-text-secondary leading-relaxed mb-10 max-w-4xl">
            Cada portal conserva sus propias tablas de ejecuciones y ofertas, porque sus webs no son iguales. Encima, una vista SQL unifica todo y deduplica por email, que es la unidad que de verdad importa para contactar.
          </p>
          <DataModelTable items={dataModel} />
        </section>

        <section className="mb-24">
          <SectionLabel>Funcionalidades</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-10">
            Lo que lo hace operable.
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CAPABILITIES.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="card p-7">
                  <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-5">
                    <Icon size={20} className="text-accent" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mb-24">
          <div className="card card-lg overflow-hidden relative bg-bg-secondary aspect-video">
            <ZoomableImage
              src="/screenshots/scrapersito.webp"
              alt="Dashboard del scraper de Hogapage con el historial de ejecuciones"
              fill
              containerClassName="h-full"
              imageClassName="object-contain p-4"
            />
          </div>
        </section>

        <section className="grid lg:grid-cols-[3fr_2fr] gap-10 mb-24">
          <div>
            <SectionLabel>Ejecución</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Pensado para correr muchas veces, no para una demo.
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed mb-5">
              La ejecución combina control manual, programación diaria y recuperación automática. Así el scraper puede vivir como herramienta interna: visible cuando se opera, silencioso cuando funciona y trazable cuando algo falla.
            </p>
            <p className="text-lg text-text-secondary leading-relaxed">
              Cada corrida tiene su propio estado, logs, progreso, exportación y reglas claras para parar, reanudar o reintentar. Esa capa es la que convierte el scraping en operativa.
            </p>
          </div>

          <div className="card p-7">
            <div className="flex items-center gap-3 mb-5">
              <RefreshCcw size={20} className="text-accent" aria-hidden="true" />
              <h3 className="text-xl font-semibold">Ciclo de ejecución</h3>
            </div>
            <ul className="space-y-4 text-sm text-text-secondary">
              {EXECUTION_FLOW.map((item) => (
                <li key={item} className="flex gap-3 items-start">
                  <span className="text-accent mt-0.5">&rarr;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-24">
          <SectionLabel>Arquitectura</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
            Separar bien las responsabilidades fue la clave.
          </h2>
          <p className="text-lg text-text-secondary leading-relaxed mb-10 max-w-4xl">
            El proyecto pasó de ser una automatización puntual a una aplicación con capas claras: dashboard, API, scheduler, scrapers, persistencia, exportaciones y recuperación ante errores.
          </p>

          <div className="space-y-4">
            {ARCHITECTURE.map((item, index) => (
              <div key={item.title} className="card p-6 flex gap-5 items-start">
                <span className="text-accent font-mono text-sm shrink-0 mt-1">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid lg:grid-cols-[4fr_3fr] gap-10 mb-24">
          <div>
            <SectionLabel>Lo difícil</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              El scraping falla justo donde el producto necesita estabilidad.
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed mb-5">
              Las webs cambian, los banners molestan, los emails se esconden, una ejecución puede tardar más de lo previsto y algunas respuestas llegan incompletas. Por eso el proyecto se diseñó alrededor de la trazabilidad y la recuperación, no solo de la extracción.
            </p>
            <p className="text-lg text-text-secondary leading-relaxed">
              La interfaz muestra estado, progreso, logs y descargas; la base de datos conserva lo que pasó; y el auto-retry absorbe los fallos transitorios sin convertir cada incidencia en una tarea manual.
            </p>
          </div>

          <div className="card p-7">
            <div className="flex items-center gap-3 mb-5">
              <ShieldCheck size={20} className="text-accent" aria-hidden="true" />
              <h3 className="text-xl font-semibold">Robustez real</h3>
            </div>
            <ul className="space-y-4 text-sm text-text-secondary">
              {[
                "Estados separados: pending, running, completed, failed y stopped.",
                "Logs persistidos para revisar las ejecuciones terminadas.",
                "Reintentos con límite y espera configurable (30 min entre intentos).",
                "Descarga CSV por ejecución y vista histórica filtrable.",
                "CORS, API key y cabeceras de seguridad para el despliegue.",
              ].map((item) => (
                <li key={item} className="flex gap-3 items-start">
                  <span className="text-accent mt-0.5">&rarr;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-24">
          <SectionLabel>Decisiones técnicas</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-10">
            Decisiones pequeñas que cambian el resultado.
          </h2>

          <div className="grid md:grid-cols-2 gap-5">
            {DECISIONS.map((decision) => (
              <div key={decision.label} className="card p-7">
                <p className="text-sm font-mono text-accent-light mb-3">{decision.label}</p>
                <p className="text-text-secondary leading-relaxed">{decision.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <SectionLabel>Stack con contexto</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
            Tecnología elegida por utilidad, no por escaparate.
          </h2>

          <div className="space-y-4">
            {STACK.map((item) => (
              <div key={item.name} className="flex gap-4 items-start">
                <div className="w-2 h-2 rounded-full bg-accent mt-3 shrink-0" />
                <div>
                  <p className="font-semibold font-mono text-sm text-accent-light mb-1">
                    {item.name}
                  </p>
                  <p className="text-sm text-text-secondary leading-relaxed">{item.why}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer className="text-center py-16 border-t border-border">
          <p className="text-xl md:text-2xl text-text-secondary leading-relaxed max-w-3xl mx-auto mb-10">
            Este proyecto resume una parte muy concreta de mi forma de construir: convertir un proceso repetitivo y frágil en una herramienta interna mantenible, observable y lista para operar.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/#contact" className="btn btn-primary">
              Hablemos
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
            <Link href="/#work" className="btn btn-outline">
              Ver más proyectos
            </Link>
          </div>
        </footer>
      </article>
    </main>
  );
}
