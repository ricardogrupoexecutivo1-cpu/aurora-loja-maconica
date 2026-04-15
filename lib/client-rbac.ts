import { createClient, SupabaseClient } from "@supabase/supabase-js";

export type ClientPapelLoja =
  | "admin_master"
  | "veneravel"
  | "secretario"
  | "tesoureiro"
  | "orador"
  | "chanceler"
  | "mestre_de_cerimonias"
  | "irmao"
  | "desconhecido";

export type ClientAcessoContexto = {
  userAuthId: string | null;
  email: string | null;
  usuarioId: string | null;
  lojaUsuarioId: string | null;
  papel: ClientPapelLoja;
  permissoes: string[];
  canManageMembers: boolean;
  canViewReserved: boolean;
  canViewFinance: boolean;
  carregando: boolean;
};

export const CLIENT_ACESSO_INICIAL: ClientAcessoContexto = {
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

export function getClientSupabase(): SupabaseClient | null {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  });
}

export function normalizeClientPapel(
  value: string | null | undefined
): ClientPapelLoja {
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

export function uniqueLowerPermissions(
  values: Array<string | null | undefined>
): string[] {
  return Array.from(
    new Set(
      values
        .map((item) => (item || "").trim().toLowerCase())
        .filter(Boolean)
    )
  );
}

export function formatClientPapel(papel: ClientPapelLoja): string {
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

export async function readClientRBAC(lojaId: string): Promise<ClientAcessoContexto> {
  const supabase = getClientSupabase();

  if (!supabase) {
    return {
      ...CLIENT_ACESSO_INICIAL,
      carregando: false,
    };
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      ...CLIENT_ACESSO_INICIAL,
      carregando: false,
    };
  }

  const authUserId = user.id;
  const emailAtual = user.email?.toLowerCase() ?? null;

  const { data: usuarioRow, error: usuarioError } = await supabase
    .from("usuarios")
    .select("id, auth_user_id, email, loja_id")
    .eq("auth_user_id", authUserId)
    .maybeSingle();

  if (usuarioError || !usuarioRow?.id) {
    return {
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
    };
  }

  const { data: lojaUsuarioRow, error: lojaUsuarioError } = await supabase
    .from("loja_usuarios")
    .select("id, loja_id, user_id, papel, ativo")
    .eq("user_id", usuarioRow.id)
    .eq("loja_id", lojaId)
    .maybeSingle();

  if (lojaUsuarioError || !lojaUsuarioRow?.id) {
    return {
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
    };
  }

  const { data: permissoesRows, error: permissoesError } = await supabase
    .from("loja_usuario_permissoes")
    .select("permissao, habilitada")
    .eq("loja_usuario_id", lojaUsuarioRow.id)
    .eq("habilitada", true);

  const permissoes = permissoesError
    ? []
    : uniqueLowerPermissions(
        Array.isArray(permissoesRows)
          ? permissoesRows.map((item: any) => item.permissao)
          : []
      );

  const papel = normalizeClientPapel(lojaUsuarioRow.papel);
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

  return {
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
  };
}