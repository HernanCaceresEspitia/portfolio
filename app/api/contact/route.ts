import { NextResponse } from "next/server";

/**
 * Endpoint del formulario de contacto.
 *
 * Reenvía el mensaje a tu backend NestJS (en Render) si la variable de entorno
 * CONTACT_ENDPOINT está configurada. Mientras no lo esté, acepta el mensaje pero
 * no lo entrega (delivered: false) — por eso la sección también muestra tus
 * canales directos (email / LinkedIn) como respaldo garantizado.
 *
 * Para conectarlo: define CONTACT_ENDPOINT en Vercel apuntando a tu ruta NestJS,
 * p. ej. https://tu-api.onrender.com/contact
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let data: { name?: string; email?: string; message?: string };
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const name = data.name?.trim();
  const email = data.email?.trim();
  const message = data.message?.trim();

  if (!name || !email || !message || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "invalid_fields" }, { status: 400 });
  }

  const endpoint = process.env.CONTACT_ENDPOINT;

  if (!endpoint) {
    console.warn(
      "[contact] CONTACT_ENDPOINT no configurado — el mensaje no fue entregado.",
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });
    if (!res.ok) {
      return NextResponse.json({ error: "upstream_error" }, { status: 502 });
    }
    return NextResponse.json({ ok: true, delivered: true });
  } catch {
    return NextResponse.json(
      { error: "upstream_unreachable" },
      { status: 502 },
    );
  }
}
