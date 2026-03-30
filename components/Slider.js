'use client';

import Image from 'next/image';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function Slider({ slides }) {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      loop
      className="block w-full max-w-full overflow-hidden rounded-4xl border border-white/10"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.image}>
          <div className="relative min-h-105 w-full overflow-hidden bg-slate-950 sm:min-h-130">
            <Image
              src={`/${slide.image}`}
              alt={slide.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 640px) calc(100vw - 2rem), (max-width: 1280px) calc(100vw - 3rem), 1280px"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.92)_0%,rgba(2,6,23,0.65)_45%,rgba(2,6,23,0.12)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.22),transparent_28%)]" />

            <div className="relative z-10 flex min-h-105 w-full max-w-3xl flex-col justify-end gap-5 px-6 py-10 sm:min-h-130 sm:px-10 sm:py-14">
              <p className="text-xs font-semibold uppercase tracking-[0.45em] text-cyan-300/80">
                {slide.eyebrow}
              </p>
              <h2 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {slide.title}
              </h2>
              <p className="max-w-xl text-sm leading-7 text-slate-200 sm:text-base">
                {slide.description}
              </p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Slider;
