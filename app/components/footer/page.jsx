import Link from "next/link"
import {
  BiMap,
  BiPhone,
  BiSolidTime,
  BiRightArrowAlt,
} from "react-icons/bi";

export default function Footer() {
  return (
    <section className="px-6 py-12 bg-black text-white text-sm">

      <div className="flex flex-col md:flex-row flex-wrap justify-center gap-10 md:gap-16">
        <div className="flex-1 min-w-[280px] max-w-sm">
          <h3 className="mb-4 font-bold text-xl text-center md:text-left">SOBRE NÓS</h3>
          <hr className="mb-4 w-1/2 ml-0" />
          <p className="mb-4">Somos uma imobiliária dedicada a ajudar nossos clientes a encontrar o imóvel dos seus sonhos. Com anos de experiência no mercado, oferecemos um serviço personalizado e de alta qualidade.</p>
          <p className="mb-4">CNPJ: 00.000.000/0001-00</p>
        </div>

        <div className="flex-1 min-w-[280px] max-w-sm">
          <h3 className="mb-4 font-bold text-xl text-center md:text-left">LINKS RÁPIDOS</h3>
          <hr className="mb-4 w-1/2 ml-0" />
          <ul className="space-y-2">
            <li className="flex items-center gap-2 hover:font-bold transition ease-in-out duration-300 hover:text-[#F29829]"><BiRightArrowAlt /> <Link href="/">Home</Link></li>
            <li className="flex items-center gap-2 hover:font-bold transition ease-in-out duration-300 hover:text-[#F29829]"><BiRightArrowAlt /> <Link href="/pages/sobre-nos">Sobre Nós</Link></li>
            <li className="flex items-center gap-2 hover:font-bold transition ease-in-out duration-300 hover:text-[#F29829]"><BiRightArrowAlt /> <Link href="/pages/vendas">Vendas</Link></li>
            <li className="flex items-center gap-2 hover:font-bold transition ease-in-out duration-300 hover:text-[#F29829]"><BiRightArrowAlt /> <Link href="/pages/locacao">Locação</Link></li>
            <li className="flex items-center gap-2 hover:font-bold transition ease-in-out duration-300 hover:text-[#F29829]"><BiRightArrowAlt /> <Link href="/pages/consorcio">Consórcio</Link></li>
            <li className="flex items-center gap-2 hover:font-bold transition ease-in-out duration-300 hover:text-[#F29829]"><BiRightArrowAlt /> <Link href="/pages/contato">Contato</Link></li>
          </ul>
        </div>

        <div className="flex-1 min-w-[280px] max-w-sm">
          <h3 className="mb-4 font-bold text-xl text-center md:text-left">CONTATO</h3>
          <hr className="mb-4 w-1/2 ml-0" />
          <p className="mb-4 flex items-center gap-2"><BiMap />Endereço: Rua Exemplo, 123 - Cidade, Estado, CEP</p>
          <p className="mb-4 flex items-center gap-2"><BiPhone /> Telefone: (35) 9 8713-1293</p>
          <p className="mb-4 flex items-center gap-2"><BiSolidTime /> Horário de Funcionamento: Segunda a Sexta, 9h às 18h</p>
          <hr className="mb-4 w-1/2 ml-0" />
          <ul className="space-y-2 my-4">
            <li className="flex items-center gap-2 hover:font-bold transition ease-in-out duration-300 hover:text-[#F29829]"><BiRightArrowAlt /> <Link href="/pages/contato">Fale Conosco</Link></li>
            <li className="flex items-center gap-2 hover:font-bold transition ease-in-out duration-300 hover:text-[#F29829]"><BiRightArrowAlt /> <Link href="/pages/privacy">Política de Privacidade</Link></li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-12">
        <p>&copy; 2026 Alexandria Negócios Imobiliários. Todos os direitos reservados.</p>
        <p>Desenvolvido com tecnologia por <Link href="https://www.rixxer.com.br" target="_blank" className="hover:font-bold transition ease-in-out duration-300 hover:text-[#F29829]">Rixxer</Link></p>
      </div>

    </section>
  )
}