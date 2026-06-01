import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  Activity,
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Boxes,
  CalendarRange,
  Database,
  GitPullRequestDraft,
  LayoutTemplate,
  LockKeyhole,
  PanelsTopLeft,
  Route,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Project Flow - Caso de Estudio",
  description:
    "Caso de estudio de Project Flow: workspace interno para gestionar proyectos, tareas, capacidad, solicitudes, conocimiento y plantillas con React, Express, PostgreSQL y JWT.",
};

const METRICS = [
  { value: "11", label: "vistas operativas" },
  { value: "8", label: "entidades persistidas" },
  { value: "7", label: "routers CRUD" },
  { value: "1", label: "workspace unificado" },
];

const AGENCY_WEEK = [
  {
    day: "Lunes",
    title: "Priorizar la semana",
    text: "Inicio personal, vencidas, bloqueos y planning muestran que debe moverse primero antes de que el equipo empiece a ejecutar por inercia.",
  },
  {
    day: "Martes",
    title: "Coordinar dependencias",
    text: "Solicitudes entre areas, responsables y deadlines hacen visible quien espera a quien y que tarea queda bloqueada hasta recibir feedback, datos o aprobacion.",
  },
  {
    day: "Miercoles",
    title: "Revisar capacidad",
    text: "La vista semanal cruza horas planificadas, capacidad base, entregas y sobrecarga para ajustar trabajo antes de que el calendario se rompa.",
  },
  {
    day: "Jueves",
    title: "Reducir riesgo",
    text: "Control global y actividad ayudan a detectar proyectos con mas friccion, tareas criticas y decisiones que no deberian depender de memoria o chat.",
  },
  {
    day: "Viernes",
    title: "Convertir aprendizaje en sistema",
    text: "Guidelines y plantillas capturan procesos repetibles para que la siguiente semana empiece con menos improvisacion y mas estructura reutilizable.",
  },
];

const EVOLUTION = [
  {
    title: "Prototipo local",
    text: "Primera version centrada en validar flujos: pantallas, entidades, filtros y experiencia de trabajo sin frenar la exploracion con infraestructura prematura.",
  },
  {
    title: "Workspace persistente",
    text: "Migracion a Express y PostgreSQL para que proyectos, tareas, solicitudes, plantillas, usuarios y actividad vivan como memoria compartida.",
  },
  {
    title: "Acceso y administracion",
    text: "JWT, bcrypt, usuarios, roles y panel de administracion convierten la herramienta en una app interna usable por equipo, no solo por quien la desarrollo.",
  },
  {
    title: "Operativa desplegable",
    text: "Docker, seed, variables de entorno y Dokploy preparan el sistema para convivir con el resto de servicios internos de Growork.",
  },
];

const MODULES = [
  {
    icon: PanelsTopLeft,
    title: "Inicio personal",
    text: "Dashboard orientado a foco diario: prioridades, vencidas, bloqueos, solicitudes abiertas, carga semanal y contexto general de la empresa.",
  },
  {
    icon: CalendarRange,
    title: "Planificacion",
    text: "Vista semanal por personas o por proyectos, con capacidad base, sobrecarga, entregas, bloqueos y replanificacion manual de tareas.",
  },
  {
    icon: Route,
    title: "Control global",
    text: "Radar transversal para detectar proyectos, areas y tareas con mas riesgo, filtrando por responsable, departamento, importancia y estado.",
  },
  {
    icon: GitPullRequestDraft,
    title: "Solicitudes",
    text: "Cola interdepartamental para peticiones, aprobaciones, bloqueos y feedback, con responsables, deadlines, historial y vinculo a tareas.",
  },
  {
    icon: BookOpen,
    title: "Guidelines",
    text: "Base de conocimiento interna con procesos, checklists, politicas, owners, revision, alcance global o por area y etiquetas.",
  },
  {
    icon: LayoutTemplate,
    title: "Plantillas",
    text: "Biblioteca reutilizable para crear proyectos, tareas, solicitudes y guias con estructura, fases, offsets y criterios ya definidos.",
  },
  {
    icon: Activity,
    title: "Actividad",
    text: "Feed de trazabilidad para entender quien creo, actualizo, archivo o desbloqueo trabajo sin reconstruir el contexto por chat.",
  },
  {
    icon: UsersRound,
    title: "Usuarios",
    text: "Panel de administracion con usuarios, roles, departamentos y acceso completo, protegido para perfiles con permisos elevados.",
  },
];

