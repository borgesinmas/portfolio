import Link from "next/link";
import type { Metadata } from "next";
import { ZoomableImage } from "@/components/ui/ZoomableImage";
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
import { DataModelTable } from "@/components/case-study/CaseStudyPrimitives";

export const metadata: Metadata = {
  title: "Project Flow — Caso de Estudio",
  description:
    "Caso de estudio de Project Flow: workspace interno para gestionar proyectos, tareas, capacidad, solicitudes, conocimiento y plantillas con React 19, Express, PostgreSQL y JWT.",
};

const METRICS = [
  { value: "11", label: "vistas operativas" },
  { value: "9", label: "tablas persistidas" },
  { value: "9", label: "routers de API" },
  { value: "1", label: "workspace unificado" },
];

const AGENCY_WEEK = [
  {
    day: "Lunes",
    title: "Priorizar la semana",
    text: "Inicio personal, tareas vencidas, bloqueos y planning muestran qué debe moverse primero, antes de que el equipo empiece a ejecutar por inercia.",
  },
  {
    day: "Martes",
    title: "Coordinar dependencias",
    text: "Las solicitudes entre áreas, con responsables y deadlines, hacen visible quién espera a quién y qué tarea queda bloqueada hasta recibir feedback, datos o una aprobación.",
  },
  {
    day: "Miércoles",
    title: "Revisar capacidad",
    text: "La vista semanal cruza horas planificadas, capacidad base, entregas y sobrecarga para ajustar el trabajo antes de que el calendario se rompa.",
  },
  {
    day: "Jueves",
    title: "Reducir riesgo",
    text: "El control global y la actividad ayudan a detectar proyectos con más fricción, tareas críticas y decisiones que no deberían depender de la memoria o del chat.",
  },
  {
    day: "Viernes",
    title: "Convertir aprendizaje en sistema",
    text: "Las guidelines y las plantillas capturan procesos repetibles para que la semana siguiente empiece con menos improvisación y más estructura reutilizable.",
  },
];

const EVOLUTION = [
  {
    title: "Prototipo local",
    text: "Primera versión centrada en validar flujos: pantallas, entidades, filtros y experiencia de trabajo, sin frenar la exploración con infraestructura prematura.",
  },
  {
    title: "Workspace persistente",
    text: "Migración a Express y PostgreSQL para que proyectos, tareas, solicitudes, plantillas, usuarios y actividad vivan como memoria compartida.",
  },
  {
    title: "Acceso y administración",
    text: "JWT, bcrypt, usuarios, roles y un panel de administración convierten la herramienta en una app interna usable por el equipo, no solo por quien la desarrolló.",
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
    text: "Dashboard orientado al foco diario: prioridades, vencidas, bloqueos, solicitudes abiertas, carga semanal y contexto general de la empresa.",
  },
  {
    icon: CalendarRange,
    title: "Planificación",
    text: "Vista semanal por personas o por proyectos, con capacidad base, sobrecarga, entregas, bloqueos y replanificación manual de tareas.",
  },
  {
    icon: Route,
    title: "Control global",
    text: "Radar transversal para detectar proyectos, áreas y tareas con más riesgo, filtrando por responsable, departamento, importancia y estado.",
  },
  {
    icon: GitPullRequestDraft,
    title: "Solicitudes",
    text: "Cola interdepartamental para peticiones, aprobaciones, bloqueos y feedback, con responsables, deadlines, historial y vínculo a tareas.",
  },
  {
    icon: BookOpen,
    title: "Guidelines",
    text: "Base de conocimiento interna con procesos, checklists, políticas, owners, revisión, alcance global o por área y etiquetas.",
  },
  {
    icon: LayoutTemplate,
    title: "Plantillas",
    text: "Biblioteca reutilizable para crear proyectos, tareas, solicitudes y guías con estructura, fases, offsets y criterios ya definidos.",
  },
  {
    icon: Activity,
    title: "Actividad",
    text: "Feed de trazabilidad para entender quién creó, actualizó, archivó o desbloqueó trabajo sin reconstruir el contexto por chat.",
  },
  {
    icon: UsersRound,
    title: "Usuarios",
    text: "Panel de administración con usuarios, roles, departamentos y acceso completo, protegido para perfiles con permisos elevados.",
  },
];

