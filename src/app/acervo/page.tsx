"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type SessaoLoja = {
  loja: string;
  login: string;
  plano: string;
  status: string;
  papel: string;
  acesso: string;
  logadoEm: string;
};

type ItemAcervo = {
  id: string;
  nome: string;
  categoria: string;
  local: string;
  dataReferencia: string;
  status: string;
  observacoes: string;
  criadoEm: string;
};

const CHAVE_SESSAO = "aurora_loja_maconica_sessao";
const CHAVE_ACERVO = "aurora_loja_maconica_acervo_v1";

function lerSessaoCompleta(): SessaoLoja | null {
  if (typeof window === "undefined") return null;

  try {
    const local = window.localStorage.getItem(CHAVE_SESSAO);
    if (local) {
      const sessao = JSON.parse(local) as SessaoLoja;
      if (sessao?.loja && sessao?.login) return sessao;
    }

    const sessaoAtual = window.sessionStorage.getItem(CHAVE_SESSAO);
    if (sessaoAtual) {
      const sessao = JSON.parse(sessaoAtual) as SessaoLoja;
      if (sessao?.loja && sessao?.login) return sessao;
    }

    return null;
  } catch {
    return null;
  }
}

function lerAcervo(): ItemAcervo[] {
  if (typeof window === "undefined") return [];

  try {
    const dados = localStorage.getItem(CHAVE_ACERVO);
    return dados ? JSON.parse(dados) : [];
  } catch {
    return [];
  }
}

function salvarAcervo(itens: ItemAcervo[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CHAVE_ACERVO, JSON.stringify(itens));
}

function cardBase(): React.CSSProperties {
  return {
    background: "#ffffff",
    borderRadius: 24,
    border: "1px solid #dbe4ea",
    padding: 22,
    boxShadow: "0 16px 40px rgba(15, 23, 42, 0.05)",
  };
}

function badgeStyle(
  cor = "#0f766e",
  fundo = "#ecfeff",
  borda = "#a5f3fc",
): React.CSSProperties {
  return {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    padding: "7px 12px",
    background: fundo,
    border: `1px solid ${borda}`,
    color: cor,
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: "0.04em",
  };
}

function campoStyle(): React.CSSProperties {
  return {
    width: "100%",
    borderRadius: 16,
    border: "1px solid #cbd5e1",
    padding: "14px 16px",
    fontSize: 15,
    outline: "none",
    boxSizing: "border-box",
    background: "#ffffff",
    color: "#0f172a",
  };
}

