import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MASONIC_OFFICES_LIST,
  type MasonicModule,
  type MasonicOfficeSlug,
  getOfficePageContent,
  hasModuleAccess,
  isMasonicOfficeSlug,
} from "../../../lib/rbac";

const MODULE_LABELS: Record<MasonicModule, string> = {
  painel: "Painel inicial",
  administracao: "Administração",
  financeiro: "Financeiro",
  secretaria: "Secretaria",
  documentos: "Documentos",
  patrimonio: "Patrimônio",
  auditoria: "Auditoria",
  solenidades: "Solenidades",
  acervo: "Acervo",
  "tronco-solidariedade": "Tronco de Solidariedade",
  doacoes: "Doações",
  "minha-area": "Minha área",
  "cadastro-irmaos": "Cadastro de irmãos",
  agenda: "Agenda",
  mensageria: "Mensageria",
  comissoes: "Comissões",
  relatorios: "Relatórios",
};

function formatModuleLabel(module: MasonicModule): string {
  return MODULE_LABELS[module] ?? module;
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

function BulletList({ items }: { items: string[] }) {
  return (
    <ul
      style={{
        margin: 0,
        paddingLeft: 22,
        color: "#334155",
        lineHeight: 1.9,
        fontSize: 15,
      }}
    >
      {items.map((item, index) => (
        <li key={`${item}-${index}`}>{item}</li>
      ))}
    </ul>
  );
}

function ModulePill({
  label,
  allowed,
}: {
  label: string;
  allowed: boolean;
}) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 999,
        padding: "10px 14px",
        fontSize: 13,
        fontWeight: 800,
        border: allowed ? "1px solid #86efac" : "1px solid #cbd5e1",
        background: allowed ? "#f0fdf4" : "#f8fafc",
        color: allowed ? "#166534" : "#475569",
      }}
    >
      {label}
    </div>
  );
}

function QuickInfoCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: 22,
        border: "1px solid #dbe4ea",
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
          fontSize: 22,
          lineHeight: 1.2,
          fontWeight: 900,
          color: "#0f172a",
        }}
      >
        {value}
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return MASONIC_OFFICES_LIST.map((office) => ({
    slug: office.slug,
  }));
}

export default async function CargoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  if (!isMasonicOfficeSlug(slug)) {
    notFound();
  }

  const content = getOfficePageContent(slug);
  const officeSlug = slug as MasonicOfficeSlug;

  const financeAccess = hasModuleAccess(officeSlug, "financeiro")
    ? "Autorizado"
    : "Restrito";

  const administrationAccess = hasModuleAccess(officeSlug, "administracao")
    ? "Autorizado"
    : "Restrito";

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
                Página exclusiva do cargo
              </div>

              <h1
                style={{
                  margin: 0,
                  fontSize: 34,
                  lineHeight: 1.1,
                }}
              >
                {content.title}
              </h1>

              <p
                style={{
                  marginTop: 14,
                  marginBottom: 0,
                  maxWidth: 780,
                  color: "rgba(255,255,255,0.92)",
                  lineHeight: 1.75,
                  fontSize: 15,
                }}
              >
                {content.description}
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
                href="/financeiro"
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
                Voltar ao financeiro
              </Link>

              <Link
                href="/"
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
                Voltar ao painel
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
          <QuickInfoCard title="Cargo" value={content.title} />
          <QuickInfoCard title="Nível técnico" value={content.systemRole} />
          <QuickInfoCard title="Financeiro" value={financeAccess} />
          <QuickInfoCard title="Administração" value={administrationAccess} />
        </section>

        <div
          style={{
            marginTop: 24,
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: 18,
          }}
        >
          <div style={{ display: "grid", gap: 18 }}>
            <SectionCard eyebrow="Missão do cargo" title="Função institucional">
              <p
                style={{
                  margin: 0,
                  color: "#334155",
                  lineHeight: 1.85,
                  fontSize: 15,
                }}
              >
                {content.mission}
              </p>
            </SectionCard>

            <SectionCard
              eyebrow="Responsabilidades principais"
              title="O que este cargo faz"
            >
              <BulletList items={content.responsibilities} />
            </SectionCard>

            <SectionCard
              eyebrow="Orientação prática"
              title="Como atuar no cargo"
            >
              <BulletList items={content.howToAct} />
            </SectionCard>

            <SectionCard eyebrow="Rotina sugerida" title="Como conduzir no dia a dia">
              <BulletList items={content.routine} />
            </SectionCard>
          </div>

          <div style={{ display: "grid", gap: 18 }}>
            <SectionCard eyebrow="Acesso liberado" title="Módulos permitidos">
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                {content.allowedModules.map((module) => (
                  <ModulePill
                    key={module}
                    label={formatModuleLabel(module)}
                    allowed
                  />
                ))}
              </div>
            </SectionCard>

            <SectionCard eyebrow="Blindagem ativa" title="Módulos restritos">
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                {content.restrictedModules.map((module) => (
                  <ModulePill
                    key={module}
                    label={formatModuleLabel(module)}
                    allowed={false}
                  />
                ))}
              </div>
            </SectionCard>

            <SectionCard eyebrow="Expansão futura" title="Foto do irmão e identificação">
              <p
                style={{
                  margin: 0,
                  color: "#334155",
                  lineHeight: 1.85,
                  fontSize: 15,
                }}
              >
                A estrutura da Loja Maçônica já fica preparada para permitir foto
                do irmão na área individual e no cadastro interno, com opção de
                adicionar, trocar ou remover imagem conforme as permissões
                administrativas da loja. Essa etapa será feita em arquivo próprio,
                com blindagem de acesso, para evitar exposição indevida.
              </p>
            </SectionCard>

            <SectionCard eyebrow="Uso interno" title="Observação administrativa">
              <p
                style={{
                  margin: 0,
                  color: "#334155",
                  lineHeight: 1.85,
                  fontSize: 15,
                }}
              >
                Esta página mostra a função institucional do cargo e seus limites
                de acesso no sistema. Nem todo cargo importante da loja possui
                administração completa. A blindagem permanece ativa para proteger
                a gestão, o financeiro e as informações internas da Loja
                Maçônica.
              </p>
            </SectionCard>
          </div>
        </div>
      </div>
    </main>
  );
}