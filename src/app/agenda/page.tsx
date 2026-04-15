"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  BillingInfo,
  canCreate,
  canDownload,
  getBilling,
  getBillingLabel,
  getBillingMessage,
  getBillingTone,
} from "@/lib/billing";

type AgendaItem = {
  id: number;
  categoria: string;
  titulo: string;
  data: string;
  hora: string;
  local: string;
  descricao: string;
  recorrente: boolean;
};

const EVENTOS_INICIAIS: AgendaItem[] = [
  {
    id: 1,
    categoria: "Sessão",
    titulo: "Sessão ordinária da loja",
    data: "__/__/____",
    hora: "__:__",
    local: "Templo / espaço reservado",
    descricao:
      "Espaço preparado para sessões regulares da loja com organização anual e histórico acumulativo.",
    recorrente: false,
  },
  {
    id: 2,
    categoria: "Comemoração",
    titulo: "Comemoração da iniciação",
    data: "__/__/____",
    hora: "__:__",
    local: "Espaço reservado",
    descricao:
      "Base pronta para registrar comemorações simbólicas importantes da vida maçônica.",
    recorrente: true,
  },
  {
    id: 3,
    categoria: "Festa",
    titulo: "Festa ou confraternização da loja",
    data: "__/__/____",
    hora: "__:__",
    local: "Espaço reservado",
    descricao:
      "Área preparada para festas, confraternizações e eventos sociais da loja.",
    recorrente: false,
  },
  {
    id: 4,
    categoria: "Aniversário",
    titulo: "Aniversário de irmão ou familiar",
    data: "__/__/____",
    hora: "Dia inteiro",
    local: "Agenda automática",
    descricao:
      "Preparado para alimentar felicitações e lembretes automáticos no futuro.",
    recorrente: true,
  },
];

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

function EventCard({ item }: { item: AgendaItem }) {
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

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            borderRadius: 999,
            padding: "7px 12px",
            background: item.recorrente ? "#fff7ed" : "#f0fdf4",
            border: item.recorrente ? "1px solid #fdba74" : "1px solid #86efac",
            color: item.recorrente ? "#9a3412" : "#166534",
            fontSize: 12,
            fontWeight: 800,
          }}
        >
          {item.recorrente ? "Recorrente anual" : "Evento pontual"}
        </div>
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
              fontSize: 16,
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
              fontSize: 16,
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

function inputStyleBase() {
  return {
    width: "100%",
    borderRadius: 16,
    border: "1px solid #cbd5e1",
    padding: "12px 14px",
    fontSize: 15,
    color: "#0f172a",
    background: "#ffffff",
    outline: "none",
    boxSizing: "border-box" as const,
  };
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label
      style={{
        display: "grid",
        gap: 8,
      }}
    >
      <span
        style={{
          fontSize: 12,
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "#0f766e",
        }}
      >
        {label}
      </span>
      {children}
    </label>
  );
}

