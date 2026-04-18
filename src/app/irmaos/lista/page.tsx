"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { protegerRota } from "@/lib/authGuard";

type IrmaoRegistro = {
  id: string;
  nome: string;
  cargo: string;
  loja: string;
  grau: string;
  funcao: string;
  telefone: string;
  email: string;
  ativo: boolean;
  criadoEm: string;
};

const STORAGE_KEY = "aurora-loja-maconica-lista-irmaos-v1";

const BASE_INICIAL: IrmaoRegistro[] = [
  {
    id: "1",
    nome: "Ricardo Justino Silva",
    cargo: "Venerável Mestre",
    loja: "Loja Maçônica Aurora",
    grau: "Mestre",
    funcao: "Administrador master",
    telefone: "(31) 99749-0074",
    email: "ricardogrupoexecutivo1@gmail.com",
    ativo: true,
    criadoEm: new Date().toISOString(),
  },
];

function baixarJson(nomeArquivo: string, conteudo: unknown) {
  const blob = new Blob([JSON.stringify(conteudo, null, 2)], {
    type: "application/json;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = nomeArquivo;
  link.click();
  URL.revokeObjectURL(url);
}

function cardStyle(): React.CSSProperties {
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

export default function ListaIrmaosPage() {
  const sessao = protegerRota();
  if (!sessao) return null;

  const [irmaos, setIrmaos] = useState<IrmaoRegistro[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState("");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    try {
      const salvo = localStorage.getItem(STORAGE_KEY);

      if (salvo) {
        const dados = JSON.parse(salvo);
        if (Array.isArray(dados) && dados.length > 0) {
          setIrmaos(dados);
        } else {
          setIrmaos(BASE_INICIAL);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(BASE_INICIAL));
        }
      } else {
        setIrmaos(BASE_INICIAL);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(BASE_INICIAL));
      }
    } catch {
      setIrmaos(BASE_INICIAL);
    } finally {
      setCarregando(false);
    }
  }, []);

  const irmaosFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    if (!termo) return irmaos;

    return irmaos.filter((item) =>
      [
        item.nome,
        item.cargo,
        item.loja,
        item.grau,
        item.funcao,
        item.telefone,
        item.email,
        item.ativo ? "ativo" : "inativo",
      ]
        .join(" ")
        .toLowerCase()
        .includes(termo),
    );
  }, [irmaos, busca]);

  const totalAtivos = irmaos.filter((item) => item.ativo).length;
  const totalMestres = irmaos.filter((item) => item.grau.toLowerCase() === "mestre").length;
  const totalAprendizes = irmaos.filter((item) => item.grau.toLowerCase() === "aprendiz").length;

  function baixarBase() {
    baixarJson(
      `irmaos-loja-maconica-${new Date().toISOString().slice(0, 10)}.json`,
      {
        sistema: "Aurora Loja Maçônica",
        modulo: "Lista de irmãos",
        exportadoEm: new Date().toISOString(),
        totalRegistros: irmaos.length,
        registros: irmaos,
      },
    );
    setMensagem("Base de irmãos baixada com sucesso.");
  }

  function imprimirLista() {
    window.print();
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #f7fbf8 0%, #eef7f1 50%, #f7fbf8 100%)",
        padding: "24px 16px 56px",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <section
          style={{
            ...cardStyle(),
            background: "linear-gradient(135deg, #052e2b 0%, #065f46 55%, #059669 100%)",
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
                  ...badgeStyle("#dcfce7", "rgba(255,255,255,0.12)", "rgba(255,255,255,0.18)"),
                  marginBottom: 16,
                }}
              >
                Lista interna dos irmãos
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
                Relação fácil dos irmãos
              </h1>

              <p
                style={{
                  marginTop: 16,
                  marginBottom: 0,
                  maxWidth: 760,
                  color: "rgba(255,255,255,0.92)",
                  lineHeight: 1.8,
                  fontSize: 17,
                }}
              >
                Área interna com leitura simples, grande e organizada para consulta rápida de
                irmãos, cargos, loja, grau e função institucional.
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
                  href="/irmaos"
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
                  Voltar aos irmãos
                </Link>

                <button
                  type="button"
                  onClick={baixarBase}
                  style={{
                    cursor: "pointer",
                    background: "rgba(255,255,255,0.10)",
                    color: "#ffffff",
                    padding: "12px 18px",
                    borderRadius: 16,
                    fontWeight: 800,
                    border: "1px solid rgba(255,255,255,0.18)",
                  }}
                >
                  Baixar base
                </button>

                <button
                  type="button"
                  onClick={imprimirLista}
                  style={{
                    cursor: "pointer",
                    background: "rgba(255,255,255,0.10)",
                    color: "#ffffff",
                    padding: "12px 18px",
                    borderRadius: 16,
                    fontWeight: 800,
                    border: "1px solid rgba(255,255,255,0.18)",
                  }}
                >
                  Imprimir lista
                </button>
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
                <strong>Leitura facilitada.</strong> Esta área foi pensada para consulta rápida,
                especialmente para irmãos mais velhos, com leitura clara e acesso simples.
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                  gap: 12,
                }}
              >
                <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 18, padding: 16 }}>
                  <div style={{ fontSize: 12, fontWeight: 800, opacity: 0.8, marginBottom: 8 }}>
                    Total
                  </div>
                  <div style={{ fontSize: 24, fontWeight: 900 }}>{irmaos.length}</div>
                </div>

                <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 18, padding: 16 }}>
                  <div style={{ fontSize: 12, fontWeight: 800, opacity: 0.8, marginBottom: 8 }}>
                    Ativos
                  </div>
                  <div style={{ fontSize: 24, fontWeight: 900 }}>{totalAtivos}</div>
                </div>

                <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 18, padding: 16 }}>
                  <div style={{ fontSize: 12, fontWeight: 800, opacity: 0.8, marginBottom: 8 }}>
                    Mestres
                  </div>
                  <div style={{ fontSize: 24, fontWeight: 900 }}>{totalMestres}</div>
                </div>

                <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 18, padding: 16 }}>
                  <div style={{ fontSize: 12, fontWeight: 800, opacity: 0.8, marginBottom: 8 }}>
                    Aprendizes
                  </div>
                  <div style={{ fontSize: 24, fontWeight: 900 }}>{totalAprendizes}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          style={{
            ...cardStyle(),
            marginTop: 22,
          }}
        >
          <div
            style={{
              display: "grid",
              gap: 14,
            }}
          >
            <div>
              <div style={{ ...badgeStyle(), marginBottom: 12 }}>Busca simples</div>
              <input
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Buscar por nome, cargo, loja, grau, função, telefone ou e-mail..."
                style={{
                  width: "100%",
                  borderRadius: 16,
                  border: "1px solid #cbd5e1",
                  padding: "14px 16px",
                  fontSize: 16,
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {mensagem ? (
              <div
                style={{
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
          </div>
        </section>

        <section
          style={{
            marginTop: 22,
            display: "grid",
            gap: 16,
          }}
        >
          {carregando ? (
            <section style={cardStyle()}>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#0f172a" }}>
                Carregando relação dos irmãos...
              </div>
            </section>
          ) : irmaosFiltrados.length === 0 ? (
            <section style={cardStyle()}>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#0f172a" }}>
                Nenhum irmão encontrado com os filtros atuais.
              </div>
            </section>
          ) : (
            irmaosFiltrados.map((irmao) => (
              <section key={irmao.id} style={cardStyle()}>
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
                      {irmao.nome}
                    </div>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      <span style={badgeStyle("#166534", "#dcfce7", "#86efac")}>{irmao.cargo}</span>
                      <span style={badgeStyle("#1d4ed8", "#eff6ff", "#bfdbfe")}>{irmao.grau}</span>
                      <span style={badgeStyle("#7c3aed", "#f5f3ff", "#ddd6fe")}>{irmao.funcao}</span>
                      <span
                        style={
                          irmao.ativo
                            ? badgeStyle("#166534", "#ecfdf5", "#bbf7d0")
                            : badgeStyle("#991b1b", "#fff1f2", "#fecdd3")
                        }
                      >
                        {irmao.ativo ? "Ativo" : "Inativo"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: 12, fontWeight: 800, color: "#475569", marginBottom: 8 }}>
                      Loja
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: "#0f172a" }}>{irmao.loja}</div>
                  </div>

                  <div>
                    <div style={{ fontSize: 12, fontWeight: 800, color: "#475569", marginBottom: 8 }}>
                      Telefone
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: "#0f172a" }}>
                      {irmao.telefone || "Não informado"}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: 12, fontWeight: 800, color: "#475569", marginBottom: 8 }}>
                      E-mail
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: "#0f172a", wordBreak: "break-word" }}>
                      {irmao.email || "Não informado"}
                    </div>
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