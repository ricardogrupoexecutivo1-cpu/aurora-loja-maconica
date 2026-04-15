"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  BillingInfo,
  canCreate,
  canDownload,
  getBilling,
  getBillingLabel,
  getBillingMessage,
  getBillingTone,
} from "@/lib/billing";
import {
  CLIENT_ACESSO_INICIAL,
  ClientAcessoContexto,
  formatClientPapel,
  readClientRBAC,
} from "@/lib/client-rbac";

type Irmao = {
  id: string;
  nome: string;
  cargo: string;
  telefone: string;
  email: string;
  status: string;
  created_at?: string;
};

const LOJA_ID = "loja-maconica-aurora";

const BILLING_INICIAL: BillingInfo = {
  status: "ativo",
  vencimento: undefined,
  diasAtraso: 0,
  linkPagamento: "#",
  bloquearCriacao: false,
  bloquearArquivamento: false,
  bloquearDownload: false,
  lojaId: LOJA_ID,
  lojaNome: "Loja Maçônica Aurora",
  planoNome: "Plano Institucional",
  paymentStatus: "pago",
  graceUntil: undefined,
  observacoes: "",
};

const FALLBACK_IRMAOS: Irmao[] = [
  {
    id: "fallback-1",
    nome: "João da Silva",
    cargo: "Venerável Mestre",
    telefone: "31999999999",
    email: "joao@email.com",
    status: "ativo",
  },
  {
    id: "fallback-2",
    nome: "Carlos Souza",
    cargo: "Secretário",
    telefone: "31988888888",
    email: "carlos@email.com",
    status: "ativo",
  },
  {
    id: "fallback-3",
    nome: "Marcos Pereira",
    cargo: "Tesoureiro",
    telefone: "31977777777",
    email: "marcos@email.com",
    status: "ativo",
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

  const color =
    disabled ? "#64748b" : variant === "secondary" ? "#0f172a" : "#ffffff";

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

function IrmaoCard({ item }: { item: Irmao }) {
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
          {item.cargo}
        </div>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            borderRadius: 999,
            padding: "7px 12px",
            background: item.status === "ativo" ? "#f0fdf4" : "#fff7ed",
            border:
              item.status === "ativo" ? "1px solid #86efac" : "1px solid #fdba74",
            color: item.status === "ativo" ? "#166534" : "#9a3412",
            fontSize: 12,
            fontWeight: 800,
          }}
        >
          {item.status}
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
        {item.nome}
      </h3>

      <div
        style={{
          marginTop: 14,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
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
            Telefone
          </div>

          <div
            style={{
              color: "#0f172a",
              fontSize: 16,
              fontWeight: 800,
            }}
          >
            {item.telefone}
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
            E-mail
          </div>

          <div
            style={{
              color: "#0f172a",
              fontSize: 16,
              fontWeight: 800,
              wordBreak: "break-word",
            }}
          >
            {item.email}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function IrmaosPage() {
  const [irmaos, setIrmaos] = useState<Irmao[]>(FALLBACK_IRMAOS);
  const [billing, setBilling] = useState<BillingInfo>(BILLING_INICIAL);
  const [billingLoading, setBillingLoading] = useState(true);
  const [loadingIrmaos, setLoadingIrmaos] = useState(true);
  const [acesso, setAcesso] = useState<ClientAcessoContexto>(CLIENT_ACESSO_INICIAL);

  const [nome, setNome] = useState("");
  const [cargo, setCargo] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState(
    "Cadastro de irmãos carregado com sucesso. Base pronta para organização institucional e cópia local/offline.",
  );

  function getSupabaseClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) return null;

    return createClient(supabaseUrl, supabaseAnonKey);
  }

  function normalizarIrmao(item: any): Irmao {
    return {
      id: String(item.id),
      nome: item.nome_completo ?? "Irmão sem nome",
      cargo: item.cargo_nome ?? "Irmão da Loja",
      telefone: item.telefone ?? "(00) 00000-0000",
      email: item.email ?? "email@reservado.com",
      status: item.situacao ?? "ativo",
      created_at: item.created_at ?? undefined,
    };
  }

  async function carregarAcesso() {
    try {
      setAcesso((atual) => ({ ...atual, carregando: true }));

      const acessoLido = await readClientRBAC(LOJA_ID);

      setAcesso(acessoLido);

      if (!acessoLido.email) {
        setMensagem(
          "Sessão não identificada. A visualização segue em modo seguro e o cadastro permanece bloqueado até confirmar o acesso institucional.",
        );
        return;
      }

      if (!acessoLido.usuarioId) {
        setMensagem(
          "Usuário autenticado encontrado, mas ainda sem vínculo confirmado na tabela usuarios. O cadastro de irmãos fica bloqueado até finalizar a ligação institucional.",
        );
        return;
      }

      if (!acessoLido.lojaUsuarioId) {
        setMensagem(
          "Usuário localizado, mas ainda sem vínculo completo em loja_usuarios. O modo seguro permanece ativo até finalizar o papel institucional.",
        );
        return;
      }

      setMensagem(
        `Acesso institucional confirmado para ${acessoLido.email} com papel ${formatClientPapel(acessoLido.papel)}.`,
      );
    } catch (error) {
      const texto =
        error instanceof Error ? error.message : "falha inesperada na leitura de acesso";

      setAcesso({
        ...CLIENT_ACESSO_INICIAL,
        carregando: false,
      });

      setMensagem(`Falha ao ler acesso institucional. Detalhe: ${texto}`);
    }
  }

  async function carregarIrmaos() {
    try {
      setLoadingIrmaos(true);

      const supabase = getSupabaseClient();

      if (!supabase) {
        setMensagem(
          "Supabase não configurado no cliente. Mantendo base local temporária dos irmãos.",
        );
        return;
      }

      const { data, error } = await supabase
        .from("alm_brothers")
        .select(
          "id,loja_id,nome_completo,cargo_nome,telefone,email,situacao,created_at",
        )
        .eq("loja_id", LOJA_ID)
        .order("created_at", { ascending: false });

      if (error) {
        setMensagem(
          `Leitura real dos irmãos com fallback local. Detalhe: ${error.message}`,
        );
        return;
      }

      if (Array.isArray(data) && data.length > 0) {
        setIrmaos(data.map(normalizarIrmao));
        setMensagem("Cadastro de irmãos carregado com leitura real do Supabase.");
      } else {
        setMensagem(
          "Nenhum irmão encontrado no Supabase ainda. Mantendo base local inicial para continuidade.",
        );
      }
    } catch (error) {
      const texto =
        error instanceof Error ? error.message : "falha inesperada na leitura";
      setMensagem(`Fallback local mantido na base de irmãos. Detalhe: ${texto}`);
    } finally {
      setLoadingIrmaos(false);
    }
  }

  useEffect(() => {
    let ativo = true;

    async function carregarBilling() {
      try {
        setBillingLoading(true);
        const billingReal = await getBilling(LOJA_ID);

        if (!ativo) return;

        setBilling(billingReal);

        if (billingReal.status !== "ativo" && billingReal.status !== "trial") {
          setMensagem(
            "Blindagem comercial ativa. Realize o pagamento para liberar novos cadastros e downloads da base de irmãos.",
          );
        }
      } finally {
        if (ativo) {
          setBillingLoading(false);
        }
      }
    }

    carregarBilling();
    carregarIrmaos();
    carregarAcesso();

    return () => {
      ativo = false;
    };
  }, []);

  const podeCriar =
    canCreate(billing) && acesso.canManageMembers && !acesso.carregando;

  const podeBaixar = canDownload(billing);
  const mensagemBilling = getBillingMessage(billing);
  const billingTone = getBillingTone(billing.status);

  const totalAtivos = useMemo(
    () => irmaos.filter((item) => item.status === "ativo").length,
    [irmaos],
  );

  function limparFormulario() {
    setNome("");
    setCargo("");
    setTelefone("");
    setEmail("");
  }

  async function salvar() {
    if (!canCreate(billing)) {
      setMensagem("Pagamento necessário para cadastrar novos irmãos.");
      return;
    }

    if (acesso.carregando) {
      setMensagem("Aguardando confirmação do acesso institucional.");
      return;
    }

    if (!acesso.canManageMembers) {
      setMensagem(
        "Seu acesso atual não permite cadastrar irmãos. Esta operação fica restrita aos perfis autorizados.",
      );
      return;
    }

    if (!nome.trim()) {
      setMensagem("Informe o nome do irmão antes de salvar.");
      return;
    }

    try {
      const supabase = getSupabaseClient();

      if (!supabase) {
        const novoLocal: Irmao = {
          id: String(Date.now()),
          nome: nome.trim(),
          cargo: cargo.trim() || "Irmão da Loja",
          telefone: telefone.trim() || "(00) 00000-0000",
          email: email.trim() || "email@reservado.com",
          status: "ativo",
        };

        setIrmaos((atual) => [novoLocal, ...atual]);
        setMensagem(
          "Supabase não configurado no cliente. Irmão salvo apenas na base local temporária.",
        );
        limparFormulario();
        return;
      }

      const payload = {
        loja_id: LOJA_ID,
        nome_completo: nome.trim(),
        cargo_nome: cargo.trim() || "Irmão da Loja",
        telefone: telefone.trim() || "(00) 00000-0000",
        email: email.trim() || "email@reservado.com",
        situacao: "ativo",
      };

      const { data, error } = await supabase
        .from("alm_brothers")
        .insert(payload)
        .select(
          "id,loja_id,nome_completo,cargo_nome,telefone,email,situacao,created_at",
        )
        .single();

      if (error) {
        setMensagem(`Falha ao salvar no Supabase: ${error.message}`);
        return;
      }

      setIrmaos((atual) => [normalizarIrmao(data), ...atual]);
      setMensagem("Irmão cadastrado com sucesso na base real do Supabase.");
      limparFormulario();
    } catch (error) {
      const texto =
        error instanceof Error ? error.message : "falha inesperada no salvamento";
      setMensagem(`Erro ao salvar irmão: ${texto}`);
    }
  }

  function baixar() {
    if (!podeBaixar) {
      setMensagem("Pagamento necessário para baixar a base de irmãos.");
      return;
    }

    const conteudo = {
      exportadoEm: new Date().toISOString(),
      lojaId: billing.lojaId,
      lojaNome: billing.lojaNome,
      planoNome: billing.planoNome,
      statusPlano: billing.status,
      totalIrmaos: irmaos.length,
      totalAtivos,
      origem: "irmaos",
      acessoAtual: {
        email: acesso.email,
        papel: acesso.papel,
        permissoes: acesso.permissoes,
        canManageMembers: acesso.canManageMembers,
        canViewReserved: acesso.canViewReserved,
        canViewFinance: acesso.canViewFinance,
      },
      irmaos,
    };

    const blob = new Blob([JSON.stringify(conteudo, null, 2)], {
      type: "application/json;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `aurora-loja-maconica-irmaos-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setMensagem("Base de irmãos baixada com sucesso para guardar no PC ou celular.");
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
                  maxWidth: 820,
                  color: "rgba(255,255,255,0.92)",
                  lineHeight: 1.8,
                  fontSize: 16,
                }}
              >
                Área institucional para organização dos irmãos da loja, com base
                preparada para cargos, situação cadastral, contatos, identificação
                interna e integração futura com permissões, família, foto e
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
                href="/irmaos/familia"
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
                Ir para família
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
          <SummaryCard title="Irmãos cadastrados" value={String(irmaos.length)} accent />
          <SummaryCard title="Ativos" value={String(totalAtivos)} />
          <SummaryCard
            title="Acesso atual"
            value={acesso.carregando ? "Lendo..." : formatClientPapel(acesso.papel)}
          />
          <SummaryCard title="Downloads" value={podeBaixar ? "Liberados" : "Bloqueados"} />
        </section>

        <section style={{ marginTop: 24 }}>
          <SectionCard eyebrow="RBAC institucional" title="Leitura do acesso atual">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 14,
              }}
            >
              <div
                style={{
                  borderRadius: 18,
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  padding: 16,
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
                  E-mail
                </div>
                <div
                  style={{
                    color: "#0f172a",
                    fontSize: 15,
                    fontWeight: 800,
                    wordBreak: "break-word",
                  }}
                >
                  {acesso.email || "Sessão não identificada"}
                </div>
              </div>

              <div
                style={{
                  borderRadius: 18,
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  padding: 16,
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
                  Papel
                </div>
                <div
                  style={{
                    color: "#0f172a",
                    fontSize: 15,
                    fontWeight: 800,
                  }}
                >
                  {acesso.carregando ? "Carregando..." : formatClientPapel(acesso.papel)}
                </div>
              </div>

              <div
                style={{
                  borderRadius: 18,
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  padding: 16,
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
                  Gerenciar irmãos
                </div>
                <div
                  style={{
                    color: acesso.canManageMembers ? "#166534" : "#9a3412",
                    fontSize: 15,
                    fontWeight: 800,
                  }}
                >
                  {acesso.canManageMembers ? "Liberado" : "Bloqueado"}
                </div>
              </div>

              <div
                style={{
                  borderRadius: 18,
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  padding: 16,
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
                  Financeiro
                </div>
                <div
                  style={{
                    color: acesso.canViewFinance ? "#166534" : "#9a3412",
                    fontSize: 15,
                    fontWeight: 800,
                  }}
                >
                  {acesso.canViewFinance ? "Liberado" : "Restrito"}
                </div>
              </div>
            </div>

            <p
              style={{
                marginTop: 16,
                marginBottom: 0,
                color: "#475569",
                lineHeight: 1.75,
                fontSize: 15,
              }}
            >
              Permissões identificadas:{" "}
              {acesso.permissoes.length > 0
                ? acesso.permissoes.join(", ")
                : "nenhuma permissão direta identificada"}
              .
            </p>
          </SectionCard>
        </section>

        <section style={{ marginTop: 24 }}>
          <SectionCard eyebrow="Novo irmão" title="Salvar cadastro institucional">
            <div
              style={{
                marginBottom: 16,
                padding: 14,
                borderRadius: 18,
                background: podeCriar ? "#ecfdf5" : "#fff7ed",
                border: podeCriar ? "1px solid #86efac" : "1px solid #fdba74",
                color: podeCriar ? "#166534" : "#9a3412",
                fontWeight: 800,
                lineHeight: 1.7,
              }}
            >
              {podeCriar
                ? "Acesso liberado para cadastro institucional de irmãos."
                : acesso.carregando
                  ? "Aguardando leitura do acesso institucional para liberar o cadastro."
                  : "Seu acesso atual não permite cadastrar irmãos nesta loja."}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 14,
              }}
            >
              <Field label="Nome">
                <input
                  placeholder="Ex.: João da Silva"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  style={inputStyle}
                />
              </Field>

              <Field label="Cargo">
                <input
                  placeholder="Ex.: Venerável Mestre"
                  value={cargo}
                  onChange={(e) => setCargo(e.target.value)}
                  style={inputStyle}
                />
              </Field>

              <Field label="Telefone">
                <input
                  placeholder="Ex.: 31999999999"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  style={inputStyle}
                />
              </Field>

              <Field label="E-mail">
                <input
                  placeholder="Ex.: joao@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={inputStyle}
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
                label={podeCriar ? "Salvar irmão" : "Acesso restrito"}
                onClick={salvar}
                disabled={!podeCriar}
              />

              <ActionButton
                label="Limpar formulário"
                variant="secondary"
                onClick={limparFormulario}
              />

              <ActionButton
                label={podeBaixar ? "Baixar base local" : "Pagamento necessário"}
                variant="secondary"
                onClick={baixar}
                disabled={!podeBaixar}
              />

              <ActionButton
                label="Atualizar leitura"
                variant="secondary"
                onClick={() => {
                  carregarIrmaos();
                  carregarAcesso();
                }}
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
                O cadastro de irmãos exige pagamento ativo e perfil institucional com permissão para gerenciamento.
              </p>
            ) : null}
          </SectionCard>
        </section>

        <section style={{ marginTop: 24 }}>
          <SectionCard eyebrow="Base interna" title="Relação de irmãos da loja">
            <div
              style={{
                display: "grid",
                gap: 16,
              }}
            >
              {irmaos.map((item) => (
                <IrmaoCard key={item.id} item={item} />
              ))}
            </div>
          </SectionCard>
        </section>

        <section style={{ marginTop: 24 }}>
          <SectionCard eyebrow="Estrutura pronta" title="O que esta página já suporta">
            <div
              style={{
                display: "grid",
                gap: 12,
              }}
            >
              {[
                "Nome do irmão.",
                "Cargo institucional.",
                "Situação cadastral.",
                "Contato interno.",
                "Leitura real do Supabase com fallback local.",
                "Primeira camada de RBAC por helper central.",
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
          <SectionCard eyebrow="Próxima expansão" title="O que ligamos depois">
            <div
              style={{
                display: "grid",
                gap: 12,
              }}
            >
              {[
                "Ligação total com cargos e mandato atual.",
                "Foto real vinculada ao cadastro.",
                "Família, cunhada, sobrinhos e netos por irmão.",
                "Busca e filtros internos.",
                "Exportações premium por PDF e CSV.",
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