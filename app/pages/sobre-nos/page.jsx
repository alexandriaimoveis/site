"use client";

import Header from '@/app/components/header/page';
import Head from '../../components/head/page';
import Navbar from '../../components/navbar/page';
import Footer from '@/app/components/footer/page';
import { BsCupHot, BsGeoAltFill, BsCompass } from "react-icons/bs";

export default function SobreNos() {
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col justify-between">
      <div>
        <Head />
        <Header />
        <Navbar />
        
        <section className="bg-white border-b border-slate-100 py-16">
          <div className="max-w-6xl mx-auto px-6">
            <span className="text-[#F29829] font-bold uppercase tracking-[0.2em] text-xs mb-3 block">
              Nossa História & Essência
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Quem somos nós?
            </h1>
            <span className="block mt-4 h-1 w-20 bg-[#F29829] rounded-full" />
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            <div className="lg:col-span-7 text-slate-700 space-y-6 text-base leading-relaxed text-left">
              <p className="text-lg text-slate-900 font-medium leading-relaxed">
                Meu nome é Alexandre, o nome do meu pai também é Alexandre e juntos, somos os fundadores da <span className="font-bold text-[#1e293b]">Alexandria Negócios Imobiliários</span>.
              </p>
              
              <p>
                O nome da imobiliária foi inspirado na cidade de Alexandria fundada em 331 a.C. por Alexandre o Grande. O objetivo de Alexandre naquela época era criar um grande porto comercial e centro cultural que conectasse o mundo grego com o Egito e outras regiões do Oriente.
              </p>
              
              <p className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm font-semibold text-slate-800">
                E baseado nessa ideia é esse conceito que trazemos para nossa imobiliária: conectar pessoas a imóveis, sonhos a realização, e efetuar bons negócios aos nossos clientes.
              </p>

              <h2 className="text-2xl font-extrabold text-slate-900 pt-4 tracking-tight">
                O que buscamos proporcionar aos nossos clientes?
              </h2>

              <p>
                Um dos monumentos mais famosos da cidade de Alexandria foi o Farol de Alexandria, construído para ajudar os navios a encontrar o porto durante a noite ou em dias de neblina. E esse farol se tornou o símbolo da nossa imobiliária.
              </p>

              <blockquote className="border-l-4 border-[#F29829] pl-4 italic text-slate-900 font-medium text-lg my-6">
                Inspirado nele, buscamos proporcionar aos nossos clientes uma boa orientação, conduzi-los de forma acolhedora, transparente, profissional, mantendo sempre a base do que preservamos: um atendimento familiar, da nossa família, para a sua família.
              </blockquote>
            </div>

            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
              
              <div className="bg-[#1e293b] text-white p-8 rounded-2xl shadow-xl relative overflow-hidden">
                <div className="absolute right-[-20px] bottom-[-20px] text-slate-800/30 pointer-events-none">
                  <BsCompass size={140} />
                </div>
                <h3 className="text-[#F29829] font-bold uppercase tracking-wider text-xs mb-3 flex items-center gap-2">
                  <BsCompass className="animate-pulse" /> Nosso Símbolo
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed font-medium">
                  Assim como o histórico Farol guiou navegantes em neblinas profundas, nossa missão é ser a luz de segurança e transparência na sua jornada de conquista imobiliária.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-md space-y-6">
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-[#F29829]">
                    <BsGeoAltFill size={18} />
                  </span>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wide">Onde Estamos</h4>
                    <p className="text-slate-600 text-sm mt-1 leading-normal">
                      Praça Doutor Ismael de Souza, nº 11, Loja 03<br />
                      Bairro da Estação — São Lourenço, Sul de Minas Gerais.
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-6 flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-[#F29829]">
                    <BsCupHot size={18} />
                  </span>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wide">Um Convite Especial</h4>
                    <p className="text-slate-600 text-sm mt-1 leading-normal">
                      Venha nos fazer uma visita, apreciar um bom café, e conhecer o que temos de melhor para oferecer!
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}