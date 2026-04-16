"use client";

import Link from "next/link";

const ACESSOS = [
  {
    titulo: "Família",
    descricao:
      "Cadastro familiar protegido com base social, aniversários, observações institucionais e leitura elegante.",
    href: "/irmaos/familia",
    status: "Ativo",
  },
  {
    titulo: "Histórico maçônico",
    descricao:
      "Área institucional para trajetória do irmão, graus, cargos, comissões, eventos e marcos importantes.",
    href: "/irmaos/historico",
    status: "Ativo",
  },
  {
    titulo: "Documentos e downloads",
    descricao:
      "Espaço para fichas, comprovantes, atas, declarações, referências e cópias locais protegidas.",
    href: "/irmaos/documentos",
    status: "Ativo",
  },
  {
    titulo: "Agenda e lembretes",
    descricao:
      "Base para reuniões, solenidades, aniversários, compromissos e datas importantes do irmão.",
    href: "/irmaos/agenda",
    status: "Ativo",
  },
];

const DESTAQUES = [
  {
    label: "Área reservada",
    valor: "Protegida",
    apoio: "Acesso institucional com foco em privacidade e organização.",
  },
  {
    label: "Módulos ativos",
    valor: "4",
    apoio: "Família, histórico, documentos e agenda já estruturados.",
  },
  {
    label: "Downloads",
    valor: "Liberados",
    apoio: "Seguimos sua regra de ouro de permitir cópia local.",
  },
  {
    label: "Expansão",
    valor: "Pronta",
    apoio: "Base preparada para novos módulos sem quebrar o que já funciona.",
  },
];

