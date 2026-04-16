"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type TipoDocumento =
  | "Ficha"
  | "Documento"
  | "Comprovante"
  | "Ata"
  | "Declaração"
  | "Arquivo interno"
  | "Outro";

type DocumentoRegistro = {
  id: string;
  tipo: TipoDocumento;
  titulo: string;
  descricao: string;
  referencia: string;
  dataDocumento: string;
  responsavel: string;
  status: string;
  irmaoId: string;
  irmaoNome: string;
  criadoEm: string;
};

const STORAGE_KEY = "aurora-loja-maconica-documentos-v1";

const IRMAO_FIXO = {
  id: "be8ae6de-f312-402f-834b-6739c033217e",
  nome: "Ricardo Justino Silva",
  cargo: "Irmão da Loja",
  email: "ricardogrupoexecutivo1@gmail.com",
};

const FORM_INICIAL = {
  tipo: "Documento" as TipoDocumento,
  titulo: "",
  descricao: "",
  referencia: "",
  dataDocumento: "",
  responsavel: "",
  status: "Ativo",
};

function gerarId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function formatarDataBR(valor: string) {
  if (!valor) return "__/__/____";
  const partes = valor.split("-");
  if (partes.length !== 3) return valor;
  return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

function formatarDataHora(valor: string) {
  if (!valor) return "-";
  const data = new Date(valor);
  if (Number.isNaN(data.getTime())) return valor;

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(data);
}

function baixarJson(nomeArquivo: string, conteudo: unknown) {
  const blob = new Blob([JSON.stringify(conteudo, null, 2)], {
    type: "application/json;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = nomeArquivo;
  link.click();
  URL.revokeObjectURL(url);
}

export default function DocumentosPage() {
  const [documentos, setDocumentos] = useState<DocumentoRegistro[]>([]);
  const [form, setForm] = useState(FORM_INICIAL);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [busca, setBusca] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  useEffect(() => {
    try {
      const salvo = localStorage.getItem(STORAGE_KEY);
      if (salvo) {
        const dados = JSON.parse(salvo);
        if (Array.isArray(dados)) {
          setDocumentos(dados);
        }
      }
    } catch {
      setErro("Não foi possível ler a base local de documentos.");
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    if (carregando) return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(documentos));
    } catch {
      setErro("Não foi possível atualizar a base local automaticamente.");
    }
  }, [documentos, carregando]);

  const documentosFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    const baseOrdenada = [...documentos].sort(
      (a, b) =>
        new Date(b.dataDocumento || b.criadoEm).getTime() -
        new Date(a.dataDocumento || a.criadoEm).getTime()
    );

    if (!termo) return baseOrdenada;

    return baseOrdenada.filter((item) =>
      [
        item.tipo,
        item.titulo,
        item.descricao,
        item.referencia,
        item.dataDocumento,
        item.responsavel,
        item.status,
        item.irmaoNome,
      ]
        .join(" ")
        .toLowerCase()
        .includes(termo)
    );
  }, [documentos, busca]);

  const totalDocumentos = documentos.length;
  const totalAtivos = documentos.filter((item) => item.status === "Ativo").length;
  const totalComprovantes = documentos.filter(
    (item) => item.tipo === "Comprovante" || item.tipo === "Declaração"
  ).length;
  const ultimoRegistro = documentos.length
    ? [...documentos].sort(
        (a, b) => new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime()
      )[0]
    : null;

  function atualizarCampo(campo: keyof typeof FORM_INICIAL, valor: string) {
    setForm((atual) => ({
      ...atual,
      [campo]: valor,
    }));
  }

  function limparFormulario() {
    setForm(FORM_INICIAL);
    setMensagem("Formulário limpo com sucesso.");
    setErro("");
  }

  function atualizarLeitura() {
    setMensagem("");
    setErro("");
    setCarregando(true);

    try {
      const salvo = localStorage.getItem(STORAGE_KEY);
      if (salvo) {
        const dados = JSON.parse(salvo);
        setDocumentos(Array.isArray(dados) ? dados : []);
      } else {
        setDocumentos([]);
      }
      setMensagem("Leitura local atualizada com sucesso.");
    } catch {
      setErro("Falha ao atualizar a leitura da base local.");
    } finally {
      setCarregando(false);
    }
  }

  function baixarBase() {
    baixarJson(
      `documentos-irmao-${new Date().toISOString().slice(0, 10)}.json`,
      {
        sistema: "Aurora Loja Maçônica",
        modulo: "Documentos e downloads",
        exportadoEm: new Date().toISOString(),
        irmaoVinculado: IRMAO_FIXO,
        totalRegistros: documentos.length,
        registros: documentos,
      }
    );

    setMensagem("Download da base local gerado com sucesso.");
    setErro("");
  }

  function removerRegistro(id: string) {
    const confirmado = window.confirm("Deseja remover este documento da base?");
    if (!confirmado) return;

    setDocumentos((atual) => atual.filter((item) => item.id !== id));
    setMensagem("Documento removido com sucesso.");
    setErro("");
  }

  function salvarRegistro(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setMensagem("");
    setErro("");

    if (!form.titulo.trim()) {
      setErro("Informe o título do documento.");
      return;
    }

    setSalvando(true);

    try {
      const novoRegistro: DocumentoRegistro = {
        id: gerarId(),
        tipo: form.tipo,
        titulo: form.titulo.trim(),
        descricao: form.descricao.trim(),
        referencia: form.referencia.trim(),
        dataDocumento: form.dataDocumento,
        responsavel: form.responsavel.trim(),
        status: form.status.trim(),
        irmaoId: IRMAO_FIXO.id,
        irmaoNome: IRMAO_FIXO.nome,
        criadoEm: new Date().toISOString(),
      };

      setDocumentos((atual) => [novoRegistro, ...atual]);
      setForm(FORM_INICIAL);
      setMensagem("Documento salvo com sucesso na base protegida.");
    } catch {
      setErro("Não foi possível salvar o documento.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <main style={styles.page}>
      <div style={styles.pageGlowOne} />
      <div style={styles.pageGlowTwo} />

      <section style={styles.container}>
        <header style={styles.hero}>
          <div style={styles.heroTop}>
            <div style={styles.heroBadge}>Documentos institucionais e downloads protegidos</div>
            <div style={styles.heroMiniBadge}>Aurora Loja Maçônica</div>
          </div>

          <div style={styles.heroGrid}>
            <div style={styles.heroMain}>
              <h1 style={styles.title}>Documentos e downloads • Aurora Loja Maçônica</h1>

              <p style={styles.description}>
                Área criada para organizar fichas, documentos, comprovantes, declarações, atas,
                arquivos internos e referências institucionais do irmão, com leitura elegante,
                proteção da base e possibilidade de download local para maior segurança.
              </p>

              <div style={styles.heroActions}>
                <Link href="/irmaos" style={styles.primaryLink}>
                  Voltar aos irmãos
                </Link>

                <Link href="/irmaos/historico" style={styles.secondaryLink}>
                  Ir para histórico
                </Link>
              </div>

              <div style={styles.notice}>
                <strong>Sistema em constante atualização.</strong> Esta área pode passar por melhorias
                visuais, operacionais e de organização documental durante a evolução da plataforma.
              </div>
            </div>

            <aside style={styles.heroAside}>
              <div style={styles.profileCard}>
                <div style={styles.profileHeader}>Registro institucional</div>

                <div style={styles.profileName}>{IRMAO_FIXO.nome}</div>

                <div style={styles.profilePills}>
                  <span style={styles.pillDark}>Documentos</span>
                  <span style={styles.pillLight}>Protegido</span>
                  <span style={styles.pillLight}>Downloads liberados</span>
                </div>

                <div style={styles.profileInfoGrid}>
                  <div style={styles.profileInfoItem}>
                    <span style={styles.profileLabel}>UUID real</span>
                    <strong style={styles.profileValue}>{IRMAO_FIXO.id}</strong>
                  </div>

                  <div style={styles.profileInfoItem}>
                    <span style={styles.profileLabel}>Cargo atual</span>
                    <strong style={styles.profileValue}>{IRMAO_FIXO.cargo}</strong>
                  </div>

                  <div style={styles.profileInfoItem}>
                    <span style={styles.profileLabel}>E-mail</span>
                    <strong style={styles.profileValue}>{IRMAO_FIXO.email}</strong>
                  </div>

                  <div style={styles.profileInfoItem}>
                    <span style={styles.profileLabel}>Base</span>
                    <strong style={styles.profileValue}>Documentação institucional do irmão</strong>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </header>

        <section style={styles.metricGrid}>
          <article style={styles.metricCard}>
            <span style={styles.metricLabel}>Documentos totais</span>
            <strong style={styles.metricValue}>{totalDocumentos}</strong>
            <span style={styles.metricHint}>Base documental protegida</span>
          </article>

          <article style={styles.metricCard}>
            <span style={styles.metricLabel}>Ativos</span>
            <strong style={styles.metricValue}>{totalAtivos}</strong>
            <span style={styles.metricHint}>Documentos em situação ativa</span>
          </article>

          <article style={styles.metricCard}>
            <span style={styles.metricLabel}>Comprovantes e declarações</span>
            <strong style={styles.metricValue}>{totalComprovantes}</strong>
            <span style={styles.metricHint}>Registros formais organizados</span>
          </article>

          <article style={styles.metricCard}>
            <span style={styles.metricLabel}>Último lançamento</span>
            <strong style={styles.metricValueSmall}>
              {ultimoRegistro ? formatarDataHora(ultimoRegistro.criadoEm) : "Sem registros"}
            </strong>
            <span style={styles.metricHint}>Atualização documental protegida</span>
          </article>
        </section>

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

        <section style={styles.grid}>
          <article style={styles.mainCard}>
            <div style={styles.cardHeader}>
              <div>
                <h2 style={styles.cardTitle}>Novo documento</h2>
                <p style={styles.cardSubtitle}>
                  Organize a base documental do irmão com leitura bonita e estrutura protegida.
                </p>
              </div>

              <div style={styles.cardBadge}>Salvar documento</div>
            </div>

            <div style={styles.linkedBox}>
              <span style={styles.linkedLabel}>Irmão vinculado com UUID real</span>
              <strong style={styles.linkedValue}>
                {IRMAO_FIXO.nome} • {IRMAO_FIXO.id}
              </strong>
            </div>

            <form onSubmit={salvarRegistro} style={styles.form}>
              <div style={styles.formGrid}>
                <label style={styles.field}>
                  <span style={styles.label}>Tipo de documento</span>
                  <select
                    value={form.tipo}
                    onChange={(e) => atualizarCampo("tipo", e.target.value)}
                    style={styles.select}
                  >
                    <option value="Ficha">Ficha</option>
                    <option value="Documento">Documento</option>
                    <option value="Comprovante">Comprovante</option>
                    <option value="Ata">Ata</option>
                    <option value="Declaração">Declaração</option>
                    <option value="Arquivo interno">Arquivo interno</option>
                    <option value="Outro">Outro</option>
                  </select>
                </label>

                <label style={styles.field}>
                  <span style={styles.label}>Status</span>
                  <select
                    value={form.status}
                    onChange={(e) => atualizarCampo("status", e.target.value)}
                    style={styles.select}
                  >
                    <option value="Ativo">Ativo</option>
                    <option value="Arquivado">Arquivado</option>
                    <option value="Pendente">Pendente</option>
                    <option value="Revisão">Revisão</option>
                  </select>
                </label>

                <label style={{ ...styles.field, gridColumn: "1 / -1" }}>
                  <span style={styles.label}>Título</span>
                  <input
                    value={form.titulo}
                    onChange={(e) => atualizarCampo("titulo", e.target.value)}
                    placeholder="Ex.: Ficha de cadastro, declaração, comprovante, ata..."
                    style={styles.input}
                  />
                </label>

                <label style={styles.field}>
                  <span style={styles.label}>Data do documento</span>
                  <input
                    type="date"
                    value={form.dataDocumento}
                    onChange={(e) => atualizarCampo("dataDocumento", e.target.value)}
                    style={styles.input}
                  />
                </label>

                <label style={styles.field}>
                  <span style={styles.label}>Responsável / origem</span>
                  <input
                    value={form.responsavel}
                    onChange={(e) => atualizarCampo("responsavel", e.target.value)}
                    placeholder="Ex.: Secretaria, Tesouraria, Loja..."
                    style={styles.input}
                  />
                </label>

                <label style={{ ...styles.field, gridColumn: "1 / -1" }}>
                  <span style={styles.label}>Referência</span>
                  <input
                    value={form.referencia}
                    onChange={(e) => atualizarCampo("referencia", e.target.value)}
                    placeholder="Ex.: número interno, protocolo, observação de arquivo..."
                    style={styles.input}
                  />
                </label>

                <label style={{ ...styles.field, gridColumn: "1 / -1" }}>
                  <span style={styles.label}>Descrição</span>
                  <textarea
                    value={form.descricao}
                    onChange={(e) => atualizarCampo("descricao", e.target.value)}
                    placeholder="Descreva o conteúdo, a utilidade e a finalidade institucional do documento."
                    rows={6}
                    style={styles.textarea}
                  />
                </label>
              </div>

              <div style={styles.actionRow}>
                <button type="submit" style={styles.buttonPrimary} disabled={salvando}>
                  {salvando ? "Salvando..." : "Salvar documento"}
                </button>

                <button type="button" style={styles.buttonSecondary} onClick={limparFormulario}>
                  Limpar formulário
                </button>

                <button type="button" style={styles.buttonGhost} onClick={baixarBase}>
                  Baixar base local
                </button>

                <button type="button" style={styles.buttonGhost} onClick={atualizarLeitura}>
                  Atualizar leitura
                </button>
              </div>
            </form>
          </article>

          <aside style={styles.sideColumn}>
            <article style={styles.sideCard}>
              <div style={styles.cardHeader}>
                <div>
                  <h2 style={styles.cardTitle}>Base documental</h2>
                  <p style={styles.cardSubtitle}>
                    Leitura institucional dos documentos do irmão com ordenação cronológica.
                  </p>
                </div>

                <div style={styles.cardBadge}>{documentosFiltrados.length} exibidos</div>
              </div>

              <div style={styles.searchWrap}>
                <input
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  placeholder="Buscar por tipo, título, referência, responsável, descrição..."
                  style={styles.searchInput}
                />
              </div>

              <div style={styles.listWrap}>
                {carregando ? (
                  <div style={styles.emptyState}>Carregando documentos...</div>
                ) : documentosFiltrados.length === 0 ? (
                  <div style={styles.emptyState}>
                    Nenhum documento encontrado na base protegida.
                  </div>
                ) : (
                  documentosFiltrados.map((item) => (
                    <div key={item.id} style={styles.docCard}>
                      <div style={styles.docTop}>
                        <div>
                          <div style={styles.docTitle}>{item.titulo}</div>
                          <div style={styles.docTagRow}>
                            <span style={styles.docTag}>{item.tipo}</span>
                            <span style={styles.statusTag}>{item.status}</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => removerRegistro(item.id)}
                          style={styles.removeButton}
                        >
                          Remover
                        </button>
                      </div>

                      <div style={styles.docInfoGrid}>
                        <div style={styles.docInfoBox}>
                          <span style={styles.smallLabel}>Data</span>
                          <strong style={styles.smallValue}>
                            {item.dataDocumento ? formatarDataBR(item.dataDocumento) : "Não informada"}
                          </strong>
                        </div>

                        <div style={styles.docInfoBox}>
                          <span style={styles.smallLabel}>Responsável</span>
                          <strong style={styles.smallValue}>
                            {item.responsavel || "Não informado"}
                          </strong>
                        </div>

                        <div style={styles.docInfoBox}>
                          <span style={styles.smallLabel}>Referência</span>
                          <strong style={styles.smallValue}>
                            {item.referencia || "Não informada"}
                          </strong>
                        </div>

                        <div style={styles.docInfoBox}>
                          <span style={styles.smallLabel}>Criado em</span>
                          <strong style={styles.smallValue}>
                            {formatarDataHora(item.criadoEm)}
                          </strong>
                        </div>
                      </div>

                      <div style={styles.obsBox}>
                        <span style={styles.smallLabel}>Descrição</span>
                        <p style={styles.obsText}>
                          {item.descricao || "Sem descrição complementar neste registro."}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </article>

            <article style={styles.sideCard}>
              <div style={styles.cardHeader}>
                <div>
                  <h2 style={styles.cardTitle}>Leitura institucional</h2>
                  <p style={styles.cardSubtitle}>
                    Base pronta para organizar documentos, comprovantes e downloads do irmão.
                  </p>
                </div>

                <div style={styles.cardBadge}>Protegida</div>
              </div>

              <div style={styles.readingStack}>
                <div style={styles.readingItem}>
                  <strong style={styles.readingTitle}>Downloads liberados</strong>
                  <p style={styles.readingText}>
                    Seguimos sua regra de ouro de manter botão de download para garantir cópia local
                    no PC ou no celular quando possível.
                  </p>
                </div>

                <div style={styles.readingItem}>
                  <strong style={styles.readingTitle}>Organização documental</strong>
                  <p style={styles.readingText}>
                    Esta área ajuda a centralizar fichas, atas, comprovantes e documentos em uma
                    leitura clara, bonita e segura para o uso institucional.
                  </p>
                </div>

                <div style={styles.readingItem}>
                  <strong style={styles.readingTitle}>Visual verde premium</strong>
                  <p style={styles.readingText}>
                    Mantivemos o mesmo padrão verde premium aprovado nas áreas dos irmãos, família
                    e histórico maçônico.
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
  pageGlowOne: {
    position: "absolute",
    top: -100,
    left: -100,
    width: 280,
    height: 280,
    borderRadius: "50%",
    background: "rgba(34,197,94,0.16)",
    filter: "blur(70px)",
    pointerEvents: "none",
  },
  pageGlowTwo: {
    position: "absolute",
    right: -90,
    bottom: -90,
    width: 280,
    height: 280,
    borderRadius: "50%",
    background: "rgba(16,185,129,0.14)",
    filter: "blur(70px)",
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
    border: "1px solid rgba(134,239,172,0.26)",
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
  heroBadge: {
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
  heroMiniBadge: {
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
  heroAside: {
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
  heroActions: {
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
  },
  primaryLink: {
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
  secondaryLink: {
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
  profilePills: {
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
  profileInfoGrid: {
    display: "grid",
    gap: 12,
  },
  profileInfoItem: {
    display: "grid",
    gap: 5,
    padding: "13px 14px",
    borderRadius: 18,
    background: "#f7fcf8",
    border: "1px solid rgba(134,239,172,0.22)",
  },
  profileLabel: {
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 0.35,
    color: "#5b7b6b",
    fontWeight: 800,
  },
  profileValue: {
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
    fontSize: 34,
    lineHeight: 1,
    fontWeight: 900,
    color: "#10231a",
  },
  metricValueSmall: {
    fontSize: 18,
    lineHeight: 1.3,
    fontWeight: 900,
    color: "#10231a",
  },
  metricHint: {
    fontSize: 13,
    color: "#5d786a",
    lineHeight: 1.55,
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
  grid: {
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
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 18,
  },
  cardTitle: {
    margin: 0,
    fontSize: 24,
    lineHeight: 1.08,
    fontWeight: 900,
    color: "#10231a",
  },
  cardSubtitle: {
    margin: "8px 0 0",
    fontSize: 14,
    lineHeight: 1.6,
    color: "#5d786a",
  },
  cardBadge: {
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
  linkedBox: {
    display: "grid",
    gap: 6,
    padding: "14px 16px",
    borderRadius: 18,
    background: "linear-gradient(135deg, rgba(20,83,45,0.04), rgba(22,163,74,0.06))",
    border: "1px solid rgba(134,239,172,0.18)",
    marginBottom: 18,
  },
  linkedLabel: {
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 0.35,
    fontWeight: 800,
    color: "#4d6b5b",
  },
  linkedValue: {
    fontSize: 15,
    fontWeight: 800,
    color: "#10231a",
    wordBreak: "break-word",
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
  select: {
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
  textarea: {
    width: "100%",
    minHeight: 140,
    borderRadius: 16,
    border: "1px solid rgba(134,239,172,0.22)",
    background: "#ffffff",
    padding: "14px",
    fontSize: 15,
    color: "#10231a",
    boxSizing: "border-box",
    outline: "none",
    resize: "vertical",
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
  buttonGhost: {
    minHeight: 48,
    padding: "0 18px",
    borderRadius: 16,
    border: "1px dashed rgba(34,197,94,0.30)",
    background: "rgba(255,255,255,0.88)",
    color: "#274637",
    fontWeight: 800,
    cursor: "pointer",
  },
  searchWrap: {
    marginBottom: 16,
  },
  searchInput: {
    width: "100%",
    minHeight: 48,
    borderRadius: 16,
    border: "1px solid rgba(134,239,172,0.22)",
    background: "#ffffff",
    padding: "0 14px",
    fontSize: 14,
    color: "#10231a",
    boxSizing: "border-box",
    outline: "none",
  },
  listWrap: {
    display: "grid",
    gap: 14,
    maxHeight: 980,
    overflowY: "auto",
    paddingRight: 2,
  },
  emptyState: {
    padding: "28px 16px",
    borderRadius: 18,
    textAlign: "center",
    background: "#f7fcf8",
    border: "1px dashed rgba(134,239,172,0.30)",
    color: "#5d786a",
    fontWeight: 700,
  },
  docCard: {
    borderRadius: 22,
    border: "1px solid rgba(134,239,172,0.20)",
    background: "linear-gradient(180deg, #ffffff 0%, #f8fff9 100%)",
    padding: 18,
    display: "grid",
    gap: 14,
    boxShadow: "0 14px 34px rgba(6,78,59,0.05)",
  },
  docTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },
  docTitle: {
    fontSize: 20,
    lineHeight: 1.12,
    fontWeight: 900,
    color: "#10231a",
  },
  docTagRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 6,
  },
  docTag: {
    display: "inline-flex",
    padding: "6px 10px",
    borderRadius: 999,
    background: "rgba(22,163,74,0.10)",
    color: "#166534",
    fontSize: 12,
    fontWeight: 800,
    border: "1px solid rgba(22,163,74,0.14)",
  },
  statusTag: {
    display: "inline-flex",
    padding: "6px 10px",
    borderRadius: 999,
    background: "rgba(20,83,45,0.07)",
    color: "#14532d",
    fontSize: 12,
    fontWeight: 800,
    border: "1px solid rgba(20,83,45,0.10)",
  },
  removeButton: {
    minHeight: 38,
    padding: "0 12px",
    borderRadius: 12,
    border: "1px solid rgba(239,68,68,0.16)",
    background: "rgba(239,68,68,0.08)",
    color: "#991b1b",
    fontWeight: 800,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  docInfoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 12,
  },
  docInfoBox: {
    display: "grid",
    gap: 5,
    padding: "12px 14px",
    borderRadius: 16,
    background: "#f7fcf8",
    border: "1px solid rgba(134,239,172,0.18)",
  },
  smallLabel: {
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 0.35,
    fontWeight: 800,
    color: "#5b7b6b",
  },
  smallValue: {
    fontSize: 14,
    lineHeight: 1.45,
    fontWeight: 800,
    color: "#10231a",
    wordBreak: "break-word",
  },
  obsBox: {
    display: "grid",
    gap: 6,
    padding: "12px 14px",
    borderRadius: 16,
    background: "rgba(20,83,45,0.03)",
    border: "1px solid rgba(134,239,172,0.14)",
  },
  obsText: {
    margin: 0,
    fontSize: 14,
    lineHeight: 1.7,
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
};