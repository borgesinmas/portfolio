import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Scraper de Empleo de Hoteles Suizos - Caso de Estudio",
  description:
    "Caso de estudio de un sistema multi-scraper para localizar ofertas de empleo en hoteles suizos, extraer emails, deduplicar contactos y operar ejecuciones desde un dashboard propio.",
};

const SOURCES = [
  {
    name: "HotelCareer",
    url: "hotelcareer.ch",
    detail: "Busqueda por ciudad, radio y pais, con historial de ejecuciones y exportacion por ciudad.",
  },
  {
    name: "Hogapage",
    url: "hogapage.ch",
    detail: "Scraper adaptado a categorias y radios mas amplios para cubrir ofertas de hosteleria.",
  },
  {
    name: "Gastrojob",
    url: "gastrojob.ch",
    detail: "Extraccion por regiones, categorias y tipos de empleo del sector gastro-hotelero.",
  },
  {
    name: "Hoteljob",
    url: "hoteljob-schweiz.de",
    detail: "Fuente adicional para ampliar cobertura y no depender de un unico portal.",
  },
];

const METRICS = [
  { value: "4", label: "portales conectados" },
  { value: "24h", label: "ejecucion programada" },
  { value: "3", label: "reintentos por fallo" },
  { value: "1", label: "vista unificada" },
];

const PIPELINE = [
  {
    step: "01",
    title: "Configurar busqueda",
    text: "Ciudad, radio, pais, portal y ventana de ejecucion quedan definidos antes de lanzar el proceso. La operativa empieza con parametros visibles, no con constantes escondidas en un script.",
  },
  {
    step: "02",
    title: "Recolectar listados",
    text: "Cada fuente navega sus resultados, pagina cuando hace falta y guarda URLs candidatas con estado de progreso para poder auditar donde se quedo una ejecucion.",
  },
  {
    step: "03",
    title: "Entrar al detalle",
    text: "El scraper abre cada oferta, extrae campos utiles y busca emails por varias rutas: enlaces mailto, texto visible, regex y lectura del codigo fuente.",
  },
  {
    step: "04",
    title: "Normalizar y deduplicar",
    text: "Los resultados aterrizan en PostgreSQL, se cruzan por email y quedan listos para revisar, exportar o reutilizar sin repetir contactos entre portales.",
  },
];

const DATA_LAYER = [
  {
    title: "Datos de ejecucion",
    text: "Estado, portal, ciudad, radio, timestamps, progreso, error, intento actual y ruta de logs. Sirven para saber que paso sin abrir el servidor.",
  },
  {
    title: "Datos de oferta",
    text: "Titulo, empresa, ubicacion, URL, email, fuente y relacion con la ejecucion. El objetivo es convertir paginas dispersas en contactos verificables.",
  },
  {
    title: "Vista operativa",
    text: "Una vista SQL unificada permite consultar resultados de todos los portales con la misma forma, aunque cada scraper mantenga sus tablas y matices.",
  },
];

const EXECUTION_FLOW = [
  "Lanzamiento manual desde dashboard para busquedas puntuales.",
  "Programacion diaria con APScheduler para mantener el inventario fresco.",
  "Eventos SSE y logs persistidos para seguir ejecuciones largas.",
  "Parada y reanudacion manual cuando una fuente se atasca o hay que ajustar parametros.",
  "Auto-retry cada 10 minutos para errores transitorios, con limite de tres intentos.",
];

const CAPABILITIES = [
  {
    icon: Search,
    title: "Extraccion multi-fuente",
    description:
      "Cada portal tiene su propio modulo de listados, filtros y detalle. El sistema evita una abstraccion falsa: comparte la operativa comun, pero respeta las diferencias reales de cada web.",
  },
  {
    icon: MailSearch,
    title: "Emails accionables",
    description:
      "No se queda en capturar URLs. Busca emails con mailto, regex y lectura del codigo fuente para convertir ofertas dispersas en contactos listos para campanas.",
  },
  {
    icon: Database,
    title: "Persistencia y deduplicacion",
    description:
      "PostgreSQL guarda ejecuciones, ofertas y resultados. La deduplicacion por email reduce ruido y evita insistir sobre el mismo contacto entre fuentes distintas.",
  },
  {
    icon: CalendarClock,
    title: "Scheduler diario",
    description:
      "APScheduler lanza extracciones automaticas en ventanas configurables, recalcula horarios cada dia y permite ejecutar manualmente cuando hace falta.",
  },
  {
    icon: RefreshCcw,
    title: "Reintentos automaticos",
    description:
      "Un servicio revisa cada 10 minutos ejecuciones fallidas o pendientes, respeta paradas manuales y reintenta hasta tres veces antes de dar el caso por agotado.",
  },
  {
    icon: Download,
    title: "Operativa exportable",
    description:
      "El dashboard permite revisar historial, abrir logs, descargar CSV y limpiar ejecuciones sin tocar la base de datos ni ejecutar scripts manuales.",
  },
];

