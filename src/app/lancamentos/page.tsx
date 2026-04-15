"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  BillingInfo,
  canArchive,
  canCreate,
  canDownload,
  getBilling,
  getBillingLabel,
  getBillingMessage,
  getBillingTone,
} from "@/lib/billing";

type LancamentoItem = {
  id: number;
  titulo: string;
  tipo: string;
  status: string;
  prioridade: string;
  data: string;
  categoria: string;
  descricao: string;
  arquivado: boolean;
};

const LANCAMENTOS_INICIAIS: LancamentoItem[] = [
  {
    id: 1,
    titulo: "Atualização cadastral de irmão",
    tipo: "administrativo",
    status: "ativo",
    prioridade: "normal",
    data: "__/__/____",
    categoria: "Cadastro",
    descricao:
      "Espaço preparado para registrar movimentações administrativas ligadas aos irmãos da loja.",
    arquivado: false,
  },
  {
    id: 2,
    titulo: "Observação fraterna institucional",
    tipo: "fraterno",
    status: "pendente",
    prioridade: "alta",
    data: "__/__/____",
    categoria: "Fraterno",
    descricao:
      "Área pronta para anotações internas, acompanhamento e registros fraternos.",
    arquivado: false,
  },
  {
    id: 3,
    titulo: "Registro histórico concluído",
    tipo: "historico",
    status: "arquivado",
    prioridade: "normal",
    data: "__/__/____",
    categoria: "Histórico",
    descricao:
      "Exemplo de lançamento concluído e arquivado, mantendo o histórico sem apagar o registro.",
    arquivado: true,
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

function Badge({
  children,
  variant = "info",
}: {
  children: React.ReactNode;
  variant?: "info" | "success" | "warning" | "muted";
}) {
  const config =
    variant === "success"
      ? {
          background: "#f0fdf4",
          border: "#86efac",
          color: "#166534",
        }
      : variant === "warning"
        ? {
            background: "#fff7ed",
            border: "#fdba74",
            color: "#9a3412",
          }
        : variant === "muted"
          ? {
              background: "#f8fafc",
              border: "#cbd5e1",
              color: "#475569",
            }
          : {
              background: "#ecfeff",
              border: "#a5f3fc",
              color: "#0f766e",
            };

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        borderRadius: 999,
        padding: "7px 12px",
        background: config.background,
        border: `1px solid ${config.border}`,
        color: config.color,
        fontSize: 12,
        fontWeight: 800,
      }}
    >
      {children}
    </div>
  );
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

function ActionButton({
  label,
  onClick,
  variant = "primary",
  disabled = false,
}: {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
}) {
  const background = disabled
    ? "#cbd5e1"
    : variant === "primary"
      ? "#065f46"
      : variant === "danger"
        ? "#7f1d1d"
        : "#ffffff";

  const color = disabled ? "#64748b" : variant === "secondary" ? "#0f172a" : "#ffffff";

  const border = disabled
    ? "1px solid #cbd5e1"
    : variant === "secondary"
      ? "1px solid #dbe4ea"
      : variant === "danger"
        ? "1px solid #991b1b"
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

function LancamentoCard({
  item,
  onArquivar,
  podeArquivar,
}: {
  item: LancamentoItem;
  onArquivar?: (id: number) => void;
  podeArquivar: boolean;
}) {
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
        <Badge>{item.categoria}</Badge>
        <Badge variant={item.arquivado ? "muted" : "success"}>
          {item.arquivado ? "Arquivado" : "Ativo"}
        </Badge>
        <Badge variant={item.prioridade === "alta" ? "warning" : "info"}>
          Prioridade {item.prioridade}
        </Badge>
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
            Tipo
          </div>
          <div
            style={{
              color: "#0f172a",
              fontSize: 16,
              fontWeight: 800,
            }}
          >
            {item.tipo}
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
            Status
          </div>
          <div
            style={{
              color: "#0f172a",
              fontSize: 16,
              fontWeight: 800,
            }}
          >
            {item.status}
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
      </div>

      <p
        style={{
          marginTop: 14,
          marginBottom: 16,
          color: "#475569",
          lineHeight: 1.75,
          fontSize: 15,
        }}
      >
        {item.descricao}
      </p>

      {!item.arquivado ? (
        <ActionButton
          label={podeArquivar ? "Arquivar lançamento" : "Realize o pagamento"}
          variant="secondary"
          disabled={!podeArquivar}
          onClick={() => onArquivar?.(item.id)}
        />
      ) : null}
    </div>
  );
}

