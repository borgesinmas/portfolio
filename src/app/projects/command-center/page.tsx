import Link from "next/link";
import type { Metadata } from "next";
import { ZoomableImage } from "@/components/ZoomableImage";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Bot,
  Cloud,
  Database,
  Gauge,
  KeyRound,
  Layers3,
  LockKeyhole,
  Mail,
  Network,
  Server,
  ShieldCheck,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Command Center — Caso de Estudio",
  description:
    "Caso de estudio de Command Center: la web central de Growork para acceder a herramientas internas, automatizaciones, CRM, base de datos, Dokploy, scraper, finanzas y Project Flow, con seguridad Cloudflare Zero Trust.",
};

const TOOLS = [
  {
    icon: Workflow,
    name: "n8n",
    text: "Automatizaciones internas, webhooks, flujos de documentos, emails, CRM y procesos que no necesitan vivir dentro de una app principal.",
  },
  {
    icon: Bot,
    name: "Web Scraper",
    text: "Acceso directo al sistema de scraping para extraer y operar oportunidades o contactos desde portales externos.",
  },
  {
    icon: Mail,
    name: "Envíos de clientes",
    text: "Herramienta interna para gestionar envíos, revisar actividad y trabajar la operativa de email asociada a los clientes.",
  },
  {
    icon: Gauge,
    name: "Finanzas",
    text: "Panel operativo para tesorería, pagos, ingresos, servicios y datos financieros que alimentan otras piezas del sistema.",
  },
  {
    icon: Network,
    name: "CRM",
    text: "Entrada al CRM donde se gestionan leads, clientes, pipelines y el contexto comercial de Growork.",
  },
  {
    icon: Database,
    name: "Base de datos",
    text: "Acceso controlado a pgAdmin para la administración, inspección y mantenimiento de los datos y la infraestructura.",
  },
  {
    icon: KeyRound,
    name: "Gestor de contraseñas",
    text: "Bóveda de credenciales y accesos para reducir la dispersión y evitar compartir secretos por canales inseguros.",
  },
  {
    icon: Server,
    name: "Dokploy",
    text: "Panel de despliegue y gestión de contenedores Docker para los servicios internos alojados en el VPS.",
  },
  {
    icon: Layers3,
    name: "Project Flow",
    text: "Workspace de proyectos, tareas, capacidad, solicitudes, conocimiento y plantillas para la operativa interna.",
  },
];

const METRICS = [
  { value: "11", label: "accesos centralizados" },
  { value: "1", label: "puerta de entrada" },
  { value: "2FA", label: "verificación de acceso" },
  { value: "24/7", label: "siempre activa" },
];

const ACCESS_CRITERIA = [
  {
    title: "Público",
    text: "La web de Growork y las superficies pensadas para clientes o visitantes. Aquí el objetivo es disponibilidad, claridad y una entrada sin fricción innecesaria.",
  },
  {
    title: "Cliente",
    text: "Portales o herramientas con acceso acotado a una relación concreta. Separan lo que el cliente necesita ver de la operativa interna de la agencia.",
  },
  {
    title: "Equipo interno",
    text: "Herramientas de gestión, automatización, datos, despliegue y credenciales. Solo entran cuentas autorizadas y verificadas por la capa de identidad.",
  },
  {
    title: "Infraestructura",
    text: "Paneles como Dokploy, la base de datos o el gestor de contraseñas. Son accesos sensibles y se tratan como superficie crítica, no como simples enlaces.",
  },
];

