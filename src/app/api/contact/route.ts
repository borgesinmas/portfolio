import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(key: string, max: number, windowMs: number) {
  const now = Date.now();
  const entry = rateLimitMap.get(key);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= max) return false;
  entry.count++;
  return true;
}

const ContactSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email().max(120),
  type: z.string().optional(),
  message: z.string().min(10).max(2000),
});

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? "unknown";
  if (!checkRateLimit(ip, 3, 60_000)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let raw: unknown;
  try { raw = await req.json(); } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  const { name, email, type, message } = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY not configured");
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const typeLabel = type ? `\nTipo: ${type}` : "";

    await resend.emails.send({
      from: "portfolio@luismartinez.dev",
      to: ["agenciasuiza8@gmail.com"],
      replyTo: email,
      subject: `[Portafolio] ${type || "Contacto"} — ${name}`,
      text: `De: ${name} <${email}>${typeLabel}\n\n${message}`,
      html: `<div style="font-family:system-ui,sans-serif;background:#0A0A0A;color:#FAFAFA;padding:32px;border-radius:12px;border:1px solid #222"><h2 style="color:#3B82F6;margin:0 0 16px">Nuevo mensaje</h2><p style="color:#A1A1AA;margin:0 0 4px"><strong style="color:#FAFAFA">De:</strong> ${name} &lt;${email}&gt;</p>${type ? `<p style="color:#A1A1AA;margin:0 0 4px"><strong style="color:#FAFAFA">Tipo:</strong> ${type}</p>` : ""}<hr style="border:1px solid #222;margin:16px 0"><p style="color:#A1A1AA;white-space:pre-wrap">${message}</p></div>`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact]", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}