"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type EventoFoto = {
  id: string;
  nome: string;
  data: string;
  descricao: string;
};

type FotoRegistro = {
  id: string;
  eventoId: string;
  nomeArquivo: string;
  imagemBase64: string;
  criadoEm: string;
};

const CHAVE_EVENTOS = "aurora_eventos_fotos";
const CHAVE_FOTOS = "aurora_eventos_fotos_imagens";

function lerEventos(): EventoFoto[] {
  if (typeof window === "undefined") return [];

  try {
    const dados = localStorage.getItem(CHAVE_EVENTOS);
    return dados ? JSON.parse(dados) : [];
  } catch {
    return [];
  }
}

function lerFotos(): FotoRegistro[] {
  if (typeof window === "undefined") return [];

  try {
    const dados = localStorage.getItem(CHAVE_FOTOS);
    return dados ? JSON.parse(dados) : [];
  } catch {
    return [];
  }
}

function salvarFotos(fotos: FotoRegistro[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CHAVE_FOTOS, JSON.stringify(fotos));
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

function formatarDataHora(valor: string) {
  if (!valor) return "-";
  const data = new Date(valor);
  if (Number.isNaN(data.getTime())) return valor;

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(data);
}

function lerArquivoComoBase64(arquivo: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const leitor = new FileReader();
    leitor.onload = () => {
      if (typeof leitor.result === "string") {
        resolve(leitor.result);
      } else {
        reject(new Error("Falha ao converter imagem."));
      }
    };
    leitor.onerror = () => reject(new Error("Erro ao ler arquivo."));
    leitor.readAsDataURL(arquivo);
  });
}

