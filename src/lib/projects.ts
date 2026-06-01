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
  imageFit?: "cover" | "contain";
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
  ctaTitle?: string;
  ctaDescription?: string;
}

export const PROJECTS: Project[] = [
  {
    slug: "growork",
    title: "Growork",
    category: "Plataforma Full-Stack",
    shortLabel: "Growork",
    problem:
      "Candidatos hispanohablantes quieren trabajar en Suiza pero el proceso es confuso: necesitan CV adaptado, carta, estrategia, seguimiento y acompañamiento. El negocio necesitaba captar leads, cobrar servicios y mostrar progreso. Una landing normal no bastaba porque había operaciones reales detrás.",
    solution:
      "Plataforma completa que combina web pública, captación, evaluación, pagos con Stripe, CRM con Twenty, portal privado, automatizaciones con n8n, blog SEO y analítica. La experiencia parece sencilla para el usuario, aunque por dentro conecte pagos, CRM, documentos, automatizaciones y datos operativos.",
    description:
      "Plataforma full-stack para ayudar a candidatos hispanohablantes a trabajar en Suiza. Combina web pública, pagos, CRM, portal privado, automatizaciones, SEO y analítica en un único producto.",
    longDescription:
      "Growork empezó como una web pública para vender servicios de empleabilidad en Suiza, pero acabó convirtiéndose en una plataforma completa: captación, evaluación, pagos, CRM, portal privado, automatizaciones, SEO, analítica y operaciones conectadas.",
    results: [
      { value: "12+", label: "Sistemás integrados" },
      { value: "60+", label: "API routes" },
      { value: "8", label: "Flujos clave" },
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "PostgreSQL", "Stripe", "Twenty CRM", "OpenAI", "n8n", "Tailwind CSS 4", "Cloudflare"],
    images: ["/screenshots/central.png", "/screenshots/manager.png"],
    heroImage: "/screenshots/central.png",
    video: "/screenshots/growork.mp4",
    websiteUrl: "https://growork.es",
    features: [
      {
        title: "Evaluación pública",
        description: "Formulario individual/pareja con datos, idiomas, disponibilidad, subida de CV/carta PDF, Turnstile antispam y envío a CRM + n8n.",
      },
      {
        title: "Checkout con Stripe",
        description: "Productos puntuales y planes con precios dinámicos desde Finance, upsell, checkout autenticado y guest, webhook como aprovisionamiento central.",
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
        description: "Posts dinámicos desde PostgreSQL, clusters SEO, structured data, sitemap dinámico, llms.txt y panel admin integrado.",
      },
      {
        title: "Seguridad multicapa",
        description: "CSP estricta, JWT HTTP-only, bcrypt, rate limits, Turnstile, validación de PDF, Cloudflare Access y robots bloqueando zonas privadas.",
      },
    ],
    architecture: [
      "Cliente autenticado con JWT HTTP-only y acceso protegido a /portal/*",
      "PostgreSQL como capa operativa para sesión, servicios, pagos, chat y datos de negocio",
      "Twenty CRM para perfil, plan, estado comercial y sincronización de clientes",
      "Webinterna para candidaturas, respuestas y métricas a través de /sent-emails/stats?clientId=..., /sent-emails?clientId=... y /email-responses/client/...",
      "OpenAI para chat IA con contexto limitado y respuestas controladas",
      "Stripe para pagos, renovaciones y upgrades",
      "n8n como motor de automatización para documentos, CVs y cartas",
    ],
  },
  {
    slug: "email-operations-os",
    title: "Sistema de Envíos y Workflows Growork",
    category: "Automatización Full-Stack",
    shortLabel: "Email Operations OS",
    problem:
      "Enviar candidaturas para muchos clientes no era solo mandar emails. Había que sincronizar CRM, preparar CVs, crear carpetas, generar cuentas de Google Workspace, controlar reputación, aprobar mensajes, evitar duplicados, leer respuestas y saber en todo momento donde estaba bloqueado cada cliente.",
    solution:
      "Construcción de una web interna con backend NestJS, frontend Next.js, PostgreSQL, n8n, Twenty CRM, Google Workspace, Gmail API, Drive y OpenAI. El sistema convierte onboarding, envío, respuestas, workflows, dominios y configuración en una consola operativa trazable.",
    description:
      "Sistema interno para gestionar clientes, workflows, Google Workspace, envíos de email, respuestas, IA, Drive, dominios y configuración operativa de Growork.",
    longDescription:
      "Una consola de operaciones completa para Growork: clientes sincronizados desde CRM, workflows n8n, cuentas corporativas, warmup, preview manual, envío por Gmail API, respuestas clasificadas con IA y monitorización diaria.",
    results: [
      { value: "8", label: "Módulos web" },
      { value: "5", label: "Workflows por cliente" },
      { value: "14+", label: "Sistemás conectados" },
    ],
    stack: ["Next.js", "React", "TypeScript", "NestJS", "PostgreSQL", "TypeORM", "Twenty CRM", "n8n", "Google Workspace", "Gmail API", "Google Drive", "OpenAI", "Docker", "Nginx"],
    images: [
      "/screenshots/webinterna1.png",
      "/screenshots/webinterna2.png",
      "/screenshots/webinterna3.png",
      "/screenshots/webinterna4.png",
      "/screenshots/webinterna5.png",
      "/screenshots/webinterna6.png",
      "/screenshots/webinterna7.png",
      "/screenshots/webinterna8.png",
      "/screenshots/email-operations-os.svg",
    ],
    heroImage: "/screenshots/webinterna1.png",
    imageFit: "cover",
    features: [
      {
        title: "Panel operativo completo",
        description: "Dashboard, clientes, workflows, creadores CV, dominios, correos corporativos, preview de emails y centro de envíos en una única web interna.",
      },
      {
        title: "Envíos por cliente",
        description: "Scheduler diario, worker cada minuto, warmup gradual, matching de ofertas, preview manual, IA, adjuntos de Drive y tracking en PostgreSQL.",
      },
      {
        title: "Google Workspace",
        description: "Creación de cuentas corporativas, gestión por dominio, borrado con periodo de gracia, sync con Google Admin y envío con Gmail API.",
      },
      {
        title: "Workflows n8n",
        description: "Pipeline visual con WKF-1 a WKF-1.4 para carpetas, creador CV, detección de archivos, CV definitivo y email corporativo.",
      },
      {
        title: "Respuestas inteligentes",
        description: "Lectura de Gmail, deduplicación, clasificación con IA y respuestas en hilo usando headers RFC 5322.",
      },
      {
        title: "Seguridad y control",
        description: "API key, rate limits, validación de dominios, constraints anti-duplicados, estados de cliente y fallbacks cuando falla IA o Drive.",
      },
    ],
    architecture: [
      "Next.js actúa como consola operativa para dashboard, clientes, workflows, preview, dominios, correos corporativos y centro de envíos.",
      "NestJS concentra la lógica de negocio con módulos de clients, scheduler, worker, email, responses, n8n, workflow-state, corporate-emails, dominios, dashboard, Drive y Twenty.",
      "PostgreSQL guarda clientes, settings, workflow states, send jobs, email sends, responses, dominios, notificaciones y trazabilidad.",
      "n8n ejecuta los procesos visuales de onboarding: carpetas Drive, creadores CV, detección de archivos, aprobación de CV y Google Workspace.",
      "Google Workspace crea cuentas corporativas; Gmail API envía y responde; Google Drive conserva CVs, cartas y adjuntos definitivos.",
      "OpenAI genera emails, resume CVs, crea cartas, clasifica respuestas y sugiere replies con fallback si la IA falla.",
    ],
  },
  {
    slug: "n8n-workflows",
    title: "+10 Flujos de trabajo de n8n",
    category: "Automatización con IA",
    shortLabel: "+10 Flujos de trabajo de n8n",
    problem:
      "Las tareas repetitivas entre herramientas (CRM, email, spreadsheets, APIs) consumen horas diarias y generan errores humanos. No existe una visión unificada de los procesos.",
    solution:
      "Biblioteca de más de 10 flujos de trabajo de n8n que automatizan desde scraping y enriquecimiento de datos hasta envío de emails, sincronización de CRMs y procesamiento con IA.",
    description:
      "Colección de flujos de trabajo de automatización construidos con n8n que orquestan múltiples servicios: extracción de datos, enriquecimiento con IA, comunicaciones, CRM e informes — todo sin código.",
    longDescription:
      "He diseñado y desplegado más de 10 flujos de trabajo de n8n que automatizan procesos críticos de negocio. Desde scrapers que extraen datos de portales de empleo, hasta flujos que enriquecen leads con IA, envían emails personalizados y sincronizan todo con CRMs. Cada flujo es modular, documentado y listo para reutilizar.",
    results: [
      { value: "10+", label: "Flujos de trabajo activos" },
      { value: "100%", label: "Sin código" },
      { value: "0€", label: "Coste de infra" },
    ],
    stack: ["n8n", "PostgreSQL", "Claude API", "OpenAI", "REST APIs", "Webhooks", "HTTP Request"],
    images: ["/screenshots/n8n-home.png"],
    heroImage: "/screenshots/n8n-home.png",
    features: [
      {
        title: "Scraping Automatizado",
        description: "Extracción programada de datos de portales web, APIs y fuentes públicas con limpieza y normalización automática.",
      },
      {
        title: "Enriquecimiento con IA",
        description: "Procesamiento de leads y datos con Claude y GPT para generar resúmenes, clasificar contenido y extraer conclusiones.",
      },
      {
        title: "Automatización de Email",
        description: "Envío personalizado masivo con plantillas dinámicas, seguimiento de aperturas y respuestas automáticas.",
      },
      {
        title: "Sincronización de CRMs",
        description: "Sincronización bidireccional entre CRMs, hojas de cálculo y bases de datos sin conflictos ni duplicados.",
      },
      {
        title: "Webhooks y APIs",
        description: "Integración con cualquier servicio mediante webhooks, HTTP requests y autenticación OAuth.",
      },
      {
        title: "Manejo de Errores",
        description: "Sistemás de reintentos, notificaciones de fallos y logs centralizados para monitorizar cada ejecución.",
      },
    ],
    architecture: [
      "Disparador: Webhooks, cron schedules y eventos manuales",
      "Procesamiento: Nodos de transformación, filtrado y enriquecimiento",
      "Capa de IA: Claude API y OpenAI para procesamiento de texto",
      "Almacenamiento: PostgreSQL para datos persistentes",
      "Salida: Email, Slack, CRMs y APIs de terceros",
      "Monitorización: Logs internos de n8n con alertas",
    ],
  },
  {
    slug: "swiss-hotel-job-scraper",
    title: "Scraper de Empleo de Hoteles Suizos",
    category: "Scraping y Automatización",
    shortLabel: "Scraper de Empleo",
    problem:
      "Buscar oportunidades en hoteles suizos exigía revisar varios portales, repetir filtros por ciudad o región, abrir ofertas una a una, localizar emails y evitar contactar dos veces con la misma empresa.",
    solution:
      "Aplicación interna con FastAPI, Playwright y PostgreSQL que centraliza cuatro scrapers, programa ejecuciones diarias, extrae emails, deduplica contactos, muestra logs en tiempo real y exporta resultados desde un dashboard propio.",
    description:
      "Sistema multi-scraper para convertir ofertas dispersas de portales hoteleros suizos en una base de contactos limpia, trazable y exportable.",
    longDescription:
      "Herramienta operativa para buscar empleo en el sector hotelero suizo. Integra HotelCareer, Hogapage, Gastrojob y Hoteljob en un dashboard con ejecuciones manuales y diarias, logs, historial, CSV, PostgreSQL, deduplicación por email y reintentos automáticos.",
    results: [
      { value: "4", label: "Portales monitoreados" },
      { value: "24h", label: "Scraping programado" },
      { value: "3", label: "Reintentos por fallo" },
    ],
    stack: ["Python", "FastAPI", "Playwright", "PostgreSQL", "SQLAlchemy", "APScheduler", "Docker", "Vanilla JS"],
    images: ["/screenshots/scraper.png", "/screenshots/scrapersito.png"],
    heroImage: "/screenshots/scraper.png",
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
        description: "Interfaz para lanzar, parar, reanudar, programar, revisar historial, descargar CSV y consultar logs sin entrar al servidor.",
      },
      {
        title: "Deduplicación por email",
        description: "PostgreSQL guarda el histórico y una vista unificada evita duplicar empresas cuando aparecen en múltiples fuentes.",
      },
      {
        title: "Reintentos automáticos",
        description: "Servicio que revisa cada 10 minutos ejecuciones fallidas o pendientes y reintenta hasta tres veces respetando paradas manuales.",
      },
      {
        title: "Anti-ban pragmático",
        description: "Rotación de user-agents, pausas aleatorias, manejo de cookies y ejecuciones distribuidas para reducir bloqueos.",
      },
    ],
    architecture: [
      "FastAPI expone endpoints para extracción, estado, historial, CSV, programación, logs y base de datos.",
      "Playwright navega los portales, aplica filtros, recopila URLs y entra en cada oferta para extraer los campos útiles.",
      "PostgreSQL almacena ejecuciones, ofertas, configuraciones diarias y una vista unificada deduplicada por email.",
      "APScheduler lanza trabajos diarios en ventanas configurables y recalcula horarios cada día.",
      "Server-Sent Events muestran logs en tiempo real durante ejecuciones largas.",
      "Docker facilita el despliegue con volumen persistente para datos, logs y exportaciones.",
    ],
  },
  {
    slug: "command-center",
    title: "Command Center",
    category: "Centro de operaciones",
    shortLabel: "Command Center",
    problem:
      "Growork funciona con muchas herramientas internas: automatizaciones, scraper, web interna, finanzas, CRM, base de datos, password manager, Dokploy y Project Manager. Tener cada acceso disperso en favoritos o chats hace más lenta la operativa diaria y aumenta el riesgo de exponer servicios sensibles.",
    solution:
      "Web central siempre activa que agrupa los accesos clave del ecosistema. Está desplegada en VPS con Docker/Dokploy y las herramientas internas, salvo la web pública de Growork y el portal de clientes, quedan protegidas con Cloudflare Zero Trust, políticas de acceso por correo autorizado y verificación 2FA.",
    description:
      "Puerta de entrada operativa para Growork: una web ligera que centraliza herramientas internas, despliegues, datos, automatizaciones y accesos protegidos bajo Cloudflare Zero Trust.",
    results: [
      { value: "11", label: "Accesos centralizados" },
      { value: "2FA", label: "Verificación de acceso" },
      { value: "24/7", label: "Siempre activa" },
    ],
    stack: ["Vite", "Tailwind", "Vanilla JS", "Docker", "Nginx", "Dokploy", "Cloudflare Zero Trust", "2FA"],
    images: ["/screenshots/central.png"],
    heroImage: "/screenshots/central.png",
  },
  {
    slug: "servidores-vps",
    title: "Servidores VPS",
    category: "Infraestructura y DevOps",
    shortLabel: "Servidores VPS",
    problem:
      "Los proyectos del portfolio necesitaban algo más serio que demos aisladas: un entorno propio donde publicar apps, proteger herramientas internas, gestionar dominios, separar secretos y entender qué ocurre cuando un servicio vive en internet 24/7. El reto era convertir un VPS vacío en una base operativa segura y repetible, sin sobredimensionar la infraestructura.",
    solution:
      "Monté un entorno de despliegue sobre Ubuntu con SSH, usuario no root, UFW, Docker, Dokploy, Traefik, Tailscale, Cloudflare y Zero Trust. La infraestructura permite publicar varias aplicaciones desde una misma máquina, enrutar cada subdominio al contenedor correcto, revisar logs, aislar variables por proyecto y proteger servicios internos con acceso privado o políticas de identidad.",
    description:
      "Infraestructura propia en VPS para desplegar proyectos reales con Docker/Dokploy, dominios en Cloudflare, reverse proxy con Traefik, acceso seguro por SSH/Tailscale y protección Zero Trust para herramientas internas.",
    longDescription:
      "Caso de estudio de infraestructura: de un VPS limpio a una base de despliegue para proyectos del portfolio. Incluye endurecimiento inicial del acceso, firewall con UFW, despliegues con Docker y Dokploy, enrutado con Traefik, DNS/proxy con Cloudflare, red privada con Tailscale y protección de herramientas internas con Cloudflare Zero Trust.",
    results: [
      { value: "8", label: "Piezas de infra conectadas" },
      { value: "24/7", label: "Base de despliegue activa" },
      { value: "Zero Trust", label: "Servicios internos protegidos" },
    ],
    stack: ["Contabo VPS", "Ubuntu", "SSH", "UFW", "Docker", "Dokploy", "Traefik", "Tailscale", "Cloudflare", "Cloudflare Zero Trust", "Variables de entorno"],
    images: [
      "/screenshots/servidores-vps.svg",
      "/screenshots/dokploy.png",
      "/screenshots/cloudflare2.png",
      "/screenshots/cloudflare-zero.png",
      "/screenshots/cloudflare3.png",
      "/screenshots/tailscale.png",
      "/screenshots/contabo-terminal.png",
      "/screenshots/cloudflare1.png",
    ],
    heroImage: "/screenshots/servidores-vps.svg",
    imageFit: "contain",
    toolsIntro:
      "El foco no era montar una infraestructura enterprise, sino entender y aplicar las piezas esenciales para publicar proyectos propios con seguridad razonable y mantenimiento sencillo.",
    tools: [
      {
        title: "VPS de Contabo",
        icon: "server",
        description:
          "Servidor propio para alojar aplicaciones, bases de datos y herramientas internas sin depender de un hosting por proyecto. Me permite practicar administración real de Linux, red y despliegues.",
      },
      {
        title: "SSH",
        icon: "terminal",
        description:
          "Acceso remoto al servidor para administrarlo desde terminal. Lo uso como vía principal de gestión porque es estándar, seguro con claves y mucho más controlable que un panel gráfico.",
      },
      {
        title: "UFW",
        icon: "shield",
        description:
          "Firewall simple sobre iptables para permitir solo los puertos necesarios, como SSH, HTTP y HTTPS, reduciendo la superficie expuesta del servidor.",
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
          "Reverse proxy que enruta dominios hacia contenedores, gestióna HTTPS y evita tener que configurar Nginx manualmente para cada servicio nuevo.",
      },
      {
        title: "Cloudflare y Zero Trust",
        icon: "cloud",
        description:
          "DNS, proxy, protección perimetral y control de acceso para herramientas internas. Zero Trust permite exigir identidad antes de llegar a servicios sensibles.",
      },
    ],
    featuresIntro:
      "El proyecto demuestra que sé gestionar un servidor a nivel básico: acceso, red, despliegues, dominios, certificados, variables y protección de servicios internos.",
    features: [
      {
        title: "Acceso SSH con usuario no root",
        description:
          "Configure el servidor para trabajar con un usuario propio y evitar usar root como cuenta diaria. La idea es limitar riesgos y dejar root solo para acciones que realmente lo necesiten.",
      },
      {
        title: "Endurecimiento del acceso",
        description:
          "El acceso administrativo se apoya en SSH y buenas prácticas como reducir el uso de root, controlar usuarios autorizados y evitar exponer más entradas de las necesarias.",
      },
      {
        title: "Firewall con UFW",
        description:
          "Definí reglas de firewall para permitir un conjunto mínimo de puertos: administración por SSH y tráfico web por HTTP/HTTPS, cerrando el resto por defecto.",
      },
      {
        title: "Dokploy como capa de despliegue",
        description:
          "Instalé Dokploy para gestionar proyectos Docker, revisar logs, conectar repositorios, asignar dominios y mantener variables de entorno por aplicación.",
      },
      {
        title: "Traefik para rutas y certificados",
        description:
          "Uso Traefik como proxy inverso para mandar cada dominio o subdominio al contenedor correcto y simplificar la gestión de HTTPS.",
      },
      {
        title: "Tailscale para acceso privado",
        description:
          "Tailscale crea una red privada entre mis dispositivos y el servidor, útil para acceder a servicios internos o administración sin abrirlo todo a internet.",
      },
      {
        title: "Variables por proyecto",
        description:
          "Cada proyecto en Dokploy mantiene sus propias variables sensibles: claves API, URLs, tokens, credenciales de base de datos y configuración de entorno.",
      },
      {
        title: "Cloudflare Zero Trust",
        description:
          "Las herramientas internas pueden quedar detrás de políticas de acceso, login y verificación antes de que el usuario llegue al servicio real.",
      },
    ],
    processIntro:
      "El proceso fue incremental: primero asegurar el acceso mínimo al servidor, después abrir solo lo necesario y por último montar la capa de despliegue y dominios.",
    process: [
      {
        title: "Contraté el VPS",
        description:
          "Elegir un VPS me dio un entorno real para desplegar varios proyectos, aprender administración básica de servidor y controlar costes desde una única máquina.",
      },
      {
        title: "Preparé el acceso por SSH",
        description:
          "Entré al servidor por terminal, cree o use un usuario no root para el trabajo diario y deje el acceso administrativo más controlado.",
      },
      {
        title: "Apliqué reglas UFW",
        description:
          "Activé firewall y limite la exposición a los puertos necesarios. La prioridad fue no dejar servicios abiertos por accidente.",
      },
      {
        title: "Instalé Docker y Dokploy",
        description:
          "Con Docker como base, Dokploy se convirtió en el panel para desplegar aplicaciones, conectar dominios, revisar logs y gestionar variables.",
      },
      {
        title: "Configuré dominios con Cloudflare",
        description:
          "Usé Cloudflare para DNS, proxy y gestión de subdominios. Cada app o herramienta puede vivir en su propio subdominio.",
      },
      {
        title: "Protegí servicios internos",
        description:
          "Para herramientas privadas, combiné Tailscale y Cloudflare Zero Trust según el caso: red privada para administración y políticas de acceso para servicios web.",
      },
    ],
    challengesIntro:
      "Las decisiones importantes estuvieron en no sobrecomplicar el servidor, pero tampoco dejarlo abierto o difícil de mantener.",
    challenges: [
      {
        title: "No trabajar como root por costumbre",
        description:
          "Root es cómodo, pero también peligroso. Separar usuario diario y privilegios administrativos reduce errores graves y mejora el control.",
      },
      {
        title: "Abrir solo lo necesario",
        description:
          "Un VPS en internet recibe intentos de acceso constantemente. UFW ayuda a mantener una política simple: permitir lo imprescindible y denegar el resto.",
      },
      {
        title: "Elegir Dokploy en vez de hacerlo todo manual",
        description:
          "Podría configurar cada contenedor y proxy a mano, pero Dokploy acelera despliegues y hace más visible el estado de cada proyecto.",
      },
      {
        title: "Entender el papel de Traefik",
        description:
          "Traefik no es la app, sino la puerta que decide a que contenedor va cada dominio y como se resuelve HTTPS.",
      },
      {
        title: "Separar público y privado",
        description:
          "No todo lo desplegado debe estar abierto. Tailscale y Zero Trust permiten distinguir entre webs públicas, herramientas internas y administración.",
      },
      {
        title: "Gestionar secretos sin quemarlos en código",
        description:
          "Las variables de entorno por proyecto evitan subir credenciales al repositorio y facilitan mover configuración entre entornos.",
      },
    ],
    evidenceIntro:
      "Estas capturas conectan la explicación con configuraciones reales: servidor contratado, panel de despliegues, subdominios DNS apuntando al VPS, acceso privado, variables por proyecto y Zero Trust.",
    evidenceEyebrow: "Infraestructura real",
    evidenceTitle: "Paneles, dominios y accesos del VPS",
    evidence: [
      {
        title: "Panel Dokploy con proyectos desplegados",
        description:
          "La captura muestra Dokploy como centro de operaciones: varios proyectos, servicios internos y apps públicados desde el mismo servidor. Es la prueba visual más clara de que el VPS no es teórico, sino un entorno donde conviven despliegues reales.",
        image: "/screenshots/dokploy.png",
        alt: "Panel de Dokploy con varios proyectos desplegados en el servidor VPS",
      },
      {
        title: "DNS y subdominios en Cloudflare",
        description:
          "Aquí se ven los registros DNS de growork.es. Varios subdominios apuntan a la IP del servidor y están proxied por Cloudflare, lo que permite enrutar cada herramienta o app desde un dominio propio sin exponer la infraestructura de forma directa.",
        image: "/screenshots/cloudflare2.png",
        alt: "Registros DNS de Cloudflare con subdominios apuntando a la IP del servidor",
      },
      {
        title: "Cloudflare Zero Trust",
        description:
          "Zero Trust entra como capa de identidad para herramientas internas. La idea es que no baste con conocer la URL: antes de llegar al servicio se puede exigir autenticación, políticas de acceso y verificación.",
        image: "/screenshots/cloudflare-zero.png",
        alt: "Panel de Cloudflare Zero Trust con métricas y controles de acceso",
      },
      {
        title: "Variables de entorno por proyecto",
        description:
          "En Dokploy cada aplicación mantiene sus propias variables sensibles: claves API, tokens, URLs y credenciales. Esto evita quemar secretos en el código y permite separar configuración por servicio.",
        image: "/screenshots/cloudflare3.png",
        alt: "Vista de variables de entorno de un proyecto dentro de Dokploy",
      },
      {
        title: "Tailscale para red privada",
        description:
          "Tailscale permite que el servidor y mis dispositivos están en una red privada. Lo uso para tener acceso interno sin abrir cada servicio a internet y para separar administración privada de webs públicas.",
        image: "/screenshots/tailscale.png",
        alt: "Panel de Tailscale mostrando máquinas conectadas a la red privada",
      },
      {
        title: "Terminal del VPS de Contabo",
        description:
          "La terminal demuestra acceso real al servidor: información del sistema, carga, uso de disco, memoria, IP y sesión SSH. Es la parte más básica, pero también la que confirma que se administra una máquina Linux real.",
        image: "/screenshots/contabo-terminal.png",
        alt: "Terminal SSH con información del VPS de Contabo",
      },
      {
        title: "Overview del dominio en Cloudflare",
        description:
          "La vista general del dominio ayuda a contextualizar que Cloudflare no solo gestióna DNS: también aporta proxy, analítica, reglas y controles alrededor del tráfico web.",
        image: "/screenshots/cloudflare1.png",
        alt: "Overview del dominio growork.es dentro del panel de Cloudflare",
      },
    ],
    architectureIntro:
      "La arquitectura combina un VPS como base, Docker/Dokploy para ejecutar proyectos, Traefik para enrutar tráfico y Cloudflare/Tailscale para proteger accesos.",
    architecture: [
      "El VPS ejecuta Linux y sirve como máquina base para aplicaciones propias, herramientas internas y servicios de apoyo.",
      "SSH es la vía de administración remota; el uso diario se realiza con un usuario no root y privilegios elevados solo cuando hace falta.",
      "UFW limita la exposición del servidor a puertos concretos, normalmente SSH, HTTP y HTTPS.",
      "Dokploy orquesta proyectos Docker, dominios, logs, variables de entorno y despliegues desde una interfaz más operativa.",
      "Traefik recibe el tráfico web y lo enruta al contenedor correcto según dominio o subdominio, gestionando también HTTPS.",
      "Cloudflare gestióna DNS, proxy y protección perimetral de los dominios conectados al VPS.",
      "Cloudflare Zero Trust protege herramientas internas con políticas de identidad antes de permitir acceso al servicio.",
      "Tailscale crea una red privada para acceder a recursos que no necesitan estar expuestos públicamente.",
    ],
  },
  {
    slug: "project-flow",
    title: "Project Flow",
    category: "Workspace interno",
    shortLabel: "Project Flow",
    problem:
      "La operativa de una agencia se dispersa rápido: proyectos, tareas, bloqueos, solicitudes, aprobaciones, documentos internos y capacidad del equipo acaban viviendo en herramientas distintas o en conversaciones imposibles de auditar.",
    solution:
      "Workspace interno que centraliza proyectos, fases, tareas, planificación de capacidad, solicitudes entre departamentos, guidelines, plantillas, actividad y usuarios. Empezó como una app cliente y evolucionó a un sistema con Express, PostgreSQL, JWT, Docker y despliegue preparado para Dokploy.",
    description:
      "Sistema operativo de trabajo para gestión interna de agencias: proyectos, tareas, capacidad, solicitudes, conocimiento, plantillas y trazabilidad en un único workspace.",
    results: [
      { value: "11", label: "Vistas operativas" },
      { value: "8", label: "Entidades persistidas" },
      { value: "7", label: "Routers CRUD" },
    ],
    stack: ["React 19", "Vite", "Tailwind CSS 4", "Express", "PostgreSQL", "JWT", "bcrypt", "Docker", "Dokploy"],
    images: ["/screenshots/manager.png"],
    heroImage: "/screenshots/manager.png",
  },
  {
    slug: "control-horario-onya",
    title: "Control Horario Onya",
    category: "App móvil operativa",
    shortLabel: "Control Horario",
    problem:
      "En un hotel de Suiza el control horario seguía dependiendo de hojas en papel. Eso funcionaba para salir del paso, pero fallaba en lo importante: descansos poco claros, turnos partidos difíciles de revisar, olvidos corregidos a mano y poca visibilidad sobre horas reales, extras o déficit. El problema no era crear un formulario digital, sino convertir una rutina diaria en un sistema fiable para empleados, supervisores y administración.",
    solution:
      "Diseñé y desarrollé una app móvil con Expo y Supabase que cubre el ciclo completo: login por código, fichaje de entrada/salida/descanso, calendario, dashboard laboral, calculadora, solicitudes de corrección y panel administrativo por roles. La lógica horaria se centraliza para que empleado, supervisor y admin vean los mismos cálculos y las correcciones queden trazadas.",
    description:
      "App móvil de control horario para hostelería: fichajes digitales, descansos, turnos partidos, métricas laborales, solicitudes de corrección, horarios semanales y administración por roles sobre Supabase.",
    longDescription:
      "Control Horario Onya nace de una necesidad real vivida trabajando en un hotel en Suiza. El objetivo fue sustituir hojas sueltas por una app práctica para equipos de hostelería: rápida para fichar durante el turno, clara para consultar horas, descansos y extras, y suficientemente estructurada para que administración pudiera revisar registros, horarios y correcciones sin perder trazabilidad.",
    results: [
      { value: "7", label: "Flujos de empleado" },
      { value: "5", label: "Idiomás de interfaz" },
      { value: "3", label: "Roles operativos" },
    ],
    stack: ["React Native", "Expo", "TypeScript", "Supabase", "PostgreSQL", "Expo Router", "i18next", "AsyncStorage", "Haptics"],
    images: ["/screenshots/onya-phone.png"],
    heroImage: "/screenshots/onya-phone.png",
    imageFit: "contain",
    toolsIntro: "Elegí herramientas que me permitieran construir rápido una app móvil real, con backend gestionado, datos persistentes y una interfaz usable por perfiles no técnicos.",
    tools: [
      {
        title: "React Native y Expo",
        description: "Base móvil multiplataforma para construir una experiencia tipo app, probar rápido en dispositivo y mantener una única base de código preparada también para web.",
      },
      {
        title: "TypeScript",
        description: "Tipado para ordenar entidades como usuarios, fichajes, solicitudes, horarios y métricas, reduciendo errores en una app con mucha lógica de fechas.",
      },
      {
        title: "Supabase y PostgreSQL",
        description: "Backend gestionado con tablas relacionales para usuarios, clock_entries, requests y work_schedules, además de Storage para fotos de perfil.",
      },
      {
        title: "Expo Router y PagerView",
        description: "Rutas separadas para login y zona privada, con navegación por pestañas y swipe para que la app se sintiera natural en móvil.",
      },
      {
        title: "i18next",
        description: "Internacionalización en español, inglés, francés, alemán e italiano, pensando en equipos de hotel con trabajadores de distintos países.",
      },
      {
        title: "AsyncStorage y Haptics",
        description: "Persistencia local de sesión/preferencias y feedback táctil en acciones importantes como fichar, aprobar o guardar cambios.",
      },
    ],
    features: [
      {
        title: "Acceso por código",
        description: "Implementé un login por PIN de 5 dígitos porque en un entorno hotelero el acceso tenía que ser inmediato. Cada empleado tiene un código, sesión local y rol asociado: worker, supervisor o admin.",
      },
      {
        title: "Fichaje guiado",
        description: "La pantalla principal decide qué acciones mostrar según el último registro del día. No obliga al trabajador a entender la base de datos: solo ve entrada, salida, descanso o segundo turno cuando toca.",
      },
      {
        title: "Descansos y turnos partidos",
        description: "El cálculo no es una resta simple. Separé la lógica en un módulo propio para descontar descansos, soportar turnos partidos y mantener el mismo resultado en fichaje, calendario, dashboard y panel admin.",
      },
      {
        title: "Dashboard laboral",
        description: "Construí métricas por semana, mes o rango personalizado: horas trabajadas, descanso, extras o déficit frente a horas esperadas, asistencia, días trabajados y promedio diario.",
      },
      {
        title: "Solicitudes de corrección",
        description: "Si alguien olvida fichar, no se edita el historial de forma opaca. El empleado crea una solicitud con fecha, hora, tipo y motivo; el responsable la revisa y al aprobarla se genera un fichaje manual vinculado.",
      },
      {
        title: "Horarios semanales",
        description: "Añadí planificación semanal por empleado, grupos operativos y turnos. Esto permite consultar horarios de cocina, housekeeping, service y dirección desde la misma app.",
      },
    ],
    featuresIntro:
      "El objetivo no era hacer una demo de fichaje, sino cubrir el ciclo completo que aparece en un hotel: registrar, revisar, corregir, calcular y planificar.",
    processIntro:
      "El proyecto salió de observar una fricción real y convertirla en producto. Primero entendí el flujo manual, después lo traduje a datos, pantallas y reglas de negocio.",
    process: [
      {
        title: "Observé el proceso en papel",
        description: "Partí del uso real: trabajadores apuntando horas, responsables revisando hojas y dudas frecuentes sobre descansos, turnos partidos u horas extra.",
      },
      {
        title: "Definí los usuarios y permisos",
        description: "Separé trabajador, supervisor y administrador para que cada perfil viera solo lo que necesitaba: fichar y consultar, revisar solicitudes o gestionar horarios.",
      },
      {
        title: "Diseñé el modelo de datos",
        description: "Pasé el problema a tablas relacionales: users, clock_entries, requests y work_schedules, con estados, relaciones e índices para consultar por usuario y fecha.",
      },
      {
        title: "Construí el flujo móvil",
        description: "Prioricé una pantalla de fichaje simple, botones grandes, reloj visible y acciones contextuales para que el uso diario fuera rápido incluso en mitad del trabajo.",
      },
      {
        title: "Centralicé el cálculo horario",
        description: "Creé una utilidad compartida para calcular horas netas y descansos. Así evité que el dashboard, calendario y panel admin dieran resultados distintos.",
      },
      {
        title: "Cerré el circuito administrativo",
        description: "Añadí solicitudes, aprobación individual o en lote, creación automática de fichajes manuales y consulta de resúmenes por empleado para que el sistema fuera operativo.",
      },
    ],
    challengesIntro:
      "Las partes difíciles no estuvieron solo en la interfaz, sino en convertir reglas humanas y excepciones del día a día en lógica consistente.",
    challenges: [
      {
        title: "No todos los días son iguales",
        description: "Había que soportar turno simple, turno partido, descansos explícitos, descansos obligatorios y jornadas que todavía no están cerradas.",
      },
      {
        title: "Fechas y zonas horarias",
        description: "Agrupar por día usando fechas locales fue clave. Un fichaje guardado en ISO no siempre debe agruparse por el día UTC, especialmente en una app móvil.",
      },
      {
        title: "Correcciones sin perder trazabilidad",
        description: "La duda era si permitir editar fichajes directamente. Opté por solicitudes con estado y aprobación, porque genera historial y evita cambios invisibles.",
      },
      {
        title: "Simplicidad para empleados",
        description: "La app tenía que funcionar para personas que no quieren aprender un sistema nuevo. Por eso el login es por código y el fichaje muestra pocas acciones, pero bien elegidas.",
      },
      {
        title: "Panel admin dentro de la misma app",
        description: "En vez de crear una herramienta separada, integré administración, solicitudes, horarios y resúmenes en el mismo producto, protegido por roles.",
      },
      {
        title: "Equipo internacional",
        description: "El hotel podía tener trabajadores de varios países, así que añadí cinco idiomas desde el principio para que la app no dependiera solo del español.",
      },
    ],
    architectureIntro:
      "La arquitectura separa pantallas, servicios, base de datos y cálculo horario para que cada parte pueda evolucionar sin mezclar responsabilidades.",
    architecture: [
      "app/(auth) contiene el acceso por código y app/(tabs) agrupa fichaje, dashboard, calendario, horarios, calculadora, solicitudes y perfil.",
      "services/* actúa como capa de negocio: auth.service, clock.service, dashboard.service, request.service, admin.service, schedule.service, user.service y profile-picture.service.",
      "lib/supabase.ts centraliza el cliente Supabase y los tipos principales para User, ClockEntry y Request.",
      "database/*.sql documenta la estructura de PostgreSQL: usuarios, fichajes, solicitudes, horarios, campos extra, políticas e índices.",
      "utils/timeCalculator.ts calcula horas trabajadas, descansos explícitos y descansos automáticos para turno simple o partido.",
      "locales/es|en|fr|de|it mantiene la interfaz traducida y AsyncStorage guarda el idioma elegido por el usuario.",
    ],
  },
  {
    slug: "avora",
    title: "AVORA",
    category: "Plataforma B2B Multi-App",
    shortLabel: "AVORA",
    problem:
      "Las marcas de eventos nocturnos dependen de equipos de RRPP que deben publicar el material oficial en Instagram, pero no existia forma automatica de saber si lo habian hecho de verdad. Confiar en un 'si, ya lo subi' bastaba para perder trazabilidad, dejar sin medir el cumplimiento y aceptar que la promocion podia no estar pasando. Tampoco habia manera de distinguir un RRPP cumplidor de uno que simplemente ignoraba la tarea.",
    solution:
      "Plataforma multi-app con verificacion visual automatica. Una app movil para gestores de marca, un dashboard web operativo, un backend Supabase con RLS estricta y dos microservicios Python: uno compara cada Historia de Instagram contra el poster oficial usando embeddings de ResNet50, y otro monitoriza cuentas con sesiones cifradas y fingerprint de dispositivo para no caer en baneos en cadena.",
    description:
      "Plataforma B2B para empresas de eventos nocturnos: app movil Expo, dashboard web Next.js, backend Supabase con RLS y microservicios Python que verifican visualmente que cada RRPP publique el material oficial en Instagram.",
    longDescription:
      "AVORA nacio para cerrar la distancia entre lo que una marca de eventos pide a sus RRPP y lo que realmente pasa en Instagram. La app permite crear marcas, eventos, tareas y asignaciones; el sistema verifica cada Historia con vision por computador y reporta el cumplimiento en tiempo real, sin perseguir a nadie por WhatsApp.",
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
      "/screenshots/avora-dashoard.png",
      "/screenshots/avora-login-desktop.png",
      "/screenshots/avora-login-mobile.png",
      "/screenshots/avora-rrpp.png",
      "/screenshots/avora-tareas.png",
    ],
    heroImage: "/screenshots/avora-dashoard.png",
    imageFit: "contain",
    toolsIntro:
      "Elegi herramientas que me permitieran entregar dos apps, un backend robusto y servicios de IA sin pagar infra cloud durante el desarrollo.",
    tools: [
      {
        title: "Expo y React Native",
        icon: "terminal",
        description:
          "Base de la app movil. Expo Router para rutas, Reanimated para microinteracciones y expo-image para portadas y logos sin caches rotos.",
      },
      {
        title: "Next.js 14",
        icon: "route",
        description:
          "Dashboard web con App Router, Server Components para listados y Route Handlers para los endpoints de OAuth, monitor y WhatsApp.",
      },
      {
        title: "Supabase y PostgreSQL",
        icon: "cloud",
        description:
          "Backend gestionado: Auth, Postgres con RLS, Storage para logos y portadas, Realtime para refrescar KPIs. 21 tablas, 6 vistas y 35 politicas activas.",
      },
      {
        title: "PyTorch y ResNet50 (SSCD)",
        icon: "server",
        description:
          "Microservicio Python con FastAPI que envuelve el modelo SSCD de Facebook AI Research. Convierte cada Historia en un vector de 512 dims y devuelve la similitud coseno frente al poster oficial.",
      },
      {
        title: "instagrapi con fingerprint",
        icon: "shield",
        description:
          "Microservicio Python que monitoriza Historias desde una cuenta dedicada. La sesion se guarda cifrada con AES-256-GCM y cada cuenta lleva su proxy y su propio dispositivo Android para evitar baneos en cadena.",
      },
      {
        title: "Docker y Turborepo",
        icon: "deploy",
        description:
          "Monorepo pnpm + Turborepo para que web y movil compartan tipos, queries y design tokens. Los microservicios Python viven en docker-compose con healthcheck y volumenes persistentes.",
      },
    ],
    featuresIntro:
      "Lo que AVORA resuelve de verdad no es mostrar KPIs, sino cerrar el ciclo entre lo que se pide, lo que se publica y lo que se puede demostrar que se hizo.",
    features: [
      {
        title: "Verificacion visual de Historias",
        description:
          "Cuando un RRPP sube una Historia, el sistema la descarga, calcula un embedding ResNet50 y la compara con el poster oficial. Si la similitud supera el umbral, la tarea pasa a completada sin que nadie tenga que aprobarla a mano.",
      },
      {
        title: "Login con doble rol",
        description:
          "Una sola app con dos entradas: Empresa para dueños de marca y RRPP para invitados por enlace. La sesion se mantiene en el dispositivo y la UI cambia segun el rol detectado en el JWT.",
      },
      {
        title: "Onboarding visual multi-paso",
        description:
          "El primer ingreso guia paso a paso: alta de empresa, alta de marca con logo y genero musical, alta de evento con portada, fecha y direccion geocodificada. Cada paso previsualiza el resultado antes de confirmar.",
      },
      {
        title: "Dashboard con 4 KPIs en vivo",
        description:
          "Cumplimiento medio, historias verificadas en los ultimos 7 dias, RRPP activos y alertas abiertas. Los numeros se calculan desde vistas SQL agregadas y se refrescan con pull-to-refresh sin recargar la app.",
      },
      {
        title: "RRPP con invitacion reutilizable",
        description:
          "La empresa genera un enlace, lo comparte y el RRPP se da de alta cuando entra. La invitacion caduca a los 30 dias, no exige email previo y captura el opt-in de WhatsApp en el mismo formulario.",
      },
      {
        title: "Tareas auto-asignadas",
        description:
          "Crear una tarea dispara un trigger en PostgreSQL que genera una asignacion por cada RRPP activo del evento. Asignar un RRPP nuevo a un evento existente le crea sus tareas de forma idempotente, sin duplicados.",
      },
    ],
    processIntro:
      "El proyecto fue creciendo capa a capa: primero el modelo de datos y la auth, despues la web, luego la app movil y al final los microservicios que justifican el nombre del producto.",
    process: [
      {
        title: "Defini el modelo multi-tenant",
        description:
          "Empece por las tablas y las relaciones: empresa, marca, evento, RRPP, tarea, asignacion y verificacion. Decidi desde el principio que cada consulta debia pasar por RLS, sin excepciones para el backend.",
      },
      {
        title: "Monte Supabase y las politicas RLS",
        description:
          "Levante el proyecto Supabase Cloud, defini 21 tablas, las vistas agregadas para KPIs y las 35 politicas RLS. Aqui aparecio la primera recursion y tuve que extraer subqueries a funciones SECURITY DEFINER.",
      },
      {
        title: "Construi el dashboard web",
        description:
          "Next.js con App Router para el panel de gestion: dashboard, marcas, eventos, RRPP, tareas y configuracion. Login con email y contrasena, OAuth de Google y Apple marcados como 'proximamente' para no romper el flujo principal.",
      },
      {
        title: "Desarrolle la app movil",
        description:
          "Expo con Expo Router para la app del gestor de marca. Login con tab Empresa/RRPP, onboarding de marca y evento en dos pasos, dashboard con 4 KPIs y pantalla de ajustes. Los tabs Equipo, Eventos y Alertas son stubs por ahora.",
      },
      {
        title: "Entrene el verificador visual",
        description:
          "Levante el microservicio SSCD con PyTorch y ResNet50, expuse /embed y probe con posters y capturas reales. Los umbrales quedaron en 0.5 para exito, 0.4 a 0.5 para warning y menos de 0.4 para alerta.",
      },
      {
        title: "Cerre el monitor de Instagram",
        description:
          "El microservicio instagrapi se encarga de iniciar sesion con cookies cifradas, mantener un fingerprint Android por cuenta y descargar las Historias de los candidatos para que el verificador las compare.",
      },
    ],
    challengesIntro:
      "Las decisiones importantes de AVORA no fueron tecnologicas, sino operativas: que cuenta vigila que cuenta, como demostrar cumplimiento sin caer en baneos y como separar lo publico de lo privado.",
    challenges: [
      {
        title: "Verificar Historias de cuentas privadas",
        description:
          "Meta no expone las Historias de cuentas privadas por la Graph API. La salida fue monitorizar desde una cuenta dedicada, cifrar la sesion y descargar el media por debajo para que el verificador pudiera trabajar.",
      },
      {
        title: "Evitar baneos en cadena",
        description:
          "Instagram penaliza patrones repetidos rapido. Cada cuenta monitorizada lleva proxy propio, fingerprint Android unico y una cadencia aleatoria de 20 a 50 minutos para no parecer un bot.",
      },
      {
        title: "RLS sin recursiones",
        description:
          "El primer intento de politicas caia en recursion infinita al cruzar empresa, marca y evento. Lo solucione extrayendo cada cruce a una funcion SECURITY DEFINER y llamandola desde las politicas.",
      },
      {
        title: "Auto-asignacion sin duplicados",
        description:
          "Una tarea nueva debia asignarse a todos los RRPP activos y un RRPP nuevo debia recibir las tareas ya creadas. Lo resolvi con ON CONFLICT en el trigger para que ambas direcciones sean idempotentes.",
      },
      {
        title: "Dos apps, un solo backend",
        description:
          "Web y movil no podian divergir en tipos ni en queries. Movi todo a un monorepo con paquetes compartidos: types, supabase-queries y design tokens. La web va en React 18 y la app ya corre en React 19.",
      },
      {
        title: "Costes de inferencia bajo control",
        description:
          "El modelo SSCD pesa alrededor de 110 MB y cada comparacion cuesta GPU. Cachee el embedding del poster oficial y limite el numero de candidatos por ejecucion para que el coste no escale con cada RRPP.",
      },
    ],
    evidenceIntro:
      "Las capturas conectan la explicacion con el producto real: el dashboard con KPIs, el login en sus dos formatos, la gestion de RRPP con invitacion reutilizable y la pantalla de tareas con cumplimiento por evento.",
    evidenceEyebrow: "Producto en uso",
    evidenceTitle: "Capturas reales de web y movil",
    evidence: [
      {
        title: "Dashboard web con 4 KPIs",
        description:
          "La imagen muestra el panel principal con cumplimiento medio, historias verificadas en 7 dias, RRPP activos y alertas. Es la vista que abre la web y la que mejor resume el estado operativo de una marca en un vistazo.",
        image: "/screenshots/avora-dashoard.png",
        alt: "Dashboard web de AVORA con 4 KPIs y listado de eventos activos",
      },
      {
        title: "Login de escritorio con doble rol",
        description:
          "El login web separa Empresa y RRPP con un tab segmentado y refuerza la identidad con fondos de evento. La idea es que la herramienta se sienta hecha por y para gente que trabaja en este sector.",
        image: "/screenshots/avora-login-desktop.png",
        alt: "Pantalla de login de AVORA en escritorio con tab Empresa y RRPP",
      },
      {
        title: "Login en la app movil",
        description:
          "La app reutiliza el mismo patron de doble tab adaptado a pantalla pequena. El branding se mantiene y el footer refuerza que es una herramienta profesional, no una red social mas.",
        image: "/screenshots/avora-login-mobile.png",
        alt: "Pantalla de login de AVORA en la app movil con doble tab",
      },
      {
        title: "Gestion de RRPP e invitaciones",
        description:
          "Aqui se ve la tabla con cumplimiento por RRPP, alcance y enlaces de invitacion reutilizables. La empresa controla quien esta dentro, como va cada uno y como invitar a uno nuevo sin escribir un email.",
        image: "/screenshots/avora-rrpp.png",
        alt: "Pantalla de gestion de RRPP con invitacion reutilizable en AVORA",
      },
      {
        title: "Tareas con vista Cards y Tabla",
        description:
          "La pantalla de tareas muestra el diseno oficial como referencia, el porcentaje de cumplimiento por tarea y filtros por marca, evento, fecha y tipo de contenido. La empresa ve de un vistazo lo que se ha pedido y lo que se ha entregado.",
        image: "/screenshots/avora-tareas.png",
        alt: "Pantalla de tareas de AVORA con cards por evento y filtros",
      },
    ],
    architectureIntro:
      "La arquitectura separa apps, backend gestionado y microservicios Python, con tipos y queries compartidos en el monorepo para que web y movil nunca diverjan.",
    architecture: [
      "App movil Expo con Expo Router, Supabase JS y AsyncStorage para sesion offline. Comparte tipos con el dashboard y consume las mismas funciones de Supabase.",
      "Dashboard web en Next.js 14 con App Router, React Hook Form y Zod para formularios. Middleware de Supabase SSR protege rutas privadas antes de renderizar.",
      "Supabase como backend: Postgres con 21 tablas, 6 vistas agregadas, 35 politicas RLS, Storage para logos y portadas, Auth con email y OAuth pendiente de aprobacion.",
      "Microservicio SSCD en Python con FastAPI y PyTorch. Carga el modelo ResNet50+GeM entrenado por Facebook AI Research, expone /embed y devuelve vectores L2-normalizados para comparar.",
      "Microservicio IG Monitor en Python con instagrapi. Mantiene una cuenta dedicada por empresa, cifra la sesion con AES-256-GCM y descarga Historias por candidato para que SSCD las verifique.",
      "docker-compose levanta los dos microservicios con healthcheck y volumenes para modelos y sesiones. El monorepo pnpm + Turborepo coordina web, movil y los paquetes compartidos.",
    ],
    ctaTitle: "Tienes una marca con equipo de RRPP?",
    ctaDescription:
      "AVORA resuelve exactamente eso: trazabilidad real, cumplimiento medible y verificacion visual sin perseguir a nadie por WhatsApp.",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
