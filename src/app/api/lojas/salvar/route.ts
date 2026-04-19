import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type LojaPayload = {
  cnpj?: string;
  nomeOficial?: string;
  nomePublico?: string;
  responsavel?: string;
  email?: string;
  whatsapp?: string;
  cidade?: string;
  estado?: string;
};

type ValidacaoLoja =
  | {
      ok: false;
      mensagem: string;
    }
  | {
      ok: true;
      dadosNormalizados: {
        cnpj: string;
        nome_loja: string;
        slug: string;
        plano: string;
        status: string;
        responsavel_nome: string;
        responsavel_email: string;
        responsavel_whatsapp: string | null;
        configuracao_concluida: boolean;
        publico_liberado: boolean;
        cidade: string | null;
        estado: string | null;
        mensagem_institucional: string;
        courtesy_expires_at: string | null;
      };
    };

function somenteNumeros(valor: string) {
  return (valor || "").replace(/\D/g, "");
}

function gerarSlug(texto: string) {
  return (texto || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function textoSeguro(valor: unknown) {
  return typeof valor === "string" ? valor.trim() : "";
}

function normalizarBooleanoPadrao() {
  return false;
}

function validarPayload(payload: LojaPayload): ValidacaoLoja {
  const nomeOficial = textoSeguro(payload.nomeOficial);
  const nomePublico = textoSeguro(payload.nomePublico);
  const responsavel = textoSeguro(payload.responsavel);
  const email = textoSeguro(payload.email);
  const cidade = textoSeguro(payload.cidade);
  const estado = textoSeguro(payload.estado).toUpperCase().slice(0, 2);
  const cnpj = somenteNumeros(textoSeguro(payload.cnpj || ""));
  const whatsapp = somenteNumeros(textoSeguro(payload.whatsapp || ""));

  if (!nomeOficial) {
    return {
      ok: false,
      mensagem: "Informe o nome oficial da loja.",
    };
  }

  if (cnpj.length !== 14) {
    return {
      ok: false,
      mensagem: "Informe um CNPJ válido com 14 dígitos.",
    };
  }

  if (!responsavel) {
    return {
      ok: false,
      mensagem: "Informe o responsável pela loja.",
    };
  }

  if (!email) {
    return {
      ok: false,
      mensagem: "Informe o e-mail principal da loja.",
    };
  }

  const slugBase = gerarSlug(nomePublico || nomeOficial);

  if (!slugBase) {
    return {
      ok: false,
      mensagem: "Não foi possível gerar o identificador da loja.",
    };
  }

  return {
    ok: true,
    dadosNormalizados: {
      cnpj,
      nome_loja: nomePublico || nomeOficial,
      slug: slugBase,
      plano: "cortesia",
      status: "rascunho",
      responsavel_nome: responsavel,
      responsavel_email: email,
      responsavel_whatsapp: whatsapp || null,
      configuracao_concluida: normalizarBooleanoPadrao(),
      publico_liberado: normalizarBooleanoPadrao(),
      cidade: cidade || null,
      estado: estado || null,
      mensagem_institucional:
        "Cadastro inicial criado em camada isolada. Sistema em constante atualização.",
      courtesy_expires_at: null,
    },
  };
}

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

async function gerarSlugUnico(supabase: ReturnType<typeof getSupabaseAdmin>, slugBase: string) {
  let slugFinal = slugBase;
  let contador = 1;

  while (true) {
    const { data, error } = await supabase
      .from("am_lojas")
      .select("id")
      .eq("slug", slugFinal)
      .limit(1);

    if (error) {
      throw new Error(`Erro ao verificar slug existente: ${error.message}`);
    }

    if (!data || data.length === 0) {
      return slugFinal;
    }

    contador += 1;
    slugFinal = `${slugBase}-${contador}`;
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LojaPayload;
    const validacao = validarPayload(body);

    if (!validacao.ok) {
      return NextResponse.json(
        {
          success: false,
          message: validacao.mensagem,
        },
        { status: 400 }
      );
    }

    const dadosNormalizados = validacao.dadosNormalizados;
    const supabase = getSupabaseAdmin();

    const slugUnico = await gerarSlugUnico(supabase, dadosNormalizados.slug);

    const registro = {
      ...dadosNormalizados,
      slug: slugUnico,
    };

    const { data, error } = await supabase
      .from("am_lojas")
      .insert(registro)
      .select(
        "id, nome_loja, slug, status, responsavel_nome, responsavel_email, cidade, estado, cnpj, created_at"
      )
      .single();

    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: `Erro ao salvar loja em am_lojas: ${error.message}`,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Loja salva com sucesso em am_lojas na camada isolada, sem interferir no restante do projeto.",
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    const mensagem =
      error instanceof Error ? error.message : "Erro inesperado ao salvar o cadastro da loja.";

    return NextResponse.json(
      {
        success: false,
        message: mensagem,
      },
      { status: 500 }
    );
  }
}