export default function FotosEventoPage() {
  const params = useParams<{ id: string }>();
  const eventoId = String(params?.id ?? "");

  const [evento, setEvento] = useState<EventoFoto | null>(null);
  const [fotos, setFotos] = useState<FotoRegistro[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    try {
      const eventos = lerEventos();
      const eventoAtual = eventos.find((item) => item.id === eventoId) ?? null;
      setEvento(eventoAtual);

      const todasFotos = lerFotos();
      const fotosDoEvento = todasFotos.filter((item) => item.eventoId === eventoId);
      setFotos(fotosDoEvento);
    } catch {
      setErro("Não foi possível carregar os dados do evento.");
    } finally {
      setCarregando(false);
    }
  }, [eventoId]);

  const totalFotos = fotos.length;

  const fotosOrdenadas = useMemo(() => {
    return [...fotos].sort(
      (a, b) => new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime(),
    );
  }, [fotos]);

  async function subirArquivos(event: React.ChangeEvent<HTMLInputElement>) {
    const arquivos = event.target.files;

    if (!arquivos || arquivos.length === 0) return;
    if (!eventoId) return;

    setEnviando(true);
    setMensagem("");
    setErro("");

    try {
      const fotosAtuais = lerFotos();
      const novasFotos: FotoRegistro[] = [];

      for (const arquivo of Array.from(arquivos)) {
        const imagemBase64 = await lerArquivoComoBase64(arquivo);

        novasFotos.push({
          id: gerarId(),
          eventoId,
          nomeArquivo: arquivo.name,
          imagemBase64,
          criadoEm: new Date().toISOString(),
        });
      }

      const atualizadas = [...novasFotos, ...fotosAtuais];
      salvarFotos(atualizadas);

      const fotosDoEvento = atualizadas.filter((item) => item.eventoId === eventoId);
      setFotos(fotosDoEvento);
      setMensagem("Foto(s) enviada(s) com sucesso para este evento.");
      event.target.value = "";
    } catch {
      setErro("Não foi possível enviar as fotos selecionadas.");
    } finally {
      setEnviando(false);
    }
  }

  function excluirFoto(id: string) {
    const confirmado = window.confirm("Deseja excluir esta foto do evento?");
    if (!confirmado) return;

    try {
      const todas = lerFotos();
      const atualizadas = todas.filter((item) => item.id !== id);
      salvarFotos(atualizadas);

      const fotosDoEvento = atualizadas.filter((item) => item.eventoId === eventoId);
      setFotos(fotosDoEvento);
      setMensagem("Foto removida com sucesso.");
      setErro("");
    } catch {
      setErro("Não foi possível remover esta foto.");
    }
  }

  if (carregando) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "linear-gradient(180deg, #f7fbf8 0%, #eef7f1 50%, #f7fbf8 100%)",
          padding: "24px 16px 56px",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div style={{ maxWidth: 1260, margin: "0 auto" }}>
          <section style={cardBase()}>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#0f172a" }}>
              Carregando evento...
            </div>
          </section>
        </div>
      </main>
    );
  }

  if (!evento) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "linear-gradient(180deg, #f7fbf8 0%, #eef7f1 50%, #f7fbf8 100%)",
          padding: "24px 16px 56px",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div style={{ maxWidth: 1260, margin: "0 auto" }}>
          <section style={cardBase()}>
            <div style={{ ...badgeStyle(), marginBottom: 14 }}>Evento não encontrado</div>
            <h1
              style={{
                marginTop: 0,
                marginBottom: 12,
                color: "#0f172a",
                fontSize: 28,
                lineHeight: 1.15,
              }}
            >
              Não foi possível localizar este evento
            </h1>
            <p style={{ marginTop: 0, color: "#475569", lineHeight: 1.8 }}>
              O registro pode ter sido removido ou ainda não estar salvo na base local.
            </p>

            <Link
              href="/fotos"
              style={{
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 48,
                padding: "0 18px",
                borderRadius: 16,
                fontWeight: 800,
                background: "linear-gradient(135deg, #166534 0%, #22c55e 100%)",
                color: "#ffffff",
                boxShadow: "0 16px 35px rgba(34, 197, 94, 0.18)",
              }}
            >
              Voltar para eventos
            </Link>
          </section>
        </div>
      </main>
    );
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
      <div style={{ maxWidth: 1260, margin: "0 auto" }}>
        <section
          style={{
            ...cardBase(),
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
            }}
          >
            <div>
              <div
                style={{
                  ...badgeStyle("#dcfce7", "rgba(255,255,255,0.12)", "rgba(255,255,255,0.18)"),
                  marginBottom: 16,
                }}
              >
                Fotos do evento
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
                {evento.nome}
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
                Área para guardar e organizar fotos por evento, em leitura simples, com ordem
                cronológica e base preparada para memória institucional.
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
                  href="/fotos"
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
                  Voltar para eventos
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
                <strong>Resumo do evento.</strong> Esta área facilita a separação por data,
                preserva a memória institucional e mantém a leitura simples para consulta posterior.
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
                    Data
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 800 }}>{formatarDataBR(evento.data)}</div>
                </div>

                <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 18, padding: 16 }}>
                  <div style={{ fontSize: 12, fontWeight: 800, opacity: 0.8, marginBottom: 8 }}>
                    Fotos
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 800 }}>{totalFotos}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ ...cardBase(), marginTop: 22 }}>
          <div style={{ ...badgeStyle(), marginBottom: 14 }}>Informações do evento</div>

          <div
            style={{
              display: "grid",
              gap: 14,
            }}
          >
            <div>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#475569", marginBottom: 8 }}>
                Nome do evento
              </div>
              <div style={{ fontSize: 26, fontWeight: 900, color: "#0f172a" }}>{evento.nome}</div>
            </div>

            <div>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#475569", marginBottom: 8 }}>
                Descrição
              </div>
              <div
                style={{
                  fontSize: 16,
                  lineHeight: 1.8,
                  color: "#475569",
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: 16,
                  padding: 14,
                }}
              >
                {evento.descricao || "Sem descrição adicional para este evento."}
              </div>
            </div>
          </div>
        </section>

        <section style={{ ...cardBase(), marginTop: 22 }}>
          <div style={{ ...badgeStyle(), marginBottom: 14 }}>Subir fotos</div>

          <h2
            style={{
              marginTop: 0,
              marginBottom: 14,
              color: "#0f172a",
              fontSize: 26,
              lineHeight: 1.15,
            }}
          >
            Enviar imagens para este evento
          </h2>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={subirArquivos}
            style={{
              width: "100%",
              borderRadius: 16,
              border: "1px solid #cbd5e1",
              padding: "14px 16px",
              fontSize: 15,
              outline: "none",
              boxSizing: "border-box",
              background: "#ffffff",
              color: "#0f172a",
            }}
          />

          <div
            style={{
              marginTop: 14,
              fontSize: 14,
              lineHeight: 1.8,
              color: "#475569",
            }}
          >
            Você pode selecionar uma ou várias imagens de uma vez. Elas ficarão ligadas apenas
            a este evento.
          </div>

          {enviando ? (
            <div
              style={{
                marginTop: 14,
                borderRadius: 16,
                border: "1px solid #bfdbfe",
                background: "#eff6ff",
                color: "#1d4ed8",
                padding: 14,
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              Enviando imagens...
            </div>
          ) : null}

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
          {fotosOrdenadas.length === 0 ? (
            <section style={cardBase()}>
              <div style={{ ...badgeStyle(), marginBottom: 14 }}>Galeria</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#0f172a" }}>
                Nenhuma foto enviada ainda para este evento.
              </div>
            </section>
          ) : (
            <section style={cardBase()}>
              <div style={{ ...badgeStyle(), marginBottom: 14 }}>Galeria do evento</div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                  gap: 16,
                }}
              >
                {fotosOrdenadas.map((foto) => (
                  <div
                    key={foto.id}
                    style={{
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      borderRadius: 20,
                      padding: 14,
                      display: "grid",
                      gap: 12,
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        aspectRatio: "4 / 3",
                        overflow: "hidden",
                        borderRadius: 16,
                        background: "#e2e8f0",
                      }}
                    >
                      <img
                        src={foto.imagemBase64}
                        alt={foto.nomeArquivo}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    </div>

                    <div>
                      <div
                        style={{
                          fontSize: 15,
                          fontWeight: 800,
                          color: "#0f172a",
                          lineHeight: 1.5,
                          wordBreak: "break-word",
                        }}
                      >
                        {foto.nomeArquivo}
                      </div>

                      <div
                        style={{
                          marginTop: 6,
                          fontSize: 13,
                          color: "#64748b",
                          lineHeight: 1.6,
                        }}
                      >
                        Enviada em {formatarDataHora(foto.criadoEm)}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => excluirFoto(foto.id)}
                      style={{
                        cursor: "pointer",
                        borderRadius: 16,
                        background: "#ffffff",
                        color: "#991b1b",
                        border: "1px solid #fecdd3",
                        padding: "12px 18px",
                        fontWeight: 800,
                      }}
                    >
                      Excluir foto
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}
        </section>
      </div>
    </main>
  );
}