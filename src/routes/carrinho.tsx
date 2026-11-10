import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Minus, Plus } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useUser } from "@/lib/session";
import { brl, waLink } from "@/lib/loja";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/carrinho")({
  head: () => ({ meta: [{ title: "Carrinho — Moniteste" }, { name: "description", content: "Revise e finalize seu pedido." }, { property: "og:title", content: "Carrinho — Moniteste" }, { property: "og:description", content: "Finalize seu pedido." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: Carrinho,
});

function Carrinho() {
  const { items, setQtd, total, clear } = useCart();
  const { user, ready } = useUser();
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [tel, setTel] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [feito, setFeito] = useState<string | null>(null);

  async function finalizar(e: React.FormEvent) {
    e.preventDefault();
    setEnviando(true);
    const { data, error } = await supabase.from("orders").insert({ items, total, customer_name: nome, address: endereco, phone: tel }).select("id").single();
    setEnviando(false);
    if (error) return toast.error("Não foi possível enviar o pedido");
    const linhas = items.map((i) => `• ${i.qtd}x ${i.nome} — ${brl(i.preco * i.qtd)}`).join("\n");
    const msg = `Novo pedido #${data.id.slice(0, 8)}\n${linhas}\nTotal: ${brl(total)}\n\nNome: ${nome}\nEndereço: ${endereco}\nTelefone: ${tel}`;
    setFeito(waLink(msg));
    clear();
    window.open(waLink(msg), "_blank");
  }

  if (feito) return (
    <section className="mx-auto max-w-xl p-6 text-center">
      <h1 className="text-4xl font-bold">Pedido recebido! 🎉</h1>
      <p className="mt-3 text-muted-foreground">Envie a mensagem no WhatsApp para confirmarmos seu pedido.</p>
      <a href={feito} target="_blank" rel="noreferrer" className="mt-6 inline-block rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground">Abrir WhatsApp</a>
    </section>
  );

  return (
    <section className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-4xl font-bold">Seu carrinho</h1>
      {items.length === 0 ? (
        <p className="text-muted-foreground">Seu carrinho está vazio. <Link to="/" className="text-primary underline">Ver sabores</Link></p>
      ) : (
        <>
          <ul className="space-y-3">
            {items.map((i) => (
              <li key={i.slug} className="flex items-center justify-between rounded-2xl bg-card p-4">
                <span className="font-semibold">{i.nome}</span>
                <div className="flex items-center gap-3">
                  <button aria-label="Diminuir" onClick={() => setQtd(i.slug, i.qtd - 1)} className="rounded-full bg-accent p-1"><Minus className="h-4 w-4" /></button>
                  <span>{i.qtd}</span>
                  <button aria-label="Aumentar" onClick={() => setQtd(i.slug, i.qtd + 1)} className="rounded-full bg-accent p-1"><Plus className="h-4 w-4" /></button>
                  <span className="w-24 text-right font-bold">{brl(i.preco * i.qtd)}</span>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-right text-2xl font-bold">Total: {brl(total)}</p>
          {!ready ? null : user ? (
            <form onSubmit={finalizar} className="mt-8 space-y-3 rounded-3xl bg-card p-6">
              <h2 className="text-2xl font-semibold">Dados para entrega</h2>
              <input required placeholder="Seu nome" value={nome} onChange={(e) => setNome(e.target.value)} className="w-full rounded-xl border border-input bg-background px-4 py-3" />
              <input required placeholder="Endereço de entrega" value={endereco} onChange={(e) => setEndereco(e.target.value)} className="w-full rounded-xl border border-input bg-background px-4 py-3" />
              <input required placeholder="Telefone" value={tel} onChange={(e) => setTel(e.target.value)} className="w-full rounded-xl border border-input bg-background px-4 py-3" />
              <button disabled={enviando} className="w-full rounded-full bg-primary py-3 font-semibold text-primary-foreground disabled:opacity-60">Finalizar pedido</button>
            </form>
          ) : (
            <div className="mt-8 rounded-3xl bg-accent p-6 text-center text-accent-foreground">
              <p className="font-semibold">Entre na sua conta para finalizar o pedido.</p>
              <Link to="/auth" className="mt-3 inline-block rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">Entrar</Link>
            </div>
          )}
        </>
      )}
    </section>
  );
}
