"use client";

import Link from "next/link";

function HeroBadge({ text }: { text: string }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        borderRadius: 999,
        padding: "8px 14px",
        background: "rgba(255,255,255,0.12)",
        border: "1px solid rgba(255,255,255,0.14)",
        fontSize: 12,
        fontWeight: 800,
        marginBottom: 16,
      }}
    >
      {text}
    </div>
  );
}

function StatCard({
  title,
  value,
  accent = false,
}: {
  title: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: 22,
        border: accent ? "1px solid #86efac" : "1px solid #dbe4ea",
        padding: 20,
        boxShadow: "0 14px 36px rgba(15, 23, 42, 0.05)",
      }}
    >
      <div
        style={{
          fontSize: 12,
          fontWeight: 800,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#0f766e",
          marginBottom: 10,
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: 24,
          lineHeight: 1.15,
          fontWeight: 900,
          color: "#0f172a",
        }}
      >
        {value}
      </div>
    </div>
  );
}

function AccessCard({
  badge,
  title,
  description,
  href,
}: {
  badge: string;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      style={{
        textDecoration: "none",
        display: "block",
        background: "#ffffff",
        borderRadius: 24,
        border: "1px solid #dbe4ea",
        padding: 22,
        boxShadow: "0 16px 40px rgba(15, 23, 42, 0.05)",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          borderRadius: 999,
          padding: "7px 12px",
          background: "#ecfeff",
          border: "1px solid #a5f3fc",
          color: "#0f766e",
          fontSize: 12,
          fontWeight: 800,
          marginBottom: 14,
        }}
      >
        {badge}
      </div>

      <h2
        style={{
          margin: 0,
          color: "#0f172a",
          fontSize: 22,
          lineHeight: 1.2,
        }}
      >
        {title}
      </h2>

      <p
        style={{
          marginTop: 12,
          marginBottom: 0,
          color: "#475569",
          lineHeight: 1.8,
          fontSize: 15,
        }}
      >
        {description}
      </p>
    </Link>
  );
}

