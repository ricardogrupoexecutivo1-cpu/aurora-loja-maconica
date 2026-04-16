import { NextResponse } from "next/server";

type AsaasWebhookPayload = {
  event?: string;
  payment?: {
    id?: string;
    customer?: string;
    value?: number;
    description?: string;
    billingType?: string;
    status?: string;
    externalReference?: string;
    dueDate?: string;
    clientPaymentDate?: string;
    invoiceUrl?: string;
    bankSlipUrl?: string;
  };
  customer?: {
    id?: string;
    name?: string;
    email?: string;
    phone?: string;
    mobilePhone?: string;
  };
};

type LojaInserida = {
  id?: string;
  slug?: string;
  plano?: string;
  nome_loja?: string;
  status?: string;
  responsavel_nome?: string;
  responsavel_email?: string;
  responsavel_whatsapp?: string;
};

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function detectarPlanoPorValor(valor: number) {
  if (valor >= 199.9) return "premium";
  return "essencial";
}

function getBaseUrl(req: Request) {
  const envUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.NEXT_PUBLIC_VERCEL_URL ||
    "";

  if (envUrl) {
    const normalizada = envUrl.startsWith("http")
      ? envUrl
      : `https://${envUrl}`;
    return normalizada.replace(/\/$/, "");
  }

  const requestUrl = new URL(req.url);
  return requestUrl.origin.replace(/\/$/, "");
}

async function inserirLoja(payload: {
  nomeLoja: string;
  slug: string;
  plano: string;
  responsavelNome: string;
  responsavelEmail: string;
  responsavelWhatsapp: string;
  asaasCustomerId: string;
  asaasPaymentId: string;
}) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Variáveis do Supabase não configuradas no servidor.");
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/am_lojas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      nome_loja: payload.nomeLoja,
      slug: payload.slug,
      plano: payload.plano,
      status: "aguardando_configuracao",
      responsavel_nome: payload.responsavelNome,
      responsavel_email: payload.responsavelEmail,
      responsavel_whatsapp: payload.responsavelWhatsapp,
      asaas_customer_id: payload.asaasCustomerId,
      asaas_payment_id: payload.asaasPaymentId,
      configuracao_concluida: false,
      publico_liberado: false,
    }),
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(`Erro ao inserir loja no Supabase: ${text}`);
  }

  try {
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed)) {
      return (parsed[0] || {}) as LojaInserida;
    }
    return parsed as LojaInserida;
  } catch {
    return {} as LojaInserida;
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as AsaasWebhookPayload;

    console.log("Webhook Asaas recebido:", JSON.stringify(body, null, 2));

    const evento = body?.event ?? "";
    const payment = body?.payment ?? {};
    const customer = body?.customer ?? {};

    const eventosAceitos = [
      "PAYMENT_RECEIVED",
      "PAYMENT_CONFIRMED",
      "PAYMENT_UPDATED",
      "PAYMENT_CREATED",
    ];

    if (!eventosAceitos.includes(evento)) {
      return NextResponse.json({
        success: true,
        ignored: true,
        message: `Evento ignorado: ${evento || "sem_evento"}`,
      });
    }

    const paymentId = payment.id?.trim() || "";
    if (!paymentId) {
      return NextResponse.json(
        { success: false, message: "payment.id não recebido." },
        { status: 400 }
      );
    }

    const valor = Number(payment.value || 0);
    const plano = detectarPlanoPorValor(valor);

    const responsavelNome =
      customer.name?.trim() ||
      payment.description?.trim() ||
      "Responsável Loja Maçônica";

    const responsavelEmail = customer.email?.trim() || "";
    const responsavelWhatsapp =
      customer.mobilePhone?.trim() || customer.phone?.trim() || "";

    const nomeLojaBase =
      payment.description?.trim() ||
      customer.name?.trim() ||
      "Loja Maçônica Aurora";

    const slugBase = slugify(nomeLojaBase) || "loja-maconica";
    const slug = `${slugBase}-${paymentId.slice(-8).toLowerCase()}`;

    const loja = await inserirLoja({
      nomeLoja: nomeLojaBase,
      slug,
      plano,
      responsavelNome,
      responsavelEmail,
      responsavelWhatsapp,
      asaasCustomerId: payment.customer?.trim() || customer.id?.trim() || "",
      asaasPaymentId: paymentId,
    });

    const baseUrl = getBaseUrl(req);
    const lojaId = loja?.id || "";
    const lojaSlug = loja?.slug || slug;

    const params = new URLSearchParams();
    if (lojaId) params.set("id", lojaId);
    if (lojaSlug) params.set("slug", lojaSlug);

    const queryString = params.toString();
    const sucessoUrl = `${baseUrl}/criado-com-sucesso${
      queryString ? `?${queryString}` : ""
    }`;
    const configurarUrl = `${baseUrl}/configurar-loja${
      queryString ? `?${queryString}` : ""
    }`;

    return NextResponse.json({
      success: true,
      message: "Loja criada com sucesso a partir do webhook.",
      loja: {
        id: lojaId,
        slug: lojaSlug,
        plano: loja?.plano || plano,
        nome_loja: loja?.nome_loja || nomeLojaBase,
        status: loja?.status || "aguardando_configuracao",
        responsavel_nome: loja?.responsavel_nome || responsavelNome,
        responsavel_email: loja?.responsavel_email || responsavelEmail,
        responsavel_whatsapp:
          loja?.responsavel_whatsapp || responsavelWhatsapp,
      },
      links: {
        sucesso: sucessoUrl,
        configurar: configurarUrl,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro interno no webhook.";

    console.error("Erro no webhook Asaas:", error);

    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Webhook Asaas da Aurora Loja Maçônica ativo.",
  });
}