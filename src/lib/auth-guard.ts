import type { SessaoLoja } from "./authGuard";
import { protegerRota } from "./authGuard";

export type { SessaoLoja };

export function protegerPagina(): SessaoLoja | null {
  return protegerRota();
}