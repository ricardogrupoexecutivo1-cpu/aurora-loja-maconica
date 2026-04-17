"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

type FormState = {
  id: string;
  slug: string;
  nome_loja: string;
  responsavel_nome: string;
  responsavel_email: string;
  responsavel_whatsapp: string;
  cidade: string;
  estado: string;
  mensagem_institucional: string;
};

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

const STORAGE_KEY_ID = "aurora_loja_id";
const STORAGE_KEY_SLUG = "aurora_loja_slug";
const STORAGE_KEY_NOME = "aurora_loja_nome";
const STORAGE_KEY_EMAIL = "aurora_loja_responsavel_email";

const LOJA_ID_FIXA = "36dbb2e4-d499-44d3-b3e1-313c0f41993e";

function formatarPlano(plano: string | null | undefined) {
  if (!plano) return "Cortesia";
  return plano.charAt(0).toUpperCase() + plano.slice(1).toLowerCase();
}

function formatarStatus(status: string | null | undefined) {
  if (!status) return "Em atualização";
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
}

function formatarValidade(data: string | null | undefined) {
  if (!data) return "";
  const parsed = new Date(data);
  if (Number.isNaN(parsed.getTime())) return "";

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "long",
  }).format(parsed);
}

function montarUrlBuscaLoja() {
  if (typeof window === "undefined") {
    return `/api/lojas/configurar?id=${LOJA_ID_FIXA}`;
  }

  const lojaId =
    window.localStorage.getItem(STORAGE_KEY_ID)?.trim() || LOJA_ID_FIXA;

  return `/api/lojas/configurar?id=${encodeURIComponent(lojaId)}`;
}

