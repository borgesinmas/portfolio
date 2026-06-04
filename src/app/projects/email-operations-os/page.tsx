import Link from "next/link";
import type { Metadata } from "next";
import { ZoomableImage } from "@/components/ZoomableImage";
import { CodeBlock, DataModelTable } from "@/components/CaseStudyPrimitives";

export const metadata: Metadata = {
  title: "Sistema de Envíos Growork — Caso de Estudio",
  description:
    "Caso de estudio del sistema interno de Growork para gestionar clientes, workflows, Google Workspace, envíos de email con warmup, respuestas con IA, Drive y configuración operativa, sobre NestJS y Next.js.",
};

const stack = [
  "Next.js 16",
  "React 19",
  "TypeScript",
  "NestJS 11",
  "TypeORM 0.3",
  "PostgreSQL",
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
    image: "/screenshots/webinterna1.webp",
    imageAlt: "Panel de control de la web interna de envíos",
    caption: "Vista general de salud: clientes, estados, rendimiento de emails, pipeline y consumo de IA.",
    purpose:
      "Vista ejecutiva con KPIs de clientes, distribución por estado, estadísticas de envío y actividad reciente. Sirve para saber si la operación está sana sin abrir cada módulo.",
    connection:
      "Lee agregados del backend sobre clients, email_sends y notifications. Se refresca en intervalos distintos según el peso de cada consulta.",
  },
  {
    name: "Clientes",
    image: "/screenshots/webinterna2.webp",
    imageAlt: "Gestión de clientes con estado CRM, plan, preview y warmup",
    caption: "Tabla operativa para decidir quién envía, con qué plan, en qué estado y con qué volumen.",
    purpose:
      "Centro de control por cliente: estado CRM, plan, pareja, envío activo, modo preview, warmup, criterios de matching, estadísticas y respuestas.",
    connection:
      "Sincroniza con Twenty CRM, guarda client_send_settings en PostgreSQL y propaga los ajustes a la pareja cuando existe.",
  },
  {
    name: "Pipeline de workflows",
    image: "/screenshots/webinterna3.webp",
    imageAlt: "Pipeline de workflows por cliente en formato Kanban",
    caption: "Kanban secuencial para saber qué cliente necesita carpeta, creador, CV final o email corporativo.",
    purpose:
      "Kanban operativo para ver en qué punto está cada cliente: carpetas, creador de CV, nuevo archivo, aprobación de CV y correo corporativo.",
    connection:
      "Cada columna se alimenta de client_workflow_states y se actualiza con los webhooks de n8n. Los pasos manuales disparan workflows desde la propia interfaz.",
  },
  {
    name: "Creadores de CV",
    image: "/screenshots/webinterna4.webp",
    imageAlt: "Gestión de creadores de CV e idiomas asignados",
    caption: "Inventario de creadores, idiomas, estado y asignaciones para mantener el flujo documental.",
    purpose:
      "Gestión de los profesionales que preparan los CV: idiomas, estado, asignación y visibilidad del trabajo activo.",
    connection:
      "Se vincula con los clientes y con el workflow WKF-1.1 para compartir carpetas de Drive y registrar el creador asignado.",
  },
  {
    name: "Dominios",
    image: "/screenshots/webinterna5.webp",
    imageAlt: "Gestión de dominios para correos corporativos",
    caption: "Control de dominios activos, prioridad y capacidad antes de crear cuentas de Workspace.",
    purpose:
      "Administración de los dominios de envío: activo/inactivo, prioridad, usuarios actuales y capacidad máxima.",
    connection:
      "n8n consulta estos datos antes de crear cuentas en Google Workspace, y el backend los usa para validar los emails corporativos gestionados.",
  },
  {
    name: "Correos corporativos",
    image: "/screenshots/webinterna6.webp",
    imageAlt: "Gestión de correos corporativos conectados a Google Workspace",
    caption: "Cuentas activas, pendientes de borrado, uso por dominio y sincronización con Google Workspace.",
    purpose:
      "Inventario de las cuentas creadas para clientes: estado de gracia, borrado manual, sincronización con Google Workspace y limpieza de inconsistencias.",
    connection:
      "Habla con la Admin Directory API de Google, y se apoya en clients.emailOperativo, dominios y notificaciones de borrado.",
  },
  {
    name: "Preview de emails",
    image: "/screenshots/webinterna7.webp",
    imageAlt: "Preview de emails pendientes de revisión",
    caption: "Zona de control humano: revisar, aprobar, rechazar, editar o regenerar antes de enviar.",
    purpose:
      "Bandeja de aprobación donde los emails generados por IA se pueden revisar, editar, regenerar, rechazar o aprobar antes del envío.",
    connection:
      "Consume los email_sends en estado pending_review y, al aprobar, llama al EmailService para enviar con la Gmail API.",
  },
  {
    name: "Centro de envíos",
    image: "/screenshots/webinterna8.webp",
    imageAlt: "Centro de envíos con monitor, enviados y respuestas",
    caption: "Monitor diario de jobs, historial de envíos y gestión de respuestas desde una sola pantalla.",
    purpose:
      "Módulo unificado con tres pestañas: monitor diario de jobs, historial de enviados y gestión de respuestas.",
    connection:
      "Une scheduler, worker, sent-emails, email-responses, clasificación con IA y threading de Gmail en una sola pantalla operativa.",
  },
];

