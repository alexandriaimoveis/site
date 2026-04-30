import Header from '@/app/components/header/page';
import Head from '../../components/head/page';
import Navbar from '../../components/navbar/page';
import Footer from '@/app/components/footer/page';

export default function SobreNos() {
  return (
    <>
      <Head />
      <Header />
      <Navbar />
      
      <div className="flex flex-col py-16 max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-bold">Quem somos nós?</h2>
        <span className="block mt-2 h-1.5 w-48 bg-[#F29829] rounded-full" />
      </div>

      <div className="flex flex-col pb-16 px-4 max-w-4xl mx-auto text-justify">
        <p className='mb-8'>Meu nome é Alexandre, o nome do meu pai também é Alexandre e juntos, somos os fundadores da Alexandria Negócios Imobiliários. O nome da imobiliária foi inspirado na cidade de Alexandria fundada em 331 a.C. por Alexandre o Grande. O objetivo de Alexandre naquela época era criar um grande porto comercial e centro cultural que conectasse o mundo grego com o Egito e outras regiões do Oriente. E baseado nessa ideia é esse conceito que trazemos para nossa imobiliária, conectar pessoas a imóveis, sonhos a realização, e efetuar bons negócios aos nossos clientes.</p>
        <p className='font-bold text-xl mb-8'>O que buscamos proporcionar aos nossos clientes?</p>
        <p className='mb-8'>Um dos monumentos mais famosos da cidade de Alexandria foi o Farol de Alexandria, construído para ajudar os navios a encontrar o porto durante a noite ou em dias de neblina. E esse farol se tornou o símbolo da nossa imobiliária, inspirado nele, buscamos proporcionar aos nossos clientes uma boa orientação, conduzi-los de forma acolhedora, transparente, profissional, mantendo sempre a base do que preservamos, um atendimento familiar, da nossa família, para a sua família.</p>
        <p>E nós, estamos localizados no endereço Praça Doutor Ismael de Souza, número 11, loja 03 no bairro da Estação.</p>
        <p>Venha nos fazer uma visita, apreciar um bom café, e conhecer o que temos de melhor para oferecer!</p>
      </div>

      <Footer />
    </>
  );
}