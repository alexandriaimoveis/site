import Link from "next/link"
import {
  BiMap,
  BiPhone,
  BiSolidTime,
  BiRightArrowAlt,
} from "react-icons/bi";

export default function Footer() {
  return (
    <section className="px-6 pt-16 pb-8 bg-[#111827] text-slate-400 text-sm border-t border-slate-800/50">

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row flex-wrap justify-center gap-10 md:gap-16">
        
        <div className="flex-1 min-w-[280px] max-w-sm">
          <h3 className="mb-2 font-bold text-xl text-center md:text-left text-white tracking-wide">QUEM SOMOS NÓS?</h3>
          <span className="block mb-6 h-0.5 w-20 bg-[#F29829] mx-auto md:ml-0" />
          <p className="mb-4 text-slate-400 leading-relaxed text-justify md:text-left">
            Meu nome é Alexandre, o nome do meu pai também é Alexandre e juntos, somos os fundadores da Alexandria Negócios Imobiliários. O nome da imobiliária foi inspirado na cidade de Alexandria fundada em 331 a.C. por Alexandre o Grande. O objetivo de Alexandre naquela época era criar um grande porto comercial e centro cultural que conectasse o mundo grego com o Egito e outras regiões do Oriente. E baseado nessa ideia é esse conceito que trazemos para nossa imobiliária, conectar pessoas a imóveis, sonhos a realização, e efetuar bons negócios aos nossos clientes.
          </p>
        </div>

        <div className="flex-1 min-w-[280px] max-w-sm">
          <h3 className="mb-2 font-bold text-xl text-center md:text-left text-white tracking-wide">LINKS RÁPIDOS</h3>
          <span className="block mb-6 h-0.5 w-20 bg-[#F29829] mx-auto md:ml-0" />
          <ul className="space-y-3">
            <li className="flex items-center gap-2 transition ease-in-out duration-300 hover:text-[#F29829] text-slate-300">
              <BiRightArrowAlt className="text-[#F29829]" /> <Link href="/">Home</Link>
            </li>
            <li className="flex items-center gap-2 transition ease-in-out duration-300 hover:text-[#F29829] text-slate-300">
              <BiRightArrowAlt className="text-[#F29829]" /> <Link href="/pages/sobre-nos">Sobre Nós</Link>
            </li>
            <li className="flex items-center gap-2 transition ease-in-out duration-300 hover:text-[#F29829] text-slate-300">
              <BiRightArrowAlt className="text-[#F29829]" /> <Link href="/pages/vendas">Vendas</Link>
            </li>
            <li className="flex items-center gap-2 transition ease-in-out duration-300 hover:text-[#F29829] text-slate-300">
              <BiRightArrowAlt className="text-[#F29829]" /> <Link href="/pages/locacao">Locação</Link>
            </li>
            <li className="flex items-center gap-2 transition ease-in-out duration-300 hover:text-[#F29829] text-slate-300">
              <BiRightArrowAlt className="text-[#F29829]" /> <Link href="/pages/contato">Contato</Link>
            </li>
          </ul>
        </div>

        <div className="flex-1 min-w-[280px] max-w-sm">
          <h3 className="mb-2 font-bold text-xl text-center md:text-left text-white tracking-wide">CONTATO</h3>
          <span className="block mb-6 h-0.5 w-20 bg-[#F29829] mx-auto md:ml-0" />
          
          <div className="space-y-4 text-slate-300">
            <p className="flex items-start gap-2.5 leading-relaxed">
              <BiMap className="text-[#F29829] text-lg shrink-0 mt-0.5" />
              <span><strong>Endereço:</strong> Praça Doutor Ismael de Souza, nº 11, loja 03 - Bairro Estação</span>
            </p>
            <p className="flex items-center gap-2.5">
              <BiPhone className="text-[#F29829] text-lg shrink-0" /> 
              <span><strong>Telefone:</strong> (35) 9 8713-1293</span>
            </p>
            <p className="flex items-start gap-2.5 leading-relaxed">
              <BiSolidTime className="text-[#F29829] text-lg shrink-0 mt-0.5" /> 
              <span><strong>Horário de Funcionamento:</strong> Segunda a Sexta, 9h às 18h</span>
            </p>
          </div>

          <span className="block my-6 h-px w-full bg-slate-800/60" />
          
          <ul className="space-y-3">
            <li className="flex items-center gap-2 transition ease-in-out duration-300 hover:text-[#F29829] text-slate-300">
              <BiRightArrowAlt className="text-[#F29829]" /> <Link href="/pages/contato">Fale Conosco</Link>
            </li>
            <li className="flex items-center gap-2 transition ease-in-out duration-300 hover:text-[#F29829] text-slate-300">
              <BiRightArrowAlt className="text-[#F29829]" /> <Link href="/pages/privacy">Política de Privacidade</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto border-t border-slate-800/60 mt-16 pt-8 text-center text-xs text-slate-500 space-y-1">
        <p>&copy; {new Date().getFullYear()} Alexandria Negócios Imobiliários. Todos os direitos reservados.</p>
        <p>
          Desenvolvido com tecnologia por{" "}
          <Link href="https://www.rixxer.com.br" target="_blank" className="hover:text-[#F29829] transition ease-in-out duration-300 font-medium">
            Rixxer
          </Link>
        </p>
      </div>

    </section>
  )
}