export default function AgendaPage() {
  const [billing, setBilling] = useState<BillingInfo>(BILLING_INICIAL);
  const [billingLoading, setBillingLoading] = useState(true);
  const [mensagem, setMensagem] = useState(
    "Agenda institucional carregada com sucesso. Área pronta para gestão anual, crescimento acumulativo por anos e exportação local/offline.",
  );

  const [eventos, setEventos] = useState<AgendaItem[]>(EVENTOS_INICIAIS);
  const [categoria, setCategoria] = useState("Sessão");
  const [titulo, setTitulo] = useState("");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [local, setLocal] = useState("");
  const [descricao, setDescricao] = useState("");
  const [recorrente, setRecorrente] = useState(false);

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
            "Blindagem comercial ativa. Realize o pagamento para liberar a criação e os downloads da agenda.",
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

  const podeCriar = canCreate(billing);
  const podeBaixar = canDownload(billing);
  const mensagemBilling = getBillingMessage(billing);
  const billingTone = getBillingTone(billing.status);

  const totalRecorrentes = useMemo(
    () => eventos.filter((item) => item.recorrente).length,
    [eventos],
  );

  function limparFormulario() {
    setCategoria("Sessão");
    setTitulo("");
    setData("");
    setHora("");
    setLocal("");
    setDescricao("");
    setRecorrente(false);
  }

  function salvarEvento() {
    if (!podeCriar) {
      setMensagem("Pagamento pendente. Realize o pagamento para voltar a criar eventos na agenda.");
      return;
    }

    if (!titulo.trim()) {
      setMensagem("Informe o título do evento antes de salvar.");
      return;
    }

    const novo: AgendaItem = {
      id: Date.now(),
      categoria,
      titulo: titulo.trim(),
      data: data.trim() || "__/__/____",
      hora: hora.trim() || "__:__",
      local: local.trim() || "Espaço reservado",
      descricao:
        descricao.trim() || "Evento criado manualmente na agenda institucional da loja.",
      recorrente,
    };

    setEventos((atual) => [novo, ...atual]);
    setMensagem("Evento salvo com sucesso na agenda institucional.");
    limparFormulario();
  }

  function baixarAgendaLocal() {
    if (!podeBaixar) {
      setMensagem("Pagamento pendente. Realize o pagamento para liberar o download da agenda.");
      return;
    }

    const conteudo = {
      exportadoEm: new Date().toISOString(),
      lojaId: billing.lojaId,
      lojaNome: billing.lojaNome,
      planoNome: billing.planoNome,
      statusPlano: billing.status,
      totalEventos: eventos.length,
      recorrentes: totalRecorrentes,
      eventos,
    };

    const blob = new Blob([JSON.stringify(conteudo, null, 2)], {
      type: "application/json;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `aurora-loja-maconica-agenda-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setMensagem("Agenda baixada com sucesso. Arquivo gerado para guardar no PC ou celular.");
  }

  const inputStyle = inputStyleBase();

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
                comemorações, aniversários e histórico anual da loja, pronta para
                crescimento acumulativo por anos e integração futura com alertas
                automáticos e mensageria.
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
          <SummaryCard title="Eventos preparados" value={String(eventos.length)} accent />
          <SummaryCard title="Agenda anual" value="Ativa" />
          <SummaryCard title="Histórico por anos" value="Preparado" />
          <SummaryCard title="Downloads" value={podeBaixar ? "Liberados" : "Bloqueados"} />
        </section>

        <section style={{ marginTop: 24 }}>
          <SectionCard eyebrow="Novo evento" title="Salvar compromisso na agenda">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 14,
              }}
            >
              <Field label="Categoria">
                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  style={inputStyle}
                >
                  <option value="Sessão">Sessão</option>
                  <option value="Comemoração">Comemoração</option>
                  <option value="Festa">Festa</option>
                  <option value="Aniversário">Aniversário</option>
                  <option value="Reunião">Reunião</option>
                  <option value="Evento">Evento</option>
                </select>
              </Field>

              <Field label="Título">
                <input
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Ex.: Sessão ordinária da loja"
                  style={inputStyle}
                />
              </Field>

              <Field label="Data">
                <input
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  placeholder="__/__/____"
                  style={inputStyle}
                />
              </Field>

              <Field label="Hora">
                <input
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  placeholder="__:__"
                  style={inputStyle}
                />
              </Field>

              <Field label="Local">
                <input
                  value={local}
                  onChange={(e) => setLocal(e.target.value)}
                  placeholder="Ex.: Templo / espaço reservado"
                  style={inputStyle}
                />
              </Field>

              <Field label="Recorrência">
                <select
                  value={recorrente ? "sim" : "nao"}
                  onChange={(e) => setRecorrente(e.target.value === "sim")}
                  style={inputStyle}
                >
                  <option value="nao">Evento pontual</option>
                  <option value="sim">Recorrente anual</option>
                </select>
              </Field>
            </div>

            <div style={{ marginTop: 14 }}>
              <Field label="Descrição">
                <textarea
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Descreva o compromisso institucional..."
                  style={{
                    ...inputStyle,
                    minHeight: 120,
                    resize: "vertical",
                  }}
                />
              </Field>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                marginTop: 18,
              }}
            >
              <ActionButton
                label={podeCriar ? "Salvar compromisso" : "Realize o pagamento"}
                onClick={salvarEvento}
                disabled={!podeCriar}
              />

              <ActionButton
                label="Limpar formulário"
                variant="secondary"
                onClick={limparFormulario}
              />

              <ActionButton
                label={podeBaixar ? "Baixar agenda local" : "Pagamento necessário"}
                variant="secondary"
                onClick={baixarAgendaLocal}
                disabled={!podeBaixar}
              />
            </div>

            {!podeCriar ? (
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
                Realize o pagamento para voltar a criar eventos e manter a agenda com cópia local/offline disponível.
              </p>
            ) : null}
          </SectionCard>
        </section>

        <section style={{ marginTop: 24 }}>
          <SectionCard eyebrow="Calendário institucional" title="Eventos, reuniões e comemorações">
            <div
              style={{
                display: "grid",
                gap: 16,
              }}
            >
              {eventos.map((item) => (
                <EventCard key={item.id} item={item} />
              ))}
            </div>
          </SectionCard>
        </section>

        <section style={{ marginTop: 24 }}>
          <SectionCard eyebrow="O que esta área suporta" title="Estrutura pronta">
            <div
              style={{
                display: "grid",
                gap: 12,
              }}
            >
              {[
                "Reuniões e sessões da loja.",
                "Festas e confraternizações.",
                "Eventos institucionais.",
                "Comemorações simbólicas.",
                "Aniversários civis e fraternos.",
                "Registro anual e acumulativo por anos.",
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
          <SectionCard eyebrow="Próxima evolução" title="O que ligamos depois">
            <div
              style={{
                display: "grid",
                gap: 12,
              }}
            >
              {[
                "Leitura real da tabela alm_calendar_events.",
                "Filtro por ano, categoria e mês.",
                "Integração com mensageria.",
                "Lembretes automáticos.",
                "Felicitações automáticas baseadas nas datas.",
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