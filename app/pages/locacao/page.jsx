import Head from '../../components/head/page';
import Navbar from '../../components/navbar/page';

export default function Locacao() {
  return (
    <>
      <Head />
      <Navbar />
      <div className='flex p-20'></div>
      <h1 className='text-5xl font-bold text-center'>Locação</h1>
      <p className='text-2xl font-bold text-center'>Página sobre os imóveis para locação</p>
    </>
  );
}