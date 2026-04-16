import React from "react";

export default function PlanosPage() {
  const corCard = "#ffffff";
  const corBorda = "#d7e6d1";
  const corTexto = "#16311f";
  const corTextoSuave = "#4d6655";
  const corVerde = "#1f6b3b";
  const corVerdeEscuro = "#174d2b";
  const corVerdeClaro = "#e8f3e6";
  const corDourado = "#b08d57";
  const sombra = "0 18px 45px rgba(23, 77, 43, 0.10)";

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #f8fbf7 0%, #eef6eb 45%, #f4f8f2 100%)",
        padding: "28px 16px 40px",
        fontFamily: "Arial, sans-serif",
        color: corTexto,
      }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <section
          style={{
            background:
              "linear-gradient(135deg, #174d2b 0%, #1f6b3b 60%, #2c8a4b 100%)",
            color: "#ffffff",
            borderRadius: 28,
            padding: "32px 22px",
            boxShadow: "0 22px 50px rgba(23, 77, 43, 0.22)",
            border: "1px solid rgba(255,255,255,0.10)",
            marginBottom: 18,
          }}
        >
          <div style={{ maxWidth: 900 }}>
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
              Planos institucionais premium
            </div>

            <h1
              style={{
                margin: "0 0 12px",
                fontSize: "clamp(28px, 4vw, 42px)",
                lineHeight: 1.1,
                fontWeight: 800,
              }}
            >
              Planos da Aurora Loja Maçônica
            </h1>

            <p
              style={{
                margin: "0 0 14px",
                fontSize: "clamp(15px, 2vw, 18px)",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.92)",
                maxWidth: 760,
              }}
            >
              Escolha o plano ideal para sua loja. Plataforma pronta para uso,
              com implantação simples, visual institucional forte e crescimento
              seguro.
            </p>

            <p
              style={{
                margin: 0,
                fontSize: 14,
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.88)",
                maxWidth: 760,
              }}
            >
              Sem contrato longo. Comece hoje e tenha sua loja estruturada em
              minutos, com dados protegidos e acesso restrito por perfil.
            </p>

            <div
              style={{
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
                marginTop: 24,
              }}
            >
              <a
                href="/"
                style={{
                  textDecoration: "none",
                  background: "#ffffff",
                  color: corVerdeEscuro,
                  padding: "14px 18px",
                  borderRadius: 16,
                  fontWeight: 800,
                  boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
                }}
              >
                Voltar para Home
              </a>

              <a
                href="/"
                style={{
                  textDecoration: "none",
                  background: "rgba(255,255,255,0.10)",
                  color: "#ffffff",
                  padding: "14px 18px",
                  borderRadius: 16,
                  fontWeight: 800,
                  border: "1px solid rgba(255,255,255,0.24)",
                }}
              >
                Já sou cliente
              </a>
            </div>
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
          {[
            "Ativação rápida",
            "Dados protegidos",
            "Acesso restrito por perfil",
            "Uso em celular e PC",
          ].map((item) => (
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
              {item}
            </div>
          ))}
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 22,
            alignItems: "stretch",
          }}
        >
          <article
            style={{
              background: corCard,
              borderRadius: 24,
              padding: 24,
              border: `1px solid ${corBorda}`,
              boxShadow: sombra,
              display: "flex",
              flexDirection: "column",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: "0 auto auto 0",
                width: "100%",
                height: 6,
                background: `linear-gradient(90deg, ${corVerdeEscuro} 0%, ${corVerde} 100%)`,
              }}
            />

            <div
              style={{
                display: "inline-flex",
                alignSelf: "flex-start",
                background: corVerdeClaro,
                color: corVerdeEscuro,
                border: `1px solid ${corBorda}`,
                padding: "7px 12px",
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 700,
                marginTop: 8,
                marginBottom: 16,
              }}
            >
              Entrada segura
            </div>

            <h2
              style={{
                margin: "0 0 10px",
                fontSize: 28,
                lineHeight: 1.1,
                color: corVerdeEscuro,
              }}
            >
              Essencial
            </h2>

            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 6,
                marginBottom: 12,
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontSize: 34,
                  fontWeight: 800,
                  color: corTexto,
                }}
              >
                R$ 99,90
              </span>
              <span
                style={{
                  color: corTextoSuave,
                  fontSize: 16,
                  fontWeight: 700,
                }}
              >
                /mês
              </span>
            </div>

            <p
              style={{
                margin: "0 0 20px",
                color: corTextoSuave,
                lineHeight: 1.7,
                fontSize: 15,
              }}
            >
              Para lojas que querem começar com organização institucional e base
              digital segura.
            </p>

            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "grid",
                gap: 10,
                flex: 1,
              }}
            >
              {[
                "Acesso à plataforma",
                "Login da loja",
                "Área de irmãos",
                "Família e histórico",
                "Agenda e documentos",
                "Memorial institucional",
                "Uso em celular e PC",
                "Suporte básico",
              ].map((item) => (
                <li
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                    color: corTexto,
                    lineHeight: 1.5,
                    fontSize: 15,
                  }}
                >
                  <span
                    style={{
                      width: 22,
                      height: 22,
                      minWidth: 22,
                      borderRadius: 999,
                      background: corVerdeClaro,
                      color: corVerdeEscuro,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 13,
                      fontWeight: 700,
                      marginTop: 1,
                    }}
                  >
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <a
              href="https://www.asaas.com/c/q02bm7ye0zadq5cm"
              target="_blank"
              rel="noreferrer"
              style={{
                marginTop: 24,
                textDecoration: "none",
                background: `linear-gradient(135deg, ${corVerdeEscuro} 0%, ${corVerde} 100%)`,
                color: "#ffffff",
                textAlign: "center",
                fontWeight: 800,
                padding: "15px 18px",
                borderRadius: 16,
                boxShadow: "0 14px 30px rgba(31, 107, 59, 0.20)",
              }}
            >
              Começar com Essencial
            </a>
          </article>

          <article
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(245,250,243,1) 100%)",
              borderRadius: 24,
              padding: 24,
              border: `2px solid ${corDourado}`,
              boxShadow: "0 22px 55px rgba(176, 141, 87, 0.18)",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: "0 auto auto 0",
                width: "100%",
                height: 7,
                background: `linear-gradient(90deg, ${corDourado} 0%, #d0b07a 50%, ${corVerde} 100%)`,
              }}
            />

            <div
              style={{
                position: "absolute",
                top: 18,
                right: 18,
                background: `linear-gradient(135deg, ${corDourado} 0%, #c8a46a 100%)`,
                color: "#ffffff",
                padding: "8px 12px",
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 0.4,
                boxShadow: "0 10px 24px rgba(176, 141, 87, 0.24)",
              }}
            >
              MAIS ESCOLHIDO
            </div>

            <div
              style={{
                display: "inline-flex",
                alignSelf: "flex-start",
                background: "#f8f0e1",
                color: "#8b6a34",
                border: "1px solid #ecd8b2",
                padding: "7px 12px",
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 700,
                marginTop: 8,
                marginBottom: 16,
              }}
            >
              Gestão completa
            </div>

            <h2
              style={{
                margin: "0 0 10px",
                fontSize: 28,
                lineHeight: 1.1,
                color: corVerdeEscuro,
              }}
            >
              Premium
            </h2>

            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 6,
                marginBottom: 12,
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontSize: 34,
                  fontWeight: 800,
                  color: corTexto,
                }}
              >
                R$ 199,90
              </span>
              <span
                style={{
                  color: corTextoSuave,
                  fontSize: 16,
                  fontWeight: 700,
                }}
              >
                /mês
              </span>
            </div>

            <p
              style={{
                margin: "0 0 20px",
                color: corTextoSuave,
                lineHeight: 1.7,
                fontSize: 15,
              }}
            >
              Para lojas que querem gestão completa, controle financeiro e
              estrutura premium.
            </p>

            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "grid",
                gap: 10,
                flex: 1,
              }}
            >
              {[
                "Tudo do Essencial",
                "Financeiro institucional completo",
                "Relatórios completos",
                "Controle avançado",
                "Downloads protegidos",
                "Prioridade no suporte",
                "Base pronta para expansão premium",
              ].map((item) => (
                <li
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                    color: corTexto,
                    lineHeight: 1.5,
                    fontSize: 15,
                  }}
                >
                  <span
                    style={{
                      width: 22,
                      height: 22,
                      minWidth: 22,
                      borderRadius: 999,
                      background: "#f8f0e1",
                      color: "#8b6a34",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 13,
                      fontWeight: 700,
                      marginTop: 1,
                    }}
                  >
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <a
              href="https://www.asaas.com/c/8gm0wz92vn83wmt6"
              target="_blank"
              rel="noreferrer"
              style={{
                marginTop: 24,
                textDecoration: "none",
                background: `linear-gradient(135deg, ${corDourado} 0%, #c8a46a 100%)`,
                color: "#ffffff",
                textAlign: "center",
                fontWeight: 800,
                padding: "15px 18px",
                borderRadius: 16,
                boxShadow: "0 14px 30px rgba(176, 141, 87, 0.22)",
              }}
            >
              Começar com Premium
            </a>
          </article>
        </section>

        <section
          style={{
            marginTop: 28,
            background: corCard,
            borderRadius: 24,
            padding: 24,
            border: `1px solid ${corBorda}`,
            boxShadow: sombra,
          }}
        >
          <h3
            style={{
              margin: "0 0 12px",
              fontSize: 24,
              color: corVerdeEscuro,
            }}
          >
            Implantação
          </h3>

          <p
            style={{
              margin: 0,
              color: corTextoSuave,
              lineHeight: 1.8,
              fontSize: 15,
            }}
          >
            A plataforma é pronta para uso imediato. Caso a loja deseje apoio na
            implantação, este serviço pode ser contratado separadamente com
            parceiro credenciado.
          </p>
        </section>

        <div
          style={{
            marginTop: 22,
            background: "#edf5ea",
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