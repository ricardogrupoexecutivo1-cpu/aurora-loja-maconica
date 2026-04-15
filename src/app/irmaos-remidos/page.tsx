"use client";

import Link from "next/link";

type IrmaoRemido = {
  id: number;
  nome: string;
  dataRemissao: string;
  observacao?: string;
};

const IRMAOS_REMIDOS: IrmaoRemido[] = [
  {
    id: 1,
    nome: "Espaço reservado para o nome do Irmão Remido",
    dataRemissao: "__/__/____",
    observacao:
      "Registro inicial reservado para preenchimento institucional da loja.",
  },
  {
    id: 2,
    nome: "Espaço reservado para o próximo Irmão Remido",
    dataRemissao: "__/__/____",
    observacao:
      "Área preparada para ampliar a memória institucional dos irmãos remidos.",
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

function RemidoCard({ item }: { item: IrmaoRemido }) {
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
        Irmão Remido
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
          Data de remissão
        </div>

        <div
          style={{
            color: "#0f172a",
            fontSize: 18,
            fontWeight: 800,
          }}
        >
          {item.dataRemissao}
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

export default function IrmaosRemidosPage() {
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
                Memória fraterna protegida
              </div>

              <h1
                style={{
                  margin: 0,
                  fontSize: 34,
                  lineHeight: 1.1,
                }}
              >
                Irmãos Remidos • Aurora Loja Maçônica
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
                Página institucional destinada ao registro e preservação da
                memória dos irmãos remidos, valorizando a história da loja, o
                respeito fraterno e a organização interna.
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
                href="/ex-veneraveis"
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
                Voltar aos Ex-Veneráveis
              </Link>

              <Link
                href="/mensageria"
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
                Voltar à mensageria
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
          <SummaryCard title="Registro institucional" value="Ativo" accent />
          <SummaryCard
            title="Irmãos remidos"
            value={String(IRMAOS_REMIDOS.length)}
          />
          <SummaryCard title="Memória fraterna" value="Protegida" />
          <SummaryCard title="Histórico" value="Em formação" />
        </section>

        <section style={{ marginTop: 24 }}>
          <SectionCard eyebrow="Relação histórica" title="Irmãos Remidos da loja">
            <div
              style={{
                display: "grid",
                gap: 16,
              }}
            >
              {IRMAOS_REMIDOS.map((item) => (
                <RemidoCard key={item.id} item={item} />
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
            eyebrow="Estrutura institucional"
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
              <li>Registro nominal dos irmãos remidos.</li>
              <li>Campo para data de remissão.</li>
              <li>Espaço para observações institucionais.</li>
              <li>Visual de memória e respeito fraterno.</li>
              <li>Base pronta para expansão futura.</li>
            </ul>
          </SectionCard>

          <SectionCard
            eyebrow="Valor institucional"
            title="Importância desta área"
          >
            <p
              style={{
                margin: 0,
                color: "#334155",
                lineHeight: 1.85,
                fontSize: 15,
              }}
            >
              Esta página fortalece a preservação da história da loja e valoriza
              os irmãos remidos com o devido respeito institucional, mantendo a
              memória organizada e acessível no ambiente interno protegido.
            </p>
          </SectionCard>
        </div>
      </div>
    </main>
  );
}