import Link from "next/link";
import { BsFacebook, BsGoogle, BsInstagram, BsYoutube } from "react-icons/bs";

export default function Navbar() {
  return (
    <header className="border-b border-gray-200">
      <section
        className="
          mx-auto flex max-w-4xl flex-col items-center gap-3
          py-2 px-2 text-xs font-bold
          sm:flex-row sm:items-center sm:justify-between
        "
      >
        {/* MENU */}
        <nav>
          <ul
            className="
              flex flex-wrap justify-center gap-x-4 gap-y-1
              sm:flex-nowrap sm:gap-x-6
            "
          >
            <li>
              <Link
                className="hover:text-[#F29829] ease-in-out duration-300"
                href="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-[#F29829] ease-in-out duration-300"
                href="/pages/sobre-nos"
              >
                Sobre Nós
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-[#F29829] ease-in-out duration-300"
                href="/pages/vendas"
              >
                Vendas
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-[#F29829] ease-in-out duration-300"
                href="/pages/locacao"
              >
                Locação
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-[#F29829] ease-in-out duration-300"
                href="/pages/consorcio"
              >
                Consórcio
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-[#F29829] ease-in-out duration-300"
                href="/pages/contato"
              >
                Contato
              </Link>
            </li>
            <li>
              <Link
                className="p-2 bg-[#F29829] text-white hover:text-black ease-in-out duration-300"
                href="/pages/sao-lourenco"
              >
                Conheça São Lourenço
              </Link>
            </li>
          </ul>
        </nav>

        {/* REDES SOCIAIS */}
        <div className="flex items-center justify-center space-x-2">
          <a
            href="https://facebook.com"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 text-xs text-gray-600 hover:bg-[#F29829] hover:text-white ease-in-out duration-300"
            aria-label="Facebook"
          >
            <BsFacebook size={12} />
          </a>
          <a
            href="https://instagram.com"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 text-xs text-gray-600 hover:bg-[#F29829] hover:text-white ease-in-out duration-300"
            aria-label="Instagram"
          >
            <BsInstagram size={12} />
          </a>
          <a
            href="https://google.com"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 text-xs text-gray-600 hover:bg-[#F29829] hover:text-white ease-in-out duration-300"
            aria-label="Google"
          >
            <BsGoogle size={12} />
          </a>
          <a
            href="https://youtube.com"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 text-xs text-gray-600 hover:bg-[#F29829] hover:text-white ease-in-out duration-300"
            aria-label="Youtube"
          >
            <BsYoutube size={12} />
          </a>
        </div>
      </section>
    </header>
  );
}
