import Header from '@/app/components/header/page';
import Head from '../../components/head/page';
import Navbar from '../../components/navbar/page';
import Footer from '@/app/components/footer/page';

export default function MeusImoveis() {
  return (
    <>
      <Head />
      <Header />
      <Navbar />
      <div className='flex p-20'></div>
      <h1 className='text-5xl font-bold text-center'>Meus Imóveis</h1>
      <p className='text-2xl font-bold text-center mb-31'>Lista dos imóveis do cliente, caso ele esteja logado no sistema</p>
      <Footer />
    </>
  );
}