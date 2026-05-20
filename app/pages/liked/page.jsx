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
    <div className="group w-full max-w-sm border border-gray-400 rounded-3xl shadow-sm text-center flex flex-col items-center overflow-hidden bg-white">
      <div className="relative w-full mb-4">
        <Link href={`/imovel/${imovel.id}`}>
          {imovel.img_url ? (
            <Image
              src={imovel.img_url}
              alt={imovel.titulo}
              width={400}
              height={260}
              className="rounded-t-3xl w-full h-[260px] object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
            />
          ) : (
            <div className="rounded-t-3xl w-full h-[260px] bg-gray-200 flex items-center justify-center text-gray-500 cursor-pointer">
              Sem imagem
            </div>
          )}
        </Link>
        <span className="absolute top-3 right-3 bg-[#F29829] text-sm px-3 py-1 rounded-full text-white capitalize">
          {imovel.finalidade}
        </span>

        <button
          onClick={handleRemoveFavorito}
          className="absolute top-3 left-3 bg-white p-2 rounded-full shadow-md transition-transform duration-200 hover:scale-110"
        >
          <BiSolidHeart size={20} className={favorito ? "text-red-500" : "text-gray-400"} />
        </button>
      </div>

      <Link href={`/imovel/${imovel.id}`}>
        <h3 className="font-bold text-xl px-2 hover:text-[#F29829] transition-colors duration-200 cursor-pointer">
          {imovel.titulo}
        </h3>
      </Link>
      
      <p className="italic text-lg font-semibold mt-1">
        R$ {Number(precoFinal).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        {imovel.finalidade?.toLowerCase() === "aluguel" && "/mês"}
      </p>
      
      <span className="text-sm text-gray-600 mb-2">{imovel.bairro}, {imovel.cidade} - {imovel.estado}</span>

      <ul className="flex gap-4 justify-center items-center w-full bg-[#F2C894] mt-auto p-4 rounded-b-3xl">
        {imovel.quartos > 0 && (
          <li className="flex flex-col items-center gap-1 text-xs font-bold">
            <BiBed size={20} /> {imovel.quartos} {imovel.quartos === 1 ? "Dormitório" : "Dormitórios"}
          </li>
        )}
        {imovel.banheiros > 0 && (
          <li className="flex flex-col items-center gap-1 text-xs font-bold">
            <BiBath size={20} /> {imovel.banheiros} {imovel.banheiros === 1 ? "Banheiro" : "Banheiros"}
          </li>
        )}
        <li className="flex flex-col items-center gap-1 text-xs font-bold">
          <BiArea size={20} /> Área: {imovel.area_construida}m²
        </li>
      </ul>
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
    <>
      <Head />
      <Header />
      <Navbar />

      <div className="flex flex-col items-center py-16">
        <h2 className="text-4xl font-bold text-center">Meus Favoritos</h2>
        <p className="text-xl font-bold text-center text-gray-600 mt-2">Confira os imóveis que você salvou</p>
        <span className="block mt-2 h-1.5 w-48 bg-[#F29829] rounded-full" />
      </div>

      {loading ? (
        <p className="text-center py-12 text-gray-500">Carregando seus favoritos...</p>
      ) : notLoggedIn ? (
        <div className="text-center py-12 px-4">
          <p className="text-gray-500 text-lg">Você precisa estar cadastrado para ver seus favoritos.</p>
          <Link href="/cadastro">
            <button className="mt-4 rounded-md bg-[#F29829] hover:bg-[#1F3445] text-white font-bold px-6 py-2 transition-colors duration-300">
              Criar Conta / Login
            </button>
          </Link>
        </div>
      ) : imoveis.length === 0 ? (
        <p className="text-center py-12 text-gray-500">Você ainda não favoritou nenhum imóvel.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center gap-6 max-w-6xl mx-auto px-4">
          {imoveis.map((imovel) => (
            <ImovelCard 
              key={imovel.id} 
              imovel={imovel} 
              onRemove={handleRemoveFromList} 
            />
          ))}
        </div>
      )}

      <div className="py-12" />

      <Footer />
    </>
  );
}