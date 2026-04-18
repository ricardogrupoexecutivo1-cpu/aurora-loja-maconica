import Link from "next/link";

type CentroInstitucional = {
  nome: string;
  perfil: "Administrativo" | "Solidário" | "Operacional" | "Patrimonial";
  finalidade: string;
  status: "Ativa" | "Base inicial" | "Expansão";
};

const centros: CentroInstitucional[] = [
  {
    nome: "Administração",
    perfil: "Administrativo",
    finalidade: "Centro principal para despesas operacionais, organização da rotina e gestão institucional da loja.",
    status: "Ativa",
  },
  {
    nome: "Solidariedade",
    perfil: "Solidário",
    finalidade: "Centro preparado para registrar entradas e saídas relacionadas ao Tronco de Solidariedade e ao apoio fraternal.",
    status: "Ativa",
  },
  {
    nome: "Eventos e sessões",
    perfil: "Operacional",
    finalidade: "Estrutura para custos e receitas ligados a sessões, encontros, eventos e atividades institucionais.",
    status: "Expansão",
  },
  {
    nome: "Patrimônio e manutenção",
    perfil: "Patrimonial",
    finalidade: "Leitura voltada à conservação, melhorias físicas, manutenção e proteção do patrimônio da loja.",
    status: "Expansão",
  },
];

function statusClasses(status: CentroInstitucional["status"]) {
  if (status === "Ativa") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (status === "Base inicial") {
    return "border-sky-200 bg-sky-50 text-sky-700";
  }

  return "border-amber-200 bg-amber-50 text-amber-700";
}

function perfilClasses(perfil: CentroInstitucional["perfil"]) {
  if (perfil === "Administrativo") {
    return "border-slate-200 bg-slate-100 text-slate-700";
  }

  if (perfil === "Solidário") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (perfil === "Operacional") {
    return "border-sky-200 bg-sky-50 text-sky-700";
  }

  return "border-violet-200 bg-violet-50 text-violet-700";
}

export default function FinanceiroCentrosPage() {
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
                  Centros institucionais do financeiro
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
                  Esta página isolada organiza a base dos centros institucionais da nova camada
                  premium. Aqui nós dois preparamos a leitura de finalidade, agrupamento e
                  inteligência administrativa antes da integração com o cadastro real.
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
                  href="/financeiro/estrutura"
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                >
                  Ver estrutura
                </Link>
              </div>
            </div>
          </div>

          <div className="grid gap-4 border-t border-slate-200 bg-white px-5 py-5 sm:grid-cols-2 xl:grid-cols-4 sm:px-8">
            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-slate-500">Centros previstos</p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">4</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Administração, solidariedade, eventos e patrimônio.
              </p>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-slate-500">Leitura gerencial</p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Premium</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Estrutura pensada para relatórios mais inteligentes e organizados.
              </p>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-slate-500">Blindagem</p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Total</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Página nova criada sem interferir na camada anterior já estável.
              </p>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-slate-500">Próxima fase</p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Integração</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Base pronta para filtros, agrupamentos e leitura real no futuro.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                  Base de centros institucionais
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
                  Esta lista organiza a finalidade administrativa de cada área do financeiro e
                  prepara o terreno para filtros, relatórios e comparativos mais inteligentes.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                Camada nova protegida
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {centros.map((centro) => (
                <div
                  key={centro.nome}
                  className="rounded-[24px] border border-slate-200 bg-slate-50 p-4 sm:p-5"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold text-slate-900">{centro.nome}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {centro.finalidade}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${perfilClasses(
                          centro.perfil
                        )}`}
                      >
                        {centro.perfil}
                      </span>

                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusClasses(
                          centro.status
                        )}`}
                      >
                        {centro.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <aside className="space-y-6">
            <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
                Diretriz institucional
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Esta estrutura foi pensada para separar melhor a finalidade de cada movimentação
                e dar visão administrativa mais madura para a loja.
              </p>

              <div className="mt-5 space-y-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">Administração</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Centro principal para despesas de rotina, funcionamento e organização institucional.
                  </p>
                </div>

                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                  <p className="text-sm font-semibold text-emerald-800">Solidariedade</p>
                  <p className="mt-1 text-sm leading-6 text-emerald-700">
                    Área preparada para Tronco de Solidariedade e ações fraternais com leitura própria.
                  </p>
                </div>

                <div className="rounded-2xl border border-violet-200 bg-violet-50 p-4">
                  <p className="text-sm font-semibold text-violet-800">Patrimônio</p>
                  <p className="mt-1 text-sm leading-6 text-violet-700">
                    Base pensada para manutenção, conservação e evolução física da loja.
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
                Próximas evoluções
              </h2>

              <div className="mt-4 space-y-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                  Tornar os centros editáveis por loja e não fixos no código.
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                  Relacionar centros ao formulário de lançamentos e aos relatórios por competência.
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                  Preparar filtros avançados por centro institucional, categoria e conta.
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/financeiro/contas"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Ver contas
                </Link>

                <Link
                  href="/financeiro/relatorios"
                  className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Ver relatórios
                </Link>
              </div>
            </section>
          </aside>
        </section>

        <section className="rounded-[28px] border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-800">
          Sistema em constante atualização. Podem ocorrer instabilidades momentâneas durante melhorias.
        </section>
      </div>
    </main>
  );
}