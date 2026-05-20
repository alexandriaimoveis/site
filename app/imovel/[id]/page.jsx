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
  BiMap
} from "react-icons/bi";

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

  if (loading) return <p className="text-center py-24 text-gray-500">Carregando detalhes do imóvel...</p>;
  if (!imovel) return <p className="text-center py-24 text-gray-500">Imóvel não encontrado.</p>;

  const precoExibicao = imovel.finalidade?.toLowerCase().includes("aluguel")
    ? `R$ ${Number(imovel.preco_aluguel).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}/mês`
    : `R$ ${Number(imovel.preco_venda).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;

  return (
    <>
      <Head />
      <Header />
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-12 text-black">

        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-8">
          <div>
            <span className="bg-[#F29829] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full capitalize">
              {imovel.finalidade}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mt-2">{imovel.titulo}</h1>
            <p className="text-gray-600 flex items-center gap-1 mt-1">
              <BiMap className="text-[#F29829]" size={18} />
              {imovel.bairro}, {imovel.cidade} - {imovel.estado}
            </p>
          </div>
          <div className="text-left md:text-right">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Valor solicitado</p>
            <p className="text-3xl font-black text-[#1F3445] italic">{precoExibicao}</p>
          </div>
        </div>

        <div className="relative w-full h-[350px] md:h-[500px] bg-gray-200 rounded-3xl overflow-hidden shadow-md group">
          {imagens.length > 0 ? (
            <>
              <Image
                src={imagens[currentSlide].url}
                alt={`${imovel.titulo} - Foto ${currentSlide + 1}`}
                fill
                priority
                className="object-cover"
              />

              {imagens.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md text-gray-800 transition-all"
                  >
                    <BiChevronLeft size={28} />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md text-gray-800 transition-all"
                  >
                    <BiChevronRight size={28} />
                  </button>

                  <span className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
                    {currentSlide + 1} / {imagens.length}
                  </span>
                </>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              Nenhuma imagem cadastrada para este imóvel.
            </div>
          )}

          <button
            onClick={() => setFavorito(!favorito)}
            className="absolute top-4 left-4 bg-white p-3 rounded-full shadow-lg transition-transform duration-200 hover:scale-110"
          >
            <BiSolidHeart size={24} className={favorito ? "text-red-500" : "text-gray-400"} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">

          <div className="md:col-span-2 space-y-6">
            <div className="bg-white border border-gray-300 p-6 rounded-3xl shadow-sm">
              <h2 className="text-xl font-bold mb-4 border-b pb-2 border-gray-200">Descrição do Imóvel</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {imovel.descricao || "Nenhuma descrição detalhada fornecida para este imóvel."}
              </p>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="bg-[#F2C894] p-6 rounded-3xl shadow-sm h-fit text-gray-900">
              <h2 className="text-xl font-bold mb-4 border-b pb-2 border-amber-900/20 text-center">
                Ficha Técnica
              </h2>

              <ul className="space-y-4">
                <li className="flex items-center gap-3 font-bold py-2 border-b border-amber-900/10">
                  <BiArea size={24} className="text-[#1F3445]" />
                  <div className="flex flex-col">
                    <span className="text-xs font-normal text-gray-700">Área Construída</span>
                    <span className="text-sm">{imovel.area_construida} m²</span>
                  </div>
                </li>

                <li className="flex items-center gap-3 font-bold py-2 border-b border-amber-900/10">
                  <BiBed size={24} className="text-[#1F3445]" />
                  <div className="flex flex-col">
                    <span className="text-xs font-normal text-gray-700">Dormitórios</span>
                    <span className="text-sm">{imovel.quartos || 0} quarto(s)</span>
                  </div>
                </li>

                <li className="flex items-center gap-3 font-bold py-2 border-b border-amber-900/10">
                  <BiBath size={24} className="text-[#1F3445]" />
                  <div className="flex flex-col">
                    <span className="text-xs font-normal text-gray-700">Banheiros</span>
                    <span className="text-sm">{imovel.banheiros || 0} banheiro(s)</span>
                  </div>
                </li>

                <li className="flex items-center gap-3 font-bold py-2">
                  <div className="flex flex-col w-full text-center mt-2">
                    <span className="text-xs font-normal text-gray-700">Código Ref.</span>
                    <span className="text-base font-black text-[#1F3445]"># {imovel.id}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}