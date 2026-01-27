import Link from "next/link";

export default function Navbar() {
  return (
    <section className="flex justify-center py-4 px-6 font-bold shadow-md">
      <nav>
        <ul className="flex space-x-16">
          <li>
            <Link className="flex items-center gap-2 hover:underline" href="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="flex items-center gap-2 hover:underline" href="/pages/sobre-nos">
              Sobre Nós
            </Link>
          </li>
          <li>
            <Link className="flex items-center gap-2 hover:underline" href="/pages/vendas">
              Vendas
            </Link>
          </li>
          <li>
            <Link className="flex items-center gap-2 hover:underline" href="/pages/locacao">
              Locação
            </Link>
          </li>
          <li>
            <Link className="flex items-center gap-2 hover:underline" href="/pages/consorcio">
              Consórcio
            </Link>
          </li>
          <li>
            <Link className="flex items-center gap-2 hover:underline" href="/pages/contato">
              Contato
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  );
}
