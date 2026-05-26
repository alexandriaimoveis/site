"use client";

import Image from "next/image";
import { BsEnvelope, BsWhatsapp, BsPinMapFill } from "react-icons/bs";

export default function Header() {
  return (
    <section className="w-full bg-white border-b border-slate-100">
      <div
        className="
          mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-4
          sm:flex-row sm:items-center sm:justify-between
        "
      >
        <div className="flex items-center justify-center transition-transform duration-300 hover:scale-102 sm:justify-start">
          <Image
            src="/logo.png"
            alt="Alexandria"
            width={120}
            height={120}
            className="h-14 w-auto object-contain"
            priority
          />
        </div>

        <div
          className="
            flex flex-col items-center gap-4 text-xs
            sm:flex-row sm:flex-wrap sm:items-center sm:gap-8
          "
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
              <p className="text-slate-700 font-extrabold mt-0.5 tracking-wide">alexandrianegociosimobiliarios@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}