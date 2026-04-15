"use client";

import Link from "next/link";

function CardResumo({
  titulo,
  valor,
  destaque = false,
}: {
  titulo: string;
  valor: string;
  destaque?: boolean;
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: 22,
        border: destaque ? "1px solid #86efac" : "1px solid #dbe4ea",
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
        {titulo}
      </div>

      <div
        style={{
          fontSize: 28,
          lineHeight: 1.1,
          fontWeight: 900,
          color: "#0f172a",
        }}
      >
        {valor}
      </div>
    </div>
  );
}

function CardModulo({
  titulo,
  descricao,
  href,
  badge,
}: {
  titulo: string;
  descricao: string;
  href: string;
  badge?: string;
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
        transition: "transform 0.15s ease",
      }}
    >
      {badge ? (
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
      ) : null}

      <h2
        style={{
          margin: 0,
          color: "#0f172a",
          fontSize: 22,
          lineHeight: 1.15,
        }}
      >
        {titulo}
      </h2>

      <p
        style={{
          marginTop: 12,
          marginBottom: 0,
          color: "#475569",
          lineHeight: 1.75,
          fontSize: 15,
        }}
      >
        {descricao}
      </p>
    </Link>
  );
}

export default function FinanceiroPage() {
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
              alignItems: "center",
              justifyContent: "space-between",
              gap: 14,
            }}
          >
            <div style={{ maxWidth: 840 }}>
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
                Financeiro institucional protegido
              </div>

              <h1 style={{ margin: 0, fontSize: 34, lineHeight: 1.1 }}>
                Financeiro • Aurora Loja Maçônica
              </h1>

              <p
                style={{
                  marginTop: 14,
                  marginBottom: 0,
                  maxWidth: 760,
                  color: "rgba(255,255,255,0.92)",
                  lineHeight: 1.75,
                  fontSize: 15,
                }}
              >
                Controle financeiro institucional com blindagem administrativa,
                estrutura preparada para lançamentos, relatórios, histórico,
                competências, Tronco de Solidariedade e evolução segura por
                cargo. Sistema em constante atualização e podem ocorrer
                instabilidades momentâneas durante melhorias.
              </p>
            </div>

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
              Voltar ao painel
            </Link>
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
          <CardResumo titulo="Status da rota" valor="Restaurada" destaque />
          <CardResumo titulo="Blindagem" valor="Ativa" />
          <CardResumo titulo="Próximo foco" valor="RBAC por cargo" />
          <CardResumo titulo="Módulos ligados" valor="Financeiro base" />
        </section>

        <section
          style={{
            marginTop: 24,
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
            Observação institucional
          </div>

          <h2
            style={{
              marginTop: 0,
              marginBottom: 12,
              color: "#0f172a",
              fontSize: 26,
            }}
          >
            Tronco de Solidariedade e Doações
          </h2>

          <div style={{ display: "grid", gap: 12 }}>
            <div
              style={{
                borderRadius: 18,
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                padding: 16,
                color: "#334155",
                lineHeight: 1.7,
                fontSize: 15,
              }}
            >
              <strong>Tronco de Solidariedade</strong> deve entrar como{" "}
              <strong>entrada</strong> no caixa da loja.
            </div>

            <div
              style={{
                borderRadius: 18,
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                padding: 16,
                color: "#334155",
                lineHeight: 1.7,
                fontSize: 15,
              }}
            >
              <strong>Doações</strong> devem permanecer como{" "}
              <strong>saída</strong> quando houver destinação do recurso.
            </div>
          </div>
        </section>

        <section
          style={{
            marginTop: 24,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 18,
          }}
        >
          <CardModulo
            titulo="Cargos e páginas exclusivas"
            descricao="Estrutura de páginas por cargo, com função, missão, rotina, limites de acesso e área própria de cada irmão conforme o papel institucional."
            href="/"
            badge="Próxima etapa"
          />

          <CardModulo
            titulo="Ex-Veneráveis"
            descricao="Página própria com data de fundação da loja, relação histórica dos ex-veneráveis, período de venerância, data de início e término, preparada para mandatos de 2 em 2 anos."
            href="/"
            badge="Página separada"
          />

          <CardModulo
            titulo="Irmãos Remidos"
            descricao="Página institucional reservada para a relação de irmãos remidos, com organização própria e visual adequado ao histórico e à memória da loja."
            href="/"
            badge="Página separada"
          />
        </section>

        <section
          style={{
            marginTop: 24,
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
            Ordem segura de construção
          </div>

          <ol
            style={{
              margin: 0,
              paddingLeft: 22,
              color: "#334155",
              lineHeight: 1.9,
              fontSize: 15,
            }}
          >
            <li>Blindar e estabilizar a rota atual do financeiro.</li>
            <li>Concluir a base institucional dos cargos e permissões.</li>
            <li>Criar a página dinâmica de cada cargo.</li>
            <li>
              Criar a página de <strong>Ex-Veneráveis</strong> com fundação e
              períodos.
            </li>
            <li>
              Criar a página de <strong>Irmãos Remidos</strong>.
            </li>
            <li>
              Depois voltar para os ajustes finos do financeiro e integração com
              RBAC.
            </li>
          </ol>
        </section>
      </div>
    </main>
  );
}