export default function LancamentosPage() {
  const [billing, setBilling] = useState<BillingInfo>(BILLING_INICIAL);
  const [billingLoading, setBillingLoading] = useState(true);

  const [lancamentos, setLancamentos] = useState<LancamentoItem[]>(LANCAMENTOS_INICIAIS);
  const [titulo, setTitulo] = useState("");
  const [tipo, setTipo] = useState("administrativo");
  const [status, setStatus] = useState("ativo");
  const [prioridade, setPrioridade] = useState("normal");
  const [data, setData] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descricao, setDescricao] = useState("");
  const [mensagem, setMensagem] = useState(
    "Área pronta para registrar lançamentos, arquivar quando necessário e continuar lançando novos itens sem perder o histórico.",
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
            "Blindagem comercial ativa. Realize o pagamento para liberar os recursos completos desta área.",
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
  const podeArquivar = canArchive(billing);
  const podeBaixar = canDownload(billing);
  const mensagemBilling = getBillingMessage(billing);
  const billingTone = getBillingTone(billing.status);

  const ativos = useMemo(
    () => lancamentos.filter((item) => !item.arquivado),
    [lancamentos],
  );

  const arquivados = useMemo(
    () => lancamentos.filter((item) => item.arquivado),
    [lancamentos],
  );

  function limparFormulario() {
    setTitulo("");
    setTipo("administrativo");
    setStatus("ativo");
    setPrioridade("normal");
    setData("");
    setCategoria("");
    setDescricao("");
  }

  function salvarLancamento() {
    if (!podeCriar) {
      setMensagem("Pagamento pendente. Realize o pagamento para voltar a salvar novos lançamentos.");
      return;
    }

    if (!titulo.trim()) {
      setMensagem("Informe o título do lançamento antes de salvar.");
      return;
    }

    if (!categoria.trim()) {
      setMensagem("Informe a categoria do lançamento antes de salvar.");
      return;
    }

    const novo: LancamentoItem = {
      id: Date.now(),
      titulo: titulo.trim(),
      tipo,
      status,
      prioridade,
      data: data.trim() || "__/__/____",
      categoria: categoria.trim(),
      descricao:
        descricao.trim() || "Lançamento criado manualmente na estrutura institucional.",
      arquivado: false,
    };

    setLancamentos((atual) => [novo, ...atual]);
    setMensagem("Lançamento salvo com sucesso na estrutura local da página.");
    limparFormulario();
  }

  function arquivarLancamento(id: number) {
    if (!podeArquivar) {
      setMensagem("Pagamento pendente. Regularize para arquivar registros e continuar usando os recursos completos.");
      return;
    }

    setLancamentos((atual) =>
      atual.map((item) =>
        item.id === id
          ? {
              ...item,
              arquivado: true,
              status: "arquivado",
            }
          : item,
      ),
    );

    setMensagem("Lançamento arquivado com sucesso. O histórico foi preservado.");
  }

  function baixarDadosLocais() {
    if (!podeBaixar) {
      setMensagem("Pagamento pendente. Realize o pagamento para liberar o download dos registros.");
      return;
    }

    const conteudo = {
      exportadoEm: new Date().toISOString(),
      statusPlano: billing.status,
      lojaId: billing.lojaId,
      lojaNome: billing.lojaNome,
      planoNome: billing.planoNome,
      total: lancamentos.length,
      ativos: ativos.length,
      arquivados: arquivados.length,
      registros: lancamentos,
    };

    const blob = new Blob([JSON.stringify(conteudo, null, 2)], {
      type: "application/json;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `aurora-loja-maconica-lancamentos-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setMensagem("Backup local baixado com sucesso. O arquivo foi gerado para guardar no PC ou celular.");
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
                Lançamentos e arquivamento institucional
              </div>

              <h1
                style={{
                  margin: 0,
                  fontSize: 36,
                  lineHeight: 1.08,
                }}
              >
                Lançamentos Gerais da Loja
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
                Área preparada para registrar movimentações institucionais,
                observações administrativas, acompanhamentos fraternos, itens de
                agenda, registros históricos e arquivamento seguro, deixando
                livre a continuidade de novos lançamentos sem perder o passado.
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
                href="/agenda"
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
                Ir para agenda
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
          <SummaryCard title="Base preparada" value={String(lancamentos.length)} accent />
          <SummaryCard title="Ativos" value={String(ativos.length)} />
          <SummaryCard title="Arquivados" value={String(arquivados.length)} />
          <SummaryCard
            title="Downloads"
            value={podeBaixar ? "Liberados" : "Bloqueados"}
          />
        </section>

        <section style={{ marginTop: 24 }}>
          <SectionCard eyebrow="Novo lançamento" title="Salvar novo registro">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 14,
              }}
            >
              <Field label="Título">
                <input
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Ex.: Registro administrativo da loja"
                  style={inputStyle}
                />
              </Field>

              <Field label="Categoria">
                <input
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  placeholder="Ex.: Cadastro, Histórico, Fraterno..."
                  style={inputStyle}
                />
              </Field>

              <Field label="Tipo">
                <select
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  style={inputStyle}
                >
                  <option value="administrativo">administrativo</option>
                  <option value="fraterno">fraterno</option>
                  <option value="historico">historico</option>
                  <option value="agenda">agenda</option>
                  <option value="evento">evento</option>
                  <option value="familia">familia</option>
                  <option value="documental">documental</option>
                  <option value="observacao">observacao</option>
                  <option value="geral">geral</option>
                </select>
              </Field>

              <Field label="Status">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  style={inputStyle}
                >
                  <option value="ativo">ativo</option>
                  <option value="pendente">pendente</option>
                  <option value="concluido">concluido</option>
                </select>
              </Field>

              <Field label="Prioridade">
                <select
                  value={prioridade}
                  onChange={(e) => setPrioridade(e.target.value)}
                  style={inputStyle}
                >
                  <option value="baixa">baixa</option>
                  <option value="normal">normal</option>
                  <option value="alta">alta</option>
                  <option value="urgente">urgente</option>
                </select>
              </Field>

              <Field label="Data de referência">
                <input
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  placeholder="__/__/____"
                  style={inputStyle}
                />
              </Field>
            </div>

            <div style={{ marginTop: 14 }}>
              <Field label="Descrição">
                <textarea
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Descreva o lançamento institucional..."
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
                label={podeCriar ? "Salvar lançamento" : "Realize o pagamento"}
                onClick={salvarLancamento}
                disabled={!podeCriar}
              />

              <ActionButton
                label="Limpar formulário"
                variant="secondary"
                onClick={limparFormulario}
              />

              <ActionButton
                label={podeBaixar ? "Baixar backup local" : "Pagamento necessário"}
                variant="secondary"
                onClick={baixarDadosLocais}
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
                Realize o pagamento para voltar a salvar novos registros, arquivar lançamentos e liberar downloads.
              </p>
            ) : null}
          </SectionCard>
        </section>

        <section style={{ marginTop: 24 }}>
          <SectionCard eyebrow="Movimentações ativas" title="Lançamentos em uso">
            <div
              style={{
                display: "grid",
                gap: 16,
              }}
            >
              {ativos.map((item) => (
                <LancamentoCard
                  key={item.id}
                  item={item}
                  onArquivar={arquivarLancamento}
                  podeArquivar={podeArquivar}
                />
              ))}
            </div>
          </SectionCard>
        </section>

        <section style={{ marginTop: 24 }}>
          <SectionCard eyebrow="Histórico preservado" title="Lançamentos arquivados">
            <div
              style={{
                display: "grid",
                gap: 16,
              }}
            >
              {arquivados.map((item) => (
                <LancamentoCard
                  key={item.id}
                  item={item}
                  podeArquivar={podeArquivar}
                />
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