import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ZoomableImage } from "@/components/ZoomableImage";

export const metadata: Metadata = {
  title: "Growork - Caso de Estudio",
  description:
    "Caso de estudio de Growork: plataforma full-stack con web pública, pagos, CRM, portal privado, web interna, finanzas, automatizaciones, SEO, analítica e IA.",
};

const stack = [
  "Next.js 16.2.1",
  "React 19.2.4",
  "TypeScript",
  "Tailwind CSS 4",
  "PostgreSQL",
  "Stripe Checkout",
  "Twenty CRM GraphQL",
  "webinterna",
  "n8n",
  "OpenAI",
  "Cloudflare",
  "GA4",
  "Meta Pixel",
];

const quickFacts = [
  {
    label: "Tipo",
    value: "Plataforma comercial + portal privado + sistema operativo interno",
  },
  {
    label: "Rol",
    value: "Producto, arquitectura, diseño, desarrollo full-stack, integraciones, SEO y automatización",
  },
  {
    label: "Superficie",
    value: "Home, formulario, pagos, blog, portal, admin, API routes, CRM, finanzas, n8n y web interna",
  },
  {
    label: "Dato verificable",
    value: "54 API routes en la web pública, 33 de ellas dentro del área portal",
  },
];

const systemLayers = [
  {
    title: "Web pública",
    text: "Explica el servicio, capta demanda, recoge evaluaciones, vende planes y alimenta el blog SEO.",
    items: ["Landing", "Formulario", "Blog", "Planes", "Checkout"],
  },
  {
    title: "Orquestación",
    text: "Route handlers, webhooks, base de datos propia y validaciones convierten acciones de usuario en procesos de negocio.",
    items: ["API routes", "Stripe webhook", "PostgreSQL", "Rate limits", "Emails SMTP"],
  },
  {
    title: "Sistemas internos",
    text: "Cada herramienta conserva una parte de la verdad: CRM, candidaturas, respuestas, precios, documentos y automatizaciones.",
    items: ["Twenty CRM", "webinterna", "Finance API", "n8n", "Cloudflare Access"],
  },
  {
    title: "Portal privado",
    text: "El cliente ve progreso, plan, candidaturas, respuestas, estadísticas, documentos y ayuda con IA sin ver la complejidad interna.",
    items: ["Dashboard", "Candidaturas", "Respuestas", "Mi plan", "Chat IA"],
  },
];

const flows = [
  {
    number: "01",
    title: "Evaluación pública",
    subtitle: "El primer contacto no termina en un email: arranca el sistema.",
    steps: [
      "Formulario individual o pareja con datos, idiomas, disponibilidad, país y provincia.",
      "Subida de CV y carta en PDF con validación de archivo y nombres saneados.",
      "Cloudflare Turnstile y rate limit por IP antes de tocar sistemas externos.",
      "Creación o actualización de lead en Twenty CRM.",
      "Webhook a n8n para procesar documentos y email de confirmación al candidato.",
    ],
  },
  {
    number: "02",
    title: "Modo pareja",
    subtitle: "No fue un checkbox. Multiplico casi todas las decisiones.",
    steps: [
      "Dos personas, dos emails, dos CVs, datos separados y validación de emails distintos.",
      "Dos Persons enlazadas en Twenty mediante campo de pareja.",
      "Planes con precio pareja, servicios partner y visibilidad correcta en el portal.",
      "Sincronizacion posterior de Person y Cliente porque Twenty crea entidades en momentos distintos.",
      "Documentos self/partner y IDs separados para que webinterna no mezcle candidaturas.",
    ],
  },
  {
    number: "03",
    title: "Pago y aprovisionamiento",
    subtitle: "Stripe confirma el dinero, pero el webhook convierte el pago en acceso real.",
    steps: [
      "Checkout autenticado y checkout guest para comprar sin cuenta previa.",
      "Productos puntuales y planes con precios dinámicos desde Finance y fallback local.",
      "Webhook idempotente: marca payment, crea usuario, registra client_services y envia emails.",
      "Actualiza Twenty, espera con backoff a que el workflow cree Cliente y corrige client_id.",
      "En parejas, crea/refuerza vínculos de Person y Cliente y evita servicios duplicados.",
    ],
  },
  {
    number: "04",
    title: "Activación diferida",
    subtitle: "Una decisión de producto escondida dentro del backend.",
    steps: [
      "El plan se compra en Stripe, pero el reloj no empieza al pagar.",
      "client_services queda activo con activated_at y expires_at pendientes.",
      "En cada carga del portal se consulta webinterna para saber si ya hay primer envio.",
      "Cuando totalSent >= 1, se fijan fechas reales y se propagan a Twenty.",
      "El cliente no pierde dias de plan si el servicio aun no ha empezado de verdad.",
    ],
  },
  {
    number: "05",
    title: "Portal conectado",
    subtitle: "Una interfaz simple encima de varias fuentes de verdad.",
    steps: [
      "PostgreSQL guarda usuarios, pagos, servicios, tokens, chat y rate limits.",
      "Twenty aporta perfil, plan, pareja y estado comercial.",
      "webinterna aporta candidaturas, respuestas, documentos, adjuntos y métricas.",
      "El portal bloquea vistas sin plan activo y funciona para individual o pareja.",
      "El chat IA recibe contexto limitado y se protege con sanitización y límites de uso.",
    ],
  },
  {
    number: "06",
    title: "SEO, analítica y seguridad",
    subtitle: "La parte comercial tambien necesitaba infraestructura.",
    steps: [
      "Blog dinámico desde PostgreSQL, hub Trabajos en Suiza, sitemap.ts, robots.ts y llms.txt.",
      "GA4, Google Ads, Meta Pixel, eventos ecommerce y Consent Mode v2.",
      "CSP, headers, cookies HTTP-only, bcrypt, API keys y Cloudflare Access.",
      "Validación de PDF por MIME, tamaño y magic bytes.",
      "Crons de expiración y upsell protegidos por API key.",
    ],
  },
];

