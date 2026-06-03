// Cloudflare Pages Function — sirve POST /api/contact.
// Sustituye a la antigua API route de Next al pasar el sitio a export estático.
// Llama a la API REST de Resend con fetch (sin SDK), compatible con el runtime de Workers.
//
// Variables de entorno (configurar en Cloudflare Pages → Settings → Environment variables):
//   RESEND_API_KEY  (obligatoria)
//   CONTACT_FROM    (opcional; remitente verificado en Resend. Por defecto onboarding@resend.dev)
//   CONTACT_TO      (opcional; destinatario. Por defecto el email de contacto)

// Rate limit best-effort por isolate (para algo robusto usar el binding de Rate Limiting o KV).
const rateLimit = new Map();

function checkRateLimit(key, max, windowMs) {
  const now = Date.now();
  const entry = rateLimit.get(key);
  if (!entry || now > entry.resetAt) {
    rateLimit.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= max) return false;
  entry.count += 1;
  return true;
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function isValidEmail(email) {
  return (
    typeof email === "string" &&
    email.length <= 120 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  );
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (c) => {
    if (c === "&") return "&amp;";
    if (c === "<") return "&lt;";
    if (c === ">") return "&gt;";
    if (c === '"') return "&quot;";
    return "&#39;";
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  const ip =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for") ??
    "unknown";
  if (!checkRateLimit(ip, 3, 60_000)) {
    return json({ error: "rate_limited" }, 429);
  }

  let raw;
  try {
    raw = await request.json();
  } catch {
    return json({ error: "invalid_json" }, 400);
  }

  const name = typeof raw?.name === "string" ? raw.name.trim() : "";
  const email = typeof raw?.email === "string" ? raw.email.trim() : "";
  const type = typeof raw?.type === "string" ? raw.type.trim() : "";
  const message = typeof raw?.message === "string" ? raw.message.trim() : "";

  if (name.length < 2 || name.length > 80) return json({ error: "invalid_payload" }, 400);
  if (!isValidEmail(email)) return json({ error: "invalid_payload" }, 400);
  if (message.length < 10 || message.length > 2000) {
    return json({ error: "invalid_payload" }, 400);
  }

  const apiKey = env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY no configurada");
    return json({ error: "not_configured" }, 500);
  }

  const from = env.CONTACT_FROM || "onboarding@resend.dev";
  const to = env.CONTACT_TO || "agenciasuiza8@gmail.com";
  const typeLabel = type ? `\nTipo: ${type}` : "";

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `[Portafolio] ${type || "Contacto"} — ${name}`,
        text: `De: ${name} <${email}>${typeLabel}\n\n${message}`,
        html: `<div style="font-family:system-ui,sans-serif;background:#0A0A0A;color:#FAFAFA;padding:32px;border-radius:12px;border:1px solid #222"><h2 style="color:#3B82F6;margin:0 0 16px">Nuevo mensaje</h2><p style="color:#A1A1AA;margin:0 0 4px"><strong style="color:#FAFAFA">De:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>${type ? `<p style="color:#A1A1AA;margin:0 0 4px"><strong style="color:#FAFAFA">Tipo:</strong> ${escapeHtml(type)}</p>` : ""}<hr style="border:1px solid #222;margin:16px 0"><p style="color:#A1A1AA;white-space:pre-wrap">${escapeHtml(message)}</p></div>`,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("[contact] error de Resend", res.status, detail);
      return json({ error: "server_error" }, 502);
    }

    return json({ ok: true });
  } catch (err) {
    console.error("[contact]", err);
    return json({ error: "server_error" }, 500);
  }
}
