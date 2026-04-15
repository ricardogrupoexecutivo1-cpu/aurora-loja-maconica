"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  BillingInfo,
  canDownload,
  getBilling,
  getBillingLabel,
  getBillingMessage,
  getBillingTone,
} from "@/lib/billing";

const BILLING_INICIAL: BillingInfo = {
  status: "ativo",
  vencimento: undefined,
  diasAtraso: 0,
  linkPagamento: "#",
  bloquearCriacao: false,
  bloquearArquivamento: false,
  bloquearDownload: false,
  lojaId: "loja-maconica-aurora",
  lojaNome: "Loja Maçônica Aurora",
  planoNome: "Plano Institucional",
  paymentStatus: "pago",
  graceUntil: undefined,
  observacoes: "",
};

function SummaryCard({
  title,
  value,
  accent = false,
}: {
  title: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: 22,
        border: accent ? "1px solid #86efac" : "1px solid #dbe4ea",
        padding: 20,
        boxShadow: "0 14px 36px rgba(15, 23, 42, 0.05)",
      }}
    >
      <div
        style={{
          fontSize: 12,
          fontWeight: 800,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#0f766e",
          marginBottom: 10,
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: 24,
          lineHeight: 1.15,
          fontWeight: 900,
          color: "#0f172a",
        }}
      >
        {value}
      </div>
    </div>
  );
}

function SectionCard({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      style={{
        background: "#ffffff",
        borderRadius: 24,
        border: "1px solid #dbe4ea",
        padding: 24,
        boxShadow: "0 16px 40px rgba(15, 23, 42, 0.05)",
      }}
    >
      <div
        style={{
          fontSize: 12,
          fontWeight: 800,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#0f766e",
          marginBottom: 12,
        }}
      >
        {eyebrow}
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
        {title}
      </h2>

      {children}
    </section>
  );
}

function ActionButton({
  label,
  onClick,
  variant = "primary",
  disabled = false,
}: {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}) {
  const background = disabled
    ? "#cbd5e1"
    : variant === "primary"
      ? "#065f46"
      : "#ffffff";

  const color = disabled ? "#64748b" : variant === "secondary" ? "#0f172a" : "#ffffff";

  const border = disabled
    ? "1px solid #cbd5e1"
    : variant === "secondary"
      ? "1px solid #dbe4ea"
      : "1px solid #065f46";

  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={{
        appearance: "none",
        border,
        background,
        color,
        borderRadius: 16,
        padding: "12px 16px",
        fontWeight: 800,
        fontSize: 14,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.9 : 1,
        boxShadow:
          variant === "secondary"
            ? "0 10px 24px rgba(15, 23, 42, 0.04)"
            : "0 12px 28px rgba(15, 23, 42, 0.08)",
      }}
    >
      {label}
    </button>
  );
}

function ReportLine({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: 12,
        padding: "12px 0",
        borderBottom: "1px solid #e2e8f0",
      }}
    >
      <div
        style={{
          color: "#334155",
          fontWeight: 700,
          lineHeight: 1.6,
        }}
      >
        {title}
      </div>

      <div
        style={{
          color: "#0f172a",
          fontWeight: 900,
          textAlign: "right",
          lineHeight: 1.6,
        }}
      >
        {value}
      </div>
    </div>
  );
}

