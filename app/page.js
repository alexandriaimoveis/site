import Head from "./components/head/page";
import Navbar from "./components/navbar/page";
import Shorts from "./components/shorts/page";
import Slider from "./components/slider/page";

export default function Page() {
  return (
    <>
      <Head />
      <Navbar />
      <Slider />
      <Shorts />
    </>
  );
}
