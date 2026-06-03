import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ZoomableImage } from "@/components/ZoomableImage";
import {
  ApiContract,
  CodeBlock,
  DataModelTable,
} from "@/components/CaseStudyPrimitives";

export const metadata: Metadata = {
  title: "Growork — Caso de Estudio",
  description:
    "Caso de estudio de Growork: plataforma full-stack con web pública, pagos con Stripe, CRM, portal privado, web interna de operaciones, finanzas, automatizaciones, SEO e IA contextual.",
};

const stack = [
  "Next.js 16.2.1",
  "React 19.2.4",
  "TypeScript",
  "Tailwind CSS 4",
  "PostgreSQL",
  "Stripe Checkout",
  "Twenty CRM (GraphQL)",
  "Web interna (NestJS)",
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
    value:
      "Producto, arquitectura, diseño, desarrollo full-stack, integraciones, SEO y automatización",
  },
  {
    label: "Superficie",
    value:
      "Home, formulario de evaluación, pagos, blog, portal, panel admin, API routes, CRM, finanzas, n8n y web interna",
  },
  {
    label: "Dato verificable",
    value: "54 API routes en la web pública, 33 de ellas dentro del área del portal",
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
    text: "Los route handlers, los webhooks, la base de datos propia y las validaciones convierten acciones de usuario en procesos de negocio.",
    items: ["API routes", "Webhook de Stripe", "PostgreSQL", "Rate limits", "Emails SMTP"],
  },
  {
    title: "Sistemas internos",
    text: "Cada herramienta conserva una parte de la verdad: CRM, candidaturas, respuestas, precios, documentos y automatizaciones.",
    items: ["Twenty CRM", "Web interna", "Finance API", "n8n", "Cloudflare Access"],
  },
  {
    title: "Portal privado",
    text: "El cliente ve progreso, plan, candidaturas, respuestas, estadísticas, documentos y ayuda con IA sin tener que entender la complejidad interna.",
    items: ["Dashboard", "Candidaturas", "Respuestas", "Mi plan", "Chat IA"],
  },
];

const flows = [
  {
    number: "01",
    title: "Evaluación pública",
    subtitle: "El primer contacto no termina en un email: arranca el sistema.",
    steps: [
      "Formulario individual o de pareja con datos, idiomas, disponibilidad, país y provincia.",
      "Subida de CV y carta en PDF con validación de archivo y nombres saneados.",
      "Cloudflare Turnstile y rate limit por IP antes de tocar cualquier sistema externo.",
      "Creación o actualización del lead en Twenty CRM mediante GraphQL.",
      "Webhook a n8n para procesar los documentos y enviar el email de confirmación al candidato.",
    ],
  },
  {
    number: "02",
    title: "Modo pareja",
    subtitle: "No fue un checkbox: multiplicó casi todas las decisiones.",
    steps: [
      "Dos personas, dos emails, dos CV, datos separados y validación de que los correos sean distintos.",
      "Dos registros Person enlazados en Twenty mediante un campo de pareja bidireccional.",
      "Planes con precio de pareja, servicios del partner y visibilidad correcta dentro del portal.",
      "Sincronización posterior de Person y Cliente, porque Twenty crea cada entidad en momentos distintos.",
      "Documentos self/partner e identificadores separados para que la web interna no mezcle candidaturas.",
    ],
  },
  {
    number: "03",
    title: "Pago y aprovisionamiento",
    subtitle: "Stripe confirma el dinero, pero el webhook convierte el pago en acceso real.",
    steps: [
      "Checkout autenticado y checkout invitado para comprar sin cuenta previa.",
      "Servicios puntuales y planes con precios dinámicos desde Finance y fallback local.",
      "Webhook idempotente: marca el pago, crea el usuario, registra client_services y envía los emails.",
      "Actualiza Twenty y espera con backoff exponencial a que el workflow cree el Cliente para corregir el client_id.",
      "En parejas, crea o refuerza los vínculos de Person y Cliente y evita duplicar servicios.",
    ],
  },
  {
    number: "04",
    title: "Activación diferida",
    subtitle: "Una decisión de producto escondida dentro del backend.",
    steps: [
      "El plan se compra en Stripe, pero el reloj no empieza a contar al pagar.",
      "client_services queda activo con activated_at y expires_at en NULL.",
      "En cada carga del portal se consulta a la web interna si ya existe un primer envío real.",
      "Cuando totalSent ≥ 1, se fijan las fechas reales y se propagan a Twenty.",
      "El cliente no pierde días de plan si el servicio todavía no ha empezado de verdad.",
    ],
  },
  {
    number: "05",
    title: "Portal conectado",
    subtitle: "Una interfaz sencilla sobre varias fuentes de verdad.",
    steps: [
      "PostgreSQL guarda usuarios, pagos, servicios, tokens, chat y rate limits.",
      "Twenty aporta perfil, plan, pareja y estado comercial.",
      "La web interna aporta candidaturas, respuestas, documentos, adjuntos y métricas.",
      "El portal bloquea las vistas sin plan activo y funciona tanto para individual como para pareja.",
      "El chat IA recibe contexto acotado y se protege con sanitización y límites de uso.",
    ],
  },
  {
    number: "06",
    title: "SEO, analítica y seguridad",
    subtitle: "La parte comercial también necesitaba infraestructura.",
    steps: [
      "Blog dinámico desde PostgreSQL, hub «Trabajos en Suiza», sitemap.ts, robots.ts y llms.txt.",
      "GA4, Google Ads, Meta Pixel, eventos de e-commerce y Consent Mode v2.",
      "CSP estricta, cabeceras de seguridad, cookies HTTP-only, bcrypt, API keys y Cloudflare Access.",
      "Validación de PDF por MIME, tamaño y magic bytes.",
      "Cron jobs de expiración y upsell protegidos por API key.",
    ],
  },
];

