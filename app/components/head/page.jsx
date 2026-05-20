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
    const nomeSalvo = localStorage.getItem("alexandria_cliente_name"); // Fallback se usar padrão inglês ou o seu:
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
    <section
      className="shadow-md"
      style={{
        backgroundColor: "#F2C894",
        color: "#000000",
        fontWeight: "600",
      }}
    >
      <ul
        className="
          mx-auto flex max-w-6xl flex-wrap
          justify-center gap-x-0 gap-y-1 text-[11px]
          sm:text-xs
        "
      >
        <Link href="/pages/liked">
          <li className="w-full xs:w-auto sm:w-auto">
            <span className="flex items-center justify-center gap-2 px-4 py-2 hover:bg-[#1F3445] hover:text-white ease-in-out duration-300 cursor-pointer">
              <BsHeart />
              Favoritos&nbsp;
            </span>
          </li>
        </Link>

        <Link href="/pages/enviar-imovel">
          <li className="w-full xs:w-auto sm:w-auto">
            <span className="flex items-center justify-center gap-2 px-4 py-2 hover:bg-[#1F3445] hover:text-white ease-in-out duration-300 cursor-pointer">
              <BsHouseAdd />
              Enviar Imóvel&nbsp;
            </span>
          </li>
        </Link>

        <Link href="/pages/meus-imoveis">
          <li className="w-full xs:w-auto sm:w-auto">
            <span className="flex items-center justify-center gap-2 px-4 py-2 hover:bg-[#1F3445] hover:text-white ease-in-out duration-300 cursor-pointer">
              <BsHouseCheck />
              Meus Imóveis&nbsp;
            </span>
          </li>
        </Link>

        <Link href="/pages/meu-perfil">
          <li className="w-full xs:w-auto sm:w-auto">
            <span className="flex items-center justify-center gap-2 px-4 py-2 hover:bg-[#1F3445] hover:text-white ease-in-out duration-300 cursor-pointer">
              <BsPerson />
              Meu Perfil&nbsp;
            </span>
          </li>
        </Link>

        {clienteNome ? (
          <li className="w-full xs:w-auto sm:w-auto">
            <span className="flex items-center justify-center gap-2 px-4 py-2 bg-[#1F3445] text-white select-none">
              <BsPersonCheck size={14} className="text-[#F29829]" />
              Olá, {clienteNome}&nbsp;
            </span>
          </li>
        ) : (
          <Link href="/cadastro">
            <li className="w-full xs:w-auto sm:w-auto">
              <span className="flex items-center justify-center gap-2 px-4 py-2 bg-[#F29829] hover:bg-[#1F3445] hover:text-white ease-in-out duration-300 cursor-pointer text-white">
                <BsLock />
                Login / Cadastro&nbsp;
              </span>
            </li>
          </Link>
        )}

        {clienteNome && (
          <li className="w-full xs:w-auto sm:w-auto">
            <button
              onClick={handleLogout}
              className="w-full h-full flex items-center justify-center gap-1 px-4 py-2 bg-red-600 text-white font-bold hover:bg-red-800 ease-in-out duration-300 cursor-pointer outline-none border-none text-[11px] sm:text-xs"
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