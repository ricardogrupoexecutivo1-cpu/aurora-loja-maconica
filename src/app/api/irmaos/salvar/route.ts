import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type IrmaoPayload = {
  lojaId?: string;
  nomeCompleto?: string;
  cpf?: string;
  email?: string;
  whatsapp?: string;
  cargo?: string;
};

type ValidacaoIrmao =
  | {
      ok: false;
      mensagem: string;
    }
  | {
      ok: true;
      dadosNormalizados: {
        loja_id: string;
        nome_completo: string;
        cpf: string;
        email: string | null;
        whatsapp: string | null;
        cargo: string | null;
        status: string;
        ativo: boolean;
        observacoes: string;
      };
    };

function textoSeguro(valor: unknown) {
  return typeof valor === "string" ? valor.trim() : "";
}

function somenteNumeros(valor: string) {
  return (valor || "").replace(/\D/g, "");
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

function validarPayload(payload: IrmaoPayload): ValidacaoIrmao {
  const lojaId = textoSeguro(payload.lojaId);
  const nomeCompleto = textoSeguro(payload.nomeCompleto);
  const cpf = somenteNumeros(textoSeguro(payload.cpf || ""));
  const email = textoSeguro(payload.email);
  const whatsapp = somenteNumeros(textoSeguro(payload.whatsapp || ""));
  const cargo = textoSeguro(payload.cargo);

  if (!lojaId) {
    return {
      ok: false,
      mensagem: "Selecione a loja correta antes de continuar.",
    };
  }

  if (!nomeCompleto) {
    return {
      ok: false,
      mensagem: "Informe o nome completo do irmão.",
    };
  }

  if (cpf.length !== 11) {
    return {
      ok: false,
      mensagem: "Informe um CPF válido com 11 dígitos.",
    };
  }

  return {
    ok: true,
    dadosNormalizados: {
      loja_id: lojaId,
      nome_completo: nomeCompleto,
      cpf,
      email: email || null,
      whatsapp: whatsapp || null,
      cargo: cargo || null,
      status: "rascunho",
      ativo: true,
      observacoes: cargo
        ? `Cargo informado no cadastro inicial: ${cargo}`
        : "Cadastro inicial em camada isolada.",
    },
  };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as IrmaoPayload;
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

    const { data: lojaExiste, error: erroLoja } = await supabase
      .from("am_lojas")
      .select("id, nome_loja")
      .eq("id", dadosNormalizados.loja_id)
      .limit(1)
      .maybeSingle();

    if (erroLoja) {
      return NextResponse.json(
        {
          success: false,
          message: `Erro ao validar loja selecionada: ${erroLoja.message}`,
        },
        { status: 500 }
      );
    }

    if (!lojaExiste) {
      return NextResponse.json(
        {
          success: false,
          message: "A loja selecionada não foi encontrada em am_lojas.",
        },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("am_irmaos")
      .insert(dadosNormalizados)
      .select(
        "id, loja_id, nome_completo, cpf, email, whatsapp, cargo, status, ativo, created_at"
      )
      .single();

    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: `Erro ao salvar irmão em am_irmaos: ${error.message}`,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Irmão salvo com sucesso em am_irmaos, vinculado à loja real, sem interferir no restante do projeto.",
        data: {
          ...data,
          loja_nome: lojaExiste.nome_loja,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    const mensagem =
      error instanceof Error ? error.message : "Erro inesperado ao salvar o cadastro do irmão.";

    return NextResponse.json(
      {
        success: false,
        message: mensagem,
      },
      { status: 500 }
    );
  }
}