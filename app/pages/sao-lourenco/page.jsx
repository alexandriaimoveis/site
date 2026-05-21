"use client";

import Image from "next/image";
import Link from "next/link";
import Header from '@/app/components/header/page';
import Head from '../../components/head/page';
import Navbar from '../../components/navbar/page';
import Footer from '@/app/components/footer/page';
import { BiMap, BiCompass, BiCoffeeTogo, BiRocket, BiChevronRight, BiStore } from "react-icons/bi";

export default function SaoLourenco() {
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col justify-between">
      <Head />
      <Header />
      <Navbar />

      <div className="flex flex-col items-center pt-16 pb-12 text-center px-4">
        <span className="text-[#F29829] font-bold uppercase tracking-[0.2em] text-xs mb-2 block">
          Viva o Circuito das Águas
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Conheça São Lourenço
        </h2>
        <p className="text-slate-500 text-sm sm:text-lg mt-3 max-w-2xl leading-relaxed">
          Uma das estâncias hidrominerais mais importantes do Brasil, combinando qualidade de vida, natureza exuberante e o autêntico charme mineiro.
        </p>
        <span className="block mt-4 h-1 w-20 bg-[#F29829] rounded-full" />
      </div>

      <main className="flex-grow w-full max-w-5xl mx-auto px-4 space-y-12 pb-24">
        
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="relative h-[260px] sm:h-[320px] w-full rounded-2xl overflow-hidden shadow-sm">
            <Image 
              src="/parque.webp" 
              alt="Parque das Águas de São Lourenço"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#F29829]">
              <BiCompass size={20} />
              <span className="text-[11px] font-bold uppercase tracking-wider">O Coração da Estância</span>
            </div>
            <h3 className="text-2xl font-extrabold text-[#1F3445] tracking-tight">
              Parque das Águas
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              O principal cartão-postal da cidade conta com nove fontes de águas minerais, cada uma com propriedades medicinais únicas. Seus mais de 400 mil metros quadrados abrigam um lago magnífico com pedalinhos, bosques preservados, pista de caminhada e um spa com banhos termais relaxantes.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="space-y-4 order-2 md:order-1">
            <div className="flex items-center gap-2 text-[#F29829]">
              <BiCoffeeTogo size={20} />
              <span className="text-[11px] font-bold uppercase tracking-wider">Tradição e Sabor</span>
            </div>
            <h3 className="text-2xl font-extrabold text-[#1F3445] tracking-tight">
              Rota dos Cafés Especiais
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Situada aos pés da Mantiqueira, São Lourenço é referência no serviço de cafés premiados. As cafeterias locais oferecem experiências sensoriais únicas, com grãos cultivados em altitudes elevadas que carregam notas adocicadas e aromas inconfundíveis do legítimo café sul-mineiro.
            </p>
          </div>
          <div className="relative h-[260px] sm:h-[320px] w-full rounded-2xl overflow-hidden shadow-sm order-1 md:order-2">
            <Image 
              src="/cafe.webp" 
              alt="Cafés Especiais em São Lourenço"
              fill
              className="object-cover"
            />
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="relative h-[260px] sm:h-[320px] w-full rounded-2xl overflow-hidden shadow-sm">
            <Image 
              src="/centro.webp" 
              alt="Centro de São Lourenço"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#F29829]">
              <BiStore size={20} />
              <span className="text-[11px] font-bold uppercase tracking-wider">Charme e Concorrência</span>
            </div>
            <h3 className="text-2xl font-extrabold text-[#1F3445] tracking-tight">
              Centro Histórico e Urbano
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Ruas limpas, calçadas largas e arborizadas ditam o ritmo do centro bem arrumado de São Lourenço. O comércio vibrante destaca-se pelas tradicionais lojas de doces artesanais, malhas de qualidade, artesanatos regionais e os famosos queijos finos da região.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="space-y-4 order-2 md:order-1">
            <div className="flex items-center gap-2 text-[#F29829]">
              <BiMap size={20} />
              <span className="text-[11px] font-bold uppercase tracking-wider">Nostalgia Pura</span>
            </div>
            <h3 className="text-2xl font-extrabold text-[#1F3445] tracking-tight">
              O Histórico Trem das Águas
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Um passeio que volta no tempo. Conduzido por uma legítima locomotiva Maria Fumaça a vapor, o trajeto turístico liga a estação de São Lourenço até Soledade de Minas, margeando o Rio Verde com belas paisagens rurais e muita música típica mineira a bordo.
            </p>
          </div>
          <div className="relative h-[260px] sm:h-[320px] w-full rounded-2xl overflow-hidden shadow-sm order-1 md:order-2">
            <Image 
              src="/trem.webp" 
              alt="Trem das Águas Maria Fumaça"
              fill
              className="object-cover"
            />
          </div>
        </section>

        <section className="bg-[#1F3445] text-white rounded-3xl p-6 sm:p-10 shadow-lg grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-[#F29829]">
              <BiRocket size={20} />
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">Adrenalina e Emoção</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-100">
              Balonismo e Kartódromo Internacional
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Para quem busca lazer ativo, a cidade reserva céus coloridos e pistas velozes. O voo de balão oferece vistas espetaculares da Serra da Mantiqueira ao amanhecer. Já em terra firme, o complexo do Kartódromo Internacional de São Lourenço garante diversão com baterias cronometradas e excelente estrutura técnica.
            </p>
          </div>
          
          <div className="md:col-span-1 relative h-[200px] md:h-[240px] w-full rounded-2xl overflow-hidden border border-white/10">
            <Image 
              src="/aventura.webp" 
              alt="Balonismo e Kart em São Lourenço"
              fill
              className="object-cover brightness-95"
            />
          </div>
        </section>

        <section className="text-center bg-amber-50/40 border border-amber-100 rounded-3xl p-8 sm:p-12 flex flex-col items-center">
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#1F3445] tracking-tight">
            Quer morar ou investir em São Lourenço?
          </h3>
          <p className="text-slate-500 text-xs sm:text-sm mt-2 max-w-md">
            Temos as melhores oportunidades de casas, apartamentos e terrenos comerciais na estância mais charmosa do Sul de Minas.
          </p>
          <Link href="/pages/resultados?cidade=São Lourenço">
            <button className="mt-6 h-11 px-6 rounded-xl bg-[#F29829] hover:bg-[#1F3445] text-white font-bold text-xs uppercase tracking-widest transition-colors duration-300 shadow-md flex items-center gap-2 cursor-pointer">
              Ver Imóveis Disponíveis <BiChevronRight size={18} />
            </button>
          </Link>
        </section>

      </main>

      <Footer />
    </div>
  );
}