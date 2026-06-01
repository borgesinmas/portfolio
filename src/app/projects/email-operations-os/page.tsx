import Link from "next/link";
import type { Metadata } from "next";
import { ZoomableImage } from "@/components/ZoomableImage";

export const metadata: Metadata = {
  title: "Sistema de Envios Growork - Caso de Estudio",
  description:
    "Caso de estudio del sistema interno de Growork para gestionar clientes, workflows, Google Workspace, envios de email, respuestas, IA, Drive y configuracion operativa.",
};

const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "NestJS",
  "PostgreSQL",
  "TypeORM",
  "Twenty CRM",
  "n8n",
  "Google Workspace",
  "Gmail API",
  "Google Drive",
  "OpenAI",
  "Docker",
  "Nginx",
];

const webSections = [
  {
    name: "Dashboard",
    image: "/screenshots/webinterna1.png",
    imageAlt: "Panel de control de la web interna CV Sender",
    caption: "Vista general de salud: clientes, estados, rendimiento de emails, pipeline y consumo de IA.",
    purpose:
      "Vista ejecutiva con KPIs de clientes, distribucion por estado, estadisticas de envio y actividad reciente. Sirve para saber si la operacion esta sana sin abrir cada modulo.",
    connection:
      "Lee agregados del backend sobre clients, email_sends y notifications. Se refresca en intervalos distintos segun el peso de cada consulta.",
  },
  {
    name: "Clientes",
    image: "/screenshots/webinterna2.png",
    imageAlt: "Gestion de clientes con estado CRM, plan, preview y warmup",
    caption: "Tabla operativa para decidir quien envia, con que plan, en que estado y con que volumen.",
    purpose:
      "Centro de control por cliente: estado CRM, plan, pareja, envio activo, modo preview, warmup, criterios de matching, estadisticas y respuestas.",
    connection:
      "Sincroniza con Twenty CRM, guarda ClientSendSettings en PostgreSQL y propaga ajustes a la pareja cuando existe.",
  },
  {
    name: "Pipeline de workflows",
    image: "/screenshots/webinterna3.png",
    imageAlt: "Pipeline de workflows por cliente en formato Kanban",
    caption: "Kanban secuencial para saber que cliente necesita carpeta, creador, CV final o email corporativo.",
    purpose:
      "Kanban operativo para ver en que punto esta cada cliente: carpetas, creador de CV, nuevo archivo, aprobacion de CV y correo corporativo.",
    connection:
      "Cada columna se alimenta de client_workflow_states y se actualiza con webhooks de n8n. Los pasos manuales disparan workflows desde la UI.",
  },
  {
    name: "Creadores CV",
    image: "/screenshots/webinterna4.png",
    imageAlt: "Gestion de creadores de CV e idiomas asignados",
    caption: "Inventario de creadores, idiomas, estado y asignaciones para mantener el flujo documental.",
    purpose:
      "Gestion de profesionales que preparan CVs: idiomas, estado, asignacion y visibilidad de trabajo activo.",
    connection:
      "Se vincula con clientes y con WKF-1.1 para compartir carpetas de Drive y registrar el creador asignado.",
  },
  {
    name: "Dominios",
    image: "/screenshots/webinterna5.png",
    imageAlt: "Gestion de dominios para correos corporativos",
    caption: "Control de dominios activos, prioridad y capacidad antes de crear cuentas de Workspace.",
    purpose:
      "Administracion de dominios de envio: activo/inactivo, prioridad, usuarios actuales y capacidad maxima.",
    connection:
      "n8n consulta estos datos antes de crear cuentas en Google Workspace y el backend los usa para validar emails corporativos gestionados.",
  },
  {
    name: "Correos corporativos",
    image: "/screenshots/webinterna6.png",
    imageAlt: "Gestion de correos corporativos conectados a Google Workspace",
    caption: "Cuentas activas, pendientes de borrado, uso por dominio y sincronizacion con Google Workspace.",
    purpose:
      "Inventario de cuentas creadas para clientes, estado de gracia, borrado manual, sincronizacion con Google Workspace y limpieza de inconsistencias.",
    connection:
      "Habla con Google Admin Directory API, clients.emailOperativo, dominios y notificaciones de borrado.",
  },
  {
    name: "Preview Emails",
    image: "/screenshots/webinterna7.png",
    imageAlt: "Preview de emails pendientes de revision",
    caption: "Zona de control humano: revisar, aprobar, rechazar, editar o regenerar antes de enviar.",
    purpose:
      "Bandeja de aprobacion donde los emails generados por IA se pueden revisar, editar, regenerar, rechazar o aprobar antes del envio.",
    connection:
      "Consume email_sends en estado pending_review y al aprobar llama al EmailService para enviar con Gmail API.",
  },
  {
    name: "Centro de Envios",
    image: "/screenshots/webinterna8.png",
    imageAlt: "Centro de envios con monitor, enviados y respuestas",
    caption: "Monitor diario de jobs, historial de envios y gestion de respuestas desde una sola pantalla.",
    purpose:
      "Modulo unificado con tres pestanas: monitor diario de jobs, historial de enviados y gestion de respuestas.",
    connection:
      "Une Scheduler, Worker, sent-emails, email-responses, clasificacion IA y threading de Gmail en una sola pantalla operativa.",
  },
];

