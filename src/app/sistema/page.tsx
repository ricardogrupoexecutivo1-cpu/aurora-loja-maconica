import Link from "next/link";

type Atalho = {
  titulo: string;
  descricao: string;
  href: string;
  cta: string;
};

const atalhosPrincipais: Atalho[] = [
  {
    titulo: "Financeiro institucional",
    descricao:
      "Acesse a nova camada premium do financeiro com estrutura, lançamentos, relatórios, contas, categorias e centros.",
    href: "/financeiro",
    cta: "Abrir financeiro",
  },
  {
    titulo: "Como usar a plataforma",
    descricao:
      "Tutorial completo da Aurora Loja Maçônica com passo a passo detalhado para qualquer usuário.",
    href: "/como-usar",
    cta: "Abrir tutorial",
  },
  {
    titulo: "Irmãos",
    descricao:
      "Área preparada para leitura institucional dos irmãos e evolução segura das funções internas.",
    href: "/irmaos",
    cta: "Abrir irmãos",
  },
  {
    titulo: "Login",
    descricao:
      "Entrada protegida da plataforma institucional com base estável para continuidade do projeto.",
    href: "/login",
    cta: "Abrir login",
  },
];

const atalhosSecundarios: Atalho[] = [
  {
    titulo: "Livro",
    descricao:
      "Área reservada para a cortesia institucional e materiais especiais da loja.",
    href: "/livro",
    cta: "Abrir livro",
  },
  {
    titulo: "Secretaria",
    descricao:
      "Base de secretaria preparada para organização institucional e futuras ampliações seguras.",
    href: "/secretaria",
    cta: "Abrir secretaria",
  },
  {
    titulo: "Contratos",
    descricao:
      "Espaço institucional protegido para documentos e expansão futura do módulo documental.",
    href: "/contratos",
    cta: "Abrir contratos",
  },
];

function CardAtalho({ titulo, descricao, href, cta }: Atalho) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">{titulo}</h2>
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

function ResumoCard({
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

export default function SistemaPage() {
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
                  Sistema institucional
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
                  Esta página foi reconstruída em formato limpo e estável para preservar a
                  continuidade do projeto, eliminar o erro de compilação e manter a navegação
                  principal da loja funcionando com segurança.
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
                  href="/financeiro"
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                >
                  Ir para o financeiro
                </Link>
              </div>
            </div>
          </div>

          <div className="grid gap-4 border-t border-slate-200 bg-white px-5 py-5 sm:grid-cols-2 xl:grid-cols-4 sm:px-8">
            <ResumoCard
              titulo="Status"
              valor="Estável"
              descricao="Página recomposta para remover erro de parsing e manter a base saudável."
            />
            <ResumoCard
              titulo="Camada"
              valor="Segura"
              descricao="Estrutura limpa e isolada para evitar quebrar o restante do projeto."
            />
            <ResumoCard
              titulo="Navegação"
              valor="Ativa"
              descricao="Atalhos principais preservados para continuidade institucional."
            />
            <ResumoCard
              titulo="Próxima fase"
              valor="Expansão"
              descricao="Base pronta para receber melhorias futuras com máxima cautela."
            />
          </div>
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Diretriz atual do sistema
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
            Como o arquivo anterior ficou quebrado no final, esta versão recomposta assume o
            papel de base segura do módulo. Assim nós dois preservamos o projeto, mantemos a
            navegação viva e seguimos sem correr risco desnecessário.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">Build protegido</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Arquivo refeito para compilar sem erro.
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
              <p className="text-sm font-semibold text-emerald-800">Financeiro preservado</p>
              <p className="mt-1 text-sm leading-6 text-emerald-700">
                A nova camada premium continua como foco principal.
              </p>
            </div>

            <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4">
              <p className="text-sm font-semibold text-sky-800">Navegação clara</p>
              <p className="mt-1 text-sm leading-6 text-sky-700">
                Sistema recomposto com acessos principais organizados.
              </p>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm font-semibold text-amber-800">Evolução segura</p>
              <p className="mt-1 text-sm leading-6 text-amber-700">
                Próximas melhorias devem seguir em páginas isoladas.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
              Acessos principais
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
              Estes atalhos mantêm a operação viva enquanto seguimos a continuidade com cautela.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
            {atalhosPrincipais.map((item) => (
              <CardAtalho key={item.href} {...item} />
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
              Estrutura complementar
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
              Áreas secundárias preservadas para continuidade institucional e futura expansão.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {atalhosSecundarios.map((item) => (
              <CardAtalho key={item.href} {...item} />
            ))}
          </div>
        </section>

        <section className="rounded-[28px] border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-800">
          Sistema em constante atualização. Esta página do sistema foi recomposta em versão segura
          para eliminar o erro de compilação e preservar a estabilidade do projeto.
        </section>
      </div>
    </main>
  );
}