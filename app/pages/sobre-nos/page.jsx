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
      
      <div className="flex flex-col items-center py-16">
        <h2 className="text-4xl font-bold text-center">Sobre Nós</h2>
        <span className="block mt-2 h-1.5 w-48 bg-[#F29829] rounded-full" />
      </div>

      <div className="flex flex-col items-center pb-16 px-4 max-w-4xl mx-auto text-center">
        AQUI VAI O TEXTO SOBRE A EMPRESA, SUA HISTÓRIA, MISSÃO, VISÃO E VALORES. VOCÊ PODE INCLUIR INFORMAÇÕES SOBRE A EQUIPE, OS SERVIÇOS OFERECIDOS E QUALQUER OUTRO DETALHE QUE DESEJA COMPARTILHAR COM SEUS CLIENTES.
        <br /><br />
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, provident officiis distinctio harum molestiae ad nobis minus voluptates. Nobis temporibus minima velit omnis doloribus ipsum dolorum? Aperiam corrupti minima dicta!
        <br /><br />
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, provident officiis distinctio harum molestiae ad nobis minus voluptates. Nobis temporibus minima velit omnis doloribus ipsum dolorum? Aperiam corrupti minima dicta!
        <br /><br />
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, provident officiis distinctio harum molestiae ad nobis minus voluptates. Nobis temporibus minima velit omnis doloribus ipsum dolorum? Aperiam corrupti minima dicta!
        <br /><br />
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, provident officiis distinctio harum molestiae ad nobis minus voluptates. Nobis temporibus minima velit omnis doloribus ipsum dolorum? Aperiam corrupti minima dicta!
        <br /><br />
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, provident officiis distinctio harum molestiae ad nobis minus voluptates. Nobis temporibus minima velit omnis doloribus ipsum dolorum? Aperiam corrupti minima dicta!
      </div>

      <Footer />
    </>
  );
}