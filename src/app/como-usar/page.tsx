"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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

const PASSOS = [
  {
    numero: "01",
    titulo: "Acesso ao sistema",
    descricao:
      "O acesso é feito pela tela de login da loja. Nesta fase inicial, utilizamos uma base simples, segura e preparada para evoluir sem quebrar o que já está funcionando.",
  },
  {
    numero: "02",
    titulo: "Entrada na área institucional",
    descricao:
      "Após o login, o sistema pode reconhecer o perfil institucional, o papel do usuário, o status da loja e a estrutura liberada para uso.",
  },
  {
    numero: "03",
    titulo: "Organização por módulos",
    descricao:
      "Cada área possui uma função clara: irmãos, família, histórico, agenda, documentos, lançamentos, financeiro e relatórios. Isso evita desorganização e melhora o controle.",
  },
  {
    numero: "04",
    titulo: "Registro e memória da loja",
    descricao:
      "A plataforma permite preservar informações importantes, fortalecer a memória institucional e manter uma base organizada para continuidade administrativa.",
  },
  {
    numero: "05",
    titulo: "Gestão contínua e crescimento",
    descricao:
      "Com o uso contínuo, a loja ganha mais clareza, mais segurança, mais padrão institucional e uma base preparada para crescer com estabilidade.",
  },
];

const BLOCOS = [
  {
    titulo: "Organização institucional",
    texto:
      "A Aurora Loja Maçônica foi pensada para centralizar áreas importantes em um ambiente sério, elegante e protegido, reduzindo improvisos e fortalecendo a rotina administrativa.",
  },
  {
    titulo: "Memória e continuidade",
    texto:
      "Além da gestão atual, o sistema ajuda a preservar registros, famílias, histórico, documentos e movimentos institucionais ao longo do tempo.",
  },
  {
    titulo: "Apresentação e valor",
    texto:
      "A plataforma também serve como vitrine de organização, modernidade e cuidado institucional, ajudando na percepção de valor e na apresentação comercial.",
  },
];