const workflowSteps = [
  {
    id: "WKF-1",
    title: "Crear estructura Drive",
    mode: "Automatico",
    text:
      "Cuando entra un cliente desde Twenty, n8n crea la carpeta principal y las subcarpetas CV, OLD, NEW y DEFINITIVA. Devuelve los IDs al backend para que el resto del sistema sepa donde leer y escribir.",
  },
  {
    id: "WKF-1.1",
    title: "Asignar creador CV",
    mode: "Manual",
    text:
      "Desde el Kanban se dispara el workflow que comparte carpetas con el creador correcto segun idioma. El backend registra el creador y mueve al cliente al siguiente paso.",
  },
  {
    id: "WKF-1.2",
    title: "Detectar nuevo CV",
    mode: "Automatico",
    text:
      "n8n revisa carpetas NEW y avisa cuando aparece un archivo nuevo. El cliente se coloca en la columna de aprobacion, con metadata del archivo recibido.",
  },
  {
    id: "WKF-1.3",
    title: "Mover a DEFINITIVA",
    mode: "Manual",
    text:
      "El operador selecciona el CV correcto desde la interfaz. n8n lo mueve a la carpeta definitiva, quita accesos temporales y el backend marca el CV como finalizado.",
  },
  {
    id: "WKF-1.4",
    title: "Crear email corporativo",
    mode: "Automatico",
    text:
      "Tras aprobar el CV, se crea la cuenta de Google Workspace, se guarda email y password, se sincroniza con Twenty y, si hay pareja, se reutiliza o propaga la misma cuenta.",
  },
];

const emailFlow = [
  {
    step: "01",
    title: "Cliente activo y con plan",
    text:
      "Solo los clientes en estado In Progress, con envio activo y plan vigente entran en el circuito. El worker vuelve a validar el plan justo antes de enviar.",
  },
  {
    step: "02",
    title: "Scheduler diario",
    text:
      "A las 6 AM crea un SendJob por cliente activo. En parejas solo procesa el primario y exige que ambos esten activos para evitar duplicados.",
  },
  {
    step: "03",
    title: "Warmup",
    text:
      "El limite diario sube de forma gradual con currentDailyLimit, targetDailyLimit y warmupDailyIncrement. La reputacion se protege antes de escalar volumen.",
  },
  {
    step: "04",
    title: "Matching de ofertas",
    text:
      "El worker busca ofertas recientes por pais, ciudad y puesto. Excluye ofertas ya contactadas por el cliente o su pareja y emails con mala reputacion.",
  },
  {
    step: "05",
    title: "IA y documentos",
    text:
      "OpenAI genera el email, resume CVs y puede preparar carta de presentacion. Drive aporta los PDFs de la carpeta DEFINITIVA, con cache para no descargar lo mismo todo el tiempo.",
  },
  {
    step: "06",
    title: "Preview o envio directo",
    text:
      "Por defecto el email queda en pending_review. Si el modo automatico esta activado, Gmail API lo envia directamente desde el email corporativo del cliente.",
  },
  {
    step: "07",
    title: "Tracking",
    text:
      "Se guardan messageId, gmailThreadId, asunto, contenido, adjuntos, modelo IA, estado y fecha. Esto permite auditoria, respuestas en hilo y estadisticas reales.",
  },
  {
    step: "08",
    title: "Respuestas",
    text:
      "El sistema lee Gmail, guarda respuestas, clasifica con IA y permite contestar manteniendo In-Reply-To, References y threadId.",
  },
];

