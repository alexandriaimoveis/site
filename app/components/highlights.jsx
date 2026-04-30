"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { BiSolidHeart, BiBed, BiBath, BiArea } from "react-icons/bi";
import { supabase } from "../lib/supabase";

function ImovelCard({ imovel }) {
  const [favorito, setFavorito] = useState(false);

  return (
    <div className="group w-full max-w-sm border border-gray-400 rounded-3xl shadow-sm text-center flex flex-col items-center overflow-hidden">
      <div className="relative w-full mb-4">
        {imovel.img_url ? (
          <Image
            src={imovel.img_url}
            alt={imovel.titulo}
            width={400}
            height={260}
            className="rounded-t-3xl w-full h-[260px] object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="rounded-t-3xl w-full h-[260px] bg-gray-200 flex items-center justify-center text-gray-500">
            Sem imagem
          </div>
        )}
        <span className="absolute top-3 right-3 bg-[#F29829] text-sm px-3 py-1 rounded-full">
          {imovel.finalidade}
        </span>
        <button
          onClick={() => setFavorito(!favorito)}
          className="absolute top-3 left-3 bg-white p-2 rounded-full shadow-md transition-transform duration-200 hover:scale-110"
        >
          <BiSolidHeart size={20} className={favorito ? "text-red-500" : "text-gray-400"} />
        </button>
      </div>

      <h3 className="font-bold">{imovel.titulo}</h3>
      <p className="italic">
        {imovel.finalidade === "venda"
          ? `R$ ${Number(imovel.preco_venda).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`
          : `R$ ${Number(imovel.preco_venda).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
      </p>
      <span className="text-sm">{imovel.bairro}, {imovel.cidade} - {imovel.estado}</span>

      <ul className="flex gap-4 justify-center items-center w-full bg-[#F2C894] mt-4 p-4 rounded-b-3xl">
        {imovel.quartos > 0 && (
          <li className="flex flex-col items-center gap-1 text-xs font-bold">
            <BiBed size={20} /> {imovel.quartos} Dormitórios
          </li>
        )}
        {imovel.banheiros > 0 && (
          <li className="flex flex-col items-center gap-1 text-xs font-bold">
            <BiBath size={20} /> {imovel.banheiros} Banheiros
          </li>
        )}
        <li className="flex flex-col items-center gap-1 text-xs font-bold">
          <BiArea size={20} /> Área: {imovel.area_construida}m²
        </li>
      </ul>
    </div>
  );
}

export default function HighLights() {
  const [imoveis, setImoveis] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchImoveis() {
      const { data, error } = await supabase
        .from("imoveis")
        .select(`
          id, titulo, finalidade, preco_venda, preco_aluguel,
          bairro, cidade, estado, quartos, banheiros, area_construida,
          imovel_imagens (url, capa)
        `)
        .eq("destaque", true)
        .eq("status", "disponivel")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Erro ao buscar imóveis:", error.message);
      } else {
        const imoveisComImg = data.map((imovel) => {
          const capa = imovel.imovel_imagens?.find((img) => img.capa);
          return { ...imovel, img_url: capa?.url || null };
        });
        setImoveis(imoveisComImg);
      }
      setLoading(false);
    }

    fetchImoveis();
  }, []);

  if (loading) return <p className="text-center py-12">Carregando imóveis...</p>;

  return (
    <section className="p-12 bg-gray-100">
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-4xl font-bold text-center">Imóveis para Venda</h2>
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