"use client";

import Link from "next/link";

type ExVeneravel = {
  id: number;
  nome: string;
  inicio: string;
  termino: string;
  bienio: string;
  observacao?: string;
};

const FUNDACAO_LOJA = "__/__/____";

const EX_VENERAVEIS: ExVeneravel[] = [
  {
    id: 1,
    nome: "Espaço reservado para o nome do Venerável",
    inicio: "__/__/____",
    termino: "__/__/____",
    bienio: "____ / ____",
    observacao: "Primeiro registro histórico ou espaço inicial para preenchimento.",
  },
  {
    id: 2,
    nome: "Espaço reservado para o nome do próximo Ex-Venerável",
    inicio: "__/__/____",
    termino: "__/__/____",
    bienio: "____ / ____",
    observacao: "Mandato seguinte no histórico da loja.",
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

function TimelineCard({ item }: { item: ExVeneravel }) {
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
        Biênio {item.bienio}
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
            Início
          </div>

          <div
            style={{
              color: "#0f172a",
              fontSize: 18,
              fontWeight: 800,
            }}
          >
            {item.inicio}
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
            Término
          </div>

          <div
            style={{
              color: "#0f172a",
              fontSize: 18,
              fontWeight: 800,
            }}
          >
            {item.termino}
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

export default function ExVeneraveisPage() {
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
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
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
                Memória institucional protegida
              </div>

              <h1
                style={{
                  margin: 0,
                  fontSize: 34,
                  lineHeight: 1.1,
                }}
              >
                Ex-Veneráveis • Aurora Loja Maçônica
              </h1>

              <p
                style={{
                  marginTop: 14,
                  marginBottom: 0,
                  maxWidth: 780,
                  color: "rgba(255,255,255,0.92)",
                  lineHeight: 1.75,
                  fontSize: 15,
                }}
              >
                Página histórica da loja para registrar a fundação, a relação dos
                Ex-Veneráveis, os períodos de venerância e a memória
                administrativa e institucional de cada biênio.
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
                href="/mensageria"
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
                Voltar à mensageria
              </Link>

              <Link
                href="/cargo/veneravel-mestre"
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
                Voltar aos cargos
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
          <SummaryCard title="Fundação da loja" value={FUNDACAO_LOJA} accent />
          <SummaryCard
            title="Ex-Veneráveis registrados"
            value={String(EX_VENERAVEIS.length)}
          />
          <SummaryCard title="Padrão de mandato" value="Biênio" />
          <SummaryCard title="Histórico" value="Em formação" />
        </section>

        <section style={{ marginTop: 24 }}>
          <SectionCard eyebrow="Linha do tempo" title="Relação dos Ex-Veneráveis">
            <div
              style={{
                display: "grid",
                gap: 16,
              }}
            >
              {EX_VENERAVEIS.map((item) => (
                <TimelineCard key={item.id} item={item} />
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
          <SectionCard
            eyebrow="Estrutura histórica"
            title="Como esta página foi preparada"
          >
            <ul
              style={{
                margin: 0,
                paddingLeft: 22,
                color: "#334155",
                lineHeight: 1.9,
                fontSize: 15,
              }}
            >
              <li>Data de fundação da loja em destaque no topo.</li>
              <li>Registro por Ex-Venerável em ordem histórica.</li>
              <li>Campos de início e término do período.</li>
              <li>Organização visual por biênio.</li>
              <li>Espaço pronto para observações de cada gestão.</li>
            </ul>
          </SectionCard>

          <SectionCard
            eyebrow="Uso institucional"
            title="Importância desta memória"
          >
            <p
              style={{
                margin: 0,
                color: "#334155",
                lineHeight: 1.85,
                fontSize: 15,
              }}
            >
              Esta página fortalece a memória da Loja Maçônica, preserva a
              sucessão da venerância e ajuda a manter a identidade institucional
              organizada, valorizando cada gestão ao longo do tempo.
            </p>
          </SectionCard>
        </div>
      </div>
    </main>
  );
}