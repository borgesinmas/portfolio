import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ApiContract, CodeBlock } from "@/components/CaseStudyPrimitives";

export const metadata: Metadata = {
  title: "Portal Privado de Clientes — Growork",
  description:
    "Caso de estudio del portal privado de Growork: dashboard, candidaturas, respuestas, documentos, planes, seguridad, automatizaciones e IA contextual conectados a datos reales.",
};

const techStack = [
  "Next.js 16",
  "React 19",
  "TypeScript",
  "PostgreSQL",
  "jose (JWT)",
  "bcryptjs",
  "Stripe",
  "Twenty CRM",
  "OpenAI",
  "n8n",
  "Tailwind CSS 4",
];

const productModules = [
  {
    name: "Dashboard",
    text: "Vista ejecutiva del caso: candidaturas enviadas, respuestas, actividad reciente, ciudades objetivo, ciudades ya contactadas y días restantes del plan.",
  },
  {
    name: "Candidaturas",
    text: "Tabla filtrable de hoteles y empresas contactadas, con estados entendibles para el cliente: enviada, abierta, respondida, entrevista o descartada.",
  },
  {
    name: "Respuestas",
    text: "Bandeja privada con respuestas clasificadas, contador de no leídas, hilo de conversación, sugerencia de respuesta y envío directo en hilo.",
  },
  {
    name: "Estadísticas",
    text: "Métricas de campaña por periodo con Chart.js: tasa de respuesta, enviados, entrevistas, regiones con más tracción y tipos de respuesta.",
  },
  {
    name: "Mi plan",
    text: "Estado del servicio contratado, historial, renovación, upgrades y activación diferida cuando aparece la primera candidatura real.",
  },
  {
    name: "Perfil",
    text: "Datos personales, información profesional y subida segura de CV y carta en PDF, también preparada para cuentas de pareja.",
  },
  {
    name: "Chat IA",
    text: "Asistente contextual con datos reales del cliente, límites de uso, sanitización de prompts y alcance restringido a Growork.",
  },
];

const securityCode = `// src/lib/portal/session.ts — sesión firmada en cookie HTTP-only
import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.PORTAL_JWT_SECRET);

export async function createSession(claims: SessionClaims) {
  const token = await new SignJWT(claims)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);

  cookies().set("portal_session", token, {
    httpOnly: true,                              // no accesible desde JS
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });
}`;

const ownershipCode = `// La descarga de adjuntos valida la pertenencia antes de servir nada
const session = await getSessionFromRequest(req);
if (!session) return unauthorized();

const candidatura = await getCandidatura(id);
if (candidatura.clientId !== session.clientId) {
  // Nunca se devuelven documentos de otro cliente, aunque
  // se adivine el identificador o el nombre del fichero.
  return forbidden();
}

return proxyAttachment(candidatura, filename);`;

const portalApi = [
  {
    method: "GET",
    path: "/api/portal/me",
    description:
      "Resuelve la sesión a partir de la cookie firmada y devuelve el contexto del usuario y su pareja.",
    auth: "JWT en cookie HTTP-only",
  },
  {
    method: "GET",
    path: "/api/portal/candidaturas/[id]/attachments/[filename]",
    description:
      "Sirve un adjunto solo tras comprobar que pertenece al cliente autenticado; proxy server-side hacia la web interna.",
    auth: "JWT + comprobación de propiedad",
  },
  {
    method: "POST",
    path: "/api/portal/respuestas/send-reply",
    description:
      "Responde a un hotel manteniendo el hilo (In-Reply-To, References, threadId de Gmail).",
    auth: "JWT",
  },
  {
    method: "POST",
    path: "/api/portal/chat",
    description:
      "Chat IA con contexto acotado, sanitización de prompts y límites por hora, día y mes.",
    auth: "JWT + rate limit",
  },
];

const complexityItems = [
  {
    title: "Una operación invisible para el cliente",
    text: "Growork mueve emails, hoteles, respuestas, documentos, pagos, planes, CRM y automatizaciones. El portal convierte todo eso en una experiencia simple: el cliente entra y entiende qué está pasando.",
  },
  {
    title: "Fuentes de verdad repartidas",
    text: "PostgreSQL guarda usuarios, sesiones, servicios, pagos, rate limits y chat. Twenty CRM mantiene el perfil comercial. La web interna aporta candidaturas, respuestas, documentos y métricas. Stripe confirma las compras. El portal orquesta todo sin exponer esa complejidad.",
  },
  {
    title: "Planes que empiezan cuando tiene sentido",
    text: "Si alguien paga hoy pero la primera candidatura sale días después, el reloj del plan no debería correr desde el pago. Implementé activación diferida: el servicio se guarda al comprar, pero empieza con el primer envío real.",
  },
  {
    title: "Modo pareja de verdad",
    text: "No era duplicar un formulario. Había que soportar dos emails, dos CV, dos perfiles, vinculación en el CRM, precio de pareja, documentos separados, plan compartido y visibilidad correcta dentro del portal.",
  },
  {
    title: "Sesión preparada para datos asíncronos",
    text: "El sistema contempla escenarios imperfectos: usuarios creados por Stripe, entidades que Twenty transforma después, identificadores que cambian y cookies que deben refrescarse sin romper la sesión.",
  },
  {
    title: "Seguridad en todas las entradas",
    text: "JWT en cookies HTTP-only firmado con jose, bcrypt, bloqueo tras intentos fallidos, rate limits persistidos, tokens de un solo uso, validación real de PDF, proxy server-side con API key y comprobación de pertenencia antes de servir adjuntos.",
  },
];