const ARCHITECTURE = [
  {
    title: "Frontend estático con Vite",
    text: "La central es deliberadamente simple: una web rápida, ligera y siempre disponible, construida con Vite, Tailwind por CDN, HTML estático y una pequeña capa de JavaScript.",
  },
  {
    title: "Nginx como servidor de producción",
    text: "El Dockerfile compila la app y sirve el resultado desde nginx:alpine. Menos piezas móviles para una página que tiene que estar siempre disponible.",
  },
  {
    title: "VPS con Dokploy",
    text: "Los servicios internos viven en un VPS donde Dokploy permite desplegar, reiniciar y gestionar contenedores sin convertir cada cambio en una operación manual de servidor.",
  },
  {
    title: "Subdominios por herramienta",
    text: "Cada sistema tiene su entrada clara: n8n, scraper, web interna, finanzas, CRM, base de datos, gestor de contraseñas, Dokploy, Project Flow y la web pública.",
  },
  {
    title: "Cloudflare como perímetro",
    text: "Las webs internas se protegen con Cloudflare Zero Trust, políticas de acceso y verificación 2FA asociada a los correos autorizados del equipo.",
  },
];

const DECISIONS = [
  {
    label: "Una central, no una lista de marcadores",
    text: "El objetivo era tener una pantalla fija para operar Growork: entrar a automatizaciones, datos, CRM, finanzas, despliegues y herramientas internas sin buscar URLs ni depender de la memoria.",
  },
  {
    label: "Mantenerla estática",
    text: "No necesita base de datos ni backend propio. Al ser estática, el riesgo de caída y el mantenimiento bajan mucho, algo importante para una página que se usa como punto de acceso diario.",
  },
  {
    label: "La seguridad, fuera de la interfaz",
    text: "La protección crítica no depende de esconder enlaces. Está en Cloudflare Zero Trust, las políticas, la verificación 2FA y el control por correo autorizado.",
  },
  {
    label: "Diferenciar interno y público",
    text: "La web pública de Growork y el portal de clientes tienen otro modelo de acceso. El resto de herramientas internas viven detrás de políticas de equipo para reducir la superficie de ataque.",
  },
  {
    label: "Dokploy como capa operativa",
    text: "Centralizar los despliegues en Dokploy permite mantener muchas webs internas sin convertir el VPS en un conjunto de procesos opacos y difíciles de recuperar.",
  },
  {
    label: "Diseño escaneable",
    text: "Tarjetas grandes, color por herramienta, fondo reconocible, modo claro/oscuro y animaciones suaves hacen que la página se use rápido sin tener que explicar nada.",
  },
];

const SECURITY = [
  {
    icon: ShieldCheck,
    title: "Zero Trust delante de las apps",
    text: "Las herramientas internas quedan cubiertas por Cloudflare Access antes de llegar a la aplicación. El usuario debe superar la política definida para el dominio.",
  },
  {
    icon: LockKeyhole,
    title: "2FA y correo del equipo",
    text: "El acceso se limita a personas con correos autorizados del equipo que pasan una verificación de dos factores, reduciendo el riesgo de entrada no autorizada.",
  },
  {
    icon: Cloud,
    title: "Exposición controlada",
    text: "Aunque los servicios vivan en un VPS, el acceso público a las herramientas internas no queda abierto directamente: Cloudflare actúa como filtro de identidad.",
  },
];

const SECURITY_MODEL = [
  "La landing central no concede permisos: solo ordena rutas y reduce la fricción operativa.",
  "Cloudflare Access decide quién puede entrar antes de que la petición llegue a cada servicio interno.",
  "Las políticas se piensan por sensibilidad: no es lo mismo abrir una web pública que exponer el CRM, los datos o los despliegues.",
  "2FA y correo autorizado elevan el coste de entrada sin complicar la pantalla diaria del equipo.",
  "Los subdominios hacen explícita la frontera entre producto público, cliente, equipo e infraestructura.",
];