function ConfigurarLojaConteudo() {
  const searchParams = useSearchParams();

  const corTexto = "#16311f";
  const corTextoSuave = "#4d6655";
  const corVerde = "#1f6b3b";
  const corVerdeEscuro = "#174d2b";
  const corVerdeClaro = "#e8f3e6";
  const corBorda = "#d7e6d1";
  const corCard = "#ffffff";
  const corDourado = "#b08d57";
  const sombra = "0 18px 45px rgba(23, 77, 43, 0.10)";

  const estadoInicial = useMemo<FormState>(
    () => ({
      id: "",
      slug: "",
      nome_loja: "",
      responsavel_nome: "",
      responsavel_email: "",
      responsavel_whatsapp: "",
      cidade: "",
      estado: "",
      mensagem_institucional: "",
    }),
    [],
  );

  const [form, setForm] = useState<FormState>(estadoInicial);
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [carregandoLoja, setCarregandoLoja] = useState(true);
  const [lojaAtual, setLojaAtual] = useState<LojaPayload | null>(null);

  useEffect(() => {
    const idUrl = searchParams.get("id")?.trim() || "";
    const slugUrl = searchParams.get("slug")?.trim() || "";

    let idLocal = "";
    let slugLocal = "";

    if (typeof window !== "undefined") {
      idLocal = window.localStorage.getItem(STORAGE_KEY_ID)?.trim() || "";
      slugLocal = window.localStorage.getItem(STORAGE_KEY_SLUG)?.trim() || "";
    }

    setForm((atual) => ({
      ...atual,
      id: idUrl || atual.id || idLocal,
      slug: slugUrl || atual.slug || slugLocal,
    }));
  }, [searchParams]);

  useEffect(() => {
    let ativo = true;

    async function carregarLoja() {
      try {
        setCarregandoLoja(true);

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

        const json = (await response.json()) as ApiResponse;

        if (!ativo) return;

        if (json.success && json.loja?.id) {
          const loja = json.loja;

          setLojaAtual(loja);

          setForm((atual) => ({
            ...atual,
            id: loja.id ?? atual.id,
            slug: loja.slug ?? atual.slug,
            nome_loja: loja.nome_loja ?? atual.nome_loja,
            responsavel_nome: loja.responsavel_nome ?? atual.responsavel_nome,
            responsavel_email:
              loja.responsavel_email ?? atual.responsavel_email,
            responsavel_whatsapp:
              loja.responsavel_whatsapp ?? atual.responsavel_whatsapp,
            cidade: loja.cidade ?? atual.cidade,
            estado: loja.estado ?? atual.estado,
            mensagem_institucional:
              loja.mensagem_institucional ?? atual.mensagem_institucional,
          }));

          if (typeof window !== "undefined") {
            window.localStorage.setItem(STORAGE_KEY_ID, loja.id);
            if (loja.slug) {
              window.localStorage.setItem(STORAGE_KEY_SLUG, loja.slug);
            }
            if (loja.nome_loja) {
              window.localStorage.setItem(STORAGE_KEY_NOME, loja.nome_loja);
            }
            if (loja.responsavel_email) {
              window.localStorage.setItem(
                STORAGE_KEY_EMAIL,
                loja.responsavel_email,
              );
            }
          }
        }
      } catch (err) {
        if (!ativo) return;

        const message =
          err instanceof Error
            ? err.message
            : "Não foi possível carregar os dados atuais da loja.";

        setErro(message);
      } finally {
        if (ativo) {
          setCarregandoLoja(false);
        }
      }
    }

    void carregarLoja();

    return () => {
      ativo = false;
    };
  }, []);

  function atualizarCampo(campo: keyof FormState, valor: string) {
    setForm((atual) => ({
      ...atual,
      [campo]: valor,
    }));
  }

  async function salvarConfiguracao() {
    setSalvando(true);
    setMensagem("");
    setErro("");

    try {
      const response = await fetch("/api/lojas/configurar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const json = await response.json();

      if (!response.ok || !json?.success) {
        throw new Error(
          json?.message || "Não foi possível salvar a configuração inicial.",
        );
      }

      if (typeof window !== "undefined") {
        if (form.id.trim()) {
          window.localStorage.setItem(STORAGE_KEY_ID, form.id.trim());
        }
        if (form.slug.trim()) {
          window.localStorage.setItem(STORAGE_KEY_SLUG, form.slug.trim());
        }
        if (form.nome_loja.trim()) {
          window.localStorage.setItem(STORAGE_KEY_NOME, form.nome_loja.trim());
        }
        if (form.responsavel_email.trim()) {
          window.localStorage.setItem(
            STORAGE_KEY_EMAIL,
            form.responsavel_email.trim(),
          );
        }
      }

      setMensagem(
        "Configuração inicial salva com sucesso. A base institucional da loja foi atualizada e permanece pronta para uso seguro.",
      );

      setLojaAtual((atual) => ({
        id: form.id || atual?.id || LOJA_ID_FIXA,
        slug: form.slug || atual?.slug || null,
        nome_loja: form.nome_loja || atual?.nome_loja || null,
        responsavel_nome:
          form.responsavel_nome || atual?.responsavel_nome || null,
        responsavel_email:
          form.responsavel_email || atual?.responsavel_email || null,
        responsavel_whatsapp:
          form.responsavel_whatsapp || atual?.responsavel_whatsapp || null,
        cidade: form.cidade || atual?.cidade || null,
        estado: form.estado || atual?.estado || null,
        mensagem_institucional:
          form.mensagem_institucional || atual?.mensagem_institucional || null,
        configuracao_concluida: true,
        status: atual?.status || "ativa",
        plano: atual?.plano || "premium",
        courtesy_expires_at: atual?.courtesy_expires_at || null,
      }));
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Erro ao salvar a configuração inicial.";

      setErro(message);
    } finally {
      setSalvando(false);
    }
  }

  const planoAtual = useMemo(() => {
    return formatarPlano(lojaAtual?.plano);
  }, [lojaAtual?.plano]);

  const statusAtual = useMemo(() => {
    return formatarStatus(lojaAtual?.status);
  }, [lojaAtual?.status]);

  const tituloLiberacao = useMemo(() => {
    if ((lojaAtual?.plano || "").toLowerCase() === "premium") {
      return "Plano premium ativo";
    }

    if ((lojaAtual?.plano || "").toLowerCase() === "teste") {
      return "Teste ativo";
    }

    return "Cortesia automática ativa";
  }, [lojaAtual?.plano]);

  const subtituloLiberacao = useMemo(() => {
    if ((lojaAtual?.plano || "").toLowerCase() === "premium") {
      return "Base premium liberada";
    }

    if ((lojaAtual?.plano || "").toLowerCase() === "teste") {
      return "Ambiente de teste liberado";
    }

    if (lojaAtual?.courtesy_expires_at) {
      const dataFormatada = formatarValidade(lojaAtual.courtesy_expires_at);
      return dataFormatada
        ? `Cortesia válida até ${dataFormatada}`
        : "Cortesia inicial liberada";
    }

    return "Até 90 dias liberados";
  }, [lojaAtual?.plano, lojaAtual?.courtesy_expires_at]);

  const textoEntrada = useMemo(() => {
    if ((lojaAtual?.plano || "").toLowerCase() === "premium") {
      return "Sua loja já está com plano premium ativo. Esta etapa serve para completar, revisar e fortalecer a base institucional com leitura elegante e uso seguro.";
    }

    if ((lojaAtual?.plano || "").toLowerCase() === "teste") {
      return "Sua loja já entrou em modo de teste ativo. Agora esta etapa serve para completar a base institucional e preparar a experiência real da plataforma.";
    }

    return "Sua loja já entrou com cortesia ativa. Agora esta etapa serve para completar a base institucional e deixar o ambiente pronto para uso organizado e elegante.";
  }, [lojaAtual?.plano]);

  const textoPlano = useMemo(() => {
    if ((lojaAtual?.plano || "").toLowerCase() === "premium") {
      return "Sua loja já está em plano premium, com base real conectada e ambiente preparado para crescer com estabilidade.";
    }

    if ((lojaAtual?.plano || "").toLowerCase() === "teste") {
      return "O sistema permite fase de teste real antes da etapa definitiva, mantendo a organização institucional desde o início.";
    }

    return "O sistema foi desenhado para não travar a entrada. A loja se cadastra, recebe a liberação automática inicial e segue para a configuração com segurança.";
  }, [lojaAtual?.plano]);

  const textoPremium = useMemo(() => {
    if ((lojaAtual?.plano || "").toLowerCase() === "premium") {
      return "Esta etapa mantém a base premium organizada, preparada para irmãos autorizados e pronta para crescer sem perder o padrão institucional.";
    }

    return "Esta etapa prepara a loja para um ambiente bonito, organizado e pronto para encantar os irmãos com experiência institucional séria e elegante.";
  }, [lojaAtual?.plano]);

  const nomeExibicao = lojaAtual?.nome_loja?.trim() || form.nome_loja || "Loja Maçônica Aurora";
  const localizacaoExibicao =
    lojaAtual?.cidade && lojaAtual?.estado
      ? `${lojaAtual.cidade} • ${lojaAtual.estado}`
      : lojaAtual?.cidade || lojaAtual?.estado || "Uso institucional protegido";

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, rgba(217,243,226,0.85), transparent 28%), radial-gradient(circle at bottom right, rgba(210,238,219,0.72), transparent 24%), linear-gradient(180deg, #f8fcf9 0%, #f1f8f4 52%, #edf6f1 100%)",
        padding: "24px 12px 40px",
        fontFamily: "Arial, sans-serif",
        color: corTexto,
      }}
    >
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <section
          style={{
            background:
              "linear-gradient(135deg, #174d2b 0%, #1f6b3b 60%, #2c8a4b 100%)",
            color: "#ffffff",
            borderRadius: 30,
            padding: "30px 22px",
            boxShadow: "0 22px 60px rgba(23, 77, 43, 0.24)",
            border: "1px solid rgba(255,255,255,0.10)",
            marginBottom: 22,
          }}
        >
          <div
            style={{
              display: "inline-block",
              background: "rgba(255,255,255,0.14)",
              border: "1px solid rgba(255,255,255,0.18)",
              color: "#f5ead7",
              padding: "8px 14px",
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 0.3,
              marginBottom: 16,
            }}
          >
            Configuração institucional inicial
          </div>

          <h1
            style={{
              margin: "0 0 12px",
              fontSize: "clamp(30px, 4vw, 44px)",
              lineHeight: 1.05,
              fontWeight: 900,
            }}
          >
            Configurar minha loja
          </h1>

          <p
            style={{
              margin: 0,
              fontSize: "clamp(15px, 2vw, 18px)",
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.92)",
              maxWidth: 790,
            }}
          >
            Complete os dados institucionais da loja para organizar a base,
            preparar o ambiente dos irmãos e deixar a estrutura pronta para uso
            seguro no padrão premium da Aurora Loja Maçônica.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              marginTop: 18,
            }}
          >
            {[nomeExibicao, localizacaoExibicao, planoAtual, statusAtual].map(
              (item) => (
                <span
                  key={item}
                  style={{
                    borderRadius: 999,
                    padding: "8px 14px",
                    background: "rgba(255,255,255,0.10)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#f2fbf5",
                  }}
                >
                  {item}
                </span>
              ),
            )}
          </div>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 14,
            marginBottom: 24,
          }}
        >
          {[tituloLiberacao, subtituloLiberacao, "Configuração segura", "Uso em celular e PC"].map(
            (item) => (
              <div
                key={item}
                style={{
                  background: "#edf5ea",
                  border: `1px solid ${corBorda}`,
                  color: corTextoSuave,
                  borderRadius: 18,
                  padding: "14px 16px",
                  fontSize: 14,
                  fontWeight: 700,
                  boxShadow: "0 8px 20px rgba(23, 77, 43, 0.05)",
                }}
              >
                {carregandoLoja && item === tituloLiberacao
                  ? "Carregando plano da loja..."
                  : item}
              </div>
            ),
          )}
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 18,
            marginBottom: 22,
          }}
        >
          <div
            style={{
              background: corCard,
              borderRadius: 24,
              padding: 22,
              border: `1px solid ${corBorda}`,
              boxShadow: sombra,
            }}
          >
            <h3
              style={{
                margin: "0 0 10px",
                fontSize: 22,
                color: corVerdeEscuro,
              }}
            >
              Entrada já liberada
            </h3>
            <p
              style={{
                margin: 0,
                color: corTextoSuave,
                lineHeight: 1.8,
                fontSize: 15,
              }}
            >
              {textoEntrada}
            </p>
          </div>

          <div
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(245,250,243,1) 100%)",
              borderRadius: 24,
              padding: 22,
              border: `2px solid ${corDourado}`,
              boxShadow: "0 22px 55px rgba(176, 141, 87, 0.12)",
            }}
          >
            <h3
              style={{
                margin: "0 0 10px",
                fontSize: 22,
                color: corVerdeEscuro,
              }}
            >
              {planoAtual === "Premium" ? "Base premium ativa" : "Modelo de entrada"}
            </h3>
            <p
              style={{
                margin: 0,
                color: corTextoSuave,
                lineHeight: 1.8,
                fontSize: 15,
              }}
            >
              {textoPlano}
            </p>
          </div>

          <div
            style={{
              background: corCard,
              borderRadius: 24,
              padding: 22,
              border: `1px solid ${corBorda}`,
              boxShadow: sombra,
            }}
          >
            <h3
              style={{
                margin: "0 0 10px",
                fontSize: 22,
                color: corVerdeEscuro,
              }}
            >
              Base institucional
            </h3>
            <p
              style={{
                margin: 0,
                color: corTextoSuave,
                lineHeight: 1.8,
                fontSize: 15,
              }}
            >
              {textoPremium}
            </p>
          </div>
        </section>

        <section
          style={{
            background: corCard,
            borderRadius: 24,
            padding: 24,
            border: `1px solid ${corBorda}`,
            boxShadow: sombra,
            marginBottom: 22,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              flexWrap: "wrap",
              marginBottom: 18,
            }}
          >
            <div>
              <h2
                style={{
                  margin: "0 0 8px",
                  fontSize: 28,
                  color: corVerdeEscuro,
                }}
              >
                Dados iniciais da loja
              </h2>
              <p
                style={{
                  margin: 0,
                  color: corTextoSuave,
                  lineHeight: 1.75,
                  fontSize: 15,
                }}
              >
                Estruture a base institucional com cuidado para evitar retrabalho
                e manter a loja pronta para crescer com segurança.
              </p>
            </div>

            <div
              style={{
                background: "#f8f0e1",
                color: "#8b6a34",
                border: "1px solid #ecd8b2",
                borderRadius: 999,
                padding: "8px 14px",
                fontSize: 12,
                fontWeight: 800,
              }}
            >
              ETAPA INICIAL
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              void salvarConfiguracao();
            }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 16,
            }}
          >
            <label style={{ display: "grid", gap: 8 }}>
              <span style={{ fontWeight: 700, color: corTexto }}>
                ID da loja
              </span>
              <input
                type="text"
                value={form.id}
                onChange={(e) => atualizarCampo("id", e.target.value)}
                placeholder="UUID da loja"
                style={{
                  height: 48,
                  borderRadius: 14,
                  border: `1px solid ${corBorda}`,
                  padding: "0 14px",
                  fontSize: 15,
                  color: corTexto,
                  background: "#ffffff",
                  outline: "none",
                }}
              />
            </label>

            <label style={{ display: "grid", gap: 8 }}>
              <span style={{ fontWeight: 700, color: corTexto }}>
                Slug da loja
              </span>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => atualizarCampo("slug", e.target.value)}
                placeholder="Opcional para futuras configurações"
                style={{
                  height: 48,
                  borderRadius: 14,
                  border: `1px solid ${corBorda}`,
                  padding: "0 14px",
                  fontSize: 15,
                  color: corTexto,
                  background: "#ffffff",
                  outline: "none",
                }}
              />
            </label>

            <label style={{ display: "grid", gap: 8 }}>
              <span style={{ fontWeight: 700, color: corTexto }}>
                Nome oficial da loja
              </span>
              <input
                type="text"
                value={form.nome_loja}
                onChange={(e) => atualizarCampo("nome_loja", e.target.value)}
                placeholder="Ex.: Loja Maçônica Aurora"
                style={{
                  height: 48,
                  borderRadius: 14,
                  border: `1px solid ${corBorda}`,
                  padding: "0 14px",
                  fontSize: 15,
                  color: corTexto,
                  background: "#ffffff",
                  outline: "none",
                }}
              />
            </label>

            <label style={{ display: "grid", gap: 8 }}>
              <span style={{ fontWeight: 700, color: corTexto }}>
                Nome do irmão responsável
              </span>
              <input
                type="text"
                value={form.responsavel_nome}
                onChange={(e) =>
                  atualizarCampo("responsavel_nome", e.target.value)
                }
                placeholder="Ex.: Ricardo Leonardo Moreira"
                style={{
                  height: 48,
                  borderRadius: 14,
                  border: `1px solid ${corBorda}`,
                  padding: "0 14px",
                  fontSize: 15,
                  color: corTexto,
                  background: "#ffffff",
                  outline: "none",
                }}
              />
            </label>

            <label style={{ display: "grid", gap: 8 }}>
              <span style={{ fontWeight: 700, color: corTexto }}>
                E-mail institucional
              </span>
              <input
                type="email"
                value={form.responsavel_email}
                onChange={(e) =>
                  atualizarCampo("responsavel_email", e.target.value)
                }
                placeholder="loja@exemplo.com"
                style={{
                  height: 48,
                  borderRadius: 14,
                  border: `1px solid ${corBorda}`,
                  padding: "0 14px",
                  fontSize: 15,
                  color: corTexto,
                  background: "#ffffff",
                  outline: "none",
                }}
              />
            </label>

            <label style={{ display: "grid", gap: 8 }}>
              <span style={{ fontWeight: 700, color: corTexto }}>
                WhatsApp principal
              </span>
              <input
                type="text"
                value={form.responsavel_whatsapp}
                onChange={(e) =>
                  atualizarCampo("responsavel_whatsapp", e.target.value)
                }
                placeholder="(00) 00000-0000"
                style={{
                  height: 48,
                  borderRadius: 14,
                  border: `1px solid ${corBorda}`,
                  padding: "0 14px",
                  fontSize: 15,
                  color: corTexto,
                  background: "#ffffff",
                  outline: "none",
                }}
              />
            </label>

            <label style={{ display: "grid", gap: 8 }}>
              <span style={{ fontWeight: 700, color: corTexto }}>
                Cidade
              </span>
              <input
                type="text"
                value={form.cidade}
                onChange={(e) => atualizarCampo("cidade", e.target.value)}
                placeholder="Ex.: Belo Horizonte"
                style={{
                  height: 48,
                  borderRadius: 14,
                  border: `1px solid ${corBorda}`,
                  padding: "0 14px",
                  fontSize: 15,
                  color: corTexto,
                  background: "#ffffff",
                  outline: "none",
                }}
              />
            </label>

            <label style={{ display: "grid", gap: 8 }}>
              <span style={{ fontWeight: 700, color: corTexto }}>
                Estado
              </span>
              <input
                type="text"
                value={form.estado}
                onChange={(e) => atualizarCampo("estado", e.target.value)}
                placeholder="Ex.: MG"
                style={{
                  height: 48,
                  borderRadius: 14,
                  border: `1px solid ${corBorda}`,
                  padding: "0 14px",
                  fontSize: 15,
                  color: corTexto,
                  background: "#ffffff",
                  outline: "none",
                }}
              />
            </label>

            <label
              style={{
                display: "grid",
                gap: 8,
                gridColumn: "1 / -1",
              }}
            >
              <span style={{ fontWeight: 700, color: corTexto }}>
                Mensagem institucional inicial
              </span>
              <textarea
                value={form.mensagem_institucional}
                onChange={(e) =>
                  atualizarCampo("mensagem_institucional", e.target.value)
                }
                placeholder="Descreva a apresentação institucional inicial da loja."
                rows={5}
                style={{
                  borderRadius: 16,
                  border: `1px solid ${corBorda}`,
                  padding: "14px",
                  fontSize: 15,
                  color: corTexto,
                  background: "#ffffff",
                  outline: "none",
                  resize: "vertical",
                  minHeight: 120,
                }}
              />
            </label>

            <div
              style={{
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
                marginTop: 4,
                gridColumn: "1 / -1",
              }}
            >
              <button
                type="submit"
                disabled={salvando}
                style={{
                  border: "none",
                  background: `linear-gradient(135deg, ${corVerdeEscuro} 0%, ${corVerde} 100%)`,
                  color: "#ffffff",
                  padding: "14px 18px",
                  borderRadius: 16,
                  fontWeight: 800,
                  boxShadow: "0 14px 30px rgba(31, 107, 59, 0.20)",
                  cursor: salvando ? "not-allowed" : "pointer",
                  opacity: salvando ? 0.8 : 1,
                }}
              >
                {salvando ? "Salvando..." : "Salvar configuração inicial"}
              </button>

              <a
                href="/criado-com-sucesso"
                style={{
                  textDecoration: "none",
                  background: "#ffffff",
                  color: corVerdeEscuro,
                  padding: "14px 18px",
                  borderRadius: 16,
                  fontWeight: 800,
                  border: `1px solid ${corBorda}`,
                }}
              >
                Voltar para confirmação
              </a>
            </div>
          </form>

          {mensagem ? (
            <div
              style={{
                marginTop: 18,
                background: "#edf5ea",
                border: `1px solid ${corBorda}`,
                borderRadius: 16,
                padding: "14px 16px",
                color: corVerdeEscuro,
                fontWeight: 700,
                lineHeight: 1.7,
              }}
            >
              {mensagem}
            </div>
          ) : null}

          {erro ? (
            <div
              style={{
                marginTop: 18,
                background: "#fff4f4",
                border: "1px solid #f0caca",
                borderRadius: 16,
                padding: "14px 16px",
                color: "#8a1f1f",
                fontWeight: 700,
                lineHeight: 1.7,
              }}
            >
              {erro}
            </div>
          ) : null}
        </section>

        <div
          style={{
            marginTop: 22,
            background: corVerdeClaro,
            border: `1px solid ${corBorda}`,
            borderRadius: 18,
            padding: "16px 18px",
            color: corTextoSuave,
            lineHeight: 1.7,
            fontSize: 14,
          }}
        >
          Sistema em constante atualização. Novas funcionalidades podem ser
          adicionadas sem comprometer a base existente.
        </div>
      </div>
    </main>
  );
}

function ConfigurarLojaFallback() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #f8fbf7 0%, #eef6eb 45%, #f4f8f2 100%)",
        padding: "28px 16px 40px",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          borderRadius: 20,
          padding: 24,
          border: "1px solid #d7e6d1",
          boxShadow: "0 18px 45px rgba(23, 77, 43, 0.10)",
          color: "#174d2b",
          fontWeight: 700,
        }}
      >
        Carregando configuração da loja...
      </div>
    </main>
  );
}

export default function ConfigurarLojaPage() {
  return (
    <Suspense fallback={<ConfigurarLojaFallback />}>
      <ConfigurarLojaConteudo />
    </Suspense>
  );
}