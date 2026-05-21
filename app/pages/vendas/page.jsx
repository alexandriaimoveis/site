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
          {imovel.finalidade}
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
          R$ {Number(imovel.preco_venda).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
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

export default function Vendas() {
  const [imoveis, setImoveis] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchImoveis() {
      const { data, error } = await supabase
        .from("imoveis")
        .select(`
          id, titulo, finalidade, preco_venda, preco_aluguel,
          bairro, cidade, estado, quartos, banheiros, area_construida,
          status, created_at,
          imovel_imagens (url, capa)
        `)
        .eq("status", "disponivel")
        .ilike("finalidade", "%venda%")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Erro Supabase:", error.message);
      } else {
        const imoveisComImg = data.map((imovel) => {
          const capa = imovel.imovel_imagens?.find((img) => img.capa) || imovel.imovel_imagens?.[0];
          return { ...imovel, img_url: capa?.url || null };
        });
        setImoveis(imoveisComImg);
      }
      setLoading(false);
    }

    fetchImoveis();
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col justify-between">
      <div>
        <Head />
        <Header />
        <Navbar />

        <section className="bg-white border-b border-slate-100 py-16">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <span className="text-[#F29829] font-bold uppercase tracking-[0.2em] text-xs mb-3 block">
              Oportunidades Exclusivas
            </span>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Imóveis para Venda
            </h1>
            <p className="text-sm text-slate-500 font-medium max-w-md mx-auto mt-2">
              Confira nossa curadoria de imóveis disponíveis para você investir ou morar bem em São Lourenço e região.
            </p>
            <span className="block mt-4 h-1 w-16 bg-[#F29829] rounded-full mx-auto" />
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-6 py-16">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#F29829] border-t-transparent" />
              <p className="mt-4 text-sm font-semibold text-slate-400 uppercase tracking-wider">Carregando catálogo...</p>
            </div>
          ) : imoveis.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
              <p className="text-slate-500 font-medium">Nenhum imóvel à venda disponível no momento.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {imoveis.map((imovel) => (
                <ImovelCard key={imovel.id} imovel={imovel} />
              ))}
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}