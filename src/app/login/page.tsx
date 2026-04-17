"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type SessaoLoja = {
  loja: string;
  login: string;
  plano: string;
  status: string;
  papel: string;
  acesso: string;
  logadoEm: string;
};

const CHAVE_SESSAO = "aurora_loja_maconica_sessao";
const LOJA_PADRAO = "Loja Maçônica Aurora";
const LOGIN_PADRAO = "ricardogrupoexecutivo1@gmail.com";
const SENHA_PROVISORIA = "123456";

function lerSessao(): SessaoLoja | null {
  if (typeof window === "undefined") return null;

  try {
    const valor = window.localStorage.getItem(CHAVE_SESSAO);
    if (!valor) return null;

    const sessao = JSON.parse(valor) as SessaoLoja;

    if (!sessao?.loja || !sessao?.login) {
      return null;
    }

    return sessao;
  } catch {
    return null;
  }
}

function salvarSessao(sessao: SessaoLoja, salvarNoDispositivo: boolean) {
  if (typeof window === "undefined") return;

  if (!salvarNoDispositivo) {
    window.localStorage.removeItem(CHAVE_SESSAO);
    window.sessionStorage.setItem(CHAVE_SESSAO, JSON.stringify(sessao));
    return;
  }

  window.sessionStorage.removeItem(CHAVE_SESSAO);
  window.localStorage.setItem(CHAVE_SESSAO, JSON.stringify(sessao));
}

function limparSessao() {
  if (typeof window === "undefined") return;

  window.localStorage.removeItem(CHAVE_SESSAO);
  window.sessionStorage.removeItem(CHAVE_SESSAO);
}

function lerSessaoCompleta(): SessaoLoja | null {
  if (typeof window === "undefined") return null;

  try {
    const local = window.localStorage.getItem(CHAVE_SESSAO);
    if (local) {
      const sessao = JSON.parse(local) as SessaoLoja;
      if (sessao?.loja && sessao?.login) return sessao;
    }

    const sessaoAtual = window.sessionStorage.getItem(CHAVE_SESSAO);
    if (sessaoAtual) {
      const sessao = JSON.parse(sessaoAtual) as SessaoLoja;
      if (sessao?.loja && sessao?.login) return sessao;
    }

    return null;
  } catch {
    return null;
  }
}

function cardStyle(): React.CSSProperties {
  return {
    background: "#ffffff",
    borderRadius: 24,
    border: "1px solid #dbe4ea",
    padding: 22,
    boxShadow: "0 16px 40px rgba(15, 23, 42, 0.05)",
  };
}

function badgeStyle(cor = "#0f766e", fundo = "#ecfeff", borda = "#a5f3fc"): React.CSSProperties {
  return {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    padding: "7px 12px",
    background: fundo,
    border: `1px solid ${borda}`,
    color: cor,
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: "0.04em",
  };
}

