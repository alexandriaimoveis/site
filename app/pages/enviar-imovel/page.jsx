import Header from '@/app/components/header/page';
import Head from '../../components/head/page';
import Navbar from '../../components/navbar/page';
import Footer from '@/app/components/footer/page';

export default function EnviarImovel() {
  return (
    <>
      <Head />
      <Header />
      <Navbar />
      <div className='flex p-20'></div>
      <h1 className='text-5xl font-bold text-center'>Enviar Imóvel</h1>
      <p className='text-2xl font-bold text-center mb-31'>Página para envio de imóveis pelo cliente</p>
      <Footer />
    </>
  );
}