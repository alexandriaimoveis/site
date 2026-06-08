"use client";

import { useState } from "react";
import Image from "next/image";
import { BsEnvelope, BsWhatsapp, BsPinMapFill, BsPlus, BsDash } from "react-icons/bs";

export default function Header() {
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  return (
    <section className="w-full bg-white border-b border-slate-100">
      <div
        className="
          mx-auto flex max-w-6xl flex-col px-6 py-4
          sm:flex-row sm:items-center sm:justify-between sm:gap-6
        "
      >
        {/* CONTAINER DO LOGO: Perfeitamente centralizado no mobile, alinhado à esquerda no desktop */}
        <div className="relative flex items-center justify-center w-full sm:w-auto sm:justify-start sm:static">
          
          <div className="transition-transform duration-300 hover:scale-102">
            <Image
              src="/logo.png"
              alt="Alexandria"
              width={120}
              height={120}
              className="h-14 w-auto object-contain"
              priority
            />
          </div>

          {/* BOTÃO DE EXPANSÃO COM TEXTO EXCLUSIVO PARA MOBILE */}
          <button
            onClick={() => setIsInfoOpen(!isInfoOpen)}
            className="
              absolute right-0 sm:hidden flex items-center gap-1 
              px-3 py-1.5 rounded-xl bg-amber-50 text-[11px] font-bold 
              text-[#F29829] transition-all duration-300 active:scale-95
              outline-none select-none border border-amber-100/40 shadow-sm
            "
          >
            {isInfoOpen ? (
              <>
                <BsDash size={16} />
                <span>Fechar</span>
              </>
            ) : (
              <>
                <BsPlus size={16} />
                {/* Sugestão: "Contatos" ou "Ver Mais" deixam claro o propósito do botão */}
                <span>Ver Mais</span>
              </>
            )}
          </button>
        </div>

        {/* BLOCO DE INFORMAÇÕES: Sanfona no mobile, grade horizontal no desktop */}
        <div
          className={`
            items-center gap-4 text-xs mt-6 sm:mt-0 w-full sm:w-auto
            sm:flex sm:flex-row sm:flex-wrap sm:items-center sm:gap-8
            ${isInfoOpen ? "flex flex-col animate-fadeIn" : "hidden"}
          `}
        >
          <div className="flex items-center gap-3 bg-slate-50/50 sm:bg-transparent p-2 px-4 sm:p-0 rounded-2xl w-full sm:w-auto">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-xl text-[#F29829]">
              <BsWhatsapp size={16} />
            </span>
            <div className="leading-tight text-left">
              <p className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">Contato</p>
              <p className="text-slate-700 font-extrabold mt-0.5 tracking-wide">+55 (35) 9 8713-1293</p>
              <p className="text-slate-700 font-extrabold mt-0.5 tracking-wide">+55 (35) 9 8802-1496</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-50/50 sm:bg-transparent p-2 px-4 sm:p-0 rounded-2xl w-full sm:w-auto">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-xl text-[#F29829]">
              <BsPinMapFill size={16} />
            </span>
            <div className="leading-tight text-left">
              <p className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">São Lourenço</p>
              <p className="text-slate-700 font-extrabold mt-0.5 tracking-wide">Sul de Minas Gerais</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-50/50 sm:bg-transparent p-2 px-4 sm:p-0 rounded-2xl w-full sm:w-auto">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-xl text-[#F29829]">
              <BsEnvelope size={16} />
            </span>
            <div className="leading-tight text-left">
              <p className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">E-mail</p>
              <p className="text-slate-700 font-extrabold mt-0.5 tracking-wide break-all">
                alexandrianegociosimobiliarios@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}