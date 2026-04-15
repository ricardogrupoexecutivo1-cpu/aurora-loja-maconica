import { createClient, SupabaseClient } from "@supabase/supabase-js";

type Nullable<T> = T | null;

export type LojaUserRole =
  | "admin_master"
  | "veneravel"
  | "secretario"
  | "tesoureiro"
  | "orador"
  | "chanceler"
  | "mestre_de_cerimonias"
  | "irmao"
  | string;

export type LojaUserPermission =
  | "financeiro"
  | "acervo_total"
  | "secretaria"
  | "ritualistica"
  | "eleicao"
  | "votacao"
  | "presenca_total"
  | "reserved"
  | "manage_members"
  | string;

export interface UsuarioRow {
  id: string;
  loja_id: string | null;
  auth_user_id: string | null;
  email: string | null;
  telefone?: string | null;
  whatsapp?: string | null;
  status?: string | null;
}

export interface LojaUsuarioRow {
  id: string;
  loja_id: string | null;
  user_id: string;
  papel: string | null;
  ativo: boolean | null;
  nome_exibicao?: string | null;
  email?: string | null;
  observacoes?: string | null;
}

export interface LojaUsuarioPermissaoRow {
  id: string;
  loja_usuario_id: string;
  permissao: string;
  habilitada: boolean | null;
}

export interface IrmaoRow {
  id: string;
  loja_id: string | null;
  usuario_id: string;
  nome_civil: string | null;
  nome_maconico: string | null;
  cargo_atual_id: string | null;
  grau_atual_id: string | null;
  email?: string | null;
  telefone?: string | null;
  whatsapp?: string | null;
  foto_url?: string | null;
  ativo?: boolean | null;
  situacao_maconica?: string | null;
  situacao_cadastral?: string | null;
}

export interface AlmBrotherRow {
  id: string;
  loja_id: string | null;
  auth_user_id?: string | null;
  nome_completo?: string | null;
  nome_simbolico?: string | null;
  cargo_nome?: string | null;
  cargo_slug?: string | null;
  papel_sistema?: string | null;
  telefone?: string | null;
  email?: string | null;
  situacao?: string | null;
  foto_url?: string | null;
}

export interface CargoRow {
  id: string;
  nome: string | null;
  codigo?: string | null;
  descricao?: string | null;
  permite_financeiro: boolean | null;
  permite_presenca_total: boolean | null;
  permite_secretaria: boolean | null;
  permite_ritualistica: boolean | null;
  permite_eleicao: boolean | null;
  permite_votacao: boolean | null;
  permite_acervo_total: boolean | null;
  ativo?: boolean | null;
}

export interface LojaRBACContext {
  email: string | null;
  authUserId: string | null;
  usuario: Nullable<UsuarioRow>;
  lojaUsuario: Nullable<LojaUsuarioRow>;
  irmao: Nullable<IrmaoRow>;
  almBrother: Nullable<AlmBrotherRow>;
  cargo: Nullable<CargoRow>;
  papel: LojaUserRole;
  permissoesDiretas: LojaUserPermission[];
  permissoesEfetivas: LojaUserPermission[];
  canViewFinance: boolean;
  canViewReserved: boolean;
  canManageMembers: boolean;
  canViewAcervoTotal: boolean;
  canViewSecretaria: boolean;
  canViewRitualistica: boolean;
  canViewEleicao: boolean;
  canViewVotacao: boolean;
  canViewPresencaTotal: boolean;
  isAdminMaster: boolean;
  isActive: boolean;
}

function getEnv(name: string): string {
  const value = process.env[name];

  if (!value || !value.trim()) {
    throw new Error(`Variável de ambiente ausente: ${name}`);
  }

  return value;
}

