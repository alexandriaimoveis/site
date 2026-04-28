"use client";
import { useState } from "react";
import Image from "next/image";
import {
  BiSolidHeart,
  BiBed,
  BiBath,
  BiArea,
} from "react-icons/bi";

const imoveis = [
  { id: 1, titulo: "Casa à Venda", tipo: "Venda", preco: "R$ 2.052.462,00", local: "Vila Nova, São Lourenço - MG", dormitorios: 2, banheiros: 2, area: "147,04m²", img: "/imoveis1.png" },
  { id: 2, titulo: "Casa à Venda", tipo: "Venda", preco: "R$ 2.052.462,00", local: "Vila Nova, São Lourenço - MG", dormitorios: 2, banheiros: 2, area: "147,04m²", img: "/imoveis1.png" },
  { id: 3, titulo: "Casa à Venda", tipo: "Venda", preco: "R$ 2.052.462,00", local: "Vila Nova, São Lourenço - MG", dormitorios: 2, banheiros: 2, area: "147,04m²", img: "/imoveis1.png" },
  { id: 4, titulo: "Apartamento", tipo: "Aluguel", preco: "R$ 3.500,00/mês", local: "Centro, São Lourenço - MG", dormitorios: 3, banheiros: 1, area: "89,00m²", img: "/imoveis1.png" },
  { id: 5, titulo: "Apartamento", tipo: "Aluguel", preco: "R$ 3.500,00/mês", local: "Centro, São Lourenço - MG", dormitorios: 3, banheiros: 1, area: "89,00m²", img: "/imoveis1.png" },
  { id: 6, titulo: "Apartamento", tipo: "Aluguel", preco: "R$ 3.500,00/mês", local: "Centro, São Lourenço - MG", dormitorios: 3, banheiros: 1, area: "89,00m²", img: "/imoveis1.png" },
  { id: 7, titulo: "Terreno", tipo: "Venda", preco: "R$ 980.000,00", local: "Jardins, São Lourenço - MG", dormitorios: 0, banheiros: 0, area: "320,00m²", img: "/imoveis1.png" },
  { id: 8, titulo: "Terreno", tipo: "Venda", preco: "R$ 980.000,00", local: "Jardins, São Lourenço - MG", dormitorios: 0, banheiros: 0, area: "320,00m²", img: "/imoveis1.png" },
  { id: 9, titulo: "Casa à Venda", tipo: "Venda", preco: "R$ 2.052.462,00", local: "Vila Nova, São Lourenço - MG", dormitorios: 2, banheiros: 2, area: "147,04m²", img: "/imoveis1.png" },
  { id: 10, titulo: "Casa à Venda", tipo: "Venda", preco: "R$ 2.052.462,00", local: "Vila Nova, São Lourenço - MG", dormitorios: 2, banheiros: 2, area: "147,04m²", img: "/imoveis1.png" },
  { id: 11, titulo: "Casa à Venda", tipo: "Venda", preco: "R$ 2.052.462,00", local: "Vila Nova, São Lourenço - MG", dormitorios: 2, banheiros: 2, area: "147,04m²", img: "/imoveis1.png" },
  { id: 12, titulo: "Apartamento", tipo: "Aluguel", preco: "R$ 3.500,00/mês", local: "Centro, São Lourenço - MG", dormitorios: 3, banheiros: 1, area: "89,00m²", img: "/imoveis1.png" },
];

function ImovelCard({ imovel }) {
  const [favorito, setFavorito] = useState(false);
  return (
    <div className="group w-full max-w-sm border border-gray-400 rounded-3xl shadow-sm text-center flex flex-col items-center overflow-hidden">
      <div className="relative w-full mb-4">
        <Image
          src={imovel.img}
          alt={imovel.titulo}
          width={400}
          height={400}
          className="rounded-t-3xl w-full transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute top-3 right-3 bg-[#F29829] text-sm px-3 py-1 rounded-full">
          {imovel.tipo}
        </span>

        <button
          onClick={() => setFavorito(!favorito)}
          className="absolute top-3 left-3 bg-white p-2 rounded-full shadow-md transition-transform duration-200 hover:scale-110"
        >
          <BiSolidHeart size={20} className={favorito ? "text-red-500" : "text-gray-400"} />
        </button>

      </div>
      <h3 className="font-bold">{imovel.titulo}</h3>
      <p className="italic">{imovel.preco}</p>
      <span className="text-sm">{imovel.local}</span>
      <ul className="flex gap-4 justify-center items-center w-full bg-[#F2C894] mt-4 p-4 rounded-b-3xl">
        {imovel.dormitorios > 0 && (
          <li className="flex flex-col items-center gap-1 text-xs font-bold">
            <BiBed size={20} /> {imovel.dormitorios} Dormitórios
          </li>
        )}
        {imovel.banheiros > 0 && (
          <li className="flex flex-col items-center gap-1 text-xs font-bold">
            <BiBath size={20} /> {imovel.banheiros} Banheiros
          </li>
        )}
        <li className="flex flex-col items-center gap-1 text-xs font-bold">
          <BiArea size={20} /> Área: {imovel.area}
        </li>
      </ul>
    </div>
  );
}

export default function HighLights() {
  return (
    <section className="p-12 bg-gray-100">
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-4xl font-bold text-center">Imóveis em destaque</h2>
        <span className="block mt-2 h-1.5 w-48 bg-[#F29829] rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center gap-6 max-w-6xl mx-auto">
        {imoveis.map((imovel) => (
          <ImovelCard key={imovel.id} imovel={imovel} />
        ))}
      </div>
    </section>
  );
}