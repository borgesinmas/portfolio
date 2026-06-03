# Portfolio — Luis Martínez

Portfolio personal de **Luis Martínez**, *Ingeniero de Automatización e IA*. Una web con casos de estudio de proyectos reales: automatización con n8n, sistemas con IA, plataformas full-stack, apps móviles e infraestructura.

Construido con **Next.js 14 (App Router)**, **TypeScript** y **Tailwind CSS**.

---

## Stack

| Capa | Tecnología |
|------|------------|
| Framework | Next.js 14.2 (App Router, React Server Components) |
| Lenguaje | TypeScript 5 |
| Estilos | Tailwind CSS 3.4 + tokens CSS propios (`src/styles/tokens.css`) |
| Formularios | react-hook-form + zod |
| Email | Resend (formulario de contacto) |
| Iconos | lucide-react |
| Fuentes | Geist (local) + JetBrains Mono |

---

## Requisitos

- **Node.js** 18.18+ (recomendado 20+)
- **pnpm** (gestor oficial de este repo — no uses npm ni yarn)

```bash
npm install -g pnpm
```

---

## Puesta en marcha

```bash
# 1. Instalar dependencias
pnpm install

# 2. Crear el archivo de variables de entorno
cp .env.example .env.local
# y rellenar RESEND_API_KEY con tu clave de https://resend.com/api-keys

# 3. Arrancar el servidor de desarrollo
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000).

---

## Scripts

```bash
pnpm dev      # Servidor de desarrollo
pnpm build    # Build de producción
pnpm start    # Sirve el build de producción
pnpm lint     # ESLint
```

---

## Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `RESEND_API_KEY` | Clave de API de Resend para enviar los emails del formulario de contacto. |

El secreto real vive en `.env.local` (ignorado por git). Ver `.env.example` como plantilla.

---

## Estructura

```
src/
├── app/
│   ├── layout.tsx              # Layout raíz (fuentes, metadata, SEO)
│   ├── page.tsx                # Home (compone las secciones)
│   ├── api/contact/route.ts    # Endpoint del formulario (Resend + Zod + rate limit)
│   └── projects/
│       ├── [slug]/page.tsx     # Ruta dinámica: genera el caso de estudio desde los datos
│       └── <slug>/page.tsx     # Páginas a medida para proyectos concretos
├── components/                 # Secciones y UI (Hero, Navbar, Work, Contact, ...)
├── lib/projects.ts             # Fuente de verdad de todos los proyectos
└── styles/tokens.css           # Tokens de diseño
public/screenshots/             # Imágenes (WebP optimizado) y logos
```

---

## Añadir un proyecto

1. Añade una entrada al array `PROJECTS` en [`src/lib/projects.ts`](src/lib/projects.ts).
2. El proyecto obtiene automáticamente su URL única en `/projects/<slug>`, generada por la ruta dinámica `app/projects/[slug]/page.tsx`.
3. Solo si necesita un diseño a medida, crea una página propia en `app/projects/<slug>/page.tsx` (tiene prioridad sobre la dinámica).

---

## Imágenes

Las imágenes de `public/screenshots/` están en **WebP optimizado**. Si añades nuevas, conviértelas a WebP (calidad ~85) antes de subirlas para mantener el peso bajo. `next/image` sirve además AVIF/WebP automáticamente según el navegador.

---

## Despliegue

Pendiente de decidir plataforma. [Vercel](https://vercel.com/new) es la opción más directa para Next.js. Antes de desplegar, actualiza el dominio en `metadataBase` (`src/app/layout.tsx`) y el remitente/destinatario del email en `src/app/api/contact/route.ts`, y configura `RESEND_API_KEY` en la plataforma.

---

> La guía de trabajo para asistentes de IA (Claude Code) está en [`CLAUDE.md`](CLAUDE.md).