const STACK = [
  { name: "Vite", why: "Build rápido para una web estática que no necesita un framework pesado ni un backend propio." },
  { name: "HTML + Tailwind (CDN)", why: "Página de acceso muy directa, con estilos rápidos de iterar y tarjetas visuales por herramienta." },
  { name: "Vanilla JS", why: "Interacciones pequeñas: tema claro/oscuro, persistencia en localStorage y animaciones con Vanilla Tilt." },
  { name: "Docker multi-stage", why: "Compila en Node 20 Alpine y sirve el resultado final desde Nginx Alpine." },
  { name: "Nginx", why: "Servidor simple y estable para una central que debe estar siempre disponible." },
  { name: "Dokploy", why: "Gestión de despliegues, contenedores y servicios internos dentro del VPS." },
  { name: "Cloudflare Zero Trust", why: "Capa de identidad y acceso para proteger las herramientas internas con políticas y 2FA." },
  { name: "Subdominios de Growork", why: "Cada herramienta tiene una entrada clara y recordable dentro del ecosistema." },
];

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-mono text-accent-light uppercase tracking-wider mb-3">
      {children}
    </p>
  );
}

export default function CommandCenterPage() {
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
            <span className="text-xs text-text-muted font-mono">Vite + Docker + Cloudflare Zero Trust</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 max-w-5xl">
            Command Center
          </h1>

          <p className="text-xl md:text-2xl text-text-secondary leading-relaxed max-w-4xl mb-8">
            La web central que mantengo siempre activa para entrar a todo el ecosistema interno de Growork: automatizaciones, scraper, web interna, finanzas, CRM, base de datos, gestor de contraseñas, Dokploy, Project Flow y la web pública.
          </p>

          <div className="flex flex-wrap gap-2">
            {["Vite", "Tailwind", "Vanilla JS", "Docker", "Nginx", "Dokploy", "Cloudflare Zero Trust", "2FA"].map((tech) => (
              <span key={tech} className="tag">
                {tech}
              </span>
            ))}
          </div>
        </header>

        <section className="mb-20">
          <div className="card card-lg overflow-hidden relative bg-bg-secondary aspect-video">
            <ZoomableImage
              src="/screenshots/central.webp"
              alt="Command Center de Growork con tarjetas de acceso a n8n, scraper, web interna, finanzas, CRM, base de datos, gestor de contraseñas, Dokploy y Project Flow"
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
          <SectionLabel>Criterio de acceso</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
            La pregunta no era dónde poner enlaces, sino quién debe llegar a qué.
          </h2>
          <p className="text-lg text-text-secondary leading-relaxed mb-10 max-w-4xl">
            Command Center organiza el ecosistema según su sensibilidad: público, cliente, equipo e infraestructura. Esa clasificación permite que una página sencilla forme parte de una política de acceso seria.
          </p>

          <div className="grid md:grid-cols-4 gap-4">
            {ACCESS_CRITERIA.map((item, index) => (
              <div key={item.title} className="card p-6">
                <p className="text-sm font-mono text-accent-light mb-5">
                  {String(index + 1).padStart(2, "0")}
                </p>
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
              Cuando el negocio crece, también crece el número de puertas.
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed mb-5">
              Growork no depende de una sola aplicación. Hay automatizaciones, CRM, base de datos, herramientas de email, finanzas, scraping, gestores de despliegue y workspaces internos. Tener cada URL perdida en favoritos o chats acaba siendo lento y poco seguro.
            </p>
            <p className="text-lg text-text-secondary leading-relaxed">
              Necesitaba una entrada diaria, clara y estable: una página que actuara como mapa de operaciones y que, al mismo tiempo, dejara claro que los accesos sensibles viven detrás de identidad, políticas y verificación.
            </p>
          </div>

          <div>
            <SectionLabel>La solución</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Una consola ligera para entrar a todo el ecosistema.
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed mb-5">
              Construir Command Center fue una decisión de operativa: una web estática, muy rápida, con tarjetas visuales por herramienta, modo claro/oscuro y enlaces directos a los servicios que uso para gestionar Growork.
            </p>
            <p className="text-lg text-text-secondary leading-relaxed">
              La seguridad no vive en la tarjeta. Vive delante de cada herramienta interna: Cloudflare Zero Trust, políticas por correo autorizado, verificación 2FA y servicios desplegados en el VPS con Dokploy.
            </p>
          </div>
        </section>

        <section className="mb-24">
          <SectionLabel>Herramientas conectadas</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-10">
            Una pantalla para operar sistemas que normalmente viven separados.
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TOOLS.map((tool) => {
              const Icon = tool.icon;
              return (
                <div key={tool.name} className="card p-7">
                  <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-5">
                    <Icon size={20} className="text-accent" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{tool.name}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{tool.text}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mb-24">
          <SectionLabel>Arquitectura</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
            Simple en la superficie, seria en la infraestructura.
          </h2>
          <p className="text-lg text-text-secondary leading-relaxed mb-10 max-w-4xl">
            Command Center no intenta ser el cerebro de todas las herramientas. Su valor está en ser una entrada estable y limpia, mientras Dokploy, el VPS y Cloudflare se encargan del despliegue, la disponibilidad y el control de acceso.
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

        <section className="mb-24">
          <SectionLabel>Seguridad</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-10">
            La protección importante está antes de llegar a la app.
          </h2>

          <div className="grid md:grid-cols-3 gap-5 mb-8">
            {SECURITY.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="card p-7">
                  <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-5">
                    <Icon size={20} className="text-accent" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{item.text}</p>
                </div>
              );
            })}
          </div>

          <blockquote className="pl-6 border-l-2 border-accent/40 text-text-secondary text-lg italic leading-relaxed">
            Salvo la web pública de Growork y el portal de clientes, las herramientas internas están cubiertas por Cloudflare Zero Trust, con políticas de acceso y verificación 2FA para las cuentas autorizadas del equipo.
          </blockquote>
        </section>

        <section className="grid lg:grid-cols-[3fr_2fr] gap-10 mb-24">
          <div>
            <SectionLabel>Modelo de seguridad</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Una consola útil porque no intenta ser la capa de permisos.
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed mb-5">
              El criterio fue mantener Command Center como una superficie de orientación y dejar la autorización en el perímetro correcto. La página ayuda al equipo a llegar rápido; Cloudflare decide si alguien puede entrar.
            </p>
            <p className="text-lg text-text-secondary leading-relaxed">
              Esa separación evita una falsa sensación de seguridad: ocultar URLs no protege sistemas internos, pero la identidad, el 2FA, las políticas y los subdominios bien delimitados sí reducen el riesgo operativo.
            </p>
          </div>

          <div className="card p-7">
            <div className="flex items-center gap-3 mb-5">
              <KeyRound size={20} className="text-accent" aria-hidden="true" />
              <h3 className="text-xl font-semibold">Reglas de acceso</h3>
            </div>
            <ul className="space-y-4 text-sm text-text-secondary">
              {SECURITY_MODEL.map((item) => (
                <li key={item} className="flex gap-3 items-start">
                  <span className="text-accent mt-0.5">&rarr;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-24">
          <SectionLabel>Decisiones</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-10">
            Lo que hace que una página sencilla tenga valor real.
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
            Tecnología mínima para una función crítica.
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

        <section className="mb-24">
          <SectionLabel>Lo que demuestra</SectionLabel>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                title: "Criterio operativo",
                text: "No todo necesita ser una plataforma compleja. A veces la pieza correcta es una entrada estable que ahorra fricción cada día.",
              },
              {
                title: "Infraestructura propia",
                text: "VPS, Dokploy, Docker, subdominios y servicios internos funcionando como un ecosistema mantenible.",
              },
              {
                title: "Seguridad por capas",
                text: "La web central no confía en ocultar enlaces. El acceso sensible se resuelve con identidad, políticas y 2FA antes de entrar.",
              },
            ].map((item) => (
              <div key={item.title} className="card p-7">
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-text-secondary leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="text-center py-16 border-t border-border">
          <p className="text-xl md:text-2xl text-text-secondary leading-relaxed max-w-3xl mx-auto mb-10">
            Command Center es una pieza pequeña, pero muy representativa: centraliza el acceso diario, reduce la fricción operativa y conecta una arquitectura interna protegida por Cloudflare, desplegada en VPS y gestionada con Dokploy.
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
