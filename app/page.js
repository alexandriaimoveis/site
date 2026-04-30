import Head from "./components/head/page";
import Header from "./components/header/page";
import Navbar from "./components/navbar/page";
import Shorts from "./components/shorts/page";
import Slider from "./components/slider/page";
import AdvancedSearch from "./components/search/page";
import HighLights from "./components/highlights";
import HighLights2 from "./components/highlights2";
import Services from "./components/services/page";
import Footer from "./components/footer/page"
import WhatsAppButton from "./components/whatsapp/page";
export default function Page() {
  return (
    <>
      <Head />
      <Header />
      <Navbar />
      <Slider />
      <AdvancedSearch />
      <Shorts />
      <HighLights />
      <HighLights2 />
      <Services />
      <Footer />
      <WhatsAppButton />
    </>
  );
}
