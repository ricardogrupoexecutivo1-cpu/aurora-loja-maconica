import Link from "next/link";

type CardResumoProps = {
  titulo: string;
  valor: string;
  descricao: string;
};

type AtalhoProps = {
  titulo: string;
  descricao: string;
  href: string;
  cta: string;
};

const atalhosPrincipais: AtalhoProps[] = [
  {
    titulo: "Estrutura do módulo",
    descricao:
      "Entenda a arquitetura oficial da nova camada premium com categorias, contas e centros institucionais.",
    href: "/financeiro/estrutura",
    cta: "Abrir estrutura",
  },
  {
    titulo: "Novo lançamento",
    descricao:
      "Acesse o formulário isolado já alinhado com categoria, conta e centro institucional.",
    href: "/financeiro/novo",
    cta: "Abrir lançamento",
  },
  {
    titulo: "Relatórios",
    descricao:
      "Veja a leitura por competência e a base real dos relatórios institucionais.",
    href: "/financeiro/relatorios",
    cta: "Abrir relatórios",
  },
  {
    titulo: "Lançamentos salvos",
    descricao:
      "Consulte a leitura administrativa dos lançamentos já gravados no Supabase da camada premium.",
    href: "/financeiro/lancamentos",
    cta: "Ver lançamentos",
  },
];

const atalhosEstruturais: AtalhoProps[] = [
  {
    titulo: "Categorias financeiras",
    descricao:
      "Organização das entradas, saídas e ajustes da nova camada financeira institucional.",
    href: "/financeiro/categorias",
    cta: "Ver categorias",
  },
  {
    titulo: "Contas financeiras",
    descricao:
      "Leitura de caixa, banco principal, reserva institucional e Tronco de Solidariedade.",
    href: "/financeiro/contas",
    cta: "Ver contas",
  },
  {
    titulo: "Centros institucionais",
    descricao:
      "Separação administrativa por finalidade para relatórios e comparativos mais inteligentes.",
    href: "/financeiro/centros",
    cta: "Ver centros",
  },
];

function CardResumo({ titulo, valor, descricao }: CardResumoProps) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{titulo}</p>
      <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{valor}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">{descricao}</p>
    </div>
  );
}

function CardAtalho({ titulo, descricao, href, cta }: AtalhoProps) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h3 className="text-lg font-semibold text-slate-900 sm:text-xl">{titulo}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">{descricao}</p>

      <div className="mt-5">
        <Link
          href={href}
          className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          {cta}
        </Link>
      </div>
    </div>
  );
}

export default function FinanceiroPage() {
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
                  Financeiro institucional
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
                  Leitura financeira clara, elegante e protegida para a loja. Esta área reúne a
                  base oficial da nova camada premium, criada em páginas isoladas e agora já
                  conectada ao Supabase real com segurança.
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
                  href="/financeiro/novo"
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                >
                  Novo lançamento
                </Link>
              </div>
            </div>
          </div>

          <div className="grid gap-4 border-t border-slate-200 bg-white px-5 py-5 sm:grid-cols-2 xl:grid-cols-4 sm:px-8">
            <CardResumo
              titulo="Base"
              valor="Real"
              descricao="A nova camada premium já grava e lê no Supabase com segurança."
            />
            <CardResumo
              titulo="Estrutura"
              valor="Completa"
              descricao="Categorias, contas, centros, lançamentos e relatórios já conectados."
            />
            <CardResumo
              titulo="Blindagem"
              valor="Mantida"
              descricao="Tudo foi criado em páginas novas para não mexer no que já estava estável."
            />
            <CardResumo
              titulo="Próxima fase"
              valor="Fechamento"
              descricao="Base pronta para evolução de competência, filtros e relatórios avançados."
            />
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
              Mapa oficial do módulo
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
              Como já existe uma base financeira anterior no projeto, esta área continua sendo o
              ponto oficial para entender e operar a nova camada premium que nós dois construímos
              com blindagem, estabilidade e persistência real.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">Leitura clara</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Estrutura visual premium para celular e computador, com foco em compreensão rápida.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">Páginas isoladas</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Módulo criado sem alterar a base já estável, respeitando a regra permanente do projeto.
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                <p className="text-sm font-semibold text-emerald-800">Base real conectada</p>
                <p className="mt-1 text-sm leading-6 text-emerald-700">
                  Lançamentos, leitura administrativa e relatórios já estão conectados ao Supabase.
                </p>
              </div>

              <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4">
                <p className="text-sm font-semibold text-sky-800">Diretriz institucional</p>
                <p className="mt-1 text-sm leading-6 text-sky-700">
                  Tronco de Solidariedade visível como entrada institucional e doações como saída própria.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
              Base pronta para operar
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Sistema em constante atualização. A nova organização do financeiro institucional já
              saiu da fase de simulação e entrou em base real, preservando a estabilidade do projeto.
            </p>

            <div className="mt-5 space-y-3">
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                <p className="text-sm font-semibold text-emerald-800">Entrada do Tronco</p>
                <p className="mt-1 text-sm leading-6 text-emerald-700">
                  A lógica do Tronco de Solidariedade já está pronta para uso como item financeiro institucional.
                </p>
              </div>

              <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4">
                <p className="text-sm font-semibold text-sky-800">Leitura administrativa</p>
                <p className="mt-1 text-sm leading-6 text-sky-700">
                  Os lançamentos gravados já podem ser conferidos em tela própria de leitura operacional.
                </p>
              </div>

              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                <p className="text-sm font-semibold text-amber-800">Próxima evolução</p>
                <p className="mt-1 text-sm leading-6 text-amber-700">
                  Fechamento por competência, filtros avançados e refinamento visual final.
                </p>
              </div>
            </div>
          </section>
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
              Acessos principais da nova camada
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
              Estes são os caminhos principais do módulo financeiro premium já organizados para navegação segura.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
            {atalhosPrincipais.map((atalho) => (
              <CardAtalho key={atalho.href} {...atalho} />
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
              Estrutura administrativa
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
              A base estrutural da nova camada já está separada entre categorias, contas e centros institucionais.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {atalhosEstruturais.map((atalho) => (
              <CardAtalho key={atalho.href} {...atalho} />
            ))}
          </div>
        </section>

        <section className="rounded-[28px] border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-800">
          Sistema em constante atualização. Podem ocorrer instabilidades momentâneas durante melhorias.
        </section>
      </div>
    </main>
  );
}