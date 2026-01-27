import Head from '../../components/head/page';
import Navbar from '../../components/navbar/page';

export default function Vendas() {
  return (
    <>
      <Head />
      <Navbar />
      <div className='flex p-20'></div>
      <h1 className='text-5xl font-bold text-center'>Vendas</h1>
      <p className='text-2xl font-bold text-center'>Página sobre as vendas dos imóveis</p>
    </>
  );
}