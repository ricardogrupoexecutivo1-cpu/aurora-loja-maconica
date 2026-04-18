"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type LancamentoFinanceiro = {
  id: string;
  createdAt: string;
  tipo?: string;
  status?: string;
  descricao?: string;
  categoria?: string;
  conta?: string;
  centro?: string;
  competencia?: string;
  valor?: number;
  observacao?: string;
};

type ApiResponse = {
  success: boolean;
  total: number;
  items: LancamentoFinanceiro[];
  message?: string;
};

type ResumoCardProps = {
  titulo: string;
  valor: string;
  descricao: string;
};

type LinhaCompetencia = {
  competencia: string;
  entradas: number;
  saidas: number;
  saldo: number;
  totalLancamentos: number;
};

function normalizarCompetencia(valor?: string) {
  const texto = (valor || "").trim();
  return texto || "Sem competência";
}

function formatarMoeda(valor?: number) {
  const numero = typeof valor === "number" && Number.isFinite(valor) ? valor : 0;

  return numero.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function ResumoCard({ titulo, valor, descricao }: ResumoCardProps) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{titulo}</p>
      <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{valor}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">{descricao}</p>
    </div>
  );
}

export default function FinanceiroRelatoriosPage() {
  const [items, setItems] = useState<LancamentoFinanceiro[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<string>("");
  const [competenciaSelecionada, setCompetenciaSelecionada] = useState<string>("todas");

  async function carregarLancamentos() {
    try {
      setCarregando(true);
      setErro("");

      const resposta = await fetch("/api/financeiro/lancamentos", {
        cache: "no-store",
      });

      const dados = (await resposta.json()) as ApiResponse;

      if (!resposta.ok || !dados?.success) {
        throw new Error(dados?.message || "Não foi possível carregar os relatórios.");
      }

      setItems(Array.isArray(dados.items) ? dados.items : []);
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : "Ocorreu um erro ao carregar os relatórios financeiros."
      );
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    void carregarLancamentos();
  }, []);

  const competenciasDisponiveis = useMemo(() => {
    const unicas = Array.from(
      new Set(items.map((item) => normalizarCompetencia(item.competencia)))
    );

    return unicas.sort((a, b) => a.localeCompare(b, "pt-BR"));
  }, [items]);

  const itensFiltrados = useMemo(() => {
    if (competenciaSelecionada === "todas") {
      return items;
    }

    return items.filter(
      (item) => normalizarCompetencia(item.competencia) === competenciaSelecionada
    );
  }, [items, competenciaSelecionada]);

  const resumoAtual = useMemo(() => {
    const entradas = itensFiltrados
      .filter((item) => item.tipo === "Entrada")
      .reduce((acc, item) => acc + (item.valor || 0), 0);

    const saidas = itensFiltrados
      .filter((item) => item.tipo === "Saída")
      .reduce((acc, item) => acc + (item.valor || 0), 0);

    const ajustes = itensFiltrados
      .filter((item) => item.tipo === "Ajuste")
      .reduce((acc, item) => acc + (item.valor || 0), 0);

    return {
      entradas,
      saidas,
      ajustes,
      saldo: entradas - saidas,
      totalLancamentos: itensFiltrados.length,
    };
  }, [itensFiltrados]);

  const linhasCompetencia = useMemo<LinhaCompetencia[]>(() => {
    const mapa = new Map<string, LinhaCompetencia>();

    for (const item of items) {
      const competencia = normalizarCompetencia(item.competencia);

      if (!mapa.has(competencia)) {
        mapa.set(competencia, {
          competencia,
          entradas: 0,
          saidas: 0,
          saldo: 0,
          totalLancamentos: 0,
        });
      }

      const atual = mapa.get(competencia)!;
      const valor = item.valor || 0;

      atual.totalLancamentos += 1;

      if (item.tipo === "Entrada") {
        atual.entradas += valor;
      } else if (item.tipo === "Saída") {
        atual.saidas += valor;
      }

      atual.saldo = atual.entradas - atual.saidas;
    }

    return Array.from(mapa.values()).sort((a, b) =>
      a.competencia.localeCompare(b.competencia, "pt-BR")
    );
  }, [items]);

  const competenciaEmFoco =
    competenciaSelecionada === "todas"
      ? competenciasDisponiveis[0] || "Sem dados"
      : competenciaSelecionada;

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
                  Relatórios financeiros institucionais
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
                  Esta página isolada agora lê os lançamentos da API segura da camada premium,
                  permitindo validar entradas, saídas, saldo e leitura por competência, já
                  integrada ao Supabase com persistência real.
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
            <ResumoCard
              titulo="Competência em foco"
              valor={competenciaEmFoco}
              descricao="Leitura principal destacada conforme o filtro atual do relatório."
            />
            <ResumoCard
              titulo="Entradas"
              valor={formatarMoeda(resumoAtual.entradas)}
              descricao="Total real de entradas calculado a partir dos dados reais do financeiro institucional."
            />
            <ResumoCard
              titulo="Saídas"
              valor={formatarMoeda(resumoAtual.saidas)}
              descricao="Total real de saídas calculado a partir dos dados reais do financeiro institucional."
            />
            <ResumoCard
              titulo="Saldo"
              valor={formatarMoeda(resumoAtual.saldo)}
              descricao="Resultado atual considerando entradas e saídas da leitura filtrada."
            />
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                  Leitura por competência
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
                  Esta tabela agora mostra dados reais já gravados no Supabase da nova camada premium.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:items-end">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">
                    Filtrar competência
                  </span>
                  <select
                    value={competenciaSelecionada}
                    onChange={(event) => setCompetenciaSelecionada(event.target.value)}
                    className="w-full min-w-[220px] rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                  >
                    <option value="todas">Todas as competências</option>
                    {competenciasDisponiveis.map((competencia) => (
                      <option key={competencia} value={competencia}>
                        {competencia}
                      </option>
                    ))}
                  </select>
                </label>

                <button
                  type="button"
                  onClick={() => void carregarLancamentos()}
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Atualizar leitura
                </button>
              </div>
            </div>

            {erro ? (
              <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm leading-6 text-rose-800">
                {erro}
              </div>
            ) : null}

            {carregando ? (
              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                Carregando relatórios da base real do financeiro institucional...
              </div>
            ) : null}

            {!carregando && !erro && linhasCompetencia.length === 0 ? (
              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                Nenhum lançamento encontrado para compor os relatórios da base real do financeiro.
              </div>
            ) : null}

            {!carregando && !erro && linhasCompetencia.length > 0 ? (
              <div className="mt-6 overflow-hidden rounded-[24px] border border-slate-200">
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse">
                    <thead className="bg-slate-100">
                      <tr>
                        <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700">
                          Competência
                        </th>
                        <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700">
                          Entradas
                        </th>
                        <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700">
                          Saídas
                        </th>
                        <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700">
                          Saldo
                        </th>
                        <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700">
                          Lançamentos
                        </th>
                      </tr>
                    </thead>

                    <tbody className="bg-white">
                      {linhasCompetencia
                        .filter((linha) =>
                          competenciaSelecionada === "todas"
                            ? true
                            : linha.competencia === competenciaSelecionada
                        )
                        .map((linha) => (
                          <tr key={linha.competencia} className="border-t border-slate-200">
                            <td className="px-4 py-4 text-sm font-semibold text-slate-900">
                              {linha.competencia}
                            </td>
                            <td className="px-4 py-4 text-sm text-slate-700">
                              {formatarMoeda(linha.entradas)}
                            </td>
                            <td className="px-4 py-4 text-sm text-slate-700">
                              {formatarMoeda(linha.saidas)}
                            </td>
                            <td className="px-4 py-4 text-sm font-semibold text-slate-900">
                              {formatarMoeda(linha.saldo)}
                            </td>
                            <td className="px-4 py-4 text-sm text-slate-700">
                              {linha.totalLancamentos}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : null}
          </section>

          <aside className="space-y-6">
            <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
                Comparativo institucional
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Esta área agora reflete a base real do módulo, em vez de valores fixos.
              </p>

              <div className="mt-5 space-y-3">
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                  <p className="text-sm font-semibold text-emerald-800">Entradas atuais</p>
                  <p className="mt-1 text-sm leading-6 text-emerald-700">
                    {formatarMoeda(resumoAtual.entradas)} em entradas na leitura filtrada.
                  </p>
                </div>

                <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4">
                  <p className="text-sm font-semibold text-sky-800">Saídas atuais</p>
                  <p className="mt-1 text-sm leading-6 text-sky-700">
                    {formatarMoeda(resumoAtual.saidas)} em saídas na leitura filtrada.
                  </p>
                </div>

                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                  <p className="text-sm font-semibold text-amber-800">Ajustes / observação</p>
                  <p className="mt-1 text-sm leading-6 text-amber-700">
                    {formatarMoeda(resumoAtual.ajustes)} em lançamentos marcados como ajuste.
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
                  Relacionar filtros por categoria, conta, centro e status.
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                  Preparar exportação e visão anual quando a camada estiver validada por completo.
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                  Depois desta validação, evoluir fechamento por competência com máxima cautela.
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
                  href="/financeiro/lancamentos"
                  className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Ver lançamentos
                </Link>
              </div>
            </section>
          </aside>
        </section>

        <section className="rounded-[28px] border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-800">
          Sistema em constante atualização. Estes relatórios já leem a base real do financeiro institucional no Supabase.
        </section>
      </div>
    </main>
  );
}