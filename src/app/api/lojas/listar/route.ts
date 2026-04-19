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

type LojaRetorno = {
  id: string;
  nome: string;
  slug: string;
  cidade: string;
  estado: string;
  status: string;
};

export async function GET() {
  try {
    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from("am_lojas")
      .select("id, nome_loja, slug, cidade, estado, status")
      .in("status", ["rascunho", "ativa", "ativo"])
      .order("nome_loja", { ascending: true });

    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: `Erro ao listar lojas em am_lojas: ${error.message}`,
          data: [] as LojaRetorno[],
        },
        { status: 500 }
      );
    }

    const lojas: LojaRetorno[] = (data || []).map((item) => ({
      id: String(item.id),
      nome: textoSeguro(item.nome_loja) || "Loja sem nome",
      slug: textoSeguro(item.slug),
      cidade: textoSeguro(item.cidade),
      estado: textoSeguro(item.estado),
      status: textoSeguro(item.status),
    }));

    return NextResponse.json(
      {
        success: true,
        message: "Lojas listadas com sucesso a partir de am_lojas.",
        data: lojas,
      },
      { status: 200 }
    );
  } catch (error) {
    const mensagem =
      error instanceof Error ? error.message : "Erro inesperado ao listar lojas.";

    return NextResponse.json(
      {
        success: false,
        message: mensagem,
        data: [] as LojaRetorno[],
      },
      { status: 500 }
    );
  }
}