const dataModel = [
  {
    name: "portal_users",
    purpose:
      "Autenticación y perfil del usuario del portal. Enlaza con el client_id de Twenty, distingue cuentas individuales y de pareja, y guarda rol y estado de onboarding.",
    fields: [
      "email",
      "password_hash",
      "client_id",
      "account_type",
      "partner_client_id",
      "role",
      "onboarding_complete",
      "is_admin",
    ],
  },
  {
    name: "payments",
    purpose:
      "Sesiones de Stripe Checkout y trazabilidad del pago. La bandera portal_user_created es la que da idempotencia al webhook.",
    fields: [
      "stripe_session_id",
      "stripe_payment_intent",
      "plan",
      "amount_cents",
      "status",
      "portal_user_created",
      "crm_client_id",
    ],
  },
  {
    name: "products",
    purpose:
      "Catálogo de planes y servicios puntuales: precio, duración, qué incluye y perks. Es la fuente de la duración que usa la activación diferida.",
    fields: ["slug", "type", "price_cents", "duration_days", "includes_cv", "perks (JSONB)", "active"],
  },
  {
    name: "client_services",
    purpose:
      "Servicio contratado por usuario. activated_at y expires_at quedan en NULL hasta el primer envío real (activación diferida); is_partner_service marca el servicio de la pareja.",
    fields: ["portal_user_id", "payment_id", "product_slug", "activated_at", "expires_at", "status", "is_partner_service"],
  },
  {
    name: "blog_posts",
    purpose:
      "Contenido del blog SEO servido desde PostgreSQL, con cuerpo, FAQ, breadcrumbs y datos estructurados guardados como JSONB.",
    fields: ["slug", "schema_type", "keywords (JSONB)", "body (JSONB)", "faq_items (JSONB)", "related_slugs (JSONB)"],
  },
  {
    name: "chat_messages",
    purpose:
      "Auditoría y rate limiting del chat IA. Los mensajes marcados como blocked se registran pero no consumen cuota del usuario.",
    fields: ["portal_user_id", "role", "content", "tokens_in", "tokens_out", "created_at"],
  },
  {
    name: "rate_limit_log · password_reset_tokens",
    purpose:
      "Soporte de seguridad: rate limiting distribuido por IP/usuario/endpoint y tokens de un solo uso (hash SHA-256) para el restablecimiento de contraseña.",
    fields: ["key", "token_hash", "used_at", "created_at"],
  },
];

