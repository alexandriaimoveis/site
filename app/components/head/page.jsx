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
import Link from "next/link";

export default function Head() {
  const [clienteNome, setClienteNome] = useState("");

  useEffect(() => {
    const nomeSalvo = localStorage.getItem("alexandria_cliente_nome");
    if (nomeSalvo) {
      const primeiroNome = nomeSalvo.split(" ")[0];
      
      setTimeout(() => {
        setClienteNome(primeiroNome);
      }, 0);
    }
  }, []);

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

        <Link href={clienteNome ? "/pages/meu-perfil" : "/cadastro"}>
          <li className="w-full xs:w-auto sm:w-auto">
            <span className="flex items-center justify-center gap-2 px-4 py-2 bg-[#F29829] hover:bg-[#1F3445] hover:text-white ease-in-out duration-300 cursor-pointer">
              {clienteNome ? (
                <>
                  <BsPersonCheck size={14} />
                  Olá, {clienteNome}&nbsp;
                </>
              ) : (
                <>
                  <BsLock />
                  Login / Cadastro&nbsp;
                </>
              )}
            </span>
          </li>
        </Link>

      </ul>
    </section>
  );
}