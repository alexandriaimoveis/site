"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

export default function Slider() {
  return (
    <div className="w-full h-[500px]">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        slidesPerView={1}
        loop={true}
        spaceBetween={0}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        navigation
        pagination={{ clickable: true }}
        speed={800}
        grabCursor={true}
        className="h-full"
      >
        <SwiperSlide>
          <div className="relative h-full bg-red-500">
            <Image
              src="/imoveis1.png"
              alt="Imóvel 1"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative h-full bg-red-500">
            <Image
              src="/imoveis2.webp"
              alt="Imóvel 2"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative h-full bg-red-500">
            <Image
              src="/imoveis3.jpg"
              alt="Imóvel 3"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
        </SwiperSlide>

      </Swiper>
    </div>
  );
}
