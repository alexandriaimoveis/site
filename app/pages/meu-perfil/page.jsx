import Header from '@/app/components/header/page';
import Head from '../../components/head/page';
import Navbar from '../../components/navbar/page';
import Footer from '@/app/components/footer/page';

export default function MeuPerfil() {
  return (
    <>
      <Head />
      <Header />
      <Navbar />
      <div className='flex p-20'></div>
      <h1 className='text-5xl font-bold text-center'>Meu Perfil</h1>
      <p className='text-2xl font-bold text-center mb-31'>Informações do perfil do cliente no site</p>
      <Footer />
    </>
  );
}