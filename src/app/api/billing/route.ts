import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type BillingStatus =
  | "trial"
  | "ativo"
  | "aviso_pagamento"
  | "inadimplente"
  | "bloqueado";

type BillingResponse = {
  success: boolean;
  billing: {
    loja_id: string;
    loja_nome: string;
    plano_nome: string;
    status: BillingStatus;
    payment_status: string;
    due_date: string | null;
    grace_until: string | null;
    dias_atraso: number;
    bloquear_criacao: boolean;
    bloquear_arquivamento: boolean;
    bloquear_download: boolean;
    payment_link: string;
    observacoes: string;
  } | null;
  message: string;
};

function getSupabaseAdmin() {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

  if (!url) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL ou SUPABASE_URL não configurado.");
  }

  if (!serviceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY não configurado.");
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function normalizeBillingStatus(value: string | null | undefined): BillingStatus {
  if (
    value === "trial" ||
    value === "ativo" ||
    value === "aviso_pagamento" ||
    value === "inadimplente" ||
    value === "bloqueado"
  ) {
    return value;
  }

  return "ativo";
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const lojaId =
      searchParams.get("loja_id")?.trim() || "loja-maconica-aurora";

    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from("alm_billing_accounts_view")
      .select(
        `
          loja_id,
          loja_nome,
          plano_nome,
          billing_status,
          payment_status,
          due_date,
          grace_until,
          dias_atraso,
          bloquear_criacao,
          bloquear_arquivamento,
          bloquear_download,
          payment_link,
          observacoes
        `,
      )
      .eq("loja_id", lojaId)
      .maybeSingle();

    if (error) {
      const response: BillingResponse = {
        success: false,
        billing: null,
        message: `Erro ao ler billing da loja: ${error.message}`,
      };

      return NextResponse.json(response, { status: 500 });
    }

    if (!data) {
      const response: BillingResponse = {
        success: false,
        billing: null,
        message: "Nenhum registro de billing encontrado para esta loja.",
      };

      return NextResponse.json(response, { status: 404 });
    }

    const response: BillingResponse = {
      success: true,
      billing: {
        loja_id: data.loja_id ?? lojaId,
        loja_nome: data.loja_nome ?? "Loja Maçônica Aurora",
        plano_nome: data.plano_nome ?? "Plano Institucional",
        status: normalizeBillingStatus(data.billing_status),
        payment_status: data.payment_status ?? "pago",
        due_date: data.due_date ?? null,
        grace_until: data.grace_until ?? null,
        dias_atraso: Number(data.dias_atraso ?? 0),
        bloquear_criacao: Boolean(data.bloquear_criacao),
        bloquear_arquivamento: Boolean(data.bloquear_arquivamento),
        bloquear_download: Boolean(data.bloquear_download),
        payment_link: data.payment_link ?? "#",
        observacoes: data.observacoes ?? "",
      },
      message: "Billing carregado com sucesso.",
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Erro inesperado ao carregar o billing.";

    const response: BillingResponse = {
      success: false,
      billing: null,
      message,
    };

    return NextResponse.json(response, { status: 500 });
  }
}