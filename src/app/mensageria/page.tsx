"use client";

import Link from "next/link";

function TopStatCard({
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

function FeatureCard({
  badge,
  title,
  description,
}: {
  badge: string;
  title: string;
  description: string;
}) {
  return (
    <div
      style={{
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
    </div>
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

function BulletList({ items }: { items: string[] }) {
  return (
    <ul
      style={{
        margin: 0,
        paddingLeft: 22,
        color: "#334155",
        lineHeight: 1.9,
        fontSize: 15,
      }}
    >
      {items.map((item, index) => (
        <li key={`${item}-${index}`}>{item}</li>
      ))}
    </ul>
  );
}

export default function MensageriaPage() {
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
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
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
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 16,
            }}
          >
            <div style={{ maxWidth: 860 }}>
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
                Canal interno protegido
              </div>

              <h1
                style={{
                  margin: 0,
                  fontSize: 34,
                  lineHeight: 1.1,
                }}
              >
                Mensageria • Aurora Loja Maçônica
              </h1>

              <p
                style={{
                  marginTop: 14,
                  marginBottom: 0,
                  maxWidth: 780,
                  color: "rgba(255,255,255,0.92)",
                  lineHeight: 1.75,
                  fontSize: 15,
                }}
              >
                Área institucional para comunicados, avisos, conversas entre
                irmãos, integração com agenda e atalhos para WhatsApp, sempre
                com blindagem por cargo e permissão. Sistema em constante
                atualização e podem ocorrer instabilidades momentâneas durante
                melhorias.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
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
                Voltar ao financeiro
              </Link>

              <Link
                href="/cargo/veneravel-mestre"
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
                Voltar aos cargos
              </Link>
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
          <TopStatCard title="Canal interno" value="Estruturado" accent />
          <TopStatCard title="WhatsApp" value="Preparado" />
          <TopStatCard title="Agenda" value="Integrável" />
          <TopStatCard title="Blindagem" value="Por cargo" />
        </section>

        <section
          style={{
            marginTop: 24,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 18,
          }}
        >
          <FeatureCard
            badge="Comunicados"
            title="Avisos institucionais"
            description="Espaço para recados da administração, lembretes de sessão, convocações, avisos operacionais e orientações formais da loja."
          />

          <FeatureCard
            badge="Conversa"
            title="Canal entre irmãos"
            description="Área para troca de informações internas entre irmãos autorizados, com organização por assunto, cargo ou necessidade institucional."
          />

          <FeatureCard
            badge="WhatsApp"
            title="Atalho rápido para contato"
            description="Botões para abrir conversa no WhatsApp institucional da loja ou em contatos específicos autorizados, sem expor informação indevida."
          />

          <FeatureCard
            badge="Agenda"
            title="Integração com compromissos"
            description="Ligação com sessões, reuniões, solenidades, datas importantes e lembretes rápidos para manter todos alinhados."
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
          <SectionCard eyebrow="Como deve funcionar" title="Modelo certo da comunicação">
            <BulletList
              items={[
                "Cada irmão vê apenas o que sua permissão permitir.",
                "Administração pode publicar comunicados gerais.",
                "Alguns cargos podem enviar mensagens setoriais.",
                "A agenda pode alimentar avisos automáticos da loja.",
                "WhatsApp deve ser atalho institucional e não exposição irrestrita.",
              ]}
            />
          </SectionCard>

          <SectionCard eyebrow="Blindagem ativa" title="Regras de segurança">
            <BulletList
              items={[
                "Nem todo irmão poderá enviar comunicado geral.",
                "Mensagens sensíveis devem ficar restritas por papel.",
                "Dados pessoais e contatos não devem ficar expostos livremente.",
                "A comunicação precisa respeitar cargo, função e autorização.",
                "A loja mantém o controle do que é público, interno e reservado.",
              ]}
            />
          </SectionCard>
        </div>

        <section style={{ marginTop: 24 }}>
          <SectionCard eyebrow="Próximas evoluções" title="O que vamos ligar depois">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: 16,
              }}
            >
              <div
                style={{
                  borderRadius: 20,
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  padding: 18,
                  color: "#334155",
                  lineHeight: 1.75,
                  fontSize: 15,
                }}
              >
                <strong>1. Comunicados por cargo</strong>
                <br />
                Administração, secretaria e outros cargos autorizados poderão
                publicar mensagens específicas.
              </div>

              <div
                style={{
                  borderRadius: 20,
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  padding: 18,
                  color: "#334155",
                  lineHeight: 1.75,
                  fontSize: 15,
                }}
              >
                <strong>2. Botões de WhatsApp</strong>
                <br />
                Abertura rápida de conversa para informações, agenda e contato
                institucional.
              </div>

              <div
                style={{
                  borderRadius: 20,
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  padding: 18,
                  color: "#334155",
                  lineHeight: 1.75,
                  fontSize: 15,
                }}
              >
                <strong>3. Canal entre irmãos</strong>
                <br />
                Área organizada para conversas internas com proteção por cargo,
                grupo e contexto.
              </div>

              <div
                style={{
                  borderRadius: 20,
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  padding: 18,
                  color: "#334155",
                  lineHeight: 1.75,
                  fontSize: 15,
                }}
              >
                <strong>4. Agenda conectada</strong>
                <br />
                Sessões, eventos e compromissos passando a alimentar a
                comunicação da loja.
              </div>
            </div>
          </SectionCard>
        </section>
      </div>
    </main>
  );
}