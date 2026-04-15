import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL =
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";

const SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const STORAGE_BUCKET =
  process.env.SUPABASE_STORAGE_BUCKET_IRMAOS ||
  process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_IRMAOS ||
  "aurora-loja-maconica-irmaos";

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
]);

function getAdminClient() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return null;
  }

  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function sanitizeSegment(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9-_]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function getFileExtension(contentType: string) {
  if (contentType === "image/png") return "png";
  if (contentType === "image/webp") return "webp";
  return "jpg";
}

export async function POST(request: NextRequest) {
  try {
    const supabase = getAdminClient();

    if (!supabase) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Supabase não configurado corretamente para upload da foto do irmão.",
          debug: {
            hasSupabaseUrl: Boolean(SUPABASE_URL),
            hasServiceRole: Boolean(SUPABASE_SERVICE_ROLE_KEY),
            bucket: STORAGE_BUCKET,
          },
        },
        { status: 500 },
      );
    }

    const formData = await request.formData();

    const file = formData.get("file");
    const irmaoIdRaw = String(formData.get("irmaoId") || "").trim();
    const lojaIdRaw = String(formData.get("lojaId") || "").trim();

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          message: "Nenhum arquivo de imagem foi enviado.",
        },
        { status: 400 },
      );
    }

    if (!irmaoIdRaw) {
      return NextResponse.json(
        {
          success: false,
          message: "O identificador do irmão é obrigatório.",
        },
        { status: 400 },
      );
    }

    if (!lojaIdRaw) {
      return NextResponse.json(
        {
          success: false,
          message: "O identificador da loja é obrigatório.",
        },
        { status: 400 },
      );
    }

    if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Formato inválido. Envie JPG, PNG ou WEBP para a foto do irmão.",
        },
        { status: 400 },
      );
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        {
          success: false,
          message: "A imagem excede o limite de 5 MB.",
        },
        { status: 400 },
      );
    }

    const irmaoId = sanitizeSegment(irmaoIdRaw);
    const lojaId = sanitizeSegment(lojaIdRaw);

    if (!irmaoId || !lojaId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Os identificadores enviados não são válidos para armazenamento seguro.",
        },
        { status: 400 },
      );
    }

    const extension = getFileExtension(file.type);
    const filePath = `${lojaId}/${irmaoId}/perfil.${extension}`;
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const { error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(filePath, fileBuffer, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      return NextResponse.json(
        {
          success: false,
          message: "Falha ao enviar a foto do irmão para o armazenamento.",
          error: uploadError.message,
          bucket: STORAGE_BUCKET,
          filePath,
        },
        { status: 500 },
      );
    }

    const { data: publicUrlData } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(filePath);

    return NextResponse.json({
      success: true,
      message: "Foto do irmão enviada com sucesso.",
      filePath,
      bucket: STORAGE_BUCKET,
      publicUrl: publicUrlData.publicUrl,
      note:
        "Upload protegido concluído. No próximo passo vamos ligar a Minha Área a esta API.",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro inesperado no upload.";

    return NextResponse.json(
      {
        success: false,
        message: "Erro ao processar a foto do irmão.",
        error: message,
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = getAdminClient();

    if (!supabase) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Supabase não configurado corretamente para remoção da foto do irmão.",
          debug: {
            hasSupabaseUrl: Boolean(SUPABASE_URL),
            hasServiceRole: Boolean(SUPABASE_SERVICE_ROLE_KEY),
            bucket: STORAGE_BUCKET,
          },
        },
        { status: 500 },
      );
    }

    const body = await request.json().catch(() => null);

    const irmaoIdRaw = String(body?.irmaoId || "").trim();
    const lojaIdRaw = String(body?.lojaId || "").trim();

    if (!irmaoIdRaw || !lojaIdRaw) {
      return NextResponse.json(
        {
          success: false,
          message: "lojaId e irmaoId são obrigatórios para remover a foto.",
        },
        { status: 400 },
      );
    }

    const irmaoId = sanitizeSegment(irmaoIdRaw);
    const lojaId = sanitizeSegment(lojaIdRaw);

    const candidatePaths = [
      `${lojaId}/${irmaoId}/perfil.jpg`,
      `${lojaId}/${irmaoId}/perfil.png`,
      `${lojaId}/${irmaoId}/perfil.webp`,
    ];

    const { error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .remove(candidatePaths);

    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: "Falha ao remover a foto do irmão.",
          error: error.message,
          bucket: STORAGE_BUCKET,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Foto do irmão removida com sucesso.",
      bucket: STORAGE_BUCKET,
      removedPaths: candidatePaths,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro inesperado na remoção.";

    return NextResponse.json(
      {
        success: false,
        message: "Erro ao remover a foto do irmão.",
        error: message,
      },
      { status: 500 },
    );
  }
}