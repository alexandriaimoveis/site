import Head from "./components/head/page";
import Header from "./components/header/page";
import Navbar from "./components/navbar/page";
import RealEstate from "./components/realestate/page";
import Shorts from "./components/shorts/page";
import Slider from "./components/slider/page";
import AdvancedSearch from "./components/search/page";

export default function Page() {
  return (
    <>
      <Head />
      <Header />
      <Navbar />
      <Slider />
      <AdvancedSearch />
      <Shorts />
      <RealEstate />
    </>
  );
}
