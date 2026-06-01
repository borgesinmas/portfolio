const SERVICES = [
  {
    title: "Automatización con IA",
    desc: "Flujos de trabajo inteligentes con n8n, OpenAI y Claude que procesan datos, envían emails, actualizan CRMs y toman decisiones automáticamente.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    title: "CRMs y Herramientas Internas",
    desc: "Sistemas de gestión de clientes, pipelines de ventas y herramientas internas personalizadas. Con WhatsApp, email y dashboards integrados.",
    icon: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z",
  },
  {
    title: "Dashboards y Analítica",
    desc: "Paneles de control en tiempo real que conectan tus fuentes de datos y te muestran exactamente lo que necesitas saber para decidir.",
    icon: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z",
  },
  {
    title: "Web Scraping y Datos",
    desc: "Scrapers distribuidos que extraen datos de cualquier fuente, los normalizan y los almacenan donde los necesitas. Pipelines ETL completos.",
    icon: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z",
  },
  {
    title: "Infraestructura",
    desc: "Servidores VPS, Docker, Cloudflare, DNS, SSL, backups automáticos. Todo lo necesario para que tus sistemas estén online, seguros y escalando.",
    icon: "M20 13h-7V6h-2v7H4v2h7v7h2v-7h7v-2z",
  },
  {
    title: "Consultoría técnica",
    desc: "¿No sabes por dónde empezar? Te ayudo a diseñar la arquitectura, elegir herramientas y planificar la automatización de tus procesos.",
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z",
  },
];

export function Services() {
  return (
    <section id="services" className="py-20 sm:py-28 bg-bg-secondary">
      <div className="max-w-content mx-auto px-6">
        <div className="mb-14">
          <p className="text-sm font-mono text-accent-light mb-3">Servicios</p>
          <h2 className="section-heading mb-4">Lo que construyo</h2>
          <p className="section-sub">Sistemas completos que automatizan procesos, conectan datos y eliminan el trabajo manual repetitivo.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((s) => (
            <div key={s.title} className="card card-lg p-6">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-accent-light">
                  <path d={s.icon} />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}