const beforeAfter = [
  {
    before: "Antes: el cliente dependía de mensajes manuales para saber si su búsqueda avanzaba.",
    after:
      "Después: entra al portal y ve candidaturas, respuestas, documentos, rendimiento, plan y siguientes pasos con datos reales.",
  },
  {
    before: "Antes: la operación estaba repartida entre CRM, web interna, pagos, documentos y automatizaciones.",
    after:
      "Después: el portal actúa como una capa clara encima de esas fuentes sin exponer la complejidad técnica.",
  },
  {
    before: "Antes: muchas preguntas se repetían porque el progreso no era visible.",
    after:
      "Después: el panel reduce la incertidumbre, baja el soporte repetitivo y aumenta la confianza en el servicio.",
  },
];

const businessValue = [
  {
    title: "Cliente",
    text: "Gana visibilidad y control: entiende qué se ha hecho, qué respuesta ha llegado, cuánto plan le queda y qué documentos siguen activos.",
  },
  {
    title: "Empresa",
    text: "Gana escala operativa: menos seguimiento manual, mejor trazabilidad, menos dudas repetidas y una experiencia premium después del pago.",
  },
  {
    title: "Producto",
    text: "Gana coherencia: pagos, CRM, candidaturas, documentos e IA dejan de ser piezas aisladas y se convierten en una experiencia privada.",
  },
];

const selfTaughtSignals = [
  "Aprendizaje autodidacta aplicado a un problema real: leer documentación, probar APIs, validar hipótesis y convertir errores de integración en diseño defensivo.",
  "Capacidad para pensar en producto después del checkout: no solo vender, sino sostener la confianza durante la prestación del servicio.",
  "Criterio para equilibrar experiencia y seguridad cuando hay documentos personales, pagos, sesiones privadas e IA con contexto de usuario.",
];

const decisions = [
  {
    q: "No hacer un dashboard decorativo",
    a: "El portal no usa datos falsos para parecer activo. Cada vista se alimenta de datos operativos reales: emails enviados, respuestas, documentos, estado del plan y actividad del caso.",
  },
  {
    q: "Traducir estados técnicos a lenguaje de cliente",
    a: "La operativa interna puede tener estados complejos. En el portal se reducen a conceptos claros: enviada, abierta, respondida, entrevista o descartada.",
  },
  {
    q: "Poner límites al chat IA",
    a: "El asistente solo recibe el contexto permitido del cliente y solo puede hablar de Growork, búsqueda de empleo en Suiza, plan, candidaturas, respuestas y perfil. Tiene rate limits por hora, día y mes.",
  },
  {
    q: "Proteger los documentos como datos sensibles",
    a: "Los CV, cartas y adjuntos pasan por validación de tipo, tamaño y magic bytes. Los nombres se sanitizan y las descargas se validan server-side antes de devolver archivos.",
  },
];

const stackContext = [
  {
    name: "Next.js + React",
    why: "Portal privado con App Router, Server Components para la carga de datos y Client Components donde había interacción real.",
  },
  {
    name: "TypeScript",
    why: "Contratos claros entre APIs, modelos de UI, respuestas del backend interno y datos del CRM.",
  },
  {
    name: "PostgreSQL",
    why: "Estado propio del portal: usuarios, servicios, pagos, sesiones auxiliares, tokens, rate limits y mensajes del chat.",
  },
  {
    name: "jose + bcryptjs",
    why: "Sesión JWT firmada (HS256) en cookie HTTP-only y contraseñas hasheadas con bcrypt.",
  },
  {
    name: "Twenty CRM",
    why: "Perfil comercial, clientes, parejas, estado del plan y sincronización con la operativa de Growork.",
  },
  {
    name: "Stripe",
    why: "Pagos, renovaciones, upgrades, checkout invitado y aprovisionamiento posterior mediante webhooks.",
  },
  {
    name: "Web interna",
    why: "Fuente operativa de candidaturas enviadas, respuestas recibidas, adjuntos, documentos y métricas de rendimiento.",
  },
  {
    name: "OpenAI",
    why: "Chat privado con contexto acotado, sanitización de prompts y controles de abuso.",
  },
];

