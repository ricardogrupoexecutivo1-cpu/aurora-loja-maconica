"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type SessaoLoja = {
  loja: string;
  login: string;
};

type AtaRegistro = {
  id: string;
  titulo: string;
  data: string;
  descricao: string;
  criadoEm: string;
};

const CHAVE_SESSAO = "aurora_loja_maconica_sessao";
const CHAVE_ATAS = "aurora_loja_maconica_secretaria_v1";

function lerSessao() {
  if (typeof window === "undefined") return null;

  try {
    const local = localStorage.getItem(CHAVE_SESSAO);
    if (local) return JSON.parse(local);

    const sessao = sessionStorage.getItem(CHAVE_SESSAO);
    if (sessao) return JSON.parse(sessao);

    return null;
  } catch {
    return null;
  }
}

function lerAtas(): AtaRegistro[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(CHAVE_ATAS) || "[]");
  } catch {
    return [];
  }
}

function salvarAtas(dados: AtaRegistro[]) {
  localStorage.setItem(CHAVE_ATAS, JSON.stringify(dados));
}

function gerarId() {
  return `${Date.now()}-${Math.random()}`;
}

export default function SecretariaPage() {
  const [sessao, setSessao] = useState<SessaoLoja | null>(null);
  const [atas, setAtas] = useState<AtaRegistro[]>([]);
  const [titulo, setTitulo] = useState("");
  const [data, setData] = useState("");
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    const s = lerSessao();
    if (!s) {
      window.location.href = "/login";
      return;
    }
    setSessao(s);
    setAtas(lerAtas());
  }, []);

  function salvar(e: any) {
    e.preventDefault();

    if (!titulo) return alert("Informe o título");

    const nova: AtaRegistro = {
      id: gerarId(),
      titulo,
      data,
      descricao,
      criadoEm: new Date().toISOString(),
    };

    const lista = [nova, ...atas];
    setAtas(lista);
    salvarAtas(lista);

    setTitulo("");
    setData("");
    setDescricao("");
  }

  function remover(id: string) {
    if (!confirm("Remover registro?")) return;
    const nova = atas.filter((a) => a.id !== id);
    setAtas(nova);
    salvarAtas(nova);
  }

  return (
    <main style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>Secretaria da Loja</h1>

      <p>
        Área simples para registrar atas, observações e registros administrativos.
      </p>

      <Link href="/sistema">← Voltar ao sistema</Link>

      <hr />

      <form onSubmit={salvar}>
        <input
          placeholder="Título da ata"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <br /><br />

        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        <br /><br />

        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <br /><br />

        <button type="submit">Salvar</button>
      </form>

      <hr />

      <h2>Registros</h2>

      {atas.length === 0 && <p>Nenhum registro ainda</p>}

      {atas.map((ata) => (
        <div key={ata.id} style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
          <strong>{ata.titulo}</strong>
          <p>{ata.descricao}</p>
          <small>{ata.data}</small>
          <br />
          <button onClick={() => remover(ata.id)}>Remover</button>
        </div>
      ))}
    </main>
  );
}