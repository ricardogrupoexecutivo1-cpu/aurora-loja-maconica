"use client";

import Link from "next/link";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import {
  BillingInfo,
  canCreate,
  canDownload,
  getBilling,
  getBillingLabel,
  getBillingMessage,
  getBillingTone,
} from "@/lib/billing";

const BILLING_INICIAL: BillingInfo = {
  status: "ativo",
  vencimento: undefined,
  diasAtraso: 0,
  linkPagamento: "#",
  bloquearCriacao: false,
  bloquearArquivamento: false,
  bloquearDownload: false,
  lojaId: "loja-maconica-aurora",
  lojaNome: "Loja Maçônica Aurora",
  planoNome: "Plano Institucional",
  paymentStatus: "pago",
  graceUntil: undefined,
  observacoes: "",
};

type PerfilIrmao = {
  nome: string;
  cargo: string;
  papel: string;
  lojaId: string;
  irmaoId: string;
  email: string;
  telefone: string;
};

const PERFIL_INICIAL: PerfilIrmao = {
  nome: "Irmão da Loja",
  cargo: "Cargo institucional vinculado",
  papel: "Acesso protegido",
  lojaId: "loja-maconica-aurora",
  irmaoId: "irmao-demo-001",
  email: "irmao@reservado.com",
  telefone: "(00) 00000-0000",
};

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

function ActionButton({
  label,
  onClick,
  variant = "primary",
  disabled = false,
}: {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
}) {
  const background = disabled
    ? "#cbd5e1"
    : variant === "primary"
      ? "#065f46"
      : variant === "danger"
        ? "#7f1d1d"
        : "#ffffff";

  const color =
    disabled ? "#64748b" : variant === "secondary" ? "#0f172a" : "#ffffff";

  const border = disabled
    ? "1px solid #cbd5e1"
    : variant === "secondary"
      ? "1px solid #dbe4ea"
      : variant === "danger"
        ? "1px solid #991b1b"
        : "1px solid #065f46";

  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={{
        appearance: "none",
        border,
        background,
        color,
        borderRadius: 16,
        padding: "12px 16px",
        fontWeight: 800,
        fontSize: 14,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.9 : 1,
        boxShadow:
          variant === "secondary"
            ? "0 10px 24px rgba(15, 23, 42, 0.04)"
            : "0 12px 28px rgba(15, 23, 42, 0.08)",
      }}
    >
      {label}
    </button>
  );
}

