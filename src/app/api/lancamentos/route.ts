import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      titulo,
      tipo,
      status,
      prioridade,
      data,
      categoria,
      descricao,
    } = body;

    if (!titulo || !categoria) {
      return NextResponse.json({
        success: false,
        message: "Título e categoria são obrigatórios",
      });
    }

    const { error } = await supabase
      .from("alm_general_entries")
      .insert([
        {
          loja_id: "loja-maconica-aurora",
          titulo,
          tipo,
          status,
          prioridade,
          data_referencia: data || null,
          descricao,
        },
      ]);

    if (error) {
      return NextResponse.json({
        success: false,
        message: error.message,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Lançamento salvo no Supabase",
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      message: err.message,
    });
  }
}