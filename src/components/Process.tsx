const STEPS = [
  { step: "01", title: "Descubrimiento", desc: "Entiendo tu problema actual, tus procesos manuales y lo que necesitas automatizar. Definimos el alcance y los objetivos." },
  { step: "02", title: "Diseño", desc: "Diseño la arquitectura del sistema: qué herramientas usar, cómo se conectan y qué flujos de datos necesitas." },
  { step: "03", title: "Construcción", desc: "Construyo el sistema completo: base de datos, API, automatizaciones con n8n, dashboard y las integraciones necesarias." },
  { step: "04", title: "Despliegue e Iteración", desc: "Despliego en producción, configuro backups, monitoreo y SSL. Ajusto según tu feedback hasta que todo funcione solo." },
];

export function Process() {
  return (
    <section id="process" className="py-20 sm:py-28 bg-bg-secondary">
      <div className="max-w-content mx-auto px-6">
        <div className="mb-14">
          <p className="text-sm font-mono text-accent-light mb-3">Proceso</p>
          <h2 className="section-heading mb-4">Cómo trabajo</h2>
          <p className="section-sub">Un proceso claro y directo. Sin humo, sin buzzwords, sin meses de espera.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((s) => (
            <div key={s.step} className="card card-lg p-6">
              <span className="font-mono text-3xl font-semibold text-accent-light/20 mb-4 block">{s.step}</span>
              <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}