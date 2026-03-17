'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import React from 'react'


const Slider = ({images}) => {
  
  return (
    <Swiper modules={[Navigation, Pagination, Autoplay]}
      navigation pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }} loop>
      {images.map((src, i) => (
        <SwiperSlide key={i}>
          <div className='relative'>
            <img src={`/${src}`} className='w-full h-[70vh] object-cover' alt={`Slide ${i}`} />
            <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent'></div>
            <div className='absolute bottom-8 left-8 text-white'>
              <h2 className='text-4xl font-bold mb-2'>Featured Movie {i+1}</h2>
              <p className='text-lg'>Discover amazing films</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}


export default Slider
