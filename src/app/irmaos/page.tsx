"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type LojaPayload = {
  id: string;
  slug: string | null;
  nome_loja: string | null;
  responsavel_nome: string | null;
  responsavel_email: string | null;
  responsavel_whatsapp: string | null;
  cidade: string | null;
  estado: string | null;
  mensagem_institucional: string | null;
  configuracao_concluida: boolean;
  status: string | null;
  plano: string | null;
  courtesy_expires_at: string | null;
};

type ApiResponse = {
  success: boolean;
  message?: string;
  loja?: LojaPayload | null;
};

type ReferenciaLocal = {
  lojaId: string | null;
  lojaSlug: string | null;
  lojaNome: string | null;
};

const STORAGE_KEYS = {
  lojaId: "aurora_loja_id",
  lojaSlug: "aurora_loja_slug",
  lojaNome: "aurora_loja_nome",
  lojaEmail: "aurora_loja_responsavel_email",
};

const LOJA_ID_FIXA = "36dbb2e4-d499-44d3-b3e1-313c0f41993e";

function lerReferenciaLocal(): ReferenciaLocal {
  if (typeof window === "undefined") {
    return {
      lojaId: null,
      lojaSlug: null,
      lojaNome: null,
    };
  }

  return {
    lojaId: window.localStorage.getItem(STORAGE_KEYS.lojaId),
    lojaSlug: window.localStorage.getItem(STORAGE_KEYS.lojaSlug),
    lojaNome: window.localStorage.getItem(STORAGE_KEYS.lojaNome),
  };
}

function salvarReferenciaLocal(loja: LojaPayload) {
  if (typeof window === "undefined") return;

  if (loja.id) {
    window.localStorage.setItem(STORAGE_KEYS.lojaId, loja.id);
  }

  if (loja.slug) {
    window.localStorage.setItem(STORAGE_KEYS.lojaSlug, loja.slug);
  }

  if (loja.nome_loja) {
    window.localStorage.setItem(STORAGE_KEYS.lojaNome, loja.nome_loja);
  }

  if (loja.responsavel_email) {
    window.localStorage.setItem(
      STORAGE_KEYS.lojaEmail,
      loja.responsavel_email,
    );
  }
}

function formatarPlano(plano: string | null | undefined) {
  if (!plano) return "Não definido";
  return plano.charAt(0).toUpperCase() + plano.slice(1).toLowerCase();
}

function formatarStatus(status: string | null | undefined) {
  if (!status) return "Em atualização";
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
}

function formatarValidade(data: string | null | undefined) {
  if (!data) return "Sem validade definida";

  const parsed = new Date(data);
  if (Number.isNaN(parsed.getTime())) return "Sem validade definida";

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "long",
  }).format(parsed);
}

function montarUrlBuscaLoja() {
  if (typeof window === "undefined") {
    return `/api/lojas/configurar?id=${LOJA_ID_FIXA}`;
  }

  const lojaId =
    window.localStorage.getItem(STORAGE_KEYS.lojaId) || LOJA_ID_FIXA;

  return `/api/lojas/configurar?id=${encodeURIComponent(lojaId)}`;
}

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
    <div className="rounded-[1.5rem] border border-emerald-100 bg-white p-5 shadow-sm">
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
        {titulo}
      </p>
      <h3 className="mt-3 text-lg font-bold text-slate-900">{valor}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{descricao}</p>
    </div>
  );
}

function CardArea({
  rotulo,
  titulo,
  descricao,
  href,
  cta,
}: {
  rotulo: string;
  titulo: string;
  descricao: string;
  href: string;
  cta: string;
}) {
  return (
    <article className="rounded-[1.75rem] border border-slate-100 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
        {rotulo}
      </p>
      <h3 className="mt-2 text-xl font-bold text-slate-900">{titulo}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{descricao}</p>
      <div className="mt-5">
        <Link
          href={href}
          className="inline-flex rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
        >
          {cta}
        </Link>
      </div>
    </article>
  );
}

