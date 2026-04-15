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

function FieldBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      style={{
        borderRadius: 18,
        background: "#f8fafc",
        border: "1px solid #e2e8f0",
        padding: 14,
      }}
    >
      <div
        style={{
          fontSize: 12,
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "#0f766e",
          marginBottom: 8,
        }}
      >
        {label}
      </div>

      <div
        style={{
          color: "#0f172a",
          fontSize: 16,
          lineHeight: 1.55,
          fontWeight: 700,
        }}
      >
        {value}
      </div>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul
      style={{
        margin: 0,
        paddingLeft: 22,
        color: "#334155",
        lineHeight: 1.9,
        fontSize: 15,
      }}
    >
      {items.map((item, index) => (
        <li key={`${item}-${index}`}>{item}</li>
      ))}
    </ul>
  );
}

export default function IrmaoFamiliaPage() {
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
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
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
                Cadastro familiar e histórico protegido
              </div>

              <h1
                style={{
                  margin: 0,
                  fontSize: 36,
                  lineHeight: 1.08,
                }}
              >
                Família, histórico e comemorações • Aurora Loja Maçônica
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
                Estrutura institucional completa para o cadastro do irmão, da
                cunhada, dos sobrinhos, sobrinhas, netos e netas, com histórico
                maçônico, aniversários civis, datas simbólicas e base pronta
                para alertas e felicitações automáticas.
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
                href="/irmaos"
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
                Voltar aos irmãos
              </Link>

              <Link
                href="/"
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
                Voltar à home
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
          <SummaryCard title="Cadastro do irmão" value="Completo" accent />
          <SummaryCard title="Família" value="Preparada" />
          <SummaryCard title="Histórico maçônico" value="Pronto" />
          <SummaryCard title="Felicitações" value="Estruturadas" />
        </section>

        <div
          style={{
            marginTop: 24,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 18,
          }}
        >
          <SectionCard
            eyebrow="Cadastro do irmão"
            title="Dados completos do irmão"
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 12,
              }}
            >
              <FieldBox label="Nome completo" value="Espaço reservado" />
              <FieldBox label="Nome simbólico" value="Espaço reservado" />
              <FieldBox label="CPF" value="000.000.000-00" />
              <FieldBox label="RG" value="Espaço reservado" />
              <FieldBox label="Data de nascimento" value="__/__/____" />
              <FieldBox label="Estado civil" value="Espaço reservado" />
              <FieldBox label="Profissão" value="Espaço reservado" />
              <FieldBox label="Telefone" value="(00) 00000-0000" />
              <FieldBox label="E-mail" value="espaco@reservado.com" />
              <FieldBox label="CEP" value="00000-000" />
              <FieldBox label="Endereço" value="Espaço reservado" />
              <FieldBox label="Bairro" value="Espaço reservado" />
              <FieldBox label="Cidade" value="Espaço reservado" />
              <FieldBox label="Estado" value="UF" />
              <FieldBox label="Cargo" value="Espaço reservado" />
              <FieldBox label="Situação" value="Ativo" />
            </div>
          </SectionCard>

          <SectionCard
            eyebrow="Cadastro da cunhada"
            title="Esposa do irmão"
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 12,
              }}
            >
              <FieldBox label="Nome completo" value="Espaço reservado" />
              <FieldBox label="Data de nascimento" value="__/__/____" />
              <FieldBox label="Telefone" value="(00) 00000-0000" />
              <FieldBox label="E-mail" value="espaco@reservado.com" />
              <FieldBox label="Observações" value="Área preparada para dados completos da cunhada." />
            </div>
          </SectionCard>
        </div>

        <div
          style={{
            marginTop: 18,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 18,
          }}
        >
          <SectionCard
            eyebrow="Filhos do irmão"
            title="Sobrinhos e sobrinhas"
          >
            <div
              style={{
                display: "grid",
                gap: 12,
              }}
            >
              <FieldBox label="Nome" value="Espaço reservado" />
              <FieldBox label="Data de nascimento" value="__/__/____" />
              <FieldBox label="Parentesco" value="Sobrinho / Sobrinha" />
              <FieldBox label="Observações" value="Área preparada para múltiplos cadastros de filhos." />
            </div>
          </SectionCard>

          <SectionCard
            eyebrow="Descendentes"
            title="Netos e netas"
          >
            <div
              style={{
                display: "grid",
                gap: 12,
              }}
            >
              <FieldBox label="Nome" value="Espaço reservado" />
              <FieldBox label="Data de nascimento" value="__/__/____" />
              <FieldBox label="Parentesco" value="Neto / Neta" />
              <FieldBox label="Observações" value="Área preparada para registrar netos e netas do irmão." />
            </div>
          </SectionCard>
        </div>

        <div
          style={{
            marginTop: 18,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 18,
          }}
        >
          <SectionCard
            eyebrow="Histórico maçônico"
            title="Tempos e passagens do irmão"
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 12,
              }}
            >
              <FieldBox label="Data de iniciação como aprendiz" value="__/__/____" />
              <FieldBox label="Tempo de aprendiz" value="Espaço reservado" />
              <FieldBox label="Data de elevação a companheiro" value="__/__/____" />
              <FieldBox label="Tempo de companheiro" value="Espaço reservado" />
              <FieldBox label="Data de exaltação a mestre" value="__/__/____" />
              <FieldBox label="Tempo de mestre" value="Espaço reservado" />
            </div>
          </SectionCard>

          <SectionCard
            eyebrow="Calendário fraterno"
            title="Aniversários e felicitações"
          >
            <BulletList
              items={[
                "Aniversário do irmão.",
                "Aniversário da cunhada.",
                "Aniversário dos sobrinhos e sobrinhas.",
                "Aniversário dos netos e netas.",
                "Comemoração da iniciação como aprendiz.",
                "Comemoração da elevação a companheiro.",
                "Comemoração da exaltação a mestre.",
                "Base pronta para mensagens automáticas de felicitação.",
              ]}
            />
          </SectionCard>
        </div>

        <div
          style={{
            marginTop: 18,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 18,
          }}
        >
          <SectionCard
            eyebrow="O que já fica pronto hoje"
            title="Estrutura institucional preparada"
          >
            <BulletList
              items={[
                "Cadastro completo do irmão.",
                "Cadastro da cunhada.",
                "Espaço para sobrinhos e sobrinhas.",
                "Espaço para netos e netas.",
                "Histórico maçônico completo.",
                "Base de aniversários civis e simbólicos.",
                "Preparação para alertas e felicitações automáticas.",
              ]}
            />
          </SectionCard>

          <SectionCard
            eyebrow="O que ligamos amanhã"
            title="Integração real com banco e automações"
          >
            <BulletList
              items={[
                "Tabelas do irmão e família.",
                "Relacionamento entre irmão, cunhada, filhos e netos.",
                "Cálculo real de tempo como aprendiz, companheiro e mestre.",
                "Alertas automáticos na agenda e mensageria.",
                "Envio de felicitações e lembretes.",
                "Ligação com perfil real e permissões do sistema.",
              ]}
            />
          </SectionCard>
        </div>
      </div>
    </main>
  );
}