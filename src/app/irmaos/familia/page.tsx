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

type FamiliarCategoria = "cunhada" | "sobrinho" | "sobrinha" | "neto" | "neta";
type EventoPublico = "familiar" | "irmao" | "administrativo";
type EventoStatus = "liberado" | "reservado";
type PapelLoja =
  | "admin_master"
  | "veneravel"
  | "secretario"
  | "tesoureiro"
  | "orador"
  | "chanceler"
  | "mestre_de_cerimonias"
  | "irmao"
  | "desconhecido";

type AcessoContexto = {
  userAuthId: string | null;
  email: string | null;
  usuarioId: string | null;
  lojaUsuarioId: string | null;
  papel: PapelLoja;
  permissoes: string[];
  canManageMembers: boolean;
  canViewReserved: boolean;
  canViewFinance: boolean;
  carregando: boolean;
};

type Familiar = {
  id: string;
  categoria: "irmao" | FamiliarCategoria;
  nome: string;
  parentescoLabel: string;
  dataNascimento: string;
  telefone: string;
  email: string;
  observacoes: string;
};

type HistoricoMaconico = {
  iniciacaoAprendiz: string;
  elevacaoCompanheiro: string;
  exaltacaoMestre: string;
  observacoes: string;
};

type EventoSocial = {
  id: string;
  data: string;
  titulo: string;
  tipo: string;
  descricao: string;
  publico: EventoPublico;
  status: EventoStatus;
};

type BrotherLookupResult = {
  id: string;
  nome?: string | null;
};

const FAMILIA_INICIAL: Familiar[] = [
  {
    id: "local-1",
    categoria: "irmao",
    nome: "João da Silva",
    parentescoLabel: "Irmão da Loja",
    dataNascimento: "__/__/____",
    telefone: "(00) 00000-0000",
    email: "irmao@reservado.com",
    observacoes: "Registro institucional do irmão.",
  },
  {
    id: "local-2",
    categoria: "cunhada",
    nome: "Maria da Silva",
    parentescoLabel: "Cunhada",
    dataNascimento: "__/__/____",
    telefone: "(00) 00000-0000",
    email: "cunhada@reservado.com",
    observacoes: "Cadastro completo da cunhada com base pronta para aniversários.",
  },
];

const HISTORICO_INICIAL: HistoricoMaconico = {
  iniciacaoAprendiz: "__/__/____",
  elevacaoCompanheiro: "__/__/____",
  exaltacaoMestre: "__/__/____",
  observacoes: "Espaço reservado para histórico maçônico do irmão.",
};

const EVENTOS_INICIAIS: EventoSocial[] = [
  {
    id: "evento-1",
    data: "15/05/2026",
    titulo: "Confraternização familiar",
    tipo: "Social",
    descricao: "Encontro familiar com comunicação liberada e sem conteúdo reservado.",
    publico: "familiar",
    status: "liberado",
  },
  {
    id: "evento-2",
    data: "20/06/2026",
    titulo: "Aniversariantes do trimestre",
    tipo: "Felicitação",
    descricao: "Comemoração social dos aniversariantes com mensagens fraternas.",
    publico: "familiar",
    status: "liberado",
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

const ACESSO_INICIAL: AcessoContexto = {
  userAuthId: null,
  email: null,
  usuarioId: null,
  lojaUsuarioId: null,
  papel: "desconhecido",
  permissoes: [],
  canManageMembers: false,
  canViewReserved: false,
  canViewFinance: false,
  carregando: true,
};

const LOJA_ID = "loja-maconica-aurora";

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
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
}) {
  const background = disabled
    ? "#cbd5e1"
    : variant === "primary"
      ? "#065f46"
      : variant === "danger"
        ? "#991b1b"
        : "#ffffff";

  const color =
    disabled ? "#64748b" : variant === "secondary" ? "#0f172a" : "#ffffff";

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

function FamilyCard({ item }: { item: Familiar }) {
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
          {item.parentescoLabel}
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
            Data de nascimento
          </div>

          <div
            style={{
              color: "#0f172a",
              fontSize: 16,
              fontWeight: 800,
            }}
          >
            {item.dataNascimento}
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
            Telefone
          </div>

          <div
            style={{
              color: "#0f172a",
              fontSize: 16,
              fontWeight: 800,
            }}
          >
            {item.telefone || "Não informado"}
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
            {item.email || "Não informado"}
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
        {item.observacoes}
      </p>
    </div>
  );
}

function EventCard({
  item,
  onEdit,
  onDelete,
}: {
  item: EventoSocial;
  onEdit: (item: EventoSocial) => void;
  onDelete: (item: EventoSocial) => void;
}) {
  const badgeBg = item.status === "liberado" ? "#ecfdf5" : "#fff7ed";
  const badgeBorder = item.status === "liberado" ? "#86efac" : "#fdba74";
  const badgeColor = item.status === "liberado" ? "#166534" : "#9a3412";

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
          {item.tipo}
        </div>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            borderRadius: 999,
            padding: "7px 12px",
            background: "#f8fafc",
            border: "1px solid #cbd5e1",
            color: "#334155",
            fontSize: 12,
            fontWeight: 800,
          }}
        >
          Público: {item.publico}
        </div>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            borderRadius: 999,
            padding: "7px 12px",
            background: badgeBg,
            border: `1px solid ${badgeBorder}`,
            color: badgeColor,
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
        {item.titulo}
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
          marginBottom: 0,
          color: "#475569",
          lineHeight: 1.75,
          fontSize: 15,
        }}
      >
        {item.descricao}
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          marginTop: 18,
        }}
      >
        <ActionButton label="Editar" variant="secondary" onClick={() => onEdit(item)} />
        <ActionButton label="Excluir" variant="danger" onClick={() => onDelete(item)} />
      </div>
    </div>
  );
}

