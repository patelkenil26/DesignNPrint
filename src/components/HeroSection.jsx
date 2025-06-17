import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./HeroSection.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/mousewheel";
import "swiper/css/effect-creative"; // New effect

import {
  Autoplay,
  Pagination,
  Navigation,
  Mousewheel,
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
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  return (
    <div className="relative bg-gray-900 text-center p-4 sm:p-8 ">
      <Swiper
        effect="creative"
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, EffectCreative]}
        creativeEffect={{
          prev: {
            shadow: false,
            translate: ["-100%", 0, -200],
            rotate: [0, 0, -15], // slight rotate
            opacity: 0.3,
            scale: 0.8,
          },
          next: {
            shadow: false,
            translate: ["100%", 0, -200],
            rotate: [0, 0, 15], // slight rotate
            opacity: 0.3,
            scale: 0.8,
          },
        }}
        className="h-auto sm:h-[650px] mySwiper rounded-2xl overflow-hidden"
      >
        {slidesData.map((url, index) => (
          <SwiperSlide key={index}>
            <div className="h-[270px] sm:h-[650px] w-full flex items-center justify-center">
              <img
                src={url}
                alt={`Slide ${index + 1}`}
                className="max-h-full max-w-full object-contain sm:p-4 transition-all duration-500 ease-in-out"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSection;
