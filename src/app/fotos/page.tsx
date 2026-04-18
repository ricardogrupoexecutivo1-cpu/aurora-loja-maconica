"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type EventoFoto = {
  id: string;
  nome: string;
  data: string;
  descricao: string;
};

const CHAVE_EVENTOS = "aurora_eventos_fotos";

function lerEventos(): EventoFoto[] {
  if (typeof window === "undefined") return [];

  try {
    const dados = localStorage.getItem(CHAVE_EVENTOS);
    return dados ? JSON.parse(dados) : [];
  } catch {
    return [];
  }
}

function salvarEventos(eventos: EventoFoto[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CHAVE_EVENTOS, JSON.stringify(eventos));
}

function card() {
  return {
    background: "#fff",
    borderRadius: 20,
    border: "1px solid #e2e8f0",
    padding: 20,
  };
}

export default function FotosPage() {
  const [eventos, setEventos] = useState<EventoFoto[]>([]);
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    setEventos(lerEventos());
  }, []);

  function salvar() {
    if (!nome || !data) return alert("Preencha nome e data");

    const novo: EventoFoto = {
      id: Date.now().toString(),
      nome,
      data,
      descricao,
    };

    const atualizados = [novo, ...eventos];
    setEventos(atualizados);
    salvarEventos(atualizados);

    setNome("");
    setData("");
    setDescricao("");
  }

  function excluir(id: string) {
    const filtrado = eventos.filter((e) => e.id !== id);
    setEventos(filtrado);
    salvarEventos(filtrado);
  }

  return (
    <main style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>Fotos por evento</h1>

      <div style={card()}>
        <h3>Novo evento</h3>

        <input
          placeholder="Nome do evento"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={{ width: "100%", marginBottom: 10 }}
        />

        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
          style={{ width: "100%", marginBottom: 10 }}
        />

        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          style={{ width: "100%", marginBottom: 10 }}
        />

        <button onClick={salvar}>Salvar evento</button>
      </div>

      <div style={{ marginTop: 20 }}>
        {eventos.map((e) => (
          <div key={e.id} style={{ ...card(), marginBottom: 10 }}>
            <h3>{e.nome}</h3>
            <p>{e.data}</p>
            <p>{e.descricao}</p>

            <Link href={`/fotos/${e.id}`}>Abrir fotos</Link>

            <br />
            <button onClick={() => excluir(e.id)}>Excluir</button>
          </div>
        ))}
      </div>
    </main>
  );
}