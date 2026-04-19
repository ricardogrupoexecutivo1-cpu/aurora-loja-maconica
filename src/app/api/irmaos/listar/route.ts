import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabaseAdmin() {
  const supabaseUrl =
    process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

  if (!supabaseUrl) {
    throw new Error("SUPABASE_URL não configurada.");
  }

  if (!serviceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY não configurada.");
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

function textoSeguro(valor: unknown) {
  return typeof valor === "string" ? valor.trim() : "";
}

type IrmaoRetorno = {
  id: string;
  loja_id: string;
  nome_completo: string;
  cpf: string;
  email: string;
  whatsapp: string;
  cargo: string;
  status: string;
  ativo: boolean;
  created_at: string;
};

export async function GET() {
  try {
    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from("am_irmaos")
      .select("id, loja_id, nome_completo, cpf, email, whatsapp, cargo, status, ativo, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: `Erro ao listar irmãos em am_irmaos: ${error.message}`,
          data: [] as IrmaoRetorno[],
        },
        { status: 500 }
      );
    }

    const irmaos: IrmaoRetorno[] = (data || []).map((item) => ({
      id: String(item.id),
      loja_id: textoSeguro(item.loja_id),
      nome_completo: textoSeguro(item.nome_completo) || "Sem nome",
      cpf: textoSeguro(item.cpf),
      email: textoSeguro(item.email),
      whatsapp: textoSeguro(item.whatsapp),
      cargo: textoSeguro(item.cargo),
      status: textoSeguro(item.status),
      ativo: Boolean(item.ativo),
      created_at: textoSeguro(item.created_at),
    }));

    return NextResponse.json(
      {
        success: true,
        message: "Irmãos listados com sucesso a partir de am_irmaos.",
        data: irmaos,
      },
      { status: 200 }
    );
  } catch (error) {
    const mensagem =
      error instanceof Error ? error.message : "Erro inesperado ao listar irmãos.";

    return NextResponse.json(
      {
        success: false,
        message: mensagem,
        data: [] as IrmaoRetorno[],
      },
      { status: 500 }
    );
  }
}