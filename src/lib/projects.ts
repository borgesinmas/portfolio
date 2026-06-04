export interface ProjectFeature {
  title: string;
  description: string;
  icon?: string;
}

export interface ProjectEvidence {
  title: string;
  description: string;
  image: string;
  alt: string;
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  shortLabel: string;
  problem: string;
  solution: string;
  description: string;
  longDescription?: string;
  results: { value: string; label: string }[];
  stack: string[];
  images: string[];
  heroImage: string;
  video?: string;
  websiteUrl?: string;
  features?: ProjectFeature[];
  featuresIntro?: string;
  tools?: ProjectFeature[];
  toolsIntro?: string;
  process?: ProjectFeature[];
  processIntro?: string;
  challenges?: ProjectFeature[];
  challengesIntro?: string;
  evidence?: ProjectEvidence[];
  evidenceIntro?: string;
  evidenceEyebrow?: string;
  evidenceTitle?: string;
  architecture?: string[];
  architectureIntro?: string;
  dataModel?: { name: string; purpose: string; fields?: string[] }[];
  dataModelIntro?: string;
  dataModelTitle?: string;
  apiContract?: { method: string; path: string; description: string; auth?: string }[];
  apiContractIntro?: string;
  apiContractTitle?: string;
  codeEvidence?: {
    title?: string;
    filename?: string;
    language?: string;
    code: string;
    caption?: string;
  }[];
  codeEvidenceIntro?: string;
  codeEvidenceTitle?: string;
  mobileShowcase?: {
    eyebrow?: string;
    title: string;
    text: string;
    image: string;
    alt: string;
    link?: string;
    bullets?: string[];
  };
  ctaTitle?: string;
  ctaDescription?: string;
}