const codeEvidence = [
  {
    title: "Idempotencia atómica del webhook de Stripe",
    filename: "src/app/api/stripe/webhook/route.ts",
    language: "typescript",
    code: `// Stripe puede reenviar el mismo evento varias veces.
// La idempotencia se resuelve con un UPDATE condicional:
// solo procesa el pago si aún no se ha aprovisionado.
const updated = await sql\`
  UPDATE payments
     SET status = 'paid',
         stripe_payment_intent = \${session.payment_intent ?? null},
         updated_at = NOW()
   WHERE stripe_session_id = \${session.id}
     AND portal_user_created = false
\`;

if (updated.count === 0) {
  // Ya se procesó: cortamos sin crear usuarios ni cobros duplicados.
  return NextResponse.json({ received: true });
}`,
    caption:
      "Un único UPDATE con guarda en el WHERE elimina las condiciones de carrera: si afecta a 0 filas, el evento ya se había aprovisionado.",
  },
  {
    title: "Backoff exponencial para la asincronía del CRM",
    filename: "src/app/api/stripe/webhook/route.ts",
    language: "typescript",
    code: `// El webhook puede ejecutarse antes de que el workflow de Twenty
// haya creado el Cliente a partir de la Person. Reintentamos con
// espera creciente en lugar de fallar.
const DELAYS_MS = [2000, 4000, 8000, 16000];
let clienteId: string | null = null;

for (const delay of DELAYS_MS) {
  await new Promise((r) => setTimeout(r, delay));
  clienteId = await findClienteIdByPersonId(crmClientId);
  if (clienteId) break;
}
// Si agota los intentos, degrada con aviso y se autocorrige
// en la siguiente request del portal.`,
    caption:
      "La integración con sistemas que crean entidades de forma asíncrona se resuelve con backoff y estados recuperables, no con suposiciones de orden.",
  },
  {
    title: "Activación diferida del plan al primer envío real",
    filename: "src/lib/portal/planActivation.ts",
    language: "typescript",
    code: `// Comprobación barata por índice: ¿hay servicios sin activar?
const pending = await sql\`
  SELECT id FROM client_services
   WHERE portal_user_id = \${userId}
     AND status = 'active' AND activated_at IS NULL
   LIMIT 1\`;
if (pending.length === 0) return { activated: false };

// Solo entonces consultamos a la web interna por envíos reales.
const { totalSent } = await backendFetch(
  \`/sent-emails/stats?clientId=\${clientId}\`,
).then((r) => r.json());
if (totalSent <= 0) return { activated: false };

// El reloj del plan arranca aquí, no en el pago.
await sql\`
  UPDATE client_services cs
     SET activated_at = NOW(),
         expires_at   = NOW() + (p.duration_days || ' days')::interval
    FROM products p
   WHERE cs.product_slug = p.slug
     AND cs.portal_user_id = \${userId}
     AND cs.activated_at IS NULL\`;`,
    caption:
      "La duración del plan mide el uso (candidaturas enviadas), no el tiempo de calendario desde la compra. La lógica de negocio vive en una transacción idempotente.",
  },
  {
    title: "Validación de PDF en profundidad (MIME + magic bytes)",
    filename: "src/lib/uploads/pdfMagicBytes.ts",
    language: "typescript",
    code: `// No basta con confiar en el Content-Type del navegador.
export async function isPdfByMagicBytes(file: File): Promise<boolean> {
  if (file.size < 5) return false;
  const head = new Uint8Array(await file.slice(0, 5).arrayBuffer());
  return (
    head[0] === 0x25 && // %
    head[1] === 0x50 && // P
    head[2] === 0x44 && // D
    head[3] === 0x46 && // F
    head[4] === 0x2d    // -
  );
}
// Combinado con la comprobación de MIME y de tamaño máximo,
// impide subir un .exe renombrado como .pdf en un formulario público.`,
    caption:
      "Defensa en profundidad sobre una entrada pública: tipo MIME permitido, tamaño máximo y verificación de la firma binaria real del archivo.",
  },
];