export default function LoginPage() {
  const [nomeLoja, setNomeLoja] = useState(LOJA_PADRAO);
  const [login, setLogin] = useState(LOGIN_PADRAO);
  const [senha, setSenha] = useState("");
  const [salvarNoDispositivo, setSalvarNoDispositivo] = useState(true);
  const [sessao, setSessao] = useState<SessaoLoja | null>(null);
  const [mensagem, setMensagem] = useState(
    "Para acessar a área interna da loja, faça login por segurança institucional.",
  );
  const [tipoMensagem, setTipoMensagem] = useState<"info" | "erro" | "sucesso">("info");

  useEffect(() => {
    const sessaoAtual = lerSessaoCompleta();
    if (sessaoAtual) {
      setSessao(sessaoAtual);
      setMensagem("Sessão ativa. Você já pode acessar a área interna da loja com segurança.");
      setTipoMensagem("sucesso");
    }
  }, []);

  const acessoPadrao = useMemo(
    () => ({
      loja: LOJA_PADRAO,
      plano: "Cortesia",
      status: "Ativa",
      papel: "admin_master",
      acesso: "Liberado",
      loginPrincipal: LOGIN_PADRAO,
    }),
    [],
  );

  function entrar(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const lojaOk = nomeLoja.trim().toLowerCase() === LOJA_PADRAO.toLowerCase();
    const loginOk = login.trim().toLowerCase() === LOGIN_PADRAO.toLowerCase();
    const senhaOk = senha.trim() === SENHA_PROVISORIA;

    if (!lojaOk || !loginOk || !senhaOk) {
      setTipoMensagem("erro");
      setMensagem(
        "Login inválido. Para este ambiente inicial, use o nome da loja correto, o login principal e a senha provisória.",
      );
      return;
    }

    const novaSessao: SessaoLoja = {
      loja: LOJA_PADRAO,
      login: LOGIN_PADRAO,
      plano: "Cortesia",
      status: "Ativa",
      papel: "admin_master",
      acesso: "Liberado",
      logadoEm: new Date().toISOString(),
    };

    salvarSessao(novaSessao, salvarNoDispositivo);
    setSessao(novaSessao);
    setSenha("");
    setTipoMensagem("sucesso");
    setMensagem("Sessão ativa com sucesso. Agora o acesso à área interna está liberado.");
  }

  function sair() {
    limparSessao();
    setSessao(null);
    setSenha("");
    setTipoMensagem("info");
    setMensagem("Sessão encerrada. Para acessar a área interna da loja, faça login novamente.");
  }

  function irParaIrmaos() {
    const sessaoAtual = lerSessaoCompleta();

    if (!sessaoAtual) {
      setTipoMensagem("erro");
      setMensagem(
        "Para acessar a área de irmãos, faça login primeiro. O acesso é protegido para preservar cargos, cadastros, documentos e memória institucional.",
      );
      return;
    }

    window.location.href = "/irmaos";
  }

  const corMensagem =
    tipoMensagem === "erro"
      ? {
          fundo: "#fff1f2",
          borda: "#fecdd3",
          cor: "#9f1239",
        }
      : tipoMensagem === "sucesso"
        ? {
            fundo: "#ecfdf5",
            borda: "#bbf7d0",
            cor: "#166534",
          }
        : {
            fundo: "#eff6ff",
            borda: "#bfdbfe",
            cor: "#1d4ed8",
          };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #f7fbf8 0%, #eef7f1 50%, #f7fbf8 100%)",
        padding: "24px 16px 56px",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <div style={{ maxWidth: 1260, margin: "0 auto" }}>
        <section
          style={{
            ...cardStyle(),
            background: "linear-gradient(135deg, #052e2b 0%, #065f46 55%, #059669 100%)",
            color: "#ffffff",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 30px 80px rgba(5, 46, 43, 0.24)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 20,
              alignItems: "stretch",
            }}
          >
            <div>
              <div
                style={{
                  ...badgeStyle("#dcfce7", "rgba(255,255,255,0.12)", "rgba(255,255,255,0.18)"),
                  marginBottom: 16,
                }}
              >
                Login geral simples da loja
              </div>

              <div
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.88)",
                  marginBottom: 10,
                }}
              >
                Aurora Loja Maçônica
              </div>

              <h1
                style={{
                  margin: 0,
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  lineHeight: 1.05,
                }}
              >
                Login da loja • Aurora Loja Maçônica
              </h1>

              <p
                style={{
                  marginTop: 16,
                  marginBottom: 0,
                  maxWidth: 760,
                  color: "rgba(255,255,255,0.92)",
                  lineHeight: 1.8,
                  fontSize: 16,
                }}
              >
                Entrada simples para ambiente restrito da loja, com leitura de plano, status e
                papel do usuário. Esta etapa prepara o controle de acesso sem complicar o sistema.
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 12,
                  marginTop: 22,
                }}
              >
                <Link
                  href="/"
                  style={{
                    textDecoration: "none",
                    background: "#ffffff",
                    color: "#065f46",
                    padding: "12px 18px",
                    borderRadius: 16,
                    fontWeight: 800,
                    border: "1px solid rgba(255,255,255,0.18)",
                    boxShadow: "0 12px 28px rgba(15, 23, 42, 0.08)",
                  }}
                >
                  Voltar à home
                </Link>

                <Link
                  href="/como-usar"
                  style={{
                    textDecoration: "none",
                    background: "rgba(255,255,255,0.10)",
                    color: "#ffffff",
                    padding: "12px 18px",
                    borderRadius: 16,
                    fontWeight: 800,
                    border: "1px solid rgba(255,255,255,0.18)",
                  }}
                >
                  Como usar a plataforma
                </Link>

                <button
                  type="button"
                  onClick={irParaIrmaos}
                  style={{
                    cursor: "pointer",
                    background: "rgba(255,255,255,0.10)",
                    color: "#ffffff",
                    padding: "12px 18px",
                    borderRadius: 16,
                    fontWeight: 800,
                    border: "1px solid rgba(255,255,255,0.18)",
                  }}
                >
                  Ir para irmãos
                </button>
              </div>
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.14)",
                borderRadius: 24,
                padding: 20,
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.92)",
                }}
              >
                <strong>Sistema em constante atualização.</strong> Esta tela de login é uma base
                segura inicial para o controle restrito da loja, preparada para evoluir depois sem
                quebrar o que já funciona.
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    borderRadius: 18,
                    padding: 16,
                  }}
                >
                  <div style={{ fontSize: 12, fontWeight: 800, opacity: 0.8, marginBottom: 8 }}>
                    Loja
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 800 }}>{acessoPadrao.loja}</div>
                </div>

                <div
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    borderRadius: 18,
                    padding: 16,
                  }}
                >
                  <div style={{ fontSize: 12, fontWeight: 800, opacity: 0.8, marginBottom: 8 }}>
                    Plano
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 800 }}>{acessoPadrao.plano}</div>
                </div>

                <div
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    borderRadius: 18,
                    padding: 16,
                  }}
                >
                  <div style={{ fontSize: 12, fontWeight: 800, opacity: 0.8, marginBottom: 8 }}>
                    Status
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 800 }}>{acessoPadrao.status}</div>
                </div>

                <div
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    borderRadius: 18,
                    padding: 16,
                  }}
                >
                  <div style={{ fontSize: 12, fontWeight: 800, opacity: 0.8, marginBottom: 8 }}>
                    Papel
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 800 }}>{acessoPadrao.papel}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          style={{
            marginTop: 22,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 18,
          }}
        >
          <section style={cardStyle()}>
            <div style={{ ...badgeStyle(), marginBottom: 14 }}>Leitura do acesso padrão</div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: 12,
              }}
            >
              <div
                style={{
                  borderRadius: 18,
                  border: "1px solid #dbe4ea",
                  padding: 16,
                  background: "#f8fafc",
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 800, color: "#475569", marginBottom: 8 }}>
                  Login principal
                </div>
                <div style={{ fontWeight: 800, color: "#0f172a" }}>{acessoPadrao.loginPrincipal}</div>
              </div>

              <div
                style={{
                  borderRadius: 18,
                  border: "1px solid #dbe4ea",
                  padding: 16,
                  background: "#f8fafc",
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 800, color: "#475569", marginBottom: 8 }}>
                  Plano
                </div>
                <div style={{ fontWeight: 800, color: "#0f172a" }}>{acessoPadrao.plano}</div>
              </div>

              <div
                style={{
                  borderRadius: 18,
                  border: "1px solid #dbe4ea",
                  padding: 16,
                  background: "#f8fafc",
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 800, color: "#475569", marginBottom: 8 }}>
                  Status
                </div>
                <div style={{ fontWeight: 800, color: "#0f172a" }}>{acessoPadrao.status}</div>
              </div>

              <div
                style={{
                  borderRadius: 18,
                  border: "1px solid #dbe4ea",
                  padding: 16,
                  background: "#f8fafc",
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 800, color: "#475569", marginBottom: 8 }}>
                  Acesso
                </div>
                <div style={{ fontWeight: 800, color: "#0f172a" }}>{acessoPadrao.acesso}</div>
              </div>
            </div>

            <div
              style={{
                marginTop: 16,
                borderRadius: 18,
                border: `1px solid ${corMensagem.borda}`,
                background: corMensagem.fundo,
                color: corMensagem.cor,
                padding: 16,
                lineHeight: 1.7,
                fontSize: 14,
              }}
            >
              {mensagem}
            </div>
          </section>

          <section style={cardStyle()}>
            <div style={{ ...badgeStyle(), marginBottom: 14 }}>Entrar na loja</div>

            <h2
              style={{
                marginTop: 0,
                marginBottom: 10,
                fontSize: 26,
                lineHeight: 1.15,
                color: "#0f172a",
              }}
            >
              Login simples com nome da loja, login principal e senha provisória para esta fase
              inicial.
            </h2>

            <form onSubmit={entrar}>
              <div style={{ display: "grid", gap: 14 }}>
                <div>
                  <label
                    htmlFor="loja"
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 800,
                      color: "#334155",
                      marginBottom: 8,
                    }}
                  >
                    Nome da loja
                  </label>
                  <input
                    id="loja"
                    value={nomeLoja}
                    onChange={(e) => setNomeLoja(e.target.value)}
                    placeholder="Loja Maçônica Aurora"
                    style={{
                      width: "100%",
                      borderRadius: 16,
                      border: "1px solid #cbd5e1",
                      padding: "14px 16px",
                      fontSize: 15,
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="login"
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 800,
                      color: "#334155",
                      marginBottom: 8,
                    }}
                  >
                    Login
                  </label>
                  <input
                    id="login"
                    type="email"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    placeholder="ricardogrupoexecutivo1@gmail.com"
                    style={{
                      width: "100%",
                      borderRadius: 16,
                      border: "1px solid #cbd5e1",
                      padding: "14px 16px",
                      fontSize: 15,
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="senha"
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 800,
                      color: "#334155",
                      marginBottom: 8,
                    }}
                  >
                    Senha
                  </label>
                  <input
                    id="senha"
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder="Senha provisória inicial"
                    style={{
                      width: "100%",
                      borderRadius: 16,
                      border: "1px solid #cbd5e1",
                      padding: "14px 16px",
                      fontSize: 15,
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    fontSize: 14,
                    color: "#334155",
                    fontWeight: 700,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={salvarNoDispositivo}
                    onChange={(e) => setSalvarNoDispositivo(e.target.checked)}
                  />
                  Salvar sessão local neste dispositivo
                </label>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 12,
                    marginTop: 6,
                  }}
                >
                  <button
                    type="submit"
                    style={{
                      cursor: "pointer",
                      border: "none",
                      borderRadius: 16,
                      background: "linear-gradient(180deg, #166534 0%, #14532d 100%)",
                      color: "#ffffff",
                      padding: "14px 18px",
                      fontWeight: 800,
                      minWidth: 140,
                    }}
                  >
                    Entrar
                  </button>

                  <button
                    type="button"
                    onClick={sair}
                    style={{
                      cursor: "pointer",
                      borderRadius: 16,
                      background: "#ffffff",
                      color: "#0f172a",
                      border: "1px solid #cbd5e1",
                      padding: "14px 18px",
                      fontWeight: 800,
                      minWidth: 160,
                    }}
                  >
                    Encerrar sessão
                  </button>
                </div>
              </div>
            </form>
          </section>
        </section>

        <section
          style={{
            marginTop: 22,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 18,
          }}
        >
          <section style={cardStyle()}>
            <div style={{ ...badgeStyle(), marginBottom: 14 }}>Sessão atual</div>
            <p style={{ marginTop: 0, color: "#475569", lineHeight: 1.8 }}>
              Leitura da sessão local preparada para a loja.
            </p>

            <div style={{ display: "grid", gap: 12 }}>
              <div
                style={{
                  borderRadius: 18,
                  border: "1px solid #dbe4ea",
                  padding: 16,
                  background: "#f8fafc",
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 800, color: "#475569", marginBottom: 8 }}>
                  Situação
                </div>
                <div style={{ fontWeight: 800, color: "#0f172a" }}>
                  {sessao ? "Sessão ativa" : "Sem sessão"}
                </div>
              </div>

              <div
                style={{
                  borderRadius: 18,
                  border: "1px solid #dbe4ea",
                  padding: 16,
                  background: "#f8fafc",
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 800, color: "#475569", marginBottom: 8 }}>
                  Nome da loja
                </div>
                <div style={{ fontWeight: 800, color: "#0f172a" }}>
                  {sessao?.loja ?? "Sem leitura de sessão"}
                </div>
              </div>

              <div
                style={{
                  borderRadius: 18,
                  border: "1px solid #dbe4ea",
                  padding: 16,
                  background: "#f8fafc",
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 800, color: "#475569", marginBottom: 8 }}>
                  Plano
                </div>
                <div style={{ fontWeight: 800, color: "#0f172a" }}>
                  {sessao?.plano ?? "Sem plano carregado"}
                </div>
              </div>

              <div
                style={{
                  borderRadius: 18,
                  border: "1px solid #dbe4ea",
                  padding: 16,
                  background: "#f8fafc",
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 800, color: "#475569", marginBottom: 8 }}>
                  Status
                </div>
                <div style={{ fontWeight: 800, color: "#0f172a" }}>
                  {sessao?.status ?? "Sem status carregado"}
                </div>
              </div>

              <div
                style={{
                  borderRadius: 18,
                  border: "1px solid #dbe4ea",
                  padding: 16,
                  background: "#f8fafc",
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 800, color: "#475569", marginBottom: 8 }}>
                  Papel
                </div>
                <div style={{ fontWeight: 800, color: "#0f172a" }}>
                  {sessao?.papel ?? "Sem papel carregado"}
                </div>
              </div>
            </div>
          </section>

          <section style={cardStyle()}>
            <div style={{ ...badgeStyle(), marginBottom: 14 }}>Leitura institucional</div>

            <h2
              style={{
                marginTop: 0,
                marginBottom: 14,
                color: "#0f172a",
                fontSize: 26,
                lineHeight: 1.15,
              }}
            >
              Modelo simples para cortesia, teste e expansão futura do acesso.
            </h2>

            <div style={{ display: "grid", gap: 12 }}>
              <div
                style={{
                  borderRadius: 18,
                  border: "1px solid #dbe4ea",
                  padding: 16,
                  background: "#f8fafc",
                }}
              >
                <div style={{ fontWeight: 800, color: "#0f172a", marginBottom: 8 }}>Base pronta</div>
                <div style={{ color: "#475569", lineHeight: 1.8 }}>
                  O acesso às áreas internas da loja é protegido por login, preservando cargos,
                  cadastros, documentos, memória institucional e informações reservadas.
                </div>
              </div>

              <div
                style={{
                  borderRadius: 18,
                  border: "1px solid #dbe4ea",
                  padding: 16,
                  background: "#f8fafc",
                }}
              >
                <div style={{ fontWeight: 800, color: "#0f172a", marginBottom: 8 }}>Cortesia</div>
                <div style={{ color: "#475569", lineHeight: 1.8 }}>
                  Sua loja pode continuar com acesso em cortesia sem cobrança por agora.
                </div>
              </div>

              <div
                style={{
                  borderRadius: 18,
                  border: "1px solid #dbe4ea",
                  padding: 16,
                  background: "#f8fafc",
                }}
              >
                <div style={{ fontWeight: 800, color: "#0f172a", marginBottom: 8 }}>Teste</div>
                <div style={{ color: "#475569", lineHeight: 1.8 }}>
                  Outras lojas podem ser liberadas depois em plano de teste sem complicar o app.
                </div>
              </div>

              <div
                style={{
                  borderRadius: 18,
                  border: "1px solid #dbe4ea",
                  padding: 16,
                  background: "#f8fafc",
                }}
              >
                <div style={{ fontWeight: 800, color: "#0f172a", marginBottom: 8 }}>
                  Senha provisória
                </div>
                <div style={{ color: "#475569", lineHeight: 1.8 }}>
                  Nesta fase inicial, a senha provisória pode ser simples e depois nós trocamos por
                  autenticação real mais forte.
                </div>
              </div>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}