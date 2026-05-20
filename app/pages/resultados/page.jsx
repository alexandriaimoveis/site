"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
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
} from "react-icons/bi";

function ImovelCard({ imovel }) {
  const [favorito, setFavorito] = useState(false);

  const exibirPreco = imovel.finalidade?.toLowerCase().includes("aluguel")
    ? `${Number(imovel.preco_aluguel).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}/mês`
    : Number(imovel.preco_venda).toLocaleString("pt-BR", { minimumFractionDigits: 2 });

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
        <span className="absolute top-3 right-3 bg-[#F29829] text-sm px-3 py-1 rounded-full capitalize">
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
      <p className="italic">R$ {exibirPreco}</p>
      <span className="text-sm">{imovel.bairro}, {imovel.cidade} - {imovel.estado}</span>

      <ul className="flex gap-4 justify-center items-center w-full bg-[#F2C894] mt-4 p-4 rounded-b-3xl">
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

      // Filtro de preço máximo aplicado na coluna correspondente
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
          return { ...imovel, img_url: capa?.url || null };
        });
        setImoveis(imoveisComImg);
      }
      setLoading(false);
    }

    fetchResultados();
  }, [searchParams]);

  return (
    <>
      <div className="flex flex-col items-center py-16">
        <h2 className="text-4xl font-bold text-center">Resultados da Busca</h2>
        <p className="text-xl font-bold text-center text-gray-600 mt-2">
          {loading ? "Buscando imóveis..." : `${imoveis.length} imóvel(is) encontrado(s)`}
        </p>
        <span className="block mt-2 h-1.5 w-48 bg-[#F29829] rounded-full" />
      </div>

      {loading ? (
        <p className="text-center py-12 text-gray-500">Carregando imóveis correspondentes...</p>
      ) : imoveis.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Nenhum imóvel corresponde aos critérios da sua busca.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center gap-6 max-w-6xl mx-auto">
          {imoveis.map((imovel) => (
            <ImovelCard key={imovel.id} imovel={imovel} />
          ))}
        </div>
      )}
    </>
  );
}

export default function Resultados() {
  return (
    <>
      <Head />
      <Header />
      <Navbar />

      <Suspense fallback={<p className="text-center py-12">Carregando aplicação...</p>}>
        <ResultadosContent />
      </Suspense>

      <br /><br />
      <Footer />
    </>
  );
}