const hardParts = [
  {
    title: "No había una única verdad",
    text: "Stripe sabía del pago, Twenty del cliente, PostgreSQL de la sesión y los servicios, webinterna de las candidaturas, Finance de los precios y n8n de los documentos. El trabajo fue hacer que todas esas piezas parecieran un solo producto.",
  },
  {
    title: "Los sistemas no llegan a la vez",
    text: "El webhook de Stripe puede ejecutarse antes de que el workflow de Twenty cree el objeto Cliente. Por eso el sistema reintenta, deja estados recuperables y tiene autoheal en siguientes requests.",
  },
  {
    title: "La pareja cambia el modelo mental",
    text: "Un flujo individual se puede modelar linealmente. Una pareja exige vínculos, servicios compartidos, datos separados, documentos separados, precios distintos y sincronización cruzada.",
  },
  {
    title: "La operación debía ser invisible",
    text: "El usuario no necesita saber que existen CRM, workers, webhooks o IDs internos. Necesita ver si su búsqueda avanza, qué se ha enviado, quién ha respondido y qué debe hacer ahora.",
  },
];

const beforeAfter = [
  {
    before: "Antes: una web explicaba el servicio y el seguimiento dependia de mensajes manuales.",
    after:
      "Despues: el candidato puede pagar, entrar al portal y ver plan, candidaturas, respuestas, documentos y ayuda contextual.",
  },
  {
    before: "Antes: leads, pagos, documentos y candidaturas vivian en herramientas separadas.",
    after:
      "Despues: Stripe, Twenty, PostgreSQL, n8n, webinterna y Finance se sincronizan alrededor del recorrido del cliente.",
  },
  {
    before: "Antes: una duda de estado podia convertirse en conversacion repetida con el equipo.",
    after:
      "Despues: el portal traduce la operacion a informacion clara y reduce soporte sin perder trato humano.",
  },
];

const valuePoints = [
  {
    title: "Valor para el cliente",
    text: "Mas transparencia: sabe que se ha enviado, quien ha respondido, cuanto plan queda, que documentos tiene activos y que siguiente accion puede tomar.",
  },
  {
    title: "Valor para la empresa",
    text: "Menos trabajo repetitivo, mejor trazabilidad comercial, precios actualizables, pagos conectados y una base tecnica preparada para crecer sin rehacerlo todo.",
  },
  {
    title: "Valor tecnico",
    text: "Un sistema con estado propio, recuperacion ante asincronia, limites de seguridad, datos operativos reales y una IA que ayuda solo dentro del contexto permitido.",
  },
];

