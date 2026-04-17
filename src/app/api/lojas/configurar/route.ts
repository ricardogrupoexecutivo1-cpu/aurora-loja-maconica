import { NextRequest, NextResponse } from "next/server";

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

function adicionarDias(data: Date, dias: number) {
  const copia = new Date(data);
  copia.setDate(copia.getDate() + dias);
  return copia;
}

function obterCredenciaisSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Variáveis do Supabase não configuradas no servidor.");
  }

  return { supabaseUrl, serviceRoleKey };
}

function montarQuery(id: string, slug: string) {
  const filtros: string[] = [];

  if (id) filtros.push(`id=eq.${encodeURIComponent(id)}`);
  if (slug) filtros.push(`slug=eq.${encodeURIComponent(slug)}`);

  if (!filtros.length) {
    throw new Error("Informe o id ou o slug da loja.");
  }

  return filtros.join("&");
}

async function buscarLojaPorIdOuSlug(id: string, slug: string) {
  const { supabaseUrl, serviceRoleKey } = obterCredenciaisSupabase();
  const query = montarQuery(id, slug);

  const response = await fetch(
    `${supabaseUrl}/rest/v1/am_lojas?select=id,slug,nome_loja,responsavel_nome,responsavel_email,responsavel_whatsapp,cidade,estado,mensagem_institucional,configuracao_concluida,status,plano,courtesy_expires_at&${query}&limit=1`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
      },
      cache: "no-store",
    }
  );

  const text = await response.text();

  if (!response.ok) {
    throw new Error(`Erro ao buscar loja: ${text}`);
  }

  let data: unknown = [];
  try {
    data = JSON.parse(text);
  } catch {
    data = [];
  }

  const lista = Array.isArray(data) ? data : [];
  return lista[0] ?? null;
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

    const { supabaseUrl, serviceRoleKey } = obterCredenciaisSupabase();

    const agora = new Date();
    const cortesiaAte = adicionarDias(agora, 90).toISOString();

    const query = montarQuery(id, slug);

    const payloadAtualizacao = {
      nome_loja: nomeLoja,
      responsavel_nome: responsavelNome,
      responsavel_email: responsavelEmail,
      responsavel_whatsapp: responsavelWhatsapp,
      cidade,
      estado,
      mensagem_institucional: mensagemInstitucional,
      configuracao_concluida: true,
      status: "ativa",
      plano: "cortesia",
      courtesy_expires_at: cortesiaAte,
    };

    const response = await fetch(`${supabaseUrl}/rest/v1/am_lojas?${query}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify(payloadAtualizacao),
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

    let data: unknown = [];
    try {
      data = JSON.parse(text);
    } catch {
      data = [];
    }

    const loja = Array.isArray(data) ? data[0] ?? null : data;

    return NextResponse.json({
      success: true,
      message:
        "Configuração inicial salva com sucesso. Cortesia automática liberada por até 90 dias.",
      loja,
      courtesy_expires_at: cortesiaAte,
      plano: "cortesia",
      status: "ativa",
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

export async function GET(req: NextRequest) {
  try {
    const id = limpar(req.nextUrl.searchParams.get("id"));
    const slug = limpar(req.nextUrl.searchParams.get("slug"));

    if (!id && !slug) {
      return NextResponse.json(
        {
          success: false,
          message: "Informe o id ou o slug da loja para consultar.",
        },
        { status: 400 }
      );
    }

    const loja = await buscarLojaPorIdOuSlug(id, slug);

    if (!loja) {
      return NextResponse.json(
        {
          success: false,
          message: "Loja não encontrada.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Loja carregada com sucesso.",
      loja,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro interno ao consultar loja.";

    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status: 500 }
    );
  }
}