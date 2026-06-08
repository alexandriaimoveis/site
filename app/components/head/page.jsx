"use client";
import { useState, useEffect } from "react";
import {
  BsHeart,
  BsHouseAdd,
  BsHouseCheck,
  BsLock,
  BsPerson,
  BsPersonCheck,
  BsList, 
  BsX
} from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Head() {
  const [clienteNome, setClienteNome] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para o menu mobile
  const router = useRouter();

  useEffect(() => {
    const nomeSalvo = localStorage.getItem("alexandria_cliente_name");
    const nomeOriginal = nomeSalvo || localStorage.getItem("alexandria_cliente_nome");
    
    if (nomeOriginal) {
      const primeiroNome = nomeOriginal.split(" ")[0];
      setTimeout(() => {
        setClienteNome(primeiroNome);
      }, 0);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("alexandria_cliente_id");
    localStorage.removeItem("alexandria_cliente_nome");
    setClienteNome("");
    router.push("/");
    router.refresh();
  };

  return (
    <section className="bg-[#1e293b] text-slate-200 text-[11px] font-semibold tracking-wide uppercase border-b border-slate-800 relative z-50">
      
      {/* CABEÇALHO MOBILE (Visível apenas em telas pequenas) */}
      <div className="flex md:hidden items-center justify-between px-5 py-3">
        <span className="flex items-center gap-2 text-[#F29829] font-bold">
          {clienteNome ? (
            <><BsPersonCheck size={14} /> Olá, {clienteNome}</>
          ) : (
            <><BsPerson size={14} /> Área do Cliente</>
          )}
        </span>
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-slate-200 hover:text-[#F29829] transition-colors"
        >
          {isMenuOpen ? <BsX size={26} /> : <BsList size={24} />}
        </button>
      </div>

      {/* LISTA DE LINKS (Sempre visível no desktop. No mobile, visível apenas se o menu for clicado) */}
      <ul
        className={`
          mx-auto max-w-6xl flex-wrap
          justify-center sm:justify-end gap-x-0 gap-y-0
          text-[11px] sm:text-[11px]
          ${isMenuOpen ? "flex flex-col w-full bg-[#1e293b]" : "hidden md:flex"}
        `}
      >
        <Link href="/pages/liked" className="w-full xs:w-auto sm:w-auto">
          <li>
            <span className="flex items-center justify-center gap-2 px-5 py-3 hover:bg-[#111827] hover:text-[#F29829] ease-in-out duration-300 cursor-pointer border-b md:border-b-0 md:border-r border-slate-800/60 h-full">
              <BsHeart className="text-[#F29829]" />
              Favoritos
            </span>
          </li>
        </Link>

        <Link href="/pages/enviar-imovel" className="w-full xs:w-auto sm:w-auto">
          <li>
            <span className="flex items-center justify-center gap-2 px-5 py-3 hover:bg-[#111827] hover:text-[#F29829] ease-in-out duration-300 cursor-pointer border-b md:border-b-0 md:border-r border-slate-800/60 h-full">
              <BsHouseAdd className="text-[#F29829]" />
              Enviar Imóvel
            </span>
          </li>
        </Link>

        <Link href="/pages/meus-imoveis" className="w-full xs:w-auto sm:w-auto">
          <li>
            <span className="flex items-center justify-center gap-2 px-5 py-3 hover:bg-[#111827] hover:text-[#F29829] ease-in-out duration-300 cursor-pointer border-b md:border-b-0 md:border-r border-slate-800/60 h-full">
              <BsHouseCheck className="text-[#F29829]" />
              Meus Imóveis
            </span>
          </li>
        </Link>

        <Link href="/pages/meu-perfil" className="w-full xs:w-auto sm:w-auto">
          <li>
            <span className="flex items-center justify-center gap-2 px-5 py-3 hover:bg-[#111827] hover:text-[#F29829] ease-in-out duration-300 cursor-pointer border-b md:border-b-0 md:border-r border-slate-800/60 h-full">
              <BsPerson className="text-[#F29829]" />
              Meu Perfil
            </span>
          </li>
        </Link>

        {clienteNome ? (
          <li className="w-full xs:w-auto sm:w-auto">
            <span className="flex items-center justify-center gap-2 px-5 py-3 bg-[#111827] text-white font-bold select-none border-b md:border-b-0 md:border-r border-slate-800/60 h-full">
              <BsPersonCheck size={14} className="text-[#F29829]" />
              Olá, {clienteNome}
            </span>
          </li>
        ) : (
          <Link href="/cadastro" className="w-full xs:w-auto sm:w-auto">
            <li>
              <span className="flex items-center justify-center gap-2 px-6 py-3 bg-[#F29829] hover:bg-[#111827] text-white font-bold ease-in-out duration-300 cursor-pointer h-full">
                <BsLock />
                Login / Cadastro
              </span>
            </li>
          </Link>
        )}

        {clienteNome && (
          <li className="w-full xs:w-auto sm:w-auto">
            <button
              onClick={handleLogout}
              className="w-full h-full flex items-center justify-center gap-2 px-5 py-3 bg-red-950/40 text-red-400 font-bold hover:bg-red-600 hover:text-white ease-in-out duration-300 cursor-pointer outline-none border-none text-[11px] uppercase tracking-wide"
            >
              <BiLogOut size={14} />
              Sair
            </button>
          </li>
        )}

      </ul>
    </section>
  );
}