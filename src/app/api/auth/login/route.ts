import { NextResponse } from "next/server";

const NOME_LOJA = "Loja Maçônica Aurora";
const LOGIN = "ricardogrupoexecutivo1@gmail.com";
const SENHA = "123456";
const COOKIE_NAME = "aurora_loja_auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const nomeLoja = String(body?.nomeLoja || "").trim();
    const login = String(body?.login || "").trim().toLowerCase();
    const senha = String(body?.senha || "");

    const nomeCorreto = nomeLoja.toLowerCase() === NOME_LOJA.toLowerCase();
    const loginCorreto = login === LOGIN.toLowerCase();
    const senhaCorreta = senha === SENHA;

    if (!nomeCorreto || !loginCorreto || !senhaCorreta) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Login inválido. Para este ambiente inicial, use o nome da loja correto, o login principal e a senha provisória.",
        },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      session: {
        autenticado: true,
        nomeLoja: NOME_LOJA,
        login: LOGIN,
        plano: "Cortesia",
        status: "Ativa",
        role: "admin_master",
        acessoLiberado: true,
      },
      message: "Login realizado com sucesso. Sessão protegida criada para a loja.",
    });

    response.cookies.set({
      name: COOKIE_NAME,
      value: "autenticado",
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      path: "/",
      maxAge: 60 * 60 * 8,
    });

    return response;
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Não foi possível processar o login agora.",
      },
      { status: 500 }
    );
  }
}