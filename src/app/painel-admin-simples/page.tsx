"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type LojaItem = {
  id: string;
  nome: string;
  slug: string;
  cidade: string;
  estado: string;
  status: string;
};

type IrmaoItem = {
  id: string;
  loja_id: string;
  nome_completo: string;
  cpf: string;
  email: string;
  whatsapp: string;
  cargo: string;
  status: string;
  ativo: boolean;
  created_at: string;
};

function CardResumo({
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

function formatarCpf(cpf: string) {
  const numeros = (cpf || "").replace(/\D/g, "").slice(0, 11);

  return numeros
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2");
}

function formatarWhatsapp(whatsapp: string) {
  const numeros = (whatsapp || "").replace(/\D/g, "").slice(0, 11);

  if (!numeros) return "";

  if (numeros.length <= 10) {
    return numeros
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  }

  return numeros
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
}

function formatarData(data: string) {
  if (!data) return "Data não informada";

  const valor = new Date(data);

  if (Number.isNaN(valor.getTime())) {
    return "Data inválida";
  }

  return valor.toLocaleString("pt-BR");
}

export default function PainelAdminSimplesPage() {
  const [lojas, setLojas] = useState<LojaItem[]>([]);
  const [irmaos, setIrmaos] = useState<IrmaoItem[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [mensagemErro, setMensagemErro] = useState("");

  useEffect(() => {
    let ativo = true;

    async function carregarDados() {
      try {
        setCarregando(true);
        setMensagemErro("");

        const [resLojas, resIrmaos] = await Promise.all([
          fetch("/api/lojas/listar", { cache: "no-store" }),
          fetch("/api/irmaos/listar", { cache: "no-store" }),
        ]);

        const [dadosLojas, dadosIrmaos] = await Promise.all([
          resLojas.json(),
          resIrmaos.json(),
        ]);

        if (!resLojas.ok) {
          throw new Error(dadosLojas?.message || "Erro ao carregar lojas.");
        }

        if (!resIrmaos.ok) {
          throw new Error(dadosIrmaos?.message || "Erro ao carregar irmãos.");
        }

        if (!ativo) return;

        setLojas(Array.isArray(dadosLojas?.data) ? dadosLojas.data : []);
        setIrmaos(Array.isArray(dadosIrmaos?.data) ? dadosIrmaos.data : []);
      } catch (error) {
        console.error("ERRO AO CARREGAR PAINEL ADMIN SIMPLES:", error);

        if (!ativo) return;

        setMensagemErro(
          error instanceof Error
            ? error.message
            : "Erro inesperado ao carregar o painel admin simples."
        );
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    carregarDados();

    return () => {
      ativo = false;
    };
  }, []);

  const mapaLojas = useMemo(() => {
    return new Map(lojas.map((loja) => [loja.id, loja]));
  }, [lojas]);

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
                  Painel admin simples
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
                  Painel administrativo isolado de leitura para conferência rápida das lojas e dos
                  irmãos cadastrados nas camadas novas. Sem edição, sem interferência no sistema
                  principal e sem alterar a lógica protegida já existente.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  Voltar à home
                </Link>

                <Link
                  href="/cadastrar-loja"
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                >
                  Nova loja
                </Link>

                <Link
                  href="/cadastrar-irmao"
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                >
                  Novo irmão
                </Link>
              </div>
            </div>
          </div>

          <div className="grid gap-4 border-t border-slate-200 bg-white px-5 py-5 sm:grid-cols-2 xl:grid-cols-4 sm:px-8">
            <CardResumo
              titulo="Lojas"
              valor={String(lojas.length)}
              descricao="Total de lojas cadastradas em am_lojas."
            />
            <CardResumo
              titulo="Irmãos"
              valor={String(irmaos.length)}
              descricao="Total de irmãos cadastrados em am_irmaos."
            />
            <CardResumo
              titulo="Camada"
              valor="Isolada"
              descricao="Leitura administrativa sem mexer no sistema principal."
            />
            <CardResumo
              titulo="Modo"
              valor="Somente leitura"
              descricao="Painel seguro para conferência, sem edição nesta etapa."
            />
          </div>
        </section>

        {mensagemErro ? (
          <section className="rounded-[28px] border border-rose-200 bg-rose-50 p-4 text-sm leading-6 text-rose-800">
            {mensagemErro}
          </section>
        ) : null}

        {carregando ? (
          <section className="rounded-[28px] border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
            Carregando painel admin simples...
          </section>
        ) : (
          <>
            <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                Lojas cadastradas
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Leitura rápida das lojas salvas em am_lojas.
              </p>

              <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {lojas.length === 0 ? (
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                    Nenhuma loja cadastrada ainda.
                  </div>
                ) : (
                  lojas.map((loja) => (
                    <div
                      key={loja.id}
                      className="rounded-[24px] border border-slate-200 bg-slate-50 p-5"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Loja
                      </p>
                      <p className="mt-2 text-lg font-semibold text-slate-900">{loja.nome}</p>

                      <div className="mt-4 space-y-2 text-sm leading-6 text-slate-600">
                        <p>
                          <strong className="text-slate-800">Cidade/UF:</strong>{" "}
                          {loja.cidade || "Não informada"}/{loja.estado || "--"}
                        </p>
                        <p>
                          <strong className="text-slate-800">Status:</strong>{" "}
                          {loja.status || "sem status"}
                        </p>
                        <p>
                          <strong className="text-slate-800">Slug:</strong> {loja.slug || "--"}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                Irmãos cadastrados
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Leitura rápida dos irmãos salvos em am_irmaos com vínculo à loja real.
              </p>

              <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {irmaos.length === 0 ? (
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                    Nenhum irmão cadastrado ainda.
                  </div>
                ) : (
                  irmaos.map((irmao) => {
                    const loja = mapaLojas.get(irmao.loja_id);

                    return (
                      <div
                        key={irmao.id}
                        className="rounded-[24px] border border-slate-200 bg-slate-50 p-5"
                      >
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                          Irmão
                        </p>
                        <p className="mt-2 text-lg font-semibold text-slate-900">
                          {irmao.nome_completo}
                        </p>

                        <div className="mt-4 space-y-2 text-sm leading-6 text-slate-600">
                          <p>
                            <strong className="text-slate-800">CPF:</strong>{" "}
                            {formatarCpf(irmao.cpf) || "--"}
                          </p>
                          <p>
                            <strong className="text-slate-800">E-mail:</strong>{" "}
                            {irmao.email || "--"}
                          </p>
                          <p>
                            <strong className="text-slate-800">WhatsApp:</strong>{" "}
                            {formatarWhatsapp(irmao.whatsapp) || "--"}
                          </p>
                          <p>
                            <strong className="text-slate-800">Cargo:</strong>{" "}
                            {irmao.cargo || "--"}
                          </p>
                          <p>
                            <strong className="text-slate-800">Loja:</strong>{" "}
                            {loja?.nome || "Loja não encontrada"}
                          </p>
                          <p>
                            <strong className="text-slate-800">Status:</strong>{" "}
                            {irmao.status || "--"}
                          </p>
                          <p>
                            <strong className="text-slate-800">Criado em:</strong>{" "}
                            {formatarData(irmao.created_at)}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </section>
          </>
        )}

        <section className="rounded-[28px] border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-800">
          Sistema em constante atualização. Este painel é uma camada administrativa simples de
          leitura para conferência rápida das bases novas, sem impactar o restante do projeto.
        </section>
      </div>
    </main>
  );
}