export default function PortalClientesCaseStudy() {
  return (
    <main className="project-page min-h-screen text-text-primary pt-16">
      <div className="max-w-content mx-auto px-6 pt-8">
        <Link
          href="/projects/growork"
          className="project-kicker text-sm text-accent hover:text-accent-light transition-colors font-mono inline-flex items-center gap-2 px-4 py-2 rounded-full"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Volver a Growork
        </Link>
      </div>

      <article className="max-w-[1100px] mx-auto px-6 pt-16 pb-32">
        <header className="mb-20">
          <div className="flex items-center gap-3 mb-8 flex-wrap">
            <span className="text-xs text-text-muted font-mono">2024 — presente</span>
            <span className="text-xs text-text-muted font-mono">Parte del ecosistema Growork</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8">
            Portal de clientes Growork
          </h1>

          <p className="text-xl md:text-2xl text-text-secondary leading-relaxed mb-8">
            Diseñé y construí el área privada donde cada cliente puede seguir su búsqueda de empleo en Suiza con datos reales: candidaturas enviadas, respuestas recibidas, documentos, plan contratado, rendimiento y ayuda contextual con IA.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {[
              { value: "7", label: "módulos privados conectados" },
              { value: "5", label: "sistemas sincronizados" },
              { value: "0", label: "mocks en la experiencia del cliente" },
            ].map((item) => (
              <div key={item.label} className="card p-5">
                <p className="text-3xl font-bold text-accent-light mb-1">{item.value}</p>
                <p className="text-sm text-text-secondary">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span key={tech} className="tag">
                {tech}
              </span>
            ))}
          </div>
        </header>

        <div className="mb-24">
          <Image
            src="/screenshots/PORTAL.webp"
            alt="Dashboard del portal privado de Growork"
            width={1200}
            height={675}
            className="w-full rounded-xl border border-border"
            priority
          />
        </div>

        <section className="prose-custom mb-24">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">El reto</h2>
          <p className="text-lg text-text-secondary leading-relaxed mb-6">
            Growork no vendía solo una página atractiva. Detrás había una operación real: buscar hoteles, enviar candidaturas, gestionar respuestas, actualizar documentos, activar planes, registrar pagos y mantener sincronizados CRM, base de datos, web interna y automatizaciones.
          </p>
          <p className="text-lg text-text-secondary leading-relaxed mb-6">
            El problema era que gran parte de ese trabajo quedaba invisible. Para el cliente, si no había un mensaje, parecía que no pasaba nada. Y, para el equipo, responder una y otra vez a preguntas de seguimiento no escalaba.
          </p>
          <blockquote className="pl-6 border-l-2 border-accent/40 text-text-secondary text-lg italic leading-relaxed my-10">
            El objetivo del portal fue convertir una operativa compleja en una sensación clara de avance: esto es lo que hemos enviado, esto ha respondido, esto te queda de plan y esto puedes hacer ahora.
          </blockquote>
        </section>

        <section className="prose-custom mb-24">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">Qué construí</h2>
          <p className="text-lg text-text-secondary leading-relaxed mb-8">
            Construí una capa privada bajo <code>/portal/*</code> que funciona como un producto SaaS para candidatos. No es una página de estado: es una interfaz conectada a la operativa diaria de Growork, con rutas protegidas, paywall interno, datos por cliente y flujos preparados para usuarios individuales o de pareja.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {productModules.map((module) => (
              <div key={module.name} className="card p-6">
                <h3 className="text-lg font-semibold mb-3">{module.name}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{module.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="prose-custom mb-24">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">Antes y después</h2>
          <p className="text-lg text-text-secondary leading-relaxed mb-8">
            El portal cambió la percepción del servicio: de una operación que podía sentirse invisible a una experiencia donde el cliente ve progreso, contexto y valor después de comprar.
          </p>

          <div className="space-y-4">
            {beforeAfter.map((item) => (
              <div key={item.before} className="card p-6 grid md:grid-cols-2 gap-5">
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

        <section className="prose-custom mb-24">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">Arquitectura del portal</h2>
          <p className="text-lg text-text-secondary leading-relaxed mb-8">
            El portal actúa como una capa de producto sobre varios sistemas. Cada fuente tiene una responsabilidad distinta y el frontend no habla directamente con los servicios sensibles: el servidor valida la sesión, resuelve el cliente vinculado y consulta lo necesario a través de APIs protegidas.
          </p>

          <div className="card p-6 md:p-8 overflow-hidden mb-6">
            <Image
              src="/screenshots/arquitectura-portal.webp"
              alt="Arquitectura del portal privado de clientes"
              width={1200}
              height={800}
              className="w-full h-auto rounded"
            />
          </div>
        </section>

        <section className="prose-custom mb-24">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">Lo difícil no era pintar tablas</h2>
          <p className="text-lg text-text-secondary leading-relaxed mb-8">
            La complejidad real estaba en que el portal tenía que ser fiel a lo que pasaba fuera de él. No podía inventarse progreso, no podía perder documentos, no podía mezclar clientes y no podía romperse cuando un webhook o una automatización llegaba tarde.
          </p>

          <div className="space-y-6">
            {complexityItems.map((item) => (
              <div key={item.title} className="card p-6">
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-text-secondary leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="prose-custom mb-24">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">Seguridad e IA contextual</h2>
          <p className="text-lg text-text-secondary leading-relaxed mb-8">
            La parte sensible del portal no era solo autenticar usuarios. Había que proteger documentos personales, adjuntos, pagos, sesiones y un asistente IA que conoce el contexto del cliente sin convertirse en una puerta abierta a los datos internos.
          </p>

          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <CodeBlock
              code={securityCode}
              filename="src/lib/portal/session.ts"
              language="typescript"
              caption="La sesión vive en una cookie HTTP-only firmada con jose. El token nunca queda expuesto a JavaScript del navegador."
            />
            <CodeBlock
              code={ownershipCode}
              filename="src/app/api/portal/.../attachments/[filename]/route.ts"
              language="typescript"
              caption="Cada descarga comprueba la pertenencia: el identificador del cliente del recurso debe coincidir con el de la sesión."
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: "Contexto acotado",
                text: "El chat recibe solo los datos necesarios del caso y queda restringido a Growork, búsqueda de empleo en Suiza, plan, candidaturas, respuestas y perfil.",
              },
              {
                title: "Controles de abuso",
                text: "Rate limits por hora, día y mes, sanitización de prompts, validación de pertenencia antes de servir adjuntos y APIs protegidas server-side.",
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
          <div className="mb-10">
            <p className="text-sm font-mono text-accent-light mb-3 uppercase tracking-wider">
              Contrato de API
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Endpoints protegidos del portal
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed max-w-3xl">
              De los 33 endpoints del área del portal, estos resumen cómo se resuelve la sesión, se protegen los documentos y se mantienen los hilos de conversación.
            </p>
          </div>
          <ApiContract endpoints={portalApi} />
        </section>

        <section className="prose-custom mb-24">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">Decisiones de producto e ingeniería</h2>

          <div className="grid md:grid-cols-2 gap-4">
            {decisions.map((decision) => (
              <div key={decision.q} className="card p-6">
                <p className="text-sm font-mono text-accent-light mb-3">{decision.q}</p>
                <p className="text-text-secondary leading-relaxed">{decision.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="prose-custom mb-24">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">Stack con intención</h2>
          <p className="text-lg text-text-secondary leading-relaxed mb-8">
            Cada tecnología aparece porque resolvía una parte concreta del sistema, no para engrosar una lista.
          </p>

          <div className="space-y-4">
            {stackContext.map((item) => (
              <div key={item.name} className="flex gap-4 items-start">
                <div className="w-2 h-2 rounded-full bg-accent mt-3 shrink-0" />
                <div>
                  <p className="font-semibold font-mono text-sm text-accent-light mb-1">{item.name}</p>
                  <p className="text-sm text-text-secondary leading-relaxed">{item.why}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="prose-custom mb-24">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">Impacto</h2>
          <p className="text-lg text-text-secondary leading-relaxed mb-8">
            El portal no fue una mejora cosmética. Fue una forma de aumentar la confianza del cliente, reducir el trabajo manual y dar a Growork una experiencia privada a la altura de lo que ya ocurría en operaciones.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {businessValue.map((item) => (
              <div key={item.title} className="card p-6">
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-text-secondary leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="prose-custom mb-24">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">Lo que demuestra</h2>
          <ul className="space-y-4 text-text-secondary">
            {[
              ...selfTaughtSignals,
              "Capacidad para convertir un proceso operativo real en una experiencia de producto clara.",
              "Criterio para decidir qué sistema es la fuente de verdad para cada dato.",
              "Experiencia conectando pagos, CRM, base de datos propia, backend interno, automatizaciones e IA.",
              "Seguridad aplicada desde el diseño, no como una capa al final.",
              "Pensamiento de producto: activación diferida, lenguaje entendible, modo pareja y reducción de fricción.",
              "Frontend orientado a que el cliente entienda el progreso, no a mostrar la complejidad técnica.",
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
            Este portal resume muy bien el tipo de producto que quiero seguir construyendo: interfaces claras sobre operaciones complejas, datos reales, seguridad desde el diseño e IA contextual que aporta valor sin perder el control.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/projects/growork" className="btn btn-primary">
              Ver caso Growork completo
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
