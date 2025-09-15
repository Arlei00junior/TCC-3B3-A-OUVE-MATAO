import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  try {
    const { email, token } = await req.json();

    const resp = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${Deno.env.get("SENDGRID_API_KEY")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email }] }],
        from: { email: Deno.env.get("FROM_EMAIL") },
        subject: "Redefinição de Senha - Ouve Matão",
        content: [
          {
            type: "text/plain",
            value: `Seu código de verificação é: ${token}\n\nEle expira em 15 minutos.`,
          },
        ],
      }),
    });

    if (!resp.ok) {
      return new Response(
        JSON.stringify({ error: "Erro ao enviar e-mail" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  // Permitir métodos OPTIONS para preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  try {
    const { email, token } = await req.json();

    const resp = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${Deno.env.get("SENDGRID_API_KEY")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email }] }],
        from: { email: Deno.env.get("FROM_EMAIL") },
        subject: "Redefinição de Senha - Ouve Matão",
        content: [
          {
            type: "text/plain",
            value: `Seu código de verificação é: ${token}\n\nEle expira em 15 minutos.`,
          },
        ],
      }),
    });

    if (!resp.ok) {
      return new Response(
        JSON.stringify({ error: "Erro ao enviar e-mail" }),
        { status: 500, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
    );
  }
});

