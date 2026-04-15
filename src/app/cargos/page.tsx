import Link from "next/link";
import { MASONIC_OFFICES_LIST } from "@/lib/rbac";

function SummaryCard({
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

function CargoCard({
  slug,
  name,
  shortName,
  description,
  systemRole,
}: {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  systemRole: string;
}) {
  return (
    <Link
      href={`/cargo/${slug}`}
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
        {shortName}
      </div>

      <h2
        style={{
          margin: 0,
          color: "#0f172a",
          fontSize: 24,
          lineHeight: 1.15,
        }}
      >
        {name}
      </h2>

      <p
        style={{
          marginTop: 12,
          marginBottom: 16,
          color: "#475569",
          lineHeight: 1.8,
          fontSize: 15,
          minHeight: 96,
        }}
      >
        {description}
      </p>

      <div
        style={{
          borderRadius: 18,
          background: "#f8fafc",
          border: "1px solid #e2e8f0",
          padding: 14,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            fontSize: 12,
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "#0f766e",
            marginBottom: 8,
          }}
        >
          Nível técnico
        </div>

        <div
          style={{
            color: "#0f172a",
            fontSize: 16,
            fontWeight: 800,
          }}
        >
          {systemRole}
        </div>
      </div>

      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 16,
          padding: "12px 16px",
          background: "#065f46",
          color: "#ffffff",
          fontWeight: 800,
          fontSize: 14,
          boxShadow: "0 12px 28px rgba(15, 23, 42, 0.08)",
        }}
      >
        Acessar página do cargo
      </div>
    </Link>
  );
}

export default function CargosPage() {
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
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 16,
            }}
          >
            <div style={{ maxWidth: 900 }}>
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
                Estrutura institucional protegida
              </div>

              <h1
                style={{
                  margin: 0,
                  fontSize: 36,
                  lineHeight: 1.08,
                }}
              >
                Cargos da Loja Maçônica
              </h1>

              <p
                style={{
                  marginTop: 16,
                  marginBottom: 0,
                  maxWidth: 820,
                  color: "rgba(255,255,255,0.92)",
                  lineHeight: 1.8,
                  fontSize: 16,
                }}
              >
                Visualização institucional dos cargos, funções,
                responsabilidades e acessos da loja, com páginas individuais
                para cada cargo e blindagem conforme o papel de cada irmão.
                Sistema em constante atualização e podem ocorrer instabilidades
                momentâneas durante melhorias.
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
                href="/"
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
                Voltar à home
              </Link>

              <Link
                href="/irmaos"
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
                Ir para irmãos
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
          <SummaryCard
            title="Cargos estruturados"
            value={String(MASONIC_OFFICES_LIST.length)}
            accent
          />
          <SummaryCard title="Páginas individuais" value="Ativas" />
          <SummaryCard title="Permissões" value="Organizadas" />
          <SummaryCard title="Blindagem" value="Por papel" />
        </section>

        <section
          style={{
            marginTop: 24,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 18,
          }}
        >
          {MASONIC_OFFICES_LIST.map((cargo) => (
            <CargoCard
              key={cargo.slug}
              slug={cargo.slug}
              name={cargo.name}
              shortName={cargo.shortName}
              description={cargo.description}
              systemRole={cargo.systemRole}
            />
          ))}
        </section>
      </div>
    </main>
  );
}