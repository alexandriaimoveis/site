import Header from '@/app/components/header/page';
import Head from '../../components/head/page';
import Navbar from '../../components/navbar/page';
import Footer from '../../components/footer/page';

export default function Locacao() {
  return (
    <>
      <Head />
      <Header />
      <Navbar />
      <div className='flex p-20'></div>
      <h1 className='text-5xl font-bold text-center'>Locação</h1>
      <p className='text-2xl font-bold text-center mb-31'>Página sobre os imóveis para locação</p>
      <Footer />
    </>
  );
}