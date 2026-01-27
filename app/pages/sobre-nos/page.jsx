import Head from '../../components/head/page';
import Navbar from '../../components/navbar/page';

export default function SobreNos() {
  return (
    <>
      <Head />
      <Navbar />
      <div className='flex p-20'></div>
      <h1 className='text-5xl font-bold text-center'>Sobre Nós</h1>
      <p className='text-2xl font-bold text-center'>Página sobre a empresa</p>
    </>
  );
}