const apiHighlights = [
  {
    method: "POST",
    path: "/api/leads/submit",
    description:
      "Entrada del formulario público: valida Turnstile, aplica rate limit por IP, comprueba el PDF por magic bytes, crea o actualiza el lead en Twenty y dispara n8n.",
    auth: "Turnstile + rate limit por IP",
  },
  {
    method: "POST",
    path: "/api/stripe/webhook",
    description:
      "Punto central de aprovisionamiento: verifica la firma de Stripe, garantiza idempotencia, crea el usuario y los client_services y sincroniza Twenty.",
    auth: "Firma de Stripe (constant-time)",
  },
  {
    method: "GET",
    path: "/api/portal/dashboard",
    description:
      "Agregados del caso del cliente autenticado: candidaturas, respuestas, ciudades contactadas y días de plan restantes.",
    auth: "JWT en cookie HTTP-only",
  },
  {
    method: "POST",
    path: "/api/portal/chat",
    description:
      "Chat IA con contexto acotado del cliente, sanitización de prompts y límites por hora, día y mes registrados en chat_messages.",
    auth: "JWT + rate limit por usuario",
  },
  {
    method: "POST",
    path: "/api/portal/respuestas/send-reply",
    description:
      "Responde a un hotel manteniendo el hilo de la conversación; valida pertenencia antes de tocar la web interna.",
    auth: "JWT + comprobación de propiedad",
  },
];

const hardParts = [
  {
    title: "No había una única fuente de verdad",
    text: "Stripe conocía el pago; Twenty, el cliente; PostgreSQL, la sesión y los servicios; la web interna, las candidaturas; Finance, los precios; y n8n, los documentos. El trabajo fue conseguir que todas esas piezas se comportaran como un solo producto.",
  },
  {
    title: "Los sistemas no llegan a la vez",
    text: "El webhook de Stripe puede ejecutarse antes de que el workflow de Twenty haya creado el objeto Cliente. Por eso el sistema reintenta con backoff, deja estados recuperables y se autocorrige en las siguientes peticiones.",
  },
  {
    title: "La pareja cambia el modelo mental",
    text: "Un flujo individual se puede modelar de forma lineal. Una pareja exige vínculos, servicios compartidos, datos separados, documentos separados, precios distintos y sincronización cruzada entre Person y Cliente.",
  },
  {
    title: "La operación debía ser invisible",
    text: "El usuario no necesita saber que existen CRM, workers, webhooks o identificadores internos. Necesita ver si su búsqueda avanza, qué se ha enviado, quién ha respondido y qué debe hacer ahora.",
  },
];

const beforeAfter = [
  {
    before: "Antes: la web explicaba el servicio y el seguimiento dependía de mensajes manuales.",
    after:
      "Después: el candidato puede pagar, entrar al portal y ver plan, candidaturas, respuestas, documentos y ayuda contextual con datos reales.",
  },
  {
    before: "Antes: leads, pagos, documentos y candidaturas vivían en herramientas separadas.",
    after:
      "Después: Stripe, Twenty, PostgreSQL, n8n, la web interna y Finance se sincronizan alrededor del recorrido del cliente.",
  },
  {
    before: "Antes: una duda de estado podía convertirse en una conversación repetida con el equipo.",
    after:
      "Después: el portal traduce la operación a información clara y reduce el soporte sin perder el trato humano.",
  },
];

const valuePoints = [
  {
    title: "Valor para el cliente",
    text: "Más transparencia: sabe qué se ha enviado, quién ha respondido, cuánto plan le queda, qué documentos tiene activos y qué siguiente acción puede tomar.",
  },
  {
    title: "Valor para la empresa",
    text: "Menos trabajo repetitivo, mejor trazabilidad comercial, precios actualizables sin desplegar, pagos conectados y una base técnica preparada para crecer sin rehacerlo todo.",
  },
  {
    title: "Valor técnico",
    text: "Un sistema con estado propio, recuperación ante la asincronía, límites de seguridad, datos operativos reales y una IA que ayuda solo dentro del contexto permitido.",
  },
];

