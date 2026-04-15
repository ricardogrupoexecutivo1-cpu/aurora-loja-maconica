export type MasonicSystemRole =
  | "admin_master"
  | "administracao"
  | "financeiro"
  | "secretaria"
  | "cargo_especifico"
  | "irmao";

export type MasonicOfficeSlug =
  | "admin-master"
  | "veneravel-mestre"
  | "primeiro-vigilante"
  | "segundo-vigilante"
  | "orador"
  | "secretario"
  | "secretario-adjunto"
  | "tesoureiro"
  | "tesoureiro-adjunto"
  | "chanceler"
  | "mestre-de-cerimonias"
  | "mestre-de-harmonia"
  | "mestre-de-banquetes"
  | "hospitaleiro"
  | "experto"
  | "arquiteto"
  | "cobridor-interno"
  | "cobridor-externo"
  | "porta-bandeira"
  | "bibliotecario"
  | "comissao-de-sindicancia"
  | "comissao-de-financas"
  | "deputado"
  | "mestre-instalado"
  | "irmao";

export type MasonicModule =
  | "painel"
  | "administracao"
  | "financeiro"
  | "secretaria"
  | "documentos"
  | "patrimonio"
  | "auditoria"
  | "solenidades"
  | "acervo"
  | "tronco-solidariedade"
  | "doacoes"
  | "minha-area"
  | "cadastro-irmaos"
  | "agenda"
  | "mensageria"
  | "comissoes"
  | "relatorios";

export type MasonicPermissionAction =
  | "view"
  | "create"
  | "edit"
  | "delete"
  | "export"
  | "close_competence"
  | "approve"
  | "manage_users";

export type MasonicPermissionMap = Record<
  MasonicModule,
  MasonicPermissionAction[]
>;

export interface MasonicOfficeDefinition {
  slug: MasonicOfficeSlug;
  systemRole: MasonicSystemRole;
  name: string;
  shortName: string;
  hierarchyOrder: number;
  description: string;
  mission: string;
  responsibilities: string[];
  howToAct: string[];
  routine: string[];
  allowedModules: MasonicModule[];
  restrictedModules: MasonicModule[];
  permissions: MasonicPermissionMap;
}

const none = (): MasonicPermissionAction[] => [];
const viewOnly = (): MasonicPermissionAction[] => ["view"];
const editor = (): MasonicPermissionAction[] => ["view", "create", "edit"];
const fullCrud = (): MasonicPermissionAction[] => [
  "view",
  "create",
  "edit",
  "delete",
];
const financeOperator = (): MasonicPermissionAction[] => [
  "view",
  "create",
  "edit",
  "export",
];
const financeManager = (): MasonicPermissionAction[] => [
  "view",
  "create",
  "edit",
  "delete",
  "export",
  "close_competence",
  "approve",
];

function emptyPermissionMap(): MasonicPermissionMap {
  return {
    painel: none(),
    administracao: none(),
    financeiro: none(),
    secretaria: none(),
    documentos: none(),
    patrimonio: none(),
    auditoria: none(),
    solenidades: none(),
    acervo: none(),
    "tronco-solidariedade": none(),
    doacoes: none(),
    "minha-area": none(),
    "cadastro-irmaos": none(),
    agenda: none(),
    mensageria: none(),
    comissoes: none(),
    relatorios: none(),
  };
}

function createPermissionMap(
  overrides: Partial<MasonicPermissionMap>,
): MasonicPermissionMap {
  return {
    ...emptyPermissionMap(),
    ...overrides,
  };
}

function getAllowedModulesFromPermissions(
  permissions: MasonicPermissionMap,
): MasonicModule[] {
  return (Object.keys(permissions) as MasonicModule[]).filter((module) =>
    permissions[module].includes("view"),
  );
}

function getRestrictedModulesFromPermissions(
  permissions: MasonicPermissionMap,
): MasonicModule[] {
  return (Object.keys(permissions) as MasonicModule[]).filter(
    (module) => !permissions[module].includes("view"),
  );
}

function buildOffice(
  input: Omit<
    MasonicOfficeDefinition,
    "allowedModules" | "restrictedModules"
  >,
): MasonicOfficeDefinition {
  return {
    ...input,
    allowedModules: getAllowedModulesFromPermissions(input.permissions),
    restrictedModules: getRestrictedModulesFromPermissions(input.permissions),
  };
}

export const MASONIC_OFFICES: Record<
  MasonicOfficeSlug,
  MasonicOfficeDefinition
