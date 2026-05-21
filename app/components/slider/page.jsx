"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/app/lib/supabase";

export default function Slider() {
  const [imoveis, setImoveis] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSliderImoveis() {
      const { data, error } = await supabase
        .from("imoveis")
        .select(`
          id, titulo,
          imovel_imagens (url, capa)
        `)
        .eq("destaque", true)
        .eq("status", "disponivel")
        .limit(5);

      if (!error && data) {
        const formatados = data.map((imovel) => {
          const capa = imovel.imovel_imagens?.find((img) => img.capa) || imovel.imovel_imagens?.[0];
          return {
            id: imovel.id,
            titulo: imovel.titulo,
            img_url: capa?.url || "/fallback.jpg",
          };
        });
        setImoveis(formatados);
      }
      setLoading(false);
    }

    fetchSliderImoveis();
  }, []);

  if (loading) return <div className="w-full h-[650px] bg-slate-900 animate-pulse" />;

  return (
    <div className="w-full h-[600px] md:h-[650px] relative z-10">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        effect="fade" // Troca o slide com um fade elegante
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation
        pagination={{ clickable: true }}
        speed={1000}
        grabCursor={true}
        className="h-full premium-swiper"
      >
        {imoveis.map((imovel) => (
          <SwiperSlide key={imovel.id}>
            <div className="relative h-full w-full">
              <Image
                src={imovel.img_url}
                alt={imovel.titulo}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/90 via-black/20 to-transparent" />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <div className="max-w-4xl">
                  <span className="text-[#F29829] font-bold uppercase tracking-[0.3em] text-xs md:text-sm mb-4 block animate-fadeInUp drop-shadow-md">
                    Destaque Exclusivo
                  </span>
                  
                  <h1 className="text-white text-3xl md:text-6xl font-extrabold mb-8 tracking-tight leading-tight animate-fadeInUp delay-100 drop-shadow-md">
                    {imovel.titulo}
                  </h1>

                  <Link
                    href={`/imovel/${imovel.id}`}
                    className="inline-block bg-[#F29829] hover:bg-white text-white hover:text-[#1e293b] font-bold py-4 px-10 rounded-xl transition-all duration-300 shadow-xl uppercase text-sm tracking-widest animate-fadeInUp delay-200"
                  >
                    Ver Detalhes do Imóvel
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .premium-swiper .swiper-button-next,
        .premium-swiper .swiper-button-prev {
          color: #F29829 !important;
          background: rgba(255, 255, 255, 0.1);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          backdrop-filter: blur(4px);
        }
        .premium-swiper .swiper-button-next:after,
        .premium-swiper .swiper-button-prev:after {
          font-size: 20px !important;
          font-weight: bold;
        }
        .premium-swiper .swiper-pagination-bullet-active {
          background: #F29829 !important;
          width: 25px;
          border-radius: 5px;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease forwards; }
        .delay-100 { animation-delay: 0.2s; }
        .delay-200 { animation-delay: 0.4s; }
      `}</style>
    </div>
  );
}