const ARCHITECTURE = [
  {
    title: "Frontend React como workspace",
    text: "La interfaz está organizada por rutas operativas: dashboard, trabajo personal, planificación, control, departamentos, proyecto, solicitudes, conocimiento, plantillas, actividad, archivados y usuarios.",
  },
  {
    title: "Express como API de producto",
    text: "El servidor sirve el build de Vite y expone endpoints en /api para autenticación, usuarios, departamentos, proyectos, tareas, solicitudes, guidelines, plantillas y actividad.",
  },
  {
    title: "PostgreSQL como memoria compartida",
    text: "Las entidades principales viven en tablas propias, con arrays de texto y JSONB para fases, subtareas, historial y payloads de plantillas, además de índices para las consultas frecuentes.",
  },
  {
    title: "JWT para acceso real",
    text: "El acceso dejó de ser una selección de usuario en localStorage y pasó a un login con email, bcrypt, token JWT y middleware de autorización.",
  },
  {
    title: "Seed desde datos de producto",
    text: "El seed transforma el dataset inicial en departamentos, usuarios, proyectos, tareas, solicitudes, guías y plantillas para arrancar el workspace con contenido útil.",
  },
  {
    title: "Docker y Dokploy",
    text: "El proyecto quedó preparado para desplegarse como servicio Node, con variables de entorno para la base de datos, el JWT, el admin inicial y la contraseña del seed.",
  },
];

const DIFFICULTIES = [
  {
    title: "No construir otro tablero bonito",
    text: "La app necesitaba responder preguntas reales: qué vence hoy, qué está bloqueado, quién está saturado, qué proyecto concentra el riesgo y qué solicitud está frenando una entrega.",
  },
  {
    title: "Separar trabajo de coordinación",
    text: "Una solicitud no es una tarea. Puede pedir una aprobación, feedback, datos o un desbloqueo, puede venir de otro departamento y puede bloquear una tarea existente sin convertirse en la tarea principal.",
  },
  {
    title: "Modelar fases sin encerrar al equipo",
    text: "Los proyectos pueden tener fases ordenadas, pero las tareas conservan responsable, estado, prioridad, fechas, esfuerzo, dependencias, subtareas y solicitudes vinculadas.",
  },
  {
    title: "Migrar de localStorage a un sistema persistente",
    text: "El mayor cambio no fue añadir una base de datos, sino conservar la experiencia fluida del frontend mientras cada acción pasaba por una API y dejaba trazabilidad.",
  },
  {
    title: "Convertir el conocimiento en parte del flujo",
    text: "Las guías y las plantillas no viven como documentación decorativa. Aparecen cerca del trabajo para acelerar handoffs, aprobaciones, procesos repetibles y proyectos nuevos.",
  },
];

const DECISIONS = [
  {
    label: "JWT en vez de usuario simulado",
    text: "El workspace dejó de depender de un selector local. El login real permite controlar el acceso, crear usuarios, cambiar contraseñas y proteger todas las rutas de la API.",
  },
  {
    label: "JSONB solo donde aporta flexibilidad",
    text: "Fases, subtareas, historial y payloads de plantillas se guardan como JSONB porque cambian más que el núcleo relacional. Usuarios, tareas, proyectos y solicitudes mantienen tablas claras.",
  },
  {
    label: "Planning por capacidad, no solo por fecha",
    text: "La vista semanal suma las horas estimadas (estimate) por persona y semana (planned_date) y las cruza con la capacidad base para señalar la sobrecarga. Así la planificación habla de carga real, no solo de calendarios.",
  },
  {
    label: "Solicitudes como entidad propia",
    text: "Las dependencias entre áreas quedan trazadas: solicitante, destino, responsable, estado, prioridad, deadline, si bloquea una tarea y qué historial operativo arrastra.",
  },
  {
    label: "Plantillas con payload accionable",
    text: "Una plantilla no es solo texto. Su payload JSONB puede crear proyectos con fases y tareas, tareas con estimaciones o solicitudes con prioridad y bloqueo ya predefinidos.",
  },
  {
    label: "Actividad best-effort",
    text: "La UI se actualiza rápido y registra la actividad como trazabilidad adicional. Si el log falla, no bloquea el trabajo principal del usuario.",
  },
];

const STACK = [
  { name: "React 19 + Vite 7", why: "Interfaz SPA rápida para un workspace con muchas vistas, modales, drawers, filtros y estados interactivos." },
  { name: "React Router 7", why: "Rutas internas limpias para separar dashboard, planificación, control, proyectos, solicitudes, guías, plantillas y administración." },
  { name: "Tailwind CSS 4", why: "Sistema visual denso y consistente, preparado para superficies de trabajo, tablas, cards, drawers y estados semánticos." },
  { name: "Express 4", why: "Backend pragmático para servir el frontend y exponer una API REST sin sobredimensionar el proyecto." },
  { name: "PostgreSQL + pg", why: "Persistencia relacional para usuarios, proyectos, tareas y solicitudes, con JSONB cuando la estructura necesitaba flexibilidad." },
  { name: "jsonwebtoken + bcryptjs", why: "Autenticación real con contraseñas hasheadas, middleware de protección y token en la cabecera Authorization Bearer." },
  { name: "Docker", why: "Build reproducible: compila Vite, copia el servidor, la API y los scripts de BD, instala dependencias de producción y arranca con Node." },
  { name: "Dokploy", why: "Despliegue pensado para convivir con servicios existentes y una base PostgreSQL compartida mediante variables de entorno." },
];