const decisions = [
  {
    question: "Landing o plataforma?",
    decision: "Convertir Growork en una plataforma completa.",
    why: "La web pública solo resolvía captación. En cuanto aparecieron pagos, seguimiento, CRM, documentos y candidaturas, hacía falta un sistema con estado propio.",
  },
  {
    question: "¿Dónde empieza el tiempo del plan?",
    decision: "En la primera candidatura enviada, no en el pago.",
    why: "Alinea el producto con el valor entregado. Pagar no significa que el servicio haya empezado operativamente.",
  },
  {
    question: "¿CRM como única base de datos?",
    decision: "Twenty para relación comercial, PostgreSQL para estado operativo del portal.",
    why: "El portal necesita sesiones, pagos, tokens, rate limits, chat y servicios con control propio. No todo debe vivir en el CRM.",
  },
  {
    question: "¿Compra sin cuenta?",
    decision: "Checkout guest con creación posterior de usuario y link de setup.",
    why: "Reduce fricción comercial sin romper onboarding: el pago crea acceso, pero el usuario completa datos antes de entrar al portal.",
  },
  {
    question: "¿IA abierta o controlada?",
    decision: "Chat IA con contexto limitado, sanitización y límites por hora, día y mes.",
    why: "Maneja datos personales y debe ayudar en el ámbito de Growork, no inventar ni revelar instrucciones internas.",
  },
  {
    question: "¿Precios hardcodeados?",
    decision: "Finance API como fuente dinámica con fallback local.",
    why: "Finanzas puede ajustar precios sin redesplegar, pero la web sigue funcionando si Finance no responde.",
  },
];

const evolution = [
  "Nació como una web pública para explicar servicios de empleabilidad en Suiza.",
  "Se añadió formulario de evaluación con documentos, Turnstile, Twenty CRM y n8n.",
  "Llegaron pagos con Stripe, productos puntuales, planes y upsell.",
  "Se construyo el portal privado para mostrar progreso, documentos, plan y respuestas.",
  "El flujo de parejas obligó a replantear formularios, CRM, Stripe, portal y servicios.",
  "Se conectó webinterna para candidaturas, respuestas, adjuntos y estadísticas.",
  "Finance pasó a ser fuente dinámica de precios con fallback.",
  "Se reforzó seguridad con CSP, rate limits, cookies HTTP-only, API keys y Cloudflare.",
  "El blog evolucionó a infraestructura SEO con rutas dinámicas, sitemap, robots y llms.txt.",
  "Se incorporó chat IA con contexto privado y protecciones contra abuso.",
];

const selfTaughtLearnings = [
  "Aprendi a construir por capas: primero entender el negocio, despues decidir donde vive cada dato y finalmente convertirlo en una experiencia sencilla.",
  "Me forme de manera autodidacta leyendo documentacion, probando integraciones reales y rompiendo el problema en flujos pequenos que pudiera validar.",
  "Pase de pensar en paginas a pensar en sistemas: webhooks, estados recuperables, permisos, sincronizacion, observabilidad basica y degradacion cuando una API falla.",
  "El proyecto me obligo a comunicar mejor: si una arquitectura es compleja, el portfolio tiene que explicar decisiones, no solo enumerar tecnologias.",
];