function createAdminSupabase(): SupabaseClient {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    "";

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

  if (!url) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL ou SUPABASE_URL não foi definida."
    );
  }

  if (!serviceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY não foi definida.");
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function normalizeRole(role?: string | null): LojaUserRole {
  const raw = (role || "irmao").trim().toLowerCase();

  switch (raw) {
    case "admin_master":
    case "veneravel":
    case "secretario":
    case "tesoureiro":
    case "orador":
    case "chanceler":
    case "mestre_de_cerimonias":
    case "irmao":
      return raw;
    default:
      return raw || "irmao";
  }
}

function uniquePermissions(values: Array<string | null | undefined>): string[] {
  return Array.from(
    new Set(
      values
        .map((item) => (item || "").trim())
        .filter(Boolean)
        .map((item) => item.toLowerCase())
    )
  );
}

function buildEffectivePermissions(
  role: LojaUserRole,
  directPermissions: string[],
  cargo: Nullable<CargoRow>
): string[] {
  const merged = new Set<string>(
    directPermissions.map((item) => item.toLowerCase())
  );

  if (role === "admin_master") {
    merged.add("financeiro");
    merged.add("acervo_total");
    merged.add("secretaria");
    merged.add("ritualistica");
    merged.add("eleicao");
    merged.add("votacao");
    merged.add("presenca_total");
    merged.add("reserved");
    merged.add("manage_members");
  }

  if (role === "veneravel") {
    merged.add("reserved");
    merged.add("manage_members");
  }

  if (role === "secretario") {
    merged.add("secretaria");
    merged.add("reserved");
  }

  if (role === "tesoureiro") {
    merged.add("financeiro");
    merged.add("reserved");
  }

  if (cargo?.permite_financeiro) merged.add("financeiro");
  if (cargo?.permite_acervo_total) merged.add("acervo_total");
  if (cargo?.permite_secretaria) merged.add("secretaria");
  if (cargo?.permite_ritualistica) merged.add("ritualistica");
  if (cargo?.permite_eleicao) merged.add("eleicao");
  if (cargo?.permite_votacao) merged.add("votacao");
  if (cargo?.permite_presenca_total) merged.add("presenca_total");

  return Array.from(merged);
}

async function findUsuarioByEmail(
  supabase: SupabaseClient,
  email: string
): Promise<Nullable<UsuarioRow>> {
  const normalizedEmail = email.trim().toLowerCase();

  const { data, error } = await supabase
    .from("usuarios")
    .select("id, loja_id, auth_user_id, email, telefone, whatsapp, status")
    .ilike("email", normalizedEmail)
    .maybeSingle<UsuarioRow>();

  if (error) {
    throw new Error(`Erro ao buscar usuario por e-mail: ${error.message}`);
  }

  return data ?? null;
}

async function findUsuarioByAuthUserId(
  supabase: SupabaseClient,
  authUserId: string
): Promise<Nullable<UsuarioRow>> {
  const normalizedAuthUserId = authUserId.trim();

  const { data, error } = await supabase
    .from("usuarios")
    .select("id, loja_id, auth_user_id, email, telefone, whatsapp, status")
    .eq("auth_user_id", normalizedAuthUserId)
    .maybeSingle<UsuarioRow>();

  if (error) {
    throw new Error(`Erro ao buscar usuario por auth_user_id: ${error.message}`);
  }

  return data ?? null;
}

async function findLojaUsuario(
  supabase: SupabaseClient,
  userId: string
): Promise<Nullable<LojaUsuarioRow>> {
  const { data, error } = await supabase
    .from("loja_usuarios")
    .select("id, loja_id, user_id, papel, ativo, nome_exibicao, email, observacoes")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle<LojaUsuarioRow>();

  if (error) {
    throw new Error(`Erro ao buscar loja_usuarios: ${error.message}`);
  }

  return data ?? null;
}

async function findPermissions(
  supabase: SupabaseClient,
  lojaUsuarioId: string
): Promise<LojaUsuarioPermissaoRow[]> {
  const { data, error } = await supabase
    .from("loja_usuario_permissoes")
    .select("id, loja_usuario_id, permissao, habilitada")
    .eq("loja_usuario_id", lojaUsuarioId)
    .eq("habilitada", true);

  if (error) {
    throw new Error(`Erro ao buscar permissoes da loja: ${error.message}`);
  }

  return (data as LojaUsuarioPermissaoRow[] | null) ?? [];
}

async function findIrmao(
  supabase: SupabaseClient,
  usuarioId: string
): Promise<Nullable<IrmaoRow>> {
  const { data, error } = await supabase
    .from("irmaos")
    .select(
      [
        "id",
        "loja_id",
        "usuario_id",
        "nome_civil",
        "nome_maconico",
        "cargo_atual_id",
        "grau_atual_id",
        "email",
        "telefone",
        "whatsapp",
        "foto_url",
        "ativo",
        "situacao_maconica",
        "situacao_cadastral",
      ].join(", ")
    )
    .eq("usuario_id", usuarioId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle<IrmaoRow>();

  if (error) {
    return null;
  }

  return data ?? null;
}

async function findAlmBrotherByAuthUserId(
  supabase: SupabaseClient,
  authUserId: string
): Promise<Nullable<AlmBrotherRow>> {
  const { data, error } = await supabase
    .from("alm_brothers")
    .select(
      [
        "id",
        "loja_id",
        "auth_user_id",
        "nome_completo",
        "nome_simbolico",
        "cargo_nome",
        "cargo_slug",
        "papel_sistema",
        "telefone",
        "email",
        "situacao",
        "foto_url",
      ].join(", ")
    )
    .eq("auth_user_id", authUserId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle<AlmBrotherRow>();

  if (error) {
    return null;
  }

  return data ?? null;
}

async function findAlmBrotherByEmail(
  supabase: SupabaseClient,
  email: string
): Promise<Nullable<AlmBrotherRow>> {
  const normalizedEmail = email.trim().toLowerCase();

  const { data, error } = await supabase
    .from("alm_brothers")
    .select(
      [
        "id",
        "loja_id",
        "auth_user_id",
        "nome_completo",
        "nome_simbolico",
        "cargo_nome",
        "cargo_slug",
        "papel_sistema",
        "telefone",
        "email",
        "situacao",
        "foto_url",
      ].join(", ")
    )
    .ilike("email", normalizedEmail)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle<AlmBrotherRow>();

  if (error) {
    return null;
  }

  return data ?? null;
}

async function findCargo(
  supabase: SupabaseClient,
  cargoId: string
): Promise<Nullable<CargoRow>> {
  const { data, error } = await supabase
    .from("cargos")
    .select(
      [
        "id",
        "nome",
        "codigo",
        "descricao",
        "permite_financeiro",
        "permite_presenca_total",
        "permite_secretaria",
        "permite_ritualistica",
        "permite_eleicao",
        "permite_votacao",
        "permite_acervo_total",
        "ativo",
      ].join(", ")
    )
    .eq("id", cargoId)
    .maybeSingle<CargoRow>();

  if (error) {
    return null;
  }

  return data ?? null;
}

function buildContext(params: {
  email: string | null;
  authUserId: string | null;
  usuario: Nullable<UsuarioRow>;
  lojaUsuario: Nullable<LojaUsuarioRow>;
  permissions: LojaUsuarioPermissaoRow[];
  irmao: Nullable<IrmaoRow>;
  almBrother: Nullable<AlmBrotherRow>;
  cargo: Nullable<CargoRow>;
}): LojaRBACContext {
  const papelBase =
    params.lojaUsuario?.papel ??
    params.almBrother?.papel_sistema ??
    "irmao";

  const papel = normalizeRole(papelBase);

  const permissoesDiretas = uniquePermissions(
    params.permissions.map((item) => item.permissao)
  );

  const permissoesEfetivas = buildEffectivePermissions(
    papel,
    permissoesDiretas,
    params.cargo
  );

  const isAdminMaster = papel === "admin_master";

  const usuarioAtivo =
    params.usuario?.status ? params.usuario.status !== "inativo" : true;

  const lojaUsuarioAtivo = params.lojaUsuario?.ativo ?? true;

  const almAtivo =
    params.almBrother?.situacao
      ? params.almBrother.situacao.toLowerCase() !== "inativo"
      : true;

  const isActive = usuarioAtivo && lojaUsuarioAtivo && almAtivo;

  const canViewFinance =
    isAdminMaster || permissoesEfetivas.includes("financeiro");

  const canViewReserved =
    isAdminMaster ||
    permissoesEfetivas.includes("reserved") ||
    papel === "veneravel" ||
    papel === "secretario" ||
    papel === "tesoureiro" ||
    papel === "orador" ||
    papel === "chanceler" ||
    papel === "mestre_de_cerimonias";

  const canManageMembers =
    isAdminMaster || permissoesEfetivas.includes("manage_members");

  return {
    email: params.email,
    authUserId: params.authUserId,
    usuario: params.usuario,
    lojaUsuario: params.lojaUsuario,
    irmao: params.irmao,
    almBrother: params.almBrother,
    cargo: params.cargo,
    papel,
    permissoesDiretas: permissoesDiretas as LojaUserPermission[],
    permissoesEfetivas: permissoesEfetivas as LojaUserPermission[],
    canViewFinance,
    canViewReserved,
    canManageMembers,
    canViewAcervoTotal:
      isAdminMaster || permissoesEfetivas.includes("acervo_total"),
    canViewSecretaria:
      isAdminMaster || permissoesEfetivas.includes("secretaria"),
    canViewRitualistica:
      isAdminMaster || permissoesEfetivas.includes("ritualistica"),
    canViewEleicao:
      isAdminMaster || permissoesEfetivas.includes("eleicao"),
    canViewVotacao:
      isAdminMaster || permissoesEfetivas.includes("votacao"),
    canViewPresencaTotal:
      isAdminMaster || permissoesEfetivas.includes("presenca_total"),
    isAdminMaster,
    isActive,
  };
}

async function buildRBACFromUsuario(
  supabase: SupabaseClient,
  usuario: Nullable<UsuarioRow>,
  origin: {
    email: string | null;
    authUserId: string | null;
  }
): Promise<LojaRBACContext> {
  if (!usuario) {
    const almBrother =
      origin.authUserId
        ? await findAlmBrotherByAuthUserId(supabase, origin.authUserId)
        : origin.email
          ? await findAlmBrotherByEmail(supabase, origin.email)
          : null;

    return buildContext({
      email: origin.email,
      authUserId: origin.authUserId,
      usuario: null,
      lojaUsuario: null,
      permissions: [],
      irmao: null,
      almBrother,
      cargo: null,
    });
  }

  const lojaUsuario = await findLojaUsuario(supabase, usuario.id);

  const permissions = lojaUsuario
    ? await findPermissions(supabase, lojaUsuario.id)
    : [];

  const irmao = await findIrmao(supabase, usuario.id);

  const almBrother =
    usuario.auth_user_id
      ? await findAlmBrotherByAuthUserId(supabase, usuario.auth_user_id)
      : usuario.email
        ? await findAlmBrotherByEmail(supabase, usuario.email)
        : null;

  const cargo =
    irmao?.cargo_atual_id
      ? await findCargo(supabase, irmao.cargo_atual_id)
      : null;

  return buildContext({
    email: origin.email,
    authUserId: origin.authUserId,
    usuario,
    lojaUsuario,
    permissions,
    irmao,
    almBrother,
    cargo,
  });
}

export async function getRBACByEmail(email: string): Promise<LojaRBACContext> {
  if (!email || !email.trim()) {
    throw new Error("E-mail obrigatório para leitura de RBAC.");
  }

  const supabase = createAdminSupabase();
  const usuario = await findUsuarioByEmail(supabase, email);

  return buildRBACFromUsuario(supabase, usuario, {
    email: email.trim().toLowerCase(),
    authUserId: usuario?.auth_user_id ?? null,
  });
}

export async function getRBACByAuthUserId(
  authUserId: string
): Promise<LojaRBACContext> {
  if (!authUserId || !authUserId.trim()) {
    throw new Error("auth_user_id obrigatório para leitura de RBAC.");
  }

  const supabase = createAdminSupabase();
  const usuario = await findUsuarioByAuthUserId(supabase, authUserId);

  return buildRBACFromUsuario(supabase, usuario, {
    email: usuario?.email?.trim().toLowerCase() ?? null,
    authUserId: authUserId.trim(),
  });
}

export async function getRBACByEmailOrAuth(params: {
  email?: string | null;
  authUserId?: string | null;
}): Promise<LojaRBACContext> {
  const supabase = createAdminSupabase();

  if (params.authUserId?.trim()) {
    const usuario = await findUsuarioByAuthUserId(supabase, params.authUserId);
    if (usuario) {
      return buildRBACFromUsuario(supabase, usuario, {
        email:
          usuario.email?.trim().toLowerCase() ??
          params.email?.trim().toLowerCase() ??
          null,
        authUserId: params.authUserId.trim(),
      });
    }

    return buildRBACFromUsuario(supabase, null, {
      email: params.email?.trim().toLowerCase() ?? null,
      authUserId: params.authUserId.trim(),
    });
  }

  if (params.email?.trim()) {
    const usuario = await findUsuarioByEmail(supabase, params.email);

    return buildRBACFromUsuario(supabase, usuario, {
      email: params.email.trim().toLowerCase(),
      authUserId: usuario?.auth_user_id ?? null,
    });
  }

  throw new Error("Informe email ou authUserId para obter RBAC.");
}

export function assertCanViewFinance(context: LojaRBACContext): void {
  if (!context.canViewFinance) {
    throw new Error("Acesso negado ao financeiro.");
  }
}

export function assertCanViewReserved(context: LojaRBACContext): void {
  if (!context.canViewReserved) {
    throw new Error("Acesso negado ao conteúdo reservado.");
  }
}

export function assertCanManageMembers(context: LojaRBACContext): void {
  if (!context.canManageMembers) {
    throw new Error("Acesso negado ao gerenciamento de irmãos.");
  }
}

export function assertIsActive(context: LojaRBACContext): void {
  if (!context.isActive) {
    throw new Error("Usuário inativo para esta operação.");
  }
}

export function debugRBACSummary(context: LojaRBACContext) {
  return {
    email: context.email,
    authUserId: context.authUserId,
    usuarioId: context.usuario?.id ?? null,
    lojaId:
      context.usuario?.loja_id ??
      context.lojaUsuario?.loja_id ??
      context.almBrother?.loja_id ??
      null,
    lojaUsuarioId: context.lojaUsuario?.id ?? null,
    irmaoId: context.irmao?.id ?? null,
    almBrotherId: context.almBrother?.id ?? null,
    cargoId: context.irmao?.cargo_atual_id ?? null,
    cargoNome:
      context.cargo?.nome ??
      context.almBrother?.cargo_nome ??
      null,
    papel: context.papel,
    permissoesDiretas: context.permissoesDiretas,
    permissoesEfetivas: context.permissoesEfetivas,
    canViewFinance: context.canViewFinance,
    canViewReserved: context.canViewReserved,
    canManageMembers: context.canManageMembers,
    canViewAcervoTotal: context.canViewAcervoTotal,
    canViewSecretaria: context.canViewSecretaria,
    canViewRitualistica: context.canViewRitualistica,
    canViewEleicao: context.canViewEleicao,
    canViewVotacao: context.canViewVotacao,
    canViewPresencaTotal: context.canViewPresencaTotal,
    isAdminMaster: context.isAdminMaster,
    isActive: context.isActive,
  };
}

export function validateRBACEnvironment(): void {
  getEnv("SUPABASE_SERVICE_ROLE_KEY");

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.SUPABASE_URL) {
    throw new Error(
      "Defina NEXT_PUBLIC_SUPABASE_URL ou SUPABASE_URL para o RBAC."
    );
  }
}