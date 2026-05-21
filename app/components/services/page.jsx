import Link from "next/link";

export default function Services() {
  return (
    <section className="bg-[#1e293b] py-20 text-center">
      
      <div className="flex flex-col items-center mb-16 px-4">
        <h2 className="text-4xl font-extrabold text-white tracking-tight">
          Nossos Serviços
        </h2>
        <span className="block mt-3 h-1 w-24 bg-[#F29829] rounded-full" />
        <p className="mt-4 text-slate-300 max-w-xl text-sm md:text-base">
          Encontre o suporte ideal para cada etapa da sua jornada imobiliária em São Lourenço e região.
        </p>
      </div>
            
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto px-6">

        <div className="group bg-[#2d3748] p-8 border border-slate-700 rounded-2xl shadow-lg hover:shadow-2xl hover:border-slate-600 transition-all duration-300 flex flex-col items-center justify-between min-h-[340px]">
          <div className="flex flex-col items-center">
            <div className="p-4 bg-slate-800 text-[#F29829] rounded-full group-hover:bg-[#F29829] group-hover:text-white transition-colors duration-300 mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A4.86 4.86 0 0 0 12 8a4.86 4.86 0 0 0-7.5 2.332V21m14.25H4.5M12 18.75V16.5m0 0V14.25m0 2.25h2.25m-2.25 0H9.75" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#F29829] transition-colors">
              Anunciar Imóvel
            </h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              Quer vender ou alugar? Anuncie conosco e alcance os clientes certos com máxima visibilidade em São Lourenço.
            </p>
          </div>
          <Link 
            href="/pages/enviar-imovel" 
            className="w-full text-center py-3 px-6 font-bold text-sm uppercase tracking-wider text-white border border-slate-600 rounded-xl bg-slate-800 hover:bg-[#F29829] hover:text-white hover:border-[#F29829] transition-all duration-300"
          >
            Anunciar
          </Link>
        </div>

        <div className="group bg-[#2d3748] p-8 border border-slate-700 rounded-2xl shadow-lg hover:shadow-2xl hover:border-slate-600 transition-all duration-300 flex flex-col items-center justify-between min-h-[340px]">
          <div className="flex flex-col items-center">
            <div className="p-4 bg-slate-800 text-[#F29829] rounded-full group-hover:bg-[#F29829] group-hover:text-white transition-colors duration-300 mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#F29829] transition-colors">
              Comprar Imóvel
            </h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              Explore nossa seleção exclusiva de casas, apartamentos e terrenos prontos para você morar ou investir.
            </p>
          </div>
          <Link 
            href="/pages/vendas" 
            className="w-full text-center py-3 px-6 font-bold text-sm uppercase tracking-wider text-white border border-slate-600 rounded-xl bg-slate-800 hover:bg-[#F29829] hover:text-white hover:border-[#F29829] transition-all duration-300"
          >
            Comprar
          </Link>
        </div>

      </div>
    </section>
  );
}