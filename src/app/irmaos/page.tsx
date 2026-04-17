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
const WHATSAPP_NUMERO_FORMATADO = "(31) 99749-0074";
const WHATSAPP_LINK = "https://wa.me/5531997490074";

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

function limparSessao() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(CHAVE_SESSAO);
  window.sessionStorage.removeItem(CHAVE_SESSAO);
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

function AreaCard({
  badge,
  titulo,
  descricao,
  href,
}: {
  badge: string;
  titulo: string;
  descricao: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      style={{
        textDecoration: "none",
        display: "block",
        background: "#ffffff",
        borderRadius: 24,
        border: "1px solid #dbe4ea",
        padding: 22,
        boxShadow: "0 16px 40px rgba(15, 23, 42, 0.05)",
      }}
    >
      <div style={{ ...badgeStyle(), marginBottom: 14 }}>{badge}</div>

      <h2
        style={{
          margin: 0,
          color: "#0f172a",
          fontSize: 22,
          lineHeight: 1.2,
        }}
      >
        {titulo}
      </h2>

      <p
        style={{
          marginTop: 12,
          marginBottom: 0,
          color: "#475569",
          lineHeight: 1.8,
          fontSize: 15,
        }}
      >
        {descricao}
      </p>
    </Link>
  );
}

export default function IrmaosPage() {
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

  const areas = useMemo(
    () => [
      {
        badge: "Família",
        titulo: "Família e base social",
        descricao:
          "Cadastro familiar protegido para irmãos, cunhadas, sobrinhos, netos e registros vinculados à memória institucional.",
        href: "/irmaos/familia",
      },
      {
        badge: "Histórico",
        titulo: "Histórico institucional",
        descricao:
          "Área reservada para memória histórica, eventos marcantes, registros internos e expansão organizada da base da loja.",
        href: "/irmaos/historico",
      },
      {
        badge: "Documentos",
        titulo: "Documentos protegidos",
        descricao:
          "Downloads, arquivos internos, materiais reservados, documentos da loja e conteúdos liberados conforme o acesso.",
        href: "/irmaos/documentos",
      },
      {
        badge: "Agenda",
        titulo: "Agenda dos irmãos",
        descricao:
          "Compromissos, solenidades, reuniões, aniversários e organização da rotina institucional com leitura clara.",
        href: "/irmaos/agenda",
      },
      {
        badge: "Cargos",
        titulo: "Estrutura de cargos",
        descricao:
          "Entrada para leitura institucional dos cargos, responsabilidades e expansão do controle por papel dentro da loja.",
        href: "/cargos",
      },
      {
        badge: "Minha área",
        titulo: "Minha área institucional",
        descricao:
          "Área pessoal preparada para evolução do acesso do irmão, consulta de dados e leitura protegida da sessão atual.",
        href: "/minha-area",
      },
    ],
    [],
  );

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
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
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
              Área interna protegida
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                lineHeight: 1.05,
              }}
            >
              Validando acesso dos irmãos
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
              Aguarde um instante. Estamos conferindo a sessão para proteger os
              dados institucionais da loja, os cargos, os cadastros e os
              documentos reservados.
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
      <div style={{ maxWidth: 1260, margin: "0 auto" }}>
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
                Área interna dos irmãos
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
                Ambiente institucional protegido para irmãos autorizados
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
                Acesso reservado para leitura institucional, base familiar,
                histórico, documentos, agenda e expansão da estrutura interna da
                loja com segurança.
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
                  href="/login"
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
                  Revisar acesso
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    limparSessao();
                    window.location.href = "/login";
                  }}
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
                  Encerrar sessão
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
                gap: 12,
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.92)",
                }}
              >
                <strong>Sessão validada.</strong> Esta leitura confirma que o
                acesso foi liberado para a área interna da loja sem expor dados
                reservados a visitantes externos.
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
                  <div style={{ fontSize: 18, fontWeight: 800 }}>
                    {sessao?.loja ?? "Não identificado"}
                  </div>
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
                  <div style={{ fontSize: 18, fontWeight: 800 }}>
                    {sessao?.plano ?? "Sem plano"}
                  </div>
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
                  <div style={{ fontSize: 18, fontWeight: 800 }}>
                    {sessao?.status ?? "Sem status"}
                  </div>
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
                  <div style={{ fontSize: 18, fontWeight: 800 }}>
                    {sessao?.papel ?? "Sem papel"}
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
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
          }}
        >
          <div style={cardBase()}>
            <div style={{ ...badgeStyle(), marginBottom: 10 }}>Situação</div>
            <div
              style={{
                fontSize: 24,
                fontWeight: 900,
                color: "#0f172a",
                marginBottom: 10,
              }}
            >
              Sessão ativa
            </div>
            <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
              O ambiente interno foi liberado com leitura válida da sessão da
              loja.
            </p>
          </div>

          <div style={cardBase()}>
            <div style={{ ...badgeStyle(), marginBottom: 10 }}>Acesso</div>
            <div
              style={{
                fontSize: 24,
                fontWeight: 900,
                color: "#0f172a",
                marginBottom: 10,
              }}
            >
              Protegido
            </div>
            <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
              Cadastros, cargos, documentos e memória seguem atrás de login.
            </p>
          </div>

          <div style={cardBase()}>
            <div style={{ ...badgeStyle(), marginBottom: 10 }}>Plano</div>
            <div
              style={{
                fontSize: 24,
                fontWeight: 900,
                color: "#0f172a",
                marginBottom: 10,
              }}
            >
              {sessao?.plano ?? "Cortesia"}
            </div>
            <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
              Base pronta para expansão futura sem quebrar o que já funciona.
            </p>
          </div>

          <div style={cardBase()}>
            <div style={{ ...badgeStyle(), marginBottom: 10 }}>Responsável</div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 900,
                color: "#0f172a",
                marginBottom: 10,
                lineHeight: 1.3,
              }}
            >
              {sessao?.login ?? "Sem leitura"}
            </div>
            <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
              Leitura da sessão atual vinculada ao acesso institucional da loja.
            </p>
          </div>
        </section>

        <section
          style={{
            marginTop: 24,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 18,
          }}
        >
          {areas.map((area) => (
            <AreaCard
              key={area.titulo}
              badge={area.badge}
              titulo={area.titulo}
              descricao={area.descricao}
              href={area.href}
            />
          ))}
        </section>

        <section
          style={{
            marginTop: 24,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 18,
          }}
        >
          <section style={cardBase()}>
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
              Acesso dos irmãos com segurança da loja
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
              <li>A área dos irmãos exige sessão ativa para abrir.</li>
              <li>Sem login válido, o sistema retorna para a tela de acesso.</li>
              <li>Cadastros, cargos, documentos e memória ficam protegidos.</li>
              <li>
                Esta base já está pronta para evoluir depois para autenticação
                mais forte.
              </li>
            </ul>
          </section>

          <section style={cardBase()}>
            <div style={{ ...badgeStyle(), marginBottom: 14 }}>Próximos passos</div>

            <h2
              style={{
                marginTop: 0,
                marginBottom: 14,
                color: "#0f172a",
                fontSize: 26,
                lineHeight: 1.15,
              }}
            >
              Expansão interna da loja
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
              <li>Subir a logo real da loja na área interna.</li>
              <li>Fortalecer a sessão para autenticação institucional futura.</li>
              <li>Refinar permissões por cargo conforme a hierarquia da loja.</li>
              <li>Conectar os módulos internos à leitura real de usuários.</li>
            </ul>
          </section>

          <section
            style={{
              ...cardBase(),
              background: "linear-gradient(180deg, #ffffff 0%, #f6fffb 100%)",
              border: "1px solid #b7f0d7",
            }}
          >
            <div
              style={{
                ...badgeStyle("#166534", "#dcfce7", "#86efac"),
                marginBottom: 14,
              }}
            >
              Orientações e informações
            </div>

            <h2
              style={{
                marginTop: 0,
                marginBottom: 14,
                color: "#0f172a",
                fontSize: 26,
                lineHeight: 1.15,
              }}
            >
              Atendimento oficial via WhatsApp
            </h2>

            <p
              style={{
                marginTop: 0,
                marginBottom: 14,
                color: "#475569",
                lineHeight: 1.8,
                fontSize: 15,
              }}
            >
              Para orientações, informações e apoio de atendimento, fale
              diretamente pelo canal oficial da loja.
            </p>

            <div
              style={{
                display: "grid",
                gap: 10,
                marginBottom: 18,
              }}
            >
              <div
                style={{
                  display: "grid",
                  gap: 4,
                  padding: "14px 16px",
                  borderRadius: 18,
                  background: "#ffffff",
                  border: "1px solid #d1fae5",
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 800,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    color: "#166534",
                  }}
                >
                  WhatsApp oficial
                </span>
                <strong
                  style={{
                    fontSize: 22,
                    lineHeight: 1.2,
                    color: "#0f172a",
                  }}
                >
                  {WHATSAPP_NUMERO_FORMATADO}
                </strong>
              </div>

              <div
                style={{
                  padding: "12px 14px",
                  borderRadius: 16,
                  background: "#f0fdf4",
                  border: "1px solid #bbf7d0",
                  color: "#166534",
                  fontSize: 14,
                  fontWeight: 700,
                  lineHeight: 1.7,
                }}
              >
                Atendimento somente via WhatsApp.
              </div>
            </div>

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 48,
                padding: "0 18px",
                borderRadius: 16,
                textDecoration: "none",
                fontWeight: 800,
                background: "linear-gradient(135deg, #166534 0%, #22c55e 100%)",
                color: "#ffffff",
                boxShadow: "0 16px 35px rgba(34, 197, 94, 0.18)",
              }}
            >
              Falar no WhatsApp
            </a>
          </section>
        </section>
      </div>
    </main>
  );
}