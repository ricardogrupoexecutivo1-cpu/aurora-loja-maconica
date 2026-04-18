import Link from "next/link";

type EstruturaItem = {
  nome: string;
  descricao: string;
  status: "Ativa" | "Base inicial" | "Expansão";
};

const categoriasFinanceiras: EstruturaItem[] = [
  {
    nome: "Receitas recorrentes",
    descricao: "Mensalidades, contribuições frequentes e entradas institucionais previsíveis.",
    status: "Ativa",
  },
  {
    nome: "Contribuição institucional",
    descricao: "Categoria preparada para entradas como o Tronco de Solidariedade e outras contribuições oficiais.",
    status: "Ativa",
  },
  {
    nome: "Operação da loja",
    descricao: "Despesas administrativas, rotina interna, estrutura e manutenção operacional.",
    status: "Ativa",
  },
  {
    nome: "Ações institucionais",
    descricao: "Saídas destinadas a doações, apoio fraternal e iniciativas autorizadas pela loja.",
    status: "Ativa",
  },
  {
    nome: "Ajustes financeiros",
    descricao: "Correções internas, reclassificações e lançamentos especiais controlados.",
    status: "Expansão",
  },
];

const contasFinanceiras: EstruturaItem[] = [
  {
    nome: "Caixa institucional",
    descricao: "Conta base para movimentações internas da loja com leitura simples e controlada.",
    status: "Ativa",
  },
  {
    nome: "Banco principal",
    descricao: "Conta bancária principal da loja para entradas, saídas e conferência financeira.",
    status: "Base inicial",
  },
  {
    nome: "Reserva institucional",
    descricao: "Conta separada para fundos estratégicos, segurança e planejamento da loja.",
    status: "Expansão",
  },
  {
    nome: "Tronco de Solidariedade",
    descricao: "Conta preparada para leitura separada e transparente das contribuições solidárias.",
    status: "Expansão",
  },
];

const centrosInstitucionais: EstruturaItem[] = [
  {
    nome: "Administração",
    descricao: "Centro principal para despesas operacionais e organização cotidiana da loja.",
    status: "Ativa",
  },
  {
    nome: "Solidariedade",
    descricao: "Centro institucional preparado para registrar ações ligadas ao Tronco e apoio fraternal.",
    status: "Ativa",
  },
  {
    nome: "Eventos e sessões",
    descricao: "Estrutura para custos e receitas relacionados a encontros, sessões e eventos internos.",
    status: "Expansão",
  },
  {
    nome: "Patrimônio e manutenção",
    descricao: "Leitura voltada para conservação, melhorias físicas e itens institucionais.",
    status: "Expansão",
  },
];

function statusClasses(status: EstruturaItem["status"]) {
  if (status === "Ativa") {
    return "bg-emerald-100 text-emerald-700 border border-emerald-200";
  }

  if (status === "Base inicial") {
    return "bg-sky-100 text-sky-700 border border-sky-200";
  }

  return "bg-amber-100 text-amber-700 border border-amber-200";
}

