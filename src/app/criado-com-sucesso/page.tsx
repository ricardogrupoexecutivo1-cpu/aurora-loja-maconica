"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function CriadoComSucessoConteudo() {
  const searchParams = useSearchParams();

  const corTexto = "#16311f";
  const corTextoSuave = "#4d6655";
  const corVerde = "#1f6b3b";
  const corVerdeEscuro = "#174d2b";
  const corBorda = "#d7e6d1";
  const corCard = "#ffffff";
  const sombra = "0 18px 45px rgba(23, 77, 43, 0.10)";

  const id = searchParams.get("id")?.trim() || "";
  const slug = searchParams.get("slug")?.trim() || "";

  const parametros = new URLSearchParams();
  if (id) parametros.set("id", id);
  if (slug) parametros.set("slug", slug);

  const hrefConfigurar = parametros.toString()
    ? `/configurar-loja?${parametros.toString()}`
    : "/configurar-loja";

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
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        <section
          style={{
            background:
              "linear-gradient(135deg, #174d2b 0%, #1f6b3b 60%, #2c8a4b 100%)",
            color: "#ffffff",
            borderRadius: 28,
            padding: "34px 24px",
            boxShadow: "0 22px 50px rgba(23, 77, 43, 0.22)",
            border: "1px solid rgba(255,255,255,0.10)",
            marginBottom: 22,
          }}
        >
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
            Cadastro inicial confirmado
          </div>

          <h1
            style={{
              margin: "0 0 12px",
              fontSize: "clamp(28px, 4vw, 42px)",
              lineHeight: 1.1,
              fontWeight: 800,
            }}
          >
            Sua loja foi criada com sucesso
          </h1>

          <p
            style={{
              margin: 0,
              fontSize: "clamp(15px, 2vw, 18px)",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.92)",
              maxWidth: 760,
            }}
          >
            O pagamento foi identificado e a estrutura inicial da loja já foi
            preparada com segurança. Agora falta apenas completar os dados
            institucionais para liberar a configuração completa.
          </p>
        </section>

        {(id || slug) && (
          <section
            style={{
              background: "#edf5ea",
              border: `1px solid ${corBorda}`,
              borderRadius: 18,
              padding: "16px 18px",
              color: corTextoSuave,
              lineHeight: 1.7,
              fontSize: 14,
              marginBottom: 20,
            }}
          >
            <strong style={{ color: corVerdeEscuro }}>Referência da loja:</strong>{" "}
            {id ? `ID ${id}` : ""}
            {id && slug ? " • " : ""}
            {slug ? `Slug ${slug}` : ""}
          </section>
        )}

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 14,
            marginBottom: 24,
          }}
        >
          {[
            "Loja criada automaticamente",
            "Responsável inicial vinculado",
            "Plano salvo com segurança",
            "Pronta para configuração",
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
            background: corCard,
            borderRadius: 24,
            padding: 24,
            border: `1px solid ${corBorda}`,
            boxShadow: sombra,
            marginBottom: 22,
          }}
        >
          <h2
            style={{
              margin: "0 0 14px",
              fontSize: 26,
              color: corVerdeEscuro,
            }}
          >
            Próximo passo
          </h2>

          <p
            style={{
              margin: "0 0 18px",
              color: corTextoSuave,
              lineHeight: 1.8,
              fontSize: 15,
            }}
          >
            Complete os dados da sua loja para liberar a estrutura institucional,
            organizar a área dos irmãos e preparar o ambiente com o padrão
            oficial da Aurora Loja Maçônica.
          </p>

          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <a
              href={hrefConfigurar}
              style={{
                textDecoration: "none",
                background: `linear-gradient(135deg, ${corVerdeEscuro} 0%, ${corVerde} 100%)`,
                color: "#ffffff",
                padding: "14px 18px",
                borderRadius: 16,
                fontWeight: 800,
                boxShadow: "0 14px 30px rgba(31, 107, 59, 0.20)",
              }}
            >
              Configurar minha loja
            </a>

            <a
              href="/"
              style={{
                textDecoration: "none",
                background: "#ffffff",
                color: corVerdeEscuro,
                padding: "14px 18px",
                borderRadius: 16,
                fontWeight: 800,
                border: `1px solid ${corBorda}`,
              }}
            >
              Já sou cliente
            </a>
          </div>
        </section>

        <section
          style={{
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
              fontSize: 22,
              color: corVerdeEscuro,
            }}
          >
            Segurança institucional
          </h3>

          <p
            style={{
              margin: 0,
              color: corTextoSuave,
              lineHeight: 1.8,
              fontSize: 15,
            }}
          >
            A criação automática da loja preserva a base inicial com segurança.
            Dados públicos só devem ser liberados após a configuração e a
            confirmação institucional da loja.
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

function CriadoComSucessoFallback() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #f8fbf7 0%, #eef6eb 45%, #f4f8f2 100%)",
        padding: "28px 16px 40px",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          borderRadius: 20,
          padding: 24,
          border: "1px solid #d7e6d1",
          boxShadow: "0 18px 45px rgba(23, 77, 43, 0.10)",
          color: "#174d2b",
          fontWeight: 700,
        }}
      >
        Carregando confirmação da loja...
      </div>
    </main>
  );
}

export default function CriadoComSucessoPage() {
  return (
    <Suspense fallback={<CriadoComSucessoFallback />}>
      <CriadoComSucessoConteudo />
    </Suspense>
  );
}