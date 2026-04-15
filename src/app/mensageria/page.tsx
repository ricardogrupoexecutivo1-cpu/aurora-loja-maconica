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

type MensagemItem = {
  id: number;
  categoria: string;
  titulo: string;
  publico: string;
  descricao: string;
  whatsapp: boolean;
  agenda: boolean;
};

const MENSAGENS_INICIAIS: MensagemItem[] = [
  {
    id: 1,
    categoria: "Comunicado",
    titulo: "Aviso institucional da administração",
    publico: "Todos os irmãos autorizados",
    descricao:
      "Espaço para recados da administração, lembretes de sessão, convocações e orientações formais da loja.",
    whatsapp: true,
    agenda: true,
  },
  {
    id: 2,
    categoria: "Conversa",
    titulo: "Canal entre irmãos",
    publico: "Grupo interno protegido",
    descricao:
      "Área para troca de informações internas entre irmãos autorizados, com organização por assunto, cargo ou necessidade institucional.",
    whatsapp: true,
    agenda: false,
  },
  {
    id: 3,
    categoria: "Agenda",
    titulo: "Integração com compromissos",
    publico: "Sessões, eventos e solenidades",
    descricao:
      "Ligação com sessões, reuniões, solenidades, datas importantes e lembretes rápidos para manter todos alinhados.",
    whatsapp: false,
    agenda: true,
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

function MessageCard({ item }: { item: MensagemItem }) {
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
            background: item.whatsapp ? "#f0fdf4" : "#f8fafc",
            border: item.whatsapp ? "1px solid #86efac" : "1px solid #cbd5e1",
            color: item.whatsapp ? "#166534" : "#475569",
            fontSize: 12,
            fontWeight: 800,
          }}
        >
          {item.whatsapp ? "WhatsApp preparado" : "WhatsApp opcional"}
        </div>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            borderRadius: 999,
            padding: "7px 12px",
            background: item.agenda ? "#fff7ed" : "#f8fafc",
            border: item.agenda ? "1px solid #fdba74" : "1px solid #cbd5e1",
            color: item.agenda ? "#9a3412" : "#475569",
            fontSize: 12,
            fontWeight: 800,
          }}
        >
          {item.agenda ? "Ligado à agenda" : "Sem agenda"}
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
          Público
        </div>

        <div
          style={{
            color: "#0f172a",
            fontSize: 16,
            fontWeight: 800,
          }}
        >
          {item.publico}
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