const ARCHITECTURE = [
  {
    title: "FastAPI como centro operativo",
    text: "La aplicacion expone endpoints para lanzar, parar, reanudar, consultar historial, descargar CSV, programar ejecuciones y leer logs.",
  },
  {
    title: "Playwright por fuente",
    text: "Los scrapers navegan los portales, aplican filtros, recopilan URLs y entran en detalle de cada oferta para extraer los campos utiles.",
  },
  {
    title: "PostgreSQL como memoria",
    text: "Cada fuente tiene tablas propias de ejecuciones y ofertas. Una vista SQL unificada permite consultar todo el inventario sin duplicar datos.",
  },
  {
    title: "Dashboard estatico",
    text: "HTML, CSS y JavaScript modular sirven una interfaz rapida para extraccion manual, programacion diaria, historial, logs y exportaciones.",
  },
  {
    title: "Scheduler y auto-retry",
    text: "APScheduler se encarga de los trabajos diarios y un servicio de retry recupera errores transitorios de red, timeouts o bloqueos temporales.",
  },
];

const DECISIONS = [
  {
    label: "Breadth-first antes de detalle",
    text: "Primero recopila las URLs de resultados y despues entra en cada oferta. Asi reduce navegacion redundante y mantiene mejor control de progreso.",
  },
  {
    label: "Deduplicar por email, no por URL",
    text: "Una misma empresa puede aparecer en varios portales o publicar ofertas similares. El email es la unidad operativa que importa para contactar.",
  },
  {
    label: "Paradas manuales respetadas",
    text: "El sistema distingue entre fallo tecnico y parada solicitada. Si alguien detiene una ejecucion, el auto-retry no la resucita por su cuenta.",
  },
  {
    label: "Anti-ban pragmatica",
    text: "User-agents rotados, pausas aleatorias, manejo de cookies y ejecuciones distribuidas reducen friccion sin convertir el scraper en una caja negra.",
  },
];

