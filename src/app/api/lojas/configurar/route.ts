import { NextResponse } from "next/server";

type ConfigurarLojaPayload = {
  id?: string;
  slug?: string;
  nome_loja?: string;
  responsavel_nome?: string;
  responsavel_email?: string;
  responsavel_whatsapp?: string;
  cidade?: string;
  estado?: string;
  mensagem_institucional?: string;
};

function limpar(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ConfigurarLojaPayload;

    const id = limpar(body.id);
    const slug = limpar(body.slug);

    const nomeLoja = limpar(body.nome_loja);
    const responsavelNome = limpar(body.responsavel_nome);
    const responsavelEmail = limpar(body.responsavel_email);
    const responsavelWhatsapp = limpar(body.responsavel_whatsapp);
    const cidade = limpar(body.cidade);
    const estado = limpar(body.estado);
    const mensagemInstitucional = limpar(body.mensagem_institucional);

    if (!id && !slug) {
      return NextResponse.json(
        {
          success: false,
          message: "Informe o id ou o slug da loja para configurar.",
        },
        { status: 400 }
      );
    }

    if (!nomeLoja) {
      return NextResponse.json(
        {
          success: false,
          message: "Nome oficial da loja é obrigatório.",
        },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        {
          success: false,
          message: "Variáveis do Supabase não configuradas no servidor.",
        },
        { status: 500 }
      );
    }

    const filtros = [];
    if (id) filtros.push(`id=eq.${encodeURIComponent(id)}`);
    if (slug) filtros.push(`slug=eq.${encodeURIComponent(slug)}`);

    const query = filtros.length > 1 ? filtros.join("&") : filtros[0];

    const response = await fetch(`${supabaseUrl}/rest/v1/am_lojas?${query}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        nome_loja: nomeLoja,
        responsavel_nome: responsavelNome,
        responsavel_email: responsavelEmail,
        responsavel_whatsapp: responsavelWhatsapp,
        cidade,
        estado,
        mensagem_institucional: mensagemInstitucional,
        configuracao_concluida: true,
        status: "ativa",
      }),
    });

    const text = await response.text();

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: `Erro ao salvar configuração da loja: ${text}`,
        },
        { status: 500 }
      );
    }

    let data: unknown = text;
    try {
      data = JSON.parse(text);
    } catch {}

    return NextResponse.json({
      success: true,
      message: "Configuração inicial salva com sucesso.",
      loja: data,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro interno ao configurar loja.";

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
    message: "API de configuração inicial da loja ativa.",
  });
}