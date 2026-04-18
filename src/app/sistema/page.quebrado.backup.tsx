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

function GrupoAcessos({
  titulo,
  descricao,
  itens,
}: {
  titulo: string;
  descricao: string;
  itens: { label: string; href: string; destaque?: boolean; reservado?: boolean }[];
}) {
  return (
    <section style={cardBase()}>
      <div style={{ ...badgeStyle(), marginBottom: 14 }}>{titulo}</div>

      <h2
        style={{
          marginTop: 0,
          marginBottom: 10,
          color: "#0f172a",
          fontSize: 28,
          lineHeight: 1.15,
        }}
      >
        {titulo}
      </h2>

      <p
        style={{
          marginTop: 0,
          marginBottom: 16,
          color: "#475569",
          lineHeight: 1.8,
          fontSize: 15,
        }}
      >
        {descricao}
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 12,
        }}
      >
        {itens.map((item) =>
          item.reservado ? (
            <div
              key={`${titulo}-${item.label}`}
              style={{
                borderRadius: 18,
                padding: "16px 18px",
                background: "#f8fafc",
                border: "1px dashed #cbd5e1",
                color: "#475569",
                fontWeight: 800,
                lineHeight: 1.5,
              }}
            >
              {item.label}
            </div>
          ) : (
            <Link
              key={`${titulo}-${item.href}-${item.label}`}
              href={item.href}
              style={{
                textDecoration: "none",
                borderRadius: 18,
                padding: "16px 18px",
                background: item.destaque ? "#ecfdf5" : "#f8fafc",
                border: item.destaque ? "1px solid #bbf7d0" : "1px solid #dbe4ea",
                color: "#0f172a",
                fontWeight: 800,
                lineHeight: 1.5,
                boxShadow: item.destaque ? "0 10px 25px rgba(34, 197, 94, 0.08)" : "none",
              }}
            >
              {item.label}
            </Link>
          ),
        )}
      </div>
    </section>
  );
}

