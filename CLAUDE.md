# CLAUDE.md — Portfolio de Luis Martínez

> Guía operativa para Claude Code en este repositorio.
> Idioma de trabajo: **español** (respuestas, comentarios y commits).
> Este archivo tiene prioridad sobre las reglas globales cuando entren en conflicto (ver sección *Cómo quiero que trabajes*).

---

## 1. Qué es este proyecto

Portfolio personal de **Luis Martínez**, construido con **Next.js 14 (App Router) + TypeScript + Tailwind CSS**.

Es una web de una sola página principal (con secciones) más una sección de **casos de estudio** de proyectos reales. El portfolio **seguirá creciendo**: se añadirán proyectos nuevos con frecuencia.

### Objetivo del portfolio (importante para el contenido)

Tiene **doble propósito comercial**, y todo lo que escribamos debe servir a ambos:

1. **Captar clientes** que quieran que Luis les construya sistemas (automatización, IA, web, apps).
2. **Encontrar trabajo real para empresas** (mostrar que sabe entregar producto de principio a fin).

Implicaciones prácticas:
- El contenido prioriza **resultados y problemas resueltos**, no solo "tecnologías que conozco".
- La conversión clave es el **formulario de contacto**. No lo rompas y cuídalo.
- El tono es profesional pero cercano, en español de España, en primera persona ("construí", "diseñé").

---

## 2. Quién es Luis (contexto para generar contenido)

**Posicionamiento:** *Ingeniero de Automatización e IA*. Construye sistemas con IA y n8n que automatizan procesos, conectan datos y eliminan tareas repetitivas.

**Perfil técnico real** (lo que ha construido, visible en `src/lib/projects.ts`):
- **Full-stack web**: Next.js, React, TypeScript, Express/NestJS, PostgreSQL, Tailwind.
- **Automatización**: n8n (+10 flujos), scraping con Python/Playwright/FastAPI.
- **IA aplicada**: OpenAI, Claude API, visión por computador (PyTorch/ResNet50).
- **Apps móviles**: React Native + Expo + Supabase.
- **Infra/DevOps**: VPS (Contabo/Ubuntu), Docker, Dokploy, Traefik, Cloudflare, Tailscale, Zero Trust.
- **Producto end-to-end**: pagos (Stripe), CRM (Twenty), portales privados, seguridad multicapa.

Cuando redactes texto de marca, casos de estudio o copy, **mantén este posicionamiento** y este nivel técnico. Si dudas de un dato técnico de un proyecto, **pregúntame** antes de inventarlo.

---

## 3. Stack tecnológico

| Capa | Tecnología |
|------|------------|
| Framework | Next.js **14.2.35** (App Router, RSC) |
| Lenguaje | TypeScript 5 (estricto) |
| Estilos | Tailwind CSS 3.4 + tokens CSS propios |
| Formularios | react-hook-form + zod + @hookform/resolvers |
| Iconos | lucide-react |
| Email (contacto) | resend |
| Fuentes | Geist (local) + JetBrains Mono (Google) |
| Gestor de paquetes | **pnpm** (oficial — ver nota abajo) |

> **Gestor de paquetes:** este repo usa **pnpm** (`pnpm-lock.yaml`). No uses `npm install` ni `yarn`: generan lockfiles en conflicto. El `package-lock.json` se eliminó a propósito.

### Nota sobre animación / 3D

El proyecto **ya no tiene** librerías de animación ni 3D. Se eliminaron por estar sin usar: `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`, `maath`, `gsap`, `framer-motion`, `lenis`, `clsx`, `tailwind-merge`.

Si en un rediseño quieres movimiento/3D, vuelve a instalar la que toque (`pnpm add framer-motion`, `gsap`, etc.). Son un comando.

---

## 4. Estructura del proyecto

```
src/
├── app/
│   ├── layout.tsx              # Root layout: fuentes, metadata, skip-link, BackToTop
│   ├── page.tsx                # Home (compone las secciones)
│   ├── globals.css             # Estilos globales + clases .card, etc.
│   ├── not-found.tsx           # 404
│   ├── api/contact/route.ts    # Endpoint del formulario (Resend + Zod + rate limit)
│   └── projects/
│       ├── layout.tsx
│       ├── [slug]/page.tsx     # Ruta DINÁMICA: renderiza cualquier proyecto de PROJECTS
│       └── <slug>/page.tsx     # Páginas A MEDIDA para proyectos concretos
├── components/                 # Secciones y UI (Hero, Navbar, Work, Contact, ...)
├── lib/
│   └── projects.ts             # ⭐ FUENTE DE VERDAD de todos los proyectos (array PROJECTS)
└── styles/
    └── tokens.css              # Tokens de diseño (colores, radios, espaciado)
public/
├── screenshots/                # Capturas y logos de los proyectos
└── fonts/                      # GeistVF.woff, GeistMonoVF.woff
```

