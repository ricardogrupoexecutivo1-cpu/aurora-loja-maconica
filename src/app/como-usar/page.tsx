import Link from "next/link";

type BlocoProps = {
  titulo: string;
  children: React.ReactNode;
};

function Bloco({ titulo, children }: BlocoProps) {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
        {titulo}
      </h2>
      <div className="mt-3 space-y-3 text-sm leading-7 text-slate-700 sm:text-base">
        {children}
      </div>
    </section>
  );
}

function Item({
  titulo,
  descricao,
}: {
  titulo: string;
  descricao: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-sm font-semibold text-slate-900">{titulo}</p>
      <p className="mt-1 text-sm leading-6 text-slate-600">{descricao}</p>
    </div>
  );
}

export default function ComoUsarPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-sky-50/40 text-slate-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-sky-900 px-5 py-8 text-white sm:px-8 sm:py-10">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-100">
                  Aurora Loja Maçônica
                </span>

                <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                  Tutorial completo da plataforma
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
                  Guia operacional completo da Aurora Loja Maçônica, criado para permitir uso
                  claro, seguro e autônomo da plataforma, mesmo por usuários sem experiência.
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
                  href="/financeiro"
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                >
                  Ir para o financeiro
                </Link>
              </div>
            </div>
          </div>

          <div className="grid gap-4 border-t border-slate-200 bg-white px-5 py-5 sm:grid-cols-2 xl:grid-cols-4 sm:px-8">
            <Item
              titulo="Objetivo"
              descricao="Permitir que qualquer pessoa use a plataforma com segurança e clareza."
            />
            <Item
              titulo="Perfil"
              descricao="Guia pensado para leigos, equipe administrativa e responsáveis da loja."
            />
            <Item
              titulo="Estrutura"
              descricao="Navegação organizada por sistema, financeiro, áreas internas e apoio."
            />
            <Item
              titulo="Próxima fase"
              descricao="Base pronta para PDF premium, onboarding e materiais de treinamento."
            />
          </div>
        </section>

        <Bloco titulo="1. Como entrar na plataforma">
          <p>
            O caminho principal para começar é sempre a página do sistema:
          </p>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 font-semibold text-slate-900">
            /sistema
          </div>
          <p>
            A partir dela, o usuário encontra os botões principais para navegar com segurança
            pelas áreas da loja.
          </p>
        </Bloco>

        <Bloco titulo="2. O que a plataforma organiza">
          <div className="grid gap-3 sm:grid-cols-2">
            <Item
              titulo="Financeiro"
              descricao="Entradas, saídas, relatórios, lançamentos, contas, categorias e centros."
            />
            <Item
              titulo="Irmãos"
              descricao="Leitura institucional e organização das áreas internas dos membros."
            />
            <Item
              titulo="Secretaria"
              descricao="Base preparada para registros, apoio administrativo e evolução segura."
            />
            <Item
              titulo="Contratos"
              descricao="Área documental protegida para materiais internos e registros importantes."
            />
            <Item
              titulo="Livro"
              descricao="Espaço reservado para materiais especiais e cortesia institucional."
            />
            <Item
              titulo="Sistema"
              descricao="Central de navegação e entendimento da estrutura atual da plataforma."
            />
          </div>
        </Bloco>

        <Bloco titulo="3. Fluxo financeiro completo">
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">Passo 1 — abrir o hub</p>
              <p className="mt-1 text-slate-600">Acesse <strong>/financeiro</strong>.</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">Passo 2 — criar lançamento</p>
              <p className="mt-1 text-slate-600">
                Entre em <strong>/financeiro/novo</strong> para registrar uma entrada, saída ou ajuste.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">Passo 3 — conferir leitura administrativa</p>
              <p className="mt-1 text-slate-600">
                Veja o que foi salvo em <strong>/financeiro/lancamentos</strong>.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">Passo 4 — ver o reflexo no relatório</p>
              <p className="mt-1 text-slate-600">
                Analise resultados em <strong>/financeiro/relatorios</strong>.
              </p>
            </div>
          </div>
        </Bloco>

        <Bloco titulo="4. Como preencher um lançamento financeiro">
          <div className="grid gap-3 sm:grid-cols-2">
            <Item
              titulo="Tipo"
              descricao="Use Entrada quando o dinheiro entra, Saída quando o dinheiro sai, Ajuste para correções."
            />
            <Item
              titulo="Status"
              descricao="Use Pendente, Recebido, Pago ou Programado conforme a situação do lançamento."
            />
            <Item
              titulo="Título"
              descricao="Descreva com clareza: ex. Tronco de Solidariedade, Mensalidade, Despesa administrativa."
            />
            <Item
              titulo="Competência"
              descricao="Use o padrão mês/ano, como Abril/2026."
            />
            <Item
              titulo="Categoria"
              descricao="Escolha a classificação correta do lançamento."
            />
            <Item
              titulo="Conta"
              descricao="Indique a conta correta, como Banco principal, Caixa ou Tronco."
            />
            <Item
              titulo="Centro institucional"
              descricao="Marque a finalidade administrativa correta, como Solidariedade ou Administração."
            />
            <Item
              titulo="Valor"
              descricao="Digite só números: 32000 = R$ 320,00."
            />
          </div>
        </Bloco>

        <Bloco titulo="5. Lógica institucional importante">
          <div className="grid gap-3 sm:grid-cols-2">
            <Item
              titulo="Tronco de Solidariedade"
              descricao="Deve ser tratado como Entrada, usando categoria de contribuição institucional quando aplicável."
            />
            <Item
              titulo="Doações"
              descricao="Devem ser tratadas como Saída, mantendo leitura clara e coerente nos relatórios."
            />
          </div>
        </Bloco>

        <Bloco titulo="6. Como conferir se o sistema está certo">
          <ol className="list-decimal space-y-2 pl-5">
            <li>Acesse <strong>/financeiro/novo</strong> e salve um lançamento de teste.</li>
            <li>Abra <strong>/financeiro/lancamentos</strong> e veja se ele apareceu.</li>
            <li>Abra <strong>/financeiro/relatorios</strong> e confirme se o valor entrou no saldo.</li>
            <li>Volte ao <strong>/financeiro</strong> para navegar pelas áreas com segurança.</li>
          </ol>
        </Bloco>

        <Bloco titulo="7. Erros comuns a evitar">
          <div className="grid gap-3 sm:grid-cols-2">
            <Item
              titulo="Entrada lançada como saída"
              descricao="Isso distorce saldo e relatório."
            />
            <Item
              titulo="Competência errada"
              descricao="Isso prejudica organização mensal e fechamento futuro."
            />
            <Item
              titulo="Valor sem revisão"
              descricao="Digite sempre com atenção, pois 32000 = R$ 320,00."
            />
            <Item
              titulo="Categoria incorreta"
              descricao="A categoria errada afeta a leitura gerencial depois."
            />
          </div>
        </Bloco>

        <Bloco titulo="8. Rotina operacional recomendada">
          <div className="space-y-3">
            <Item
              titulo="Início do dia"
              descricao="Abrir /sistema, entrar no financeiro e conferir se a navegação e os relatórios estão carregando."
            />
            <Item
              titulo="Durante o dia"
              descricao="Registrar cada movimentação em /financeiro/novo e conferir em /financeiro/lancamentos."
            />
            <Item
              titulo="Final do dia"
              descricao="Revisar /financeiro/relatorios e validar se o saldo e a competência fazem sentido."
            />
          </div>
        </Bloco>

        <Bloco titulo="9. Mapa rápido de páginas">
          <div className="grid gap-3 sm:grid-cols-2">
            <Item titulo="/sistema" descricao="Central da plataforma." />
            <Item titulo="/financeiro" descricao="Hub do financeiro premium." />
            <Item titulo="/financeiro/novo" descricao="Novo lançamento." />
            <Item titulo="/financeiro/lancamentos" descricao="Leitura administrativa." />
            <Item titulo="/financeiro/relatorios" descricao="Relatórios reais." />
            <Item titulo="/financeiro/estrutura" descricao="Arquitetura do módulo." />
            <Item title="/financeiro/categorias" descricao="Categorias financeiras." />
            <Item titulo="/financeiro/contas" descricao="Contas financeiras." />
            <Item titulo="/financeiro/centros" descricao="Centros institucionais." />
          </div>
        </Bloco>

        <Bloco titulo="10. Resumo final">
          <p>
            A lógica correta de uso da plataforma é:
          </p>
          <ol className="list-decimal space-y-2 pl-5">
            <li>Entrar por <strong>/sistema</strong>.</li>
            <li>Abrir <strong>/financeiro</strong>.</li>
            <li>Registrar em <strong>/financeiro/novo</strong>.</li>
            <li>Conferir em <strong>/financeiro/lancamentos</strong>.</li>
            <li>Analisar em <strong>/financeiro/relatorios</strong>.</li>
          </ol>
          <p className="pt-2 font-semibold text-slate-900">
            Primeiro acessamos o sistema, depois registramos corretamente, conferimos na leitura administrativa e acompanhamos nos relatórios sem mexer no que já está estável.
          </p>
        </Bloco>

        <section className="rounded-[28px] border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-800">
          Sistema em constante atualização. Este tutorial foi criado para facilitar o uso da plataforma
          por qualquer pessoa, com clareza e máxima segurança.
        </section>
      </div>
    </main>
  );
}