function Field({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      style={{
        borderRadius: 18,
        background: "#f8fafc",
        border: "1px solid #e2e8f0",
        padding: 14,
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
        {label}
      </div>

      <div
        style={{
          color: "#0f172a",
          fontSize: 16,
          fontWeight: 800,
          wordBreak: "break-word",
        }}
      >
        {value}
      </div>
    </div>
  );
}

export default function MinhaAreaPage() {
  const [billing, setBilling] = useState<BillingInfo>(BILLING_INICIAL);
  const [billingLoading, setBillingLoading] = useState(true);

  const [perfil] = useState<PerfilIrmao>(PERFIL_INICIAL);
  const [mensagem, setMensagem] = useState(
    "Área individual carregada com sucesso. Ambiente pronto para identificação institucional, foto e cópia local/offline.",
  );

  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  const [fotoNome, setFotoNome] = useState<string>("");
  const [fotoCarregada, setFotoCarregada] = useState(false);

  useEffect(() => {
    let ativo = true;

    async function carregarBilling() {
      try {
        setBillingLoading(true);
        const billingReal = await getBilling("loja-maconica-aurora");

        if (!ativo) return;

        setBilling(billingReal);

        if (billingReal.status !== "ativo" && billingReal.status !== "trial") {
          setMensagem(
            "Blindagem comercial ativa. Realize o pagamento para liberar atualizações e downloads da área individual.",
          );
        }
      } finally {
        if (ativo) {
          setBillingLoading(false);
        }
      }
    }

    carregarBilling();

    return () => {
      ativo = false;
    };
  }, []);

  const podeEditar = canCreate(billing);
  const podeBaixar = canDownload(billing);
  const mensagemBilling = getBillingMessage(billing);
  const billingTone = getBillingTone(billing.status);

  const statusFoto = useMemo(() => {
    if (fotoCarregada && fotoPreview) return "Carregada";
    if (fotoPreview) return "Prévia pronta";
    return "Pendente";
  }, [fotoCarregada, fotoPreview]);

  function aoSelecionarFoto(event: ChangeEvent<HTMLInputElement>) {
    const arquivo = event.target.files?.[0];

    if (!arquivo) return;

    if (!podeEditar) {
      setMensagem("Pagamento necessário para atualizar a foto institucional.");
      return;
    }

    const leitor = new FileReader();

    leitor.onload = () => {
      setFotoPreview(String(leitor.result || ""));
      setFotoNome(arquivo.name);
      setFotoCarregada(false);
      setMensagem(
        "Prévia da foto carregada com sucesso. Agora você pode salvar a foto institucional localmente nesta área.",
      );
    };

    leitor.readAsDataURL(arquivo);
  }

  function salvarFoto() {
    if (!podeEditar) {
      setMensagem("Pagamento necessário para salvar a foto institucional.");
      return;
    }

    if (!fotoPreview) {
      setMensagem("Selecione uma foto antes de salvar.");
      return;
    }

    setFotoCarregada(true);
    setMensagem(
      "Foto institucional validada com sucesso nesta área. Em etapa futura, ligamos o salvamento real no armazenamento seguro.",
    );
  }

  function removerFoto() {
    if (!podeEditar) {
      setMensagem("Pagamento necessário para remover a foto institucional.");
      return;
    }

    setFotoPreview(null);
    setFotoNome("");
    setFotoCarregada(false);
    setMensagem("Foto institucional removida com sucesso da área individual.");
  }

  function baixarFichaLocal() {
    if (!podeBaixar) {
      setMensagem("Pagamento necessário para baixar a ficha individual.");
      return;
    }

    const conteudo = {
      exportadoEm: new Date().toISOString(),
      lojaId: perfil.lojaId,
      irmaoId: perfil.irmaoId,
      nome: perfil.nome,
      cargo: perfil.cargo,
      papel: perfil.papel,
      email: perfil.email,
      telefone: perfil.telefone,
      statusPlano: billing.status,
      fotoNome: fotoNome || null,
      fotoCarregada,
      observacao:
        "Ficha individual exportada para cópia local/offline no PC ou celular.",
    };

    const blob = new Blob([JSON.stringify(conteudo, null, 2)], {
      type: "application/json;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `aurora-loja-maconica-minha-area-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setMensagem("Ficha individual baixada com sucesso para guardar no PC ou celular.");
  }

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
                Área individual protegida
              </div>

              <h1
                style={{
                  margin: 0,
                  fontSize: 36,
                  lineHeight: 1.08,
                }}
              >
                Minha Área • Aurora Loja Maçônica
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
                Ambiente individual do irmão com identidade institucional,
                visualização de cargo, espaço para foto, atualização segura do
                perfil e blindagem por papel e permissão.
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
                Ir para mensageria
              </Link>
            </div>
          </div>
        </section>

        {mensagemBilling ? (
          <section style={{ marginTop: 20 }}>
            <div
              style={{
                background: billingTone.background,
                border: `1px solid ${billingTone.border}`,
                color: billingTone.color,
                borderRadius: 24,
                padding: 20,
                boxShadow: "0 14px 36px rgba(15, 23, 42, 0.05)",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 14,
              }}
            >
              <div style={{ flex: "1 1 520px" }}>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 800,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: 8,
                  }}
                >
                  Blindagem comercial ativa
                </div>

                <div
                  style={{
                    fontSize: 16,
                    lineHeight: 1.7,
                    fontWeight: 700,
                  }}
                >
                  {mensagemBilling}
                </div>

                <div
                  style={{
                    marginTop: 10,
                    fontSize: 13,
                    fontWeight: 800,
                  }}
                >
                  Situação do plano: {getBillingLabel(billing.status)}
                  {billingLoading ? " • verificando..." : ""}
                </div>
              </div>

              <a
                href={billing.linkPagamento || "#"}
                style={{
                  textDecoration: "none",
                  background: billingTone.buttonBackground,
                  color: billingTone.buttonColor,
                  padding: "12px 18px",
                  borderRadius: 16,
                  fontWeight: 800,
                  boxShadow: "0 12px 28px rgba(15, 23, 42, 0.08)",
                }}
              >
                Realizar pagamento
              </a>
            </div>
          </section>
        ) : null}

        <section
          style={{
            marginTop: 22,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
          }}
        >
          <SummaryCard title="Nome" value={perfil.nome} accent />
          <SummaryCard title="Cargo" value={perfil.cargo} />
          <SummaryCard title="Papel" value={perfil.papel} />
          <SummaryCard title="Foto" value={statusFoto} />
        </section>

        <section style={{ marginTop: 24 }}>
          <SectionCard eyebrow="Identificação do irmão" title="Dados institucionais">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 14,
              }}
            >
              <Field label="Nome" value={perfil.nome} />
              <Field label="Cargo" value={perfil.cargo} />
              <Field label="Papel" value={perfil.papel} />
              <Field label="Loja ID" value={perfil.lojaId} />
              <Field label="Irmão ID" value={perfil.irmaoId} />
              <Field label="E-mail" value={perfil.email} />
              <Field label="Telefone" value={perfil.telefone} />
            </div>
          </SectionCard>
        </section>

        <section style={{ marginTop: 24 }}>
          <SectionCard eyebrow="Foto institucional" title="Imagem individual protegida">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(280px, 360px) 1fr",
                gap: 18,
                alignItems: "start",
              }}
            >
              <div
                style={{
                  borderRadius: 24,
                  border: "1px solid #dbe4ea",
                  background: "#f8fafc",
                  minHeight: 320,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 16,
                  overflow: "hidden",
                }}
              >
                {fotoPreview ? (
                  <img
                    src={fotoPreview}
                    alt="Pré-visualização da foto do irmão"
                    style={{
                      width: "100%",
                      maxHeight: 420,
                      objectFit: "cover",
                      borderRadius: 20,
                    }}
                  />
                ) : (
                  <div
                    style={{
                      textAlign: "center",
                      color: "#475569",
                      fontWeight: 700,
                      lineHeight: 1.8,
                    }}
                  >
                    Espaço da foto do irmão
                    <br />
                    preparado para adicionar,
                    <br />
                    trocar ou remover imagem
                  </div>
                )}
              </div>

              <div>
                <p
                  style={{
                    marginTop: 0,
                    color: "#334155",
                    lineHeight: 1.85,
                    fontSize: 15,
                  }}
                >
                  Esta etapa valida a foto localmente com segurança visual. Em
                  seguida, a plataforma poderá evoluir para o salvamento real em
                  armazenamento protegido, mantendo a blindagem institucional.
                </p>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 10,
                    marginTop: 14,
                  }}
                >
                  <label
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 16,
                      padding: "12px 16px",
                      fontWeight: 800,
                      fontSize: 14,
                      background: podeEditar ? "#065f46" : "#cbd5e1",
                      color: podeEditar ? "#ffffff" : "#64748b",
                      cursor: podeEditar ? "pointer" : "not-allowed",
                      boxShadow: "0 12px 28px rgba(15, 23, 42, 0.08)",
                    }}
                  >
                    {fotoPreview ? "Trocar foto" : "Adicionar foto"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={aoSelecionarFoto}
                      disabled={!podeEditar}
                      style={{ display: "none" }}
                    />
                  </label>

                  <ActionButton
                    label={podeEditar ? "Salvar foto" : "Realize o pagamento"}
                    onClick={salvarFoto}
                    disabled={!podeEditar}
                  />

                  <ActionButton
                    label="Remover foto"
                    variant="danger"
                    onClick={removerFoto}
                    disabled={!podeEditar || !fotoPreview}
                  />

                  <ActionButton
                    label={podeBaixar ? "Baixar ficha local" : "Pagamento necessário"}
                    variant="secondary"
                    onClick={baixarFichaLocal}
                    disabled={!podeBaixar}
                  />
                </div>

                <div
                  style={{
                    marginTop: 18,
                    display: "grid",
                    gap: 12,
                  }}
                >
                  <Field label="Status da foto" value={statusFoto} />
                  <Field label="Arquivo selecionado" value={fotoNome || "Nenhum arquivo selecionado"} />
                </div>

                {!podeEditar ? (
                  <p
                    style={{
                      marginTop: 14,
                      marginBottom: 0,
                      color: "#9a3412",
                      lineHeight: 1.75,
                      fontSize: 14,
                      fontWeight: 700,
                    }}
                  >
                    Realize o pagamento para voltar a atualizar a foto e os dados protegidos desta área.
                  </p>
                ) : null}
              </div>
            </div>
          </SectionCard>
        </section>

        <section style={{ marginTop: 24 }}>
          <SectionCard eyebrow="Blindagem ativa" title="Regras de uso da imagem e da área">
            <div
              style={{
                display: "grid",
                gap: 12,
              }}
            >
              {[
                "A foto deve ficar vinculada ao irmão correto.",
                "Nem todo usuário poderá editar a imagem de outro irmão.",
                "Secretaria e administração podem ter permissão ampliada.",
                "O próprio irmão pode editar a sua foto, se a loja permitir.",
                "A ficha individual pode ser baixada para cópia local/offline com proteção comercial ativa.",
              ].map((item) => (
                <div
                  key={item}
                  style={{
                    borderRadius: 18,
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    padding: 16,
                    color: "#334155",
                    fontWeight: 700,
                    lineHeight: 1.7,
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </SectionCard>
        </section>

        <section style={{ marginTop: 24 }}>
          <SectionCard eyebrow="Mensagem do sistema" title="Status da operação">
            <p
              style={{
                margin: 0,
                color: "#334155",
                lineHeight: 1.85,
                fontSize: 15,
              }}
            >
              {mensagem}
            </p>
          </SectionCard>
        </section>
      </div>
    </main>
  );
}