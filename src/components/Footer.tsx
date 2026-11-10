import { MapPin, MessageCircle } from "lucide-react";
import { ENDERECO, MAPS_EMBED, MAPS_URL, WHATSAPP_LABEL, waLink } from "@/lib/loja";

export function Footer() {
  return (
    <footer className="mt-16 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 p-10 md:grid-cols-2">
        <div className="space-y-4">
          <p className="text-3xl font-bold">Venha nos visitar!</p>
          <p>Seg a Dom · 12h às 22h</p>
          <a href={MAPS_URL} target="_blank" rel="noreferrer" className="flex items-start gap-2 underline-offset-4 hover:underline">
            <MapPin className="mt-1 h-5 w-5 shrink-0" /> {ENDERECO}
          </a>
          <a href={waLink("Olá! Quero fazer um pedido na Moniteste 🍦")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-background px-5 py-3 font-semibold text-foreground">
            <MessageCircle className="h-5 w-5" /> Pedir pelo WhatsApp {WHATSAPP_LABEL}
          </a>
        </div>
        <iframe title="Mapa Moniteste" src={MAPS_EMBED} className="h-64 w-full rounded-3xl border-0" loading="lazy" />
      </div>
    </footer>
  );
}
