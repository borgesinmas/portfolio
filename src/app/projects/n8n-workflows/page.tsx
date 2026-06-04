import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ZoomableImage } from "@/components/ZoomableImage";

export const metadata: Metadata = {
  title: "Capa operativa n8n — Caso de Estudio",
  description:
    "Caso de estudio de una capa de automatización operativa con n8n para coordinar documentos, CRM, emails, IA, alertas, Google Workspace y webhooks de negocio.",
};

const WORKFLOWS = [
  {
    id: "01",
    title: "Envío masivo de correos con CV",
    description:
      "Sistema automatizado para enviar correos masivos personalizados con CV adjunto a hoteles y empresas. Incluye delays aleatorios para evitar spam, tracking en Google Sheets, notificaciones por Slack y manejo de errores.",
    whatItDoes: [
      "Lee destinatarios desde Google Sheets filtrados por cliente",
      "Descarga CV desde Google Drive",
      "Envía correos con Gmail API usando delays aleatorios (1-10 segundos)",
      "Marca enviados en la hoja de cálculo",
      "Crea canal de Slack por cliente y envía reporte",
      "Notifica errores en canal dedicado",
    ],
    stack: ["n8n", "Gmail API", "Google Sheets", "Google Drive", "Slack", "JavaScript"],
    image: "/screenshots/n8n-email-masivo.webp",
    challenge:
      "Evitar que Gmail marque los correos como spam. Solución: delays aleatorios entre envíos, shuffle determinista por día/persona, y límite configurable de correos por ejecución (50-70).",
  },
  {
    id: "02",
    title: "Tracker de correos con IA",
    description:
      "Clasificador automático de respuestas de hoteles usando GPT-5. Procesa la bandeja de entrada, limpia el cuerpo del correo, detecta bounces y categoriza cada respuesta en 5 tipos: interesado, no interesado, entrevista, auto-respuesta o pregunta.",
    whatItDoes: [
      "Lee correos del inbox sin procesar (filtra por etiquetas)",
      "Crea etiquetas dinámicamente si no existen (Processed, n8n_processing, interesado)",
      "Limpia cuerpo del correo: quita citas, firmas y texto de hilos previos",
      "Detecta bounces y auto-respuestas por regex (mailer-daemon, postmaster)",
      "Clasifica con GPT-5 en 5 categorías con nivel de confianza",
      "Envía notificaciones a Slack según categoría",
      "Etiqueta correos como procesados y añade 'interesado' si aplica",
    ],
    stack: ["n8n", "Gmail API", "OpenAI GPT-5", "Slack", "JavaScript"],
    image: "/screenshots/n8n-tracker-correos.webp",
    challenge:
      "Clasificación precisa multilenguaje (ES, EN, FR, DE, IT). Solución: prompt especializado que ignora texto citado y firmas, devuelve JSON puro con categoría, confianza y razones. Limpieza de cuerpo con regex para 5 idiomas.",
  },
  {
    id: "03",
    title: "Bot de finanzas con Discord",
    description:
      "Sistema de avisos automáticos para pagos próximos a vencer. Lee una hoja de Google Sheets con servicios y fechas de renovación, calcula días restantes y envía notificaciones profesionales a Discord con embeds detallados.",
    whatItDoes: [
      "Se ejecuta cada 2 días a las 6:00 AM (Schedule Trigger)",
      "Lee hoja de Google Sheets con servicios, proveedores y fechas",
      "Filtra filas con Provider y End date válidos",
      "Calcula días restantes hasta la fecha de fin del servicio",
      "Convierte formato DD/MM/YYYY a YYYY-MM-DD para JavaScript",
      "Envía embed a Discord si quedan entre 0 y 7 días",
      "Incluye: servicio, días restantes, importe, pagador, método de pago y enlace",
    ],
    stack: ["n8n", "Google Sheets", "Discord API", "JavaScript"],
    image: "/screenshots/n8n-finanzas-discord.webp",
    challenge:
      "Cálculo de fechas con formato español DD/MM/YYYY. Solución: split('/').reverse().join('-') para invertir el formato y poder calcular la diferencia en días con JavaScript Date.",
  },
  {
    id: "04",
    title: "Creador automático de carpetas en Drive",
    description:
      "Cuando se crea un nuevo cliente en el CRM, este flujo genera automáticamente toda la estructura de carpetas necesaria en Google Drive: carpeta del cliente, subcarpeta CV, y dentro las carpetas OLD, NEW y DEFINITIVA. Luego actualiza el CRM con los IDs y notifica al backend.",
    whatItDoes: [
      "Webhook recibe datos del cliente desde Twenty CRM",
      "Busca si existe carpeta del cliente en 1_Clientes, si no la crea",
      "Busca/crea subcarpeta CV dentro de la carpeta del cliente",
      "Busca/crea subcarpetas OLD, NEW, DEFINITIVA dentro de CV",
      "Actualiza Twenty CRM con los IDs de todas las carpetas",
      "Notifica al backend (webinterna) con la estructura creada",
    ],
    stack: ["n8n", "Google Drive API", "Twenty CRM", "Webhooks", "JavaScript"],
    image: "/screenshots/n8n-creador-carpetas.webp",
    challenge:
      "Gestión de errores cuando las carpetas ya existen. Solución: búsqueda previa con query, creación condicional con onError: continueErrorOutput, y merge para detectar qué subcarpetas faltan antes de crearlas.",
  },
  {
    id: "05",
    title: "Asignación inteligente de creadores de CV",
    description:
      "Sistema automatizado para asignar creadores de CV a clientes usando selección aleatoria ponderada. Consulta una API de Finance para obtener creadores disponibles por idioma, selecciona uno basado en tarifa y carga de trabajo, comparte carpetas de Drive, envía email con instrucciones y actualiza el CRM.",
    whatItDoes: [
      "Webhook recibe id_contacto e idioma del CV",
      "Consulta API de Finance para obtener creadores por idioma",
      "Selección aleatoria ponderada: peso = 1/(tarifa+1) * 1/(activeJobs+1)",
      "Soporta creador forzado (asignación manual) y revocación de creador anterior",
      "Comparte carpetas OLD y NEW con el creador seleccionado",
      "Descarga guías PDF de Drive y las adjunta al email",
      "Envía email HTML profesional al creador con instrucciones",
      "Actualiza Twenty CRM con el creador asignado",
    ],
    stack: ["n8n", "Google Drive API", "SMTP", "Twenty CRM", "Finance API", "JavaScript"],
    image: "/screenshots/n8n-avisar-creadores.webp",
    challenge:
      "Algoritmo de selección ponderada que balancea tarifa y carga de trabajo. Solución: fórmula peso = 1/(tarifa+1) * 1/(activeJobs+1) donde menor tarifa y menos jobs activos dan mayor probabilidad de ser seleccionado.",
  },
  {
    id: "06",
    title: "Detector de nuevos CVs en carpeta NEW",
    description:
      "Monitoreo automático de carpetas de clientes para detectar cuando un creador sube un nuevo CV a la carpeta NEW. Recorre toda la estructura Cliente → CV → NEW, busca archivos recientes, identifica el cliente correspondiente y notifica al backend.",
    whatItDoes: [
      "Schedule trigger cada 1 hora",
      "Lista todas las carpetas en 1_Clientes",
      "Navega estructura: Cliente → CV → NEW",
      "Busca archivos creados en las últimas 5 horas",
      "Elimina duplicados para evitar notificaciones repetidas",
      "Genera nombre slug y nombre limpio para identificar al cliente",
      "Notifica al backend con datos del archivo detectado",
    ],
    stack: ["n8n", "Google Drive API", "HTTP Requests", "JavaScript"],
    image: "/screenshots/n8n-detectar-archivo.webp",
    challenge:
      "Navegación recursiva de estructura de carpetas y detección de archivos recientes. Solución: queries de Drive API con createdTime filter, removeDuplicates para evitar procesar el mismo archivo dos veces, y normalización de nombres con regex para generar slugs.",
  },
  {
    id: "07",
    title: "Mover CV a carpeta DEFINITIVA",
    description:
      "Cuando el equipo confirma un CV en Discord, este workflow localiza la carpeta del cliente en Drive, navega hasta la carpeta DEFINITIVA y copia el archivo allí. Luego notifica al backend y dispara automáticamente la generación de email corporativo.",
    whatItDoes: [
      "Webhook recibe cliente, archivoId y canalId desde Discord",
      "Busca carpeta del cliente en Drive",
      "Navega estructura: Cliente → CV → DEFINITIVA",
      "Copia el archivo a DEFINITIVA con nombre formateado",
      "Notifica al backend con datos del CV movido",
      "Llama al workflow 1.4 para generar email corporativo",
    ],
    stack: ["n8n", "Google Drive API", "HTTP Requests", "Execute Workflow"],
    image: "/screenshots/n8n-mover-cv.webp",
    challenge:
      "Navegación precisa de estructura de carpetas anidadas. Solución: filtros secuenciales con IF nodes para quedarse solo con CV y luego solo con DEFINITIVA, evitando errores cuando faltan subcarpetas.",
  },
  {
    id: "08",
    title: "Generación automática de email corporativo",
    description:
      "Sistema que crea automáticamente cuentas de Google Workspace para clientes. Genera alias normalizados, selecciona dominios disponibles, crea usuarios con passwords aleatorios y actualiza el CRM. Soporta reutilización de emails para parejas.",
    whatItDoes: [
      "Recibe nombreContacto, mailCorporativo e idCliente",
      "Consulta si es pareja con email existente",
      "Si es pareja: reutiliza el email operativo de la pareja",
      "Si no: genera alias normalizado (nombreapellido sin acentos)",
      "Genera password aleatorio de 12 caracteres",
      "Consulta API de dominios activos y selecciona uno con espacio disponible",
      "Crea usuario en Google Workspace Admin API",
      "Actualiza Twenty CRM con email operativo y password",
    ],
    stack: ["n8n", "Google Workspace API", "Twenty CRM", "HTTP Requests", "JavaScript"],
    image: "/screenshots/n8n-generar-email.webp",
    challenge:
      "Gestión de dominios con capacidad limitada y normalización de nombres. Solución: consulta de API de dominios con filtro de usuarios actuales vs máximo, y función de normalización que elimina acentos y caracteres especiales para generar alias válidos.",
  },
  {
    id: "09",
    title: "Subida de documentos de leads desde formulario",
    description:
      "Webhook que recibe archivos binarios (CV y carta) desde el formulario público de evaluación, crea carpeta personalizada en Drive, sube los documentos y actualiza el CRM con el enlace. Incluye validación de seguridad con webhook secret.",
    whatItDoes: [
      "Webhook recibe personId, nombre y archivos binarios (cv, carta)",
      "Valida x-webhook-secret en headers",
      "Genera nombre de carpeta: shortId.nombre (ej: a478c18d.Luis)",
      "Crea carpeta en Drive dentro de carpeta de leads",
      "Sube CV si existe en el payload",
      "Sube carta si existe en el payload",
      "Actualiza Twenty CRM con link a la carpeta de Drive",
      "Responde con URL de la carpeta creada",
    ],
    stack: ["n8n", "Google Drive API", "Twenty CRM", "Webhooks", "JavaScript"],
    image: "/screenshots/n8n-subir-leads.webp",
    challenge:
      "Manejo de archivos binarios en webhooks multipart. Solución: uso de binary data fields en n8n, validación condicional de existencia de archivos, y sanitización de nombres de carpeta eliminando caracteres inválidos.",
  },
  {
    id: "10",
    title: "Subida de carta de presentación desde portal",
    description:
      "Endpoint del portal que permite a clientes subir su carta de presentación. Busca archivos existentes con prefijo 'carta_', los elimina si existen, convierte el base64 recibido a binario y sube el nuevo archivo a Drive.",
    whatItDoes: [
      "Webhook recibe base64, fileName y folderId desde el portal",
      "Busca archivos existentes que empiecen con 'carta_'",
      "Si existe archivo previo, lo elimina (mover a papelera)",
      "Convierte base64 a binario usando Buffer.from",
      "Prepara binary data con prepareBinaryData de n8n",
      "Sube el nuevo archivo a la carpeta especificada",
      "Responde con fileId y fileName del archivo subido",
    ],
    stack: ["n8n", "Google Drive API", "Webhooks", "JavaScript"],
    image: "/screenshots/n8n-subir-carta.webp",
    challenge:
      "Conversión de base64 a binario en n8n y reemplazo de archivos. Solución: uso de Buffer.from para decodificar base64, prepareBinaryData helper de n8n, y búsqueda con query de Drive API filtrando por nombre.",
  },
  {
    id: "11",
    title: "Subida de CV desde portal",
    description:
      "Endpoint del portal que permite a clientes subir su CV. Similar al workflow 10 pero sin filtro de prefijo. Busca cualquier PDF existente en la carpeta, lo elimina y sube el nuevo archivo recibido en base64.",
    whatItDoes: [
      "Webhook recibe base64, fileName y folderId desde el portal",
      "Busca archivos PDF existentes en la carpeta",
      "Si existe PDF previo, lo elimina (mover a papelera)",
      "Convierte base64 a binario usando Buffer.from",
      "Prepara binary data con prepareBinaryData de n8n",
      "Sube el nuevo archivo a la carpeta especificada",
      "Responde con fileId y fileName del archivo subido",
    ],
    stack: ["n8n", "Google Drive API", "Webhooks", "JavaScript"],
    image: "/screenshots/n8n-subir-cv.webp",
    challenge:
      "Gestión de reemplazo de archivos y conversión de base64. Solución: query de Drive API con mimeType filter para PDFs, eliminación condicional, y conversión robusta de base64 a binario con manejo de errores.",
  },
];