function formatarDataVisual(valor: string) {
  const numeros = valor.replace(/\D/g, "").slice(0, 8);

  if (numeros.length <= 2) return numeros;
  if (numeros.length <= 4) return `${numeros.slice(0, 2)}/${numeros.slice(2)}`;
  return `${numeros.slice(0, 2)}/${numeros.slice(2, 4)}/${numeros.slice(4)}`;
}

function dataVisualParaBanco(valor: string) {
  const numeros = valor.replace(/\D/g, "");

  if (numeros.length !== 8) return null;

  const dia = numeros.slice(0, 2);
  const mes = numeros.slice(2, 4);
  const ano = numeros.slice(4, 8);

  const diaNum = Number(dia);
  const mesNum = Number(mes);
  const anoNum = Number(ano);

  if (
    Number.isNaN(diaNum) ||
    Number.isNaN(mesNum) ||
    Number.isNaN(anoNum) ||
    diaNum < 1 ||
    diaNum > 31 ||
    mesNum < 1 ||
    mesNum > 12 ||
    anoNum < 1900 ||
    anoNum > 2100
  ) {
    return null;
  }

  return `${ano}-${mes}-${dia}`;
}

function dataBancoParaVisual(valor: string | null | undefined) {
  if (!valor) return "__/__/____";

  if (/^\d{4}-\d{2}-\d{2}$/.test(valor)) {
    const [ano, mes, dia] = valor.split("-");
    return `${dia}/${mes}/${ano}`;
  }

  return valor;
}

function isUuid(value: string | null | undefined) {
  if (!value) return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );
}

function normalizarEventoSocial(item: any): EventoSocial {
  return {
    id: String(item.id),
    data: dataBancoParaVisual(item.data_evento),
    titulo: item.titulo ?? "Evento sem título",
    tipo: item.tipo ?? "Social",
    descricao:
      item.descricao ??
      "Evento social carregado da base real do Supabase.",
    publico:
      item.publico === "irmao"
        ? "irmao"
        : item.publico === "administrativo"
          ? "administrativo"
          : "familiar",
    status: item.status === "reservado" ? "reservado" : "liberado",
  };
}

function normalizarPapel(value: string | null | undefined): PapelLoja {
  const papel = (value || "").trim().toLowerCase();

  switch (papel) {
    case "admin_master":
    case "veneravel":
    case "secretario":
    case "tesoureiro":
    case "orador":
    case "chanceler":
    case "mestre_de_cerimonias":
    case "irmao":
      return papel;
    default:
      return "desconhecido";
  }
}

function uniqueLower(values: Array<string | null | undefined>) {
  return Array.from(
    new Set(
      values
        .map((item) => (item || "").trim().toLowerCase())
        .filter(Boolean),
    ),
  );
}

function papelBonito(papel: PapelLoja) {
  switch (papel) {
    case "admin_master":
      return "Admin Master";
    case "veneravel":
      return "Venerável";
    case "secretario":
      return "Secretário";
    case "tesoureiro":
      return "Tesoureiro";
    case "orador":
      return "Orador";
    case "chanceler":
      return "Chanceler";
    case "mestre_de_cerimonias":
      return "Mestre de Cerimônias";
    case "irmao":
      return "Irmão";
    default:
      return "Não identificado";
  }
}

async function buscarIrmaoRealNoBanco(supabase: any) {
  const tentativas: Array<{
    tabela: string;
    select: string;
    nomeCampo: string;
  }> = [
    { tabela: "alm_brothers", select: "id,nome_completo,created_at", nomeCampo: "nome_completo" },
    { tabela: "alm_irmaos", select: "id,nome_completo,created_at", nomeCampo: "nome_completo" },
    { tabela: "alm_members", select: "id,nome_completo,created_at", nomeCampo: "nome_completo" },
    { tabela: "alm_brethren", select: "id,nome_completo,created_at", nomeCampo: "nome_completo" },
    { tabela: "alm_brothers", select: "id,nome,created_at", nomeCampo: "nome" },
    { tabela: "alm_irmaos", select: "id,nome,created_at", nomeCampo: "nome" },
    { tabela: "alm_members", select: "id,nome,created_at", nomeCampo: "nome" },
    { tabela: "alm_brethren", select: "id,nome,created_at", nomeCampo: "nome" },
  ];

  for (const tentativa of tentativas) {
    try {
      const { data, error } = await supabase
        .from(tentativa.tabela)
        .select(tentativa.select)
        .eq("loja_id", LOJA_ID)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      const typedData = data as {
        id?: string;
        nome_completo?: string | null;
        nome?: string | null;
      } | null;

      if (!error && typedData?.id && isUuid(typedData.id)) {
        return {
          id: String(typedData.id),
          nome:
            tentativa.nomeCampo === "nome_completo"
              ? typedData.nome_completo ?? null
              : typedData.nome ?? null,
        } as BrotherLookupResult;
      }
    } catch {
      // segue para próxima tabela
    }
  }

  return null;
}