const screenshots = [
  {
    src: "/screenshots/PORTAL.png",
    alt: "Dashboard privado de Growork con plan activo, candidaturas y asistente IA",
    caption:
      "El portal demuestra que Growork no es solo una web pública: convierte pagos, CRM y operativa interna en una experiencia que el cliente puede entender.",
  },
  {
    src: "/screenshots/n8n-subir-leads.png",
    alt: "Workflow n8n de subida de documentos de leads de Growork",
    caption:
      "El formulario no termina al enviar. Los documentos viajan a n8n para crear carpetas, subir CV/carta, actualizar Twenty y cerrar el flujo sin tareas manuales repetitivas.",
  },
  {
    src: "/screenshots/finanzas.png",
    alt: "Dashboard financiero interno de Growork",
    caption:
      "Finance actúa como fuente dinámica de precios y control económico, de modo que la web puede vender con precios actualizados y conservar fallback si la API falla.",
  },
  {
    src: "/screenshots/webinterna8.png",
    alt: "Centro de envios de la web interna de Growork",
    caption:
      "webinterna es la fuente operativa de candidaturas, respuestas y trazabilidad. El portal solo muestra una capa clara encima de esa operación.",
  },
  {
    src: "/screenshots/vlog.png",
    alt: "Blog SEO de Growork sobre trabajar en Suiza",
    caption:
      "El blog se planteó como infraestructura de adquisición orgánica: contenido dinámico, clusters, structured data, sitemap y herramientas internas de gestión.",
  },
  {
    src: "/screenshots/arquitectura.png",
    alt: "Arquitectura de Growork por capas",
    caption:
      "La parte dificil fue mantener sincronizadas capas con responsabilidades distintas sin trasladar esa complejidad al usuario final.",
  },
];

const techEvidence = [
  {
    file: "src/app/api/leads/submit/route.ts",
    text: "Entrada del formulario publico: valida Turnstile, rate limit, PDF, individual/pareja, Twenty CRM, n8n y emails.",
  },
  {
    file: "src/app/api/stripe/webhook/route.ts",
    text: "Punto central de aprovisionamiento: verifica firma, idempotencia, pagos, usuarios, client_services, Twenty y correos.",
  },
  {
    file: "src/lib/portal/planActivation.ts",
    text: "Activa el plan cuando webinterna detecta el primer envio real, y entonces propaga fechas a Twenty.",
  },
  {
    file: "src/lib/twenty.ts",
    text: "Cliente GraphQL de Twenty: Persons, Clientes, parejas, plan fields, schema introspection y retries defensivos.",
  },
  {
    file: "src/app/api/portal/chat/route.ts",
    text: "Chat IA: autenticación, sanitización, contexto del cliente, rate limits y OpenAI Chat Completions.",
  },
  {
    file: "src/lib/finance-prices.ts",
    text: "Consulta precios desde Finance con credenciales server-side y fallback en catalogo local.",
  },
];

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

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="card p-5">
      <p className="text-3xl md:text-4xl font-bold text-accent-light mb-1">{value}</p>
      <p className="text-sm text-text-secondary leading-snug">{label}</p>
    </div>
  );
}