const OPERATING_LAYERS = [
  {
    title: "Entradas",
    text: "Webhooks, schedules, formularios, CRM, Gmail, Drive y eventos manuales desde herramientas internas.",
  },
  {
    title: "Orquestación",
    text: "n8n decide qué API llamar, qué datos transformar, qué errores tolerar y qué estado devolver al sistema principal.",
  },
  {
    title: "Sistemas de verdad",
    text: "Twenty CRM, Google Drive, Google Workspace, Sheets, Finance API y backend interno conservan el estado final.",
  },
  {
    title: "Salida operativa",
    text: "Notificaciones, carpetas, cuentas, emails, documentos actualizados, clasificaciones IA y webhooks de confirmación.",
  },
];

const BEFORE_AFTER = [
  {
    before: "Cada tarea dependía de abrir una herramienta distinta y repetir pasos manuales con datos de cliente.",
    after:
      "Los flujos convierten eventos de negocio en acciones coordinadas entre CRM, Drive, Gmail, Workspace y backend.",
  },
  {
    before: "Los workflows eran útiles como piezas sueltas, pero difíciles de explicar como arquitectura.",
    after:
      "La capa n8n queda presentada como un bus operativo: recibe señales, ejecuta reglas y devuelve estados trazables.",
  },
  {
    before: "Los errores se descubrían tarde: carpeta duplicada, CV sin mover, cuenta no creada o respuesta sin clasificar.",
    after:
      "Cada proceso notifica éxito, fallo o estado pendiente para que la operación se recupere desde una pantalla interna.",
  },
];

