import morango from "@/assets/sabor-morango.jpg";
import pistache from "@/assets/sabor-pistache.jpg";
import chocolate from "@/assets/sabor-chocolate.jpg";
import menta from "@/assets/sabor-menta.jpg";
import doce from "@/assets/sabor-doce-de-leite.jpg";
import limao from "@/assets/sabor-limao.jpg";

export type Sabor = { slug: string; nome: string; resumo: string; descricao: string; ingredientes: string[]; preco: number; img: string };

export const sabores: Sabor[] = [
  { slug: "morango", nome: "Morango Fresco", resumo: "Morangos selecionados e creme", descricao: "Feito com morangos frescos da estação batidos com creme de leite. Leve, frutado e com pedacinhos da fruta.", ingredientes: ["Morango", "Creme de leite", "Açúcar"], preco: 14, img: morango },
  { slug: "pistache", nome: "Pistache", resumo: "Pistache torrado, intenso e cremoso", descricao: "Pasta de pistache torrado e finalização com pistaches crocantes. Um clássico italiano.", ingredientes: ["Pistache", "Leite", "Creme de leite"], preco: 18, img: pistache },
  { slug: "chocolate-belga", nome: "Chocolate Belga", resumo: "Cacau 70% para os chocólatras", descricao: "Chocolate belga 70% cacau, intenso e aveludado, com raspas de chocolate.", ingredientes: ["Chocolate belga 70%", "Leite", "Cacau"], preco: 16, img: chocolate },
  { slug: "menta", nome: "Menta com Chocolate", resumo: "Refrescante com lascas crocantes", descricao: "Base de menta natural com lascas de chocolate amargo. Refrescante e crocante.", ingredientes: ["Menta", "Chocolate amargo", "Leite"], preco: 15, img: menta },
  { slug: "doce-de-leite", nome: "Doce de Leite", resumo: "Receita caseira, bem brasileira", descricao: "Doce de leite caseiro cozido lentamente, com calda extra por cima.", ingredientes: ["Doce de leite", "Leite", "Creme de leite"], preco: 15, img: doce },
  { slug: "limao", nome: "Limão Siciliano", resumo: "Sorbet leve e sem lactose", descricao: "Sorbet de limão siciliano, leve, ácido na medida e sem lactose.", ingredientes: ["Limão siciliano", "Água", "Açúcar"], preco: 13, img: limao },
];
