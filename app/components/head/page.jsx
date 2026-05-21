"use client";
import { useState, useEffect } from "react";
import {
  BsHeart,
  BsHouseAdd,
  BsHouseCheck,
  BsLock,
  BsPerson,
  BsPersonCheck,
} from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Head() {
  const [clienteNome, setClienteNome] = useState("");
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
    // Transmutado para um fundo grafite escuro premium com borda sutil inferior
    <section className="bg-[#1e293b] text-slate-200 text-[11px] font-semibold tracking-wide uppercase border-b border-slate-800">
      <ul
        className="
          mx-auto flex max-w-6xl flex-wrap
          justify-center sm:justify-end gap-x-0 gap-y-0
          text-[11px] sm:text-[11px]
        "
      >
        <Link href="/pages/liked" className="w-full xs:w-auto sm:w-auto">
          <li>
            <span className="flex items-center justify-center gap-2 px-5 py-3 hover:bg-[#111827] hover:text-[#F29829] ease-in-out duration-300 cursor-pointer border-r border-slate-800/60 h-full">
              <BsHeart className="text-[#F29829]" />
              Favoritos
            </span>
          </li>
        </Link>

        <Link href="/pages/enviar-imovel" className="w-full xs:w-auto sm:w-auto">
          <li>
            <span className="flex items-center justify-center gap-2 px-5 py-3 hover:bg-[#111827] hover:text-[#F29829] ease-in-out duration-300 cursor-pointer border-r border-slate-800/60 h-full">
              <BsHouseAdd className="text-[#F29829]" />
              Enviar Imóvel
            </span>
          </li>
        </Link>

        <Link href="/pages/meus-imoveis" className="w-full xs:w-auto sm:w-auto">
          <li>
            <span className="flex items-center justify-center gap-2 px-5 py-3 hover:bg-[#111827] hover:text-[#F29829] ease-in-out duration-300 cursor-pointer border-r border-slate-800/60 h-full">
              <BsHouseCheck className="text-[#F29829]" />
              Meus Imóveis
            </span>
          </li>
        </Link>

        <Link href="/pages/meu-perfil" className="w-full xs:w-auto sm:w-auto">
          <li>
            <span className="flex items-center justify-center gap-2 px-5 py-3 hover:bg-[#111827] hover:text-[#F29829] ease-in-out duration-300 cursor-pointer border-r border-slate-800/60 h-full">
              <BsPerson className="text-[#F29829]" />
              Meu Perfil
            </span>
          </li>
        </Link>

        {clienteNome ? (
          <li className="w-full xs:w-auto sm:w-auto">
            {/* Bloco de boas-vindas sofisticado */}
            <span className="flex items-center justify-center gap-2 px-5 py-3 bg-[#111827] text-white font-bold select-none border-r border-slate-800/60 h-full">
              <BsPersonCheck size={14} className="text-[#F29829]" />
              Olá, {clienteNome}
            </span>
          </li>
        ) : (
          <Link href="/cadastro" className="w-full xs:w-auto sm:w-auto">
            <li>
              {/* Botão de Login usando seu ouro institucional equilibrado */}
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
              // Botão de sair refinado sem aquele vermelho gritante
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