const RISK_CONTROLS = [
  {
    risk: "Procesar dos veces el mismo archivo o contacto",
    control:
      "Búsquedas previas, deduplicación por IDs, queries de Drive y estados enviados de vuelta al backend.",
  },
  {
    risk: "Crear estructuras incompletas en Drive",
    control:
      "Creación condicional de carpeta principal, CV, OLD, NEW y DEFINITIVA con rutas recuperables si algo ya existe.",
  },
  {
    risk: "Romper la operación por una API externa lenta o parcial",
    control:
      "Webhooks separados, manejo de errores por nodo, fallbacks y notificaciones para intervención manual.",
  },
  {
    risk: "Enviar o clasificar información sin contexto suficiente",
    control:
      "Limpieza de cuerpos de email, prompts con salida JSON, filtros de etiquetas y payloads normalizados.",
  },
];

const LEARNINGS = [
  "n8n funciona mejor cuando no sustituye al backend, sino cuando orquesta trabajos externos con límites claros.",
  "Un workflow visual también necesita arquitectura: contratos de entrada, estados de salida y reglas de error.",
  "La automatización operativa debe ser observable; si nadie puede saber qué pasó, no es una mejora real.",
  "Separar flujos pequeños por responsabilidad hace que el sistema sea más fácil de recuperar que un workflow gigante.",
];

