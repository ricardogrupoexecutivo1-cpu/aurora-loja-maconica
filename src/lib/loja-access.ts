export type LojaPlano = "cortesia" | "teste" | "ativo" | "inativo";

export type LojaStatus = "ativa" | "bloqueada" | "suspensa";

export type LojaRole =
  | "admin_master"
  | "admin_loja"
  | "secretaria"
  | "tesouraria"
  | "irmão"
  | "visitante";

export type LojaArea =
  | "dashboard"
  | "irmaos"
  | "familia"
  | "historico"
  | "documentos"
  | "agenda"
  | "financeiro"
  | "cargos"
  | "relatorios"
  | "mensageria"
  | "configuracoes";

export type LojaAccessProfile = {
  lojaId: string;
  nomeLoja: string;
  login: string;
  plano: LojaPlano;
  status: LojaStatus;
  role: LojaRole;
  cortesia?: boolean;
  dataInicio?: string | null;
  dataFim?: string | null;
};

export const LOJA_ACESSO_CORTESIA_PADRAO: LojaAccessProfile = {
  lojaId: "loja-maconica-aurora",
  nomeLoja: "Loja Maçônica Aurora",
  login: "ricardogrupoexecutivo1@gmail.com",
  plano: "cortesia",
  status: "ativa",
  role: "admin_master",
  cortesia: true,
  dataInicio: null,
  dataFim: null,
};

const AREA_PERMISSIONS: Record<LojaRole, LojaArea[]> = {
  admin_master: [
    "dashboard",
    "irmaos",
    "familia",
    "historico",
    "documentos",
    "agenda",
    "financeiro",
    "cargos",
    "relatorios",
    "mensageria",
    "configuracoes",
  ],
  admin_loja: [
    "dashboard",
    "irmaos",
    "familia",
    "historico",
    "documentos",
    "agenda",
    "cargos",
    "relatorios",
    "mensageria",
    "configuracoes",
  ],
  secretaria: [
    "dashboard",
    "irmaos",
    "familia",
    "historico",
    "documentos",
    "agenda",
    "mensageria",
  ],
  tesouraria: [
    "dashboard",
    "financeiro",
    "relatorios",
    "documentos",
    "agenda",
  ],
  "irmão": [
    "dashboard",
    "familia",
    "historico",
    "documentos",
    "agenda",
  ],
  visitante: ["dashboard"],
};

const ROUTE_TO_AREA: Array<{ prefix: string; area: LojaArea }> = [
  { prefix: "/irmaos/familia", area: "familia" },
  { prefix: "/irmaos/historico", area: "historico" },
  { prefix: "/irmaos/documentos", area: "documentos" },
  { prefix: "/irmaos/agenda", area: "agenda" },
  { prefix: "/irmaos", area: "irmaos" },
  { prefix: "/financeiro", area: "financeiro" },
  { prefix: "/cargos", area: "cargos" },
  { prefix: "/relatorios", area: "relatorios" },
  { prefix: "/mensageria", area: "mensageria" },
  { prefix: "/configuracoes", area: "configuracoes" },
];

export function lojaPlanoAtivo(profile: LojaAccessProfile | null | undefined): boolean {
  if (!profile) return false;
  if (profile.status !== "ativa") return false;
  if (profile.plano === "inativo") return false;
  return true;
}

export function lojaEstaEmCortesia(profile: LojaAccessProfile | null | undefined): boolean {
  if (!profile) return false;
  return profile.plano === "cortesia" || Boolean(profile.cortesia);
}

export function lojaEstaEmTeste(profile: LojaAccessProfile | null | undefined): boolean {
  if (!profile) return false;
  return profile.plano === "teste";
}

export function lojaPodeAcessarArea(
  profile: LojaAccessProfile | null | undefined,
  area: LojaArea
): boolean {
  if (!profile) return false;
  if (!lojaPlanoAtivo(profile)) return false;

  const liberadas = AREA_PERMISSIONS[profile.role] || [];
  return liberadas.includes(area);
}

export function descobrirAreaPorRota(pathname: string): LojaArea {
  const rota = pathname?.trim() || "/";

  for (const item of ROUTE_TO_AREA) {
    if (rota.startsWith(item.prefix)) {
      return item.area;
    }
  }

  return "dashboard";
}

export function lojaPodeAcessarRota(
  profile: LojaAccessProfile | null | undefined,
  pathname: string
): boolean {
  const area = descobrirAreaPorRota(pathname);
  return lojaPodeAcessarArea(profile, area);
}

export function descreverPlano(profile: LojaAccessProfile | null | undefined): string {
  if (!profile) return "Sem acesso";

  if (profile.plano === "cortesia") {
    return "Cortesia";
  }

  if (profile.plano === "teste") {
    return "Teste";
  }

  if (profile.plano === "ativo") {
    return "Ativo";
  }

  return "Inativo";
}

export function descreverStatus(profile: LojaAccessProfile | null | undefined): string {
  if (!profile) return "Sem leitura";

  if (profile.status === "ativa") {
    return "Ativa";
  }

  if (profile.status === "bloqueada") {
    return "Bloqueada";
  }

  return "Suspensa";
}

export function criarPerfilLojaSimples(input?: Partial<LojaAccessProfile>): LojaAccessProfile {
  return {
    lojaId: input?.lojaId || LOJA_ACESSO_CORTESIA_PADRAO.lojaId,
    nomeLoja: input?.nomeLoja || LOJA_ACESSO_CORTESIA_PADRAO.nomeLoja,
    login: input?.login || LOJA_ACESSO_CORTESIA_PADRAO.login,
    plano: input?.plano || LOJA_ACESSO_CORTESIA_PADRAO.plano,
    status: input?.status || LOJA_ACESSO_CORTESIA_PADRAO.status,
    role: input?.role || LOJA_ACESSO_CORTESIA_PADRAO.role,
    cortesia: input?.cortesia ?? LOJA_ACESSO_CORTESIA_PADRAO.cortesia,
    dataInicio: input?.dataInicio ?? LOJA_ACESSO_CORTESIA_PADRAO.dataInicio,
    dataFim: input?.dataFim ?? LOJA_ACESSO_CORTESIA_PADRAO.dataFim,
  };
}

export function resumoAcesso(profile: LojaAccessProfile | null | undefined) {
  if (!profile) {
    return {
      loja: "Sem loja",
      plano: "Sem acesso",
      status: "Sem leitura",
      role: "visitante" as LojaRole,
      acessoLiberado: false,
    };
  }

  return {
    loja: profile.nomeLoja,
    plano: descreverPlano(profile),
    status: descreverStatus(profile),
    role: profile.role,
    acessoLiberado: lojaPlanoAtivo(profile),
  };
}