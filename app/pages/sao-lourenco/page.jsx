import Header from '@/app/components/header/page';
import Head from '../../components/head/page';
import Navbar from '../../components/navbar/page';
import Footer from '../../components/footer/page';

export default function SaoLourenco() {
  return (
    <>
      <Head />
      <Header />
      <Navbar />

      <div className="flex flex-col items-center py-16">
        <h2 className="text-4xl font-bold text-center">Conheça São Lourenço</h2>
        <p className="text-xl font-bold text-center">As belezas de nossa cidade</p>
        <span className="block mt-2 h-1.5 w-48 bg-[#F29829] rounded-full" />
      </div>

      <Footer />
    </>
  );
}