function SectionCard({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      style={{
        background: "#ffffff",
        borderRadius: 24,
        border: "1px solid #dbe4ea",
        padding: 24,
        boxShadow: "0 16px 40px rgba(15, 23, 42, 0.05)",
      }}
    >
      <div
        style={{
          fontSize: 12,
          fontWeight: 800,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#0f766e",
          marginBottom: 12,
        }}
      >
        {eyebrow}
      </div>

      <h2
        style={{
          marginTop: 0,
          marginBottom: 14,
          color: "#0f172a",
          fontSize: 26,
          lineHeight: 1.15,
        }}
      >
        {title}
      </h2>

      {children}
    </section>
  );
}

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #f8fbfd 0%, #edf6f9 45%, #f8fbfd 100%)",
        padding: "24px 16px 56px",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <div style={{ maxWidth: 1260, margin: "0 auto" }}>
        <section
          style={{
            borderRadius: 30,
            padding: 28,
            background:
              "linear-gradient(135deg, #052e2b 0%, #065f46 55%, #059669 100%)",
            color: "#ffffff",
            boxShadow: "0 30px 80px rgba(5, 46, 43, 0.25)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 0.8fr",
              gap: 24,
              alignItems: "center",
            }}
          >
            <div>
              <HeroBadge text="Ambiente institucional protegido" />

              <h1
                style={{
                  margin: 0,
                  fontSize: 38,
                  lineHeight: 1.08,
                }}
              >
                Aurora Loja Maçônica
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
                Plataforma institucional da loja com blindagem administrativa,
                cargos por papel, memória histórica, comunicação interna,
                financeiro protegido e estrutura preparada para identidade visual
                própria da loja. Sistema em constante atualização e podem
                ocorrer instabilidades momentâneas durante melhorias.
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
                  href="/financeiro"
                  style={{
                    textDecoration: "none",
                    background: "#ffffff",
                    color: "#065f46",
                    padding: "12px 18px",
                    borderRadius: 16,
                    fontWeight: 800,
                    border: "1px solid rgba(255,255,255,0.18)",
                    boxShadow: "0 12px 28px rgba(15, 23, 42, 0.08)",
                  }}
                >
                  Entrar no financeiro
                </Link>

                <Link
                  href="/mensageria"
                  style={{
                    textDecoration: "none",
                    background: "rgba(255,255,255,0.10)",
                    color: "#ffffff",
                    padding: "12px 18px",
                    borderRadius: 16,
                    fontWeight: 800,
                    border: "1px solid rgba(255,255,255,0.18)",
                  }}
                >
                  Abrir mensageria
                </Link>
              </div>
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.14)",
                borderRadius: 28,
                padding: 24,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "100%",
                  maxWidth: 320,
                  minHeight: 280,
                  borderRadius: 26,
                  border: "1px dashed rgba(255,255,255,0.35)",
                  background: "rgba(255,255,255,0.06)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  padding: 22,
                }}
              >
                <div
                  style={{
                    width: 96,
                    height: 96,
                    borderRadius: 24,
                    background: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 34,
                    fontWeight: 900,
                    marginBottom: 16,
                  }}
                >
                  L
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
                  Espaço da logo da loja
                </div>

                <div
                  style={{
                    fontSize: 18,
                    lineHeight: 1.3,
                    fontWeight: 800,
                    color: "#ffffff",
                  }}
                >
                  Logo institucional
                </div>

                <p
                  style={{
                    marginTop: 12,
                    marginBottom: 0,
                    color: "rgba(255,255,255,0.85)",
                    lineHeight: 1.7,
                    fontSize: 14,
                  }}
                >
                  Área nobre preparada para receber a marca da loja e compor a
                  identidade visual oficial da home.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          style={{
            marginTop: 22,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
          }}
        >
          <StatCard title="Financeiro" value="Protegido" accent />
          <StatCard title="Cargos" value="Estruturados" />
          <StatCard title="Mensageria" value="Ativa" />
          <StatCard title="Memória institucional" value="Em expansão" />
        </section>

        <section
          style={{
            marginTop: 24,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 18,
          }}
        >
          <AccessCard
            badge="Financeiro"
            title="Financeiro institucional"
            description="Controle financeiro protegido com base para competências, histórico, relatórios, Tronco de Solidariedade e Doações."
            href="/financeiro"
          />

          <AccessCard
            badge="Cargos"
            title="Páginas por cargo"
            description="Área institucional por cargo com missão, responsabilidades, rotina, permissões e blindagem conforme o papel de cada irmão."
            href="/cargo/veneravel-mestre"
          />

          <AccessCard
            badge="Comunicação"
            title="Mensageria da loja"
            description="Canal interno entre irmãos, comunicados, agenda e preparação para atalhos de WhatsApp com controle por permissão."
            href="/mensageria"
          />

          <AccessCard
            badge="Memória"
            title="Ex-Veneráveis"
            description="Registro histórico da venerância da loja com biênios, datas de início e término e preservação da sucessão institucional."
            href="/ex-veneraveis"
          />

          <AccessCard
            badge="Fraternidade"
            title="Irmãos Remidos"
            description="Memória fraterna protegida para registro e valorização institucional dos irmãos remidos da loja."
            href="/irmaos-remidos"
          />
        </section>

        <div
          style={{
            marginTop: 24,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 18,
          }}
        >
          <SectionCard
            eyebrow="Identidade visual"
            title="Logo da loja na home"
          >
            <ul
              style={{
                margin: 0,
                paddingLeft: 22,
                color: "#334155",
                lineHeight: 1.9,
                fontSize: 15,
              }}
            >
              <li>Área nobre reservada para a logo institucional.</li>
              <li>Preparada para futura troca da imagem oficial.</li>
              <li>Base pronta para reforçar a identidade visual da loja.</li>
              <li>Visual elegante e integrado ao padrão premium claro.</li>
            </ul>
          </SectionCard>

          <SectionCard
            eyebrow="Próximas melhorias"
            title="O que vamos ligar depois"
          >
            <ul
              style={{
                margin: 0,
                paddingLeft: 22,
                color: "#334155",
                lineHeight: 1.9,
                fontSize: 15,
              }}
            >
              <li>Subir a logo real da loja.</li>
              <li>Permitir foto do irmão com blindagem.</li>
              <li>Ligar mensageria real com agenda e WhatsApp.</li>
              <li>Ampliar os cadastros institucionais internos.</li>
            </ul>
          </SectionCard>
        </div>
      </div>
    </main>
  );
}