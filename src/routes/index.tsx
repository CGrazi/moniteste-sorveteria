import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/hero-sorvete.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Moniteste — Sorveteria Artesanal" },
      { name: "description", content: "Sorvetes artesanais feitos com ingredientes frescos na Moniteste." },
      { property: "og:title", content: "Moniteste — Sorveteria Artesanal" },
      { property: "og:description", content: "Sorvetes artesanais feitos com ingredientes frescos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const sabores = [
  ["Morango Fresco", "Morangos selecionados e creme"],
  ["Pistache", "Pistache torrado, intenso e cremoso"],
  ["Chocolate Belga", "Cacau 70% para os chocólatras"],
  ["Menta com Chocolate", "Refrescante com lascas crocantes"],
  ["Doce de Leite", "Receita caseira, bem brasileira"],
  ["Limão Siciliano", "Sorbet leve e sem lactose"],
];

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground" style={{ fontFamily: "var(--font-display)" }}>
      <header className="mx-auto flex max-w-6xl items-center justify-between p-6">
        <span className="text-3xl font-bold text-primary">Moniteste 🍦</span>
        <a href="#sabores" className="rounded-full bg-primary px-5 py-2 text-primary-foreground">Ver sabores</a>
      </header>
      <section className="mx-auto grid max-w-6xl items-center gap-10 p-6 md:grid-cols-2">
        <div>
          <h1 className="text-5xl font-bold leading-tight md:text-6xl">Sorvete artesanal que derrete corações</h1>
          <p className="mt-4 text-lg text-muted-foreground">Feito todos os dias com ingredientes frescos e muito carinho.</p>
        </div>
        <img src={hero} alt="Sorvetes artesanais Moniteste" className="rounded-[2rem] shadow-xl" />
      </section>
      <section id="sabores" className="mx-auto max-w-6xl p-6 py-16">
        <h2 className="mb-8 text-4xl font-bold">Nossos sabores</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sabores.map(([n, d]) => (
            <div key={n} className="rounded-3xl bg-accent p-6 transition hover:-translate-y-1">
              <h3 className="text-2xl font-semibold">{n}</h3>
              <p className="mt-2 text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>
      <footer className="bg-primary p-10 text-center text-primary-foreground">
        <p className="text-2xl font-bold">Venha nos visitar!</p>
        <p className="mt-2">Seg a Dom · 12h às 22h</p>
      </footer>
    </main>
  );
}
