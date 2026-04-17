type ResumoItem = {
  rotulo: string;
  valor: string;
  descricao: string;
};

type AreaItem = {
  titulo: string;
  descricao: string;
  href: string;
};

export default function HomePage() {
  const resumo: ResumoItem[] = [
    {
      rotulo: "Loja",
      valor: "Restrita",
      descricao: "Uso interno com acesso controlado",
    },
    {
      rotulo: "Plano atual",
      valor: "Cortesia",
      descricao: "Cadastro com liberação automática inicial",
    },
    {
      rotulo: "Módulos liberados",
      valor: "4",
      descricao: "Família, histórico, documentos e agenda",
    },
    {
      rotulo: "Acesso",
      valor: "Imediato",
      descricao: "Entrada prática em celular e computador",
    },
  ];

  const areas: AreaItem[] = [
    {
      titulo: "Área de irmãos",
      descricao:
        "Ambiente protegido para acesso interno, leitura institucional e expansão por cargos autorizados.",
      href: "/irmaos",
    },
    {
      titulo: "Família e histórico",
      descricao:
        "Cadastro familiar, memória social, histórico institucional e dados organizados com leitura elegante.",
      href: "/irmaos/familia",
    },
    {
      titulo: "Agenda institucional",
      descricao:
        "Reuniões, solenidades, compromissos e rotina da loja em um ambiente claro e pronto para crescer.",
      href: "/agenda",
    },
    {
      titulo: "Documentos protegidos",
      descricao:
        "Downloads, arquivos internos, declarações e materiais reservados sob login e acesso controlado.",
      href: "/irmaos/documentos",
    },
  ];

  const acessos = [
    { label: "Cargos", href: "/cargos" },
    { label: "Financeiro", href: "/financeiro" },
    { label: "Downloads", href: "/irmaos/documentos" },
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, rgba(217,243,226,0.85), transparent 28%), radial-gradient(circle at bottom right, rgba(210,238,219,0.72), transparent 24%), linear-gradient(180deg, #f8fcf9 0%, #f1f8f4 52%, #edf6f1 100%)",
        color: "#102418",
        padding: "14px",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "1180px",
          margin: "0 auto 22px auto",
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.94) 0%, rgba(248,252,249,0.98) 100%)",
          border: "1px solid rgba(200,226,209,0.95)",
          borderRadius: "34px",
          boxShadow:
            "0 30px 90px rgba(18, 65, 39, 0.08), 0 10px 30px rgba(18, 65, 39, 0.05)",
          padding: "22px",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: "-40px",
            top: "-30px",
            width: "220px",
            height: "220px",
            borderRadius: "999px",
            background: "rgba(137, 220, 168, 0.22)",
            filter: "blur(34px)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "-60px",
            bottom: "-60px",
            width: "240px",
            height: "240px",
            borderRadius: "999px",
            background: "rgba(184, 231, 202, 0.25)",
            filter: "blur(36px)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            marginBottom: "22px",
          }}
        >
          {acessos.map((item) => (
            <a
              key={item.label}
              href={item.href}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
                padding: "12px 16px",
                borderRadius: "16px",
                background: "rgba(255,255,255,0.88)",
                color: "#18492f",
                border: "1px solid rgba(198,225,208,0.95)",
                fontWeight: 700,
                boxShadow: "0 8px 20px rgba(18, 65, 39, 0.05)",
              }}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "20px",
            alignItems: "stretch",
          }}
        >
          <div style={{ minWidth: 0 }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "999px",
                padding: "10px 16px",
                fontSize: "0.9rem",
                fontWeight: 800,
                background:
                  "linear-gradient(180deg, rgba(236,255,242,1) 0%, rgba(220,247,231,1) 100%)",
                border: "1px solid rgba(182,223,196,0.98)",
                color: "#20623f",
                marginBottom: "16px",
              }}
            >
              Aurora Loja Maçônica
            </span>

            <h1
              style={{
                margin: 0,
                fontSize: "clamp(2.2rem, 5vw, 3.35rem)",
                lineHeight: 0.96,
                letterSpacing: "-0.06em",
                color: "#0b1f14",
                fontWeight: 900,
              }}
            >
              Sistema institucional premium com base protegida para irmãos,
              família, memória, agenda e documentos.
            </h1>

            <p
              style={{
                margin: "16px 0 0 0",
                color: "#486256",
                lineHeight: 1.85,
                fontSize: "1.04rem",
                maxWidth: "700px",
              }}
            >
              Plataforma profissional com leitura elegante, privacidade
              institucional e experiência sólida no celular e no computador,
              preparada para crescer com estabilidade e padrão premium.
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                marginTop: "24px",
              }}
            >
              <a
                href="/irmaos"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                  padding: "14px 20px",
                  borderRadius: "18px",
                  background:
                    "linear-gradient(180deg, #17643f 0%, #125433 100%)",
                  color: "#ffffff",
                  fontWeight: 800,
                  boxShadow: "0 14px 30px rgba(23, 100, 63, 0.18)",
                  minWidth: "210px",
                }}
              >
                Acessar área interna
              </a>

              <a
                href="/planos"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                  padding: "14px 20px",
                  borderRadius: "18px",
                  background: "rgba(255,255,255,0.84)",
                  color: "#18492f",
                  border: "1px solid rgba(191,223,204,0.95)",
                  fontWeight: 800,
                  minWidth: "160px",
                }}
              >
                Ver planos
              </a>

              <a
                href="/configurar-loja"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                  padding: "14px 20px",
                  borderRadius: "18px",
                  background:
                    "linear-gradient(180deg, #c79a52 0%, #b8873f 100%)",
                  color: "#ffffff",
                  fontWeight: 800,
                  boxShadow: "0 14px 28px rgba(176, 141, 87, 0.18)",
                  minWidth: "220px",
                }}
              >
                Começar grátis por 90 dias
              </a>
            </div>
          </div>

          <div style={{ minWidth: 0 }}>
            <div
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(247,252,248,0.98) 100%)",
                border: "1px solid rgba(195,228,208,0.82)",
                boxShadow: "0 18px 50px rgba(16, 36, 24, 0.06)",
                borderRadius: "28px",
                padding: "18px",
                height: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: "14px",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "999px",
                    padding: "9px 14px",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    background: "rgba(225,246,233,0.92)",
                    border: "1px solid rgba(190,225,202,0.95)",
                    color: "#2a744b",
                    whiteSpace: "nowrap",
                  }}
                >
                  Acesso institucional
                </span>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "12px",
                }}
              >
                {[
                  {
                    rotulo: "Responsável",
                    valor: "Ricardo Grupo Executivo",
                  },
                  {
                    rotulo: "Plano",
                    valor: "Cortesia",
                  },
                  {
                    rotulo: "Status",
                    valor: "Ativa",
                  },
                  {
                    rotulo: "Liberação",
                    valor: "Automática",
                  },
                ].map((item) => (
                  <div
                    key={item.rotulo}
                    style={{
                      background:
                        "linear-gradient(180deg, #ffffff 0%, #f8fdf9 100%)",
                      border: "1px solid rgba(208,234,218,0.9)",
                      borderRadius: "22px",
                      padding: "16px",
                      minWidth: 0,
                    }}
                  >
                    <span
                      style={{
                        display: "block",
                        fontSize: "0.82rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "#5b7668",
                        marginBottom: "10px",
                        fontWeight: 700,
                      }}
                    >
                      {item.rotulo}
                    </span>
                    <strong
                      style={{
                        display: "block",
                        fontSize: "1.05rem",
                        lineHeight: 1.35,
                        color: "#0f2418",
                        overflowWrap: "anywhere",
                        wordBreak: "break-word",
                      }}
                    >
                      {item.valor}
                    </strong>
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: "14px",
                  borderRadius: "24px",
                  background:
                    "linear-gradient(180deg, rgba(246,238,224,0.96), rgba(240,229,206,0.94))",
                  border: "1px solid rgba(226, 207, 166, 0.95)",
                  padding: "18px",
                  color: "#5a4827",
                }}
              >
                <strong
                  style={{
                    display: "block",
                    fontSize: "1.04rem",
                    marginBottom: "8px",
                  }}
                >
                  Cortesia automática por até 90 dias
                </strong>
                <p
                  style={{
                    margin: 0,
                    lineHeight: 1.75,
                    fontSize: "0.98rem",
                  }}
                >
                  Ao concluir a configuração inicial da loja, o sistema pode
                  liberar a entrada em cortesia de forma prática, sem depender
                  de WhatsApp e sem travar a conversão.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        style={{
          width: "100%",
          maxWidth: "1180px",
          margin: "0 auto 22px auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
          }}
        >
          {resumo.map((item) => (
            <article
              key={item.rotulo}
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(248,252,249,0.98) 100%)",
                border: "1px solid rgba(195,228,208,0.82)",
                boxShadow: "0 16px 50px rgba(16, 36, 24, 0.06)",
                borderRadius: "28px",
                padding: "22px",
                minWidth: 0,
              }}
            >
              <span
                style={{
                  display: "block",
                  fontSize: "0.82rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#5b7668",
                  marginBottom: "10px",
                  fontWeight: 700,
                }}
              >
                {item.rotulo}
              </span>
              <strong
                style={{
                  display: "block",
                  fontSize: "clamp(1.8rem, 4vw, 2.15rem)",
                  lineHeight: 1,
                  marginBottom: "12px",
                  letterSpacing: "-0.04em",
                  color: "#0f2418",
                }}
              >
                {item.valor}
              </strong>
              <p
                style={{
                  margin: 0,
                  color: "#567062",
                  lineHeight: 1.7,
                  fontSize: "1rem",
                }}
              >
                {item.descricao}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        style={{
          width: "100%",
          maxWidth: "1180px",
          margin: "0 auto 22px auto",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.94) 0%, rgba(248,252,249,0.98) 100%)",
          border: "1px solid rgba(195,228,208,0.82)",
          boxShadow: "0 16px 50px rgba(16, 36, 24, 0.06)",
          borderRadius: "32px",
          padding: "22px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "16px",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ minWidth: 0 }}>
            <h2
              style={{
                margin: 0,
                fontSize: "clamp(1.9rem, 4vw, 2.5rem)",
                lineHeight: 1,
                letterSpacing: "-0.05em",
                color: "#0f2418",
              }}
            >
              Estrutura institucional
            </h2>
            <p
              style={{
                margin: "12px 0 0 0",
                color: "#567062",
                lineHeight: 1.75,
                fontSize: "1.02rem",
              }}
            >
              Base preparada para acesso protegido, memória institucional e
              crescimento sólido da plataforma.
            </p>
          </div>

          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "999px",
              padding: "9px 14px",
              fontSize: "0.9rem",
              fontWeight: 700,
              background: "rgba(225,246,233,0.92)",
              border: "1px solid rgba(190,225,202,0.95)",
              color: "#2a744b",
              whiteSpace: "nowrap",
            }}
          >
            Padrão premium
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "18px",
          }}
        >
          {areas.map((area) => (
            <article
              key={area.titulo}
              style={{
                background:
                  "linear-gradient(180deg, #ffffff 0%, #f8fdf9 100%)",
                border: "1px solid rgba(214,236,223,0.95)",
                borderRadius: "28px",
                padding: "22px",
                minWidth: 0,
              }}
            >
              <h3
                style={{
                  margin: "0 0 12px 0",
                  fontSize: "1.45rem",
                  lineHeight: 1.05,
                  letterSpacing: "-0.04em",
                  color: "#0f2418",
                }}
              >
                {area.titulo}
              </h3>

              <p
                style={{
                  margin: "0 0 18px 0",
                  color: "#4f685c",
                  lineHeight: 1.8,
                  fontSize: "1rem",
                }}
              >
                {area.descricao}
              </p>

              <a
                href={area.href}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                  padding: "13px 18px",
                  borderRadius: "16px",
                  background:
                    "linear-gradient(180deg, #17643f 0%, #125433 100%)",
                  color: "#ffffff",
                  fontWeight: 700,
                  boxShadow: "0 10px 24px rgba(23, 100, 63, 0.16)",
                  width: "100%",
                }}
              >
                Abrir área
              </a>
            </article>
          ))}
        </div>
      </section>

      <section
        style={{
          width: "100%",
          maxWidth: "1180px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(248,252,249,0.98) 100%)",
            border: "1px solid rgba(195,228,208,0.82)",
            boxShadow: "0 16px 50px rgba(16, 36, 24, 0.06)",
            borderRadius: "30px",
            padding: "22px",
            color: "#567062",
            lineHeight: 1.75,
            fontSize: "0.98rem",
          }}
        >
          <strong style={{ color: "#174d2b" }}>
            Sistema em constante atualização.
          </strong>{" "}
          Esta plataforma está evoluindo em etapas seguras, preservando a
          estabilidade do que já foi publicado.
        </div>
      </section>
    </main>
  );
}