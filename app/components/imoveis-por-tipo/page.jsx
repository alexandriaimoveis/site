"use client";
import { useState, useEffect } from "react";

import Header from "@/app/components/header/page";
import Head from "@/app/components/head/page";
import Navbar from "@/app/components/navbar/page";
import Footer from "@/app/components/footer/page";
import WhatsAppButton from "@/app/components/whatsapp/page";
import ImovelCard from "@/app/components/imovel-card/page";
import { supabase } from "@/app/lib/supabase";
import FiltroPreco, { useFiltroPreco } from "@/app/components/filtro-preco/page";

const TIPO_MAP = {
  casa: { label: "Casa", db: "casa" },
  apto: { label: "Apartamento", db: "apartamento" },
  terreno: { label: "Terreno", db: "terreno" },
  comercial: { label: "Comercial", db: "comercial" },
  chacara: { label: "Chácara", db: "chacara" },
  sitio: { label: "Sítio", db: "sitio" },
  loja: { label: "Loja", db: "loja" },
  cobertura: { label: "Cobertura", db: "cobertura" },
};

const FINALIDADE_INFO = {
  venda: { label: "Venda", eyebrow: "Oportunidades Exclusivas" },
  aluguel: { label: "Locação", eyebrow: "Imóveis Disponíveis" },
};

export default function ImoveisPorTipo({ tipoSlug, finalidade }) {
  const [imoveis, setImoveis] = useState([]);
  const [loading, setLoading] = useState(true);
  const { imoveisFiltrados, faixas, faixaIndex, setFaixaIndex, ordenacao, setOrdenacao } =
    useFiltroPreco(imoveis, finalidade);

  const tipoInfo = TIPO_MAP[tipoSlug];
  const finalidadeInfo = FINALIDADE_INFO[finalidade];

  useEffect(() => {
    if (!tipoInfo) {
      setLoading(false);
      return;
    }

    async function fetchImoveis() {
      const { data, error } = await supabase
        .from("imoveis")
        .select(`
          id, titulo, finalidade, preco_venda, preco_aluguel,
          bairro, cidade, estado, quartos, banheiros, area_construida,
          tipo, status, created_at,
          imovel_imagens (url, capa)
        `)
        .eq("status", "disponivel")
        .eq("tipo", tipoInfo.db)
        .ilike("finalidade", `%${finalidade}%`)
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
  }, [tipoSlug, finalidade]);

  if (!tipoInfo || !finalidadeInfo) {
    return (
      <div className="bg-slate-50 min-h-screen flex flex-col justify-between">
        <div>
          <Head />
          <Header />
          <Navbar />
          <main className="max-w-6xl mx-auto px-6 py-16 text-center">
            <p className="text-slate-500 font-medium">Categoria de imóvel não encontrada.</p>
          </main>
        </div>
        <Footer />
        <WhatsAppButton />
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col justify-between">
      <div>
        <Head />
        <Header />
        <Navbar />

        <section className="bg-white border-b border-slate-100 py-16">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <span className="text-[#F29829] font-bold uppercase tracking-[0.2em] text-xs mb-3 block">
              {finalidadeInfo.eyebrow}
            </span>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              {tipoInfo.label} para {finalidadeInfo.label}
            </h1>
            <p className="text-sm text-slate-500 font-medium max-w-md mx-auto mt-2">
              Confira nossa curadoria de {tipoInfo.label.toLowerCase()}s disponíveis para {finalidadeInfo.label.toLowerCase()} em São Lourenço e região.
            </p>
            <span className="block mt-4 h-1 w-16 bg-[#F29829] rounded-full mx-auto" />
          </div>
        </section>

        <FiltroPreco
          faixas={faixas}
          faixaIndex={faixaIndex}
          setFaixaIndex={setFaixaIndex}
          ordenacao={ordenacao}
          setOrdenacao={setOrdenacao}
        />

        <main className="max-w-6xl mx-auto px-6 py-16">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#F29829] border-t-transparent" />
              <p className="mt-4 text-sm font-semibold text-slate-400 uppercase tracking-wider">Carregando catálogo...</p>
            </div>
          ) : imoveis.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
              <p className="text-slate-500 font-medium">
                Nenhum(a) {tipoInfo.label.toLowerCase()} disponível para {finalidadeInfo.label.toLowerCase()} no momento.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {imoveisFiltrados.map((imovel) => (
                <ImovelCard key={imovel.id} imovel={imovel} contexto={finalidade} />
              ))}
            </div>
          )}
        </main>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}