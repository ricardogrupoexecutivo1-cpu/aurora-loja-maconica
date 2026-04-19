import Link from "next/link";

export default function TutorialFinanceiroPage() {
  return (
    <main style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700 }}>
        Tutorial Financeiro Premium
      </h1>

      <p style={{ marginTop: 10 }}>
        Guia completo para uso do financeiro institucional da Aurora Loja Maçônica.
      </p>

      <hr style={{ margin: "20px 0" }} />

      <h2>1. Acesso</h2>
      <p>/sistema → Financeiro institucional</p>

      <h2>2. Criar lançamento</h2>
      <p>/financeiro/novo</p>
      <ul>
        <li>Tipo: Entrada ou Saída</li>
        <li>Status: Pendente ou Pago</li>
        <li>Competência: Abril/2026</li>
        <li>Valor: Ex 32000 = R$ 320,00</li>
      </ul>

      <h2>3. Ver lançamentos</h2>
      <p>/financeiro/lancamentos</p>

      <h2>4. Ver relatórios</h2>
      <p>/financeiro/relatorios</p>

      <h2>5. Regras importantes</h2>
      <ul>
        <li>Tronco = Entrada</li>
        <li>Doações = Saída</li>
        <li>Manter competência correta</li>
      </ul>

      <h2>6. Download do tutorial</h2>
      <a href="/tutorial_financeiro_aurora.pdf" download>
        Baixar PDF
      </a>

      <div style={{ marginTop: 20 }}>
        <Link href="/sistema">Voltar ao sistema</Link>
      </div>
    </main>
  );
}