const STACK = [
  { name: "Python + FastAPI", why: "API asincrona, routers por fuente y una base limpia para dashboard, scheduler y operaciones." },
  { name: "Playwright", why: "Navegacion real para portales con contenido dinamico, formularios, cookies y paginas de detalle." },
  { name: "SQLAlchemy + PostgreSQL", why: "Modelos por fuente, persistencia historica, deduplicacion y vista unificada de ofertas." },
  { name: "APScheduler", why: "Ejecuciones diarias en ventanas configurables, rescheduler diario y trabajos de recuperacion." },
  { name: "SSE + logs", why: "Feedback en tiempo real desde el dashboard durante ejecuciones largas." },
  { name: "Docker", why: "Despliegue reproducible con volumen persistente para datos, logs y exportaciones." },
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
            Un sistema operativo para buscar oportunidades en el sector hotelero suizo: ejecuta scrapers en cuatro portales, extrae emails de contacto, deduplica ofertas, guarda historico y permite operar todo desde un dashboard propio.
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
          <div className="rounded-xl overflow-hidden border border-border bg-bg-secondary">
            <Image
              src="/screenshots/scraper.png"
              alt="Dashboard del scraper mostrando el historial de ejecuciones de HotelCareer"
              width={1880}
              height={920}
              className="w-full h-auto"
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
            De busqueda dispersa a datos listos para accionar.
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
              Buscar manualmente no escalaba.
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed mb-5">
              Para contactar hoteles en Suiza no bastaba con mirar una bolsa de empleo de vez en cuando. Habia que revisar varias fuentes, repetir filtros por ciudades o regiones, abrir ofertas una a una, localizar emails, evitar duplicados y conservar un historico fiable.
            </p>
            <p className="text-lg text-text-secondary leading-relaxed">
              El verdadero cuello de botella no era encontrar una oferta concreta, sino convertir cientos de resultados dispersos en una base de contactos util, limpia y accionable.
            </p>
          </div>

          <div>
            <SectionLabel>La solucion</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Una herramienta interna, no un script suelto.
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed mb-5">
              Construí una aplicacion modular con FastAPI y Playwright que centraliza cuatro scrapers, registra cada ejecucion, muestra logs, permite parar o reanudar procesos y exporta resultados para campanas posteriores.
            </p>
            <p className="text-lg text-text-secondary leading-relaxed">
              La parte importante fue diseñarla para el uso real: fallos de red, selectores que cambian, ejecuciones largas, contactos repetidos y necesidad de operar sin entrar al servidor.
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
            El valor no esta en rascar HTML, sino en dejar una base fiable.
          </h2>
          <p className="text-lg text-text-secondary leading-relaxed mb-10 max-w-4xl">
            El sistema separa lo que ocurre durante la ejecucion de lo que queda como resultado comercial. Esa diferencia permite auditar fallos sin ensuciar la base de contactos.
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
          <SectionLabel>Funcionalidades</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-10">
            Lo que hace que sea operable.
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
          <div className="rounded-xl overflow-hidden border border-border bg-bg-secondary">
            <Image
              src="/screenshots/scrapersito.png"
              alt="Dashboard del scraper de Hogapage con historial de ejecuciones"
              width={1880}
              height={954}
              className="w-full h-auto"
            />
          </div>
        </section>

        <section className="grid lg:grid-cols-[3fr_2fr] gap-10 mb-24">
          <div>
            <SectionLabel>Ejecucion</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Pensado para correr muchas veces, no para lucir una demo.
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed mb-5">
              La ejecucion combina control manual, programacion diaria y recuperacion automatica. Asi el scraper puede vivir como herramienta interna: visible cuando se opera, silencioso cuando funciona y trazable cuando algo falla.
            </p>
            <p className="text-lg text-text-secondary leading-relaxed">
              Cada run tiene estado propio, logs, progreso, exportacion y reglas claras para parar, reanudar o reintentar. Esa capa es la que convierte scraping en operativa.
            </p>
          </div>

          <div className="card p-7">
            <div className="flex items-center gap-3 mb-5">
              <RefreshCcw size={20} className="text-accent" aria-hidden="true" />
              <h3 className="text-xl font-semibold">Ciclo de ejecucion</h3>
            </div>
            <ul className="space-y-4 text-sm text-text-secondary">
              {EXECUTION_FLOW.map((item) => (
                <li key={item} className="flex gap-3 items-start">
                  <span className="text-accent mt-0.5">-&gt;</span>
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
            El proyecto paso de ser una automatizacion puntual a una aplicacion con capas claras: dashboard, API, scheduler, scrapers, persistencia, exportaciones y recuperacion ante errores.
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
            <SectionLabel>Lo dificil</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              El scraping falla donde el producto necesita estabilidad.
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed mb-5">
              Las webs cambian, los banners molestan, los emails se esconden, una ejecucion puede tardar mas de lo previsto y algunas respuestas llegan incompletas. Por eso el proyecto se diseño alrededor de trazabilidad y recuperacion, no solo alrededor de extraccion.
            </p>
            <p className="text-lg text-text-secondary leading-relaxed">
              La interfaz muestra estado, progreso, logs y descargas; la base de datos conserva lo que paso; y el auto-retry absorbe fallos transitorios sin convertir cada incidencia en una tarea manual.
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
                "Logs persistidos para revisar ejecuciones terminadas.",
                "Reintentos con limite y espera configurable.",
                "Descarga CSV por ejecucion y vista historica filtrable.",
                "CORS, API key y cabeceras de seguridad para despliegue.",
              ].map((item) => (
                <li key={item} className="flex gap-3 items-start">
                  <span className="text-accent mt-0.5">-&gt;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-24">
          <SectionLabel>Decisiones tecnicas</SectionLabel>
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
            Tecnologia elegida por utilidad, no por escaparate.
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
            Este proyecto demuestra una parte muy concreta de mi forma de construir: convertir un proceso repetitivo y fragil en una herramienta interna mantenible, observable y lista para operar.
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