const ARCHITECTURE = [
  {
    title: "Frontend React como workspace",
    text: "La interfaz esta organizada por rutas operativas: dashboard, trabajo personal, planificacion, control, departamentos, proyecto, solicitudes, conocimiento, plantillas, actividad, archivados y usuarios.",
  },
  {
    title: "Express como API de producto",
    text: "El servidor sirve el build de Vite y expone endpoints en /api para autenticacion, usuarios, departamentos, proyectos, tareas, solicitudes, guidelines, plantillas y actividad.",
  },
  {
    title: "PostgreSQL como memoria compartida",
    text: "Las entidades principales viven en tablas propias, con arrays, JSONB para fases, subtareas, historial y payloads de plantillas, e indices para consultas frecuentes.",
  },
  {
    title: "JWT para acceso real",
    text: "El acceso dejo de ser una seleccion de usuario en localStorage y paso a login con email, bcrypt, token JWT y middleware de autorizacion.",
  },
  {
    title: "Seed desde datos de producto",
    text: "El seed transforma el dataset inicial en departamentos, usuarios, proyectos, tareas, solicitudes, guias y plantillas para arrancar el workspace con contenido util.",
  },
  {
    title: "Docker y Dokploy",
    text: "El proyecto quedo preparado para desplegarse como servicio Node, con variables de entorno para base de datos, JWT, admin inicial y password seed.",
  },
];

const DIFFICULTIES = [
  {
    title: "No construir otro tablero bonito",
    text: "La app necesitaba responder preguntas reales: que vence hoy, que esta bloqueado, quien esta saturado, que proyecto concentra riesgo y que solicitud esta frenando una entrega.",
  },
  {
    title: "Separar trabajo de coordinacion",
    text: "Una solicitud no es una tarea. Puede pedir aprobacion, feedback, datos o desbloqueo, puede venir de otro departamento y puede bloquear una tarea existente sin convertirse en la tarea principal.",
  },
  {
    title: "Modelar fases sin encerrar al equipo",
    text: "Los proyectos pueden tener fases ordenadas, pero las tareas conservan responsable, estado, prioridad, fechas, esfuerzo, dependencias, subtareas y solicitudes vinculadas.",
  },
  {
    title: "Migrar de localStorage a sistema persistente",
    text: "El mayor cambio no fue anadir una base de datos, sino conservar la experiencia fluida del frontend mientras cada accion pasaba por una API y dejaba trazabilidad.",
  },
  {
    title: "Convertir conocimiento en parte del flujo",
    text: "Las guias y plantillas no viven como documentacion decorativa. Aparecen cerca del trabajo para acelerar handoffs, aprobaciones, procesos repetibles y nuevos proyectos.",
  },
];

const DECISIONS = [
  {
    label: "JWT en vez de usuario simulado",
    text: "El workspace dejo de depender de un selector local. El login real permite controlar acceso, crear usuarios, cambiar passwords y proteger todas las rutas de API.",
  },
  {
    label: "JSONB solo donde aporta flexibilidad",
    text: "Fases, subtareas, historial y payloads de plantillas se guardan como JSONB porque cambian mas que el nucleo relacional. Usuarios, tareas, proyectos y solicitudes mantienen tablas claras.",
  },
  {
    label: "Planning por capacidad, no solo por fecha",
    text: "La vista semanal calcula horas planificadas, capacidad base, sobrecarga, entregas y holgura. Asi la planificacion habla de carga real, no solo de calendarios.",
  },
  {
    label: "Solicitudes como entidad propia",
    text: "Las dependencias entre areas quedan trazadas: solicitante, destino, responsable, estado, prioridad, deadline, si bloquea una tarea y que historial operativo arrastra.",
  },
  {
    label: "Plantillas con payload accionable",
    text: "Una plantilla no es solo texto. Puede crear proyectos con fases y tareas, tareas con estimaciones o solicitudes con prioridad y bloqueo ya predefinidos.",
  },
  {
    label: "Actividad best-effort",
    text: "La UI actualiza rapido y registra actividad como trazabilidad adicional. Si el log falla, no bloquea el trabajo principal del usuario.",
  },
];