> = {
  "admin-master": buildOffice({
    slug: "admin-master",
    systemRole: "admin_master",
    name: "Administrador Master",
    shortName: "Admin Master",
    hierarchyOrder: 0,
    description:
      "Perfil técnico máximo do sistema, reservado para a administração principal da plataforma e da loja quando houver autorização expressa.",
    mission:
      "Garantir a governança técnica, a blindagem institucional, o controle integral das permissões e a integridade dos dados da loja.",
    responsibilities: [
      "Administrar acessos e permissões globais.",
      "Validar configurações críticas da loja.",
      "Supervisionar módulos institucionais e administrativos.",
      "Manter a segurança do ambiente, dos usuários e dos lançamentos.",
      "Intervir apenas quando necessário para proteção administrativa.",
    ],
    howToAct: [
      "Atuar com máxima cautela em mudanças de acesso e estrutura.",
      "Registrar alterações críticas de perfis e permissões.",
      "Evitar concessão ampla de poderes sem necessidade institucional.",
      "Preservar a separação entre cargo simbólico e poder técnico de sistema.",
    ],
    routine: [
      "Revisar acessos administrativos periodicamente.",
      "Conferir consistência das permissões por irmão e por cargo.",
      "Acompanhar módulos críticos como financeiro, auditoria e secretaria.",
      "Garantir que apenas autorizados tenham acesso sensível.",
    ],
    permissions: createPermissionMap({
      painel: fullCrud(),
      administracao: [...fullCrud(), "approve", "manage_users"],
      financeiro: [...financeManager(), "manage_users"],
      secretaria: fullCrud(),
      documentos: fullCrud(),
      patrimonio: fullCrud(),
      auditoria: fullCrud(),
      solenidades: fullCrud(),
      acervo: fullCrud(),
      "tronco-solidariedade": financeManager(),
      doacoes: financeManager(),
      "minha-area": fullCrud(),
      "cadastro-irmaos": [...fullCrud(), "approve", "manage_users"],
      agenda: fullCrud(),
      mensageria: fullCrud(),
      comissoes: fullCrud(),
      relatorios: [...fullCrud(), "export"],
    }),
  }),

  "veneravel-mestre": buildOffice({
    slug: "veneravel-mestre",
    systemRole: "administracao",
    name: "Venerável Mestre",
    shortName: "Venerável",
    hierarchyOrder: 1,
    description:
      "Principal dirigente da loja, com função de condução, supervisão institucional e acompanhamento dos trabalhos e da administração autorizada.",
    mission:
      "Dirigir a loja com equilíbrio, disciplina, regularidade e visão institucional, acompanhando os trabalhos e zelando pela ordem administrativa.",
    responsibilities: [
      "Presidir os trabalhos da loja.",
      "Acompanhar a regularidade administrativa e institucional.",
      "Supervisionar o andamento dos setores principais.",
      "Tomar ciência de relatórios essenciais da loja.",
      "Orientar os oficiais no cumprimento de suas funções.",
    ],
    howToAct: [
      "Conduzir os trabalhos com serenidade, firmeza e prudência.",
      "Acompanhar relatórios e pendências sem invadir atribuições técnicas específicas.",
      "Delegar tarefas com clareza e acompanhar a execução.",
      "Usar o sistema para visão geral, despacho e supervisão.",
    ],
    routine: [
      "Verificar painel institucional e indicadores principais.",
      "Acompanhar agenda, solenidades e pontos administrativos.",
      "Consultar relatórios autorizados do financeiro e secretaria.",
      "Despachar assuntos relevantes com secretário e tesoureiro.",
    ],
    permissions: createPermissionMap({
      painel: viewOnly(),
      administracao: ["view", "edit", "approve"],
      financeiro: ["view", "export"],
      secretaria: ["view"],
      documentos: ["view"],
      patrimonio: ["view"],
      auditoria: ["view"],
      solenidades: ["view", "create", "edit"],
      acervo: ["view"],
      "tronco-solidariedade": ["view"],
      doacoes: ["view"],
      "minha-area": ["view", "edit"],
      "cadastro-irmaos": ["view"],
      agenda: ["view", "create", "edit"],
      mensageria: ["view", "create", "edit"],
      comissoes: ["view"],
      relatorios: ["view", "export"],
    }),
  }),

  "primeiro-vigilante": buildOffice({
    slug: "primeiro-vigilante",
    systemRole: "cargo_especifico",
    name: "1º Vigilante",
    shortName: "1º Vigilante",
    hierarchyOrder: 2,
    description:
      "Oficial responsável por funções de acompanhamento dos trabalhos, disciplina e apoio à condução da loja, conforme a organização interna adotada.",
    mission:
      "Auxiliar a direção da loja, acompanhar a ordem dos trabalhos e apoiar a coordenação dos irmãos nas atribuições regulares.",
    responsibilities: [
      "Apoiar a condução dos trabalhos da loja.",
      "Acompanhar a disciplina e a ordem interna das atividades.",
      "Auxiliar na organização das sessões e movimentações internas.",
      "Colaborar com o Venerável em tarefas operacionais e institucionais.",
    ],
    howToAct: [
      "Manter presença organizada nas rotinas da loja.",
      "Acompanhar agenda, solenidades e orientações administrativas permitidas.",
      "Atuar dentro da competência do cargo, sem extrapolar acesso técnico.",
    ],
    routine: [
      "Consultar agenda e solenidades.",
      "Verificar orientações institucionais registradas.",
      "Acompanhar comunicados e tarefas do cargo.",
    ],
    permissions: createPermissionMap({
      painel: ["view"],
      solenidades: ["view"],
      agenda: ["view"],
      mensageria: ["view"],
      "minha-area": ["view"],
      documentos: ["view"],
    }),
  }),

  "segundo-vigilante": buildOffice({
    slug: "segundo-vigilante",
    systemRole: "cargo_especifico",
    name: "2º Vigilante",
    shortName: "2º Vigilante",
    hierarchyOrder: 3,
    description:
      "Oficial de apoio à ordem e à condução dos trabalhos, exercendo funções específicas conforme a prática e organização administrativa da loja.",
    mission:
      "Contribuir com a disciplina, a organização dos trabalhos e o apoio aos oficiais na rotina da loja.",
    responsibilities: [
      "Auxiliar no fluxo regular dos trabalhos.",
      "Apoiar as rotinas de organização interna.",
      "Cumprir as tarefas próprias do cargo conforme a administração da loja.",
    ],
    howToAct: [
      "Consultar sua área exclusiva do cargo.",
      "Seguir orientações institucionais registradas.",
      "Manter disciplina, regularidade e alinhamento com a direção da loja.",
    ],
    routine: [
      "Verificar agenda e tarefas vinculadas ao cargo.",
      "Consultar comunicados importantes.",
      "Acompanhar solenidades e organização interna.",
    ],
    permissions: createPermissionMap({
      painel: ["view"],
      solenidades: ["view"],
      agenda: ["view"],
      mensageria: ["view"],
      "minha-area": ["view"],
      documentos: ["view"],
    }),
  }),

  orador: buildOffice({
    slug: "orador",
    systemRole: "cargo_especifico",
    name: "Orador",
    shortName: "Orador",
    hierarchyOrder: 4,
    description:
      "Oficial com atribuições de manifestação, observação da regularidade e apoio institucional, conforme a prática ritualística e administrativa da loja.",
    mission:
      "Zelar pela correta condução institucional de matérias sob sua competência e registrar ou acompanhar orientações próprias do cargo.",
    responsibilities: [
      "Acompanhar temas de sua atribuição.",
      "Manter notas, registros ou pareceres quando aplicável.",
      "Apoiar a regularidade institucional conforme o cargo.",
    ],
    howToAct: [
      "Utilizar a área do cargo para consulta de documentos e notas.",
      "Acompanhar pautas relevantes autorizadas.",
      "Atuar apenas dentro do escopo definido pela loja.",
    ],
    routine: [
      "Consultar documentos e agenda.",
      "Organizar notas e referências do cargo.",
      "Acompanhar comunicados internos autorizados.",
    ],
    permissions: createPermissionMap({
      painel: ["view"],
      secretaria: ["view"],
      documentos: ["view", "create", "edit"],
      acervo: ["view"],
      "minha-area": ["view", "edit"],
      agenda: ["view"],
      mensageria: ["view"],
    }),
  }),

  secretario: buildOffice({
    slug: "secretario",
    systemRole: "secretaria",
    name: "Secretário",
    shortName: "Secretário",
    hierarchyOrder: 5,
    description:
      "Oficial responsável pela secretaria da loja, registros, atas, documentos e organização administrativa documental.",
    mission:
      "Assegurar a boa ordem documental, a atualização dos registros e a organização formal da vida administrativa da loja.",
    responsibilities: [
      "Gerir atas, registros e documentos institucionais.",
      "Organizar informações administrativas da loja.",
      "Acompanhar cadastro de irmãos e documentos internos.",
      "Dar suporte formal às rotinas da administração.",
    ],
    howToAct: [
      "Registrar atos administrativos com clareza e precisão.",
      "Manter documentos organizados e localizáveis.",
      "Separar informação pública, interna e sigilosa.",
      "Atualizar a agenda e a documentação conforme necessidade.",
    ],
    routine: [
      "Consultar pendências da secretaria.",
      "Atualizar documentos e registros.",
      "Conferir agenda institucional.",
      "Acompanhar movimentações administrativas permitidas.",
    ],
    permissions: createPermissionMap({
      painel: ["view"],
      secretaria: fullCrud(),
      documentos: fullCrud(),
      auditoria: ["view"],
      acervo: ["view", "create", "edit"],
      "minha-area": ["view", "edit"],
      "cadastro-irmaos": ["view", "create", "edit"],
      agenda: ["view", "create", "edit"],
      mensageria: ["view", "create", "edit"],
      comissoes: ["view", "create", "edit"],
      relatorios: ["view", "export"],
    }),
  }),

  "secretario-adjunto": buildOffice({
    slug: "secretario-adjunto",
    systemRole: "secretaria",
    name: "Secretário Adjunto",
    shortName: "Sec. Adjunto",
    hierarchyOrder: 6,
    description:
      "Cargo de apoio direto à secretaria, com atuação complementar na organização documental e administrativa.",
    mission:
      "Auxiliar a secretaria na manutenção dos registros, organização dos documentos e continuidade das rotinas administrativas.",
    responsibilities: [
      "Apoiar o secretário nas tarefas documentais.",
      "Auxiliar na organização de registros internos.",
      "Colaborar na atualização de cadastros e documentos.",
    ],
    howToAct: [
      "Executar tarefas delegadas com organização e precisão.",
      "Evitar mudanças estruturais sem alinhamento.",
      "Manter o fluxo documental atualizado e bem guardado.",
    ],
    routine: [
      "Verificar documentos pendentes.",
      "Apoiar atualização de registros.",
      "Conferir agenda e arquivos vinculados à secretaria.",
    ],
    permissions: createPermissionMap({
      painel: ["view"],
      secretaria: editor(),
      documentos: editor(),
      acervo: ["view", "create", "edit"],
      "minha-area": ["view", "edit"],
      "cadastro-irmaos": ["view", "edit"],
      agenda: ["view", "create", "edit"],
      mensageria: ["view"],
      relatorios: ["view"],
    }),
  }),

  tesoureiro: buildOffice({
    slug: "tesoureiro",
    systemRole: "financeiro",
    name: "Tesoureiro",
    shortName: "Tesoureiro",
    hierarchyOrder: 7,
    description:
      "Oficial responsável pela gestão financeira institucional, controle de entradas e saídas, contas, centros de custo, relatórios e fechamentos.",
    mission:
      "Administrar os recursos financeiros da loja com exatidão, transparência, disciplina e rastreabilidade completa.",
    responsibilities: [
      "Lançar entradas e saídas da loja.",
      "Controlar contas e centros de custo.",
      "Fechar competências financeiras quando devido.",
      "Exportar relatórios e acompanhar saldos.",
      "Tratar corretamente Tronco de Solidariedade e Doações.",
    ],
    howToAct: [
      "Registrar cada movimentação com categoria adequada.",
      "Usar Tronco de Solidariedade como entrada no caixa da loja.",
      "Usar Doações como saída quando houver destinação do recurso.",
      "Fechar competências apenas após conferência completa.",
      "Preservar sigilo financeiro e acesso restrito.",
    ],
    routine: [
      "Consultar saldos e lançamentos pendentes.",
      "Lançar receitas e despesas do período.",
      "Conferir contas e centros de custo.",
      "Emitir relatórios e exportações quando necessário.",
      "Preparar o fechamento da competência após validação.",
    ],
    permissions: createPermissionMap({
      painel: ["view"],
      financeiro: financeManager(),
      patrimonio: ["view"],
      auditoria: ["view"],
      "tronco-solidariedade": financeManager(),
      doacoes: financeManager(),
      "minha-area": ["view", "edit"],
      agenda: ["view"],
      relatorios: ["view", "export"],
    }),
  }),

  "tesoureiro-adjunto": buildOffice({
    slug: "tesoureiro-adjunto",
    systemRole: "financeiro",
    name: "Tesoureiro Adjunto",
    shortName: "Tes. Adjunto",
    hierarchyOrder: 8,
    description:
      "Cargo de apoio à tesouraria, com atuação assistida no controle financeiro institucional.",
    mission:
      "Auxiliar a tesouraria na execução das rotinas financeiras, mantendo organização, regularidade e segurança dos dados.",
    responsibilities: [
      "Apoiar lançamentos financeiros.",
      "Auxiliar na conferência de movimentações.",
      "Colaborar na organização de contas e registros financeiros.",
    ],
    howToAct: [
      "Realizar tarefas financeiras conforme delegação.",
      "Não efetuar fechamentos sem autorização principal.",
      "Manter atenção total a categorias, contas e valores.",
    ],
    routine: [
      "Acompanhar lançamentos do período.",
      "Conferir registros e apoiar a organização financeira.",
      "Preparar informações para análise do tesoureiro.",
    ],
    permissions: createPermissionMap({
      painel: ["view"],
      financeiro: financeOperator(),
      "tronco-solidariedade": financeOperator(),
      doacoes: financeOperator(),
      "minha-area": ["view", "edit"],
      relatorios: ["view", "export"],
    }),
  }),

  chanceler: buildOffice({
    slug: "chanceler",
    systemRole: "cargo_especifico",
    name: "Chanceler",
    shortName: "Chanceler",
    hierarchyOrder: 9,
    description:
      "Oficial com atribuições específicas de controle e conferência conforme a organização e prática da loja.",
    mission:
      "Exercer com zelo as atribuições próprias do cargo, colaborando com a regularidade e o controle institucional nos pontos que lhe competem.",
    responsibilities: [
      "Cumprir as tarefas específicas do cargo.",
      "Acompanhar registros ou controles autorizados.",
      "Colaborar com a organização institucional da loja.",
    ],
    howToAct: [
      "Seguir orientações definidas pela administração da loja.",
      "Consultar documentos e registros permitidos.",
      "Atuar estritamente dentro do escopo liberado.",
    ],
    routine: [
      "Consultar sua área do cargo.",
      "Acompanhar agenda e documentos autorizados.",
      "Verificar comunicados relevantes.",
    ],
    permissions: createPermissionMap({
      painel: ["view"],
      documentos: ["view"],
      "minha-area": ["view"],
      agenda: ["view"],
      mensageria: ["view"],
    }),
  }),

  "mestre-de-cerimonias": buildOffice({
    slug: "mestre-de-cerimonias",
    systemRole: "cargo_especifico",
    name: "Mestre de Cerimônias",
    shortName: "M. Cerimônias",
    hierarchyOrder: 10,
    description:
      "Oficial responsável pelo apoio organizacional e pela boa condução cerimonial das atividades sob sua competência.",
    mission:
      "Organizar e acompanhar os fluxos cerimoniais e operacionais das solenidades, mantendo ordem e regularidade.",
    responsibilities: [
      "Apoiar a organização de solenidades.",
      "Acompanhar atividades cerimoniais.",
      "Manter alinhamento com a agenda institucional.",
    ],
    howToAct: [
      "Usar agenda e módulo de solenidades como base de trabalho.",
      "Registrar observações práticas do cargo quando necessário.",
      "Atuar com organização, discrição e regularidade.",
    ],
    routine: [
      "Conferir agenda das atividades.",
      "Acompanhar solenidades programadas.",
      "Consultar orientações da administração quando houver.",
    ],
    permissions: createPermissionMap({
      painel: ["view"],
      solenidades: ["view", "create", "edit"],
      documentos: ["view"],
      "minha-area": ["view", "edit"],
      agenda: ["view", "create", "edit"],
      mensageria: ["view"],
    }),
  }),

  "mestre-de-harmonia": buildOffice({
    slug: "mestre-de-harmonia",
    systemRole: "cargo_especifico",
    name: "Mestre de Harmonia",
    shortName: "M. Harmonia",
    hierarchyOrder: 11,
    description:
      "Oficial encarregado de funções relacionadas à harmonia e ao apoio às atividades sociais e organizacionais da loja.",
    mission:
      "Contribuir para a boa ordem, recepção e harmonia das atividades que lhe forem atribuídas pela loja.",
    responsibilities: [
      "Apoiar atividades sociais e internas do cargo.",
      "Organizar referências e orientações operacionais ligadas à função.",
      "Cooperar com o bom andamento das atividades da loja.",
    ],
    howToAct: [
      "Acompanhar agenda e comunicados.",
      "Registrar observações importantes da função quando necessário.",
      "Atuar com discrição e boa organização.",
    ],
    routine: [
      "Conferir agenda.",
      "Acompanhar comunicados.",
      "Verificar tarefas vinculadas ao cargo.",
    ],
    permissions: createPermissionMap({
      painel: ["view"],
      agenda: ["view"],
      mensageria: ["view"],
      "minha-area": ["view"],
      solenidades: ["view"],
    }),
  }),

  "mestre-de-banquetes": buildOffice({
    slug: "mestre-de-banquetes",
    systemRole: "cargo_especifico",
    name: "Mestre de Banquetes",
    shortName: "M. Banquetes",
    hierarchyOrder: 12,
    description:
      "Oficial voltado à organização das atividades e preparações sociais ou operacionais ligadas às recepções e eventos da loja.",
    mission:
      "Contribuir com a organização das atividades sociais e de recepção da loja, conforme sua atribuição específica.",
    responsibilities: [
      "Acompanhar eventos e atividades sociais.",
      "Organizar registros internos relacionados ao cargo.",
      "Apoiar a execução das programações pertinentes.",
    ],
    howToAct: [
      "Manter alinhamento com agenda e comunicados.",
      "Registrar necessidades operacionais do cargo.",
      "Atuar de forma organizada e previsível.",
    ],
    routine: [
      "Consultar agenda de eventos.",
      "Acompanhar solenidades e atividades sociais relacionadas.",
      "Verificar observações do cargo.",
    ],
    permissions: createPermissionMap({
      painel: ["view"],
      agenda: ["view"],
      solenidades: ["view"],
      mensageria: ["view"],
      "minha-area": ["view"],
    }),
  }),

  hospitaleiro: buildOffice({
    slug: "hospitaleiro",
    systemRole: "cargo_especifico",
    name: "Hospitaleiro",
    shortName: "Hospitaleiro",
    hierarchyOrder: 13,
    description:
      "Oficial ligado às ações de assistência, acolhimento e apoio fraterno, com interface especial com o Tronco de Solidariedade quando autorizado.",
    mission:
      "Promover o apoio fraterno e organizar as ações assistenciais e solidárias sob orientação institucional da loja.",
    responsibilities: [
      "Acompanhar demandas solidárias ou assistenciais.",
      "Apoiar ações fraternas e iniciativas de ajuda.",
      "Consultar registros autorizados do Tronco de Solidariedade.",
    ],
    howToAct: [
      "Atuar com discrição, humanidade e organização.",
      "Registrar observações e necessidades quando permitido.",
      "Consultar o módulo solidário dentro dos limites do cargo.",
    ],
    routine: [
      "Acompanhar demandas fraternas registradas.",
      "Consultar informações do módulo solidário quando autorizado.",
      "Coordenar ações do cargo em alinhamento com a loja.",
    ],
    permissions: createPermissionMap({
      painel: ["view"],
      "tronco-solidariedade": ["view"],
      doacoes: ["view"],
      "minha-area": ["view", "edit"],
      agenda: ["view"],
      mensageria: ["view", "create", "edit"],
      relatorios: ["view"],
    }),
  }),

  experto: buildOffice({
    slug: "experto",
    systemRole: "cargo_especifico",
    name: "Experto",
    shortName: "Experto",
    hierarchyOrder: 14,
    description:
      "Oficial com funções específicas ligadas à ordem prática e à execução de tarefas do cargo conforme a rotina da loja.",
    mission:
      "Cumprir com exatidão e prontidão as atribuições próprias do cargo no apoio às atividades da loja.",
    responsibilities: [
      "Executar tarefas do cargo dentro das rotinas da loja.",
      "Acompanhar agenda e comunicações pertinentes.",
      "Apoiar a organização dos trabalhos quando demandado.",
    ],
    howToAct: [
      "Consultar área do cargo antes das atividades.",
      "Seguir orientações registradas pela administração.",
      "Atuar com atenção e disciplina.",
    ],
    routine: [
      "Verificar agenda.",
      "Consultar comunicados internos.",
      "Acompanhar tarefas específicas do cargo.",
    ],
    permissions: createPermissionMap({
      painel: ["view"],
      agenda: ["view"],
      mensageria: ["view"],
      "minha-area": ["view"],
      solenidades: ["view"],
    }),
  }),

  arquiteto: buildOffice({
    slug: "arquiteto",
    systemRole: "cargo_especifico",
    name: "Arquiteto",
    shortName: "Arquiteto",
    hierarchyOrder: 15,
    description:
      "Oficial com atribuições específicas de organização, acompanhamento ou apoio técnico conforme a prática adotada pela loja.",
    mission:
      "Colaborar com responsabilidade e método nas atribuições próprias do cargo, conforme definido internamente pela loja.",
    responsibilities: [
      "Executar tarefas específicas do cargo.",
      "Acompanhar documentos e agenda autorizados.",
      "Contribuir com a organização institucional quando demandado.",
    ],
    howToAct: [
      "Seguir orientações institucionais registradas.",
      "Utilizar sua área do cargo como referência operacional.",
      "Evitar acesso ou intervenção fora do escopo permitido.",
    ],
    routine: [
      "Consultar agenda.",
      "Verificar documentos autorizados.",
      "Acompanhar tarefas do cargo.",
    ],
    permissions: createPermissionMap({
      painel: ["view"],
      documentos: ["view"],
      agenda: ["view"],
      "minha-area": ["view"],
    }),
  }),

  "cobridor-interno": buildOffice({
    slug: "cobridor-interno",
    systemRole: "cargo_especifico",
    name: "Cobridor Interno",
    shortName: "Cobr. Interno",
    hierarchyOrder: 16,
    description:
      "Oficial com atribuições específicas de guarda, ordem e controle no âmbito interno conforme a prática da loja.",
    mission:
      "Contribuir para a ordem interna da loja dentro das atribuições específicas do cargo.",
    responsibilities: [
      "Executar funções próprias de controle interno do cargo.",
      "Acompanhar orientações operacionais registradas.",
      "Apoiar a ordem dos trabalhos quando aplicável.",
    ],
    howToAct: [
      "Consultar orientações do cargo.",
      "Atuar com disciplina, presença e responsabilidade.",
      "Manter sigilo e discrição.",
    ],
    routine: [
      "Verificar agenda e comunicados.",
      "Consultar instruções do cargo antes das atividades.",
    ],
    permissions: createPermissionMap({
      painel: ["view"],
      agenda: ["view"],
      mensageria: ["view"],
      "minha-area": ["view"],
    }),
  }),

  "cobridor-externo": buildOffice({
    slug: "cobridor-externo",
    systemRole: "cargo_especifico",
    name: "Cobridor Externo",
    shortName: "Cobr. Externo",
    hierarchyOrder: 17,
    description:
      "Oficial com atribuições específicas de guarda e controle externo, conforme a rotina e prática da loja.",
    mission:
      "Cumprir as atribuições externas do cargo com disciplina, vigilância e regularidade.",
    responsibilities: [
      "Executar funções específicas do cargo.",
      "Acompanhar orientações operacionais externas da loja.",
      "Manter alinhamento com a organização dos trabalhos.",
    ],
    howToAct: [
      "Consultar instruções do cargo.",
      "Atuar com atenção, descrição e pontualidade.",
      "Respeitar os limites de acesso técnico.",
    ],
    routine: [
      "Verificar agenda e mensagens internas.",
      "Acompanhar orientações do cargo antes das atividades.",
    ],
    permissions: createPermissionMap({
      painel: ["view"],
      agenda: ["view"],
      mensageria: ["view"],
      "minha-area": ["view"],
    }),
  }),

  "porta-bandeira": buildOffice({
    slug: "porta-bandeira",
    systemRole: "cargo_especifico",
    name: "Porta-Bandeira",
    shortName: "Porta-Bandeira",
    hierarchyOrder: 18,
    description:
      "Oficial encarregado das atribuições simbólicas e organizacionais próprias do cargo, conforme a prática da loja.",
    mission:
      "Cumprir com zelo e regularidade as tarefas específicas do cargo em solenidades e atos pertinentes.",
    responsibilities: [
      "Atuar nas atividades do cargo quando designado.",
      "Acompanhar orientações de solenidades e agenda.",
      "Preservar a regularidade e o respeito institucional das atividades.",
    ],
    howToAct: [
      "Consultar agenda e solenidades.",
      "Seguir orientações específicas do cargo.",
      "Atuar com organização e pontualidade.",
    ],
    routine: [
      "Verificar agenda.",
      "Acompanhar solenidades vinculadas ao cargo.",
    ],
    permissions: createPermissionMap({
      painel: ["view"],
      agenda: ["view"],
      solenidades: ["view"],
      "minha-area": ["view"],
    }),
  }),

  bibliotecario: buildOffice({
    slug: "bibliotecario",
    systemRole: "cargo_especifico",
    name: "Bibliotecário",
    shortName: "Bibliotecário",
    hierarchyOrder: 19,
    description:
      "Oficial responsável pela organização do acervo, referências e materiais internos que lhe forem atribuídos.",
    mission:
      "Organizar e preservar o acervo da loja com método, cuidado e facilidade de consulta.",
    responsibilities: [
      "Gerir materiais e referências do acervo.",
      "Registrar e manter organizado o conteúdo sob sua responsabilidade.",
      "Facilitar a consulta autorizada ao acervo.",
    ],
    howToAct: [
      "Utilizar o módulo de acervo com organização.",
      "Cadastrar, revisar e manter referências acessíveis.",
      "Preservar materiais e informações internas.",
    ],
    routine: [
      "Consultar itens do acervo.",
      "Atualizar registros e observações.",
      "Acompanhar novas entradas ou necessidades do acervo.",
    ],
    permissions: createPermissionMap({
      painel: ["view"],
      acervo: ["view", "create", "edit"],
      documentos: ["view"],
      "minha-area": ["view", "edit"],
      relatorios: ["view"],
    }),
  }),

  "comissao-de-sindicancia": buildOffice({
    slug: "comissao-de-sindicancia",
    systemRole: "cargo_especifico",
    name: "Comissão de Sindicância",
    shortName: "Sindicância",
    hierarchyOrder: 20,
    description:
      "Comissão com atuação própria em matérias específicas, com acesso controlado e delimitado pela administração da loja.",
    mission:
      "Atuar em análises e procedimentos da comissão com discrição, método e responsabilidade institucional.",
    responsibilities: [
      "Acompanhar processos internos da comissão quando houver.",
      "Registrar informações e observações vinculadas à matéria.",
      "Manter confidencialidade e controle documental.",
    ],
    howToAct: [
      "Atuar apenas nas matérias autorizadas.",
      "Usar documentos e registros próprios da comissão.",
      "Preservar sigilo e rastreabilidade.",
    ],
    routine: [
      "Consultar documentos autorizados.",
      "Registrar andamento das matérias da comissão.",
      "Acompanhar orientações da administração.",
    ],
    permissions: createPermissionMap({
      painel: ["view"],
      documentos: ["view", "create", "edit"],
      comissoes: ["view", "create", "edit"],
      "minha-area": ["view", "edit"],
      relatorios: ["view"],
    }),
  }),

  "comissao-de-financas": buildOffice({
    slug: "comissao-de-financas",
    systemRole: "financeiro",
    name: "Comissão de Finanças",
    shortName: "Com. Finanças",
    hierarchyOrder: 21,
    description:
      "Comissão de apoio, análise e acompanhamento do financeiro da loja, com acesso controlado e delimitado.",
    mission:
      "Acompanhar e analisar informações financeiras autorizadas, colaborando com transparência e responsabilidade.",
    responsibilities: [
      "Consultar relatórios financeiros permitidos.",
      "Acompanhar informações do caixa e competências.",
      "Contribuir com análise e observação institucional.",
    ],
    howToAct: [
      "Atuar com reserva e rigor documental.",
      "Não executar movimentações fora da competência autorizada.",
      "Priorizar leitura, análise e conferência.",
    ],
    routine: [
      "Consultar relatórios autorizados.",
      "Acompanhar saldos e competências.",
      "Verificar pontos financeiros encaminhados pela administração.",
    ],
    permissions: createPermissionMap({
      painel: ["view"],
      financeiro: ["view", "export"],
      "tronco-solidariedade": ["view"],
      doacoes: ["view"],
      auditoria: ["view"],
      "minha-area": ["view"],
      relatorios: ["view", "export"],
    }),
  }),

  deputado: buildOffice({
    slug: "deputado",
    systemRole: "cargo_especifico",
    name: "Deputado",
    shortName: "Deputado",
    hierarchyOrder: 22,
    description:
      "Cargo de representação e acompanhamento institucional conforme a organização própria da loja e suas necessidades.",
    mission:
      "Representar, acompanhar e colaborar com os temas próprios do cargo dentro dos limites definidos pela loja.",
    responsibilities: [
      "Acompanhar pautas e documentos pertinentes.",
      "Atuar em representação quando designado.",
      "Registrar observações do cargo quando necessário.",
    ],
    howToAct: [
      "Consultar documentos e agenda autorizados.",
      "Atuar com responsabilidade institucional.",
      "Preservar limites de acesso e representação.",
    ],
    routine: [
      "Verificar agenda.",
      "Consultar documentos e comunicados.",
      "Acompanhar pautas pertinentes.",
    ],
    permissions: createPermissionMap({
      painel: ["view"],
      documentos: ["view"],
      agenda: ["view"],
      mensageria: ["view"],
      "minha-area": ["view"],
    }),
  }),

  "mestre-instalado": buildOffice({
    slug: "mestre-instalado",
    systemRole: "cargo_especifico",
    name: "Mestre Instalado",
    shortName: "M. Instalado",
    hierarchyOrder: 23,
    description:
      "Irmão com condição e participação institucional relevante, com acesso delimitado conforme a organização da loja.",
    mission:
      "Colaborar com experiência, orientação e participação institucional nos limites de acesso definidos pela loja.",
    responsibilities: [
      "Acompanhar informações autorizadas.",
      "Colaborar com a vida institucional da loja quando convocado.",
      "Atuar dentro dos limites definidos pela administração.",
    ],
    howToAct: [
      "Consultar área própria e documentos permitidos.",
      "Atuar com prudência e respeito à hierarquia de acesso.",
      "Contribuir institucionalmente quando demandado.",
    ],
    routine: [
      "Consultar comunicados e agenda quando necessário.",
      "Acompanhar informações institucionais permitidas.",
    ],
    permissions: createPermissionMap({
      painel: ["view"],
      documentos: ["view"],
      agenda: ["view"],
      mensageria: ["view"],
      "minha-area": ["view"],
    }),
  }),

  irmao: buildOffice({
    slug: "irmao",
    systemRole: "irmao",
    name: "Irmão",
    shortName: "Irmão",
    hierarchyOrder: 99,
    description:
      "Área individual e restrita do irmão, sem acesso administrativo global, usada para consulta pessoal de orientações e informações liberadas.",
    mission:
      "Oferecer ao irmão uma área segura e simples para consulta de sua função, orientações, agenda e informações pessoais autorizadas.",
    responsibilities: [
      "Consultar sua própria área restrita.",
      "Acompanhar informações pessoais e orientações autorizadas.",
      "Respeitar os limites administrativos do sistema.",
    ],
    howToAct: [
      "Usar a área individual para acompanhar o que foi liberado.",
      "Evitar tentar acessar módulos administrativos não autorizados.",
      "Manter seus dados pessoais atualizados quando permitido.",
    ],
    routine: [
      "Consultar agenda pessoal ou institucional liberada.",
      "Acompanhar comunicados recebidos.",
      "Revisar sua área individual quando necessário.",
    ],
    permissions: createPermissionMap({
      "minha-area": ["view", "edit"],
      agenda: ["view"],
      mensageria: ["view"],
    }),
  }),
};