const workflowSteps = [
  {
    id: "WKF-1",
    title: "Crear estructura en Drive",
    mode: "Automático",
    text:
      "Cuando entra un cliente desde Twenty, n8n crea la carpeta principal y las subcarpetas CV, OLD, NEW y DEFINITIVA. Devuelve los identificadores al backend para que el resto del sistema sepa dónde leer y escribir.",
  },
  {
    id: "WKF-1.1",
    title: "Asignar creador de CV",
    mode: "Manual",
    text:
      "Desde el Kanban se dispara el workflow que comparte las carpetas con el creador correcto según el idioma. El backend registra el creador y mueve al cliente al siguiente paso.",
  },
  {
    id: "WKF-1.2",
    title: "Detectar nuevo CV",
    mode: "Automático",
    text:
      "n8n revisa la carpeta NEW y avisa cuando aparece un archivo nuevo. El cliente se coloca en la columna de aprobación, con la metadata del archivo recibido.",
  },
  {
    id: "WKF-1.3",
    title: "Mover a DEFINITIVA",
    mode: "Manual",
    text:
      "El operador selecciona el CV correcto desde la interfaz. n8n lo mueve a la carpeta definitiva, retira los accesos temporales y el backend marca el CV como finalizado.",
  },
  {
    id: "WKF-1.4",
    title: "Crear email corporativo",
    mode: "Automático",
    text:
      "Tras aprobar el CV, se crea la cuenta de Google Workspace, se guardan email y contraseña, se sincroniza con Twenty y, si hay pareja, se reutiliza o propaga la misma cuenta.",
  },
];

