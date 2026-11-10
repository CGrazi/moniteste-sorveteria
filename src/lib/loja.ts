export const WHATSAPP = "5514999999999";
export const WHATSAPP_LABEL = "(14) 99999-9999";
export const ENDERECO = "R. das Flores, 100 - Vila Aeroporto, Campinas - SP, 13056-084";
export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ENDERECO)}`;
export const MAPS_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent(ENDERECO)}&output=embed`;
export const waLink = (msg: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
export const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
