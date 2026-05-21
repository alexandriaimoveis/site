"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from '@/app/components/header/page';
import Head from '../../components/head/page';
import Navbar from '../../components/navbar/page';
import Footer from '@/app/components/footer/page';
import { supabase } from "../../lib/supabase";
import {
  BiSolidHeart,
  BiBed,
  BiBath,
  BiArea,
  BiLoaderAlt,
  BiChevronRight
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

  const exibirPreco = imovel.finalidade?.toLowerCase().includes("aluguel")
    ? `${Number(imovel.preco_aluguel).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}/mês`
    : Number(imovel.preco_venda).toLocaleString("pt-BR", { minimumFractionDigits: 2 });

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
        
        <span className="absolute top-3 right-3 bg-[#F29829] text-[10px] font-bold px-3 py-1.5 rounded-lg text-white uppercase tracking-wider shadow-sm select-none">
          {imovel.finalidade}
        </span>

        <button
          onClick={handleLikeClick}
          className="absolute top-3 left-3 bg-white/80 backdrop-blur-md p-2.5 rounded-full shadow-sm transition-all duration-300 hover:scale-110 cursor-pointer"
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
          R$ {exibirPreco}
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

function ResultadosContent() {
  const searchParams = useSearchParams();
  const [imoveis, setImoveis] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResultados() {
      setLoading(true);
      
      let query = supabase
        .from("imoveis")
        .select(`
          id, titulo, finalidade, preco_venda, preco_aluguel,
          bairro, city:cidade, estado, quartos, banheiros, area_construida,
          status, created_at,
          imovel_imagens (url, capa)
        `)
        .eq("status", "disponivel");

      const finalidade = searchParams.get("finalidade");
      if (finalidade) query = query.ilike("finalidade", `%${finalidade}%`);

      const cidade = searchParams.get("cidade");
      if (cidade) query = query.eq("cidade", cidade);

      const bairro = searchParams.get("bairro");
      if (bairro) query = query.eq("bairro", bairro);

      const id = searchParams.get("id");
      if (id) query = query.eq("id", id);

      const quartos = searchParams.get("quartos");
      if (quartos) query = query.gte("quartos", parseInt(quartos));

      const banheiros = searchParams.get("banheiros");
      if (banheiros) query = query.gte("banheiros", parseInt(banheiros));

      const precoMax = searchParams.get("precoMax");
      if (precoMax) {
        const precoNum = parseFloat(precoMax);
        if (finalidade && finalidade.includes("aluguel")) {
          query = query.lte("preco_aluguel", precoNum);
        } else {
          query = query.lte("preco_venda", precoNum);
        }
      }

      query = query.order("created_at", { ascending: false });

      const { data, error } = await query;

      if (error) {
        console.error("Erro ao buscar resultados:", error.message);
      } else {
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

    fetchResultados();
  }, [searchParams]);

  return (
    <>
      <div className="flex flex-col items-center py-16 text-center px-4">
        <span className="text-[#F29829] font-bold uppercase tracking-[0.2em] text-xs mb-2 block">
          Catálogo Atualizado
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Resultados da Busca
        </h2>
        
        {!loading && (
          <div className="mt-3 bg-[#1F3445] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-sm">
            {imoveis.length} {imoveis.length === 1 ? "imóvel encontrado" : "imóveis encontrados"}
          </div>
        )}
        <span className="block mt-4 h-1 w-16 bg-[#F29829] rounded-full" />
      </div>

      <main className="flex-grow px-4 pb-20 max-w-7xl w-full mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <BiLoaderAlt size={32} className="text-[#F29829] animate-spin" />
            <p className="text-sm text-slate-500 font-medium">Cruzando dados de localização...</p>
          </div>
        ) : imoveis.length === 0 ? (
          <div className="text-center py-16 bg-white border border-slate-100 rounded-2xl p-8 max-w-md mx-auto shadow-sm flex flex-col items-center">
            <p className="text-slate-500 text-sm font-medium leading-relaxed">
              Não encontramos nenhum imóvel correspondente aos filtros aplicados.
            </p>
            <Link href="/" className="mt-5 text-xs font-bold text-[#F29829] hover:text-[#1F3445] transition-colors flex items-center gap-1 uppercase tracking-wider">
              Tentar Nova Busca <BiChevronRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-8 max-w-6xl mx-auto">
            {imoveis.map((imovel) => (
              <ImovelCard key={imovel.id} imovel={imovel} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}

export default function Resultados() {
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col justify-between">
      <Head />
      <Header />
      <Navbar />

      <Suspense fallback={
        <div className="flex flex-col items-center justify-center py-32 space-y-3 flex-grow">
          <BiLoaderAlt size={32} className="text-[#F29829] animate-spin" />
          <p className="text-sm text-slate-500 font-medium">Carregando listagem...</p>
        </div>
      }>
        <ResultadosContent />
      </Suspense>

      <Footer />
    </div>
  );
}