const decisions = [
  {
    question: "¿Landing o plataforma?",
    decision: "Convertir Growork en una plataforma completa.",
    why: "La web pública solo resolvía la captación. En cuanto aparecieron pagos, seguimiento, CRM, documentos y candidaturas, hizo falta un sistema con estado propio.",
  },
  {
    question: "¿Dónde empieza el tiempo del plan?",
    decision: "En la primera candidatura enviada, no en el pago.",
    why: "Alinea el producto con el valor entregado. Pagar no significa que el servicio haya empezado a operar.",
  },
  {
    question: "¿El CRM como única base de datos?",
    decision: "Twenty para la relación comercial; PostgreSQL para el estado operativo del portal.",
    why: "El portal necesita sesiones, pagos, tokens, rate limits, chat y servicios con control propio. No todo debe vivir en el CRM.",
  },
  {
    question: "¿Compra sin cuenta?",
    decision: "Checkout invitado con creación posterior de usuario y enlace de setup.",
    why: "Reduce la fricción comercial sin romper el onboarding: el pago crea el acceso, pero el usuario completa sus datos antes de entrar al portal.",
  },
  {
    question: "¿IA abierta o controlada?",
    decision: "Chat IA con contexto acotado, sanitización y límites por hora, día y mes.",
    why: "Maneja datos personales y debe ayudar dentro del ámbito de Growork, sin inventar ni revelar instrucciones internas.",
  },
  {
    question: "¿Precios hardcodeados?",
    decision: "Finance API como fuente dinámica con fallback local.",
    why: "Finanzas puede ajustar precios sin redesplegar, pero la web sigue funcionando aunque Finance no responda.",
  },
];

const evolution = [
  "Nació como una web pública para explicar servicios de empleabilidad en Suiza.",
  "Se añadió el formulario de evaluación con documentos, Turnstile, Twenty CRM y n8n.",
  "Llegaron los pagos con Stripe: servicios puntuales, planes y upsell.",
  "Se construyó el portal privado para mostrar progreso, documentos, plan y respuestas.",
  "El flujo de parejas obligó a replantear formularios, CRM, Stripe, portal y servicios.",
  "Se conectó la web interna para candidaturas, respuestas, adjuntos y estadísticas.",
  "Finance pasó a ser la fuente dinámica de precios con fallback.",
  "Se reforzó la seguridad con CSP, rate limits, cookies HTTP-only, API keys y Cloudflare.",
  "El blog evolucionó a infraestructura SEO con rutas dinámicas, sitemap, robots y llms.txt.",
  "Se incorporó el chat IA con contexto privado y protecciones contra el abuso.",
];

const selfTaughtLearnings = [
  "Aprendí a construir por capas: primero entender el negocio, después decidir dónde vive cada dato y finalmente convertirlo en una experiencia sencilla.",
  "Me formé de manera autodidacta leyendo documentación, probando integraciones reales y descomponiendo el problema en flujos pequeños que pudiera validar.",
  "Pasé de pensar en páginas a pensar en sistemas: webhooks, estados recuperables, permisos, sincronización, observabilidad básica y degradación cuando una API falla.",
  "El proyecto me obligó a comunicar mejor: si una arquitectura es compleja, el portfolio tiene que explicar decisiones, no solo enumerar tecnologías.",
];

const screenshots = [
  {
    src: "/screenshots/PORTAL.webp",
    alt: "Dashboard privado de Growork con plan activo, candidaturas y asistente IA",
    caption:
      "El portal demuestra que Growork no es solo una web pública: convierte pagos, CRM y operativa interna en una experiencia que el cliente puede entender.",
  },
  {
    src: "/screenshots/n8n-subir-leads.webp",
    alt: "Workflow de n8n para la subida de documentos de leads de Growork",
    caption:
      "El formulario no termina al enviar. Los documentos viajan a n8n para crear carpetas, subir el CV y la carta, actualizar Twenty y cerrar el flujo sin tareas manuales repetitivas.",
  },
  {
    src: "/screenshots/finanzas.webp",
    alt: "Dashboard financiero interno de Growork",
    caption:
      "Finance actúa como fuente dinámica de precios y control económico, de modo que la web vende con precios actualizados y conserva un fallback si la API falla.",
  },
  {
    src: "/screenshots/webinterna8.webp",
    alt: "Centro de envíos de la web interna de Growork",
    caption:
      "La web interna es la fuente operativa de candidaturas, respuestas y trazabilidad. El portal solo muestra una capa clara encima de esa operación.",
  },
  {
    src: "/screenshots/vlog.webp",
    alt: "Blog SEO de Growork sobre trabajar en Suiza",
    caption:
      "El blog se planteó como infraestructura de adquisición orgánica: contenido dinámico, clusters, datos estructurados, sitemap y herramientas internas de gestión.",
  },
  {
    src: "/screenshots/arquitectura.webp",
    alt: "Arquitectura de Growork por capas",
    caption:
      "La parte difícil fue mantener sincronizadas capas con responsabilidades distintas sin trasladar esa complejidad al usuario final.",
  },
];

