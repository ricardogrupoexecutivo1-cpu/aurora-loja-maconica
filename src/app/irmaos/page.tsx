"use client";

import Link from "next/link";

type IrmaoItem = {
  id: number;
  nome: string;
  cargo: string;
  situacao: string;
  telefone: string;
  observacao?: string;
};

const IRMAOS: IrmaoItem[] = [
  {
    id: 1,
    nome: "Espaço reservado para o nome do irmão",
    cargo: "Venerável Mestre",
    situacao: "Ativo",
    telefone: "(00) 00000-0000",
    observacao: "Registro inicial preparado para evolução futura com dados reais.",
  },
  {
    id: 2,
    nome: "Espaço reservado para o segundo irmão",
    cargo: "Secretário",
    situacao: "Ativo",
    telefone: "(00) 00000-0000",
    observacao: "Área institucional pronta para organização por cargo e função.",
  },
  {
    id: 3,
    nome: "Espaço reservado para o terceiro irmão",
    cargo: "Tesoureiro",
    situacao: "Ativo",
    telefone: "(00) 00000-0000",
    observacao: "Base pronta para conectar com dados reais e permissões.",
  },
];

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

function IrmaoCard({ item }: { item: IrmaoItem }) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: 24,
        border: "1px solid #dbe4ea",
        padding: 22,
        boxShadow: "0 16px 40px rgba(15, 23, 42, 0.05)",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          borderRadius: 999,
          padding: "7px 12px",
          background: "#ecfeff",
          border: "1px solid #a5f3fc",
          color: "#0f766e",
          fontSize: 12,
          fontWeight: 800,
          marginBottom: 14,
        }}
      >
        {item.cargo}
      </div>

      <h3
        style={{
          margin: 0,
          color: "#0f172a",
          fontSize: 22,
          lineHeight: 1.2,
        }}
      >
        {item.nome}
      </h3>

      <div
        style={{
          marginTop: 14,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 12,
        }}
      >
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
            Situação
          </div>

          <div
            style={{
              color: "#0f172a",
              fontSize: 18,
              fontWeight: 800,
            }}
          >
            {item.situacao}
          </div>
        </div>

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
            Contato
          </div>

          <div
            style={{
              color: "#0f172a",
              fontSize: 18,
              fontWeight: 800,
            }}
          >
            {item.telefone}
          </div>
        </div>
      </div>

      {item.observacao ? (
        <p
          style={{
            marginTop: 14,
            marginBottom: 0,
            color: "#475569",
            lineHeight: 1.75,
            fontSize: 15,
          }}
        >
          {item.observacao}
        </p>
      ) : null}
    </div>
  );
}

export default function IrmaosPage() {
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
            <div style={{ maxWidth: 860 }}>
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
                Cadastro interno protegido
              </div>

              <h1
                style={{
                  margin: 0,
                  fontSize: 36,
                  lineHeight: 1.08,
                }}
              >
                Cadastro de Irmãos • Aurora Loja Maçônica
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
                Área institucional para organização dos irmãos da loja, com base
                preparada para cargos, situação cadastral, contatos,
                identificação interna e futura integração com permissões, foto e
                mensageria real.
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
                href="/minha-area"
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
                Ir para minha área
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
          <SummaryCard title="Irmãos cadastrados" value={String(IRMAOS.length)} accent />
          <SummaryCard title="Estrutura" value="Preparada" />
          <SummaryCard title="Cargos" value="Organizáveis" />
          <SummaryCard title="Blindagem" value="Ativa" />
        </section>

        <section style={{ marginTop: 24 }}>
          <SectionCard eyebrow="Base interna" title="Relação de irmãos da loja">
            <div
              style={{
                display: "grid",
                gap: 16,
              }}
            >
              {IRMAOS.map((item) => (
                <IrmaoCard key={item.id} item={item} />
              ))}
            </div>
          </SectionCard>
        </section>

        <div
          style={{
            marginTop: 24,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 18,
          }}
        >
          <SectionCard eyebrow="Estrutura pronta" title="O que esta página já suporta">
            <ul
              style={{
                margin: 0,
                paddingLeft: 22,
                color: "#334155",
                lineHeight: 1.9,
                fontSize: 15,
              }}
            >
              <li>Nome do irmão.</li>
              <li>Cargo institucional.</li>
              <li>Situação cadastral.</li>
              <li>Contato interno.</li>
              <li>Espaço para observações.</li>
              <li>Base pronta para foto e permissões.</li>
            </ul>
          </SectionCard>

          <SectionCard eyebrow="Próxima expansão" title="O que ligamos depois">
            <ul
              style={{
                margin: 0,
                paddingLeft: 22,
                color: "#334155",
                lineHeight: 1.9,
                fontSize: 15,
              }}
            >
              <li>Dados reais do Supabase.</li>
              <li>Ligação com cargo e papel do irmão.</li>
              <li>Foto real vinculada ao cadastro.</li>
              <li>Mensageria por cargo.</li>
              <li>Busca e filtros internos.</li>
            </ul>
          </SectionCard>
        </div>
      </div>
    </main>
  );
}