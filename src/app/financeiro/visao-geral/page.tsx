import Link from "next/link";

export const metadata = {
  title: "Visão geral do financeiro • Aurora Loja Maçônica",
  description:
    "Página isolada para organizar a leitura entre a base financeira já existente e a nova camada premium da Aurora Loja Maçônica.",
};

type BlocoResumoProps = {
  titulo: string;
  valor: string;
  descricao: string;
};

type CaminhoProps = {
  titulo: string;
  descricao: string;
  status: string;
  href?: string;
  destaque?: boolean;
};

function BlocoResumo({ titulo, valor, descricao }: BlocoResumoProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
        {titulo}
      </div>
      <div className="mt-3 text-3xl font-black tracking-tight text-slate-900">
        {valor}
      </div>
      <p className="mt-2 text-sm leading-6 text-slate-600">{descricao}</p>
    </div>
  );
}

function CaminhoCard({
  titulo,
  descricao,
  status,
  href,
  destaque = false,
}: CaminhoProps) {
  const statusClass =
    status === "Ativo"
      ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
      : status === "Em evolução"
        ? "bg-cyan-50 text-cyan-700 ring-1 ring-cyan-200"
        : "bg-amber-50 text-amber-700 ring-1 ring-amber-200";

  const conteudo = (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${statusClass}`}>
          {status}
        </span>
        {destaque ? (
          <span className="inline-flex rounded-full bg-slate-900 px-3 py-1 text-xs font-bold text-white">
            Camada estratégica
          </span>
        ) : null}
      </div>

      <h3 className="mt-3 text-lg font-black text-slate-900">{titulo}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{descricao}</p>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`block rounded-3xl border p-5 shadow-sm transition ${
          destaque
            ? "border-cyan-200 bg-cyan-50 hover:bg-cyan-100"
            : "border-slate-200 bg-white hover:bg-slate-50"
        }`}
      >
        {conteudo}
      </Link>
    );
  }

  return (
    <div
      className={`rounded-3xl border p-5 shadow-sm ${
        destaque ? "border-cyan-200 bg-cyan-50" : "border-slate-200 bg-white"
      }`}
    >
      {conteudo}
    </div>
  );
}

export default function FinanceiroVisaoGeralPage() {
  const novaCamada: CaminhoProps[] = [
    {
      titulo: "Financeiro institucional",
      descricao:
        "Painel premium da nova camada financeira, criado em página isolada para organizar a evolução sem mexer no que já estava estável.",
      status: "Ativo",
      href: "/financeiro",
      destaque: true,
    },
    {
      titulo: "Novo lançamento",
      descricao:
        "Fluxo isolado para preparar lançamentos financeiros com estrutura visual premium antes do salvamento real.",
      status: "Ativo",
      href: "/financeiro/novo",
    },
    {
      titulo: "Relatórios",
      descricao:
        "Leitura por competência e visão comparativa em página nova, pronta para evoluir com segurança.",
      status: "Ativo",
      href: "/financeiro/relatorios",
    },
    {
      titulo: "Centros institucionais",
      descricao:
        "Base nova para organizar centros de custo, contas e estrutura institucional do financeiro.",
      status: "Ativo",
      href: "/financeiro/centros",
    },
    {
      titulo: "Categorias financeiras",
      descricao:
        "Camada modular para organizar entradas, saídas e ajustes futuros sem bagunçar o fluxo principal.",
      status: "Ativo",
      href: "/financeiro/categorias",
    },
    {
      titulo: "Contas financeiras",
      descricao:
        "Área nova para leitura de contas, caixas e reservas, preparando evolução mais forte do módulo.",
      status: "Ativo",
      href: "/financeiro/contas",
    },
  ];

  const diretrizes: CaminhoProps[] = [
    {
      titulo: "Base financeira já existente",
      descricao:
        "O projeto já possui uma estrutura financeira anterior mais simples. Essa base deve ser respeitada, preservada e considerada em toda evolução futura.",
      status: "Ativo",
      destaque: true,
    },
    {
      titulo: "Nova camada premium",
      descricao:
        "A nova estrutura que estamos criando não substitui automaticamente a base anterior. Ela funciona como evolução premium, organizada e isolada.",
      status: "Em evolução",
      destaque: true,
    },
    {
      titulo: "Ponte futura",
      descricao:
        "Depois nós dois decidiremos com calma se a camada nova vai conviver com a base anterior, alimentar a base anterior ou se tornar a evolução oficial.",
      status: "Planejado",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-cyan-50 text-slate-900">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-cyan-100 bg-white/90 shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur">
          <div className="border-b border-slate-100 px-6 py-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyan-700">
                  Aurora Loja Maçônica
                </p>
                <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                  Visão geral do financeiro
                </h1>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
                  Página isolada criada para organizar a arquitetura do módulo
                  financeiro, separar a base anterior da nova camada premium e
                  evitar confusão conforme a plataforma crescer.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/financeiro"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  Voltar ao financeiro
                </Link>
                <Link
                  href="/sistema"
                  className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:opacity-90"
                >
                  Voltar ao sistema
                </Link>
              </div>
            </div>
          </div>

          <div className="grid gap-4 px-6 py-6 md:grid-cols-2 xl:grid-cols-4">
            <BlocoResumo
              titulo="Base anterior"
              valor="Preservada"
              descricao="A estrutura financeira já existente continua respeitada e considerada."
            />
            <BlocoResumo
              titulo="Nova camada"
              valor="6 áreas"
              descricao="Camadas novas isoladas já criadas para evolução premium do financeiro."
            />
            <BlocoResumo
              titulo="Estratégia"
              valor="Blindagem"
              descricao="Evolução modular sem mexer no que já estava estável."
            />
            <BlocoResumo
              titulo="Próximo nível"
              valor="Ponte futura"
              descricao="Preparação para integração inteligente no momento certo."
            />
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-700">
                  Diretriz estrutural
                </p>
                <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900">
                  Leitura correta do módulo
                </h2>
              </div>

              <div className="rounded-2xl bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800 ring-1 ring-amber-200">
                Sistema em constante atualização. Podem ocorrer instabilidades
                momentâneas durante melhorias.
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {diretrizes.map((item) => (
                <CaminhoCard
                  key={item.titulo}
                  titulo={item.titulo}
                  descricao={item.descricao}
                  status={item.status}
                  destaque={item.destaque}
                />
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-700">
              Nova camada financeira
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900">
              Acessos organizados da evolução premium
            </h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Abaixo estão os acessos da nova camada financeira que estamos
              estruturando de forma isolada, organizada e segura.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {novaCamada.map((item) => (
                <CaminhoCard
                  key={item.titulo}
                  titulo={item.titulo}
                  descricao={item.descricao}
                  status={item.status}
                  href={item.href}
                  destaque={item.destaque}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-cyan-200 bg-cyan-50 p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-700">
            Próxima inteligência
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-cyan-950">
            Esta página vira o mapa oficial do módulo
          </h2>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-cyan-900">
            Esta visão geral ajuda a manter clareza sobre o que já existia, o que
            está sendo criado agora e como o módulo pode evoluir no futuro sem
            gerar duplicidade, confusão ou perda de contexto. Ela também prepara
            o terreno para o tutorial completo da plataforma que faremos depois.
          </p>
        </div>
      </section>
    </main>
  );
}