export default function SistemaPage() {
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

  const grupos = useMemo(
    () => [
      {
        titulo: "Acessos principais",
        descricao:
          "Entrada rápida para os pontos mais usados do sistema, com leitura clara e acesso fácil para todos.",
        itens: [
          { label: "Área dos irmãos", href: "/irmaos", destaque: true },
          { label: "Relação dos irmãos", href: "/irmaos/lista", destaque: true },
          { label: "Agenda interna", href: "/irmaos/agenda" },
          { label: "Documentos", href: "/irmaos/documentos" },
          { label: "Histórico", href: "/irmaos/historico" },
          { label: "Família", href: "/irmaos/familia" },
        ],
      },
      {
        titulo: "Cadastros e estrutura",
        descricao:
          "Pontos de consulta e expansão da base institucional, cargos, áreas pessoais e organização interna da loja.",
        itens: [
          { label: "Cargos", href: "/cargos" },
          { label: "Minha área", href: "/minha-area" },
          { label: "Mensageria", href: "/mensageria" },
          { label: "Secretaria", href: "/secretaria", destaque: true },
          { label: "Ex-veneráveis", href: "/ex-veneraveis" },
          { label: "Irmãos remidos", href: "/irmaos-remidos" },
          { label: "Configurar loja", href: "/configurar-loja" },
        ],
      },
      {
        titulo: "Memória institucional e eventos",
        descricao:
          "Acessos ligados à preservação da memória da loja, registro de eventos, fotos e organização histórica da base institucional.",
        itens: [
          { label: "Fotos por evento", href: "/fotos", destaque: true },
          { label: "Eventos com galeria", href: "/fotos" },
          { label: "Histórico institucional", href: "/irmaos/historico" },
          { label: "Documentos protegidos", href: "/irmaos/documentos" },
        ],
      },
      {
        titulo: "Acervo e patrimônio",
        descricao:
          "Área isolada para registrar objetos, materiais, patrimônio simbólico, itens históricos e expansão futura do acervo institucional.",
        itens: [
          { label: "Acervo institucional", href: "/acervo", destaque: true },
          { label: "Patrimônio simbólico", href: "#", reservado: true },
          { label: "Objetos históricos", href: "#", reservado: true },
          { label: "Inventário futuro", href: "#", reservado: true },
        ],
      },
      {
        titulo: "Contratos e documentos formais",
        descricao:
          "Área isolada para contratos, termos, registros institucionais e expansão futura de documentos assináveis, sem interferir nas páginas já publicadas.",
        itens: [
          { label: "Contratos institucionais", href: "/contratos", destaque: true },
          { label: "Termos formais", href: "#", reservado: true },
          { label: "Assinaturas futuras", href: "#", reservado: true },
          { label: "Modelos de contrato", href: "#", reservado: true },
        ],
      },
      {
        titulo: "Cortesias e conteúdos especiais",
        descricao:
          "Área para conteúdos em página própria, isolados do restante do sistema, preservando a estabilidade da plataforma.",
        itens: [
          { label: "Livro em cortesia do Ir.'. Ricardo Leonardo Moreira", href: "/livro", destaque: true },
          { label: "Conteúdo especial 2", href: "#", reservado: true },
          { label: "Conteúdo especial 3", href: "#", reservado: true },
          { label: "Conteúdo especial 4", href: "#", reservado: true },
        ],
      },
      {
        titulo: "Financeiro e relatórios",
        descricao:
          "Áreas administrativas e relatórios gerais. Como já existe uma base financeira anterior e também uma nova camada premium isolada, esta seção passa a organizar os dois caminhos com clareza e blindagem.",
        itens: [
          { label: "Financeiro", href: "/financeiro", destaque: true },
          { label: "Visão geral do financeiro", href: "/financeiro/visao-geral", destaque: true },
          { label: "Novo lançamento", href: "/financeiro/novo" },
          { label: "Relatórios", href: "/financeiro/relatorios" },
          { label: "Centros institucionais", href: "/financeiro/centros" },
          { label: "Categorias financeiras", href: "/financeiro/categorias" },
          { label: "Contas financeiras", href: "/financeiro/contas" },
          { label: "Planos", href: "/planos" },
        ],
      },
      {
        titulo: "Novas funcionalidades reservadas",
        descricao:
          "Espaços livres já deixados no painel para futuras implementações em páginas novas, sem quebrar nada do que já está no ar.",
        itens: [
          { label: "Nova função reservada 1", href: "#", reservado: true },
          { label: "Nova função reservada 2", href: "#", reservado: true },
          { label: "Nova função reservada 3", href: "#", reservado: true },
          { label: "Nova função reservada 4", href: "#", reservado: true },
          { label: "Nova função reservada 5", href: "#", reservado: true },
          { label: "Nova função reservada 6", href: "#", reservado: true },
          { label: "Nova função reservada 7", href: "#", reservado: true },
          { label: "Nova função reservada 8", href: "#", reservado: true },
        ],
      },
      {
        titulo: "Orientação e apoio",
        descricao:
          "Pontos de apoio para navegação, orientação de uso e retorno rápido ao painel principal da plataforma.",
        itens: [
          { label: "Voltar à home", href: "/" },
          { label: "Como usar a plataforma", href: "/como-usar" },
          { label: "Login da loja", href: "/login" },
          { label: "Página criada com sucesso", href: "/criado-com-sucesso" },
        ],
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
                ...badgeStyle(
                  "#dcfce7",
                  "rgba(255,255,255,0.12)",
                  "rgba(255,255,255,0.18)",
                ),
                marginBottom: 16,
              }}
            >
              Página de direcionamento do sistema
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                lineHeight: 1.05,
              }}
            >
              Validando acesso ao painel geral
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
              Aguarde um instante. Estamos conferindo a sessão antes de liberar
              o direcionamento geral do sistema.
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
                Página de direcionamento do sistema
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
                Painel geral de direcionamento
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
                Página central para levar o usuário a todos os campos da
                plataforma com botões simples, leitura fácil e navegação clara,
                sem perder a proteção das áreas restritas.
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
                  href="/irmaos"
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
                  Voltar aos irmãos
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
                display: "grid",
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
                <strong>Leitura validada.</strong> Esta página foi pensada para
                servir como ponto central de navegação do sistema, especialmente
                para usuários que precisam de acesso mais simples e orientado.
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
                    background: