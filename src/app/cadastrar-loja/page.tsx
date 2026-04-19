"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

function formatarCnpj(valor: string) {
  const numeros = valor.replace(/\D/g, "").slice(0, 14);

  return numeros
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
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

function gerarSlug(texto: string) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
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

export default function CadastrarLojaPage() {
  const [cnpj, setCnpj] = useState("");
  const [nomeOficial, setNomeOficial] = useState("");
  const [nomePublico, setNomePublico] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [mensagemTipo, setMensagemTipo] = useState<"sucesso" | "erro" | "info">("info");
  const [carregando, setCarregando] = useState(false);

  const slugPrevio = useMemo(() => {
    return gerarSlug(nomePublico || nomeOficial || "");
  }, [nomeOficial, nomePublico]);

  function limparFormulario() {
    setCnpj("");
    setNomeOficial("");
    setNomePublico("");
    setResponsavel("");
    setEmail("");
    setWhatsapp("");
    setCidade("");
    setEstado("");
    setMensagem("");
    setMensagemTipo("info");
  }

  async function salvarRascunho(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMensagem("");
    setMensagemTipo("info");

    if (!nomeOficial.trim()) {
      setMensagemTipo("erro");
      setMensagem("Informe o nome oficial da loja antes de continuar.");
      return;
    }

    if (!cnpj.trim()) {
      setMensagemTipo("erro");
      setMensagem("Informe o CNPJ da loja antes de continuar.");
      return;
    }

    if (!responsavel.trim()) {
      setMensagemTipo("erro");
      setMensagem("Informe o nome do responsável pela loja.");
      return;
    }

    if (!email.trim()) {
      setMensagemTipo("erro");
      setMensagem("Informe o e-mail principal da loja.");
      return;
    }

    setCarregando(true);

    try {
      const resposta = await fetch("/api/lojas/salvar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cnpj,
          nomeOficial,
          nomePublico,
          responsavel,
          email,
          whatsapp,
          cidade,
          estado,
        }),
      });

      const data = await resposta.json();

      if (!resposta.ok) {
        setMensagemTipo("erro");
        setMensagem(data?.message || "Erro ao validar cadastro da loja.");
        return;
      }

      setMensagemTipo("sucesso");
      setMensagem(
        "API funcionando perfeitamente. Loja validada com sucesso nesta camada isolada, sem interferir no restante do projeto."
      );

      console.log("RESPOSTA API LOJA:", data);
    } catch (error) {
      console.error("ERRO AO CHAMAR /api/lojas/salvar:", error);
      setMensagemTipo("erro");
      setMensagem("Erro ao conectar com a API de validação da loja.");
    } finally {
      setCarregando(false);
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
                  Cadastrar loja
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
                  Página nova e isolada para iniciar o cadastro da loja com segurança, sem mexer
                  no que já está em produção. A lógica correta começa pela loja, para depois os
                  irmãos conseguirem localizar e se vincular pelo nome da loja.
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
                  href="/sistema"
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                >
                  Ir para o sistema
                </Link>
              </div>
            </div>
          </div>

          <div className="grid gap-4 border-t border-slate-200 bg-white px-5 py-5 sm:grid-cols-2 xl:grid-cols-4 sm:px-8">
            <CardResumo
              titulo="Cadastro"
              valor="Loja"
              descricao="Primeira etapa correta para depois vincular os irmãos à loja certa."
            />
            <CardResumo
              titulo="Camada"
              valor="Isolada"
              descricao="Nova página criada sem alterar a home nem os fluxos antigos."
            />
            <CardResumo
              titulo="Busca futura"
              valor="CNPJ"
              descricao="Estrutura já preparada para depois puxar dados automaticamente."
            />
            <CardResumo
              titulo="Próxima fase"
              valor="Irmãos"
              descricao="Depois desta etapa, criaremos o cadastro de irmão com vínculo por loja."
            />
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                Dados da loja
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
                Nesta primeira etapa, o cadastro é manual e seguro. Em fase posterior, podemos
                ligar consulta automática por CNPJ sem quebrar este fluxo.
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

            <form className="space-y-5" onSubmit={salvarRascunho}>
              <div className="grid gap-5 md:grid-cols-2">
                <Campo
                  titulo="CNPJ da loja"
                  descricao="Mais adiante, este campo poderá consultar os dados automaticamente."
                >
                  <input
                    value={cnpj}
                    onChange={(event) => setCnpj(formatarCnpj(event.target.value))}
                    type="text"
                    placeholder="00.000.000/0000-00"
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                  />
                </Campo>

                <Campo titulo="Nome oficial da loja">
                  <input
                    value={nomeOficial}
                    onChange={(event) => setNomeOficial(event.target.value)}
                    type="text"
                    placeholder="Ex.: Loja Maçônica Aurora"
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                  />
                </Campo>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <Campo
                  titulo="Nome público da loja"
                  descricao="Use o nome pelo qual os irmãos vão encontrar a loja no sistema."
                >
                  <input
                    value={nomePublico}
                    onChange={(event) => setNomePublico(event.target.value)}
                    type="text"
                    placeholder="Ex.: Aurora"
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                  />
                </Campo>

                <Campo titulo="Responsável pela loja">
                  <input
                    value={responsavel}
                    onChange={(event) => setResponsavel(event.target.value)}
                    type="text"
                    placeholder="Ex.: Ricardo Leonardo Moreira"
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                  />
                </Campo>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <Campo titulo="E-mail principal">
                  <input
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    type="email"
                    placeholder="loja@exemplo.com"
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                  />
                </Campo>

                <Campo titulo="WhatsApp principal">
                  <input
                    value={whatsapp}
                    onChange={(event) => setWhatsapp(formatarWhatsapp(event.target.value))}
                    type="text"
                    placeholder="(00) 00000-0000"
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                  />
                </Campo>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <Campo titulo="Cidade">
                  <input
                    value={cidade}
                    onChange={(event) => setCidade(event.target.value)}
                    type="text"
                    placeholder="Ex.: Belo Horizonte"
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                  />
                </Campo>

                <Campo titulo="Estado">
                  <input
                    value={estado}
                    onChange={(event) => setEstado(event.target.value.toUpperCase().slice(0, 2))}
                    type="text"
                    placeholder="MG"
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                  />
                </Campo>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={carregando}
                  className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {carregando ? "Validando cadastro..." : "Validar cadastro da loja"}
                </button>

                <button
                  type="button"
                  onClick={limparFormulario}
                  disabled={carregando}
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
                Esta é a lógica que depois permitirá ao irmão encontrar a loja pelo nome e se
                vincular corretamente.
              </p>

              <div className="mt-5 space-y-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Nome oficial
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-900">
                    {nomeOficial || "Não informado"}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Nome público
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-900">
                    {nomePublico || nomeOficial || "Não informado"}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Slug previsto
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-900">
                    {slugPrevio || "ainda-sem-slug"}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    CNPJ
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-900">
                    {cnpj || "Não informado"}
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
                  Primeiro salvar a loja de forma estável, com nome e identificação corretos.
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                  Depois criar o cadastro do irmão já vinculado a uma loja existente.
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                  Só depois ligar busca automática por CNPJ e busca de loja por nome sem quebrar o fluxo.
                </div>
              </div>
            </section>
          </aside>
        </section>

        <section className="rounded-[28px] border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-800">
          Sistema em constante atualização. Esta página foi criada em camada nova para iniciar o
          cadastro da loja de forma segura e sem impactar o que já está em produção.
        </section>
      </div>
    </main>
  );
}