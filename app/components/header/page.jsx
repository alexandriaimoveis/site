import Image from "next/image";
import { BsEnvelope, BsWhatsapp, BsPinMapFill } from "react-icons/bs";

export default function Header() {
  return (
    <section className="w-full bg-[#F2F2F2]">
      <div
        className="
          mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 py-3
          sm:flex-row sm:items-center sm:justify-between
        "
      >
        {/* Logo */}
        <div className="flex items-center justify-center sm:justify-start">
          <Image
            src="/logo.png"
            alt="Alexandria"
            width={100}
            height={100}
            className="h-16 w-auto"
          />
        </div>

        {/* Contatos */}
        <div
          className="
            flex flex-col items-center gap-3 text-xs
            sm:flex-row sm:flex-wrap sm:items-center sm:gap-6
          "
        >
          <div className="flex items-center gap-2">
            <span className="text-lg text-[#F29829]">
              <BsWhatsapp />
            </span>
            <div className="leading-tight text-center sm:text-left">
              <p className="font-semibold">Contato</p>
              <p className="text-black">+55 (35) 9 9999-9999</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-lg text-[#F29829]">
              <BsPinMapFill />
            </span>
            <div className="leading-tight text-center sm:text-left">
              <p className="font-semibold">São Lourenço</p>
              <p className="text-black">Sul de Minas Gerais</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-lg text-[#F29829]">
              <BsEnvelope />
            </span>
            <div className="leading-tight text-center sm:text-left">
              <p className="font-semibold">E-mail</p>
              <p className="text-black">alexandriaimoveis@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
