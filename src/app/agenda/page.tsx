"use client";

import Link from "next/link";

type AgendaItem = {
  id: number;
  titulo: string;
  categoria: string;
  data: string;
  hora: string;
  local: string;
  descricao: string;
  anual?: boolean;
};

const EVENTOS: AgendaItem[] = [
  {
    id: 1,
    titulo: "Sessão ordinária da loja",
    categoria: "Sessão",
    data: "__/__/____",
    hora: "__:__",
    local: "Templo / espaço reservado",
    descricao:
      "Espaço preparado para sessões regulares da loja com organização anual e histórico acumulativo.",
    anual: false,
  },
  {
    id: 2,
    titulo: "Comemoração da iniciação",
    categoria: "Comemoração",
    data: "__/__/____",
    hora: "__:__",
    local: "Espaço reservado",
    descricao:
      "Base pronta para registrar comemorações simbólicas importantes da vida maçônica.",
    anual: true,
  },
  {
    id: 3,
    titulo: "Festa ou confraternização da loja",
    categoria: "Festa",
    data: "__/__/____",
    hora: "__:__",
    local: "Espaço reservado",
    descricao:
      "Área preparada para festas, confraternizações e eventos sociais da loja.",
    anual: false,
  },
  {
    id: 4,
    titulo: "Aniversário de irmão ou familiar",
    categoria: "Aniversário",
    data: "__/__/____",
    hora: "Dia inteiro",
    local: "Agenda automática",
    descricao:
      "Preparado para alimentar felicitações e lembretes automáticos no futuro.",
    anual: true,
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

function EventoCard({ item }: { item: AgendaItem }) {
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
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          marginBottom: 14,
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
          }}
        >
          {item.categoria}
        </div>

        {item.anual ? (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              borderRadius: 999,
              padding: "7px 12px",
              background: "#f0fdf4",
              border: "1px solid #86efac",
              color: "#166534",
              fontSize: 12,
              fontWeight: 800,
            }}
          >
            Recorrente anual
          </div>
        ) : null}
      </div>

      <h3
        style={{
          margin: 0,
          color: "#0f172a",
          fontSize: 22,
          lineHeight: 1.2,
        }}
      >
        {item.titulo}
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
            Data
          </div>

          <div
            style={{
              color: "#0f172a",
              fontSize: 18,
              fontWeight: 800,
            }}
          >
            {item.data}
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
            Hora
          </div>

          <div
            style={{
              color: "#0f172a",
              fontSize: 18,
              fontWeight: 800,
            }}
          >
            {item.hora}
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
            Local
          </div>

          <div
            style={{
              color: "#0f172a",
              fontSize: 16,
              fontWeight: 800,
              lineHeight: 1.5,
            }}
          >
            {item.local}
          </div>
        </div>
      </div>

      <p
        style={{
          marginTop: 14,
          marginBottom: 0,
          color: "#475569",
          lineHeight: 1.75,
          fontSize: 15,
        }}
      >
        {item.descricao}
      </p>
    </div>
  );
}

export default function AgendaPage() {
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
                Agenda anual e acumulativa
              </div>

              <h1
                style={{
                  margin: 0,
                  fontSize: 36,
                  lineHeight: 1.08,
                }}
              >
                Agenda da Loja Maçônica
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
                Área institucional para reuniões, sessões, festas, eventos,
                comemorações, aniversários e histórico anual da loja, pronta
                para crescimento acumulativo por anos e integração futura com
                alertas automáticos e mensageria.
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
                Ir para mensageria
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
          <SummaryCard title="Eventos preparados" value={String(EVENTOS.length)} accent />
          <SummaryCard title="Agenda anual" value="Ativa" />
          <SummaryCard title="Histórico por anos" value="Preparado" />
          <SummaryCard title="Alertas futuros" value="Estruturados" />
        </section>

        <section style={{ marginTop: 24 }}>
          <SectionCard eyebrow="Calendário institucional" title="Eventos, reuniões e comemorações">
            <div
              style={{
                display: "grid",
                gap: 16,
              }}
            >
              {EVENTOS.map((item) => (
                <EventoCard key={item.id} item={item} />
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
          <SectionCard eyebrow="O que esta área suporta" title="Estrutura pronta">
            <ul
              style={{
                margin: 0,
                paddingLeft: 22,
                color: "#334155",
                lineHeight: 1.9,
                fontSize: 15,
              }}
            >
              <li>Reuniões e sessões da loja.</li>
              <li>Festas e confraternizações.</li>
              <li>Eventos institucionais.</li>
              <li>Comemorações simbólicas.</li>
              <li>Aniversários civis e fraternos.</li>
              <li>Registro anual e acumulativo por anos.</li>
            </ul>
          </SectionCard>

          <SectionCard eyebrow="Próxima evolução" title="O que ligamos depois">
            <ul
              style={{
                margin: 0,
                paddingLeft: 22,
                color: "#334155",
                lineHeight: 1.9,
                fontSize: 15,
              }}
            >
              <li>Leitura real da tabela alm_calendar_events.</li>
              <li>Filtro por ano, categoria e mês.</li>
              <li>Integração com mensageria.</li>
              <li>Lembretes automáticos.</li>
              <li>Felicitações automáticas baseadas nas datas.</li>
            </ul>
          </SectionCard>
        </div>
      </div>
    </main>
  );
}