function EstruturaCard({
  titulo,
  descricao,
  itens,
}: {
  titulo: string;
  descricao: string;
  itens: EstruturaItem[];
}) {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
          {titulo}
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
          {descricao}
        </p>
      </div>

      <div className="space-y-4">
        {itens.map((item) => (
          <div
            key={item.nome}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-all hover:border-sky-200 hover:bg-sky-50/40"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
                  {item.nome}
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-600 sm:text-[15px]">
                  {item.descricao}
                </p>
              </div>

              <span
                className={`inline-flex w-fit shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${statusClasses(
                  item.status
                )}`}
              >
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ResumoItem({
  titulo,
  valor,
  descricao,
}: {
  titulo: string;
  valor: string;
  descricao: string;
}) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{titulo}</p>
      <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{valor}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">{descricao}</p>
    </div>
  );
}

export default function FinanceiroEstruturaPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-sky-50/40 text-slate-900">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-sky-900 px-5 py-8 text-white sm:px-8 sm:py-10">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-100">
                  Aurora Loja Maçônica
                </span>

                <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                  Estrutura do financeiro institucional
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
                  Esta página isolada mostra a arquitetura oficial da nova camada financeira
                  premium. Aqui organizamos categorias, contas e centros institucionais sem
                  alterar a base já estável, mantendo blindagem total para a evolução da loja.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/financeiro"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  Voltar ao financeiro
                </Link>

                <Link
                  href="/sistema"
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                >
                  Voltar ao sistema
                </Link>
              </div>
            </div>
          </div>

          <div className="grid gap-4 border-t border-slate-200 bg-white px-5 py-5 sm:grid-cols-2 xl:grid-cols-4 sm:px-8">
            <ResumoItem
              titulo="Categorias-base"
              valor="5"
              descricao="Estrutura inicial para receitas, saídas, contribuições e ajustes."
            />
            <ResumoItem
              titulo="Contas previstas"
              valor="4"
              descricao="Caixa, banco, reserva e tronco com visão organizada para expansão."
            />
            <ResumoItem
              titulo="Centros institucionais"
              valor="4"
              descricao="Administração, solidariedade, eventos e patrimônio em leitura clara."
            />
            <ResumoItem
              titulo="Modelo de evolução"
              valor="Blindado"
              descricao="Nova camada criada sem mexer no que já está funcionando."
            />
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
              Mapa oficial do módulo
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
              A base atual do financeiro continua preservada. Esta nova rota passa a ser o
              ponto de entendimento e organização da camada premium que nós dois estamos
              construindo para a loja.
            </p>

            <div className="mt-5 space-y-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">Leitura clara</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Estrutura pensada para celular e computador, com foco em compreensão rápida.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">Página isolada</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Mantém a regra permanente do projeto: evoluir sem quebrar a base estável.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">Expansão segura</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Preparada para receber Supabase, filtros, relatórios e fechamento por competência.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:col-span-2">
            <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
              Diretriz institucional
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
              Nesta arquitetura, o <strong>Tronco de Solidariedade</strong> já fica visível
              como item financeiro institucional preparado para leitura separada, transparência
              e futura auditoria. As doações permanecem organizadas como saídas institucionais,
              respeitando a lógica que você definiu.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-emerald-50 p-4">
                <p className="text-sm font-semibold text-emerald-800">Entrada oficial</p>
                <p className="mt-1 text-sm leading-6 text-emerald-700">
                  Tronco de Solidariedade tratado como contribuição institucional.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-sky-50 p-4">
                <p className="text-sm font-semibold text-sky-800">Saída oficial</p>
                <p className="mt-1 text-sm leading-6 text-sky-700">
                  Doações mantidas como saída institucional de forma clara e consistente.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-amber-50 p-4">
                <p className="text-sm font-semibold text-amber-800">Próxima evolução</p>
                <p className="mt-1 text-sm leading-6 text-amber-700">
                  Ligar esta estrutura aos lançamentos reais e ao fechamento por competência.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-3">
          <div className="xl:col-span-1">
            <EstruturaCard
              titulo="Categorias financeiras"
              descricao="Base organizadora dos tipos de entrada, saída e ajustes internos do módulo."
              itens={categoriasFinanceiras}
            />
          </div>

          <div className="xl:col-span-1">
            <EstruturaCard
              titulo="Contas financeiras"
              descricao="Leitura das contas e caixas da loja para separar origem, destino e reserva."
              itens={contasFinanceiras}
            />
          </div>

          <div className="xl:col-span-1">
            <EstruturaCard
              titulo="Centros institucionais"
              descricao="Estrutura pensada para dar inteligência futura aos relatórios e comparativos."
              itens={centrosInstitucionais}
            />
          </div>
        </div>

        <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
                Expansão planejada com segurança
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
                O próximo passo natural desta nova camada é criar as páginas isoladas de
                lançamentos, relatórios, contas e categorias reais, sempre preservando a
                blindagem da estrutura já estável da loja.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/financeiro"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Voltar ao financeiro
              </Link>

              <Link
                href="/sistema"
                className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Ir para o sistema
              </Link>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-800">
            Sistema em constante atualização. Podem ocorrer instabilidades momentâneas durante melhorias.
          </div>
        </section>
      </div>
    </main>
  );
}