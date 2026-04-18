import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type FinanceiroLancamentoPayload = {
  loja_id?: string | null;
  tipo?: string;
  status?: string;
  descricao?: string;
  categoria?: string;
  conta?: string;
  centro?: string;
  competencia?: string;
  valor?: number | string;
  observacao?: string;
};

type SupabaseLikeError = {
  message?: string;
  details?: string;
  hint?: string;
  code?: string;
};

function normalizarTexto(valor: unknown) {
  if (typeof valor !== "string") {
    return "";
  }

  return valor.trim();
}

function normalizarValor(valor: unknown) {
  if (typeof valor === "number" && Number.isFinite(valor)) {
    return valor;
  }

  if (typeof valor === "string") {
    const limpo = valor.replace(/[^\d.,-]/g, "").replace(/\./g, "").replace(",", ".");
    const numero = Number(limpo);

    if (Number.isFinite(numero)) {
      return numero;
    }
  }

  return 0;
}

function obterSupabaseAdmin() {
  const supabaseUrl =
    process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

  if (!supabaseUrl) {
    throw new Error("SUPABASE_URL ou NEXT_PUBLIC_SUPABASE_URL não configurada.");
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

function extrairErroSupabase(error: unknown) {
  if (error instanceof Error) {
    return {
      message: error.message,
      details: "",
      hint: "",
      code: "",
    };
  }

  if (typeof error === "object" && error !== null) {
    const erro = error as SupabaseLikeError;

    return {
      message: typeof erro.message === "string" ? erro.message : "Erro desconhecido",
      details: typeof erro.details === "string" ? erro.details : "",
      hint: typeof erro.hint === "string" ? erro.hint : "",
      code: typeof erro.code === "string" ? erro.code : "",
    };
  }

  return {
    message: "Erro desconhecido",
    details: "",
    hint: "",
    code: "",
  };
}

function montarDetalheErro(error: unknown) {
  const info = extrairErroSupabase(error);

  const partes = [
    info.message ? `message=${info.message}` : "",
    info.details ? `details=${info.details}` : "",
    info.hint ? `hint=${info.hint}` : "",
    info.code ? `code=${info.code}` : "",
  ].filter(Boolean);

  return partes.join(" | ");
}

export async function GET() {
  try {
    const supabase = obterSupabaseAdmin();

    const { data, error } = await supabase
      .from("financeiro_lancamentos_premium")
      .select(
        "id, loja_id, tipo, status, descricao, categoria, conta, centro, competencia, valor, observacao, origem, created_at, updated_at"
      )
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    const items = (data || []).map((item) => ({
      id: item.id,
      loja_id: item.loja_id,
      tipo: item.tipo,
      status: item.status,
      descricao: item.descricao,
      categoria: item.categoria,
      conta: item.conta,
      centro: item.centro,
      competencia: item.competencia,
      valor: typeof item.valor === "number" ? item.valor : Number(item.valor || 0),
      observacao: item.observacao,
      origem: item.origem,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
    }));

    return NextResponse.json({
      success: true,
      origem: "supabase-financeiro-premium",
      total: items.length,
      items,
      message: "Leitura real da nova camada premium do financeiro institucional.",
    });
  } catch (error) {
    const detalhe = montarDetalheErro(error);

    return NextResponse.json(
      {
        success: false,
        message: "Não foi possível ler os lançamentos financeiros no Supabase.",
        error: detalhe || "Erro desconhecido",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as FinanceiroLancamentoPayload;

    const registro = {
      loja_id: normalizarTexto(body.loja_id) || null,
      tipo: normalizarTexto(body.tipo),
      status: normalizarTexto(body.status) || "Pendente",
      descricao: normalizarTexto(body.descricao),
      categoria: normalizarTexto(body.categoria) || null,
      conta: normalizarTexto(body.conta) || null,
      centro: normalizarTexto(body.centro) || null,
      competencia: normalizarTexto(body.competencia),
      valor: normalizarValor(body.valor),
      observacao: normalizarTexto(body.observacao) || null,
      origem: "supabase-financeiro-premium",
    };

    if (!registro.tipo) {
      return NextResponse.json(
        {
          success: false,
          message: "Tipo do lançamento é obrigatório.",
          error: "message=Tipo vazio",
        },
        { status: 400 }
      );
    }

    if (!registro.descricao) {
      return NextResponse.json(
        {
          success: false,
          message: "Descrição do lançamento é obrigatória.",
          error: "message=Descrição vazia",
        },
        { status: 400 }
      );
    }

    if (!registro.competencia) {
      return NextResponse.json(
        {
          success: false,
          message: "Competência é obrigatória.",
          error: "message=Competência vazia",
        },
        { status: 400 }
      );
    }

    const supabase = obterSupabaseAdmin();

    const { data, error } = await supabase
      .from("financeiro_lancamentos_premium")
      .insert(registro)
      .select(
        "id, loja_id, tipo, status, descricao, categoria, conta, centro, competencia, valor, observacao, origem, created_at, updated_at"
      )
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      item: {
        id: data.id,
        loja_id: data.loja_id,
        tipo: data.tipo,
        status: data.status,
        descricao: data.descricao,
        categoria: data.categoria,
        conta: data.conta,
        centro: data.centro,
        competencia: data.competencia,
        valor: typeof data.valor === "number" ? data.valor : Number(data.valor || 0),
        observacao: data.observacao,
        origem: data.origem,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      },
      message:
        "Lançamento salvo com sucesso no Supabase da camada premium do financeiro institucional.",
    });
  } catch (error) {
    const detalhe = montarDetalheErro(error);

    return NextResponse.json(
      {
        success: false,
        message: "Não foi possível salvar o lançamento financeiro no Supabase.",
        error: detalhe || "Erro desconhecido",
      },
      { status: 500 }
    );
  }
}