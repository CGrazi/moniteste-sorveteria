import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { toast } from "sonner";
import { sabores } from "@/lib/sabores";
import { useCart } from "@/lib/cart";
import { brl } from "@/lib/loja";

export const Route = createFileRoute("/sabores/$slug")({
  loader: ({ params }) => {
    const sabor = sabores.find((s) => s.slug === params.slug);
    if (!sabor) throw notFound();
    return { sabor };
  },
  head: ({ loaderData }) => {
    const t = loaderData ? `${loaderData.sabor.nome} — Moniteste` : "Sabor não encontrado — Moniteste";
    const d = loaderData?.sabor.descricao ?? "Sabor não encontrado.";
    return { meta: [{ title: t }, { name: "description", content: d }, { property: "og:title", content: t }, { property: "og:description", content: d }, { property: "og:type", content: "product" }, { name: "twitter:card", content: "summary_large_image" }] };
  },
  notFoundComponent: () => <p className="p-10 text-center">Sabor não encontrado. <Link to="/" className="text-primary underline">Voltar</Link></p>,
  component: SaborPage,
});

function SaborPage() {
  const { sabor } = Route.useLoaderData();
  const { add } = useCart();
  return (
    <section className="mx-auto grid max-w-6xl gap-10 p-6 md:grid-cols-2">
      <img src={sabor.img} alt={sabor.nome} width={816} height={816} className="w-full rounded-[2rem] shadow-xl" />
      <div className="flex flex-col justify-center">
        <Link to="/" className="mb-4 text-sm text-muted-foreground">← Todos os sabores</Link>
        <h1 className="text-5xl font-bold">{sabor.nome}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{sabor.descricao}</p>
        <h2 className="mt-6 font-semibold">Ingredientes</h2>
        <ul className="mt-2 flex flex-wrap gap-2">{sabor.ingredientes.map((i) => <li key={i} className="rounded-full bg-accent px-3 py-1 text-sm text-accent-foreground">{i}</li>)}</ul>
        <p className="mt-6 text-3xl font-bold text-primary">{brl(sabor.preco)} <span className="text-base font-normal text-muted-foreground">/ pote 500ml</span></p>
        <button onClick={() => { add({ slug: sabor.slug, nome: sabor.nome, preco: sabor.preco }); toast.success(`${sabor.nome} adicionado ao carrinho`); }} className="mt-6 w-fit rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground">Adicionar ao carrinho</button>
      </div>
    </section>
  );
}