const dataModel = [
  {
    name: "users · user_departments",
    purpose:
      "Usuarios con rol y acceso completo, y su pertenencia a uno o varios departamentos mediante una tabla puente M:N.",
    fields: ["email (unique)", "password_hash", "role", "has_full_access", "department_id", "is_primary"],
  },
  {
    name: "projects",
    purpose:
      "Proyectos con manager, estado, prioridad, importancia y fases. Las fases y los enlaces se guardan como JSONB porque cambian de forma.",
    fields: ["manager_id", "status", "priority", "importance", "phases (JSONB)", "links (JSONB)", "is_archived"],
  },
  {
    name: "tasks",
    purpose:
      "Tareas con estimación de horas, fechas (start/due/planned), dependencias, subtareas y solicitudes vinculadas. Es la base del planning por capacidad.",
    fields: ["assignee_id", "status", "estimate", "planned_date", "dependencies (TEXT[])", "subtasks (JSONB)", "request_ids (TEXT[])"],
  },
  {
    name: "requests",
    purpose:
      "Solicitudes interdepartamentales con responsable, prioridad, deadline, si bloquean una tarea e historial completo de la negociación.",
    fields: ["requester_id", "assignee_id", "status", "target_date", "task_id", "blocks_task", "history (JSONB)"],
  },
  {
    name: "guidelines",
    purpose:
      "Base de conocimiento: alcance (global o por área), owner, fecha de revisión, marca de proceso clave y etiquetas.",
    fields: ["scope", "owner_id", "review_date", "is_key_process", "related_departments (TEXT[])", "tags (TEXT[])"],
  },
  {
    name: "templates",
    purpose:
      "Plantillas reutilizables cuyo payload JSONB es accionable: puede materializar proyectos, tareas o solicitudes completas.",
    fields: ["kind", "scope", "featured", "payload (JSONB)"],
  },
  {
    name: "activities",
    purpose:
      "Feed de trazabilidad: tipo de entidad, acción, actor, ruta y metadata. Es lo que evita reconstruir el contexto por chat.",
    fields: ["entity_type", "entity_id", "action", "actor_id", "meta (JSONB)"],
  },
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
            <span className="text-xs text-text-muted font-mono">React 19 + Express + PostgreSQL</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 max-w-5xl">
            Project Flow
          </h1>

          <p className="text-xl md:text-2xl text-text-secondary leading-relaxed max-w-4xl mb-8">
            Un workspace interno para dirigir proyectos de agencia sin perder el contexto entre tareas, solicitudes, capacidad del equipo, departamentos, guías y plantillas. Lo construí como una herramienta operativa, no como un tablero decorativo.
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
          <div className="card card-lg overflow-hidden relative bg-bg-secondary aspect-video">
            <ZoomableImage
              src="/screenshots/manager.webp"
              alt="Dashboard de Project Flow con navegación lateral, prioridades, solicitudes y carga operativa"
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
          <SectionLabel>Semana real de uso</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
            Un sistema operativo de agencia tiene que servir de lunes a viernes.
          </h2>
          <p className="text-lg text-text-secondary leading-relaxed mb-10 max-w-4xl">
            Project Flow está pensado para acompañar el ritmo de una agencia: priorizar, coordinar, medir la capacidad, reducir el riesgo y convertir el aprendizaje en procesos reutilizables.
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
              Proyectos por un lado, tareas por otro, solicitudes en chats, aprobaciones sin dueño claro, procesos en documentos sueltos y la capacidad del equipo calculada a ojo. El resultado es previsible: bloqueos invisibles, prioridades discutidas tarde y contexto perdido.
            </p>
            <p className="text-lg text-text-secondary leading-relaxed">
              La necesidad no era crear una lista de tareas más, sino una herramienta que conectara trabajo, dependencias, conocimiento y toma de decisiones dentro del mismo flujo semanal.
            </p>
          </div>

          <div>
            <SectionLabel>La solución</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Un sistema operativo interno para coordinar trabajo real.
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed mb-5">
              Project Flow centraliza proyectos, fases, tareas, solicitudes, departamentos, guías, plantillas, actividad y usuarios. Cada vista responde a una pregunta operativa distinta: qué hago hoy, quién está saturado, qué proyecto está en riesgo, qué dependencia falta o qué proceso debemos seguir.
            </p>
            <p className="text-lg text-text-secondary leading-relaxed">
              El proyecto empezó como una app cliente con datos locales y evolucionó a una aplicación con backend Express, autenticación real, PostgreSQL, seed inicial, Docker y despliegue preparado para Dokploy.
            </p>
          </div>
        </section>

        <section className="mb-24">
          <SectionLabel>Producto</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-10">
            Módulos pensados para decidir mejor, no para acumular pantallas.
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
            De prototipo local a aplicación persistente.
          </h2>
          <p className="text-lg text-text-secondary leading-relaxed mb-10 max-w-4xl">
            La parte importante de la migración fue mantener la sensación de workspace rápido mientras los datos pasaban a vivir en una base compartida y cada operación quedaba protegida por la API.
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
          <SectionLabel>Modelo de datos</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
            Núcleo relacional, flexibilidad donde de verdad hace falta.
          </h2>
          <p className="text-lg text-text-secondary leading-relaxed mb-10 max-w-4xl">
            Nueve tablas sostienen el workspace. Lo estable (usuarios, proyectos, tareas, solicitudes) es relacional e indexado; lo que cambia de forma (fases, subtareas, historial, payloads) vive en JSONB.
          </p>
          <DataModelTable items={dataModel} />
        </section>

        <section className="mb-24">
          <SectionLabel>Evolución</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
            La herramienta maduró al mismo ritmo que la operativa.
          </h2>
          <p className="text-lg text-text-secondary leading-relaxed mb-10 max-w-4xl">
            La evolución no fue añadir pantallas por añadir. Cada salto resolvió una limitación concreta: datos locales, falta de memoria compartida, acceso real y un despliegue mantenible.
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
            <SectionLabel>Lo difícil</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              El reto era convertir el ruido operativo en señales claras.
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed mb-5">
              Un gestor de proyectos puede quedarse en un CRUD muy rápido. Aquí el foco fue otro: calcular el riesgo, mostrar los bloqueos, entender la capacidad, ligar solicitudes a tareas, ordenar fases y acercar el conocimiento al trabajo diario.
            </p>
            <p className="text-lg text-text-secondary leading-relaxed">
              Por eso muchas piezas no son vistosas por sí mismas, pero cambian la forma de operar: historial, deadlines relativos, etiquetas semánticas, dependencias, subtareas, owners, permisos y plantillas con payload.
            </p>
          </div>

          <div className="card p-7">
            <div className="flex items-center gap-3 mb-5">
              <Boxes size={20} className="text-accent" aria-hidden="true" />
              <h3 className="text-xl font-semibold">Entidades principales</h3>
            </div>
            <ul className="space-y-4 text-sm text-text-secondary">
              {[
                "Usuarios con email, hash de contraseña, rol, departamento y acceso completo.",
                "Departamentos como eje de visibilidad, color y responsabilidad.",
                "Proyectos con manager, estado, prioridad, importancia, archivo y fases en JSONB.",
                "Tareas con fechas, esfuerzo, subtareas, dependencias y solicitudes ligadas.",
                "Solicitudes con historial, destino, responsable, prioridad y bloqueo opcional.",
                "Guidelines, plantillas y actividad como capa de conocimiento y trazabilidad.",
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
          <SectionLabel>Complejidad real</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-10">
            Lo que había que resolver por debajo de la interfaz.
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
          <SectionLabel>Decisiones técnicas</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-10">
            Decisiones que hicieron el producto más serio.
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
            Preparado para un uso interno real.
          </h2>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: LockKeyhole,
                title: "Acceso protegido",
                text: "Login con email y contraseña, bcrypt para los hashes, JWT con expiración configurable y middleware en las rutas privadas.",
              },
              {
                icon: Database,
                title: "Datos centralizados",
                text: "PostgreSQL sustituye el estado local, con un esquema reproducible, seed y variables de entorno para el entorno de producción.",
              },
              {
                icon: ShieldCheck,
                title: "Operativa administrable",
                text: "Un usuario con acceso completo puede crear, editar y eliminar usuarios sin tocar la base de datos a mano.",
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
                title: "Arquitectura pragmática",
                text: "Frontend rápido, API sencilla, base relacional y JSONB donde tiene sentido mantener la flexibilidad.",
              },
              {
                title: "Madurez operativa",
                text: "Autenticación, usuarios, permisos, seed, Docker y despliegue preparado para que la herramienta sobreviva fuera del entorno local.",
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
            Project Flow resume una forma de construir que me interesa mucho: herramientas internas que reducen la fricción real, conectan el contexto disperso y hacen que un equipo pueda decidir antes y con menos ruido.
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