function ArchitectureMap() {
  return (
    <div className="card p-5 md:p-8 overflow-hidden">
      <div className="grid gap-4">
        {systemLayers.map((layer, index) => (
          <div key={layer.title} className="grid lg:grid-cols-[170px_1fr] gap-4 items-stretch">
            <div className="flex lg:flex-col items-center lg:items-start gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent-light font-mono">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div>
                <p className="font-semibold">{layer.title}</p>
                {index < systemLayers.length - 1 && (
                  <p className="hidden lg:block text-xs text-text-muted mt-2 font-mono">se sincroniza con</p>
                )}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-bg-primary/45 p-5">
              <p className="text-sm text-text-secondary leading-relaxed mb-4">{layer.text}</p>
              <div className="flex flex-wrap gap-2">
                {layer.items.map((item) => (
                  <span key={item} className="tag">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FlowCard({
  number,
  title,
  subtitle,
  steps,
}: {
  number: string;
  title: string;
  subtitle: string;
  steps: string[];
}) {
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
            <span className="mt-0.5 font-mono text-xs text-accent-light">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function ScreenshotFigure({
  src,
  alt,
  caption,
  priority,
}: {
  src: string;
  alt: string;
  caption: string;
  priority?: boolean;
}) {
  return (
    <figure className="group">
      <div className="overflow-hidden rounded-xl border border-border bg-bg-secondary">
        <ZoomableImage
          src={src}
          alt={alt}
          width={1600}
          height={900}
          sizes="(min-width: 900px) 520px, 100vw"
          caption={caption}
          priority={priority}
          className="w-full"
          imageClassName="w-full h-auto transition-transform duration-700 group-hover:scale-[1.015]"
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
        <header className="mb-20">
          <div className="flex items-center gap-3 mb-8 flex-wrap">
            <span className="text-xs text-text-muted font-mono">2024 - presente</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8">
            Growork
          </h1>

          <p className="text-xl md:text-2xl text-text-secondary leading-relaxed mb-7">
            Growork empezó como una web para ayudar a candidatos hispanohablantes a trabajar en Suiza, pero terminó convirtiéndose en mi proyecto más completo hasta la fecha: captación, evaluación, pagos, CRM, portal privado, web interna, finanzas, automatizaciones, SEO, analítica, seguridad e inteligencia artificial trabajando como un solo producto.
          </p>

          <p className="text-lg text-text-secondary leading-relaxed max-w-4xl mb-8">
            El reto no fue hacer una landing bonita. El reto fue conectar una web pública, Stripe, Twenty CRM, PostgreSQL, n8n, una web interna de operaciones, una web de finanzas, emails automáticos y un portal de clientes sin que el usuario tuviera que entender todo lo que ocurría por debajo.
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
            <Metric value="12+" label="sistemas e integraciones conectadas" />
            <Metric value="54" label="API routes en la web pública" />
            <Metric value="33" label="endpoints del area portal" />
            <Metric value="6" label="flujos complejos explicados" />
          </div>

          <div className="flex flex-wrap gap-2">
            {stack.map((tech) => (
              <span key={tech} className="tag">
                {tech}
              </span>
            ))}
          </div>
        </header>

        <section className="mb-24">
          <div className="overflow-hidden rounded-xl border border-border bg-bg-secondary">
            <video
              src="/screenshots/growork.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full"
            />
          </div>
          <p className="mt-3 text-xs text-text-muted leading-relaxed">
            Vista general de Growork: la capa pública del producto que conecta captación, confianza, planes, contenido y conversión.
          </p>
        </section>

        <section className="mb-24">
          <SectionHeading
            eyebrow="Resumen"
            title="Una web pública que acabó necesitando una arquitectura de producto"
            text="Growork tenía que resolver el recorrido completo: atraer candidatos, cualificarlos, cobrar servicios, organizar documentos, activar planes, enviar candidaturas, recibir respuestas y mostrar progreso en un portal privado."
          />

          <div className="grid md:grid-cols-2 gap-4">
            {quickFacts.map((fact) => (
              <div key={fact.label} className="card p-6">
                <p className="text-xs font-mono text-accent-light uppercase tracking-wider mb-3">
                  {fact.label}
                </p>
                <p className="text-text-secondary leading-relaxed">{fact.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="prose-custom mb-24">
          <SectionHeading
            eyebrow="Problema"
            title="El problema no era solo vender. Era operar despues de vender."
          />
          <p className="text-lg text-text-secondary leading-relaxed mb-6">
            Un candidato que quiere trabajar en Suiza no necesita solo una página informativa. Necesita entender si su perfil encaja, preparar CV y carta, elegir ciudades, pagar un servicio, saber qué candidaturas se han enviado, ver respuestas y mantener sus documentos actualizados.
          </p>
          <p className="text-lg text-text-secondary leading-relaxed mb-6">
            Desde fuera podía parecer una web de servicios. Por dentro había un proceso con muchas piezas: CRM, pagos, documentos, automatizaciones, email, finanzas, portal, blog, analítica y seguridad. Si una pieza fallaba o se desincronizaba, el usuario lo notaba en forma de confusión, espera o falta de confianza.
          </p>
          <blockquote className="pl-6 border-l-2 border-accent/40 text-text-secondary text-lg italic leading-relaxed my-10">
            La experiencia tenía que parecer sencilla para el candidato, aunque por dentro conectara pagos, CRM, documentos, automatizaciones, estados de plan y datos operativos.
          </blockquote>
        </section>

        <section className="prose-custom mb-24">
          <SectionHeading
            eyebrow="Solucion"
            title="Construi una plataforma, no una landing"
            text="La solucion fue separar responsabilidades, pero unir la experiencia: la web capta y vende, el CRM ordena leads y clientes, Stripe confirma pagos, PostgreSQL mantiene el estado propio, n8n automatiza documentos, webinterna ejecuta candidaturas y el portal convierte todo eso en informacion clara para el cliente."
          />

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                title: "Captacion y venta",
                text: "Home, formulario de evaluacion, planes, checkout, compra guest, blog SEO, agenda y tracking de conversion.",
              },
              {
                title: "Operaciones conectadas",
                text: "Twenty CRM, n8n, webinterna, Finance API, emails transaccionales, crons y Cloudflare Access.",
              },
              {
                title: "Experiencia privada",
                text: "Dashboard, candidaturas, respuestas, estadísticas, plan, perfil, documentos y chat IA con contexto.",
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
            eyebrow="Antes / despues"
            title="El salto fue pasar de presencia online a producto operativo"
            text="Growork gano valor cuando dejo de depender de informacion dispersa y empezo a mostrar una experiencia continua: captacion, venta, operacion y seguimiento conectados."
          />

          <div className="space-y-4">
            {beforeAfter.map((item) => (
              <div key={item.before} className="card p-6 md:p-7 grid md:grid-cols-2 gap-5">
                <div>
                  <p className="text-sm font-mono text-text-muted mb-2">Antes</p>
                  <p className="text-text-secondary leading-relaxed">{item.before}</p>
                </div>
                <div>
                  <p className="text-sm font-mono text-accent-light mb-2">Despues</p>
                  <p className="text-text-secondary leading-relaxed">{item.after}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <SectionHeading
            eyebrow="Valor"
            title="La arquitectura tenia que mejorar negocio, no solo impresionar tecnicamente"
            text="Cada pieza existe porque reduce friccion, aumenta confianza o protege una operacion que ya tenia clientes, pagos y datos sensibles."
          />

          <div className="grid md:grid-cols-3 gap-4">
            {valuePoints.map((item) => (
              <div key={item.title} className="card p-6">
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="arquitectura" className="mb-24">
          <SectionHeading
            eyebrow="Arquitectura"
            title="Cuatro capas para que muchas herramientas funcionen como una sola"
            text="El sistema se puede entender por capas. Cada una tiene una responsabilidad concreta, pero el valor aparece cuando se sincronizan sin que el cliente vea esa complejidad."
          />
          <ArchitectureMap />
        </section>

        <section className="mb-24">
          <div className="grid lg:grid-cols-[1fr_0.9fr] gap-6 items-center">
            <div>
              <SectionHeading
                eyebrow="Mapa real"
                title="La arquitectura no es decorativa"
                text="Este diagrama resume la idea central: el usuario ve una experiencia lineal, pero debajo hay una capa de orquestación y varios sistemas internos con responsabilidades distintas."
              />
              <p className="text-text-secondary leading-relaxed">
                Este fue uno de los aprendizajes más grandes del proyecto: cuando el producto crece, el trabajo deja de ser crear pantallas y pasa a ser decidir dónde vive cada dato, qué sistema manda, qué hacer si llega tarde y cómo recuperarse sin romper la experiencia.
              </p>
            </div>
            <ScreenshotFigure
              src="/screenshots/arquitectura.png"
              alt="Diagrama de arquitectura por capas de Growork"
              caption="Growork se sostiene sobre capas: web pública, orquestación, sistemas internos y portal privado."
              priority
            />
          </div>
        </section>

        <section className="mb-24">
          <SectionHeading
            eyebrow="Flujos clave"
            title="Lo dificil fue unir flujos que no nacieron para vivir juntos"
            text="Estos son los flujos que mejor explican por qué Growork fue complejo: no son features aisladas, son procesos que cruzan frontend, backend, CRM, pagos, automatizaciones, datos y decisiones de producto."
          />

          <div className="grid lg:grid-cols-2 gap-5">
            {flows.map((flow) => (
              <FlowCard key={flow.title} {...flow} />
            ))}
          </div>
        </section>

        <section className="mb-24">
          <SectionHeading
            eyebrow="Nada fue facil"
            title="La dificultad estaba en los estados reales"
            text="Elegir Next.js, Stripe o PostgreSQL no era lo complicado. Lo complicado era que cada integración tenía su propia forma de fallar, su propio ritmo y su propia definición de verdad."
          />

          <div className="grid md:grid-cols-2 gap-5">
            {hardParts.map((item) => (
              <div key={item.title} className="card p-6">
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-text-secondary leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <SectionHeading
            eyebrow="Evidencia visual"
            title="Las piezas que había que hacer encajar"
            text="Estas capturas ayudan a explicar que Growork no vive en una sola pantalla: hay portal, automatizaciones, finanzas, web interna, contenido SEO y arquitectura conectada."
          />

          <div className="grid md:grid-cols-2 gap-7">
            {screenshots.map((screenshot, index) => (
              <ScreenshotFigure key={screenshot.src} {...screenshot} priority={index === 0} />
            ))}
          </div>
        </section>

        <section className="mb-24">
          <SectionHeading
            eyebrow="Seguridad e IA"
            title="La IA solo era util si respetaba contexto, permisos y limites"
            text="El chat no se planteo como una caja abierta. Tenia que ayudar con Growork usando datos del cliente, pero sin exponer documentos, instrucciones internas ni informacion fuera de su alcance."
          />

          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                title: "Contexto minimo necesario",
                text: "El asistente recibe solo informacion relevante del caso: plan, candidaturas, respuestas y perfil operativo. La experiencia parece personal, pero el backend decide que contexto puede entrar.",
              },
              {
                title: "Defensas alrededor del producto",
                text: "Autenticacion, cookies HTTP-only, rate limits, sanitizacion, validacion de PDFs, API keys server-side y Cloudflare protegen formularios, portal, documentos y automatizaciones.",
              },
            ].map((item) => (
              <div key={item.title} className="card p-6">
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-text-secondary leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <SectionHeading
            eyebrow="Decisiones"
            title="Preguntas que obligaron a pensar como producto, no solo como programador"
            text="El proyecto creció porque cada nueva parte abría una decisión. Las más importantes no fueron visuales: fueron de modelo de datos, experiencia, sincronización y justicia para el cliente."
          />

          <div className="space-y-4">
            {decisions.map((item) => (
              <div key={item.question} className="card p-6 md:p-7 grid md:grid-cols-[220px_1fr_1fr] gap-5">
                <div>
                  <p className="text-sm font-mono text-accent-light">Duda</p>
                  <h3 className="text-xl font-semibold mt-2">{item.question}</h3>
                </div>
                <div>
                  <p className="text-sm font-mono text-text-muted mb-2">Decision</p>
                  <p className="text-text-secondary leading-relaxed">{item.decision}</p>
                </div>
                <div>
                  <p className="text-sm font-mono text-text-muted mb-2">Por que importaba</p>
                  <p className="text-text-secondary leading-relaxed">{item.why}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <SectionHeading
            eyebrow="Codigo"
            title="La credibilidad está en la orquestación"
            text="Estas son algunas piezas del código real que sostienen la historia. No son detalles decorativos: son los lugares donde se resuelven pagos asíncronos, parejas, CRM, plan diferido, chat IA y precios."
          />

          <div className="card p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-4">
              {techEvidence.map((item) => (
                <div key={item.file} className="rounded-lg border border-border bg-bg-primary/50 p-4">
                  <p className="font-mono text-xs text-accent-light mb-3">{item.file}</p>
                  <p className="text-sm text-text-secondary leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-24">
          <SectionHeading
            eyebrow="Evolucion"
            title="El proyecto fue cambiando cuando empezó a parecerse a una operación real"
            text="Muchas decisiones no aparecieron al principio. Surgieron cuando Growork dejó de ser una web y empezó a comportarse como un sistema operativo para gestionar candidatos."
          />

          <div className="relative">
            <div className="absolute left-4 top-2 bottom-2 w-px bg-border hidden sm:block" />
            <ol className="space-y-4">
              {evolution.map((item, index) => (
                <li key={item} className="relative sm:pl-12">
                  <span className="hidden sm:flex absolute left-0 top-1 h-8 w-8 items-center justify-center rounded-full border border-accent/30 bg-bg-card text-xs font-mono text-accent-light">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="card p-5">
                    <p className="text-text-secondary leading-relaxed">{item}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mb-24">
          <SectionHeading
            eyebrow="Stack con contexto"
            title="Cada tecnología tenía una responsabilidad concreta"
          />

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                name: "Next.js 16.2.1 + React 19.2.4",
                why: "App Router, server components, route handlers, metadata, sitemap, robots e instrumentation en el mismo proyecto.",
              },
              {
                name: "PostgreSQL",
                why: "Usuarios, pagos, servicios, blog, tokens, rate limits, chat y estado operativo independiente del CRM.",
              },
              {
                name: "Stripe",
                why: "Checkout, pagos guest/autenticados, webhook idempotente, upsell, productos puntuales y planes.",
              },
              {
                name: "Twenty CRM GraphQL",
                why: "Leads, Persons, Clientes, parejas, plan fields, sincronizacion comercial y fuente para webinterna.",
              },
              {
                name: "n8n + SMTP",
                why: "Automatizacion de documentos, carpetas, CV/carta y emails transaccionales sin meter todo en la web.",
              },
              {
                name: "OpenAI + Chart.js",
                why: "Chat privado con contexto y graficos de rendimiento para que el portal comunique progreso real.",
              },
              {
                name: "Cloudflare",
                why: "Turnstile en formularios, Access para servicios internos, headers y capa de proteccion perimetral.",
              },
              {
                name: "GA4, Ads y Meta Pixel",
                why: "Medicion de leads, checkout, compra, registro y login respetando Consent Mode v2 y CSP.",
              },
            ].map((item) => (
              <div key={item.name} className="flex gap-4 items-start rounded-lg border border-border bg-bg-primary/35 p-5">
                <div className="w-2 h-2 rounded-full bg-accent mt-3 shrink-0" />
                <div>
                  <p className="font-semibold font-mono text-sm text-accent-light mb-1">{item.name}</p>
                  <p className="text-sm text-text-secondary leading-relaxed">{item.why}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <div className="grid lg:grid-cols-[0.9fr_1fr] gap-6 items-center">
            <div className="card p-6 md:p-8">
              <p className="text-sm font-mono text-accent-light mb-4 uppercase tracking-wider">
                Sistema centralizado
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">
                Incluso el acceso a herramientas internas tuvo que ordenarse
              </h2>
              <p className="text-text-secondary leading-relaxed mb-5">
                Growork acabo teniendo CRM, finanzas, web interna, n8n, base de datos, Dokploy, password manager y project manager. Por eso cree tambien una web central: una puerta de entrada para operar el ecosistema sin depender de favoritos, enlaces sueltos o servicios expuestos.
              </p>
              <Link href="/projects/command-center" className="btn btn-outline">
                Ver Command Center
              </Link>
            </div>
            <div className="overflow-hidden rounded-xl border border-border bg-bg-secondary">
              <Image
                src="/screenshots/central.png"
                alt="Command Center de Growork con accesos a herramientas internas"
                width={1600}
                height={900}
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>

        <section className="prose-custom mb-24">
          <SectionHeading
            eyebrow="Aprendizaje autodidacta"
            title="Lo que aprendi construyendo Growork desde problemas reales"
          />

          <ul className="space-y-4 text-text-secondary">
            {[
              ...selfTaughtLearnings,
              "Una web comercial real necesita pensar en operaciones desde el principio.",
              "Los webhooks deben ser idempotentes porque Stripe puede reenviar eventos y los sistemas externos no siempre responden a tiempo.",
              "Las parejas duplican complejidad si se tratan como un caso secundario.",
              "La seguridad no puede ser una capa final cuando manejas pagos, documentos y datos personales.",
              "SEO, analítica y producto deben diseñarse juntos para medir sin romper privacidad ni rendimiento.",
              "Documentar flujos complejos es parte del desarrollo, especialmente cuando intervienen CRM, n8n, finanzas y web interna.",
              "Hay que construir para escenarios imperfectos: APIs que tardan, workflows asíncronos, usuarios guest, datos incompletos y sistemas que necesitan autoheal.",
            ].map((learning) => (
              <li key={learning} className="flex gap-3 items-start">
                <span className="text-accent font-mono text-xs mt-1 shrink-0">-&gt;</span>
                <span>{learning}</span>
              </li>
            ))}
          </ul>
        </section>

        <footer className="text-center py-16 border-t border-border">
          <p className="text-xl md:text-2xl text-text-secondary leading-relaxed max-w-3xl mx-auto mb-10">
            Growork es el proyecto que mejor resume mi perfil actual: aprendo rapido, bajo problemas ambiguos a arquitectura concreta, conecto negocio con tecnologia y construyo productos que no se quedan en la interfaz, sino que sostienen operaciones reales.
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
