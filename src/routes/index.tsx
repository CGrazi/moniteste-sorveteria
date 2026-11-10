import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero-sorvete.jpg";
import { sabores } from "@/lib/sabores";
import { brl, waLink } from "@/lib/loja";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Moniteste — Sorveteria Artesanal" },
      { name: "description", content: "Sorvetes artesanais em Campinas. Peça online ou pelo WhatsApp." },
      { property: "og:title", content: "Moniteste — Sorveteria Artesanal" },
      { property: "og:description", content: "Sorvetes artesanais em Campinas. Peça online ou pelo WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-10 p-6 md:grid-cols-2">
        <div>
          <h1 className="text-5xl font-bold leading-tight md:text-6xl">Sorvete artesanal que derrete corações</h1>
          <p className="mt-4 text-lg text-muted-foreground">Feito todos os dias com ingredientes frescos e muito carinho.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#sabores" className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">Ver sabores</a>
            <a href={waLink("Olá! Quero fazer um pedido na Moniteste 🍦")} target="_blank" rel="noreferrer" className="rounded-full bg-accent px-6 py-3 font-semibold text-accent-foreground">Pedir pelo WhatsApp</a>
          </div>
        </div>
        <img src={hero} alt="Sorvetes artesanais Moniteste" width={1600} height={1008} className="rounded-[2rem] shadow-xl" />
      </section>
      <section id="sabores" className="mx-auto max-w-6xl p-6 py-16">
        <h2 className="mb-8 text-4xl font-bold">Nossos sabores</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sabores.map((s) => (
            <Link key={s.slug} to="/sabores/$slug" params={{ slug: s.slug }} className="group overflow-hidden rounded-3xl bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <img src={s.img} alt={s.nome} loading="lazy" width={816} height={816} className="aspect-square w-full object-cover transition group-hover:scale-105" />
              <div className="flex items-center justify-between p-5">
                <div>
                  <h3 className="text-2xl font-semibold">{s.nome}</h3>
                  <p className="text-muted-foreground">{s.resumo}</p>
                </div>
                <span className="font-bold text-primary">{brl(s.preco)}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
