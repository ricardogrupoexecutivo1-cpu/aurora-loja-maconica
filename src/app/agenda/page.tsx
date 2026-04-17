"use client";

import Link from "next/link";
import { useEffect } from "react";
import { protegerPagina } from "@/lib/auth-guard";

const EVENTOS = [
  {
    id: "1",
    titulo: "Reunião administrativa",
    data: "2026-04-20",
    horario: "19:30",
    local: "Templo principal",
    descricao:
      "Alinhamento institucional da loja com leitura protegida e organização interna.",
  },
  {
    id: "2",
    titulo: "Solenidade institucional",
    data: "2026-04-27",
    horario: "20:00",
    local: "Salão da loja",
    descricao:
      "Compromisso previsto na agenda institucional para os irmãos autorizados.",
  },
];

export default function AgendaPage() {
  useEffect(() => {
    protegerPagina();
  }, []);

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
                  Agenda institucional
                </h1>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-200 sm:text-base">
                  Agenda protegida para reuniões, solenidades, compromissos e
                  organização da rotina institucional da loja.
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
                  href="/como-usar"
                  className="rounded-2xl border border-emerald-300/30 bg-emerald-400/15 px-4 py-3 text-center text-sm font-semibold text-emerald-100 transition hover:bg-emerald-400/25"
                >
                  Como usar
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          {EVENTOS.map((evento) => (
            <article
              key={evento.id}
              className="rounded-[1.75rem] border border-slate-100 bg-white p-6 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
                Evento institucional
              </p>
              <h2 className="mt-2 text-xl font-bold text-slate-900">
                {evento.titulo}
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                {evento.data} • {evento.horario} • {evento.local}
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {evento.descricao}
              </p>
            </article>
          ))}
        </div>

        <footer className="rounded-[1.75rem] border border-slate-100 bg-white px-6 py-5 text-sm leading-6 text-slate-600 shadow-sm">
          Sistema em constante atualização. A agenda institucional permanece
          protegida e pronta para evolução segura.
        </footer>
      </section>
    </main>
  );
}