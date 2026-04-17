export function verificarSessaoLoja() {
  if (typeof window === "undefined") return false;

  try {
    const raw = window.localStorage.getItem("aurora-loja-maconica-auth");
    if (!raw) return false;

    const sessao = JSON.parse(raw);

    return Boolean(
      sessao &&
        sessao.autenticado === true &&
        sessao.acessoLiberado === true,
    );
  } catch {
    return false;
  }
}

export function protegerPagina() {
  if (typeof window === "undefined") return;

  const acessoOk = verificarSessaoLoja();

  if (!acessoOk) {
    window.location.href = "/login";
  }
}