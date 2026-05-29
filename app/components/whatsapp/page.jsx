"use client";

import { useState } from "react";
import { BsWhatsapp } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);

  const contatos = [
    { nome: "Alexandre (LEE)", numero: "5535987131293" },
    { nome: "Alexandre Marques", numero: "5535988021496" },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      
      {isOpen && (
        <div className="flex flex-col gap-2 rounded-2xl bg-white p-4 shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-gray-100 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <p className="text-sm font-semibold text-gray-700 px-2 mb-1">
            Com quem deseja falar?
          </p>
          
          {contatos.map((contato, index) => (
            <a
              key={index}
              href={`https://wa.me/${contato.numero}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-medium text-white shadow-sm transition-all hover:bg-[#1ebe5c] hover:-translate-y-0.5 whitespace-nowrap"
            >
              <BsWhatsapp className="text-lg" />
              {contato.nome}
            </a>
          ))}
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.35)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#1ebe5c]"
        aria-label="Opções de WhatsApp"
      >
        {isOpen ? (
          <IoMdClose className="text-3xl" />
        ) : (
          <BsWhatsapp className="text-2xl" />
        )}
      </button>
    </div>
  );
}