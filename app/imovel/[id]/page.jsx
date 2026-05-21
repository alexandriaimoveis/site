"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Header from '@/app/components/header/page';
import Head from '@/app/components/head/page';
import Navbar from '@/app/components/navbar/page';
import Footer from '@/app/components/footer/page';
import { supabase } from "@/app/lib/supabase";
import {
  BiSolidHeart,
  BiBed,
  BiBath,
  BiArea,
  BiChevronLeft,
  BiChevronRight,
  BiMap,
  BiLoaderAlt,
  BiHash
} from "react-icons/bi";
import WhatsAppButton from "@/app/components/whatsapp/page";

export default function DetalhesImovel() {
  const { id } = useParams();
  const [imovel, setImovel] = useState(null);
  const [imagens, setImagens] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [favorito, setFavorito] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function fetchImovelDetalhes() {
      setLoading(true);
      const { data, error } = await supabase
        .from("imoveis")
        .select(`
          id, titulo, finalidade, preco_venda, preco_aluguel,
          bairro, cidade, estado, quartos, banheiros, area_construida,
          status, descricao,
          imovel_imagens (url, capa)
        `)
        .eq("id", id)
        .single();

      if (error) {
        console.error("Erro ao buscar detalhes do imóvel:", error.message);
      } else if (data) {
        setImovel(data);

        if (data.imovel_imagens) {
          const imgsOrdenadas = [...data.imovel_imagens].sort((a, b) => (b.capa ? 1 : 0) - (a.capa ? 1 : 0));
          setImagens(imgsOrdenadas);
        }
      }
      setLoading(false);
    }

    fetchImovelDetalhes();
  }, [id]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === imagens.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? imagens.length - 1 : prev - 1));
  };

  if (loading) {
    return (
      <div className="bg-slate-50 min-h-screen flex flex-col justify-between">
        <Head /><Header /><Navbar />
        <div className="flex flex-col items-center justify-center py-32 space-y-3 flex-grow">
          <BiLoaderAlt size={36} className="text-[#F29829] animate-spin" />
          <p className="text-sm text-slate-500 font-medium">Buscando ficha do imóvel...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!imovel) {
    return (
      <div className="bg-slate-50 min-h-screen flex flex-col justify-between">
        <Head /><Header /><Navbar />
        <div className="text-center py-32 px-4 flex-grow">
          <p className="text-slate-500 text-base font-medium">Imóvel não encontrado ou indisponível.</p>
        </div>
        <Footer />
      </div>
    );
  }

  const precoExibicao = imovel.finalidade?.toLowerCase().includes("aluguel")
    ? `R$ ${Number(imovel.preco_aluguel).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}/mês`
    : `R$ ${Number(imovel.preco_venda).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col justify-between">
      <Head />
      <Header />
      <Navbar />

      <main className="max-w-5xl w-full mx-auto px-4 py-12 flex-grow">
        
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-8">
          <div>
            <span className="bg-[#F29829] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg inline-block shadow-sm">
              {imovel.finalidade}
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
              {imovel.titulo}
            </h1>
            <p className="text-slate-500 text-sm font-medium flex items-center gap-1 mt-2">
              <BiMap className="text-[#F29829]" size={18} />
              {imovel.bairro}, {imovel.cidade} - {imovel.estado}
            </p>
          </div>
          <div className="text-left md:text-right bg-white md:bg-transparent p-4 md:p-0 border border-slate-100 md:border-0 rounded-2xl shadow-sm md:shadow-none">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Valor do Investimento</p>
            <p className="text-2xl sm:text-3xl font-black text-[#1F3445] mt-0.5 tracking-tight">{precoExibicao}</p>
          </div>
        </div>

        <div className="relative w-full h-[320px] sm:h-[480px] bg-slate-200 rounded-2xl overflow-hidden shadow-md group">
          {imagens.length > 0 ? (
            <>
              <Image
                src={imagens[currentSlide].url}
                alt={`${imovel.titulo} - Foto ${currentSlide + 1}`}
                fill
                priority
                className="object-cover transition-all duration-300"
              />

              {imagens.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md hover:bg-white p-2 rounded-full shadow-md text-slate-800 transition-all cursor-pointer"
                  >
                    <BiChevronLeft size={26} />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md hover:bg-white p-2 rounded-full shadow-md text-slate-800 transition-all cursor-pointer"
                  >
                    <BiChevronRight size={26} />
                  </button>

                  <span className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-sm text-white text-[11px] font-bold px-3 py-1.5 rounded-lg tracking-wider">
                    {currentSlide + 1} / {imagens.length}
                  </span>
                </>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm font-medium">
              Nenhuma imagem cadastrada para este imóvel.
            </div>
          )}

          <button
            onClick={() => setFavorito(!favorito)}
            className="absolute top-4 left-4 bg-white/80 backdrop-blur-md p-3 rounded-full shadow-md transition-transform duration-200 hover:scale-110 cursor-pointer"
          >
            <BiSolidHeart size={22} className={favorito ? "text-rose-500" : "text-slate-400"} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white border border-slate-100 p-6 sm:p-8 rounded-2xl shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 mb-4 border-b pb-3 border-slate-100 uppercase tracking-wider text-xs">
                Descrição do Imóvel
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {imovel.descricao || "Nenhuma descrição detalhada fornecida para este imóvel."}
              </p>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="bg-[#1F3445] p-6 rounded-2xl shadow-md h-fit text-white">
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#F29829] mb-4 border-b pb-3 border-white/10 text-center">
                Especificações Técnicas
              </h2>

              <ul className="divide-y divide-white/10 text-sm">
                <li className="flex items-center gap-3.5 py-3.5">
                  <BiArea size={22} className="text-[#F29829]" />
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Área Privativa</span>
                    <span className="font-semibold mt-0.5 text-slate-100">{imovel.area_construida} m²</span>
                  </div>
                </li>

                <li className="flex items-center gap-3.5 py-3.5">
                  <BiBed size={22} className="text-[#F29829]" />
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Dormitórios</span>
                    <span className="font-semibold mt-0.5 text-slate-100">{imovel.quartos || 0} quarto(s)</span>
                  </div>
                </li>

                <li className="flex items-center gap-3.5 py-3.5">
                  <BiBath size={22} className="text-[#F29829]" />
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Banheiros</span>
                    <span className="font-semibold mt-0.5 text-slate-100">{imovel.banheiros || 0} banheiro(s)</span>
                  </div>
                </li>

                <li className="flex items-center gap-3.5 py-4 justify-center">
                  <div className="flex flex-col items-center bg-white/5 w-full py-3 rounded-xl border border-white/5">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-0.5">
                      <BiHash size={12} /> Referência
                    </span>
                    <span className="text-base font-black text-[#F29829] tracking-widest mt-0.5">#{imovel.id}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}