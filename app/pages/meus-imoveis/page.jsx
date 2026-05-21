"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { BiTrash, BiEditAlt } from "react-icons/bi";
import { supabase } from "@/app/lib/supabase";
import Header from "@/app/components/header/page";
import Head from "@/app/components/head/page";
import Navbar from "@/app/components/navbar/page";
import Footer from "@/app/components/footer/page";

function ImovelCard({ imovel, onDelete }) {
  const precoFinal = imovel.preco_venda;

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case "analise":
      case "análise":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "ativo":
      case "publicado":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  return (
    <div className="group w-full max-w-sm border border-slate-100 rounded-2xl shadow-sm text-center flex flex-col justify-between overflow-hidden bg-white hover:shadow-md transition-all duration-300 relative">
      
      <button
        onClick={() => onDelete(imovel.id)}
        className="absolute top-3 left-3 bg-white/80 backdrop-blur-md text-rose-600 p-2.5 rounded-full hover:bg-rose-600 hover:text-white shadow-sm transition-all duration-300 z-10 cursor-pointer"
        title="Excluir Imóvel"
      >
        <BiTrash size={18} />
      </button>

      <div className="relative w-full h-[220px] overflow-hidden bg-slate-100">
        {imovel.img_url ? (
          <Image
            src={imovel.img_url}
            alt={imovel.titulo}
            width={400}
            height={220}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm font-medium">
            Sem imagem cadastrada
          </div>
        )}
        
        <span className={`absolute top-3 right-3 text-xs font-bold px-3 py-1.5 rounded-lg border capitalize tracking-wider shadow-sm ${getStatusBadgeClass(imovel.status)}`}>
          {imovel.status === "analise" ? "Em Análise" : imovel.status}
        </span>
      </div>

      <div className="p-5 flex-grow flex flex-col justify-center items-center">
        <h3 className="font-bold text-lg text-slate-800 line-clamp-1 px-2 group-hover:text-[#1F3445] transition-colors">
          {imovel.titulo}
        </h3>
        <p className="text-xl font-extrabold text-[#1F3445] mt-1.5 tracking-tight">
          R$ {Number(precoFinal || 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </p>
        <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">
          {imovel.bairro}, {imovel.cidade}
        </p>
      </div>

      <Link
        href={`/editar-imovel?id=${imovel.id}`}
        className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#1F3445] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#F29829] transition-colors duration-300"
      >
        <BiEditAlt size={16} />
        Editar Dados
      </Link>
    </div>
  );
}

export default function MeusImoveis() {
  const router = useRouter();
  const [imoveis, setImoveis] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMeusImoveis() {
      const clienteId = localStorage.getItem("alexandria_cliente_id");
      if (!clienteId) {
        router.push("/cadastro");
        return;
      }

      setLoading(true);

      const { data, error } = await supabase
        .from("imoveis")
        .select(`
          id, titulo, preco_venda, bairro, cidade, quartos, 
          banheiros, area_construida, status, created_at,
          imovel_imagens (url, capa)
        `)
        .eq("proprietario_id", Number(clienteId))
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Erro ao buscar meus imóveis:", error.message);
      } else {
        const imoveisFormatados = data.map((imovel) => {
          const capa = imovel.imovel_imagens?.find((img) => img.capa) || imovel.imovel_imagens?.[0];
          return { ...imovel, img_url: capa?.url || null };
        });
        setImoveis(imoveisFormatados);
      }
      setLoading(false);
    }

    fetchMeusImoveis();
  }, [router]);

  const handleDelete = async (id) => {
    if (!confirm("Tem certeza que deseja excluir este imóvel? Esta ação não pode ser desfeita.")) return;

    const { error } = await supabase
      .from("imoveis")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Erro ao excluir: " + error.message);
    } else {
      alert("Imóvel excluído com sucesso!");
      setImoveis(imoveis.filter((i) => i.id !== id));
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col justify-between">
      <Head /> 
      <Header /> 
      <Navbar />

      <div className="flex flex-col items-center py-16 text-center px-4">
        <span className="text-[#F29829] font-bold uppercase tracking-[0.2em] text-xs mb-2 block">
          Seu Painel
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Meus Imóveis
        </h2>
        <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-md leading-relaxed">
          Gerencie, edite ou acompanhe o status das suas propriedades anunciadas.
        </p>
        <span className="block mt-4 h-1 w-16 bg-[#F29829] rounded-full" />
      </div>
      
      <main className="flex-grow px-4 pb-20 max-w-7xl w-full mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <div className="w-8 h-8 border-4 border-[#F29829] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-slate-500 font-medium">Buscando seus imóveis...</p>
          </div>
        ) : imoveis.length === 0 ? (
          <div className="text-center py-16 bg-white border border-slate-100 rounded-2xl p-8 max-w-md mx-auto shadow-sm">
            <p className="text-slate-500 text-sm sm:text-base font-medium">
              Você ainda não possui nenhum imóvel cadastrado na sua conta.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-8 max-w-6xl mx-auto">
            {imoveis.map((imovel) => (
              <ImovelCard key={imovel.id} imovel={imovel} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}