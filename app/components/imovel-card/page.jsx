"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/app/lib/supabase";
import { BiSolidHeart, BiBed, BiBath, BiArea } from "react-icons/bi";

export default function ImovelCard({ imovel, contexto }) {
  const [favorito, setFavorito] = useState(false);

  useEffect(() => {
    async function checarFavorito() {
      const clienteId = localStorage.getItem("alexandria_cliente_id");
      if (!clienteId) return;

      const { data, error } = await supabase
        .from("favoritos")
        .select("id")
        .eq("cliente_id", Number(clienteId))
        .eq("imovel_id", imovel.id)
        .maybeSingle();

      if (data && !error) setFavorito(true);
    }
    checarFavorito();
  }, [imovel.id]);

  const handleLikeClick = async () => {
    const clienteId = localStorage.getItem("alexandria_cliente_id");

    if (!clienteId) {
      alert("Por favor, faça seu cadastro para favoritar imóveis!");
      return;
    }

    if (!favorito) {
      const { error } = await supabase
        .from("favoritos")
        .insert([{ cliente_id: Number(clienteId), imovel_id: imovel.id }]);

      if (!error) setFavorito(true);
      else console.error("Erro ao favoritar:", error.message);
    } else {
      const { error } = await supabase
        .from("favoritos")
        .delete()
        .eq("cliente_id", Number(clienteId))
        .eq("imovel_id", imovel.id);

      if (!error) setFavorito(false);
      else console.error("Erro ao remover favorito:", error.message);
    }
  };

  // Define qual preço mostrar com base no contexto da página (venda ou aluguel)
  const isAluguel = contexto === "aluguel";
  const precoExibido = isAluguel ? imovel.preco_aluguel : imovel.preco_venda;

  return (
    <div className="group w-full max-w-sm rounded-2xl shadow-md hover:shadow-2xl border border-slate-100 flex flex-col overflow-hidden bg-white transition-all duration-300 hover:-translate-y-1.5">
      <div className="relative w-full overflow-hidden h-[250px]">
        <Link href={`/imovel/${imovel.id}`}>
          {imovel.img_url ? (
            <Image
              src={imovel.img_url}
              alt={imovel.titulo}
              width={400}
              height={250}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 cursor-pointer"
            />
          ) : (
            <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 cursor-pointer text-sm font-medium">
              Sem imagem disponível
            </div>
          )}
        </Link>

        <span className="absolute top-4 right-4 bg-[#F29829] text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-lg text-white shadow-sm">
          {imovel.finalidade === "venda_aluguel"
            ? "Venda / Aluguel"
            : imovel.finalidade === "venda"
              ? "Venda"
              : "Aluguel"}
        </span>

        <button
          onClick={handleLikeClick}
          className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-xl shadow-md transition-all duration-300 hover:bg-white hover:scale-110"
        >
          <BiSolidHeart size={18} className={favorito ? "text-red-500" : "text-slate-400/80"} />
        </button>
      </div>

      <div className="p-5 flex flex-col flex-grow text-left">
        <Link href={`/imovel/${imovel.id}`}>
          <h3 className="font-extrabold text-lg text-slate-800 hover:text-[#F29829] transition-colors duration-200 cursor-pointer line-clamp-1 tracking-tight">
            {imovel.titulo}
          </h3>
        </Link>

        <span className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wide">
          {imovel.bairro}, {imovel.cidade}
        </span>

        <p className="text-[#1e293b] font-black text-xl mt-4 tracking-tight">
          R$ {Number(precoExibido).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          {isAluguel && (
            <span className="text-xs font-bold text-slate-400 tracking-normal font-sans ml-1">/mês</span>
          )}
        </p>
      </div>

      <ul className="flex justify-between items-center w-full bg-slate-50 border-t border-slate-100/60 p-4 px-5 rounded-b-2xl text-slate-600">
        {imovel.quartos > 0 && (
          <li className="flex items-center gap-1.5 text-xs font-bold">
            <BiBed size={18} className="text-[#F29829]" />
            <span>{imovel.quartos} {imovel.quartos === 1 ? "Quarto" : "Quartos"}</span>
          </li>
        )}
        {imovel.banheiros > 0 && (
          <li className="flex items-center gap-1.5 text-xs font-bold">
            <BiBath size={17} className="text-[#F29829]" />
            <span>{imovel.banheiros} {imovel.banheiros === 1 ? "Banho" : "Banhos"}</span>
          </li>
        )}
        <li className="flex items-center gap-1.5 text-xs font-bold">
          <BiArea size={17} className="text-[#F29829]" />
          <span>{imovel.area_construida}m²</span>
        </li>
      </ul>
    </div>
  );
}