import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";
import { BackToTop } from "@/components/BackToTop";
import "./globals.css";

const geist = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-sans",
  display: "swap",
  weight: "100 900",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://luismartinez.dev"),
  title: "Luis Martínez — Ingeniero de Automatización e IA",
  description: "Construyo sistemas con IA y n8n que automatizan procesos, conectan datos y eliminan tareas repetitivas.",
  openGraph: {
    title: "Luis Martínez — Ingeniero de Automatización e IA",
    description: "Construyo sistemas con IA y n8n que automatizan procesos, conectan datos y eliminan tareas repetitivas.",
    type: "website", locale: "es_ES",
    images: [{ url: "/og-image.svg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "Luis Martínez", images: ["/og-image.svg"] },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width", initialScale: 1, themeColor: "#090C10",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geist.variable} ${mono.variable}`}>
      <body className="bg-bg-primary text-text-primary antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-accent focus:text-white focus:px-4 focus:py-2 focus:rounded-full">
          Saltar al contenido
        </a>
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