export const MASONIC_OFFICES_LIST = (
  Object.values(MASONIC_OFFICES) as MasonicOfficeDefinition[]
).sort((a, b) => a.hierarchyOrder - b.hierarchyOrder);

export const DEFAULT_MASONIC_OFFICE: MasonicOfficeSlug = "irmao";
export const DEFAULT_SYSTEM_ROLE: MasonicSystemRole = "irmao";

export function isMasonicOfficeSlug(
  value: string | null | undefined,
): value is MasonicOfficeSlug {
  if (!value) return false;

  return value in MASONIC_OFFICES;
}

export function normalizeMasonicOfficeSlug(
  value: string | null | undefined,
): MasonicOfficeSlug {
  if (isMasonicOfficeSlug(value)) return value;

  return DEFAULT_MASONIC_OFFICE;
}

export function getOfficeDefinition(
  office: string | null | undefined,
): MasonicOfficeDefinition {
  return MASONIC_OFFICES[normalizeMasonicOfficeSlug(office)];
}

export function getOfficeName(office: string | null | undefined): string {
  return getOfficeDefinition(office).name;
}

export function getOfficeShortName(office: string | null | undefined): string {
  return getOfficeDefinition(office).shortName;
}

export function getOfficeDescription(
  office: string | null | undefined,
): string {
  return getOfficeDefinition(office).description;
}