export default function IrmaosPage() {
  return (
    <main style={styles.page}>
      <div style={styles.glowTop} />
      <div style={styles.glowBottom} />

      <section style={styles.container}>
        <header style={styles.hero}>
          <div style={styles.heroTop}>
            <div style={styles.badge}>Cadastro do irmão e base institucional protegida</div>
            <div style={styles.miniBadge}>Aurora Loja Maçônica</div>
          </div>

          <div style={styles.heroGrid}>
            <div style={styles.heroMain}>
              <h1 style={styles.title}>Irmãos • Aurora Loja Maçônica</h1>

              <p style={styles.description}>
                Painel institucional criado para organizar o cadastro do irmão, estrutura familiar,
                histórico maçônico, documentação, downloads, agenda e futuras expansões com
                segurança, elegância visual e proteção dos dados da Loja.
              </p>

              <div style={styles.actions}>
                <Link href="/" style={styles.primaryButton}>
                  Voltar à home
                </Link>

                <Link href="/irmaos/familia" style={styles.secondaryButton}>
                  Ir para família
                </Link>
              </div>

              <div style={styles.notice}>
                <strong>Sistema em constante atualização.</strong> Esta área pode passar por
                melhorias visuais, operacionais e institucionais durante a evolução do projeto.
              </div>
            </div>

            <aside style={styles.sidePanel}>
              <div style={styles.profileCard}>
                <div style={styles.profileHeader}>Registro institucional</div>

                <div style={styles.profileName}>Ricardo Justino Silva</div>

                <div style={styles.pillRow}>
                  <span style={styles.pillDark}>Completo</span>
                  <span style={styles.pillLight}>Irmão</span>
                  <span style={styles.pillLight}>Protegido</span>
                </div>

                <div style={styles.infoGrid}>
                  <div style={styles.infoItem}>
                    <span style={styles.infoLabel}>UUID real</span>
                    <strong style={styles.infoValue}>
                      be8ae6de-f312-402f-834b-6739c033217e
                    </strong>
                  </div>

                  <div style={styles.infoItem}>
                    <span style={styles.infoLabel}>Cargo</span>
                    <strong style={styles.infoValue}>Irmão da Loja</strong>
                  </div>

                  <div style={styles.infoItem}>
                    <span style={styles.infoLabel}>E-mail</span>
                    <strong style={styles.infoValue}>ricardogrupoexecutivo1@gmail.com</strong>
                  </div>

                  <div style={styles.infoItem}>
                    <span style={styles.infoLabel}>Situação</span>
                    <strong style={styles.infoValue}>Painel central ativo e consolidado</strong>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </header>

        <section style={styles.metricGrid}>
          {DESTAQUES.map((item) => (
            <article key={item.label} style={styles.metricCard}>
              <span style={styles.metricLabel}>{item.label}</span>
              <strong style={styles.metricValue}>{item.valor}</strong>
              <span style={styles.metricHint}>{item.apoio}</span>
            </article>
          ))}
        </section>

        <section style={styles.contentGrid}>
          <article style={styles.mainCard}>
            <div style={styles.sectionHeader}>
              <div>
                <h2 style={styles.sectionTitle}>Acessos principais</h2>
                <p style={styles.sectionSubtitle}>
                  Entrada rápida para as áreas institucionais já prontas do cadastro do irmão.
                </p>
              </div>

              <div style={styles.sectionTag}>Painel central</div>
            </div>

            <div style={styles.cardsGrid}>
              {ACESSOS.map((item) => (
                <Link key={item.titulo} href={item.href} style={styles.accessCard}>
                  <div style={styles.accessTop}>
                    <div style={styles.accessTitle}>{item.titulo}</div>
                    <div style={styles.statusPill}>{item.status}</div>
                  </div>

                  <p style={styles.accessDescription}>{item.descricao}</p>

                  <div style={styles.accessFooter}>Abrir área</div>
                </Link>
              ))}
            </div>
          </article>

          <aside style={styles.sideColumn}>
            <article style={styles.sideCard}>
              <div style={styles.sectionHeader}>
                <div>
                  <h2 style={styles.sectionTitle}>Direção institucional</h2>
                  <p style={styles.sectionSubtitle}>
                    A base foi organizada para crescimento seguro, sem perder o padrão bonito.
                  </p>
                </div>

                <div style={styles.sectionTag}>Estratégia</div>
              </div>

              <div style={styles.readingStack}>
                <div style={styles.readingItem}>
                  <strong style={styles.readingTitle}>Privacidade por padrão</strong>
                  <p style={styles.readingText}>
                    Os dados do irmão e das áreas relacionadas permanecem em ambiente reservado, com
                    foco em organização, proteção e governança institucional.
                  </p>
                </div>

                <div style={styles.readingItem}>
                  <strong style={styles.readingTitle}>Visual verde premium</strong>
                  <p style={styles.readingText}>
                    Mantivemos a identidade clara premium em verde para toda a trilha dos irmãos,
                    incluindo família, histórico, documentos e agenda.
                  </p>
                </div>

                <div style={styles.readingItem}>
                  <strong style={styles.readingTitle}>Evolução segura</strong>
                  <p style={styles.readingText}>
                    O caminho agora é continuar com mudanças pequenas, uma por vez, sem quebrar o
                    que já está funcionando.
                  </p>
                </div>
              </div>
            </article>

            <article style={styles.sideCard}>
              <div style={styles.sectionHeader}>
                <div>
                  <h2 style={styles.sectionTitle}>Atalhos rápidos</h2>
                  <p style={styles.sectionSubtitle}>
                    Navegação curta para manter o uso simples no PC e no celular.
                  </p>
                </div>

                <div style={styles.sectionTag}>Rápido</div>
              </div>

              <div style={styles.quickLinks}>
                <Link href="/irmaos/familia" style={styles.quickLink}>
                  Abrir Família
                </Link>

                <Link href="/irmaos/historico" style={styles.quickLink}>
                  Abrir Histórico
                </Link>

                <Link href="/irmaos/documentos" style={styles.quickLinkSecondary}>
                  Abrir Documentos
                </Link>

                <Link href="/irmaos/agenda" style={styles.quickLinkSecondary}>
                  Abrir Agenda
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
  cardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 16,
  },
  accessCard: {
    display: "grid",
    gap: 12,
    textDecoration: "none",
    padding: 18,
    borderRadius: 22,
    background: "linear-gradient(180deg, #ffffff 0%, #f8fff9 100%)",
    border: "1px solid rgba(134,239,172,0.20)",
    boxShadow: "0 14px 34px rgba(6,78,59,0.05)",
    color: "inherit",
  },
  accessTop: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    alignItems: "flex-start",
  },
  accessTitle: {
    fontSize: 20,
    lineHeight: 1.15,
    fontWeight: 900,
    color: "#10231a",
  },
  statusPill: {
    display: "inline-flex",
    padding: "6px 10px",
    borderRadius: 999,
    background: "rgba(22,163,74,0.10)",
    color: "#166534",
    fontSize: 12,
    fontWeight: 800,
    border: "1px solid rgba(22,163,74,0.14)",
    whiteSpace: "nowrap",
  },
  accessDescription: {
    margin: 0,
    fontSize: 14,
    lineHeight: 1.7,
    color: "#355244",
  },
  accessFooter: {
    fontSize: 13,
    fontWeight: 900,
    color: "#14532d",
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