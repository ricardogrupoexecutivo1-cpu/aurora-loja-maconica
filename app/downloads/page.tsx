"use client";

const CAPA_OFICIAL = "/uploads/capas/conquistar-capa-1776452334894.png";

export default function DownloadsPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #f8fafc 0%, #eef2f7 50%, #e2e8f0 100%)",
        padding: "32px 16px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: 24,
            padding: 24,
            boxShadow: "0 20px 50px rgba(15, 23, 42, 0.08)",
          }}
        >
          <div style={{ marginBottom: 24 }}>
            <p
              style={{
                margin: 0,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 1.2,
                textTransform: "uppercase",
                color: "#0ea5e9",
              }}
            >
              Aurora Loja Maçônica
            </p>

            <h1
              style={{
                margin: "10px 0 8px",
                fontSize: 34,
                lineHeight: 1.1,
                color: "#0f172a",
              }}
            >
              Downloads institucionais
            </h1>

            <p
              style={{
                margin: 0,
                fontSize: 16,
                lineHeight: 1.7,
                color: "#475569",
                maxWidth: 820,
              }}
            >
              Área preparada para disponibilizar conteúdos, materiais institucionais,
              arquivos protegidos e cortesias com leitura premium no celular e no computador.
            </p>
          </div>

          <div
            style={{
              marginBottom: 24,
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: 18,
              padding: 18,
            }}
          >
            <p
              style={{
                margin: "0 0 10px",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: 1,
                textTransform: "uppercase",
                color: "#0f172a",
              }}
            >
              Capa oficial do livro
            </p>

            <p
              style={{
                margin: "0 0 14px",
                fontSize: 14,
                lineHeight: 1.7,
                color: "#64748b",
              }}
            >
              A capa oficial desta base já está definida e carregada para leitura institucional segura.
            </p>

            <p
              style={{
                margin: 0,
                fontSize: 13,
                color: "#0f172a",
                fontWeight: 700,
              }}
            >
              Status: Capa oficial ativa nesta publicação 🚀
            </p>
          </div>

          <section
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(240px, 320px) 1fr",
              gap: 24,
              alignItems: "stretch",
            }}
          >
            <div
              style={{
                background: "#0f172a",
                borderRadius: 20,
                overflow: "hidden",
                minHeight: 420,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <img
                src={CAPA_OFICIAL}
                alt="Capa do livro Conquistar"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>

            <div
              style={{
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: 20,
                padding: 24,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                    color: "#a16207",
                  }}
                >
                  Cortesia institucional
                </p>

                <h2
                  style={{
                    margin: "10px 0 8px",
                    fontSize: 32,
                    lineHeight: 1.1,
                    color: "#111827",
                  }}
                >
                  CONQUISTAR
                </h2>

                <p
                  style={{
                    margin: "0 0 14px",
                    fontSize: 16,
                    lineHeight: 1.7,
                    color: "#475569",
                  }}
                >
                  O ser humano só não conquista o que não quer
                </p>

                <p
                  style={{
                    margin: "0 0 18px",
                    fontSize: 15,
                    lineHeight: 1.7,
                    color: "#334155",
                    fontWeight: 700,
                  }}
                >
                  Cortesia do Ir.&apos;. Ricardo Leonardo Moreira — Loja Restauração 160
                </p>

                <p
                  style={{
                    margin: 0,
                    fontSize: 15,
                    lineHeight: 1.8,
                    color: "#64748b",
                  }}
                >
                  Material disponibilizado para leitura, consulta e download direto,
                  mantendo acesso simples, elegante e funcional para a base institucional.
                </p>

                <p
                  style={{
                    margin: "16px 0 0",
                    fontSize: 13,
                    lineHeight: 1.7,
                    color: "#166534",
                    fontWeight: 700,
                  }}
                >
                  URL oficial da capa: {CAPA_OFICIAL}
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: 12,
                  flexWrap: "wrap",
                  marginTop: 24,
                }}
              >
                <a
                  href="/livros/conquistar.pdf"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "12px 18px",
                    borderRadius: 12,
                    background: "#0f172a",
                    color: "#ffffff",
                    textDecoration: "none",
                    fontWeight: 700,
                    fontSize: 14,
                  }}
                >
                  Abrir PDF
                </a>

                <a
                  href="/livros/conquistar.pdf"
                  download
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "12px 18px",
                    borderRadius: 12,
                    background: "#0ea5e9",
                    color: "#ffffff",
                    textDecoration: "none",
                    fontWeight: 700,
                    fontSize: 14,
                  }}
                >
                  Baixar PDF
                </a>
              </div>
            </div>
          </section>

          <div
            style={{
              marginTop: 24,
              padding: 18,
              borderRadius: 16,
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
            }}
          >
            <p
              style={{
                margin: "0 0 8px",
                fontSize: 13,
                lineHeight: 1.7,
                color: "#64748b",
              }}
            >
              Sistema em constante atualização e pode haver momentos de instabilidade durante melhorias.
            </p>

            <p
              style={{
                margin: 0,
                fontSize: 13,
                lineHeight: 1.7,
                color: "#64748b",
              }}
            >
              Esta versão está blindada para publicação, com capa oficial fixa e experiência premium de leitura e download.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}