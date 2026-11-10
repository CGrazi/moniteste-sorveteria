import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type CartItem = { slug: string; nome: string; preco: number; qtd: number };
type Ctx = { items: CartItem[]; add: (i: Omit<CartItem, "qtd">) => void; setQtd: (slug: string, q: number) => void; clear: () => void; total: number; count: number };
const CartCtx = createContext<Ctx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  useEffect(() => { const s = localStorage.getItem("moniteste-cart"); if (s) setItems(JSON.parse(s)); }, []);
  const save = (n: CartItem[]) => { setItems(n); localStorage.setItem("moniteste-cart", JSON.stringify(n)); };
  const add: Ctx["add"] = (i) => { const e = items.find((x) => x.slug === i.slug); save(e ? items.map((x) => (x.slug === i.slug ? { ...x, qtd: x.qtd + 1 } : x)) : [...items, { ...i, qtd: 1 }]); };
  const setQtd = (slug: string, q: number) => save(q <= 0 ? items.filter((x) => x.slug !== slug) : items.map((x) => (x.slug === slug ? { ...x, qtd: q } : x)));
  const total = items.reduce((s, x) => s + x.preco * x.qtd, 0);
  const count = items.reduce((s, x) => s + x.qtd, 0);
  return <CartCtx.Provider value={{ items, add, setQtd, clear: () => save([]), total, count }}>{children}</CartCtx.Provider>;
}
export const useCart = () => { const c = useContext(CartCtx); if (!c) throw new Error("CartProvider ausente"); return c; };
