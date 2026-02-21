import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const HomeSlider=()=>{

    return(<div>
          
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          autoplay={{ delay: 3500 }}
          pagination={{ clickable: true }}
          className="h-full w-full"
        >
          <SwiperSlide>
            <div className="relative h-full w-full bg-black flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070" 
                className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale"
                alt="Pizza"
              />
              <div className="relative z-10 text-center">
                <h1 className="text-white text-6xl md:text-9xl font-black uppercase italic drop-shadow-lg">PIZZA</h1>
                <button className="mt-6 border-2 border-white text-white px-8 py-3 font-bold hover:bg-white hover:text-black transition">BROWSE MENU</button>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="relative h-full w-full bg-zinc-900 flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=2070" 
                className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale"
                alt="Burger"
              />
              <div className="relative z-10 text-center">
                <h1 className="text-white text-6xl md:text-9xl font-black uppercase italic drop-shadow-lg">BURGER</h1>
                <button className="mt-6 border-2 border-white text-white px-8 py-3 font-bold hover:bg-white hover:text-black transition">ORDER NOW</button>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
     
    </div>)
}

export default HomeSlider;