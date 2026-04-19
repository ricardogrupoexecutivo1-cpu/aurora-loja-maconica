"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type LojaOpcao = {
  id: string;
  nome: string;
  slug: string;
  cidade: string;
  estado: string;
  status: string;
};

function formatarCpf(valor: string) {
  const numeros = valor.replace(/\D/g, "").slice(0, 11);

  return numeros
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2");
}

function formatarWhatsapp(valor: string) {
  const numeros = valor.replace(/\D/g, "").slice(0, 11);

  if (numeros.length <= 10) {
    return numeros
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  }

  return numeros
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
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
    <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{titulo}</p>
      <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{valor}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">{descricao}</p>
    </div>
  );
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

export default function CadastrarIrmaoPage() {
  const [cpf, setCpf] = useState("");
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [cargo, setCargo] = useState("");
  const [buscaLoja, setBuscaLoja] = useState("");
  const [lojaSelecionadaId, setLojaSelecionadaId] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [mensagemTipo, setMensagemTipo] = useState<"sucesso" | "erro" | "info">("info");
  const [lojas, setLojas] = useState<LojaOpcao[]>([]);
  const [carregandoLojas, setCarregandoLojas] = useState(true);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    let ativo = true;

    async function carregarLojas() {
      try {
        setCarregandoLojas(true);

        const resposta = await fetch("/api/lojas/listar", {
          method: "GET",
          cache: "no-store",
        });

        const data = await resposta.json();

        if (!resposta.ok) {
          throw new Error(data?.message || "Erro ao carregar lojas.");
        }

        if (!ativo) return;

        setLojas(Array.isArray(data?.data) ? data.data : []);
      } catch (error) {
        console.error("ERRO AO CARREGAR /api/lojas/listar:", error);

        if (!ativo) return;

        setMensagemTipo("erro");
        setMensagem("Não foi possível carregar as lojas reais no momento.");
        setLojas([]);
      } finally {
        if (ativo) {
          setCarregandoLojas(false);
        }
      }
    }

    carregarLojas();

    return () => {
      ativo = false;
    };
  }, []);

  const lojasFiltradas = useMemo(() => {
    const termo = buscaLoja.trim().toLowerCase();

    if (!termo) {
      return lojas;
    }

    return lojas.filter((loja) => {
      return (
        loja.nome.toLowerCase().includes(termo) ||
        loja.slug.toLowerCase().includes(termo) ||
        loja.cidade.toLowerCase().includes(termo) ||
        loja.estado.toLowerCase().includes(termo)
      );
    });
  }, [buscaLoja, lojas]);

  const lojaSelecionada = useMemo(() => {
    return lojas.find((loja) => loja.id === lojaSelecionadaId) || null;
  }, [lojas, lojaSelecionadaId]);

  function limparFormulario() {
    setCpf("");
    setNomeCompleto("");
    setEmail("");
    setWhatsapp("");
    setCargo("");
    setBuscaLoja("");
    setLojaSelecionadaId("");
    setMensagem("");
    setMensagemTipo("info");
  }

  async function validarCadastro(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMensagem("");
    setMensagemTipo("info");

    if (!nomeCompleto.trim()) {
      setMensagemTipo("erro");
      setMensagem("Informe o nome completo do irmão.");
      return;
    }

    if (!cpf.trim()) {
      setMensagemTipo("erro");
      setMensagem("Informe o CPF do irmão.");
      return;
    }

    if (!lojaSelecionadaId) {
      setMensagemTipo("erro");
      setMensagem("Selecione a loja correta antes de continuar.");
      return;
    }

    setSalvando(true);

    try {
      const resposta = await fetch("/api/irmaos/salvar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lojaId: lojaSelecionadaId,
          nomeCompleto,
          cpf,
          email,
          whatsapp,
          cargo,
        }),
      });

      const data = await resposta.json();

      if (!resposta.ok) {
        setMensagemTipo("erro");
        setMensagem(data?.message || "Erro ao salvar cadastro do irmão.");
        return;
      }

      setMensagemTipo("sucesso");
      setMensagem(
        "Irmão salvo com sucesso em camada isolada e vinculado à loja real, sem interferir no restante do projeto."
      );

      console.log("RESPOSTA API IRMAOS:", data);
    } catch (error) {
      console.error("ERRO AO CHAMAR /api/irmaos/salvar:", error);
      setMensagemTipo("erro");
      setMensagem("Erro ao conectar com a API de cadastro do irmão.");
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
                  Cadastrar irmão
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
                  Página nova e isolada para cadastrar o irmão com segurança. Aqui a lógica já
                  nasce correta: primeiro o irmão informa os dados dele, depois encontra e seleciona
                  a loja real pelo nome para ficar vinculado ao lugar certo.
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
                  Ver cadastro da loja
                </Link>
              </div>
            </div>
          </div>

          <div className="grid gap-4 border-t border-slate-200 bg-white px-5 py-5 sm:grid-cols-2 xl:grid-cols-4 sm:px-8">
            <CardResumo
              titulo="Cadastro"
              valor="Irmão"
              descricao="Segunda etapa correta do fluxo, agora vinculando o irmão a uma loja real."
            />
            <CardResumo
              titulo="Busca"
              valor="Real"
              descricao="O usuário encontra a loja diretamente da tabela am_lojas."
            />
            <CardResumo
              titulo="Busca futura"
              valor="CPF"
              descricao="Estrutura preparada para consulta automática em fase posterior."
            />
            <CardResumo
              titulo="Camada"
              valor="Isolada"
              descricao="Nova página criada sem alterar a home nem os fluxos antigos."
            />
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                Dados do irmão
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
                Nesta fase, o cadastro continua seguro e isolado. Agora a busca da loja já vem da
                base real, sem usar lista fictícia.
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

            <form className="space-y-5" onSubmit={validarCadastro}>
              <div className="grid gap-5 md:grid-cols-2">
                <Campo
                  titulo="CPF do irmão"
                  descricao="Mais adiante, este campo poderá puxar dados automaticamente."
                >
                  <input
                    value={cpf}
                    onChange={(event) => setCpf(formatarCpf(event.target.value))}
                    type="text"
                    placeholder="000.000.000-00"
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                  />
                </Campo>

                <Campo titulo="Nome completo">
                  <input
                    value={nomeCompleto}
                    onChange={(event) => setNomeCompleto(event.target.value)}
                    type="text"
                    placeholder="Ex.: João da Silva"
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                  />
                </Campo>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <Campo titulo="E-mail">
                  <input
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    type="email"
                    placeholder="irmao@exemplo.com"
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                  />
                </Campo>

                <Campo titulo="WhatsApp">
                  <input
                    value={whatsapp}
                    onChange={(event) => setWhatsapp(formatarWhatsapp(event.target.value))}
                    type="text"
                    placeholder="(00) 00000-0000"
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                  />
                </Campo>
              </div>

              <Campo titulo="Cargo ou função">
                <input
                  value={cargo}
                  onChange={(event) => setCargo(event.target.value)}
                  type="text"
                  placeholder="Ex.: Venerável, Secretário, Tesoureiro..."
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                />
              </Campo>

              <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4 sm:p-5">
                <h3 className="text-base font-semibold text-slate-900">
                  Encontrar a loja pelo nome
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  A lógica correta é o irmão localizar a loja real já cadastrada e se vincular a ela.
                </p>

                <div className="mt-4 space-y-4">
                  <Campo titulo="Buscar loja">
                    <input
                      value={buscaLoja}
                      onChange={(event) => setBuscaLoja(event.target.value)}
                      type="text"
                      placeholder="Digite o nome da loja, slug, cidade ou estado"
                      className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                    />
                  </Campo>

                  {carregandoLojas ? (
                    <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-600">
                      Carregando lojas reais...
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {lojasFiltradas.map((loja) => {
                        const ativa = lojaSelecionadaId === loja.id;

                        return (
                          <button
                            key={loja.id}
                            type="button"
                            onClick={() => setLojaSelecionadaId(loja.id)}
                            className={`w-full rounded-2xl border p-4 text-left transition ${
                              ativa
                                ? "border-sky-500 bg-sky-50"
                                : "border-slate-200 bg-white hover:bg-slate-50"
                            }`}
                          >
                            <p className="text-sm font-semibold text-slate-900">{loja.nome}</p>
                            <p className="mt-1 text-sm text-slate-600">
                              {loja.cidade || "Cidade não informada"}/{loja.estado || "--"} •{" "}
                              {loja.status || "sem status"}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">{loja.slug}</p>
                          </button>
                        );
                      })}

                      {lojasFiltradas.length === 0 ? (
                        <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-600">
                          Nenhuma loja real encontrada com esse termo.
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={salvando}
                  className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {salvando ? "Salvando irmão..." : "Validar cadastro do irmão"}
                </button>

                <button
                  type="button"
                  onClick={limparFormulario}
                  disabled={salvando}
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  Limpar formulário
                </button>
              </div>
            </form>
          </section>

          <aside className="space-y-6">
            <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
                Prévia de vínculo
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Aqui já aparece como o irmão ficará ligado à loja real escolhida.
              </p>

              <div className="mt-5 space-y-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Irmão
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-900">
                    {nomeCompleto || "Não informado"}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    CPF
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-900">
                    {cpf || "Não informado"}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Loja selecionada
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-900">
                    {lojaSelecionada?.nome || "Nenhuma loja selecionada"}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    {lojaSelecionada
                      ? `${lojaSelecionada.cidade || "Cidade não informada"}/${lojaSelecionada.estado || "--"}`
                      : "Selecione a loja correta para continuar."}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Slug da loja
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-900">
                    {lojaSelecionada?.slug || "Nenhum slug selecionado"}
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
                  Primeiro manter a lógica correta: loja real cadastrada antes, irmão depois.
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                  Depois salvar este vínculo no banco real em camada isolada.
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                  Só então conectar busca automática por CPF e completar o fluxo sem quebrar o sistema atual.
                </div>
              </div>
            </section>
          </aside>
        </section>

        <section className="rounded-[28px] border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-800">
          Sistema em constante atualização. Esta página foi criada em camada nova para iniciar o
          cadastro do irmão de forma segura, já usando a base real de lojas cadastradas.
        </section>
      </div>
    </main>
  );
}