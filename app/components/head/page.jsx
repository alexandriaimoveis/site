import {
  BsHeart,
  BsHouseAdd,
  BsHouseCheck,
  BsLock,
  BsPerson,
} from "react-icons/bs";

import Link from "next/link";

export default function Head() {
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

        <Link href="/pages/login">
          <li className="w-full xs:w-auto sm:w-auto">
            <span className="flex items-center justify-center gap-2 px-4 py-2 bg-[#F29829] hover:bg-[#1F3445] hover:text-white ease-in-out duration-300 cursor-pointer">
              <BsLock />
              Login / Cadastro&nbsp;
            </span>
          </li>
        </Link>

      </ul>
    </section>
  );
}