const FLOW_STEPS = ["Evento", "Validación", "Transformación", "API externa", "Estado", "Notificación"];

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

export default function N8nWorkflowsPage() {
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

      <article className="max-w-[1100px] mx-auto px-6 pt-16 pb-32">
        <header className="mb-20">
          <div className="flex items-center gap-3 mb-8 flex-wrap">
            <span className="text-xs text-text-muted font-mono">2024 — presente</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8">
            Capa de automatización operativa con n8n
          </h1>
          <p className="text-xl md:text-2xl text-text-secondary leading-relaxed mb-6">
            No es una galería de workflows sueltos. Es una capa operativa que conecta eventos de negocio con acciones reales: documentos en Drive, CRM, emails, respuestas con IA, alertas, cuentas de Google Workspace y webhooks de confirmación para que la operación avance sin depender de tareas repetidas a mano.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { value: "11", label: "workflows productivos" },
              { value: "6", label: "familias de sistemas conectados" },
              { value: "24/7", label: "triggers, schedules y webhooks" },
              { value: "1", label: "capa de orquestación común" },
            ].map((metric) => (
              <div key={metric.label} className="card p-5">
                <p className="text-3xl md:text-4xl font-bold text-accent-light mb-1">
                  {metric.value}
                </p>
                <p className="text-sm text-text-secondary leading-snug">{metric.label}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {["n8n", "Google Workspace", "Gmail API", "Drive API", "Twenty CRM", "OpenAI", "REST APIs", "Webhooks"].map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        </header>

        <section className="mb-24">
          <SectionHeading
            eyebrow="Arquitectura"
            title="n8n como capa entre señales y sistemas"
            text="Los workflows no viven como automatizaciones aisladas. Cada uno recibe una señal, normaliza datos, ejecuta una acción externa y devuelve estado para que el resto del ecosistema sepa qué ocurrió."
          />

          <div className="card p-6 md:p-8 mb-8">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
              {FLOW_STEPS.map((step, index) => (
                <div key={step} className="relative rounded-lg border border-border bg-bg-primary/60 p-4 min-h-24">
                  <p className="text-xs font-mono text-accent/70 mb-3">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="font-semibold">{step}</p>
                  {index < FLOW_STEPS.length - 1 && (
                    <span className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-accent/60 font-mono">
                      -&gt;
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-5">
            {OPERATING_LAYERS.map((layer) => (
              <div key={layer.title} className="card p-6">
                <h3 className="text-xl font-semibold mb-3">{layer.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{layer.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <SectionHeading
            eyebrow="Mapa de flujos"
            title="Las piezas visibles de la capa operativa"
            text="Cada tarjeta abre un workflow concreto, pero el valor está en cómo se combinan: onboarding documental, comunicación, finanzas, clasificación y aprovisionamiento."
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-4">
            {WORKFLOWS.slice(0, 5).map((wf) => (
              <a
                key={wf.id}
                href={`#workflow-${wf.id}`}
                className="card p-4 hover:ring-2 hover:ring-accent/30 transition-all group"
              >
                <div className="aspect-video mb-3 overflow-hidden rounded">
                  <Image
                    src={wf.image}
                    alt={wf.title}
                    width={400}
                    height={225}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <p className="text-xs font-mono text-accent mb-1">{wf.id}</p>
                <p className="text-sm font-semibold leading-tight">{wf.title}</p>
              </a>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {WORKFLOWS.slice(5, 10).map((wf) => (
              <a
                key={wf.id}
                href={`#workflow-${wf.id}`}
                className="card p-4 hover:ring-2 hover:ring-accent/30 transition-all group"
              >
                <div className="aspect-video mb-3 overflow-hidden rounded">
                  <Image
                    src={wf.image}
                    alt={wf.title}
                    width={400}
                    height={225}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <p className="text-xs font-mono text-accent mb-1">{wf.id}</p>
                <p className="text-sm font-semibold leading-tight">{wf.title}</p>
              </a>
            ))}
            {WORKFLOWS.length > 10 && (
              <a
                href={`#workflow-${WORKFLOWS[10].id}`}
                className="card p-4 hover:ring-2 hover:ring-accent/30 transition-all group"
              >
                <div className="aspect-video mb-3 overflow-hidden rounded">
                  <Image
                    src={WORKFLOWS[10].image}
                    alt={WORKFLOWS[10].title}
                    width={400}
                    height={225}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <p className="text-xs font-mono text-accent mb-1">{WORKFLOWS[10].id}</p>
                <p className="text-sm font-semibold leading-tight">{WORKFLOWS[10].title}</p>
              </a>
            )}
          </div>
        </section>

        <section className="mb-24">
          <SectionHeading
            eyebrow="Antes / después"
            title="De automatizaciones útiles a infraestructura operativa"
            text="La mejora fue cambiar el nivel de lectura: no vender cada workflow como una receta, sino enseñar el sistema que permite operar Growork con menos fricción y menos riesgo."
          />

          <div className="space-y-4">
            {BEFORE_AFTER.map((item, index) => (
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
            eyebrow="Workflows"
            title="Flujos destacados"
            text="Los detalles importan porque muestran decisiones reales: límites, deduplicación, normalización, manejo de archivos binarios, prompts estructurados y notificaciones."
          />

          <div className="space-y-16">
            {WORKFLOWS.map((wf) => (
              <div key={wf.id} id={`workflow-${wf.id}`} className="card p-8 md:p-10 scroll-mt-24">
                <div className="flex items-start gap-4 mb-6">
                  <span className="text-4xl md:text-5xl font-bold text-accent/30 font-mono shrink-0">
                    {wf.id}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">{wf.title}</h3>
                    <p className="text-text-secondary text-lg leading-relaxed mb-6">{wf.description}</p>
                  </div>
                </div>

                <div className="mb-8 card card-lg overflow-hidden relative bg-bg-secondary aspect-video">
                  <ZoomableImage
                    src={wf.image}
                    alt={`Workflow ${wf.title}`}
                    fill
                    containerClassName="h-full"
                    imageClassName="object-contain p-4"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <p className="text-xs font-mono text-accent-light uppercase tracking-wider mb-3">
                      Qué hace
                    </p>
                    <ul className="space-y-2">
                      {wf.whatItDoes.map((item, i) => (
                        <li key={i} className="flex gap-2 items-start text-sm text-text-secondary">
                          <span className="text-accent mt-1 shrink-0">→</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-xs font-mono text-accent-light uppercase tracking-wider mb-3">
                      Stack
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {wf.stack.map((tech) => (
                        <span key={tech} className="tag text-xs">{tech}</span>
                      ))}
                    </div>

                    <p className="text-xs font-mono text-accent-light uppercase tracking-wider mb-3">
                      Reto técnico
                    </p>
                    <p className="text-sm text-text-secondary leading-relaxed">{wf.challenge}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <SectionHeading
            eyebrow="Riesgos"
            title="Qué podía fallar en una capa de automatización"
            text="Automatizar procesos internos no reduce riesgo por sí solo. Lo reduce cuando cada flujo tiene idempotencia, validación, trazabilidad y una salida clara para humanos."
          />

          <div className="grid md:grid-cols-2 gap-5">
            {RISK_CONTROLS.map((item) => (
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
            eyebrow="Aprendizaje"
            title="Lo que demuestra esta capa n8n"
            text="El valor no está en saber arrastrar nodos, sino en modelar una operación con contratos simples entre herramientas que no fueron diseñadas para trabajar juntas."
          />

          <div className="grid md:grid-cols-2 gap-4">
            {LEARNINGS.map((item) => (
              <div key={item} className="card p-5 flex gap-3 items-start">
                <span className="text-accent font-mono text-xs mt-1">-&gt;</span>
                <p className="text-sm text-text-secondary leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="prose-custom mb-24">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">Por qué n8n</h2>
          <p className="text-lg text-text-secondary leading-relaxed mb-6">
            n8n permite construir automatizaciones complejas sin depender de equipos de desarrollo. Cada flujo es visual, versionable y fácil de mantener. La curva de aprendizaje es baja, pero el techo técnico es alto: puedes escribir JavaScript cuando lo necesitas, conectar cualquier API REST y desplegar en tu propia infraestructura.
          </p>
          <p className="text-lg text-text-secondary leading-relaxed">
            Para proyectos como Growork, n8n fue clave porque actúa como una capa de automatización operativa: suficientemente visual para iterar rápido, suficientemente técnica para hablar con APIs complejas y suficientemente explícita para que cada proceso tenga entradas, salidas y puntos de recuperación.
          </p>
        </section>

        <footer className="text-center py-16 border-t border-border">
          <p className="text-xl md:text-2xl text-text-secondary leading-relaxed max-w-2xl mx-auto mb-10">
            Estos flujos no son ejercicios teóricos. Están en producción, procesando datos reales y ahorrando horas de trabajo manual cada semana.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/#contact" className="btn btn-primary">
              Hablemos
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
