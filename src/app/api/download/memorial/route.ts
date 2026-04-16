import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const STORAGE_FILE = path.join(
  process.cwd(),
  "secure",
  "memorial-aurora.txt"
);

export async function GET() {
  try {
    const conteudo = await fs.readFile(STORAGE_FILE, "utf-8");

    return new NextResponse(conteudo, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Content-Disposition": 'attachment; filename="memorial-aurora.txt"',
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Não foi possível localizar o memorial protegido.",
      },
      { status: 404 }
    );
  }
}