import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-creative";

import {
  Autoplay,
  Navigation,
  Pagination,
  EffectCreative,
} from "swiper/modules";

const slidesData = [
  "https://dizname.in/wp-content/uploads/2021/09/design-n-print-slider-1.jpg",
  "https://dizname.in/wp-content/uploads/2021/03/niketart_slider_2.jpg",
  "https://dizname.in/wp-content/uploads/2021/09/design-n-print-slider-2.png",
  "https://dizname.in/wp-content/uploads/2021/09/design-n-print-slider-4.png",
  "https://dizname.in/wp-content/uploads/2021/09/design-n-print-slider-5.png",
];

const HeroSection = () => {
  return (
    <div className="relative w-full bg-black">
      <Swiper
        effect="creative"
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        pagination={{ clickable: true }}
        modules={[Autoplay, Navigation, Pagination, EffectCreative]}
        creativeEffect={{
          prev: {
            shadow: false,
            translate: ["-100%", 0, -200],
            rotate: [0, 0, -15],
            opacity: 0.3,
            scale: 0.8,
          },
          next: {
            shadow: false,
            translate: ["100%", 0, -200],
            rotate: [0, 0, 15],
            opacity: 0.3,
            scale: 0.8,
          },
        }}
        className="mySwiper w-full h-[270px] sm:h-[650px]"
      >
        {slidesData.map((url, index) => (
          <SwiperSlide key={index}>
            <img
              src={url}
              alt={`Slide ${index + 1}`}
              className="w-full h-full "
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSection;