export function getOfficeMission(office: string | null | undefined): string {
  return getOfficeDefinition(office).mission;
}

export function getOfficeResponsibilities(
  office: string | null | undefined,
): string[] {
  return getOfficeDefinition(office).responsibilities;
}

export function getOfficeHowToAct(
  office: string | null | undefined,
): string[] {
  return getOfficeDefinition(office).howToAct;
}

export function getOfficeRoutine(office: string | null | undefined): string[] {
  return getOfficeDefinition(office).routine;
}

export function getSystemRoleFromOffice(
  office: string | null | undefined,
): MasonicSystemRole {
  return getOfficeDefinition(office).systemRole;
}

export function getOfficePermissions(
  office: string | null | undefined,
): MasonicPermissionMap {
  return getOfficeDefinition(office).permissions;
}

export function hasModuleAccess(
  office: string | null | undefined,
  module: MasonicModule,
): boolean {
  return getOfficePermissions(office)[module].includes("view");
}

export function canPerformAction(
  office: string | null | undefined,
  module: MasonicModule,
  action: MasonicPermissionAction,
): boolean {
  return getOfficePermissions(office)[module].includes(action);
}

export function listAllowedModules(
  office: string | null | undefined,
): MasonicModule[] {
  return getOfficeDefinition(office).allowedModules;
}

export function listRestrictedModules(
  office: string | null | undefined,
): MasonicModule[] {
  return getOfficeDefinition(office).restrictedModules;
}

export interface MasonicOfficePageContent {
  slug: MasonicOfficeSlug;
  title: string;
  subtitle: string;
  description: string;
  mission: string;
  responsibilities: string[];
  howToAct: string[];
  routine: string[];
  allowedModules: MasonicModule[];
  restrictedModules: MasonicModule[];
  systemRole: MasonicSystemRole;
}

export function getOfficePageContent(
  office: string | null | undefined,
): MasonicOfficePageContent {
  const definition = getOfficeDefinition(office);

  return {
    slug: definition.slug,
    title: definition.name,
    subtitle: `Área exclusiva do cargo ${definition.name}`,
    description: definition.description,
    mission: definition.mission,
    responsibilities: definition.responsibilities,
    howToAct: definition.howToAct,
    routine: definition.routine,
    allowedModules: definition.allowedModules,
    restrictedModules: definition.restrictedModules,
    systemRole: definition.systemRole,
  };
}