const dataModel = [
  "clients: perfil, estado, pareja, plan, email operativo, carpetas Drive y datos sincronizados desde Twenty.",
  "client_send_settings: envio activo, preview, warmup, limites diarios y criterios de matching.",
  "client_workflow_states: estado PENDING/OK/ERROR de cada workflow por cliente.",
  "send_jobs: trabajos diarios generados por el scheduler.",
  "email_sends: cada email reservado, pendiente, enviado, fallido, rebotado, bloqueado o rechazado.",
  "email_responses: respuestas recibidas, clasificacion IA, lectura y datos de threading.",
  "dominios: dominios gestionados, prioridad, capacidad y usuarios actuales.",
  "notifications: eventos de workflows, errores, borrados y avisos operativos.",
];

const safeguards = [
  "API Key global en endpoints internos y rate limiting con Throttler.",
  "Domain-Wide Delegation para impersonar cuentas de cliente sin guardar sesiones Gmail.",
  "Validacion de dominios gestionados para evitar tratar emails personales como corporativos.",
  "Constraints unicos para no enviar dos veces la misma oferta o el mismo destinatario a un cliente.",
  "Webhooks de n8n mapeados por workflowId y por event como fallback.",
  "Clientes Closed quedan fuera de scheduler, worker, Kanban y webhooks operativos.",
  "Periodo de gracia de 48h antes de borrar cuentas corporativas automaticamente.",
  "Fallbacks: si falla IA se usa plantilla; si falla Drive, el sistema puede seguir sin adjuntos.",
];

const beforeAfter = [
  {
    before: "Los estados de cliente vivian repartidos entre CRM, Drive, Gmail, hojas, n8n y memoria operativa.",
    after:
      "La web interna convierte esos estados en una unica consola: listo, bloqueado, pendiente de revision, enviado, respondido o en riesgo.",
  },
  {
    before: "Un error pequeno podia duplicar contactos, enviar desde la cuenta equivocada o usar un CV no definitivo.",
    after:
      "Cada envio pasa por validaciones de plan, cuenta corporativa, carpeta definitiva, historial de ofertas y reputacion.",
  },
  {
    before: "La supervision dependia de revisar herramientas externas y reconstruir que habia pasado cliente por cliente.",
    after:
      "Jobs, emails, respuestas, workflows y notificaciones quedan trazados para auditar la operacion sin salir del sistema.",
  },
];

const riskControls = [
  {
    risk: "Quemar dominios por volumen o cadencia incorrecta",
    control:
      "Warmup progresivo, limites diarios por cliente, ventana global de envio, delays y capacidad por dominio antes de crear cuentas nuevas.",
  },
  {
    risk: "Duplicar candidaturas o contactar dos veces a la misma empresa",
    control:
      "Constraints y filtros cruzados sobre cliente, pareja, oferta, destinatario y estado previo de email_sends.",
  },
  {
    risk: "Enviar documentos equivocados o incompletos",
    control:
      "El worker solo toma PDFs desde la carpeta DEFINITIVA y conserva metadata del archivo usado en cada envio.",
  },
  {
    risk: "Perder contexto cuando llega una respuesta",
    control:
      "Se guardan gmailThreadId, messageId, headers y clasificacion IA para contestar dentro del hilo correcto.",
  },
];

const architectureFlow = [
  "CRM",
  "Backend",
  "n8n",
  "Drive",
  "Workspace",
  "Scheduler",
  "Worker",
  "Gmail",
  "Respuestas",
];

const learnings = [
  "La automatizacion valiosa no es la que elimina humanos, sino la que les muestra donde intervenir antes de que haya dano.",
  "Un sistema de emails se parece mas a infraestructura de riesgo que a una campana de marketing: reputacion, identidad y trazabilidad mandan.",
  "Separar UI, backend y n8n evita que la interfaz cargue con trabajo sensible y permite recuperar procesos fallidos con estados claros.",
  "Las parejas, los planes y los estados cerrados obligan a disenar reglas de negocio explicitas, no simples filtros visuales.",
];

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="card p-5">
      <p className="text-3xl md:text-4xl font-bold text-accent-light mb-1">{value}</p>
      <p className="text-sm text-text-secondary leading-snug">{label}</p>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="mb-10">
      <p className="text-sm font-mono text-accent-light mb-3 uppercase tracking-wider">
        {eyebrow}
      </p>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{title}</h2>
      {text && <p className="text-lg text-text-secondary leading-relaxed max-w-3xl">{text}</p>}
    </div>
  );
}

