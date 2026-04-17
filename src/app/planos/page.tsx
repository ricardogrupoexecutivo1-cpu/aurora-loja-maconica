type PlanoItem = {
  nome: string;
  preco: string;
  destaque?: string;
  descricao: string;
  recursos: string[];
  cta: string;
  href: string;
  variante: "cortesia" | "premium";
};

export default function PlanosPage() {
  const planos: PlanoItem[] = [
    {
      nome: "Cortesia Institucional",
      preco: "Grátis por até 90 dias",
      destaque: "Entrada imediata",
      descricao:
        "Para lojas que desejam iniciar com velocidade, testar a base institucional e organizar a estrutura inicial sem travar a entrada.",
      recursos: [
        "Liberação automática após cadastro",
        "Até 90 dias de cortesia",
        "Configuração inicial da loja",
        "Área institucional protegida",
        "Família, histórico, agenda e documentos",
        "Uso em celular e computador",
      ],
      cta: "Começar grátis por 90 dias",
      href: "/configurar-loja",
      variante: "cortesia",
    },
    {
      nome: "Premium Institucional",
      preco: "Sob evolução comercial",
      destaque: "Expansão premium",
      descricao:
        "Para lojas que desejam evoluir a operação com mais estrutura, controle interno, crescimento institucional e futuras áreas administrativas premium.",
      recursos: [
        "Tudo da cortesia inicial",
        "Base preparada para expansão",
        "Organização institucional avançada",
        "Mais camadas de controle e gestão",
        "Prioridade na evolução do ambiente",
        "Pronto para próximos módulos premium",
      ],
      cta: "Começar pela base agora",
      href: "/configurar-loja",
      variante: "premium",
    },
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
          {[
            { label: "Voltar para Home", href: "/" },
            { label: "Configurar minha loja", href: "/configurar-loja" },
            { label: "Área interna", href: "/irmaos" },
          ].map((item) => (
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
              Planos da Aurora Loja Maçônica
            </span>

            <h1
              style={{
                margin: 0,
                fontSize: "clamp(2.1rem, 5vw, 3.2rem)",
                lineHeight: 0.96,
                letterSpacing: "-0.06em",
                color: "#0b1f14",
                fontWeight: 900,
              }}
            >
              Entrada prática agora, com base premium preparada para crescer.
            </h1>

            <p
              style={{
                margin: "16px 0 0 0",
                color: "#486256",
                lineHeight: 1.85,
                fontSize: "1.04rem",
                maxWidth: "720px",
              }}
            >
              A loja pode começar com cortesia automática por até 90 dias,
              organizar a estrutura inicial com segurança e evoluir depois para
              novas camadas institucionais premium sem travar a entrada.
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
                  minWidth: "240px",
                }}
              >
                Começar grátis por 90 dias
              </a>

              <a
                href="/"
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
                  minWidth: "170px",
                }}
              >
                Voltar à home
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
                  Fluxo atualizado
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
                    rotulo: "Liberação",
                    valor: "Automática",
                  },
                  {
                    rotulo: "Prazo",
                    valor: "Até 90 dias",
                  },
                  {
                    rotulo: "Entrada",
                    valor: "Sem WhatsApp",
                  },
                  {
                    rotulo: "Status inicial",
                    valor: "Ativa",
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
                  Cadastro com entrada inteligente
                </strong>
                <p
                  style={{
                    margin: 0,
                    lineHeight: 1.75,
                    fontSize: "0.98rem",
                  }}
                >
                  A nova lógica elimina análise manual por WhatsApp e favorece
                  a conversão: a loja se cadastra, configura a base e entra com
                  a cortesia inicial já liberada.
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
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
          gap: "18px",
        }}
      >
        {planos.map((plano) => {
          const isCortesia = plano.variante === "cortesia";

          return (
            <article
              key={plano.nome}
              style={{
                background: isCortesia
                  ? "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(249,252,248,0.99) 100%)"
                  : "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(246,250,247,0.99) 100%)",
                border: isCortesia
                  ? "2px solid rgba(199,154,82,0.72)"
                  : "1px solid rgba(195,228,208,0.82)",
                boxShadow: isCortesia
                  ? "0 22px 58px rgba(176, 141, 87, 0.12)"
                  : "0 16px 50px rgba(16, 36, 24, 0.06)",
                borderRadius: "30px",
                padding: "24px",
                minWidth: 0,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {plano.destaque ? (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "999px",
                    padding: "9px 14px",
                    fontSize: "0.86rem",
                    fontWeight: 800,
                    background: isCortesia
                      ? "linear-gradient(180deg, #f6e6c8 0%, #efd7aa 100%)"
                      : "rgba(225,246,233,0.92)",
                    border: isCortesia
                      ? "1px solid rgba(213,180,120,0.95)"
                      : "1px solid rgba(190,225,202,0.95)",
                    color: isCortesia ? "#7a5a22" : "#2a744b",
                    marginBottom: "16px",
                  }}
                >
                  {plano.destaque}
                </span>
              ) : null}

              <h2
                style={{
                  margin: 0,
                  fontSize: "1.8rem",
                  lineHeight: 1.02,
                  letterSpacing: "-0.04em",
                  color: "#0f2418",
                }}
              >
                {plano.nome}
              </h2>

              <div
                style={{
                  marginTop: "12px",
                  fontSize: "1.7rem",
                  fontWeight: 900,
                  color: isCortesia ? "#7a5a22" : "#174d2b",
                  letterSpacing: "-0.04em",
                }}
              >
                {plano.preco}
              </div>

              <p
                style={{
                  margin: "14px 0 0 0",
                  color: "#567062",
                  lineHeight: 1.8,
                  fontSize: "1rem",
                }}
              >
                {plano.descricao}
              </p>

              <div
                style={{
                  marginTop: "18px",
                  display: "grid",
                  gap: "10px",
                }}
              >
                {plano.recursos.map((item) => (
                  <div
                    key={item}
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "flex-start",
                      color: "#3f5c4e",
                      lineHeight: 1.7,
                      fontSize: "0.98rem",
                    }}
                  >
                    <span
                      style={{
                        marginTop: "5px",
                        width: "8px",
                        height: "8px",
                        minWidth: "8px",
                        borderRadius: "999px",
                        background: isCortesia ? "#c79a52" : "#1f6b3b",
                      }}
                    />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <a
                href={plano.href}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                  padding: "14px 18px",
                  borderRadius: "18px",
                  background: isCortesia
                    ? "linear-gradient(180deg, #c79a52 0%, #b8873f 100%)"
                    : "linear-gradient(180deg, #17643f 0%, #125433 100%)",
                  color: "#ffffff",
                  fontWeight: 800,
                  boxShadow: isCortesia
                    ? "0 14px 28px rgba(176, 141, 87, 0.18)"
                    : "0 14px 28px rgba(23, 100, 63, 0.16)",
                  width: "100%",
                  marginTop: "22px",
                }}
              >
                {plano.cta}
              </a>
            </article>
          );
        })}
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
            lineHeight: 1.8,
            fontSize: "0.98rem",
          }}
        >
          <strong style={{ color: "#174d2b" }}>
            Sistema em constante atualização.
          </strong>{" "}
          Novas funcionalidades podem ser adicionadas sem comprometer a base
          existente. A entrada com cortesia automática foi desenhada para
          facilitar a adesão, preservar a estabilidade e preparar a loja para
          evolução institucional segura.
        </div>
      </section>
    </main>
  );
}