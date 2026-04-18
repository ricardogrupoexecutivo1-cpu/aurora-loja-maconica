"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const tiposLancamento = ["Entrada", "Saída", "Ajuste"] as const;
const statusLancamento = ["Pendente", "Recebido", "Pago", "Programado"] as const;

const categorias = [
  "Receitas recorrentes",
  "Contribuição institucional",
  "Operação da loja",
  "Ações institucionais",
  "Ajustes financeiros",
] as const;

const contas = [
  "Caixa institucional",
  "Banco principal",
  "Reserva institucional",
  "Tronco de Solidariedade",
] as const;

const centros = [
  "Administração",
  "Solidariedade",
  "Eventos e sessões",
  "Patrimônio e manutenção",
] as const;

function formatarMoeda(valor: string) {
  const apenasNumeros = valor.replace(/\D/g, "");

  if (!apenasNumeros) {
    return "R$ 0,00";
  }

  const numero = Number(apenasNumeros) / 100;

  return numero.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function converterValorParaNumero(valor: string) {
  const apenasNumeros = valor.replace(/\D/g, "");

  if (!apenasNumeros) {
    return 0;
  }

  return Number(apenasNumeros) / 100;
}

function Campo({
  titulo,
  children,
  descricao,
}: {
  titulo: string;
  children: React.ReactNode;
  descricao?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-800">{titulo}</span>
      {children}
      {descricao ? (
        <span className="mt-2 block text-xs leading-5 text-slate-500">{descricao}</span>
      ) : null}
    </label>
  );
}

function SelectPadrao({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  placeholder: string;
}) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
    >
      <option value="">{placeholder}</option>
      {options.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}

export default function FinanceiroNovoPage() {
  const [tipo, setTipo] = useState<string>("Entrada");
  const [status, setStatus] = useState<string>("Pendente");
  const [descricao, setDescricao] = useState<string>("");
  const [categoria, setCategoria] = useState<string>("");
  const [conta, setConta] = useState<string>("");
  const [centro, setCentro] = useState<string>("");
  const [competencia, setCompetencia] = useState<string>("Abril/2026");
  const [valor, setValor] = useState<string>("");
  const [observacao, setObservacao] = useState<string>("");
  const [mensagem, setMensagem] = useState<string>("");
  const [mensagemTipo, setMensagemTipo] = useState<"sucesso" | "erro" | "info">("info");
  const [salvando, setSalvando] = useState<boolean>(false);

  const valorFormatado = useMemo(() => formatarMoeda(valor), [valor]);

  function limparFormulario() {
    setTipo("Entrada");
    setStatus("Pendente");
    setDescricao("");
    setCategoria("");
    setConta("");
    setCentro("");
    setCompetencia("Abril/2026");
    setValor("");
    setObservacao("");
    setMensagem("");
    setMensagemTipo("info");
  }

  async function salvarLancamento() {
    setMensagem("");

    if (!descricao.trim()) {
      setMensagemTipo("erro");
      setMensagem("Informe o título do lançamento antes de salvar.");
      return;
    }

    if (!competencia.trim()) {
      setMensagemTipo("erro");
      setMensagem("Informe a competência do lançamento.");
      return;
    }

    try {
      setSalvando(true);

      const resposta = await fetch("/api/financeiro/lancamentos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tipo,
          status,
          descricao,
          categoria,
          conta,
          centro,
          competencia,
          valor: converterValorParaNumero(valor),
          observacao,
        }),
      });

      const dados = await resposta.json();

      if (!resposta.ok || !dados?.success) {
        const detalhes =
          typeof dados?.error === "string" && dados.error.trim()
            ? ` Detalhe: ${dados.error}`
            : "";

        throw new Error(
          (dados?.message || "Não foi possível salvar o lançamento.") + detalhes
        );
      }

      setMensagemTipo("sucesso");
      setMensagem("Lançamento salvo com sucesso no Supabase da camada premium do financeiro institucional.");
      setDescricao("");
      setCategoria("");
      setConta("");
      setCentro("");
      setValor("");
      setObservacao("");
    } catch (error) {
      setMensagemTipo("erro");
      setMensagem(
        error instanceof Error
          ? error.message
          : "Ocorreu um erro ao salvar o lançamento."
      );
      console.error("Erro ao salvar lançamento financeiro premium:", error);
    } finally {
      setSalvando(false);
    }
  }

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
                  Novo lançamento financeiro
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
                  Página criada em camada isolada para iniciar o fluxo de lançamento financeiro
                  sem tocar no que já está estável. Agora esta base já conversa visualmente com
                  categorias, contas e centros institucionais da nova arquitetura premium.
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
                  href="/financeiro/estrutura"
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                >
                  Ver estrutura
                </Link>
              </div>
            </div>
          </div>

          <div className="grid gap-4 border-t border-slate-200 bg-white px-5 py-5 sm:grid-cols-2 xl:grid-cols-4 sm:px-8">
            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-slate-500">Formulário</p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Ativo</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Fluxo visual e envio para a API isolada já funcionando em modo seguro.
              </p>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-slate-500">Estrutura ligada</p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">3 bases</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Categoria, conta e centro institucional já refletidos na experiência.
              </p>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-slate-500">Competência</p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Pronta</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Base preparada para fechamento e comparativo por período.
              </p>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-slate-500">Blindagem</p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Mantida</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Camada nova preservada, sem risco sobre o módulo anterior já estável.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                Registrar novo lançamento
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
                Estrutura pronta para receber entradas, saídas e ajustes em camada isolada. Agora
                o botão de salvar já envia para a API segura da nova camada premium, agora usando
                o Supabase real.
              </p>
            </div>

            {mensagem ? (
              <div
                className={`mb-5 rounded-2xl border p-4 text-sm leading-6 ${
                  mensagemTipo === "sucesso"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                    : mensagemTipo === "erro"
                    ? "border-rose-200 bg-rose-50 text-rose-800"
                    : "border-sky-200 bg-sky-50 text-sky-800"
                }`}
              >
                {mensagem}
              </div>
            ) : null}

            <form
              className="space-y-5"
              onSubmit={(event) => {
                event.preventDefault();
                void salvarLancamento();
              }}
            >
              <div className="grid gap-5 md:grid-cols-2">
                <Campo titulo="Tipo do lançamento">
                  <SelectPadrao
                    value={tipo}
                    onChange={setTipo}
                    options={tiposLancamento}
                    placeholder="Selecione o tipo"
                  />
                </Campo>

                <Campo titulo="Status inicial">
                  <SelectPadrao
                    value={status}
                    onChange={setStatus}
                    options={statusLancamento}
                    placeholder="Selecione o status"
                  />
                </Campo>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <Campo titulo="Título do lançamento">
                  <input
                    value={descricao}
                    onChange={(event) => setDescricao(event.target.value)}
                    type="text"
                    placeholder="Ex.: Mensalidade, despesa administrativa, doação, tronco..."
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                  />
                </Campo>

                <Campo titulo="Competência">
                  <input
                    value={competencia}
                    onChange={(event) => setCompetencia(event.target.value)}
                    type="text"
                    placeholder="Ex.: Abril/2026"
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                  />
                </Campo>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <Campo titulo="Categoria">
                  <SelectPadrao
                    value={categoria}
                    onChange={setCategoria}
                    options={categorias}
                    placeholder="Selecione a categoria"
                  />
                </Campo>

                <Campo titulo="Conta">
                  <SelectPadrao
                    value={conta}
                    onChange={setConta}
                    options={contas}
                    placeholder="Selecione a conta"
                  />
                </Campo>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <Campo titulo="Centro institucional">
                  <SelectPadrao
                    value={centro}
                    onChange={setCentro}
                    options={centros}
                    placeholder="Selecione o centro"
                  />
                </Campo>

                <Campo
                  titulo="Valor"
                  descricao="Digite apenas números se quiser. A prévia converte automaticamente para moeda."
                >
                  <input
                    value={valor}
                    onChange={(event) => setValor(event.target.value)}
                    type="text"
                    placeholder="Ex.: 125000"
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                  />
                </Campo>
              </div>

              <Campo titulo="Observação">
                <textarea
                  value={observacao}
                  onChange={(event) => setObservacao(event.target.value)}
                  rows={5}
                  placeholder="Detalhes adicionais, observações internas ou contexto do lançamento."
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                />
              </Campo>

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={salvando}
                  className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {salvando ? "Salvando..." : "Salvar lançamento"}
                </button>

                <button
                  type="button"
                  onClick={limparFormulario}
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Limpar formulário
                </button>
              </div>
            </form>
          </section>

          <aside className="space-y-6">
            <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
                Resumo visual
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Acompanhe a leitura imediata do lançamento antes da integração real com o banco.
              </p>

              <div className="mt-5 space-y-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Tipo
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-900">{tipo || "—"}</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Status
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-900">{status || "—"}</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Competência
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-900">
                    {competencia || "—"}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Valor
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-900">{valorFormatado}</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Categoria
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-900">
                    {categoria || "Não selecionada"}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Conta
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-900">
                    {conta || "Não selecionada"}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Centro institucional
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-900">
                    {centro || "Não selecionado"}
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
                Próximos passos seguros
              </h2>

              <div className="mt-4 space-y-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                  Conectar relatórios, leitura administrativa e fechamento por competência na mesma base real.
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                  Relacionar filtros por competência, categoria, conta e centro nos relatórios.
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                  Permitir histórico administrativo e fechamento por competência sem quebrar a base.
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/financeiro/categorias"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Ver categorias
                </Link>

                <Link
                  href="/financeiro/relatorios"
                  className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Ver relatórios
                </Link>
              </div>
            </section>
          </aside>
        </section>

        <section className="rounded-[28px] border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-800">
          Sistema em constante atualização. Esta página foi criada em camada nova para preservar a estabilidade do que já está em produção e preparar a próxima evolução com máxima cautela.
        </section>
      </div>
    </main>
  );
}