function gerarId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function formatarDataBR(valor: string) {
  if (!valor) return "__/__/____";
  const partes = valor.split("-");
  if (partes.length !== 3) return valor;
  return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

const FORM_INICIAL = {
  nome: "",
  categoria: "",
  local: "",
  dataReferencia: "",
  status: "Ativo",
  observacoes: "",
};

export default function AcervoPage() {
  const [sessao, setSessao] = useState<SessaoLoja | null>(null);
  const [carregandoSessao, setCarregandoSessao] = useState(true);

  const [itens, setItens] = useState<ItemAcervo[]>([]);
  const [form, setForm] = useState(FORM_INICIAL);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  useEffect(() => {
    const sessaoAtual = lerSessaoCompleta();

    if (!sessaoAtual) {
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      return;
    }

    setSessao(sessaoAtual);
    setCarregandoSessao(false);
  }, []);

  useEffect(() => {
    setItens(lerAcervo());
  }, []);

  function atualizarCampo<K extends keyof typeof FORM_INICIAL>(
    campo: K,
    valor: (typeof FORM_INICIAL)[K],
  ) {
    setForm((atual) => ({
      ...atual,
      [campo]: valor,
    }));
  }

  function limparFormulario() {
    setForm(FORM_INICIAL);
    setMensagem("Formulário limpo com sucesso.");
    setErro("");
  }

  function salvarItem(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMensagem("");
    setErro("");

    if (!form.nome.trim()) {
      setErro("Informe o nome do item do acervo.");
      return;
    }

    const novo: ItemAcervo = {
      id: gerarId(),
      nome: form.nome.trim(),
      categoria: form.categoria.trim(),
      local: form.local.trim(),
      dataReferencia: form.dataReferencia,
      status: form.status.trim(),
      observacoes: form.observacoes.trim(),
      criadoEm: new Date().toISOString(),
    };

    const atualizados = [novo, ...itens];
    setItens(atualizados);
    salvarAcervo(atualizados);
    setForm(FORM_INICIAL);
    setMensagem("Item do acervo salvo com sucesso.");
  }

  function removerItem(id: string) {
    const confirmado = window.confirm("Deseja remover este item do acervo?");
    if (!confirmado) return;

    const atualizados = itens.filter((item) => item.id !== id);
    setItens(atualizados);
    salvarAcervo(atualizados);
    setMensagem("Item removido com sucesso.");
    setErro("");
  }

  if (carregandoSessao) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(180deg, #f7fbf8 0%, #eef7f1 50%, #f7fbf8 100%)",
          padding: "24px 16px 56px",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <section
            style={{
              ...cardBase(),
              background:
                "linear-gradient(135deg, #052e2b 0%, #065f46 55%, #059669 100%)",
              color: "#ffffff",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 30px 80px rgba(5, 46, 43, 0.24)",
            }}
          >
            <div
              style={{
                ...badgeStyle(
                  "#dcfce7",
                  "rgba(255,255,255,0.12)",
                  "rgba(255,255,255,0.18)",
                ),
                marginBottom: 16,
              }}
            >
              Acervo institucional
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                lineHeight: 1.05,
              }}
            >
              Validando acesso
            </h1>

            <p
              style={{
                marginTop: 16,
                marginBottom: 0,
                maxWidth: 760,
                color: "rgba(255,255,255,0.92)",
                lineHeight: 1.8,
                fontSize: 16,
              }}
            >
              Aguarde um instante enquanto o ambiente interno é validado.
            </p>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #f7fbf8 0%, #eef7f1 50%, #f7fbf8 100%)",
        padding: "24px 16px 56px",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <section
          style={{
            ...cardBase(),
            background:
              "linear-gradient(135deg, #052e2b 0%, #065f46 55%, #059669 100%)",
            color: "#ffffff",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 30px 80px rgba(5, 46, 43, 0.24)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 20,
              alignItems: "stretch",
            }}
          >
            <div>
              <div
                style={{
                  ...badgeStyle(
                    "#dcfce7",
                    "rgba(255,255,255,0.12)",
                    "rgba(255,255,255,0.18)",
                  ),
                  marginBottom: 16,
                }}
              >
                Acervo institucional
              </div>

              <div
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.88)",
                  marginBottom: 10,
                }}
              >
                Aurora Loja Maçônica
              </div>

              <h1
                style={{
                  margin: 0,
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  lineHeight: 1.05,
                }}
              >
                Base de acervo da loja
              </h1>

              <p
                style={{
                  marginTop: 16,
                  marginBottom: 0,
                  maxWidth: 760,
                  color: "rgba(255,255,255,0.92)",
                  lineHeight: 1.8,
                  fontSize: 16,
                }}
              >
                Área isolada para registrar objetos, materiais, patrimônio simbólico,
                documentos físicos e itens históricos da loja, sem interferir nas páginas já publicadas.
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 12,
                  marginTop: 22,
                }}
              >
                <Link
                  href="/sistema"
                  style={{
                    textDecoration: "none",
                    background: "#ffffff",
                    color: "#065f46",
                    padding: "12px 18px",
                    borderRadius: 16,
                    fontWeight: 800,
                    border: "1px solid rgba(255,255,255,0.18)",
                  }}
                >
                  Voltar ao sistema
                </Link>
              </div>
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.14)",
                borderRadius: 24,
                padding: 20,
                display: "grid",
                gap: 12,
              }}
            >
              <div style={{ fontSize: 14, lineHeight: 1.8, color: "rgba(255,255,255,0.92)" }}>
                <strong>Leitura protegida.</strong> Esta página foi criada de forma independente
                para preservar a estabilidade do sistema enquanto o acervo cresce com segurança.
              </div>

              <div
                style={{
                  display: "grid",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    borderRadius: 18,
                    padding: 16,
                  }}
                >
                  <div style={{ fontSize: 12, fontWeight: 800, opacity: 0.8, marginBottom: 8 }}>
                    Loja
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 800 }}>
                    {sessao?.loja ?? "Não identificada"}
                  </div>
                </div>

                <div
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    borderRadius: 18,
                    padding: 16,
                  }}
                >
                  <div style={{ fontSize: 12, fontWeight: 800, opacity: 0.8, marginBottom: 8 }}>
                    Responsável
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 800 }}>
                    {sessao?.login ?? "Sem leitura"}
                  </div>
                </div>

                <div
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    borderRadius: 18,
                    padding: 16,
                  }}
                >
                  <div style={{ fontSize: 12, fontWeight: 800, opacity: 0.8, marginBottom: 8 }}>
                    Itens cadastrados
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 800 }}>{itens.length}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ ...cardBase(), marginTop: 22 }}>
          <div style={{ ...badgeStyle(), marginBottom: 14 }}>Novo item</div>

          <form onSubmit={salvarItem}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 14,
              }}
            >
              <input
                value={form.nome}
                onChange={(e) => atualizarCampo("nome", e.target.value)}
                placeholder="Nome do item"
                style={campoStyle()}
              />

              <input
                value={form.categoria}
                onChange={(e) => atualizarCampo("categoria", e.target.value)}
                placeholder="Categoria"
                style={campoStyle()}
              />

              <input
                value={form.local}
                onChange={(e) => atualizarCampo("local", e.target.value)}
                placeholder="Local / guarda"
                style={campoStyle()}
              />

              <input
                type="date"
                value={form.dataReferencia}
                onChange={(e) => atualizarCampo("dataReferencia", e.target.value)}
                style={campoStyle()}
              />

              <input
                value={form.status}
                onChange={(e) => atualizarCampo("status", e.target.value)}
                placeholder="Status"
                style={campoStyle()}
              />

              <textarea
                value={form.observacoes}
                onChange={(e) => atualizarCampo("observacoes", e.target.value)}
                placeholder="Observações"
                rows={4}
                style={{
                  ...campoStyle(),
                  minHeight: 110,
                  resize: "vertical",
                  gridColumn: "1 / -1",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
                marginTop: 16,
              }}
            >
              <button
                type="submit"
                style={{
                  cursor: "pointer",
                  border: "none",
                  borderRadius: 16,
                  background: "linear-gradient(180deg, #166534 0%, #14532d 100%)",
                  color: "#ffffff",
                  padding: "14px 18px",
                  fontWeight: 800,
                  minWidth: 170,
                }}
              >
                Salvar item
              </button>

              <button
                type="button"
                onClick={limparFormulario}
                style={{
                  cursor: "pointer",
                  borderRadius: 16,
                  background: "#ffffff",
                  color: "#0f172a",
                  border: "1px solid #cbd5e1",
                  padding: "14px 18px",
                  fontWeight: 800,
                  minWidth: 170,
                }}
              >
                Limpar formulário
              </button>
            </div>
          </form>

          {mensagem ? (
            <div
              style={{
                marginTop: 14,
                borderRadius: 16,
                border: "1px solid #bbf7d0",
                background: "#ecfdf5",
                color: "#166534",
                padding: 14,
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              {mensagem}
            </div>
          ) : null}

          {erro ? (
            <div
              style={{
                marginTop: 14,
                borderRadius: 16,
                border: "1px solid #fecdd3",
                background: "#fff1f2",
                color: "#9f1239",
                padding: 14,
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              {erro}
            </div>
          ) : null}
        </section>

        <section style={{ marginTop: 22, display: "grid", gap: 16 }}>
          {itens.length === 0 ? (
            <section style={cardBase()}>
              <div style={{ ...badgeStyle(), marginBottom: 14 }}>Base de acervo</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#0f172a" }}>
                Nenhum item cadastrado ainda.
              </div>
            </section>
          ) : (
            itens.map((item) => (
              <section key={item.id} style={cardBase()}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                    gap: 14,
                    alignItems: "start",
                  }}
                >
                  <div style={{ gridColumn: "1 / -1" }}>
                    <div
                      style={{
                        fontSize: 28,
                        lineHeight: 1.2,
                        fontWeight: 900,
                        color: "#0f172a",
                        marginBottom: 10,
                      }}
                    >
                      {item.nome}
                    </div>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      <span style={badgeStyle("#166534", "#dcfce7", "#86efac")}>
                        {item.categoria || "Sem categoria"}
                      </span>
                      <span style={badgeStyle("#1d4ed8", "#eff6ff", "#bfdbfe")}>
                        {item.status || "Sem status"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: 12, fontWeight: 800, color: "#475569", marginBottom: 8 }}>
                      Local
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: "#0f172a" }}>
                      {item.local || "Não informado"}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: 12, fontWeight: 800, color: "#475569", marginBottom: 8 }}>
                      Data de referência
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: "#0f172a" }}>
                      {formatarDataBR(item.dataReferencia)}
                    </div>
                  </div>

                  <div style={{ gridColumn: "1 / -1" }}>
                    <div style={{ fontSize: 12, fontWeight: 800, color: "#475569", marginBottom: 8 }}>
                      Observações
                    </div>
                    <div
                      style={{
                        fontSize: 16,
                        lineHeight: 1.7,
                        color: "#475569",
                        background: "#f8fafc",
                        border: "1px solid #e2e8f0",
                        borderRadius: 16,
                        padding: 14,
                      }}
                    >
                      {item.observacoes || "Sem observações adicionais."}
                    </div>
                  </div>

                  <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "flex-end" }}>
                    <button
                      type="button"
                      onClick={() => removerItem(item.id)}
                      style={{
                        cursor: "pointer",
                        borderRadius: 16,
                        background: "#ffffff",
                        color: "#991b1b",
                        border: "1px solid #fecdd3",
                        padding: "12px 18px",
                        fontWeight: 800,
                        minWidth: 140,
                      }}
                    >
                      Remover
                    </button>
                  </div>
                </div>
              </section>
            ))
          )}
        </section>
      </div>
    </main>
  );
}