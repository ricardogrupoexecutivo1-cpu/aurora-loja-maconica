"use client";

import Link from "next/link";

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

function LinhaRelatorio({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: 16,
        padding: "14px 0",
        borderBottom: "1px solid #eef2f7",
      }}
    >
      <div
        style={{
          color: "#475569",
          fontSize: 15,
          lineHeight: 1.6,
        }}
      >
        {label}
      </div>

      <div
        style={{
          color: "#0f172a",
          fontSize: 15,
          fontWeight: 800,
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
                institucional da loja, base de irmãos, família, memória,
                agenda, lançamentos e expansão futura para relatórios completos
                e filtros reais por período.
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
          <SummaryCard title="Lançamentos" value="Operacionais" />
        </section>

        <div
          style={{
            marginTop: 24,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 18,
          }}
        >
          <SectionCard eyebrow="Resumo institucional" title="Panorama geral">
            <LinhaRelatorio label="Cargos estruturados" value="25" />
            <LinhaRelatorio label="Cadastro de irmãos" value="Ativo" />
            <LinhaRelatorio label="Família e histórico" value="Prontos" />
            <LinhaRelatorio label="Ex-Veneráveis" value="Estruturado" />
            <LinhaRelatorio label="Irmãos remidos" value="Estruturado" />
            <LinhaRelatorio label="Mensageria" value="Ativa" />
            <LinhaRelatorio label="Agenda anual" value="Preparada" />
            <LinhaRelatorio label="Lançamentos gerais" value="Com salvar e arquivar" />
          </SectionCard>

          <SectionCard eyebrow="Capacidade institucional" title="Escalabilidade da loja">
            <LinhaRelatorio label="Loja pequena" value="15 a 30 pessoas" />
            <LinhaRelatorio label="Loja média" value="40 a 100 pessoas" />
            <LinhaRelatorio label="Loja expandida" value="150 a 300+ pessoas" />
            <LinhaRelatorio label="Família e vínculos" value="Suportado" />
            <LinhaRelatorio label="Histórico acumulativo" value="Suportado" />
            <LinhaRelatorio label="Arquivamento sem perda" value="Suportado" />
            <LinhaRelatorio label="Expansão por anos" value="Suportada" />
          </SectionCard>
        </div>

        <div
          style={{
            marginTop: 24,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 18,
          }}
        >
          <SectionCard eyebrow="Relatórios futuros" title="O que será ligado ao banco">
            <ul
              style={{
                margin: 0,
                paddingLeft: 22,
                color: "#334155",
                lineHeight: 1.9,
                fontSize: 15,
              }}
            >
              <li>Relatório de irmãos por cargo e situação.</li>
              <li>Relatório familiar por irmão.</li>
              <li>Relatório de aniversários e felicitações.</li>
              <li>Relatório histórico maçônico.</li>
              <li>Relatório da agenda por ano, mês e categoria.</li>
              <li>Relatório de lançamentos ativos e arquivados.</li>
            </ul>
          </SectionCard>

          <SectionCard eyebrow="Leitura executiva" title="Valor da plataforma">
            <p
              style={{
                margin: 0,
                color: "#334155",
                lineHeight: 1.85,
                fontSize: 15,
              }}
            >
              Esta área consolida a visão institucional da loja e ajuda a
              demonstrar o valor real da plataforma para outras lojas:
              organização administrativa, memória histórica, comunicação,
              agenda, registros internos e capacidade de crescimento com
              estrutura profissional.
            </p>
          </SectionCard>
        </div>
      </div>
    </main>
  );
}