const STACK = [
  { name: "React 19 + Vite", why: "Interfaz SPA rapida para un workspace con muchas vistas, modales, drawers, filtros y estados interactivos." },
  { name: "React Router", why: "Rutas internas limpias para separar dashboard, planificacion, control, proyectos, solicitudes, guias, plantillas y administracion." },
  { name: "Tailwind CSS 4", why: "Sistema visual denso y consistente, preparado para superficies de trabajo, tablas, cards, drawers y estados semanticos." },
  { name: "Express", why: "Backend pragmatico para servir el frontend y exponer API REST sin sobredimensionar el proyecto." },
  { name: "PostgreSQL + pg", why: "Persistencia relacional para usuarios, proyectos, tareas y solicitudes, con JSONB cuando la estructura necesitaba flexibilidad." },
  { name: "JWT + bcrypt", why: "Autenticacion real con passwords hasheadas, middleware de proteccion y token enviado en Authorization Bearer." },
  { name: "Docker", why: "Build reproducible: compila Vite, copia servidor, API y DB scripts, instala dependencias de produccion y arranca con Node." },
  { name: "Dokploy", why: "Despliegue pensado para convivir con servicios existentes y una base PostgreSQL compartida mediante variables de entorno." },
];

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-mono text-accent-light uppercase tracking-wider mb-3">
      {children}
    </p>
  );
}