export default function ComoUsarPage() {
  const [sessaoLogada, setSessaoLogada] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);

      if (!raw) {
        setSessaoLogada(false);
        return;
      }

      const parsed = JSON.parse(raw) as SessaoLoja;
      setSessaoLogada(Boolean(parsed?.autenticado && parsed?.acessoLiberado));
    } catch {
      setSessaoLogada(false);
    }
  }, []);

  return (
    <main style={styles.page}>
      <div style={styles.glowTop} />
      <div style={styles.glowBottom} />

      <section style={styles.container}>
        <header style={styles.hero}>
          <div style={styles.heroTop}>
            <div style={styles.badge}>Guia institucional e comercial</div>
            <div style={styles.miniBadge}>Aurora Loja Maçônica</div>
          </div>

          <div style={styles.heroGrid}>
            <div style={styles.heroMain}>
              <h1 style={styles.title}>Como usar a Aurora Loja Maçônica</h1>

              <p style={styles.description}>
                Entenda de forma clara como funciona a plataforma institucional da loja, desde o
                acesso inicial até a organização administrativa, a preservação da memória e a
                evolução segura do sistema.
              </p>

              <div style={styles.actions}>
                <Link href="/" style={styles.primaryButton}>
                  Voltar à home
                </Link>

                <Link href="/login" style={styles.secondaryButton}>
                  Ir para login
                </Link>

                <Link href="/irmaos" style={styles.secondaryButton}>
                  Abrir painel dos irmãos
                </Link>

                {sessaoLogada ? (
                  <a href="/api/download/memorial" style={styles.secondaryButton}>
                    Baixar memorial
                  </a>
                ) : (
                  <Link href="/login" style={styles.secondaryButton}>
                    Login para downloads
                  </Link>
                )}
              </div>

              <div style={styles.notice}>
                <strong>Sistema em constante atualização.</strong> Esta página foi preparada para
                explicar a plataforma com clareza, gerar confiança institucional e apoiar a
                apresentação comercial da solução.
              </div>
            </div>

            <aside style={styles.sidePanel}>
              <div style={styles.profileCard}>
                <div style={styles.profileHeader}>Visão geral da proposta</div>

                <div style={styles.profileName}>Plataforma institucional premium</div>

                <div style={styles.pillRow}>
                  <span style={styles.pillDark}>Organização</span>
                  <span style={styles.pillLight}>Memória</span>
                  <span style={styles.pillLight}>Gestão</span>
                </div>

                <div style={styles.infoGrid}>
                  <div style={styles.infoItem}>
                    <span style={styles.infoLabel}>Foco principal</span>
                    <strong style={styles.infoValue}>
                      Organização da loja com acesso protegido
                    </strong>
                  </div>

                  <div style={styles.infoItem}>
                    <span style={styles.infoLabel}>Benefício institucional</span>
                    <strong style={styles.infoValue}>
                      Mais clareza, continuidade e controle
                    </strong>
                  </div>

                  <div style={styles.infoItem}>
                    <span style={styles.infoLabel}>Base preparada</span>
                    <strong style={styles.infoValue}>Celular, PC e expansão futura</strong>
                  </div>

                  <div style={styles.infoItem}>
                    <span style={styles.infoLabel}>Apresentação</span>
                    <strong style={styles.infoValue}>Visual sério, elegante e comercial</strong>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </header>

        <section style={styles.metricGrid}>
          <article style={styles.metricCard}>
            <span style={styles.metricLabel}>Guia</span>
            <strong style={styles.metricValue}>Completo</strong>
            <span style={styles.metricHint}>Explica o funcionamento em etapas claras</span>
          </article>

          <article style={styles.metricCard}>
            <span style={styles.metricLabel}>Estrutura</span>
            <strong style={styles.metricValue}>Modular</strong>
            <span style={styles.metricHint}>Cada área com função institucional definida</span>
          </article>

          <article style={styles.metricCard}>
            <span style={styles.metricLabel}>Memória</span>
            <strong style={styles.metricValue}>Protegida</strong>
            <span style={styles.metricHint}>Histórico e registros organizados com segurança</span>
          </article>

          <article style={styles.metricCard}>
            <span style={styles.metricLabel}>Venda</span>
            <strong style={styles.metricValue}>Forte</strong>
            <span style={styles.metricHint}>Página feita para explicar e valorizar a solução</span>
          </article>
        </section>

        <section style={styles.contentGrid}>
          <article style={styles.mainCard}>
            <div style={styles.sectionHeader}>
              <div>
                <h2 style={styles.sectionTitle}>Passo a passo de uso</h2>
                <p style={styles.sectionSubtitle}>
                  Leitura simples para entender como a plataforma funciona no dia a dia.
                </p>
              </div>

              <div style={styles.sectionTag}>Guia prático</div>
            </div>

            <div style={styles.stepsGrid}>
              {PASSOS.map((passo) => (
                <article key={passo.numero} style={styles.stepCard}>
                  <div style={styles.stepNumber}>{passo.numero}</div>

                  <div style={styles.stepContent}>
                    <h3 style={styles.stepTitle}>{passo.titulo}</h3>
                    <p style={styles.stepDescription}>{passo.descricao}</p>
                  </div>
                </article>
              ))}
            </div>
          </article>

          <aside style={styles.sideColumn}>
            <article style={styles.sideCard}>
              <div style={styles.sectionHeader}>
                <div>
                  <h2 style={styles.sectionTitle}>Por que essa plataforma existe</h2>
                  <p style={styles.sectionSubtitle}>
                    Mais do que tecnologia, ela organiza, preserva e fortalece a estrutura da loja.
                  </p>
                </div>

                <div style={styles.sectionTag}>Institucional</div>
              </div>

              <div style={styles.readingStack}>
                {BLOCOS.map((bloco) => (
                  <div key={bloco.titulo} style={styles.readingItem}>
                    <strong style={styles.readingTitle}>{bloco.titulo}</strong>
                    <p style={styles.readingText}>{bloco.texto}</p>
                  </div>
                ))}
              </div>
            </article>

            <article style={styles.sideCard}>
              <div style={styles.sectionHeader}>
                <div>
                  <h2 style={styles.sectionTitle}>Próximos movimentos</h2>
                  <p style={styles.sectionSubtitle}>
                    A base já está pronta para ficar ainda mais forte em apresentação e operação.
                  </p>
                </div>

                <div style={styles.sectionTag}>Expansão</div>
              </div>

              <div style={styles.readingStack}>
                <div style={styles.readingItem}>
                  <strong style={styles.readingTitle}>Login mais robusto</strong>
                  <p style={styles.readingText}>
                    Evoluir da base atual para autenticação mais forte sem quebrar o sistema.
                  </p>
                </div>

                <div style={styles.readingItem}>
                  <strong style={styles.readingTitle}>Memorial institucional completo</strong>
                  <p style={styles.readingText}>
                    Transformar esta explicação em um memorial ainda mais comercial e encantador.
                  </p>
                </div>

                <div style={styles.readingItem}>
                  <strong style={styles.readingTitle}>Material para venda</strong>
                  <p style={styles.readingText}>
                    Criar versão pronta para apresentação comercial, PDF e abordagem de novas lojas.
                  </p>
                </div>
              </div>

              <div style={styles.quickLinks}>
                <Link href="/" style={styles.quickLink}>
                  Voltar à home
                </Link>

                <Link href="/login" style={styles.quickLinkSecondary}>
                  Abrir login
                </Link>
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
  metricGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: 16,
    marginBottom: 22,
  },
  metricCard: {
    background: "rgba(255,255,255,0.88)",
    border: "1px solid rgba(134,239,172,0.22)",
    borderRadius: 24,
    padding: 20,
    boxShadow: "0 16px 45px rgba(6,78,59,0.06)",
    display: "grid",
    gap: 8,
  },
  metricLabel: {
    fontSize: 12,
    fontWeight: 900,
    textTransform: "uppercase",
    letterSpacing: 0.4,
    color: "#4d6b5b",
  },
  metricValue: {
    fontSize: 30,
    lineHeight: 1,
    fontWeight: 900,
    color: "#10231a",
  },
  metricHint: {
    fontSize: 13,
    color: "#5d786a",
    lineHeight: 1.55,
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
  stepsGrid: {
    display: "grid",
    gap: 16,
  },
  stepCard: {
    display: "grid",
    gridTemplateColumns: "90px 1fr",
    gap: 16,
    alignItems: "stretch",
    padding: 18,
    borderRadius: 22,
    background: "linear-gradient(180deg, #ffffff 0%, #f8fff9 100%)",
    border: "1px solid rgba(134,239,172,0.20)",
    boxShadow: "0 14px 34px rgba(6,78,59,0.05)",
  },
  stepNumber: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    background: "linear-gradient(135deg, #14532d 0%, #16a34a 100%)",
    color: "#ffffff",
    fontSize: 28,
    fontWeight: 900,
    minHeight: 86,
    boxShadow: "0 16px 35px rgba(22,163,74,0.18)",
  },
  stepContent: {
    display: "grid",
    alignContent: "center",
    gap: 8,
  },
  stepTitle: {
    margin: 0,
    fontSize: 21,
    lineHeight: 1.1,
    fontWeight: 900,
    color: "#10231a",
  },
  stepDescription: {
    margin: 0,
    fontSize: 14,
    lineHeight: 1.8,
    color: "#355244",
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
  quickLinks: {
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 18,
  },
  quickLink: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 46,
    padding: "0 16px",
    borderRadius: 16,
    textDecoration: "none",
    background: "linear-gradient(135deg, #14532d 0%, #16a34a 100%)",
    color: "#ffffff",
    fontWeight: 900,
    boxShadow: "0 16px 35px rgba(22,163,74,0.18)",
  },
  quickLinkSecondary: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 46,
    padding: "0 16px",
    borderRadius: 16,
    textDecoration: "none",
    background: "#ffffff",
    color: "#14532d",
    border: "1px solid rgba(34,197,94,0.18)",
    fontWeight: 800,
  },
};