---

## 5. ⭐ Cómo añadir un proyecto nuevo (receta)

Esto es lo más frecuente. El sistema de routing es **híbrido y se queda como está**:

1. **Siempre** se añade una entrada al array `PROJECTS` en `src/lib/projects.ts`. Esa es la fuente de verdad: alimenta la sección *Work* de la home y la ruta dinámica.
2. Cada proyecto tiene una **URL única**: `/projects/<slug>` (el campo `slug` del objeto).
3. **Por defecto** la página la genera automáticamente la ruta dinámica `src/app/projects/[slug]/page.tsx` a partir de los datos del objeto (`generateStaticParams` la pre-renderiza). No hace falta crear archivos: con rellenar bien los campos del `Project`, el caso de estudio funciona.
4. **Solo si** un proyecto necesita un diseño a medida que el template genérico no cubre, se crea una página propia en `src/app/projects/<slug>/page.tsx`. En Next.js el segmento estático (`<slug>`) **tiene prioridad** sobre el dinámico `[slug]`, así que esa página sobreescribe a la genérica para esa URL.

### Estado actual (para que lo sepas, no para tocarlo salvo que te lo pida)
- Tienen página a medida: `growork`, `email-operations-os`, `n8n-workflows`, `swiss-hotel-job-scraper`, `command-center`, `project-flow`, `portal-clientes`.
- Solo viven en la ruta dinámica: `servidores-vps`, `control-horario-onya`, `avora`.
- ⚠️ Inconsistencia conocida: `portal-clientes` tiene página a medida pero **no** está en `PROJECTS`. Lo dejamos así por ahora (decisión del usuario).

### El modelo `Project`
Está tipado en `src/lib/projects.ts`. Campos obligatorios: `slug`, `title`, `category`, `shortLabel`, `problem`, `solution`, `description`, `results`, `stack`, `images`, `heroImage`. El resto (`features`, `tools`, `process`, `challenges`, `evidence`, `architecture`, CTA...) son opcionales y el template los muestra solo si existen.

---

## 6. Sistema de diseño

> El usuario tiene **libertad de diseño** y valora el diseño actual en **7/10** → hay margen para mejorarlo. Pero mantén la coherencia salvo que acordemos un rediseño.

- **Tema:** oscuro. Fondo base `#090C10`, acento esmeralda `#10B981`.
- **Tokens:** definidos en `src/styles/tokens.css` y mapeados en `tailwind.config.ts` (`bg-*`, `text-*`, `accent`, `border`, etc.). **Usa los tokens / clases de Tailwind del tema**, no colores hardcodeados sueltos.
- **Tipografía:** `font-sans` = Geist, `font-mono` = JetBrains Mono (se usa mucho para *eyebrows* y etiquetas en mayúsculas).
- **Patrones visuales:** tarjetas `.card`, secciones con `max-w-content` (1400px), *eyebrow* mono en mayúsculas + título grande, animaciones en `transform`/`opacity`.
- **Idioma de la UI:** español (`<html lang="es">`).
- Si propones un rediseño, prioriza jerarquía, ritmo y profundidad; evita el look "plantilla genérica".

---

## 7. Comandos

```bash
pnpm dev      # servidor de desarrollo (localhost:3000)
pnpm build    # build de producción
pnpm start    # servir el build
pnpm lint     # ESLint (next lint)
```

No hay scripts de test (validación manual — ver sección Testing).

---

## 8. ⭐ Cómo quiero que trabajes (LO MÁS IMPORTANTE)

Estas son preferencias explícitas del usuario. Tienen prioridad sobre las reglas globales de `~/.claude/rules`.

