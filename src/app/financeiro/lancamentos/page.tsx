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

function formatarMoeda(valor?: number) {
  const numero = typeof valor === "number" && Number.isFinite(valor) ? valor : 0;

  return numero.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function formatarData(dataIso?: string) {
  if (!dataIso) {
    return "—";
  }

  const data = new Date(dataIso);

  if (Number.isNaN(data.getTime())) {
    return "—";
  }

  return data.toLocaleString("pt-BR");
}

function badgeTipoClasses(tipo?: string) {
  if (tipo === "Entrada") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (tipo === "Saída") {
    return "border-rose-200 bg-rose-50 text-rose-700";
  }

  return "border-slate-200 bg-slate-100 text-slate-700";
}

function badgeStatusClasses(status?: string) {
  if (status === "Recebido" || status === "Pago") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (status === "Pendente" || status === "Programado") {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }

  return "border-slate-200 bg-slate-100 text-slate-700";
}

export default function FinanceiroLancamentosPage() {
  const [items, setItems] = useState<LancamentoFinanceiro[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<string>("");

  async function carregarLancamentos() {
    try {
      setCarregando(true);
      setErro("");

      const resposta = await fetch("/api/financeiro/lancamentos", {
        cache: "no-store",
      });

      const dados = (await resposta.json()) as ApiResponse;

      if (!resposta.ok || !dados?.success) {
        throw new Error(dados?.message || "Não foi possível carregar os lançamentos.");
      }

      setItems(Array.isArray(dados.items) ? dados.items : []);
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : "Ocorreu um erro ao carregar os lançamentos."
      );
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    void carregarLancamentos();
  }, []);

  const resumo = useMemo(() => {
    const total = items.length;
    const entradas = items.filter((item) => item.tipo === "Entrada").length;
    const saidas = items.filter((item) => item.tipo === "Saída").length;
    const valorTotal = items.reduce((acc, item) => acc + (item.valor || 0), 0);

    return {
      total,
      entradas,
      saidas,
      valorTotal,
    };
  }, [items]);

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
                  Lançamentos da camada premium
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
                  Esta página isolada mostra a leitura administrativa dos lançamentos já gravados
                  na base real do financeiro premium no Supabase. Aqui nós dois validamos o fluxo
                  real já conectado ao banco.
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
                  href="/financeiro/novo"
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                >
                  Novo lançamento
                </Link>
              </div>
            </div>
          </div>

          <div className="grid gap-4 border-t border-slate-200 bg-white px-5 py-5 sm:grid-cols-2 xl:grid-cols-4 sm:px-8">
            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-slate-500">Total salvo</p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                {resumo.total}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Quantidade de lançamentos reais já gravados na base segura do financeiro premium.
              </p>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-slate-500">Entradas</p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                {resumo.entradas}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Lançamentos classificados como entrada nesta leitura administrativa.
              </p>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-slate-500">Saídas</p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                {resumo.saidas}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Lançamentos classificados como saída dentro da base real do módulo.
              </p>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-slate-500">Valor acumulado</p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                {formatarMoeda(resumo.valorTotal)}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Soma simples dos lançamentos reais já salvos para validar a operação.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                Leitura administrativa
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
                Aqui ficam os lançamentos já gravados no Supabase da nova camada premium.
              </p>
            </div>

            <button
              type="button"
              onClick={() => void carregarLancamentos()}
              className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Atualizar leitura
            </button>
          </div>

          {erro ? (
            <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm leading-6 text-rose-800">
              {erro}
            </div>
          ) : null}

          {carregando ? (
            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
              Carregando lançamentos da base real do financeiro premium...
            </div>
          ) : null}

          {!carregando && !erro && items.length === 0 ? (
            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
              Nenhum lançamento encontrado na base real do financeiro premium até o momento.
            </div>
          ) : null}

          {!carregando && !erro && items.length > 0 ? (
            <div className="mt-6 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-[24px] border border-slate-200 bg-slate-50 p-4 sm:p-5"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap gap-2">
                        <span
                          className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${badgeTipoClasses(
                            item.tipo
                          )}`}
                        >
                          {item.tipo || "Sem tipo"}
                        </span>

                        <span
                          className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${badgeStatusClasses(
                            item.status
                          )}`}
                        >
                          {item.status || "Sem status"}
                        </span>
                      </div>

                      <h3 className="mt-3 text-lg font-semibold text-slate-900">
                        {item.descricao || "Lançamento sem descrição"}
                      </h3>

                      <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                        <div className="rounded-2xl border border-slate-200 bg-white p-3">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                            Competência
                          </p>
                          <p className="mt-2 text-sm font-semibold text-slate-900">
                            {item.competencia || "—"}
                          </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-3">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                            Categoria
                          </p>
                          <p className="mt-2 text-sm font-semibold text-slate-900">
                            {item.categoria || "—"}
                          </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-3">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                            Conta
                          </p>
                          <p className="mt-2 text-sm font-semibold text-slate-900">
                            {item.conta || "—"}
                          </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-3">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                            Centro
                          </p>
                          <p className="mt-2 text-sm font-semibold text-slate-900">
                            {item.centro || "—"}
                          </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-3">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                            Valor
                          </p>
                          <p className="mt-2 text-sm font-semibold text-slate-900">
                            {formatarMoeda(item.valor)}
                          </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-3">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                            Criado em
                          </p>
                          <p className="mt-2 text-sm font-semibold text-slate-900">
                            {formatarData(item.createdAt)}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                          Observação
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-700">
                          {item.observacao || "Sem observação registrada."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </section>

        <section className="rounded-[28px] border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-800">
          Sistema em constante atualização. Esta leitura administrativa já usa a base real do financeiro premium no Supabase.
        </section>
      </div>
    </main>
  );
}