export const PROJECTS: Project[] = [
  {
    slug: "growork",
    title: "Plataforma de Empleabilidad con Pagos, CRM, Portal Privado e IA",
    category: "Plataforma Full-Stack",
    shortLabel: "Growork",
    problem:
      "Los candidatos hispanohablantes quieren trabajar en Suiza, pero el proceso es confuso: necesitan un CV adaptado, una carta, una estrategia, seguimiento y acompañamiento. El negocio tenía que captar leads, cobrar servicios y mostrar progreso. Una landing normal no bastaba, porque detrás había operaciones reales.",
    solution:
      "Plataforma completa que combina web pública, captación, evaluación, pagos con Stripe, CRM con Twenty, portal privado, automatizaciones con n8n, blog SEO y analítica. La experiencia parece sencilla para el usuario, aunque por dentro conecte pagos, CRM, documentos, automatizaciones y datos operativos.",
    description:
      "Plataforma full-stack para ayudar a candidatos hispanohablantes a trabajar en Suiza. Combina web pública, pagos, CRM, portal privado, automatizaciones, SEO y analítica en un único producto.",
    longDescription:
      "Growork empezó como una web pública para vender servicios de empleabilidad en Suiza, pero acabó convirtiéndose en una plataforma completa: captación, evaluación, pagos, CRM, portal privado, automatizaciones, SEO, analítica y operaciones conectadas. Es el núcleo de un ecosistema de herramientas internas.",
    results: [
      { value: "4", label: "Productos: web pública, scraper, Email OS y portal" },
      { value: "54", label: "API routes en la web pública" },
      { value: "13", label: "Módulos NestJS en la web interna" },
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "PostgreSQL", "Stripe", "Twenty CRM", "NestJS", "OpenAI", "n8n", "Tailwind CSS 4", "Cloudflare", "Gmail API", "Google Workspace"],
    images: ["/screenshots/PORTAL.webp", "/screenshots/pago.webp", "/screenshots/vlog.webp", "/screenshots/webinterna1.webp"],
    heroImage: "/screenshots/PORTAL.webp",
    video: "/screenshots/growork.mp4",
    websiteUrl: "https://growork.es",
    features: [
      {
        title: "Evaluación pública",
        description: "Formulario individual o de pareja con datos, idiomas, disponibilidad, subida de CV y carta en PDF, Turnstile antispam y envío a CRM + n8n.",
      },
      {
        title: "Checkout con Stripe",
        description: "Servicios puntuales y planes con precios dinámicos desde Finance, upsell, checkout autenticado e invitado, y webhook como aprovisionamiento central.",
      },
      {
        title: "Portal privado",
        description: "Dashboard, candidaturas, respuestas, estadísticas, mi plan, perfil, documentos y chat IA conectado a datos reales.",
      },
      {
        title: "CRM y automatizaciones",
        description: "Twenty CRM sincronizado para leads y clientes, n8n para documentos, emails transaccionales y cron jobs de expiración y upsell.",
      },
      {
        title: "Blog SEO programático",
        description: "Posts dinámicos desde PostgreSQL, clusters SEO, datos estructurados, sitemap dinámico, llms.txt y panel admin integrado.",
      },
      {
        title: "Seguridad multicapa",
        description: "CSP estricta, JWT en cookies HTTP-only, bcrypt, rate limits, Turnstile, validación de PDF, Cloudflare Access y robots bloqueando las zonas privadas.",
      },
    ],
    architecture: [
      "Cliente autenticado con JWT en cookie HTTP-only y acceso protegido a /portal/*",
      "PostgreSQL como capa operativa para sesión, servicios, pagos, chat y datos de negocio",
      "Twenty CRM para perfil, plan, estado comercial y sincronización de clientes",
      "Web interna para candidaturas, respuestas y métricas vía /sent-emails/stats, /sent-emails y /email-responses/client/...",
      "OpenAI para el chat IA con contexto limitado y respuestas controladas",
      "Stripe para pagos, renovaciones y upgrades",
      "n8n como motor de automatización para documentos, CV y cartas",
    ],
  },
  {
    slug: "app-rrpp",
    title: "Verificación de Publicaciones en Instagram con Visión Artificial",
    category: "Plataforma B2B Multi-App",
    shortLabel: "App RRPP",
    problem:
      "Las marcas de eventos nocturnos dependen de equipos de RRPP que deben publicar el material oficial en Instagram, pero no existía forma automática de saber si lo habían hecho de verdad. Confiar en un «sí, ya lo subí» bastaba para perder trazabilidad, dejar sin medir el cumplimiento y aceptar que la promoción quizá no estaba pasando. Tampoco había manera de distinguir a un RRPP cumplidor de uno que simplemente ignoraba la tarea.",
    solution:
      "Plataforma multi-app con verificación visual automática. Una app móvil para gestores de marca, un dashboard web operativo, un backend Supabase con RLS estricta y dos microservicios Python: uno compara cada Historia de Instagram contra el cartel oficial usando embeddings del modelo SSCD (ResNet50), y otro monitoriza cuentas con sesiones cifradas y fingerprint de dispositivo para no caer en baneos en cadena.",
    description:
      "Plataforma B2B para empresas de eventos nocturnos: app móvil React Native, dashboard web Next.js, backend Supabase con RLS y microservicios Python que verifican visualmente que cada RRPP publique el material oficial en Instagram.",
    longDescription:
      "La plataforma nació para cerrar la distancia entre lo que una marca de eventos pide a sus RRPP y lo que realmente pasa en Instagram. La app permite crear marcas, eventos, tareas y asignaciones; el sistema verifica cada Historia con visión por computador y reporta el cumplimiento en tiempo real, sin perseguir a nadie por mensajería.",
    results: [
      { value: "2", label: "Apps en producción" },
      { value: "35", label: "Políticas RLS activas" },
      { value: "AES-256", label: "Cifrado de sesiones" },
    ],
    stack: [
      "React Native",
      "Expo",
      "Expo Router",
      "TypeScript",
      "Reanimated",
      "Next.js 14",
      "Tailwind CSS",
      "React Hook Form",
      "Zod",
      "Supabase",
      "PostgreSQL",
      "Row-Level Security",
      "Supabase Storage",
      "Python",
      "FastAPI",
      "PyTorch",
      "ResNet50 (SSCD)",
      "instagrapi",
      "Docker",
      "Turborepo",
      "AES-256-GCM",
    ],
    images: [
      "/screenshots/avora-dashoard.webp",
      "/screenshots/avora-login-desktop.webp",
      "/screenshots/avora-login-mobile.webp",
      "/screenshots/avora-rrpp.webp",
      "/screenshots/avora-tareas.webp",
    ],
    heroImage: "/screenshots/avora-dashoard.webp",
    toolsIntro:
      "Elegí herramientas que me permitieran entregar dos apps, un backend robusto y servicios de IA sin pagar infraestructura cloud durante el desarrollo.",
    tools: [
      {
        title: "Expo y React Native",
        icon: "terminal",
        description:
          "Base de la app móvil. Expo Router para las rutas, Reanimated para las microinteracciones y expo-image para portadas y logos sin cachés rotas.",
      },
      {
        title: "Next.js 14",
        icon: "route",
        description:
          "Dashboard web con App Router, Server Components para los listados y Route Handlers para los endpoints de OAuth, monitor y WhatsApp.",
      },
      {
        title: "Supabase y PostgreSQL",
        icon: "cloud",
        description:
          "Backend gestionado: Auth, Postgres con RLS, Storage para logos y portadas, y Realtime para refrescar los KPIs. 21 tablas, 6 vistas y 35 políticas activas.",
      },
      {
        title: "PyTorch y ResNet50 (SSCD)",
        icon: "server",
        description:
          "Microservicio Python con FastAPI que envuelve el modelo SSCD de Facebook AI Research. Convierte cada Historia en un vector de 512 dimensiones y devuelve la similitud coseno frente al cartel oficial.",
      },
      {
        title: "instagrapi con fingerprint",
        icon: "shield",
        description:
          "Microservicio Python que monitoriza las Historias desde una cuenta dedicada. La sesión se guarda cifrada con AES-256-GCM y cada cuenta lleva su proxy y su propio dispositivo Android para evitar baneos en cadena.",
      },
      {
        title: "Docker y Turborepo",
        icon: "deploy",
        description:
          "Monorepo con pnpm + Turborepo para que web y móvil compartan tipos, queries y design tokens. Los microservicios Python viven en docker-compose con healthcheck y volúmenes persistentes.",
      },
    ],
    featuresIntro:
      "Lo que esta plataforma resuelve de verdad no es mostrar KPIs, sino cerrar el ciclo entre lo que se pide, lo que se publica y lo que se puede demostrar que se hizo.",
    features: [
      {
        title: "Verificación visual de Historias",
        description:
          "Cuando un RRPP sube una Historia, el sistema la descarga, calcula un embedding con SSCD y la compara con el cartel oficial. Si la similitud supera el umbral, la tarea pasa a completada sin que nadie tenga que aprobarla a mano.",
      },
      {
        title: "Login con doble rol",
        description:
          "Una sola app con dos entradas: Empresa para los dueños de marca y RRPP para los invitados por enlace. La sesión se mantiene en el dispositivo y la interfaz cambia según el rol detectado en el JWT.",
      },
      {
        title: "Onboarding visual multipaso",
        description:
          "El primer ingreso guía paso a paso: alta de empresa, alta de marca con logo y género musical, alta de evento con portada, fecha y dirección geocodificada. Cada paso previsualiza el resultado antes de confirmar.",
      },
      {
        title: "Dashboard con 4 KPIs en vivo",
        description:
          "Cumplimiento medio, Historias verificadas en los últimos 7 días, RRPP activos y alertas abiertas. Los números se calculan desde vistas SQL agregadas y se refrescan con pull-to-refresh sin recargar la app.",
      },
      {
        title: "RRPP con invitación reutilizable",
        description:
          "La empresa genera un enlace, lo comparte y el RRPP se da de alta cuando entra. La invitación caduca a los 30 días, no exige email previo y captura el opt-in de WhatsApp en el mismo formulario.",
      },
      {
        title: "Tareas auto-asignadas",
        description:
          "Crear una tarea dispara un trigger en PostgreSQL que genera una asignación por cada RRPP activo del evento. Asignar un RRPP nuevo a un evento existente le crea sus tareas de forma idempotente, sin duplicados.",
      },
    ],
    processIntro:
      "El proyecto fue creciendo capa a capa: primero el modelo de datos y la autenticación, después la web, luego la app móvil y, al final, los microservicios que justifican el nombre del producto.",
    process: [
      {
        title: "Definí el modelo multi-tenant",
        description:
          "Empecé por las tablas y las relaciones: empresa, marca, evento, RRPP, tarea, asignación y verificación. Decidí desde el principio que cada consulta debía pasar por RLS, sin excepciones para el backend.",
      },
      {
        title: "Monté Supabase y las políticas RLS",
        description:
          "Levanté el proyecto en Supabase Cloud, definí 21 tablas, las vistas agregadas para los KPIs y las 35 políticas RLS. Aquí apareció la primera recursión y tuve que extraer subconsultas a funciones SECURITY DEFINER.",
      },
      {
        title: "Construí el dashboard web",
        description:
          "Next.js con App Router para el panel de gestión: dashboard, marcas, eventos, RRPP, tareas y configuración. Login con email y contraseña, y OAuth de Google y Apple marcados como «próximamente» para no romper el flujo principal.",
      },
      {
        title: "Desarrollé la app móvil",
        description:
          "Expo con Expo Router para la app del gestor de marca. Login con pestaña Empresa/RRPP, onboarding de marca y evento en dos pasos, dashboard con 4 KPIs y pantalla de ajustes. Los tabs de Equipo, Eventos y Alertas son stubs por ahora.",
      },
      {
        title: "Entrené el verificador visual",
        description:
          "Levanté el microservicio SSCD con PyTorch y ResNet50, expuse /embed y probé con carteles y capturas reales. Los umbrales quedaron en 0,5 para éxito, entre 0,4 y 0,5 para warning y por debajo de 0,4 para alerta.",
      },
      {
        title: "Cerré el monitor de Instagram",
        description:
          "El microservicio instagrapi se encarga de iniciar sesión con cookies cifradas, mantener un fingerprint Android por cuenta y descargar las Historias de los candidatos para que el verificador las compare.",
      },
    ],
    challengesIntro:
      "Las decisiones importantes no fueron tecnológicas, sino operativas: qué cuenta vigila a qué cuenta, cómo demostrar el cumplimiento sin caer en baneos y cómo separar lo público de lo privado.",
    challenges: [
      {
        title: "Verificar Historias de cuentas privadas",
        description:
          "Meta no expone las Historias de cuentas privadas por la Graph API. La salida fue monitorizar desde una cuenta dedicada, cifrar la sesión y descargar el media por debajo para que el verificador pudiera trabajar.",
      },
      {
        title: "Evitar baneos en cadena",
        description:
          "Instagram penaliza rápido los patrones repetidos. Cada cuenta monitorizada lleva su propio proxy, un fingerprint Android único y una cadencia aleatoria de 40 a 120 minutos para no parecer un bot.",
      },
      {
        title: "RLS sin recursiones",
        description:
          "El primer intento de políticas caía en recursión infinita al cruzar empresa, marca y evento. Lo solucioné extrayendo cada cruce a una función SECURITY DEFINER y llamándola desde las políticas.",
      },
      {
        title: "Auto-asignación sin duplicados",
        description:
          "Una tarea nueva debía asignarse a todos los RRPP activos y un RRPP nuevo debía recibir las tareas ya creadas. Lo resolví con ON CONFLICT en el trigger para que ambas direcciones sean idempotentes.",
      },
      {
        title: "Dos apps, un solo backend",
        description:
          "Web y móvil no podían divergir en tipos ni en queries. Lo moví todo a un monorepo con paquetes compartidos: types, supabase-queries y design tokens. La web va en React 18 y la app ya corre en React 19.",
      },
      {
        title: "Costes de inferencia bajo control",
        description:
          "El modelo SSCD pesa alrededor de 110 MB y cada comparación cuesta GPU. Cacheé el embedding del cartel oficial y limité el número de candidatos por ejecución para que el coste no escale con cada RRPP.",
      },
    ],
    dataModelTitle: "Multi-tenant con RLS de extremo a extremo",
    dataModelIntro:
      "21 tablas y 6 vistas agregadas, todas detrás de RLS sobre auth.uid(). Estas son las piezas que mejor explican el modelo.",
    dataModel: [
      {
        name: "profiles · identity",
        purpose:
          "Usuarios y su rol (empresa o RRPP), con su handle de Instagram. Cada política de RLS se evalúa contra auth.uid().",
        fields: ["id (auth.uid)", "role", "instagram_handle"],
      },
      {
        name: "marcas · eventos",
        purpose:
          "La marca (con sus sectores musicales y logo) y el evento (portada, fecha y dirección geocodificada) que cuelga de ella.",
        fields: ["marcas.owner_id", "marcas.sectores", "eventos.marca_id", "eventos.fecha"],
      },
      {
        name: "event_rrpp",
        purpose:
          "Asignación de un RRPP a un evento, con invitación reutilizable y removed_at para gestionar las bajas sin borrar el histórico.",
        fields: ["event_id", "user_id", "removed_at", "invite_token"],
      },
      {
        name: "tasks · task_assignments",
        purpose:
          "Tarea con su media de referencia (cartel o vídeo) y una asignación por cada RRPP activo, generada automáticamente por trigger.",
        fields: ["reference_media_url", "reference_media_type", "UNIQUE(task_id, user_id)", "status"],
      },
      {
        name: "story_verifications",
        purpose:
          "Verificación de cada Historia contra la referencia: similitud, fuente y monitor que la capturó.",
        fields: ["similarity", "source", "monitor_id", "status"],
      },
      {
        name: "instagram_monitor_sessions",
        purpose:
          "Sesión de la cuenta que monitoriza, cifrada con AES-256-GCM, con su proxy e intervalo de sondeo aleatorio.",
        fields: ["encrypted_session", "proxy", "interval", "device_fingerprint"],
      },
    ],
    codeEvidenceTitle: "Verificación visual y RLS sin recursión",
    codeEvidenceIntro:
      "Tres piezas explican AVORA por dentro: cómo se rompe la recursión de RLS, cómo se auto-asignan las tareas sin duplicados y cómo se decide si una Historia es el cartel oficial. Fragmentos reales, sanitizados.",
    codeEvidence: [
      {
        title: "RLS sin recursión con funciones SECURITY DEFINER",
        filename: "supabase/migrations/..._fix_rls_recursion.sql",
        language: "sql",
        code: `-- Las políticas se cruzaban entre marcas, eventos y rrpp_evento,
-- y Postgres entraba en recursión infinita al evaluar el SELECT.
-- Se rompe el ciclo con funciones SECURITY DEFINER que saltan la RLS por dentro.
CREATE FUNCTION user_assigned_evento_ids()
RETURNS SETOF UUID
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT evento_id FROM rrpp_evento WHERE rrpp_id = auth.uid();
$$;

CREATE POLICY "eventos_rrpp_read" ON eventos FOR SELECT
  USING (id IN (SELECT user_assigned_evento_ids()));`,
        caption:
          "El primer diseño de RLS caía en recursión infinita al cruzar marca, evento y RRPP. La solución fue extraer cada cruce a una función SECURITY DEFINER estable y llamarla desde las políticas.",
      },
      {
        title: "Auto-asignación idempotente por trigger",
        filename: "supabase/migrations/..._autoassign.sql",
        language: "sql",
        code: `-- Crear una tarea la asigna a todos los RRPP activos del evento;
-- otro trigger asigna las tareas existentes a un RRPP nuevo.
-- ON CONFLICT hace ambas direcciones idempotentes (UNIQUE task_id, user_id).
CREATE FUNCTION assign_task_to_event_rrpps()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO task_assignments (task_id, user_id, status)
  SELECT NEW.id, er.user_id, 'pending'
  FROM event_rrpp er
  WHERE er.event_id = NEW.event_id AND er.removed_at IS NULL
  ON CONFLICT (task_id, user_id) DO NOTHING;
  RETURN NEW;
END;
$$;`,
        caption:
          "Dos triggers cubren las dos direcciones (tarea → RRPP y RRPP → tareas) y un UNIQUE(task_id, user_id) con ON CONFLICT garantiza que nunca se dupliquen asignaciones.",
      },
      {
        title: "Verificación por similitud coseno (SSCD)",
        filename: "services/sscd/app.py",
        language: "python",
        code: `# Cada imagen -> embedding de 512 dimensiones, L2-normalizado.
# La verificación es la similitud coseno (producto punto) contra el cartel.
emb = model(preprocess(img).unsqueeze(0))      # ResNet50 + GeM (SSCD)
similarity = float(np.dot(ref_emb, cand_emb))  # ambos L2-normalizados

#  >= 0.50  -> match (tarea verificada)
#  0.40-0.50 -> revisión manual
#  < 0.40   -> sin coincidencia
status = ("match" if similarity >= 0.50
          else "review" if similarity >= 0.40
          else "no_match")`,
        caption:
          "El verificador envuelve el modelo SSCD de Facebook AI Research, diseñado para detectar copias manipuladas (recompresión, recorte, stickers): justo lo que Instagram hace al subir una Historia.",
      },
    ],
    apiContractTitle: "El microservicio de verificación",
    apiContractIntro:
      "El servicio SSCD es un FastAPI aislado, protegido por un secreto de servicio, que la web consume para verificar imágenes y vídeos.",
    apiContract: [
      {
        method: "GET",
        path: "/health",
        description: "Healthcheck del microservicio para el healthcheck de docker-compose.",
      },
      {
        method: "POST",
        path: "/embed",
        description: "Recibe una imagen y devuelve su embedding de 512 dimensiones.",
        auth: "X-Service-Secret",
      },
      {
        method: "POST",
        path: "/video/embed",
        description: "Extrae fotogramas de un vídeo y devuelve un fingerprint multi-frame.",
        auth: "X-Service-Secret",
      },
      {
        method: "POST",
        path: "/video/match",
        description: "Compara un vídeo candidato contra un fingerprint de referencia y devuelve las métricas de coincidencia.",
        auth: "X-Service-Secret",
      },
    ],
    evidenceIntro:
      "Las capturas conectan la explicación con el producto real: el dashboard con KPIs, el login en sus dos formatos, la gestión de RRPP con invitación reutilizable y la pantalla de tareas con el cumplimiento por evento.",
    evidenceEyebrow: "Producto en uso",
    evidenceTitle: "Capturas reales de web y móvil",
    evidence: [
      {
        title: "Dashboard web con 4 KPIs",
        description:
          "La imagen muestra el panel principal con cumplimiento medio, Historias verificadas en 7 días, RRPP activos y alertas. Es la vista que abre la web y la que mejor resume el estado operativo de una marca de un vistazo.",
        image: "/screenshots/avora-dashoard.webp",
        alt: "Dashboard web con 4 KPIs y listado de eventos activos",
      },
      {
        title: "Login de escritorio con doble rol",
        description:
          "El login web separa Empresa y RRPP con una pestaña segmentada y refuerza la identidad con fondos de evento. La idea es que la herramienta se sienta hecha por y para gente que trabaja en este sector.",
        image: "/screenshots/avora-login-desktop.webp",
        alt: "Pantalla de login en escritorio con pestaña Empresa y RRPP",
      },
      {
        title: "Gestión de RRPP e invitaciones",
        description:
          "Aquí se ve la tabla con el cumplimiento por RRPP, el alcance y los enlaces de invitación reutilizables. La empresa controla quién está dentro, cómo va cada uno y cómo invitar a uno nuevo sin escribir un email.",
        image: "/screenshots/avora-rrpp.webp",
        alt: "Pantalla de gestión de RRPP con invitación reutilizable",
      },
      {
        title: "Tareas con vista de tarjetas y tabla",
        description:
          "La pantalla de tareas muestra el diseño oficial como referencia, el porcentaje de cumplimiento por tarea y filtros por marca, evento, fecha y tipo de contenido. La empresa ve de un vistazo lo que se ha pedido y lo que se ha entregado.",
        image: "/screenshots/avora-tareas.webp",
        alt: "Pantalla de tareas con tarjetas por evento y filtros",
      },
    ],
    mobileShowcase: {
      eyebrow: "Mobile-first",
      title: "Pensada para el móvil desde el primer día",
      text: "La versión que más se usa es la del teléfono. La app móvil está construida con React Native y Expo Router, con la sesión guardada en el dispositivo y el mismo branding que la web. El dashboard web es totalmente responsive, pero el objetivo es que el gestor de marca pueda crear eventos, asignar RRPP y revisar el cumplimiento desde el móvil, en el propio evento.",
      image: "/screenshots/avora-login-mobile.webp",
      alt: "Login de la app móvil con doble pestaña Empresa y RRPP",
      link: "/projects/app-rrpp",
      bullets: [
        "App móvil con React Native + Expo Router y sesión persistida en el dispositivo.",
        "Web responsive: el dashboard y los formularios se adaptan a cualquier pantalla.",
        "Próximo paso: publicarla como app nativa de iOS en la App Store.",
      ],
    },
    architectureIntro:
      "La arquitectura separa apps, backend gestionado y microservicios Python, con tipos y queries compartidos en el monorepo para que web y móvil nunca diverjan.",
    architecture: [
      "App móvil Expo con Expo Router, Supabase JS y AsyncStorage para la sesión offline. Comparte tipos con el dashboard y consume las mismas funciones de Supabase.",
      "Dashboard web en Next.js 14 con App Router, React Hook Form y Zod para los formularios. El middleware de Supabase SSR protege las rutas privadas antes de renderizar.",
      "Supabase como backend: Postgres con 21 tablas, 6 vistas agregadas, 35 políticas RLS, Storage para logos y portadas, y Auth con email y OAuth pendiente de aprobación.",
      "Microservicio SSCD en Python con FastAPI y PyTorch. Carga el modelo ResNet50 + GeM entrenado por Facebook AI Research, expone /embed y devuelve vectores L2-normalizados para comparar.",
      "Microservicio IG Monitor en Python con instagrapi. Mantiene una cuenta dedicada por empresa, cifra la sesión con AES-256-GCM y descarga las Historias por candidato para que SSCD las verifique.",
      "docker-compose levanta los dos microservicios con healthcheck y volúmenes para modelos y sesiones. El monorepo pnpm + Turborepo coordina web, móvil y los paquetes compartidos.",
    ],
    ctaTitle: "¿Tienes una marca con equipo de RRPP?",
    ctaDescription:
      "Esta plataforma resuelve exactamente eso: trazabilidad real, cumplimiento medible y verificación visual sin perseguir a nadie por mensajería.",
  },
  {
    slug: "email-operations-os",
    title: "Consola Operativa de Candidaturas: NestJS, n8n, Gmail API y IA",
    category: "Automatización Full-Stack",
    shortLabel: "Email Operations OS",
    problem:
      "Enviar candidaturas para muchos clientes no era solo mandar emails. Había que sincronizar el CRM, preparar los CV, crear carpetas, generar cuentas de Google Workspace, controlar la reputación, aprobar mensajes, evitar duplicados, leer respuestas y saber en todo momento dónde estaba bloqueado cada cliente.",
    solution:
      "Una web interna con backend NestJS, frontend Next.js, PostgreSQL, n8n, Twenty CRM, Google Workspace, Gmail API, Drive y OpenAI. El sistema convierte onboarding, envío, respuestas, workflows, dominios y configuración en una consola operativa trazable.",
    description:
      "Sistema interno para gestionar clientes, workflows, Google Workspace, envíos de email, respuestas, IA, Drive, dominios y configuración operativa de Growork.",
    longDescription:
      "Una consola de operaciones completa para Growork: clientes sincronizados desde el CRM, workflows n8n, cuentas corporativas, warmup, preview manual, envío por Gmail API, respuestas clasificadas con IA y monitorización diaria.",
    results: [
      { value: "8", label: "Módulos web" },
      { value: "5", label: "Workflows por cliente" },
      { value: "16", label: "Módulos backend" },
    ],
    stack: ["Next.js", "React", "TypeScript", "NestJS", "PostgreSQL", "TypeORM", "Twenty CRM", "n8n", "Google Workspace", "Gmail API", "Google Drive", "OpenAI", "Docker", "Nginx"],
    images: [
      "/screenshots/webinterna1.webp",
      "/screenshots/webinterna2.webp",
      "/screenshots/webinterna3.webp",
      "/screenshots/webinterna4.webp",
      "/screenshots/webinterna5.webp",
      "/screenshots/webinterna6.webp",
      "/screenshots/webinterna7.webp",
      "/screenshots/webinterna8.webp",
      "/screenshots/email-operations-os.svg",
    ],
    heroImage: "/screenshots/webinterna1.webp",
    features: [
      {
        title: "Panel operativo completo",
        description: "Dashboard, clientes, workflows, creadores de CV, dominios, correos corporativos, preview de emails y centro de envíos en una única web interna.",
      },
      {
        title: "Envíos por cliente",
        description: "Scheduler diario, worker cada minuto, warmup gradual, matching de ofertas, preview manual, IA, adjuntos de Drive y tracking en PostgreSQL.",
      },
      {
        title: "Google Workspace",
        description: "Creación de cuentas corporativas, gestión por dominio, borrado con periodo de gracia, sincronización con Google Admin y envío con Gmail API.",
      },
      {
        title: "Workflows n8n",
        description: "Pipeline visual con WKF-1 a WKF-1.4 para carpetas, creador de CV, detección de archivos, CV definitivo y email corporativo.",
      },
      {
        title: "Respuestas inteligentes",
        description: "Lectura de Gmail, deduplicación, clasificación con IA y respuestas en hilo usando cabeceras RFC 5322.",
      },
      {
        title: "Seguridad y control",
        description: "API key, rate limits, validación de dominios, constraints anti-duplicados, estados de cliente y fallbacks cuando falla la IA o Drive.",
      },
    ],
    architecture: [
      "Next.js actúa como consola operativa para dashboard, clientes, workflows, preview, dominios, correos corporativos y centro de envíos.",
      "NestJS concentra la lógica de negocio con módulos de clients, scheduler, worker, email, responses, n8n, workflow-state, corporate-emails, dominios, dashboard, Drive y Twenty.",
      "PostgreSQL guarda clientes, settings, workflow states, send jobs, email sends, responses, dominios, notificaciones y trazabilidad.",
      "n8n ejecuta los procesos visuales de onboarding: carpetas en Drive, creadores de CV, detección de archivos, aprobación de CV y Google Workspace.",
      "Google Workspace crea las cuentas corporativas; la Gmail API envía y responde; Google Drive conserva los CV, cartas y adjuntos definitivos.",
      "OpenAI genera emails, resume CV, crea cartas, clasifica respuestas y sugiere réplicas, con fallback si la IA falla.",
    ],
  },
  {
    slug: "n8n-workflows",
    title: "Capa de Automatización con n8n: 11 Flujos en Producción para Drive, CRM y Google Workspace",
    category: "Automatización con IA",
    shortLabel: "+10 Flujos de trabajo de n8n",
    problem:
      "Las tareas repetitivas entre herramientas (CRM, email, hojas de cálculo, APIs) consumen horas diarias y generan errores humanos. No existe una visión unificada de los procesos.",
    solution:
      "Una capa de automatización con más de 10 flujos de n8n que orquestan procesos reales de negocio: desde scraping y enriquecimiento de datos hasta envío de emails, sincronización de CRMs, creación de cuentas y clasificación de respuestas con IA.",
    description:
      "Colección de flujos de automatización construidos con n8n que orquestan múltiples servicios: extracción de datos, enriquecimiento con IA, comunicaciones, CRM e informes, con código JavaScript donde hace falta.",
    longDescription:
      "He diseñado y desplegado más de 10 flujos de n8n que automatizan procesos críticos de Growork. Desde la creación de carpetas en Drive cuando entra un cliente, hasta la asignación ponderada de creadores de CV, la generación de cuentas de Google Workspace o la clasificación de respuestas con IA. Cada flujo recibe una señal, normaliza datos, ejecuta una acción externa y devuelve estado.",
    results: [
      { value: "11", label: "Flujos productivos" },
      { value: "6", label: "Sistemas conectados" },
      { value: "24/7", label: "Triggers y webhooks" },
    ],
    stack: ["n8n", "PostgreSQL", "Google Workspace", "Gmail API", "OpenAI", "Twenty CRM", "Webhooks", "JavaScript"],
    images: ["/screenshots/n8n-home.webp"],
    heroImage: "/screenshots/n8n-home.webp",
    features: [
      {
        title: "Scraping automatizado",
        description: "Extracción programada de datos de portales web, APIs y fuentes públicas, con limpieza y normalización automáticas.",
      },
      {
        title: "Enriquecimiento con IA",
        description: "Procesamiento de leads y datos con Claude y GPT para generar resúmenes, clasificar contenido y extraer conclusiones.",
      },
      {
        title: "Automatización de email",
        description: "Envío personalizado masivo con plantillas dinámicas, barajado determinista por día y persona, y seguimiento de respuestas.",
      },
      {
        title: "Sincronización de CRM",
        description: "Sincronización entre el CRM, las hojas de cálculo y la base de datos sin conflictos ni duplicados.",
      },
      {
        title: "Webhooks y APIs",
        description: "Integración con cualquier servicio mediante webhooks, HTTP requests y autenticación, con un secreto compartido en cada webhook interno.",
      },
      {
        title: "Manejo de errores",
        description: "Sistemas de reintentos, notificaciones de fallos y logs centralizados para monitorizar cada ejecución.",
      },
    ],
    architecture: [
      "Disparador: webhooks, cron schedules y eventos manuales",
      "Procesamiento: nodos de transformación, filtrado y enriquecimiento",
      "Capa de IA: Claude API y OpenAI para el procesamiento de texto",
      "Almacenamiento: PostgreSQL para datos persistentes",
      "Salida: email, Slack, Discord, CRM y APIs de terceros",
      "Monitorización: logs internos de n8n con alertas",
    ],
  },
  {
    slug: "swiss-hotel-job-scraper",
    title: "Multi-Scraper con FastAPI, Playwright y Dashboard en Tiempo Real",
    category: "Scraping y Automatización",
    shortLabel: "Scraper de Empleo",
    problem:
      "Buscar oportunidades en hoteles suizos exigía revisar varios portales, repetir filtros por ciudad o región, abrir las ofertas una a una, localizar emails y evitar contactar dos veces con la misma empresa.",
    solution:
      "Aplicación interna con FastAPI, Playwright y PostgreSQL que centraliza cuatro scrapers, programa ejecuciones diarias, extrae emails, deduplica contactos, muestra logs en tiempo real y exporta resultados desde un dashboard propio.",
    description:
      "Sistema multi-scraper para convertir las ofertas dispersas de los portales hoteleros suizos en una base de contactos limpia, trazable y exportable.",
    longDescription:
      "Herramienta operativa para buscar empleo en el sector hotelero suizo. Integra HotelCareer, Hogapage, Gastrojob y Hoteljob en un dashboard con ejecuciones manuales y diarias, logs, historial, CSV, PostgreSQL, deduplicación por email y reintentos automáticos.",
    results: [
      { value: "4", label: "Portales monitorizados" },
      { value: "24h", label: "Scraping programado" },
      { value: "3", label: "Reintentos por fallo" },
    ],
    stack: ["Python", "FastAPI", "Playwright", "PostgreSQL", "SQLAlchemy", "APScheduler", "Docker", "Vanilla JS"],
    images: ["/screenshots/scraper.webp", "/screenshots/scrapersito.webp"],
    heroImage: "/screenshots/scraper.webp",
    features: [
      {
        title: "Scrapers por portal",
        description: "Módulos separados para HotelCareer, Hogapage, Gastrojob y Hoteljob, cada uno con sus filtros, listados, detalle y exportación.",
      },
      {
        title: "Extracción de emails",
        description: "Estrategias combinadas con mailto, regex y análisis del código fuente para encontrar contactos accionables aunque estén ofuscados.",
      },
      {
        title: "Dashboard operativo",
        description: "Interfaz para lanzar, parar, reanudar, programar, revisar el historial, descargar CSV y consultar logs sin entrar al servidor.",
      },
      {
        title: "Deduplicación por email",
        description: "PostgreSQL guarda el histórico y una vista unificada evita duplicar empresas cuando aparecen en varias fuentes.",
      },
      {
        title: "Reintentos automáticos",
        description: "Un servicio revisa cada 10 minutos las ejecuciones fallidas o pendientes y reintenta hasta tres veces, respetando las paradas manuales.",
      },
      {
        title: "Anti-ban pragmático",
        description: "Rotación de user-agents, pausas aleatorias (jitter) y ventanas horarias aleatorias cada día para reducir los bloqueos.",
      },
    ],
    architecture: [
      "FastAPI expone endpoints para extracción, estado, historial, CSV, programación, logs y base de datos.",
      "Playwright navega los portales, aplica filtros, recopila URLs y entra en cada oferta para extraer los campos útiles.",
      "PostgreSQL almacena ejecuciones, ofertas, configuraciones diarias y una vista unificada deduplicada por email.",
      "APScheduler lanza los trabajos diarios en ventanas configurables y recalcula los horarios cada día.",
      "Server-Sent Events muestran los logs en tiempo real durante las ejecuciones largas.",
      "Docker facilita el despliegue con un volumen persistente para datos, logs y exportaciones.",
    ],
  },
  {
    slug: "control-horario-onya",
    title: "Sistema de Fichaje para Hostelería: API Propia, App Móvil y 4 Idiomas",
    category: "Control horario full-stack",
    shortLabel: "Control Horario",
    problem:
      "En un hotel de Suiza el control horario seguía dependiendo de hojas en papel. Eso servía para salir del paso, pero fallaba en lo importante: descansos poco claros, turnos partidos difíciles de revisar, olvidos corregidos a mano y poca visibilidad sobre las horas reales, las extras o el déficit. El problema no era crear un formulario digital, sino convertir una rutina diaria en un sistema fiable para empleados y administración.",
    solution:
      "Diseñé un sistema completo de control horario para hostelería: un backend propio en FastAPI con SQLAlchemy, Alembic y JWT, y dos clientes que consumen la misma API: una app móvil en React Native y una SPA web. Cubre el ciclo completo —fichaje de entrada, salida y descansos, calendario, dashboard de horas, solicitudes de corrección con aprobación y panel de administración por rol— y centraliza el cálculo horario para que trabajador y administración vean siempre los mismos números.",
    description:
      "Sistema de control horario para hostelería: backend FastAPI con SQLAlchemy y Alembic, app móvil React Native y SPA web, fichajes con descansos y turnos partidos, solicitudes de corrección trazables y administración por rol.",
    longDescription:
      "Control Horario Onya nace de una necesidad real vivida trabajando en un hotel en Suiza. El objetivo fue sustituir las hojas de papel por un sistema fiable: una API propia en FastAPI que guarda cada fichaje como un intervalo, una app móvil para fichar durante el turno y una web para que administración revise registros, apruebe correcciones y exporte informes, sin perder la trazabilidad.",
    results: [
      { value: "2", label: "Frontends: móvil y web" },
      { value: "4", label: "Idiomas (ES/EN/DE/HU)" },
      { value: "2", label: "Roles: trabajador y admin" },
    ],
    stack: ["React Native", "TypeScript", "FastAPI", "SQLAlchemy", "Alembic", "PostgreSQL", "python-jose (JWT)", "Passlib (bcrypt)", "React Navigation", "AsyncStorage", "pandas"],
    images: ["/screenshots/onya-phone.webp"],
    heroImage: "/screenshots/onya-phone.webp",
    toolsIntro:
      "Elegí herramientas que me permitieran construir un backend propio sólido y consumirlo desde dos clientes (móvil y web) con una interfaz usable por perfiles no técnicos.",
    tools: [
      {
        title: "FastAPI y SQLAlchemy",
        icon: "server",
        description:
          "Backend propio que concentra la lógica de negocio, la autenticación y la persistencia. Cada fichaje se guarda como un intervalo (trabajo o descanso) con inicio y fin.",
      },
      {
        title: "Alembic",
        icon: "deploy",
        description:
          "Migraciones versionadas para evolucionar el esquema (añadir columnas o tablas) sin perder datos entre versiones.",
      },
      {
        title: "React Native",
        icon: "terminal",
        description:
          "App móvil con React Navigation y AsyncStorage para fichar rápido durante el turno y consultar horas. Sesión persistida en el dispositivo y consumo de la API con axios.",
      },
      {
        title: "SPA web",
        icon: "route",
        description:
          "Frontend web ligero para administración: panel de trabajadores, panel de admin y módulos comunes de autenticación, interfaz e internacionalización.",
      },
      {
        title: "JWT y bcrypt",
        icon: "shield",
        description:
          "Login con token JWT (python-jose), contraseñas hasheadas con bcrypt (Passlib) y una dependencia que valida el rol en cada ruta protegida.",
      },
      {
        title: "Internacionalización",
        icon: "cloud",
        description:
          "Interfaz en español, inglés, alemán y húngaro, pensada para equipos de hotel con trabajadores de distintos países.",
      },
    ],
    featuresIntro:
      "El objetivo no era hacer una demo de fichaje, sino cubrir el ciclo completo que aparece en un hotel: registrar, revisar, corregir, calcular y administrar.",
    features: [
      {
        title: "Acceso por credenciales y rol",
        description:
          "Login con usuario y contraseña, token JWT y rol (trabajador o admin) que decide qué rutas de la API y qué pantallas ve cada perfil.",
      },
      {
        title: "Fichaje guiado",
        description:
          "La API expone /work/in, /work/out, /break/in y /break/out. Al fichar la salida, busca el último intervalo abierto y le pone fin: es imposible tener dos jornadas abiertas a la vez.",
      },
      {
        title: "Descansos y turnos partidos",
        description:
          "Cada intervalo se modela por separado (trabajo o descanso), de modo que un turno partido o varios descansos se calculan sin ambigüedad, no con una resta simple.",
      },
      {
        title: "Dashboard y resumen de horas",
        description:
          "El endpoint /history/summary agrega las horas por día para alimentar el calendario y las tablas. El trabajador ve sus horas reales, sus descansos y sus extras.",
      },
      {
        title: "Solicitudes de corrección trazables",
        description:
          "Si alguien olvida fichar, no se edita el historial a escondidas: crea una solicitud con el horario propuesto. Al aprobarla, se reemplazan los intervalos del día y queda registrada en el log de auditoría.",
      },
      {
        title: "Administración y exportación",
        description:
          "El admin gestiona usuarios (CRUD), aprueba o rechaza correcciones y descarga informes en CSV generados con pandas.",
      },
    ],
    processIntro:
      "El proyecto salió de observar una fricción real y convertirla en producto. Primero entendí el flujo manual, después lo traduje a una API, unas pantallas y unas reglas de negocio.",
    process: [
      {
        title: "Observé el proceso en papel",
        description: "Partí del uso real: trabajadores apuntando horas, responsables revisando hojas y dudas frecuentes sobre descansos, turnos partidos u horas extra.",
      },
      {
        title: "Definí usuarios y permisos",
        description: "Separé trabajador y administrador para que cada perfil viera solo lo que necesita: fichar y consultar, o revisar correcciones y gestionar usuarios.",
      },
      {
        title: "Diseñé el modelo de datos",
        description: "Llevé el problema a tablas relacionales con SQLAlchemy: users, time_logs, correction_requests y audit_logs, con estados, relaciones e índices.",
      },
      {
        title: "Construí la API en FastAPI",
        description: "Endpoints de fichaje, resumen y correcciones para el trabajador; CRUD de usuarios, aprobación de correcciones y export para el admin; todo protegido por JWT.",
      },
      {
        title: "Centralicé el cálculo horario",
        description: "Modelé cada fichaje como un intervalo. Así el dashboard, el calendario y el panel de admin parten de la misma fuente y nunca dan resultados distintos.",
      },
      {
        title: "Conecté dos clientes",
        description: "Una app móvil en React Native para fichar y una SPA web para administrar, ambas consumiendo la misma API con la sesión guardada en el dispositivo o el navegador.",
      },
    ],
    challengesIntro:
      "Las partes difíciles no estuvieron solo en la interfaz, sino en convertir reglas humanas y excepciones del día a día en una lógica consistente.",
    challenges: [
      {
        title: "No todos los días son iguales",
        description: "Había que soportar turno simple, turno partido, descansos explícitos y jornadas que todavía no están cerradas (sin end_at).",
      },
      {
        title: "Fechas y zonas horarias",
        description: "Agrupar por día usando la fecha local fue clave. Un fichaje guardado en UTC no siempre debe agruparse por el día UTC, especialmente en una app usada en distintos husos.",
      },
      {
        title: "Correcciones sin perder trazabilidad",
        description: "La duda era si permitir editar los fichajes directamente. Opté por solicitudes con estado y aprobación, que guardan el antes y el después y dejan rastro en la auditoría.",
      },
      {
        title: "Simplicidad para el empleado",
        description: "La app tenía que funcionar para personas que no quieren aprender un sistema nuevo. Por eso el fichaje muestra pocas acciones, pero bien elegidas según el último registro del día.",
      },
      {
        title: "Una sola fuente de verdad, dos clientes",
        description: "Móvil y web no podían divergir. Toda la lógica vive en la API; los clientes solo presentan y envían, lo que evita cálculos duplicados que se contradigan.",
      },
      {
        title: "Equipo internacional",
        description: "El hotel podía tener trabajadores de varios países, así que añadí cuatro idiomas (español, inglés, alemán y húngaro) desde el principio.",
      },
    ],
    dataModelTitle: "Cuatro tablas para un ciclo completo",
    dataModelIntro:
      "El modelo es deliberadamente pequeño, pero cubre fichaje, corrección y auditoría sin ambigüedades.",
    dataModel: [
      {
        name: "users",
        purpose:
          "Empleados con sus credenciales, rol (trabajador o admin) e idioma preferido de la interfaz.",
        fields: ["username (unique)", "email (unique)", "hashed_password", "role", "language", "is_active"],
      },
      {
        name: "time_logs",
        purpose:
          "Cada fila es un intervalo de tiempo (trabajo o descanso) con inicio y fin. Es la base de todo el cálculo de horas.",
        fields: ["user_id", "log_type (work|break)", "start_at", "end_at"],
      },
      {
        name: "correction_requests",
        purpose:
          "Solicitud de cambio de horario que guarda el antes y el después en JSON, con su estado y la razón del administrador.",
        fields: ["user_id", "target_date", "before_payload (JSON)", "after_payload (JSON)", "status", "admin_reason"],
      },
      {
        name: "audit_logs",
        purpose:
          "Registro de las acciones administrativas (aprobaciones, cambios) para que nada quede sin rastro.",
        fields: ["admin_id", "action", "details", "timestamp"],
      },
    ],
    codeEvidenceTitle: "El fichaje como intervalo, la corrección con rastro",
    codeEvidenceIntro:
      "Dos modelos reales explican las dos decisiones de diseño más importantes: nunca calcular horas con una resta ingenua y nunca editar el historial en silencio.",
    codeEvidence: [
      {
        title: "El fichaje como intervalo (modelo real)",
        filename: "app/models.py",
        language: "python",
        code: `class TimeLog(Base):
    __tablename__ = "time_logs"
    id        = Column(Integer, primary_key=True, index=True)
    user_id   = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    log_type  = Column(String, default="work")   # "work" o "break"
    start_at  = Column(DateTime, default=datetime.utcnow)
    end_at    = Column(DateTime, nullable=True)  # NULL = jornada abierta`,
        caption:
          "Cada fila es un intervalo. Un turno partido son varios TimeLog de tipo work; los descansos van como break. El cálculo de horas nunca depende de una resta ingenua entre la primera y la última marca.",
      },
      {
        title: "Correcciones con trazabilidad (modelo real)",
        filename: "app/models.py",
        language: "python",
        code: `class CorrectionRequest(Base):
    __tablename__ = "correction_requests"
    user_id        = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    target_date    = Column(Date, nullable=False)
    before_payload = Column(JSON, nullable=False)  # horario original
    after_payload  = Column(JSON, nullable=False)  # horario propuesto
    status         = Column(String, default="pending")  # pending|approved|denied
    admin_reason   = Column(String, nullable=True)`,
        caption:
          "El historial no se edita en silencio: la corrección guarda el antes y el después en JSON. Al aprobarla, se reemplazan los intervalos del día y la acción queda en el log de auditoría.",
      },
    ],
    apiContractTitle: "La API que comparten móvil y web",
    apiContractIntro:
      "Toda la lógica vive en la API; los dos clientes solo presentan datos y envían acciones. Estos son los endpoints clave.",
    apiContract: [
      { method: "POST", path: "/work/in", description: "Inicia la jornada: crea un intervalo de trabajo si no hay ninguno abierto.", auth: "JWT (trabajador)" },
      { method: "POST", path: "/work/out", description: "Cierra la jornada: pone end_at al último intervalo abierto.", auth: "JWT (trabajador)" },
      { method: "GET", path: "/history/summary", description: "Resumen de horas por día para el calendario y las tablas.", auth: "JWT" },
      { method: "POST", path: "/requests", description: "Crea una solicitud de corrección con el horario propuesto (before/after).", auth: "JWT (trabajador)" },
      { method: "GET", path: "/export/csv", description: "Descarga el informe en CSV generado con pandas.", auth: "JWT (admin)" },
    ],
    architectureIntro:
      "La arquitectura separa la API (lógica y datos) de los dos clientes que la consumen, para que cada parte evolucione sin mezclar responsabilidades.",
    architecture: [
      "app/ contiene el backend FastAPI: main.py (rutas), models.py (SQLAlchemy), schemas.py (Pydantic), auth.py (JWT y roles), database.py y config.py.",
      "La autenticación usa JWT (python-jose) y bcrypt (Passlib); una dependencia valida el token y el rol en cada petición protegida.",
      "PostgreSQL (o SQLite en local) guarda usuarios, fichajes como intervalos, solicitudes de corrección y auditoría; Alembic gestiona las migraciones.",
      "El cliente móvil en React Native (React Navigation + AsyncStorage) consume la API con axios y conserva la sesión en el dispositivo.",
      "La SPA web sirve la administración: panel de trabajadores, panel de admin y módulos comunes de autenticación, interfaz e i18n.",
      "El cálculo horario vive en el backend, de modo que móvil y web muestran siempre los mismos números.",
    ],
  },
  {
    slug: "command-center",
    title: "Hub de Herramientas Internas Protegido con Cloudflare Zero Trust",
    category: "Centro de operaciones",
    shortLabel: "Command Center",
    problem:
      "Growork funciona con muchas herramientas internas: automatizaciones, scraper, web interna, finanzas, CRM, base de datos, gestor de contraseñas, Dokploy y Project Flow. Tener cada acceso disperso en favoritos o chats ralentiza la operativa diaria y aumenta el riesgo de exponer servicios sensibles.",
    solution:
      "Web central siempre activa que agrupa los accesos clave del ecosistema. Está desplegada en un VPS con Docker/Dokploy y, salvo la web pública de Growork y el portal de clientes, las herramientas internas quedan protegidas con Cloudflare Zero Trust, políticas de acceso por correo autorizado y verificación 2FA.",
    description:
      "Puerta de entrada operativa para Growork: una web ligera que centraliza herramientas internas, despliegues, datos, automatizaciones y accesos protegidos bajo Cloudflare Zero Trust.",
    results: [
      { value: "11", label: "Accesos centralizados" },
      { value: "2FA", label: "Verificación de acceso" },
      { value: "24/7", label: "Siempre activa" },
    ],
    stack: ["Vite", "Tailwind", "Vanilla JS", "Docker", "Nginx", "Dokploy", "Cloudflare Zero Trust", "2FA"],
    images: ["/screenshots/central.webp"],
    heroImage: "/screenshots/central.webp",
  },
  {
    slug: "project-flow",
    title: "Workspace de Agencia: Proyectos, Capacidad y Solicitudes entre Departamentos",
    category: "Workspace interno",
    shortLabel: "Project Flow",
    problem:
      "La operativa de una agencia se dispersa rápido: proyectos, tareas, bloqueos, solicitudes, aprobaciones, documentos internos y capacidad del equipo acaban viviendo en herramientas distintas o en conversaciones imposibles de auditar.",
    solution:
      "Workspace interno que centraliza proyectos, fases, tareas, planificación de capacidad, solicitudes entre departamentos, guías, plantillas, actividad y usuarios. Empezó como una app cliente y evolucionó a un sistema con Express, PostgreSQL, JWT, Docker y despliegue preparado para Dokploy.",
    description:
      "Sistema operativo de trabajo para la gestión interna de agencias: proyectos, tareas, capacidad, solicitudes, conocimiento, plantillas y trazabilidad en un único workspace.",
    results: [
      { value: "11", label: "Vistas operativas" },
      { value: "9", label: "Tablas persistidas" },
      { value: "9", label: "Routers de API" },
    ],
    stack: ["React 19", "Vite", "Tailwind CSS 4", "Express", "PostgreSQL", "JWT", "bcrypt", "Docker", "Dokploy"],
    images: ["/screenshots/manager.webp"],
    heroImage: "/screenshots/manager.webp",
  },
  {
    slug: "servidores-vps",
    title: "Servidores VPS",
    category: "Infraestructura y DevOps",
    shortLabel: "Servidores VPS",
    problem:
      "Los proyectos del portfolio necesitaban algo más serio que demos aisladas: un entorno propio donde publicar apps, proteger las herramientas internas, gestionar dominios y separar secretos. Además, las herramientas internas (n8n, scraper, web interna, IA) consumen recursos de forma irregular, y no quería que un trabajo pesado interno ralentizara la web pública de Growork. El reto era convertir unos VPS vacíos en una base operativa segura, repetible y con el tráfico público aislado del interno.",
    solution:
      "Monté la infraestructura sobre dos servidores separados: uno aloja las herramientas internas (con su propia base de datos) y otro está dedicado a la web pública de Growork y el portal de clientes (con su propia base de datos e IP), de modo que la carga interna nunca degrada la experiencia pública. Ambos corren Ubuntu con SSH endurecido, usuario no root, UFW, Docker, Dokploy, Traefik, Tailscale y Cloudflare con Zero Trust para los servicios internos.",
    description:
      "Infraestructura propia en dos VPS: un nodo para herramientas internas y otro dedicado a la web pública de Growork, con bases de datos e IPs separadas, Docker/Dokploy, dominios en Cloudflare, reverse proxy con Traefik, acceso seguro por SSH/Tailscale y protección Zero Trust para las herramientas internas.",
    longDescription:
      "Caso de estudio de infraestructura: de dos VPS limpios a una base de despliegue para todo el ecosistema. La separación es deliberada: un servidor concentra las herramientas internas y su base de datos; el otro sirve solo la web pública de Growork y el portal, con su propia base de datos e IP, para que las tareas internas pesadas (scraping, IA, automatizaciones) no afecten al rendimiento de cara al usuario final. Incluye endurecimiento del acceso, firewall con UFW, despliegues con Docker y Dokploy, enrutado con Traefik, DNS/proxy con Cloudflare, red privada con Tailscale y protección de herramientas internas con Cloudflare Zero Trust.",
    results: [
      { value: "2", label: "Servidores: interno y público" },
      { value: "2", label: "Bases de datos e IPs separadas" },
      { value: "Zero Trust", label: "Servicios internos protegidos" },
    ],
    stack: ["Contabo VPS", "Ubuntu", "SSH", "UFW", "Docker", "Dokploy", "Traefik", "Tailscale", "Cloudflare", "Cloudflare Zero Trust", "Variables de entorno"],
    images: [
      "/screenshots/servidores-vps.svg",
      "/screenshots/dokploy.webp",
      "/screenshots/cloudflare2.webp",
      "/screenshots/cloudflare-zero.webp",
      "/screenshots/cloudflare3.webp",
      "/screenshots/tailscale.webp",
      "/screenshots/contabo-terminal.webp",
      "/screenshots/cloudflare1.webp",
    ],
    heroImage: "/screenshots/servidores-vps.svg",
    toolsIntro:
      "El foco no era montar una infraestructura enterprise, sino entender y aplicar las piezas esenciales para publicar proyectos propios con una seguridad razonable, un mantenimiento sencillo y el tráfico público aislado del interno.",
    tools: [
      {
        title: "Dos VPS de Contabo",
        icon: "server",
        description:
          "Dos servidores propios: uno para las herramientas internas y otro dedicado a la web pública. Separar las máquinas evita que un trabajo interno pesado afecte al rendimiento que ve el usuario.",
      },
      {
        title: "SSH",
        icon: "terminal",
        description:
          "Acceso remoto para administrar los servidores desde la terminal. Lo uso como vía principal de gestión porque es estándar, seguro con claves y mucho más controlable que un panel gráfico.",
      },
      {
        title: "UFW",
        icon: "shield",
        description:
          "Firewall simple sobre iptables para permitir solo los puertos necesarios (SSH, HTTP y HTTPS) y reducir la superficie expuesta de cada servidor.",
      },
      {
        title: "Dokploy",
        icon: "deploy",
        description:
          "Panel de despliegue sobre Docker para publicar y gestionar proyectos, contenedores, dominios, logs y variables de entorno sin escribir toda la operativa a mano cada vez.",
      },
      {
        title: "Traefik",
        icon: "route",
        description:
          "Reverse proxy que enruta cada dominio hacia su contenedor, gestiona HTTPS y evita tener que configurar Nginx a mano para cada servicio nuevo.",
      },
      {
        title: "Cloudflare y Zero Trust",
        icon: "cloud",
        description:
          "DNS, proxy, protección perimetral y control de acceso para las herramientas internas. Zero Trust permite exigir identidad antes de llegar a los servicios sensibles.",
      },
    ],
    featuresIntro:
      "El proyecto demuestra que sé gestionar servidores a nivel práctico: acceso, red, despliegues, dominios, certificados, variables, separación de cargas y protección de servicios internos.",
    features: [
      {
        title: "Separación de público e interno",
        description:
          "Un servidor sirve solo la web pública de Growork y el portal; el otro aloja las herramientas internas y su base de datos. Así el tráfico de clientes no compite por recursos con el trabajo interno.",
      },
      {
        title: "Acceso SSH con usuario no root",
        description:
          "Configuré los servidores para trabajar con un usuario propio y evitar usar root como cuenta diaria, dejando los privilegios elevados solo para lo que realmente lo necesita.",
      },
      {
        title: "Firewall con UFW",
        description:
          "Definí reglas de firewall para permitir un conjunto mínimo de puertos: administración por SSH y tráfico web por HTTP/HTTPS, cerrando el resto por defecto.",
      },
      {
        title: "Dokploy como capa de despliegue",
        description:
          "Instalé Dokploy en cada servidor para gestionar proyectos Docker, revisar logs, conectar repositorios, asignar dominios y mantener las variables de entorno por aplicación.",
      },
      {
        title: "Traefik para rutas y certificados",
        description:
          "Uso Traefik como proxy inverso para mandar cada dominio o subdominio al contenedor correcto y simplificar la gestión de HTTPS.",
      },
      {
        title: "Tailscale para acceso privado",
        description:
          "Tailscale crea una red privada entre mis dispositivos y los servidores, útil para acceder a servicios internos o a la administración sin abrirlo todo a internet.",
      },
      {
        title: "Variables por proyecto",
        description:
          "Cada proyecto en Dokploy mantiene sus propias variables sensibles: claves de API, URLs, tokens, credenciales de base de datos y configuración de entorno.",
      },
      {
        title: "Cloudflare Zero Trust",
        description:
          "Las herramientas internas quedan detrás de políticas de acceso, login y verificación antes de que el usuario llegue al servicio real.",
      },
    ],
    processIntro:
      "El proceso fue incremental: primero asegurar el acceso mínimo a cada servidor, después abrir solo lo necesario y, por último, montar la capa de despliegue, los dominios y la separación de cargas.",
    process: [
      {
        title: "Contraté los VPS",
        description:
          "Elegí dos VPS para tener un entorno real donde desplegar proyectos, aprender administración de servidor y, sobre todo, separar la web pública de las herramientas internas.",
      },
      {
        title: "Preparé el acceso por SSH",
        description:
          "Entré a los servidores por terminal, usé un usuario no root para el trabajo diario y dejé el acceso administrativo más controlado.",
      },
      {
        title: "Apliqué reglas de UFW",
        description:
          "Activé el firewall y limité la exposición a los puertos necesarios. La prioridad fue no dejar servicios abiertos por accidente.",
      },
      {
        title: "Instalé Docker y Dokploy",
        description:
          "Con Docker como base, Dokploy se convirtió en el panel para desplegar aplicaciones, conectar dominios, revisar logs y gestionar variables en cada servidor.",
      },
      {
        title: "Configuré los dominios con Cloudflare",
        description:
          "Usé Cloudflare para DNS, proxy y gestión de subdominios. Cada app o herramienta vive en su propio subdominio, apuntando al servidor que le corresponde.",
      },
      {
        title: "Protegí los servicios internos",
        description:
          "Para las herramientas privadas combiné Tailscale y Cloudflare Zero Trust según el caso: red privada para la administración y políticas de acceso para los servicios web.",
      },
    ],
    challengesIntro:
      "Las decisiones importantes estuvieron en separar cargas sin sobrecomplicar la infraestructura, y en no dejarla abierta ni difícil de mantener.",
    challenges: [
      {
        title: "Aislar el tráfico público del interno",
        description:
          "Un trabajo interno pesado (scraping, IA, un import grande) no debería ralentizar la web pública. Separar en dos servidores con sus propias bases de datos resuelve ese acoplamiento de raíz.",
      },
      {
        title: "No trabajar como root por costumbre",
        description:
          "Root es cómodo, pero también peligroso. Separar el usuario diario de los privilegios administrativos reduce los errores graves y mejora el control.",
      },
      {
        title: "Abrir solo lo necesario",
        description:
          "Un VPS en internet recibe intentos de acceso constantemente. UFW ayuda a mantener una política simple: permitir lo imprescindible y denegar el resto.",
      },
      {
        title: "Elegir Dokploy en vez de hacerlo todo a mano",
        description:
          "Podría configurar cada contenedor y proxy manualmente, pero Dokploy acelera los despliegues y hace más visible el estado de cada proyecto.",
      },
      {
        title: "Separar público y privado",
        description:
          "No todo lo desplegado debe estar abierto. Tailscale y Zero Trust permiten distinguir entre webs públicas, herramientas internas y administración.",
      },
      {
        title: "Gestionar secretos sin quemarlos en el código",
        description:
          "Las variables de entorno por proyecto evitan subir credenciales al repositorio y facilitan mover la configuración entre entornos.",
      },
    ],
    evidenceIntro:
      "Estas capturas conectan la explicación con configuraciones reales: panel de despliegues, subdominios DNS apuntando a los VPS, acceso privado, variables por proyecto y Zero Trust.",
    evidenceEyebrow: "Infraestructura real",
    evidenceTitle: "Paneles, dominios y accesos de los VPS",
    evidence: [
      {
        title: "Panel de Dokploy con proyectos desplegados",
        description:
          "La captura muestra Dokploy como centro de operaciones: varios proyectos, servicios internos y apps publicadas desde el mismo servidor. Es la prueba visual más clara de que el VPS no es teórico, sino un entorno donde conviven despliegues reales.",
        image: "/screenshots/dokploy.webp",
        alt: "Panel de Dokploy con varios proyectos desplegados en el servidor VPS",
      },
      {
        title: "DNS y subdominios en Cloudflare",
        description:
          "Aquí se ven los registros DNS de growork.es. Varios subdominios apuntan a la IP del servidor correspondiente y están proxied por Cloudflare, lo que permite enrutar cada herramienta o app desde un dominio propio sin exponer la infraestructura directamente.",
        image: "/screenshots/cloudflare2.webp",
        alt: "Registros DNS de Cloudflare con subdominios apuntando a la IP del servidor",
      },
      {
        title: "Cloudflare Zero Trust",
        description:
          "Zero Trust entra como capa de identidad para las herramientas internas. La idea es que no baste con conocer la URL: antes de llegar al servicio se exige autenticación, políticas de acceso y verificación.",
        image: "/screenshots/cloudflare-zero.webp",
        alt: "Panel de Cloudflare Zero Trust con métricas y controles de acceso",
      },
      {
        title: "Variables de entorno por proyecto",
        description:
          "En Dokploy cada aplicación mantiene sus propias variables sensibles: claves de API, tokens, URLs y credenciales. Esto evita quemar secretos en el código y permite separar la configuración por servicio.",
        image: "/screenshots/cloudflare3.webp",
        alt: "Vista de variables de entorno de un proyecto dentro de Dokploy",
      },
      {
        title: "Tailscale para red privada",
        description:
          "Tailscale permite que los servidores y mis dispositivos estén en una red privada. Lo uso para tener acceso interno sin abrir cada servicio a internet y para separar la administración privada de las webs públicas.",
        image: "/screenshots/tailscale.webp",
        alt: "Panel de Tailscale mostrando máquinas conectadas a la red privada",
      },
      {
        title: "Terminal del VPS de Contabo",
        description:
          "La terminal demuestra acceso real al servidor: información del sistema, carga, uso de disco, memoria, IP y sesión SSH. Es la parte más básica, pero también la que confirma que se administra una máquina Linux real.",
        image: "/screenshots/contabo-terminal.webp",
        alt: "Terminal SSH con información del VPS de Contabo",
      },
      {
        title: "Vista general del dominio en Cloudflare",
        description:
          "La vista general del dominio ayuda a contextualizar que Cloudflare no solo gestiona DNS: también aporta proxy, analítica, reglas y controles alrededor del tráfico web.",
        image: "/screenshots/cloudflare1.webp",
        alt: "Vista general del dominio growork.es dentro del panel de Cloudflare",
      },
    ],
    architectureIntro:
      "La arquitectura combina dos VPS como base, Docker/Dokploy para ejecutar proyectos, Traefik para enrutar el tráfico y Cloudflare/Tailscale para proteger los accesos. La separación en dos nodos aísla la carga pública de la interna.",
    architecture: [
      "El servidor interno aloja las herramientas internas (n8n, scraper, web interna, finanzas, CRM, base de datos, Dokploy, Project Flow) con su propia base de datos.",
      "El servidor público está dedicado a la web de Growork y al portal de clientes, con su propia base de datos e IP, para que el tráfico de clientes no compita con el trabajo interno.",
      "SSH es la vía de administración remota; el uso diario se hace con un usuario no root y privilegios elevados solo cuando hace falta.",
      "UFW limita la exposición de cada servidor a puertos concretos, normalmente SSH, HTTP y HTTPS.",
      "Dokploy orquesta los proyectos Docker, los dominios, los logs, las variables de entorno y los despliegues desde una interfaz operativa.",
      "Traefik recibe el tráfico web y lo enruta al contenedor correcto según el dominio o subdominio, gestionando también HTTPS.",
      "Cloudflare gestiona DNS, proxy y protección perimetral de los dominios; Zero Trust protege las herramientas internas con políticas de identidad.",
      "Tailscale crea una red privada para acceder a los recursos que no necesitan estar expuestos públicamente.",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
