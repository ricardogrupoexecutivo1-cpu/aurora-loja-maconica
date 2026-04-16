"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  LOJA_ACESSO_CORTESIA_PADRAO,
  criarPerfilLojaSimples,
  resumoAcesso,
} from "@/lib/loja-access";

const STORAGE_KEY = "aurora-loja-maconica-auth";

type SessaoLoja = {
  autenticado: boolean;
  nomeLoja: string;
  login: string;
  plano: string;
  status: string;
  role: string;
  acessoLiberado: boolean;
};

export default function LoginPage() {
  const perfilPadrao = useMemo(
    () => criarPerfilLojaSimples(LOJA_ACESSO_CORTESIA_PADRAO),
    []
  );
  const leitura = useMemo(() => resumoAcesso(perfilPadrao), [perfilPadrao]);

  const [nomeLoja, setNomeLoja] = useState(perfilPadrao.nomeLoja);
  const [login, setLogin] = useState(perfilPadrao.login);
  const [senha, setSenha] = useState("");
  const [lembrar, setLembrar] = useState(true);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [sessao, setSessao] = useState<SessaoLoja | null>(null);
  const [enviando, setEnviando] = useState(false);

  function salvarSessaoLocal(payload: SessaoLoja) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // falha silenciosa proposital
    }
  }

  function limparSessaoLocal() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // falha silenciosa proposital
    }
  }

  async function entrar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setMensagem("");
    setErro("");

    if (!nomeLoja.trim()) {
      setErro("Informe o nome da loja.");
      return;
    }

    if (!login.trim()) {
      setErro("Informe o login.");
      return;
    }

    if (!senha.trim()) {
      setErro("Informe a senha.");
      return;
    }

    try {
      setEnviando(true);

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nomeLoja,
          login,
          senha,
        }),
      });

      const json = await response.json();

      if (!response.ok || !json?.success) {
        setErro(
          json?.message ||
            "Não foi possível autenticar agora. Tente novamente."
        );
        return;
      }

      const novaSessao: SessaoLoja = json.session;

      setSessao(novaSessao);

      if (lembrar) {
        salvarSessaoLocal(novaSessao);
      } else {
        limparSessaoLocal();
      }

      setMensagem(
        json?.message ||
          "Login realizado com sucesso. Sessão protegida criada para a loja."
      );
      setErro("");
    } catch {
      setErro("Não foi possível processar o login agora.");
    } finally {
      setEnviando(false);
    }
  }

  async function sairSessao() {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
    } catch {
      // mesmo com falha, limpamos localmente
    }

    setSessao(null);
    limparSessaoLocal();
    setMensagem("Sessão encerrada com sucesso.");
    setErro("");
    setSenha("");
  }

  return (
    <main style={styles.page}>
      <div style={styles.glowTop} />
      <div style={styles.glowBottom} />

      <section style={styles.container}>
        <header style={styles.hero}>
          <div style={styles.heroTop}>
            <div style={styles.badge}>Login geral simples da loja</div>
            <div style={styles.miniBadge}>Aurora Loja Maçônica</div>
          </div>

          <div style={styles.heroGrid}>
            <div style={styles.heroMain}>
              <h1 style={styles.title}>Login da loja • Aurora Loja Maçônica</h1>

              <p style={styles.description}>
                Entrada simples para ambiente restrito da loja, com leitura de plano, status e
                papel do usuário. Esta etapa prepara o controle de acesso sem complicar o sistema.
              </p>

              <div style={styles.actions}>
                <Link href="/" style={styles.primaryButton}>
                  Voltar à home
                </Link>

                <Link href="/como-usar" style={styles.secondaryButton}>
                  Como usar a plataforma
                </Link>

                <Link href="/irmaos" style={styles.secondaryButton}>
                  Ir para irmãos
                </Link>
              </div>

              <div style={styles.notice}>
                <strong>Sistema em constante atualização.</strong> Esta tela de login é uma base
                segura inicial para o controle restrito da loja, preparada para evoluir depois sem
                quebrar o que já funciona.
              </div>
            </div>

            <aside style={styles.sidePanel}>
              <div style={styles.profileCard}>
                <div style={styles.profileHeader}>Leitura do acesso padrão</div>

                <div style={styles.profileName}>{perfilPadrao.nomeLoja}</div>

                <div style={styles.pillRow}>
                  <span style={styles.pillDark}>{leitura.plano}</span>
                  <span style={styles.pillLight}>{leitura.status}</span>
                  <span style={styles.pillLight}>{leitura.role}</span>
                </div>

                <div style={styles.infoGrid}>
                  <div style={styles.infoItem}>
                    <span style={styles.infoLabel}>Login principal</span>
                    <strong style={styles.infoValue}>{perfilPadrao.login}</strong>
                  </div>

                  <div style={styles.infoItem}>
                    <span style={styles.infoLabel}>Plano</span>
                    <strong style={styles.infoValue}>{leitura.plano}</strong>
                  </div>

                  <div style={styles.infoItem}>
                    <span style={styles.infoLabel}>Status</span>
                    <strong style={styles.infoValue}>{leitura.status}</strong>
                  </div>

                  <div style={styles.infoItem}>
                    <span style={styles.infoLabel}>Acesso</span>
                    <strong style={styles.infoValue}>
                      {leitura.acessoLiberado ? "Liberado" : "Bloqueado"}
                    </strong>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </header>

        {(mensagem || erro) && (
          <section
            style={{
              ...styles.feedback,
              ...(erro ? styles.feedbackError : styles.feedbackSuccess),
            }}
          >
            {erro || mensagem}
          </section>
        )}

        <section style={styles.contentGrid}>
          <article style={styles.mainCard}>
            <div style={styles.sectionHeader}>
              <div>
                <h2 style={styles.sectionTitle}>Entrar na loja</h2>
                <p style={styles.sectionSubtitle}>
                  Login simples com nome da loja, login principal e senha provisória para esta fase
                  inicial.
                </p>
              </div>

              <div style={styles.sectionTag}>Acesso</div>
            </div>

            <form onSubmit={entrar} style={styles.form}>
              <div style={styles.formGrid}>
                <label style={styles.field}>
                  <span style={styles.label}>Nome da loja</span>
                  <input
                    value={nomeLoja}
                    onChange={(e) => setNomeLoja(e.target.value)}
                    placeholder="Ex.: Loja Maçônica Aurora"
                    style={styles.input}
                  />
                </label>

                <label style={styles.field}>
                  <span style={styles.label}>Login</span>
                  <input
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    placeholder="Ex.: email principal"
                    style={styles.input}
                  />
                </label>

                <label style={{ ...styles.field, gridColumn: "1 / -1" }}>
                  <span style={styles.label}>Senha</span>
                  <input
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder="Senha provisória inicial"
                    style={styles.input}
                  />
                </label>
              </div>

              <label style={styles.checkboxRow}>
                <input
                  type="checkbox"
                  checked={lembrar}
                  onChange={(e) => setLembrar(e.target.checked)}
                />
                <span style={styles.checkboxLabel}>Salvar sessão local neste dispositivo</span>
              </label>

              <div style={styles.actionRow}>
                <button type="submit" style={styles.buttonPrimary} disabled={enviando}>
                  {enviando ? "Entrando..." : "Entrar"}
                </button>

                <button type="button" style={styles.buttonSecondary} onClick={sairSessao}>
                  Encerrar sessão
                </button>
              </div>
            </form>
          </article>

          <aside style={styles.sideColumn}>
            <article style={styles.sideCard}>
              <div style={styles.sectionHeader}>
                <div>
                  <h2 style={styles.sectionTitle}>Sessão atual</h2>
                  <p style={styles.sectionSubtitle}>
                    Leitura da sessão local preparada para a loja.
                  </p>
                </div>

                <div style={styles.sectionTag}>
                  {sessao?.autenticado ? "Ativa" : "Sem sessão"}
                </div>
              </div>

              <div style={styles.readingStack}>
                <div style={styles.readingItem}>
                  <strong style={styles.readingTitle}>Nome da loja</strong>
                  <p style={styles.readingText}>{sessao?.nomeLoja || "Sem leitura de sessão"}</p>
                </div>

                <div style={styles.readingItem}>
                  <strong style={styles.readingTitle}>Plano</strong>
                  <p style={styles.readingText}>{sessao?.plano || "Sem plano carregado"}</p>
                </div>

                <div style={styles.readingItem}>
                  <strong style={styles.readingTitle}>Status</strong>
                  <p style={styles.readingText}>{sessao?.status || "Sem status carregado"}</p>
                </div>

                <div style={styles.readingItem}>
                  <strong style={styles.readingTitle}>Papel</strong>
                  <p style={styles.readingText}>{sessao?.role || "Sem papel carregado"}</p>
                </div>
              </div>
            </article>

            <article style={styles.sideCard}>
              <div style={styles.sectionHeader}>
                <div>
                  <h2 style={styles.sectionTitle}>Leitura institucional</h2>
                  <p style={styles.sectionSubtitle}>
                    Modelo simples para cortesia, teste e expansão futura do acesso.
                  </p>
                </div>

                <div style={styles.sectionTag}>Base pronta</div>
              </div>

              <div style={styles.readingStack}>
                <div style={styles.readingItem}>
                  <strong style={styles.readingTitle}>Cortesia</strong>
                  <p style={styles.readingText}>
                    Sua loja pode continuar com acesso em cortesia sem cobrança por agora.
                  </p>
                </div>

                <div style={styles.readingItem}>
                  <strong style={styles.readingTitle}>Teste</strong>
                  <p style={styles.readingText}>
                    Outras lojas podem ser liberadas depois em plano de teste sem complicar o app.
                  </p>
                </div>

                <div style={styles.readingItem}>
                  <strong style={styles.readingTitle}>Senha provisória</strong>
                  <p style={styles.readingText}>
                    Nesta fase inicial, a senha provisória pode ser simples e depois nós trocamos
                    por autenticação real mais forte.
                  </p>
                </div>
              </div>
            </article>
          </aside>
        </section>
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    padding: "28px 16px 56px",
    background:
      "radial-gradient(circle at top left, rgba(22,163,74,0.16), transparent 24%), radial-gradient(circle at bottom right, rgba(13,148,136,0.12), transparent 24%), linear-gradient(180deg, #f3fbf5 0%, #fbfffc 100%)",
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    color: "#10231a",
    position: "relative",
    overflow: "hidden",
  },
  glowTop: {
    position: "absolute",
    top: -110,
    left: -110,
    width: 300,
    height: 300,
    borderRadius: "50%",
    background: "rgba(34,197,94,0.16)",
    filter: "blur(75px)",
    pointerEvents: "none",
  },
  glowBottom: {
    position: "absolute",
    right: -100,
    bottom: -100,
    width: 300,
    height: 300,
    borderRadius: "50%",
    background: "rgba(16,185,129,0.12)",
    filter: "blur(75px)",
    pointerEvents: "none",
  },
  container: {
    maxWidth: 1360,
    margin: "0 auto",
    position: "relative",
    zIndex: 1,
  },
  hero: {
    background: "rgba(255,255,255,0.84)",
    backdropFilter: "blur(14px)",
    border: "1px solid rgba(134,239,172,0.24)",
    borderRadius: 32,
    padding: 28,
    boxShadow: "0 24px 70px rgba(6,78,59,0.08)",
    marginBottom: 22,
  },
  heroTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap",
    marginBottom: 18,
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    padding: "9px 14px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 900,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    background: "rgba(34,197,94,0.12)",
    color: "#166534",
    border: "1px solid rgba(34,197,94,0.18)",
  },
  miniBadge: {
    display: "inline-flex",
    alignItems: "center",
    padding: "9px 14px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 800,
    background: "rgba(22,163,74,0.08)",
    color: "#14532d",
    border: "1px solid rgba(34,197,94,0.12)",
  },
  heroGrid: {
    display: "grid",
    gridTemplateColumns: "1.35fr 0.9fr",
    gap: 22,
  },
  heroMain: {
    display: "grid",
    gap: 16,
    alignContent: "start",
  },
  sidePanel: {
    display: "flex",
  },
  title: {
    margin: 0,
    fontSize: "clamp(2.1rem, 4.2vw, 3.3rem)",
    lineHeight: 1.02,
    fontWeight: 900,
    letterSpacing: "-0.04em",
    color: "#10231a",
  },
  description: {
    margin: 0,
    fontSize: 16,
    lineHeight: 1.8,
    color: "#355244",
    maxWidth: 860,
  },
  actions: {
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
  },
  primaryButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
    padding: "0 18px",
    borderRadius: 16,
    textDecoration: "none",
    fontWeight: 900,
    background: "linear-gradient(135deg, #14532d 0%, #16a34a 100%)",
    color: "#ffffff",
    boxShadow: "0 16px 35px rgba(22,163,74,0.20)",
  },
  secondaryButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
    padding: "0 18px",
    borderRadius: 16,
    textDecoration: "none",
    fontWeight: 800,
    background: "#ffffff",
    color: "#14532d",
    border: "1px solid rgba(34,197,94,0.18)",
  },
  notice: {
    padding: "14px 16px",
    borderRadius: 18,
    background: "linear-gradient(135deg, rgba(34,197,94,0.08), rgba(16,185,129,0.08))",
    border: "1px solid rgba(34,197,94,0.14)",
    color: "#214034",
    fontSize: 14,
    lineHeight: 1.6,
  },
  profileCard: {
    width: "100%",
    background: "linear-gradient(180deg, #ffffff 0%, #f7fff8 100%)",
    borderRadius: 28,
    border: "1px solid rgba(134,239,172,0.26)",
    boxShadow: "0 22px 50px rgba(6,78,59,0.08)",
    padding: 22,
    display: "grid",
    gap: 14,
  },
  profileHeader: {
    fontSize: 12,
    fontWeight: 900,
    textTransform: "uppercase",
    letterSpacing: 0.45,
    color: "#15803d",
  },
  profileName: {
    fontSize: 28,
    lineHeight: 1.06,
    fontWeight: 900,
    color: "#10231a",
  },
  pillRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },
  pillDark: {
    display: "inline-flex",
    padding: "7px 12px",
    borderRadius: 999,
    background: "#14532d",
    color: "#ffffff",
    fontSize: 12,
    fontWeight: 800,
  },
  pillLight: {
    display: "inline-flex",
    padding: "7px 12px",
    borderRadius: 999,
    background: "rgba(22,163,74,0.08)",
    color: "#14532d",
    fontSize: 12,
    fontWeight: 800,
    border: "1px solid rgba(34,197,94,0.12)",
  },
  infoGrid: {
    display: "grid",
    gap: 12,
  },
  infoItem: {
    display: "grid",
    gap: 5,
    padding: "13px 14px",
    borderRadius: 18,
    background: "#f7fcf8",
    border: "1px solid rgba(134,239,172,0.22)",
  },
  infoLabel: {
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 0.35,
    color: "#5b7b6b",
    fontWeight: 800,
  },
  infoValue: {
    fontSize: 14,
    color: "#10231a",
    fontWeight: 800,
    wordBreak: "break-word",
  },
  feedback: {
    marginBottom: 18,
    padding: "14px 16px",
    borderRadius: 18,
    fontSize: 14,
    fontWeight: 800,
  },
  feedbackSuccess: {
    background: "rgba(22,163,74,0.10)",
    border: "1px solid rgba(22,163,74,0.16)",
    color: "#166534",
  },
  feedbackError: {
    background: "rgba(239,68,68,0.10)",
    border: "1px solid rgba(239,68,68,0.18)",
    color: "#991b1b",
  },
  contentGrid: {
    display: "grid",
    gridTemplateColumns: "1.1fr 0.9fr",
    gap: 22,
    alignItems: "start",
  },
  mainCard: {
    background: "rgba(255,255,255,0.88)",
    border: "1px solid rgba(134,239,172,0.22)",
    borderRadius: 28,
    padding: 24,
    boxShadow: "0 22px 55px rgba(6,78,59,0.07)",
  },
  sideColumn: {
    display: "grid",
    gap: 22,
  },
  sideCard: {
    background: "rgba(255,255,255,0.88)",
    border: "1px solid rgba(134,239,172,0.22)",
    borderRadius: 28,
    padding: 24,
    boxShadow: "0 22px 55px rgba(6,78,59,0.07)",
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 18,
  },
  sectionTitle: {
    margin: 0,
    fontSize: 24,
    lineHeight: 1.08,
    fontWeight: 900,
    color: "#10231a",
  },
  sectionSubtitle: {
    margin: "8px 0 0",
    fontSize: 14,
    lineHeight: 1.6,
    color: "#5d786a",
  },
  sectionTag: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 36,
    padding: "0 12px",
    borderRadius: 999,
    background: "rgba(22,163,74,0.10)",
    color: "#166534",
    border: "1px solid rgba(22,163,74,0.16)",
    fontSize: 12,
    fontWeight: 900,
    whiteSpace: "nowrap",
  },
  form: {
    display: "grid",
    gap: 18,
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 16,
  },
  field: {
    display: "grid",
    gap: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: 800,
    color: "#274637",
  },
  input: {
    width: "100%",
    minHeight: 50,
    borderRadius: 16,
    border: "1px solid rgba(134,239,172,0.22)",
    background: "#ffffff",
    padding: "0 14px",
    fontSize: 15,
    color: "#10231a",
    boxSizing: "border-box",
    outline: "none",
  },
  checkboxRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    flexWrap: "wrap",
  },
  checkboxLabel: {
    fontSize: 14,
    color: "#355244",
    fontWeight: 700,
  },
  actionRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
  },
  buttonPrimary: {
    minHeight: 48,
    padding: "0 18px",
    borderRadius: 16,
    border: "none",
    background: "linear-gradient(135deg, #14532d 0%, #16a34a 100%)",
    color: "#ffffff",
    fontWeight: 900,
    cursor: "pointer",
    boxShadow: "0 16px 35px rgba(22,163,74,0.20)",
  },
  buttonSecondary: {
    minHeight: 48,
    padding: "0 18px",
    borderRadius: 16,
    border: "1px solid rgba(134,239,172,0.24)",
    background: "#ffffff",
    color: "#14532d",
    fontWeight: 800,
    cursor: "pointer",
  },
  readingStack: {
    display: "grid",
    gap: 14,
  },
  readingItem: {
    padding: "16px",
    borderRadius: 18,
    background: "linear-gradient(180deg, #ffffff 0%, #f8fff9 100%)",
    border: "1px solid rgba(134,239,172,0.18)",
  },
  readingTitle: {
    display: "block",
    marginBottom: 6,
    fontSize: 15,
    color: "#10231a",
    fontWeight: 900,
  },
  readingText: {
    margin: 0,
    fontSize: 14,
    lineHeight: 1.7,
    color: "#4f6c5e",
  },
};