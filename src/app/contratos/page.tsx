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

type ContratoRegistro = {
  id: string;
  titulo: string;
  tipo: string;
  responsavel: string;
  dataReferencia: string;
  status: string;
  observacoes: string;
  criadoEm: string;
};

const CHAVE_SESSAO = "aurora_loja_maconica_sessao";
const CHAVE_CONTRATOS = "aurora_loja_maconica_contratos_v1";

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

function lerContratos(): ContratoRegistro[] {
  if (typeof window === "undefined") return [];

  try {
    const dados = localStorage.getItem(CHAVE_CONTRATOS);
    return dados ? JSON.parse(dados) : [];
  } catch {
    return [];
  }
}

function salvarContratos(contratos: ContratoRegistro[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CHAVE_CONTRATOS, JSON.stringify(contratos));
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
  titulo: "",
  tipo: "",
  responsavel: "",
  dataReferencia: "",
  status: "Em organização",
  observacoes: "",
};

export default function ContratosPage() {
  const [sessao, setSessao] = useState<SessaoLoja | null>(null);
  const [carregandoSessao, setCarregandoSessao] = useState(true);

  const [contratos, setContratos] = useState<ContratoRegistro[]>([]);
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
    setContratos(lerContratos());
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

  function salvarContrato(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMensagem("");
    setErro("");

    if (!form.titulo.trim()) {
      setErro("Informe o título do contrato.");
      return;
    }

    const novo: ContratoRegistro = {
      id: gerarId(),
      titulo: form.titulo.trim(),
      tipo: form.tipo.trim(),
      responsavel: form.responsavel.trim(),
      dataReferencia: form.dataReferencia,
      status: form.status.trim(),
      observacoes: form.observacoes.trim(),
      criadoEm: new Date().toISOString(),
    };

    const atualizados = [novo, ...contratos];
    setContratos(atualizados);
    salvarContratos(atualizados);
    setForm(FORM_INICIAL);
    setMensagem("Contrato institucional salvo com sucesso.");
  }

  function removerContrato(id: string) {
    const confirmado = window.confirm("Deseja remover este contrato da lista?");
    if (!confirmado) return;

    const atualizados = contratos.filter((item) => item.id !== id);
    setContratos(atualizados);
    salvarContratos(atualizados);
    setMensagem("Contrato removido com sucesso.");
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
              Contratos institucionais
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
                Contratos institucionais
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
                Base de contratos da loja
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
                Área isolada para organizar contratos, termos, registros e documentos institucionais,
                seguindo a regra de segurança: nova função, nova página, sem mexer no restante da plataforma.
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
                para preservar a estabilidade do sistema enquanto a área contratual cresce com segurança.
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
              </div>
            </div>
          </div>
        </section>

        <section style={{ ...cardBase(), marginTop: 22 }}>
          <div style={{ ...badgeStyle(), marginBottom: 14 }}>Novo contrato</div>

          <form onSubmit={salvarContrato}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 14,
              }}
            >
              <input
                value={form.titulo}
                onChange={(e) => atualizarCampo("titulo", e.target.value)}
                placeholder="Título do contrato"
                style={campoStyle()}
              />

              <input
                value={form.tipo}
                onChange={(e) => atualizarCampo("tipo", e.target.value)}
                placeholder="Tipo"
                style={campoStyle()}
              />

              <input
                value={form.responsavel}
                onChange={(e) => atualizarCampo("responsavel", e.target.value)}
                placeholder="Responsável"
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
                Salvar contrato
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
          {contratos.length === 0 ? (
            <section style={cardBase()}>
              <div style={{ ...badgeStyle(), marginBottom: 14 }}>Base de contratos</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#0f172a" }}>
                Nenhum contrato cadastrado ainda.
              </div>
            </section>
          ) : (
            contratos.map((contrato) => (
              <section key={contrato.id} style={cardBase()}>
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
                      {contrato.titulo}
                    </div>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      <span style={badgeStyle("#166534", "#dcfce7", "#86efac")}>
                        {contrato.tipo || "Sem tipo"}
                      </span>
                      <span style={badgeStyle("#1d4ed8", "#eff6ff", "#bfdbfe")}>
                        {contrato.status || "Sem status"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: 12, fontWeight: 800, color: "#475569", marginBottom: 8 }}>
                      Responsável
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: "#0f172a" }}>
                      {contrato.responsavel || "Não informado"}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: 12, fontWeight: 800, color: "#475569", marginBottom: 8 }}>
                      Data de referência
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: "#0f172a" }}>
                      {formatarDataBR(contrato.dataReferencia)}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: 12, fontWeight: 800, color: "#475569", marginBottom: 8 }}>
                      Criado em
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: "#0f172a" }}>
                      {formatarDataBR(contrato.criadoEm.slice(0, 10))}
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
                      {contrato.observacoes || "Sem observações adicionais."}
                    </div>
                  </div>

                  <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "flex-end" }}>
                    <button
                      type="button"
                      onClick={() => removerContrato(contrato.id)}
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