export default function MensageriaPage() {
  const [billing, setBilling] = useState<BillingInfo>(BILLING_INICIAL);
  const [billingLoading, setBillingLoading] = useState(true);
  const [mensagemSistema, setMensagemSistema] = useState(
    "Canal interno carregado com sucesso. Área pronta para comunicação institucional, apoio à agenda e cópia local/offline quando necessário.",
  );

  const [mensagens, setMensagens] = useState<MensagemItem[]>(MENSAGENS_INICIAIS);
  const [categoria, setCategoria] = useState("Comunicado");
  const [titulo, setTitulo] = useState("");
  const [publico, setPublico] = useState("");
  const [descricao, setDescricao] = useState("");
  const [whatsapp, setWhatsapp] = useState(true);
  const [agenda, setAgenda] = useState(false);

  useEffect(() => {
    let ativo = true;

    async function carregarBilling() {
      try {
        setBillingLoading(true);
        const billingReal = await getBilling("loja-maconica-aurora");

        if (!ativo) return;

        setBilling(billingReal);

        if (billingReal.status !== "ativo" && billingReal.status !== "trial") {
          setMensagemSistema(
            "Blindagem comercial ativa. Realize o pagamento para liberar a criação de comunicados e os downloads da mensageria.",
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

  const totalWhatsapp = useMemo(
    () => mensagens.filter((item) => item.whatsapp).length,
    [mensagens],
  );

  function limparFormulario() {
    setCategoria("Comunicado");
    setTitulo("");
    setPublico("");
    setDescricao("");
    setWhatsapp(true);
    setAgenda(false);
  }

  function salvarMensagem() {
    if (!podeCriar) {
      setMensagemSistema("Pagamento pendente. Realize o pagamento para voltar a publicar mensagens.");
      return;
    }

    if (!titulo.trim()) {
      setMensagemSistema("Informe o título da mensagem antes de salvar.");
      return;
    }

    const nova: MensagemItem = {
      id: Date.now(),
      categoria,
      titulo: titulo.trim(),
      publico: publico.trim() || "Grupo interno protegido",
      descricao:
        descricao.trim() || "Mensagem criada manualmente na área institucional da loja.",
      whatsapp,
      agenda,
    };

    setMensagens((atual) => [nova, ...atual]);
    setMensagemSistema("Mensagem institucional salva com sucesso.");
    limparFormulario();
  }

  function baixarMensageriaLocal() {
    if (!podeBaixar) {
      setMensagemSistema("Pagamento pendente. Realize o pagamento para liberar o download da mensageria.");
      return;
    }

    const conteudo = {
      exportadoEm: new Date().toISOString(),
      lojaId: billing.lojaId,
      lojaNome: billing.lojaNome,
      planoNome: billing.planoNome,
      statusPlano: billing.status,
      totalMensagens: mensagens.length,
      totalWhatsapp,
      mensagens,
    };

    const blob = new Blob([JSON.stringify(conteudo, null, 2)], {
      type: "application/json;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `aurora-loja-maconica-mensageria-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setMensagemSistema("Mensageria baixada com sucesso. Arquivo gerado para guardar no PC ou celular.");
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
                Canal interno protegido
              </div>

              <h1
                style={{
                  margin: 0,
                  fontSize: 36,
                  lineHeight: 1.08,
                }}
              >
                Mensageria • Aurora Loja Maçônica
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
                Área institucional para comunicados, avisos, conversas entre irmãos,
                integração com agenda e atalhos para WhatsApp, sempre com blindagem
                por cargo e permissão. Sistema em constante atualização e podem
                ocorrer instabilidades momentâneas durante melhorias.
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
                href="/financeiro"
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
                Voltar ao financeiro
              </Link>

              <Link
                href="/cargos"
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
          <SummaryCard title="Canal interno" value="Estruturado" accent />
          <SummaryCard title="WhatsApp" value="Preparado" />
          <SummaryCard title="Agenda" value="Integrável" />
          <SummaryCard title="Downloads" value={podeBaixar ? "Liberados" : "Bloqueados"} />
        </section>

        <section style={{ marginTop: 24 }}>
          <SectionCard eyebrow="Novo comunicado" title="Salvar mensagem institucional">
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
                  <option value="Comunicado">Comunicado</option>
                  <option value="Conversa">Conversa</option>
                  <option value="Agenda">Agenda</option>
                  <option value="Aviso">Aviso</option>
                  <option value="Convocação">Convocação</option>
                </select>
              </Field>

              <Field label="Título">
                <input
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Ex.: Aviso institucional da administração"
                  style={inputStyle}
                />
              </Field>

              <Field label="Público">
                <input
                  value={publico}
                  onChange={(e) => setPublico(e.target.value)}
                  placeholder="Ex.: Todos os irmãos autorizados"
                  style={inputStyle}
                />
              </Field>

              <Field label="WhatsApp">
                <select
                  value={whatsapp ? "sim" : "nao"}
                  onChange={(e) => setWhatsapp(e.target.value === "sim")}
                  style={inputStyle}
                >
                  <option value="sim">Preparado</option>
                  <option value="nao">Não usar</option>
                </select>
              </Field>

              <Field label="Ligação com agenda">
                <select
                  value={agenda ? "sim" : "nao"}
                  onChange={(e) => setAgenda(e.target.value === "sim")}
                  style={inputStyle}
                >
                  <option value="nao">Sem agenda</option>
                  <option value="sim">Ligado à agenda</option>
                </select>
              </Field>
            </div>

            <div style={{ marginTop: 14 }}>
              <Field label="Descrição">
                <textarea
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Descreva a mensagem institucional..."
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
                label={podeCriar ? "Salvar mensagem" : "Realize o pagamento"}
                onClick={salvarMensagem}
                disabled={!podeCriar}
              />

              <ActionButton
                label="Limpar formulário"
                variant="secondary"
                onClick={limparFormulario}
              />

              <ActionButton
                label={podeBaixar ? "Baixar mensageria local" : "Pagamento necessário"}
                variant="secondary"
                onClick={baixarMensageriaLocal}
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
                Realize o pagamento para voltar a publicar comunicados e manter a mensageria com cópia local/offline disponível.
              </p>
            ) : null}
          </SectionCard>
        </section>

        <section style={{ marginTop: 24 }}>
          <SectionCard eyebrow="Comunicados" title="Canal interno entre irmãos">
            <div
              style={{
                display: "grid",
                gap: 16,
              }}
            >
              {mensagens.map((item) => (
                <MessageCard key={item.id} item={item} />
              ))}
            </div>
          </SectionCard>
        </section>

        <section style={{ marginTop: 24 }}>
          <SectionCard eyebrow="Como deve funcionar" title="Modelo certo da comunicação">
            <div
              style={{
                display: "grid",
                gap: 12,
              }}
            >
              {[
                "Cada irmão vê apenas o que sua permissão permitir.",
                "Administração pode publicar comunicados gerais.",
                "Alguns cargos podem enviar mensagens setoriais.",
                "A agenda pode alimentar avisos automáticos da loja.",
                "WhatsApp deve ser atalho institucional e não exposição irrestrita.",
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
          <SectionCard eyebrow="Blindagem ativa" title="Regras de segurança">
            <div
              style={{
                display: "grid",
                gap: 12,
              }}
            >
              {[
                "Nem todo irmão poderá enviar comunicado geral.",
                "Mensagens sensíveis devem ficar restritas por papel.",
                "Dados pessoais e contatos não devem ficar expostos livremente.",
                "A comunicação precisa respeitar cargo, função e autorização.",
                "A loja mantém o controle do que é público, interno e reservado.",
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
          <SectionCard eyebrow="Próximas evoluções" title="O que vamos ligar depois">
            <div
              style={{
                display: "grid",
                gap: 12,
              }}
            >
              {[
                "Comunicados por cargo.",
                "Botões de WhatsApp.",
                "Canal entre irmãos com grupos internos.",
                "Agenda conectada com avisos automáticos.",
                "Exportações avançadas e histórico real da comunicação.",
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
              {mensagemSistema}
            </p>
          </SectionCard>
        </section>
      </div>
    </main>
  );
}