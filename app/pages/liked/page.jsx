"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/header/page";
import Head from "@/app/components/head/page";
import Navbar from "@/app/components/navbar/page";
import Footer from "@/app/components/footer/page";
import { supabase } from "@/app/lib/supabase";
import {
  BiSolidHeart,
  BiBed,
  BiBath,
  BiArea,
} from "react-icons/bi";

function ImovelCard({ imovel, onRemove }) {
  const [favorito, setFavorito] = useState(true);

  const handleRemoveFavorito = async () => {
    const clienteId = localStorage.getItem("alexandria_cliente_id");
    if (!clienteId) return;

    const { error } = await supabase
      .from("favoritos")
      .delete()
      .eq("cliente_id", Number(clienteId))
      .eq("imovel_id", imovel.id);

    if (!error) {
      setFavorito(false);
      if (onRemove) onRemove(imovel.id);
    } else {
      console.error("Erro ao remover favorito:", error.message);
    }
  };

  const precoFinal = imovel.finalidade?.toLowerCase() === "aluguel"
    ? imovel.preco_aluguel
    : imovel.preco_venda;

  return (
    <div className="group w-full max-w-sm border border-slate-100 rounded-2xl shadow-sm text-center flex flex-col justify-between overflow-hidden bg-white hover:shadow-md transition-all duration-300 relative">
      
      <div className="relative w-full h-[240px] overflow-hidden bg-slate-100">
        <Link href={`/imovel/${imovel.id}`}>
          {imovel.img_url ? (
            <Image
              src={imovel.img_url}
              alt={imovel.titulo}
              width={400}
              height={240}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm font-medium cursor-pointer">
              Sem imagem cadastrada
            </div>
          )}
        </Link>

        <span className="absolute top-3 right-3 bg-[#F29829] text-xs font-bold px-3 py-1.5 rounded-lg text-white uppercase tracking-wider shadow-sm select-none">
          {imovel.finalidade}
        </span>

        <button
          onClick={handleRemoveFavorito}
          className="absolute top-3 left-3 bg-white/80 backdrop-blur-md p-2.5 rounded-full shadow-sm transition-all duration-300 hover:scale-110 cursor-pointer"
          title="Remover dos favoritos"
        >
          <BiSolidHeart size={20} className={favorito ? "text-rose-500" : "text-slate-300"} />
        </button>
      </div>

      <div className="p-5 flex-grow flex flex-col justify-center items-center">
        <Link href={`/imovel/${imovel.id}`}>
          <h3 className="font-bold text-lg text-slate-800 line-clamp-1 px-2 hover:text-[#F29829] transition-colors duration-200 cursor-pointer">
            {imovel.titulo}
          </h3>
        </Link>
        
        <p className="text-xl font-extrabold text-[#1F3445] mt-1.5 tracking-tight">
          R$ {Number(precoFinal).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          {imovel.finalidade?.toLowerCase() === "aluguel" && <span className="text-xs font-semibold text-slate-400"> /mês</span>}
        </p>
        
        <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">
          {imovel.bairro}, {imovel.cidade} - {imovel.estado}
        </p>
      </div>

      <div className="grid grid-cols-3 border-t border-slate-100 bg-slate-50/70 py-3.5 px-2 rounded-b-2xl divide-x divide-slate-100">
        {imovel.quartos > 0 ? (
          <div className="flex flex-col items-center gap-0.5 text-slate-600">
            <BiBed size={18} className="text-slate-400" />
            <span className="text-[10px] font-bold text-slate-700">{imovel.quartos} {imovel.quartos === 1 ? "Quarto" : "Quartos"}</span>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-[10px] font-bold text-slate-400">-</div>
        )}
        
        {imovel.banheiros > 0 ? (
          <div className="flex flex-col items-center gap-0.5 text-slate-600">
            <BiBath size={18} className="text-slate-400" />
            <span className="text-[10px] font-bold text-slate-700">{imovel.banheiros} {imovel.banheiros === 1 ? "Banheiro" : "Banheiros"}</span>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-[10px] font-bold text-slate-400">-</div>
        )}

        <div className="flex flex-col items-center gap-0.5 text-slate-600">
          <BiArea size={18} className="text-slate-400" />
          <span className="text-[10px] font-bold text-slate-700">{imovel.area_construida}m² Área</span>
        </div>
      </div>

    </div>
  );
}

export default function Favoritos() {
  const [imoveis, setImoveis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notLoggedIn, setNotLoggedIn] = useState(false);

  useEffect(() => {
    async function fetchFavoritos() {
      const clienteId = localStorage.getItem("alexandria_cliente_id");
      
      if (!clienteId) {
        setNotLoggedIn(true);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("favoritos")
        .select(`
          imovel_id,
          imoveis (
            id, titulo, finalidade, preco_venda, preco_aluguel,
            bairro, city:cidade, estado, quartos, banheiros, area_construida,
            status,
            imovel_imagens (url, capa)
          )
        `)
        .eq("cliente_id", Number(clienteId));

      if (error) {
        console.error("Erro ao buscar favoritos:", error.message);
      } else if (data) {
        const imoveisFormatados = data
          .filter(item => item.imoveis)
          .map((item) => {
            const imovel = item.imoveis;
            const capa = imovel.imovel_imagens?.find((img) => img.capa) || imovel.imovel_imagens?.[0];
            return {
              ...imovel,
              cidade: imovel.city,
              img_url: capa?.url || null
            };
          });

        setImoveis(imoveisFormatados);
      }
      setLoading(false);
    }

    fetchFavoritos();
  }, []);

  const handleRemoveFromList = (id) => {
    setImoveis((prev) => prev.filter((imovel) => imovel.id !== id));
  };

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col justify-between">
      <Head />
      <Header />
      <Navbar />

      <div className="flex flex-col items-center py-16 text-center px-4">
        <span className="text-[#F29829] font-bold uppercase tracking-[0.2em] text-xs mb-2 block">
          Sua Vitrine
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Meus Favoritos</h2>
        <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-md leading-relaxed">
          Sua lista personalizada com os melhores imóveis salvos para consulta rápida.
        </p>
        <span className="block mt-4 h-1 w-16 bg-[#F29829] rounded-full" />
      </div>

      <main className="flex-grow px-4 pb-20 max-w-7xl w-full mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <div className="w-8 h-8 border-4 border-[#F29829] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-slate-500 font-medium">Buscando seus favoritos...</p>
          </div>
        ) : notLoggedIn ? (
          <div className="text-center py-12 bg-white border border-slate-100 rounded-2xl p-8 max-w-md mx-auto shadow-sm flex flex-col items-center">
            <p className="text-slate-500 text-sm font-medium leading-relaxed">
              Você precisa estar autenticado na sua conta para visualizar seus imóveis favoritados.
            </p>
            <Link href="/cadastro" className="w-full">
              <button className="mt-5 w-full h-11 rounded-xl bg-[#F29829] hover:bg-[#1F3445] text-white font-bold text-xs uppercase tracking-widest transition-colors duration-300 shadow-sm cursor-pointer">
                Criar Conta / Fazer Login
              </button>
            </Link>
          </div>
        ) : imoveis.length === 0 ? (
          <div className="text-center py-16 bg-white border border-slate-100 rounded-2xl p-8 max-w-md mx-auto shadow-sm">
            <p className="text-slate-500 text-sm font-medium">
              Você ainda não favoritou nenhum imóvel em nosso portal.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-8 max-w-6xl mx-auto">
            {imoveis.map((imovel) => (
              <ImovelCard 
                key={imovel.id} 
                imovel={imovel} 
                onRemove={handleRemoveFromList} 
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}