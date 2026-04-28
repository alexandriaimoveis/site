import Image from 'next/image'
import { BsInstagram, BsFacebook } from "react-icons/bs"
import Link from "next/link"

export default function Team() {
  return (
    <section className="p-12 bg-gray-100">
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-4xl font-bold text-center">Nossa Equipe</h2>
        <span className="block mt-2 h-1.5 w-48 bg-[#F29829] rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center gap-6 max-w-6xl mx-auto">
        <div className="w-full max-w-sm border border-gray-400 rounded-3xl shadow-sm text-center flex flex-col items-center overflow-hidden">
          <div className="relative w-full mb-4">
            <Image
              src="/alexandre.jpg"
              alt="Alexandre"
              width={400}
              height={400}
              className="rounded-t-3xl w-full transition-transform duration-300 group-hover:scale-105"
            />
            <span className="absolute top-3 right-3 bg-[#F29829] text-sm px-3 py-1 rounded-full">
              Corretor
            </span>
          </div>
          <h3 className="font-bold">Alexandre (Lee)</h3>
          <p className="italic">Corretor de Imóveis - CRECI 00000-00</p>

          <ul className="flex flex-wrap justify-center gap-2 mt-2 text-sm mb-2">
            <Link href="https://www.instagram.com/" target="_blank" className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm hover:bg-[#F29829] hover:text-black transition-colors duration-300"><BsInstagram /> @alexandre_corretor</Link>
            <Link href="https://www.facebook.com/" target="_blank" className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm hover:bg-[#F29829] hover:text-black transition-colors duration-300"><BsFacebook /> Alexandre Corretor</Link>
          </ul>
        </div>

        <div className="w-full max-w-sm border border-gray-400 rounded-3xl shadow-sm text-center flex flex-col items-center overflow-hidden">
          <div className="relative w-full mb-4">
            <Image
              src="/alexandre2.jpg"
              alt="Alexandre"
              width={400}
              height={400}
              className="rounded-t-3xl w-full transition-transform duration-300 group-hover:scale-105"
            />
            <span className="absolute top-3 right-3 bg-[#F29829] text-sm px-3 py-1 rounded-full">
              Corretor
            </span>
          </div>
          <h3 className="font-bold">Alexandre</h3>
          <p className="italic">Corretor de Imóveis - CRECI 00000-00</p>

          <ul className="flex flex-wrap justify-center gap-2 mt-2 text-sm mb-2">
            <Link href="https://www.instagram.com/" target="_blank" className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm hover:bg-[#F29829] hover:text-black transition-colors duration-300"><BsInstagram /> @alexandre_corretor</Link>
            <Link href="https://www.facebook.com/" target="_blank" className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm hover:bg-[#F29829] hover:text-black transition-colors duration-300"><BsFacebook /> Alexandre Corretor</Link>
          </ul>

        </div>

      </div>
    </section>
  )
}