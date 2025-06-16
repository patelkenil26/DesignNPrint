import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./HeroSection.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/mousewheel";

import { Autoplay, Pagination, Navigation, Mousewheel } from "swiper/modules";

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

  // const onAutoplayTimeLeft = (s, time, progress) => {
  //   if (progressCircle.current) {
  //     progressCircle.current.style.setProperty("--progress", 1 - progress);
  //   }
  //   if (progressContent.current) {
  //     progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  //   }
  // };

  return (
    <div className="relative bg-gray-900 text-center p-4 sm:p-8 ">
      {" "}
     
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        // pagination={{
        //   clickable: true,
        // }}
        // navigation={true}
        mousewheel={false}
        modules={[Autoplay, Pagination, Navigation, Mousewheel]}
        // onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="h-auto sm:h-[650px] mySwiper rounded-2xl overflow-hidden"
        // slidesPerView={1}
        // freeMode={false}
        // followFinger={true}
        loop={true}
      >
        {slidesData.map((url, index) => (
          <SwiperSlide key={index}>
            <div className="h-[270px] sm:h-[650px] w-full  flex items-center justify-center">
              <img
                src={url}
                alt={`Slide ${index + 1}`}
                className="max-h-full max-w-full object-contain sm:p-4 "
              />
            </div>
          </SwiperSlide>
        ))}
       
      </Swiper>
    </div>
  );
};

export default HeroSection;