1. **Idioma:** todo en **español** — tus respuestas, los comentarios del código y los mensajes de commit.
2. **Actúa directamente.** No esperes mi OK para empezar: haz los cambios. (No necesitas "modo plan" salvo que el cambio sea grande y ambiguo).
3. **Explica el porqué (didáctico).** No solo digas qué cambiaste: explica el razonamiento, las alternativas y por qué elegiste una. Trátalo como enseñanza.
4. **Si no lo tienes claro, pregúntame.** Ante datos técnicos de proyectos, decisiones de producto o ambigüedad real, pregunta antes de inventar. Mejor una pregunta corta que una suposición equivocada.
5. **Usa agentes especializados** de forma proactiva cuando aporten (planner, code-reviewer, security-reviewer, build-error-resolver, performance-optimizer, etc.), y en paralelo si las tareas son independientes.
6. **Tienes permisos totales.** Puedes ejecutar cualquier comando (dev, build, lint, git, instalar/quitar dependencias, mover/borrar archivos) sin pedir permiso. Aun así, avisa de lo que haces y por qué.
7. **Pragmatismo sobre dogma.** Este es un portfolio personal, no un sistema enterprise. Las reglas globales pesadas (TDD obligatorio, 80% de cobertura, etc.) **no aplican aquí** salvo que yo lo pida. Prioriza: que funcione, que se vea bien, que el código sea legible.

### Convenciones de código (ligeras)
- TypeScript con tipos en las APIs públicas; evita `any` (usa `unknown` + validación).
- Componentes en PascalCase, hooks con prefijo `use`, constantes en `UPPER_SNAKE_CASE`.
- Inmutabilidad por defecto (spread en vez de mutar).
- Archivos enfocados; si uno crece mucho, propón extraer.
- Valida la entrada en los límites del sistema (el endpoint de contacto ya usa Zod — síguelo).

### Git / commits
- Mensajes en **español**, formato convencional: `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`, `perf:`.
- Haz commits cuando lo pida o cuando cierres una unidad de trabajo coherente; descríbelos bien.

---

## 9. Testing

**No hay tests y no es prioridad.** El usuario **valida manualmente** (visual y funcionalmente). No introduzcas frameworks de test ni exijas cobertura salvo que te lo pida expresamente. Si un cambio es delicado, verifica con `pnpm build` y revisando en `pnpm dev`.

---

## 10. Seguridad y variables de entorno

- **Variables:** ver `.env.example`. La única necesaria hoy es `RESEND_API_KEY` (para el formulario de contacto). El secreto real vive en `.env.local` (no se sube).
- El destinatario y el remitente del email están en `src/app/api/contact/route.ts`.
- Cabeceras de seguridad básicas configuradas en `next.config.mjs` (X-Frame-Options, HSTS, etc.).
- **Nunca** hardcodees secretos en el código. **Nunca** subas `.env.local`.
- El endpoint de contacto ya tiene rate limit + validación Zod: mantén ese nivel.

---

## 11. Despliegue

⚠️ **Aún sin decidir.** El dominio `luismartinez.dev` que aparece en `src/app/layout.tsx` (`metadataBase`) y en el remitente del email **es un placeholder, no es real**. Antes de un despliegue real hay que decidir plataforma (Vercel sería lo más directo para Next.js; el usuario también maneja VPS propio con Dokploy) y actualizar:
- `metadataBase` y URLs en `layout.tsx`.
- El `from`/`to` del email en `api/contact/route.ts`.
- Las variables de entorno en la plataforma elegida.

---

## 12. Archivos que NO se suben a GitHub (pero se quedan en local)

Por decisión del usuario, estos archivos **deben permanecer en el disco** pero **no subirse al repo**. Están en `.gitignore` y se han quitado del control de versiones (`git rm --cached`):

- `*.dev-*.log` (logs de desarrollo en la raíz)
- `ANALISIS_PROYECTO_GROWORK.md`
- `Luis Martinez Borges - English CV.pdf`

No vuelvas a añadirlos al índice de git.

---

## 13. Deuda técnica conocida / cosas a tener en cuenta

- **Routing híbrido** con la inconsistencia de `portal-clientes` (sección 5): tiene página a medida pero no está en `PROJECTS`. Se deja así por decisión del usuario.
- **`pnpm-workspace.yaml`** contiene solo un `allowBuilds` placeholder; es inofensivo.
- **`growork.mp4`** (~9,6 MB) en `public/screenshots/` es el activo más pesado. Es vídeo, queda fuera de la optimización de imágenes; si pesa demasiado, valorar comprimirlo o servirlo externamente.

### Limpiezas ya hechas (junio 2026)
- ✅ Eliminadas las dependencias muertas de animación/3D (sección 3).
- ✅ Imágenes de `public/screenshots/` convertidas a **WebP** (~15 MB → ~3 MB, -80%) y todas las referencias actualizadas.
- ✅ `README.md` reescrito (ya no es el de `create-next-app`).
- ✅ Lockfile duplicado (`package-lock.json`) eliminado; pnpm es el oficial.