export default function ProjectFlowPage() {
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
            <span className="text-xs text-text-muted font-mono">React + Express + PostgreSQL</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 max-w-5xl">
            Project Flow
          </h1>

          <p className="text-xl md:text-2xl text-text-secondary leading-relaxed max-w-4xl mb-8">
            Un workspace interno para dirigir proyectos de agencia sin perder el contexto entre tareas, solicitudes, capacidad del equipo, departamentos, guias y plantillas. Lo construi como una herramienta operativa, no como un tablero decorativo.
          </p>

          <div className="flex flex-wrap gap-2">
            {["React 19", "Vite", "Tailwind CSS 4", "Express", "PostgreSQL", "JWT", "bcrypt", "Docker", "Dokploy"].map((tech) => (
              <span key={tech} className="tag">
                {tech}
              </span>
            ))}
          </div>
        </header>

        <section className="mb-20">
          <div className="rounded-xl overflow-hidden border border-border bg-bg-secondary">
            <Image
              src="/screenshots/manager.png"
              alt="Dashboard de Project Flow con navegacion lateral, prioridades, solicitudes y carga operativa"
              width={1907}
              height={949}
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
          <SectionLabel>Semana real de uso</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
            Un sistema operativo de agencia tiene que servir de lunes a viernes.
          </h2>
          <p className="text-lg text-text-secondary leading-relaxed mb-10 max-w-4xl">
            Project Flow esta pensado para acompañar el ritmo de una agencia: priorizar, coordinar, medir capacidad, reducir riesgo y convertir aprendizaje en procesos reutilizables.
          </p>

          <div className="grid md:grid-cols-5 gap-4">
            {AGENCY_WEEK.map((item) => (
              <div key={item.day} className="card p-6">
                <p className="text-sm font-mono text-accent-light mb-5">{item.day}</p>
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
              La operativa de agencia se rompe cuando todo vive en sitios distintos.
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed mb-5">
              Proyectos por un lado, tareas por otro, solicitudes en chats, aprobaciones sin dueno claro, procesos en documentos sueltos y capacidad del equipo calculada a ojo. El resultado es previsible: bloqueos invisibles, prioridades discutidas tarde y contexto perdido.
            </p>
            <p className="text-lg text-text-secondary leading-relaxed">
              La necesidad no era crear una lista de tareas mas, sino una herramienta que conectara trabajo, dependencias, conocimiento y toma de decisiones dentro del mismo flujo semanal.
            </p>
          </div>

          <div>
            <SectionLabel>La solucion</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Un sistema operativo interno para coordinar trabajo real.
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed mb-5">
              Project Flow centraliza proyectos, fases, tareas, solicitudes, departamentos, guias, plantillas, actividad y usuarios. Cada vista responde a una pregunta operativa distinta: que hago hoy, quien esta saturado, que proyecto esta en riesgo, que dependencia falta o que proceso debemos seguir.
            </p>
            <p className="text-lg text-text-secondary leading-relaxed">
              El proyecto empezo como una app cliente con datos locales y evoluciono a una aplicacion con backend Express, autenticacion real, PostgreSQL, seed inicial, Docker y despliegue preparado para Dokploy.
            </p>
          </div>
        </section>

        <section className="mb-24">
          <SectionLabel>Producto</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-10">
            Modulos pensados para decidir mejor, no para acumular pantallas.
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {MODULES.map((module) => {
              const Icon = module.icon;
              return (
                <div key={module.title} className="card p-6">
                  <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-5">
                    <Icon size={20} className="text-accent" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{module.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {module.text}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mb-24">
          <SectionLabel>Arquitectura</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
            De prototipo local a aplicacion persistente.
          </h2>
          <p className="text-lg text-text-secondary leading-relaxed mb-10 max-w-4xl">
            La parte importante de la migracion fue mantener la sensacion de workspace rapido mientras los datos pasaban a vivir en una base compartida y cada operacion quedaba protegida por API.
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
          <SectionLabel>Evolucion</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
            La herramienta maduro al mismo ritmo que la operativa.
          </h2>
          <p className="text-lg text-text-secondary leading-relaxed mb-10 max-w-4xl">
            La evolucion no fue anadir pantallas por anadir. Cada salto resolvio una limitacion concreta: datos locales, falta de memoria compartida, acceso real y despliegue mantenible.
          </p>

          <div className="space-y-4">
            {EVOLUTION.map((item, index) => (
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
              El reto era convertir ruido operativo en senales claras.
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed mb-5">
              Un gestor de proyectos puede quedarse en CRUD muy rapido. Aqui el foco fue otro: calcular riesgo, mostrar bloqueos, entender capacidad, ligar solicitudes a tareas, ordenar fases y acercar el conocimiento al trabajo diario.
            </p>
            <p className="text-lg text-text-secondary leading-relaxed">
              Por eso muchas piezas no son vistosas por si mismas, pero cambian la forma de operar: historial, deadlines relativos, etiquetas semanticas, dependencias, subtareas, owners, permisos y plantillas con payload.
            </p>
          </div>

          <div className="card p-7">
            <div className="flex items-center gap-3 mb-5">
              <Boxes size={20} className="text-accent" aria-hidden="true" />
              <h3 className="text-xl font-semibold">Entidades principales</h3>
            </div>
            <ul className="space-y-4 text-sm text-text-secondary">
              {[
                "Usuarios con email, password hash, rol, departamento y acceso completo.",
                "Departamentos como eje de visibilidad, color y responsabilidad.",
                "Proyectos con manager, estado, prioridad, importancia, archivo y fases JSONB.",
                "Tareas con fechas, esfuerzo, subtareas, dependencias y solicitudes ligadas.",
                "Solicitudes con historial, destino, responsable, prioridad y bloqueo opcional.",
                "Guidelines, plantillas y actividad como capa de conocimiento y trazabilidad.",
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
          <SectionLabel>Complejidad real</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-10">
            Lo que habia que resolver por debajo de la interfaz.
          </h2>

          <div className="space-y-5">
            {DIFFICULTIES.map((item) => (
              <div key={item.title} className="card p-7">
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-text-secondary leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <SectionLabel>Decisiones tecnicas</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-10">
            Decisiones que hicieron el producto mas serio.
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
          <SectionLabel>Seguridad y despliegue</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
            Preparado para uso interno real.
          </h2>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: LockKeyhole,
                title: "Acceso protegido",
                text: "Login con email y password, bcrypt para hashes, JWT con expiracion configurable y middleware en rutas privadas.",
              },
              {
                icon: Database,
                title: "Datos centralizados",
                text: "PostgreSQL sustituye el estado local, con esquema reproducible, seed y variables de entorno para el entorno de produccion.",
              },
              {
                icon: ShieldCheck,
                title: "Operativa administrable",
                text: "Un usuario con acceso completo puede crear, editar y eliminar usuarios sin tocar la base de datos manualmente.",
              },
            ].map((item) => {
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

        <section className="mb-24">
          <SectionLabel>Lo que demuestra</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
            Producto interno con criterio operativo.
          </h2>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                title: "Pensamiento de producto",
                text: "Cada pantalla existe porque ayuda a priorizar, coordinar, desbloquear o reutilizar trabajo.",
              },
              {
                title: "Arquitectura pragmatica",
                text: "Frontend rapido, API sencilla, base relacional y JSONB donde tiene sentido mantener flexibilidad.",
              },
              {
                title: "Madurez operativa",
                text: "Autenticacion, usuarios, permisos, seed, Docker y despliegue preparado para que la herramienta sobreviva fuera del entorno local.",
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
            Project Flow resume una forma de construir que me interesa mucho: herramientas internas que reducen friccion real, conectan contexto disperso y hacen que un equipo pueda decidir antes y con menos ruido.
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
