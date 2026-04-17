"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { protegerPagina } from "@/lib/auth-guard";

type Lancamento = {
  id: string;
  titulo: string;
  tipo: "entrada" | "saida";
  valor: number;
  categoria: string;
  conta: string;
  centroCusto: string;
  competencia: string;
  status: "pago" | "pendente" | "cancelado";
  descricao?: string;
};

const DADOS_INICIAIS: Lancamento[] = [
  {
    id: "1",
    titulo: "Mensalidade institucional",
    tipo: "entrada",
    valor: 210,
    categoria: "Mensalidade",
    conta: "Caixa Institucional",
    centroCusto: "Administrativo",
    competencia: "2026-04",
    status: "pago",
    descricao: "Base inicial de leitura institucional.",
  },
];

function moeda(valor: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}

export default function FinanceiroPage() {
  const [lancamentos] = useState<Lancamento[]>(DADOS_INICIAIS);

  useEffect(() => {
    protegerPagina();
  }, []);

  const entradas = useMemo(
    () =>
      lancamentos
        .filter((item) => item.tipo === "entrada" && item.status !== "cancelado")
        .reduce((acc, item) => acc + item.valor, 0),
    [lancamentos],
  );

  const saidas = useMemo(
    () =>
      lancamentos
        .filter((item) => item.tipo === "saida" && item.status !== "cancelado")
        .reduce((acc, item) => acc + item.valor, 0),
    [lancamentos],
  );

  const saldo = entradas - saidas;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.10),_transparent_28%),linear-gradient(to_bottom,_#f8fafc,_#ffffff,_#f0fdf4)] text-slate-900">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-emerald-100/80 bg-white shadow-[0_24px_70px_-34px_rgba(22,163,74,0.22)]">
          <div className="border-b border-emerald-100 bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-900 px-6 py-7 text-white">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-4xl">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-100">
                  Aurora Loja Maçônica
                </p>
                <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  Financeiro institucional
                </h1>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-200 sm:text-base">
                  Área financeira protegida para controle institucional,
                  lançamentos, leitura de saldo e organização administrativa com
                  padrão verde premium.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Link
                  href="/irmaos"
                  className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  Voltar à área interna
                </Link>
                <Link
                  href="/relatorios"
                  className="rounded-2xl border border-emerald-300/30 bg-emerald-400/15 px-4 py-3 text-center text-sm font-semibold text-emerald-100 transition hover:bg-emerald-400/25"
                >
                  Relatórios
                </Link>
              </div>
            </div>
          </div>

          <div className="grid gap-4 bg-gradient-to-b from-white to-slate-50/70 px-6 py-6 lg:grid-cols-3">
            <div className="rounded-[1.5rem] border border-emerald-100 bg-white p-5 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                Entradas
              </p>
              <h2 className="mt-3 text-lg font-bold text-slate-900">
                {moeda(entradas)}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Soma das entradas válidas da base financeira.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-emerald-100 bg-white p-5 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                Saídas
              </p>
              <h2 className="mt-3 text-lg font-bold text-slate-900">
                {moeda(saidas)}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Soma das saídas válidas da base financeira.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-emerald-100 bg-white p-5 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                Saldo
              </p>
              <h2 className="mt-3 text-lg font-bold text-slate-900">
                {moeda(saldo)}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Leitura consolidada da situação institucional atual.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-emerald-100 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
                Base financeira protegida
              </p>
              <h2 className="mt-2 text-xl font-bold text-slate-900">
                Lançamentos institucionais
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Esta área permanece protegida e preparada para crescer sem
                quebrar o padrão institucional já publicado.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4">
            {lancamentos.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-base font-bold text-slate-900">
                      {item.titulo}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      {item.categoria} • {item.conta} • {item.centroCusto}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      Competência: {item.competencia} • Status: {item.status}
                    </p>
                    {item.descricao ? (
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {item.descricao}
                      </p>
                    ) : null}
                  </div>

                  <div className="rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900">
                    {moeda(item.valor)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <footer className="rounded-[1.75rem] border border-slate-100 bg-white px-6 py-5 text-sm leading-6 text-slate-600 shadow-sm">
          Sistema em constante atualização. O financeiro institucional permanece
          protegido e pode evoluir depois sem comprometer a base existente.
        </footer>
      </section>
    </main>
  );
}