const STACK = [
  { category: "IA y Automatización", tools: ["OpenAI / GPT-4", "Claude / Anthropic", "n8n", "LangChain", "RAG", "Prompt Engineering"] },
  { category: "Backend y Datos", tools: ["Python", "FastAPI", "PostgreSQL", "Supabase", "ClickHouse", "Redis"] },
  { category: "Frontend", tools: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Recharts", "shadcn/ui"] },
  { category: "Infraestructura", tools: ["Docker", "Linux / VPS", "Cloudflare", "Dokploy", "GitHub Actions", "Caddy"] },
  { category: "Negocio", tools: ["CRM Systems", "WhatsApp API", "Stripe", "Resend / Email", "Google Analytics", "Meta Ads"] },
];

export function Stack() {
  return (
    <section id="stack" className="py-20 sm:py-28 bg-bg-tertiary">
      <div className="max-w-content mx-auto px-6">
        <div className="mb-14">
          <p className="text-sm font-mono text-accent-light mb-3">Stack</p>
          <h2 className="section-heading mb-4">Herramientas que uso</h2>
          <p className="section-sub">Tecnología probada en producción. Sin dependencias innecesarias, sin over-engineering.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {STACK.map((cat) => (
            <div key={cat.category} className="card card-lg p-6">
              <h3 className="font-semibold text-sm mb-4 text-text-secondary">{cat.category}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.tools.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}