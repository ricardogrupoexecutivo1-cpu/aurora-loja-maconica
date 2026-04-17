import { NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

export const runtime = "nodejs";

function sanitizarNomeArquivo(nome: string) {
  const extensao = path.extname(nome).toLowerCase() || ".png";
  const base = path
    .basename(nome, extensao)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9-_]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();

  const nomeBase = base || "capa-livro";
  const timestamp = Date.now();

  return `${nomeBase}-${timestamp}${extensao}`;
}

function tipoPermitido(tipo: string) {
  return [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
  ].includes(tipo);
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const arquivo = formData.get("file");

    if (!arquivo || !(arquivo instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          message: "Nenhum arquivo de imagem foi enviado.",
        },
        { status: 400 }
      );
    }

    if (!tipoPermitido(arquivo.type)) {
      return NextResponse.json(
        {
          success: false,
          message: "Formato inválido. Envie PNG, JPG, JPEG ou WEBP.",
        },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await arquivo.arrayBuffer());
    const pastaDestino = path.join(
      process.cwd(),
      "public",
      "uploads",
      "capas"
    );

    await mkdir(pastaDestino, { recursive: true });

    const nomeFinal = sanitizarNomeArquivo(arquivo.name);
    const caminhoCompleto = path.join(pastaDestino, nomeFinal);

    await writeFile(caminhoCompleto, buffer);

    const urlPublica = `/uploads/capas/${nomeFinal}`;

    return NextResponse.json({
      success: true,
      message: "Capa enviada e salva com sucesso.",
      fileName: nomeFinal,
      url: urlPublica,
    });
  } catch (error) {
    console.error("Erro no upload da capa:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Falha ao salvar a capa no servidor local.",
      },
      { status: 500 }
    );
  }
}