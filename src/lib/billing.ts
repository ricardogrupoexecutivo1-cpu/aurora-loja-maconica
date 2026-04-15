export type BillingStatus =
  | "trial"
  | "ativo"
  | "aviso_pagamento"
  | "inadimplente"
  | "bloqueado";

export interface BillingInfo {
  status: BillingStatus;
  vencimento?: string;
  diasAtraso?: number;
  linkPagamento?: string;
  bloquearCriacao?: boolean;
  bloquearArquivamento?: boolean;
  bloquearDownload?: boolean;
  lojaId?: string;
  lojaNome?: string;
  planoNome?: string;
  paymentStatus?: string;
  graceUntil?: string;
  observacoes?: string;
}

type BillingApiResponse = {
  success: boolean;
  billing: {
    loja_id: string;
    loja_nome: string;
    plano_nome: string;
    status: BillingStatus;
    payment_status: string;
    due_date: string | null;
    grace_until: string | null;
    dias_atraso: number;
    bloquear_criacao: boolean;
    bloquear_arquivamento: boolean;
    bloquear_download: boolean;
    payment_link: string;
    observacoes: string;
  } | null;
  message: string;
};

export async function getBilling(lojaId = "loja-maconica-aurora"): Promise<BillingInfo> {
  try {
    const response = await fetch(`/api/billing?loja_id=${encodeURIComponent(lojaId)}`, {
      method: "GET",
      cache: "no-store",
    });

    const json = (await response.json()) as BillingApiResponse;

    if (!response.ok || !json.success || !json.billing) {
      return {
        status: "ativo",
        vencimento: undefined,
        diasAtraso: 0,
        linkPagamento: "#",
        bloquearCriacao: false,
        bloquearArquivamento: false,
        bloquearDownload: false,
        lojaId,
        lojaNome: "Loja Maçônica Aurora",
        planoNome: "Plano Institucional",
        paymentStatus: "pago",
        graceUntil: undefined,
        observacoes:
          json?.message || "Falha ao carregar billing. Sistema assumiu modo ativo de segurança.",
      };
    }

    return {
      status: json.billing.status,
      vencimento: json.billing.due_date ?? undefined,
      diasAtraso: Number(json.billing.dias_atraso ?? 0),
      linkPagamento: json.billing.payment_link ?? "#",
      bloquearCriacao: Boolean(json.billing.bloquear_criacao),
      bloquearArquivamento: Boolean(json.billing.bloquear_arquivamento),
      bloquearDownload: Boolean(json.billing.bloquear_download),
      lojaId: json.billing.loja_id,
      lojaNome: json.billing.loja_nome,
      planoNome: json.billing.plano_nome,
      paymentStatus: json.billing.payment_status,
      graceUntil: json.billing.grace_until ?? undefined,
      observacoes: json.billing.observacoes ?? "",
    };
  } catch {
    return {
      status: "ativo",
      vencimento: undefined,
      diasAtraso: 0,
      linkPagamento: "#",
      bloquearCriacao: false,
      bloquearArquivamento: false,
      bloquearDownload: false,
      lojaId,
      lojaNome: "Loja Maçônica Aurora",
      planoNome: "Plano Institucional",
      paymentStatus: "pago",
      graceUntil: undefined,
      observacoes: "Falha inesperada ao consultar billing. Sistema assumiu modo ativo de segurança.",
    };
  }
}

export function canUseSystem(billing: BillingInfo) {
  return billing.status === "ativo" || billing.status === "trial";
}

export function canCreate(billing: BillingInfo) {
  if (billing.bloquearCriacao) return false;
  return billing.status === "ativo" || billing.status === "trial";
}

export function canArchive(billing: BillingInfo) {
  if (billing.bloquearArquivamento) return false;
  return billing.status === "ativo";
}

export function canDownload(billing: BillingInfo) {
  if (billing.bloquearDownload) return false;
  return billing.status === "ativo";
}

export function getBillingMessage(billing: BillingInfo) {
  switch (billing.status) {
    case "aviso_pagamento":
      return "Seu plano possui pendência de pagamento. Regularize para manter todos os recursos ativos.";
    case "inadimplente":
      return "Acesso em modo restrito. Realize o pagamento para voltar a usar os recursos completos do sistema.";
    case "bloqueado":
      return "Sistema bloqueado por inadimplência. Realize o pagamento para reativar os recursos.";
    default:
      return "";
  }
}

export function getBillingTone(status: BillingStatus): {
  background: string;
  border: string;
  color: string;
  buttonBackground: string;
  buttonColor: string;
} {
  switch (status) {
    case "aviso_pagamento":
      return {
        background: "#fff7ed",
        border: "#fdba74",
        color: "#9a3412",
        buttonBackground: "#ea580c",
        buttonColor: "#ffffff",
      };

    case "inadimplente":
    case "bloqueado":
      return {
        background: "#fef2f2",
        border: "#fca5a5",
        color: "#991b1b",
        buttonBackground: "#b91c1c",
        buttonColor: "#ffffff",
      };

    default:
      return {
        background: "#ecfeff",
        border: "#a5f3fc",
        color: "#0f766e",
        buttonBackground: "#065f46",
        buttonColor: "#ffffff",
      };
  }
}

export function getBillingLabel(status: BillingStatus) {
  switch (status) {
    case "trial":
      return "Trial";
    case "ativo":
      return "Ativo";
    case "aviso_pagamento":
      return "Aviso de pagamento";
    case "inadimplente":
      return "Inadimplente";
    case "bloqueado":
      return "Bloqueado";
    default:
      return "Desconhecido";
  }
}