const techEvidence = [
  {
    file: "src/app/api/leads/submit/route.ts",
    text: "Entrada del formulario público: valida Turnstile, rate limit, PDF, individual/pareja, Twenty CRM, n8n y emails.",
  },
  {
    file: "src/app/api/stripe/webhook/route.ts",
    text: "Punto central de aprovisionamiento: verifica firma, idempotencia, pagos, usuarios, client_services, Twenty y correos.",
  },
  {
    file: "src/lib/portal/planActivation.ts",
    text: "Activa el plan cuando la web interna detecta el primer envío real y, entonces, propaga las fechas a Twenty.",
  },
  {
    file: "src/lib/twenty.ts",
    text: "Cliente GraphQL de Twenty: Persons, Clientes, parejas, campos de plan, introspección de esquema y reintentos defensivos.",
  },
  {
    file: "src/app/api/portal/chat/route.ts",
    text: "Chat IA: autenticación, sanitización, contexto del cliente, rate limits y OpenAI Chat Completions.",
  },
  {
    file: "src/lib/finance-prices.ts",
    text: "Consulta los precios a Finance con credenciales server-side y fallback al catálogo local.",
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
            <span className="text-xs text-text-muted font-mono">2024 — presente</span>
            <span className="text-xs text-text-muted font-mono">Núcleo del ecosistema Growork</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8">
            Growork
          </h1>

          <p className="text-xl md:text-2xl text-text-secondary leading-relaxed mb-7">
            Growork empezó como una web para ayudar a candidatos hispanohablantes a trabajar en Suiza, pero terminó convirtiéndose en mi proyecto más completo hasta la fecha: captación, evaluación, pagos, CRM, portal privado, web interna, finanzas, automatizaciones, SEO, analítica, seguridad e inteligencia artificial funcionando como un único producto.
          </p>

          <p className="text-lg text-text-secondary leading-relaxed max-w-4xl mb-8">
            El reto no era diseñar una landing atractiva. Era conectar una web pública, Stripe, Twenty CRM, PostgreSQL, n8n, una web interna de operaciones, una web de finanzas, emails transaccionales y un portal de clientes sin que el usuario tuviera que entender nada de lo que ocurría por debajo.
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
            <Metric value="33" label="endpoints dentro del área del portal" />
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
            text="Growork tenía que resolver el recorrido completo: atraer candidatos, cualificarlos, cobrar servicios, organizar documentos, activar planes, enviar candidaturas, recibir respuestas y mostrar el progreso en un portal privado."
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
            title="El problema no era solo vender, sino operar después de vender"
          />
          <p className="text-lg text-text-secondary leading-relaxed mb-6">
            Un candidato que quiere trabajar en Suiza no necesita solo una página informativa. Necesita entender si su perfil encaja, preparar el CV y la carta, elegir ciudades, pagar un servicio, saber qué candidaturas se han enviado, ver las respuestas y mantener sus documentos actualizados.
          </p>
          <p className="text-lg text-text-secondary leading-relaxed mb-6">
            Desde fuera podía parecer una web de servicios. Por dentro había un proceso con muchas piezas: CRM, pagos, documentos, automatizaciones, email, finanzas, portal, blog, analítica y seguridad. Si una pieza fallaba o se desincronizaba, el usuario lo percibía en forma de confusión, espera o falta de confianza.
          </p>
          <blockquote className="pl-6 border-l-2 border-accent/40 text-text-secondary text-lg italic leading-relaxed my-10">
            La experiencia tenía que parecer sencilla para el candidato, aunque por dentro conectara pagos, CRM, documentos, automatizaciones, estados de plan y datos operativos.
          </blockquote>
        </section>

        <section className="prose-custom mb-24">
          <SectionHeading
            eyebrow="Solución"
            title="Construí una plataforma, no una landing"
            text="La solución fue separar responsabilidades, pero unir la experiencia: la web capta y vende, el CRM ordena leads y clientes, Stripe confirma los pagos, PostgreSQL mantiene el estado propio, n8n automatiza documentos, la web interna ejecuta candidaturas y el portal convierte todo eso en información clara para el cliente."
          />

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                title: "Captación y venta",
                text: "Home, formulario de evaluación, planes, checkout, compra invitada, blog SEO, agenda y tracking de conversión.",
              },
              {
                title: "Operaciones conectadas",
                text: "Twenty CRM, n8n, web interna, Finance API, emails transaccionales, cron jobs y Cloudflare Access.",
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
            eyebrow="Antes / después"
            title="El salto fue pasar de presencia online a producto operativo"
            text="Growork ganó valor cuando dejó de depender de información dispersa y empezó a mostrar una experiencia continua: captación, venta, operación y seguimiento conectados."
          />

          <div className="space-y-4">
            {beforeAfter.map((item) => (
              <div key={item.before} className="card p-6 md:p-7 grid md:grid-cols-2 gap-5">
                <div>
                  <p className="text-sm font-mono text-text-muted mb-2">Antes</p>
                  <p className="text-text-secondary leading-relaxed">{item.before}</p>
                </div>
                <div>
                  <p className="text-sm font-mono text-accent-light mb-2">Después</p>
                  <p className="text-text-secondary leading-relaxed">{item.after}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <SectionHeading
            eyebrow="Valor"
            title="La arquitectura tenía que mejorar el negocio, no solo impresionar técnicamente"
            text="Cada pieza existe porque reduce fricción, aumenta la confianza o protege una operación que ya tenía clientes, pagos y datos sensibles."
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
            text="El sistema se entiende por capas. Cada una tiene una responsabilidad concreta, pero el valor aparece cuando se sincronizan sin que el cliente perciba esa complejidad."
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
                Este fue uno de los mayores aprendizajes del proyecto: cuando el producto crece, el trabajo deja de ser crear pantallas y pasa a ser decidir dónde vive cada dato, qué sistema manda, qué hacer si llega tarde y cómo recuperarse sin romper la experiencia.
              </p>
            </div>
            <ScreenshotFigure
              src="/screenshots/arquitectura.webp"
              alt="Diagrama de arquitectura por capas de Growork"
              caption="Growork se sostiene sobre capas: web pública, orquestación, sistemas internos y portal privado."
              priority
            />
          </div>
        </section>

        <section className="mb-24">
          <SectionHeading
            eyebrow="Flujos clave"
            title="Lo difícil fue unir flujos que no nacieron para vivir juntos"
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
            eyebrow="Modelo de datos"
            title="PostgreSQL guarda el estado que el CRM no debería sostener"
            text="El portal necesita estado propio: sesiones, pagos, servicios, tokens, rate limits y chat. Estas son las tablas núcleo y la responsabilidad concreta de cada una."
          />
          <DataModelTable items={dataModel} />
        </section>

        <section className="mb-24">
          <SectionHeading
            eyebrow="Evidencia técnica"
            title="Las decisiones difíciles viven en el backend"
            text="No son detalles decorativos: son los puntos donde se resuelven los pagos asíncronos, la activación diferida del plan y la validación de archivos en una entrada pública. Fragmentos reales, sanitizados."
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
            eyebrow="Nada fue fácil"
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
            title="La IA solo era útil si respetaba contexto, permisos y límites"
            text="El chat no se planteó como una caja abierta. Tenía que ayudar con Growork usando datos del cliente, pero sin exponer documentos, instrucciones internas ni información fuera de su alcance."
          />

          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                title: "Contexto mínimo necesario",
                text: "El asistente recibe solo la información relevante del caso: plan, candidaturas, respuestas y perfil operativo. La experiencia parece personal, pero el backend decide qué contexto puede entrar.",
              },
              {
                title: "Defensas alrededor del producto",
                text: "Autenticación, cookies HTTP-only, rate limits, sanitización, validación de PDF, API keys server-side y Cloudflare protegen formularios, portal, documentos y automatizaciones.",
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
            text="El proyecto creció porque cada parte nueva abría una decisión. Las más importantes no fueron visuales: fueron de modelo de datos, experiencia, sincronización y equidad con el cliente."
          />

          <div className="space-y-4">
            {decisions.map((item) => (
              <div key={item.question} className="card p-6 md:p-7 grid md:grid-cols-[220px_1fr_1fr] gap-5">
                <div>
                  <p className="text-sm font-mono text-accent-light">Duda</p>
                  <h3 className="text-xl font-semibold mt-2">{item.question}</h3>
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

        <section className="mb-24">
          <SectionHeading
            eyebrow="Contrato de API"
            title="Endpoints donde se resuelve la operación"
            text="De las 54 rutas, estas son las que mejor explican cómo el frontend habla con el backend sin tocar nunca, de forma directa, los servicios sensibles."
          />
          <ApiContract endpoints={apiHighlights} />
        </section>

        <section className="mb-24">
          <SectionHeading
            eyebrow="Mapa de código"
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
            eyebrow="Evolución"
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
                why: "App Router, server components, route handlers, metadata, sitemap, robots e instrumentación en el mismo proyecto.",
              },
              {
                name: "PostgreSQL",
                why: "Usuarios, pagos, servicios, blog, tokens, rate limits, chat y estado operativo independiente del CRM.",
              },
              {
                name: "Stripe",
                why: "Checkout, pagos invitados y autenticados, webhook idempotente, upsell, servicios puntuales y planes.",
              },
              {
                name: "Twenty CRM (GraphQL)",
                why: "Leads, Persons, Clientes, parejas, campos de plan, sincronización comercial y fuente para la web interna.",
              },
              {
                name: "n8n + SMTP",
                why: "Automatización de documentos, carpetas, CV/carta y emails transaccionales sin meter todo en la web.",
              },
              {
                name: "OpenAI + Chart.js",
                why: "Chat privado con contexto y gráficos de rendimiento para que el portal comunique progreso real.",
              },
              {
                name: "Cloudflare",
                why: "Turnstile en formularios, Access para servicios internos, cabeceras y capa de protección perimetral.",
              },
              {
                name: "GA4, Ads y Meta Pixel",
                why: "Medición de leads, checkout, compra, registro y login respetando Consent Mode v2 y la CSP.",
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
                Ecosistema conectado
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">
                Incluso el acceso a las herramientas internas tuvo que ordenarse
              </h2>
              <p className="text-text-secondary leading-relaxed mb-5">
                Growork acabó teniendo CRM, finanzas, web interna, n8n, base de datos, Dokploy, gestor de contraseñas y gestor de proyectos. Por eso creé también una web central: una puerta de entrada para operar el ecosistema sin depender de favoritos, enlaces sueltos ni servicios expuestos.
              </p>
              <Link href="/projects/command-center" className="btn btn-outline">
                Ver Command Center
              </Link>
            </div>
            <div className="overflow-hidden rounded-xl border border-border bg-bg-secondary">
              <Image
                src="/screenshots/central.webp"
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
            title="Lo que aprendí construyendo Growork desde problemas reales"
          />

          <ul className="space-y-4 text-text-secondary">
            {[
              ...selfTaughtLearnings,
              "Una web comercial real necesita pensar en operaciones desde el principio.",
              "Los webhooks deben ser idempotentes, porque Stripe puede reenviar eventos y los sistemas externos no siempre responden a tiempo.",
              "Las parejas duplican la complejidad si se tratan como un caso secundario.",
              "La seguridad no puede ser una capa final cuando manejas pagos, documentos y datos personales.",
              "SEO, analítica y producto deben diseñarse juntos para medir sin romper la privacidad ni el rendimiento.",
              "Documentar flujos complejos es parte del desarrollo, especialmente cuando intervienen CRM, n8n, finanzas y web interna.",
              "Hay que construir para escenarios imperfectos: APIs que tardan, workflows asíncronos, usuarios invitados, datos incompletos y sistemas que necesitan autocorregirse.",
            ].map((learning) => (
              <li key={learning} className="flex gap-3 items-start">
                <span className="text-accent font-mono text-xs mt-1 shrink-0">&rarr;</span>
                <span>{learning}</span>
              </li>
            ))}
          </ul>
        </section>

        <footer className="text-center py-16 border-t border-border">
          <p className="text-xl md:text-2xl text-text-secondary leading-relaxed max-w-3xl mx-auto mb-10">
            Growork es el proyecto que mejor resume mi perfil actual: aprendo rápido, bajo problemas ambiguos a una arquitectura concreta, conecto negocio con tecnología y construyo productos que no se quedan en la interfaz, sino que sostienen operaciones reales.
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
