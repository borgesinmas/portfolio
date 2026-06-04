const STEPS = [
  {
    step: "01",
    title: "De la idea a producción",
    desc: "No me limito a una capa del stack. Diseño la arquitectura, construyo el backend, el frontend y las integraciones, y lo despliego en un servidor real. Lo que ves en el portfolio está en producción, no es una demo.",
  },
  {
    step: "02",
    title: "Me adapto cuando el problema crece",
    desc: "Growork empezó como una landing. Terminó siendo cuatro productos conectados. Aprendo lo que hace falta en el momento en que hace falta, y ajusto las decisiones técnicas sin tener que reescribir desde cero.",
  },
  {
    step: "03",
    title: "El código responde a una necesidad real",
    desc: "Cada decisión técnica tiene una razón de negocio detrás: reducir trabajo manual, escalar sin fricción, proteger datos de clientes o conectar sistemas que antes no hablaban entre sí.",
  },
  {
    step: "04",
    title: "Autónomo, pero pienso en equipo",
    desc: "Gran parte del portfolio lo construí sin equipo. Eso me obliga a documentar, estructurar y tomar decisiones que otros puedan entender y mantener. Me integro bien con cualquier stack porque lo que importa es resolver el problema.",
  },
];

export function Process() {
  return (
    <section id="process" className="pt-20 sm:pt-28 pb-10 sm:pb-14 bg-bg-secondary">
      <div className="max-w-content mx-auto px-6">
        <div className="mb-14">
          <p className="text-sm font-mono text-accent-light mb-3">Forma de trabajar</p>
          <h2 className="section-heading mb-4">Cómo trabajo</h2>
          <p className="section-sub">Construyo producto de principio a fin, aprendo rápido y tomo decisiones técnicas con criterio de negocio.</p>
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