const emailFlow = [
  {
    step: "01",
    title: "Cliente activo y con plan",
    text:
      "Solo los clientes en estado In Progress, con envío activo y plan vigente, entran en el circuito. El worker vuelve a validar el plan justo antes de enviar (fail-closed).",
  },
  {
    step: "02",
    title: "Scheduler diario",
    text:
      "A las 6:00 (zona Atlantic/Canary) crea un SendJob por cliente activo. En parejas solo procesa al primario y exige que ambos estén activos para evitar duplicados.",
  },
  {
    step: "03",
    title: "Warmup",
    text:
      "El límite diario sube de forma gradual con currentDailyLimit, targetDailyLimit y warmupDailyIncrement, solo si el job del día anterior se completó. La reputación se protege antes de escalar volumen.",
  },
  {
    step: "04",
    title: "Matching de ofertas",
    text:
      "El worker busca ofertas recientes por país, ciudad y puesto (modo AND/OR). Excluye las ofertas ya contactadas por el cliente o su pareja y los emails con mala reputación.",
  },
  {
    step: "05",
    title: "IA y documentos",
    text:
      "OpenAI genera el email, resume el CV y puede preparar la carta de presentación. Drive aporta los PDF de la carpeta DEFINITIVA, con caché para no descargar lo mismo en cada tick.",
  },
  {
    step: "06",
    title: "Preview o envío directo",
    text:
      "Por defecto el email queda en pending_review. Si el modo automático está activado, la Gmail API lo envía directamente desde el email corporativo del cliente.",
  },
  {
    step: "07",
    title: "Trazabilidad",
    text:
      "Se guardan messageId, gmailThreadId, asunto, contenido, adjuntos, modelo de IA, estado y fecha. Esto permite auditoría, respuestas en hilo y estadísticas reales.",
  },
  {
    step: "08",
    title: "Respuestas",
    text:
      "El sistema lee Gmail, guarda las respuestas, las clasifica con IA y permite contestar manteniendo In-Reply-To, References y el threadId.",
  },
];

const dataModel = [
  {
    name: "client",
    purpose:
      "Cliente sincronizado desde Twenty CRM: estado operativo, vínculo de pareja, plan y email corporativo asignado.",
    fields: ["twentyId", "estado", "parejaId", "isPrimaryPartner", "planStatus", "planExpiresAt", "paisesInteres", "ciudadesInteres"],
  },
  {
    name: "client_send_settings",
    purpose:
      "Configuración de envío 1:1 por cliente: activación, parámetros de warmup, modo preview y criterios de matching en JSONB.",
    fields: ["clientId (unique)", "active", "currentDailyLimit", "targetDailyLimit", "warmupDailyIncrement", "previewEnabled", "matchingCriteria (JSONB)"],
  },
  {
    name: "send_job",
    purpose:
      "Trabajo diario por cliente generado por el scheduler; el worker lo consume respetando la ventana horaria.",
    fields: ["clientId", "scheduledDate", "status", "emailsToSend", "emailsSentCount"],
  },
  {
    name: "email_send",
    purpose:
      "Cada email reservado o enviado a una oferta. Sus constraints únicos impiden contactar dos veces la misma oferta o destinatario.",
    fields: ["UNIQUE(clientId, jobOfferId)", "UNIQUE(clientId, recipientEmail)", "status", "messageId", "gmailThreadId", "aiModel"],
  },
  {
    name: "email_response",
    purpose:
      "Respuesta recibida, con los datos de threading RFC 5322 y la clasificación de la IA con su nivel de confianza.",
    fields: ["gmailMessageId (unique)", "gmailThreadId", "inReplyTo", "referencesHeader", "classification", "classificationConfidence"],
  },
  {
    name: "client_workflow_state",
    purpose:
      "Estado PENDING/OK/ERROR de cada workflow (WKF_1 … WKF_1_4) por cliente; es lo que alimenta el Kanban.",
    fields: ["UNIQUE(clientId, workflowType)", "status", "executionUrl", "metadata"],
  },
  {
    name: "dominio",
    purpose:
      "Dominio de envío con prioridad y capacidad. n8n elige uno por sorteo ponderado antes de crear una cuenta corporativa.",
    fields: ["dominio (unique)", "activo", "prioridad", "maxUsuarios", "usuariosActuales"],
  },
  {
    name: "ai_usage_log · email_reputation",
    purpose:
      "Auditoría de cada llamada a OpenAI (operación, modelo, tokens y coste) y lista de rebotes/inválidos para excluir destinatarios con mala reputación.",
    fields: ["operation", "model", "inputTokens", "outputTokens", "email", "is_bounced", "is_invalid"],
  },
];