export default function RelatoriosPage() {
  const [billing, setBilling] = useState<BillingInfo>(BILLING_INICIAL);
  const [billingLoading, setBillingLoading] = useState(true);
  const [mensagem, setMensagem] = useState(
    "Painel executivo carregado com sucesso. Esta área está pronta para leitura consolidada e exportação local/offline.",
  );

  useEffect(() => {
    let ativo = true;

    async function carregarBilling() {
      try {
        setBillingLoading(true);
        const billingReal = await getBilling("loja-maconica-aurora");

        if (!ativo) return;

        setBilling(billingReal);

        if (billingReal.status !== "ativo" && billingReal.status !== "trial") {
          setMensagem(
            "Blindagem comercial ativa. Realize o pagamento para liberar os downloads e recursos completos dos relatórios.",
          );
        }
      } finally {
        if (ativo) {
          setBillingLoading(false);
        }
      }
    }

    carregarBilling();

    return () => {
      ativo = false;
    };
  }, []);

  const podeBaixar = canDownload(billing);
  const mensagemBilling = getBillingMessage(billing);
  const billingTone = getBillingTone(billing.status);

  function baixarResumoExecutivo() {
    if (!podeBaixar) {
      setMensagem("Pagamento pendente. Realize o pagamento para liberar o download dos relatórios.");
      return;
    }

    const conteudo = {
      exportadoEm: new Date().toISOString(),
      lojaId: billing.lojaId,
      lojaNome: billing.lojaNome,
      planoNome: billing.planoNome,
      statusPlano: billing.status,
      paymentStatus: billing.paymentStatus,
      resumoExecutivo: {
        cargosEstruturados: 25,
        cadastroIrmaos: "Ativo",
        familiaHistorico: "Prontos",
        exVeneraveis: "Estruturado",
        irmaosRemidos: "Estruturado",
        mensageria: "Ativa",
        agendaAnual: "Preparada",
        lancamentosGerais: "Com salvar e arquivar",
      },
      escalabilidade: {
        lojaPequena: "15 a 30 pessoas",
        lojaMedia: "40 a 100 pessoas",
        lojaExpandida: "150 a 300+ pessoas",
        familiaEVinculos: "Suportado",
        historicoAcumulativo: "Suportado",
        arquivamentoSemPerda: "Suportado",
        expansaoPorAnos: "Suportada",
      },
      relatoriosFuturos: [
        "Relatório de irmãos por cargo e situação",
        "Relatório familiar por irmão",
        "Relatório de aniversários e felicitações",
        "Relatório histórico maçônico",
        "Relatório da agenda por ano, mês e categoria",
        "Relatório de lançamentos ativos e arquivados",
      ],
    };

    const blob = new Blob([JSON.stringify(conteudo, null, 2)], {
      type: "application/json;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `aurora-loja-maconica-relatorios-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setMensagem("Resumo executivo baixado com sucesso. Arquivo gerado para guardar no PC ou celular.");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #f8fbfd 0%, #edf6f9 45%, #f8fbfd 100%)",
        padding: "24px 16px 56px",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <div style={{ maxWidth: 1260, margin: "0 auto" }}>
        <section
          style={{
            borderRadius: 30,
            padding: 28,
            background:
              "linear-gradient(135deg, #052e2b 0%, #065f46 55%, #059669 100%)",
            color: "#ffffff",
            boxShadow: "0 30px 80px rgba(5, 46, 43, 0.25)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 16,
            }}
          >
            <div style={{ maxWidth: 900 }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  borderRadius: 999,
                  padding: "8px 14px",
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  fontSize: 12,
                  fontWeight: 800,
                  marginBottom: 16,
                }}
              >
                Visão executiva institucional
              </div>

              <h1
                style={{
                  margin: 0,
                  fontSize: 36,
                  lineHeight: 1.08,
                }}
              >
                Relatórios Gerais da Loja
              </h1>

              <p
                style={{
                  marginTop: 16,
                  marginBottom: 0,
                  maxWidth: 820,
                  color: "rgba(255,255,255,0.92)",
                  lineHeight: 1.8,
                  fontSize: 16,
                }}
              >
                Painel de leitura executiva com visão consolidada da estrutura
                institucional da loja, base de irmãos, família, memória, agenda,
                lançamentos e expansão futura para relatórios completos e filtros
                reais por período.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
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
                href="/lancamentos"
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
                Ir para lançamentos
              </Link>
            </div>
          </div>
        </section>

        {mensagemBilling ? (
          <section style={{ marginTop: 20 }}>
            <div
              style={{
                background: billingTone.background,
                border: `1px solid ${billingTone.border}`,
                color: billingTone.color,
                borderRadius: 24,
                padding: 20,
                boxShadow: "0 14px 36px rgba(15, 23, 42, 0.05)",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 14,
              }}
            >
              <div style={{ flex: "1 1 520px" }}>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 800,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: 8,
                  }}
                >
                  Blindagem comercial ativa
                </div>

                <div
                  style={{
                    fontSize: 16,
                    lineHeight: 1.7,
                    fontWeight: 700,
                  }}
                >
                  {mensagemBilling}
                </div>

                <div
                  style={{
                    marginTop: 10,
                    fontSize: 13,
                    fontWeight: 800,
                  }}
                >
                  Situação do plano: {getBillingLabel(billing.status)}
                  {billingLoading ? " • verificando..." : ""}
                </div>
              </div>

              <a
                href={billing.linkPagamento || "#"}
                style={{
                  textDecoration: "none",
                  background: billingTone.buttonBackground,
                  color: billingTone.buttonColor,
                  padding: "12px 18px",
                  borderRadius: 16,
                  fontWeight: 800,
                  boxShadow: "0 12px 28px rgba(15, 23, 42, 0.08)",
                }}
              >
                Realizar pagamento
              </a>
            </div>
          </section>
        ) : null}

        <section
          style={{
            marginTop: 22,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
          }}
        >
          <SummaryCard title="Irmãos" value="Base pronta" accent />
          <SummaryCard title="Família" value="Estruturada" />
          <SummaryCard title="Agenda" value="Preparada" />
          <SummaryCard title="Downloads" value={podeBaixar ? "Liberados" : "Bloqueados"} />
        </section>

        <section style={{ marginTop: 24 }}>
          <SectionCard eyebrow="Resumo institucional" title="Panorama geral">
            <ReportLine title="Cargos estruturados" value="25" />
            <ReportLine title="Cadastro de irmãos" value="Ativo" />
            <ReportLine title="Família e histórico" value="Prontos" />
            <ReportLine title="Ex-Veneráveis" value="Estruturado" />
            <ReportLine title="Irmãos remidos" value="Estruturado" />
            <ReportLine title="Mensageria" value="Ativa" />
            <ReportLine title="Agenda anual" value="Preparada" />
            <ReportLine title="Lançamentos gerais" value="Com salvar e arquivar" />
          </SectionCard>
        </section>

        <section style={{ marginTop: 24 }}>
          <SectionCard eyebrow="Capacidade institucional" title="Escalabilidade da loja">
            <ReportLine title="Loja pequena" value="15 a 30 pessoas" />
            <ReportLine title="Loja média" value="40 a 100 pessoas" />
            <ReportLine title="Loja expandida" value="150 a 300+ pessoas" />
            <ReportLine title="Família e vínculos" value="Suportado" />
            <ReportLine title="Histórico acumulativo" value="Suportado" />
            <ReportLine title="Arquivamento sem perda" value="Suportado" />
            <ReportLine title="Expansão por anos" value="Suportada" />
          </SectionCard>
        </section>

        <section style={{ marginTop: 24 }}>
          <SectionCard eyebrow="Relatórios futuros" title="O que será ligado ao banco">
            <div
              style={{
                display: "grid",
                gap: 12,
              }}
            >
              {[
                "Relatório de irmãos por cargo e situação.",
                "Relatório familiar por irmão.",
                "Relatório de aniversários e felicitações.",
                "Relatório histórico maçônico.",
                "Relatório da agenda por ano, mês e categoria.",
                "Relatório de lançamentos ativos e arquivados.",
              ].map((item) => (
                <div
                  key={item}
                  style={{
                    borderRadius: 18,
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    padding: 16,
                    color: "#334155",
                    fontWeight: 700,
                    lineHeight: 1.7,
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </SectionCard>
        </section>

        <section style={{ marginTop: 24 }}>
          <SectionCard eyebrow="Leitura executiva" title="Valor da plataforma">
            <p
              style={{
                marginTop: 0,
                marginBottom: 18,
                color: "#334155",
                lineHeight: 1.85,
                fontSize: 15,
              }}
            >
              Esta área consolida a visão institucional da loja e ajuda a demonstrar
              o valor real da plataforma para outras lojas: organização
              administrativa, memória histórica, comunicação, agenda, registros
              internos e capacidade de crescimento com estrutura profissional.
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
              }}
            >
              <ActionButton
                label={podeBaixar ? "Baixar resumo executivo" : "Pagamento necessário"}
                onClick={baixarResumoExecutivo}
                disabled={!podeBaixar}
              />

              <ActionButton
                label="Ir para lançamentos"
                variant="secondary"
                onClick={() => {
                  window.location.href = "/lancamentos";
                }}
              />
            </div>

            {!podeBaixar ? (
              <p
                style={{
                  marginTop: 14,
                  marginBottom: 0,
                  color: "#9a3412",
                  lineHeight: 1.75,
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                Realize o pagamento para liberar o download dos relatórios e manter a cópia local/offline disponível.
              </p>
            ) : null}
          </SectionCard>
        </section>

        <section style={{ marginTop: 24 }}>
          <SectionCard eyebrow="Mensagem do sistema" title="Status da operação">
            <p
              style={{
                margin: 0,
                color: "#334155",
                lineHeight: 1.85,
                fontSize: 15,
              }}
            >
              {mensagem}
            </p>
          </SectionCard>
        </section>
      </div>
    </main>
  );
}