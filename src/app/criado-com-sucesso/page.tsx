"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function CriadoComSucessoConteudo() {
  const searchParams = useSearchParams();

  const id = searchParams.get("id")?.trim() || "";
  const slug = searchParams.get("slug")?.trim() || "";

  const dataHoje = new Date();
  const dataFinal = new Date();
  dataFinal.setDate(dataHoje.getDate() + 90);

  const formatarData = (d: Date) =>
    d.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  const validade = formatarData(dataFinal);

  const params = new URLSearchParams();
  if (id) params.set("id", id);
  if (slug) params.set("slug", slug);

  const hrefConfigurar = params.toString()
    ? `/configurar-loja?${params.toString()}`
    : "/configurar-loja";

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "24px 12px",
        background:
          "radial-gradient(circle at top left, rgba(217,243,226,0.85), transparent 28%), radial-gradient(circle at bottom right, rgba(210,238,219,0.72), transparent 24%), linear-gradient(180deg, #f8fcf9 0%, #f1f8f4 52%, #edf6f1 100%)",
        color: "#102418",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {/* HERO */}
        <section
          style={{
            background:
              "linear-gradient(135deg, #174d2b 0%, #1f6b3b 60%, #2c8a4b 100%)",
            color: "#ffffff",
            borderRadius: 30,
            padding: "30px 22px",
            boxShadow: "0 22px 60px rgba(23,77,43,0.25)",
            marginBottom: 20,
          }}
        >
          <span
            style={{
              display: "inline-block",
              padding: "8px 14px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.15)",
              fontWeight: 700,
              fontSize: 12,
              marginBottom: 14,
            }}
          >
            Cortesia liberada
          </span>

          <h1
            style={{
              margin: 0,
              fontSize: "clamp(28px, 5vw, 42px)",
              lineHeight: 1.05,
              fontWeight: 900,
            }}
          >
            Sua loja já está ativa
          </h1>

          <p
            style={{
              marginTop: 12,
              lineHeight: 1.7,
              fontSize: "1rem",
              maxWidth: 720,
            }}
          >
            A entrada foi realizada com sucesso e a loja já está com acesso
            liberado automaticamente, pronta para configuração e uso
            institucional.
          </p>
        </section>

        {/* STATUS PREMIUM */}
        <section
          style={{
            background: "#ffffff",
            borderRadius: 26,
            padding: 22,
            border: "1px solid #d7e6d1",
            boxShadow: "0 16px 50px rgba(16,36,24,0.06)",
            marginBottom: 20,
          }}
        >
          <h2 style={{ marginBottom: 16 }}>Status da sua entrada</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 12,
            }}
          >
            {[
              { label: "Plano", value: "Cortesia" },
              { label: "Status", value: "Ativa" },
              { label: "Liberação", value: "Automática" },
              { label: "Validade", value: validade },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  background: "#f7fbf8",
                  border: "1px solid #d7e6d1",
                  borderRadius: 18,
                  padding: 16,
                }}
              >
                <span style={{ fontSize: 12, color: "#567062" }}>
                  {item.label}
                </span>
                <strong style={{ display: "block", marginTop: 6 }}>
                  {item.value}
                </strong>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section
          style={{
            background: "#ffffff",
            borderRadius: 26,
            padding: 22,
            border: "1px solid #d7e6d1",
            boxShadow: "0 16px 50px rgba(16,36,24,0.06)",
            marginBottom: 20,
          }}
        >
          <h2>Próximo passo</h2>

          <p style={{ color: "#4d6655", lineHeight: 1.8 }}>
            Complete os dados institucionais para liberar totalmente a estrutura
            da loja e começar a utilizar o ambiente com padrão premium.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a
              href={hrefConfigurar}
              style={{
                background:
                  "linear-gradient(135deg, #174d2b 0%, #1f6b3b 100%)",
                color: "#fff",
                padding: "14px 18px",
                borderRadius: 16,
                fontWeight: 800,
                textDecoration: "none",
              }}
            >
              Configurar minha loja
            </a>

            <a
              href="/"
              style={{
                background: "#fff",
                border: "1px solid #d7e6d1",
                color: "#174d2b",
                padding: "14px 18px",
                borderRadius: 16,
                fontWeight: 800,
                textDecoration: "none",
              }}
            >
              Ir para home
            </a>
          </div>
        </section>

        {/* AVISO */}
        <div
          style={{
            background: "#edf5ea",
            borderRadius: 18,
            padding: 16,
            fontSize: 14,
            color: "#567062",
          }}
        >
          Sistema em constante atualização. Sua loja já está dentro da Aurora e
          pronta para evoluir com segurança.
        </div>
      </div>
    </main>
  );
}

export default function CriadoComSucessoPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <CriadoComSucessoConteudo />
    </Suspense>
  );
}