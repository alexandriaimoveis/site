"use client";

import Link from "next/link";
import { BsFacebook, BsInstagram } from "react-icons/bs";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-slate-100 shadow-sm transition-all duration-300">
      <section
        className="
          mx-auto flex max-w-6xl flex-col items-center gap-4
          py-4 px-6 text-xs font-bold tracking-wider uppercase
          sm:flex-row sm:items-center sm:justify-between
        "
      >
        <nav className="w-full sm:w-auto">
          <ul
            className="
              flex flex-wrap items-center justify-center gap-x-6 gap-y-2
              sm:flex-nowrap sm:gap-x-8
            "
          >
            <li>
              <Link
                className="text-slate-600 hover:text-[#F29829] transition-colors duration-300 relative py-1 block group"
                href="/"
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F29829] transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
            <li>
              <Link
                className="text-slate-600 hover:text-[#F29829] transition-colors duration-300 relative py-1 block group"
                href="/pages/sobre-nos"
              >
                Sobre Nós
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F29829] transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
            <li>
              <Link
                className="text-slate-600 hover:text-[#F29829] transition-colors duration-300 relative py-1 block group"
                href="/pages/vendas"
              >
                Vendas
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F29829] transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
            <li>
              <Link
                className="text-slate-600 hover:text-[#F29829] transition-colors duration-300 relative py-1 block group"
                href="/pages/locacao"
              >
                Locação
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F29829] transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
            <li>
              <Link
                className="text-slate-600 hover:text-[#F29829] transition-colors duration-300 relative py-1 block group"
                href="/pages/contato"
              >
                Contato
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F29829] transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
            
            <li className="mt-1 sm:mt-0">
              <Link
                className="inline-block px-5 py-2.5 bg-[#F29829] text-white hover:bg-[#1e293b] rounded-full text-[11px] tracking-widest font-extrabold shadow-sm hover:shadow transition-all duration-300"
                href="/pages/sao-lourenco"
              >
                Conheça São Lourenço
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center justify-center space-x-3">
          <a
            href="https://www.facebook.com/profile.php?id=61579537775246" 
            target="_blank"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-[#F29829] hover:text-white hover:border-[#F29829] shadow-sm transition-all duration-300"
            aria-label="Facebook"
          >
            <BsFacebook size={13} />
          </a>
          <a
            href="https://www.instagram.com/alexandrianegociosimobiliarios/" 
            target="_blank"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-[#F29829] hover:text-white hover:border-[#F29829] shadow-sm transition-all duration-300"
            aria-label="Instagram"
          >
            <BsInstagram size={13} />
          </a>
        </div>
      </section>
    </header>
  );
}