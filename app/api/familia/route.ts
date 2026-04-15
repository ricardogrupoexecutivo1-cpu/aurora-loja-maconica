import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabaseUrl =
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";

const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const TABLE_NAME = "alm_family_members";

function getSupabaseAdmin() {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error(
      "Variáveis do Supabase ausentes. Verifique SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY."
    );
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function normalizeText(value: unknown) {
  if (typeof value !== "string") return null;
  const normalized = value.trim();
  return normalized.length ? normalized : null;
}

function normalizeDate(value: unknown) {
  if (typeof value !== "string") return null;

  const raw = value.trim();
  if (!raw) return null;

  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;

  if (/^\d{2}\/\d{2}\/\d{4}$/.test(raw)) {
    const [dd, mm, yyyy] = raw.split("/");
    return `${yyyy}-${mm}-${dd}`;
  }

  return null;
}

function normalizeUuid(value: unknown) {
  if (typeof value !== "string") return null;
  const raw = value.trim();

  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  return uuidRegex.test(raw) ? raw : null;
}

function normalizeBoolean(value: unknown, fallback = true) {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    const raw = value.trim().toLowerCase();
    if (["true", "1", "sim", "yes"].includes(raw)) return true;
    if (["false", "0", "nao", "não", "no"].includes(raw)) return false;
  }
  return fallback;
}

export async function GET(request: Request) {
  try {
    const supabase = getSupabaseAdmin();
    const { searchParams } = new URL(request.url);

    const irmaoId = normalizeUuid(searchParams.get("irmao_id"));
    const categoria = normalizeText(searchParams.get("categoria"));
    const ativoParam = searchParams.get("ativo");

    let query = supabase
      .from(TABLE_NAME)
      .select("*")
      .order("created_at", { ascending: false });

    if (irmaoId) {
      query = query.eq("irmao_id", irmaoId);
    }

    if (categoria) {
      query = query.ilike("categoria", categoria);
    }

    if (ativoParam !== null) {
      query = query.eq("ativo", normalizeBoolean(ativoParam, true));
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: "Erro ao listar registros familiares.",
          error: error.message,
          table: TABLE_NAME,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Registros familiares listados com sucesso.",
        records: data ?? [],
        total: data?.length ?? 0,
        table: TABLE_NAME,
      },
      { status: 200 }
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro interno inesperado.";

    return NextResponse.json(
      {
        success: false,
        message: "Falha interna ao consultar a família.",
        error: message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const supabase = getSupabaseAdmin();
    const body = await request.json();

    const irmao_id = normalizeUuid(body?.irmao_id);
    const categoria = normalizeText(body?.categoria);
    const nome_completo = normalizeText(body?.nome_completo);
    const data_nascimento = normalizeDate(body?.data_nascimento);
    const telefone = normalizeText(body?.telefone);
    const email = normalizeText(body?.email);
    const observacoes = normalizeText(body?.observacoes);
    const ativo = normalizeBoolean(body?.ativo, true);

    if (!irmao_id) {
      return NextResponse.json(
        {
          success: false,
          message: "irmao_id obrigatório e deve ser um UUID válido.",
        },
        { status: 400 }
      );
    }

    if (!categoria) {
      return NextResponse.json(
        {
          success: false,
          message: "categoria é obrigatória.",
        },
        { status: 400 }
      );
    }

    if (!nome_completo) {
      return NextResponse.json(
        {
          success: false,
          message: "nome_completo é obrigatório.",
        },
        { status: 400 }
      );
    }

    const payload = {
      irmao_id,
      categoria,
      nome_completo,
      data_nascimento,
      telefone,
      email,
      observacoes,
      ativo,
    };

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert(payload)
      .select("*")
      .single();

    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: "Erro ao salvar registro familiar no Supabase.",
          error: error.message,
          table: TABLE_NAME,
          payload,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Registro familiar salvo com sucesso no Supabase.",
        record: data,
        table: TABLE_NAME,
      },
      { status: 200 }
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro interno inesperado.";

    return NextResponse.json(
      {
        success: false,
        message: "Falha interna ao salvar a família.",
        error: message,
      },
      { status: 500 }
    );
  }
}