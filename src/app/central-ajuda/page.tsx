import Link from "next/link";

type CardAcaoProps = {
  titulo: string;
  descricao: string;
  href?: string;
  cta: string;
  ativo?: boolean;
};

type PassoProps = {
  numero: string;
  titulo: string;
  descricao: string;
  href: string;
  cta: string;
};

function CardAcao({
  titulo,
  descricao,
  href,
  cta,
  ativo = true,
}: CardAcaoProps) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">{titulo}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">{descricao}</p>

      <div className="mt-5">
        {ativo && href ? (
          <Link
            href={href}
            className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            {cta}
          </Link>
        ) : (
          <span className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-500">
            {cta}
          </span>
        )}
      </div>
    </div>
  );
}

function PassoCard({ numero, titulo, descricao, href, cta }: PassoProps) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
        {numero}
      </div>

      <h3 className="mt-4 text-lg font-semibold text-slate-900">{titulo}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{descricao}</p>

      <div className="mt-5">
        <Link
          href={href}
          className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          {cta}
        </Link>
      </div>
    </div>
  );
}

export default function CentralAjudaPage() {
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
                  Central de ajuda
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
                  Ajuda, tutorial e materiais oficiais da plataforma. Esta página foi criada em
                  camada isolada para concentrar o apoio ao usuário sem mexer no que já está no ar.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/sistema"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  Voltar ao sistema
                </Link>

                <Link
                  href="/como-usar"
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                >
                  Abrir tutorial interno
                </Link>
              </div>
            </div>
          </div>

          <div className="grid gap-4 border-t border-slate-200 bg-white px-5 py-5 sm:grid-cols-2 xl:grid-cols-4 sm:px-8">
            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-slate-500">Tutorial interno</p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Ativo</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Página pronta para orientar o uso correto da plataforma.
              </p>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-slate-500">PDFs para baixar</p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Preparado</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Área pronta para PDF completo e versão ilustrada no padrão da loja.
              </p>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-slate-500">Camada</p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Isolada</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Página criada no novo padrão para não quebrar nada existente.
              </p>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-slate-500">Objetivo</p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Clareza</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Reduzir dúvidas e facilitar uso sem depender do chat para cada passo.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <CardAcao
            titulo="Tutorial dentro da plataforma"
            descricao="Página de consulta rápida para entender a lógica do sistema, o fluxo do financeiro e o caminho correto de uso."
            href="/como-usar"
            cta="Abrir tutorial interno"
            ativo
          />

          <CardAcao
            titulo="PDF completo"
            descricao="Versão premium para leitura detalhada, envio, armazenamento no computador e impressão. Será ligado quando o PDF oficial for publicado no projeto."
            cta="PDF em preparação"
            ativo={false}
          />

          <CardAcao
            titulo="PDF com imagens"
            descricao="Versão ilustrada para facilitar entendimento visual do fluxo e apoiar treinamento de equipe. Preparado para futura publicação."
            cta="PDF ilustrado em preparação"
            ativo={false}
          />
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
              Caminho recomendado para novos usuários
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
              Este é o fluxo mais seguro para quem está conhecendo a plataforma agora.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-4">
            <PassoCard
              numero="1"
              titulo="Entender o sistema"
              descricao="Começar pela leitura da lógica geral, da navegação e da organização institucional."
              href="/sistema"
              cta="Abrir /sistema"
            />

            <PassoCard
              numero="2"
              titulo="Ler o tutorial"
              descricao="Consultar o passo a passo oficial antes de operar de verdade."
              href="/como-usar"
              cta="Abrir tutorial"
            />

            <PassoCard
              numero="3"
              titulo="Entrar no financeiro"
              descricao="Usar o hub do financeiro para escolher o caminho correto."
              href="/financeiro"
              cta="Abrir /financeiro"
            />

            <PassoCard
              numero="4"
              titulo="Conferir no painel"
              descricao="Depois de lançar algo, revisar tudo na leitura administrativa e nos relatórios."
              href="/financeiro/lancamentos"
              cta="Abrir lançamentos"
            />
          </div>
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Materiais ideais para cada situação
          </h2>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">Consulta rápida</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Use a página do tutorial interno para revisar o fluxo sem sair do sistema.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">Treinamento da equipe</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Use o tutorial interno agora e depois ligue o PDF completo e o PDF com imagens para apoio em grupo.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">Impressão ou cópia local</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                A estrutura já está pronta para receber materiais baixáveis no padrão da loja.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-[28px] border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-800">
          Sistema em constante atualização. Esta central foi criada para orientar o usuário com clareza,
          reduzir dúvidas e manter a evolução em camada nova, sem mexer no que já está em produção.
        </section>
      </div>
    </main>
  );
}