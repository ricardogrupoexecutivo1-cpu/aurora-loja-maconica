import Link from "next/link";

type CategoriaFinanceira = {
  nome: string;
  tipo: "Entrada" | "Saída" | "Ajuste";
  finalidade: string;
  status: "Ativa" | "Base inicial" | "Expansão";
};

const categorias: CategoriaFinanceira[] = [
  {
    nome: "Receitas recorrentes",
    tipo: "Entrada",
    finalidade: "Mensalidades, contribuições frequentes e entradas institucionais previsíveis.",
    status: "Ativa",
  },
  {
    nome: "Contribuição institucional",
    tipo: "Entrada",
    finalidade: "Categoria preparada para o Tronco de Solidariedade e outras contribuições oficiais da loja.",
    status: "Ativa",
  },
  {
    nome: "Operação da loja",
    tipo: "Saída",
    finalidade: "Despesas administrativas, rotina interna e manutenção operacional.",
    status: "Ativa",
  },
  {
    nome: "Ações institucionais",
    tipo: "Saída",
    finalidade: "Saídas voltadas para doações, apoio fraternal e deliberações da loja.",
    status: "Ativa",
  },
  {
    nome: "Ajustes financeiros",
    tipo: "Ajuste",
    finalidade: "Correções internas, reclassificações e ajustes administrativos controlados.",
    status: "Expansão",
  },
];

function statusClasses(status: CategoriaFinanceira["status"]) {
  if (status === "Ativa") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (status === "Base inicial") {
    return "border-sky-200 bg-sky-50 text-sky-700";
  }

  return "border-amber-200 bg-amber-50 text-amber-700";
}

function tipoClasses(tipo: CategoriaFinanceira["tipo"]) {
  if (tipo === "Entrada") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (tipo === "Saída") {
    return "border-rose-200 bg-rose-50 text-rose-700";
  }

  return "border-slate-200 bg-slate-100 text-slate-700";
}

export default function FinanceiroCategoriasPage() {
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
                  Categorias financeiras institucionais
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
                  Esta página isolada organiza a base de categorias financeiras da nova camada
                  premium. Aqui nós dois preparamos a leitura institucional das entradas, saídas
                  e ajustes antes de ligar essa estrutura ao cadastro real.
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
              <p className="text-sm font-medium text-slate-500">Categorias-base</p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">5</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Estrutura inicial pronta para entradas, saídas e ajustes.
              </p>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-slate-500">Entradas</p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">2</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Categorias voltadas para receitas oficiais da loja.
              </p>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-slate-500">Saídas</p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">2</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Estrutura inicial para despesas e ações institucionais.
              </p>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-slate-500">Ajustes</p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">1</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Leitura preparada para correções e reclassificações futuras.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                  Base de categorias
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
                  Esta lista inicial organiza a lógica do financeiro institucional e prepara a
                  evolução para cadastro real editável por loja.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                Camada nova protegida
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {categorias.map((categoria) => (
                <div
                  key={categoria.nome}
                  className="rounded-[24px] border border-slate-200 bg-slate-50 p-4 sm:p-5"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold text-slate-900">{categoria.nome}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {categoria.finalidade}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${tipoClasses(
                          categoria.tipo
                        )}`}
                      >
                        {categoria.tipo}
                      </span>

                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusClasses(
                          categoria.status
                        )}`}
                      >
                        {categoria.status}
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
                Esta base foi organizada para manter clareza financeira, leitura séria e
                possibilidade de crescimento sem retrabalho.
              </p>

              <div className="mt-5 space-y-3">
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                  <p className="text-sm font-semibold text-emerald-800">Entradas oficiais</p>
                  <p className="mt-1 text-sm leading-6 text-emerald-700">
                    Mensalidades e Tronco de Solidariedade ficam organizados como receitas institucionais.
                  </p>
                </div>

                <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4">
                  <p className="text-sm font-semibold text-rose-800">Saídas claras</p>
                  <p className="mt-1 text-sm leading-6 text-rose-700">
                    Operação da loja e doações permanecem separadas para transparência administrativa.
                  </p>
                </div>

                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                  <p className="text-sm font-semibold text-amber-800">Expansão segura</p>
                  <p className="mt-1 text-sm leading-6 text-amber-700">
                    A categoria de ajustes já prepara correções futuras sem bagunçar a leitura principal.
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
                  Tornar a lista editável por loja, sem hardcode fixo.
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                  Relacionar categorias ao formulário de novo lançamento.
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                  Preparar filtros e relatórios por categoria no momento da integração real.
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/financeiro/novo"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Novo lançamento
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