export default function FamiliaPage() {
  const [billing, setBilling] = useState<BillingInfo>(BILLING_INICIAL);
  const [billingLoading, setBillingLoading] = useState(true);
  const [loadingFamilia, setLoadingFamilia] = useState(true);
  const [acesso, setAcesso] = useState<AcessoContexto>(ACESSO_INICIAL);

  const [familia, setFamilia] = useState<Familiar[]>(FAMILIA_INICIAL);
  const [historico, setHistorico] = useState<HistoricoMaconico>(HISTORICO_INICIAL);
  const [eventos, setEventos] = useState<EventoSocial[]>(EVENTOS_INICIAIS);

  const [categoria, setCategoria] = useState<FamiliarCategoria>("cunhada");
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [observacoes, setObservacoes] = useState("");

  const [eventoEditandoId, setEventoEditandoId] = useState<string | null>(null);
  const [eventoData, setEventoData] = useState("");
  const [eventoTitulo, setEventoTitulo] = useState("");
  const [eventoTipo, setEventoTipo] = useState("Social");
  const [eventoDescricao, setEventoDescricao] = useState("");
  const [eventoPublico, setEventoPublico] = useState<EventoPublico>("familiar");
  const [eventoStatus, setEventoStatus] = useState<EventoStatus>("liberado");

  const [brotherIdReal, setBrotherIdReal] = useState<string | null>(null);
  const [brotherNomeReal, setBrotherNomeReal] = useState<string | null>(null);

  const [mensagem, setMensagem] = useState(
    "Cadastro familiar e histórico carregados com sucesso. Área pronta para base institucional completa e cópia local/offline.",
  );

  function getSupabaseClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) return null;

    return createClient(supabaseUrl, supabaseAnonKey);
  }

  function categoriaParaLabel(value: Familiar["categoria"]) {
    switch (value) {
      case "irmao":
        return "Irmão da Loja";
      case "cunhada":
        return "Cunhada";
      case "sobrinho":
        return "Sobrinho";
      case "sobrinha":
        return "Sobrinha";
      case "neto":
        return "Neto";
      case "neta":
        return "Neta";
      default:
        return "Familiar";
    }
  }

  function parentescoParaBanco(value: FamiliarCategoria) {
    switch (value) {
      case "cunhada":
        return "cunhada";
      case "sobrinho":
        return "sobrinho";
      case "sobrinha":
        return "sobrinha";
      case "neto":
        return "neto";
      case "neta":
        return "neta";
      default:
        return "familiar";
    }
  }

  function normalizarFamiliar(item: any): Familiar {
    const tipo = (item.tipo_parentesco ?? "familiar") as string;
    const categoriaNormalizada: Familiar["categoria"] =
      tipo === "cunhada"
        ? "cunhada"
        : tipo === "sobrinho"
          ? "sobrinho"
          : tipo === "sobrinha"
            ? "sobrinha"
            : tipo === "neto"
              ? "neto"
              : tipo === "neta"
                ? "neta"
                : "irmao";

    return {
      id: String(item.id),
      categoria: categoriaNormalizada,
      nome: item.nome_completo ?? "Nome não informado",
      parentescoLabel: categoriaParaLabel(categoriaNormalizada),
      dataNascimento: dataBancoParaVisual(item.data_nascimento),
      telefone: item.telefone ?? "",
      email: item.email ?? "",
      observacoes: item.observacoes ?? "Sem observações.",
    };
  }

  async function carregarAcesso() {
    const supabase = getSupabaseClient();

    if (!supabase) {
      setAcesso({
        ...ACESSO_INICIAL,
        carregando: false,
      });
      setMensagem(
        "Supabase não configurado no cliente. Leitura de acesso institucional indisponível neste navegador.",
      );
      return;
    }

    try {
      setAcesso((atual) => ({ ...atual, carregando: true }));

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setAcesso({
          ...ACESSO_INICIAL,
          carregando: false,
        });
        setMensagem(
          "Sessão não identificada. A área familiar segue em modo seguro e os novos cadastros ficam bloqueados até confirmar o acesso institucional.",
        );
        return;
      }

      const authUserId = user.id;
      const emailAtual = user.email?.toLowerCase() ?? null;

      const { data: usuarioRow, error: usuarioError } = await supabase
        .from("usuarios")
        .select("id, auth_user_id, email, loja_id")
        .eq("auth_user_id", authUserId)
        .maybeSingle();

      if (usuarioError || !usuarioRow?.id) {
        setAcesso({
          userAuthId: authUserId,
          email: emailAtual,
          usuarioId: null,
          lojaUsuarioId: null,
          papel: "desconhecido",
          permissoes: [],
          canManageMembers: false,
          canViewReserved: false,
          canViewFinance: false,
          carregando: false,
        });

        setMensagem(
          "Usuário autenticado encontrado, mas ainda sem vínculo confirmado na tabela usuarios. O cadastro familiar permanece bloqueado até finalizar a ligação institucional.",
        );
        return;
      }

      const { data: lojaUsuarioRow, error: lojaUsuarioError } = await supabase
        .from("loja_usuarios")
        .select("id, loja_id, user_id, papel, ativo")
        .eq("user_id", usuarioRow.id)
        .eq("loja_id", LOJA_ID)
        .maybeSingle();

      if (lojaUsuarioError || !lojaUsuarioRow?.id) {
        setAcesso({
          userAuthId: authUserId,
          email: emailAtual,
          usuarioId: String(usuarioRow.id),
          lojaUsuarioId: null,
          papel: "desconhecido",
          permissoes: [],
          canManageMembers: false,
          canViewReserved: false,
          canViewFinance: false,
          carregando: false,
        });

        setMensagem(
          "Usuário localizado, mas ainda sem vínculo completo em loja_usuarios. O modo seguro permanece ativo até finalizar o papel institucional.",
        );
        return;
      }

      const { data: permissoesRows, error: permissoesError } = await supabase
        .from("loja_usuario_permissoes")
        .select("permissao, habilitada")
        .eq("loja_usuario_id", lojaUsuarioRow.id)
        .eq("habilitada", true);

      const permissoes = permissoesError
        ? []
        : uniqueLower(
            Array.isArray(permissoesRows)
              ? permissoesRows.map((item: any) => item.permissao)
              : [],
          );

      const papel = normalizarPapel(lojaUsuarioRow.papel);
      const isAdminMaster = papel === "admin_master";

      const canManageMembers =
        isAdminMaster ||
        papel === "veneravel" ||
        permissoes.includes("manage_members") ||
        permissoes.includes("gerenciar_irmaos") ||
        permissoes.includes("cadastro_irmaos");

      const canViewReserved =
        isAdminMaster ||
        papel === "veneravel" ||
        papel === "secretario" ||
        papel === "tesoureiro" ||
        papel === "orador" ||
        papel === "chanceler" ||
        papel === "mestre_de_cerimonias" ||
        permissoes.includes("reserved") ||
        permissoes.includes("conteudo_reservado");

      const canViewFinance =
        isAdminMaster ||
        papel === "tesoureiro" ||
        permissoes.includes("financeiro");

      setAcesso({
        userAuthId: authUserId,
        email: emailAtual,
        usuarioId: String(usuarioRow.id),
        lojaUsuarioId: String(lojaUsuarioRow.id),
        papel,
        permissoes,
        canManageMembers,
        canViewReserved,
        canViewFinance,
        carregando: false,
      });

      setMensagem(
        `Acesso institucional confirmado para ${emailAtual || "usuário autenticado"} com papel ${papelBonito(papel)}.`,
      );
    } catch (error) {
      const texto =
        error instanceof Error ? error.message : "falha inesperada na leitura de acesso";

      setAcesso({
        ...ACESSO_INICIAL,
        carregando: false,
      });

      setMensagem(`Falha ao ler acesso institucional. Detalhe: ${texto}`);
    }
  }

  async function carregarFamilia() {
    try {
      setLoadingFamilia(true);

      const supabase = getSupabaseClient();

      if (!supabase) {
        setMensagem(
          "Supabase não configurado no cliente. Mantendo base familiar local temporária.",
        );
        return;
      }

      const brotherReal = await buscarIrmaoRealNoBanco(supabase);

      if (brotherReal?.id) {
        setBrotherIdReal(brotherReal.id);
        setBrotherNomeReal(brotherReal.nome ?? null);
      } else {
        setBrotherIdReal(null);
        setBrotherNomeReal(null);
        setMensagem(
          "Não encontrei ainda o UUID real do irmão no banco. Cadastre ou confirme primeiro o irmão da loja para liberar o vínculo familiar.",
        );
      }

      const consultaCunhadas = supabase
        .from("alm_sisters_in_law")
        .select("id,brother_id,nome_completo,data_nascimento,telefone,email,observacoes,created_at")
        .eq("loja_id", LOJA_ID);

      const consultaFamilia = supabase
        .from("alm_family_members")
        .select("id,brother_id,tipo_parentesco,nome_completo,data_nascimento,telefone,observacoes,created_at")
        .eq("loja_id", LOJA_ID);

      const { data: sistersData, error: sistersError } = brotherReal?.id
        ? await consultaCunhadas.eq("brother_id", brotherReal.id).order("created_at", {
            ascending: false,
          })
        : await consultaCunhadas.order("created_at", { ascending: false });

      const { data: familyData, error: familyError } = brotherReal?.id
        ? await consultaFamilia.eq("brother_id", brotherReal.id).order("created_at", {
            ascending: false,
          })
        : await consultaFamilia.order("created_at", { ascending: false });

      const { data: historyData, error: historyError } = await supabase
        .from("alm_masonic_history")
        .select("data_iniciacao_aprendiz,data_elevacao_companheiro,data_exaltacao_mestre,observacoes,created_at")
        .eq("loja_id", LOJA_ID)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      const { data: eventsData, error: eventsError } = await supabase
        .from("alm_social_events")
        .select("id,data_evento,titulo,tipo,descricao,publico,status,created_at")
        .eq("loja_id", LOJA_ID)
        .order("data_evento", { ascending: true });

      if (sistersError || familyError || historyError || eventsError) {
        const detalhe =
          sistersError?.message ||
          familyError?.message ||
          historyError?.message ||
          eventsError?.message;

        setMensagem(`Leitura real com fallback local na área familiar. Detalhe: ${detalhe}`);
        return;
      }

      const familiaresNormalizados: Familiar[] = [];

      if (brotherReal?.id) {
        familiaresNormalizados.push({
          id: brotherReal.id,
          categoria: "irmao",
          nome: brotherReal.nome || "Irmão da Loja",
          parentescoLabel: "Irmão da Loja",
          dataNascimento: "__/__/____",
          telefone: "(00) 00000-0000",
          email: "irmao@reservado.com",
          observacoes: "Registro institucional do irmão.",
        });
      }

      if (Array.isArray(sistersData)) {
        sistersData.forEach((item) => {
          familiaresNormalizados.push({
            id: String(item.id),
            categoria: "cunhada",
            nome: item.nome_completo ?? "Nome não informado",
            parentescoLabel: "Cunhada",
            dataNascimento: dataBancoParaVisual(item.data_nascimento),
            telefone: item.telefone ?? "",
            email: item.email ?? "",
            observacoes: item.observacoes ?? "Sem observações.",
          });
        });
      }

      if (Array.isArray(familyData)) {
        familyData.forEach((item) => {
          familiaresNormalizados.push(
            normalizarFamiliar({
              ...item,
              email: "",
            }),
          );
        });
      }

      if (familiaresNormalizados.length > 0) {
        setFamilia(familiaresNormalizados);
      }

      if (Array.isArray(eventsData) && eventsData.length > 0) {
        setEventos(eventsData.map(normalizarEventoSocial));
      } else {
        setEventos(EVENTOS_INICIAIS);
      }

      if (brotherReal?.id) {
        setMensagem("Base familiar e agenda social carregadas com leitura real do Supabase e vínculo do irmão confirmado.");
      } else {
        setMensagem(
          "Base familiar carregada, mas o UUID real do irmão ainda não foi encontrado. O cadastro de novos familiares fica bloqueado até localizar esse vínculo.",
        );
      }

      if (historyData) {
        setHistorico({
          iniciacaoAprendiz: dataBancoParaVisual(historyData.data_iniciacao_aprendiz),
          elevacaoCompanheiro: dataBancoParaVisual(historyData.data_elevacao_companheiro),
          exaltacaoMestre: dataBancoParaVisual(historyData.data_exaltacao_mestre),
          observacoes:
            historyData.observacoes ?? "Histórico maçônico carregado do Supabase.",
        });
      }
    } catch (error) {
      const texto =
        error instanceof Error ? error.message : "falha inesperada na leitura";
      setMensagem(`Fallback local mantido na área familiar. Detalhe: ${texto}`);
    } finally {
      setLoadingFamilia(false);
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
            "Blindagem comercial ativa. Realize o pagamento para liberar novos registros familiares e os downloads desta área.",
          );
        }
      } finally {
        if (ativo) {
          setBillingLoading(false);
        }
      }
    }

    carregarBilling();
    carregarFamilia();
    carregarAcesso();

    return () => {
      ativo = false;
    };
  }, []);

  const podeCriar =
    canCreate(billing) &&
    !!brotherIdReal &&
    acesso.canManageMembers &&
    !acesso.carregando;

  const podeBaixar = canDownload(billing);

  const mensagemBilling = getBillingMessage(billing);
  const billingTone = getBillingTone(billing.status);

  const totalFamilia = familia.length;
  const totalAniversarios = useMemo(
    () =>
      familia.filter(
        (item) => item.dataNascimento && item.dataNascimento !== "__/__/____",
      ).length,
    [familia],
  );

  function limparFormulario() {
    setCategoria("cunhada");
    setNome("");
    setDataNascimento("");
    setTelefone("");
    setEmail("");
    setObservacoes("");
  }

  function limparEventoFormulario() {
    setEventoEditandoId(null);
    setEventoData("");
    setEventoTitulo("");
    setEventoTipo("Social");
    setEventoDescricao("");
    setEventoPublico("familiar");
    setEventoStatus("liberado");
  }

  function carregarEventoParaEdicao(item: EventoSocial) {
    setEventoEditandoId(item.id);
    setEventoData(item.data);
    setEventoTitulo(item.titulo);
    setEventoTipo(item.tipo);
    setEventoDescricao(item.descricao);
    setEventoPublico(item.publico);
    setEventoStatus(item.status);
    setMensagem(`Evento "${item.titulo}" carregado para edição.`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function excluirEventoSocial(item: EventoSocial) {
    if (acesso.carregando) {
      setMensagem("Aguardando confirmação do acesso institucional.");
      return;
    }

    if (!acesso.canManageMembers) {
      setMensagem("Seu acesso atual não permite excluir eventos sociais.");
      return;
    }

    const confirmado = window.confirm(`Deseja excluir o evento "${item.titulo}"?`);

    if (!confirmado) return;

    const supabase = getSupabaseClient();

    if (!supabase) {
      setEventos((atual) => atual.filter((evento) => evento.id !== item.id));
      setMensagem("Evento removido apenas da agenda local.");
      if (eventoEditandoId === item.id) {
        limparEventoFormulario();
      }
      return;
    }

    try {
      const { error } = await supabase
        .from("alm_social_events")
        .delete()
        .eq("id", item.id);

      if (error) {
        setMensagem(`Falha ao excluir evento no Supabase: ${error.message}`);
        return;
      }

      setEventos((atual) => atual.filter((evento) => evento.id !== item.id));

      if (eventoEditandoId === item.id) {
        limparEventoFormulario();
      }

      setMensagem("Evento social excluído com sucesso da base real do Supabase.");
    } catch (error) {
      const texto =
        error instanceof Error ? error.message : "falha inesperada ao excluir evento";
      setMensagem(`Erro ao excluir evento social: ${texto}`);
    }
  }

  async function salvarFamiliar() {
    if (!canCreate(billing)) {
      setMensagem("Pagamento necessário para cadastrar familiares e histórico.");
      return;
    }

    if (acesso.carregando) {
      setMensagem("Aguardando confirmação do acesso institucional.");
      return;
    }

    if (!acesso.canManageMembers) {
      setMensagem(
        "Seu acesso atual não permite cadastrar familiares. Esta operação fica restrita aos perfis autorizados.",
      );
      return;
    }

    if (!brotherIdReal || !isUuid(brotherIdReal)) {
      setMensagem(
        "O UUID real do irmão ainda não foi localizado. Entre primeiro no cadastro do irmão e confirme o vínculo antes de salvar cunhada e demais familiares.",
      );
      return;
    }

    if (!nome.trim()) {
      setMensagem("Informe o nome antes de salvar.");
      return;
    }

    let dataBanco: string | null = null;

    if (dataNascimento.trim()) {
      dataBanco = dataVisualParaBanco(dataNascimento);

      if (!dataBanco) {
        setMensagem("Informe a data no formato DD/MM/AAAA ou digitando 8 números, por exemplo 12121980.");
        return;
      }
    }

    try {
      const supabase = getSupabaseClient();

      if (!supabase) {
        const novoLocal: Familiar = {
          id: String(Date.now()),
          categoria,
          nome: nome.trim(),
          parentescoLabel: categoriaParaLabel(categoria),
          dataNascimento: formatarDataVisual(dataNascimento) || "__/__/____",
          telefone: telefone.trim(),
          email: email.trim(),
          observacoes:
            observacoes.trim() || "Registro familiar criado manualmente na área institucional.",
        };

        setFamilia((atual) => [novoLocal, ...atual]);
        setMensagem(
          "Supabase não configurado no cliente. Registro salvo apenas na base local temporária.",
        );
        limparFormulario();
        return;
      }

      if (categoria === "cunhada") {
        const payload = {
          loja_id: LOJA_ID,
          brother_id: brotherIdReal,
          nome_completo: nome.trim(),
          data_nascimento: dataBanco,
          telefone: telefone.trim() || null,
          email: email.trim() || null,
          observacoes:
            observacoes.trim() || "Registro de cunhada criado pela área familiar.",
        };

        const { data, error } = await supabase
          .from("alm_sisters_in_law")
          .insert(payload)
          .select("id,brother_id,nome_completo,data_nascimento,telefone,email,observacoes")
          .single();

        if (error) {
          setMensagem(`Falha ao salvar cunhada no Supabase: ${error.message}`);
          return;
        }

        const novo: Familiar = {
          id: String(data.id),
          categoria: "cunhada",
          nome: data.nome_completo ?? nome.trim(),
          parentescoLabel: "Cunhada",
          dataNascimento: dataBancoParaVisual(data.data_nascimento),
          telefone: data.telefone ?? "",
          email: data.email ?? "",
          observacoes: data.observacoes ?? "Sem observações.",
        };

        setFamilia((atual) => [novo, ...atual]);
        setMensagem("Cunhada cadastrada com sucesso na base real do Supabase.");
        limparFormulario();
        return;
      }

      const payload = {
        loja_id: LOJA_ID,
        brother_id: brotherIdReal,
        tipo_parentesco: parentescoParaBanco(categoria),
        nome_completo: nome.trim(),
        data_nascimento: dataBanco,
        telefone: telefone.trim() || null,
        observacoes:
          observacoes.trim() || "Registro familiar criado pela área institucional.",
      };

      const { data, error } = await supabase
        .from("alm_family_members")
        .insert(payload)
        .select("id,brother_id,tipo_parentesco,nome_completo,data_nascimento,telefone,observacoes")
        .single();

      if (error) {
        setMensagem(`Falha ao salvar familiar no Supabase: ${error.message}`);
        return;
      }

      const novo = normalizarFamiliar({
        ...data,
        email: email.trim() || "",
      });

      setFamilia((atual) => [novo, ...atual]);
      setMensagem("Registro familiar cadastrado com sucesso na base real do Supabase.");
      limparFormulario();
    } catch (error) {
      const texto =
        error instanceof Error ? error.message : "falha inesperada no salvamento";
      setMensagem(`Erro ao salvar registro familiar: ${texto}`);
    }
  }

  async function salvarEventoSocial() {
    if (acesso.carregando) {
      setMensagem("Aguardando confirmação do acesso institucional.");
      return;
    }

    if (!acesso.canManageMembers) {
      setMensagem(
        "Seu acesso atual não permite cadastrar ou editar eventos sociais nesta área.",
      );
      return;
    }

    if (!eventoTitulo.trim()) {
      setMensagem("Informe o título do evento social antes de salvar.");
      return;
    }

    if (!eventoData.trim()) {
      setMensagem("Informe a data do evento social.");
      return;
    }

    const dataValida = dataVisualParaBanco(eventoData);

    if (!dataValida) {
      setMensagem("Informe a data do evento no formato DD/MM/AAAA.");
      return;
    }

    const supabase = getSupabaseClient();

    if (!supabase) {
      if (eventoEditandoId) {
        setEventos((atual) =>
          atual.map((evento) =>
            evento.id === eventoEditandoId
              ? {
                  ...evento,
                  data: formatarDataVisual(eventoData),
                  titulo: eventoTitulo.trim(),
                  tipo: eventoTipo.trim() || "Social",
                  descricao:
                    eventoDescricao.trim() ||
                    "Evento social atualizado localmente.",
                  publico: eventoPublico,
                  status: eventoStatus,
                }
              : evento,
          ),
        );
        setMensagem("Evento social atualizado apenas na agenda local.");
      } else {
        const novoEventoLocal: EventoSocial = {
          id: `evento-${Date.now()}`,
          data: formatarDataVisual(eventoData),
          titulo: eventoTitulo.trim(),
          tipo: eventoTipo.trim() || "Social",
          descricao:
            eventoDescricao.trim() ||
            "Evento social cadastrado localmente para validação da agenda familiar.",
          publico: eventoPublico,
          status: eventoStatus,
        };

        setEventos((atual) => [novoEventoLocal, ...atual]);
        setMensagem("Evento social cadastrado com sucesso na agenda local da família.");
      }

      limparEventoFormulario();
      return;
    }

    try {
      if (eventoEditandoId) {
        const payload = {
          loja_id: LOJA_ID,
          brother_id: brotherIdReal,
          data_evento: dataValida,
          titulo: eventoTitulo.trim(),
          tipo: eventoTipo.trim() || "Social",
          descricao:
            eventoDescricao.trim() ||
            "Evento social atualizado pela agenda familiar e social.",
          publico: eventoPublico,
          status: eventoStatus,
        };

        const { data, error } = await supabase
          .from("alm_social_events")
          .update(payload)
          .eq("id", eventoEditandoId)
          .select("id,data_evento,titulo,tipo,descricao,publico,status,created_at")
          .single();

        if (error) {
          setMensagem(`Falha ao atualizar evento no Supabase: ${error.message}`);
          return;
        }

        const eventoAtualizado = normalizarEventoSocial(data);

        setEventos((atual) =>
          atual.map((evento) =>
            evento.id === eventoEditandoId ? eventoAtualizado : evento,
          ),
        );

        setMensagem("Evento social atualizado com sucesso na base real do Supabase.");
        limparEventoFormulario();
        return;
      }

      const payload = {
        loja_id: LOJA_ID,
        brother_id: brotherIdReal,
        data_evento: dataValida,
        titulo: eventoTitulo.trim(),
        tipo: eventoTipo.trim() || "Social",
        descricao:
          eventoDescricao.trim() ||
          "Evento social cadastrado pela agenda familiar e social.",
        publico: eventoPublico,
        status: eventoStatus,
      };

      const { data, error } = await supabase
        .from("alm_social_events")
        .insert(payload)
        .select("id,data_evento,titulo,tipo,descricao,publico,status,created_at")
        .single();

      if (error) {
        const novoEventoLocal: EventoSocial = {
          id: `evento-${Date.now()}`,
          data: formatarDataVisual(eventoData),
          titulo: eventoTitulo.trim(),
          tipo: eventoTipo.trim() || "Social",
          descricao:
            eventoDescricao.trim() ||
            "Evento social cadastrado localmente para validação da agenda familiar.",
          publico: eventoPublico,
          status: eventoStatus,
        };

        setEventos((atual) => [novoEventoLocal, ...atual]);
        setMensagem(
          `Evento social salvo apenas localmente. Detalhe do Supabase: ${error.message}`,
        );
        limparEventoFormulario();
        return;
      }

      const eventoReal = normalizarEventoSocial(data);
      setEventos((atual) => [eventoReal, ...atual]);
      setMensagem("Evento social cadastrado com sucesso na base real do Supabase.");
      limparEventoFormulario();
    } catch (error) {
      const texto =
        error instanceof Error ? error.message : "falha inesperada ao salvar evento";
      setMensagem(`Erro ao salvar evento social: ${texto}`);
    }
  }

  function baixarBaseLocal() {
    if (!podeBaixar) {
      setMensagem("Pagamento necessário para baixar a base familiar.");
      return;
    }

    const conteudo = {
      exportadoEm: new Date().toISOString(),
      lojaId: billing.lojaId,
      lojaNome: billing.lojaNome,
      planoNome: billing.planoNome,
      statusPlano: billing.status,
      brotherIdReal,
      brotherNomeReal,
      acessoAtual: {
        email: acesso.email,
        papel: acesso.papel,
        permissoes: acesso.permissoes,
        canManageMembers: acesso.canManageMembers,
        canViewReserved: acesso.canViewReserved,
        canViewFinance: acesso.canViewFinance,
      },
      totalFamilia,
      totalAniversarios,
      familia,
      historicoMaconico: historico,
      eventosSociais: eventos,
    };

    const blob = new Blob([JSON.stringify(conteudo, null, 2)], {
      type: "application/json;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `aurora-loja-maconica-familia-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setMensagem("Base familiar baixada com sucesso para guardar no PC ou celular.");
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
                cunhada, dos sobrinhos, sobrinhas, netos e netas, com base
                social, aniversários civis, datas simbólicas e área preparada
                para alertas e felicitações automáticas. Conteúdos maçônicos
                reservados permanecem protegidos para perfis autorizados.
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
          <SummaryCard title="Cadastro do irmão" value="Completo" accent />
          <SummaryCard title="Família" value={String(totalFamilia)} />
          <SummaryCard
            title="Acesso atual"
            value={acesso.carregando ? "Lendo..." : papelBonito(acesso.papel)}
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
                  {acesso.carregando ? "Carregando..." : papelBonito(acesso.papel)}
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
                  Gerenciar família
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
                  Conteúdo reservado
                </div>
                <div
                  style={{
                    color: acesso.canViewReserved ? "#166534" : "#9a3412",
                    fontSize: 15,
                    fontWeight: 800,
                  }}
                >
                  {acesso.canViewReserved ? "Liberado" : "Restrito"}
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
          <SectionCard eyebrow="Novo registro familiar" title="Salvar base familiar">
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
                ? `Acesso liberado para cadastro familiar vinculado ao irmão: ${brotherNomeReal || "Irmão da Loja"}`
                : acesso.carregando
                  ? "Aguardando leitura do acesso institucional para liberar o cadastro."
                  : !brotherIdReal
                    ? "Ainda não encontrei o UUID real do irmão no banco. Esta tela continua lendo a base, mas novos salvamentos ficam bloqueados até localizar o vínculo correto."
                    : "Seu acesso atual não permite cadastrar familiares nesta loja."}
            </div>

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
                  onChange={(e) => setCategoria(e.target.value as FamiliarCategoria)}
                  style={inputStyle}
                >
                  <option value="cunhada">Cunhada</option>
                  <option value="sobrinho">Sobrinho</option>
                  <option value="sobrinha">Sobrinha</option>
                  <option value="neto">Neto</option>
                  <option value="neta">Neta</option>
                </select>
              </Field>

              <Field label="Nome completo">
                <input
                  placeholder="Espaço reservado"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  style={inputStyle}
                />
              </Field>

              <Field label="Data de nascimento">
                <input
                  placeholder="DD/MM/AAAA"
                  value={dataNascimento}
                  onChange={(e) => setDataNascimento(formatarDataVisual(e.target.value))}
                  style={inputStyle}
                  inputMode="numeric"
                  maxLength={10}
                />
              </Field>

              <Field label="Telefone">
                <input
                  placeholder="(00) 00000-0000"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  style={inputStyle}
                />
              </Field>

              <Field label="E-mail">
                <input
                  placeholder="espaco@reservado.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={inputStyle}
                />
              </Field>
            </div>

            <div style={{ marginTop: 14 }}>
              <Field label="Observações">
                <textarea
                  placeholder="Área preparada para dados completos e observações institucionais."
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
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
                label={podeCriar ? "Salvar registro" : "Acesso restrito"}
                onClick={salvarFamiliar}
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
                onClick={baixarBaseLocal}
                disabled={!podeBaixar}
              />

              <ActionButton
                label="Atualizar leitura"
                variant="secondary"
                onClick={() => {
                  carregarFamilia();
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
                O cadastro familiar exige pagamento ativo, vínculo real do irmão e perfil institucional com permissão para gerenciamento.
              </p>
            ) : null}
          </SectionCard>
        </section>

        <section style={{ marginTop: 24 }}>
          <SectionCard eyebrow="Base familiar" title="Família vinculada à loja">
            <div
              style={{
                display: "grid",
                gap: 16,
              }}
            >
              {familia.map((item) => (
                <FamilyCard key={item.id} item={item} />
              ))}
            </div>
          </SectionCard>
        </section>

        <section style={{ marginTop: 24 }}>
          <SectionCard eyebrow="Área reservada" title="Conteúdo maçônico protegido">
            <div
              style={{
                borderRadius: 20,
                background: acesso.canViewReserved ? "#f8fafc" : "#fff7ed",
                border: acesso.canViewReserved ? "1px solid #e2e8f0" : "1px solid #fdba74",
                padding: 18,
                color: acesso.canViewReserved ? "#334155" : "#9a3412",
                lineHeight: 1.8,
                fontSize: 15,
                fontWeight: 700,
              }}
            >
              {acesso.canViewReserved
                ? "O histórico maçônico, as passagens internas, observações reservadas e demais conteúdos sensíveis permanecem protegidos. Esta área familiar/social não expõe informações maçônicas, administrativas ou sigilosas da loja. A visualização desses dados ficará restrita apenas ao irmão e aos perfis institucionais autorizados."
                : "Seu acesso atual não libera conteúdo reservado. A área social e familiar continua disponível, mas informações maçônicas e sensíveis permanecem protegidas."}
            </div>
          </SectionCard>
        </section>

        <section style={{ marginTop: 24 }}>
          <SectionCard
            eyebrow={eventoEditandoId ? "Editar evento social" : "Novo evento social"}
            title={eventoEditandoId ? "Atualizar calendário fraterno e social" : "Cadastrar calendário fraterno e social"}
          >
            <div
              style={{
                marginBottom: 16,
                padding: 14,
                borderRadius: 18,
                background: acesso.canManageMembers ? (eventoEditandoId ? "#eff6ff" : "#f8fafc") : "#fff7ed",
                border: acesso.canManageMembers
                  ? eventoEditandoId
                    ? "1px solid #93c5fd"
                    : "1px solid #e2e8f0"
                  : "1px solid #fdba74",
                color: acesso.canManageMembers ? "#334155" : "#9a3412",
                fontWeight: 700,
                lineHeight: 1.7,
              }}
            >
              {acesso.canManageMembers
                ? eventoEditandoId
                  ? "Modo edição ativo. Atualize os campos e clique em salvar para gravar as mudanças."
                  : "Cadastre aqui apenas eventos sociais, familiares e comunicados permitidos."
                : "Seu acesso atual não permite criar ou editar eventos sociais nesta área."}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 14,
              }}
            >
              <Field label="Data do evento">
                <input
                  placeholder="DD/MM/AAAA"
                  value={eventoData}
                  onChange={(e) => setEventoData(formatarDataVisual(e.target.value))}
                  style={inputStyle}
                  inputMode="numeric"
                  maxLength={10}
                />
              </Field>

              <Field label="Título">
                <input
                  placeholder="Ex.: Confraternização familiar"
                  value={eventoTitulo}
                  onChange={(e) => setEventoTitulo(e.target.value)}
                  style={inputStyle}
                />
              </Field>

              <Field label="Tipo">
                <input
                  placeholder="Ex.: Social"
                  value={eventoTipo}
                  onChange={(e) => setEventoTipo(e.target.value)}
                  style={inputStyle}
                />
              </Field>

              <Field label="Público">
                <select
                  value={eventoPublico}
                  onChange={(e) => setEventoPublico(e.target.value as EventoPublico)}
                  style={inputStyle}
                >
                  <option value="familiar">Familiar</option>
                  <option value="irmao">Irmão</option>
                  <option value="administrativo">Administrativo</option>
                </select>
              </Field>

              <Field label="Status">
                <select
                  value={eventoStatus}
                  onChange={(e) => setEventoStatus(e.target.value as EventoStatus)}
                  style={inputStyle}
                >
                  <option value="liberado">Liberado</option>
                  <option value="reservado">Reservado</option>
                </select>
              </Field>
            </div>

            <div style={{ marginTop: 14 }}>
              <Field label="Descrição">
                <textarea
                  placeholder="Descreva o evento social permitido."
                  value={eventoDescricao}
                  onChange={(e) => setEventoDescricao(e.target.value)}
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
                label={acesso.canManageMembers
                  ? eventoEditandoId
                    ? "Atualizar evento social"
                    : "Salvar evento social"
                  : "Acesso restrito"}
                onClick={salvarEventoSocial}
                disabled={!acesso.canManageMembers || acesso.carregando}
              />
              <ActionButton
                label={eventoEditandoId ? "Cancelar edição" : "Limpar evento"}
                variant="secondary"
                onClick={limparEventoFormulario}
              />
            </div>
          </SectionCard>
        </section>

        <section style={{ marginTop: 24 }}>
          <SectionCard eyebrow="Calendário fraterno e social" title="Aniversários, felicitações e eventos liberados">
            <div
              style={{
                display: "grid",
                gap: 16,
              }}
            >
              {eventos.map((item) => (
                <EventCard
                  key={item.id}
                  item={item}
                  onEdit={carregarEventoParaEdicao}
                  onDelete={excluirEventoSocial}
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