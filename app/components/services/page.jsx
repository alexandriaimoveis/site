import Link from "next/link"
import {
  BsFillHouseFill,
  BsHouseAdd,
  BsHouseCheck,
} from "react-icons/bs";

export default function Services() {
  return (
    <section className="bg-[#F2C894] py-12 text-center">
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-4xl font-bold text-center">Serviços</h2>
        <span className="block mt-2 h-1.5 w-48 bg-[#F29829] rounded-full" />
      </div>
            
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 max-w-4xl mx-auto px-4">

        <div className="flex-1 max-w-md p-10 border border-gray-600 rounded-2xl shadow-sm text-center transition-colors duration-300 hover:bg-black hover:text-white flex flex-col items-center justify-center">
          <BsHouseAdd className="text-4xl mb-4" />
          <h3 className="mb-4">Anunciar um Imóvel</h3>
          <Link href="/" className="pointer border rounded-sm shadow-sm border-gray-600 text-center px-6 py-2 font-bold hover:bg-[#F29829] hover:text-black hover:border-white"> Anunciar</Link>
        </div>

        <div className="flex-1 max-w-md p-10 border border-gray-600 rounded-2xl shadow-sm text-center transition-colors duration-300 hover:bg-black hover:text-white flex flex-col items-center justify-center">
          <BsFillHouseFill className="text-4xl mb-4" />
          <h3 className="mb-4">Financiar um Imóvel</h3>
          <Link href="/" className="pointer border rounded-sm shadow-sm border-gray-600 text-center px-6 py-2 font-bold hover:bg-[#F29829] hover:text-black hover:border-white"> Simular</Link>
        </div>

        <div className="flex-1 max-w-md p-10 border border-gray-600 rounded-2xl shadow-sm text-center transition-colors duration-300 hover:bg-black hover:text-white flex flex-col items-center justify-center">
          <BsHouseCheck className="text-4xl mb-4" />
          <h3 className="mb-4">Comprar um Imóvel</h3>
          <Link href="/" className="pointer border rounded-sm shadow-sm border-gray-600 text-center px-6 py-2 font-bold hover:bg-[#F29829] hover:text-black hover:border-white"> Comprar</Link>
        </div>

      </div>
    </section>
  )
}