function ModuleScreenshot({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) {
  return (
    <figure className="group">
      <div className="relative aspect-[16/8.6] overflow-hidden rounded-lg border border-border bg-bg-secondary">
        <ZoomableImage
          src={src}
          alt={alt}
          width={1888}
          height={906}
          sizes="(min-width: 768px) 520px, 100vw"
          caption={caption}
          className="h-full"
          imageClassName="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.025]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-primary/25 via-transparent to-transparent opacity-70" />
      </div>
      <figcaption className="mt-3 text-xs text-text-muted leading-relaxed">
        {caption}
      </figcaption>
    </figure>
  );
}

export default function EmailOperationsCaseStudy() {
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
        <header className="mb-20">
          <div className="flex items-center gap-3 mb-8 flex-wrap">
            <span className="text-xs text-text-muted font-mono">2024 - presente</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8">
            Sistema de envios y workflows de Growork
          </h1>

          <p className="text-xl md:text-2xl text-text-secondary leading-relaxed mb-8">
            Este proyecto es el sistema operativo interno que reduce riesgo operativo en Growork: sincroniza clientes desde CRM, controla onboarding con n8n, valida documentos en Drive, crea cuentas de Google Workspace, regula envios con warmup, deja trazabilidad de cada email y convierte respuestas en trabajo accionable.
          </p>

          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Metric value="8" label="apartados operativos de la web interna" />
            <Metric value="5" label="workflows secuenciales por cliente" />
            <Metric value="14+" label="modulos backend conectados" />
            <Metric value="24/7" label="crons, worker, syncs y monitorizacion" />
          </div>

          <div className="flex flex-wrap gap-2">
            {stack.map((tech) => (
              <span key={tech} className="tag">
                {tech}
              </span>
            ))}
          </div>
        </header>

        <div className="mb-24">
          <ZoomableImage
            src="/screenshots/email-operations-os.svg"
            alt="Arquitectura del sistema interno de envios de Growork"
            width={1440}
            height={900}
            caption="Arquitectura general del sistema: frontend operativo, backend de negocio y servicios conectados."
            className="rounded-xl border border-border"
            imageClassName="w-full"
            priority
          />
        </div>

        <section className="prose-custom mb-24">
          <SectionHeading
            eyebrow="El reto"
            title="No era enviar emails. Era reducir el riesgo de una operacion completa."
          />
          <p className="text-lg text-text-secondary leading-relaxed mb-6">
            Un cliente de Growork no necesita solo que se envie un correo. Antes tiene que existir en el CRM, tener su plan activo, avanzar por un onboarding, tener documentos ordenados, contar con un CV final, recibir una cuenta corporativa y entrar en una cadencia de envios que no dane la reputacion del dominio.
          </p>
          <p className="text-lg text-text-secondary leading-relaxed">
            Por eso construi una web interna que no es un dashboard decorativo: es una consola de operaciones. Cada boton toca un proceso real, cada estado tiene consecuencias y cada envio deja trazabilidad suficiente para responder, auditar y mejorar.
          </p>
        </section>

        <section className="mb-24">
          <SectionHeading
            eyebrow="Antes / despues"
            title="De tareas dispersas a control operativo"
            text="El cambio importante no fue automatizar por automatizar. Fue convertir acciones fragiles en un sistema con reglas, estados y puntos de control visibles."
          />

          <div className="space-y-4">
            {beforeAfter.map((item, index) => (
              <div key={item.before} className="card p-6 md:p-7 grid md:grid-cols-[80px_1fr_1fr] gap-5">
                <p className="text-2xl font-bold text-accent/40 font-mono">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div>
                  <p className="text-xs font-mono text-text-muted uppercase tracking-wider mb-2">
                    Antes
                  </p>
                  <p className="text-text-secondary leading-relaxed">{item.before}</p>
                </div>
                <div>
                  <p className="text-xs font-mono text-accent-light uppercase tracking-wider mb-2">
                    Despues
                  </p>
                  <p className="text-text-secondary leading-relaxed">{item.after}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <SectionHeading
            eyebrow="Mapa de la web"
            title="Que hace cada apartado"
            text="La interfaz esta dividida por responsabilidades. Asi se puede operar el negocio sin entrar a la base de datos, n8n, Google Admin o logs del servidor para cada decision diaria."
          />

          <div className="space-y-8">
            {webSections.map((section, index) => (
              <div
                key={section.name}
                className="card p-5 md:p-7 grid lg:grid-cols-2 gap-7 items-center overflow-hidden"
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <p className="text-xs font-mono text-accent-light mb-3">
                    MODULO {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-5">
                    {section.name}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-mono text-text-muted uppercase tracking-wider mb-2">
                        Que resuelve
                      </p>
                      <p className="text-text-secondary leading-relaxed">{section.purpose}</p>
                    </div>
                    <div>
                      <p className="text-xs font-mono text-text-muted uppercase tracking-wider mb-2">
                        Conexion real
                      </p>
                      <p className="text-text-secondary leading-relaxed">{section.connection}</p>
                    </div>
                  </div>
                </div>
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <ModuleScreenshot
                    src={section.image}
                    alt={section.imageAlt}
                    caption={section.caption}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <SectionHeading
            eyebrow="Conexiones"
            title="Como se conectan todas las piezas"
            text="La arquitectura separa producto, automatizacion, datos y servicios externos. La web no hace trabajo sensible directamente: habla con el backend, y el backend decide que sistema debe intervenir."
          />

          <div className="card p-6 md:p-8 mb-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {architectureFlow.map((step, index) => (
                <div key={step} className="relative rounded-lg border border-border bg-bg-primary/60 p-4 min-h-24">
                  <p className="text-xs font-mono text-accent/70 mb-3">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="font-semibold">{step}</p>
                  {index < architectureFlow.length - 1 && (
                    <span className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-accent/60 font-mono">
                      -&gt;
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                title: "Capa de producto",
                text:
                  "Next.js organiza la operacion en pantallas: clientes, workflows, preview, envios, respuestas, dominios y correos corporativos. El usuario ve procesos humanos, no endpoints.",
              },
              {
                title: "Capa de negocio",
                text:
                  "NestJS contiene modulos para clients, scheduler, worker, email, responses, n8n, workflow-state, corporate-emails, dominios, dashboard, Drive, Twenty y Finance.",
              },
              {
                title: "Capa de datos",
                text:
                  "PostgreSQL guarda la verdad operacional: cliente, estado, plan, settings, jobs, emails, respuestas, workflows, dominios y notificaciones.",
              },
              {
                title: "Automatizacion visual",
                text:
                  "n8n ejecuta procesos que no deberian vivir en la UI: crear carpetas, compartir Drive, detectar archivos, mover CVs y crear cuentas Workspace.",
              },
              {
                title: "Google Workspace",
                text:
                  "Google Admin crea cuentas corporativas; Gmail API envia y responde; Drive almacena los CVs y cartas finales que se adjuntan a cada candidatura.",
              },
              {
                title: "IA aplicada",
                text:
                  "OpenAI genera emails, resume CVs, crea cartas de presentacion, clasifica respuestas y propone replies. Siempre con fallback para que el proceso no se detenga.",
              },
            ].map((item) => (
              <div key={item.title} className="card p-6">
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <SectionHeading
            eyebrow="Workflows"
            title="El onboarding visual de cada cliente"
            text="Cada cliente avanza por una secuencia de workflows. La UI muestra el primer paso pendiente, permite ejecutar los manuales y registra los automaticos cuando n8n devuelve el webhook."
          />

          <div className="space-y-4">
            {workflowSteps.map((workflow) => (
              <div key={workflow.id} className="card p-6 md:p-7 grid md:grid-cols-[120px_220px_1fr] gap-5 items-start">
                <div>
                  <p className="text-2xl font-bold text-accent-light font-mono">{workflow.id}</p>
                  <p className="text-xs text-text-muted mt-1">{workflow.mode}</p>
                </div>
                <h3 className="text-xl font-semibold">{workflow.title}</h3>
                <p className="text-text-secondary leading-relaxed">{workflow.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <SectionHeading
            eyebrow="Envios"
            title="Como se gestiona el envio de emails por cliente"
            text="El sistema cuida el volumen, la calidad, el origen del envio, los adjuntos, la trazabilidad y las respuestas. Es un flujo disenado para operar muchos clientes sin perder control."
          />

          <div className="grid md:grid-cols-2 gap-5">
            {emailFlow.map((item) => (
              <div key={item.step} className="card p-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-3xl font-bold text-accent/40 font-mono">{item.step}</span>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <SectionHeading
            eyebrow="Google Workspace"
            title="Cuentas corporativas, dominios y reputacion"
            text="La cuenta de correo no se crea como un dato suelto. Forma parte de un ciclo de vida: asignacion, uso, seguimiento, periodo de gracia y limpieza."
          />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="card p-7">
              <h3 className="text-2xl font-semibold mb-5">Creacion</h3>
              <ul className="space-y-3 text-text-secondary">
                {[
                  "n8n genera alias normalizado y password.",
                  "Consulta dominios activos y capacidad disponible.",
                  "Crea el usuario mediante Google Workspace Admin API.",
                  "Actualiza Twenty CRM y PostgreSQL con email, password y fecha.",
                  "Si es pareja, hereda o propaga la misma cuenta para evitar duplicar identidad.",
                ].map((item) => (
                  <li key={item} className="flex gap-3 items-start">
                    <span className="text-accent font-mono text-xs mt-1">-&gt;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-7">
              <h3 className="text-2xl font-semibold mb-5">Mantenimiento</h3>
              <ul className="space-y-3 text-text-secondary">
                {[
                  "La pagina de correos corporativos lista activos, pendientes de borrado y uso por dominio.",
                  "Un cron horario marca cuentas por cierre, inactividad o exceso de rebotes.",
                  "Hay 48 horas de gracia antes del borrado automatico.",
                  "El operador puede cancelar la eliminacion o borrar manualmente.",
                  "El sync con Workspace limpia emails que no existen o no pertenecen a dominios gestionados.",
                ].map((item) => (
                  <li key={item} className="flex gap-3 items-start">
                    <span className="text-accent font-mono text-xs mt-1">-&gt;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-24">
          <SectionHeading
            eyebrow="Configuracion"
            title="Control fino de los envios"
            text="El sistema no envia a ciegas. Cada cliente tiene configuracion propia y ademas existe una configuracion global para regular horarios y delays."
          />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="card p-7">
              <p className="text-sm font-mono text-accent-light mb-4">Por cliente</p>
              <ul className="space-y-3 text-text-secondary">
                {[
                  "active: pausa o activa el envio del cliente.",
                  "previewEnabled: decide si todo pasa por aprobacion manual.",
                  "currentDailyLimit: volumen real del dia.",
                  "targetDailyLimit: objetivo final del warmup.",
                  "warmupDailyIncrement: subida diaria controlada.",
                  "matchingCriteria: paises, ciudades, puesto, modo AND/OR y filtros activos.",
                ].map((item) => (
                  <li key={item} className="flex gap-3 items-start">
                    <span className="text-accent font-mono text-xs mt-1">-&gt;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-7">
              <p className="text-sm font-mono text-accent-light mb-4">Global</p>
              <ul className="space-y-3 text-text-secondary">
                {[
                  "startHour y endHour definen la ventana de envio.",
                  "minDelayMinutes y maxDelayMinutes generan pausas aleatorias.",
                  "enabled permite desactivar restricciones en situaciones controladas.",
                  "El worker interpreta la ventana en zona Atlantic/Canary.",
                  "El monitor permite ver jobs done, failed, running, queued o sin job.",
                ].map((item) => (
                  <li key={item} className="flex gap-3 items-start">
                    <span className="text-accent font-mono text-xs mt-1">-&gt;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-24">
          <SectionHeading
            eyebrow="Datos"
            title="Modelo de datos que sostiene la operacion"
            text="La base de datos no solo almacena clientes. Tambien conserva decisiones, historial, configuracion, ejecuciones, reputacion y conversaciones."
          />

          <div className="card p-8 md:p-10">
            <div className="grid md:grid-cols-2 gap-4">
              {dataModel.map((item) => (
                <div key={item} className="flex gap-3 items-start rounded-lg bg-bg-primary/50 p-4">
                  <span className="text-accent font-mono text-xs mt-1">-&gt;</span>
                  <p className="text-sm text-text-secondary leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-24">
          <SectionHeading
            eyebrow="Respuestas"
            title="El envio no termina cuando sale el email"
            text="La parte mas valiosa esta despues: leer respuestas, entenderlas y poder contestar bien sin romper el hilo."
          />

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                title: "Lectura Gmail",
                text:
                  "El sistema busca replies por remitente, excluye mensajes propios, deduplica por gmailMessageId y conserva threadId.",
              },
              {
                title: "Clasificacion IA",
                text:
                  "Cada respuesta se clasifica como negativa, automatica, entrevista, mas informacion, contratado o sin clasificar, con confianza y razonamiento.",
              },
              {
                title: "Reply en hilo",
                text:
                  "La respuesta se envia con headers In-Reply-To y References, ademas del threadId de Gmail, para mantener la conversacion ordenada.",
              },
            ].map((item) => (
              <div key={item.title} className="card p-6">
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <SectionHeading
            eyebrow="Riesgos"
            title="Que podia salir mal y como lo controle"
            text="El valor de esta pieza esta en prevenir fallos operativos caros: reputacion de dominio, duplicados, documentos incorrectos y perdida de contexto."
          />

          <div className="grid md:grid-cols-2 gap-5">
            {riskControls.map((item) => (
              <div key={item.risk} className="card p-6">
                <p className="text-xs font-mono text-accent-light uppercase tracking-wider mb-3">
                  Riesgo
                </p>
                <h3 className="text-xl font-semibold mb-4">{item.risk}</h3>
                <p className="text-xs font-mono text-text-muted uppercase tracking-wider mb-2">
                  Control
                </p>
                <p className="text-sm text-text-secondary leading-relaxed">{item.control}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <SectionHeading
            eyebrow="Seguridad y robustez"
            title="Decisiones que evitan danos reales"
            text="Cuando un sistema envia emails desde cuentas de clientes, una equivocacion no es estetica: puede quemar dominios, duplicar contactos o mezclar datos sensibles."
          />

          <div className="grid md:grid-cols-2 gap-4">
            {safeguards.map((item) => (
              <div key={item} className="card p-5 flex gap-3 items-start">
                <span className="text-accent font-mono text-xs mt-1">OK</span>
                <p className="text-sm text-text-secondary leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="prose-custom mb-24">
          <SectionHeading
            eyebrow="Lo que demuestra"
            title="Este proyecto cuenta mucho mas que una lista de tecnologias"
          />
          <p className="text-lg text-text-secondary leading-relaxed mb-6">
            Aqui hay producto, backend, frontend, automatizacion, datos, integraciones, IA, operaciones y criterio. El valor no esta en haber conectado Gmail o n8n, sino en haber disenado un sistema donde cada cliente tiene un camino claro, cada correo tiene trazabilidad y cada parte del negocio puede operar sin depender de tareas manuales repetitivas.
          </p>
          <blockquote className="pl-6 border-l-2 border-accent/40 text-text-secondary text-lg italic leading-relaxed my-10">
            Este sistema convierte una operacion compleja en una consola accionable: sabes quien esta listo, quien esta bloqueado, que se ha enviado, quien ha respondido, que cuenta esta en riesgo y que workflow necesita atencion.
          </blockquote>
        </section>

        <section className="mb-24">
          <SectionHeading
            eyebrow="Aprendizaje"
            title="Lo que me dejo construir un sistema interno de verdad"
            text="La mayor complejidad no estuvo en una API concreta, sino en hacer que todos los estados fueran recuperables, visibles y suficientemente seguros para operar a diario."
          />

          <div className="grid md:grid-cols-2 gap-4">
            {learnings.map((item) => (
              <div key={item} className="card p-5 flex gap-3 items-start">
                <span className="text-accent font-mono text-xs mt-1">-&gt;</span>
                <p className="text-sm text-text-secondary leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="text-center py-16 border-t border-border">
          <p className="text-xl md:text-2xl text-text-secondary leading-relaxed max-w-3xl mx-auto mb-10">
            Es probablemente una de las piezas mas potentes de Growork: una infraestructura interna que conecta clientes, documentos, workflows, Google Workspace, IA, envios, respuestas y reputacion en un solo sistema operativo de trabajo.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/projects/growork" className="btn btn-primary">
              Ver Growork completo
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
