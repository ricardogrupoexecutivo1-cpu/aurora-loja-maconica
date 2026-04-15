"use client";

import Link from "next/link";
import { useRef, useState } from "react";

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
  const background =
    variant === "primary"
      ? "#065f46"
      : variant === "danger"
        ? "#7f1d1d"
        : "#ffffff";

  const color = variant === "secondary" ? "#0f172a" : "#ffffff";

  const border =
    variant === "secondary"
      ? "1px solid #dbe4ea"
      : variant === "danger"
        ? "1px solid #991b1b"
        : "1px solid #065f46";

  return (
    <button
      type="button"
      onClick={onClick}
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
        opacity: disabled ? 0.6 : 1,
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

type UploadApiSuccess = {
  success: true;
  message: string;
  filePath?: string;
  bucket?: string;
  publicUrl?: string;
  note?: string;
};

type UploadApiError = {
  success: false;
  message: string;
  error?: string;
};

type DeleteApiSuccess = {
  success: true;
  message: string;
  removedPaths?: string[];
};

type DeleteApiError = {
  success: false;
  message: string;
  error?: string;
};

export default function MinhaAreaPage() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [nome] = useState("Irmão da Loja");
  const [cargo] = useState("Cargo institucional vinculado");
  const [papel] = useState("Acesso protegido");

  const [lojaId] = useState("loja-maconica-aurora");
  const [irmaoId] = useState("irmao-demo-001");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  const [fotoPublicUrl, setFotoPublicUrl] = useState<string | null>(null);
  const [statusFoto, setStatusFoto] = useState("Pendente");
  const [enviando, setEnviando] = useState(false);
  const [removendo, setRemovendo] = useState(false);
  const [mensagem, setMensagem] = useState(
    "Selecione uma imagem para pré-visualizar e depois clique em Salvar foto para enviar ao armazenamento seguro.",
  );

  function abrirSeletor() {
    inputRef.current?.click();
  }

  function aoSelecionarArquivo(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);
    setStatusFoto("Prévia pronta");
    setMensagem(
      `Imagem selecionada: ${file.name}. Agora clique em "Salvar foto" para enviar ao armazenamento seguro.`,
    );

    const reader = new FileReader();

    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : null;
      setFotoPreview(result);
    };

    reader.readAsDataURL(file);
  }

  async function salvarFoto() {
    if (!selectedFile) {
      setMensagem("Selecione uma imagem antes de clicar em Salvar foto.");
      return;
    }

    setEnviando(true);
    setStatusFoto("Enviando");
    setMensagem(
      `Enviando a foto ${selectedFile.name} para o armazenamento seguro...`,
    );

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("irmaoId", irmaoId);
      formData.append("lojaId", lojaId);

      const response = await fetch("/api/irmaos/foto", {
        method: "POST",
        body: formData,
      });

      const json = (await response.json()) as UploadApiSuccess | UploadApiError;

      if (!response.ok || !json.success) {
        setStatusFoto("Erro");
        setMensagem(
          json.message ||
            "Não foi possível enviar a foto do irmão para o armazenamento.",
        );
        return;
      }

      setFotoPublicUrl(json.publicUrl || null);
      setStatusFoto("Salva");
      setMensagem(
        `${json.message} ${
          json.note || "A imagem já está pronta para uso controlado."
        }`,
      );
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro inesperado no envio.";

      setStatusFoto("Erro");
      setMensagem(`Falha ao enviar a foto do irmão. Detalhe: ${message}`);
    } finally {
      setEnviando(false);
    }
  }

  async function removerFoto() {
    if (!fotoPreview && !fotoPublicUrl) {
      setMensagem("Nenhuma foto disponível para remoção.");
      return;
    }

    setRemovendo(true);
    setMensagem("Removendo a foto do irmão do armazenamento seguro...");

    try {
      const response = await fetch("/api/irmaos/foto", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          irmaoId,
          lojaId,
        }),
      });

      const json = (await response.json()) as DeleteApiSuccess | DeleteApiError;

      if (!response.ok || !json.success) {
        setStatusFoto("Erro");
        setMensagem(
          json.message || "Não foi possível remover a foto do irmão.",
        );
        return;
      }

      setSelectedFile(null);
      setFotoPreview(null);
      setFotoPublicUrl(null);
      setStatusFoto("Removida");
      setMensagem(json.message);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro inesperado na remoção.";

      setStatusFoto("Erro");
      setMensagem(`Falha ao remover a foto do irmão. Detalhe: ${message}`);
    } finally {
      setRemovendo(false);
    }
  }

  const fotoStatusParaCard =
    statusFoto === "Salva"
      ? "Salva"
      : statusFoto === "Enviando"
        ? "Enviando"
        : statusFoto === "Removida"
          ? "Removida"
          : fotoPreview
            ? "Prévia pronta"
            : "Pendente";

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
                  maxWidth: 760,
                  color: "rgba(255,255,255,0.92)",
                  lineHeight: 1.8,
                  fontSize: 16,
                }}
              >
                Ambiente individual do irmão com identidade institucional,
                visualização de cargo, espaço para foto, atualização segura do
                perfil e blindagem por papel e permissão. Sistema em constante
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

        <section
          style={{
            marginTop: 22,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
          }}
        >
          <SummaryCard title="Nome" value={nome} accent />
          <SummaryCard title="Cargo" value={cargo} />
          <SummaryCard title="Papel" value={papel} />
          <SummaryCard title="Foto" value={fotoStatusParaCard} />
        </section>

        <div
          style={{
            marginTop: 24,
            display: "grid",
            gridTemplateColumns: "0.9fr 1.1fr",
            gap: 18,
          }}
        >
          <SectionCard eyebrow="Identificação do irmão" title="Foto institucional">
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={aoSelecionarArquivo}
              style={{ display: "none" }}
            />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 220,
                  height: 220,
                  borderRadius: 28,
                  overflow: "hidden",
                  background: "#f8fafc",
                  border: "1px dashed #94a3b8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "inset 0 0 0 1px rgba(148, 163, 184, 0.15)",
                }}
              >
                {fotoPreview ? (
                  <img
                    src={fotoPreview}
                    alt="Pré-visualização da foto do irmão"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      padding: 20,
                      textAlign: "center",
                      color: "#64748b",
                      lineHeight: 1.7,
                      fontSize: 14,
                      fontWeight: 700,
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

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: 10,
                }}
              >
                <ActionButton
                  label={fotoPreview ? "Trocar foto" : "Adicionar foto"}
                  onClick={abrirSeletor}
                  disabled={enviando || removendo}
                />

                <ActionButton
                  label={enviando ? "Salvando..." : "Salvar foto"}
                  onClick={salvarFoto}
                  variant="secondary"
                  disabled={!selectedFile || enviando || removendo}
                />

                <ActionButton
                  label={removendo ? "Removendo..." : "Remover foto"}
                  onClick={removerFoto}
                  variant="danger"
                  disabled={(!fotoPreview && !fotoPublicUrl) || enviando || removendo}
                />
              </div>

              <p
                style={{
                  margin: 0,
                  textAlign: "center",
                  color: "#475569",
                  lineHeight: 1.75,
                  fontSize: 14,
                }}
              >
                Agora o fluxo correto fica assim: selecionar imagem, revisar a
                prévia e clicar em <strong>Salvar foto</strong> para mandar ao
                armazenamento seguro.
              </p>
            </div>
          </SectionCard>

          <div style={{ display: "grid", gap: 18 }}>
            <SectionCard eyebrow="Situação atual" title="Leitura institucional">
              <div
                style={{
                  display: "grid",
                  gap: 14,
                }}
              >
                <div
                  style={{
                    borderRadius: 18,
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    padding: 16,
                    color: "#334155",
                    lineHeight: 1.75,
                    fontSize: 15,
                  }}
                >
                  <strong>Nome do irmão:</strong> {nome}
                </div>

                <div
                  style={{
                    borderRadius: 18,
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    padding: 16,
                    color: "#334155",
                    lineHeight: 1.75,
                    fontSize: 15,
                  }}
                >
                  <strong>Cargo vinculado:</strong> {cargo}
                </div>

                <div
                  style={{
                    borderRadius: 18,
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    padding: 16,
                    color: "#334155",
                    lineHeight: 1.75,
                    fontSize: 15,
                  }}
                >
                  <strong>Nível de acesso:</strong> {papel}
                </div>

                <div
                  style={{
                    borderRadius: 18,
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    padding: 16,
                    color: "#334155",
                    lineHeight: 1.75,
                    fontSize: 15,
                  }}
                >
                  <strong>Loja ID:</strong> {lojaId}
                  <br />
                  <strong>Irmão ID:</strong> {irmaoId}
                </div>

                {selectedFile ? (
                  <div
                    style={{
                      borderRadius: 18,
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      padding: 16,
                      color: "#334155",
                      lineHeight: 1.75,
                      fontSize: 15,
                    }}
                  >
                    <strong>Arquivo selecionado:</strong> {selectedFile.name}
                  </div>
                ) : null}

                {fotoPublicUrl ? (
                  <div
                    style={{
                      borderRadius: 18,
                      background: "#f0fdf4",
                      border: "1px solid #86efac",
                      padding: 16,
                      color: "#166534",
                      lineHeight: 1.75,
                      fontSize: 15,
                      wordBreak: "break-all",
                    }}
                  >
                    <strong>URL pública atual da foto:</strong>
                    <br />
                    {fotoPublicUrl}
                  </div>
                ) : null}
              </div>
            </SectionCard>

            <SectionCard eyebrow="Mensagem do sistema" title="Status da foto">
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

            <SectionCard eyebrow="Blindagem ativa" title="Regras de uso da imagem">
              <ul
                style={{
                  margin: 0,
                  paddingLeft: 22,
                  color: "#334155",
                  lineHeight: 1.9,
                  fontSize: 15,
                }}
              >
                <li>A foto deve ficar vinculada ao irmão correto.</li>
                <li>Nem todo usuário poderá editar a imagem de outro irmão.</li>
                <li>Secretaria e administração podem ter permissão ampliada.</li>
                <li>O próprio irmão pode editar a sua foto, se a loja permitir.</li>
                <li>A imagem deve ficar em ambiente seguro e não público.</li>
              </ul>
            </SectionCard>
          </div>
        </div>
      </div>
    </main>
  );
}