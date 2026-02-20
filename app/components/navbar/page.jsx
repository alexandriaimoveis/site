import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="shadow-md">
      <section className="flex items-center justify-center gap-24 py-2 px-2 font-bold max-w-6xl mx-auto">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Alexandria"
            width={100}
            height={100}
            className="h-16 w-auto"
          />
        </Link>

        <nav>
          <ul className="flex space-x-8 text-sm">
            <li>
              <Link className="hover:underline" href="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/pages/sobre-nos">
                Sobre Nós
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/pages/vendas">
                Vendas
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/pages/locacao">
                Locação
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/pages/consorcio">
                Consórcio
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/pages/contato">
                Contato
              </Link>
            </li>
          </ul>
        </nav>
      </section>
    </header>
  );
}
