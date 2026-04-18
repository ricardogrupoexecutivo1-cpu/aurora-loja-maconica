"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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
const LIVRO_PDF_URL = "/api/download/memorial";

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

function cardBase(): React.CSSProperties {
  return {
    background: "#ffffff",
    borderRadius: 24,
    border: "1px solid #dbe4ea",
    padding: 22,
    boxShadow: "0 16px 40px rgba(15, 23, 42, 0.05)",
  };
}

function badgeStyle(
  cor = "#0f766e",
  fundo = "#ecfeff",
  borda = "#a5f3fc",
): React.CSSProperties {
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

export default function LivroPage() {
  const [sessao, setSessao] = useState<SessaoLoja | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const sessaoAtual = lerSessaoCompleta();

    if (!sessaoAtual) {
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      return;
    }

    setSessao(sessaoAtual);
    setCarregando(false);
  }, []);

  if (carregando) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(180deg, #f7fbf8 0%, #eef7f1 50%, #f7fbf8 100%)",
          padding: "24px 16px 56px",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <section
            style={{
              ...cardBase(),
              background:
                "linear-gradient(135deg, #052e2b 0%, #065f46 55%, #059669 100%)",
              color: "#ffffff",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 30px 80px rgba(5, 46, 43, 0.24)",
            }}
          >
            <div
              style={{
                ...badgeStyle(
                  "#dcfce7",
                  "rgba(255,255,255,0.12)",
                  "rgba(255,255,255,0.18)",
                ),
                marginBottom: 16,
              }}
            >
              Livro institucional
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                lineHeight: 1.05,
              }}
            >
              Validando acesso ao livro
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
              Aguarde um instante enquanto o ambiente interno é validado.
            </p>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #f7fbf8 0%, #eef7f1 50%, #f7fbf8 100%)",
        padding: "24px 16px 56px",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <section
          style={{
            ...cardBase(),
            background:
              "linear-gradient(135deg, #052e2b 0%, #065f46 55%, #059669 100%)",
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
                  ...badgeStyle(
                    "#dcfce7",
                    "rgba(255,255,255,0.12)",
                    "rgba(255,255,255,0.18)",
                  ),
                  marginBottom: 16,
                }}
              >
                Livro institucional
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
                Livro em cortesia
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
                Conteúdo disponibilizado como cortesia do <strong>Ir.'. Ricardo Leonardo Moreira</strong>,
                em área própria e isolada, para leitura segura sem interferir nas demais páginas do sistema.
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
                  href="/sistema"
                  style={{
                    textDecoration: "none",
                    background: "#ffffff",
                    color: "#065f46",
                    padding: "12px 18px",
                    borderRadius: 16,
                    fontWeight: 800,
                    border: "1px solid rgba(255,255,255,0.18)",
                  }}
                >
                  Voltar ao sistema
                </Link>

                <a
                  href={LIVRO_PDF_URL}
                  target="_blank"
                  rel="noreferrer"
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
                  Ler o livro
                </a>

                <a
                  href={LIVRO_PDF_URL}
                  download
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
                  Baixar o livro
                </a>
              </div>
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.14)",
                borderRadius: 24,
                padding: 20,
                display: "grid",
                gap: 12,
              }}
            >
              <div style={{ fontSize: 14, lineHeight: 1.8, color: "rgba(255,255,255,0.92)" }}>
                <strong>Leitura protegida.</strong> Esta página foi criada de forma isolada,
                seguindo a regra de segurança da plataforma: nova função, nova página, sem mexer
                no que já está funcionando.
              </div>

              <div
                style={{
                  display: "grid",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    borderRadius: 18,
                    padding: 16,
                  }}
                >
                  <div style={{ fontSize: 12, fontWeight: 800, opacity: 0.8, marginBottom: 8 }}>
                    Cortesia
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 800 }}>
                    Ir.'. Ricardo Leonardo Moreira
                  </div>
                </div>

                <div
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    borderRadius: 18,
                    padding: 16,
                  }}
                >
                  <div style={{ fontSize: 12, fontWeight: 800, opacity: 0.8, marginBottom: 8 }}>
                    Loja
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 800 }}>
                    {sessao?.loja ?? "Não identificada"}
                  </div>
                </div>

                <div
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    borderRadius: 18,
                    padding: 16,
                  }}
                >
                  <div style={{ fontSize: 12, fontWeight: 800, opacity: 0.8, marginBottom: 8 }}>
                    Acesso
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 800 }}>
                    Interno e organizado
                  </div>
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
          <section style={cardBase()}>
            <div style={{ ...badgeStyle(), marginBottom: 14 }}>Leitura do conteúdo</div>

            <h2
              style={{
                marginTop: 0,
                marginBottom: 14,
                color: "#0f172a",
                fontSize: 26,
                lineHeight: 1.15,
              }}
            >
              Página própria para o livro
            </h2>

            <p
              style={{
                marginTop: 0,
                marginBottom: 0,
                color: "#475569",
                lineHeight: 1.8,
                fontSize: 15,
              }}
            >
              O livro fica em área separada, com botão de leitura e de download.
              Isso mantém o sistema estável e facilita futuras ampliações sem mexer nas páginas que já estão no ar.
            </p>
          </section>

          <section style={cardBase()}>
            <div style={{ ...badgeStyle(), marginBottom: 14 }}>Próximas funções</div>

            <h2
              style={{
                marginTop: 0,
                marginBottom: 14,
                color: "#0f172a",
                fontSize: 26,
                lineHeight: 1.15,
              }}
            >
              Espaço pronto para crescer
            </h2>

            <ul
              style={{
                margin: 0,
                paddingLeft: 22,
                color: "#475569",
                lineHeight: 1.9,
                fontSize: 15,
              }}
            >
              <li>Livro em página própria</li>
              <li>Botão no painel do sistema</li>
              <li>Novas cortesias em páginas independentes</li>
              <li>Novos módulos sem quebrar produção</li>
            </ul>
          </section>
        </section>
      </div>
    </main>
  );
}