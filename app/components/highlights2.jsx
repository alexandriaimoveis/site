"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { BiSolidHeart, BiBed, BiBath, BiArea } from "react-icons/bi";
import { supabase } from "@/app/lib/supabase";

function ImovelCard({ imovel }) {
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

      if (data && !error) {
        setFavorito(true);
      }
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

  const precoFinal = imovel.finalidade?.toLowerCase() === "venda" 
    ? imovel.preco_venda 
    : imovel.preco_aluguel;

  return (
    <div className="group w-full max-w-sm rounded-3xl shadow-md hover:shadow-xl border border-slate-100 text-center flex flex-col items-center overflow-hidden bg-white transition-all duration-300">
      
      <div className="relative w-full overflow-hidden h-[260px]">
        <Link href={`/imovel/${imovel.id}`}>
          {imovel.img_url ? (
            <Image
              src={imovel.img_url}
              alt={imovel.titulo}
              width={400}
              height={260}
              className="rounded-t-3xl w-full h-[260px] object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
            />
          ) : (
            <div className="rounded-t-3xl w-full h-[260px] bg-slate-100 flex items-center justify-center text-slate-400 cursor-pointer">
              Sem imagem
            </div>
          )}
        </Link>
        
        <span className="absolute top-4 right-4 bg-[#F29829] text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full text-white shadow-sm">
          {imovel.finalidade}
        </span>
        
        <button
          onClick={handleLikeClick}
          className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-md transition-all duration-200 hover:scale-110 text-slate-700 hover:bg-white"
        >
          <BiSolidHeart size={18} className={favorito ? "text-red-500" : "text-slate-400 transition-colors"} />
        </button>
      </div>

      <div className="p-5 flex flex-col items-center w-full flex-1">
        <Link href={`/imovel/${imovel.id}`}>
          <h3 className="font-bold text-lg text-slate-800 line-clamp-1 hover:text-[#F29829] transition-colors duration-200 cursor-pointer">
            {imovel.titulo}
          </h3>
        </Link>

        <p className="text-xl font-extrabold text-slate-900 mt-2 tracking-tight">
          R$ {Number(precoFinal).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          {imovel.finalidade?.toLowerCase() !== "venda" && <span className="text-sm font-normal text-slate-500"> /mês</span>}
        </p>
        
        <span className="text-xs font-medium text-slate-500 mt-2 mb-4 block tracking-wide">
          {imovel.bairro}, {imovel.cidade} - {imovel.estado}
        </span>
      </div>

      <ul className="flex gap-4 justify-around items-center w-full bg-slate-50 border-t border-slate-100 p-4 rounded-b-3xl text-slate-600">
        {imovel.quartos > 0 && (
          <li className="flex flex-col items-center gap-1 text-[11px] font-semibold tracking-wide uppercase">
            <BiBed size={18} className="text-[#F29829]" /> 
            <span>{imovel.quartos} {imovel.quartos === 1 ? "Dormitório" : "Dormitórios"}</span>
          </li>
        )}
        {imovel.banheiros > 0 && (
          <li className="flex flex-col items-center gap-1 text-[11px] font-semibold tracking-wide uppercase">
            <BiBath size={18} className="text-[#F29829]" /> 
            <span>{imovel.banheiros} {imovel.banheiros === 1 ? "Banheiro" : "Banheiros"}</span>
          </li>
        )}
        <li className="flex flex-col items-center gap-1 text-[11px] font-semibold tracking-wide uppercase">
          <BiArea size={18} className="text-[#F29829]" /> 
          <span>Área: {imovel.area_construida}m²</span>
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
          bairro, city:cidade, estado, quartos, banheiros, area_construida,
          destaque, status,
          imovel_imagens (url, capa)
        `)
        .eq("destaque", true)
        .eq("status", "disponivel")
        .ilike("finalidade", "%aluguel%")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Erro Supabase:", error.message);
      } else {
        console.log("Imóveis encontrados:", data.length);
        
        const imoveisComImg = data.map((imovel) => {
          const capa = imovel.imovel_imagens?.find((img) => img.capa) || imovel.imovel_imagens?.[0];
          return { 
            ...imovel, 
            cidade: imovel.city,
            img_url: capa?.url || null 
          };
        });
        setImoveis(imoveisComImg);
      }
      setLoading(false);
    }

    fetchImoveis();
  }, []);

  if (loading) return <p className="text-center text-slate-500 font-medium py-16">Carregando imóveis...</p>;

  return (
    <section className="py-20 bg-slate-50">
      <div className="flex flex-col items-center mb-16 px-4">
        <h2 className="text-4xl font-extrabold text-slate-800 tracking-tight text-center">
          Destaques para Locação
        </h2>
        <span className="block mt-3 h-1 w-24 bg-[#F29829] rounded-full" />
      </div>

      {imoveis.length === 0 ? (
        <p className="text-center text-slate-400 font-medium">Nenhum imóvel em destaque disponível no momento.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center gap-8 max-w-6xl mx-auto px-6">
          {imoveis.map((imovel) => (
            <ImovelCard key={imovel.id} imovel={imovel} />
          ))}
        </div>
      )}
    </section>
  );
}