const codeEvidence = [
  {
    title: "Scheduler diario en zona horaria explícita",
    filename: "backend/src/scheduler/scheduler.service.ts",
    language: "typescript",
    code: `// Un único job diario por cliente activo, en hora de Canarias.
@Cron('0 0 6 * * *', { timeZone: 'Atlantic/Canary' })
async handleDailyJobCreation() {
  // 1. Clientes con estado 'In Progress' y plan vigente (fail-closed).
  // 2. En parejas, solo el primario recibe SendJob.
  // 3. Idempotente: no crea dos jobs para el mismo día (CURRENT_DATE).
  // 4. Calcula una hora de arranque aleatoria dentro de la ventana.
}`,
    caption:
      "El reparto diario es idempotente y consciente de la zona horaria; la asincronía del worker se ordena con un scheduler que no duplica trabajo.",
  },
  {
    title: "Warmup: el límite diario sube solo si ayer se envió",
    filename: "backend/src/scheduler/scheduler.service.ts",
    language: "typescript",
    code: `if (settings.isWarmupActive &&
    settings.currentDailyLimit < settings.targetDailyLimit) {

  const yesterdayJob = await this.sendJobRepository
    .createQueryBuilder('job')
    .where('job.client_id = :clientId', { clientId: client.id })
    .andWhere("DATE(job.scheduled_date) = CURRENT_DATE - INTERVAL '1 day'")
    .andWhere('job.status = :status', { status: SendJobStatus.DONE })
    .andWhere('job.emails_sent_count > 0')
    .getOne();

  if (yesterdayJob) {
    const next = settings.currentDailyLimit + settings.warmupDailyIncrement;
    settings.currentDailyLimit = Math.min(next, settings.targetDailyLimit);
    await this.settingsRepository.save(settings);
  }
}`,
    caption:
      "El warmup no escala por calendario, sino por entrega real del día anterior. Así protege la reputación del dominio antes de subir el volumen.",
  },
  {
    title: "Respuestas en hilo conforme a RFC 5322",
    filename: "backend/src/email/email.service.ts",
    language: "typescript",
    code: `// Para que el hotel vea la respuesta dentro de la misma conversación,
// hay que reconstruir la cadena de headers, no solo el threadId de Gmail.
await transporter.sendMail({
  to,
  from: fromEmail,
  subject: replySubject,
  html: htmlContent,
  headers: {
    'In-Reply-To': normalizeMessageId(inReplyToMessageId),
    References: buildReferencesHeader(existingReferences, inReplyToMessageId),
  },
});`,
    caption:
      "El threading correcto exige In-Reply-To y la cadena References (RFC 5322), además del threadId propietario de Gmail. Un detalle invisible que evita romper conversaciones.",
  },
  {
    title: "Anti-duplicados a nivel de base de datos",
    filename: "backend/src/entities/email-send.entity.ts",
    language: "typescript",
    code: `@Entity('email_sends')
// Dos garantías a nivel de esquema, no de aplicación:
@Unique(['clientId', 'jobOfferId'])      // nunca la misma oferta dos veces
@Unique(['clientId', 'recipientEmail'])  // nunca el mismo destinatario dos veces
export class EmailSend {
  // ...
}`,
    caption:
      "Las reglas críticas viven en el esquema. Aunque dos ticks del worker compitan, la base de datos impide enviar la misma candidatura por duplicado.",
  },
];

const safeguards = [
  "API key global en los endpoints internos y rate limiting con Throttler (100 peticiones / 60 s).",
  "Domain-Wide Delegation para impersonar las cuentas de cliente sin guardar sesiones de Gmail.",
  "Validación de los dominios gestionados para no tratar emails personales como corporativos.",
  "Constraints únicos para no enviar dos veces la misma oferta ni el mismo destinatario a un cliente.",
  "Webhooks de n8n mapeados por workflowId y, como fallback, por tipo de evento.",
  "Los clientes en estado Closed quedan fuera del scheduler, el worker, el Kanban y los webhooks operativos.",
  "Periodo de gracia de 48 horas antes de borrar cuentas corporativas de forma automática.",
  "Fallbacks: si falla la IA se usa una plantilla; si falla Drive, el sistema puede seguir sin adjuntos.",
];

