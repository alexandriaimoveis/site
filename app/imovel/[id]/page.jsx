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
  BiChevronLeft,
  BiChevronRight,
  BiMap,
  BiLoaderAlt,
  BiArea,
  BiBed,
  BiBath,
  BiCar,
  BiBuilding,
  BiCheckCircle,
  BiDollarCircle,
  BiInfoCircle
} from "react-icons/bi";
import { BsCheckCircleFill, BsXCircleFill } from 'react-icons/bs';
import { FiMessageSquare, FiCalendar } from "react-icons/fi";
import WhatsAppButton from "@/app/components/whatsapp/page";

export default function DetalhesImovel() {
  const { id } = useParams();
  const [imovel, setImovel] = useState(null);
  const [imagens, setImagens] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [favorito, setFavorito] = useState(false);

  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [tipoContato, setTipoContato] = useState("mensagem");
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    email: "",
    mensagem: ""
  });

  useEffect(() => {
    if (!id) return;

    async function fetchImovelDetalhes() {
      setLoading(true);
      const { data, error } = await supabase
        .from("imoveis")
        .select(`
          id, codigo, tipo, finalidade, status, preco_venda, preco_aluguel,
          valor_condominio, valor_iptu, bairro, cidade, estado,
          area_total, area_construida, quartos, suites, banheiros, vagas_garagem,
          andar, total_andares, titulo, descricao, diferenciais,
          imovel_imagens (url, capa)
        `)
        .eq("id", id)
        .single();

      if (error) {
        console.error("Erro ao buscar detalhes do imóvel:", error.message);
      } else if (data) {
        setImovel(data);

        setFormData(prev => ({
          ...prev,
          mensagem: `Olá! Tenho interesse no imóvel ${data.tipo} código de referência: ${data.codigo}. Poderia me passar mais informações?`
        }));

        if (data.imovel_imagens) {
          const imgsOrdenadas = [...data.imovel_imagens].sort((a, b) => (b.capa ? 1 : 0) - (a.capa ? 1 : 0));
          setImagens(imgsOrdenadas);
        }
      }
      setLoading(false);
    }

    fetchImovelDetalhes();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    setError('');
    setFormLoading(true);

    const payload = {
      name: formData.nome,
      email: formData.email,
      phone: formData.telefone,
      message: `[Interesse: ${tipoContato === 'mensagem' ? 'Mensagem Direta' : 'Agendar Visita'}]\n\n${formData.mensagem}`,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Erro ao enviar mensagem.');

      setStatus(result.message || 'Sua solicitação foi enviada com sucesso!');
      setFormData({
        nome: "",
        telefone: "",
        email: "",
        mensagem: `Olá! Tenho interesse no imóvel código ${imovel?.codigo}. Poderia me passar mais informações?`
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro inesperado.');
    } finally {
      setFormLoading(false);
    }
  };

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
          <p className="text-sm text-slate-500 font-medium">Buscando ficha completa do imóvel...</p>
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

  const diferenciaisList = imovel.diferenciais 
    ? Object.entries(imovel.diferenciais).filter(([_, v]) => v === true || v === "true").map(([k]) => k)
    : [];

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col justify-between">
      <Head />
      <Header />
      <Navbar />

      <main className="max-w-5xl w-full mx-auto px-4 py-12 flex-grow">
        
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-6">
          <div>
            <div className="flex gap-2">
              <span className="bg-[#F29829] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg inline-block shadow-sm">
                {imovel.finalidade}
              </span>
              <span className="bg-slate-200 text-slate-700 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg inline-block shadow-sm">
                {imovel.tipo}
              </span>
            </div>
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
                  <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md hover:bg-white p-2 rounded-full shadow-md text-slate-800 transition-all cursor-pointer">
                    <BiChevronLeft size={26} />
                  </button>
                  <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md hover:bg-white p-2 rounded-full shadow-md text-slate-800 transition-all cursor-pointer">
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
          <button onClick={() => setFavorito(!favorito)} className="absolute top-4 left-4 bg-white/80 backdrop-blur-md p-3 rounded-full shadow-md transition-transform duration-200 hover:scale-110 cursor-pointer">
            <BiSolidHeart size={22} className={favorito ? "text-rose-500" : "text-slate-400"} />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mt-4">
          <div className="bg-white p-3 border border-slate-100 rounded-xl flex items-center gap-3 shadow-sm">
            <BiArea size={20} className="text-[#F29829]" />
            <div className="flex flex-col"><span className="text-[10px] text-slate-400 font-bold uppercase">Construído</span><span className="text-xs font-bold text-slate-700">{imovel.area_construida || 0}m²</span></div>
          </div>
          <div className="bg-white p-3 border border-slate-100 rounded-xl flex items-center gap-3 shadow-sm">
            <BiBed size={20} className="text-[#F29829]" />
            <div className="flex flex-col"><span className="text-[10px] text-slate-400 font-bold uppercase">Quartos</span><span className="text-xs font-bold text-slate-700">{imovel.quartos || 0} dorms</span></div>
          </div>
          <div className="bg-white p-3 border border-slate-100 rounded-xl flex items-center gap-3 shadow-sm">
            <BiCheckCircle size={20} className="text-[#F29829]" />
            <div className="flex flex-col"><span className="text-[10px] text-slate-400 font-bold uppercase">Suítes</span><span className="text-xs font-bold text-slate-700">{imovel.suites || 0} suíte(s)</span></div>
          </div>
          <div className="bg-white p-3 border border-slate-100 rounded-xl flex items-center gap-3 shadow-sm">
            <BiBath size={20} className="text-[#F29829]" />
            <div className="flex flex-col"><span className="text-[10px] text-slate-400 font-bold uppercase">Banheiros</span><span className="text-xs font-bold text-slate-700">{imovel.banheiros || 0} banhs</span></div>
          </div>
          <div className="bg-white p-3 border border-slate-100 rounded-xl flex items-center gap-3 shadow-sm">
            <BiCar size={20} className="text-[#F29829]" />
            <div className="flex flex-col"><span className="text-[10px] text-slate-400 font-bold uppercase">Vagas</span><span className="text-xs font-bold text-slate-700">{imovel.vagas_garagem || 0} vagas</span></div>
          </div>
          {imovel.andar && (
            <div className="bg-white p-3 border border-slate-100 rounded-xl flex items-center gap-3 shadow-sm">
              <BiBuilding size={20} className="text-[#F29829]" />
              <div className="flex flex-col"><span className="text-[10px] text-slate-400 font-bold uppercase">Andar</span><span className="text-xs font-bold text-slate-700">{imovel.andar}º andar</span></div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          
          <div className="md:col-span-2 space-y-6">
            
            <div className="bg-white border border-slate-100 p-6 sm:p-8 rounded-2xl shadow-sm">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#F29829] mb-4 border-b pb-3 border-slate-100">
                Descrição do Imóvel
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {imovel.descricao || "Nenhuma descrição detalhada fornecida para este imóvel."}
              </p>
            </div>

            <div className="bg-white border border-slate-100 p-6 sm:p-8 rounded-2xl shadow-sm">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#F29829] mb-4 border-b pb-3 border-slate-100">
                Informações Gerais & Valores
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                <div className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-slate-400 font-medium flex items-center gap-1"><BiInfoCircle /> Referência</span>
                  <span className="font-bold text-slate-800 tracking-wider">#{imovel.codigo}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-slate-400 font-medium flex items-center gap-1"><BiBuilding /> Tipo</span>
                  <span className="font-semibold text-slate-700 capitalize">{imovel.tipo}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-slate-400 font-medium flex items-center gap-1"><BiArea /> Área Total</span>
                  <span className="font-semibold text-slate-700">{imovel.area_total ? `${imovel.area_total} m²` : "Não informada"}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-slate-400 font-medium flex items-center gap-1"><BiArea /> Área Construída</span>
                  <span className="font-semibold text-slate-700">{imovel.area_construida ? `${imovel.area_construida} m²` : "Não informada"}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-slate-400 font-medium flex items-center gap-1"><BiDollarCircle /> Condomínio</span>
                  <span className="font-semibold text-slate-700">
                    {imovel.valor_condominio > 0 ? `R$ ${Number(imovel.valor_condominio).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "Isento / Não possui"}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-slate-400 font-medium flex items-center gap-1"><BiDollarCircle /> IPTU Anual</span>
                  <span className="font-semibold text-slate-700">
                    {imovel.valor_iptu > 0 ? `R$ ${Number(imovel.valor_iptu).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "Não informado"}
                  </span>
                </div>
                {imovel.total_andares && (
                  <div className="flex justify-between py-2 border-b border-slate-50">
                    <span className="text-slate-400 font-medium flex items-center gap-1"><BiBuilding /> Total de Andares</span>
                    <span className="font-semibold text-slate-700">{imovel.total_andares} andares</span>
                  </div>
                )}
                <div className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-slate-400 font-medium flex items-center gap-1"><BiCheckCircle /> Situação</span>
                  <span className="px-2 py-0.5 text-xs font-bold uppercase tracking-wider rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100 w-fit">
                    {imovel.status}
                  </span>
                </div>
              </div>
            </div>

            {diferenciaisList.length > 0 && (
              <div className="bg-white border border-slate-100 p-6 sm:p-8 rounded-2xl shadow-sm">
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#F29829] mb-4 border-b pb-3 border-slate-100">
                  Características & Diferenciais
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {diferenciaisList.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-slate-600 font-medium capitalize">
                      <BiCheckCircle className="text-emerald-500 shrink-0" size={18} />
                      <span>{item.replace(/_/g, ' ')}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="md:col-span-1">
            <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm h-fit sticky top-6">
              <h3 className="text-lg font-bold text-slate-800 mb-5">Entrar em contato</h3>
              
              <div className="flex bg-slate-50 p-1 rounded-full border border-slate-200 mb-6">
                <button
                  type="button"
                  onClick={() => setTipoContato("mensagem")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-full transition-all ${
                    tipoContato === "mensagem" ? "bg-[#F29829] text-white shadow-sm" : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <FiMessageSquare size={14} /> Mensagem
                </button>
                <button
                  type="button"
                  onClick={() => setTipoContato("visita")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-full transition-all ${
                    tipoContato === "visita" ? "bg-[#F29829] text-white shadow-sm" : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <FiCalendar size={14} /> Agendar visita
                </button>
              </div>

              {status && (
                <div className="mb-4 flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-100 px-3 py-2.5 text-xs font-semibold text-emerald-800">
                  <BsCheckCircleFill className="shrink-0 text-emerald-600" size={14} />
                  <span>{status}</span>
                </div>
              )}
              {error && (
                <div className="mb-4 flex items-center gap-2 rounded-xl bg-rose-50 border border-rose-100 px-3 py-2.5 text-xs font-semibold text-rose-800">
                  <BsXCircleFill className="shrink-0 text-rose-600" size={14} />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div>
                  <input
                    type="text" name="nome" required placeholder="Nome*" value={formData.nome} onChange={handleInputChange}
                    className="w-full bg-transparent border-b border-slate-300 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#F29829] transition-colors"
                  />
                </div>
                <div className="relative flex items-center">
                  <span className="text-base mr-2">🇧🇷</span>
                  <input
                    type="tel" name="telefone" required placeholder="Telefone*" value={formData.telefone} onChange={handleInputChange}
                    className="w-full bg-transparent border-b border-slate-300 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#F29829] transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="email" name="email" required placeholder="E-mail*" value={formData.email} onChange={handleInputChange}
                    className="w-full bg-transparent border-b border-slate-300 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#F29829] transition-colors"
                  />
                </div>
                <div>
                  <textarea
                    name="mensagem" rows={3} value={formData.mensagem} onChange={handleInputChange}
                    className="w-full bg-transparent border-b border-slate-300 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#F29829] resize-none transition-colors leading-relaxed"
                  />
                </div>

                <p className="text-[11px] text-slate-400 leading-normal">
                  Ao enviar concordo com os <a href="#" className="text-blue-500 hover:underline">termos de uso</a> e <a href="#" className="text-blue-500 hover:underline">política de privacidade</a>.
                </p>

                <button
                  type="submit" disabled={formLoading}
                  className="w-full bg-[#F29829] hover:bg-[#d47f1c] text-white font-bold py-3 px-4 rounded-xl text-sm transition-all shadow-md active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {formLoading ? (
                    <><div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" /><span>Enviando...</span></>
                  ) : (
                    tipoContato === "mensagem" ? "Enviar mensagem" : "Solicitar agendamento"
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}