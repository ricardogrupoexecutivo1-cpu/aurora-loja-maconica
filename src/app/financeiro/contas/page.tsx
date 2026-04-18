import Link from "next/link";

type ContaFinanceira = {
  nome: string;
  tipo: "Caixa" | "Banco" | "Reserva" | "Institucional";
  finalidade: string;
  status: "Ativa" | "Base inicial" | "Expansão";
};

const contas: ContaFinanceira[] = [
  {
    nome: "Caixa institucional",
    tipo: "Caixa",
    finalidade: "Conta base para movimentações presenciais, pequenas despesas e recebimentos controlados da loja.",
    status: "Ativa",
  },
  {
    nome: "Banco principal",
    tipo: "Banco",
    finalidade: "Conta bancária principal para entradas, saídas, conferência de saldo e rotina financeira institucional.",
    status: "Base inicial",
  },
  {
    nome: "Reserva institucional",
    tipo: "Reserva",
    finalidade: "Conta voltada à proteção financeira, planejamento futuro e preservação de recursos estratégicos da loja.",
    status: "Expansão",
  },
  {
    nome: "Tronco de Solidariedade",
    tipo: "Institucional",
    finalidade: "Conta preparada para leitura separada, transparente e institucional das contribuições solidárias.",
    status: "Expansão",
  },
];

function statusClasses(status: ContaFinanceira["status"]) {
  if (status === "Ativa") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (status === "Base inicial") {
    return "border-sky-200 bg-sky-50 text-sky-700";
  }

  return "border-amber-200 bg-amber-50 text-amber-700";
}

function tipoClasses(tipo: ContaFinanceira["tipo"]) {
  if (tipo === "Caixa") {
    return "border-slate-200 bg-slate-100 text-slate-700";
  }

  if (tipo === "Banco") {
    return "border-sky-200 bg-sky-50 text-sky-700";
  }

  if (tipo === "Reserva") {
    return "border-violet-200 bg-violet-50 text-violet-700";
  }

  return "border-emerald-200 bg-emerald-50 text-emerald-700";
}

export default function FinanceiroContasPage() {
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
                  Contas financeiras institucionais
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
                  Esta página isolada organiza a base das contas financeiras da nova camada
                  premium. Aqui nós dois preparamos a leitura de origem, destino, reserva e
                  transparência institucional antes de ligar a estrutura ao cadastro real.
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
              <p className="text-sm font-medium text-slate-500">Contas previstas</p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">4</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Caixa, banco, reserva e conta institucional separada.
              </p>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-slate-500">Leitura operacional</p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Clara</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Origem e destino preparados para relatórios e conferência.
              </p>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-slate-500">Blindagem</p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Total</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Camada nova criada sem alterar a base financeira já estável.
              </p>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-slate-500">Próxima fase</p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Integração</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Estrutura pronta para virar cadastro real e alimentar relatórios.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                  Base de contas
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
                  Esta lista organiza a leitura das contas institucionais e prepara o terreno
                  para lançamentos reais, relatórios consistentes e fechamento por competência.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                Camada nova protegida
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {contas.map((conta) => (
                <div
                  key={conta.nome}
                  className="rounded-[24px] border border-slate-200 bg-slate-50 p-4 sm:p-5"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold text-slate-900">{conta.nome}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {conta.finalidade}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${tipoClasses(
                          conta.tipo
                        )}`}
                      >
                        {conta.tipo}
                      </span>

                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusClasses(
                          conta.status
                        )}`}
                      >
                        {conta.status}
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
                Esta estrutura foi pensada para manter rastreabilidade, clareza e transparência
                no caminho do dinheiro dentro da loja.
              </p>

              <div className="mt-5 space-y-3">
                <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4">
                  <p className="text-sm font-semibold text-sky-800">Conta principal</p>
                  <p className="mt-1 text-sm leading-6 text-sky-700">
                    Banco principal preparado para rotina financeira, conferência e leitura futura por conta.
                  </p>
                </div>

                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                  <p className="text-sm font-semibold text-emerald-800">Conta institucional</p>
                  <p className="mt-1 text-sm leading-6 text-emerald-700">
                    Tronco de Solidariedade previsto com leitura separada para maior transparência.
                  </p>
                </div>

                <div className="rounded-2xl border border-violet-200 bg-violet-50 p-4">
                  <p className="text-sm font-semibold text-violet-800">Reserva protegida</p>
                  <p className="mt-1 text-sm leading-6 text-violet-700">
                    Estrutura preparada para segurança financeira e planejamento institucional.
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
                  Tornar as contas editáveis por loja, sem depender de estrutura fixa no código.
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                  Relacionar contas ao formulário de novo lançamento e aos relatórios por competência.
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                  Preparar leitura por conta bancária, caixa, reserva e conta institucional separada.
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