const beforeAfter = [
  {
    before: "Los estados de cada cliente vivían repartidos entre CRM, Drive, Gmail, hojas de cálculo, n8n y la memoria del equipo.",
    after:
      "La web interna convierte esos estados en una única consola: listo, bloqueado, pendiente de revisión, enviado, respondido o en riesgo.",
  },
  {
    before: "Un error pequeño podía duplicar contactos, enviar desde la cuenta equivocada o usar un CV no definitivo.",
    after:
      "Cada envío pasa por validaciones de plan, cuenta corporativa, carpeta DEFINITIVA, historial de ofertas y reputación.",
  },
  {
    before: "La supervisión dependía de revisar herramientas externas y reconstruir qué había pasado cliente por cliente.",
    after:
      "Jobs, emails, respuestas, workflows y notificaciones quedan trazados para auditar la operación sin salir del sistema.",
  },
];

const riskControls = [
  {
    risk: "Quemar dominios por volumen o cadencia incorrecta",
    control:
      "Warmup progresivo, límites diarios por cliente, ventana global de envío, delays aleatorios y capacidad por dominio antes de crear cuentas nuevas.",
  },
  {
    risk: "Duplicar candidaturas o contactar dos veces a la misma empresa",
    control:
      "Constraints únicos y filtros cruzados sobre cliente, pareja, oferta, destinatario y estado previo de email_sends.",
  },
  {
    risk: "Enviar documentos equivocados o incompletos",
    control:
      "El worker solo toma PDF de la carpeta DEFINITIVA y conserva la metadata del archivo usado en cada envío.",
  },
  {
    risk: "Perder el contexto cuando llega una respuesta",
    control:
      "Se guardan gmailThreadId, messageId, headers y clasificación de IA para contestar dentro del hilo correcto.",
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
  "La automatización valiosa no es la que elimina personas, sino la que les muestra dónde intervenir antes de que haya daño.",
  "Un sistema de emails se parece más a una infraestructura de riesgo que a una campaña de marketing: mandan la reputación, la identidad y la trazabilidad.",
  "Separar UI, backend y n8n evita que la interfaz cargue con trabajo sensible y permite recuperar procesos fallidos con estados claros.",
  "Las parejas, los planes y los estados cerrados obligan a diseñar reglas de negocio explícitas, no simples filtros visuales.",
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
      <div className="relative aspect-video overflow-hidden card card-lg bg-bg-secondary">
        <ZoomableImage
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 768px) 520px, 100vw"
          caption={caption}
          containerClassName="h-full"
          imageClassName="object-contain p-4 transition-transform duration-700 group-hover:scale-[1.025]"
        />
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
            <span className="text-xs text-text-muted font-mono">2024 — presente</span>
            <span className="text-xs text-text-muted font-mono">Web interna del ecosistema Growork</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8">
            Sistema de envíos y workflows de Growork
          </h1>

          <p className="text-xl md:text-2xl text-text-secondary leading-relaxed mb-8">
            Es el sistema operativo interno que reduce el riesgo de Growork: sincroniza clientes desde el CRM, controla el onboarding con n8n, valida documentos en Drive, crea cuentas de Google Workspace, regula los envíos con warmup, deja trazabilidad de cada email y convierte las respuestas en trabajo accionable.
          </p>

          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Metric value="8" label="áreas operativas de la web interna" />
            <Metric value="5" label="workflows secuenciales por cliente" />
            <Metric value="16" label="módulos backend conectados" />
            <Metric value="24/7" label="crons, worker, syncs y monitorización" />
          </div>

          <div className="flex flex-wrap gap-2">
            {stack.map((tech) => (
              <span key={tech} className="tag">
                {tech}
              </span>
            ))}
          </div>
        </header>

        <div className="mb-24 card card-lg overflow-hidden relative bg-bg-secondary aspect-video">
          <ZoomableImage
            src="/screenshots/email-operations-os.svg"
            alt="Arquitectura del sistema interno de envíos de Growork"
            fill
            caption="Arquitectura general del sistema: frontend operativo, backend de negocio y servicios conectados."
            containerClassName="h-full"
            imageClassName="object-contain p-4"
            priority
          />
        </div>

        <section className="prose-custom mb-24">
          <SectionHeading
            eyebrow="El reto"
            title="No era enviar emails. Era reducir el riesgo de toda una operación."
          />
          <p className="text-lg text-text-secondary leading-relaxed mb-6">
            Un cliente de Growork no necesita solo que se envíe un correo. Antes tiene que existir en el CRM, tener su plan activo, avanzar por un onboarding, tener los documentos ordenados, contar con un CV final, recibir una cuenta corporativa y entrar en una cadencia de envíos que no dañe la reputación del dominio.
          </p>
          <p className="text-lg text-text-secondary leading-relaxed">
            Por eso construí una web interna que no es un dashboard decorativo: es una consola de operaciones. Cada botón toca un proceso real, cada estado tiene consecuencias y cada envío deja la trazabilidad suficiente para responder, auditar y mejorar.
          </p>
        </section>

        <section className="mb-24">
          <SectionHeading
            eyebrow="Antes / después"
            title="De tareas dispersas a control operativo"
            text="El cambio importante no fue automatizar por automatizar. Fue convertir acciones frágiles en un sistema con reglas, estados y puntos de control visibles."
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
                    Después
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
            title="Qué hace cada apartado"
            text="La interfaz está dividida por responsabilidades. Así se puede operar el negocio sin entrar a la base de datos, a n8n, a Google Admin o a los logs del servidor para cada decisión diaria."
          />

          <div className="space-y-8">
            {webSections.map((section, index) => (
              <div
                key={section.name}
                className="card p-5 md:p-7 grid lg:grid-cols-2 gap-7 items-center overflow-hidden"
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <p className="text-xs font-mono text-accent-light mb-3">
                    MÓDULO {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-5">
                    {section.name}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-mono text-text-muted uppercase tracking-wider mb-2">
                        Qué resuelve
                      </p>
                      <p className="text-text-secondary leading-relaxed">{section.purpose}</p>
                    </div>
                    <div>
                      <p className="text-xs font-mono text-text-muted uppercase tracking-wider mb-2">
                        Conexión real
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
            title="Cómo se conectan todas las piezas"
            text="La arquitectura separa producto, automatización, datos y servicios externos. La web no hace trabajo sensible directamente: habla con el backend, y el backend decide qué sistema debe intervenir."
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
                      &rarr;
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
                  "Next.js organiza la operación en pantallas: clientes, workflows, preview, envíos, respuestas, dominios y correos corporativos. El usuario ve procesos humanos, no endpoints.",
              },
              {
                title: "Capa de negocio",
                text:
                  "NestJS concentra los módulos de clients, scheduler, worker, email, responses, n8n, workflow-state, corporate-emails, dominios, dashboard, Drive, Twenty y finance.",
              },
              {
                title: "Capa de datos",
                text:
                  "PostgreSQL guarda la verdad operacional: cliente, estado, plan, settings, jobs, emails, respuestas, workflows, dominios, reputación y notificaciones.",
              },
              {
                title: "Automatización visual",
                text:
                  "n8n ejecuta procesos que no deberían vivir en la UI: crear carpetas, compartir Drive, detectar archivos, mover CV y crear cuentas de Workspace.",
              },
              {
                title: "Google Workspace",
                text:
                  "Google Admin crea las cuentas corporativas; la Gmail API envía y responde; Drive almacena los CV y cartas finales que se adjuntan a cada candidatura.",
              },
              {
                title: "IA aplicada",
                text:
                  "OpenAI genera emails, resume CV, redacta cartas de presentación, clasifica respuestas y propone réplicas, siempre con fallback para que el proceso no se detenga.",
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
            text="Cada cliente avanza por una secuencia de workflows. La UI muestra el primer paso pendiente, permite ejecutar los manuales y registra los automáticos cuando n8n devuelve el webhook."
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
            eyebrow="Envíos"
            title="Cómo se gestiona el envío de emails por cliente"
            text="El sistema cuida el volumen, la calidad, el origen del envío, los adjuntos, la trazabilidad y las respuestas. Es un flujo diseñado para operar muchos clientes sin perder el control."
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
            eyebrow="Modelo de datos"
            title="PostgreSQL conserva el estado, las decisiones y la reputación"
            text="La base de datos no solo almacena clientes: también guarda configuración, jobs, envíos, respuestas, estados de workflow, dominios, reputación y la auditoría de cada llamada a la IA."
          />
          <DataModelTable items={dataModel} />
        </section>

        <section className="mb-24">
          <SectionHeading
            eyebrow="Evidencia técnica"
            title="Las garantías importantes viven en el código, no en la interfaz"
            text="Cuando un sistema envía emails desde cuentas de clientes, una equivocación no es estética: puede quemar dominios, duplicar contactos o romper un hilo de conversación. Fragmentos reales, sanitizados."
          />

          <div className="space-y-6">
            {codeEvidence.map((item) => (
              <div key={item.filename + item.title}>
                <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                <CodeBlock
                  code={item.code}
                  filename={item.filename}
                  language={item.language}
                  caption={item.caption}
                />
              </div>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <SectionHeading
            eyebrow="Google Workspace"
            title="Cuentas corporativas, dominios y reputación"
            text="La cuenta de correo no se crea como un dato suelto. Forma parte de un ciclo de vida: asignación, uso, seguimiento, periodo de gracia y limpieza."
          />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="card p-7">
              <h3 className="text-2xl font-semibold mb-5">Creación</h3>
              <ul className="space-y-3 text-text-secondary">
                {[
                  "n8n genera un alias normalizado y una contraseña aleatoria.",
                  "Consulta los dominios activos y su capacidad disponible.",
                  "Crea el usuario mediante la Admin Directory API de Google Workspace.",
                  "Actualiza Twenty CRM y PostgreSQL con email, contraseña y fecha.",
                  "Si es pareja, hereda o propaga la misma cuenta para no duplicar la identidad.",
                ].map((item) => (
                  <li key={item} className="flex gap-3 items-start">
                    <span className="text-accent font-mono text-xs mt-1">&rarr;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-7">
              <h3 className="text-2xl font-semibold mb-5">Mantenimiento</h3>
              <ul className="space-y-3 text-text-secondary">
                {[
                  "La página de correos corporativos lista las cuentas activas, las pendientes de borrado y el uso por dominio.",
                  "Un cron horario marca cuentas por cierre, inactividad o exceso de rebotes.",
                  "Hay 48 horas de gracia antes del borrado automático.",
                  "El operador puede cancelar la eliminación o borrar manualmente.",
                  "La sincronización con Workspace limpia emails que no existen o no pertenecen a dominios gestionados.",
                ].map((item) => (
                  <li key={item} className="flex gap-3 items-start">
                    <span className="text-accent font-mono text-xs mt-1">&rarr;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-24">
          <SectionHeading
            eyebrow="Configuración"
            title="Control fino de los envíos"
            text="El sistema no envía a ciegas. Cada cliente tiene su propia configuración y, además, existe una configuración global para regular horarios y delays."
          />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="card p-7">
              <p className="text-sm font-mono text-accent-light mb-4">Por cliente</p>
              <ul className="space-y-3 text-text-secondary">
                {[
                  "active: pausa o activa el envío del cliente.",
                  "previewEnabled: decide si todo pasa por aprobación manual.",
                  "currentDailyLimit: volumen real del día.",
                  "targetDailyLimit: objetivo final del warmup.",
                  "warmupDailyIncrement: subida diaria controlada.",
                  "matchingCriteria: países, ciudades, puesto, modo AND/OR y filtros activos.",
                ].map((item) => (
                  <li key={item} className="flex gap-3 items-start">
                    <span className="text-accent font-mono text-xs mt-1">&rarr;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-7">
              <p className="text-sm font-mono text-accent-light mb-4">Global</p>
              <ul className="space-y-3 text-text-secondary">
                {[
                  "startHour y endHour definen la ventana de envío.",
                  "minDelayMinutes y maxDelayMinutes generan pausas aleatorias.",
                  "enabled permite desactivar restricciones en situaciones controladas.",
                  "El worker interpreta la ventana en la zona Atlantic/Canary.",
                  "El monitor permite ver jobs done, failed, running, queued o sin job.",
                ].map((item) => (
                  <li key={item} className="flex gap-3 items-start">
                    <span className="text-accent font-mono text-xs mt-1">&rarr;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-24">
          <SectionHeading
            eyebrow="Respuestas"
            title="El envío no termina cuando sale el email"
            text="La parte más valiosa está después: leer las respuestas, entenderlas y poder contestar bien sin romper el hilo."
          />

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                title: "Lectura de Gmail",
                text:
                  "El sistema busca las réplicas por remitente, excluye los mensajes propios, deduplica por gmailMessageId y conserva el threadId.",
              },
              {
                title: "Clasificación con IA",
                text:
                  "Cada respuesta se clasifica como negativa, automática, entrevista, más información, contratado o sin clasificar, con confianza y razonamiento.",
              },
              {
                title: "Respuesta en hilo",
                text:
                  "La respuesta se envía con los headers In-Reply-To y References, además del threadId de Gmail, para mantener la conversación ordenada.",
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
            title="Qué podía salir mal y cómo lo controlé"
            text="El valor de esta pieza está en prevenir fallos operativos caros: reputación de dominio, duplicados, documentos incorrectos y pérdida de contexto."
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
            title="Decisiones que evitan daños reales"
            text="Cuando un sistema envía emails desde cuentas de clientes, una equivocación no es estética: puede quemar dominios, duplicar contactos o mezclar datos sensibles."
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
            title="Este proyecto cuenta mucho más que una lista de tecnologías"
          />
          <p className="text-lg text-text-secondary leading-relaxed mb-6">
            Aquí hay producto, backend, frontend, automatización, datos, integraciones, IA, operaciones y criterio. El valor no está en haber conectado Gmail o n8n, sino en haber diseñado un sistema donde cada cliente tiene un camino claro, cada correo tiene trazabilidad y cada parte del negocio puede operar sin depender de tareas manuales repetitivas.
          </p>
          <blockquote className="pl-6 border-l-2 border-accent/40 text-text-secondary text-lg italic leading-relaxed my-10">
            Este sistema convierte una operación compleja en una consola accionable: sabes quién está listo, quién está bloqueado, qué se ha enviado, quién ha respondido, qué cuenta está en riesgo y qué workflow necesita atención.
          </blockquote>
        </section>

        <section className="mb-24">
          <SectionHeading
            eyebrow="Aprendizaje"
            title="Lo que me dejó construir un sistema interno de verdad"
            text="La mayor complejidad no estuvo en una API concreta, sino en hacer que todos los estados fueran recuperables, visibles y suficientemente seguros para operar a diario."
          />

          <div className="grid md:grid-cols-2 gap-4">
            {learnings.map((item) => (
              <div key={item} className="card p-5 flex gap-3 items-start">
                <span className="text-accent font-mono text-xs mt-1">&rarr;</span>
                <p className="text-sm text-text-secondary leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="text-center py-16 border-t border-border">
          <p className="text-xl md:text-2xl text-text-secondary leading-relaxed max-w-3xl mx-auto mb-10">
            Es probablemente una de las piezas más potentes de Growork: una infraestructura interna que conecta clientes, documentos, workflows, Google Workspace, IA, envíos, respuestas y reputación en un solo sistema operativo de trabajo.
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
