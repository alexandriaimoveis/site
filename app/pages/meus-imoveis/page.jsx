"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { BiTrash } from "react-icons/bi";
import { supabase } from "@/app/lib/supabase";
import Header from "@/app/components/header/page";
import Head from "@/app/components/head/page";
import Navbar from "@/app/components/navbar/page";
import Footer from "@/app/components/footer/page";

function ImovelCard({ imovel, onDelete }) {
  const precoFinal = imovel.preco_venda;

  return (
    <div className="group w-full max-w-sm border border-gray-400 rounded-3xl shadow-sm text-center flex flex-col items-center overflow-hidden bg-white relative">
      <button
        onClick={() => onDelete(imovel.id)}
        className="absolute top-3 left-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-700 transition-colors z-10"
        title="Excluir Imóvel"
      >
        <BiTrash size={20} />
      </button>

      <div className="relative w-full mb-4">
        {imovel.img_url ? (
          <Image
            src={imovel.img_url}
            alt={imovel.titulo}
            width={400}
            height={260}
            className="rounded-t-3xl w-full h-[260px] object-cover"
          />
        ) : (
          <div className="rounded-t-3xl w-full h-[260px] bg-gray-200 flex items-center justify-center text-gray-500">Sem imagem</div>
        )}
        <span className="absolute top-3 right-3 bg-[#F29829] text-sm px-3 py-1 rounded-full text-white capitalize">
          {imovel.status === "analise" ? "Em Análise" : imovel.status}
        </span>
      </div>

      <h3 className="font-bold text-xl px-2">{imovel.titulo}</h3>
      <p className="italic text-lg font-semibold mt-1">
        R$ {Number(precoFinal || 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
      </p>
      <span className="text-sm text-gray-600 mb-4">{imovel.bairro}, {imovel.cidade}</span>

      <Link
        href={`/editar-imovel?id=${imovel.id}`}
        className="block w-full py-2 bg-[#1F3445] text-white text-sm font-bold hover:bg-[#F29829] transition-colors"
      >
        EDITAR DADOS
      </Link>
    </div>
  );
}

export default function MeusImoveis() {
  const router = useRouter();
  const [imoveis, setImoveis] = useState([]);
  const [loading, setLoading] = useState(true);

  // Função para carregar dados
  async function fetchMeusImoveis() {
    const clienteId = localStorage.getItem("alexandria_cliente_id");
    if (!clienteId) {
      router.push("/cadastro");
      return;
    }

    const { data, error } = await supabase
      .from("imoveis")
      .select(`
        id, titulo, preco_venda, bairro, cidade, status, created_at,
        imovel_imagens (url, capa)
      `)
      .eq("proprietario_id", Number(clienteId))
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Erro:", error.message);
    } else {
      const imoveisFormatados = data.map((imovel) => {
        const capa = imovel.imovel_imagens?.find((img) => img.capa) || imovel.imovel_imagens?.[0];
        return { ...imovel, img_url: capa?.url || null };
      });
      setImoveis(imoveisFormatados);
    }
    setLoading(false);
  }

  // REMOVA a chamada de fetchMeusImoveis() que está solta no corpo do componente (linha 94)

  useEffect(() => {
    // Defina a função dentro do useEffect ou mantenha-a fora
    // se ela não depender de nada externo ao componente.
    async function fetchMeusImoveis() {
      const clienteId = localStorage.getItem("alexandria_cliente_id");
      if (!clienteId) {
        router.push("/cadastro");
        return;
      }

      setLoading(true); // Garante que o loading comece verdadeiro

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
      setLoading(false); // Finaliza o loading
    }

    fetchMeusImoveis();
  }, [router]); // O array de dependências controla quando isso roda

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
      // Atualiza a lista após excluir
      setImoveis(imoveis.filter((i) => i.id !== id));
    }
  };

  return (
    <>
      <Head /> <Header /> <Navbar />

      <div className="flex flex-col items-center py-16">
        <h2 className="text-4xl font-bold text-center">Meus Imóveis</h2>
        <p className="text-xl font-bold text-center text-gray-600 mt-2">Controle seus Imóveis cadastrados</p>
        <span className="block mt-2 h-1.5 w-48 bg-[#F29829] rounded-full" />
      </div>
      
      <main className="min-h-[50vh] px-4 pb-16">
        {loading ? (
          <p className="text-center py-12">Carregando...</p>
        ) : imoveis.length === 0 ? (
          <p className="text-center py-12">Você não cadastrou nenhum imóvel.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center gap-6 max-w-6xl mx-auto">
            {imoveis.map((imovel) => (
              <ImovelCard key={imovel.id} imovel={imovel} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}