export default function IrmaosHomePage() {
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [loja, setLoja] = useState<LojaPayload | null>(null);
  const [referenciaLocal, setReferenciaLocal] = useState<ReferenciaLocal>({
    lojaId: null,
    lojaSlug: null,
    lojaNome: null,
  });

  useEffect(() => {
    let ativo = true;

    async function carregar() {
      try {
        setCarregando(true);
        setErro(null);

        const referenciaInicial = lerReferenciaLocal();
        if (ativo) {
          setReferenciaLocal(referenciaInicial);
        }

        const response = await fetch(montarUrlBuscaLoja(), {
          method: "GET",
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Falha ao carregar a loja. Status: ${response.status}`);
        }

        const data = (await response.json()) as ApiResponse;

        if (!ativo) return;

        if (data.success && data.loja?.id) {
          setLoja(data.loja);
          salvarReferenciaLocal(data.loja);
          setReferenciaLocal({
            lojaId: data.loja.id ?? null,
            lojaSlug: data.loja.slug ?? null,
            lojaNome: data.loja.nome_loja ?? null,
          });
          return;
        }

        setLoja(null);
      } catch (error) {
        if (!ativo) return;

        const mensagem =
          error instanceof Error
            ? error.message
            : "Não foi possível carregar os dados da loja.";

        setErro(mensagem);
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    carregar();

    return () => {
      ativo = false;
    };
  }, []);

  const baseVinculada = useMemo(() => {
    return Boolean(loja?.id || referenciaLocal.lojaId);
  }, [loja?.id, referenciaLocal.lojaId]);

  const nomeExibicao = useMemo(() => {
    return loja?.nome_loja || referenciaLocal.lojaNome || "Loja Maçônica Aurora";
  }, [loja?.nome_loja, referenciaLocal.lojaNome]);

  const planoExibicao = useMemo(() => {
    return formatarPlano(loja?.plano);
  }, [loja?.plano]);

  const statusExibicao = useMemo(() => {
    return formatarStatus(loja?.status);
  }, [loja?.status]);

  const localizacaoExibicao = useMemo(() => {
    const cidade = loja?.cidade?.trim();
    const estado = loja?.estado?.trim();

    if (cidade && estado) return `${cidade} • ${estado}`;
    if (cidade) return cidade;
    if (estado) return estado;

    return "Uso interno com acesso controlado";
  }, [loja?.cidade, loja?.estado]);

  const validadeExibicao = useMemo(() => {
    if (loja?.courtesy_expires_at) {
      return `Cortesia válida até ${formatarValidade(loja.courtesy_expires_at)}`;
    }

    if ((loja?.plano || "").toLowerCase() === "premium") {
      return "Plano premium ativo no Supabase";
    }

    if ((loja?.status || "").toLowerCase() === "ativa") {
      return "Base ativa e pronta para evolução";
    }

    return "Status em atualização";
  }, [loja?.courtesy_expires_at, loja?.plano, loja?.status]);

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
                  Área interna da loja
                </h1>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-200 sm:text-base">
                  Sistema restrito da loja com acesso controlado, leitura
                  protegida, organização institucional e evolução segura em
                  padrão verde premium.
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-emerald-100">
                  <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5">
                    {nomeExibicao}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5">
                    {localizacaoExibicao}
                  </span>
                  <span className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1.5">
                    {planoExibicao}
                  </span>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Link
                  href="/"
                  className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  Home
                </Link>
                <Link
                  href="/planos"
                  className="rounded-2xl border border-emerald-300/30 bg-emerald-400/15 px-4 py-3 text-center text-sm font-semibold text-emerald-100 transition hover:bg-emerald-400/25"
                >
                  Planos
                </Link>
                <Link
                  href="/configurar-loja"
                  className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  Configurar loja
                </Link>
                <Link
                  href="/downloads"
                  className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  Downloads
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-b from-white to-slate-50/70 px-6 py-6">
            <div className="grid gap-4 lg:grid-cols-4">
              <CardResumo
                titulo="Loja vinculada"
                valor={nomeExibicao}
                descricao={
                  baseVinculada
                    ? "Base institucional vinculada com sucesso."
                    : "Aguardando vinculação da base institucional."
                }
              />

              <CardResumo
                titulo="Plano atual"
                valor={planoExibicao}
                descricao="Leitura refletida com base real do Supabase."
              />

              <CardResumo
                titulo="Status da loja"
                valor={statusExibicao}
                descricao={
                  loja?.configuracao_concluida
                    ? "Configuração concluída e ambiente pronto para uso."
                    : "Complete a configuração para consolidar a base."
                }
              />

              <CardResumo
                titulo="Validade / cortesia"
                valor="Base ativa"
                descricao={validadeExibicao}
              />
            </div>
          </div>
        </div>

        {carregando ? (
          <div className="rounded-[1.75rem] border border-emerald-100 bg-white px-5 py-4 text-sm text-slate-600 shadow-sm">
            Carregando leitura real da loja no Supabase...
          </div>
        ) : null}

        {erro ? (
          <div className="rounded-[1.75rem] border border-rose-100 bg-rose-50 px-5 py-4 text-sm text-rose-800 shadow-sm">
            <strong>Falha de leitura:</strong> {erro}
          </div>
        ) : null}

        {!carregando && !erro && baseVinculada ? (
          <div className="rounded-[1.75rem] border border-emerald-100 bg-white shadow-sm">
            <div className="border-b border-emerald-50 bg-gradient-to-r from-emerald-50 to-white px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
                Leitura geral da loja
              </p>
              <h2 className="mt-2 text-xl font-bold text-slate-900">
                {nomeExibicao}
              </h2>
            </div>

            <div className="grid gap-4 px-5 py-5 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.20em] text-slate-500">
                  Plano
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-900">
                  {planoExibicao}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.20em] text-slate-500">
                  Status
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-900">
                  {statusExibicao}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.20em] text-slate-500">
                  Acesso
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-900">
                  Liberado
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.20em] text-slate-500">
                  Perfil
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-900">
                  Uso interno protegido
                </p>
              </div>
            </div>
          </div>
        ) : null}

        {!carregando && !erro && !baseVinculada ? (
          <div className="rounded-[1.75rem] border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900 shadow-sm">
            <strong>Base local não vinculada:</strong> nenhuma referência da loja
            foi encontrada no navegador e a API não retornou uma loja válida.
            Complete a configuração inicial para vincular a base.
          </div>
        ) : null}

        <div className="grid gap-5 lg:grid-cols-2">
          <CardArea
            rotulo="Configuração institucional"
            titulo="Completar configuração"
            descricao="Complete os dados institucionais da loja para evoluir a base com segurança, manter a identidade protegida e preparar os próximos módulos com leitura premium."
            href="/configurar-loja"
            cta="Completar configuração"
          />

          <CardArea
            rotulo="Família e histórico"
            titulo="Cadastre familiares e preserve a memória institucional"
            descricao="Cadastre familiares, preserve memória institucional e mantenha a base organizada com leitura elegante no celular e no computador."
            href="/irmaos/familia"
            cta="Ir para família"
          />

          <CardArea
            rotulo="Documentos protegidos"
            titulo="Arquivos internos e materiais reservados"
            descricao="Acesse arquivos internos, downloads, registros e materiais reservados com acesso controlado e leitura institucional premium."
            href="/downloads"
            cta="Abrir área"
          />

          <CardArea
            rotulo="Agenda institucional"
            titulo="Reuniões, solenidades e compromissos"
            descricao="Organize reuniões, solenidades, aniversários e compromissos com leitura clara no celular e no computador."
            href="/agenda"
            cta="Abrir área"
          />
        </div>

        <div className="rounded-[1.75rem] border border-slate-100 bg-white px-6 py-5 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
                Organização da loja
              </p>
              <h3 className="mt-2 text-lg font-bold text-slate-900">
                Configurar minha loja
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Complete os dados institucionais da loja para evoluir a base com
                segurança, padrão premium e estrutura pronta para irmãos
                autorizados.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/configurar-loja"
                className="inline-flex rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                Abrir área
              </Link>
              <Link
                href="/cargos"
                className="inline-flex rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
              >
                Cargos
              </Link>
              <Link
                href="/financeiro"
                className="inline-flex rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
              >
                Financeiro
              </Link>
            </div>
          </div>
        </div>

        <footer className="rounded-[1.75rem] border border-slate-100 bg-white px-6 py-5 text-sm leading-6 text-slate-600 shadow-sm">
          Sistema em constante atualização. O painel agora pode refletir o plano
          e a validade reais da loja a partir do Supabase, mantendo a evolução
          institucional com estabilidade e leitura premium.
        </footer>
      </section>
    </main>
  );
}